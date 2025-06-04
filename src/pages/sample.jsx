import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  // Camera icon for capturing and visual input
  Camera, 
  // Code icon for programming and development
  Code, 
  // Scan icon for scanning and detection
  Scan,
  // Eye icon for vision and monitoring
  Eye, 
  // FileCode icon for code files and documentation
  FileCode, 
  // Cpu icon for processing and computation
  Cpu, 
  // BrainCircuit icon for AI and neural networks
  BrainCircuit, 
  // Database icon for data storage and management
  Database, 
  // ChevronRight icon for navigation and direction
  ChevronRight, 
  // CheckCircle icon for completion and verification
  CheckCircle, 
  // Activity icon for monitoring and tracking
  Activity,
  // ArrowRight icon for navigation and progression
  ArrowRight,
  // Image icon for image processing and display
  Image,
  // Video icon for video content and streaming
  Video,
  // ScanSearch icon for search and analysis
  ScanSearch,
  // PieChart icon for data visualization and analytics
  PieChart,
  // Play icon for media playback and execution
  Play,
  // Zap icon for speed and performance
  Zap,
  // Shield icon for security and protection
  Shield,
  // Gauge icon for metrics and measurements
  Gauge,
  // Users icon for user management and social features
  Users,
  // Star icon for ratings and favorites
  Star,
  // Quote icon for testimonials and references
  Quote,
  // Search icon for search functionality
  Search,
  // Settings icon for configuration and preferences
  Settings,
  // Monitor icon for desktop/display interfaces
  Monitor,
  // Smartphone icon for mobile interfaces
  Smartphone,
  // Globe icon for global/network features
  Globe,
  // Target icon for goals and objectives
  Target,
  // TrendingUp icon for growth and progress
  TrendingUp,
  // Award icon for achievements and recognition
  Award,
  // Clock icon for time and scheduling
  Clock,
  // BarChart3 icon for data visualization and statistics
  BarChart3
} from 'lucide-react';
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { MagicCard } from "@/components/magicui/magic-card";

// Simple BorderBeam component alternative
const BorderBeam = ({ size = 50, duration = 6, delay = 0, className = "" }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}>
      <motion.div
        className="absolute aspect-square bg-gradient-to-l from-blue-500 via-purple-500 to-cyan-500 opacity-60"
        style={{
          width: size,
          height: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
        }}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
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
      className={`relative inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium overflow-hidden ${className}`}
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
      className={`inline-block ${className}`}
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

function ComputerVisionPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Tech stack icons for display
  const techStack = [
    "TensorFlow", "PyTorch", "Python", "OpenCV", "Docker", "Kubernetes", "AWS", "Google Cloud"
  ];

  return (
    <div ref={containerRef} className="relative bg-background overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        color="#3b82f6"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Gradient orbs */}
        <motion.div 
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, 100]),
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          }}
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
        />
        <motion.div 
          className="absolute right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, -100]),
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          }}
          animate={{
            x: -mousePosition.x * 0.02,
            y: -mousePosition.y * 0.02,
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <BlurFade delay={0.1}>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8">
                  <Zap className="w-4 h-4 text-blue-500 mr-2" />
                  <TextShimmer className="text-sm font-medium">
                    Next-Generation Computer Vision
                  </TextShimmer>
                </div>
              </BlurFade>

              <BlurFade delay={0.2}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                  <span className="bg-gradient-to-br from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                    See The
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    Invisible
                  </span>
                </h1>
              </BlurFade>

              <BlurFade delay={0.3}>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                  Transform visual data into intelligent insights with our cutting-edge AI vision platform. 
                  Real-time processing, unmatched accuracy, infinite possibilities.
                </p>
              </BlurFade>

              <BlurFade delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <ShimmerButton className="shadow-2xl">
                    Start Free Trial
                  </ShimmerButton>
                  
                  <button className="group inline-flex items-center px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-foreground font-medium hover:bg-white/10 transition-all duration-300">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </button>
                </div>
              </BlurFade>
            </div>

            {/* Hero Stats */}
            <BlurFade delay={0.5}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {[
                  { label: "Accuracy", value: 99.7, suffix: "%" },
                  { label: "Processing Speed", value: 120, suffix: "fps" },
                  { label: "Models Trained", value: 500, suffix: "+" },
                  { label: "Enterprise Clients", value: 150, suffix: "+" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                      <NumberTicker value={stat.value} />
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </BlurFade>

            {/* Vision Technology Showcase */}
            <BlurFade delay={0.6}>
              <div className="relative max-w-4xl mx-auto">
                <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-2xl">
                  <BorderBeam size={250} duration={12} />
                  
                  {/* Central AI Eye */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <OrbitingCircles
                        className="size-[50px] border-none bg-transparent"
                        duration={20}
                        delay={0}
                        radius={120}
                      >
                        <VisionIcon className="w-8 h-8 text-blue-500" />
                      </OrbitingCircles>
                      
                      <OrbitingCircles
                        className="size-[50px] border-none bg-transparent"
                        duration={20}
                        delay={10}
                        radius={120}
                      >
                        <Camera className="w-8 h-8 text-purple-500" />
                      </OrbitingCircles>
                      
                      <OrbitingCircles
                        className="size-[60px] border-none bg-transparent"
                        duration={25}
                        delay={5}
                        radius={180}
                        reverse
                      >
                        <NeuralNetworkIcon className="w-10 h-10 text-cyan-500" />
                      </OrbitingCircles>
                      
                      <OrbitingCircles
                        className="size-[60px] border-none bg-transparent"
                        duration={25}
                        delay={15}
                        radius={180}
                        reverse
                      >
                        <BrainCircuit className="w-10 h-10 text-emerald-500" />
                      </OrbitingCircles>
                      
                      <OrbitingCircles
                        className="size-[40px] border-none bg-transparent"
                        duration={30}
                        delay={0}
                        radius={240}
                      >
                        <Scan className="w-6 h-6 text-orange-500" />
                      </OrbitingCircles>
                      
                      <OrbitingCircles
                        className="size-[40px] border-none bg-transparent"
                        duration={30}
                        delay={20}
                        radius={240}
                      >
                        <Eye className="w-6 h-6 text-pink-500" />
                      </OrbitingCircles>

                      {/* Central core */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <VisionIcon className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Corner indicators */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-500/20 border border-green-500/30">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium text-green-400">ACTIVE</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-2 rounded-full bg-blue-500/20 border border-blue-500/30">
                      <span className="text-xs font-medium text-blue-400">AI VISION v3.2</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                      <span className="text-xs font-medium">Real-time Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 border-y border-border/40">
        <div className="container mx-auto px-6">
          <BlurFade delay={0.1}>
            <div className="text-center mb-12">
              <p className="text-sm text-muted-foreground mb-8">Trusted by industry leaders worldwide</p>
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <Marquee pauseOnHover className="py-4">
              {[
                "TechCorp", "InnovateLab", "VisionAI", "DataFlow", "SmartSys", 
                "FutureTech", "CloudVision", "AICore", "PixelPro", "CogniVis"
              ].map((company, i) => (
                <div key={i} className="mx-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 backdrop-blur-sm">
                  <span className="text-lg font-semibold text-muted-foreground">{company}</span>
                </div>
              ))}
            </Marquee>
          </BlurFade>
        </div>
      </section>

      {/* Services Section - Enhanced Bento Grid */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-8">
                <Target className="w-4 h-4 text-purple-500 mr-2" />
                <span className="text-sm font-medium">Comprehensive Solutions</span>
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />
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
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="grid grid-cols-4 gap-4 opacity-30">
                        {techStack.slice(0, 8).map((tech, i) => (
                          <div key={i} className="text-xs p-2 bg-white/10 rounded-lg text-center">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-8 gap-1 p-8">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 rounded-sm bg-emerald-500/40"
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

      {/* How It Works Section */}
      <section className="py-32 bg-gradient-to-b from-transparent to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-8">
                <Gauge className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm font-medium">Simple Process</span>
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
                  <MagicCard className="h-full">
                    <div className="p-8">
                      <div className="flex items-start gap-6 mb-6">
                        <div className="text-6xl font-black text-muted-foreground/20">
                          {step.step}
                        </div>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white`}>
                          {step.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
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

      {/* Testimonials Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 mb-8">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-sm font-medium">Customer Success</span>
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
                    
                    <Quote className="w-8 h-8 text-muted-foreground/20 mb-4" />
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
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

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        
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
                
                <button className="group inline-flex items-center px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-foreground font-medium hover:bg-white/10 transition-all duration-300">
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
    </div>
  );
}

export default ComputerVisionPage;