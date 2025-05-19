import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import image19 from '../assets/image19.png';
import reactLogo from '../assets/react.svg';

const testimonials = [
  {
    name: 'Neeraj Tiwari',
    title: 'Director - Digital Engineering',
    company: 'Americana Group (Kuwait Food Co.)',
    image: image19,
    quote:
      'We approached Jason Tech Solutions with a clear vision to build a robust and future-ready platform that could seamlessly integrate with the busy lifestyle of our customers while uplifting their overall experience and giving us a competitive edge.',
  },
  // Add more testimonials here if needed
];



const initialForm = { name: '', email: '', phone: '', message: '', captcha: '' };

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const firstInputRef = useRef(null);

  // Exit intent logic
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

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    if (!isVisible) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData(initialForm);
      setFormError('');
    }, 400);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple math captcha validation
    if (formData.captcha.trim() !== '3') {
      setFormError('Please solve the math question correctly.');
      return;
    }
    setSubmitted(true);
  };

  const nextTestimonial = () => {
    setTestimonialIdx((idx) => (idx + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setTestimonialIdx((idx) => (idx - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-2"
          onClick={handleClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-auto flex flex-col md:flex-row overflow-hidden border border-gray-100"
            onClick={e => e.stopPropagation()}
          >
            {/* Left: Testimonial Carousel */}
            <div className="md:w-1/2 w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex flex-col justify-between p-8 min-h-[520px] relative">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Leaving already?</h2>
                <p className="text-gray-700 mb-6 text-lg">Hear from our clients and why 300+ businesses trust Jaosn Tech Solutions</p>
                <div className="relative bg-white/80 rounded-2xl shadow p-6 flex flex-col items-center">
                  <img src={testimonials[testimonialIdx].image} alt={testimonials[testimonialIdx].name} className="w-16 h-16 rounded-full object-cover border-4 border-cyan-200 shadow mb-2" />
                  <div className="font-semibold text-lg text-gray-900">{testimonials[testimonialIdx].name}</div>
                  <div className="text-xs text-gray-500 mb-2 italic">{testimonials[testimonialIdx].title}<br/>{testimonials[testimonialIdx].company}</div>
                  <svg className="w-6 h-6 text-cyan-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 0 1 4-4h1V7a4 4 0 0 0-8 0v2" /></svg>
                  <p className="text-gray-700 text-center text-base">{testimonials[testimonialIdx].quote}</p>
                  <div className="flex justify-between w-full mt-4">
                    <button onClick={prevTestimonial} className="p-2 rounded-full hover:bg-cyan-100 transition" aria-label="Previous testimonial">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={nextTestimonial} className="p-2 rounded-full hover:bg-cyan-100 transition" aria-label="Next testimonial">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden md:block mt-8 text-xs text-gray-400 text-center">100+ transformation engineers delivered 200+ game-changing products.</div>
            </div>
            {/* Right: Form */}
            <div className="md:w-1/2 w-full bg-white flex flex-col justify-center p-8 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full transition"
                aria-label="Close popup"
                tabIndex={0}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto" autoComplete="off" aria-label="Contact form">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 text-left">Tell us what you need, and we'll get back with a cost and timeline estimate</h3>
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div className="relative">
                      <input
                        ref={firstInputRef}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`peer w-full rounded-md border border-gray-200 focus:border-blue-400 bg-gray-50 py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-100 transition ${formData.name ? 'not-empty' : ''}`}
                        placeholder=" "
                        required
                        autoComplete="name"
                        aria-required="true"
                      />
                      <label htmlFor="name" className={`absolute left-4 transition-all duration-200 pointer-events-none px-1 bg-gray-50 text-gray-500 text-base
                        ${formData.name ? '-top-3.5 text-xs bg-gray-50 px-1 text-blue-500' : 'top-3 text-base bg-transparent'}
                        peer-focus:-top-3.5 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-focus:text-blue-500
                      `}>Full name</label>
                    </div>
                    {/* Email Field */}
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`peer w-full rounded-md border border-gray-200 focus:border-blue-400 bg-gray-50 py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-100 transition ${formData.email ? 'not-empty' : ''}`}
                        placeholder=" "
                        required
                        autoComplete="email"
                        aria-required="true"
                      />
                      <label htmlFor="email" className={`absolute left-4 transition-all duration-200 pointer-events-none px-1 bg-gray-50 text-gray-500 text-base
                        ${formData.email ? '-top-3.5 text-xs bg-gray-50 px-1 text-blue-500' : 'top-3 text-base bg-transparent'}
                        peer-focus:-top-3.5 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-focus:text-blue-500
                      `}>E-Mail ID*</label>
                    </div>
                    {/* Phone Field */}
                    <div className="relative flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-100 text-gray-500 select-none">+91</span>
                      <div className="flex-1 relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`peer w-full rounded-r-md border border-gray-200 focus:border-blue-400 bg-gray-50 py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-100 transition ${formData.phone ? 'not-empty' : ''}`}
                          placeholder=" "
                          required
                          autoComplete="tel"
                          aria-required="true"
                        />
                        <label htmlFor="phone" className={`absolute left-4 transition-all duration-200 pointer-events-none px-1 bg-gray-50 text-gray-500 text-base
                          ${formData.phone ? '-top-3.5 text-xs bg-gray-50 px-1 text-blue-500' : 'top-3 text-base bg-transparent'}
                          peer-focus:-top-3.5 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-focus:text-blue-500
                        `}>Contact Number*</label>
                      </div>
                    </div>
                    {/* Message Field */}
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="2"
                        className={`peer w-full rounded-md border border-gray-200 focus:border-blue-400 bg-gray-50 py-3 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-100 transition resize-none ${formData.message ? 'not-empty' : ''}`}
                        placeholder=" "
                        aria-label="Describe your project"
                      ></textarea>
                      <label htmlFor="message" className={`absolute left-4 transition-all duration-200 pointer-events-none px-1 bg-gray-50 text-gray-500 text-base
                        ${formData.message ? '-top-3.5 text-xs bg-gray-50 px-1 text-blue-500' : 'top-3 text-base bg-transparent'}
                        peer-focus:-top-3.5 peer-focus:text-xs peer-focus:bg-gray-50 peer-focus:px-1 peer-focus:text-blue-500
                      `}>Describe Your Project/Idea In Brief (Helps Us Come Back Better Prepared)</label>
                    </div>
                    {/* Captcha Field */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-700 font-medium">2 + 1 =</span>
                      <input
                        type="text"
                        name="captcha"
                        value={formData.captcha}
                        onChange={handleChange}
                        className={`w-20 rounded-md border border-gray-200 focus:border-blue-400 bg-gray-50 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 transition ${formData.captcha ? 'not-empty' : ''}`}
                        required
                        autoComplete="off"
                        inputMode="numeric"
                        aria-label="Captcha: 2 + 1"
                      />
                    </div>
                    {formError && <div className="text-red-500 text-sm mt-1" role="alert">{formError}</div>}
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow-md hover:from-blue-700 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={
                        !formData.name ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.captcha ||
                        formData.captcha.trim() !== '3'
                      }
                      aria-disabled={
                        !formData.name ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.captcha ||
                        formData.captcha.trim() !== '3'
                      }
                    >
                      Schedule Free Consultation
                    </button>
                  </div>
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
                  <h4 className="text-2xl font-bold text-gray-800 mb-2 text-center">Thank you!</h4>
                  <p className="text-gray-600 text-center mb-4">We appreciate your interest. We'll be in touch soon.</p>
                  <button
                    onClick={handleClose}
                    className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow hover:from-blue-700 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
          {/* Trust/Brand Bar */}
          <div className="absolute bottom-0 left-0 w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-white/90 py-3 px-6 border-t border-gray-100 shadow-lg z-10">
            <div className="flex-1 flex flex-wrap gap-6 items-center justify-center md:justify-start text-sm font-medium text-blue-900">
              <span className="font-bold text-blue-700">100+</span> transformation engineers delivered <span className="font-bold text-blue-700">200+</span> game-changing products.
            </div>
             
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup; 