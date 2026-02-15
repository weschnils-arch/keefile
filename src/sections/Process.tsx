import { Package, ClipboardCheck, Truck, Gift, Award } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const icons = [Package, ClipboardCheck, Truck, Gift, Award];

interface ProcessStep {
  title: string;
  description: string;
}

export function Process() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  const stepsKey = isLight ? 'process.light.steps' : 'process.dark.steps';
  const stepsRaw = t(stepsKey) as string;
  let steps: ProcessStep[] = [];
  try {
    steps = JSON.parse(stepsRaw);
  } catch {
    steps = [];
  }

  return (
    <section
      ref={ref}
      className="section-padding bg-background"
      aria-labelledby="process-heading"
    >
      <div className="container-max">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="label-text text-primary block mb-4">
            {t('process.sectionTitle') as string}
          </span>
          <h2
            id="process-heading"
            className="heading-2 text-foreground"
          >
            {isLight
              ? (t('process.light.title') as string)
              : (t('process.dark.title') as string)}
          </h2>
        </div>

        {/* Process Steps */}
        <div
          className="relative max-w-4xl mx-auto"
          role="list"
          aria-label="Order process steps"
        >
          {/* Connector Line - Desktop */}
          <div
            className="absolute top-12 left-0 right-0 h-0.5 hidden lg:block"
            aria-hidden="true"
          >
            <div
              className={`h-full ${
                isLight ? 'bg-[#D4A574]/20' : 'bg-[#00D9FF]/20'
              }`}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = icons[index] || Package;
              return (
                <div
                  key={index}
                  className={`relative flex flex-col items-center text-center transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  role="listitem"
                >
                  {/* Step Number & Icon */}
                  <div
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center mb-5 z-10 ${
                      isLight
                        ? 'bg-white shadow-card'
                        : 'bg-card shadow-dark-card'
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        isLight
                          ? 'bg-[#D4A574]/10'
                          : 'bg-[#00D9FF]/10'
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          isLight ? 'text-[#D4A574]' : 'text-[#00D9FF]'
                        }`}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Step Number Badge */}
                    <span
                      className={`absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        isLight
                          ? 'bg-[#D4A574] text-white'
                          : 'bg-[#00D9FF] text-[#1A1A1A]'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
