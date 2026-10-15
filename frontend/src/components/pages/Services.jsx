import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  ArrowRight,
  MapPinned,
  Bus,
  Network,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import SharedHeader from '../layout/SharedHeader';
import SharedFooter from '../layout/SharedFooter';

function Services() {
  const { siteData } = useSite();
  const { header } = siteData;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SharedHeader />

      <main className="flex-1 pb-20 lg:pb-0">
        {/* Hero Section */}
        <section className="border-b border-border bg-secondary text-secondary-foreground">
          <div className="container-academic py-16 md:py-24">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent-light">
              服務項目
            </p>

            <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
              海外教育參訪的全程規劃服務
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground/80 md:text-lg">
              從參訪設計到行政協助，我們涵蓋海外教育參訪的每一個環節，讓校方專注於教育目標的實踐。
            </p>
          </div>
        </section>

        {/* Services List Section */}
        <section className="border-b border-border">
          <div className="container-academic py-16 md:py-24">
            <div className="space-y-16 md:space-y-24">
              {/* Service 1 */}
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-sm bg-primary text-primary-foreground">
                      <MapPinned className="h-5 w-5" />
                    </div>

                    <span className="font-heading text-sm font-medium text-accent">
                      01
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold md:text-2xl">
                    參訪規劃與設計
                  </h2>

                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    依據學校的教育目標客製化參訪內容。我們與校方深入討論教學重點、學習領域與預期成果，將人文歷史、科技 STEM、語言文化或姊妹校交流等主題融入參訪架構，確保每一次參訪都具備明確的教育意義與可評量的學習成果。
                  </p>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted">
                  <img
                    src="https://media.base44.com/images/public/6a5718d14c5db0a4a628bc9c/99c5c59c4_generated_5dda4d8a.png"
                    alt="參訪規劃與設計"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
                </div>
              </div>
                            {/* Service 2 */}
              <div className="grid items-center gap-8 md:grid-cols-2 md:[&>*:first-child]:order-2">
                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-sm bg-primary text-primary-foreground">
                      <Bus className="h-5 w-5" />
                    </div>

                    <span className="font-heading text-sm font-medium text-accent">
                      02
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold md:text-2xl">
                    交通、住宿與餐飲安排
                  </h2>

                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    統籌國際機位、當地交通、住宿與餐飲等後勤事務。我們以師生安全與舒適為優先，選擇合適的住宿地點與交通方式，並兼顧飲食需求與文化體驗，讓參訪順暢且安心。
                  </p>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted md:order-1">
                  <img
                    src="/images/services/2.png?v=20260724"
                    alt="交通住宿安排"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-sm bg-primary text-primary-foreground">
                      <Network className="h-5 w-5" />
                    </div>

                    <span className="font-heading text-sm font-medium text-accent">
                      03
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold md:text-2xl">
                    當地窗口與姊妹校／機構對接
                  </h2>

                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    於參訪地區建立在地聯絡窗口，協助對接海外學校、教育機構與姊妹校。從參訪安排、接待洽談到交流活動設計，由專人協調溝通，降低語言與文化差異帶來的障礙。
                  </p>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted">
                  <img
                    src="/images/services/3.png?v=20260724"
                    alt="姊妹校對接"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
                </div>
              </div>

              {/* Service 4 */}
              <div className="grid items-center gap-8 md:grid-cols-2 md:[&>*:first-child]:order-2">
                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-sm bg-primary text-primary-foreground">
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <span className="font-heading text-sm font-medium text-accent">
                      04
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold md:text-2xl">
                    安全規劃與緊急應變機制
                  </h2>

                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    建立完整的安全規劃與緊急應變流程，包含行前風險評估、參訪期間的聯繫機制與突發狀況處理方案。為參與師生投保適當的旅行平安保險，讓校方與家長安心。
                  </p>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted md:order-1">
                  <img
                    src="/images/services/4.png?v=20260724"
                    alt="安全規劃"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
                </div>
              </div>

              {/* Service 5 */}
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-sm bg-primary text-primary-foreground">
                      <FileText className="h-5 w-5" />
                    </div>

                    <span className="font-heading text-sm font-medium text-accent">
                      05
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold md:text-2xl">
                    簽證與行政文件協助
                  </h2>

                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    協助辦理簽證申請、保險規劃、家長同意書等行政文件準備。熟悉各國簽證規範與學校行政流程，減輕承辦人員的作業負擔，確保文件齊備、時程掌握無虞。
                  </p>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted">
                  <img
                    src="/images/services/5.png?v=20260724"
                    alt="簽證行政協助"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground">
          <div className="container-academic py-16 text-center md:py-20">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              想了解更多服務細節？
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/85">
              歡迎預約諮詢，我們將依貴校需求說明可行的參訪規劃方向。
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
      <SharedFooter />

      {/* Mobile Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <Link
          className="flex items-center justify-center gap-2 bg-accent px-6 py-4 text-base font-medium text-accent-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.15)]"
          to="/contact"
        >
          <CalendarCheck className="h-5 w-5" />
          {header.mobileCtaLabel}
        </Link>
      </div>
    </div>
  );
}

export default Services;