import { useTheme } from '@/contexts/ThemeContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function ProblemSolution() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  const dangerColor = isLight ? '#FF3B30' : '#FF453A';
  const successColor = isLight ? '#34C759' : '#30D158';

  return (
    <section
      ref={ref}
      id="problem"
      className="relative section-spacing overflow-hidden"
      aria-labelledby="problem-heading"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Red orb behind Problem card */}
        <div
          className="orb w-[500px] h-[500px] top-[10%] left-[5%]"
          style={{
            background: isLight
              ? 'rgba(255, 59, 48, 0.08)'
              : 'rgba(255, 69, 58, 0.1)',
          }}
        />
        {/* Green orb behind Solution card */}
        <div
          className="orb w-[500px] h-[500px] bottom-[10%] right-[5%]"
          style={{
            background: isLight
              ? 'rgba(52, 199, 89, 0.08)'
              : 'rgba(48, 209, 88, 0.1)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Problem Card */}
          <div
            className={`glass p-6 md:p-8 lg:p-10 flex flex-col transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Image */}
            <div className="rounded-2xl overflow-hidden mb-6">
              <img
                src={
                  isLight
                    ? 'https://placehold.co/600x400/f5f0eb/999?text=Disposable+Nail+Files'
                    : 'https://placehold.co/600x400/1a1a1a/666?text=Disposable+Nail+Files'
                }
                alt="Disposable nail files illustrating the throwaway cycle"
                className="w-full h-48 md:h-56 object-cover"
                loading="lazy"
              />
            </div>

            {/* Kicker */}
            <span
              className={`kicker block mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ color: dangerColor }}
            >
              THE PROBLEM
            </span>

            {/* Headline */}
            <h2
              id="problem-heading"
              className={`heading-2 text-foreground mb-4 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              The Throwaway Cycle.
            </h2>

            {/* Body */}
            <p
              className={`body-text text-muted-foreground transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Cheap materials. Inconsistent grit. Zero durability. Conventional nail files are
              designed to be replaced — not to perform. They deliver uneven results and create
              unnecessary waste. This is not a user problem. It is a design flaw.
            </p>
          </div>

          {/* Solution Card */}
          <div
            className={`glass p-6 md:p-8 lg:p-10 flex flex-col transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Image */}
            <div className="rounded-2xl overflow-hidden mb-6">
              <img
                src={
                  isLight
                    ? 'https://placehold.co/600x400/f5f0eb/999?text=Keefile+Premium+Display'
                    : 'https://placehold.co/600x400/1a1a1a/666?text=Keefile+Premium+Display'
                }
                alt="Keefile premium display showing the permanent upgrade"
                className="w-full h-48 md:h-56 object-cover"
                loading="lazy"
              />
            </div>

            {/* Kicker */}
            <span
              className={`kicker block mb-4 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ color: successColor }}
            >
              THE SOLUTION
            </span>

            {/* Headline */}
            <h2
              className={`heading-2 text-foreground mb-4 transition-all duration-700 delay-[400ms] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              The Permanent Upgrade.
            </h2>

            {/* Body */}
            <p
              className={`body-text text-muted-foreground transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              One tool. Four precision surfaces. Zero degradation. Keefile replaces a drawer full
              of disposables with a single, indestructible instrument engineered for consistent
              perfection — use after use, year after year, decade after decade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
