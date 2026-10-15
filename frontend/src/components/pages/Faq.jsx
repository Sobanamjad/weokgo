import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  CalendarCheck,
  ArrowRight,
  ChevronDown,
  Menu
} from 'lucide-react';

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const faqs = [
    {
      question: '費用怎麼計算？大概需要多少預算？',
      answer:
        '費用依據參訪地區、天數、人數、參訪內容與服務範圍而定。由於每一趟教育參訪皆為客製規劃，我們會在了解學校的需求與預算後提供初步報價。歡迎透過諮詢表單告知概略條件，由顧問為您評估。'
    },
    {
      question: '通常需要多少天數的參訪？',
      answer:
        '天數視教育目標與地區而定。鄰近亞洲地區常見 5 至 7 天；歐美地區則多為 10 至 14 天。我們會依學校的學習節奏、預算與參訪深度，建議合適的天數安排。'
    },
    {
      question: '參訪人數有限制嗎？',
      answer:
        '人數可依學校需求調整，從小規模的師長考察團到數十人的學生參訪團皆可規劃。人數將影響交通、住宿與接待安排，建議於規劃初期即告知預估人數，以便安排最適方案。'
    },
    {
      question: '安全保障是怎麼做的？',
      answer:
        '我們將師生安全置於首位。行前進行風險評估與安全說明，參訪期間建立聯繫機制與緊急應變流程，並為參與師生投保適當的旅行平安保險與海外突發疾病險，確保突發狀況發生時能即時處理。'
    },
    {
      question: '簽證需要準備什麼？',
      answer:
        '簽證需求因目的地國家與護照種類而異。我們會協助說明所需文件清單、申請流程與時間，並提供行政文件準備的協助。建議儘早確認簽證需求，以免影響出發時程。'
    },
    {
      question: '需要多久前開始規劃？',
      answer:
        '建議於預計出發日前 6 至 10 個月啟動規劃，以確保機位、住宿及海外參訪機構的最佳預約時段，並預留簽證申請與行政作業的充足時間。若有較急迫的需求，亦歡迎與我們討論可行的方案。'
    },
    {
      question: '可以依學校的學習領域客製參訪嗎？',
      answer:
        '可以。所有參訪皆可根據學校的學習領域與教育目標進行深度調整，無論是人文歷史、科技 STEM、語言文化沉浸或姊妹校交流，我們都能精確媒合合適的參訪資源與活動設計。'
    },
    {
      question: '參訪中是否有隨行人員協助？',
      answer:
        '依參訪規劃與學校需求，可安排隨團領隊及當地窗口協助。我們重視參訪期間的即時支援，確保參訪順暢並能妥善處理突發狀況，讓校方與師生安心參與。'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              className="text-sm text-accent-light transition-colors hover:text-accent-light"
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

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            type="button"
            aria-label={menuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={menuOpen}
            aria-controls="faq-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <nav
            id="faq-mobile-menu"
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
              className="border-b border-white/10 px-6 py-4 text-accent-light"
            >
              常見問題
            </Link>

            <Link
              onClick={closeMenu}
              to="/cases"
              className="border-b border-white/10 px-6 py-4"
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
              常見問題
            </p>

            <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
              海外教育參訪規劃常見問答
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground/80 md:text-lg">
              整理校方最常詢問的問題，協助您快速了解我們的服務與合作流程。若有其他疑問，歡迎透過諮詢表單與我們聯繫。
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-b border-border">
          <div className="container-academic py-16 md:py-24">
            <div className="mx-auto max-w-3xl">
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-sm border border-border bg-card"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={openIndex === index}
                    >
                      <span className="font-heading text-base font-bold md:text-lg">
                        {faq.question}
                      </span>

                      <ChevronDown
                        className={`h-5 w-5 flex-none text-accent transition-transform duration-300 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        openIndex === index
                          ? 'grid-rows-[1fr]'
                          : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground">
          <div className="container-academic py-16 text-center md:py-20">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              還有其他疑問？
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/85">
              歡迎透過諮詢表單告訴我們您的需求，顧問將為您詳細說明。
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

export default Faq;