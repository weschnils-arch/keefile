import { Quote } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CaseItem {
  name: string;
  role: string;
  quote: string;
}

export function CaseStudies() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  const itemsKey = isLight ? 'cases.light.items' : 'cases.dark.items';
  const itemsRaw = t(itemsKey) as string;
  let items: CaseItem[] = [];
  try {
    items = JSON.parse(itemsRaw);
  } catch {
    items = [];
  }

  // Generate avatar colors based on name
  const getAvatarColor = (name: string) => {
    const colors = isLight
      ? ['bg-[#D4A574]/20 text-[#D4A574]', 'bg-[#A8B8A8]/20 text-[#A8B8A8]', 'bg-amber-500/20 text-amber-600']
      : ['bg-[#00D9FF]/20 text-[#00D9FF]', 'bg-blue-500/20 text-blue-400', 'bg-emerald-500/20 text-emerald-400'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <section
      ref={ref}
      className="section-padding bg-muted/30"
      aria-labelledby="cases-heading"
    >
      <div className="container-max">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="label-text text-primary block mb-4">
            {t('cases.sectionTitle') as string}
          </span>
          <h2
            id="cases-heading"
            className="heading-2 text-foreground"
          >
            {isLight
              ? (t('cases.light.title') as string)
              : (t('cases.dark.title') as string)}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Customer testimonials"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl transition-all duration-500 ${
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
              {/* Quote Icon */}
              <Quote
                className={`w-8 h-8 mb-4 ${
                  isLight ? 'text-[#D4A574]/30' : 'text-[#00D9FF]/30'
                }`}
                aria-hidden="true"
              />

              {/* Quote Text */}
              <blockquote className="body-text text-foreground/80 mb-6">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                    getAvatarColor(item.name)
                  }`}
                  aria-hidden="true"
                >
                  {getInitials(item.name)}
                </div>

                {/* Name & Role */}
                <div>
                  <cite className="not-italic font-semibold text-foreground block">
                    {item.name}
                  </cite>
                  <span className="text-sm text-muted-foreground">
                    {item.role}
                  </span>
                </div>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
