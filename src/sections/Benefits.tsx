import { Leaf, Infinity, Sparkles, Recycle, Award, Users } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const lightIcons = [Leaf, Infinity, Sparkles, Recycle, Award, Users];
const darkIcons = [Award, Infinity, Sparkles, Award, Award, Sparkles];

interface BenefitItem {
  title: string;
  description: string;
}

export function Benefits() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';
  const icons = isLight ? lightIcons : darkIcons;

  const itemsKey = isLight ? 'benefits.light.items' : 'benefits.dark.items';
  const itemsRaw = t(itemsKey) as string;
  let items: BenefitItem[] = [];
  try {
    items = JSON.parse(itemsRaw);
  } catch {
    items = [];
  }

  return (
    <section
      ref={ref}
      className="section-padding bg-background"
      aria-labelledby="benefits-heading"
    >
      <div className="container-max">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="label-text text-primary block mb-4">
            {t('benefits.sectionTitle') as string}
          </span>
          <h2
            id="benefits-heading"
            className="heading-2 text-foreground"
          >
            {isLight
              ? (t('benefits.light.title') as string)
              : (t('benefits.dark.title') as string)}
          </h2>
        </div>

        {/* Benefits Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Product benefits"
        >
          {items.map((item, index) => {
            const Icon = icons[index] || Award;
            return (
              <div
                key={index}
                className={`group p-6 rounded-2xl transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                } ${
                  isLight
                    ? 'bg-white shadow-card hover:shadow-card-hover'
                    : 'bg-card shadow-dark-card hover:shadow-dark-card-hover'
                } hover:-translate-y-1`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                role="listitem"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                    isLight
                      ? 'bg-[#D4A574]/10 group-hover:bg-[#D4A574]/20'
                      : 'bg-[#00D9FF]/10 group-hover:bg-[#00D9FF]/20'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isLight ? 'text-[#D4A574]' : 'text-[#00D9FF]'
                    }`}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
