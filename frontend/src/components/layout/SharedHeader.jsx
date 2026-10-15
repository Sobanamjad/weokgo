import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

function SharedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const location = useLocation();
  const { siteData } = useSite();
  const { header, dynamicPages } = siteData;

  // Combine static menu items with dynamic pages
  const allMenuItems = [
    ...header.menuItems,
    ...(dynamicPages || [])
      .filter(page => page.enabled)
      .map(page => ({
        label: page.title,
        path: `/page/${page.slug}`,
      })),
  ];

  return (
    <header className="relative sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="container-academic flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link className="flex flex-col leading-tight" to="/" onClick={closeMenu}>
          <span className="font-heading text-lg font-bold tracking-wide md:text-xl">
            {header.siteName}
          </span>
          <span className="text-[11px] text-accent-light md:text-xs">
            {header.tagline}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {allMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm transition-colors hover:text-accent-light ${
                  isActive ? 'text-accent-light' : 'text-primary-foreground/85'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            to={header.ctaPath}
          >
            {header.ctaLabel}
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden"
          type="button"
          aria-label={menuOpen ? '關閉選單' : '開啟選單'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="absolute left-0 top-full z-50 flex w-full flex-col bg-primary text-primary-foreground shadow-lg lg:hidden">
          {allMenuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={closeMenu}
              className={`border-b border-white/10 px-6 py-4 ${
                location.pathname === item.path ? 'text-accent-light' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to={header.ctaPath}
            onClick={closeMenu}
            className="bg-accent px-6 py-4 font-medium text-accent-foreground"
          >
            {header.ctaLabel}
          </Link>
        </nav>
      )}
    </header>
  );
}

export default SharedHeader;
