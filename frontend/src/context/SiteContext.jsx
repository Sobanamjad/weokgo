import { createContext, useContext, useState, useEffect } from 'react';

// ─── Default site content ─────────────────────────────────────────────────────
export const defaultSiteData = {
  // Header
  header: {
    siteName: '中華海外參訪顧問',
    tagline: '專業規劃｜學術參訪｜企業考察｜客製化國際行程',
    menuItems: [
      { label: '首頁',   path: '/' },
      { label: '關於我們', path: '/about' },
      { label: '服務項目', path: '/services' },
      { label: '參訪方案', path: '/destinations' },
      { label: '新聞傳媒', path: '/destinations' },
      { label: '常見問題', path: '/faq' },
      { label: '服務實績', path: '/cases' },
    ],
    ctaLabel: '預約諮詢',
    ctaPath: '/contact',
    mobileCtaLabel: '預約免費諮詢',
  },

  // Hero (Home page)
  hero: {
    badge: '專門服務學校與教育機構',
    title: '海外教育參訪，專為學校而規劃。',
    description: '我們是專門服務學校與教育機構的海外教育參訪顧問。從教育目標出發，為貴校規劃安全、具學習深度的國際教育考察與姊妹校交流，讓每一次參訪都成為師生成長的養分。',
    primaryCta: '預約諮詢',
    secondaryCta: '了解服務項目',
    imageUrl: 'https://media.base44.com/images/public/6a5718d14c5db0a4a628bc9c/25de2f857_generated_b717addb.png',
  },

  // Services section (home page cards)
  servicesSection: {
    badge: '服務對象',
    title: '專為教育機構而生的海外參訪規劃',
    description: '我們專門服務各級學校與教育機構的海外教育參訪需求，理解不同教育階段在目標設定、安全與行政上的差異，提供相對應的專業協助。',
    cards: [
      { title: '國民中小學', description: '結合課程學習目標的海外教育見學，讓學生在安全陪伴下拓展國際視野的第一步。' },
      { title: '高級中等學校', description: '呼應多元選修與升學探索，規劃具學術深度與生涯啟發的國際教育參訪。' },
      { title: '大專院校', description: '媒合海外名校與研究機構，安排學術交流、實地考察與姊妹校締結。' },
    ],
  },

  // CTA banner (home page)
  ctaBanner: {
    title: '免費諮詢您的參訪計畫',
    description: '無論您正構思何種海外教育參訪，歡迎與我們聯繫，由專業顧問為您評估可行性與規劃方向。',
    buttonLabel: '立即預約諮詢',
  },

  // Footer
  footer: {
    siteName: '中華海外參訪顧問',
    tagline: '海外旅遊顧問',
    description: '學校海外教育參訪規劃顧問。為國中小、高中、大學等教育機構，量身規劃安全、具教育深度的海外教育參訪。',
    serviceTargets: ['國民中小學', '高級中等學校', '大專院校', '教育局及教育機構'],
    copyright: '© 2026 中華海外參訪顧問 / 海外旅遊顧問．All rights reserved.',
  },

  // Contact page info
  contact: {
    phones: [
      { name: 'Mr. Chang', number: '0975-717557' },
      { name: 'Mr. Yang',  number: '0972-965310' },
    ],
    addresses: [
      '新北市板橋區館前東路116號5樓之7',
      '臺南市永華路二段684號3樓',
    ],
    lineQrNote: '歡迎掃描 LINE QR Code 加入好友，洽詢海外企業參訪、EMBA／MBA參訪與國際交流規劃。',
  },

  // Dynamic pages (custom pages created from admin)
  dynamicPages: [],

  // RSS feeds configuration
  rssFeeds: [
    {
      id: 'news',
      name: 'News Feed',
      url: 'https://chinanewscloud.com/api/v1/rss-news',
      enabled: true,
    },
  ],
};

const API_BASE_URL = 'http://localhost:5000/api';

// ─── Context ──────────────────────────────────────────────────────────────────
const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [siteData, setSiteData] = useState(defaultSiteData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteData();
  }, []);

  const fetchSiteData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/site-data`);
      if (response.ok) {
        const data = await response.json();
        setSiteData(prev => deepMerge(prev, data));
      }
    } catch (error) {
      console.error('Error fetching site data:', error);
      // Fall back to defaults if API fails
    } finally {
      setLoading(false);
    }
  };

  // Patch helper — merges partial update into siteData
  const updateSection = (section, partial) => {
    setSiteData(prev => ({
      ...prev,
      [section]: deepMerge(prev[section], partial),
    }));
  };

  // Full reset to defaults
  const resetToDefaults = () => {
    setSiteData(defaultSiteData);
  };

  return (
    <SiteContext.Provider value={{ siteData, updateSection, resetToDefaults, loading }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
}

// ─── Utility ──────────────────────────────────────────────────────────────────
function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
