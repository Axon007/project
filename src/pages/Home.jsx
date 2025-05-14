import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, memo, useMemo, useCallback } from "react";
import PageTransition from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { Globe } from "@/components/magicui/globe";
import { 
  ArrowRight, Code, Users, Award, BarChart, 
  BadgeCheck, LineChart, Gamepad2, Palette, 
  VideoIcon, Brush, Lightbulb, ArrowLeft,ArrowDown,  MessageSquare, CheckCircle, Phone, Mail, MessageCircle
} from "lucide-react";
import { Smartphone } from "lucide-react";
import FeaturesSectionDemo from '../components/FeaturesSectionDemo';
import { Link } from "react-router-dom";

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
    DEFAULT: "#FCFCFC",
    muted: "#F5F5F5",
  },
  foreground: {
    DEFAULT: "#18181B",
  },
  accent: {
    blue: "#2563EB",
    cyan: "#06B6D4",
    green: "#10B981", 
    yellow: "#FBBF24",
    orange: "#F97316",
  }
};

const UI = {
  // Card patterns - unified
  card: {
    base: "rounded-2xl overflow-hidden border border-secondary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-background/50 backdrop-blur-sm",
    padding: "p-6 md:p-8",
    iconContainer: "mb-6 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center",
    hover: {
      transform: "hover:-translate-y-1",
      glow: "group-hover:opacity-100 opacity-0 transition-opacity duration-300"
    }
  },
  
  // Typography system - unified
  text: {
    heading: {
      h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight",
      h2: "text-2xl sm:text-3xl md:text-4xl font-bold",
      h3: "text-xl md:text-2xl font-bold",
      h4: "text-lg font-semibold",
      section: "text-4xl md:text-5xl font-bold mt-4 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
    },
    body: {
      default: "text-foreground/70",
      sm: "text-sm text-foreground/70",
      lg: "text-lg text-foreground/70"
    },
    accent: "text-primary"
  },
  
  // Gradient patterns - unified
  gradients: {
    primary: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
    hover: "bg-gradient-to-r from-primary/10 to-secondary/10",
    card: "bg-gradient-to-r from-primary/5 to-secondary/5",
    glow: "bg-gradient-to-r from-primary/0 via-primary/30 to-secondary/0 blur-sm"
  },
  
  // Button styles - unified
  button: {
    base: "flex items-center gap-2 font-medium transition-all",
    sizes: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm", 
      lg: "px-6 py-3 text-base"
    },
    variants: {
      primary: "bg-primary hover:bg-primary/90 text-white", 
      secondary: "bg-primary/10 hover:bg-primary/20 text-primary",
      outline: "border-2 border-primary/30 hover:bg-primary/10 text-primary"
    },
    pill: "rounded-full",
    icon: "group-hover:translate-x-1 transition-transform duration-300"
  },
  
  // Section & spacing - unified
  section: {
    padding: "py-16 md:py-24",
    container: "max-w-7xl mx-auto relative z-10",
    eyebrow: "text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block"
  },
  
  // Effects - unified
  effects: {
    glow: "absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-secondary/0 opacity-0 group-hover:opacity-100 rounded-2xl blur-sm transition-opacity duration-300",
    hoverLift: "transition-transform duration-300 hover:-translate-y-1"
  }
};

/* ANIMATIONS */
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

/* REUSABLE COMPONENTS */
const Section = ({ children, dark = false, pattern = false, className = "", id = null }) => (
  <section 
    id={id}
    className={`py-24 px-4 ${
      dark ? 'bg-background' : 
      'bg-background'
    } ${className}`}
    aria-labelledby={id}
  >
    {pattern && (
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    )}
    <div className="max-w-7xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

// Universal Card component
const Card = ({ 
  children, 
  className = "", 
  hoverEffect = true, 
  gradient = false,
  border = true,
  glow = true,
  onClick = null 
}) => (
  <motion.div
    whileHover={hoverEffect ? { y: -5 } : {}}
    transition={{ duration: 0.2 }}
    className={`group relative ${UI.card.base} ${
      border ? "" : "border-0"
    } ${className}`}
    onClick={onClick}
  >
    {/* Conditional glow effect */}
    {glow && (
      <div className={UI.effects.glow}></div>
    )}
    
    {/* Conditional background gradient */}
    {gradient && (
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl"></div>
    )}
    
    {/* Card content */}
    <div className={`${UI.card.padding} relative z-10 h-full flex flex-col`}>
      {children}
    </div>
  </motion.div>
);

// Update the ServiceCard component for better interactivity and visual appeal
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={service.href} tabIndex={0} className="block focus:outline-none" key={index}>
      <div
        className={`${UI.card.base} group relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={-1}
        role="button"
        aria-label={service.title}
      >
        {/* Service glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-secondary/0 opacity-0 group-hover:opacity-100 rounded-2xl blur-sm transition-opacity duration-300"></div>
        
        <div className={`${UI.card.padding} relative z-10 bg-background/95 rounded-2xl h-full flex flex-col`}>
          {/* Icon with enhanced animation */}
          <div className={`${UI.card.iconContainer} relative transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20`}>
            <motion.div 
      
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary/10 rounded-xl" />
            <div className="relative z-10">
              {service.icon}
            </div>
          </div>
          
          {/* Content with better spacing */}
          <h3 className={`text-lg md:text-xl ${UI.text.heading} mb-2 md:mb-3 group-hover:text-primary transition-colors`}>
            {service.title}
          </h3>
          
          <p className={`${UI.text.body} text-sm mb-4 md:mb-6`}>
            {service.description}
          </p>
          
          {/* Features list with improved bullets */}
          <div className="flex-grow">
            <h4 className="text-sm font-medium text-primary/80 mb-3">Features:</h4>
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-foreground/70">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/70"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Bottom CTA with animation */}
          <div className="mt-6 pt-4 border-t border-secondary/10">
            <motion.div 
              className="flex items-center justify-between text-primary font-medium"
              animate={{ x: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm">Learn more</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
            </motion.div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Add this new component for mobile services carousel
const MobileServiceCarousel = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      
      const scrollPosition = carouselRef.current.scrollLeft;
      const itemWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex]);
  
  return (
    <>
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-4 px-4 pb-6"
      >
        {services.map((service, index) => (
          <div 
            key={index} 
            className="w-full flex-shrink-0 snap-center px-2 first:pl-4 last:pr-4"
          >
            <ServiceCard service={service} index={index} />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-1.5 mt-4">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.scrollLeft = index * carouselRef.current.offsetWidth;
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              activeIndex === index 
                ? 'bg-primary' 
                : 'bg-primary/30'
            }`}
          />
        ))}
      </div>
    </>
  );
};

// Update the Services Section
const ServicesSection = memo(() => {
  const isMobile = useRef(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Only check device on client side
    isMobile.current = window.innerWidth < 768;
    setIsClient(true);
    
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    
    // Add passive flag for better scroll performance
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <Section id="our-services-section">
      <SectionHeading 
        eyebrow="What We Do" 
        title="Our Services" 
        description="We deliver cutting-edge solutions tailored to your specific business needs, leveraging the latest technologies and industry best practices."
        center={true} 
      />
      

      
      {/* Service cards - client-side only rendering for better initial load */}
      {isClient && (
        <>
          {isMobile.current ? (
            <MobileServiceCarousel services={SERVICES} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          )}
        </>
      )}
    </Section>
  );
});

/* PROJECTS LIST COMPONENT */
const ProjectsList = ({ projects }) => {
  const [activeProject, setActiveProject] = useState(0);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 lg:border-r border-secondary/10 lg:pr-8">
        <nav className="space-y-1" aria-label="Project Navigation">
          {projects.map((project, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveProject(index)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className={`w-full text-left py-4 px-4 rounded-xl flex items-center justify-between group transition-all ${
                activeProject === index 
                  ? 'bg-primary/10 text-primary shadow-sm' 
                  : 'hover:bg-secondary/5'
              }`}
            >
              <div className="flex items-center">
                <span className={`h-2 w-2 rounded-full mr-3 ${
                  activeProject === index ? 'bg-primary' : 'bg-secondary/30 group-hover:bg-primary/50'
                } transition-colors`}></span>
                <div>
                  <h3 className={`font-medium ${
                    activeProject === index ? 'text-primary' : 'text-foreground/80 group-hover:text-primary/80'
                  } transition-colors`}>
                    {project.title}
                  </h3>
                  <p className="text-xs text-foreground/50 mt-1">{project.category}</p>
                </div>
              </div>
              <ArrowRight
                className={`w-4 h-4 transform transition-all ${
                  activeProject === index ? 'text-primary translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-40 group-hover:translate-x-0'
                }`}
              />
            </motion.button>
          ))}
        </nav>
        
        <div className="hidden lg:block mt-8 pt-8 border-t border-secondary/10">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setActiveProject(prev => (prev === 0 ? projects.length - 1 : prev - 1))}
              className="p-2 rounded-full hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors"
              aria-label="Previous project"
            >
              <ArrowLeft size={20} />
            </button>
            <p className="text-sm text-foreground/60">
              {activeProject + 1} of {projects.length}
            </p>
            <button 
              onClick={() => setActiveProject(prev => (prev === projects.length - 1 ? 0 : prev + 1))}
              className="p-2 rounded-full hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors"
              aria-label="Next project"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden shadow-xl group relative"
          >
            <div className="relative h-[600px] overflow-hidden">
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={projects[activeProject].image}
                  alt={projects[activeProject].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
              
              <div className="absolute top-6 left-6 z-20">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/40 text-white backdrop-blur-sm border border-primary/20">
                  {projects[activeProject].category}
                </span>
              </div>
              
              {projects[activeProject].featured && (
                <div className="absolute top-6 right-6 z-20">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/40 text-white backdrop-blur-sm border border-yellow-500/20">
                    <BadgeCheck className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary/90 transition-colors">
                  <span className="relative">
                    {projects[activeProject].title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                </h3>
                
                <p className="text-white/90 mb-6 max-w-lg text-lg">
                  {projects[activeProject].description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js'].slice(0, 3 + Math.floor(Math.random() * 2)).map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-md text-sm text-white">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  {projects[activeProject].stats && (
                    <div className="flex items-center text-primary/90 text-sm bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                      <BarChart className="w-4 h-4 mr-2" />
                      {projects[activeProject].stats}
                    </div>
                  )}
                  
                  <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center group/btn">
                    View Project
                    <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center justify-between mt-6 lg:hidden">
          <button 
            onClick={() => setActiveProject(prev => (prev === 0 ? projects.length - 1 : prev - 1))}
            className="p-2 rounded-full hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors"
            aria-label="Previous project"
          >
            <ArrowLeft size={20} />
          </button>
          <p className="text-sm text-foreground/60">
            {activeProject + 1} of {projects.length}
          </p>
          <button 
            onClick={() => setActiveProject(prev => (prev === projects.length - 1 ? 0 : prev + 1))}
            className="p-2 rounded-full hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors"
            aria-label="Next project"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* SECTION COMPONENTS */
const SectionHeading = ({ eyebrow, title, center = false, description = null }) => (
  <div className={`mb-16 ${center ? 'text-center' : ''}`}>
    <motion.span
      {...createMotionProps('fadeIn')}
      className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block"
    >
      {eyebrow}
    </motion.span>
    <motion.h2 
      {...createMotionProps('fadeInUp', 0.1)}
      className="text-4xl md:text-5xl font-bold mt-4 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        {...createMotionProps('fadeInUp', 0.2)}
        className={`text-lg text-foreground/70 max-w-2xl ${center ? 'mx-auto' : ''}`}
      >
        {description}
      </motion.p>
    )}
    {center && (
      <motion.div
        {...createMotionProps('fadeInUp', 0.2)}
        className="h-1 w-20 bg-primary mx-auto rounded-full mt-6"
      />
    )}
  </div>
);

const CTAButton = ({ primary = true, children, className = "", small = false, onClick = null }) => (
  <button className={`group relative overflow-hidden rounded-full border-2 ${primary ? 'border-primary' : 'border-primary/70'} ${primary ? 'bg-primary' : 'bg-transparent'} 
    ${small ? 'px-4 py-2 text-sm' : 'px-8 py-4 text-lg'} font-semibold transition-all hover:scale-95 w-full sm:w-auto ${className}`} onClick={onClick}>
    <span className={`relative z-10 transition-colors ${primary ? 'text-background group-hover:text-primary' : 'text-primary group-hover:text-background'} flex items-center justify-center gap-2`}>
      {children}
    </span>
    <div className={`absolute inset-0 z-0 ${primary ? 'bg-background' : 'bg-primary'} translate-y-full transition-transform duration-300 group-hover:translate-y-0`} />
  </button>
);

// Universal Button component
const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  pill = true,
  href = null,
  className = "",
  onClick = null
}) => {
  const buttonClasses = `
    ${UI.button.base}
    ${UI.button.variants[variant]}
    ${UI.button.sizes[size]}
    ${pill ? UI.button.pill : "rounded-lg"}
    ${className}
  `;
  
  const content = (
    <span className="flex items-center justify-center gap-2 group">
      {children}
    </span>
  );
  
  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {content}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={buttonClasses}>
      {content}
    </button>
  );
};

/* CONSTANTS AND DATA */
const COMPANY_LOGOS = [
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg'
];

const SERVICES = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies and best practices for optimal performance",
    icon: <Code className="w-10 h-10 text-primary" />,
    features: ["Responsive Design", "SEO Optimization", "Performance Tuning", "Custom Solutions"],
    href: "/web-development",
    delay: 0
  },
  {
    title: "Game Development",
    description: "Engaging and immersive gaming experiences across multiple platforms using cutting-edge game engines",
    icon: <Gamepad2 className="w-10 h-10 text-primary" />,
    features: ["Unity & Unreal Engine", "Mobile Games", "Cross-platform", "3D/2D Games"],
    href: "/game-development",
    delay: 0.2
  },
  {
    title: "Logo Design",
    description: "Professional branding solutions with unique and memorable logo designs that capture your brand essence",
    icon: <Palette className="w-10 h-10 text-primary" />,
    features: ["Brand Identity", "Vector Graphics", "Color Theory", "Scalable Designs"],
    href: "/logo-design",
    delay: 0.4
  },
  {
    title: "Video Editing",
    description: "Professional video editing services that transform raw footage into compelling visual stories",
    icon: <VideoIcon className="w-10 h-10 text-primary" />,
    features: ["Color Grading", "Motion Graphics", "Audio Mixing", "Post-Production"],
    href: "/video-editing",
    delay: 0.6
  },
  {
    title: "UI/UX Design",
    description: "User-centered design solutions that create intuitive, engaging, and effective digital experiences",
    icon: <Brush className="w-10 h-10 text-primary" />,
    features: ["User Research", "Wireframing", "Prototype Testing", "Interaction Design"],
    href: "/ui-ux-design",
    delay: 0.8
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences across devices",
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"],
    href: "/mobile-app-development",
    delay: 1.0
  }
];

const PROJECTS = [
  {
    title: "E-commerce Platform",
    description: "A full-featured online shopping platform with advanced product filtering and secure checkout",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    featured: true,
    color: THEME.accent.blue
  },
  {
    title: "Corporate Rebrand",
    description: "Complete visual identity overhaul for a Fortune 500 financial services company",
    category: "Logo Design",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    stats: "40% increase in brand recognition",
    color: THEME.accent.orange
  },
  {
    title: "Mobile RPG Game",
    description: "Fantasy role-playing game with immersive 3D environments and strategic combat",
    category: "Game Development",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    featured: true,
    color: THEME.accent.green
  },
  {
    title: "Promotional Video Series",
    description: "Award-winning product launch videos featuring cinematic visuals and compelling storytelling",
    category: "Video Editing",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    stats: "2M+ views",
    color: THEME.accent.cyan
  },
  {
    title: "Banking App Redesign",
    description: "User experience transformation resulting in 40% increase in mobile transactions",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    stats: "85% user satisfaction",
    color: THEME.secondary.DEFAULT
  }
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

const WHY_CHOOSE_US = [
  {
    title: "Expert Team",
    description: "Senior engineers and consultants with 10+ years of industry experience",
    icon: <Users className="w-6 h-6 text-primary" />
  },
  {
    title: "Proven Results",
    description: "Track record of delivering projects on time and exceeding expectations",
    icon: <Award className="w-6 h-6 text-primary" />
  },
  {
    title: "Future-Proof Solutions",
    description: "Technology that scales with your business and adapts to changing needs",
    icon: <Lightbulb className="w-6 h-6 text-primary" />
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

/* HERO SECTION */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 md:pb-24" aria-labelledby="hero-heading">
      {/* Enhanced background with depth layers */}

      {/* Improved globe with better positioning and effects 
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div

          className="w-[min(110vw,110vh)] h-[min(110vw,110vh)] md:w-[800px] md:h-[800px]"
        >
          <Globe />
        </motion.div>
      </div>*/}

      {/* Main content with improved layout */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
          {/* Enhanced label with improved design */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm shadow-lg shadow-primary/5"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-sm font-semibold text-primary">Enterprise Technology Solutions</span>
          </motion.div>
          
          {/* Improved heading with better typography */}
          <div className="space-y-4">
            <motion.h1 
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-violet-700 drop-shadow[0_1px_2px_rgba(0,0,0,0.15)]-sm">
                Jason Tech Solutions
              </span>
            </motion.h1>
            
            {/* Static typing effect replaced here */}
            <div className="h-14 flex items-center justify-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80">
                We help companies <span className="text-primary relative">transform businesses</span>
              </h2>
            </div>
          </div>
          
          {/* Service tags - hover effect removed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2.5 md:gap-3 px-2 mx-auto max-w-3xl"
          >
            {HERO_SERVICES.map((service, i) => (
              <motion.div
                className="
              px-3.5 py-2 rounded-full border border-primary/20 
    bg-primary/5 backdrop-blur-md flex items-center gap-2.5 shadow-sm cursor-default
    dark:bg-neutral-900/80 dark:border-primary/40 dark:backdrop-blur-xl
  "
              >
                <span className="text-primary p-1 bg-primary/10 rounded-full">{service.icon}</span>
                <span className="text-sm font-medium text-foreground/90 dark:text-foreground/90">{service.title}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Improved CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center pt-4"
          >
            <CTAButton 
              primary
              className="group shadow-xl shadow-primary/20 hover:shadow-primary/40 border-primary backdrop-blur-md"
            >
              Get Started
              {/* Keep button hover effect for CTA */}
              <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={18} />
            </CTAButton>
            
            <CTAButton 
              primary={false}
              className="group backdrop-blur-md"
              onClick={() => {
                const section = document.getElementById('our-services-section');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Our Services
              <ArrowDown className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </CTAButton>
          </motion.div>
          
          {/* Improved stats with enhanced visuals */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-12 justify-center pt-6 mt-6 border-t border-secondary/10 py-5 px-8 backdrop-blur-sm bg-white/5 rounded-2xl"
          >
            {[
              { label: "Projects Delivered", value: "500+", icon: <Award className="w-5 h-5" /> },
              { label: "Client Satisfaction", value: "99%", icon: <BadgeCheck className="w-5 h-5" /> },
              { label: "Team Experts", value: "50+", icon: <Users className="w-5 h-5" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center"
                // Removed whileHover for stats
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mr-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{stat.value}</div>
                </div>
                <div className="text-sm text-foreground/70 font-medium dark:text-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* PROJECTS SECTION OPTIMIZATION */
// Optimized Project Card Component
const ProjectCard = memo(({ project, isHovered, onHoverChange }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-secondary/20 hover:border-primary/50 transition-all duration-300"
      style={{ height: '470px' }} // Unified height for all cards
      onMouseEnter={() => onHoverChange(project.title)}
      onMouseLeave={() => onHoverChange(null)}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
        
        {/* Project image with CSS transforms instead of motion */}
        <div
          className="absolute inset-0 w-full h-full transition-transform"
          style={{ 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
            willChange: 'transform'
          }}
        >
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            width="600"
            height="400"
          />
        </div>
        
        {/* Content container - static positioning with CSS transitions */}
        <div className="absolute z-20 bottom-0 w-full p-6 transition-all duration-500">
          <div className="space-y-2 mb-4">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm shadow-lg shadow-black/20"
                style={{ backgroundColor: `${project.color}70` }}
              >
                {project.category.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}
              </span>
              
              {project.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/50 text-white backdrop-blur-sm shadow-lg">
                  <BadgeCheck className="w-3 h-3 mr-1" />
                  Featured
                </span>
              )}
            </div>
          </div>
          
          <div className="transform transition-all duration-500">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-primary/90 transition-colors">
              <span className="relative inline-block">
                {project.title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}
                <span 
                  className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300"
                  style={{ width: isHovered ? '100%' : '0%' }}
                />
              </span>
            </h3>
            
            <p 
              className="text-white/80 mb-6 max-w-lg line-clamp-2 transition-all duration-300"
              style={{ 
                opacity: isHovered ? 1 : 0.8,
                transform: `translateY(${isHovered ? 0 : 5}px)`
              }}
            >
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js'].slice(0, 3 + Math.floor(Math.random() * 2)).map((tech, i) => (
                <span 
                  key={i} 
                  className="px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-md text-xs text-white/90 transition-all duration-300"
                  style={{ 
                    opacity: isHovered ? 1 : 0.6,
                    transform: `translateY(${isHovered ? 0 : 5}px)`,
                    transitionDelay: `${0.1 + (i * 0.05)}s`
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div 
              className="flex items-center justify-between transition-all duration-300"
              style={{ 
                opacity: isHovered ? 1 : 0.8,
                transform: `translateY(${isHovered ? 0 : 5}px)`
              }}
            >
              {project.stats && (
                <div className="flex items-center text-primary/90 text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5">
                  <BarChart className="w-4 h-4 mr-2" />
                  {project.stats}
                </div>
              )}
              
              <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full font-medium transition-all flex items-center group/btn">
                View Project
                <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-60 rounded-bl-full z-10 transition-opacity duration-300 group-hover:opacity-80"
          style={{ background: `radial-gradient(circle at top right, ${project.color}, transparent 70%)` }}
        />
      </div>
    </div>
  );
});

const ProjectsSection = memo(() => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);
  
  // Memoize these values to prevent unnecessary rerenders
  const categories = useMemo(() => ['All', 'Web Development', 'Logo Design', 'Game Development', 'Video Editing', 'UI/UX Design'], []);
  
  // Use useMemo to optimize filtering
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return PROJECTS;
    }
    return PROJECTS.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  // Use useCallback for event handlers
  const handleHoverChange = useCallback((projectTitle) => {
    setHoveredProject(projectTitle);
  }, []);

  return (
    <Section id="projects">
      <SectionHeading 
        eyebrow="Our Portfolio" 
        title="Featured Projects" 
        description="Explore our award-winning work delivered for clients across industries"
        center={true} 
      />
      
      {/* Static filter tabs with CSS transitions */}
      <div className="relative mb-16">
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {categories.map((category, index) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={index}
                onClick={() => setActiveFilter(category)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? 'text-white bg-primary' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>
        
        {/* Removed showing results text */}
        {/* <p className="text-center text-sm text-foreground/50 mt-2">
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          {activeFilter !== 'All' ? ` in ${activeFilter}` : ''}
        </p> */}
      </div>
      
      {/* Optimized grid without AnimatePresence */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={project.title}
            project={project} 
            isHovered={hoveredProject === project.title}
            onHoverChange={handleHoverChange}
          />
        ))}
      </div>
      
      {/* Empty state without animations */}
      {filteredProjects.length === 0 && (
        <div className="bg-secondary/5 backdrop-blur-sm border border-secondary/20 rounded-2xl p-12 text-center my-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <LineChart className="w-10 h-10 text-primary/60" />
          </div>
          <p className="text-xl font-medium mb-4">No projects found</p>
          <p className="text-foreground/60 mb-8 max-w-md mx-auto">
            We couldn't find any projects in the {activeFilter} category. Try selecting a different category or check back later.
          </p>

        </div>
      )}

    </Section>
  );
});

/* DESIGNS SECTION */
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
      
      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-2xl border border-primary/10"
      >
        <h3 className="text-2xl font-bold mb-4">Need custom design solutions?</h3>
        <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
          Our design team is ready to help bring your vision to life with tailored creative solutions that align with your brand and business objectives.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" size="lg" href="/contact">
            Request a Design Consultation
            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" size="lg" href="/portfolio">
            View Full Portfolio
          </Button>
        </div>
      </motion.div>
    </Section>
  );
});

/* 3D CARD SHOWCASE */
const ThreeDCardShowcase = memo(() => {
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - card.top) / card.height - 0.5;  // -0.5 to 0.5
    setMousePosition({ x, y });
  };
  
  const featuredWorks = [
    {
      title: "Immersive 3D Visualization",
      description: "Interactive product showcase with WebGL and Three.js for a premium automotive brand",
      image: "https://images.unsplash.com/photo-1543964198-d54e4f2a833d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: THEME.accent.blue,
      tags: ["Three.js", "WebGL", "Animation"]
    },
    {
      title: "AR Product Experience",
      description: "Augmented reality mobile application enabling virtual product trials before purchase",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: THEME.accent.green,
      tags: ["AR", "Mobile", "3D Modeling"]
    },
    {
      title: "Interactive Data Dashboard",
      description: "Real-time analytics platform with advanced filtering and customizable visualizations",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: THEME.accent.orange,
      tags: ["Data Viz", "Dashboard", "Real-time"]
    }
  ];
  
  return (
    <Section id="featured-work" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          eyebrow="Featured Work" 
          title="Innovative Digital Experiences" 
          description="Pushing the boundaries of what's possible with emerging technologies and creative design"
          center={true}
        />
        
        <div className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - 3D interactive card */}
            <div className="relative h-[500px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
                >
                  <div 
                    className="h-full w-full rounded-2xl overflow-hidden relative group shadow-2xl shadow-black/20"
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
                          src={featuredWorks[activeCard].image} 
                          alt={featuredWorks[activeCard].title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Glowing edges */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(45deg, ${featuredWorks[activeCard].color}00, ${featuredWorks[activeCard].color}40, ${featuredWorks[activeCard].color}00)`,
                          backgroundSize: '200% 200%',
                          animation: 'gradient-animation 3s ease infinite',
                          border: `1px solid ${featuredWorks[activeCard].color}60`,
                          boxShadow: `0 0 40px ${featuredWorks[activeCard].color}40`,
                          transform: 'translateZ(20px)'
                        }}
                      ></div>
                      
                      {/* Content overlay */}
                      <div 
                        className="absolute inset-x-0 bottom-0 p-8 text-white z-20"
                        style={{ transform: 'translateZ(50px)' }}
                      >
                        <div className="flex gap-2 mb-4">
                          {featuredWorks[activeCard].tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                              style={{ 
                                backgroundColor: `${featuredWorks[activeCard].color}40`,
                                border: `1px solid ${featuredWorks[activeCard].color}80`
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{featuredWorks[activeCard].title}</h3>
                        <p className="text-white/80 max-w-md">{featuredWorks[activeCard].description}</p>
                        
                        <div className="mt-6">
                          <button 
                            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-medium flex items-center gap-2 transition-all"
                          >
                            Explore Case Study
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Floating geometric elements */}
                      <div 
                        className="absolute top-8 left-8 w-20 h-20 border border-white/20 rounded-lg opacity-50"
                        style={{ 
                          transform: 'translateZ(30px) rotateZ(10deg)',
                          boxShadow: `0 0 20px ${featuredWorks[activeCard].color}30`
                        }}
                      ></div>
                      
                      <div 
                        className="absolute bottom-32 right-16 w-12 h-12 rounded-full opacity-60"
                        style={{ 
                          background: `linear-gradient(45deg, ${featuredWorks[activeCard].color}60, transparent)`,
                          transform: 'translateZ(40px)'
                        }}
                      ></div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Right side - Project details & navigation */}
            <div className="space-y-8">
              <div className="space-y-6">
                <span className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block">
                  Pushing Boundaries
                </span>
                
                <h3 className="text-3xl md:text-4xl font-bold">
                  Next-generation digital experiences
                </h3>
                
                <p className="text-foreground/70">
                  We combine cutting-edge technologies with innovative design approaches to create immersive, 
                  interactive experiences that captivate users and drive meaningful engagement.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-2">
                  {["WebGL", "Three.js", "AR/VR", "React Three Fiber", "Motion Graphics"].map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-secondary/5 border border-secondary/10 rounded-md text-sm text-foreground/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Featured Projects</h4>
                
                <div className="space-y-3">
                  {featuredWorks.map((work, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                        activeCard === index 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'hover:bg-secondary/5'
                      }`}
                      onClick={() => setActiveCard(index)}
                    >
                      <div 
                        className="w-12 h-12 rounded-lg overflow-hidden shrink-0"
                        style={{ 
                          boxShadow: activeCard === index ? `0 0 0 2px ${work.color}` : 'none',
                          transition: 'box-shadow 0.3s ease'
                        }}
                      >
                        <img 
                          src={work.image} 
                          alt={work.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div>
                        <h5 className={`font-medium transition-colors ${
                          activeCard === index ? 'text-primary' : 'text-foreground'
                        }`}>
                          {work.title}
                        </h5>
                        <p className="text-sm text-foreground/60 line-clamp-1">
                          {work.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <a 
                href="/case-studies" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View all case studies
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Section>
  );
});

/* INTERACTIVE PROCESS TIMELINE */
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
      const timelineCenter = timelineRect.top + timelineRect.height / 2;
      
      // Calculate which step should be active based on scroll position
      const scrollPercentage = (viewportCenter - timelineRect.top) / timelineRect.height;
      const clampedPercentage = Math.max(0, Math.min(1, scrollPercentage));
      const stepIndex = Math.round(clampedPercentage * (processSteps.length - 1)) + 1;
      
      if (stepIndex !== activeStep && stepIndex >= 1 && stepIndex <= processSteps.length) {
        setActiveStep(stepIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
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
    <Section id="our-process" pattern={true} className="py-24">
      <SectionHeading 
        eyebrow="Our Process" 
        title="How We Deliver Excellence" 
        description="A systematic approach that ensures consistent results and exceptional quality across all projects"
        center={true}
      />
      
      <div className="mt-20 relative max-w-6xl mx-auto" ref={timelineRef}>
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-secondary/20 transform -translate-x-1/2"></div>
        
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
            <div key={index} className="relative mb-24 last:mb-0">
              {/* Timeline marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div 
                  className={`
                    h-14 w-14 rounded-full flex items-center justify-center z-10 
                    ${isActive 
                      ? 'bg-primary text-white border-4 border-white shadow-lg shadow-primary/30' 
                      : 'bg-white border-4 border-secondary/20 text-secondary/40'
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
                      ? 'bg-white border-primary/20 shadow-primary/5' 
                      : 'bg-secondary/5 border-secondary/20'
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
                          : 'text-secondary/60 bg-secondary/10'
                      } transition-colors duration-500`}
                      style={{ 
                        backgroundColor: isActive ? process.color : undefined 
                      }}
                    >
                      {process.icon}
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${
                        isActive ? 'text-foreground' : 'text-foreground/60'
                      }`}>
                        {process.title}
                      </h3>
                      <p className="text-foreground/70 mb-4">{process.description}</p>
                      
                      {/* Benefits list with reveal animation */}
                      <AnimatePresence>
                        {isExactlyActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-secondary/10"
                          >
                            <h4 className="font-medium mb-2 text-sm uppercase tracking-wider text-foreground/60">Key Benefits</h4>
                            <ul className="space-y-2">
                              {process.benefits.map((benefit, idx) => (
                                <motion.li 
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center gap-2"
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
                  
                  {/* Progress indicator for current step */}
                  {isExactlyActive && (
                    <div className="mt-4 pt-4 border-t border-secondary/10">
                      <div className="flex items-center justify-between text-xs text-foreground/60">
                        <span>Progress</span>
                        <span>{Math.round((process.step / processSteps.length) * 100)}%</span>
                      </div>
                      <div className="mt-1 bg-secondary/10 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000 ease-out"
                          style={{ width: `${(process.step / processSteps.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Bottom CTA section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20 text-center"
      >
        <div className="bg-white rounded-2xl border border-primary/20 shadow-xl shadow-primary/5 p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-3">Ready to start your project?</h3>
          <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
            Our proven process ensures your project will be delivered on-time, on-budget, and exceed expectations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact">
              Schedule a Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="secondary" size="lg" href="/case-studies">
              View Case Studies
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
});

/* MAIN COMPONENT */
function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="relative bg-gradient-to-b from-background to-background/95">
          <div className="absolute inset-0 w-full h-full">
          </div>
          
          <AuroraBackground className="absolute inset-0" showRadialGradient={true} />

          <HeroSection />

          {/* PARTNERSHIPS SECTION */}
          <section className="relative py-12 px-4">
            <div className="relative z-10 max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 id="partnerships-heading" className="text-primary/80 text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block">
                  TRUSTED BY INDUSTRY LEADERS
                </h2>
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
        </div>

        {/* SERVICES SECTION */}
        <ServicesSection />


       

        {/* PROJECTS SECTION */}
        <ProjectsSection />

        {/* WHY CHOOSE US SECTION - REDESIGNED */}
        <Section className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <div className="relative">
                {/* Background elements */}
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
                
                {/* Main image with floating elements */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
                
                {/* Floating stats cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -right-5 -top-10 bg-white shadow-xl rounded-lg p-3 border border-primary/10 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Team Size</p>
                      <p className="text-lg font-bold text-primary">50+ Experts</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -left-5 -bottom-8 bg-white shadow-xl rounded-lg p-3 border border-primary/10 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Experience</p>
                      <p className="text-lg font-bold text-primary">12+ Years</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 order-1 lg:order-2"
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block"
              >
                Why Choose Us
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold mt-4 mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Technology expertise</span> that drives business growth
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-foreground/70 mb-10 text-base md:text-lg"
              >
                At Jason Tech Solutions, we combine technical excellence with strategic thinking to deliver solutions 
                that not only solve today's challenges but position your business for future success.
              </motion.p>
              
              <div className="space-y-8">
                {WHY_CHOOSE_US.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex gap-5 group"
                  >
                    <div className="mt-1 bg-gradient-to-br from-primary/20 to-secondary/20 h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:shadow-lg group-hover:shadow-primary/10 transition-all" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-foreground/70">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </div>
        </Section>

        {/* TESTIMONIALS SECTION */}
        <Section>
          <SectionHeading 
            eyebrow="Testimonials" 
            title="What Our Clients Say" 
            description="Don't just take our word for it. Here's what our clients have to say about their experience working with us."
            center={true} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: testimonial.delay * 0.5 }}
                className="p-8 rounded-2xl bg-background/50 backdrop-blur border border-secondary/20 relative group hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="absolute -top-5 left-8 text-5xl text-primary/20" aria-hidden="true">"</div>
                <p className="text-foreground/80 mb-6 relative z-10">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-foreground/60">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <a href="#" className="inline-flex items-center text-primary font-medium hover:underline">
              Read more testimonials
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </Section>

        {/* DESIGNS SECTION */}
        <DesignsSection />

        {/* 3D CARD SHOWCASE SECTION */}
        <ThreeDCardShowcase />

        {/* INTERACTIVE PROCESS TIMELINE */}
        <ProcessTimeline />
      </div>
    </PageTransition>
  );
}

export default Home;