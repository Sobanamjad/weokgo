/**
 * Multi-RSS News Archiver
 * Supports multiple RSS feeds configured in admin panel
 *
 * Reads RSS feed configuration from site data in localStorage
 * Output: public/news-archive.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { XMLParser } = require('fast-xml-parser');

const ARCHIVE_FILE = path.join(__dirname, '../public/news-archive.json');
const SITE_DATA_FILE = path.join(__dirname, '../public/site-data.json');
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

  const fragmentPosition = decoded.indexOf('#');
  if (fragmentPosition !== -1) {
    decoded = decoded.substring(0, fragmentPosition);
  }

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
 * Simple hash function
 */
function createHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
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

  if (image === '' && item['media:content'] && item['media:content'].url) {
    image = String(item['media:content'].url).trim();
  }

  if (image === '' && item['media:thumbnail'] && item['media:thumbnail'].url) {
    image = String(item['media:thumbnail'].url).trim();
  }

  return image;
}

/**
 * Write JSON safely
 */
function atomicWriteJson(archiveFile, json) {
  const tempFile = `${archiveFile}.tmp.${process.pid}`;

  try {
    fs.writeFileSync(tempFile, json, { flag: 'wx' });

    const tempJson = fs.readFileSync(tempFile, 'utf8');
    JSON.parse(tempJson);

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
 * Get RSS feeds configuration
 */
function getRssFeeds() {
  // Try to read from site-data.json (exported from admin panel)
  if (fs.existsSync(SITE_DATA_FILE)) {
    try {
      const siteData = JSON.parse(fs.readFileSync(SITE_DATA_FILE, 'utf8'));
      if (siteData.rssFeeds && Array.isArray(siteData.rssFeeds)) {
        return siteData.rssFeeds.filter(feed => feed.enabled);
      }
    } catch (error) {
      console.warn('Could not read site-data.json:', error.message);
    }
  }

  // Fallback to default feed
  return [
    {
      id: 'news',
      name: 'News Feed',
      url: 'https://chinanewscloud.com/api/v1/rss-news',
      enabled: true,
    },
  ];
}

/**
 * Main function
 */
async function main() {
  try {
    const rssFeeds = getRssFeeds();
    console.log(`Processing ${rssFeeds.length} RSS feed(s)...`);

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

    // Process all RSS feeds
    let totalProcessedRssItems = 0;
    let totalSkippedRssDuplicates = 0;

    for (const feed of rssFeeds) {
      console.log(`Fetching feed: ${feed.name} (${feed.url})...`);

      try {
        const rssContent = await fetchRss(feed.url);
        const xml = parser.parse(rssContent);

        if (!xml.rss || !xml.rss.channel || !xml.rss.channel.item) {
          console.warn(`Invalid RSS feed: ${feed.name}`);
          continue;
        }

        const items = Array.isArray(xml.rss.channel.item)
          ? xml.rss.channel.item
          : [xml.rss.channel.item];

        console.log(`Processing ${items.length} items from ${feed.name}...`);

        let processedRssItems = 0;
        let skippedRssDuplicates = 0;

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

          const existingSlug =
            existingRecord && typeof existingRecord === 'object'
              ? archiveString(existingRecord, 'slug')
              : '';

          const slug = existingSlug !== '' ? existingSlug : createSlug(title, sourceLink);

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
            feedName: feed.name,
            feedId: feed.id,
            savedAt,
            updatedAt: new Date().toISOString(),
          };

          processedRssItems++;
        }

        totalProcessedRssItems += processedRssItems;
        totalSkippedRssDuplicates += skippedRssDuplicates;

        console.log(`Processed ${processedRssItems} items from ${feed.name}`);
      } catch (error) {
        console.error(`Error processing feed ${feed.name}:`, error.message);
      }
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
        processedRssItems: totalProcessedRssItems,
        removedExistingDuplicates,
        skippedRssDuplicates: totalSkippedRssDuplicates,
        feedsProcessed: rssFeeds.length,
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
