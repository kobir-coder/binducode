import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import OwnerSection from './components/OwnerSection';
import PackagesSection from './components/PackagesSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import AirplaneAnimation from './components/AirplaneAnimation';

const App: React.FC = () => {
  return (
    <div className="bg-[#0a192f] antialiased">
      <Header />
      <main>
        <HeroSection />
        <OwnerSection />
        <PackagesSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <AirplaneAnimation />
    </div>
  );
};

export default App;