import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Checkout from '@/pages/Checkout';

function LandingPage() {
  return (
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
