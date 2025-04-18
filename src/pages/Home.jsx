import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import PageTransition from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';
import { 
  ArrowRight, Code, Users, Award, BarChart, 
  BadgeCheck, LineChart, Gamepad2, Palette, 
  VideoIcon, Brush, Lightbulb, ArrowLeft
} from "lucide-react";
import { Smartphone } from "lucide-react";

// Core theme with only what's used
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

// Simplified UI object with only what's used
const UI = {
  card: {
    base: "rounded-2xl overflow-hidden border border-secondary/20 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 bg-background/50 backdrop-blur-sm",
    padding: "p-6",
    iconContainer: "mb-6 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center"
  },
  text: {
    heading: "font-bold text-foreground",
    body: "text-foreground/70",
    accent: "text-primary"
  },
  gradients: {
    primary: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
    hover: "bg-gradient-to-r from-primary/20 to-blue-500/20"
  },
  button: {
    base: "flex items-center gap-1 font-medium",
    pill: "rounded-full",
    primary: "bg-primary/10 hover:bg-primary/20 text-primary"
  }
};

// Simplified animations
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

// Section component with cleaner backgrounds but retaining pattern option
const Section = ({ children, dark = false, pattern = false, className = "", id = null }) => (
  <section 
    id={id}
    className={`py-24 px-4 ${
      dark ? 'bg-background' : // Changed from bg-secondary/20
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

// Service card component with hover-only action and streamlined features
const ServiceCard = ({ service, index }) => (
  <motion.div
    key={index}
    {...createMotionProps('fadeInUp', index * 0.1)}
    className={`${UI.card.base} group relative`}
  >
    <div className={UI.card.padding}>
      <div className={UI.card.iconContainer}>
        {service.icon}
      </div>
      <h3 className={`text-xl ${UI.text.heading} mb-3`}>{service.title}</h3>
      <p className={`${UI.text.body} mb-6 text-sm`}>{service.description}</p>
      
      {/* Features as paragraph instead of list */}
      <p className={`${UI.text.body} text-sm mb-6`}>
        Offering {service.features.join(", ")}.
      </p>
      
      {/* Hidden learn more that appears on hover */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center text-primary font-medium">
          <span>Learn more</span>
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </motion.div>
);

// Project card component
const ProjectCard = ({ project, index }) => (
  <motion.div
    key={index}
    {...createMotionProps('fadeInUp', index * 0.1)}
    className={`group relative flex flex-col overflow-hidden ${UI.card.base}`}
  >
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      <img 
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4 z-20">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/30 text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>
      {project.featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/30 text-white backdrop-blur-sm">
            <BadgeCheck className="w-3 h-3 mr-1" />
            Featured
          </span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-white/80 text-sm line-clamp-1">
          {project.description}
        </p>
      </div>
    </div>
    <div className="flex flex-col p-5 flex-grow bg-secondary/20 backdrop-blur-sm">
      <div className="mb-auto">
        <p className={`${UI.text.body} text-sm mb-4 line-clamp-2`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary/80">
              {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js'][Math.floor(Math.random() * 5)]}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 border-t border-secondary/30 pt-4">
        {project.stats && (
          <div className="flex items-center text-primary/80 text-xs">
            <LineChart className="w-3 h-3 mr-1" />
            {project.stats}
          </div>
        )}
        <button className={`ml-auto ${UI.button.base} ${UI.button.pill} ${UI.button.primary} px-4 py-1.5`}>
          View Project
          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
    <div className={`absolute -inset-px ${UI.gradients.hover} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
  </motion.div>
);

// Enhanced Interactive Projects List Component
const ProjectsList = ({ projects }) => {
  const [activeProject, setActiveProject] = useState(0);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Projects List - Left Side */}
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
      
      {/* Project Details - Right Side with immersive design */}
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
            {/* Full-height image with text overlay */}
            <div className="relative h-[600px] overflow-hidden">
              {/* Image with subtle zoom effect on hover */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={projects[activeProject].image}
                  alt={projects[activeProject].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Gradient overlays for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
              
              {/* Category badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/40 text-white backdrop-blur-sm border border-primary/20">
                  {projects[activeProject].category}
                </span>
              </div>
              
              {/* Featured badge */}
              {projects[activeProject].featured && (
                <div className="absolute top-6 right-6 z-20">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/40 text-white backdrop-blur-sm border border-yellow-500/20">
                    <BadgeCheck className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                </div>
              )}
              
              {/* Content overlay - positioned at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                {/* Project title with animated underline */}
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary/90 transition-colors">
                  <span className="relative">
                    {projects[activeProject].title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                </h3>
                
                {/* Project description */}
                <p className="text-white/90 mb-6 max-w-lg text-lg">
                  {projects[activeProject].description}
                </p>
                
                {/* Technologies used */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js'].slice(0, 3 + Math.floor(Math.random() * 2)).map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-md text-sm text-white">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Stats and CTA button in a row */}
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

// Section heading component
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

// CTA button component
const CTAButton = ({ primary = true, children, className = "", small = false }) => (
  <button className={`group relative overflow-hidden rounded-full border-2 ${primary ? 'border-primary' : 'border-primary/70'} ${primary ? 'bg-primary' : 'bg-transparent'} 
    ${small ? 'px-4 py-2 text-sm' : 'px-8 py-4 text-lg'} font-semibold transition-all hover:scale-95 w-full sm:w-auto ${className}`}>
    <span className={`relative z-10 transition-colors ${primary ? 'text-background group-hover:text-primary' : 'text-primary group-hover:text-background'} flex items-center justify-center gap-2`}>
      {children}
    </span>
    <div className={`absolute inset-0 z-0 ${primary ? 'bg-background' : 'bg-primary'} translate-y-full transition-transform duration-300 group-hover:translate-y-0`} />
  </button>
);

// Constants
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

// Create a new custom Globe component with centered positioning and static orbit
const GlobeVisualization = () => {
  const containerRef = useRef(null);
  const [globeError, setGlobeError] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any previous content
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    let renderer, scene, camera, globe;
    
    try {
      // Scene setup
      scene = new THREE.Scene();
      
      // Camera positioned to look directly at the center
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      camera.position.z = 4; // Keep camera at fixed distance
      
      // Renderer with explicit context attributes for compatibility
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default', 
        failIfMajorPerformanceCaveat: false
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
      
      // Add to DOM with centered positioning
      containerRef.current.appendChild(renderer.domElement);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.left = '50%';
      renderer.domElement.style.top = '50%';
      renderer.domElement.style.transform = 'translate(-50%, -50%)';
      
      // Handle resize to maintain aspect ratio and centering
      const handleResize = () => {
        if (!containerRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        if (width === 0 || height === 0) return;
        
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      
      window.addEventListener("resize", handleResize);
      handleResize();
      
      // Create globe with enhanced shaders for better appearance
      const globeGeometry = new THREE.SphereGeometry(1.8, 48, 48); // Larger size, more segments
      
      // Enhanced material with better gradient
      const globeMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          
          void main() {
            vec3 primaryColor = vec3(0.0, 0.44, 0.95); // #0070F3 primary 
            vec3 secondaryColor = vec3(0.47, 0.16, 0.79); // #7928CA secondary
            vec3 highlightColor = vec3(0.2, 0.6, 1.0); // Bright blue highlight
            
            // Create more dramatic lighting effect
            float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.5);
            vec3 color = mix(primaryColor, secondaryColor, intensity);
            
            // Add highlight to the edges
            float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 4.0);
            color = mix(color, highlightColor, rim * 0.4);
            
            gl_FragColor = vec4(color, 0.92);
          }
        `,
        transparent: true
      });
      
      globe = new THREE.Mesh(globeGeometry, globeMaterial);
      
      // Center the globe in the scene
      globe.position.set(0, 0, 0);
      scene.add(globe);
      
      // Add improved atmosphere glow
      const atmosphereGeometry = new THREE.SphereGeometry(1.9, 48, 48);
      const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
            gl_FragColor = vec4(0.3, 0.6, 1.0, intensity * 0.5);
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
      });
      
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);
      
      // Static rendering (no animation)
      let frameId;
      
      const render = () => {
        frameId = requestAnimationFrame(render);
        renderer.render(scene, camera);
      };
      
      render();
      
      // Cleanup function
      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', handleResize);
        
        // Dispose resources
        globeGeometry.dispose();
        globeMaterial.dispose();
        atmosphereGeometry.dispose();
        atmosphereMaterial.dispose();
        
        if (renderer) {
          renderer.dispose();
        }
        
        // Remove from DOM
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      console.error("Error initializing globe:", error);
      setGlobeError(true);
      return () => {}; // Empty cleanup function for error case
    }
  }, []);
  
  // Render fallback if there's an error
  if (globeError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-primary/10 rounded-full">
        <div className="text-center">
          <div className="text-4xl mb-2 text-primary">🌐</div>
          <p className="text-sm text-primary/80">Interactive Globe</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full absolute inset-0 flex items-center justify-center"
    />
  );
};

// Enhanced floating icon component for reusability
const FloatingIcon = ({ icon, size = 24, className }) => (
  <div className={`absolute w-12 h-12 rounded-2xl bg-background shadow-lg flex items-center justify-center ${className}`}>
    <span className="text-primary">
      {icon === 'Code' && <Code size={size} />}
      {icon === 'Smartphone' && <Smartphone size={size} />}
      {icon === 'BarChart' && <BarChart size={size} />}
      {icon === 'Shield' && <Award size={size} />}
      {icon === 'Cloud' && <Brush size={size} />}
    </span>
  </div>
);

// Animated highlight text component
const HighlightText = ({ children, delay = 0 }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent inline-block"
  >
    {children}
  </motion.span>
);

// Hero Section - Enhanced
const HeroSection = () => {
  // State for animated count-up statistics
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    satisfaction: 0,
    experts: 0
  });

  // Animate stats when in view
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedStats(prev => {
          const newProjects = Math.min(prev.projects + 5, 500);
          const newSatisfaction = Math.min(prev.satisfaction + 1, 99);
          const newExperts = Math.min(prev.experts + 1, 50);
          
          if (newProjects === 500 && newSatisfaction === 99 && newExperts === 50) {
            clearInterval(interval);
          }
          
          return {
            projects: newProjects,
            satisfaction: newSatisfaction,
            experts: newExperts
          };
        });
      }, 20);
      
      return () => clearInterval(interval);
    }, 1000); // Start after hero has appeared
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section 
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden py-16 lg:py-0" 
      aria-labelledby="hero-heading"
    >
      {/* Enhanced Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glowing orbs with improved positioning and animation */}
        <div className="absolute top-1/4 -left-20 w-[20rem] h-[20rem] bg-primary/20 rounded-full blur-3xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-[25rem] h-[25rem] bg-secondary/20 rounded-full blur-3xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-[15rem] h-[15rem] bg-accent-blue/10 rounded-full blur-2xl opacity-70 animate-pulse-slow animation-delay-1000"></div>
        
        {/* Enhanced grid pattern overlay - larger cells and more distinct */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-80"></div>
        
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-background via-background to-background/90 opacity-90"></div>
      </div>
      
      {/* Hero content container with improved spacing and animations */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left side content with enhanced animations */}
        <div className="w-full md:w-1/2 space-y-8 lg:space-y-10 text-center md:text-left">
          {/* Badge with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm shadow-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">Enterprise Technology Solutions</span>
          </motion.div>
          
          {/* Enhanced heading with staggered animation */}
          <div>
            <motion.h1 
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
            >
              <span className="block mb-2">
                <HighlightText delay={0.3}>Innovate.</HighlightText>
              </span>
              <span className="block mb-2">
                <HighlightText delay={0.4}>Transform.</HighlightText>
              </span>
              <span className="block text-foreground">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  With Jason Tech.
                </motion.span>
              </span>
            </motion.h1>
          </div>
          
          {/* Enhanced subheading with improved typography */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-lg md:text-xl text-foreground/80 max-w-lg leading-relaxed"
          >
            We empower enterprises with cutting-edge solutions that drive innovation, efficiency, and growth in today's rapidly evolving digital landscape.
          </motion.p>
          
          {/* Enhanced CTA buttons with improved hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-5 sm:gap-7 justify-center md:justify-start"
          >
            <CTAButton 
              primary
              className="group shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </CTAButton>
            
            <CTAButton 
              primary={false}
              className="group hover:-translate-y-0.5"
            >
              Watch Demo
              <VideoIcon className="ml-1 group-hover:scale-110 transition-transform" size={18} />
            </CTAButton>
          </motion.div>
          
          {/* Enhanced stats row with animated counters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap gap-8 justify-center md:justify-start pt-6 border-t border-secondary/20"
          >
            {[
              { label: "Projects Delivered", value: animatedStats.projects, suffix: "+" },
              { label: "Client Satisfaction", value: animatedStats.satisfaction, suffix: "%" },
              { label: "Team Experts", value: animatedStats.experts, suffix: "+" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-foreground/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Right side - Enhanced Hero visualization with static rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full md:w-1/2 relative"
        >
          <div className="relative aspect-square max-w-lg mx-auto">
            {/* Static decorative rings */}
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30"></div>
            <div className="absolute inset-[10%] rounded-full border-2 border-dashed border-secondary/20"></div>
            
            {/* Enhanced floating elements with improved positioning and animations */}
            <FloatingIcon 
              icon="Code" 
              className="top-10 left-10 animate-float-1 shadow-xl shadow-primary/5" 
            />
            <FloatingIcon 
              icon="Smartphone" 
              className="top-28 right-10 animate-float-2 shadow-xl shadow-primary/5" 
            />
            <FloatingIcon 
              icon="BarChart" 
              className="bottom-28 left-10 animate-float-3 shadow-xl shadow-primary/5" 
            />
            <FloatingIcon 
              icon="Shield" 
              className="bottom-10 right-28 animate-float-4 shadow-xl shadow-primary/5" 
            />
            <FloatingIcon 
              icon="Cloud" 
              className="top-1/2 right-1/4 animate-float-5 shadow-xl shadow-primary/5" 
            />
            
            {/* Central image - Centered Globe Container */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full aspect-square">
              <div className="relative w-full h-full">
                {/* Static pulse ring */}
                <div className="absolute inset-[15%] rounded-full border border-primary/40"></div>
                
                {/* Globe with improved error handling */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full w-full"
                >
                  <GlobeVisualization />
                </motion.div>
                
                {/* Decorative connection points */}
                {[0, 1, 2, 3].map(i => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + (i * 0.15) }}
                    className={`absolute w-3 h-3 rounded-full bg-primary/70 shadow-glow-md`}
                    style={{
                      top: `${15 + (i * 20)}%`,
                      left: `${75 - (i % 2 * 50)}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs text-foreground/40 mb-2">Scroll to explore</span>
        <div className="w-5 h-9 border-2 border-foreground/20 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

// Add these animations to your CSS file or use tailwind.config.js
// The necessary animation classes:
// animate-pulse-slow: a slower pulse animation
// animate-gradient-x: moving gradient animation
// animate-spin-slow: slow rotation
// animation-delay-1000, animation-delay-2000: animation delays
// animate-float-1 through animate-float-5: floating animations with different timing

function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Background container that extends to services */}
        <div className="relative bg-gradient-to-b from-background to-background/95">
          {/* Background Pattern */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
          
          {/* Aurora Background */}
          <AuroraBackground className="absolute inset-0" showRadialGradient={true} />

          {/* Replace the existing hero section with the new one */}
          <HeroSection />

          {/* Rest of the page content remains the same */}

          {/* Partnerships Section - Background overlay removed */}
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

        {/* Services Section */}
        <Section pattern>
          <SectionHeading 
            eyebrow="What We Do" 
            title="Our Services" 
            description="We deliver cutting-edge solutions tailored to your specific business needs, leveraging the latest technologies and industry best practices."
            center={true} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
          
 
        </Section>

        {/* Projects Section Redesign with Interactive List */}
        <Section pattern>
          <SectionHeading 
            eyebrow="Our Portfolio" 
            title="Featured Projects" 
            description="Explore our award-winning work delivered for clients across industries"
            center={true} 
          />
          
          <div className="mt-12">
            {/* Interactive Projects Component */}
            <ProjectsList projects={PROJECTS} />
          </div>
        </Section>

        {/* Why Choose Us Section with image on the left side */}
        <Section dark>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image now positioned on the left side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                <motion.div 
                  className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-blue-500/20 shadow-xl"
                >
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Technology visual representation" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Text content now positioned on the right side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block">Why Choose Us</span>
              <h2 className="text-4xl font-bold mt-6 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Technology expertise that drives business growth</h2>
              <p className="text-foreground/70 mb-8">
                At Jason Tech Solutions, we combine technical excellence with strategic thinking to deliver solutions 
                that not only solve today's challenges but position your business for future success.
              </p>
              
              <div className="space-y-8">
                {WHY_CHOOSE_US.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="mt-1 bg-primary/20 h-12 w-12 rounded-xl flex items-center justify-center shrink-0" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-foreground/70">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Testimonials Section */}
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