import { Link } from "wouter";
import { Instagram, Facebook, Globe } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-subtle bg-muted/30 dark:bg-[hsl(0_0%_6%)] backdrop-blur-sm mt-auto shadow-lift-sm pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="brand-x h-8 w-8 text-xs" aria-hidden>
                X
              </span>
              <span className="font-black text-base tracking-[0.18em] uppercase leading-none">
                {t.brand}
                <span className="block text-[9px] font-bold tracking-[0.3em] text-muted-foreground">
                  {t.brandSuffix}
                </span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{f.tagline}</p>
            <div className="flex items-center gap-2 mt-4">
              <a
                href="https://www.instagram.com/cutx_eg/"
                target="_blank"
                rel="noreferrer"
                aria-label="Cut X on Instagram"
                className="h-9 w-9 rounded-[var(--radius-pill)] border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/p/Cut-X-100088062586202/"
                target="_blank"
                rel="noreferrer"
                aria-label="Cut X on Facebook"
                className="h-9 w-9 rounded-[var(--radius-pill)] border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <span
                className="h-9 px-3 rounded-[var(--radius-pill)] border border-border/60 hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex"
                title="cutx-egy.com"
              >
                <Globe className="h-3.5 w-3.5" />
                cutx-egy.com
              </span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{f.shop}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { href: "/shop?new=true", label: f.links.newArrivals },
                { href: "/shop?cat=Daily Essentials", label: f.links.daily },
                { href: "/shop?cat=Athletic Protection", label: f.links.athletic },
                { href: "/shop?cat=Security & Workwear", label: f.links.security },
                { href: "/shop?cat=Accessories", label: f.links.accessories },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <span className="hover:text-foreground transition-colors cursor-pointer">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{f.company}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { href: "/about", label: f.links.about },
                { href: "/contact", label: f.links.contact },
                { href: "/privacy", label: f.links.privacy },
                { href: "/terms", label: f.links.terms },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <span className="hover:text-foreground transition-colors cursor-pointer">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{f.newsletterTitle}</h4>
            <p className="text-sm text-muted-foreground mb-3">{f.newsletterNote}</p>
            <div className="flex p-1 bg-background border border-subtle rounded-[var(--radius-pill)] shadow-sm">
              <input
                type="email"
                placeholder={f.newsletterPlaceholder}
                aria-label={f.newsletterTitle}
                className="flex-1 min-w-0 bg-transparent px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none"
              />
              <button className="h-9 px-5 rounded-[var(--radius-pill)] bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shrink-0 whitespace-nowrap">
                {f.newsletterBtn}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {year} {t.brand} {t.brandSuffix}. {f.rights}</p>
          <p className="text-center">{f.demoLine}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy"><span className="hover:text-foreground transition-colors cursor-pointer">{f.links.privacy}</span></Link>
            <Link href="/terms"><span className="hover:text-foreground transition-colors cursor-pointer">{f.links.terms}</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
