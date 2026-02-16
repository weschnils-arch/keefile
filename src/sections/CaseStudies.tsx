import { useState, useCallback, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'As an engineer, I recognize thoughtful design when I see it. The surface quality and material selection are at a level I rarely encounter in consumer products.',
    name: 'Thomas B.',
    title: 'Mechanical Engineer',
  },
  {
    quote:
      'I pay attention to details — professionally and personally. Keefile is a tool that meets my quality standards. Precision in every aspect.',
    name: 'Michael R.',
    title: 'Entrepreneur',
  },
  {
    quote:
      'I work with tools every day and I know quality instantly. Keefile is robust, well-thought-out, and delivers on every promise.',
    name: 'Andreas W.',
    title: 'Master Craftsman',
  },
];

export function CaseStudies() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const isLight = theme === 'light';

  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
      setActiveIndex(clamped);
    },
    [],
  );

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.children;
    if (!cards[activeIndex]) return;
    const card = cards[activeIndex] as HTMLElement;
    const offset =
      card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;
    track.scrollTo({ left: offset, behavior: 'smooth' });
  }, [activeIndex]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = e.clientX - startX.current;
    if (dx < -50) next();
    else if (dx > 50) prev();
  };

  return (
    <section
      ref={ref}
      id="testimonials"
      className="section-padding relative overflow-hidden bg-background"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative orbs */}
      <div
        className={`orb w-[500px] h-[500px] -top-40 -left-40 ${
          isLight ? 'bg-[#B76E79]/8' : 'bg-[#C9A96E]/6'
        }`}
        aria-hidden="true"
      />
      <div
        className={`orb w-[400px] h-[400px] -bottom-32 -right-32 ${
          isLight ? 'bg-[#B76E79]/6' : 'bg-[#C9A96E]/4'
        }`}
        aria-hidden="true"
      />

      <div className="container-max relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="kicker block mb-4">Testimonials</span>
          <h2
            id="testimonials-heading"
            className="heading-2 text-foreground"
          >
            What People Say.
          </h2>
        </div>

        {/* Carousel */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Arrow Buttons */}
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 -translate-x-1 md:-translate-x-5 ${
              activeIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'opacity-80 hover:opacity-100 hover:scale-110'
            } ${
              isLight
                ? 'bg-white/70 backdrop-blur-md border border-black/10 shadow-lg'
                : 'bg-white/10 backdrop-blur-md border border-white/10 shadow-lg'
            }`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft
              className={`w-5 h-5 ${isLight ? 'text-foreground' : 'text-white'}`}
            />
          </button>

          <button
            onClick={next}
            disabled={activeIndex === testimonials.length - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 translate-x-1 md:translate-x-5 ${
              activeIndex === testimonials.length - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'opacity-80 hover:opacity-100 hover:scale-110'
            } ${
              isLight
                ? 'bg-white/70 backdrop-blur-md border border-black/10 shadow-lg'
                : 'bg-white/10 backdrop-blur-md border border-white/10 shadow-lg'
            }`}
            aria-label="Next testimonial"
          >
            <ChevronRight
              className={`w-5 h-5 ${isLight ? 'text-foreground' : 'text-white'}`}
            />
          </button>

          {/* Scrollable Track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth px-4 md:px-8 py-4"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className={`glass glass-hover flex-shrink-0 w-[85vw] md:w-[60vw] max-w-[720px] p-8 md:p-10 transition-all duration-500 ${
                  index === activeIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-50 scale-[0.97]'
                }`}
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
              >
                {/* Quote Icon */}
                <Quote
                  className="w-12 h-12 mb-6"
                  style={{ color: 'var(--kf-accent)' }}
                  aria-hidden="true"
                />

                {/* Quote Text */}
                <blockquote className="text-lg md:text-xl italic text-foreground/80 leading-relaxed mb-8">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <footer>
                  <cite className="not-italic font-semibold text-foreground block text-base">
                    {item.name}
                  </cite>
                  <span className="text-sm text-muted-foreground">
                    {item.title}
                  </span>
                </footer>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div
            className="flex items-center justify-center gap-2.5 mt-8"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 h-2.5'
                    : 'w-2.5 h-2.5 hover:scale-125'
                }`}
                style={{
                  backgroundColor:
                    index === activeIndex
                      ? 'var(--kf-accent)'
                      : isLight
                        ? 'rgba(0,0,0,0.15)'
                        : 'rgba(255,255,255,0.2)',
                }}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
