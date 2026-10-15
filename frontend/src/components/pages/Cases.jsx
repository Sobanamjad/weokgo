import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  ArrowRight,
  ImageOff,
  Menu
} from 'lucide-react';

function Cases() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const cases = [
    {
      category: '國中小',
      title: '服務實績陸續更新中',
      description: '詳細案例內容將於取得學校授權後公開。'
    },
    {
      category: '高中',
      title: '服務實績陸續更新中',
      description: '詳細案例內容將於取得學校授權後公開。'
    },
    {
      category: '大學',
      title: '服務實績更新中',
      description: '詳細案例內容將於取得學校授權後公開。'
    },
    {
      category: '姊妹校交流',
      title: '服務實績更新中',
      description: '詳細案例內容將於取得學校授權後公開。'
    },
    {
      category: '科技考察',
      title: '服務實績陸續更新中',
      description: '詳細案例內容將於取得學校授權後公開。'
    },
    {
      category: '人文歷史',
      title: '服務實績陸續更新中',
      description: '詳細案例內容將於取得學校授權後公開。'
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="relative sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="container-academic flex h-16 items-center justify-between md:h-20">
          <Link
            className="flex flex-col leading-tight"
            to="/"
            onClick={closeMenu}
          >
            <span className="font-heading text-lg font-bold tracking-wide md:text-xl">
              中華海外參訪顧問
            </span>

            <span className="text-[11px] text-accent-light md:text-xs">
              專業規劃｜學術參訪｜企業考察｜客製化國際行程
            </span>
          </Link>

          {/* Desktop navigation */}
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
              className="text-sm text-primary-foreground/85 transition-colors hover:text-accent-light"
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
              className="text-sm text-accent-light transition-colors hover:text-accent-light"
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

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            type="button"
            aria-label={menuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={menuOpen}
            aria-controls="cases-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <nav
            id="cases-mobile-menu"
            className="absolute left-0 top-full z-50 flex w-full flex-col bg-primary text-primary-foreground shadow-lg lg:hidden"
          >
            <Link
              onClick={closeMenu}
              to="/"
              className="border-b border-white/10 px-6 py-4"
            >
              首頁
            </Link>

            <Link
              onClick={closeMenu}
              to="/about"
              className="border-b border-white/10 px-6 py-4"
            >
              關於我們
            </Link>

            <Link
              onClick={closeMenu}
              to="/services"
              className="border-b border-white/10 px-6 py-4"
            >
              服務項目
            </Link>

            <Link
              onClick={closeMenu}
              to="/destinations"
              className="border-b border-white/10 px-6 py-4"
            >
              參訪方案
            </Link>

            <Link
              onClick={closeMenu}
              to="/faq"
              className="border-b border-white/10 px-6 py-4"
            >
              常見問題
            </Link>

            <Link
              onClick={closeMenu}
              to="/cases"
              className="border-b border-white/10 px-6 py-4 text-accent-light"
            >
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
              服務實績／案例
            </p>

            <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
              服務實績陸續更新中
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground/80 md:text-lg">
              我們曾協助多所指標性教育機構完成海外考察，相關案例即將上線。
            </p>
          </div>
        </section>

        {/* Cases Grid Section */}
        <section className="border-b border-border">
          <div className="container-academic py-16 md:py-24">
            <p className="mx-auto mb-12 max-w-2xl text-center leading-relaxed text-muted-foreground">
              為保障合作學校之隱私，具體案例將於取得授權後陸續公開。以下版型為未來案例呈現方式，敬請期待。
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((caseItem, index) => (
                <div
                  key={`${caseItem.category}-${index}`}
                  className="overflow-hidden rounded-sm border border-border bg-card"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-muted">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground/50">
                      <ImageOff className="h-8 w-8" />
                      <span className="text-xs">案例圖像待更新</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="inline-block rounded-sm bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {caseItem.category}
                    </span>

                    <h3 className="mt-3 font-heading text-lg font-bold text-foreground/60">
                      {caseItem.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground/70">
                      {caseItem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground">
          <div className="container-academic py-16 text-center md:py-20">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              想了解我們的規劃經驗？
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/80">
              歡迎與我們聯繫，顧問可於諮詢過程中分享更多規劃經驗與方向。
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

export default Cases;