import { Crosshair, Infinity, Layers, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const benefits = [
  {
    icon: Crosshair,
    title: 'Surgical Precision',
    description: 'Every surface is micrometer-ground for flawless, reproducible results.',
  },
  {
    icon: Infinity,
    title: 'Built Forever',
    description: 'Forged from corrosion-resistant alloys. Zero performance loss. Ever.',
  },
  {
    icon: Layers,
    title: '4-in-1 Design',
    description: 'Shape. Smooth. Refine. Polish. One tool does it all.',
  },
  {
    icon: Shield,
    title: 'Made in Germany',
    description: 'Precision-engineered and quality-controlled to German industrial standards.',
  },
];

export function Benefits() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  return (
    <section
      ref={ref}
      id="benefits"
      className="relative section-spacing overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Gold orb */}
        <div
          className="orb w-[600px] h-[600px] top-[-10%] right-[10%]"
          style={{
            background: isLight
              ? 'rgba(183, 110, 121, 0.08)'
              : 'rgba(201, 169, 110, 0.1)',
          }}
        />
        {/* Silver orb */}
        <div
          className="orb w-[500px] h-[500px] bottom-[-5%] left-[5%]"
          style={{
            background: isLight
              ? 'rgba(160, 160, 170, 0.08)'
              : 'rgba(200, 200, 210, 0.06)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="kicker block mb-4">WHY KEEFILE?</span>
          <h2 id="benefits-heading" className="heading-2 text-foreground">
            Four Reasons. Zero Doubt.
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div
          className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
          role="list"
          aria-label="Product benefits"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`glass glass-hover group p-6 md:p-8 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${(index + 1) * 120}ms`,
                  borderColor: 'var(--glass-border)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = isLight
                    ? 'rgba(183, 110, 121, 0.4)'
                    : 'rgba(201, 169, 110, 0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)';
                }}
                role="listitem"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 ${
                    isLight
                      ? 'bg-[#B76E79]/10 group-hover:bg-[#B76E79]/20'
                      : 'bg-[#C9A96E]/10 group-hover:bg-[#C9A96E]/20'
                  }`}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: 'var(--kf-accent)' }}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="heading-3 text-foreground mb-3">{benefit.title}</h3>

                {/* Description */}
                <p className="body-text text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
