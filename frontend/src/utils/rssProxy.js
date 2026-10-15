/**
 * RSS Proxy Utility
 * Fetches RSS feed from external API and returns the response
 * Converted from rss-proxy.php
 */

const RSS_API_URL = 'https://chinanewscloud.com/api/v1/rss-news';

/**
 * Fetch RSS feed from the external API
 * @returns {Promise<string>} RSS XML content
 */
export async function fetchRssFeed() {
  try {
    const response = await fetch(RSS_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/rss+xml',
        'User-Agent': 'WeOkGo RSS Reader',
      },
    });

    if (!response.ok) {
      throw new Error(`RSS request failed with status: ${response.status}`);
    }

    const text = await response.text();

    if (!text) {
      throw new Error('Unable to load RSS feed');
    }

    return text;
  } catch (error) {
    console.error('RSS Proxy Error:', error);
    throw error;
  }
}

/**
 * Fetch RSS and parse as JSON (returns parsed XML as text)
 * @returns {Promise<string>} RSS XML content
 */
export async function getRssFeed() {
  return fetchRssFeed();
}
