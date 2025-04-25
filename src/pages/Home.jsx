import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import PageTransition from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { Globe } from "@/components/magicui/globe";
import { 
  ArrowRight, Code, Users, Award, BarChart, 
  BadgeCheck, LineChart, Gamepad2, Palette, 
  VideoIcon, Brush, Lightbulb, ArrowLeft, MessageSquare, CheckCircle, Phone, Mail, MessageCircle
} from "lucide-react";
import { Smartphone } from "lucide-react";
import FeaturesSectionDemo from '../components/FeaturesSectionDemo';

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
    <motion.div
      key={index}
      {...createMotionProps('fadeInUp', index * 0.1)}
      className={`${UI.card.base} group relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Service glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-secondary/0 opacity-0 group-hover:opacity-100 rounded-2xl blur-sm transition-opacity duration-300"></div>
      
      <div className={`${UI.card.padding} relative z-10 bg-background/95 rounded-2xl h-full flex flex-col`}>
        {/* Icon with enhanced animation */}
        <div className={`${UI.card.iconContainer} relative transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20`}>
          <motion.div 
            animate={{ 
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary/10 rounded-xl"
          />
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
    </motion.div>
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
const ServicesSection = () => {
  const isMobile = useRef(window.innerWidth < 768);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <Section pattern>
      <SectionHeading 
        eyebrow="What We Do" 
        title="Our Services" 
        description="We deliver cutting-edge solutions tailored to your specific business needs, leveraging the latest technologies and industry best practices."
        center={true} 
      />
      
      {/* Featured Service with highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/20 blur-3xl rounded-full"></div>
          
          <div className="grid md:grid-cols-5 gap-6 md:gap-8 p-6 md:p-8 relative z-10">
            <div className="md:col-span-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <BadgeCheck className="w-4 h-4 mr-2" />
                Most Popular Service
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Web Development Solutions</h3>
              <p className="text-foreground/70 mb-6 md:text-lg">
                We build scalable, high-performance web applications using modern frameworks and best practices.
                Our solutions are designed to deliver exceptional user experiences while meeting your business objectives.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  "Custom Web Applications", 
                  "E-commerce Solutions", 
                  "Progressive Web Apps", 
                  "API Development"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                    <span className="text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {["React", "Node.js", "Next.js", "TypeScript", "GraphQL"].map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-md text-xs border border-primary/10">
                    {tech}
                  </span>
                ))}
              </div>
              
              <button className="group bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-medium transition-all inline-flex items-center">
                Explore Web Development
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="md:col-span-2 relative min-h-[180px] md:min-h-0">
              <img 
                src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Web Development" 
                className="rounded-xl object-cover w-full h-full"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Service cards - responsive display */}
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
      
      {/* Stats banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-5 md:p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl border border-primary/10"
      >
        {[
          { label: "Projects Completed", value: "1,200+", color: "from-blue-500 to-primary" },
          { label: "Team Members", value: "50+", color: "from-primary to-cyan-500" },
          { label: "Years Experience", value: "12+", color: "from-purple-500 to-secondary" },
          { label: "Client Satisfaction", value: "99%", color: "from-secondary to-blue-500" }
        ].map((stat, i) => (
          <div key={i} className="text-center p-4">
            <p className={`text-2xl md:text-4xl font-bold mb-1 md:mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
            <p className="text-xs md:text-sm text-foreground/70">{stat.label}</p>
          </div>
        ))}
      </motion.div>
      
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 md:mt-16 text-center"
      >
        <a href="/services" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-primary hover:bg-primary/90 text-white rounded-full text-sm md:text-base font-medium transition-all group">
          View All Our Services
          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </Section>
  );
};

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

const CTAButton = ({ primary = true, children, className = "", small = false }) => (
  <button className={`group relative overflow-hidden rounded-full border-2 ${primary ? 'border-primary' : 'border-primary/70'} ${primary ? 'bg-primary' : 'bg-transparent'} 
    ${small ? 'px-4 py-2 text-sm' : 'px-8 py-4 text-lg'} font-semibold transition-all hover:scale-95 w-full sm:w-auto ${className}`}>
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
    delay: 0
  },
  {
    title: "Game Development",
    description: "Engaging and immersive gaming experiences across multiple platforms using cutting-edge game engines",
    icon: <Gamepad2 className="w-10 h-10 text-primary" />,
    features: ["Unity & Unreal Engine", "Mobile Games", "Cross-platform", "3D/2D Games"],
    delay: 0.2
  },
  {
    title: "Logo Design",
    description: "Professional branding solutions with unique and memorable logo designs that capture your brand essence",
    icon: <Palette className="w-10 h-10 text-primary" />,
    features: ["Brand Identity", "Vector Graphics", "Color Theory", "Scalable Designs"],
    delay: 0.4
  },
  {
    title: "Video Editing",
    description: "Professional video editing services that transform raw footage into compelling visual stories",
    icon: <VideoIcon className="w-10 h-10 text-primary" />,
    features: ["Color Grading", "Motion Graphics", "Audio Mixing", "Post-Production"],
    delay: 0.6
  },
  {
    title: "UI/UX Design",
    description: "User-centered design solutions that create intuitive, engaging, and effective digital experiences",
    icon: <Brush className="w-10 h-10 text-primary" />,
    features: ["User Research", "Wireframing", "Prototype Testing", "Interaction Design"],
    delay: 0.8
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences across devices",
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"],
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
  const [typedText, setTypedText] = useState("");
  const phrases = ["transform businesses", "build innovative solutions", "drive digital growth", "create amazing experiences"];
  const currentPhraseIndex = useRef(0);
  const currentCharIndex = useRef(0);
  const isDeleting = useRef(false);
  const typingSpeed = useRef(80);

  useEffect(() => {
    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex.current];
      
      if (isDeleting.current) {
        setTypedText(prevText => prevText.substring(0, prevText.length - 1));
        typingSpeed.current = 50;
      } else {
        setTypedText(currentPhrase.substring(0, currentCharIndex.current + 1));
        typingSpeed.current = 80;
      }

      currentCharIndex.current = isDeleting.current 
        ? currentCharIndex.current - 1 
        : currentCharIndex.current + 1;

      if (!isDeleting.current && currentCharIndex.current === currentPhrase.length) {
        isDeleting.current = true;
        typingSpeed.current = 1500; // Pause before deleting
      } else if (isDeleting.current && currentCharIndex.current === 0) {
        isDeleting.current = false;
        currentPhraseIndex.current = (currentPhraseIndex.current + 1) % phrases.length;
        typingSpeed.current = 500; // Pause before typing next phrase
      }
    };

    const timer = setTimeout(type, typingSpeed.current);
    return () => clearTimeout(timer);
  }, [typedText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 md:pb-24" aria-labelledby="hero-heading">
      {/* Enhanced background with depth layers */}

      
      {/* Improved globe with better positioning and effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-[min(110vw,110vh)] h-[min(110vw,110vh)] md:w-[800px] md:h-[800px]"
        >
          <Globe />
        </motion.div>
      </div>
      

      
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
            
            {/* Dynamic typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-14 flex items-center justify-center"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80">
                We help companies <span className="text-primary relative">{typedText}<span className="absolute -right-1 top-0 animate-pulse">|</span></span>
              </h2>
            </motion.div>
          </div>
          
          {/* Enhanced service tags with improved animation and design */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2.5 md:gap-3 px-2 mx-auto max-w-3xl"
          >
            {HERO_SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,112,243,0.15)' }}
                transition={{ delay: 0.6 + (i * 0.08), duration: 0.4 }}
                className="px-3.5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md flex items-center gap-2.5 shadow-sm hover:shadow-md hover:shadow-primary/10 cursor-pointer"
              >
                <span className="text-primary p-1 bg-primary/10 rounded-full">{service.icon}</span>
                <span className="text-sm font-medium text-foreground/90 dark:text-foreground/90">{service.title}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Improved CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center pt-4"
          >
            <CTAButton 
              primary
              className="group shadow-xl shadow-primary/20 hover:shadow-primary/40 border-primary backdrop-blur-md"
            >
              Get Started
              <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={18} />
            </CTAButton>
            
            <CTAButton 
              primary={false}
              className="group backdrop-blur-md"
            >
              Watch Demo
              <VideoIcon className="ml-1 group-hover:scale-110 transition-transform duration-300" size={18} />
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
                whileHover={{ scale: 1.05 }}
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

/* PROJECTS SECTION REDESIGN */
const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Web Development', 'Logo Design', 'Game Development', 'Video Editing', 'UI/UX Design'];
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS);
  
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(PROJECTS);
    } else {
      setFilteredProjects(PROJECTS.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <Section pattern id="projects">
      <SectionHeading 
        eyebrow="Our Portfolio" 
        title="Featured Projects" 
        description="Explore our award-winning work delivered for clients across industries"
        center={true} 
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === category 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'bg-secondary/10 text-foreground/70 hover:bg-secondary/20'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-2xl border border-secondary/20 hover:border-primary/50 transition-all duration-300"
            >
              {/* Project Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
                    style={{ backgroundColor: `${project.color}40` }}
                  >
                    {project.category}
                  </span>
                </div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/30 text-white backdrop-blur-sm">
                      <BadgeCheck className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              {/* Project Content */}
              <div className="p-6 bg-white/5 backdrop-blur-sm border-t border-white/10">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js'].slice(0, 3 + Math.floor(Math.random() * 2)).map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary/80">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Project Stats & CTA */}
                <div className="flex items-center justify-between">
                  {project.stats && (
                    <div className="flex items-center text-primary/80 text-xs">
                      <BarChart className="w-3 h-3 mr-1" />
                      {project.stats}
                    </div>
                  )}
                  
                  <button className={`${UI.button.base} ${UI.button.pill} ${UI.button.primary} px-4 py-1.5 group/btn ml-auto`}>
                    View Details
                    <ArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              
              {/* Hover Border Effect */}
              <div 
                className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-all duration-300 pointer-events-none"
                style={{ background: `linear-gradient(120deg, transparent, ${project.color}20, transparent)` }}
              ></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-lg text-foreground/70">No projects found in this category.</p>
          <button 
            onClick={() => setActiveFilter('All')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium"
          >
            View all projects
          </button>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <a href="/projects" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-all group">
          View All Projects
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </Section>
  );
};

/* PROCESS SECTION WITH STICKY STACKING CARDS */
const ProcessSection = () => {
  // This will be used for the observer
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const prevActiveCard = useRef(0);
  
  const PROCESS_CARDS = [
    {
      id: 1,
      title: "Contact Us",
      description: "Reach out to discuss your project.",
      icon: <Users className="w-6 h-6 text-primary" />,
      color: "from-blue-500/20 to-indigo-500/20"
    },
    {
      id: 2,
      title: "Share Your Requirements",
      description: "Tell us your goals and ideas.",
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      color: "from-indigo-500/20 to-violet-500/20"
    },
    {
      id: 3,
      title: "Set Your Budget",
      description: "We'll plan a solution that fits.",
      icon: <LineChart className="w-6 h-6 text-primary" />,
      color: "from-violet-500/20 to-purple-500/20"
    },
    {
      id: 4,
      title: "Project Development",
      description: "Our team builds your solution.",
      icon: <Code className="w-6 h-6 text-primary" />,
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: 5,
      title: "Testing & Delivery",
      description: "Quality assurance and project handover.",
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      color: "from-pink-500/20 to-rose-500/20"
    }
  ];

  // Debounce function to improve performance
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.6, 0.8]
    };

    // Debounced handler for smoother transitions
    const handleIntersection = debounce((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the card index from the data attribute
          const cardIndex = parseInt(entry.target.dataset.index);
          
          // Smooth transition between cards
          setActiveCard(prev => {
            prevActiveCard.current = prev;
            return cardIndex;
          });
        }
      });
    }, 50); // 50ms debounce

    const observer = new IntersectionObserver(handleIntersection, options);

    // Get all the card elements and observe them
    const cardElements = containerRef.current?.querySelectorAll('.process-card-item');
    if (cardElements) {
      cardElements.forEach((card) => {
        observer.observe(card);
      });
    }

    return () => {
      if (cardElements) {
        cardElements.forEach((card) => {
          observer.unobserve(card);
        });
      }
    };
  }, []);

  return (
    <Section pattern id="process" aria-labelledby="process-heading">
      <SectionHeading 
        eyebrow="Simple Process" 
        title="To Get You Started" 
        description="We've streamlined our workflow to make your experience seamless and straightforward from start to finish."
        center={true} 
      />
      
      <div className="mt-16 relative">
        {/* Left side - sticky cards that stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 lg:h-[800px] relative">
            <div className="sticky top-24">
              <AnimatePresence mode="popLayout">
                {PROCESS_CARDS.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ 
                      opacity: activeCard > index + 2 ? 0 : 1,
                      y: 0
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={`absolute inset-0 p-8 rounded-2xl bg-gradient-to-br ${card.color} border border-primary/10 shadow-xl transition-all duration-300 backdrop-blur-sm h-80`}
                    style={{
                      transform: `perspective(1000px) rotateX(0deg) rotateY(${activeCard >= index ? 0 : 5}deg) rotateZ(0deg) scale(${1 - Math.min(Math.max(activeCard - index, 0), 3) * 0.05})`,
                      top: `${Math.min(Math.max(activeCard - index, 0), 3) * 40}px`,
                      zIndex: PROCESS_CARDS.length - index
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur flex items-center justify-center shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {card.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary/80 mb-1">Step {card.id}</div>
                        <h3 className="text-2xl font-bold mb-2" id={`process-step-title-${card.id}`}>{card.title}</h3>
                        <p className="text-foreground/70">{card.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Right side - scrolling content that activates the cards */}
          <div className="lg:col-span-6" ref={containerRef}>
            {PROCESS_CARDS.map((card, index) => (
              <article 
                className="process-card-item h-80 mb-8 p-8 rounded-2xl border border-secondary/20 bg-secondary/5 backdrop-blur-sm"
                key={card.id}
                data-index={index}
                aria-labelledby={`process-step-${card.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {card.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary/80 mb-1">Step {card.id}</div>
                    <h3 className="text-2xl font-bold mb-4" id={`process-step-${card.id}`}>{card.title}</h3>
                    <p className="text-foreground/70 mb-6">{card.description}</p>
                    {/* Additional content for each step */}
                    <div className="pl-6 border-l-2 border-primary/20">
                      {index === 0 && (
                        <div className="space-y-2">
                          <p className="text-sm text-foreground/80">Ready to transform your business with technology? Contact us through:</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>Call us at (123) 456-7890</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-primary" />
                            <span>Email at info@jasontechsolutions.com</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MessageCircle className="w-4 h-4 text-primary" />
                            <span>Chat with us online</span>
                          </div>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="space-y-2">
                          <p className="text-sm text-foreground/80">We'll discuss:</p>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Your business goals and objectives</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Target audience and market positioning</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Technical requirements and constraints</span>
                          </div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="space-y-2">
                          <p className="text-sm text-foreground/80">We offer flexible pricing options:</p>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Fixed price projects</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Time and materials model</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Retainer agreements for ongoing work</span>
                          </div>
                        </div>
                      )}
                      {index === 3 && (
                        <div className="space-y-2">
                          <p className="text-sm text-foreground/80">Our development process includes:</p>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Regular progress updates</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Iterative development with feedback cycles</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Transparent project management</span>
                          </div>
                        </div>
                      )}
                      {index === 4 && (
                        <div className="space-y-2">
                          <p className="text-sm text-foreground/80">Before delivery, we ensure:</p>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Comprehensive testing and quality assurance</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Complete documentation and knowledge transfer</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Ongoing support options as needed</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

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

        {/* PROCESS SECTION */}
        <ProcessSection />

        <FeaturesSectionDemo />

        {/* PROJECTS SECTION */}
        <ProjectsSection />

        {/* WHY CHOOSE US SECTION - REDESIGNED */}
        <Section className="py-16 md:py-24" pattern>
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
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-10"
              >
                <button className="inline-flex items-center px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-medium transition-all group">
                  Learn More About Our Approach
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </button>
              </motion.div>
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
      </div>
    </PageTransition>
  );
}

export default Home;