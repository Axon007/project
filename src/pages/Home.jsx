import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect, memo } from "react";
import PageTransition from '../components/PageTransition';
import { Link } from "react-router-dom";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Meteors } from "../components/ui/meteor-effect";
import * as THREE from "three";
import { 
  ArrowRight, Code, Users, Award, BarChart, 
  BadgeCheck, LineChart, Gamepad2, Palette, 
  VideoIcon, Brush, ArrowLeft, ArrowDown, MessageSquare, CheckCircle, Phone, MessageCircle, Smartphone, ArrowUpRight,
  Globe, Database, Shield, Gauge
} from "lucide-react";


/* THEME AND UI CONFIGURATION */
const THEME = {
  primary: {
    DEFAULT: "#0070F3", 
    light: "#3291FF",
  },
  secondary: {
    DEFAULT: "#7928CA",
  },
  background: {
    DEFAULT: "#FFFFFF",
    muted: "#F5F5F7",   
    dark: {
      DEFAULT: "#000000", 
      card: "#1C1C1E",  
      muted: "#1D1D1F",  
    }
  },
  foreground: {
    DEFAULT: "#1D1D1F", 
    muted: "#86868B",   
    dark: {
      DEFAULT: "#FFFFFF",
      muted: "#A1A1A6",
    }
  },
  accent: {
    blue: "#007AFF", // Standard Apple blue
    cyan: "#06B6D4",
    green: "#34C759", // Apple green
    yellow: "#FFCC00", // Apple yellow
    orange: "#FF9500", // Apple orange
  }
};

const UI = {
  card: {
    base: "rounded-3xl overflow-hidden border border-[#E5E5E7] dark:border-[#2C2C2E] hover:shadow-lg transition-all duration-300 bg-white dark:bg-[#1C1C1E]",
    padding: "p-6 md:p-8", // Consistent padding
    iconContainer: "mb-4 bg-[#F5F5F7] dark:bg-[#2C2C2E] w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden",
    hover: {
      transform: "hover:-translate-y-1", 
      shine: "absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 dark:via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
    }
  },
  
  text: {
    heading: {
      h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight",
      h2: "text-2xl sm:text-3xl md:text-4xl font-bold",
      h3: "text-xl md:text-2xl font-bold",
      h4: "text-lg font-semibold",
      section: "text-4xl md:text-5xl font-bold mt-3 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary" // Kept for specific headings
    },
    body: {
      default: "text-foreground-muted dark:text-foreground-dark-muted",
      sm: "text-sm text-foreground-muted dark:text-foreground-dark-muted",
      lg: "text-lg text-foreground-muted dark:text-foreground-dark-muted"
    },
    accent: "text-primary dark:text-accent-blue"
  },
  
  gradients: {
    primary: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
    hover: "bg-gradient-to-r from-primary/10 to-secondary/10",
    card: "bg-gradient-to-r from-primary/5 to-secondary/5",
    glow: "bg-gradient-to-r from-primary/0 via-primary/30 to-secondary/0 blur-sm"
  },
  
  button: {
    base: "flex items-center justify-center gap-2 font-medium transition-all duration-300",
    sizes: {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    },
    variants: {
      primary: "bg-[#0071E3] hover:bg-[#0077ED] text-white shadow-sm hover:shadow-md hover:shadow-[#0071E3]/20", // Apple primary blue button
      secondary: "bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-accent-blue",
      outline: "border-2 border-primary/30 dark:border-accent-blue/50 hover:bg-primary/10 dark:hover:bg-accent-blue/10 text-primary dark:text-accent-blue"
    },
    pill: "rounded-full",
    icon: "group-hover:translate-x-0.5 transition-transform duration-300" // More subtle icon movement
  },
  
  section: {
    padding: "py-16 md:py-20", 
    container: "max-w-7xl mx-auto relative z-10 px-4 md:px-6", // Added horizontal padding
    eyebrow: "text-primary dark:text-accent-blue text-sm font-medium uppercase tracking-wider bg-primary/10 dark:bg-primary/20 px-4 py-1.5 rounded-full inline-block border border-primary/20 dark:border-primary/30 shadow-sm"
  },
  
  // Effects - refined for more subtle Apple-like interactions
  effects: {
    shine: "absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 dark:via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
    hoverLift: "transition-transform duration-300 hover:-translate-y-1"
  }
};



/* REUSABLE COMPONENTS */
const Section = ({ children, dark = false, pattern = false, className = "", id = null, fullWidth = false }) => (
  <section 
    id={id}
    className={`py-16 md:py-20 px-4 ${
      dark ? 'bg-background dark:bg-gray-950' : 
      'bg-background dark:bg-inherit'
    } ${className}`}
    aria-labelledby={id}
  >
    <div className={`${fullWidth ? 'w-full' : 'max-w-7xl'} mx-auto relative z-10`}>
      {children}
    </div>
  </section>
);

/* SECTION COMPONENTS */
const SectionHeading = ({ eyebrow, title, center = false, description = null }) => (
  <div className={`mb-10 md:mb-12 ${center ? 'text-center' : ''}`}>
    {/* Optimized eyebrow with static element instead of motion for better performance */}
    <div className="flex items-center justify-center gap-2">
      <span className="text-primary dark:text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 dark:bg-primary/20 px-4 py-1.5 rounded-full inline-block border border-primary/20 dark:border-primary/30 shadow-sm shadow-primary/5">
        {eyebrow}
      </span>
    </div>
    
    {/* Simplified heading with pre-defined height to reduce CLS */}
    <div className="relative max-w-3xl mx-auto mt-4" style={{ minHeight: "min(12vw, 80px)" }}>
      <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-blue-500 leading-tight">
        {title}
      </h2>
    </div>
    
    {/* Simplified description */}
    {description && (
      <p
        className={`text-lg text-foreground/70 dark:text-gray-300 max-w-2xl ${center ? 'mx-auto mt-4' : 'mt-4'} leading-relaxed`}
      >
        {description}
      </p>
    )}
    
    {/* Simplified centered header divider */}
    {center && (
      <div className="relative flex justify-center mt-6">
        <div className="w-64 border-t border-secondary/20"></div>
      </div>
    )}
  </div>
);

/* CONSTANTS AND DATA */
const COMPANY_LOGOS = [
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg'
];


const TESTIMONIALS = [
  {
    quote: "Jason Tech Solutions transformed our operations with their cloud migration strategy. Our infrastructure costs decreased by 40% while performance improved significantly.",
    author: "Sarah Johnson",
    position: "CTO, Global Retail Inc.",
    image: "/api/placeholder/64/64",
    delay: 0
  },
  {
    quote: "The AI solution implemented by the team has revolutionized how we analyze customer data. We're now able to predict trends and make proactive decisions.",
    author: "Michael Chen",
    position: "Data Director, FinTech Solutions",
    image: "/api/placeholder/64/64",
    delay: 0.2
  },
  {
    quote: "After experiencing a security breach, we hired Jason Tech to overhaul our cybersecurity. Their comprehensive approach has given us peace of mind and protected our reputation.",
    author: "Emma Rodriguez",
    position: "CISO, Healthcare Systems",
    image: "/api/placeholder/64/64",
    delay: 0.4
  }
];


const HERO_SERVICES = [
  { title: "Web Development", icon: <Code className="w-4 h-4" /> },
  { title: "Game Development", icon: <Gamepad2 className="w-4 h-4" /> },
  { title: "Logo Design", icon: <Palette className="w-4 h-4" /> },
  { title: "Video Editing", icon: <VideoIcon className="w-4 h-4" /> },
  { title: "UI/UX Design", icon: <Brush className="w-4 h-4" /> },
  { title: "Mobile App Development", icon: <Smartphone className="w-4 h-4" /> },
];


/* Project */
const DesignsSection = memo(() => {
  const [activeTab, setActiveTab] = useState('ui-ux');
  const [selectedDesign, setSelectedDesign] = useState(null);
  
  // Design categories with consistent structure
  const designCategories = {
    'ui-ux': {
      title: 'UI/UX Design',
      description: 'Modern interfaces that enhance user experience and drive engagement',
      designs: [
        {
          id: 'ui-1',
          title: 'Banking Dashboard',
          preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          color: THEME.accent.blue,
          tools: ['Figma', 'Adobe XD', 'Sketch'],
          description: 'Reimagined financial management interface with intuitive analytics and transaction tracking'
        },
        {
          id: 'ui-2',
          title: 'Health App',
          preview: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          color: THEME.accent.green,
          tools: ['Figma', 'Protopie', 'Illustrator'],
          description: 'Wellness tracking application with personalized insights and progress visualization'
        },
        {
          id: 'ui-3',
          title: 'E-commerce Store',
          preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          color: THEME.accent.orange,
          tools: ['Figma', 'Adobe XD', 'After Effects'],
          description: 'High-conversion shopping platform with seamless checkout and personalized recommendations'
        }
      ]
    },
    'brand': {
      title: 'Brand Identity',
      description: 'Cohesive visual systems that communicate brand values and resonate with audiences',
      designs: [
        {
          id: 'brand-1',
          title: 'Eco Wellness',
          preview: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          color: THEME.accent.cyan,
          tools: ['Illustrator', 'Photoshop', 'InDesign'],
          description: 'Complete visual identity for sustainable wellness brand including logo system and packaging'
        },
        {
          id: 'brand-2',
          title: 'Tech Startup',
          preview: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          color: THEME.primary.DEFAULT,
          tools: ['Illustrator', 'Figma', 'After Effects'],
          description: 'Dynamic brand system for AI technology company with adaptable visual elements'
        },
        {
          id: 'brand-3',
          title: 'Urban Cafe',
          preview: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          color: THEME.accent.yellow,
          tools: ['Illustrator', 'Photoshop', 'Procreate'],
          description: 'Artisanal coffee shop branding with hand-drawn elements and signature typography'
        }
      ]
    },
    'print': {
      title: 'Print Design',
      description: 'Tangible brand experiences through thoughtfully crafted physical materials',
      designs: [
        {
          id: 'print-1',
          title: 'Annual Report',
          preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          color: THEME.secondary.DEFAULT,
          tools: ['InDesign', 'Illustrator', 'Photoshop'],
          description: 'Award-winning financial report design with data visualization and editorial layout'
        },
        {
          id: 'print-2',
          title: 'Event Materials',
          preview: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          color: THEME.accent.blue,
          tools: ['InDesign', 'Illustrator', 'Photoshop'],
          description: 'Comprehensive conference collateral including invitations, programs, and signage'
        },
        {
          id: 'print-3',
          title: 'Packaging',
          preview: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          color: THEME.accent.green,
          tools: ['Illustrator', 'Photoshop', 'Dimension'],
          description: 'Sustainable product packaging with innovative structural design and eco-friendly materials'
        }
      ]
    }
  };

  // Get current designs based on active tab
  const currentDesigns = designCategories[activeTab]?.designs || [];
  
  // Design detail modal
  const DesignDetailModal = ({ design, onClose }) => {
    if (!design) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <div className="h-[300px] md:h-[400px] w-full overflow-hidden">
              <img
                src={design.preview}
                alt={design.title}
                className="w-full h-full object-cover"
              />
            
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="p-6 md:p-8">
            <div 
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: `${design.color}20`, color: design.color }}
            >
              {designCategories[activeTab].title}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{design.title}</h3>
            <p className="text-foreground/70 mb-6 text-lg">{design.description}</p>
            
            <div className="mb-8">
              <h4 className="text-sm uppercase tracking-wider text-foreground/50 mb-3">Design Tools</h4>
              <div className="flex gap-2 flex-wrap">
                {design.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-foreground/50 mb-3">Project Scope</h4>
                <ul className="space-y-2">
                  {['Research', 'Wireframing', 'Visual Design', 'Prototyping'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-wider text-foreground/50 mb-3">Deliverables</h4>
                <ul className="space-y-2">
                  {['Design System', 'Interactive Prototype', 'Source Files', 'Documentation'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="primary" size="lg">
                Request Similar Design
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const DesignCard = ({ design }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group cursor-pointer"
        onClick={() => setSelectedDesign(design)}
      >
        <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div>
              <p className="text-white font-medium">{design.title}</p>
              <div className="flex mt-2 gap-2">
                {design.tools.slice(0, 2).map((tool, idx) => (
                  <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Image */}
          <img 
            src={design.preview} 
            alt={design.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Color accent */}
          <div 
            className="absolute top-0 right-0 w-24 h-24 opacity-60 rounded-bl-full"
            style={{ background: `radial-gradient(circle at top right, ${design.color}, transparent 70%)` }}
          />
        </div>
        
        <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
          {design.title}
        </h3>
        <p className="text-sm text-foreground/60 line-clamp-1">{design.description}</p>
      </motion.div>
    );
  };

  return (
    <Section id="designs" pattern={true}>
      <SectionHeading
        eyebrow="Design Showcase" 
        title="Creative Design Solutions" 
        description="Explore our design work across various mediums and industries"
        center={true}
      />
      
      {/* Category tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-secondary/10 p-1 rounded-xl">
          {Object.entries(designCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === key
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-foreground/70 hover:text-foreground hover:bg-secondary/5'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
      
      {/* Description of current category */}
      <div className="text-center mb-12">
        <p className="text-lg text-foreground/70 max-w-xl mx-auto">
          {designCategories[activeTab]?.description}
        </p>
      </div>
      
      {/* Design grid with exit animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Design detail modal */}
      <AnimatePresence>
        {selectedDesign && (
          <DesignDetailModal 
            design={selectedDesign} 
            onClose={() => setSelectedDesign(null)} 
          />
        )}
      </AnimatePresence>
      

    </Section>
  );
});


/*TIMELINE */
const ProcessTimeline = memo(() => {
  const [activeStep, setActiveStep] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const timelineRef = useRef(null);
  
  const processSteps = [
    {
      step: 1,
      title: "Discovery & Research",
      description: "We dive deep into your business needs, market landscape, and user expectations to establish clear project goals.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>,
      color: THEME.accent.blue,
      benefits: [
        "Comprehensive market analysis",
        "User research & persona development",
        "Competitive landscape assessment"
      ]
    },
    {
      step: 2,
      title: "Strategic Planning",
      description: "We develop a tailored roadmap that aligns with your business objectives and addresses user needs.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17 12 22l10-5"/><path d="m2 12 10 5 10-5"/><path d="M12 2 2 7l10 5 10-5-10-5Z"/></svg>,
      color: THEME.accent.green,
      benefits: [
        "Technology stack recommendations",
        "Feature prioritization framework",
        "Implementation timeline & milestones"
      ]
    },
    {
      step: 3,
      title: "Design & Prototype",
      description: "We create intuitive, engaging designs and interactive prototypes that bring your vision to life.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73-4 6.93"/></svg>,
      color: THEME.accent.cyan,
      benefits: [
        "User-centered design approach",
        "Interactive wireframes & mockups",
        "Usability testing & refinement"
      ]
    },
    {
      step: 4,
      title: "Development & Testing",
      description: "Our engineering team builds your solution using modern technologies and best practices.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>,
      color: THEME.accent.orange,
      benefits: [
        "Agile development methodology",
        "Comprehensive quality assurance",
        "Regular progress demonstrations"
      ]
    },
    {
      step: 5,
      title: "Deployment & Support",
      description: "We ensure a smooth launch and provide ongoing support to keep your solution performing optimally.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>,
      color: THEME.accent.yellow,
      benefits: [
        "Seamless deployment process",
        "Performance monitoring & optimization",
        "Ongoing maintenance & updates"
      ]
    }
  ];
  
  // Handle scroll-based timeline navigation
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || isScrolling) return;
      
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const timelinePosition = timelineRect.top;
      const timelineHeight = timelineRect.height;
      
      // Only activate scroll detection when timeline is in view
      if (timelinePosition < viewportCenter && timelinePosition + timelineHeight > 0) {
        // Calculate which step should be active based on scroll position
        const scrollProgress = (viewportCenter - timelinePosition) / timelineHeight;
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        const stepIndex = Math.ceil(clampedProgress * processSteps.length);
        
        if (stepIndex !== activeStep && stepIndex >= 1 && stepIndex <= processSteps.length) {
          setActiveStep(stepIndex);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStep, isScrolling, processSteps.length]);
  
  const handleStepClick = (step) => {
    setIsScrolling(true);
    setActiveStep(step);
    
    // Reset isScrolling after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };
  
  return (
    <Section id="our-process" pattern={true} className="py-20 bg-background dark:bg-gray-900">
      <SectionHeading 
        eyebrow="Our Process" 
        title="How We Deliver Excellence" 
        description="A systematic approach that ensures consistent results and exceptional quality across all projects"
        center={true}
      />
      
      <div className="mt-16 relative max-w-6xl mx-auto min-h-[800px]" ref={timelineRef}>
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-secondary/20 dark:bg-gray-700 transform -translate-x-1/2"></div>
        
        {/* Progress line animating based on active step */}
        <div 
          className="absolute top-0 left-1/2 w-0.5 bg-primary transform -translate-x-1/2 transition-all duration-1000 ease-out"
          style={{ 
            height: `${(activeStep / processSteps.length) * 100}%`,
            maxHeight: '100%'
          }}
        ></div>
        
        {/* Timeline steps */}
        {processSteps.map((process, index) => {
          const isActive = activeStep >= process.step;
          const isPast = activeStep > process.step;
          const isExactlyActive = activeStep === process.step;
          
          return (
            <div key={index} className="relative h-[160px] mb-20 last:mb-0">
              {/* Timeline marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-14 h-14">
                <div 
                  className={`
                    h-14 w-14 rounded-full flex items-center justify-center z-10 
                    ${isActive 
                      ? 'bg-primary text-white border-4 border-white dark:border-gray-900 shadow-lg shadow-primary/30' 
                      : 'bg-white dark:bg-gray-800 border-4 border-secondary/20 dark:border-gray-700 text-secondary/40 dark:text-gray-400'
                    }
                    transition-all duration-500
                  `}
                  style={{
                    transform: isExactlyActive ? 'scale(1.2)' : 'scale(1)'
                  }}
                >
                  <span className="text-lg font-bold">{process.step}</span>
                </div>
                
                {/* Pulsing effect for active step */}
                {isExactlyActive && (
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75"></div>
                    <div className="absolute inset-[-8px] rounded-full border-2 border-primary/30"></div>
                  </div>
                )}
              </div>
              
              {/* Content card with alternating layout */}
              <div className={`relative max-w-lg mx-auto md:mx-0 ${
                index % 2 === 0 
                  ? 'md:ml-auto md:mr-[calc(50%+2rem)]' 
                  : 'md:mr-auto md:ml-[calc(50%+2rem)]'
              }`}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`
                    rounded-xl p-6 border shadow-lg transform transition-all duration-500 cursor-pointer
                    ${isActive 
                      ? 'bg-background dark:bg-gray-800 border-primary/20 dark:border-primary/30 shadow-primary/5' 
                      : 'bg-secondary/5 dark:bg-gray-800/50 border-secondary/20 dark:border-gray-700'
                    }
                    hover:shadow-xl
                  `}
                  onClick={() => handleStepClick(process.step)}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className={`p-3 rounded-lg ${
                        isActive 
                          ? 'text-white' 
                          : 'text-secondary/60 dark:text-gray-400 bg-secondary/10 dark:bg-gray-700/50'
                      } transition-colors duration-500`}
                      style={{ 
                        backgroundColor: isActive ? process.color : undefined 
                      }}
                    >
                      {process.icon}
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${
                        isActive ? 'text-foreground dark:text-white' : 'text-foreground/60 dark:text-gray-400'
                      }`}>
                        {process.title}
                      </h3>
                      <p className="text-foreground/70 dark:text-gray-300 mb-4">{process.description}</p>
                      
                      {/* Benefits list with reveal animation */}
                      <AnimatePresence>
                        {isExactlyActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-secondary/10 dark:border-gray-700"
                          >
                            <h4 className="font-medium mb-2 text-sm uppercase tracking-wider text-foreground/60 dark:text-gray-400">Key Benefits</h4>
                            <ul className="space-y-2">
                              {process.benefits.map((benefit, idx) => (
                                <motion.li 
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center gap-2 dark:text-gray-300"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                  <span>{benefit}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Navigation controls for mobile */}
      <div className="mt-12 flex justify-center gap-2 md:hidden">
        {processSteps.map((step, index) => (
          <button 
            key={index}
            onClick={() => handleStepClick(step.step)}
            className={`w-3 h-3 rounded-full transition-colors ${
              activeStep === step.step 
                ? 'bg-primary' 
                : 'bg-secondary/30 dark:bg-gray-700'
            }`}
            aria-label={`Go to step ${step.step}: ${step.title}`}
          />
        ))}
      </div>
    </Section>
  );
});


/* Upcoming */
const UpcomingProjectsShowcase = memo(() => {
  const [activeProject, setActiveProject] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - card.top) / card.height - 0.5;  // -0.5 to 0.5
    setMousePosition({ x, y });
  };
  
  const upcomingProjects = [
    {
      title: "AI-Powered Customer Analytics",
      description: "Launching soon: Our revolutionary platform that uses machine learning to transform customer data into actionable insights",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: THEME.accent.blue,
      tags: ["AI", "Analytics", "Machine Learning"],
      date: "June 2025",
      status: "Beta phase"
    },
    {
      title: "Immersive VR Training Platform",
      description: "Experience professional training in virtual environments with real-time feedback and adaptive learning paths",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: THEME.accent.green,
      tags: ["VR", "Training", "Education"],
      date: "August 2025",
      status: "In development"
    }
  ];
  
  return (
<Section id="upcoming-projects" className="py-3 md:py-6 lg:py-8 overflow-hidden dark:bg-gray-900">

      <div className="max-w-7xl mx-auto">
        
        <div className="mt-10 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - 3D interactive card - removed shadow */}
            <div className="relative h-[450px] w-full">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeProject}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
                >
                  <div 
                    className="h-full w-full rounded-2xl overflow-hidden relative group"
                    style={{ 
                      perspective: '1500px',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <motion.div
                      className="h-full w-full relative"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        transform: `
                          rotateY(${mousePosition.x * 20}deg) 
                          rotateX(${-mousePosition.y * 20}deg)
                          scale(1.05)
                        `,
                        transition: 'transform 0.5s ease-out'
                      }}
                    >
                      {/* Main image */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10">
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-primary/30 opacity-70 mix-blend-overlay z-10"
                        ></div>
                        <img 
                          src={upcomingProjects[activeProject].image} 
                          alt={upcomingProjects[activeProject].title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Glowing edges */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(45deg, ${upcomingProjects[activeProject].color}00, ${upcomingProjects[activeProject].color}40, ${upcomingProjects[activeProject].color}00)`,
                          backgroundSize: '200% 200%',
                          animation: 'gradient-animation 3s ease infinite',
                          border: `1px solid ${upcomingProjects[activeProject].color}60`,
                          boxShadow: `0 0 40px ${upcomingProjects[activeProject].color}40`
                        }}
                      ></div>
                      
                      {/* Project status banner */}
                      <div 
                        className="absolute top-5 right-5 z-30 px-4 py-2 rounded-full backdrop-blur-md"
                        style={{ 
                          backgroundColor: `${upcomingProjects[activeProject].color}30`,
                          border: `1px solid ${upcomingProjects[activeProject].color}50`
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" 
                              style={{ backgroundColor: upcomingProjects[activeProject].color }}></span>
                            <span className="relative inline-flex rounded-full h-3 w-3" 
                              style={{ backgroundColor: upcomingProjects[activeProject].color }}></span>
                          </span>
                          <span className="text-white text-sm font-medium">{upcomingProjects[activeProject].status}</span>
                        </div>
                      </div>
                      
                      {/* Content overlay */}
                      <div 
                        className="absolute inset-x-0 bottom-0 p-8 text-white z-20"
                        style={{ transform: 'translateZ(50px)' }}
                      >
                        <div className="mb-2">
                          <span className="text-white/80 text-sm font-medium">
                            Launching: {upcomingProjects[activeProject].date}
                          </span>
                        </div>
                        
                        <div className="flex gap-2 mb-4">
                          {upcomingProjects[activeProject].tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                              style={{ 
                                backgroundColor: `${upcomingProjects[activeProject].color}40`,
                                border: `1px solid ${upcomingProjects[activeProject].color}80`
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{upcomingProjects[activeProject].title}</h3>
                        <p className="text-white/80 max-w-md">{upcomingProjects[activeProject].description}</p>
                        
                        <div className="mt-6">
                          <button 
                            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-medium flex items-center gap-2 transition-all"
                          >
                            Request Early Access
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Floating geometric elements */}
                      <div 
                        className="absolute top-8 left-8 w-16 h-16 border border-white/20 rounded-lg opacity-50"
                        style={{ 
                          transform: 'translateZ(30px) rotateZ(10deg)',
                          boxShadow: `0 0 20px ${upcomingProjects[activeProject].color}30`
                        }}
                      ></div>
                      
                      <div 
                        className="absolute bottom-32 right-16 w-10 h-10 rounded-full opacity-60"
                        style={{ 
                          background: `linear-gradient(45deg, ${upcomingProjects[activeProject].color}60, transparent)`,
                          transform: 'translateZ(40px)'
                        }}
                      ></div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Right side - Project details & navigation */}
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 dark:bg-primary/20 px-4 py-1 rounded-full inline-block border border-primary/20 dark:border-primary/40">
                  Upcoming Projects
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                  Tomorrow's <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">solutions, today</span>
                </h2>
                
                <p className="text-foreground/70 dark:text-gray-300">
                  We're constantly innovating and developing new projects to address emerging challenges and opportunities. 
                  Here's an exclusive preview of what we're working on behind the scenes.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-white">Upcoming Launches</h4>
                
                <div className="space-y-3">
                  {upcomingProjects.map((project, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                        activeProject === index 
                          ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30 dark:border-primary/40' 
                          : 'hover:bg-secondary/5 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setActiveProject(index)}
                    >
                      <div 
                        className="w-12 h-12 rounded-lg overflow-hidden shrink-0"
                        style={{ 
                          boxShadow: activeProject === index ? `0 0 0 2px ${project.color}` : 'none',
                          transition: 'box-shadow 0.3s ease'
                        }}
                      >
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium transition-colors ${
                            activeProject === index ? 'text-primary' : 'text-foreground dark:text-white'
                          }`}>
                            {project.title}
                          </h5>
                          <span className="text-xs text-foreground/60 dark:text-gray-400">
                            {project.date}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/60 dark:text-gray-400 line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx="true" global="true">{`
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Section>
  );
});
const Trusted = memo(() => {
  return (
              <section className="py-3 md:py-6 lg:py-8 overflow-hidden dark:bg-gray-900">
            <div className="relative z-10 max-w-7xl mx-auto min-h-[120px]">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ contain: 'paint layout' }}
                className="text-center mb-8"
              >
                          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm shadow-lg shadow-primary/5"
          >
 
            <span className="text-sm font-semibold text-primary"> TRUSTED BY INDUSTRY LEADERS</span>
          </motion.div>
                
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                {COMPANY_LOGOS.map((logo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center justify-center"
                  >
                    <div className="p-4 w-full flex justify-center">
                      <img 
                        src={logo} 
                        alt={`Partner company ${index + 1}`} 
                        className="h-12 opacity-80" 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

  );
});

// ENHANCED SERVICES SECTION WITH REDESIGNED DARK MODE ADAPTATION
// Modular components for better code organization
const ServiceCard = ({ service, isFeatured = false, className = "" }) => {
  const cardClasses = `
    group h-full perspective-1000 
    ${className}
  `;

  const containerClasses = `
    h-full flex flex-col 
    bg-white/80 dark:bg-[#1C1C1E]/95 
    backdrop-blur-sm
    rounded-3xl overflow-hidden 
    shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/20
    transition-all duration-700 ease-out
    border border-[#E5E5E7]/60 dark:border-[#2C2C2E]/80 
    hover:border-[#D1D1D6] dark:hover:border-[#3A3A3C]
    transform hover:translate-y-[-6px] hover:scale-[1.02]
    ${isFeatured ? 'min-h-[420px]' : 'min-h-[380px]'}
  `;

  return (
    <Link to={service.href} className={cardClasses}>
      <div className={containerClasses}>
        {/* Enhanced icon area with improved dark mode */}
        <div className="px-8 pt-8 pb-5 flex justify-start">
          <div className="
            w-16 h-16 flex items-center justify-center 
            rounded-2xl 
            bg-gradient-to-br from-[#F5F5F7] to-[#ECECEC] 
            dark:from-[#2C2C2E] dark:to-[#1F1F21]
            relative overflow-hidden 
            group-hover:shadow-lg 
            group-hover:from-primary/15 group-hover:to-primary/25
            dark:group-hover:from-blue-500/20 dark:group-hover:to-blue-600/30
            transition-all duration-700 ease-out
            group-hover:scale-110 group-hover:rotate-3
          ">
            <div className="
              absolute inset-0 
              bg-gradient-to-br from-transparent via-white/20 to-primary/10 
              dark:from-transparent dark:via-white/5 dark:to-blue-400/15
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-700
            "></div>
            <div className="
              relative z-10 
              text-primary dark:text-blue-400 
              group-hover:text-primary dark:group-hover:text-blue-300
              transition-all duration-500
              drop-shadow-sm
            ">
              {service.icon}
            </div>
          </div>
        </div>
        
        {/* Enhanced content with better typography hierarchy */}
        <div className="px-8 flex-grow flex flex-col">
          <h3 className="
            text-xl font-semibold 
            text-[#1D1D1F] dark:text-[#F2F2F7] 
            mb-3 
            group-hover:text-primary dark:group-hover:text-blue-300
            transition-colors duration-500
            leading-tight
          ">
            {service.title}
          </h3>
          
          <p className="
            text-[#86868B] dark:text-[#98989D] 
            text-base font-normal 
            mb-6 leading-relaxed
            group-hover:text-[#666666] dark:group-hover:text-[#AEAEB2]
            transition-colors duration-500
          ">
            {service.description}
          </p>
          
          {/* Enhanced feature pills with improved dark mode */}
          <div className="flex-grow">
            <div className="flex flex-wrap gap-2.5">
              {service.features.map((feature, i) => (
                <span
                  key={i}
                  className="
                    inline-flex px-3.5 py-2 
                    text-xs font-medium 
                    rounded-full 
                    bg-[#F5F5F7]/80 dark:bg-[#2C2C2E]/80
                    text-[#6E6E73] dark:text-[#E5E5E7] 
                    border border-[#E5E5E7]/50 dark:border-[#3A3A3C]/50
                    hover:bg-[#E5E5E7] dark:hover:bg-[#3A3A3C]
                    hover:border-[#D1D1D6] dark:hover:border-[#48484A]
                    hover:text-[#1D1D1F] dark:hover:text-[#F2F2F7]
                    hover:shadow-sm
                    transition-all duration-400 ease-out
                    backdrop-blur-sm
                  "
                  style={{
                    transitionDelay: `${i * 75}ms`
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Apple-style action area */}
        <div className="
          px-8 py-6 mt-4 
          border-t border-[#F5F5F7]/60 dark:border-[#2C2C2E]/60 
          relative 
          min-h-[64px]
          bg-gradient-to-r from-transparent via-[#FAFAFA]/50 to-transparent
          dark:from-transparent dark:via-[#1A1A1C]/50 dark:to-transparent
        ">
          <div className="flex items-center h-full">
            <span className="
              relative group/link 
              inline-flex items-center 
              text-primary dark:text-blue-400 
              font-medium text-sm 
              opacity-0 group-hover:opacity-100 
              transition-all duration-700 ease-out 
              transform translate-x-[-12px] group-hover:translate-x-0
              hover:text-primary/80 dark:hover:text-blue-300
            ">
              <span className="inline-block">Learn more</span>
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 13 13" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="
                  ml-2 transform 
                  transition-transform duration-400 
                  group-hover/link:translate-x-1.5 group-hover/link:scale-110
                "
              >
                <path d="M6.5 1L12 6.5L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 6.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              <div className="
                absolute bottom-0 left-0 w-full h-0.5 
                bg-gradient-to-r from-primary/20 to-primary/40
                dark:from-blue-400/20 dark:to-blue-400/40
                origin-left scale-x-0 group-hover/link:scale-x-100 
                transition-transform duration-600 ease-out
              "></div>
            </span>
          </div>
        </div>

        {/* Enhanced shine effect with better dark mode support */}
        <div className="
          absolute inset-0 
          bg-gradient-to-tr 
          from-white/0 via-white/40 to-white/0 
          dark:from-white/0 dark:via-white/8 dark:to-white/0
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-1000 
          pointer-events-none
          mix-blend-overlay dark:mix-blend-soft-light
        "></div>
        
        {/* Subtle glow effect for dark mode */}
        <div className="
          absolute inset-0 
          bg-gradient-to-br from-blue-400/0 via-blue-400/5 to-purple-400/5
          dark:from-blue-400/0 dark:via-blue-400/10 dark:to-purple-400/10
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-1000 
          pointer-events-none
          blur-xl
        "></div>
      </div>
    </Link>
  );
};

// Enhanced Services Section with Interactive Cards
const ServicesSection = () => (
  <section className="py-24 px-4" id="services">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="px-4 py-1.5 bg-primary/5 text-primary rounded-full text-sm font-medium">
          Our Expertise
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
          Comprehensive Digital Services
        </h2>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
          From concept to deployment, we offer end-to-end digital solutions tailored to your business needs
        </p>
      </div>

      {/* Featured Services - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[          {
            title: "Web Development",
            description: "Custom websites and web applications built with modern technologies and best practices for optimal performance and user experience. Our expert team delivers responsive, SEO-friendly solutions.",
            icon: <Code className="w-10 h-10 text-primary" />,
            features: ["Responsive Design", "SEO Optimization", "Performance Tuning", "Custom CMS", "E-commerce Solutions"],
            gradient: "from-primary/5 to-violet-500/5",
            featured: true,
            href: "/web-development"
          },
          {
            title: "Computer Vision",
            description: "Advanced image recognition and processing solutions to automate visual data analysis with cutting-edge AI technology. Transform how your business interprets and leverages visual information.",
            icon: <Globe className="w-10 h-10 text-primary" />,
            features: ["Object Detection", "Facial Recognition", "Image Classification", "Real-time Processing", "Custom AI Models"],
            gradient: "from-violet-500/5 to-purple-500/5",
            featured: true,
            href: "/services/computer-vision"
          },        ].map((service, index) => (
          <Link 
            to={service.href}
            key={index}
            className={`group relative overflow-hidden rounded-3xl p-6 hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20 bg-gradient-to-br ${service.gradient} cursor-pointer h-[360px]`}
          >
            {/* Ripple effect animation */}
            <span className="absolute inset-0 w-full h-full">
              <span className="ripple-effect absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-primary/10 opacity-0 group-hover:animate-ripple pointer-events-none"></span>
            </span>
            
            <div className="absolute top-0 left-0 w-full h-full bg-secondary/5 dark:bg-gray-900/95 opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="mb-6 p-3 rounded-xl bg-primary/5 w-fit backdrop-blur-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-foreground/70 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-foreground/60">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Learn more button that appears on hover */}
              <div className="absolute bottom-8 right-8 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Regular Services - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[          {
            title: "Game Development",
            description: "Engaging and immersive gaming experiences across multiple platforms using cutting-edge game engines",
            icon: <Gamepad2 className="w-8 h-8 text-primary" />,
            features: ["Unity & Unreal Engine", "Mobile Games", "Cross-platform"],
            gradient: "from-purple-500/5 to-blue-500/5",
            href: "/game-development"
          },
          {
            title: "Mobile App Development",
            description: "Native and cross-platform mobile applications that deliver seamless user experiences across devices",
            icon: <Smartphone className="w-8 h-8 text-primary" />,
            features: ["iOS & Android", "React Native", "Flutter"],
            gradient: "from-indigo-500/5 to-cyan-500/5",
            href: "/mobile-app-development"
          },
          {
            title: "UI/UX Design",
            description: "User-centered design solutions that create intuitive, engaging, and effective digital experiences",
            icon: <Brush className="w-8 h-8 text-primary" />,
            features: ["User Research", "Wireframing", "Prototype Testing"],
            gradient: "from-blue-500/5 to-teal-500/5",
            href: "/ui-ux-design"
          },
          {
            title: "Logo Design",
            description: "Professional branding solutions with unique and memorable logo designs that capture your brand essence",
            icon: <Palette className="w-8 h-8 text-primary" />,
            features: ["Brand Identity", "Vector Graphics", "Color Theory"],
            gradient: "from-green-500/5 to-emerald-500/5",
            href: "/logo-design"
          },
          {
            title: "Video Editing",
            description: "Professional video editing services that transform raw footage into compelling visual stories",
            icon: <VideoIcon className="w-8 h-8 text-primary" />,
            features: ["Color Grading", "Motion Graphics", "Audio Mixing"],
            gradient: "from-orange-500/5 to-pink-500/5",
            href: "/video-editing"
          },
          {
            title: "Marketing & Social Media",
            description: "Comprehensive digital marketing and social media management services to boost your brand presence",
            icon: <Database className="w-8 h-8 text-primary" />,
            features: ["Content Strategy", "Campaign Management", "Analytics & Insights"],
            gradient: "from-pink-500/5 to-rose-500/5",
            href: "/services/marketing-social-media"          },].map((service, index) => (
          <Link 
            to={service.href}
            key={index}
            className={`group relative overflow-hidden rounded-3xl p-8 hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20 bg-gradient-to-br ${service.gradient} cursor-pointer`}
          >
            {/* Ripple effect animation */}
            <span className="absolute inset-0 w-full h-full">
              <span className="ripple-effect absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-primary/10 opacity-0 group-hover:animate-ripple pointer-events-none"></span>
            </span>
            
            <div className="absolute top-0 left-0 w-full h-full bg-secondary/5 dark:bg-gray-900/95 opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="mb-6 p-3 rounded-xl bg-primary/5 w-fit backdrop-blur-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-foreground/70 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-foreground/60">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Learn more button that appears on hover */}
              <div className="absolute bottom-8 right-8 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* MAIN COMPONENT */
function Home({ theme, toggleTheme }) {
  const canvasRef = useRef(null);
  const techSphereRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  // Add interactive 3D technology sphere
  useEffect(() => {
    if (!techSphereRef.current) return;
    
    const container = techSphereRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 400;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Create sphere
    const geometry = new THREE.SphereGeometry(150, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x7b61ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Add technology icons around the sphere (simplified for this example)
    const iconCount = 20;
    const iconGeometry = new THREE.BoxGeometry(10, 10, 10);
    const iconMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const icons = [];
    for (let i = 0; i < iconCount; i++) {
      const icon = new THREE.Mesh(iconGeometry, iconMaterial);
      const phi = Math.acos(-1 + (2 * i) / iconCount);
      const theta = Math.sqrt(iconCount * Math.PI) * phi;
      
      icon.position.x = 180 * Math.sin(phi) * Math.cos(theta);
      icon.position.y = 180 * Math.sin(phi) * Math.sin(theta);
      icon.position.z = 180 * Math.cos(phi);
      
      icons.push(icon);
      scene.add(icon);
    }
    
    // Animate the sphere
    const animate = () => {
      requestAnimationFrame(animate);
      
      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.003;
      
      // Make icons stay in place relative to the camera
      icons.forEach(icon => {
        icon.lookAt(camera.position);
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7; // 70vh
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particlesArray = [];
    const numberOfParticles = 100;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(123, 97, 255, ${Math.random() * 0.5})`; // Primary color with varying opacity
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(123, 97, 255, ${0.1 - (distance/100) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section with Interactive Sphere and Canvas Background */}
        <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-background"></canvas>

          <motion.div 
            ref={techSphereRef}
            className="absolute top-0 right-0 w-full h-full pointer-events-none z-10"
            style={{ opacity: 0.7 }}
          />
          
          <motion.div 
            className="relative z-20 text-center px-4 max-w-4xl mx-auto"
            style={{ opacity: heroOpacity, y: heroY }}
          >
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm shadow-lg shadow-primary/5 animate-fade-in">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-sm font-semibold text-primary">Enterprise Technology Solutions</span>
          </div>
  <AuroraText
    colors={["#7F00FF", "#E0E0E0", "#9B5DE5", "#BEBEBE"]} // violet + grey gradient
    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"   speed={0.5}
  >
    Jason Tech Solutions
  </AuroraText>
            <motion.p 
              initial={{ opacity: 0, y:20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8"
            >
              We create custom, high-performance websites and web applications 
              that help businesses transform their digital presence.
            </motion.p>
<div className="flex flex-wrap justify-center gap-2.5 md:gap-3 px-2 mx-auto max-w-3xl animate-fade-in mb-8">
  {HERO_SERVICES.map((service, i) => (
    <div
      key={i}
      className="px-3.5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md flex items-center gap-2.5 shadow-sm cursor-default dark:bg-neutral-900/80 dark:border-primary/40 dark:backdrop-blur-xl"
    >
      <span className="text-primary p-1 bg-primary/10 rounded-full">{service.icon}</span>
      <span className="text-sm font-medium text-foreground/90 dark:text-foreground/90">{service.title}</span>
    </div>
  ))}
</div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <a 
                href="#contact" 
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 hover:translate-y-[-2px]"
              >
                Start Your Project
                <ArrowUpRight className="w-5 h-5" />
              </a>
              <a 
                href="#services" 
                className="bg-background border border-primary/30 text-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/5 transition-colors hover:translate-y-[-2px]"
              >
                Explore Services
              </a>
            </motion.div>
          </motion.div>
          
          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-10 left-0 right-0 z-10"
          >
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
              {[
                { value: "150+", label: "Projects Completed" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "5+", label: "Years Experience" },
                { value: "24/7", label: "Support" }              ].map((stat, index) => (
                <div key={index} className="bg-background/40 backdrop-blur-md rounded-xl p-4 text-center border border-gray-300/5">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <Trusted />
        <ServicesSection />
        <UpcomingProjectsShowcase />
        <DesignsSection />


        <ProcessTimeline />
                      <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative p-12 md:p-16 rounded-3xl overflow-hidden"
                  >
                    {/* Animated background with gradient and particles */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-violet-500/20 to-primary/10"></div>
                    <Meteors number={15} />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-5">
                      <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M200,0 Q400,0 500,200 Q400,400 200,400 Q0,400 100,200 Q0,0 200,0 Z" fill="url(#grad1)" />
                        <defs>
                          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7b61ff" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    
                    <div className="relative z-10">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium mb-6">
                          Let's Build Something Amazing
                        </span>
                      </motion.div>
                      
                      <motion.h2 
                        className="text-3xl md:text-5xl font-bold mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        Ready to Start Your Web Project?
                      </motion.h2>
                      
                      <motion.p 
                        className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        Let's collaborate to create a website that elevates your brand, engages your audience, and drives business growth.
                      </motion.p>
                      
                      <motion.div 
                        className="flex flex-wrap gap-6 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <motion.a 
                          href="#contact" 
                          className="relative bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold overflow-hidden group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative flex items-center gap-2">
                            Start Your Project
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </span>
                        </motion.a>
                        
                        <motion.a 
                          href="tel:+1234567890" 
                          className="relative px-8 py-4 rounded-full text-lg font-semibold overflow-hidden group bg-background border border-primary/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="absolute inset-0 w-full h-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative flex items-center gap-2">
                            Schedule a Call
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </span>
                        </motion.a>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </section>
        

      </div>
    </PageTransition>
  );
}

export default Home;