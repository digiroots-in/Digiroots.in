import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoBelt from './components/LogoBelt';
import Services from './components/Services';
import Results from './components/Results';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Start in dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <LogoBelt />
        <Services />
        <Results />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default App;
