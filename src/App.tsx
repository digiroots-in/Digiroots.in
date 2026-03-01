import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoBelt from './components/LogoBelt';
import Services from './components/Services';
import Results from './components/Results';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Footer from './components/Footer';

import { ContactModal } from './components/ContactModal';

const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  // Start in dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const openContact = () => setIsContactOpen(true);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans transition-colors duration-300">
      <Navbar onOpenContact={openContact} />
      <main>
        <Hero onOpenContact={openContact} />
        <LogoBelt />
        <Services />
        <Results />
        <Pricing onOpenContact={openContact} />
        <Faq />
      </main>
      <Footer onOpenContact={openContact} />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default App;
