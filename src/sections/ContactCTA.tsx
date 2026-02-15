import { Package, UserCheck, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';

const icons = [Package, UserCheck, Mail];

interface ContactStep {
  title: string;
  description: string;
}

export function ContactCTA() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const isLight = theme === 'light';

  const stepsKey = isLight ? 'contact.steps.light' : 'contact.steps.dark';
  const stepsRaw = t(stepsKey) as string;
  let steps: ContactStep[] = [];
  try {
    steps = JSON.parse(stepsRaw);
  } catch {
    steps = [];
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="section-padding bg-background"
      aria-labelledby="contact-heading"
    >
      <div className="container-max">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Label */}
          <span className="label-text text-primary block mb-4">
            {t('contact.sectionTitle') as string}
          </span>

          {/* Headline */}
          <h2
            id="contact-heading"
            className="heading-2 text-foreground mb-6"
          >
            {isLight
              ? (t('contact.light.headline') as string)
              : (t('contact.dark.headline') as string)}
          </h2>

          {/* Description */}
          <p className="body-text text-muted-foreground max-w-2xl mx-auto mb-12">
            {isLight
              ? (t('contact.light.description') as string)
              : (t('contact.dark.description') as string)}
          </p>

          {/* Steps */}
          <div
            className="grid sm:grid-cols-3 gap-6 md:gap-8 mb-12"
            role="list"
            aria-label="Order steps"
          >
            {steps.map((step, index) => {
              const Icon = icons[index] || Package;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  role="listitem"
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                      isLight ? 'bg-[#D4A574]/10' : 'bg-[#00D9FF]/10'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        isLight ? 'text-[#D4A574]' : 'text-[#00D9FF]'
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <Button
            onClick={scrollToContact}
            className="btn-primary group text-lg px-8 py-4"
            size="lg"
          >
            {t('contact.cta') as string}
            <ArrowRight
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-form" className="mt-20 pt-10">
        <div className="container-max">
          <div
            className={`max-w-xl mx-auto p-6 rounded-2xl transition-all duration-700 ${
              isLight
                ? 'bg-white shadow-card'
                : 'bg-card shadow-dark-card'
            }`}
          >
            <h3 className="text-2xl font-bold text-foreground text-center mb-6">
              {t('contact.cta') as string}
            </h3>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for your pre-order! We will contact you soon.');
              }}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 transition-colors ${
                    isLight
                      ? 'border-border focus:border-[#D4A574] focus:ring-[#D4A574]/20'
                      : 'border-border focus:border-[#00D9FF] focus:ring-[#00D9FF]/20'
                  }`}
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 transition-colors ${
                    isLight
                      ? 'border-border focus:border-[#D4A574] focus:ring-[#D4A574]/20'
                      : 'border-border focus:border-[#00D9FF] focus:ring-[#00D9FF]/20'
                  }`}
                  placeholder="your@email.com"
                />
              </div>

              {/* Package Selection */}
              <div>
                <label
                  htmlFor="package"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Package *
                </label>
                <select
                  id="package"
                  name="package"
                  required
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 transition-colors ${
                    isLight
                      ? 'border-border focus:border-[#D4A574] focus:ring-[#D4A574]/20'
                      : 'border-border focus:border-[#00D9FF] focus:ring-[#00D9FF]/20'
                  }`}
                >
                  <option value="">Select a package</option>
                  <option value="single-light">Single Pack - Light</option>
                  <option value="single-dark">Single Pack - Dark</option>
                  <option value="double-light">Double Pack - Light</option>
                  <option value="double-dark">Double Pack - Dark</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 transition-colors resize-none ${
                    isLight
                      ? 'border-border focus:border-[#D4A574] focus:ring-[#D4A574]/20'
                      : 'border-border focus:border-[#00D9FF] focus:ring-[#00D9FF]/20'
                  }`}
                  placeholder="Any special requests..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="btn-primary w-full"
                size="lg"
              >
                {t('contact.cta') as string}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                * Required fields. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
