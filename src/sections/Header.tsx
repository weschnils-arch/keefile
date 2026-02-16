import { useState, useEffect } from 'react';
import { Menu, Sun, Moon, Globe, ShoppingBag } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCheckout } from '@/contexts/CheckoutContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { openCheckout } = useCheckout();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: t('nav.home') as string },
    { href: '#features', label: t('nav.features') as string },
    { href: '#about', label: t('nav.about') as string },
    { href: '#faq', label: t('nav.faq') as string },
    { href: '#contact', label: t('nav.contact') as string },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="container-max">
          <nav
            className="flex items-center justify-between h-16 md:h-20 px-6 sm:px-8 lg:px-12"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md"
              aria-label="Keefile - Home"
            >
              <img
                src="/images/keefile-logo.png"
                alt="Keefile"
                className={`h-8 md:h-10 w-auto transition-all duration-700 ${
                  theme === 'light' ? 'brightness-0' : ''
                }`}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-6" role="menubar">
                {navItems.map((item) => (
                  <li key={item.href} role="none">
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md px-4 py-1"
                      role="menuitem"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* Language Switcher */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label={`Switch to ${language === 'de' ? 'English' : 'German'}`}
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span>{t('lang.de') as string}/{t('lang.en') as string}</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? (
                    <Sun className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Moon className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>

                {/* Cart Icon */}
                <button
                  onClick={openCheckout}
                  className="p-2 rounded-md hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label="Open cart"
                >
                  <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                </button>

                {/* CTA Button — opens checkout */}
                <Button
                  onClick={openCheckout}
                  className="btn-primary text-sm"
                >
                  {t('nav.preorder') as string}
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button
                  className="p-2 rounded-md hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label="Open menu"
                  aria-expanded={isOpen}
                >
                  <Menu className="w-6 h-6" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col h-full pt-8">
                  <nav className="flex-1" aria-label="Mobile navigation">
                    <ul className="space-y-4" role="menu">
                      {navItems.map((item) => (
                        <li key={item.href} role="none">
                          <a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(item.href);
                            }}
                            className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2 focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md"
                            role="menuitem"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="border-t pt-6 space-y-4">
                    {/* Mobile Controls */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
                      >
                        <Globe className="w-4 h-4" />
                        <span>{language === 'de' ? 'DE' : 'EN'}</span>
                      </button>

                      <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                      >
                        {theme === 'light' ? (
                          <Sun className="w-5 h-5" />
                        ) : (
                          <Moon className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    <Button
                      onClick={() => { setIsOpen(false); openCheckout(); }}
                      className="btn-primary w-full"
                    >
                      {t('nav.preorder') as string}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>
    </>
  );
}
