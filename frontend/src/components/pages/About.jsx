import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  ArrowRight,
  Compass,
  Handshake,
  ShieldCheck,
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import SharedHeader from '../layout/SharedHeader';
import SharedFooter from '../layout/SharedFooter';

function About() {
  const { siteData } = useSite();
  const { header } = siteData;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SharedHeader />

      <main className="flex-1 pb-20 lg:pb-0">
        {/* About Hero */}
        <section className="border-b border-border bg-secondary text-secondary-foreground">
          <div className="container-academic py-16 md:py-24">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent-light">
              關於我們
            </p>

            <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
              深耕國際教育交流的專業顧問
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground/80 md:text-lg">
              我們以「教育目標」為核心，協助學校將海外教育參訪轉化為可延展的學習經驗，而非單純的移動安排。
            </p>
          </div>
        </section>

        {/* Our Positioning */}
        <section className="border-b border-border">
          <div className="container-academic py-16 md:py-24">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <img
                  src="https://media.base44.com/images/public/6a5718d14c5db0a4a628bc9c/5fcc12e78_generated_ebf9b16d.png"
                  alt="歐洲大學校園建築"
                  className="aspect-[4/3] w-full rounded-sm object-cover"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                  我們的定位
                </p>

                <h2 className="font-heading text-2xl font-bold md:text-3xl">
                  為教育而生的海外參訪規劃服務
                </h2>

                <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    中華海外參訪顧問 / 海外旅遊顧問致力於協助各級學校與教育機構規劃海外教育參訪。我們深知，一次成功的教育參訪不僅是參訪安排，更是教育目標的延伸與實踐。
                  </p>

                  <p>
                    從國民中小學的國際見學、高中的多元探索，到大專院校的學術交流與姊妹校締結，我們依據不同教育階段的需求，提供客製化的參訪規劃，讓海外教育參訪真正成為師生成長的養分。
                  </p>

                  <p>
                    我們重視與校方的深度溝通，將學校的教學目標、預算考量與行政需求納入規劃，在安全與品質的前提下，為學生創造無可取代的國際學習體驗。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-muted/40">
          <div className="container-academic py-16 md:py-24">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                信賴基礎
              </p>

              <h2 className="font-heading text-2xl font-bold md:text-4xl">
                為什麼學校可以信任我們
              </h2>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                我們以專業、嚴謹與負責的態度面對每一次合作，下列特質是校方得以信賴的基礎。
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="border-l-2 border-accent/50 pl-6">
                <Compass className="mb-4 h-7 w-7 text-accent" />

                <h3 className="font-heading text-lg font-bold">
                  專注教育領域
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  我們專注於學校與教育機構的海外教育參訪需求，熟悉教育現場的目標設定與行政節奏，而非一般觀光或大眾旅遊服務。
                </p>
              </div>

              <div className="border-l-2 border-accent/50 pl-6">
                <Handshake className="mb-4 h-7 w-7 text-accent" />

                <h3 className="font-heading text-lg font-bold">
                  在地資源網絡
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  累積海外教育機構、姊妹校與在地接待資源的對接經驗，能依學校目標媒合合適的參訪對象。
                </p>
              </div>

              <div className="border-l-2 border-accent/50 pl-6">
                <ShieldCheck className="mb-4 h-7 w-7 text-accent" />

                <h3 className="font-heading text-lg font-bold">
                  嚴謹的安全思維
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  將師生安全置於首位，從行前評估到參訪中的緊急應變，建立完整的風險管理流程。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground">
          <div className="container-academic py-16 text-center md:py-20">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              讓我們成為貴校國際教育參訪的夥伴
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/85">
              歡迎與我們聯繫，共同探討適合貴校的海外教育參訪方向。
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

export default About;