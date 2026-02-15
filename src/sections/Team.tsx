import { Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Team() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  const valuesKey = isLight ? 'team.values' : 'team.values.dark';
  const valuesRaw = t(valuesKey) as string;
  let values: string[] = [];
  try {
    values = JSON.parse(valuesRaw);
  } catch {
    values = [];
  }

  return (
    <section
      ref={ref}
      id="about"
      className="section-padding bg-muted/30"
      aria-labelledby="team-heading"
    >
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Section Label */}
            <span className="label-text text-primary">
              {t('team.sectionTitle') as string}
            </span>

            {/* Headline */}
            <h2
              id="team-heading"
              className="heading-2 text-foreground"
            >
              {isLight
                ? (t('team.light.headline') as string)
                : (t('team.dark.headline') as string)}
            </h2>

            {/* Description */}
            <p className="body-text text-muted-foreground">
              {isLight
                ? (t('team.light.description') as string)
                : (t('team.dark.description') as string)}
            </p>

            {/* Values List */}
            <ul
              className="grid sm:grid-cols-2 gap-4 pt-4"
              role="list"
              aria-label="Company values"
            >
              {values.map((value, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      isLight ? 'bg-[#D4A574]/10' : 'bg-[#00D9FF]/10'
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 ${
                        isLight ? 'text-[#D4A574]' : 'text-[#00D9FF]'
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-foreground font-medium">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Background Decoration */}
              <div
                className={`absolute -inset-4 rounded-3xl opacity-20 ${
                  isLight ? 'bg-[#D4A574]/20' : 'bg-[#00D9FF]/20'
                }`}
                aria-hidden="true"
              />

              {/* Main Image */}
              <div
                className={`relative rounded-2xl overflow-hidden ${
                  isLight
                    ? 'bg-white shadow-card'
                    : 'bg-card shadow-dark-card'
                }`}
              >
                <img
                  src={isLight ? '/images/casebronze 2.webp' : '/images/casedark 1.webp'}
                  alt="Keefile premium case design"
                  className="w-full h-auto object-contain p-8"
                  loading="lazy"
                />
              </div>

              {/* Floating Badge */}
              <div
                className={`absolute -bottom-4 -left-4 px-6 py-3 rounded-xl ${
                  isLight
                    ? 'bg-[#D4A574] text-white shadow-lg'
                    : 'bg-[#00D9FF] text-[#1A1A1A] shadow-lg'
                }`}
              >
                <span className="text-sm font-bold">3+ Years</span>
                <span className="block text-xs opacity-80">Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
