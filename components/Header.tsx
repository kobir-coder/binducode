import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId) return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a192f]/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <a href="#home" onClick={handleNavClick}>
          <img src="https://drive.google.com/uc?export=view&id=1odQFFpvgyY2jL2kViLScFXdht5yUypEY" alt="Bindu Sky Tours & Travels Logo" className="h-12" />
        </a>
        <nav className="hidden md:flex space-x-8">
          <a href="#home" onClick={handleNavClick} className="text-gray-300 hover:text-amber-400 transition duration-300">Home</a>
          <a href="#about" onClick={handleNavClick} className="text-gray-300 hover:text-amber-400 transition duration-300">About Us</a>
          <a href="#packages" onClick={handleNavClick} className="text-gray-300 hover:text-amber-400 transition duration-300">Packages</a>
          <a href="#testimonials" onClick={handleNavClick} className="text-gray-300 hover:text-amber-400 transition duration-300">Testimonials</a>
          <a href="#contact" onClick={handleNavClick} className="text-gray-300 hover:text-amber-400 transition duration-300">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;