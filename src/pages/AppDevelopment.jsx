import { motion } from "framer-motion";
import { useState } from "react";
import PageTransition from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { 
  Code, Smartphone, Zap, Shield, 
  ArrowRight, Star, Settings,
  Layers, BarChart, Users, 
  CheckCircle, ArrowUpRight,
  Layout, Download
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

// Feature card component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-primary/20 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </motion.div>
  );
};

// Service card component
const ServiceCard = ({ icon, title, description, features }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-secondary/5 backdrop-blur-sm border border-secondary/20 hover:border-primary/20 transition-all group"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-foreground/70">{description}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-foreground/70">
            <CheckCircle className="w-4 h-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// Price card component
const PriceCard = ({ title, price, description, features, popular }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-8 rounded-2xl ${popular ? 'bg-primary text-white' : 'bg-secondary/5'} backdrop-blur-sm border ${popular ? 'border-primary' : 'border-secondary/20'} transition-all relative`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className={`${popular ? 'text-white/70' : 'text-foreground/70'}`}>/month</span>
      </div>
      <p className={`mb-6 ${popular ? 'text-white/70' : 'text-foreground/70'}`}>{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Star className="w-4 h-4 flex-shrink-0" />
            <span className={popular ? 'text-white/90' : 'text-foreground/90'}>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
        popular 
          ? 'bg-white text-primary hover:bg-white/90' 
          : 'bg-primary text-white hover:bg-primary/90'
      }`}>
        Get Started <ArrowUpRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

function AppDevelopment() {
  const features = [
    {
      icon: <Code />,
      title: "Custom Development",
      description: "Tailored solutions built from the ground up to meet your specific business needs"
    },
    {
      icon: <Smartphone />,
      title: "Cross-Platform",
      description: "Native apps for iOS and Android with shared codebase for efficient development"
    },
    {
      icon: <Zap />,
      title: "High Performance",
      description: "Optimized code and efficient architecture for lightning-fast performance"
    },
    {
      icon: <Shield />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with regular updates and maintenance"
    }
  ];

  const services = [
    {
      icon: <Layers />,
      title: "Native App Development",
      description: "Build powerful native applications",
      features: [
        "iOS and Android Development",
        "Native Performance",
        "Platform-Specific Features",
        "App Store Optimization"
      ]
    },
    {
      icon: <Settings />,
      title: "Cross-Platform Solutions",
      description: "One codebase, multiple platforms",
      features: [
        "React Native Development",
        "Flutter Development",
        "Code Reusability",
        "Faster Time-to-Market"
      ]
    },
    {
      icon: <BarChart />,
      title: "Analytics & Testing",
      description: "Data-driven development approach",
      features: [
        "User Analytics Integration",
        "Performance Monitoring",
        "A/B Testing",
        "Crash Reporting"
      ]
    },
    {
      icon: <Users />,
      title: "UI/UX Design",
      description: "Creating engaging experiences",
      features: [
        "User Research",
        "Wireframing & Prototyping",
        "Visual Design",
        "Usability Testing"
      ]
    }
  ];

  const pricing = [
    {
      title: "Starter",
      price: "999",
      description: "Perfect for small businesses and startups",
      features: [
        "Basic app development",
        "iOS or Android platform",
        "Standard UI components",
        "Basic analytics",
        "3 months support"
      ],
      popular: false
    },
    {
      title: "Professional",
      price: "2499",
      description: "Ideal for growing businesses",
      features: [
        "Advanced app development",
        "iOS and Android platforms",
        "Custom UI/UX design",
        "Advanced analytics",
        "12 months support"
      ],
      popular: true
    },
    {
      title: "Enterprise",
      price: "4999",
      description: "For large-scale applications",
      features: [
        "Full-scale app development",
        "Multi-platform support",
        "Premium UI/UX design",
        "Complete analytics suite",
        "24/7 priority support"
      ],
      popular: false
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
        <CosmicSphere />
        
        {/* Hero Section - Stunning App Designs */}
        <section className="relative py-28 md:py-36 px-4 overflow-hidden">
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              {/* Hero badge */}
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
              >
                <Smartphone className="w-4 h-4 mr-2" /> Premium App Development Studio
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary bg-size-200 animate-gradient"
              >
                Stunning <span className="text-primary"> Digital Experiencesyy</span> Into <br className="hidden md:block" />
                Digital Experiences
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-10"
              >
                We craft visually striking and high-performing mobile applications that engage users 
                and drive business growth. Our expert team brings your vision to life with cutting-edge 
                technology and exceptional design.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#services" 
                  className="px-8 py-4 border border-primary/30 text-primary rounded-xl font-medium hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </motion.div>
            </motion.div>

            {/* 3D App Showcase */}
<div className="relative my-28">
  {/* Primary device - static instead of animated */}
  <div className="relative z-30 mx-auto w-[280px] md:w-[320px] group cursor-pointer">
    <div className="relative mx-auto">
      {/* Phone frame with simplified shadows */}
      <div className="rounded-[32px] overflow-hidden border-[8px] border-gray-900 dark:border-gray-800 bg-gray-900 shadow-xl shadow-primary/20 group-hover:shadow-primary/30 transition-shadow duration-300">
        <img 
          src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Mobile App Interface"
          className="w-full h-auto rounded-2xl"
          loading="lazy"
          width="320"
          height="640"
        />
        
        {/* Home indicator */}
        <div className="h-1 w-1/3 bg-gray-600 rounded-full mx-auto my-3"></div>
      </div>
      
      {/* Static notification */}
      <div className="absolute -top-14 left-8 z-40 hidden md:block">
        <div className="bg-background p-2 rounded-lg shadow-lg border border-secondary/10">
          <div className="px-3 py-1 text-xs">
            <div className="font-semibold text-primary">New update available</div>
          </div>
        </div>
        <div className="w-3 h-3 bg-background rotate-45 transform translate-x-6 -translate-y-1.5 border-r border-b border-secondary/10"></div>
      </div>
    </div>
  </div>
  
  {/* Secondary devices - left side with static positioning */}
  <div className="absolute top-1/4 left-0 md:left-1/4 transform -translate-x-1/2 z-20 w-[180px] md:w-[200px] hidden md:block cursor-pointer" style={{ transform: 'translate(-50%, 0) rotate(-15deg)' }}>
    <div className="rounded-[24px] overflow-hidden border-[6px] border-gray-900 dark:border-gray-800 bg-gray-900 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow duration-300">
      <img 
        src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&h=900&fit=crop"
        alt="Mobile App Interface"
        className="w-full h-auto rounded-2xl"
        loading="lazy"
        width="200"
        height="400"
      />
    </div>
    
    {/* Small static notification */}
    <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
      <CheckCircle className="w-4 h-4" />
    </div>
  </div>
  
  {/* Secondary devices - right side with static positioning */}
  <div className="absolute top-1/4 right-0 md:right-1/4 transform translate-x-1/2 z-20 w-[180px] md:w-[200px] hidden md:block cursor-pointer" style={{ transform: 'translate(50%, 0) rotate(15deg)' }}>
    <div className="rounded-[24px] overflow-hidden border-[6px] border-gray-900 dark:border-gray-800 bg-gray-900 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow duration-300">
      <img 
        src="https://images.unsplash.com/photo-1596239190253-6322cd0ab014?w=500&h=900&fit=crop"
        alt="Mobile App Interface"
        className="w-full h-auto rounded-2xl"
        loading="lazy"
        width="200"
        height="400"
      />
    </div>
    
    {/* Static activity indicator */}
    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary shadow-md shadow-primary/40"></div>
  </div>
  
  {/* Key metrics display */}
  <div className="max-w-4xl mx-auto mt-16 px-4 hidden md:block">
    <div className="grid grid-cols-3 gap-6">
      {[
        { label: "Seamless Integration", value: "100+ APIs" },
        { label: "Real-time Updates", value: "5ms Latency" },
        { label: "Offline Support", value: "Full Access" }
      ].map((stat, index) => (
        <div 
          key={index}
          className="flex flex-col items-center"
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-primary to-transparent mb-6"></div>
          <div className="text-xs uppercase tracking-wider text-foreground/60">{stat.label}</div>
          <div className="font-semibold text-lg">{stat.value}</div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* 3D App Experience Showcase */}
<section className="py-32 px-4 relative overflow-hidden">
  {/* Animated gradient background */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] -z-10"></div>
  <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
  
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M11 4.5A2.5 2.5 0 0 1 13.5 2h5A2.5 2.5 0 0 1 21 4.5v5a2.5 2.5 0 0 1-2.5 2.5h-.17l-3.75 3.75a1 1 0 0 1-1.16.15l-7.72-4.4a1 1 0 0 1-.51-.9V7.2a2.2 2.2 0 0 1 2.2-2.2h3.61z"></path></svg> 
        Immersive UX
      </span>
      <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-violet-500">
        Design That Lives in Three Dimensions
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        Our 3D-enhanced interfaces create depth and engagement that flat designs simply cannot match.
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-20">
      <div className="col-span-1 lg:col-span-2 order-2 lg:order-1">
        <div className="h-[500px] relative perspective-1000">
          {/* 3D App Interface Mockup */}
          <div className="absolute inset-0 rotate-x-12 rotate-y-6 transform-gpu">
            <div className="relative h-full w-full rounded-2xl border-8 border-gray-900 bg-gray-900 shadow-2xl shadow-primary/20 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=1000&h=1500&fit=crop" 
                alt="3D App Interface" 
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {/* Floating UI Elements */}
              <div className="absolute top-20 right-8 w-24 h-24 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-xl rotate-6 transform-gpu">
                <div className="w-full h-3 bg-primary/30 rounded-full mb-2"></div>
                <div className="w-3/4 h-3 bg-primary/30 rounded-full mb-2"></div>
                <div className="w-1/2 h-3 bg-primary/30 rounded-full"></div>
              </div>
              <div className="absolute bottom-32 left-10 w-32 h-32 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-xl -rotate-3 transform-gpu">
                <div className="w-8 h-8 bg-primary/20 rounded-full mb-2"></div>
                <div className="w-full h-3 bg-primary/30 rounded-full mb-2"></div>
                <div className="w-3/4 h-3 bg-primary/30 rounded-full"></div>
              </div>
              {/* Interactive Dots */}
              <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-violet-500 rounded-full animate-pulse delay-1000"></div>
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
                  <div className="text-xs font-medium">Document {index + 1}</div>
                  <div className="text-xs opacity-50">PDF • 2.4MB</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="order-1 lg:order-2">
        <div className="space-y-10">
          {[
            {
              title: "Light Diffusion",
              description: "Mimics the physical properties of frosted glass, creating elegant, airy interfaces."
            },
            {
              title: "Contextual Awareness",
              description: "Background colors show through UI elements, adapting to underlying content."
            },
            {
              title: "Layered Transparency",
              description: "Multiple transparent layers create natural depth hierarchy without overwhelming users."
            },
            {
              title: "Material Distinction",
              description: "Clear boundaries between interactive elements while maintaining visual harmony."
            }
          ].map((feature, index) => (
            <div key={index} className="relative pl-10 border-l-2 border-primary/30 py-2 hover:border-primary transition-colors group">
              <div className="absolute -left-[9px] top-3 w-4 h-4 rounded-full bg-background border-2 border-primary/50 group-hover:border-primary transition-colors"></div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <a href="#" className="inline-flex items-center px-6 py-3 bg-white/10 dark:bg-gray-900/20 backdrop-blur-md text-primary border border-white/20 rounded-xl hover:bg-white/20 dark:hover:bg-gray-900/30 transition-all gap-2 group shadow-lg">
            Explore Glass UI Kit
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

{/* App Feature Grid with Micro-interactions */}
<section className="py-28 px-4 relative bg-secondary/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="18" height="18" x="3" y="3" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
        Engaging Features
      </span>
      <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
        Micro-interactions That Delight
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        Small, thoughtful animations that provide feedback and guide users through your application.
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: "Loading States",
          description: "Engaging animations that make wait times feel shorter",
          color: "from-primary to-blue-500",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        },
        {
          title: "Animated Buttons",
          description: "Buttons that respond to user interaction with subtle motion",
          color: "from-blue-500 to-violet-500",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        },
        {
          title: "Form Feedback",
          description: "Visual cues that confirm user input and validate data",
          color: "from-violet-500 to-fuchsia-500",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
        },
        {
          title: "Scroll Effects",
          description: "Elements that transform or reveal as users scroll through content",
          color: "from-fuchsia-500 to-pink-500",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        }
      ].map((feature, index) => (
        <div key={index} className="group relative h-[280px] rounded-2xl bg-secondary/5 backdrop-blur-sm border border-secondary/10 p-6 overflow-hidden hover:shadow-lg transition-shadow">
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
          
          {/* Feature content */}
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <div className="text-primary group-hover:text-blue-500 transition-colors">
                {feature.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
            <p className="text-foreground/70 mb-6">{feature.description}</p>
            
            <div className="mt-auto">
              <a href="#" className="inline-flex items-center text-sm text-primary font-medium group-hover:underline">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:ml-2 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
            
            {/* Animated corners */}
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-20">
      <div className="p-8 rounded-2xl bg-secondary/5 border border-secondary/10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h3 className="text-2xl font-bold mb-3">Transform Your App Experience</h3>
            <p className="text-foreground/70 mb-6">
              Our micro-interaction design system adds polish to your application, creating memorable experiences that users love.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Improved Engagement
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Reduced Friction
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Higher Retention
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-lg">
            <video 
              width="320" 
              height="240" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto"
              poster="https://placehold.co/320x240/2a2a3c/FFFFFF/png?text=Micro-interactions+Demo"
            >
              <source src="your-interaction-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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