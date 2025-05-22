import { motion } from "framer-motion";
import { useState, useEffect, lazy, Suspense, useRef } from "react";
import PageTransition from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';

const HeroSection = lazy(() => import('../components/contact/HeroSection'));
const AlternativeContactSection = lazy(() => import('../components/contact/AlternativeContactSection'));
const OfficeLocationSection = lazy(() => import('../components/contact/OfficeLocationSection'));
const FAQSection = lazy(() => import('../components/contact/FAQSection'));
const CTASection = lazy(() => import('../components/contact/CTASection'));

// Loading placeholder component
const SectionPlaceholder = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
  </div>
);

// Intersection Observer wrapper component
const LazySection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Load when component is 300px away from viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {hasLoaded && (
        <Suspense fallback={<SectionPlaceholder />}>
          {children}
        </Suspense>
      )}
    </div>
  );
};

// Main component
function ContactUs() {
  // Decorative elements to keep in main component
  const CosmicSphere = () => {
    return (
      <div className="absolute right-24 top-40 h-80 w-80 lg:w-96 lg:h-96 blur-3xl rounded-full bg-gradient-to-br from-primary/30 via-purple-600/20 to-blue-600/30 animate-slow-spin hidden lg:block" />
    );
  };

  const Meteors = ({ number = 20 }) => {
    const [meteors, setMeteors] = useState([]);
    
    useEffect(() => {
      // Generate meteor configs only once
      const newMeteors = Array.from({ length: number }).map((_, i) => ({
        id: i,
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 10 + 's',
        animationDuration: Math.random() * 20 + 10 + 's',
        width: Math.random() * 200 + 50 + 'px',
        opacity: Math.random() * 0.3 + 0.2,
        transform: `rotate(${Math.random() * 360}deg)`,
      }));
      setMeteors(newMeteors);
    }, [number]);

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {meteors.map((meteor) => (
          <span 
            key={meteor.id}
            className="absolute bg-gradient-to-r from-primary to-transparent rounded-full pointer-events-none animate-meteor"
            style={{
              top: meteor.top,
              left: meteor.left,
              animationDelay: meteor.animationDelay,
              animationDuration: meteor.animationDuration,
              width: meteor.width,
              height: '1px',
              opacity: meteor.opacity,
              transform: meteor.transform,
            }}
          />
        ))}
      </div>
    );
  };

  const FloatingElements = () => {
    const [elements, setElements] = useState([]);
    
    useEffect(() => {
      // Generate floating elements configs only once
      const newElements = Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        width: Math.random() * 300 + 100 + 'px',
        height: Math.random() * 300 + 100 + 'px',
        delay: i * 2,
      }));
      setElements(newElements);
    }, []);

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-full bg-primary/10 blur-xl"
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1], 
              scale: [1, 1.2, 1],
              x: [0, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              delay: element.delay,
              ease: "easeInOut"
            }}
            style={{
              top: element.top,
              left: element.left,
              width: element.width,
              height: element.height,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
        {/* Decorative elements */}
        <FloatingElements />
        <CosmicSphere />
        <Meteors number={15} />
        
        {/* Hero Section with Contact Form */}
        <LazySection>
          <HeroSection />
        </LazySection>
        
        {/* Alternative Contact Methods */}
        <LazySection>
          <AlternativeContactSection />
        </LazySection>
        
        {/* Office Location Map */}
        <LazySection>
          <OfficeLocationSection />
        </LazySection>
        
        {/* FAQ Section */}
        <LazySection>
          <FAQSection />
        </LazySection>
        
        {/* CTA Section */}
        <LazySection>
          <CTASection />
        </LazySection>
      </div>
    </PageTransition>
  );
}

export default ContactUs;