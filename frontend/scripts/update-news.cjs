/**
 * WeOkGo RSS News Archiver
 * Converted from update-news.php
 *
 * Source: https://chinanewscloud.com/api/v1/rss-news
 * Output: public/news-archive.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { XMLParser } = require('fast-xml-parser');

const RSS_URL = 'https://chinanewscloud.com/api/v1/rss-news';
const ARCHIVE_FILE = path.join(__dirname, '../public/news-archive.json');
const MAXIMUM_ITEMS = 500;

// XML Parser configuration
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  textNodeName: '#text',
  parseAttributeValue: true,
  parseTagValue: true,
  trimValues: true,
  cdataPropName: '__cdata',
});

/**
 * Download RSS content
 */
async function fetchRss(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const options = {
      headers: {
        'User-Agent': 'WeOkGo News Archiver/2.0',
      },
      timeout: 30000,
    };

    const req = protocol.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`RSS request failed. HTTP status: ${res.statusCode}`));
          return;
        }
        resolve(data);
      });
    });

    req.on('error', (error) => {
      reject(new Error(`RSS request failed: ${error.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('RSS request timeout'));
    });
  });
}

/**
 * Lowercase UTF-8 text safely
 */
function lowerUtf8(value) {
  return value.toLowerCase();
}

/**
 * Normalize article title for duplicate detection
 * Removes spaces, punctuation, symbols, line breaks
 */
function normalizeTitle(title) {
  const decoded = decodeHtmlEntities(title);
  const lower = lowerUtf8(decoded.trim());
  const normalized = lower.replace(/[\s\u3000\p{P}\p{S}]+/gu, '');
  return normalized.trim();
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
  };

  return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    return entities[entity] || entity;
  });
}

/**
 * Normalize a source URL for duplicate detection
 */
function normalizeSourceLink(url) {
  let decoded = decodeHtmlEntities(url.trim());

  if (decoded === '') return '';

  // Remove URL fragment
  const fragmentPosition = decoded.indexOf('#');
  if (fragmentPosition !== -1) {
    decoded = decoded.substring(0, fragmentPosition);
  }

  // Normalize trailing slash
  return decoded.replace(/\/$/, '');
}

/**
 * Create a stable internal article slug
 */
function createSlug(title, sourceLink) {
  let slug = title.replace(/[^\p{L}\p{N}]+/gu, '-');
  slug = slug.replace(/^-+|-+$/g, '');

  if (slug === '') {
    return createHash(sourceLink);
  }

  return `${slug}-${createHash(sourceLink).substring(0, 8)}`;
}

/**
 * Simple hash function (MD5-like)
 */
function createHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Read a string value safely
 */
function archiveString(item, key) {
  return String(item[key] || '').trim();
}

/**
 * Generate an identity key
 * Title is preferred because RSS may contain the same article with different source URLs
 */
function articleIdentity(title, sourceLink) {
  const normalizedTitle = normalizeTitle(title);

  if (normalizedTitle !== '') {
    return `title:${normalizedTitle}`;
  }

  const normalizedLink = normalizeSourceLink(sourceLink);

  if (normalizedLink !== '') {
    return `link:${normalizedLink}`;
  }

  return '';
}

/**
 * Extract image URL from RSS item
 */
function extractRssImage(item) {
  let image = '';

  if (item.enclosure && item.enclosure.url) {
    image = String(item.enclosure.url).trim();
  }

  if (image === '' && item.media && item.media.url) {
    image = String(item.media.url).trim();
  }

  // Support media:content
  if (image === '' && item['media:content'] && item['media:content'].url) {
    image = String(item['media:content'].url).trim();
  }

  if (image === '' && item['media:thumbnail'] && item['media:thumbnail'].url) {
    image = String(item['media:thumbnail'].url).trim();
  }

  return image;
}

/**
 * Write JSON safely using temporary file replacement
 */
function atomicWriteJson(archiveFile, json) {
  const tempFile = `${archiveFile}.tmp.${process.pid}`;

  try {
    fs.writeFileSync(tempFile, json, { flag: 'wx' });

    // Verify the temporary content is valid JSON
    const tempJson = fs.readFileSync(tempFile, 'utf8');
    JSON.parse(tempJson);

    // Replace the original file
    if (fs.existsSync(archiveFile)) {
      fs.unlinkSync(archiveFile);
    }

    fs.renameSync(tempFile, archiveFile);
  } catch (error) {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    throw new Error(`Could not write archive: ${error.message}`);
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Fetching RSS feed...');
    const rssContent = await fetchRss(RSS_URL);

    console.log('Parsing RSS XML...');
    const xml = parser.parse(rssContent);

    if (!xml.rss || !xml.rss.channel || !xml.rss.channel.item) {
      throw new Error('The RSS response is invalid XML');
    }

    const items = Array.isArray(xml.rss.channel.item)
      ? xml.rss.channel.item
      : [xml.rss.channel.item];

    // Load existing archived records
    let existingItems = [];
    if (fs.existsSync(ARCHIVE_FILE)) {
      console.log('Loading existing archive...');
      const savedJson = fs.readFileSync(ARCHIVE_FILE, 'utf8');
      existingItems = JSON.parse(savedJson);
    }

    // Store all articles by a stable identity
    const itemsByIdentity = {};
    let removedExistingDuplicates = 0;

    console.log('Processing existing items...');
    for (const existingItem of existingItems) {
      if (!existingItem || typeof existingItem !== 'object') continue;

      const title = archiveString(existingItem, 'title');
      const sourceLink = normalizeSourceLink(
        archiveString(existingItem, 'sourceLink')
      );

      // Upgrade old records whose sourceLink was stored in their link property
      let finalSourceLink = sourceLink;
      if (sourceLink === '') {
        const oldLink = archiveString(existingItem, 'link');
        if (/^https?:\/\//i.test(oldLink)) {
          finalSourceLink = normalizeSourceLink(oldLink);
        }
      }

      if (title === '' && finalSourceLink === '') continue;

      const identity = articleIdentity(title, finalSourceLink);
      if (identity === '') continue;

      // Keep the first occurrence and remove later duplicates
      if (itemsByIdentity[identity]) {
        removedExistingDuplicates++;
        continue;
      }

      let slug = archiveString(existingItem, 'slug');
      if (slug === '') {
        slug = createSlug(
          title,
          finalSourceLink !== '' ? finalSourceLink : identity
        );
      }

      existingItem.title = title;
      existingItem.slug = slug;
      existingItem.link = `/news/${encodeURIComponent(slug)}`;
      existingItem.sourceLink = finalSourceLink;
      existingItem.description = String(existingItem.description || '');
      existingItem.content = String(existingItem.content || '');
      existingItem.category = String(existingItem.category || '');
      existingItem.pubDate = String(existingItem.pubDate || '');
      existingItem.image = String(existingItem.image || '');
      existingItem.savedAt = String(
        existingItem.savedAt || new Date().toISOString()
      );
      existingItem.updatedAt = String(
        existingItem.updatedAt || new Date().toISOString()
      );

      itemsByIdentity[identity] = existingItem;
    }

    // Process current RSS records
    let processedRssItems = 0;
    let skippedRssDuplicates = 0;

    console.log('Processing RSS items...');
    for (const item of items) {
      const sourceLink = normalizeSourceLink(String(item.link || ''));
      const title = String(item.title || '').trim();

      if (sourceLink === '' || title === '') continue;

      const identity = articleIdentity(title, sourceLink);
      if (identity === '') continue;

      const description = String(item.description || '').trim();
      const category = String(item.category || '').trim();
      const pubDate = String(item.pubDate || '').trim();

      let content = String(item.content || '');
      if (content === '' && item['content:encoded']) {
        content = String(item['content:encoded'] || '');
      }

      const image = extractRssImage(item);
      const existingRecord = itemsByIdentity[identity] || null;

      // Preserve the original slug to prevent article URLs from changing
      const existingSlug =
        existingRecord && typeof existingRecord === 'object'
          ? archiveString(existingRecord, 'slug')
          : '';

      const slug = existingSlug !== '' ? existingSlug : createSlug(title, sourceLink);

      // If an existing duplicate has a different source link, preserve the original
      let savedSourceLink =
        existingRecord && typeof existingRecord === 'object'
          ? normalizeSourceLink(archiveString(existingRecord, 'sourceLink'))
          : '';

      if (savedSourceLink === '') {
        savedSourceLink = sourceLink;
      }

      let savedAt =
        existingRecord && typeof existingRecord === 'object'
          ? archiveString(existingRecord, 'savedAt')
          : '';

      if (savedAt === '') {
        savedAt = new Date().toISOString();
      }

      // If the same normalized title occurs more than once within the current RSS,
      // keep the first/newest record
      if (itemsByIdentity[identity] && !existingRecord) {
        skippedRssDuplicates++;
        continue;
      }

      itemsByIdentity[identity] = {
        title,
        slug,
        link: `/news/${encodeURIComponent(slug)}`,
        sourceLink: savedSourceLink,
        description,
        content,
        category,
        pubDate,
        image,
        savedAt,
        updatedAt: new Date().toISOString(),
      };

      processedRssItems++;
    }

    // Convert to array and sort by date (newest first)
    const allItems = Object.values(itemsByIdentity);

    allItems.sort((a, b) => {
      const dateA = new Date(a.pubDate || 0).getTime() || 0;
      const dateB = new Date(b.pubDate || 0).getTime() || 0;
      return dateB - dateA;
    });

    // Limit to maximum items
    const finalItems = allItems.slice(0, MAXIMUM_ITEMS);

    console.log('Writing archive...');
    const json = JSON.stringify(finalItems, null, 2);

    atomicWriteJson(ARCHIVE_FILE, json);

    console.log('Success!');
    console.log(JSON.stringify(
      {
        success: true,
        total: finalItems.length,
        processedRssItems,
        removedExistingDuplicates,
        skippedRssDuplicates,
        updatedAt: new Date().toISOString(),
      },
      null,
      2
    ));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
