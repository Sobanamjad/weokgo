import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Save, RotateCcw, Lock, Menu, X, Download } from 'lucide-react';

// Simple password (aap ye change kar sakte ho)
const ADMIN_PASSWORD = 'admin123';

function Admin() {
  const { siteData, updateSection, resetToDefaults } = useSite();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('header');
  const [showSuccess, setShowSuccess] = useState(false);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Wrong password!');
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-secondary">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
          <div className="mb-6 flex items-center justify-center">
            <Lock className="h-12 w-12 text-accent" />
          </div>
          <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
            Admin Panel
          </h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Enter password to continue
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              autoFocus
            />
            <button
              type="submit"
              className="w-full rounded-md bg-accent px-4 py-3 font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Tabs
  const tabs = [
    { id: 'header', label: 'Header' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'services', label: 'Services' },
    { id: 'cta', label: 'CTA Banner' },
    { id: 'footer', label: 'Footer' },
    { id: 'contact', label: 'Contact Info' },
    { id: 'pages', label: 'Dynamic Pages' },
    { id: 'rss', label: 'RSS Feeds' },
  ];

  const handleSave = (section, data) => {
    updateSection(section, data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      resetToDefaults();
      alert('Content reset to defaults!');
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(siteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'site-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-foreground">
            ⚙️ Admin Panel
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
            >
              <Download className="h-4 w-4" />
              Export Data
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
            >
              <RotateCcw className="h-4 w-4" />
              Reset to Defaults
            </button>
          </div>
        </div>
      </header>

      {/* Success message */}
      {showSuccess && (
        <div className="fixed right-4 top-20 z-50 rounded-md bg-green-500 px-6 py-3 text-white shadow-lg">
          ✓ Saved successfully!
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full rounded-md px-4 py-3 text-left font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white text-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Content */}
          <main className="rounded-lg bg-white p-6 shadow-sm">
            {activeTab === 'header' && <HeaderEditor data={siteData.header} onSave={(d) => handleSave('header', d)} />}
            {activeTab === 'hero' && <HeroEditor data={siteData.hero} onSave={(d) => handleSave('hero', d)} />}
            {activeTab === 'services' && <ServicesEditor data={siteData.servicesSection} onSave={(d) => handleSave('servicesSection', d)} />}
            {activeTab === 'cta' && <CtaEditor data={siteData.ctaBanner} onSave={(d) => handleSave('ctaBanner', d)} />}
            {activeTab === 'footer' && <FooterEditor data={siteData.footer} onSave={(d) => handleSave('footer', d)} />}
            {activeTab === 'contact' && <ContactEditor data={siteData.contact} onSave={(d) => handleSave('contact', d)} />}
            {activeTab === 'pages' && <PagesEditor data={siteData.dynamicPages} onSave={(d) => handleSave('dynamicPages', d)} />}
            {activeTab === 'rss' && <RssEditor data={siteData.rssFeeds} onSave={(d) => handleSave('rssFeeds', d)} />}
          </main>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HEADER EDITOR
// ═══════════════════════════════════════════════════════════════════════════════
function HeaderEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  const updateMenuItem = (index, field, value) => {
    const updated = [...form.menuItems];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, menuItems: updated });
  };

  const addMenuItem = () => {
    setForm({
      ...form,
      menuItems: [...form.menuItems, { label: 'New Item', path: '/' }],
    });
  };

  const removeMenuItem = (index) => {
    setForm({
      ...form,
      menuItems: form.menuItems.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Header Settings</h2>

      <div>
        <label className="mb-1 block text-sm font-medium">Site Name</label>
        <input
          type="text"
          value={form.siteName}
          onChange={(e) => setForm({ ...form, siteName: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Tagline</label>
        <input
          type="text"
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Menu Items</label>
        <div className="space-y-3">
          {form.menuItems.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                placeholder="Label"
                value={item.label}
                onChange={(e) => updateMenuItem(i, 'label', e.target.value)}
                className="flex-1 rounded-md border border-border px-3 py-2"
              />
              <input
                type="text"
                placeholder="Path"
                value={item.path}
                onChange={(e) => updateMenuItem(i, 'path', e.target.value)}
                className="flex-1 rounded-md border border-border px-3 py-2"
              />
              <button
                onClick={() => removeMenuItem(i)}
                className="rounded-md bg-red-50 px-3 text-red-600 hover:bg-red-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addMenuItem}
          className="mt-2 rounded-md bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80"
        >
          + Add Menu Item
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">CTA Label</label>
          <input
            type="text"
            value={form.ctaLabel}
            onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })}
            className="w-full rounded-md border border-border px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">CTA Path</label>
          <input
            type="text"
            value={form.ctaPath}
            onChange={(e) => setForm({ ...form, ctaPath: e.target.value })}
            className="w-full rounded-md border border-border px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={() => onSave(form)}
        className="flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90"
      >
        <Save className="h-4 w-4" />
        Save Header
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO EDITOR
// ═══════════════════════════════════════════════════════════════════════════════
function HeroEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Hero Section</h2>

      <div>
        <label className="mb-1 block text-sm font-medium">Badge Text</label>
        <input
          type="text"
          value={form.badge}
          onChange={(e) => setForm({ ...form, badge: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Background Image URL</label>
        <input
          type="text"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Primary CTA</label>
          <input
            type="text"
            value={form.primaryCta}
            onChange={(e) => setForm({ ...form, primaryCta: e.target.value })}
            className="w-full rounded-md border border-border px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Secondary CTA</label>
          <input
            type="text"
            value={form.secondaryCta}
            onChange={(e) => setForm({ ...form, secondaryCta: e.target.value })}
            className="w-full rounded-md border border-border px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={() => onSave(form)}
        className="flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90"
      >
        <Save className="h-4 w-4" />
        Save Hero
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES EDITOR
// ═══════════════════════════════════════════════════════════════════════════════
function ServicesEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  const updateCard = (index, field, value) => {
    const updated = [...form.cards];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, cards: updated });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Services Section</h2>

      <div>
        <label className="mb-1 block text-sm font-medium">Badge</label>
        <input
          type="text"
          value={form.badge}
          onChange={(e) => setForm({ ...form, badge: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Service Cards</label>
        <div className="space-y-4">
          {form.cards.map((card, i) => (
            <div key={i} className="rounded-md border border-border p-4">
              <input
                type="text"
                placeholder="Card Title"
                value={card.title}
                onChange={(e) => updateCard(i, 'title', e.target.value)}
                className="mb-2 w-full rounded-md border border-border px-3 py-2"
              />
              <textarea
                placeholder="Card Description"
                rows={2}
                value={card.description}
                onChange={(e) => updateCard(i, 'description', e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSave(form)}
        className="flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90"
      >
        <Save className="h-4 w-4" />
        Save Services
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CTA EDITOR
// ═══════════════════════════════════════════════════════════════════════════════
function CtaEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">CTA Banner</h2>

      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Button Label</label>
        <input
          type="text"
          value={form.buttonLabel}
          onChange={(e) => setForm({ ...form, buttonLabel: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <button
        onClick={() => onSave(form)}
        className="flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90"
      >
        <Save className="h-4 w-4" />
        Save CTA
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER EDITOR
// ═══════════════════════════════════════════════════════════════════════════════
function FooterEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  const updateTarget = (index, value) => {
    const updated = [...form.serviceTargets];
    updated[index] = value;
    setForm({ ...form, serviceTargets: updated });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Footer Settings</h2>

      <div>
        <label className="mb-1 block text-sm font-medium">Site Name</label>
        <input
          type="text"
          value={form.siteName}
          onChange={(e) => setForm({ ...form, siteName: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Tagline</label>
        <input
          type="text"
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Service Targets</label>
        <div className="space-y-2">
          {form.serviceTargets.map((target, i) => (
            <input
              key={i}
              type="text"
              value={target}
              onChange={(e) => updateTarget(i, e.target.value)}
              className="w-full rounded-md border border-border px-3 py-2"
            />
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Copyright</label>
        <input
          type="text"
          value={form.copyright}
          onChange={(e) => setForm({ ...form, copyright: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <button
        onClick={() => onSave(form)}
        className="flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90"
      >
        <Save className="h-4 w-4" />
        Save Footer
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT EDITOR
// ═══════════════════════════════════════════════════════════════════════════════
function ContactEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  const updatePhone = (index, field, value) => {
    const updated = [...form.phones];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, phones: updated });
  };

  const updateAddress = (index, value) => {
    const updated = [...form.addresses];
    updated[index] = value;
    setForm({ ...form, addresses: updated });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Information</h2>

      <div>
        <label className="mb-2 block text-sm font-medium">Phone Numbers</label>
        <div className="space-y-3">
          {form.phones.map((phone, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Name"
                value={phone.name}
                onChange={(e) => updatePhone(i, 'name', e.target.value)}
                className="rounded-md border border-border px-3 py-2"
              />
              <input
                type="text"
                placeholder="Number"
                value={phone.number}
                onChange={(e) => updatePhone(i, 'number', e.target.value)}
                className="rounded-md border border-border px-3 py-2"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Addresses</label>
        <div className="space-y-2">
          {form.addresses.map((addr, i) => (
            <input
              key={i}
              type="text"
              value={addr}
              onChange={(e) => updateAddress(i, e.target.value)}
              className="w-full rounded-md border border-border px-3 py-2"
            />
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">LINE QR Note</label>
        <textarea
          rows={2}
          value={form.lineQrNote}
          onChange={(e) => setForm({ ...form, lineQrNote: e.target.value })}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <button
        onClick={() => onSave(form)}
        className="flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90"
      >
        <Save className="h-4 w-4" />
        Save Contact
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DYNAMIC PAGES EDITOR
// ═══════════════════════════════════════════════════════════════════════════════
function PagesEditor({ data, onSave }) {
  const [form, setForm] = useState(data || []);

  const addPage = () => {
    const slug = `page-${Date.now()}`;
    setForm([
      ...form,
      {
        id: slug,
        title: 'New Page',
        slug,
        content: '',
        enabled: true,
      },
    ]);
  };

  const updatePage = (index, field, value) => {
    const updated = [...form];
    updated[index] = { ...updated[index], [field]: value };
    setForm(updated);
  };

  const removePage = (index) => {
    if (confirm('Delete this page?')) {
      setForm(form.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dynamic Pages</h2>
      <p className="text-sm text-muted-foreground">
        Create custom pages that will automatically appear in the menu. Pages added here will use the same header and footer.
      </p>

      <div className="space-y-4">
        {form.map((page, i) => (
          <div key={page.id} className="rounded-md border border-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <input
                type="text"
                placeholder="Page Title"
                value={page.title}
                onChange={(e) => updatePage(i, 'title', e.target.value)}
                className="flex-1 rounded-md border border-border px-3 py-2 font-medium"
              />
              <button
                onClick={() => removePage(i)}
                className="ml-2 rounded-md bg-red-50 px-3 text-red-600 hover:bg-red-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                URL Slug: /page/{page.slug}
              </label>
              <input
                type="text"
                placeholder="slug"
                value={page.slug}
                onChange={(e) => updatePage(i, 'slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Content (HTML supported)
              </label>
              <textarea
                rows={6}
                placeholder="Page content..."
                value={page.content}
                onChange={(e) => updatePage(i, 'content', e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={page.enabled}
                onChange={(e) => updatePage(i, 'enabled', e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm">Enable this page</span>
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={addPage}
        className="rounded-md bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80"
      >
        + Add New Page
      </button>

      <button
        onClick={() => onSave(form)}
        className="flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90"
      >
        <Save className="h-4 w-4" />
        Save Pages
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RSS FEEDS EDITOR
// ═══════════════════════════════════════════════════════════════════════════════
function RssEditor({ data, onSave }) {
  const [form, setForm] = useState(data || []);

  const addFeed = () => {
    setForm([
      ...form,
      {
        id: `feed-${Date.now()}`,
        name: 'New Feed',
        url: '',
        enabled: true,
      },
    ]);
  };

  const updateFeed = (index, field, value) => {
    const updated = [...form];
    updated[index] = { ...updated[index], [field]: value };
    setForm(updated);
  };

  const removeFeed = (index) => {
    if (confirm('Delete this RSS feed?')) {
      setForm(form.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">RSS Feeds</h2>
      <p className="text-sm text-muted-foreground">
        Configure multiple RSS feeds. Each feed will be processed and archived separately.
      </p>

      <div className="space-y-4">
        {form.map((feed, i) => (
          <div key={feed.id} className="rounded-md border border-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <input
                type="text"
                placeholder="Feed Name"
                value={feed.name}
                onChange={(e) => updateFeed(i, 'name', e.target.value)}
                className="flex-1 rounded-md border border-border px-3 py-2 font-medium"
              />
              <button
                onClick={() => removeFeed(i)}
                className="ml-2 rounded-md bg-red-50 px-3 text-red-600 hover:bg-red-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                RSS URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/rss"
                value={feed.url}
                onChange={(e) => updateFeed(i, 'url', e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={feed.enabled}
                onChange={(e) => updateFeed(i, 'enabled', e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm">Enable this feed</span>
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={addFeed}
        className="rounded-md bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80"
      >
        + Add New Feed
      </button>

      <button
        onClick={() => onSave(form)}
        className="flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90"
      >
        <Save className="h-4 w-4" />
        Save RSS Feeds
      </button>
    </div>
  );
}

export default Admin;
