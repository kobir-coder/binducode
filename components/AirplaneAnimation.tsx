
import React, { useEffect, useRef } from 'react';
import AirplaneIcon from './icons/AirplaneIcon';
// anime is globally available via CDN
declare const anime: any;

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

export default AirplaneAnimation;