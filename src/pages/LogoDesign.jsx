"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
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

function LogoDesign() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Tech", "Food & Beverage", "Entertainment", "Finance", "Health", "Real Estate"];
  
  const filteredPortfolio = activeFilter === "All" 
    ? LOGO_PORTFOLIO 
    : LOGO_PORTFOLIO.filter(item => item.category === activeFilter);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/10 to-blue-500/10" />
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-16 md:py-0">
            {/* Eyebrow Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 md:mb-8"
            >
              <div className="bg-primary/20 text-primary px-4 md:px-6 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-primary/20">
                Professional Logo Design Services
              </div>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
            >
              Craft Your <span className="text-primary">Brand Identity</span>{" "}
              <span className="block mt-1 md:mt-2">With Custom Logos</span>
            </motion.h1>
            
            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 max-w-2xl mx-auto mb-8 md:mb-12"
            >
              Creating memorable brand identities through thoughtful and distinctive logo design
            </motion.p>
            
            {/* Primary CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-12"
            >
              <button className="group relative overflow-hidden rounded-full bg-primary px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto flex items-center justify-center gap-2 text-white font-medium transition-all hover:bg-primary/90 hover:scale-95">
                <Palette className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110" />
                <span>View Portfolio</span>
              </button>
              
              <button className="group relative overflow-hidden rounded-full border-2 border-primary/30 px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto text-primary font-medium transition-all hover:bg-primary/5 hover:scale-95">
                <span>Start Your Project</span>
              </button>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-foreground/60"
            >
              {[
                { icon: <CheckCircle2 />, text: "100% Satisfaction Guarantee" },
                { icon: <Shield />, text: "Unlimited Revisions" },
                { icon: <Zap />, text: "Fast Turnaround" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-1 md:gap-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 text-primary">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
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
                <div 
                  key={index}
                  className="p-6 md:p-8 rounded-2xl bg-secondary/10 border border-secondary hover:border-primary/30 transition-colors group"
                >
                  <div className="mb-4 md:mb-6 p-3 md:p-4 bg-primary/10 inline-block rounded-xl group-hover:bg-primary/20 transition-colors">
                    {React.cloneElement(step.icon, { 
                      className: 'w-6 h-6 text-primary' 
                    })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">
                    <span className="text-primary/60 mr-2">{index + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70">{step.description}</p>
                </div>
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
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
              {filters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base transition-all ${
                    activeFilter === filter 
                      ? 'bg-primary text-white' 
                      : 'bg-secondary/20 text-foreground/70 hover:bg-secondary/40'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPortfolio.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-secondary/10 border border-secondary hover:border-primary/30 transition-colors"
                >
                  <div className="aspect-square">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      <p className="text-white/70 text-sm">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <CTAButton>
                View All Projects <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-secondary/5 to-background" aria-labelledby="pricing-heading">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              eyebrow="Pricing" 
              title="Logo Design Packages" 
              subtitle="Select the perfect package for your brand needs and budget"
              center={true} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {LOGO_PACKAGES.map((pkg, index) => (
                <div 
                  key={index}
                  className={`p-6 md:p-8 rounded-2xl border transition-all hover:shadow-xl relative ${
                    pkg.recommended 
                      ? 'bg-primary/10 border-primary/30 hover:shadow-primary/10' 
                      : 'bg-secondary/10 border-secondary hover:shadow-secondary/10 hover:border-primary/20'
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </div>
                  )}
                  
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">{pkg.title}</h3>
                  <div className="text-3xl md:text-4xl font-bold mb-4">{pkg.price}</div>
                  <p className="text-sm md:text-base text-foreground/70 mb-6">{pkg.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm md:text-base">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full py-3 rounded-full font-medium transition-all ${
                      pkg.recommended 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'bg-secondary/30 text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Software Section */}
        <section className="py-16 md:py-24 px-4" aria-labelledby="tools-heading">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              eyebrow="Professional Tools" 
              title="Design Software" 
              subtitle="Using industry-standard design applications to create perfect logo assets"
              center={true} 
            />
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {[
                { icon: <Figma className="w-8 h-8 md:w-10 md:h-10" />, name: "Figma" },
                { icon: <PenTool className="w-8 h-8 md:w-10 md:h-10" />, name: "Adobe Illustrator" },
                { icon: <Palette className="w-8 h-8 md:w-10 md:h-10" />, name: "Adobe Photoshop" },
                { icon: <LayoutGrid className="w-8 h-8 md:w-10 md:h-10" />, name: "Sketch" },
                { icon: <FileType className="w-8 h-8 md:w-10 md:h-10" />, name: "Font Managers" },
                { icon: <ImagePlus className="w-8 h-8 md:w-10 md:h-10" />, name: "Asset Libraries" }
              ].map((tool, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 bg-secondary/10 rounded-full text-primary">
                    {tool.icon}
                  </div>
                  <span className="font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden" aria-labelledby="cta-heading">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <SectionHeading
              eyebrow="Get Started"
              title="Ready to Create Your Perfect Logo?"
              subtitle="Let's collaborate to design a logo that perfectly represents your brand identity"
              center={true}
            />
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <CTAButton primary>
                Start Your Logo Project
                <ArrowRight className="w-5 h-5" />
              </CTAButton>
              
              <CTAButton primary={false}>
                View Portfolio
              </CTAButton>
            </div>
            
            <div className="mt-8 text-sm text-foreground/60 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>100% original designs</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span>Professional quality</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default LogoDesign;