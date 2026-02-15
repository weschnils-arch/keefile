import { useState, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type ProductColor = 'bronze' | 'black';

export function Hero() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';
  const [productColor, setProductColor] = useState<ProductColor>(isLight ? 'bronze' : 'black');

  // Sync default color when theme changes
  useEffect(() => {
    setProductColor(isLight ? 'bronze' : 'black');
  }, [isLight]);
  const isBronze = productColor === 'bronze';

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleColor = () => {
    setProductColor(prev => prev === 'bronze' ? 'black' : 'bronze');
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

  // Determine which of the 4 images is active
  const showLightBronze = isLight && isBronze;
  const showLightBlack = isLight && !isBronze;
  const showDarkBronze = !isLight && isBronze;
  const showDarkBlack = !isLight && !isBronze;

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Images — all 4 rendered, crossfade on theme + color toggle */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img
          src="/images/Lightmode_Bronze.webp"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            showLightBronze ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />
        <img
          src="/images/Lightmode_Black.webp"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            showLightBlack ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />
        <img
          src="/images/Darkmode_Bronze.webp"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            showDarkBronze ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />
        <img
          src="/images/Darkmode_Black.webp"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            showDarkBlack ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] h-[35vh] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent transition-opacity duration-700 ${
            isLight ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* ─── TOP: Headline + Subheadline + Color Switcher ─── */}
      <div
        className={`relative z-10 flex-shrink-0 w-full pt-28 md:pt-36 px-6 sm:px-8 lg:px-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-full flex flex-col items-center text-center">
          {/* Headline */}
          <h1
            id="hero-heading"
            className="heading-1 text-foreground text-center uppercase"
          >
            {isLight ? t('hero.light.headline') : t('hero.dark.headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-xl lg:text-2xl text-foreground/70 text-center mt-2 md:mt-3 tracking-wide">
            {isLight ? t('hero.light.subheadline') : t('hero.dark.subheadline')}
          </p>

          {/* ─── Color Switcher Pill ─── */}
          <div className="mt-5 md:mt-6">
            <button
              onClick={toggleColor}
              className={`
                relative flex items-center w-[200px] h-[48px] rounded-full cursor-pointer
                backdrop-blur-xl border transition-all duration-700
                ${isLight
                  ? 'bg-white/30 border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
                  : 'bg-white/10 border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
                }
              `}
              aria-label={`Switch to ${isBronze ? 'Black' : 'Bronze'} color`}
            >
              {/* Sliding indicator */}
              <div
                className={`
                  absolute top-[4px] w-[96px] h-[40px] rounded-full
                  transition-all duration-500 ease-in-out
                  backdrop-blur-sm
                  ${isLight
                    ? 'bg-white/60 shadow-md'
                    : 'bg-white/20 shadow-lg'
                  }
                  ${isBronze ? 'left-[4px]' : 'left-[100px]'}
                `}
              />

              {/* Bronze label */}
              <span
                className={`
                  relative z-10 flex-1 text-center text-xs font-bold uppercase tracking-wider
                  transition-colors duration-500
                  ${isBronze
                    ? (isLight ? 'text-[#4A3D2E]' : 'text-[#9A7B5B]')
                    : (isLight ? 'text-foreground/40' : 'text-white/40')
                  }
                `}
              >
                Bronze
              </span>

              {/* Black label */}
              <span
                className={`
                  relative z-10 flex-1 text-center text-xs font-bold uppercase tracking-wider
                  transition-colors duration-500
                  ${!isBronze
                    ? (isLight ? 'text-foreground' : 'text-white')
                    : (isLight ? 'text-foreground/40' : 'text-white/40')
                  }
                `}
              >
                Black
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── MIDDLE: Clean & Empty (product shows through bg) ─── */}
      <div className="relative z-10 flex-1" />

      {/* ─── BOTTOM: CTA Buttons + Trust Badges ─── */}
      <div
        className={`relative z-10 flex-shrink-0 w-full pb-10 md:pb-14 mb-[5vh] px-6 sm:px-8 lg:px-12 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-full flex flex-col items-center text-center">
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
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

          {/* Trust Badges */}
          <div
            className="flex flex-wrap justify-center gap-2"
            role="list"
            aria-label="Product badges"
          >
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full backdrop-blur-sm transition-colors duration-700 ${
                  isLight
                    ? 'bg-[#D4A574]/20 text-[#C49060]'
                    : 'bg-white/15 text-white'
                }`}
                role="listitem"
              >
                <Check className="w-3 h-3" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
