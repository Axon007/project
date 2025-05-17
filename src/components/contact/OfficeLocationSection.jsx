import { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

const OfficeLocationSection = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !mapLoaded) {
          setMapLoaded(true);
          observer.disconnect();
        }
      });
    }, options);

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      if (mapContainerRef.current) {
        observer.disconnect();
      }
    };
  }, [mapLoaded]);

  return (
    <section className="py-16 px-4 bg-secondary/10 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Visit Our Office"
          subtitle="Stop by our headquarters to meet the team and discuss your project in person."
        />
        
        <div 
          ref={mapContainerRef}
          className="mt-12 rounded-3xl overflow-hidden h-96 border border-secondary/30 relative"
        >
          {!mapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/5">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1682143761476!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
};

export default OfficeLocationSection; 