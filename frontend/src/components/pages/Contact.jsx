import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  MapPin,
  Phone,
  QrCode
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import SharedHeader from '../layout/SharedHeader';
import SharedFooter from '../layout/SharedFooter';

function Contact() {
  const { siteData } = useSite();
  const { contact, header } = siteData;

  const [formData, setFormData] = useState({
    school_name: '',
    contact_name: '',
    title: '',
    phone: '',
    email: '',
    destination: '',
    headcount: '',
    planned_time: '',
    requirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Frontend demonstration only.
      // Replace this with your backend API request later.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form Data:', formData);
      setSubmitStatus('success');

      setFormData({
        school_name: '',
        contact_name: '',
        title: '',
        phone: '',
        email: '',
        destination: '',
        headcount: '',
        planned_time: '',
        requirements: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SharedHeader />

      <main className="flex-1 pb-20 lg:pb-0">
        {/* Hero Section */}
        <section className="border-b border-border bg-secondary text-secondary-foreground">
          <div className="container-academic py-16 md:py-24">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent-light">
              預約諮詢
            </p>

            <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
              預約您的海外參訪規劃諮詢
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground/80 md:text-lg">
              請填寫下列資訊，我們的顧問將儘速與您聯繫，共同討論適合貴單位的海外參訪規劃方向。
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="border-b border-border">
          <div className="container-academic py-16 md:py-24">
            <div className="mx-auto max-w-2xl">
              {submitStatus === 'success' && (
                <div className="mb-6 rounded-sm border border-green-500 bg-green-50 p-4 text-green-700">
                  ✅ 感謝您的諮詢！我們的顧問將儘速與您聯繫。
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 rounded-sm border border-red-500 bg-red-50 p-4 text-red-700">
                  ❌ 送出失敗，請稍後再試或直接來電聯繫我們。
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-foreground"
                      htmlFor="school_name"
                    >
                      學校／單位名稱 *
                    </label>

                    <input
                      id="school_name"
                      name="school_name"
                      required
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="例：○○大學／○○企業"
                      value={formData.school_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-foreground"
                      htmlFor="contact_name"
                    >
                      聯絡人姓名 *
                    </label>

                    <input
                      id="contact_name"
                      name="contact_name"
                      required
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="您的姓名"
                      value={formData.contact_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-foreground"
                      htmlFor="title"
                    >
                      職稱
                    </label>

                    <input
                      id="title"
                      name="title"
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="例：主任／經理／國際交流承辦"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-foreground"
                      htmlFor="phone"
                    >
                      聯絡電話 *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="聯絡電話"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium text-foreground"
                    htmlFor="email"
                  >
                    Email *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="電子郵件信箱"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-foreground"
                      htmlFor="destination"
                    >
                      預計參訪地區
                    </label>

                    <select
                      id="destination"
                      name="destination"
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-base text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      value={formData.destination}
                      onChange={handleChange}
                    >
                      <option value="">請選擇</option>
                      <option value="亞洲">亞洲</option>
                      <option value="歐洲">歐洲</option>
                      <option value="北美">北美</option>
                      <option value="大洋洲">大洋洲</option>
                      <option value="其他地區">其他地區</option>
                      <option value="尚未確定">尚未確定</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="mb-1.5 block text-sm font-medium text-foreground"
                      htmlFor="headcount"
                    >
                      預計人數
                    </label>

                    <input
                      id="headcount"
                      name="headcount"
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="例：30 人"
                      value={formData.headcount}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium text-foreground"
                    htmlFor="planned_time"
                  >
                    預計時間
                  </label>

                  <input
                    id="planned_time"
                    name="planned_time"
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="例：2026 年寒假／尚未確定"
                    value={formData.planned_time}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium text-foreground"
                    htmlFor="requirements"
                  >
                    需求說明
                  </label>

                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={5}
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="請簡述參訪目標、產業領域、交流需求或其他規劃內容..."
                    value={formData.requirements}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting ? '送出中...' : '送出諮詢需求'}
                  </button>
                </div>
              </form>

              {/* Contact Information */}
              <section className="mt-16 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                <div className="grid gap-8 md:grid-cols-[1fr_460px]">
                  <div className="p-8 md:p-10">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                      聯絡資訊
                    </p>

                    <h2 className="font-heading text-2xl font-bold">
                      中華海外參訪顧問
                    </h2>

                    <div className="mt-7 space-y-6">
                      {contact.phones.map((phone, i) => (
                        <a
                          key={i}
                          href={`tel:${phone.number}`}
                          className="flex items-start gap-4 rounded-md border border-border p-4 transition-colors hover:border-accent"
                        >
                          <Phone className="mt-0.5 h-5 w-5 flex-none text-accent" />

                          <div>
                            <p className="text-sm text-muted-foreground">電話</p>
                            <p className="text-sm text-muted-foreground">{phone.name}</p>
                            <p className="mt-1 font-medium text-foreground">
                              {phone.number}
                            </p>
                          </div>
                        </a>
                      ))}
                      
                      {contact.addresses.map((address, i) => (
                        <div key={i} className="flex items-start gap-4 rounded-md border border-border p-4">
                          <MapPin className="mt-0.5 h-5 w-5 flex-none text-accent" />

                          <div>
                            <p className="text-sm text-muted-foreground">地址</p>
                            <p className="mt-1 font-medium leading-relaxed text-foreground">
                              {address}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
                      {contact.lineQrNote}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-muted/40 p-12 md:p-16">
  <div className="mb-6 flex items-center gap-2 text-accent">
    <QrCode className="h-6 w-6" />
    <span className="text-lg font-semibold">
      LINE 聯絡方式
    </span>
  </div>

  <div className="rounded-xl border border-border bg-white p-4 shadow-lg">
    <img
      src="/images/line-qr.jpg"
      alt="中華海外參訪顧問 LINE QR Code"
      className="h-[380px] w-[380px] object-contain"
    />
  </div>

  <p className="mt-6 text-base font-medium text-foreground">
    掃描 QR Code 加入 LINE
  </p>
</div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />

      {/* Mobile Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <a
          className="flex items-center justify-center gap-2 bg-accent px-6 py-4 text-base font-medium text-accent-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.15)]"
          href={`tel:${contact.phones[0]?.number || ''}`}
        >
          <Phone className="h-5 w-5" />
          立即來電諮詢
        </a>
      </div>
    </div>
  );
}

export default Contact;