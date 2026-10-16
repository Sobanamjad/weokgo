import './styles/App.css';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  ArrowRight,
  BookOpenCheck,
  GraduationCap,
  Landmark,
  Network,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useSite } from './context/SiteContext';
import SharedHeader from './components/layout/SharedHeader';
import SharedFooter from './components/layout/SharedFooter';

function App() {
  const { siteData, loading } = useSite();
  const { hero, servicesSection, ctaBanner, header } = siteData;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SharedHeader />

      <main className="flex-1 pb-20 lg:pb-0">
        {/* Hero Section */}
        <section className="relative flex min-h-[78vh] items-center overflow-hidden">
          <img 
            src={hero.imageUrl} 
            alt="library" 
            className="absolute inset-0 h-full w-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40"></div>
          <div className="container-academic relative z-10 py-20">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent-light">{hero.badge}</p>
            <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">{hero.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-secondary-foreground/90 md:text-lg">{hero.description}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-7 py-3.5 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90" to="/contact">
                <CalendarCheck className="h-5 w-5" />
                {hero.primaryCta}
              </Link>
              <Link className="inline-flex items-center justify-center gap-2 rounded-sm border border-primary-foreground/40 px-7 py-3.5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10" to="/services">
                {hero.secondaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="border-b border-border bg-background">
          <div className="container-academic py-16 md:py-24">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">{servicesSection.badge}</p>
              <h2 className="font-heading text-2xl font-bold md:text-4xl">{servicesSection.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{servicesSection.description}</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
              {servicesSection.cards.map((card, i) => (
                <div key={i} className="bg-card p-8">
                  {i === 0 && <BookOpenCheck className="mb-5 h-8 w-8 text-accent" />}
                  {i === 1 && <GraduationCap className="mb-5 h-8 w-8 text-accent" />}
                  {i === 2 && <Landmark className="mb-5 h-8 w-8 text-accent" />}
                  <h3 className="font-heading text-xl font-bold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="bg-muted/40">
          <div className="container-academic py-16 md:py-24">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">服務優勢</p>
              <h2 className="font-heading text-2xl font-bold md:text-4xl">為什麼學校選擇與我們合作</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex gap-5">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <Network className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">在地窗口對接</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">於參訪地區建立在地聯絡窗口，直接對接海外學校、教育機構與姊妹校，降低溝通門檻與不確定性。</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">安全規劃優先</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">從參訪動線、住宿選擇到緊急應變機制，全程以師生安全為核心，建構完整保障。</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">參訪結合學習成果</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">依學校教育目標客製參訪內容，讓海外教育參訪不只是移動，而是可評量、可延展的學習經驗。</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">簽證與行政協助</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">協助辦理簽證、保險、文件準備等行政事務，減輕校方承辦人員的作業負擔。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="border-y border-border bg-background">
          <div className="container-academic py-16 md:py-24">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">服務流程</p>
              <h2 className="font-heading text-2xl font-bold md:text-4xl">從願景到啟程：我們的合作流程</h2>
            </div>
            <div className="grid gap-px overflow-hidden border border-border md:grid-cols-5">
              <div className="bg-card p-7">
                <span className="font-heading text-3xl font-bold text-accent/70">01</span>
                <h3 className="mt-3 font-heading text-lg font-bold">諮詢</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">了解學校的教育目標、預算與初步需求。</p>
              </div>
              <div className="bg-card p-7">
                <span className="font-heading text-3xl font-bold text-accent/70">02</span>
                <h3 className="mt-3 font-heading text-lg font-bold">規劃</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">依目標設計客製化參訪草案與學習架構。</p>
              </div>
              <div className="bg-card p-7">
                <span className="font-heading text-3xl font-bold text-accent/70">03</span>
                <h3 className="mt-3 font-heading text-lg font-bold">確認</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">與校方反覆討論修正，確認參訪內容與細節。</p>
              </div>
              <div className="bg-card p-7">
                <span className="font-heading text-3xl font-bold text-accent/70">04</span>
                <h3 className="mt-3 font-heading text-lg font-bold">出發</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">落實交通、住宿、安全與行政準備後啟程。</p>
              </div>
              <div className="bg-card p-7">
                <span className="font-heading text-3xl font-bold text-accent/70">05</span>
                <h3 className="mt-3 font-heading text-lg font-bold">售後</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">參訪結束後提供成果整理與後續服務支援。</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground">
          <div className="container-academic py-16 text-center md:py-24">
            <h2 className="font-heading text-2xl font-bold md:text-4xl">{ctaBanner.title}</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/85">{ctaBanner.description}</p>
            <Link className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90" to="/contact">
              <CalendarCheck className="h-5 w-5" />
              {ctaBanner.buttonLabel}
            </Link>
          </div>
        </section>
      </main>

      <SharedFooter />

      {/* Mobile Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <Link className="flex items-center justify-center gap-2 bg-accent px-6 py-4 text-base font-medium text-accent-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.15)]" to="/contact">
          <CalendarCheck className="h-5 w-5" />
          {header.mobileCtaLabel}
        </Link>
      </div>
    </div>
  );
}

export default App;
