import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  q: string;
  a: string;
}

export function FAQ() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  const questionsRaw = t('faq.questions') as string;
  let questions: FAQItem[] = [];
  try {
    questions = JSON.parse(questionsRaw);
  } catch {
    questions = [];
  }

  return (
    <section
      ref={ref}
      id="faq"
      className="section-padding bg-muted/30"
      aria-labelledby="faq-heading"
    >
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="label-text text-primary block mb-4">
              {t('faq.sectionTitle') as string}
            </span>
            <h2
              id="faq-heading"
              className="heading-2 text-foreground"
            >
              {t('faq.title') as string}
            </h2>
          </div>

          {/* Accordion */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Accordion
              type="single"
              collapsible
              className="space-y-4"
            >
              {questions.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={`rounded-xl border-0 overflow-hidden ${
                    isLight
                      ? 'bg-white shadow-card'
                      : 'bg-card shadow-dark-card'
                  }`}
                >
                  <AccordionTrigger
                    className={`px-6 py-5 text-left hover:no-underline group ${
                      isLight
                        ? 'hover:bg-[#D4A574]/5'
                        : 'hover:bg-[#00D9FF]/5'
                    }`}
                  >
                    <span className="text-lg font-semibold text-foreground pr-4 group-hover:text-primary transition-colors">
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5">
                    <p className="body-text text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
