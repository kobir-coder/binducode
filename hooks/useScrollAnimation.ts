
import { useEffect, RefObject } from 'react';
// anime is globally available via CDN
declare const anime: any;

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

export default useScrollAnimation;