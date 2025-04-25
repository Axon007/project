import { motion } from "framer-motion";
import { useState } from "react";
import Spline from '@splinetool/react-spline';
import { 
  ArrowRight, Code, Users, Award, CheckCircle,
  Database, Server, Settings, Monitor,
  Smartphone, Tablet, Layout, 
  GitBranch, Zap, Play, Download
} from "lucide-react";

// Core Theme
const THEME = {
  colors: {
    primary: "#4F46E5", // Indigo
    secondary: "#9333EA", // Purple
    tertiary: "#EC4899", // Pink
    success: "#10B981", // Green
    background: {
      light: "#FFFFFF",
      dark: "#0F172A", // Slate 900
      muted: {
        light: "#F8FAFC", // Slate 50
        dark: "#1E293B", // Slate 800
      }
    },
    text: {
      light: "#1E293B", // Slate 800
      dark: "#F8FAFC", // Slate 50
      muted: {
        light: "#64748B", // Slate 500
        dark: "#94A3B8", // Slate 400
      }
    }
  },
  spacing: {
    section: "py-24 px-6 sm:px-8 md:px-12 lg:px-16"
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.75rem",
    lg: "1.5rem",
    xl: "2rem",
    full: "9999px"
  }
};

// Animations
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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

// Component: SectionHeading
const SectionHeading = ({ eyebrow, title, description, center = false, className = "" }) => (
  <div className={`mb-16 ${center ? 'text-center mx-auto' : ''} ${className}`}>
    <motion.div {...fadeIn} className="inline-flex items-center justify-center h-8 px-4 mb-4 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40 rounded-full">
      {eyebrow}
    </motion.div>
    
    <motion.h2 
      {...fadeInUp} 
      className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 tracking-tight`}
    >
      {title}
    </motion.h2>
    
    {description && (
      <motion.p 
        {...fadeInUp} 
        transition={{ delay: 0.1 }}
        className={`text-lg text-slate-600 dark:text-slate-300 max-w-2xl ${center ? 'mx-auto' : ''}`}
      >
        {description}
      </motion.p>
    )}
  </div>
);

// Component: FeatureCard
const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 overflow-hidden"
  >
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent dark:from-indigo-950/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Icon */}
    <div className="relative z-10 mb-6 w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
      {feature.icon}
    </div>
    
    {/* Content */}
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed">{feature.description}</p>
      
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
    </div>
    
    {/* Hover Effect & Link */}
    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm">
      <span className="mr-1">Learn more</span>
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
    </div>
  </motion.div>
);

// Component: ProcessStep
const ProcessStep = ({ step, index, totalSteps }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex relative"
  >
    {/* Connected line between steps */}
    {index < totalSteps - 1 && (
      <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-indigo-500 to-indigo-100 dark:from-indigo-500 dark:to-slate-800"></div>
    )}
    
    {/* Step Number */}
    <div className="mr-6 relative">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg relative z-10">
        {index + 1}
        <div className="absolute -inset-1 rounded-full bg-indigo-600/20 animate-pulse"></div>
      </div>
    </div>
    
    {/* Step Content */}
    <div className="pb-12">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-4">{step.description}</p>
      
      {step.details && (
        <ul className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {step.details.map((detail, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-600 dark:text-slate-300">{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);

// Component: AppShowcase
const AppShowcase = () => {
  return (
    <div className="relative">
      {/* 3D Model using Spline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative w-full aspect-square max-w-lg mx-auto"
        style={{ height: "500px" }}
      >
        <Spline scene="https://prod.spline.design/ciMTxmd2F8kgbhMG/scene.splinecode" />
      </motion.div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -left-16 w-32 h-32 bg-indigo-600/30 dark:bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-purple-600/30 dark:bg-purple-600/20 rounded-full blur-3xl"></div>
    </div>
  );
};

// Component: TechBadge
const TechBadge = ({ name, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
  >
    {icon && <span className="mr-2 text-indigo-600 dark:text-indigo-400">{icon}</span>}
    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{name}</span>
  </motion.div>
);

// Component: CaseStudyCard
const CaseStudyCard = ({ study, index, isEven }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
  >
    {/* Image Side */}
    <div className={`${isEven ? 'lg:order-2' : ''}`}>
      <div className="relative rounded-2xl overflow-hidden aspect-video">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 z-0"></div>
        <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl opacity-30 blur-sm"></div>
        <div className="relative z-10 rounded-2xl overflow-hidden">
          <img 
            src="/api/placeholder/800/450" 
            alt={study.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end">
            <div className="p-6">
              <span className="px-3 py-1 bg-indigo-600/90 text-white text-sm rounded-full">
                {study.results}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Text Side */}
    <div className={`${isEven ? 'lg:order-1' : ''}`}>
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-4 text-slate-900 dark:text-white"
      >
        {study.title}
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-600 dark:text-slate-300 mb-6"
      >
        {study.description}
      </motion.p>
      
      <motion.ul 
        {...staggerContainer}
        className="space-y-3 mb-8"
      >
        {[
          "Challenge identification and solution design",
          "Custom development and integration",
          "Performance optimization and testing",
          "Launch and post-release support"
        ].map((item, i) => (
          <motion.li 
            key={i} 
            {...fadeInUp}
            className="flex items-start"
          >
            <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-slate-600 dark:text-slate-300">{item}</span>
          </motion.li>
        ))}
      </motion.ul>
      
      <motion.button 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="group flex items-center text-indigo-600 dark:text-indigo-400 font-medium"
      >
        Read Full Case Study
        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  </motion.div>
);

// Main Component
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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pb-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white dark:bg-slate-900"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4F46E508_1px,transparent_1px),linear-gradient(to_bottom,#4F46E508_1px,transparent_1px)] bg-[size:64px_64px] dark:opacity-30"></div>
          
          {/* Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/30 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            {/* Hero Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Mobile & Web App Development</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Transform your idea into a 
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  powerful application
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 mb-8">
                We design and develop custom mobile applications that deliver exceptional user experiences and drive business growth across all platforms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="shadow-lg shadow-indigo-500/20"
                  icon={<ArrowRight size={18} />}
                >
                  Get Free Consultation
                </Button>
                
                <Button 
                  variant="secondary" 
                  size="lg"
                  icon={<Play size={18} />}
                >
                  View Our Portfolio
                </Button>
              </div>
              
              {/* Mini features */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                {[
                  { icon: <Smartphone size={20} />, text: "iOS & Android" },
                  { icon: <Monitor size={20} />, text: "Web Applications" },
                  { icon: <Server size={20} />, text: "Cloud Integration" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start gap-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Hero App Showcase */}
            <div className="hidden lg:block">
              <AppShowcase />
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-slate-50 dark:fill-slate-800">
            <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,69.3C672,85,768,107,864,101.3C960,96,1056,64,1152,48C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APP_FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </Section>
      
      {/* Process Section with Timeline */}
      <Section id="process">
        <SectionHeading 
          eyebrow="Our Process" 
          title="How We Build Your App"
          description="We follow a proven development process that ensures quality, efficiency, and transparency from concept to launch."
          center={true}
        />
        
        <div className="relative mt-20">
          {/* Animated gradient line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-600/0 via-indigo-600 to-indigo-600/0"></div>
          
          {/* Process Steps */}
          <div className="space-y-6">
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
            </div>
          </motion.div>
        </div>
        
        {/* Featured Technologies Slider */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center overflow-hidden py-8 max-w-5xl mx-auto">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, repeatIndex) => (
                <div key={repeatIndex} className="flex items-center gap-12">
                  {['Swift', 'React Native', 'Flutter', 'Kotlin', 'Node.js', 'MongoDB', 'Firebase', 'AWS', 'GraphQL'].map((tech, index) => (
                    <div key={`${repeatIndex}-${index}`} className="flex items-center gap-2 mx-4">
                      <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      <span className="text-lg font-medium text-white/80">{tech}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Section>
      
      {/* Case Studies Section */}
      <Section id="case-studies">
        <SectionHeading 
          eyebrow="Success Stories" 
          title="Case Studies"
          description="Explore how we've helped businesses achieve their goals with innovative mobile and web applications."
          center={true}
        />
        
        <div className="space-y-32 mt-16">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyCard 
              key={index}
              study={study}
              index={index}
              isEven={index % 2 !== 0}
            />
          ))}
        </div>
      </Section>
      
      {/* Benefits Section with Interactive Cards */}
      <Section dark pattern id="benefits">
        <SectionHeading 
          eyebrow="Why Choose Us" 
          title="Benefits of Working With Us"
          description="We combine technical expertise, creative design, and business acumen to deliver exceptional applications."
          center={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: <Zap size={32} />,
              title: "Rapid Development",
              description: "We leverage modern frameworks and development practices to deliver high-quality applications faster."
            },
            {
              icon: <Users size={32} />,
              title: "User-Centered Design",
              description: "Every pixel matters. We create intuitive interfaces that users love to interact with."
            },
            {
              icon: <Award size={32} />,
              title: "Technical Excellence",
              description: "Our team of expert developers ensures your application is built with clean, maintainable code."
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-indigo-600/0 group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* Testimonials Section with Cards */}
      <Section id="testimonials">
        <SectionHeading 
          eyebrow="Client Feedback" 
          title="What Our Clients Say"
          center={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              quote: "Working with this team was a game-changer for our business. Our app has received outstanding feedback from users and increased our revenue by 40%.",
              author: "Sarah Johnson",
              role: "CEO, HealthTech Inc.",
              avatar: "/api/placeholder/50/50"
            },
            {
              quote: "The attention to detail and technical expertise demonstrated by the team is unmatched. They delivered our complex fintech app ahead of schedule.",
              author: "Michael Chen",
              role: "CTO, FinSecure",
              avatar: "/api/placeholder/50/50"
            },
            {
              quote: "Not only did they build an amazing app, but they also provided invaluable insights that helped us refine our product strategy and roadmap.",
              author: "Emma Rodriguez",
              role: "Product Owner, EduLearn",
              avatar: "/api/placeholder/50/50"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <div className="mb-6 text-indigo-500">
                    <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4 36C9.6 36 6.53333 34.6667 4.2 32C1.93333 29.3333 0.8 26 0.8 22C0.8 18.8 1.53333 15.7333 3 12.8C4.53333 9.86667 6.73333 7.2 9.6 4.8C12.4667 2.4 15.8 0.533333 19.6 0L22.6 5.2C19.8 6.66667 17.3333 8.4 15.2 10.4C13.0667 12.4 11.8 14.5333 11.4 16.8C11.8667 16.6667 12.6 16.6 13.6 16.6C16.2667 16.6 18.4667 17.4667 20.2 19.2C21.9333 20.9333 22.8 23.1333 22.8 25.8C22.8 28.6 21.8667 30.9333 20 32.8C18.1333 34.9333 16 36 13.4 36ZM34.6 36C30.8 36 27.7333 34.6667 25.4 32C23.1333 29.3333 22 26 22 22C22 18.8 22.7333 15.7333 24.2 12.8C25.7333 9.86667 27.9333 7.2 30.8 4.8C33.6667 2.4 37 0.533333 40.8 0L43.8 5.2C41 6.66667 38.5333 8.4 36.4 10.4C34.2667 12.4 33 14.5333 32.6 16.8C33.0667 16.6667 33.8 16.6 34.8 16.6C37.4667 16.6 39.6667 17.4667 41.4 19.2C43.1333 20.9333 44 23.1333 44 25.8C44 28.6 43.0667 30.9333 41.2 32.8C39.3333 34.9333 37.2 36 34.6 36Z" fill="currentColor" fillOpacity="0.2"/>
                    </svg>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 mb-6 leading-relaxed">{testimonial.quote}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.author}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* FAQ Section with Accordion */}
      <Section dark pattern id="faq">
        <SectionHeading 
          eyebrow="FAQ" 
          title="Frequently Asked Questions"
          description="Have questions about our app development services? Find quick answers to common questions below."
          center={true}
        />
        
        <div className="max-w-3xl mx-auto mt-16">
          {[
            {
              question: "How long does it take to develop a mobile app?",
              answer: "The timeline for app development varies based on complexity. Simple apps may take 2-3 months, while complex applications can take 4-6 months or more. We'll provide a detailed timeline during our initial consultation based on your specific requirements."
            },
            {
              question: "What platforms can you develop for?",
              answer: "We develop applications for iOS, Android, and web platforms. We can build native apps specifically for each platform or create cross-platform solutions using frameworks like React Native or Flutter that work across multiple platforms from a single codebase."
            },
            {
              question: "How much does app development cost?",
              answer: "App development costs vary widely based on features, complexity, and platforms. Simple apps typically start at $25,000, while more complex solutions can range from $50,000 to $200,000+. We offer flexible engagement models including fixed price, time and materials, and dedicated team approaches."
            },
            {
              question: "Do you provide ongoing maintenance and support?",
              answer: "Yes, we offer comprehensive maintenance and support plans to ensure your application continues to perform optimally. Our support includes bug fixes, security updates, compatibility updates for new OS versions, and performance optimization."
            },
            {
              question: "What is your development process?",
              answer: "Our development process follows an agile methodology with defined phases including discovery, design, development, testing, deployment, and ongoing maintenance. We emphasize collaboration, transparency, and regular communication throughout the project lifecycle."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="mb-6"
            >
              <details className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                  <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute transition-opacity opacity-100 group-open:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute transition-opacity opacity-0 group-open:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/80">{faq.answer}</p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* CTA Section */}
      <Section id="cta" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Your Next Great App?</h2>
            <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 mb-10 max-w-3xl mx-auto">
              Let's collaborate to bring your vision to life with cutting-edge technology and exceptional design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                className="shadow-xl shadow-indigo-600/30"
              >
                Schedule a Consultation
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
              >
                View Our Portfolio
              </Button>
            </div>
            
            <p className="mt-8 text-slate-700 dark:text-slate-300">
              Have questions? Contact us at <a href="mailto:hello@company.com" className="text-indigo-600 dark:text-indigo-400 font-medium">hello@company.com</a>
            </p>
          </motion.div>
        </div>
      </Section>
      
      {/* Stats Section */}
      <Section dark className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "200+", label: "Apps Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "50M+", label: "App Downloads" },
            { value: "10+", label: "Years Experience" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 group-hover:from-indigo-300 group-hover:to-pink-300 transition-all duration-300">
                {stat.value}
              </div>
              <div className="text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default AppDevelopment;