import { Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function ProductSection() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  const benefitsKey = isLight ? 'product.benefits' : 'product.benefits.dark';
  const benefitsRaw = t(benefitsKey) as string;
  let benefits: string[] = [];
  try {
    benefits = JSON.parse(benefitsRaw);
  } catch {
    benefits = [];
  }

  return (
    <section
      ref={ref}
      id="features"
      className="section-padding bg-background"
      aria-labelledby="product-heading"
    >
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Product Image */}
          <div
            className={`relative order-2 lg:order-1 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Background Shape */}
              <div
                className={`absolute -inset-4 rounded-3xl opacity-20 ${
                  isLight ? 'bg-[#D4A574]/20' : 'bg-[#00D9FF]/20'
                }`}
                aria-hidden="true"
              />

              <img
                src={isLight ? '/images/filebronze 1.webp' : '/images/9.webp'}
                alt="Keefile product detail showing 4 different filing surfaces"
                className="relative z-10 w-full max-w-md mx-auto h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`order-1 lg:order-2 space-y-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Section Label */}
            <span className="label-text text-primary">
              {t('product.sectionTitle') as string}
            </span>

            {/* Headline */}
            <h2
              id="product-heading"
              className="heading-2 text-foreground"
            >
              {isLight
                ? (t('product.light.headline') as string)
                : (t('product.dark.headline') as string)}
            </h2>

            {/* Description */}
            <p className="body-text text-muted-foreground">
              {isLight
                ? (t('product.light.description') as string)
                : (t('product.dark.description') as string)}
            </p>

            {/* Benefits List */}
            <ul
              className="space-y-4 pt-4"
              role="list"
              aria-label="Product benefits"
            >
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
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
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
