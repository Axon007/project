import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import PageTransition from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { 
  ArrowRight, Code, Users, Award, CheckCircle,
  Database, Server, Settings, Monitor,
  Smartphone, Tablet, Layout, MessageSquare,
  PieChart, Cloud, GitBranch, Zap, 
  BadgeCheck, Play, FileCode, Repeat, Download,
  BellIcon, Share2Icon, FileTextIcon, CalendarIcon
} from "lucide-react";

// Core Theme
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

// UI object with styles
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
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
  },
  button: {
    base: "flex items-center gap-1 font-medium",
    pill: "rounded-full",
    primary: "bg-primary hover:bg-primary/90 text-white",
    secondary: "bg-primary/10 hover:bg-primary/20 text-primary"
  }
};

// Animations
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
  }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Component: Button
const Button = ({ children, variant = "primary", size = "md", className = "", icon }) => {
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white",
    secondary: "bg-white dark:bg-slate-800 border border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700",
    tertiary: "bg-transparent text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button className={`group flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </button>
  );
};

// Component: Section
const Section = ({ id, children, className = "", dark = false, pattern = false }) => (
  <section id={id} className={`${THEME.spacing.section} ${dark ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-800'} ${className} relative overflow-hidden`}>
    {pattern && (
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4F46E510_1px,transparent_1px),linear-gradient(to_bottom,#4F46E510_1px,transparent_1px)] bg-[size:40px_40px] dark:opacity-20"></div>
    )}
    <div className="max-w-7xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

// Feature Card Component
const FeatureCard = ({ feature, index }) => (
  <motion.div
    key={index}
    {...createMotionProps('fadeInUp', index * 0.1)}
    className={`${UI.card.base} group relative`}
  >
    <div className={UI.card.padding}>
      <div className={UI.card.iconContainer}>
        {feature.icon}
      </div>
      <h3 className={`text-xl ${UI.text.heading} mb-3`}>{feature.title}</h3>
      <p className={`${UI.text.body} mb-6 text-sm leading-relaxed`}>{feature.description}</p>
      
      {/* Feature List */}
      {feature.features && (
        <ul className="space-y-2 mb-6">
          {feature.features.map((item, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center text-primary font-medium">
          <span>Learn more</span>
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
    
    {/* Add subtle gradient overlay on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-primary/5 to-transparent transition-opacity"></div>
  </motion.div>
);

// Development Process Step Component
const ProcessStep = ({ step, index, totalSteps }) => (
  <motion.div
    {...createMotionProps('fadeInUp', index * 0.1)}
    className="flex relative"
  >
    {/* Connected line between steps */}
    {index < totalSteps - 1 && (
      <div className="absolute left-6 top-14 h-full w-px bg-gradient-to-b from-primary/50 to-primary/10 dark:from-primary/30 dark:to-transparent"></div>
    )}
    
    {/* Step Number */}
    <div className="mr-6 relative">
      {/* Step number with glow effect */}
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg relative z-10">
        {index + 1}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
      </div>
    </div>
    
    {/* Step Content */}
    <div className="pb-12">
      <h3 className={`text-xl ${UI.text.heading} mb-2`}>{step.title}</h3>
      <p className={`${UI.text.body} mb-4`}>{step.description}</p>
      
      {step.details && (
        <ul className="space-y-1">
          {step.details.map((detail, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span className={`${UI.text.body} text-sm`}>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);

// App Showcase Component with Device Frame
const AppShowcase = ({ screenshots }) => {
  const [active, setActive] = useState(0);
  
  return (
    <div className="relative">
      {/* Phone frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative mx-auto w-64 md:w-72 aspect-[9/19] rounded-[3rem] border-[14px] border-gray-900 dark:border-gray-800 bg-gray-800 overflow-hidden shadow-xl"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-gray-900 dark:bg-black rounded-b-xl z-10"></div>
        
        {/* Screenshot carousel */}
        <div className="absolute inset-0 bg-white">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={screenshots[active]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              alt={`App screenshot ${active + 1}`}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-colors ${active === i ? 'bg-white' : 'bg-white/40'}`}
              aria-label={`View screenshot ${i + 1}`}
            ></button>
          ))}
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 -left-16 w-32 h-32 bg-primary/30 dark:bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-secondary/30 dark:bg-secondary/20 rounded-full blur-3xl"></div>
    </div>
  );
};

// Technology Badge Component
const TechBadge = ({ name, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full"
  >
    {icon && <span className="mr-2">{icon}</span>}
    <span className="text-sm font-medium">{name}</span>
  </motion.div>
);

// Section Heading Component
const SectionHeading = ({ eyebrow, title, description, center = false }) => (
  <div className={`mb-16 ${center ? 'text-center' : ''}`}>
    <motion.span
      {...createMotionProps('fadeIn')}
      className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 dark:bg-primary/20 px-4 py-1 rounded-full inline-block"
    >
      {eyebrow}
    </motion.span>
    <motion.h2 
      {...createMotionProps('fadeInUp', 0.1)}
      className={`text-4xl md:text-5xl font-bold mt-4 mb-4 ${UI.gradients.primary}`}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        {...createMotionProps('fadeInUp', 0.2)}
        className={`text-lg ${UI.text.body} max-w-2xl ${center ? 'mx-auto' : ''}`}
      >
        {description}
      </motion.p>
    )}
  </div>
);

// CTA Button Component
const CTAButton = ({ primary = true, children, className = "", small = false }) => (
  <button className={`group relative overflow-hidden rounded-full ${primary ? 'bg-primary hover:bg-primary/90' : 'bg-transparent border-2 border-primary hover:bg-primary/10'} 
    ${small ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base md:px-8 md:py-4'} font-medium transition-all hover:shadow-lg hover:shadow-primary/20 ${className}`}>
    <span className={`relative z-10 flex items-center justify-center gap-2 ${primary ? 'text-white' : 'text-primary'}`}>
      {children}
    </span>
  </button>
);

// App Development Page Content
function AppDevelopment() {
  // App features
  const APP_FEATURES = [
    {
      title: "Native iOS Development",
      description: "High-performance native applications for iOS devices with seamless integration to Apple's ecosystem.",
      icon: <Smartphone className="w-7 h-7" />,
      features: ["Swift & SwiftUI", "iOS Design Guidelines", "App Store Optimization", "Apple Pay Integration"]
    },
    {
      title: "Native Android Development",
      description: "Feature-rich native Android applications optimized for the diverse Android device ecosystem.",
      icon: <Smartphone className="w-7 h-7" />,
      features: ["Kotlin & Java", "Material Design", "Google Play Services", "In-app Purchases"]
    },
    {
      title: "Cross-Platform Development",
      description: "Build once, deploy everywhere with React Native or Flutter, reducing development time and costs.",
      icon: <Tablet className="w-7 h-7" />,
      features: ["React Native", "Flutter", "Code Reusability", "Native-like Experience"]
    },
    {
      title: "Progressive Web Apps",
      description: "Web applications that offer app-like experience with offline capabilities and home screen installation.",
      icon: <Monitor className="w-7 h-7" />,
      features: ["Offline Support", "Push Notifications", "Home Screen Installation", "Fast Loading"]
    },
    {
      title: "Backend Development",
      description: "Scalable server infrastructure with robust APIs and database architecture to power your applications.",
      icon: <Server className="w-7 h-7" />,
      features: ["API Development", "Database Design", "Authentication", "Cloud Services"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design approach with intuitive interfaces and visually appealing layouts that drive engagement.",
      icon: <Layout className="w-7 h-7" />,
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
      { name: "CI/CD", icon: <Play size={16} /> },
      { name: "Jest", icon: <Code size={16} /> }
    ]
  };
  
  // Case studies
  const CASE_STUDIES = [
    {
      title: "Fitness Tracking App",
      description: "A comprehensive fitness app with workout tracking, nutrition monitoring, and social features.",
      results: "500K+ Downloads, 4.8 App Store Rating"
    },
    {
      title: "E-commerce Platform",
      description: "A full-featured online shopping app with personalized recommendations and secure checkout.",
      results: "40% Increase in Mobile Conversions"
    },
    {
      title: "FinTech Solution",
      description: "A secure banking app with real-time transaction monitoring and investment tracking.",
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
        {/* Hero Section */}
        <section className="relative pt-28 pb-32 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-gray-950 to-gray-50 dark:to-gray-900"></div>
            <AuroraBackground className="opacity-50 dark:opacity-30" showRadialGradient={true} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px] dark:opacity-20"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20"
                >
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-sm font-medium text-primary">Mobile & Web App Development</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 mb-6"
                >
                  Transform your idea into a 
                  <span className={` ${UI.gradients.primary} block`}>
                    powerful application
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className={`text-lg ${UI.text.body} max-w-lg mx-auto lg:mx-0`}
                >
                  We design and develop custom mobile applications that deliver exceptional user experiences and drive business growth across all platforms.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start"
                >
                  <CTAButton primary className="group shadow-lg shadow-primary/20">
                    Get Free Consultation
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </CTAButton>
                  
                  <CTAButton primary={false} className="group">
                    View Our Portfolio
                    <Play className="group-hover:scale-110 transition-transform" size={18} />
                  </CTAButton>
                </motion.div>
                
                {/* Mini features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {[
                    { icon: <Smartphone size={20} />, text: "iOS & Android" },
                    { icon: <Monitor size={20} />, text: "Web Applications" },
                    { icon: <Cloud size={20} />, text: "Cloud Integration" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                      <span className={`text-sm font-medium ${UI.text.heading}`}>{item.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* App Showcase */}
              <div className="hidden lg:block">
                <AppShowcase screenshots={APP_SCREENSHOTS} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Services/Features Section */}
        <Section dark pattern id="services">
          <SectionHeading 
            eyebrow="Our Services" 
            title="Comprehensive App Development" 
            description="We offer end-to-end development services to transform your vision into a market-ready application with cutting-edge features and technologies."
            center={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {APP_FEATURES.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </Section>
        
        {/* Development Process */}
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
              />
            ))}
          </div>
        </div>
      </Section>
      
      {/* Technologies Section with Modern Cards */}
      <Section dark pattern id="technologies">
        <SectionHeading 
          eyebrow="Tech Stack" 
          title="Powerful Technologies"
          description="We leverage cutting-edge technologies to build robust, scalable, and high-performance applications."
          center={true}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          {/* Mobile Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-indigo-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Mobile Technologies</h3>
              
              <div className="flex flex-wrap gap-3">
                {TECHNOLOGIES.mobile.map((tech, index) => (
                  <TechBadge 
                    key={index} 
                    name={tech.name} 
                    icon={tech.icon} 
                    delay={index * 0.1} 
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Backend Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6">
                <Server className="w-8 h-8 text-purple-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Backend & API</h3>
              
              <div className="flex flex-wrap gap-3">
                {TECHNOLOGIES.backend.map((tech, index) => (
                  <TechBadge 
                    key={index} 
                    name={tech.name} 
                    icon={tech.icon} 
                    delay={index * 0.1} 
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Development Tools */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-600/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-pink-600/20 flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 text-pink-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Development Tools</h3>
              
              <div className="flex flex-wrap gap-3">
                {TECHNOLOGIES.tools.map((tech, index) => (
                  <TechBadge 
                    key={index} 
                    name={tech.name} 
                    icon={tech.icon} 
                    delay={index * 0.1} 
                  />
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
        
        {/* CTA Section */}
        <Section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Your Next Great App?</h2>
            <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 mb-10 max-w-3xl mx-auto">
              Let's collaborate to bring your vision to life with cutting-edge technology and exceptional design.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CTAButton primary className="group shadow-lg shadow-primary/20">
                Schedule a Free Consultation
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </CTAButton>
              
              <CTAButton primary={false} className="group">
                Download PDF Brochure
                <Download size={18} />
              </CTAButton>
            </div>
            
            <p className="mt-8 text-slate-700 dark:text-slate-300">
              Have questions? Contact us at <a href="mailto:hello@company.com" className="text-indigo-600 dark:text-indigo-400 font-medium">hello@company.com</a>
            </p>
          </motion.div>
        </Section>
      </div>
    </PageTransition>
  );
}

export default AppDevelopment;