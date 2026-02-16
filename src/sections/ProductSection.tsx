import { useTheme } from '@/contexts/ThemeContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const featurePills = ['4 Surfaces', 'Surgical Steel', 'Made in Germany', 'Lifetime Warranty'];

export function ProductSection() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  return (
    <section
      ref={ref}
      id="features"
      className="relative section-spacing overflow-hidden"
      aria-labelledby="product-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={
            isLight
              ? 'https://placehold.co/1200x800/f5f0eb/ccc?text=Keefile+Surface+Macro'
              : 'https://placehold.co/1200x800/1a1a1a/333?text=Keefile+Surface+Macro'
          }
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay */}
        <div
          className={`absolute inset-0 ${
            isLight
              ? 'bg-gradient-to-b from-white/70 via-white/50 to-white/70'
              : 'bg-gradient-to-b from-black/70 via-black/50 to-black/70'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max flex justify-center">
        <div
          className={`glass w-[90%] md:w-[60%] p-8 md:p-12 lg:p-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Kicker */}
          <span
            className={`kicker block mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            WHAT IS KEEFILE?
          </span>

          {/* Headline */}
          <h2
            id="product-heading"
            className={`heading-2 text-foreground mb-3 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Engineered for a Lifetime.
          </h2>

          {/* Sub-headline */}
          <p
            className={`text-lg md:text-xl font-medium text-foreground/70 mb-6 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            The last nail file you will ever need.
          </p>

          {/* Body */}
          <p
            className={`body-text text-muted-foreground mb-8 max-w-[560px] transition-all duration-700 delay-[400ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Keefile is not a disposable accessory. It is a precision instrument — crafted from a
            solid block of German stainless steel, with four distinct, laser-etched filing surfaces
            that deliver salon-quality results at home. No replacements. No compromises. Just
            perfection, every single time.
          </p>

          {/* Feature Pills */}
          <div
            className={`flex flex-wrap gap-3 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {featurePills.map((pill, index) => (
              <span
                key={pill}
                className={`glass inline-flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-500 ${
                  isLight
                    ? 'text-[#B76E79]'
                    : 'text-[#C9A96E]'
                }`}
                style={{ transitionDelay: `${600 + index * 80}ms` }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
