import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, memo } from "react";
import PageTransition from '../components/PageTransition';
import { Globe } from "@/components/magicui/globe";
import { 
  ArrowRight, Code, Users, Award, BarChart, 
  BadgeCheck, LineChart, Gamepad2, Palette, 
  VideoIcon, Brush, Lightbulb, ArrowLeft,ArrowDown,  MessageSquare, CheckCircle, Phone, Mail, MessageCircle,Smartphone 
} from "lucide-react";
import { Link } from "react-router-dom";
import { AuroraText } from "@/components/magicui/aurora-text";


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
const Section = ({ children, dark = false, pattern = false, className = "", id = null, fullWidth = false }) => (
  <section 
    id={id}
    className={`py-24 px-4 ${
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




/* SECTION COMPONENTS */
const SectionHeading = ({ eyebrow, title, center = false, description = null }) => (
  <div className={`mb-16 ${center ? 'text-center' : ''}`}>
    {/* Modified eyebrow to remove the dots/lines */}
    <motion.div
      {...createMotionProps('fadeIn')}
      className="flex items-center justify-center gap-2"
    >
      <span className="text-primary dark:text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 dark:bg-primary/20 px-4 py-1.5 rounded-full inline-block border border-primary/20 dark:border-primary/30 shadow-sm shadow-primary/5">
        {eyebrow}
      </span>
    </motion.div>
    
    {/* Enhanced title with stronger gradient effect and highlight */}
    <motion.div 
      {...createMotionProps('fadeInUp', 0.1)}
      className="relative max-w-3xl mx-auto mt-5"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-secondary/0 dark:from-primary/0 dark:via-primary/30 dark:to-secondary/10 blur-xl opacity-30 -z-10 rounded-full"></div>
      <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-blue-500 leading-tight">
        {title}
      </h2>
    </motion.div>
      {/* Enhanced description with better readability */}
    {description && (
      <motion.p
        {...createMotionProps('fadeInUp', 0.2)}
        className={`text-lg text-foreground/70 dark:text-gray-300 max-w-2xl ${center ? 'mx-auto mt-5' : 'mt-5'} leading-relaxed`}
      >
        {description}
      </motion.p>
    )}
    
    {/* Removed the additional visual divider for centered headers */}
    {center && (
      <motion.div
        {...createMotionProps('fadeInUp', 0.3)}
        className="relative flex justify-center mt-8"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-64 border-t border-secondary/20"></div>
        </div>
      </motion.div>
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


const HERO_SERVICES = [
  { title: "Web Development", icon: <Code className="w-4 h-4" /> },
  { title: "Game Development", icon: <Gamepad2 className="w-4 h-4" /> },
  { title: "Logo Design", icon: <Palette className="w-4 h-4" /> },
  { title: "Video Editing", icon: <VideoIcon className="w-4 h-4" /> },
  { title: "UI/UX Design", icon: <Brush className="w-4 h-4" /> },
  { title: "Mobile App Development", icon: <Smartphone className="w-4 h-4" /> },
];

/* HERO SECTION - REMOVED BACKGROUND PATTERN LINES */
const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16 md:pb-24" aria-labelledby="hero-heading">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[min(110vw,110vh)] h-[min(110vw,110vh)] md:w-[800px] md:h-[800px] animate-scale-in" style={{ aspectRatio: '1/1' }}>
          <Globe />
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm shadow-lg shadow-primary/5 animate-fade-in">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-sm font-semibold text-primary">Enterprise Technology Solutions</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 animate-slide-in-up">
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-violet-700 drop-shadow[0_1px_2px_rgba(0,0,0,0.15)]-sm">
                <AuroraText>Jason Tech Solutions</AuroraText>
              </span>
            </h1>

            <div className="h-14 flex items-center justify-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80">
                We help companies <span className="text-primary relative">transform businesses</span>
              </h2>
            </div>
          </div>

          {/* Service Tags */}
          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 px-2 mx-auto max-w-3xl animate-fade-in">
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center pt-4 animate-slide-in-up">
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
              onClick={() => {
                const section = document.getElementById('our-services-section');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Our Services
              <ArrowDown className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </CTAButton>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-12 justify-center pt-6 mt-6 border-t border-secondary/10 py-5 px-8 backdrop-blur-sm bg-white/5 rounded-2xl animate-fade-in">
            {[
              { label: "Projects Delivered", value: "500+", icon: <Award className="w-5 h-5" /> },
              { label: "Client Satisfaction", value: "99%", icon: <BadgeCheck className="w-5 h-5" /> },
              { label: "Team Experts", value: "50+", icon: <Users className="w-5 h-5" /> }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mr-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{stat.value}</div>
                </div>
                <div className="text-sm text-foreground/70 font-medium dark:text-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
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
            width="600" 
            height="400"
            style={{ aspectRatio: '3/2' }}
            loading="lazy"
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


// Component to render the content for each project card
const ProjectContent = ({ project }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-gray-800 p-8 md:p-14 rounded-3xl mb-4">
      <div className="max-w-3xl mx-auto">
        {/* Project description */}
        <p className="text-gray-600 dark:text-gray-300 text-base md:text-2xl font-sans mb-8">
          <span className="font-bold text-gray-800 dark:text-white">
            {project.title}.
          </span>{" "}
          {project.description}
        </p>
        
        {/* Project details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js'].slice(0, 3 + Math.floor(Math.random() * 2)).map((tech, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Key Features</h3>
            <ul className="space-y-2">
              {Array(3).fill(0).map((_, i) => (
                <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {i === 0 ? 'Responsive design across all devices' : 
                   i === 1 ? 'Optimized for performance and SEO' : 
                   'Intuitive user interface and experience'}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Project showcase */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
          
          {project.featured && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              FEATURED PROJECT
            </div>
          )}
          
          {project.stats && (
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
              {project.stats}
            </div>
          )}
        </div>
        
        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 group">
            View Project Details
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

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

/* INTERACTIVE SOLUTION FINDER */
const SolutionFinder = memo(() => {
  const [activeCategory, setActiveCategory] = useState('business');
  const [showResults, setShowResults] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Card tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) / (rect.width / 2);
    const moveY = (e.clientY - centerY) / (rect.height / 2);
    setMousePosition({ x: moveX * 5, y: moveY * -5 });
  };
  
  const resetMousePosition = () => {
    setMousePosition({ x: 0, y: 0 });
  };
  
  // Solution finder categories and options
  const categories = {
    business: {
      title: "Business Solutions",
      icon: <BarChart className="w-5 h-5" />,
      description: "Find the perfect digital solution tailored to your business needs",
      color: THEME.accent.blue,
      options: [
        {
          question: "What's your primary business goal?",
          choices: [
            { id: "conversion", label: "Increase conversion rates" },
            { id: "visibility", label: "Improve online visibility" },
            { id: "automation", label: "Automate business processes" },
            { id: "analytics", label: "Better data insights" }
          ]
        },
        {
          question: "What's your timeline?",
          choices: [
            { id: "immediate", label: "Immediate (1-2 months)" },
            { id: "quarter", label: "This quarter (3-6 months)" },
            { id: "year", label: "This year (6-12 months)" }
          ]
        }
      ]
    },
    creative: {
      title: "Creative Solutions",
      icon: <Palette className="w-5 h-5" />,
      description: "Discover creative services to bring your brand vision to life",
      color: THEME.accent.green,
      options: [
        {
          question: "What's your creative priority?",
          choices: [
            { id: "branding", label: "Brand identity & design" },
            { id: "content", label: "Content creation" },
            { id: "experience", label: "User experience" },
            { id: "innovation", label: "Creative innovation" }
          ]
        },
        {
          question: "What's your brand style?",
          choices: [
            { id: "modern", label: "Modern & minimal" },
            { id: "bold", label: "Bold & vibrant" },
            { id: "traditional", label: "Traditional & established" },
            { id: "playful", label: "Playful & approachable" }
          ]
        }
      ]
    },
    technical: {
      title: "Technical Solutions",
      icon: <Code className="w-5 h-5" />,
      description: "Explore technical solutions to power your digital infrastructure",
      color: THEME.accent.orange,
      options: [
        {
          question: "What technical challenge are you facing?",
          choices: [
            { id: "performance", label: "Performance optimization" },
            { id: "scaling", label: "Scaling infrastructure" },
            { id: "security", label: "Security enhancements" },
            { id: "integration", label: "System integration" }
          ]
        },
        {
          question: "What's your technical environment?",
          choices: [
            { id: "cloud", label: "Cloud-based" },
            { id: "onprem", label: "On-premises" },
            { id: "hybrid", label: "Hybrid infrastructure" }
          ]
        }
      ]
    }
  };
  
  // Handle option selection
  const handleOptionSelect = (questionIndex, optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: optionId
    });
    
    // If this is the last question, show results
    if (questionIndex === categories[activeCategory].options.length - 1) {
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };
  
  // Reset selections when changing category
  useEffect(() => {
    setSelectedOptions({});
    setShowResults(false);
  }, [activeCategory]);
  
  // Get recommended solutions based on selections
  const getRecommendedSolutions = () => {
    const solutions = {
      business: [
        {
          title: "Enterprise Dashboard",
          description: "Real-time analytics and reporting for business intelligence",
          icon: <BarChart className="w-6 h-6" />,
          link: "/services/enterprise-dashboard"
        },
        {
          title: "Marketing Automation",
          description: "Streamline your marketing efforts with intelligent automation",
          icon: <MessageSquare className="w-6 h-6" />,
          link: "/services/marketing-automation"
        }
      ],
      creative: [
        {
          title: "Brand Identity Package",
          description: "Complete visual identity system with logo, colors, and guidelines",
          icon: <Palette className="w-6 h-6" />,
          link: "/services/brand-identity"
        },
        {
          title: "UX Design Sprint",
          description: "Rapid prototyping and user testing to validate your ideas",
          icon: <Smartphone className="w-6 h-6" />,
          link: "/services/ux-design"
        }
      ],
      technical: [
        {
          title: "Cloud Migration",
          description: "Seamlessly transition your infrastructure to the cloud",
          icon: <Code className="w-6 h-6" />,
          link: "/services/cloud-migration"
        },
        {
          title: "Security Audit",
          description: "Comprehensive assessment of your digital security posture",
          icon: <BadgeCheck className="w-6 h-6" />,
          link: "/services/security-audit"
        }
      ]
    };
    
    return solutions[activeCategory];
  };
  
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background blur elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block">
            Interactive Solution Finder
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            Find Your Perfect <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Solution</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Answer a few quick questions and discover the ideal services tailored to your specific needs
          </p>
        </motion.div>
        
        {/* Interactive card with glassmorphism effect */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={resetMousePosition}
        >
          <motion.div
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              transition: "transform 0.1s ease"
            }}
            className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Card inner content */}
            <div className="p-6 md:p-8">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center">
                {Object.entries(categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === key
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-secondary/5 hover:bg-secondary/10 text-foreground/70'
                    }`}
                  >
                    <div className="p-1 rounded-full bg-white/20">
                      {category.icon}
                    </div>
                    {category.title}
                  </button>
                ))}
              </div>
              
              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center mb-8"
                >
                  <p className="text-foreground/80">
                    {categories[activeCategory].description}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Questions and options */}
              {!showResults ? (
                <div className="space-y-10 mb-4">
                  {categories[activeCategory].options.map((option, questionIndex) => (
                    <div key={questionIndex}>
                      <h3 className="text-lg font-semibold mb-4">
                        {option.question}
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {option.choices.map((choice) => (
                          <motion.button
                            key={choice.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOptionSelect(questionIndex, choice.id)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              selectedOptions[questionIndex] === choice.id 
                                ? `border-2 border-${categories[activeCategory].color} bg-${categories[activeCategory].color}/10 shadow-md`
                                : 'border-secondary/20 hover:border-primary/30 bg-white/40'
                            }`}
                            style={{
                              borderColor: selectedOptions[questionIndex] === choice.id 
                                ? categories[activeCategory].color 
                                : undefined,
                              backgroundColor: selectedOptions[questionIndex] === choice.id 
                                ? `${categories[activeCategory].color}10` 
                                : undefined
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span>{choice.label}</span>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedOptions[questionIndex] === choice.id
                                  ? `border-${categories[activeCategory].color} bg-${categories[activeCategory].color}`
                                  : 'border-secondary/40'
                              }`}
                              style={{
                                borderColor: selectedOptions[questionIndex] === choice.id 
                                  ? categories[activeCategory].color 
                                  : undefined,
                                backgroundColor: selectedOptions[questionIndex] === choice.id 
                                  ? categories[activeCategory].color 
                                  : undefined
                              }}
                              >
                                {selectedOptions[questionIndex] === choice.id && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Your Recommended Solutions</h3>
                    <p className="text-foreground/70">Based on your selections, here are our tailored recommendations</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {getRecommendedSolutions().map((solution, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="p-6 rounded-xl border border-primary/20 bg-white/60 backdrop-blur-sm hover:shadow-lg hover:border-primary/40 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary">
                            {solution.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-lg mb-1">{solution.title}</h4>
                            <p className="text-sm text-foreground/70">{solution.description}</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-secondary/10">
                          <a 
                            href={solution.link}
                            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                          >
                            Learn more about this solution
                            <ArrowRight size={16} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setSelectedOptions({});
                        setShowResults(false);
                      }}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                    >
                      <ArrowLeft size={16} />
                      Start over
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Progress indicator (only shown before results) */}
              {!showResults && (
                <div className="mt-8 pt-6 border-t border-secondary/10">
                  <div className="flex items-center justify-between text-sm text-foreground/60">
                    <span>Progress</span>
                    <span>
                      {Object.keys(selectedOptions).length} of {categories[activeCategory].options.length} answered
                    </span>
                  </div>
                  <div className="mt-2 bg-secondary/10 rounded-full h-2">
                    <div 
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${(Object.keys(selectedOptions).length / categories[activeCategory].options.length) * 100}%`,
                        backgroundColor: categories[activeCategory].color
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Card border glow effect */}
            <div 
              className="absolute inset-0 -z-10 opacity-40"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${categories[activeCategory].color}40, transparent 70%)`,
                borderRadius: "inherit"
              }}
            ></div>
          </motion.div>
          
          {/* Card shadow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-secondary/0 -z-20 blur-xl opacity-30"></div>
        </motion.div>
        
        {/* Quick options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-foreground/70 mb-6">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Schedule a consultation", href: "/contact", icon: <Phone className="w-4 h-4" /> },
              { label: "View all services", href: "/services", icon: <BarChart className="w-4 h-4" /> },
              { label: "Chat with an expert", href: "/chat", icon: <MessageCircle className="w-4 h-4" /> }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/5 hover:bg-secondary/10 text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

/* UPCOMING PROJECTS SHOWCASE WITH 3D EFFECT */
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
            {/* Left side - 3D interactive card */}
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

// ENHANCED SERVICES SECTION WITH PREMIUM APPLE DESIGN LANGUAGE
const ServicesSection = () => (
  <Section id="our-services-section" pattern={false}>
    <SectionHeading
      eyebrow="Our Services"
      title="What We Offer"
      description="Premium digital solutions crafted for your business, using the latest technology and design thinking."
      center={true}
    />

    {/* New featured services in two-column layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {/* Computer Vision Service Card */}
      <div className="group h-full perspective-1000">
        <div className="h-full flex flex-col bg-white dark:bg-[#1C1C1E] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-[#E5E5E7] dark:border-[#2C2C2E] transform hover:translate-y-[-4px]">
          {/* Enhanced icon area with subtle float animation */}
          <div className="px-8 pt-8 pb-5 flex justify-start">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#F5F5F7] dark:bg-[#2C2C2E] relative overflow-hidden group-hover:shadow-md group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-primary dark:text-white group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Content with enhanced typography and animations */}
          <div className="px-8 flex-grow flex flex-col">
            <div className="inline-flex items-center mb-2">
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-400/10 text-blue-400 mr-2">Featured</span>
              <h3 className="text-xl font-medium text-[#1D1D1F] dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300">
                Computer Vision
              </h3>
            </div>
            
            <p className="text-[#86868B] dark:text-[#A1A1A6] text-base font-normal mb-6 leading-relaxed">
              Advanced image recognition and processing solutions to automate visual data analysis and extract actionable insights.
            </p>
            
            {/* Enhanced feature pills with staggered hover effects */}
            <div className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {["Object Detection", "Facial Recognition", "Image Classification", "Real-time Processing", "Custom Models"].map((feature, i) => (
                  <span
                    key={i}
                    className="inline-flex px-3 py-1.5 text-xs font-medium rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#6E6E73] dark:text-[#E5E5E7] hover:bg-[#E5E5E7] dark:hover:bg-[#3C3C3E] transition-colors duration-300"
                    style={{
                      transitionDelay: `${i * 50}ms`
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Improved Apple-style link/action area with refined hover animations */}
          <div className="px-8 py-6 mt-4 border-t border-[#F5F5F7] dark:border-[#2C2C2E] relative h-14">
            {/* Enhanced Learn More link with smoother transition */}
            <div className="absolute inset-0 px-8 py-6 flex items-center">
              <Link
                to="/services/computer-vision"
                className="relative group/link inline-flex items-center text-primary dark:text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-x-[-8px] group-hover:translate-x-0"
              >
                <span className="inline-block">Learn more</span>
                <svg 
                  width="13" 
                  height="13" 
                  viewBox="0 0 13 13" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="ml-1.5 transform transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  <path d="M6.5 1L12 6.5L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 6.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/10 dark:bg-blue-400/10 origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 ease-out"></div>
              </Link>
            </div>
          </div>

          {/* SF-style card shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 dark:via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ mixBlendMode: 'overlay' }}></div>
        </div>
      </div>

      {/* Social Media & Marketing Service Card */}
      <div className="group h-full perspective-1000">
        <div className="h-full flex flex-col bg-white dark:bg-[#1C1C1E] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-[#E5E5E7] dark:border-[#2C2C2E] transform hover:translate-y-[-4px]">
          {/* Enhanced icon area with subtle float animation */}
          <div className="px-8 pt-8 pb-5 flex justify-start">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#F5F5F7] dark:bg-[#2C2C2E] relative overflow-hidden group-hover:shadow-md group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-primary dark:text-white group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Content with enhanced typography and animations */}
          <div className="px-8 flex-grow flex flex-col">
            <div className="inline-flex items-center mb-2">
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-400/10 text-blue-400 mr-2">Featured</span>
              <h3 className="text-xl font-medium text-[#1D1D1F] dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300">
                Marketing & Social Media
              </h3>
            </div>
            
            <p className="text-[#86868B] dark:text-[#A1A1A6] text-base font-normal mb-6 leading-relaxed">
              Comprehensive marketing and social media management services to boost your brand presence and drive customer engagement.
            </p>
            
            {/* Enhanced feature pills with staggered hover effects */}
            <div className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {["Content Creation", "Campaign Management", "Analytics", "Community Building", "Growth Strategy"].map((feature, i) => (
                  <span
                    key={i}
                    className="inline-flex px-3 py-1.5 text-xs font-medium rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#6E6E73] dark:text-[#E5E5E7] hover:bg-[#E5E5E7] dark:hover:bg-[#3C3C3E] transition-colors duration-300"
                    style={{
                      transitionDelay: `${i * 50}ms`
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Improved Apple-style link/action area with refined hover animations */}
          <div className="px-8 py-6 mt-4 border-t border-[#F5F5F7] dark:border-[#2C2C2E] relative h-14">
            {/* Enhanced Learn More link with smoother transition */}
            <div className="absolute inset-0 px-8 py-6 flex items-center">
              <Link
                to="/services/marketing-social-media"
                className="relative group/link inline-flex items-center text-primary dark:text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-x-[-8px] group-hover:translate-x-0"
              >
                <span className="inline-block">Learn more</span>
                <svg 
                  width="13" 
                  height="13" 
                  viewBox="0 0 13 13" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="ml-1.5 transform transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  <path d="M6.5 1L12 6.5L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 6.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/10 dark:bg-blue-400/10 origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 ease-out"></div>
              </Link>
            </div>
          </div>

          {/* SF-style card shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 dark:via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ mixBlendMode: 'overlay' }}></div>
        </div>
      </div>
    </div>

    {/* Original services in three-column layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
      {SERVICES.map((service) => (
        <div 
          key={service.title}
          className="group h-full perspective-1000"
        >
          <div className="h-full flex flex-col bg-white dark:bg-[#1C1C1E] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-[#E5E5E7] dark:border-[#2C2C2E] transform hover:translate-y-[-4px]">
            {/* Enhanced icon area with subtle float animation */}
            <div className="px-8 pt-8 pb-5 flex justify-start">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#F5F5F7] dark:bg-[#2C2C2E] relative overflow-hidden group-hover:shadow-md group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-primary dark:text-white group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
              </div>
            </div>
            
            {/* Content with enhanced typography and animations */}
            <div className="px-8 flex-grow flex flex-col">
              <h3 className="text-xl font-medium text-[#1D1D1F] dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-[#86868B] dark:text-[#A1A1A6] text-base font-normal mb-6 leading-relaxed">
                {service.description}
              </p>
              
              {/* Enhanced feature pills with staggered hover effects */}
              <div className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="inline-flex px-3 py-1.5 text-xs font-medium rounded-full bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#6E6E73] dark:text-[#E5E5E7] hover:bg-[#E5E5E7] dark:hover:bg-[#3C3C3E] transition-colors duration-300"
                      style={{
                        transitionDelay: `${i * 50}ms`
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Improved Apple-style link/action area with refined hover animations */}
            <div className="px-8 py-6 mt-4 border-t border-[#F5F5F7] dark:border-[#2C2C2E] relative h-14">
              {/* Enhanced Learn More link with smoother transition */}
              <div className="absolute inset-0 px-8 py-6 flex items-center">
                <Link
                  to={service.href}
                  className="relative group/link inline-flex items-center text-primary dark:text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-x-[-8px] group-hover:translate-x-0"
                >
                  <span className="inline-block">Learn more</span>
                  <svg 
                    width="13" 
                    height="13" 
                    viewBox="0 0 13 13" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="ml-1.5 transform transition-transform duration-300 group-hover/link:translate-x-1"
                  >
                    <path d="M6.5 1L12 6.5L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 6.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  
                  {/* SF-style animated underline effect */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/10 dark:bg-blue-400/10 origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 ease-out"></div>
                </Link>
              </div>
            </div>

            {/* SF-style card shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 dark:via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ mixBlendMode: 'overlay' }}></div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Enhanced Apple-style CTA button with subtle hover effects */}
    <div className="flex justify-center mt-14">
      <Link 
        to="/services" 
        className="inline-flex items-center px-8 py-4 rounded-full bg-[#0071E3] text-white font-medium hover:bg-[#0077ED] transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[#0071E3]/20"
      >
        <span>View all services</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transform transition-transform duration-300 group-hover:translate-x-0.5">
          <path d="M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>

    {/* Add subtle perspective effect styling */}
    <style jsx global>{`
      .perspective-1000 {
        perspective: 1000px;
      }
    `}</style>
  </Section>
);

/* MAIN COMPONENT */
function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <HeroSection />
        <Trusted />
        <ServicesSection />
        <UpcomingProjectsShowcase />
        <ProcessTimeline />
        <DesignsSection />
        <SolutionFinder />
      </div>
    </PageTransition>
  );
}

export default Home;