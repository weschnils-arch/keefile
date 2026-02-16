import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FAQItem {
  question: string;
  answer: string;
}

const questions: FAQItem[] = [
  {
    question: 'What exactly is Keefile?',
    answer:
      'Keefile is a premium 4-in-1 nail file precision-engineered from solid German stainless steel. Four distinct filing surfaces — shape, smooth, refine, and polish — in one indestructible tool that lasts a lifetime.',
  },
  {
    question: 'What is the Early Bird offer?',
    answer:
      'For €55.59, you receive two Keefiles — one for you and one for a friend. It is a Buy One, Get One Free offer available only during the pre-order phase.',
  },
  {
    question: 'When will I receive my order?',
    answer:
      'Production takes approximately 3 months after the pre-order phase closes. You will receive email updates throughout the process.',
  },
  {
    question: 'Is Keefile right for me?',
    answer:
      'If you care about quality, sustainability, and precision — yes. Keefile is designed for everyone who refuses to settle for disposable tools.',
  },
  {
    question: 'How long does a Keefile really last?',
    answer:
      'Forever. The surgical-grade steel surfaces do not degrade with use. Keefile comes with a lifetime warranty.',
  },
  {
    question: 'What makes Keefile different from other nail files?',
    answer:
      'Everything. The material, the engineering, the 4-in-1 design, the German manufacturing — Keefile is the only nail file engineered from the ground up to be a permanent tool.',
  },
  {
    question: 'Can I return my Keefile?',
    answer:
      'Yes. If you are not completely satisfied, you can return your Keefile within 30 days for a full refund.',
  },
];

export function FAQ() {
  const { theme } = useTheme();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const isLight = theme === 'light';

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={ref}
      id="faq"
      className="section-padding relative overflow-hidden bg-background"
      aria-labelledby="faq-heading"
    >
      {/* Subtle decorative orb */}
      <div
        className={`orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isLight ? 'bg-[#B76E79]/4' : 'bg-[#C9A96E]/3'
        }`}
        aria-hidden="true"
      />

      <div className="container-max relative z-10">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="kicker block mb-4">FAQ</span>
            <h2
              id="faq-heading"
              className="heading-2 text-foreground"
            >
              Questions? Answered.
            </h2>
          </div>

          {/* Accordion */}
          <div
            className={`space-y-4 transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            role="list"
            aria-label="Frequently asked questions"
          >
            {questions.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="glass transition-all duration-300"
                  style={{ borderRadius: '16px' }}
                  role="listitem"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggle(index)}
                    className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 rounded-[16px] ${
                      isOpen ? '' : 'hover:bg-white/5'
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="text-base md:text-lg font-semibold text-foreground pr-2">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`flex-shrink-0 w-5 h-5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                      style={{ color: 'var(--kf-accent)' }}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Answer */}
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '300px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-6 pb-5">
                      <p className="body-text text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
