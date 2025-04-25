import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PageTransition from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Facebook, Twitter, Linkedin, Instagram, Github, 
  CheckCircle, ArrowRight, Clock
} from "lucide-react";

// Component to create the animated cosmic sphere
const CosmicSphere = () => {
  return (
    <div className="absolute right-24 top-40 h-80 w-80 lg:w-96 lg:h-96 blur-3xl rounded-full bg-gradient-to-br from-primary/30 via-purple-600/20 to-blue-600/30 animate-slow-spin hidden lg:block" />
  );
};

// Animated meteor effect component
const Meteors = ({ number = 20 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(number)].map((_, i) => (
        <span 
          key={i}
          className={`absolute bg-gradient-to-r from-primary to-transparent rounded-full pointer-events-none animate-meteor`}
          style={{
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 10 + 's',
            animationDuration: Math.random() * 20 + 10 + 's',
            width: Math.random() * 200 + 50 + 'px',
            height: '1px',
            opacity: Math.random() * 0.3 + 0.2,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

// Floating elements to enhance the cosmic theme
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
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
            delay: i * 2,
            ease: "easeInOut"
          }}
          style={{
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            width: Math.random() * 300 + 100 + 'px',
            height: Math.random() * 300 + 100 + 'px',
          }}
        />
      ))}
    </div>
  );
};

// Section header component
const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-12 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
      >
        {title}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-1 w-20 bg-primary mx-auto rounded-full mt-6"
      />
    </div>
  );
};

// Input field component
const FormInput = ({ label, type = "text", placeholder, name, value, onChange, icon, required = false }) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium mb-2 text-foreground/90">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">
          {icon}
        </div>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 pl-12 rounded-xl border border-secondary/30 bg-secondary/5 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
    </div>
  );
};

// Contact card component
const ContactCard = ({ icon, title, info, link, linkText }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-secondary/20 backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 hover:border-primary/20 transition-all hover:shadow-lg hover:shadow-primary/5 flex flex-col items-center text-center"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70 mb-4">{info}</p>
      {link && (
        <a href={link} className="inline-flex items-center text-primary font-medium hover:underline">
          {linkText} <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      )}
    </motion.div>
  );
};

// FAQ item component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-secondary/20 overflow-hidden mb-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-5 text-left font-medium text-lg"
      >
        <span>{question}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-5 pt-0 text-foreground/70">
          {answer}
        </div>
      </div>
    </motion.div>
  );
};

// Main component
function ContactUs() {
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
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
        {/* Decorative elements */}
        <FloatingElements />
        <CosmicSphere />
        <Meteors number={15} />
        
        {/* Hero Section */}
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
        
        {/* Alternative Contact Methods */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Get in Touch"
              subtitle="We're here to help. Contact us through these channels or visit our office."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <ContactCard
                icon={<Phone className="w-6 h-6" />}
                title="Call Us"
                info="Our team is available Mon-Fri, 9am-6pm"
                link="tel:+12345678901"
                linkText="Call now"
              />
              
              <ContactCard
                icon={<MessageSquare className="w-6 h-6" />}
                title="Live Chat"
                info="Chat with our support team in real-time"
                link="#"
                linkText="Start chat"
              />
              
              <ContactCard
                icon={<Mail className="w-6 h-6" />}
                title="Email Us"
                info="We'll respond to your email within 24 hours"
                link="mailto:support@jasontechsolutions.com"
                linkText="Send email"
              />
            </div>
          </div>
        </section>
        
        {/* Office Location Map */}
        <section className="py-16 px-4 bg-secondary/10 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Visit Our Office"
              subtitle="Stop by our headquarters to meet the team and discuss your project in person."
            />
            
            <div className="mt-12 rounded-3xl overflow-hidden h-96 border border-secondary/30">
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
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Frequently Asked Questions"
              subtitle="Find answers to common questions about contacting us and our response time."
            />
            
            <div className="mt-12">
              <FAQItem
                question="What is your typical response time?"
                answer="We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend using our live chat feature for faster assistance."
              />
              
              <FAQItem
                question="How can I schedule a consultation?"
                answer="You can schedule a consultation by filling out our contact form, calling our office directly, or using the live chat feature. One of our team members will get back to you to arrange a time that works for you."
              />
              
              <FAQItem
                question="Do you provide support outside of business hours?"
                answer="While our office is open Monday through Friday from 9 AM to 6 PM, we provide emergency technical support for existing clients 24/7. For non-emergency inquiries outside business hours, please submit a request through our contact form."
              />
              
              <FAQItem
                question="How detailed should my project information be?"
                answer="The more details you can provide about your project, the better we can understand your needs. Include information about your goals, timeline, budget, and any specific requirements. However, we understand if you're in the early stages, and we're happy to help you refine your vision."
              />
              
              <FAQItem
                question="Can we meet in person to discuss our project?"
                answer="Yes, we welcome in-person meetings at our office. Please schedule an appointment in advance so we can ensure the right team members are available to discuss your specific project needs."
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 relative bg-gradient-to-b from-secondary/5 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-8 py-16 rounded-3xl bg-gradient-to-br from-primary/5 via-blue-500/5 to-primary/5 border border-primary/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Ready to transform your ideas into reality?
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto"
                >
                  Our team of experts is ready to help you build the technology solution that will take your business to the next level.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <a 
                    href="#" 
                    className="px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group"
                  >
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  <a 
                    href="tel:+12345678901" 
                    className="px-8 py-4 border border-primary/30 text-primary rounded-xl font-medium hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us Now
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default ContactUs;