import { useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from '../../components/AuroraBackground';
import FormInput from './FormInput';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Facebook, Twitter, Linkedin, Instagram, Github, 
  CheckCircle, Clock
} from "lucide-react";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [selectedSubject, setSelectedSubject] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setFormData(prev => ({
      ...prev,
      subject: subject
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSelectedSubject('');
      
      // Reset success message after a delay
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section className="relative py-28 md:py-36 px-4 overflow-hidden" aria-labelledby="hero-heading">
      <AuroraBackground className="absolute inset-0" showRadialGradient={true} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            Any question or remarks? Just write us a message!
          </p>
        </motion.div>
        
        {/* Main contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-6xl mx-auto bg-secondary/5 backdrop-blur-md border border-secondary/20 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Contact information sidebar */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-primary/80 to-blue-600/80 text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full filter blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">
                  Contact Information
                </h3>
                <p className="mb-10 text-white/80">
                  Say something to start a live chat!
                </p>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start">
                    <div className="p-2 bg-white/20 rounded-lg mr-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Phone</p>
                      <p className="font-medium">+1 (234) 567-8901</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-white/20 rounded-lg mr-4">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Email</p>
                      <p className="font-medium">info@jasontechsolutions.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-white/20 rounded-lg mr-4">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Office</p>
                      <p className="font-medium">123 Innovation Street, Tech Valley, CA 94103</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-white/20 rounded-lg mr-4">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Working Hours</p>
                      <p className="font-medium">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <p className="text-white/80 mb-4">Connect with us</p>
                  <div className="flex space-x-4">
                    {[Facebook, Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                      <a 
                        key={i}
                        href="#" 
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="col-span-2 p-8 lg:p-12">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
                  <p className="text-foreground/70 mb-6">
                    Your message has been received. We'll contact you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                  
                  {/* Name fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormInput
                      label="First Name"
                      name="firstName"
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      icon={<span className="text-lg font-semibold">Aa</span>}
                      required
                    />
                    
                    <FormInput
                      label="Last Name"
                      name="lastName"
                      placeholder="Your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      icon={<span className="text-lg font-semibold">Bb</span>}
                      required
                    />
                  </div>
                  
                  {/* Contact information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormInput
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      icon={<Mail className="w-5 h-5" />}
                      required
                    />
                    
                    <FormInput
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      placeholder="+1 (234) 567-8901"
                      value={formData.phone}
                      onChange={handleChange}
                      icon={<Phone className="w-5 h-5" />}
                    />
                  </div>
                  
                  {/* Subject selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-foreground/90">
                      Select Subject? <span className="text-primary">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['General Inquiry', 'Technical Support', 'Partnership', 'Career Inquiry'].map(subject => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => handleSubjectSelect(subject)}
                          className={`rounded-xl p-3 text-sm font-medium transition-all flex items-center justify-center ${
                            selectedSubject === subject
                              ? 'bg-primary text-white border border-primary'
                              : 'bg-secondary/20 text-foreground border border-secondary/20 hover:border-primary/30'
                          }`}
                        >
                          <span className="mr-2">
                            {selectedSubject === subject && <CheckCircle className="w-4 h-4" />}
                          </span>
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="mb-8">
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/90">
                      Message <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-4 text-foreground/40">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-12 rounded-xl border border-secondary/30 bg-secondary/5 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Submit button */}
                  <button 
                    type="submit" 
                    className="w-full md:w-auto float-right px-8 py-4 bg-gradient-to-r from-primary to-blue-500 text-white rounded-xl font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group"
                  >
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 