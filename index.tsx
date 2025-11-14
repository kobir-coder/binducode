import React, { useState, useEffect, useRef, RefObject, MouseEvent } from 'react';
import ReactDOM from 'react-dom/client';

// anime is globally available via CDN
declare const anime: any;

// Icon Components
// from components/icons/AirplaneIcon.tsx
const AirplaneIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-12 w-12 md:h-16 md:w-16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
  >
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

// from components/icons/SocialIcons.tsx
const iconProps = {
  className: "w-6 h-6",
  fill: "currentColor"
};

const FacebookIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.04c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm2.5 10.5h-2v6h-3v-6h-1.5v-2.5h1.5v-2c0-1.29.6-2.5 2.5-2.5h2v2.5h-1.5c-.28 0-.5.22-.5.5v1.5h2l-.5 2.5z"/>
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.03c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.14.15-.28 0-.55-.03-.81-.08.55 1.7 2.14 2.93 4.03 2.96-1.47 1.15-3.32 1.83-5.33 1.83-.35 0-.69-.02-1.03-.06 1.9 1.23 4.16 1.95 6.56 1.95 7.88 0 12.2-6.54 12.2-12.2 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8A3.6 3.6 0 0 0 20 16.4V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
  </svg>
);

// from components/icons/QuoteIcon.tsx
const QuoteIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
  </svg>
);


// Hooks
// from hooks/useScrollAnimation.ts
const useScrollAnimation = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target.querySelectorAll('.animated-element'),
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 800,
              delay: anime.stagger(200, { start: 100 }),
              easing: 'easeOutExpo',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref]);
};


// Components
// from components/AnimatedButton.tsx
interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current && shineRef.current) {
      const { left, top } = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      anime({
        targets: shineRef.current,
        left: x,
        top: y,
        duration: 50,
        easing: 'easeOutQuad'
      });
    }
  };
  
  const handleMouseEnter = () => {
    if (shineRef.current) {
       anime({
        targets: shineRef.current,
        opacity: 1,
        scale: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  };

  const handleMouseLeave = () => {
    if (shineRef.current) {
      anime({
        targets: shineRef.current,
        opacity: 0,
        scale: 0,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block px-8 py-4 text-lg font-semibold text-white bg-amber-500 rounded-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
    >
      <span className="relative z-10">{children}</span>
      <span
        ref={shineRef}
        className="absolute z-0 block w-12 h-12 bg-white/30 rounded-full opacity-0 pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></span>
    </button>
  );
};

// from components/AirplaneAnimation.tsx
const AirplaneAnimation: React.FC = () => {
  const airplaneRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (airplaneRef.current) {
      animationRef.current = anime({
        targets: airplaneRef.current,
        translateX: [
            {value: '110vw', duration: 1000, easing: 'easeInQuad'},
        ],
        translateY: [
            {value: '-20vh', duration: 500, easing: 'easeOutSine'},
            {value: '20vh', duration: 500, easing: 'easeInOutSine'},
        ],
        rotate: [
            {value: '45deg', duration: 500, easing: 'easeOutSine'},
            {value: '-15deg', duration: 500, easing: 'easeInOutSine'},
        ],
        autoplay: false,
      });
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollPosition / docHeight;
      
      if (animationRef.current) {
          animationRef.current.seek(animationRef.current.duration * scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={airplaneRef}
      className="fixed top-[80vh] left-[-10vw] z-40 text-amber-400"
      style={{ willChange: 'transform' }}
    >
      <AirplaneIcon />
    </div>
  );
};

// from components/Header.tsx
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

// from components/HeroSection.tsx
const HeroSection: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Only apply parallax while hero section is in view
      if (window.pageYOffset <= window.innerHeight && backgroundRef.current) {
        // Use anime.js to smoothly tween the parallax effect
        anime({
          targets: backgroundRef.current,
          translateY: window.pageYOffset * 0.2, // Move slightly slower than scroll
          duration: 600, // Duration for the smooth transition
          easing: 'easeOutQuad',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Subtle, continuous background zoom (Ken Burns effect)
    if (backgroundRef.current) {
        anime({
            targets: backgroundRef.current,
            scale: [1.1, 1.15],
            duration: 40000,
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true,
        });
    }

    if (headlineRef.current) {
        const entranceTimeline = anime.timeline({ loop: false });
        
        entranceTimeline.add({
            targets: headlineRef.current.querySelectorAll('.letter'),
            translateY: [100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        }).add({
            targets: '.hero-subtitle, .hero-button',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
        }, '-=1200');

        // After entrance, start the gentle continuous floating animation for text
        entranceTimeline.finished.then(() => {
            if (heroTextRef.current) {
                anime({
                    targets: heroTextRef.current,
                    translateY: '-10px',
                    duration: 4000,
                    loop: true,
                    direction: 'alternate',
                    easing: 'easeInOutSine'
                });
            }
        });
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const text1 = "Craft Family Reunions ";
  const text2 = "With Trust";

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white text-center overflow-hidden">
      <div 
        ref={backgroundRef}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(https://picsum.photos/1920/1080?random=1)`,
          willChange: 'transform',
          zIndex: -2
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-[-1]"></div>
      <div className="relative z-10 p-6 flex flex-col items-center">
        <div ref={heroTextRef}>
          <h1 ref={headlineRef} className="text-5xl md:text-7xl font-bold leading-tight mb-4">
              <span className="sr-only">{text1}{text2}</span>
              <span aria-hidden="true">
                  {text1.split("").map((char, i) => (
                      <span key={`t1-${i}`} className="letter inline-block opacity-0">
                          {char === " " ? " " : char}
                      </span>
                  ))}
                  <span className="text-amber-400 inline-block">
                      {text2.split("").map((char, i) => (
                          <span key={`t2-${i}`} className="letter inline-block opacity-0">
                              {char}
                          </span>
                      ))}
                  </span>
              </span>
          </h1>
          <p className="hero-subtitle text-lg md:text-xl max-w-3xl mb-8 text-gray-200 opacity-0">
            From visa complexities to bespoke itineraries, Bindu Sky handles every detail. Your perfect family visit awaits, stress-free and full of memories.
          </p>
        </div>
        <div className="hero-button opacity-0">
            <AnimatedButton>
              Plan Your Visit Now
            </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

// from components/OwnerSection.tsx
const OwnerSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#0a192f] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Meet Your Travel Architect</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 animated-element">
            <img 
              src="https://storage.googleapis.com/aistudio-hosting/47416398-e71e-450f-90e6-a0e20e8b393b.jpg" 
              alt="K.M. Rofiques Salahin, Owner of Bindu Sky" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover border-4 border-amber-400/50"
            />
          </div>
          <div className="md:w-2/3 text-lg text-gray-300 space-y-4 animated-element">
            <h3 className="text-3xl font-bold text-white">K.M. Rofiques Salahin</h3>
            <p className="text-amber-400 font-semibold">Owner, Bindu Sky Tours & Travel Agency</p>
            <p>
              "With a deep passion for connecting people and places, I founded Bindu Sky to turn your travel dreams into reality. We are dedicated to providing personalized and seamless travel experiences."
            </p>
            <p>
              "At Bindu Sky, we understand the importance of family and the precious moments you share. Our mission is to handle every detail of your journey with care and professionalism, allowing you to focus on creating lasting memories. Your trust is our foundation, and your satisfaction is our ultimate goal."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// from components/PackagesSection.tsx
interface PackageCardProps {
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({ title, description, imageUrl, features }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(cardRef);

  return (
    <div ref={cardRef} className="bg-[#112240] rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 animated-element flex flex-col">
      <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{description}</p>
        <ul className="space-y-2 text-gray-300 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {feature}
            </li>
          ))}
        </ul>
        <AnimatedButton>Explore Package</AnimatedButton>
      </div>
    </div>
  );
};

const PackagesSection: React.FC = () => {
  const packages = [
    {
      title: "The Royal UK Experience",
      description: "Discover the historic charm and modern vibrancy of the United Kingdom.",
      imageUrl: "https://picsum.photos/600/400?random=3",
      features: ["7 Days / 6 Nights", "Full Visa Assistance", "London & Edinburgh Tours", "Luxury Accommodations"],
    },
    {
      title: "The Dazzling UAE Discovery",
      description: "Experience the futuristic marvels and desert beauty of the Emirates.",
      imageUrl: "https://picsum.photos/600/400?random=4",
      features: ["5 Days / 4 Nights", "Instant Visa Support", "Dubai & Abu Dhabi Excursions", "5-Star Hotel Stays"],
    },
    {
      title: "The Serene Bangladesh Reunion",
      description: "Reconnect with your roots amidst the lush landscapes of Bangladesh.",
      imageUrl: "https://picsum.photos/600/400?random=5",
      features: ["10 Days / 9 Nights", "Hassle-Free Processing", "Dhaka & Sylhet Heritage", "Private Transport Included"],
    },
    {
      title: "Sacred Hajj Pilgrimage",
      description: "Embark on a spiritual journey of a lifetime with our comprehensive Hajj package.",
      imageUrl: "https://picsum.photos/600/400?random=9",
      features: ["Complete Visa Processing", "Guided Rituals & Ziyarah", "Premium Accommodations", "Direct Flights Included"],
    },
    {
      title: "Global Ticket Reservations",
      description: "Your gateway to the world. Fast, reliable, and competitive flight bookings anywhere.",
      imageUrl: "https://picsum.photos/600/400?random=10",
      features: ["Worldwide Destinations", "Best Price Guarantee", "24/7 Customer Support", "Easy Booking Process"],
    },
  ];

  return (
    <section id="packages" className="py-20 bg-[#0a192f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Our Bespoke Travel Packages</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

// from components/TestimonialsSection.tsx
const testimonials = [
  {
    name: 'The Alam Family',
    photoUrl: 'https://picsum.photos/100/100?random=6',
    quote: 'Bindu Sky planned our UK family reunion flawlessly. Every detail was taken care of, allowing us to just enjoy our time together. Truly a first-class experience!',
  },
  {
    name: 'Mr. Khan',
    photoUrl: 'https://picsum.photos/100/100?random=7',
    quote: 'The UAE trip was magnificent. The visa process was a breeze, and the itinerary was perfectly balanced between adventure and relaxation. Highly recommended.',
  },
  {
    name: 'The Chowdhury Family',
    photoUrl: 'https://picsum.photos/100/100?random=8',
    quote: 'Returning to Bangladesh was an emotional and beautiful journey, made completely stress-free by the Bindu Sky team. Their professionalism is unmatched.',
  },
];

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-[#112240] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Voices of Our Valued Travelers</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#0a192f] p-8 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 animated-element">
              <div className="relative mb-4">
                <img
                  src={testimonial.photoUrl}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-400"
                />
                <div className="absolute -top-3 -left-3 text-amber-400/50">
                    <QuoteIcon />
                </div>
              </div>
              <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
              <h3 className="text-xl font-bold text-white tracking-wide">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// from components/Footer.tsx
const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#112240] text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <div className="flex justify-center md:justify-start mb-4">
              <img src="https://storage.googleapis.com/aistudio-hosting/a50b8a36-5415-4c57-8275-c51a7e2b7405.png" alt="Bindu Sky Tours & Travels Logo" className="h-12" />
            </div>
            <p className="text-gray-400">Connecting families, creating memories. Your trusted partner in bespoke travel planning.</p>
            <p className="mt-4 text-gray-400 text-sm">Yeshfi Tread Center, Dhaka-Narayanganj Link Road (Singboard Chattar).</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="mailto:bindusky192@gmail.com" className="hover:text-amber-400">bindusky192@gmail.com</a></li>
              <li><a href="mailto:kmsalahin591@gmail.com" className="hover:text-amber-400">kmsalahin591@gmail.com</a></li>
              <li><a href="tel:+971553432582" className="hover:text-amber-400">+971 55 343 2582 (UAE)</a></li>
              <li><a href="tel:+8801730201438" className="hover:text-amber-400">+880 1730 20 1438 (BD)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors"><FacebookIcon /></a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors"><TwitterIcon /></a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors"><InstagramIcon /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Bindu Sky Tours & Travel Agency. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};


// Main App Component
// from App.tsx
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


// Root Render
// from index.tsx
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
