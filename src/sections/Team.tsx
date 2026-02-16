import { useTheme } from '@/contexts/ThemeContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '3+', label: 'Years' },
  { value: '50+', label: 'Iterations' },
  { value: '4', label: 'Precision Grits' },
  { value: '∞', label: 'Lifetime' },
];

export function Team() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const isLight = theme === 'light';

  return (
    <section
      ref={ref}
      id="about"
      className="section-padding relative overflow-hidden"
      aria-labelledby="team-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="https://placehold.co/1200x700/1a1a1a/333?text=German+Precision+Workshop"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay */}
        <div
          className={`absolute inset-0 ${
            isLight
              ? 'bg-[#FAFAFA]/85 backdrop-blur-sm'
              : 'bg-[#0A0A0A]/85 backdrop-blur-sm'
          }`}
        />
      </div>

      <div className="container-max relative z-10">
        <div className="flex justify-center">
          {/* Glass Container */}
          <div
            className={`glass w-full lg:w-[65%] p-8 md:p-12 lg:p-14 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Kicker */}
            <span className="kicker block mb-4">About Us</span>

            {/* Headline */}
            <h2
              id="team-heading"
              className="heading-2 text-foreground mb-6"
            >
              Three Years. Zero Compromise.
            </h2>

            {/* Body */}
            <p className="body-text text-muted-foreground leading-relaxed mb-10 max-w-[600px]">
              Behind Keefile are three years of relentless development, countless
              prototypes, and an obsession with getting every detail right. Our
              team of engineers and material scientists did not stop until every
              surface, every edge, and every curve met the highest standard. The
              result is not just a nail file. It is a statement.
            </p>

            {/* Stats Row */}
            <div
              className={`glass p-6 md:p-8 transition-all duration-700 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                role="list"
                aria-label="Key statistics"
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center transition-all duration-500 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                    role="listitem"
                  >
                    <span
                      className="block text-3xl md:text-4xl lg:text-5xl font-bold leading-none mb-2"
                      style={{ color: 'var(--kf-accent)' }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                      {stat.label}
                    </span>
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
