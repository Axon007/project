import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sadFaceSvg from '../assets/sadfacesvg.svg';

const svgIllustration = <img src={sadFaceSvg} alt="Sad face illustration" className="w-full h-full" />;

const initialForm = { name: '', email: '', phone: '', message: '' };

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem('exitPopupShown', 'false');
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasTriggered && sessionStorage.getItem('exitPopupShown') !== 'true') {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  useEffect(() => {
    if (isVisible && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData(initialForm);
    }, 400);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    if (!isVisible) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2"
          onClick={handleClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col md:flex-row overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Left: Illustration & Message */}
            <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-cyan-100 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 px-8 py-10 w-1/2 min-h-[420px]">
              <div className="w-48 h-48 mb-6">{svgIllustration}</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">Wait! Leaving so soon?</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center text-base">We'd love to stay in touch. Share your details and get our best updates and offers!</p>
            </div>
            {/* Right: Form or Thank You */}
            <div className="flex-1 bg-white dark:bg-gray-900 px-6 py-8 flex flex-col justify-center">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full transition"
                aria-label="Close popup"
                tabIndex={0}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto" autoComplete="off">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white text-center md:hidden">Stay Connected</h3>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone <span className="text-gray-400 text-xs">(optional)</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message <span className="text-gray-400 text-xs">(optional)</span></label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-lg"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full min-h-[320px]"
                >
                  <div className="w-20 h-20 mb-4">
                    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="32" fill="url(#thankGrad)" opacity="0.15" /><defs><linearGradient id="thankGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366F1" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient></defs><path d="M20 34l8 8 16-16" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">Thank you!</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-4">We appreciate your interest. We'll be in touch soon.</p>
                  <button
                    onClick={handleClose}
                    className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold shadow hover:from-indigo-600 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup; 