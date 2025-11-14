import React, { useEffect, useRef } from 'react';
import AnimatedButton from './AnimatedButton';

// anime is globally available via CDN
declare const anime: any;

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

export default HeroSection;
