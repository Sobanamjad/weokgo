import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';

function SharedFooter() {
  const { siteData } = useSite();
  const { header, footer, dynamicPages } = siteData;

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
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-academic py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-xl font-bold text-primary-foreground">
                {footer.siteName}
              </span>
              <span className="text-sm text-accent-light">
                {footer.tagline}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary-foreground/75">
              {footer.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-accent-light">
              網站導覽
            </h3>
            <ul className="grid gap-2 text-sm">
              {allMenuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    className="text-secondary-foreground/80 transition-colors hover:text-primary-foreground"
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="text-secondary-foreground/80 transition-colors hover:text-primary-foreground"
                  to={header.ctaPath}
                >
                  {header.ctaLabel}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-accent-light">
              服務對象
            </h3>
            <ul className="grid gap-2 text-sm text-secondary-foreground/80">
              {footer.serviceTargets.map((target) => (
                <li key={target}>{target}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-secondary-foreground/15 pt-6 text-xs text-secondary-foreground/60">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}

export default SharedFooter;
