import { ArrowRight, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Hero() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const badges = isLight
    ? [
        t('hero.badge.germany'),
        t('hero.badge.sustainable'),
        t('hero.badge.warranty'),
      ]
    : [
        t('hero.badge.engineering'),
        t('hero.badge.excellence'),
        t('hero.badge.durability'),
      ];

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Images — both rendered, crossfade on theme toggle */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img
          src="/images/Lightmode.webp"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            isLight ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />
        <img
          src="/images/darkmode.webp"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            isLight ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
        />
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-[#1A1A1A]/50 ${
            isLight ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Bottom gradient — 20% height, solid at bottom fading to transparent */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] h-[35vh] pointer-events-none"
        aria-hidden="true"
      >
        {/* Light mode gradient: white */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#F5F3F0] via-[#F5F3F0]/60 to-transparent transition-opacity duration-700 ${
            isLight ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Dark mode gradient: black */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent transition-opacity duration-700 ${
            isLight ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* ─── TOP: Badges + Headline ─── */}
      <div
        className={`relative z-10 flex-shrink-0 w-full pt-28 md:pt-36 px-6 sm:px-8 lg:px-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-full flex flex-col items-center text-center">
          {/* Trust Badges */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8"
            role="list"
            aria-label="Product badges"
          >
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full backdrop-blur-sm transition-colors duration-700 ${
                  isLight
                    ? 'bg-[#D4A574]/20 text-[#C49060]'
                    : 'bg-[#00D9FF]/20 text-[#00D9FF]'
                }`}
                role="listitem"
              >
                <Check className="w-3 h-3" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="heading-1 text-foreground text-center"
          >
            {isLight ? t('hero.light.headline') : t('hero.dark.headline')}
          </h1>

          {/* Subheadline */}
          <p className="heading-3 text-foreground/70 text-center mt-4 md:mt-6">
            {isLight ? t('hero.light.subheadline') : t('hero.dark.subheadline')}
          </p>
        </div>
      </div>

      {/* ─── MIDDLE: Clean & Empty (product shows through bg) ─── */}
      <div className="relative z-10 flex-1" />

      {/* ─── BOTTOM: Description (2 lines) + CTA, sits on top of gradient ─── */}
      <div
        className={`relative z-10 flex-shrink-0 w-full pb-10 md:pb-14 px-6 sm:px-8 lg:px-12 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-full flex flex-col items-center text-center">
          {/* Description — two explicit lines */}
          <div className="body-text text-foreground/80 text-center mb-6">
            <p className="lg:whitespace-nowrap">
              {isLight ? t('hero.light.description.line1') : t('hero.dark.description.line1')}
            </p>
            <p>
              {isLight ? t('hero.light.description.line2') : t('hero.dark.description.line2')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary group"
              size="lg"
            >
              {t('hero.cta.primary')}
              <ArrowRight
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
            <Button
              onClick={() => scrollToSection('#features')}
              variant="outline"
              className="btn-secondary"
              size="lg"
            >
              {t('hero.cta.secondary')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
