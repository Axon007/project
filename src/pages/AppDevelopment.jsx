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
import { BentoCard, BentoGrid } from '../components/magicui/bento-grid';
import { cn } from "../lib/utils";

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
  gradients: {
    primary: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
    hover: "bg-gradient-to-r from-primary/20 to-secondary/20"
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
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
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
    
    <div className="mr-6 relative">
      {/* Step number with glow effect */}
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg relative z-10">
        {index + 1}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
      </div>
    </div>
    
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
            className="max-w-3xl mx-auto"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${UI.gradients.primary}`}>
              Ready to build your next great app?
            </h2>
            <p className={`${UI.text.body} mb-8 text-lg`}>
              Let's discuss how we can help bring your app idea to life with our expert development team.
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
          </motion.div>
        </Section>
      </div>
    </PageTransition>
  );
}

export default AppDevelopment;