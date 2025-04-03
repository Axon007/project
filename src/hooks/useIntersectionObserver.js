import { useEffect } from 'react';
import { VIDEO_EDITING_CONFIG } from '../config/constants';

export const useIntersectionObserver = (setActiveIndex) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const rect = entry.boundingClientRect;
          const viewHeight = window.innerHeight;
          const centerPoint = viewHeight / 2;
          
          if (rect.top <= centerPoint && rect.bottom >= centerPoint) {
            setActiveIndex(parseInt(entry.target.dataset.index));
          }
        });
      },
      {
        threshold: VIDEO_EDITING_CONFIG.observerThresholds,
        rootMargin: VIDEO_EDITING_CONFIG.observerMargin
      }
    );

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveIndex]);
};