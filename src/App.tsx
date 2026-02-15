import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
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

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
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
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
