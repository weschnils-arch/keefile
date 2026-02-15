import { X, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function ProblemSolution() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  return (
    <section
      ref={ref}
      className="section-padding bg-muted/30"
      aria-labelledby="problem-heading"
    >
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Problem Section */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Section Label */}
            <span className="label-text text-destructive">
              {t('problem.sectionTitle') as string}
            </span>

            {/* Headline */}
            <h2
              id="problem-heading"
              className="heading-2 text-foreground"
            >
              {isLight
                ? (t('problem.light.headline') as string)
                : (t('problem.dark.headline') as string)}
            </h2>

            {/* Problem Text */}
            <div
              className={`p-6 rounded-xl border-l-4 ${
                isLight
                  ? 'bg-white border-destructive shadow-card'
                  : 'bg-card border-destructive shadow-dark-card'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-destructive" aria-hidden="true" />
                </span>
                <p className="body-text text-foreground/80">
                  {isLight
                    ? (t('problem.light.text') as string)
                    : (t('problem.dark.text') as string)}
                </p>
              </div>
            </div>

            {/* Problem Image */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src="/images/kf-RM_0002 1.webp"
                alt="Close-up showing traditional nail file problems"
                className="w-full h-48 md:h-64 object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Solution Section */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Section Label */}
            <span
              className={`label-text ${
                isLight ? 'text-[#D4A574]' : 'text-[#00D9FF]'
              }`}
            >
              {t('solution.sectionTitle') as string}
            </span>

            {/* Headline */}
            <h2 className="heading-2 text-foreground">
              {isLight
                ? (t('solution.light.headline') as string)
                : (t('solution.dark.headline') as string)}
            </h2>

            {/* Solution Text */}
            <div
              className={`p-6 rounded-xl border-l-4 ${
                isLight
                  ? 'bg-white border-[#D4A574] shadow-card'
                  : 'bg-card border-[#00D9FF] shadow-dark-card'
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isLight ? 'bg-[#D4A574]/10' : 'bg-[#00D9FF]/10'
                  }`}
                >
                  <Check
                    className={`w-5 h-5 ${
                      isLight ? 'text-[#D4A574]' : 'text-[#00D9FF]'
                    }`}
                    aria-hidden="true"
                  />
                </span>
                <p className="body-text text-foreground/80">
                  {isLight
                    ? (t('solution.light.text') as string)
                    : (t('solution.dark.text') as string)}
                </p>
              </div>
            </div>

            {/* Solution Image */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={isLight ? '/images/10.webp' : '/images/7.webp'}
                alt="Keefile solution showing premium design"
                className="w-full h-48 md:h-64 object-contain bg-gradient-to-br from-transparent to-muted/30"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
