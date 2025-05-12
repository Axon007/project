import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import PageTransition from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { 
  ArrowRight, Code, Users, Award, CheckCircle,
  Database, Server, Settings, Monitor, ChevronDown,
  Smartphone, Tablet, Layout, MessageSquare, Star,
  PieChart, Cloud, GitBranch, Zap, XCircle, Mail,
  BadgeCheck, Play, FileCode, Repeat, Download, Plus,
  BellIcon, Share2Icon, FileTextIcon, CalendarIcon
} from "lucide-react";
import { BentoCard, BentoGrid } from '../components/magicui/bento-grid';
import { Iphone15Pro } from "../components/magicui/iphone-15-pro";
import { cn } from "../lib/utils";
import FeaturesSectionDemo from '../components/FeaturesSectionDemo';

// Core theme with dark mode support
const THEME = {
  primary: {
    DEFAULT: "#0070F3",
    light: "#3291FF",
    dark: "#0052cc"
  },
  secondary: {
    DEFAULT: "#7928CA",
  },
  background: {
    DEFAULT: "#FCFCFC",
    muted: "#F5F5F5",
    dark: "#121212",
  },
  foreground: {
    DEFAULT: "#18181B",
    dark: "#f8f8f8"
  }
};

// UI object with styles - Enhanced with new interactive elements
const UI = {
  card: {
    base: "rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
    padding: "p-6",
    iconContainer: "mb-6 bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-xl flex items-center justify-center"
  },
  text: {
    heading: "font-bold text-gray-900 dark:text-white",
    body: "text-gray-600 dark:text-gray-300",
    accent: "text-primary"
  },
  gradients: {
    primary: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
    hover: "bg-gradient-to-r from-primary/20 to-secondary/20"
  },
  button: {
    base: "flex items-center gap-1 font-medium",
    pill: "rounded-full",
    primary: "bg-primary hover:bg-primary/90 text-white",
    secondary: "bg-primary/10 hover:bg-primary/20 text-primary"
  },
  interactive: {
    tab: "px-4 py-2 rounded-lg transition-colors cursor-pointer",
    tabActive: "bg-primary text-white",
    tabInactive: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
  }
};

// Animations - Enhanced with more sophisticated effects
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  staggerContainer: {
    animate: { 
      transition: { 
        staggerChildren: 0.1,
      } 
    }
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
  pulse: {
    animate: { 
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 2 }
    }
  }
};

// Animation helper
const createMotionProps = (type, delay = 0) => {
  const base = animations[type];
  return {
    ...base,
    viewport: { once: true },
    transition: { 
      ...base.transition, 
      delay: delay 
    }
  };
};

// Section component with dark mode support
const Section = ({ children, dark = false, pattern = false, className = "", id = null }) => (
  <section 
    id={id}
    className={`py-24 px-4 ${
      dark ? 'bg-gray-50 dark:bg-gray-900' : 
      'bg-white dark:bg-gray-950'
    } ${className}`}
    aria-labelledby={id}
  >
    {pattern && (
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-20"></div>
    )}
    <div className="max-w-7xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

// Feature Card Component - Enhanced with hover interactions
const FeatureCard = ({ feature, index }) => (
  <motion.div
    key={index}
    {...createMotionProps('fadeInUp', index * 0.1)}
    className={`${UI.card.base} group relative overflow-hidden`}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className={UI.card.padding}>
      <div className={`${UI.card.iconContainer} group-hover:scale-110 transition-transform duration-300`}>
        {feature.icon}
      </div>
      <h3 className={`text-xl ${UI.text.heading} mb-3`}>{feature.title}</h3>
      <p className={`${UI.text.body} mb-6 text-sm leading-relaxed`}>{feature.description}</p>
      
      {feature.features && (
        <ul className="space-y-2 mb-6">
          {feature.features.map((item, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span className={`${UI.text.body} text-sm`}>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center text-primary font-medium">
          <span>Learn more</span>
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
    
    {/* Add subtle gradient overlay on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-primary/5 to-transparent transition-opacity"></div>
  </motion.div>
);

// Development Process Step Component - Enhanced with interactive timeline
const ProcessStep = ({ step, index, totalSteps, isActive, onClick }) => (
  <motion.div
    {...createMotionProps('fadeInUp', index * 0.1)}
    className={`flex relative ${isActive ? 'scale-100' : 'scale-95 opacity-70'}`}
    onClick={onClick}
  >
    {/* Connected line between steps */}
    {index < totalSteps - 1 && (
      <div className={`absolute left-6 top-14 h-full w-px ${isActive ? 'bg-gradient-to-b from-primary from-50% to-primary/10' : 'bg-gradient-to-b from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-800'}`}></div>
    )}
    
    <div className="mr-6 relative">
      {/* Step number with glow effect */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg relative z-10 cursor-pointer transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
        {index + 1}
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
        )}
      </div>
    </div>
    
    <div className="pb-12">
      <h3 className={`text-xl ${UI.text.heading} mb-2 cursor-pointer ${isActive ? 'text-primary' : ''}`}>{step.title}</h3>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`${UI.text.body} mb-4`}>{step.description}</p>
            
            {step.details && (
              <ul className="space-y-1">
                {step.details.map((detail, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className={`${UI.text.body} text-sm`}>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

// New component: Interactive Stats Counter
const StatsCounter = ({ end, suffix = "", prefix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const step = Math.ceil(end / 50);
        const timer = setInterval(() => {
          start += step;
          if (start > end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, duration * 1000 / 50);
        
        return () => clearInterval(timer);
      }
    }, { threshold: 0.5 });
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={counterRef} className="font-bold text-4xl md:text-5xl">
      <span className="tabular-nums">{prefix}{count}{suffix}</span>
    </div>
  );
};

// New component: FAQ Accordion Item
const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div 
    className={`border-b border-gray-200 dark:border-gray-800 py-5 cursor-pointer transition-colors ${isOpen ? 'bg-gray-50 dark:bg-gray-900' : ''}`} 
    onClick={onClick}
  >
    <div className="flex justify-between items-center">
      <h4 className={`font-medium text-lg ${UI.text.heading}`}>{question}</h4>
      <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <ChevronDown size={20} />
      </div>
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className={`${UI.text.body} pt-4`}>{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// New component: Service Tabs
const ServiceTabs = ({ services, activeTab, setActiveTab }) => (
  <div>
    <div className="flex flex-wrap gap-3 mb-8">
      {services.map((service, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          className={`${UI.interactive.tab} ${activeTab === index ? UI.interactive.tabActive : UI.interactive.tabInactive}`}
        >
          {service.title}
        </button>
      ))}
    </div>
    
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className={`mb-4 ${UI.card.iconContainer} w-14 h-14`}>
                {services[activeTab].icon}
              </div>
              <h3 className={`text-2xl ${UI.text.heading} mb-4`}>{services[activeTab].title}</h3>
              <p className={`${UI.text.body} mb-6`}>{services[activeTab].description}</p>
              
              <ul className="space-y-3">
                {services[activeTab].features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className={UI.text.body}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="mt-8 flex items-center text-primary font-medium">
                Learn more about this service
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div>
              <img 
                src={services[activeTab].image} 
                alt={services[activeTab].title} 
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
);

// New component: Testimonials Carousel
const TestimonialsCarousel = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  
  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 rounded-full overflow-hidden border-2 border-primary">
                <img 
                  src={testimonials[current].avatar} 
                  alt={testimonials[current].name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={18}
                    className={i < testimonials[current].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              
              <blockquote className="text-xl italic mb-6">
                "{testimonials[current].quote}"
              </blockquote>
              
              <div>
                <div className={`font-bold ${UI.text.heading}`}>{testimonials[current].name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{testimonials[current].position}, {testimonials[current].company}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2">
        <button 
          onClick={handlePrev} 
          className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous testimonial"
        >
          <ArrowRight size={20} className="rotate-180" />
        </button>
      </div>
      
      <div className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2">
        <button 
          onClick={handleNext} 
          className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next testimonial"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${current === i ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
            aria-label={`Go to testimonial ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

// Simple component for call-to-action buttons
const CTAButton = ({ primary = true, children, className = "", ...props }) => {
  return (
    <button
      className={`px-6 py-3 rounded-full flex items-center justify-center gap-2 font-medium transition-all ${
        primary
          ? "bg-primary hover:bg-primary/90 text-white"
          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Component for section headings
const SectionHeading = ({ eyebrow, title, description, center = false }) => (
  <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-16`}>
    {eyebrow && (
      <span className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full inline-block">
        {eyebrow}
      </span>
    )}
    <h2 className={`text-3xl md:text-4xl font-bold mt-6 mb-6 ${UI.gradients.primary}`}>
      {title}
    </h2>
    {description && <p className={`${UI.text.body} text-lg`}>{description}</p>}
  </div>
);

// App showcase component for displaying screenshots
const AppShowcase = ({ screenshots = [] }) => {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      {screenshots.map((src, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
          className={`absolute shadow-2xl rounded-2xl overflow-hidden border-8 border-white dark:border-gray-900 ${
            index === 0 
              ? "h-[500px] w-[250px] z-30" 
              : index === 1 
                ? "h-[460px] w-[230px] z-20 -translate-x-[140px] rotate-[-12deg]" 
                : "h-[460px] w-[230px] z-20 translate-x-[140px] rotate-[12deg]"
          }`}
        >
          <img 
            src={src} 
            alt={`App Screenshot ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
      
      {/* Reflections */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[10px] bg-black/20 dark:bg-white/20 blur-xl rounded-full" />
    </div>
  );
};

// Tech badge component
const TechBadge = ({ name, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center gap-2 text-sm"
  >
    {icon}
    <span>{name}</span>
  </motion.div>
);

// App Development Page Content with enhanced interactivity
function AppDevelopment() {
  // App features
  const APP_FEATURES = [
    {
      title: "Native iOS Development",
      description: "High-performance native applications for iOS devices with seamless integration to Apple's ecosystem.",
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      features: ["Swift & SwiftUI", "iOS Design Guidelines", "App Store Optimization", "Apple Pay Integration"]
    },
    {
      title: "Native Android Development",
      description: "Feature-rich native Android applications optimized for the diverse Android device ecosystem.",
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      features: ["Kotlin & Java", "Material Design", "Google Play Services", "In-app Purchases"]
    },
    {
      title: "Cross-Platform Development",
      description: "Build once, deploy everywhere with React Native or Flutter, reducing development time and costs.",
      icon: <Tablet className="w-8 h-8 text-primary" />,
      features: ["React Native", "Flutter", "Code Reusability", "Native-like Experience"]
    },
    {
      title: "Progressive Web Apps",
      description: "Web applications that offer app-like experience with offline capabilities and home screen installation.",
      icon: <Monitor className="w-8 h-8 text-primary" />,
      features: ["Offline Support", "Push Notifications", "Home Screen Installation", "Fast Loading"]
    },
    {
      title: "Backend Development",
      description: "Scalable server infrastructure with robust APIs and database architecture to power your applications.",
      icon: <Server className="w-8 h-8 text-primary" />,
      features: ["API Development", "Database Design", "Authentication", "Cloud Services"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design approach with intuitive interfaces and visually appealing layouts that drive engagement.",
      icon: <Layout className="w-8 h-8 text-primary" />,
      features: ["User Research", "Wireframing", "Prototyping", "Interaction Design"]
    }
  ];
  
  // Development process steps
  const DEV_PROCESS = [
    {
      title: "Discovery & Strategy",
      description: "We begin by understanding your business goals, target audience, and app requirements.",
      details: [
        "Stakeholder interviews and requirement gathering",
        "Competitor analysis and market research",
        "App feature prioritization and roadmap planning",
        "Technical feasibility assessment"
      ]
    },
    {
      title: "UX/UI Design",
      description: "Creating intuitive, engaging, and accessible user experiences tailored to your audience.",
      details: [
        "User flow mapping and wireframing",
        "Interactive prototyping and usability testing",
        "Visual design and brand implementation",
        "Animation and micro-interaction design"
      ]
    },
    {
      title: "Development & Testing",
      description: "Building your application with clean, efficient code and rigorous quality assurance.",
      details: [
        "Agile development with regular sprints and demos",
        "Frontend and backend implementation",
        "Automated and manual testing processes",
        "Performance optimization and security hardening"
      ]
    },
    {
      title: "Deployment & Launch",
      description: "Preparing for a successful launch across all platforms and stores.",
      details: [
        "App store optimization and submission support",
        "Server environment configuration",
        "Analytics implementation and monitoring setup",
        "Launch strategy and marketing support"
      ]
    },
    {
      title: "Maintenance & Growth",
      description: "Continuous improvement and updates to ensure long-term success.",
      details: [
        "Regular maintenance and performance monitoring",
        "User feedback analysis and feature enhancement",
        "Security updates and platform compatibility",
        "Scaling support as your user base grows"
      ]
    }
  ];
  
  // New state for interactive components
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  
  // Scroll-triggered animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  // Enhanced service tabs data with images
  const SERVICE_TABS = [
    {
      title: "iOS Development",
      description: "Create premium iOS applications with Swift and SwiftUI that leverage the full capabilities of Apple's ecosystem.",
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      features: [
        "Native Swift development for optimal performance",
        "SwiftUI for modern, responsive interfaces",
        "Apple ecosystem integration (iCloud, Apple Pay, etc.)",
        "App Store optimization and submission support"
      ],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=350&fit=crop"
    },
    {
      title: "Android Development",
      description: "Build feature-rich Android applications optimized for the diverse Android device ecosystem.",
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      features: [
        "Kotlin & Java development for Android",
        "Material Design implementation",
        "Support for diverse device sizes and specifications",
        "Google Play Store optimization"
      ],
      image: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=500&h=350&fit=crop"
    },
    {
      title: "Cross-Platform",
      description: "Create apps that run on multiple platforms from a single codebase with React Native or Flutter.",
      icon: <Tablet className="w-8 h-8 text-primary" />,
      features: [
        "Code once, deploy everywhere approach",
        "React Native or Flutter development",
        "Near-native performance with optimized code",
        "Faster time-to-market for multi-platform apps"
      ],
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=500&h=350&fit=crop"
    },
    {
      title: "Web Applications",
      description: "Develop responsive web applications that work flawlessly across all browsers and devices.",
      icon: <Monitor className="w-8 h-8 text-primary" />,
      features: [
        "Modern frontend frameworks (React, Vue, Angular)",
        "Progressive Web App capabilities",
        "Responsive design for all screen sizes",
        "Performance optimization and accessibility"
      ],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=350&fit=crop"
    }
  ];

  // Technologies we use
  const TECHNOLOGIES = {
    mobile: [
      { name: "React Native", icon: <Code size={16} /> },
      { name: "Swift", icon: <Code size={16} /> },
      { name: "Kotlin", icon: <Code size={16} /> },
      { name: "Flutter", icon: <Code size={16} /> }
    ],
    backend: [
      { name: "Node.js", icon: <Server size={16} /> },
      { name: "Firebase", icon: <Database size={16} /> },
      { name: "MongoDB", icon: <Database size={16} /> },
      { name: "GraphQL", icon: <Database size={16} /> }
    ],
    tools: [
      { name: "Figma", icon: <Layout size={16} /> },
      { name: "Git", icon: <GitBranch size={16} /> },
      { name: "CI/CD", icon: <Repeat size={16} /> },
      { name: "Jest", icon: <FileCode size={16} /> }
    ]
  };

  // App showcase screenshots
  const APP_SCREENSHOTS = [
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1616469829526-7057a1427659?w=500&h=1000&fit=crop",
  ];

  // Case studies
  const CASE_STUDIES = [
    {
      title: "Fitness Tracking App",
      description: "A comprehensive fitness app with workout tracking, nutrition monitoring, and social features.",
      image: "https://images.unsplash.com/photo-1510166089176-b57564a542b1?w=900&h=500&fit=crop",
      results: "500K+ Downloads, 4.8 App Store Rating"
    },
    {
      title: "E-commerce Platform",
      description: "A full-featured online shopping app with personalized recommendations and secure checkout.",
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=900&h=500&fit=crop",
      results: "40% Increase in Mobile Conversions"
    },
    {
      title: "FinTech Solution",
      description: "A secure banking app with real-time transaction monitoring and investment tracking.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=900&h=500&fit=crop",
      results: "85% User Satisfaction, 2M+ Active Users"
    }
  ];

  // FAQ data
  const FAQ_ITEMS = [
    {
      question: "How long does it typically take to develop a mobile app?",
      answer: "Development timeline depends on the complexity of your project. Simple apps can take 2-3 months, while complex applications may require 4-9 months. During our initial consultation, we'll provide a detailed timeline based on your specific requirements."
    },
    {
      question: "What's your development process?",
      answer: "We follow an agile development methodology with iterative sprints. Our process includes discovery, design, development, testing, and deployment phases with regular client check-ins and demos to ensure alignment with your vision."
    },
    {
      question: "How much does app development cost?",
      answer: "The cost varies widely based on features, complexity, and platforms. Simple apps typically start at $25,000, while feature-rich applications can range from $50,000 to $250,000+. We provide transparent quotes after understanding your requirements."
    },
    {
      question: "Do you provide ongoing maintenance and updates?",
      answer: "Yes, we offer flexible maintenance packages to ensure your app remains current with OS updates, security patches, and performance improvements. Our support plans include regular maintenance, monitoring, and feature enhancements."
    },
    {
      question: "Which platforms do you develop for?",
      answer: "We develop for iOS, Android, web, and cross-platform solutions. Our team is proficient with native development (Swift, Kotlin) and cross-platform frameworks like React Native and Flutter, allowing us to recommend the best approach for your needs."
    }
  ];
  
  // Testimonial data
  const TESTIMONIALS = [
    {
      name: "Sarah Johnson",
      position: "Product Manager",
      company: "HealthTech Inc",
      quote: "The team delivered a beautiful, intuitive app that exceeded our expectations. Their attention to detail and commitment to quality is remarkable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      name: "Michael Chen",
      position: "CEO",
      company: "RetailConnect",
      quote: "Working with this team was a game-changer for our business. Our app has generated 40% more revenue than projected in the first quarter.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
    },
    {
      name: "Emily Rodriguez",
      position: "Marketing Director",
      company: "TravelBuddy",
      quote: "The app they built for us has transformed our customer engagement. Their technical expertise combined with business acumen is rare and valuable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        {/* Floating contact button */}
        <div className="fixed right-4 bottom-4 z-50">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/20 text-white flex items-center justify-center group relative">
              <Mail className="w-6 h-6 group-hover:scale-0 transition-all duration-300" />
              <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100 whitespace-nowrap">
                Contact Us
              </span>
            </button>
          </motion.div>
        </div>

        {/* Hero Section - Redesigned to match the provided image */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-gray-950">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-gray-950 to-gray-50/50 dark:to-gray-900/50"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main headline with two-part styling */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
                Build Custom Mobile Apps
                <span className="block text-5xl md:text-6xl lg:text-7xl font-bold mt-3 text-gray-900 dark:text-white">
                  No Coding Required
                </span>
              </h1>
              
              {/* Subheading */}
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Great ideas are everywhere. Join the millions of creators bringing their ideas to life.
              </p>
              
              {/* CTA section with buttons and free tag */}
              <div className="mt-12 flex flex-col items-center">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  {/* Primary CTA button */}
                  <a 
                    href="#"
                    className="inline-flex justify-center rounded-lg text-lg font-semibold py-4 px-8 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    Get Started
                  </a>
                  
                  {/* Secondary pricing link */}
                 
                </div>
                
                {/* Free tier tag */}
                <div className="mt-8 flex items-center">
                   
                 
                </div>
              </div>
            </div>
            
            {/* Browser mockup image */}
            <div className="mt-16 relative max-w-6xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                {/* Browser chrome styling */}
                <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2 px-4 flex items-center">
                  {/* Browser controls */}
                  <div className="flex items-center space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  {/* Browser navigation buttons */}
                  <div className="flex space-x-2 mr-4">
                    <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                      <ArrowRight size={14} className="rotate-180" />
                    </div>
                    <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  
                  {/* URL bar */}
                  <div className="flex-1 bg-white dark:bg-gray-700 rounded-md px-3 py-1.5 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2 text-gray-400">⊘</div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">x.jason.com</span>
                    </div>
                    <div className="w-4 h-4 text-gray-400">↻</div>
                  </div>
                  
                  {/* Browser menu buttons */}
                  <div className="ml-4 flex space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center text-gray-500">⊕</div>
                    <div className="w-5 h-5 flex items-center justify-center text-gray-500">□</div>
                  </div>
                </div>
                
                {/* App builder interface */}
                <div className="bg-gray-50 dark:bg-gray-900 h-[400px] relative">
                  {/* This would be the actual app builder interface content */}
                  <img 
                    src="/images/app-builder-interface.png" 
                    alt="App builder interface" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                  
                  {/* Fallback if image doesn't load */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                    Jason Tech Solutions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* New: Statistics Section */}
        <Section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 100, suffix: "+", label: "Apps Delivered" },
              { value: 98, suffix: "%", label: "Client Satisfaction" },
              { value: 15, suffix: "+", label: "Years Experience" },
              { value: 5, suffix: "M+", label: "App Downloads" },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <StatsCounter 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  duration={1.5} 
                />
                <p className="text-gray-500 dark:text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Section>
        
        {/* Services Section with interactive tabs */}
        <Section dark pattern id="services">
          <SectionHeading 
            eyebrow="Our Services" 
            title="Comprehensive App Development" 
            description="We offer end-to-end development services to transform your vision into a market-ready application with cutting-edge features and technologies."
            center={true}
          />
          
          <ServiceTabs 
            services={SERVICE_TABS}
            activeTab={activeServiceTab}
            setActiveTab={setActiveServiceTab}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {APP_FEATURES.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </Section>
        
        {/* Development Process with interactive timeline */}
        <Section id="process">
          <SectionHeading 
            eyebrow="Our Process" 
            title="How We Build Your App" 
            description="Our proven development methodology ensures transparency, quality, and alignment with your business objectives at every step."
          />
          
          <div className="mt-16">
            {DEV_PROCESS.map((step, index) => (
              <ProcessStep 
                key={index} 
                step={step} 
                index={index} 
                totalSteps={DEV_PROCESS.length}
                isActive={activeProcessStep === index}
                onClick={() => setActiveProcessStep(index)}
              />
            ))}
          </div>
        </Section>
        
        {/* Case Studies Section */}
        <Section dark pattern id="case-studies">
          <SectionHeading 
            eyebrow="Success Stories" 
            title="App Development Case Studies" 
            description="Explore our recent app development projects that have helped businesses achieve their goals and deliver exceptional user experiences."
            center={true}
          />
          
          <div className="mt-16 space-y-24">
            {CASE_STUDIES.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image side */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
                      <div className="p-6">
                        <span className="px-3 py-1 bg-primary/80 text-white text-sm rounded-full">
                          {study.results}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Text side */}
                <div>
                  <h3 className={`text-3xl font-bold mb-4 ${UI.text.heading}`}>{study.title}</h3>
                  <p className={`${UI.text.body} mb-6`}>{study.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      "Challenge identification and solution design",
                      "Custom development and integration",
                      "Performance optimization and testing",
                      "Launch and post-release support"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className={UI.text.body}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="group flex items-center text-primary font-medium">
                    Read Full Case Study
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
        
        {/* Technology Stack */}
        <Section id="technologies">
          <SectionHeading 
            eyebrow="Technology Stack" 
            title="Powered by Modern Technologies" 
            description="We leverage industry-leading tools and frameworks to build scalable, high-performance applications."
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
            >
              <h3 className={`text-xl font-bold mb-6 ${UI.text.heading} text-center`}>Mobile Development</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {TECHNOLOGIES.mobile.map((tech, i) => (
                  <TechBadge key={i} name={tech.name} icon={tech.icon} delay={i * 0.1} />
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
            >
              <h3 className={`text-xl font-bold mb-6 ${UI.text.heading} text-center`}>Backend & API</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {TECHNOLOGIES.backend.map((tech, i) => (
                  <TechBadge key={i} name={tech.name} icon={tech.icon} delay={i * 0.1 + 0.2} />
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
            >
              <h3 className={`text-xl font-bold mb-6 ${UI.text.heading} text-center`}>Tools & Workflow</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {TECHNOLOGIES.tools.map((tech, i) => (
                  <TechBadge key={i} name={tech.name} icon={tech.icon} delay={i * 0.1 + 0.4} />
                ))}
              </div>
            </motion.div>
          </div>
        </Section>
        
        {/* Mobile showcase on small screens */}
        <div className="lg:hidden py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className={`text-xl ${UI.text.heading} mb-8 text-center`}>Preview Our Work</h3>
            <AppShowcase screenshots={APP_SCREENSHOTS} />
          </div>
        </div>
        
        {/* New: Testimonials Section */}
        <Section dark pattern id="testimonials">
          <SectionHeading
            eyebrow="Client Testimonials"
            title="What Our Clients Say"
            description="Hear from businesses that have transformed their digital presence with our app development services."
            center={true}
          />
          
          <div className="max-w-3xl mx-auto mt-16">
            <TestimonialsCarousel testimonials={TESTIMONIALS} />
          </div>
        </Section>

        {/* Core Features Section from FeaturesSectionDemo component */}
        
        
        {/* New: FAQ Section with accordion */}
        <Section id="faq">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Get answers to common questions about our app development process, timeline, and services."
            center={true}
          />
          
          <div className="max-w-3xl mx-auto mt-16 bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
            {FAQ_ITEMS.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === index}
                onClick={() => setOpenFaqIndex(index === openFaqIndex ? -1 : index)}
              />
            ))}
          </div>
        </Section>
        
        {/* Why Choose Us Section */}
        <Section dark pattern id="why-us">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-1 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1558655146-d78379a16fe2?w=900&h=500&fit=crop" 
                  alt="App development team working" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              
              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Fast Delivery</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">3-4x faster than industry average</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -top-8 -left-8 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Expert Team</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">15+ years combined experience</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 dark:bg-primary/20 px-4 py-1 rounded-full inline-block">Why Choose Us</span>
              <h2 className={`text-3xl md:text-4xl font-bold mt-6 mb-6 ${UI.gradients.primary}`}>App development expertise that drives business growth</h2>
              <p className={`${UI.text.body} mb-8`}>
                We combine technical excellence with strategic thinking to deliver mobile applications 
                that not only meet but exceed user expectations and business objectives.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "User-Centric Approach",
                    description: "We prioritize user experience and design intuitive interfaces that drive engagement and retention.",
                    icon: <Users className="w-6 h-6 text-primary" />
                  },
                  {
                    title: "Technical Excellence",
                    description: "Our developers stay current with the latest technologies to build high-performance, scalable applications.",
                    icon: <Code className="w-6 h-6 text-primary" />
                  },
                  {
                    title: "Proven Results",
                    description: "Our apps have generated millions of downloads and significant ROI for our clients.",
                    icon: <Award className="w-6 h-6 text-primary" />
                  },
                  {
                    title: "Ongoing Support",
                    description: "We provide continuous maintenance and updates to keep your app running smoothly.",
                    icon: <Settings className="w-6 h-6 text-primary" />
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="mt-1 bg-primary/10 dark:bg-primary/20 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${UI.text.heading}`}>{item.title}</h3>
                      <p className={UI.text.body}>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>
        
        {/* CTA Section with enhanced button effects */}
        <Section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${UI.gradients.primary}`}>
              Ready to build your next great app?
            </h2>
            <p className={`${UI.text.body} mb-8 text-lg`}>
              Let's discuss how we can help bring your app idea to life with our expert development team.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <CTAButton primary className="group shadow-lg shadow-primary/20">
                  Schedule a Free Consultation
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </CTAButton>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <CTAButton primary={false} className="group">
                  Download PDF Brochure
                  <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                </CTAButton>
              </motion.div>
            </div>
          </motion.div>
        </Section>

        {/* App Design Gallery Section with iPhone 15 Pro Mockups */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Stunning app designs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Create visually appealing apps with customizable layouts and ready-to-use blocks for text, images, videos, and more. Bring your creative ideas to life effortlessly.
              </p>
            </div>

            {/* Mobile App Gallery using iPhone 15 Pro component */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
              
              {/* App Mockups Carousel with iPhone 15 Pro */}
              <div className="overflow-hidden py-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-wrap justify-center gap-12 pb-8"
                >
                  {/* iPhone 15 Pro Mockups */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                  >
                    <Iphone15Pro 
                      width={325}
                      height={660}
                      src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=900&fit=crop"
                      className="transform rotate-[-5deg]"
                    />
                    <div className="absolute -bottom-2 -right-4 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-lg">
                      <span className="text-sm font-medium text-primary">Food Delivery</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative z-20"
                  >
                    <Iphone15Pro 
                      width={325}
                      height={660}
                      src="https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&h=1000&fit=crop"
                      className="transform scale-110"
                    />
                    <div className="absolute -top-2 -right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-lg shadow-lg">
                      <span className="text-sm font-medium">Featured</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <Iphone15Pro 
                      width={325}
                      height={660}
                      src="https://images.unsplash.com/photo-1616469829526-7057a1427659?w=500&h=1000&fit=crop"
                      className="transform rotate-[5deg]"
                    />
                    <div className="absolute -bottom-2 -left-4 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-lg">
                      <span className="text-sm font-medium text-primary">Social Media</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Navigation indicators */}
              <div className="flex justify-center mt-8 gap-2">
                <div className="w-10 h-1 bg-primary rounded-full"></div>
                <div className="w-2 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="w-2 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Layout className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Flexible Layouts</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose from various layouts or create your own custom design with our intuitive drag-and-drop interface.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pre-built Components</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Access a library of ready-to-use UI components to speed up your app development process.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Coding Required</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Build fully functional apps without writing a single line of code using our visual development platform.
                  </p>
                </motion.div>
              </div>
              
              {/* CTA button */}
              <div className="text-center mt-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block"
                >
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Explore Design Templates
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default AppDevelopment;