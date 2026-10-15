import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  CalendarCheck,
  ArrowRight,
  Landmark,
  Cpu,
  Languages,
  Handshake,
  Globe,
  Menu
} from 'lucide-react';

function Destinations() {
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setNewsLoading(true);
        setNewsError('');

        const response = await fetch('/news-archive.json', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(
            `News archive request failed: ${response.status}`
          );
        }

        const items = await response.json();

        if (!Array.isArray(items)) {
          throw new Error('Invalid news archive format');
        }

        const validItems = items
          .filter(
            (item) =>
              item &&
              typeof item === 'object' &&
              item.title &&
              item.link
          )
          .sort((a, b) => {
            const dateA = new Date(a.pubDate || 0).getTime();
            const dateB = new Date(b.pubDate || 0).getTime();

            return dateB - dateA;
          });

        setNews(validItems);
      } catch (error) {
        console.error('News loading error:', error);
        setNewsError(
  `目前無法載入最新消息：${error instanceof Error ? error.message : String(error)}`
);
      } finally {
        setNewsLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">

      {/* Header */}
      <header className="relative sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="container-academic flex h-16 items-center justify-between md:h-20">

          <Link className="flex flex-col leading-tight" to="/" onClick={closeMenu}>
            <span className="font-heading text-lg font-bold tracking-wide md:text-xl">
              中華海外參訪顧問
            </span>

            <span className="text-[11px] text-accent-light md:text-xs">
              專業規劃｜學術參訪｜企業考察｜客製化國際行程
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link
              className="text-sm text-primary-foreground/85 transition-colors hover:text-accent-light"
              to="/"
            >
              首頁
            </Link>

            <Link
              className="text-sm text-primary-foreground/85 transition-colors hover:text-accent-light"
              to="/about"
            >
              關於我們
            </Link>

            <Link
              className="text-sm text-primary-foreground/85 transition-colors hover:text-accent-light"
              to="/services"
            >
              服務項目
            </Link>

            <Link
              className="text-sm text-accent-light transition-colors hover:text-accent-light"
              to="/destinations"
            >
              參訪方案
            </Link>

            <Link
              className="text-sm text-primary-foreground/85 transition-colors hover:text-accent-light"
              to="/faq"
            >
              常見問題
            </Link>

            <Link
              className="text-sm text-primary-foreground/85 transition-colors hover:text-accent-light"
              to="/cases"
            >
              服務實績
            </Link>

            <Link
              className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              to="/contact"
            >
              預約諮詢
            </Link>
          </nav>

          <button
            className="lg:hidden"
            type="button"
            aria-label={menuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={menuOpen}
            aria-controls="destinations-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu className="h-6 w-6" />
          </button>

        </div>

        {menuOpen && (
          <nav
            id="destinations-mobile-menu"
            className="absolute left-0 top-full z-50 flex w-full flex-col bg-primary text-primary-foreground shadow-lg lg:hidden"
          >
            <Link onClick={closeMenu} to="/" className="border-b border-white/10 px-6 py-4">
              首頁
            </Link>
            <Link onClick={closeMenu} to="/about" className="border-b border-white/10 px-6 py-4">
              關於我們
            </Link>
            <Link onClick={closeMenu} to="/services" className="border-b border-white/10 px-6 py-4">
              服務項目
            </Link>
            <Link onClick={closeMenu} to="/destinations" className="border-b border-white/10 px-6 py-4 text-accent-light">
              參訪方案
            </Link>
            <Link onClick={closeMenu} to="/faq" className="border-b border-white/10 px-6 py-4">
              常見問題
            </Link>
            <Link onClick={closeMenu} to="/cases" className="border-b border-white/10 px-6 py-4">
              服務實績
            </Link>
            <Link
              onClick={closeMenu}
              to="/contact"
              className="bg-accent px-6 py-4 font-medium text-accent-foreground"
            >
              預約諮詢
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1 pb-20 lg:pb-0">

        {/* Hero Section */}
        <section className="border-b border-border bg-secondary text-secondary-foreground">
          <div className="container-academic py-16 md:py-24">

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent-light">
              參訪方案／地區
            </p>

            <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
              依主題與地區客製您的教育參訪
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground/80 md:text-lg">
              我們不限定單一國家，可依學校的教育目標與需求，規劃任何地區的海外教育參訪。
            </p>

          </div>
        </section>

        {/* Theme Section */}
        <section className="border-b border-border">
          <div className="container-academic py-16 md:py-24">

            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                主題分類
              </p>

              <h2 className="font-heading text-2xl font-bold md:text-4xl">
                依教育目標選擇參訪主題
              </h2>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                不同的學習領域對應不同的參訪設計。點選下方主題，了解我們能如何為貴校規劃。
              </p>
            </div>

            {/* Theme Buttons */}
            <div className="mb-10 flex flex-wrap gap-3">

              <button className="inline-flex items-center gap-2 rounded-sm border border-primary bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors">
                <Landmark className="h-4 w-4" />
                人文與歷史探訪
              </button>

              <button className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-accent">
                <Cpu className="h-4 w-4" />
                科技與 STEM 考察
              </button>

              <button className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-accent">
                <Languages className="h-4 w-4" />
                語言文化沉浸
              </button>

              <button className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-accent">
                <Handshake className="h-4 w-4" />
                姊妹校締結與交流
              </button>

            </div>

            {/* Active Theme Card */}
            <div className="grid items-center gap-8 rounded-sm border border-border bg-card p-8 md:grid-cols-[auto_1fr] md:p-12">

              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-sm bg-primary text-primary-foreground">
                <Landmark className="h-7 w-7" />
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold md:text-2xl">
                  人文與歷史探訪
                </h3>

                <p className="mt-4 leading-relaxed text-muted-foreground">
                  走訪歷史古城、博物館與文化遺產，結合在地導覽與主題課程，深化學生對世界文明與人文素養的理解。
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* Region Section */}
        <section className="bg-muted/40">
          <div className="container-academic py-16 md:py-24">

            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                地區分類
              </p>

              <h2 className="font-heading text-2xl font-bold md:text-4xl">
                全球皆可規劃的教育參訪
              </h2>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                以下為常見的參訪地區分類，實際參訪將依學校需求客製，不侷限於單一國家。
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">

              {/* Asia */}
              <div className="overflow-hidden rounded-sm border border-border bg-card">

                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src="https://media.base44.com/images/public/6a5718d14c5db0a4a628bc9c/8d9341eab_generated_9de7eaad.png"
                    alt="亞洲地區"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent" />

                  <h3 className="absolute bottom-4 left-5 font-heading text-xl font-bold text-primary-foreground">
                    亞洲地區
                  </h3>
                </div>

                <p className="p-6 text-sm leading-relaxed text-muted-foreground">
                  日本、韓國、東南亞等鄰近國家，交通便利、文化相近卻各具特色，適合首次辦理海外教育參訪的學校。
                </p>

              </div>

              {/* Europe */}
              <div className="overflow-hidden rounded-sm border border-border bg-card">

                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src="https://media.base44.com/images/public/6a5718d14c5db0a4a628bc9c/a3856ea4d_generated_b8627645.png"
                    alt="歐美地區"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent" />

                  <h3 className="absolute bottom-4 left-5 font-heading text-xl font-bold text-primary-foreground">
                    歐美地區
                  </h3>
                </div>

                <p className="p-6 text-sm leading-relaxed text-muted-foreground">
                  歐洲與北美擁有豐富的學術資源與歷史底蘊，適合進行深度學術考察、名校參訪與人文藝術探索。
                </p>

              </div>

              {/* Other Regions */}
              <div className="overflow-hidden rounded-sm border border-border bg-card">

                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src="https://media.base44.com/images/public/6a5718d14c5db0a4a628bc9c/01f175109_generated_bb5c2fe3.png"
                    alt="其他地區"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent" />

                  <h3 className="absolute bottom-4 left-5 font-heading text-xl font-bold text-primary-foreground">
                    其他地區
                  </h3>
                </div>

                <p className="p-6 text-sm leading-relaxed text-muted-foreground">
                  我們不限定單一國家或地區，無論是大洋洲、中東或非洲，皆可依學校的教育目標與需求進行客製規劃。
                </p>

              </div>

            </div>

            {/* Custom Region Note */}
            <div className="mt-10 flex items-center gap-3 rounded-sm border border-dashed border-accent/40 bg-card p-6">

              <Globe className="h-6 w-6 flex-none text-accent" />

              <p className="text-sm leading-relaxed text-muted-foreground">
                沒有看到您屬意的地區？我們可依學校的教育目標評估任何地區的教育參訪可行性，歡迎與我們討論。
              </p>

            </div>

          </div>
        </section>

        {/* Latest News Section */}
        <section className="border-t border-border bg-background">
          <div className="container-academic py-16 md:py-24">

            <div className="mb-12 max-w-2xl">

              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                最新消息
              </p>

              <h2 className="font-heading text-2xl font-bold md:text-4xl">
                新聞傳媒
              </h2>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                掌握最新產業、國際、財經與社會資訊。
              </p>

            </div>

            {newsLoading && (
              <div className="rounded-sm border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  新聞載入中...
                </p>
              </div>
            )}

            {newsError && (
              <div className="rounded-sm border border-red-200 bg-red-50 p-8 text-center">
                <p className="text-red-600">
                  {newsError}
                </p>
              </div>
            )}

            {!newsLoading && !newsError && news.length === 0 && (
              <div className="rounded-sm border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  目前沒有可顯示的新聞。
                </p>
              </div>
            )}

            {!newsLoading && !newsError && news.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                {news.map((item, index) => (
                  <article
                    key={`${item.link}-${index}`}
                    className="overflow-hidden rounded-sm border border-border bg-card shadow-sm"
                  >

                    {item.image && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block aspect-[3/2] overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </a>
                    )}

                    <div className="p-6">

                      <div className="mb-3 flex items-center justify-between gap-3">

                        <span className="text-xs font-medium text-accent">
                          {item.category}
                        </span>

                        {item.pubDate && (
                          <time className="text-xs text-muted-foreground">
                            {new Date(item.pubDate).toLocaleDateString('zh-TW')}
                          </time>
                        )}

                      </div>

                      <h3 className="font-heading text-lg font-bold leading-snug">

                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-accent"
                        >
                          {item.title}
                        </a>

                      </h3>

                      {item.description && (
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      )}

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                      >
                        閱讀全文
                        <ArrowRight className="h-4 w-4" />
                      </a>

                    </div>

                  </article>
                ))}

              </div>
            )}

          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground">
          <div className="container-academic py-16 text-center md:py-20">

            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              告訴我們您的參訪構想
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/85">
              無論地區或主題，我們都能為您評估並規劃合適的教育參訪方案。
            </p>

            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90"
              to="/contact"
            >
              <CalendarCheck className="h-5 w-5" />
              預約諮詢
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground">
        <div className="container-academic py-12 md:py-16">

          <div className="grid gap-10 md:grid-cols-3">

            <div>
              <div className="flex flex-col leading-tight">

                <span className="font-heading text-xl font-bold text-primary-foreground">
                  中華海外參訪顧問
                </span>

                <span className="text-sm text-accent-light">
                  海外旅遊顧問
                </span>

              </div>

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary-foreground/75">
                學校海外教育參訪規劃顧問。為國中小、高中、大學等教育機構，量身規劃安全、具教育深度的海外教育參訪。
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-accent-light">
                網站導覽
              </h3>

              <ul className="grid gap-2 text-sm">
                <li>
                  <Link
                    className="text-secondary-foreground/80 transition-colors hover:text-primary-foreground"
                    to="/"
                  >
                    首頁
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-foreground/80 transition-colors hover:text-primary-foreground"
                    to="/about"
                  >
                    關於我們
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-foreground/80 transition-colors hover:text-primary-foreground"
                    to="/services"
                  >
                    服務項目
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-foreground/80 transition-colors hover:text-primary-foreground"
                    to="/destinations"
                  >
                    參訪方案
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-foreground/80 transition-colors hover:text-primary-foreground"
                    to="/faq"
                  >
                    常見問題
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-foreground/80 transition-colors hover:text-primary-foreground"
                    to="/cases"
                  >
                    服務實績
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-foreground/80 transition-colors hover:text-primary-foreground"
                    to="/contact"
                  >
                    預約諮詢
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-accent-light">
                服務對象
              </h3>

              <ul className="grid gap-2 text-sm text-secondary-foreground/80">
                <li>國民中小學</li>
                <li>高級中等學校</li>
                <li>大專院校</li>
                <li>教育局及教育機構</li>
              </ul>
            </div>

          </div>

          <div className="mt-12 border-t border-secondary-foreground/15 pt-6 text-xs text-secondary-foreground/60">
            © 2026 中華海外參訪顧問 / 海外旅遊顧問．All rights reserved.
          </div>

        </div>
      </footer>

      {/* Mobile Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">

        <Link
          className="flex items-center justify-center gap-2 bg-accent px-6 py-4 text-base font-medium text-accent-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.15)]"
          to="/contact"
        >
          <CalendarCheck className="h-5 w-5" />
          預約免費諮詢
        </Link>

      </div>

    </div>
  );
}

export default Destinations;

