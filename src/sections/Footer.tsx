import { Instagram, Facebook, Linkedin, Twitter, Mail, Phone } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const isLight = theme === 'light';

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const productLinks = [
    { href: '#features', label: t('nav.features') as string },
    { href: '#contact', label: 'Pricing' },
    { href: '#faq', label: t('nav.faq') as string },
    { href: '#process', label: 'How It Works' },
  ];

  const companyLinks = [
    { href: '#about', label: t('nav.about') as string },
    { href: '#contact', label: t('nav.contact') as string },
    { href: '#', label: 'Sustainability' },
    { href: '#', label: 'Blog' },
  ];

  const legalLinks = [
    { href: '#', label: language === 'de' ? 'Impressum' : 'Imprint' },
    { href: '#', label: language === 'de' ? 'Datenschutz' : 'Privacy' },
    { href: '#', label: language === 'de' ? 'AGB' : 'Terms' },
    { href: '#', label: 'Cookies' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', handle: '@keefile' },
    { icon: Facebook, href: '#', label: 'Facebook', handle: 'Keefile' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', handle: 'Keefile' },
    { icon: Twitter, href: '#', label: 'Twitter', handle: '@keefile' },
  ];

  return (
    <footer
      className="bg-foreground text-background"
      role="contentinfo"
    >
      <div className="container-max py-16 px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="inline-block text-2xl font-bold mb-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-background rounded-md"
            >
              keefile
            </a>
            <p className="text-background/70 text-sm leading-relaxed max-w-xs">
              {t('footer.about') as string}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              {t('footer.product') as string}
            </h3>
            <ul className="space-y-3" role="list">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-background/70 hover:text-background transition-colors text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-background rounded-md"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              {t('footer.company') as string}
            </h3>
            <ul className="space-y-3" role="list">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-background/70 hover:text-background transition-colors text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-background rounded-md"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              {t('footer.legal') as string}
            </h3>
            <ul className="space-y-3" role="list">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-background rounded-md"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
              {t('footer.contact') as string}
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <a
                href="mailto:info@keefile.com"
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-background rounded-md"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                info@keefile.com
              </a>
              <span className="flex items-center gap-2 text-background/70 text-sm">
                <Phone className="w-4 h-4" aria-hidden="true" />
                +49 (0) XXX XXXXXXX
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-background ${
                    isLight
                      ? 'bg-background/10 hover:bg-[#D4A574]'
                      : 'bg-background/10 hover:bg-[#00D9FF]'
                  } hover:text-foreground`}
                  aria-label={`${social.label}: ${social.handle}`}
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm text-center md:text-left">
              {t('footer.copyright') as string}
            </p>
            
            {/* Trust Badges */}
            <div
              className="flex items-center gap-4"
              aria-label="Trust badges"
            >
              <span className="text-xs text-background/50 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
                SSL Secure
              </span>
              <span className="text-xs text-background/50 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true" />
                Made in Germany
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
