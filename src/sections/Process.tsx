import { useTheme } from '@/contexts/ThemeContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Choose Your Colors',
    description:
      'Pick the combination for your two Keefiles — Bronze, Black, or one of each.',
  },
  {
    number: '02',
    title: 'Secure Your Offer',
    description:
      'Complete your order through our encrypted, GDPR-compliant checkout.',
  },
  {
    number: '03',
    title: 'Receive a Tool for Life',
    description:
      'Precision-manufactured in Germany. Quality-tested. Delivered to your door.',
  },
];

export function Process() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const isLight = theme === 'light';

  return (
    <section
      ref={ref}
      id="process"
      className="section-padding relative overflow-hidden bg-background"
      aria-labelledby="process-heading"
    >
      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Image */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://placehold.co/800x600/1a1a1a/666?text=4-in-1+Surface+Diagram"
                alt="Keefile 4-in-1 surface diagram showing four precision filing grits"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div
                className={`absolute inset-0 ${
                  isLight
                    ? 'bg-gradient-to-tr from-[#B76E79]/10 to-transparent'
                    : 'bg-gradient-to-tr from-[#C9A96E]/10 to-transparent'
                }`}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Right — Steps */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Header */}
            <div className="mb-10">
              <span className="kicker block mb-4">How It Works</span>
              <h2
                id="process-heading"
                className="heading-2 text-foreground"
              >
                Three Steps. That&rsquo;s It.
              </h2>
            </div>

            {/* Steps Container */}
            <div className="glass p-8 md:p-10">
              <div className="space-y-8" role="list" aria-label="Process steps">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`flex gap-5 md:gap-6 transition-all duration-500 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }`}
                    style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                    role="listitem"
                  >
                    {/* Step Number */}
                    <span
                      className="flex-shrink-0 text-4xl md:text-5xl font-bold leading-none mt-1"
                      style={{ color: 'var(--kf-accent)', opacity: 0.35 }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>

                    {/* Step Content */}
                    <div>
                      <h3 className="heading-3 text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="body-text text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
