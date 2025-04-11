"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import PageTransition from '../components/PageTransition';
import { 
  Palette, Figma, PenTool, LayoutGrid, 
  MessageCircle, Download, Award, CheckCircle2,
  ArrowRight, ImagePlus, FileType, Layers,
  ChevronRight, Shield, Zap
} from "lucide-react";

// Logo design packages
const LOGO_PACKAGES = [
  {
    title: "Basic Logo",
    price: "$99",
    description: "Perfect for startups and small businesses",
    features: [
      "2 Unique Concepts",
      "2 Revisions",
      "Source Files Included",
      "3 Day Delivery"
    ],
    recommended: false
  },
  {
    title: "Professional Logo",
    price: "$249",
    description: "Comprehensive branding for growing businesses",
    features: [
      "5 Unique Concepts",
      "Unlimited Revisions",
      "Source Files Included",
      "Brand Guidelines",
      "Social Media Kit",
      "2 Day Delivery"
    ],
    recommended: true
  },
  {
    title: "Premium Logo",
    price: "$499",
    description: "Complete branding solution for established companies",
    features: [
      "10 Unique Concepts",
      "Unlimited Revisions",
      "Source Files Included",
      "Comprehensive Brand Guidelines",
      "Social Media Kit",
      "Business Card Design",
      "1 Day Delivery"
    ],
    recommended: false
  }
];

// Portfolio samples
const LOGO_PORTFOLIO = [
  { 
    image: "/api/placeholder/400/320", 
    title: "Mountain Ventures",
    category: "Tech" 
  },
  { 
    image: "/api/placeholder/400/320", 
    title: "Leaf Organics",
    category: "Food & Beverage" 
  },
  { 
    image: "/api/placeholder/400/320", 
    title: "Wave Media",
    category: "Entertainment" 
  },
  { 
    image: "/api/placeholder/400/320", 
    title: "Circle Finance",
    category: "Finance" 
  },
  { 
    image: "/api/placeholder/400/320", 
    title: "Spark Fitness",
    category: "Health" 
  },
  { 
    image: "/api/placeholder/400/320", 
    title: "Cube Storage",
    category: "Real Estate" 
  }
];

// Design process steps
const DESIGN_PROCESS = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Discovery",
    description: "We discuss your brand vision, target audience, and design preferences"
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Concept Development",
    description: "I create multiple unique logo concepts based on your requirements"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Refinement",
    description: "We review and refine your chosen concept until perfect"
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Delivery",
    description: "You receive all final files in multiple formats for print and digital use"
  }
];

// Component for section headings
const SectionHeading = ({ eyebrow, title, subtitle = "", center = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''} px-4`}>
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-primary text-sm font-medium uppercase tracking-wider"
    >
      {eyebrow}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base md:text-lg text-foreground/70 max-w-3xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// Button component
const CTAButton = ({ primary = true, children, className = "", icon = false }) => (
  <button 
    className={`group relative overflow-hidden rounded-full ${primary ? 'bg-primary text-white' : 'bg-transparent border-2 border-primary/30 text-primary'} 
    px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all hover:shadow-lg ${primary ? 'hover:shadow-primary/20' : 'hover:shadow-primary/10'} 
    hover:scale-95 w-full sm:w-auto ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
      {icon && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
    </span>
  </button>
);

// Floating decorative elements component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Abstract shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-r 
          ${i % 4 === 0 ? 'from-purple-500/20 to-pink-500/10' : 
            i % 4 === 1 ? 'from-secondary/20 to-yellow-400/10' : 
            i % 4 === 2 ? 'from-primary/20 to-cyan-400/10' : 
            'from-green-500/20 to-blue-500/10'} 
          blur-xl`}
          style={{
            width: `${Math.floor(Math.random() * 300) + 100}px`,
            height: `${Math.floor(Math.random() * 300) + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          initial={{
            x: `${Math.random() * 100 - 50}%`,
            y: `${Math.random() * 100 - 50}%`,
            rotate: Math.random() * 180,
          }}
          animate={{
            x: `${Math.random() * 100 - 50}%`,
            y: `${Math.random() * 100 - 50}%`,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 30 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Design elements: squiggly lines, dots, abstract shapes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            backgroundColor: i % 3 === 0 ? '#ff6b6b' : i % 3 === 1 ? '#48dbfb' : '#1dd1a1',
            borderRadius: i % 2 === 0 ? '50%' : '4px',
            opacity: 0.4,
          }}
          animate={{
            y: [0, 10, -10, 0],
            x: [0, -5, 5, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  );
};

function LogoDesign() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Tech", "Food & Beverage", "Entertainment", "Finance", "Health", "Real Estate"];
  
  const filteredPortfolio = activeFilter === "All" 
    ? LOGO_PORTFOLIO 
    : LOGO_PORTFOLIO.filter(item => item.category === activeFilter);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
        <FloatingElements />
        {/* Hero Section - Redesigned */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" aria-labelledby="hero-heading">
          {/* Dynamic background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-600/30 blur-3xl animate-pulse" />
            <div className="absolute top-1/4 -right-48 w-80 h-80 rounded-full bg-gradient-to-r from-yellow-400/30 to-orange-500/30 blur-3xl animate-pulse" style={{animationDelay: "1s"}} />
            <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-3xl animate-pulse" style={{animationDelay: "2s"}} />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/60 to-background/80 backdrop-blur-sm" />
          </div>
          
          {/* Animated logo elements distributed around content */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Brand mark - top left */}
            <motion.div
              className="absolute w-16 h-16 md:w-24 md:h-24 rounded-xl bg-gradient-to-r from-pink-500/40 to-purple-500/40 backdrop-blur-sm border border-white/20 shadow-xl"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "15%",
                left: "8%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 15, -10, 0], 
                rotateY: [0, -15, 20, 0], 
                rotateZ: [0, 10, -5, 0],
                z: [0, 20, -10, 0] 
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="50%" height="50%" className="text-white/90">
                  <path fill="currentColor" d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M10,16.5L16,12L10,7.5V16.5Z" />
                </svg>
              </div>
            </motion.div>
            
            {/* Circle element - top right */}
            <motion.div
              className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-600/40 backdrop-blur-sm border border-white/20 shadow-xl"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "18%",
                right: "12%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, -20, 15, 0], 
                rotateY: [0, 25, -10, 0], 
                rotateZ: [0, -15, 5, 0],
                z: [0, -30, 15, 0] 
              }}
              transition={{ 
                duration: 18,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <div className="h-1/2 w-1/2 rounded-full border-4 border-white/60"></div>
              </div>
            </motion.div>
            
            {/* Horizontal bar - bottom right */}
            <motion.div
              className="absolute w-32 h-12 md:w-40 md:h-14 rounded-md bg-gradient-to-r from-yellow-400/40 to-orange-500/40 backdrop-blur-sm border border-white/20 shadow-xl"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                bottom: "22%",
                right: "15%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 10, -5, 0], 
                rotateY: [0, -10, 15, 0], 
                rotateZ: [0, 5, -10, 0],
                z: [0, 25, -15, 0] 
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            />
            
            {/* Star shape - above text */}
            <motion.div 
              className="absolute hidden md:block"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "12%",
                left: "40%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 15, -5, 0], 
                rotateY: [0, -15, 10, 0], 
                rotateZ: [0, 10, -5, 0],
                z: [0, 30, -20, 0] 
              }}
              transition={{ 
                duration: 16,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-xl">
                <path 
                  d="M40 5L50 30L75 40L50 50L40 75L30 50L5 40L30 30L40 5Z" 
                  fill="url(#logoGradient)" 
                  className="filter drop-shadow-lg"
                />
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            
            {/* Circle logo element - bottom left */}
            <motion.div
              className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-secondary/40 backdrop-blur-sm shadow-xl"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                bottom: "18%",
                left: "12%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, -15, 10, 0], 
                rotateY: [0, 10, -20, 0], 
                rotateZ: [0, -5, 15, 0],
                z: [0, -20, 10, 0] 
              }}
              transition={{ 
                duration: 17,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            />
            
            {/* Triangle element - left center */}
            <motion.div 
              className="absolute hidden md:block"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "45%",
                left: "8%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 20, -10, 0], 
                rotateY: [0, -10, 15, 0], 
                rotateZ: [0, 5, -15, 0],
                z: [0, 15, -10, 0] 
              }}
              transition={{ 
                duration: 14,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            >
              <svg width="50" height="50" viewBox="0 0 50 50" className="drop-shadow-xl">
                <path 
                  d="M25 5L45 40H5L25 5Z" 
                  fill="url(#triangleGradient)" 
                  className="filter drop-shadow-lg"
                />
                <defs>
                  <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            
            {/* Small square - right side of text */}
            <motion.div
              className="absolute w-8 h-8 md:w-10 md:h-10 rounded-md bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-sm border border-white/20 shadow-md"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "38%",
                right: "25%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 25, -15, 0], 
                rotateY: [0, -10, 20, 0], 
                rotateZ: [0, 15, -10, 0],
                y: [0, -5, 5, 0],
                z: [0, 10, -5, 0] 
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            />
            
            {/* Diamond - right bottom */}
            <motion.div 
              className="absolute hidden md:block"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                bottom: "32%",
                right: "28%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 45 }}
              animate={{ 
                rotateX: [0, 10, -15, 0], 
                rotateY: [0, -20, 10, 0], 
                rotateZ: [45, 55, 35, 45],
                z: [0, 15, -10, 0] 
              }}
              transition={{ 
                duration: 13,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-secondary/40 to-orange-500/40 backdrop-blur-sm border border-white/20 shadow-xl"></div>
            </motion.div>
            
            {/* Vertical rule - right edge */}
            <motion.div
              className="absolute h-24 w-6 md:h-32 md:w-8 rounded-full bg-gradient-to-b from-green-500/30 to-cyan-500/30 backdrop-blur-sm border border-white/10 shadow-xl"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "40%",
                right: "5%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 5, -2, 0], 
                rotateY: [0, -5, 3, 0], 
                rotateZ: [0, 3, -1, 0],
                z: [0, 10, -5, 0] 
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            />
          </div>
          
          {/* Content container */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 max-w-7xl mx-auto w-full gap-8 lg:gap-12 py-16">
            {/* Left side text content */}
            <div className="w-full lg:w-6/12 text-left space-y-6 mb-12 lg:mb-0">

              <motion.h1 
                id="hero-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] relative"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-primary relative inline-block">
                  Your Vision,
                  <motion.span 
                    className="absolute -top-6 -right-4 text-2xl text-yellow-400"
                    animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                  >
                    ✨
                  </motion.span>
                </span>
                <span className="block mt-2">Our Design <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-orange-500">Magic</span></span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-foreground/80 max-w-xl"
              >
                Transforming concepts into <span className="italic text-purple-500">captivating</span> brand identities that <span className="font-bold text-cyan-500">stand out</span> and leave <span className="underline decoration-wavy decoration-yellow-500">lasting impressions</span>.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4 pt-4"
              >
                <button className="group relative overflow-hidden rounded-full bg-primary px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto flex items-center justify-center gap-2 text-white font-medium transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-[0.98]">
                  <Palette className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  <span>Explore Our Work</span>
                </button>
                
                <button className="group relative overflow-hidden rounded-full border-2 border-primary/30 px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto text-primary font-medium transition-all hover:bg-primary/5 hover:scale-[0.98]">
                  <span>Get a Free Quote</span>
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-5 text-sm text-foreground/60 pt-6 border-t border-foreground/10"
              >
                {[
                  { icon: <CheckCircle2 />, text: "Unlimited Revisions" },
                  { icon: <Shield />, text: "100% Satisfaction" },
                  { icon: <Zap />, text: "Fast Turnaround" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 text-primary">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Right side showcase */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full lg:w-6/12 relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Floating logo showcase */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative w-[80%] h-[80%] rounded-full border border-primary/20 flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Logos positioned around orbit */}
                    {[0, 60, 120, 180, 240, 300].map((degree, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{ 
                          transformOrigin: "center",
                          rotate: `${degree}deg`,
                          translateX: "150px"
                        }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ 
                          duration: 3, 
                          delay: i * 0.5, 
                          repeat: Infinity, 
                          repeatType: "reverse" 
                        }}
                      >
                        <div className={`w-16 h-16 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg
                          ${i % 5 === 0 ? 'bg-pink-500/20 border border-pink-500/30' : 
                            i % 5 === 1 ? 'bg-blue-500/20 border border-blue-500/30' : 
                            i % 5 === 2 ? 'bg-yellow-500/20 border border-yellow-500/30' : 
                            i % 5 === 3 ? 'bg-green-500/20 border border-green-500/30' : 
                            'bg-purple-500/20 border border-purple-500/30'}`}
                        >
                          <div className="transform -rotate-[${degree}deg]">
                            {i % 6 === 0 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-pink-500">
                                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M10,16.5L16,12L10,7.5V16.5Z" />
                              </svg>
                            )}
                            {i % 6 === 1 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-blue-500">
                                <path fill="currentColor" d="M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />
                              </svg>
                            )}
                            {i % 6 === 2 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-yellow-500">
                                <path fill="currentColor" d="M3.5,4.5L9,10L3.5,15.5L8.5,20.5L14,15L19.5,20.5L21,19L15.5,13.5L21,8L19.5,6.5L14,12L8.5,6.5L7,5L3.5,1.5L2,3L6.5,7.5L3.5,10.5L2,12L3.5,13.5L6.5,10.5L3.5,7.5L3.5,4.5Z" />
                              </svg>
                            )}
                            {i % 6 === 3 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-green-500">
                                <path fill="currentColor" d="M12,2L1,21H23L12,2M12,6L19.5,19H4.5L12,6Z" />
                              </svg>
                            )}
                            {i % 6 === 4 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-purple-500">
                                <path fill="currentColor" d="M12,5.32L18,8.69V15.31L12,18.68L6,15.31V8.69L12,5.32M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" />
                              </svg>
                            )}
                            {i % 6 === 5 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-cyan-500">
                                <path fill="currentColor" d="M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M12,4A6,6 0 0,0 6,10C6,12.97 8.16,15.43 11,15.91V19H13V15.91C15.84,15.43 18,12.97 18,10A6,6 0 0,0 12,4M12,6A4,4 0 0,1 16,10A4,4 0 0,1 12,14A4,4 0 0,1 8,10A4,4 0 0,1 12,6Z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Center featured logo */}
                    <motion.div 
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-md border border-white/30 shadow-xl flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.05, 0.98, 1],
                        rotate: [0, 5, -3, 0]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        repeatType: "mirror" 
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="75" height="75" className="text-white drop-shadow-lg">
                        <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,8L10,15.5L14.5,13L16,16L18,15L15.5,11.5L19,10L12,8Z" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Design Process Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-secondary/5 to-background" aria-labelledby="process-heading">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              eyebrow="How It Works" 
              title="Logo Design Process" 
              subtitle="A simple, collaborative approach to create your perfect logo"
              center={true} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {DESIGN_PROCESS.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5, 
                    rotate: [-1, 1, 0],
                    transition: { rotate: { duration: 0.3 } }
                  }}
                  className={`p-6 md:p-8 rounded-2xl border-2 transition-all group relative overflow-hidden
                    ${index % 4 === 0 ? 'border-pink-400 bg-pink-50/10' : 
                      index % 4 === 1 ? 'border-cyan-400 bg-cyan-50/10' : 
                      index % 4 === 2 ? 'border-yellow-400 bg-yellow-50/10' : 
                      'border-purple-400 bg-purple-50/10'}`}
                >
                  <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className={`mb-4 md:mb-6 p-3 md:p-4 inline-block rounded-xl shadow-lg transform rotate-${(index % 2) ? '2' : '-2'} group-hover:rotate-0 transition-all
                    ${index % 4 === 0 ? 'bg-pink-500/20 shadow-pink-500/20' : 
                      index % 4 === 1 ? 'bg-cyan-500/20 shadow-cyan-500/20' : 
                      index % 4 === 2 ? 'bg-yellow-500/20 shadow-yellow-500/20' : 
                      'bg-purple-500/20 shadow-purple-500/20'}`}
                  >
                    {React.cloneElement(step.icon, { 
                      className: `w-6 h-6 
                        ${index % 4 === 0 ? 'text-pink-500' : 
                          index % 4 === 1 ? 'text-cyan-500' : 
                          index % 4 === 2 ? 'text-yellow-500' : 
                          'text-purple-500'}`}
                    )}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 flex items-center">
                    <span className={`text-2xl mr-2 font-black
                      ${index % 4 === 0 ? 'text-pink-500' : 
                        index % 4 === 1 ? 'text-cyan-500' : 
                        index % 4 === 2 ? 'text-yellow-500' : 
                        'text-purple-500'}`}
                    >
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-foreground/70 relative z-10">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16 md:py-24 px-4" aria-labelledby="portfolio-heading">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              eyebrow="Our Work" 
              title="Logo Design Portfolio" 
              subtitle="Browse our collection of custom logo designs created for clients across various industries"
              center={true} 
            />
            
            {/* Funky Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
              {filters.map((filter, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 md:px-5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all relative overflow-hidden
                    ${activeFilter === filter 
                      ? 'bg-gradient-to-r from-primary via-secondary to-purple-500 text-white shadow-md shadow-primary/20' 
                      : 'bg-secondary/10 text-foreground/70 hover:bg-secondary/20 border border-secondary/20'
                    }`}
                >
                  {activeFilter === filter && (
                    <motion.span 
                      className="absolute inset-0 bg-white opacity-20"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop" }}
                    />
                  )}
                  {filter}
                </motion.button>
              ))}
            </div>
            
            {/* Enhanced Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPortfolio.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-background to-secondary/5 border-2 border-secondary/30 hover:border-primary/50 transition-colors shadow-lg"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="px-2 py-1 bg-primary/80 text-white text-xs rounded-md mb-2 inline-block">
                        {item.category}
                      </span>
                      <h3 className="text-white font-bold text-xl drop-shadow-md">{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-secondary/80 to-primary/80 px-8 py-4 text-white font-medium shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View All Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute top-0 left-0 h-full w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                </div>
              </motion.button>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-secondary/5 to-background" aria-labelledby="pricing-heading">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              eyebrow="Investment Options" 
              title="Logo Creation Packages" 
              subtitle="Choose your perfect brand identity adventure - from simple and sleek to wild and wonderful"
              center={true} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {LOGO_PACKAGES.map((pkg, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className={`p-6 md:p-8 rounded-2xl border-2 transition-all relative overflow-hidden
                    ${pkg.recommended 
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/5 shadow-xl shadow-primary/10' 
                      : 'border-secondary/50 bg-gradient-to-br from-secondary/10 to-background shadow-lg hover:shadow-xl'
                    }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-5 -right-5 w-24 h-24">
                      <div className="absolute transform rotate-45 bg-gradient-to-r from-primary to-secondary text-white font-bold py-1 text-xs right-[2px] top-[32px] w-[110px] text-center shadow-md">
                        POPULAR
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl opacity-50 z-0" />
                  
                  <div className="relative z-10">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3
                      ${index % 3 === 0 ? 'bg-blue-500/20 text-blue-600' : 
                        index % 3 === 1 ? 'bg-pink-500/20 text-pink-600' : 
                        'bg-purple-500/20 text-purple-600'}`}
                    >
                      {pkg.recommended ? 'Most Popular' : index === 0 ? 'Basic' : 'Premium'}
                    </span>
                    
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{pkg.title}</h3>
                    <div className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-pink-500 text-transparent bg-clip-text">
                      {pkg.price}
                    </div>
                    <p className="text-sm md:text-base text-foreground/70 mb-6">{pkg.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm md:text-base">
                          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5
                            ${index % 3 === 0 ? 'text-blue-500' : 
                              index % 3 === 1 ? 'text-pink-500' : 
                              'text-purple-500'}`} 
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      className={`w-full py-3 rounded-full font-bold text-white transition-all relative overflow-hidden
                        ${pkg.recommended 
                          ? 'bg-gradient-to-r from-primary via-secondary to-pink-500 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]' 
                          : 'bg-gradient-to-r from-secondary/80 to-blue-400/80 hover:shadow-lg hover:shadow-secondary/20 hover:scale-[1.02]'
                        }`}
                    >
                      <span className="relative z-10">Choose Plan</span>
                      <motion.span 
                        className="absolute inset-0 bg-white opacity-20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Software Section */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden" aria-labelledby="tools-heading">
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-3xl" />
            <div className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-primary/30 to-blue-500/30 blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading 
              eyebrow="Our Creative Journey" 
              title="From Spark to Masterpiece" 
              subtitle="A collaborative adventure to transform your vision into an unforgettable brand identity"
              center={true} 
            />
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {[
                { icon: <Figma className="w-8 h-8 md:w-10 md:h-10" />, name: "Figma", color: "purple" },
                { icon: <PenTool className="w-8 h-8 md:w-10 md:h-10" />, name: "Adobe Illustrator", color: "orange" },
                { icon: <Palette className="w-8 h-8 md:w-10 md:h-10" />, name: "Adobe Photoshop", color: "blue" },
                { icon: <LayoutGrid className="w-8 h-8 md:w-10 md:h-10" />, name: "Sketch", color: "yellow" },
                { icon: <FileType className="w-8 h-8 md:w-10 md:h-10" />, name: "Font Managers", color: "pink" },
                { icon: <ImagePlus className="w-8 h-8 md:w-10 md:h-10" />, name: "Asset Libraries", color: "cyan" }
              ].map((tool, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    rotate: [-2, 2, 0], 
                    transition: { rotate: { duration: 0.3 } }
                  }}
                >
                  <div className={`mb-4 p-5 rounded-2xl shadow-lg transform rotate-${Math.floor(Math.random() * 5) - 2} hover:rotate-0 transition-all
                    ${tool.color === 'purple' ? 'bg-purple-500/20 shadow-purple-500/20 text-purple-600' : 
                      tool.color === 'orange' ? 'bg-orange-500/20 shadow-orange-500/20 text-orange-600' : 
                      tool.color === 'blue' ? 'bg-blue-500/20 shadow-blue-500/20 text-blue-600' : 
                      tool.color === 'yellow' ? 'bg-yellow-500/20 shadow-yellow-500/20 text-yellow-600' : 
                      tool.color === 'pink' ? 'bg-pink-500/20 shadow-pink-500/20 text-pink-600' : 
                      'bg-cyan-500/20 shadow-cyan-500/20 text-cyan-600'}`}
                  >
                    {tool.icon}
                  </div>
                  <span className="font-semibold">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden" aria-labelledby="cta-heading">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/4" />
            <div className="absolute bottom-0 right-1/4 w-full h-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/90 backdrop-blur-sm" />
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block mb-8 transform -rotate-2">
              <div className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 backdrop-blur-md border-2 border-primary/30 shadow-lg shadow-primary/10 rounded-xl px-6 py-4">
                <SectionHeading
                  eyebrow="Let's Create Together"
                  title={<>Ready for a <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Logo Revolution</span>?</>}
                  subtitle="Let's collaborate to design a logo that perfectly captures your brand's unique personality"
                  center={true}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Logo Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span 
                  className="absolute inset-0 bg-white opacity-20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-background to-secondary/10 border-2 border-primary/30 px-8 py-4 text-lg font-bold text-primary hover:text-secondary transition-colors hover:border-secondary/50"
              >
                View Portfolio
              </motion.button>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: <CheckCircle2 className="w-5 h-5" />, text: "Money-back guarantee", color: "green" },
                { icon: <Shield className="w-5 h-5" />, text: "100% original designs", color: "blue" },
                { icon: <Award className="w-5 h-5" />, text: "Professional quality", color: "pink" }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3, rotate: [-1, 1, 0] }}
                >
                  <div className={`p-2 rounded-full
                    ${feature.color === 'green' ? 'bg-green-500/20 text-green-600' : 
                      feature.color === 'blue' ? 'bg-blue-500/20 text-blue-600' : 
                      'bg-pink-500/20 text-pink-600'}`}
                  >
                    {feature.icon}
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 px-4" aria-labelledby="faq-heading">
          <div className="max-w-4xl mx-auto">
            <SectionHeading 
              eyebrow="Questions & Answers" 
              title="Logo Design Curiosities" 
              subtitle="Everything you've been wondering about our funky logo design process"
              center={true} 
            />
            
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  question: "How long does the logo design process take?",
                  answer: "Our typical timeline is 1-2 weeks from start to finish, depending on the package you choose. The Basic package takes around 7 days, while our Premium package can be delivered in as little as 24 hours if you need it super fast!"
                },
                {
                  question: "How many concepts and revisions do I get?",
                  answer: "This depends on your chosen package. Our Basic package includes 2 unique concepts and 2 rounds of revisions, while our Professional and Premium packages include 5-10 concepts and unlimited revisions until you're 100% satisfied with the result."
                },
                {
                  question: "What file formats will I receive?",
                  answer: "All our packages include industry-standard file formats: vector files (AI, EPS, SVG), raster files (JPEG, PNG with transparent backgrounds), and PDF. These work for both print and digital applications, in color and monochrome versions."
                },
                {
                  question: "Do I own the copyright to my logo design?",
                  answer: "Absolutely! Once the project is complete and final payment is made, you receive full copyright ownership of your logo design. You're free to use it anywhere and everywhere without restrictions."
                },
                {
                  question: "What if I don't like any of the initial concepts?",
                  answer: "No worries! We'll go back to the drawing board and create new concepts based on your feedback. Our goal is your complete satisfaction, and we'll work with you until we nail the perfect design for your brand."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-xl bg-secondary/5 border border-secondary/20 overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-5 font-medium text-lg">
                      <span>{faq.question}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 transition-transform group-open:rotate-180" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-foreground/70">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="mb-6 text-foreground/70">Still have questions? We're happy to help!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg shadow-pink-500/20 transition-all"
              >
                Contact Us
                <MessageCircle className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default LogoDesign;