import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    // Reset the popup shown flag when the component mounts (page loads/refreshes)
    sessionStorage.setItem('exitPopupShown', 'false');
    
    const handleMouseLeave = (e) => {
      // Only trigger if the mouse is leaving from the top of the viewport
      // and hasn't been triggered before in this page session
      if (e.clientY <= 0 && !hasTriggered && sessionStorage.getItem('exitPopupShown') !== 'true') {
        setIsVisible(true);
        setHasTriggered(true);
        // Store that it's been shown to prevent multiple popups within the same page view
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Add event listener for mouse leave
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // You could send this data to your backend
    
    // Close the popup after submission
    setIsVisible(false);
    
    // Show a thank you message or other feedback
    alert('Thanks for your contact information! We will reach out to you soon.');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleClose}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left side - Message */}
              <div className="p-8 flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-700 md:w-1/2 relative">
                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close popup"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Why are you leaving so soon? 😔</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We'd love to keep in touch! Leave your details and we'll reach out with our best offers.
                  </p>
                  <div className="hidden md:block">
                    <div style={{ 
                      width: '400px', 
                      height: '400px', 
                      maxWidth: '100%', 
                      borderRadius: '20px',
                      position: 'relative'
                    }}>
                      <Spline 
                        scene="https://prod.spline.design/Aff3Yy6vLtegD6u3/scene.splinecode"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
         
              {/* Right side - Contact Form */}
              <div className="p-8 md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Contact Us</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone (optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message (optional)</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gray-800 hover:bg-gray-900 dark:bg-primary dark:hover:bg-gray-300 text-white dark:text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup; 