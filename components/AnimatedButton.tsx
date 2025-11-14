
import React, { useRef, MouseEvent } from 'react';
// anime is globally available via CDN
declare const anime: any;

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

export default AnimatedButton;