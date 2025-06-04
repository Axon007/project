import React, { useEffect, useRef, useState, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { 
  Camera, 
  Code, 
  Scan,
  Eye, 
  FileCode, 
  Cpu, 
  BrainCircuit, 
  Database, 
  ChevronRight, 
  CheckCircle, 
  Activity,
  ArrowRight,
  Image,
  Video,
  ScanSearch,
  PieChart,
  Table,
  File,
  Settings,
  Search,
  Target,
  Star,
  Quote,
  BarChart3,
  Clock,
  TrendingUp,
  Gauge,
  Zap,
  Shield,
  Users,
  Monitor,
  Smartphone,
  Globe,
  Award,
  Play
} from 'lucide-react';
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { MagicCard } from "@/components/magicui/magic-card";
import { Stepper, Step } from "@/components/ui/stepper";

// AnimatedBeam component from Magic UI
export const AnimatedBeam = ({ 
  className, 
  containerRef, 
  fromRef, 
  toRef, 
  curvature = 0, 
  reverse = false,
  duration = Math.random() * 3 + 4, 
  delay = 0, 
  pathColor = "gray", 
  pathWidth = 2, 
  pathOpacity = 0.2, 
  gradientStartColor = "#ffaa40", 
  gradientStopColor = "#9c40ff", 
  startXOffset = 0, 
  startYOffset = 0, 
  endXOffset = 0, 
  endYOffset = 0,
}) => {
  const id = React.useId();
  const [pathD, setPathD] = React.useState("");
  const [svgDimensions, setSvgDimensions] = React.useState({ width: 0, height: 0 });

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse 
    ? { 
        x1: ["90%", "-10%"], 
        x2: ["100%", "0%"], 
        y1: ["0%", "0%"], 
        y2: ["0%", "0%"]
      }
    : { 
        x1: ["10%", "110%"], 
        x2: ["0%", "100%"], 
        y1: ["0%", "0%"], 
        y2: ["0%", "0%"]
      };

  React.useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      // For all entries, recalculate the path
      for (let entry of entries) {
        updatePath();
      }
    });

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Call the updatePath initially to set the initial path
    updatePath();

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute left-0 top-0 transform-gpu stroke-2"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

// BorderBeam component from Magic UI
export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  reverse = false,
  initialOffset = 0,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className="absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
        }}
      />
    </div>
  );
};

// Simple ShimmerButton component alternative
const ShimmerButton = ({ children, className = "" }) => {
  return (
    <motion.button
      className={`relative inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium overflow-hidden transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Simple TextShimmer component alternative
const TextShimmer = ({ children, className = "" }) => {
  return (
    <motion.span
      className={`inline-block transition-all duration-300 ${className}`}
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.span>
  );
};

// Simple NumberTicker component alternative
const NumberTicker = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = value / 50;
      const interval = setInterval(() => {
        setDisplayValue(prev => {
          if (prev >= value) {
            clearInterval(interval);
            return value;
          }
          return prev + increment;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value]);
  
  return Math.floor(displayValue);
};

// Simple BlurFade component alternative
const BlurFade = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay }}
      className="transition-all duration-300"
    >
      {children}
    </motion.div>
  );
};

// Simple Particles component alternative
const Particles = ({ className, quantity = 50, color = "#3b82f6" }) => {
  return (
    <div className={className}>
      {[...Array(quantity)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-30"
          style={{
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Simple Marquee component alternative
const Marquee = ({ children, pauseOnHover = true, className = "" }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex space-x-4"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

// Simple Meteors component alternative
const Meteors = ({ number = 20 }) => {
  return (
    <>
      {[...Array(number)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-20 bg-gradient-to-b from-white to-transparent opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            rotate: "45deg",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, -100],
            y: [0, 100],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
          }}
        />
      ))}
    </>
  );
};

// Simple BentoCard component alternative
const BentoCard = ({ name, description, background, Icon, className = "", cta = "Learn more" }) => {
  return (
    <div className={`relative group overflow-hidden rounded-3xl border border-border/40 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 ${className}`}>
      {background}
      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="mb-4">
          <Icon className="w-8 h-8 text-foreground/80" />
        </div>
        <h3 className="text-xl font-bold mb-4">{name}</h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
        <button className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          {cta}
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

// Enhanced SVG icons for computer vision
const VisionIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <path d="M12 1v6m0 8v6M1 12h6m8 0h6M4.22 4.22l4.24 4.24m7.07 7.07l4.24 4.24M4.22 19.78l4.24-4.24m7.07-7.07l4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const NeuralNetworkIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="2" fill="currentColor" />
    <circle cx="18" cy="6" r="2" fill="currentColor" />
    <circle cx="6" cy="18" r="2" fill="currentColor" />
    <circle cx="18" cy="18" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <path d="M8 6h8M6 8v8M16 8v8M8 18h8M8.5 7.5l7 7M15.5 7.5l-7 7" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Computer Vision SVGs
const SvgCamera = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <rect x="4" y="9" width="24" height="16" rx="3" fill="#6366F1"/>
    <circle cx="16" cy="17" r="5" fill="#A21CAF"/>
    <rect x="10" y="5" width="4" height="4" rx="1" fill="#6366F1"/>
  </svg>
);
const SvgEye = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <ellipse cx="16" cy="16" rx="12" ry="7" fill="#F59E42"/>
    <circle cx="16" cy="16" r="3.5" fill="#312E81"/>
  </svg>
);
const SvgNeural = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <circle cx="16" cy="16" r="12" fill="#10B981"/>
    <circle cx="16" cy="16" r="5" fill="#fff"/>
    <circle cx="8" cy="16" r="2" fill="#fff"/>
    <circle cx="24" cy="16" r="2" fill="#fff"/>
    <circle cx="16" cy="8" r="2" fill="#fff"/>
    <circle cx="16" cy="24" r="2" fill="#fff"/>
    <line x1="16" y1="8" x2="16" y2="24" stroke="#fff" strokeWidth="1.5"/>
    <line x1="8" y1="16" x2="24" y2="16" stroke="#fff" strokeWidth="1.5"/>
  </svg>
);
const SvgImage = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <rect x="6" y="10" width="20" height="12" rx="2" fill="#F472B6"/>
    <circle cx="11" cy="15" r="2" fill="#fff"/>
    <path d="M10 22l4-5 4 3 4-6 4 8" stroke="#fff" strokeWidth="1.5" fill="none"/>
  </svg>
);
const SvgBoundingBox = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <rect x="7" y="7" width="18" height="18" rx="3" fill="#FBBF24" stroke="#fff" strokeWidth="2"/>
    <rect x="12" y="12" width="8" height="8" rx="2" fill="#fff"/>
  </svg>
);
const SvgFace = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <ellipse cx="16" cy="18" rx="8" ry="10" fill="#60A5FA"/>
    <ellipse cx="13" cy="18" rx="1.5" ry="2" fill="#fff"/>
    <ellipse cx="19" cy="18" rx="1.5" ry="2" fill="#fff"/>
    <path d="M13 23c1.5 1 4.5 1 6 0" stroke="#fff" strokeWidth="1.5" fill="none"/>
  </svg>
);

// Constants for company logos
const COMPANY_LOGOS = [
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg'
];

// Trusted by companies section
const Trusted = memo(() => {
  return (
    <section className="py-3 md:py-6 lg:py-8 overflow-hidden bg-background border-t border-border/50">
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 dark:border-primary/30 bg-primary/10 dark:bg-primary/20 backdrop-blur-sm shadow-lg shadow-primary/10 dark:shadow-primary/5"
          >
            <span className="text-sm font-semibold text-primary">TRUSTED BY INDUSTRY LEADERS</span>
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
              <div className="p-4 w-full flex justify-center group">
                <img 
                  src={logo} 
                  alt={`Partner company ${index + 1}`} 
                  className="h-12 opacity-60 dark:opacity-50 group-hover:opacity-80 dark:group-hover:opacity-70 transition-opacity duration-300 filter dark:brightness-0 dark:invert" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

function ComputerVisionPage() {
  const [splineError, setSplineError] = useState(false);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Handler for Spline errors
  const handleSplineError = () => {
    setSplineError(true);
    console.log("Spline model failed to load. Using fallback display.");
  };

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      {/* Hero Section with 3D model */}
      <section className="relative overflow-hidden pt-24 pb-32">
        {/* 3D Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10"></div>
        
        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-primary/20 dark:bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-purple-500/20 dark:bg-purple-500/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side: Text content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 dark:border-primary/30">
                  Computer Vision Technology
                </span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Advanced Vision Intelligence Solutions
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-muted-foreground mb-8 leading-relaxed"
              >
                We develop cutting-edge computer vision systems that enable machines 
                to accurately perceive, analyze, and understand visual data from the real world.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 dark:shadow-primary/20 relative overflow-hidden group">
                  <span className="relative z-10">Schedule a Demo</span>
                  <BorderBeam size={100} duration={4} />
                </button>
                <button className="px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center gap-2 group border border-border">
                  View Our Solutions
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
            
            {/* Right side: Spline 3D Model or Fallback */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex-1 h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-border/50 relative"
            >
              <ComputerVisionVisualization />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Trusted by Companies */}
      <Trusted />
      
       
      {/* Implementation Process Stepper */}
      <section className="py-24 bg-secondary/5 dark:bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 dark:border-primary/30 mb-6">
              Implementation Process
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Your Journey to Vision Intelligence
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Follow our proven step-by-step process to implement cutting-edge computer vision solutions for your business.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl border border-border p-8 shadow-xl relative overflow-hidden"
          >
            <BorderBeam size={120} duration={10} />
            
            <Stepper 
              initialStep={1}
              onFinalStepCompleted={() => console.log('Implementation process completed!')}
              contentClassName="bg-gradient-to-br from-secondary/20 to-primary/10 dark:from-secondary/30 dark:to-primary/20 rounded-2xl p-8 border border-border/30"
              footerClassName="mt-8"
            >
              <Step>
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
                      <Search className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Requirements Analysis</h3>
                    <p className="text-muted-foreground">Understanding your specific computer vision needs and objectives</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-card/50 dark:bg-card/80 rounded-xl p-6 border border-border/50 shadow-sm backdrop-blur-sm">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-primary" />
                          </div>
                          Discovery Phase
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground">Business objectives assessment and alignment</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground">Current system evaluation and integration points</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground">Technical requirements and constraints analysis</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground">Performance expectations and success metrics</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-6 border border-blue-200/30 dark:border-blue-800/30 backdrop-blur-sm">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <BrainCircuit className="w-8 h-8 text-white" />
                          </div>
                          <h5 className="font-semibold mb-2 text-foreground">Smart Analysis</h5>
                          <p className="text-sm text-muted-foreground">
                            We conduct comprehensive analysis to ensure the perfect solution fit for your unique requirements.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-card/50 dark:bg-card/80 rounded-xl p-4 border border-border/30 backdrop-blur-sm">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Timeline</span>
                          <span className="font-medium text-primary">1-2 weeks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Code className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Solution Design</h3>
                    <p className="text-foreground/70">Architecting your custom computer vision system for optimal performance</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Cpu className="w-4 h-4 text-blue-500" />
                          </div>
                          Architecture Planning
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">AI model selection and customization strategy</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Infrastructure design and scalability planning</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Integration strategy and API design</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Performance optimization and resource allocation</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-xl p-6 border border-cyan-200/30 dark:border-cyan-800/30">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                            <Settings className="w-8 h-8 text-white" />
                          </div>
                          <h5 className="font-semibold mb-2">Intelligent Design</h5>
                          <p className="text-sm text-foreground/70">
                            Custom architecture tailored to your specific use case and performance requirements.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-card rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/60">Timeline</span>
                          <span className="font-medium text-blue-500">2-3 weeks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Database className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Development & Training</h3>
                    <p className="text-foreground/70">Building and training your advanced vision models with cutting-edge techniques</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <BrainCircuit className="w-4 h-4 text-purple-500" />
                          </div>
                          Model Development
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Custom dataset preparation and augmentation</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Advanced neural network training and optimization</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Model validation and accuracy benchmarking</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Performance fine-tuning and optimization</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-6 border border-purple-200/30 dark:border-purple-800/30">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Activity className="w-8 h-8 text-white" />
                          </div>
                          <h5 className="font-semibold mb-2">Advanced Training</h5>
                          <p className="text-sm text-foreground/70">
                            State-of-the-art machine learning pipelines with continuous validation and improvement.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-card rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/60">Timeline</span>
                          <span className="font-medium text-purple-500">4-6 weeks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Eye className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Integration & Testing</h3>
                    <p className="text-foreground/70">Seamless integration with comprehensive testing and validation</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Activity className="w-4 h-4 text-green-500" />
                          </div>
                          System Integration
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">API development and comprehensive documentation</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Real-time processing implementation and optimization</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Comprehensive testing and quality assurance</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Security audit and compliance verification</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200/30 dark:border-green-800/30">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-white" />
                          </div>
                          <h5 className="font-semibold mb-2">Quality Assurance</h5>
                          <p className="text-sm text-foreground/70">
                            Rigorous testing ensures reliability, security, and optimal performance in production.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-card rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/60">Timeline</span>
                          <span className="font-medium text-green-500">2-3 weeks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <ArrowRight className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Deployment & Support</h3>
                    <p className="text-foreground/70">Going live with continuous monitoring and optimization support</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <PieChart className="w-4 h-4 text-amber-500" />
                          </div>
                          Launch & Maintenance
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Production deployment with monitoring systems</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Team training and comprehensive knowledge transfer</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Continuous model improvement and optimization</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">24/7 technical support and maintenance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 border border-amber-200/30 dark:border-amber-800/30">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                            <Database className="w-8 h-8 text-white" />
                          </div>
                          <h5 className="font-semibold mb-2">Ongoing Success</h5>
                          <p className="text-sm text-foreground/70">
                            Complete support ecosystem for long-term success and continuous improvement.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-card rounded-xl p-4 border border-border/30">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/60">Timeline</span>
                          <span className="font-medium text-amber-500">Ongoing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-xl font-medium shadow-lg">
                      <CheckCircle className="w-5 h-5" />
                      Your Computer Vision Solution is Live!
                    </div>
                  </div>
                </div>
              </Step>
            </Stepper>
          </motion.div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-24 bg-background" id="services">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 dark:border-primary/30 mb-6">
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Computer Vision Solutions
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From object detection to facial recognition, our advanced computer vision solutions help businesses automate processes, enhance security, and gain valuable insights from visual data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Image className="w-6 h-6" />,
                title: "Image Recognition",
                description: "Identify objects, people, text, and actions in images with high precision.",
                features: [
                  "Object Classification",
                  "Facial Recognition",
                  "Scene Understanding",
                  "Text Extraction (OCR)"
                ],
                color: "from-blue-500 to-primary"
              },
              {
                icon: <Video className="w-6 h-6" />,
                title: "Video Analytics",
                description: "Real-time analysis and monitoring of video streams for actionable insights.",
                features: [
                  "Motion Detection",
                  "Behavior Analysis",
                  "Activity Recognition",
                  "Event Triggers"
                ],
                color: "from-primary to-purple-500"
              },
              {
                icon: <ScanSearch className="w-6 h-6" />,
                title: "Object Detection",
                description: "Precisely locate and identify multiple objects within images or video frames.",
                features: [
                  "Real-time Object Tracking",
                  "Multiple Object Detection",
                  "Boundary Detection",
                  "Location Mapping"
                ],
                color: "from-purple-500 to-blue-500"
              },
              {
                icon: <BrainCircuit className="w-6 h-6" />,
                title: "Machine Learning Integration",
                description: "Custom AI models trained on your specific visual data requirements.",
                features: [
                  "Custom Model Training",
                  "Transfer Learning",
                  "Model Optimization",
                  "Continuous Learning"
                ],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Scan className="w-6 h-6" />,
                title: "Anomaly Detection",
                description: "Identify unusual patterns or objects that deviate from expected norms.",
                features: [
                  "Quality Control",
                  "Defect Detection",
                  "Security Monitoring",
                  "Safety Compliance"
                ],
                color: "from-violet-500 to-fuchsia-500"
              },
              {
                icon: <PieChart className="w-6 h-6" />,
                title: "Analytics & Insights",
                description: "Transform visual data into actionable business intelligence and insights.",
                features: [
                  "Custom Dashboards",
                  "Trend Analysis",
                  "Performance Metrics",
                  "Visualization Tools"
                ],
                color: "from-emerald-500 to-blue-500"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl overflow-hidden group hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300 relative"
              >
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <BorderBeam size={80} duration={8} delay={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section - Enhanced Bento Grid */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-500/20 dark:border-purple-500/30 mb-8">
                <Target className="w-4 h-4 text-purple-500 mr-2" />
                <span className="text-sm font-medium text-foreground">Comprehensive Solutions</span>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Vision Intelligence
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Suite
                </span>
              </h2>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Powerful computer vision tools that transform how you analyze, understand, and act on visual data.
              </p>
            </BlurFade>
          </div>

          <BlurFade delay={0.4}>
            <BentoGrid className="max-w-7xl mx-auto">
              <BentoCard
                name="Real-time Object Detection"
                className="col-span-3 lg:col-span-1"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-3xl">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 dark:opacity-20" />
                    <Meteors number={20} />
                  </div>
                }
                Icon={ScanSearch}
                description="Identify and track objects in real-time with 99.7% accuracy using advanced neural networks."
                cta="Learn more"
              />
              
              <BentoCard
                name="Facial Recognition & Analysis"
                className="col-span-3 lg:col-span-2"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 dark:from-purple-500/10 dark:to-blue-500/10 rounded-3xl">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="grid grid-cols-4 gap-4 opacity-30 dark:opacity-20">
                        {["TensorFlow", "PyTorch", "Python", "OpenCV", "Docker", "Kubernetes", "AWS", "Google Cloud"].slice(0, 8).map((tech, i) => (
                          <div key={i} className="text-xs p-2 bg-background/20 dark:bg-background/30 rounded-lg text-center text-foreground/60">
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                }
                Icon={Eye}
                description="Advanced facial recognition with emotion detection, age estimation, and demographic analysis for security and personalization."
                cta="Explore features"
              />
              
              <BentoCard
                name="Video Analytics Platform"
                className="col-span-3 lg:col-span-2"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-3xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-8 gap-1 p-8">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 rounded-sm bg-emerald-500/40 dark:bg-emerald-500/30"
                            animate={{
                              opacity: [0.2, 0.8, 0.2],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.05,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                }
                Icon={Video}
                description="Comprehensive video analysis with motion detection, behavior tracking, and automated event recognition."
                cta="View demo"
              />
              
              <BentoCard
                name="Custom AI Models"
                className="col-span-3 lg:col-span-1"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <NeuralNetworkIcon className="w-32 h-32 text-orange-500/30" />
                    </div>
                  </div>
                }
                Icon={BrainCircuit}
                description="Tailored AI vision models trained on your specific data for maximum performance."
                cta="Get started"
              />
              
              <BentoCard
                name="Edge Computing Solutions"
                className="col-span-3 lg:col-span-1"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-20 h-20 border-2 border-cyan-500/50 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <Cpu className="w-8 h-8 text-cyan-500" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                }
                Icon={Cpu}
                description="Deploy AI vision at the edge for low-latency, real-time processing."
                cta="Discover"
              />
              
              <BentoCard
                name="Analytics Dashboard"
                className="col-span-3 lg:col-span-2"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-3xl">
                    <div className="absolute inset-0 p-8">
                      <div className="grid grid-cols-3 gap-4 h-full">
                        {[
                          { height: "60%", delay: 0 },
                          { height: "80%", delay: 0.2 },
                          { height: "40%", delay: 0.4 },
                        ].map((bar, i) => (
                          <motion.div
                            key={i}
                            className="bg-gradient-to-t from-violet-500/60 to-purple-500/60 rounded-lg"
                            initial={{ height: "10%" }}
                            animate={{ height: bar.height }}
                            transition={{
                              duration: 2,
                              delay: bar.delay,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                }
                Icon={BarChart3}
                description="Comprehensive analytics and insights with customizable dashboards and real-time reporting."
                cta="View analytics"
              />
            </BentoGrid>
          </BlurFade>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="py-32 bg-gradient-to-b from-transparent to-secondary/10 dark:to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 border border-green-500/20 dark:border-green-500/30 mb-8">
                <Gauge className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm font-medium text-foreground">Simple Process</span>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  How It
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  Works
                </span>
              </h2>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From data ingestion to intelligent insights, our streamlined process delivers results in minutes, not months.
              </p>
            </BlurFade>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Data Ingestion",
                  description: "Upload your visual data through our secure API or drag-and-drop interface. Support for images, videos, and live streams.",
                  icon: <Database className="w-8 h-8" />,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: "02", 
                  title: "AI Processing",
                  description: "Our advanced neural networks analyze your data using state-of-the-art computer vision algorithms and machine learning models.",
                  icon: <BrainCircuit className="w-8 h-8" />,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: "03",
                  title: "Smart Insights",
                  description: "Receive actionable insights, alerts, and analytics through our intuitive dashboard or integrate directly with your systems.",
                  icon: <TrendingUp className="w-8 h-8" />,
                  color: "from-green-500 to-emerald-500"
                }
              ].map((step, index) => (
                <BlurFade key={index} delay={0.2 * (index + 1)}>
                  <MagicCard className="h-full border border-border/50 dark:border-border/30">
                    <div className="p-8">
                      <div className="flex items-start gap-6 mb-6">
                        <div className="text-6xl font-black text-muted-foreground/20 dark:text-muted-foreground/15">
                          {step.step}
                        </div>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg`}>
                          {step.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      
                      <div className="mt-6 pt-6 border-t border-border/50">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Processing time: &lt; {index === 0 ? "1 min" : index === 1 ? "30 sec" : "Real-time"}</span>
                        </div>
                      </div>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>


      
       {/* Enhanced CTA Section */}
       <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-cyan-500/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <BlurFade delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-black mb-8">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Ready to Transform
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Your Vision?
                </span>
              </h2>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                Join thousands of companies already using our AI vision platform to unlock insights from their visual data.
              </p>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <ShimmerButton className="shadow-2xl">
                  Start Your Free Trial
                </ShimmerButton>
                
                <button className="group inline-flex items-center px-8 py-4 rounded-2xl bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-border/50 dark:border-border/30 text-foreground font-medium hover:bg-background/80 dark:hover:bg-background/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Schedule Demo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.4}>
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Full feature access</span>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

        {/* Testimonials Section */}
        <section className="py-32 bg-secondary/5 dark:bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/20 dark:to-orange-500/20 border border-yellow-500/20 dark:border-yellow-500/30 mb-8">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-foreground">Customer Success</span>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Loved by
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  Thousands
                </span>
              </h2>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                See how industry leaders are transforming their businesses with our AI vision platform.
              </p>
            </BlurFade>
          </div>

          <BlurFade delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "CTO, TechFlow Industries",
                  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                  content: "The accuracy and speed of their computer vision platform is unmatched. We've seen a 300% improvement in our quality control processes.",
                  rating: 5
                },
                {
                  name: "Michael Rodriguez", 
                  role: "Head of Security, SecureVision Corp",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                  content: "Real-time facial recognition with 99.9% accuracy has revolutionized our security operations. The integration was seamless.",
                  rating: 5
                },
                {
                  name: "Emily Watson",
                  role: "VP Innovation, RetailMax",
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", 
                  content: "Their video analytics platform helped us understand customer behavior patterns we never knew existed. ROI was immediate.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <MagicCard key={index} className="h-full">
                  <div className="p-8">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    
                    <Quote className="w-8 h-8 text-muted-foreground/30 dark:text-muted-foreground/20 mb-4" />
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-border/50"
                      />
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>
      
    </div>
  );
}

// Static visualization component to replace Spline
function ComputerVisionVisualization() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden rounded-xl"
    >
      {/* Background image */}
      <img 
        src="https://img.recraft.ai/SKznhPwTLev5w3maxlI5MuSWYEB65SwcFkt6maCHIHY/rs:fit:1024:1024:0/q:95/g:no/plain/abs://prod/images/d6a240d9-5508-410b-b4b9-0fb36893b188@jpg" 
        alt="Street scene with person" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Camera interface elements */}
      <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm p-2 rounded-lg border border-white/20 flex items-center gap-2 shadow-lg">
        <Camera size={16} className="text-white" />
        <span className="text-white text-xs font-medium">Live Feed</span>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm p-2 rounded-lg border border-white/20 shadow-lg">
        <div className="text-white text-xs font-medium">Processing...</div>
      </div>
      
      {/* Main person detection */}
      <motion.div 
        className="absolute right-[43%] top-[80%] -translate-y-1/2 w-[100px] h-[300px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div 
          className="w-full h-full border-2 border-purple-500 rounded-md"
          animate={{ 
            boxShadow: ['0 0 0 rgba(168, 85, 247, 0)', '0 0 8px rgba(168, 85, 247, 0.6)', '0 0 0 rgba(168, 85, 247, 0)'],
            borderColor: ['rgba(168, 85, 247, 0.7)', 'rgba(168, 85, 247, 1)', 'rgba(168, 85, 247, 0.7)']
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="absolute -top-8 left-0 bg-purple-500 text-white text-xs px-3 py-1 rounded-md flex items-center gap-2 shadow-lg">
            <Eye size={12} />
            Person
            <span className="bg-white/20 px-1 rounded">98%</span>
          </div>
          
          {/* Scanning effect */}
          <motion.div 
            className="absolute inset-0 border-t-2 border-purple-500"
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          ></motion.div>
          
          {/* Body points connections */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Head */}
            <circle cx="50%" cy="15%" r="5" fill="rgba(168, 85, 247, 0.8)" />
            {/* Shoulders */}
            <circle cx="35%" cy="25%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="65%" cy="25%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            {/* Body center */}
            <circle cx="50%" cy="45%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            {/* Hips */}
            <circle cx="40%" cy="60%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="60%" cy="60%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            {/* Knees */}
            <circle cx="35%" cy="75%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="65%" cy="75%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            {/* Feet */}
            <circle cx="35%" cy="95%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="65%" cy="95%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            
            {/* Connection lines */}
            <line x1="50%" y1="15%" x2="35%" y2="25%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="50%" y1="15%" x2="65%" y2="25%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="35%" y1="25%" x2="65%" y2="25%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="35%" y1="25%" x2="50%" y2="45%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="65%" y1="25%" x2="50%" y2="45%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="50%" y1="45%" x2="40%" y2="60%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="50%" y1="45%" x2="60%" y2="60%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="40%" y1="60%" x2="35%" y2="75%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="60%" y1="60%" x2="65%" y2="75%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="35%" y1="75%" x2="35%" y2="95%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="65%" y1="75%" x2="65%" y2="95%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Object detection */}
      <motion.div 
        className="absolute left-[78%] top-[60%] w-[100px] h-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div 
          className="w-full h-full border-2 border-green-500 rounded-md"
          animate={{ 
            boxShadow: ['0 0 0 rgba(34, 197, 94, 0)', '0 0 8px rgba(34, 197, 94, 0.6)', '0 0 0 rgba(34, 197, 94, 0)'],
            borderColor: ['rgba(34, 197, 94, 0.7)', 'rgba(34, 197, 94, 1)', 'rgba(34, 197, 94, 0.7)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute -top-8 left-0 bg-green-500 text-white text-xs px-3 py-1 rounded-md flex items-center gap-2 shadow-lg">
            <Table size={12} />
            Bench
            <span className="bg-white/20 px-1 rounded">87%</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Camera detection */}
      <motion.div 
        className="absolute left-[3%] bottom-[25%] w-[190px] h-[120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div 
          className="w-full h-full border-2 border-blue-400 rounded-md"
          animate={{ 
            boxShadow: ['0 0 0 rgba(96, 165, 250, 0)', '0 0 8px rgba(96, 165, 250, 0.6)', '0 0 0 rgba(96, 165, 250, 0)'],
            borderColor: ['rgba(96, 165, 250, 0.7)', 'rgba(96, 165, 250, 1)', 'rgba(96, 165, 250, 0.7)']
          }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <div className="absolute -top-8 left-0 bg-blue-400 text-white text-xs px-3 py-1 rounded-md flex items-center gap-2 shadow-lg">
            <Camera size={12} />
            Truck or van
            <span className="bg-white/20 px-1 rounded">93%</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Data processing overlay */}
      <div className="absolute top-4 right-4 bg-background/90 dark:bg-background/95 backdrop-blur-sm p-2.5 rounded-lg border border-green-500/20 dark:border-green-500/30 shadow-md" style={{ width: "180px" }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-green-500" 
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs font-medium text-foreground">AI Vision</span>
          </div>
          <motion.span 
            className="text-[10px] font-medium text-green-500"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LIVE
          </motion.span>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "Detection", color: "green-500" },
            { label: "Analysis", color: "blue-400" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground w-14">{item.label}</span>
              <div className="h-1 flex-grow bg-secondary/60 dark:bg-secondary/40 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full bg-${item.color}`}
                  initial={{ width: "10%" }}
                  animate={{ width: ["10%", "90%", "30%", "70%", "10%"] }}
                  transition={{ 
                    duration: 4 + i, 
                    repeat: Infinity, 
                    delay: i * 0.4
                  }}
                />
              </div>
              <motion.span 
                className={`text-[9px] font-medium text-${item.color} w-7 text-right`}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                {Math.floor(70 + Math.random() * 29)}%
              </motion.span>
            </div>
          ))}
        </div>
      </div>
      
      {/* AI insights */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/90 dark:bg-background/95 backdrop-blur-sm py-2 px-4 rounded-full border border-border/50 dark:border-border/30 shadow-lg flex items-center gap-2">
        <BrainCircuit size={16} className="text-primary" />
        <span className="text-foreground text-xs">AI Vision Analysis Active</span>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Analysis metrics */}
      {/* <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-white/80">Confidence:</span>
            <motion.div 
              className="h-1.5 w-16 bg-gray-700 rounded-full overflow-hidden"
              initial={{ width: '16rem' }}
            >
              <motion.div 
                className="h-full bg-primary" 
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            </motion.div>
            <span className="text-xs text-primary">85%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-white/80">Tracking:</span>
            <motion.div 
              className="h-1.5 w-16 bg-gray-700 rounded-full overflow-hidden"
              initial={{ width: '16rem' }}
            >
              <motion.div 
                className="h-full bg-purple-500" 
                initial={{ width: "0%" }}
                animate={{ width: "92%" }}
                transition={{ duration: 1.4, delay: 0.4 }}
              />
            </motion.div>
            <span className="text-xs text-purple-500">92%</span>
          </div>
        </div>
      </div> */}
      
      {/* Floating scan points */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/80"
          style={{ 
            left: `${10 + Math.random() * 80}%`, 
            top: `${10 + Math.random() * 80}%` 
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Fallback component when Spline fails to load
function SplineFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/20 dark:to-secondary/10 p-8">
      <div className="mb-8 relative">
        <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white shadow-lg">
          <Eye className="w-12 h-12" />
        </div>
        <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 rounded-full blur-xl"></div>
      </div>
      <h3 className="text-2xl font-bold text-center mb-4 text-foreground">Computer Vision Intelligence</h3>
      <p className="text-center text-muted-foreground max-w-md mb-6 leading-relaxed">
        Our advanced AI algorithms process visual data to deliver real-time insights and automated recognition capabilities.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        {['Object Detection', 'Face Recognition', 'Scene Analysis', 'Motion Tracking'].map((item, i) => (
          <div 
            key={i} 
            className="px-4 py-2 rounded-full border border-primary/20 dark:border-primary/30 bg-primary/10 dark:bg-primary/20 text-sm font-medium text-foreground"
          >
            {item}
          </div>
        ))}
      </div>
      
      {/* Abstract visualization */}
      <div className="mt-8 relative w-full max-w-sm h-32">
        {[...Array(8)].map((_, i) => {
          const size = 20 + Math.random() * 30;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const delay = i * 0.5;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-primary/40 to-purple-500/40 dark:from-primary/30 dark:to-purple-500/30"
              style={{ width: size, height: size, top: `${top}%`, left: `${left}%` }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Custom ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Spline component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ComputerVisionPage;