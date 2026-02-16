import { useTheme } from '@/contexts/ThemeContext';
import { useCheckout } from '@/contexts/CheckoutContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function ContactCTA() {
  const { theme } = useTheme();
  const { openCheckout } = useCheckout();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  return (
    <section
      ref={ref}
      id="contact"
      className="relative section-spacing overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={
            isLight
              ? 'https://placehold.co/1400x900/f5f0eb/ccc?text=Lifestyle+Friends+Keefile'
              : 'https://placehold.co/1400x900/1a1a1a/333?text=Lifestyle+Friends+Keefile'
          }
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 ${
            isLight
              ? 'bg-gradient-to-b from-white/80 via-white/60 to-white/80'
              : 'bg-gradient-to-b from-black/80 via-black/60 to-black/80'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max flex justify-center">
        <div
          className={`glass w-[90%] md:w-[50%] p-8 md:p-12 lg:p-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Kicker */}
          <span
            className={`kicker block mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            LIMITED EARLY BIRD OFFER
          </span>

          {/* Headline */}
          <h2
            id="contact-heading"
            className={`heading-2 text-foreground mb-3 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Share the Perfection.
          </h2>

          {/* Sub-headline */}
          <p
            className={`text-lg md:text-xl font-medium text-foreground/70 mb-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Buy One. Get One Free. For Your Friend.
          </p>

          {/* Price */}
          <div
            className={`mb-2 transition-all duration-700 delay-[400ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="price-display">€55.59</span>
          </div>

          {/* Price context */}
          <p
            className={`text-sm md:text-base font-semibold text-foreground/60 mb-6 transition-all duration-700 delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Two Keefiles. One Price. Save 50%.
          </p>

          {/* Body */}
          <p
            className={`body-text text-muted-foreground max-w-md mx-auto mb-8 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            For a limited time, secure two Keefiles for the price of one. One for you. One for
            someone who deserves the best. This is the only Early Bird offer — once it is gone, it
            is gone.
          </p>

          {/* CTA Button */}
          <div
            className={`mb-6 transition-all duration-700 delay-[600ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button onClick={openCheckout} className="btn-accent">
              Secure Your Pair →
            </button>
          </div>

          {/* Trust line */}
          <p
            className={`text-xs md:text-sm text-muted-foreground tracking-wide transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Free shipping · Secure checkout · Lifetime warranty
          </p>
        </div>
      </div>
    </section>
  );
}
