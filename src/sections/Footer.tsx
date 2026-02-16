import { Instagram } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#about', label: 'About Us' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ];

  const legalLinks = [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms & Conditions' },
    { href: '#', label: 'Imprint' },
  ];

  return (
    <footer
      className={`relative ${
        isLight ? 'bg-[#1D1D1F]' : 'bg-[#0A0A0A]'
      }`}
      style={{
        borderTop: isLight
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(255,255,255,0.06)',
      }}
      role="contentinfo"
    >
      <div className="container-max py-16 px-6 sm:px-8 lg:px-12">
        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {/* Column 1 — Brand */}
          <div className="space-y-5">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="inline-block focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md"
              aria-label="Keefile - Home"
            >
              <img
                src="/images/keefile-logo.png"
                alt="Keefile"
                className="h-8 w-auto"
              />
            </a>
            <p className="text-white/50 text-sm leading-relaxed max-w-[260px]">
              The Porsche under the nail files.
            </p>
          </div>

          {/* Column 2 — Navigation Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[2px] text-white/30 mb-5">
              Navigate
            </h3>
            <ul className="space-y-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal & Social */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[2px] text-white/30 mb-5">
              Legal
            </h3>
            <ul className="space-y-3 mb-8" role="list">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com/keefile"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-[var(--kf-accent)] hover:text-black transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white/60 group-hover:text-black" />
              </a>
              {/* TikTok */}
              <a
                href="https://tiktok.com/@keefile"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-[var(--kf-accent)] hover:text-black transition-all duration-200"
                aria-label="TikTok"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.22 8.22 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.14z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8">
          <p className="text-white/30 text-xs text-center tracking-wide">
            &copy; 2026 Keefile. Engineered in Germany.
          </p>
        </div>
      </div>
    </footer>
  );
}
