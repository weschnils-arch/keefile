import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CheckoutProvider } from '@/contexts/CheckoutContext';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { ProductSection } from '@/sections/ProductSection';
import { ProblemSolution } from '@/sections/ProblemSolution';
import { Benefits } from '@/sections/Benefits';
import { CaseStudies } from '@/sections/CaseStudies';
import { Process } from '@/sections/Process';
import { Team } from '@/sections/Team';
import { ContactCTA } from '@/sections/ContactCTA';
import { FAQ } from '@/sections/FAQ';
import { Footer } from '@/sections/Footer';
import { CheckoutPanel } from '@/components/CheckoutPanel';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CheckoutProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main id="main-content" role="main">
              <Hero />
              <ProductSection />
              <ProblemSolution />
              <Benefits />
              <CaseStudies />
              <Process />
              <Team />
              <ContactCTA />
              <FAQ />
            </main>
            <Footer />
            <CheckoutPanel />
          </div>
        </CheckoutProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
