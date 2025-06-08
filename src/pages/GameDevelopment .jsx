import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { 
  Gamepad, Code, Layers, Cpu, Trophy, CheckCircle, Star,
  Globe, Briefcase, ArrowRight, Download, Users, Clock, Server,
  Monitor, Cloud, Zap, Shield, Award, HardDrive, Play, Pause, Volume2, VolumeX
} from 'lucide-react';
import { NumberTicker } from '../components/ui/number-ticker';

// Animation keyframes - moved to CSS-in-JS for better theme integration
const getAnimationStyles = (isDark) => `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes customPulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  @keyframes typeWriter {
    from { width: 0%; }
    to { width: 100%; }
  }
  
  /* Theme transition class for smooth theme switching */
  .theme-transition {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }
  
  .cursor:after {
    content: '|';
    animation: blink 1s step-end infinite;
    color: ${isDark ? '#60a5fa' : '#2563eb'};
  }
  
  .floating { animation: float 3s ease-in-out infinite; }
  .custom-pulse { animation: customPulse 2s infinite; }
`;

// Stats data - mobile optimized
const STATS = [
  { value: '50+', label: 'Games Shipped', icon: <Gamepad className="w-4 h-4 sm:w-5 sm:h-5" />, numValue: 50, suffix: '+' },
  { value: '98%', label: 'Client Satisfaction', icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />, numValue: 98, suffix: '%' },
  { value: '12+', label: 'Years Experience', icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />, numValue: 12, suffix: '+' },
  { value: '15M+', label: 'Players Reached', icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />, numValue: 15, suffix: 'M+' }
];

// Services data with mobile-optimized descriptions
const SERVICES = [
  {
    icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Game Programming",
    description: "Clean, optimized code for your game with a focus on performance and maintainability",
    features: ["Custom gameplay mechanics", "Performance optimization", "Multiplayer networking", "AI systems"],
    color: "blue"
  },
  {
    icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Game Design",
    description: "Engaging gameplay mechanics, level design, and systems that keep players coming back",
    features: ["Level architecture", "Balancing systems", "Player progression", "Economy design"],
    color: "purple"
  },
  {
    icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Unity/Unreal Development",
    description: "Expert development in industry-standard game engines for all platforms",
    features: ["Cross-platform builds", "Custom shaders", "VFX systems", "Performance profiling"],
    color: "green"
  },
  {
    icon: <Server className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Game Backend Systems",
    description: "Robust server architecture and databases to support your multiplayer game experience",
    features: ["Scalable infrastructure", "Player accounts", "Leaderboards", "Analytics dashboards"],
    color: "amber"
  }
];

// Additional services
const ADDITIONAL_SERVICES = [
  {
    icon: <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "UI/UX for Games",
    description: "Intuitive and engaging user interfaces that enhance the overall gaming experience",
    features: ["Menu systems", "HUD design", "User testing", "Accessibility"],
    color: "cyan"
  },
  {
    icon: <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Cloud Gaming Solutions",
    description: "State-of-the-art cloud infrastructure for seamless game streaming and performance",
    features: ["Low latency streaming", "Cross-device sync", "Auto-scaling", "Global deployment"],
    color: "indigo"
  }
];

// Portfolio projects with mobile-optimized metadata
const PROJECTS = [
  {
    title: "Fantasy RPG",
    category: "Mobile Game",
    description: "Open-world fantasy RPG with advanced character progression and dynamic world events",
    image: "https://images.unsplash.com/photo-1642068052494-8325822f6d92?auto=format&fit=crop&w=500&q=80",
    downloads: "2.5M+",
    downloadsNum: 2.5,
    downloadsSuffix: "M+",
    platforms: ["iOS", "Android"],
    tech: ["Unity", "C#", "Firebase"],
    achievements: ["Editor's Choice", "Featured App"],
    color: "blue"
  },
  {
    title: "Space Explorer",
    category: "PC Game",
    description: "Procedurally generated space exploration game with resource management and alien civilizations",
    image: "https://images.unsplash.com/photo-1614728894747-a83421789f10?auto=format&fit=crop&w=500&q=80",
    downloads: "1.8M+",
    downloadsNum: 1.8,
    downloadsSuffix: "M+",
    platforms: ["Steam", "Epic"],
    tech: ["Unreal", "C++", "AWS"],
    achievements: ["Steam Top Seller", "Best Indie Game 2022"],
    color: "purple"
  },
  {
    title: "Puzzle Adventure",
    category: "Multi-platform",
    description: "Mind-bending puzzle game with innovative mechanics and beautiful artistic style",
    image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?auto=format&fit=crop&w=500&q=80",
    downloads: "3.2M+",
    downloadsNum: 3.2,
    downloadsSuffix: "M+",
    platforms: ["PC", "Console", "Mobile"],
    tech: ["Unity", "C#", "PlayFab"],
    achievements: ["10/10 IGN Rating", "Game Awards Nominee"],
    color: "green"
  }
];

// Gaming studio partners
const PARTNERS = [
  { name: "Unity Technologies" },
  { name: "Epic Games" },
  { name: "Electronic Arts" },
  { name: "Ubisoft" },
  { name: "Activision Blizzard" }
];

// Testimonials data with mobile-optimized structure
const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    company: "Indie Games Studio",
    text: "Working with this developer transformed our game idea into reality. The technical expertise and creative input took our project to another level.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    company: "GameCraft Interactive",
    text: "Exceptional coding skills and game design knowledge. Delivered ahead of schedule and exceeded our performance requirements.",
    rating: 5
  },
  {
    name: "Emily Chang",
    company: "Pixel Dreams",
    text: "The attention to detail and passion for gaming made all the difference. Our mobile game exceeded download targets by 45%.",
    rating: 5
  }
];

// Game development process steps
const PROCESS_STEPS = [
  {
    number: "01",
    title: "Concept & Planning",
    description: "We define your game concept, target audience, and core mechanics. I create a detailed development roadmap.",
    icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "blue"
  },
  {
    number: "02",
    title: "Development",
    description: "I build your game with clean code, optimized performance, and regular milestones to track progress.",
    icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "purple"
  },
  {
    number: "03",
    title: "Testing & QA",
    description: "Rigorous testing ensures your game is bug-free and balanced, with smooth performance across all platforms.",
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "amber"
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "Full launch support and post-release updates to ensure your game thrives in the marketplace.",
    icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "green"
  }
];

// Features section data with mobile optimization
const KEY_FEATURES = [
  {
    icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Performance Optimized",
    description: "Games built for optimal performance across devices with efficient resource usage",
    color: "blue"
  },
  {
    icon: <HardDrive className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Cross-Platform",
    description: "Deploy your games on multiple platforms from a single codebase",
    color: "purple"
  },
  {
    icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Award-Winning",
    description: "Quality recognized with multiple industry awards and accolades",
    color: "amber"
  }
];

const GamingDevServices = ({ theme = 'dark', toggleTheme }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);
  
  // For parallax effects
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // References for scroll animations and video
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const videoRef = useRef(null);
  const splineContainerRef = useRef(null);
  
  // Derive isDark from theme prop with fallback
  const isDark = theme === 'dark';

  // Memoized scroll handler for better performance
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle Spline load event
  const handleSplineLoad = () => {
    setSplineLoaded(true);
  };
  
  // Handle video visibility based on browser tab focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (videoRef.current) {
        if (document.hidden) {
          videoRef.current.pause();
        } else if (isVideoPlaying) {
          videoRef.current.play();
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVideoPlaying]);
  
  // Simplified scroll to section function
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Enhanced theme configuration using CSS custom properties and proper theme classes
  const themeConfig = {
    // Main backgrounds - using theme-aware classes
    mainBg: 'bg-background theme-transition',
    sectionBg: isDark ? 'bg-card/50 backdrop-blur-sm' : 'bg-card/80 backdrop-blur-sm',
    cardBg: isDark ? 'bg-card/80 backdrop-blur-md' : 'bg-card/90 backdrop-blur-md',
    
    // Text colors - using semantic color tokens
    textPrimary: 'text-foreground theme-transition',
    textSecondary: 'text-muted-foreground theme-transition',
    textMuted: 'text-muted-foreground/70 theme-transition',
    
    // Borders and dividers - using theme variables
    border: 'border-border/50 theme-transition',
    borderHover: isDark ? 'hover:border-blue-500/50' : 'hover:border-blue-400/50',
    
    // Interactive states
    hover: isDark ? 'hover:bg-accent/10' : 'hover:bg-accent/5',
    
    // Accent colors - theme-aware
    accent: isDark ? 'text-blue-400' : 'text-blue-600',
    accentBg: isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-500/5 border-blue-500/15',
    accentBorder: isDark ? 'border-blue-500/30' : 'border-blue-400/30',
    
    // Gradients - consistent across themes
    primaryGradient: isDark ? 'from-blue-600 to-indigo-600' : 'from-blue-500 to-indigo-500',
    textGradient: 'from-blue-400 via-purple-400 to-blue-300',
    
    // Shadows - theme-aware
    shadow: isDark ? 'shadow-lg shadow-black/20' : 'shadow-lg shadow-blue-500/10',
    glowShadow: isDark ? 'shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'shadow-[0_0_30px_rgba(59,130,246,0.15)]',
  };

  // Interactive typewriter effect for welcome message
  const [typewriterText, setTypewriterText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const welcomeText = "WELCOME TO THE NEXT LEVEL OF GAME DEVELOPMENT";
  
  // Type writer effect
  useEffect(() => {
    if (!typewriterText) {
      let currentText = '';
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < welcomeText.length) {
          currentText += welcomeText[currentIndex];
          setTypewriterText(currentText);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          // Remove cursor after typing is complete
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, 100);
      
      return () => clearInterval(typeInterval);
    }
  }, []);

  return (
    <div className={`min-h-screen ${themeConfig.mainBg} ${themeConfig.textPrimary} relative overflow-hidden`}>
      {/* Dynamic Styles */}
      <style>{getAnimationStyles(isDark)}</style>
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Mobile-First Responsive Hero Section with 3D Car Model */}
        <section className="min-h-screen relative overflow-hidden">
          {/* 3D Car Model with Spline - now fully mobile interactive */}
          <div 
            ref={splineContainerRef}
            className="absolute inset-0 z-0 w-full h-full"
          >
            {/* Spline model for all devices - mobile optimized for touch */}
            <div className="w-full h-full">
              <Spline 
                scene="https://prod.spline.design/voZUbzjk4ne1Svzq/scene.splinecode"
                onLoad={handleSplineLoad}
                className="w-full h-full touch-manipulation"
                style={{ 
                  touchAction: 'manipulation',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
              />
            </div>
            
            {/* Mobile interaction tooltip - positioned at bottom center */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 sm:hidden">
              <div className={`${themeConfig.cardBg} border ${themeConfig.accentBorder} rounded-full px-4 py-2 flex items-center gap-2 animate-pulse`}>
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} animate-ping`}></div>
                <span className={`${themeConfig.textPrimary} text-xs font-medium`}>Click and drag to interact with the 3D model</span>
              </div>
            </div>
            
            {/* Loading indicator - mobile optimized */}
            {!splineLoaded && (
              <div className={`absolute inset-0 flex items-center justify-center z-50 px-4 ${themeConfig.cardBg} border ${themeConfig.border}`}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border-4 border-t-transparent border-b-transparent ${isDark ? 'border-blue-400' : 'border-blue-500'} animate-spin`}></div>
                  <p className={`mt-4 ${themeConfig.textPrimary} text-sm sm:text-base text-center`}>Loading 3D Experience...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Hero content with mobile-first responsive design - hidden on mobile to not interfere with 3D model */}
          <div className="relative z-20 hidden sm:flex flex-col justify-center items-start h-screen px-4 sm:px-6 md:px-16 lg:px-24 pointer-events-none">
            <div className="max-w-full sm:max-w-2xl w-full">
              {/* Animated tag/badge - desktop only */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`inline-flex items-center mb-4 sm:mb-8 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full ${themeConfig.cardBg} border ${themeConfig.accentBorder} text-xs sm:text-sm backdrop-blur-md`}
              >
                <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${isDark ? 'bg-blue-400' : 'bg-blue-500'} mr-2`}></span>
                <p className={`font-medium ${themeConfig.accent}`}>Interactive Game Development</p>
              </motion.div>
              
              {/* Main headline - desktop only */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-[1.1]"
              >
                <span className={`block bg-clip-text text-transparent bg-gradient-to-r ${themeConfig.textGradient}`}>
                  Racing Into The
                </span>
                <span className={`block mt-1 sm:mt-2 ${themeConfig.textPrimary}`}>
                  Gaming Future
                </span>
              </motion.h1>
              
              {/* Description text - desktop only */}
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`mb-6 sm:mb-10 text-base sm:text-lg lg:text-xl leading-relaxed max-w-full sm:max-w-lg ${themeConfig.textSecondary} ${themeConfig.cardBg} rounded-xl py-2 sm:py-3 px-3 sm:px-5 border ${themeConfig.border}`}
              >
                Interact with our 3D model and experience the next level of gaming development. We create immersive experiences that push boundaries.
              </motion.p>
              
              {/* Action buttons - desktop only */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 pointer-events-auto w-full sm:w-auto"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${themeConfig.primaryGradient} rounded-full font-medium text-base sm:text-lg ${themeConfig.shadow} text-white flex items-center justify-center gap-2 sm:gap-3 overflow-hidden w-full sm:w-auto min-h-[48px] touch-manipulation transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25`}
                >
                  <span className="relative z-10 text-sm sm:text-base">Start Your Game Project</span>
                  <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-blue-500 to-indigo-500' : 'from-blue-400 to-indigo-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(servicesRef)}
                  className={`flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-4 border rounded-full font-medium ${themeConfig.accentBorder} ${themeConfig.hover} ${themeConfig.cardBg} ${themeConfig.textPrimary} w-full sm:w-auto min-h-[48px] touch-manipulation text-sm sm:text-base transition-all duration-300`}
                >
                  <Gamepad className="w-4 h-4 sm:w-5 sm:h-5" />
                  Explore Our Services
                </motion.button>
              </motion.div>
              
              {/* Interactive tip - desktop only */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className={`mt-6 sm:mt-10 inline-flex items-center text-xs sm:text-sm backdrop-blur-md ${themeConfig.accentBg} rounded-full px-3 sm:px-5 py-1.5 sm:py-2 border ${themeConfig.accentBorder} max-w-full`}
              >
                <span className={`${themeConfig.accent} mr-2`}>💡</span>
                <span className={`${themeConfig.textSecondary}`}>
                  Tip: Click and drag to interact with the 3D model
                </span>
              </motion.div>
            </div>
          </div>

        

          {/* Mobile-only bottom action area */}
          <div className="absolute bottom-20 left-4 right-4 z-30 sm:hidden">
            <div className="flex flex-col gap-3">
              {/* Primary CTA for mobile */}
              <button 
                className={`w-full bg-gradient-to-r ${themeConfig.primaryGradient} rounded-full py-3 px-6 font-medium text-white flex items-center justify-center gap-2 ${themeConfig.shadow} min-h-[48px] touch-manipulation`}
                onClick={() => alert('Starting your game development journey!')}
              >
                <span>Start Your Game Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              {/* Secondary CTA for mobile */}
              <button 
                onClick={() => scrollToSection(servicesRef)}
                className={`w-full border ${themeConfig.accentBorder} ${themeConfig.cardBg} rounded-full py-3 px-6 font-medium ${themeConfig.textPrimary} flex items-center justify-center gap-2 min-h-[48px] touch-manipulation transition-all duration-300 ${themeConfig.hover}`}
              >
                <Gamepad className="w-4 h-4" />
                <span>Explore Services</span>
              </button>
            </div>
          </div>
        </section>

        {/* Mobile-First Gaming-themed Key Features Section */}
        <section className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 relative ${isDark ? '' : 'bg-muted/30'} ${themeConfig.mainBg}`} ref={servicesRef}>
          {/* Interactive background elements */}
          {isDark && (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({length: 5}).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-1 h-1 rounded-full bg-blue-400/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    boxShadow: '0 0 40px 20px rgba(59,130,246,0.1)',
                    animation: `customPulse ${3 + Math.random() * 3}s infinite alternate`,
                  }}
                ></div>
              ))}
            </div>
          )}
          
          <div className="max-w-7xl mx-auto">
            {/* Mobile-optimized section header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div 
                className={`inline-flex items-center px-3 sm:px-4 py-1 rounded-lg ${themeConfig.accentBg} border ${themeConfig.accentBorder} mb-3 sm:mb-4 transition-colors duration-500 transform hover:scale-110 cursor-pointer`}
                onClick={() => window.open('https://example.com/core-features', '_blank')}
              >
                <Trophy className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
                <p className={`text-xs sm:text-sm font-medium ${themeConfig.accent} transition-colors duration-500`}>CORE FEATURES</p>
              </div>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${themeConfig.textPrimary} transition-colors duration-500 px-2`}>
                Game Development <span className={`text-transparent bg-clip-text bg-gradient-to-r ${themeConfig.textGradient}`}>Powerups</span>
              </h2>
              <div className={`w-16 sm:w-20 h-1 ${isDark ? 'bg-blue-500' : 'bg-blue-600'} mx-auto rounded-full mb-4 sm:mb-6`}></div>
              <p className={`max-w-2xl mx-auto ${themeConfig.textSecondary} transition-colors duration-500 text-sm sm:text-base px-4`}>
                Our specialized game development services bring your ideas to life with cutting-edge technology and industry expertise.
              </p>
            </div>
            
            {/* Mobile-first responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {KEY_FEATURES.map((feature, index) => {
                const colorClasses = {
                  blue: {
                    icon: isDark ? 'text-blue-400' : 'text-blue-600',
                    iconBg: isDark ? 'bg-gray-800' : 'bg-gray-100',
                    title: isDark ? 'text-blue-400' : 'text-blue-600',
                    line: 'from-blue-500',
                    glow: 'bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/30 group-hover:to-blue-500/30'
                  },
                  purple: {
                    icon: isDark ? 'text-purple-400' : 'text-purple-600',
                    iconBg: isDark ? 'bg-gray-800' : 'bg-gray-100',
                    title: isDark ? 'text-purple-400' : 'text-purple-600',
                    line: 'from-purple-500',
                    glow: 'bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/30 group-hover:to-purple-500/30'
                  },
                  amber: {
                    icon: isDark ? 'text-amber-400' : 'text-amber-600',
                    iconBg: isDark ? 'bg-gray-800' : 'bg-gray-100',
                    title: isDark ? 'text-amber-400' : 'text-amber-600',
                    line: 'from-amber-500',
                    glow: 'bg-gradient-to-r from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/30 group-hover:to-amber-500/30'
                  }
                };
                const currentColor = colorClasses[feature.color] || colorClasses.blue;
                
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-lg ${themeConfig.cardBg} border ${themeConfig.border} hover:${themeConfig.borderHover} p-4 sm:p-6 md:p-8 transition-all duration-500 ${themeConfig.glowShadow} backdrop-blur-sm transform hover:-translate-y-2 cursor-pointer`}
                  >
                    {/* Animated background glow */}
                    <div className={`absolute -inset-1 ${currentColor.glow} opacity-0 group-hover:opacity-100 blur-xl group-hover:animate-pulse transition-all duration-700 -z-10`}></div>
                  
                    {/* Mobile-optimized icon container */}
                    <div className="relative mb-4 sm:mb-6 md:mb-8">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 flex items-center justify-center ${currentColor.icon} ${currentColor.iconBg} rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all group-hover:rotate-3`}>
                        {feature.icon}
                      </div>
                      <div className={`absolute -bottom-2 sm:-bottom-3 left-0 h-0.5 w-8 sm:w-12 bg-gradient-to-r ${currentColor.line} to-transparent group-hover:w-16 sm:group-hover:w-24 transition-all duration-500`}></div>
                    </div>
                    
                    {/* Mobile-optimized title */}
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 ${currentColor.title} transition-colors uppercase tracking-wide`}>
                      {feature.title}
                    </h3>
                    
                    {/* Mobile-friendly description */}
                    <p className={`${isDark ? 'text-blue-100/70 group-hover:text-white/90' : 'text-gray-700 group-hover:text-gray-900'} transition-colors text-sm sm:text-base leading-relaxed`}>
                      {feature.description}
                    </p>
                    
                    {/* Mobile-friendly "Learn more" link */}
                    <div 
                      className={`mt-4 sm:mt-6 flex items-center gap-2 text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'} opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 touch-manipulation`} 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://example.com/feature/${feature.title.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
                      }}
                    >
                      <span>LEARN MORE</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mobile-Responsive Game Studio Partnerships */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 relative">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8 sm:mb-12">
              <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${themeConfig.textPrimary}`}>
                Trusted By <span className={themeConfig.accent}>Industry Leaders</span>
              </h2>
              <p className={`max-w-3xl mx-auto ${themeConfig.textMuted} text-sm sm:text-base px-4`}>
                Partnering with top gaming companies to deliver exceptional experiences
              </p>
            </div>
            
            {/* Mobile-optimized partners grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8">
              {PARTNERS.map((partner, index) => (
                <div key={index} 
                  className={`px-3 sm:px-4 md:px-5 py-2 ${themeConfig.border} border rounded ${themeConfig.cardBg} text-xs sm:text-sm md:text-base transition-transform hover:scale-105`}
                >
                  <span className={`font-semibold ${themeConfig.textPrimary}`}>{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile-First Gaming-themed Services Section */}
        <section className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 relative ${themeConfig.mainBg}`}>
          {/* Background element */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-blue-900/5 z-0"></div>
          
          {/* Gaming HUD-style grid pattern - mobile optimized */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 V15 H30 V0 H60 V15 H30 V30 H60 V45 H30 V60 H0 V45 H30 V30z' fill='%235b95ff' fill-opacity='0.2'/%3E%3C/svg%3E\")",
          }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Mobile-optimized section header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div className="inline-flex items-center px-3 sm:px-4 py-1 rounded-lg bg-purple-600/20 border border-purple-500/30 mb-3 sm:mb-4">
                <Gamepad className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-purple-400" />
                <p className="text-xs sm:text-sm font-medium text-purple-300">GAME DEV ARSENAL</p>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight px-2">
                <span className="relative inline-block">
                  <span className="inline-block text-white">Game Development</span> 
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></span>
                </span>
                <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300">Services & Solutions</span>
              </h2>
              <p className={`max-w-3xl mx-auto text-sm sm:text-base md:text-lg ${isDark ? 'text-blue-100/80' : 'text-gray-700'} px-4`}>
                Level up your gaming project with our comprehensive suite of development services
              </p>
            </div>

            {/* Mobile-first responsive services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
              {[...SERVICES, ...ADDITIONAL_SERVICES].map((service, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-lg ${themeConfig.cardBg} border ${themeConfig.border} hover:border-${service.color}-500/50 p-4 sm:p-6 md:p-8 transition-all duration-500 ${themeConfig.glowShadow} transform hover:-translate-y-1 touch-manipulation ${themeConfig.hover}`}
                >
                  {/* Futuristic corner accents - mobile scaled */}
                  <div className={`absolute top-0 left-0 w-6 sm:w-8 md:w-10 h-0.5 sm:h-1 bg-${service.color}-500`}></div>
                  <div className={`absolute top-0 left-0 w-0.5 sm:w-1 h-6 sm:h-8 md:h-10 bg-${service.color}-500`}></div>
                  <div className={`absolute bottom-0 right-0 w-6 sm:w-8 md:w-10 h-0.5 sm:h-1 bg-${service.color}-500/50`}></div>
                  <div className={`absolute bottom-0 right-0 w-0.5 sm:w-1 h-6 sm:h-8 md:h-10 bg-${service.color}-500/50`}></div>
                  
                  {/* Mobile-optimized icon container */}
                  <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 border border-${service.color}-500/50 flex items-center justify-center overflow-hidden`} style={{ clipPath: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)' }}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}-900/50 to-black group-hover:from-${service.color}-800/50 transition-colors duration-500`}></div>
                    <div className={`relative z-10 text-${service.color}-400 group-hover:text-${service.color}-300 transition-colors duration-300`}>
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Mobile-friendly service title */}
                  <div className="relative mb-2">
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-${service.color}-400 group-hover:text-${service.color}-300 transition-colors uppercase tracking-wider`}>
                      {service.title}
                    </h3>
                    <div className={`absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 w-12 sm:w-16 bg-gradient-to-r from-${service.color}-500 to-transparent group-hover:w-20 sm:group-hover:w-32 transition-all duration-500`}></div>
                  </div>
                  
                  {/* Mobile-optimized description */}
                  <p className={`mb-4 sm:mb-6 ${isDark ? 'text-blue-100/70 group-hover:text-white/90' : 'text-gray-600 group-hover:text-gray-900'} transition-colors text-sm sm:text-base leading-relaxed`}>
                    {service.description}
                  </p>
                  
                  {/* Mobile-friendly features list */}
                  <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-6 border-t border-gray-700/30 pt-3 sm:pt-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 sm:gap-3">
                        <div className={`p-0.5 sm:p-1 rounded ${isDark ? `bg-${service.color}-900/40` : `bg-${service.color}-100/40`} group-hover:bg-${service.color}-${isDark ? '800' : '200'}/40 transition-colors mt-0.5 flex-shrink-0`}>
                          <CheckCircle size={10} className={`sm:w-3 sm:h-3 text-${service.color}-${isDark ? '400' : '600'}`} />
                        </div>
                        <span className={`text-xs sm:text-sm ${isDark ? 'text-blue-100/70 group-hover:text-white/90' : 'text-gray-600 group-hover:text-gray-900'} transition-colors leading-relaxed`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mobile-optimized CTA button */}
                  <div className="mt-6 sm:mt-8 pt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className={`w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 ${isDark ? `bg-${service.color}-900/80 hover:bg-${service.color}-800/80` : `bg-${service.color}-600/80 hover:bg-${service.color}-700/80`} border border-${service.color}-500/40 rounded text-${service.color}-${isDark ? '300' : '50'} text-xs sm:text-sm font-medium transition-all min-h-[44px] touch-manipulation`}>
                      <span>SELECT SERVICE</span>
                      <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile-First Portfolio Section - Gaming Showcase */}
        <section ref={projectsRef} className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 relative ${isDark ? '' : 'bg-muted/20'} ${themeConfig.mainBg}`}>
          {/* Gaming background overlay */}
          <div className="absolute inset-0 opacity-10 z-0">
            {/* Hex grid pattern */}
            <div className="w-full h-full transition-opacity duration-300" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 V15 H30 V0 H60 V15 H30 V30 H60 V45 H30 V60 H0 V45 H30 V30z' fill='%235b95ff' fill-opacity='${isDark ? '0.2' : '0.3'}'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          {/* Floating game controller icons - mobile optimized */}
          {Array.from({length: 4}).map((_, i) => (
            <div 
              key={`controller-${i}`}
              className={`absolute opacity-10 ${isDark ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300 z-0 hidden sm:block`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1})`,
                animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <Gamepad size={30} />
            </div>
          ))}

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Mobile-optimized section header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              {/* Gaming title badge */}
              <div className="inline-flex items-center px-3 sm:px-4 py-1 rounded-lg bg-blue-600/20 border border-blue-500/30 mb-3 sm:mb-4">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-amber-400" />
                <p className="text-xs sm:text-sm font-medium text-blue-300">GAME SHOWCASE</p>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Featured Projects
                </span>
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-blue-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
              <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-blue-100/80 px-4">
                Award-winning games and interactive experiences across multiple platforms
              </p>
            </div>
            
            {/* Mobile-first responsive project cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-8 sm:mb-12 md:mb-16">
              {PROJECTS.map((project, idx) => (
                <div 
                  key={idx}
                  className={`group relative rounded-2xl overflow-hidden ${themeConfig.cardBg} border ${themeConfig.border} hover:border-blue-500/50 transition-all duration-500 ${themeConfig.glowShadow} touch-manipulation ${themeConfig.hover}`}
                >
                  {/* Cyberpunk corner accents - mobile scaled */}
                  <div className={`absolute top-0 left-0 w-6 sm:w-8 md:w-10 h-0.5 sm:h-1 bg-${project.color}-500 z-10`}></div>
                  <div className={`absolute top-0 left-0 w-0.5 sm:w-1 h-6 sm:h-8 md:h-10 bg-${project.color}-500 z-10`}></div>
                  <div className={`absolute bottom-0 right-0 w-6 sm:w-8 md:w-10 h-0.5 sm:h-1 bg-${project.color}-500/50 z-10`}></div>
                  <div className={`absolute bottom-0 right-0 w-0.5 sm:w-1 h-6 sm:h-8 md:h-10 bg-${project.color}-500/50 z-10`}></div>
                  
                  {/* Main image with overlay effect - mobile optimized */}
                  <div className="h-40 sm:h-48 md:h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gaming platform badges - mobile optimized */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1 z-20">
                      {project.platforms.map((platform, i) => (
                        <span key={i} className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded border backdrop-blur-sm bg-${project.color}-900/60 text-white border-${project.color}-500/30`}>
                          {platform}
                        </span>
                      ))}
                    </div>
                    
                    {/* Downloads counter - mobile optimized */}
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1 sm:gap-2 z-20 px-1.5 sm:px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-gray-700/50">
                      <Download className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-${project.color}-400`} />
                      <span className="text-xs font-medium text-white">
                  <NumberTicker value={project.downloadsNum} decimalPlaces={1} className="text-white" />
                  {project.downloadsSuffix}
                </span>
                    </div>
                  </div>
                  
                  {/* Card content - mobile optimized */}
                  <div className="p-4 sm:p-5 md:p-6">
                    {/* Game title with tech underline */}
                    <div className="mb-2">
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-${project.color}-400 group-hover:text-${project.color}-300 transition-colors`}>{project.title}</h3>
                      <div className={`h-0.5 w-12 sm:w-16 bg-gradient-to-r from-${project.color}-500 to-transparent mt-1 sm:mt-2 group-hover:w-20 sm:group-hover:w-32 transition-all duration-500`}></div>
                    </div>
                    <p className={`text-xs sm:text-sm mb-1 sm:mb-2 ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>{project.category}</p>
                    <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${isDark ? 'text-blue-100/70' : 'text-gray-600'} leading-relaxed`}>{project.description}</p>
                    
                    {/* Tech badges - mobile optimized */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                      {project.tech.map((tech, i) => (
                        <span key={i} className={`text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} border border-${project.color}-${isDark ? '900/40' : '200/40'} text-${project.color}-${isDark ? '400' : '600'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Achievements tags - mobile optimized */}
                    <div className="mb-4 sm:mb-5">
                      <div className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Achievements</div>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <Star className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-${project.color}-${isDark ? '400' : '500'}`} />
                            <span className={`text-xs ${isDark ? 'text-blue-100/80' : 'text-gray-600'}`}>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Mobile-friendly CTA button */}
                    <button className={`w-full mt-2 flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 bg-${project.color}-900/50 hover:bg-${project.color}-800/50 border border-${project.color}-500/30 rounded text-${project.color}-300 text-xs sm:text-sm font-medium transition-all min-h-[44px] touch-manipulation`}>
                      <span>VIEW PROJECT</span>
                      <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile-First Development Process - Gaming Quest Path */}
        <section className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 relative ${isDark ? '' : 'bg-muted/20'} ${themeConfig.mainBg}`}>
          {/* Tech background with lines */}
          <div className={`absolute inset-0 opacity-${isDark ? '5' : '10'} z-0 transition-opacity duration-300`}>
            <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${isDark ? 'blue-500' : 'blue-600'} to-transparent`}></div>
            <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${isDark ? 'blue-500' : 'blue-600'} to-transparent`}></div>
            <div className={`absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-${isDark ? 'blue-500' : 'blue-600'} to-transparent`}></div>
            <div className={`absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-${isDark ? 'blue-500' : 'blue-600'} to-transparent`}></div>
          </div>
          
          {/* Interactive circuit-like pattern for light mode - reduced for mobile */}
          {!isDark && (
            <div className="absolute inset-0 opacity-5 z-0 overflow-hidden">
              {Array.from({length: 6}).map((_, i) => (
                <div 
                  key={`line-${i}`}
                  className="absolute bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500"
                  style={{
                    height: '1px',
                    width: `${50 + Math.random() * 200}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 90}%`,
                    transform: `rotate(${Math.random() * 180}deg)`,
                    opacity: 0.3 + Math.random() * 0.3,
                    animation: `pulse ${3 + Math.random() * 3}s infinite alternate`
                  }}
                ></div>
              ))}
            </div>
          )}
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Mobile-optimized section header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              {/* Gaming badge */}
              <div 
                className={`inline-flex items-center px-3 sm:px-4 py-1 rounded-lg ${isDark ? 'bg-purple-600/20 border-purple-500/30' : 'bg-purple-500/10 border-purple-500/20'} border mb-3 sm:mb-4 hover:scale-105 transition-all duration-300 cursor-pointer`}
                onClick={() => alert("Game Development Journey - Learn more about our process")}
              >
                <Cpu className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 ${isDark ? 'text-purple-400' : 'text-purple-700'} transition-colors duration-300`} />
                <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-purple-300' : 'text-purple-700'} transition-colors duration-300`}>QUEST PATH</p>
              </div>
              
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300 px-2`}>
                Game Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Journey</span>
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-purple-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
              <p className={`max-w-3xl mx-auto text-sm sm:text-base md:text-lg ${isDark ? 'text-purple-100/80' : 'text-purple-900/80'} transition-colors duration-300 px-4`}>
                Our proven methodology for game development excellence, from concept to launch
              </p>
            </div>

            {/* Mobile-first responsive process steps */}
            <div className="relative">
              {/* Animated path connector - hidden on mobile */}
              <div className="hidden lg:block absolute top-32 left-1/2 w-[calc(100%-140px)] h-1 -translate-x-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 z-0 opacity-30"></div>
              
              {/* Mobile-optimized grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {PROCESS_STEPS.map((step, idx) => (
                  <div 
                    key={idx}
                    className={`group relative rounded-xl ${themeConfig.cardBg} border ${themeConfig.border} hover:border-purple-500/40 p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transform hover:-translate-y-1 cursor-pointer touch-manipulation ${themeConfig.hover}`}
                    onClick={() => alert(`Step ${step.number}: ${step.title} - Click to learn more`)}
                  >
                    {/* Mobile-optimized step number */}
                    <div className={`absolute -top-3 sm:-top-5 left-3 sm:left-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-4 group-hover:border-purple-500 flex items-center justify-center text-base sm:text-lg font-bold z-10 transition-colors`}>
                      <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-400">{step.number}</span>
                    </div>
                    
                    {/* Mobile-optimized step icon */}
                    <div className="mb-4 sm:mb-6 relative">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center ${isDark ? 'bg-purple-900/30 border-purple-800/30' : 'bg-purple-100/70 border-purple-200/50'} border group-hover:bg-purple-${isDark ? '800/40' : '200/60'} group-hover:border-purple-500/40 transition-all`}>
                        <div className={`${isDark ? 'text-purple-400 group-hover:text-purple-300' : 'text-purple-600 group-hover:text-purple-700'} transition-colors`}>
                          {step.icon}
                        </div>
                      </div>
                      <div className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 w-8 sm:w-10 bg-gradient-to-r from-purple-500 to-transparent group-hover:w-12 sm:group-hover:w-20 transition-all duration-500"></div>
                    </div>
                    
                    {/* Mobile-optimized step content */}
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 ${isDark ? 'text-purple-300 group-hover:text-purple-200' : 'text-purple-700 group-hover:text-purple-800'} transition-colors`}>{step.title}</h3>
                    <p className={`${isDark ? 'text-blue-100/70 group-hover:text-white/90' : 'text-gray-600 group-hover:text-gray-900'} transition-colors text-sm sm:text-base leading-relaxed`}>{step.description}</p>
                    
                    {/* Mobile-friendly progress indicator */}
                    <div className={`w-full h-0.5 mt-4 sm:mt-6 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} overflow-hidden transition-colors duration-300`}>
                      <div className={`h-full bg-gradient-to-r from-purple-500 to-blue-500 w-0 group-hover:w-full transition-all duration-700`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>        {/* Testimonials section - Gaming Reviews */}
        <section className={`py-24 px-4 md:px-8 relative overflow-hidden ${isDark ? '' : 'bg-indigo-50/50'} transition-colors duration-300`}>
          {/* Gaming-themed background pattern */}
          <div className="absolute inset-0 opacity-5 z-0">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%236366f1' stroke-width='1'%3E%3Cpath d='M40 0v80M0 40h80'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Glowing orbs */}
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/20'} rounded-full filter blur-[80px] animate-pulse transition-colors duration-300`}></div>
          <div className={`absolute bottom-1/3 right-1/4 w-64 h-64 ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'} rounded-full filter blur-[80px] animate-pulse transition-colors duration-300`} style={{animationDelay: '1.5s'}}></div>
          
          {/* Interactive floating stars */}
          {Array.from({length: 10}).map((_, i) => (
            <div 
              key={`star-${i}`}
              className={`absolute ${isDark ? 'text-amber-400/30' : 'text-amber-500/40'} transition-colors duration-300 z-0`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${0.3 + Math.random() * 0.7})`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite alternate, pulse ${2 + Math.random() * 2}s infinite alternate`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <Star />
            </div>
          ))}          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-14">
              {/* Gaming badge */}
              <div 
                className={`inline-flex items-center px-4 py-1 rounded-lg ${isDark ? 'bg-indigo-600/20 border-indigo-500/30' : 'bg-indigo-500/10 border-indigo-500/20'} border mb-4 cursor-pointer transform hover:scale-110 transition-all duration-300`}
                onClick={() => alert('View all client reviews')}
              >
                <Star className={`w-4 h-4 mr-2 text-amber-${isDark ? '400' : '500'} transition-colors duration-300`} />
                <p className={`text-sm font-medium ${isDark ? 'text-indigo-300' : 'text-indigo-700'} transition-colors duration-300`}>PLAYER REVIEWS</p>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="relative inline-block">
                  <span className={`${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Game Developer</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500"></span>
                </span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Reputation</span>
              </h2>
              
              <p className={`max-w-3xl mx-auto text-lg ${isDark ? 'text-indigo-100/80' : 'text-indigo-900/80'} mt-4 transition-colors duration-300`}>
                What studios and developers say about our game development expertise
              </p>
            </div>
              {/* Gaming-styled testimonial grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-lg ${isDark ? 'bg-gray-900/80 border-indigo-900/40' : 'bg-white/90 border-indigo-200/60'} border p-8 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] backdrop-blur-sm transform hover:-translate-y-1 cursor-pointer`}
                  onClick={() => alert(`${testimonial.name} from ${testimonial.company} - View full review`)}
                >
                  {/* Interactive ripple effect on click */}
                  <span className="absolute inset-0 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center">
                    <span className={`absolute inset-0 ${isDark ? 'bg-indigo-600/5' : 'bg-indigo-500/5'} rounded-lg transition-colors duration-300`}></span>
                  </span>
                  
                  {/* Tech corners */}
                  <div className={`absolute top-0 left-0 w-8 h-1 bg-indigo-${isDark ? '500' : '400'} transition-colors duration-300`}></div>
                  <div className={`absolute top-0 left-0 w-1 h-8 bg-indigo-${isDark ? '500' : '400'} transition-colors duration-300`}></div>
                  <div className={`absolute bottom-0 right-0 w-8 h-1 bg-indigo-${isDark ? '500/50' : '300'} transition-colors duration-300`}></div>
                  <div className={`absolute bottom-0 right-0 w-1 h-8 bg-indigo-${isDark ? '500/50' : '300'} transition-colors duration-300`}></div>
                  
                  {/* Quote mark */}
                  <div className={`absolute top-6 right-6 ${isDark ? 'text-indigo-800' : 'text-indigo-200'} opacity-30 font-serif text-6xl leading-none transition-colors duration-300`}>"</div>
                  
                  {/* Testimonial content with hover effect */}
                  <p className={`mb-6 relative ${isDark ? 'text-blue-100/80' : 'text-gray-700'} group-hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                    {testimonial.text}
                  </p>
                  
                  {/* Divider */}
                  <div className={`h-px w-full bg-gradient-to-r from-indigo-${isDark ? '500/50' : '400/70'} via-transparent to-transparent mb-6 transition-colors duration-300 group-hover:w-[105%] transition-all duration-500`}></div>
                  
                  {/* Client info */}
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300 group-hover:text-indigo-${isDark ? '300' : '700'}`}>
                        {testimonial.name}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-indigo-400' : 'text-indigo-600'} transition-colors duration-300`}>
                        {testimonial.company}
                      </p>
                    </div>
                    
                    {/* Rating with gaming style */}
                    <div className={`flex items-center gap-1 p-1 rounded ${isDark ? 'bg-indigo-900/30 border-indigo-800/50' : 'bg-indigo-100/70 border-indigo-200/50'} border transition-colors duration-300 group-hover:scale-110 transition-transform ease-in-out`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className={`text-amber-${isDark ? '400' : '500'} transition-colors duration-300`} fill={isDark ? "#fbbf24" : "#f59e0b"} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-indigo-600/5 to-blue-600/5' : 'from-indigo-500/5 to-blue-500/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>        {/* Gaming-themed CTA Section */}
        <section className={`py-32 px-4 md:px-8 relative overflow-hidden ${isDark ? '' : 'bg-gradient-to-b from-blue-50 to-indigo-100/70'} transition-all duration-500`}>
          {/* Animated background */}
          <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-blue-900/10 to-purple-900/20' : 'from-blue-400/5 to-purple-400/10'} z-0 transition-colors duration-300`}></div>
          
          {/* Cyberpunk grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235b95ff' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          {/* Reduced interactive energy particles for mobile */}
          {Array.from({length: 8}).map((_, i) => {
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            return (
              <div 
                key={i} 
                className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} opacity-70 animate-pulse cursor-pointer transition-transform duration-300 hover:scale-[3] hover:opacity-100 hidden sm:block`}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  animationDelay: `${i * 0.5}s`,
                  filter: 'blur(1px)',
                  zIndex: 1
                }}
                onClick={(e) => {
                  e.currentTarget.style.transform = 'scale(5)';
                  setTimeout(() => {
                    e.currentTarget.style.transform = '';
                  }, 500);
                }}
              ></div>
            );
          })}

          <div className="max-w-4xl mx-auto relative z-10">
            <div className={`${isDark ? 'bg-gray-900/80' : 'bg-white/90'} backdrop-blur-md rounded-xl border ${isDark ? 'border-blue-500/20' : 'border-blue-400/30'} p-6 sm:p-8 md:p-10 shadow-[0_0_100px_rgba(59,130,246,0.3)] transition-colors duration-300 transform hover:scale-[1.01] transition-transform duration-700`}>
              {/* Mobile-scaled techno corners */}
              <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 group-hover:w-16 sm:group-hover:w-20 md:group-hover:w-24 group-hover:h-16 sm:group-hover:h-20 md:group-hover:h-24 transition-all duration-300">
                <div className={`absolute top-0 left-0 w-full h-0.5 sm:h-1 ${isDark ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
                <div className={`absolute top-0 left-0 w-0.5 sm:w-1 h-full ${isDark ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 group-hover:w-16 sm:group-hover:w-20 md:group-hover:w-24 group-hover:h-16 sm:group-hover:h-20 md:group-hover:h-24 transition-all duration-300">
                <div className={`absolute bottom-0 right-0 w-full h-0.5 sm:h-1 ${isDark ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
                <div className={`absolute bottom-0 right-0 w-0.5 sm:w-1 h-full ${isDark ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
              </div>
              
              {/* Mobile-friendly gaming achievement badge */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div 
                  className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 ${isDark ? 'bg-blue-600/20 border-blue-500/50' : 'bg-blue-500/10 border-blue-400/50'} border rounded-lg flex items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer`}
                  onClick={() => alert('Achievement unlocked: Ready to build your game!')}
                >
                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} animate-pulse transition-colors duration-300`}></div>
                  <span className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-blue-600'} uppercase tracking-wider transition-colors duration-300`}>Ready Player One</span>
                </div>
              </div>
              
              {/* Mobile-responsive main heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center tracking-tight">
                <span className="relative inline-block">
                  <span className={`${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>START YOUR</span> 
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></span>
                </span>
                <span className="block mt-2 sm:mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300">GAME DEVELOPMENT QUEST</span>
              </h2>
              
              {/* Mobile-friendly description */}
              <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 text-center max-w-3xl mx-auto ${isDark ? 'text-blue-100/90' : 'text-gray-700'} transition-colors duration-300 px-2`}>
                Join forces with our elite game development team to transform your vision into an epic gaming experience that players will never forget
              </p>
              
              {/* Mobile-first responsive button layout */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center">
                <button 
                  className={`group relative px-6 sm:px-8 py-3 sm:py-4 md:py-5 bg-gradient-to-r ${isDark ? 'from-blue-600 to-indigo-600' : 'from-blue-500 to-indigo-500'} rounded-md font-bold text-base sm:text-lg text-white flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all transform hover:scale-105 active:scale-95 min-h-[48px] touch-manipulation`}
                  onClick={() => alert('Starting your game development journey!')}
                >
                  <Gamepad className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:animate-bounce" />
                  <span className="relative z-10">START YOUR JOURNEY</span>
                  
                  {/* Tech button effects */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 via-transparent to-indigo-600 opacity-0 group-hover:opacity-100 blur-md transition-all group-hover:animate-pulse"></span>
                </button>
                
                <button 
                  className={`group relative px-6 sm:px-8 py-3 sm:py-4 md:py-5 backdrop-blur-sm bg-transparent border-2 ${isDark ? 'border-blue-500/30 hover:border-blue-400' : 'border-blue-400/40 hover:border-blue-500'} rounded-md font-bold text-base sm:text-lg flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transform hover:-translate-y-1 active:translate-y-0 min-h-[48px] touch-manipulation`}
                  onClick={() => window.open('https://example.com/gameplay-demo', '_blank')}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">VIEW GAMEPLAY</span>
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/5 group-hover:to-purple-600/10 blur-md transition-all opacity-0 group-hover:opacity-100"></span>
                </button>
              </div>
              
              {/* Mobile-optimized interactive progress bar */}
              <div className="mt-8 sm:mt-10 md:mt-12 max-w-xs sm:max-w-md mx-auto">
                <div className="flex justify-between text-xs mb-2">
                  <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>PROJECT PROGRESS</span>
                  <span className={`${isDark ? 'text-blue-300' : 'text-blue-500'} transition-colors duration-300`}>READY TO LAUNCH</span>
                </div>
                <div 
                  className={`relative h-1.5 w-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden transition-colors duration-300 cursor-pointer`}
                  id="progressBar"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percentage = (x / rect.width) * 100;
                    document.getElementById('progressFill').style.width = `${percentage}%`;
                    document.getElementById('progressValue').textContent = `${Math.round(percentage)}%`;
                  }}
                >
                  <div 
                    id="progressFill"
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 w-full rounded-full animate-pulse"
                  ></div>
                  <span 
                    id="progressValue" 
                    className={`absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}
                  >
                    100%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile-First Testimonials section - Gaming Reviews */}
        <section className={`py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden ${isDark ? '' : 'bg-muted/20'} ${themeConfig.mainBg}`}>
          {/* Gaming-themed background pattern */}
          <div className="absolute inset-0 opacity-5 z-0">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%236366f1' stroke-width='1'%3E%3Cpath d='M40 0v80M0 40h80'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Mobile-optimized glowing orbs */}
          <div className={`absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/20'} rounded-full filter blur-[80px] animate-pulse transition-colors duration-300`}></div>
          <div className={`absolute bottom-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'} rounded-full filter blur-[80px] animate-pulse transition-colors duration-300`} style={{animationDelay: '1.5s'}}></div>
          
          {/* Reduced floating stars for mobile */}
          {Array.from({length: 6}).map((_, i) => (
            <div 
              key={`star-${i}`}
              className={`absolute ${isDark ? 'text-amber-400/30' : 'text-amber-500/40'} transition-colors duration-300 z-0 hidden sm:block`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${0.3 + Math.random() * 0.7})`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite alternate, pulse ${2 + Math.random() * 2}s infinite alternate`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <Star />
            </div>
          ))}

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Mobile-optimized section header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-14">
              {/* Gaming badge */}
              <div 
                className={`inline-flex items-center px-3 sm:px-4 py-1 rounded-lg ${isDark ? 'bg-indigo-600/20 border-indigo-500/30' : 'bg-indigo-500/10 border-indigo-500/20'} border mb-3 sm:mb-4 cursor-pointer transform hover:scale-110 transition-all duration-300`}
                onClick={() => alert('View all client reviews')}
              >
                <Star className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 text-amber-${isDark ? '400' : '500'} transition-colors duration-300`} />
                <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-indigo-300' : 'text-indigo-700'} transition-colors duration-300`}>PLAYER REVIEWS</p>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                <span className="relative inline-block">
                  <span className={`${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Game Developer</span>
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500"></span>
                </span>
                <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Reputation</span>
              </h2>
              
              <p className={`max-w-3xl mx-auto text-sm sm:text-base md:text-lg ${isDark ? 'text-indigo-100/80' : 'text-indigo-900/80'} mt-3 sm:mt-4 transition-colors duration-300 px-4`}>
                What studios and developers say about our game development expertise
              </p>
            </div>

            {/* Mobile-first responsive testimonial grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-lg ${themeConfig.cardBg} border ${themeConfig.border} hover:border-indigo-500/50 p-4 sm:p-6 md:p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transform hover:-translate-y-1 cursor-pointer touch-manipulation ${themeConfig.hover}`}
                  onClick={() => alert(`${testimonial.name} from ${testimonial.company} - View full review`)}
                >
                  {/* Interactive ripple effect on click */}
                  <span className="absolute inset-0 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center">
                    <span className={`absolute inset-0 ${isDark ? 'bg-indigo-600/5' : 'bg-indigo-500/5'} rounded-lg transition-colors duration-300`}></span>
                  </span>
                  
                  {/* Mobile-scaled tech corners */}
                  <div className={`absolute top-0 left-0 w-6 sm:w-8 h-0.5 sm:h-1 bg-indigo-${isDark ? '500' : '400'} transition-colors duration-300`}></div>
                  <div className={`absolute top-0 left-0 w-0.5 sm:w-1 h-6 sm:h-8 bg-indigo-${isDark ? '500' : '400'} transition-colors duration-300`}></div>
                  <div className={`absolute bottom-0 right-0 w-6 sm:w-8 h-0.5 sm:h-1 bg-indigo-${isDark ? '500/50' : '300'} transition-colors duration-300`}></div>
                  <div className={`absolute bottom-0 right-0 w-0.5 sm:w-1 h-6 sm:h-8 bg-indigo-${isDark ? '500/50' : '300'} transition-colors duration-300`}></div>
                  
                  {/* Mobile-optimized quote mark */}
                  <div className={`absolute top-3 sm:top-6 right-3 sm:right-6 ${isDark ? 'text-indigo-800' : 'text-indigo-200'} opacity-30 font-serif text-3xl sm:text-4xl md:text-6xl leading-none transition-colors duration-300`}>"</div>
                  
                  {/* Mobile-friendly testimonial content */}
                  <p className={`mb-4 sm:mb-6 relative ${isDark ? 'text-blue-100/80' : 'text-gray-700'} group-hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300 text-sm sm:text-base leading-relaxed pr-6`}>
                    {testimonial.text}
                  </p>
                  
                  {/* Mobile-optimized divider */}
                  <div className={`h-px w-full bg-gradient-to-r from-indigo-${isDark ? '500/50' : '400/70'} via-transparent to-transparent mb-4 sm:mb-6 transition-colors duration-300 group-hover:w-[105%] transition-all duration-500`}></div>
                  
                  {/* Mobile-responsive client info */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 sm:gap-0">
                    <div>
                      <h4 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300 group-hover:text-indigo-${isDark ? '300' : '700'}`}>
                        {testimonial.name}
                      </h4>
                      <p className={`text-xs sm:text-sm ${isDark ? 'text-indigo-400' : 'text-indigo-600'} transition-colors duration-300`}>
                        {testimonial.company}
                      </p>
                    </div>
                    
                    {/* Mobile-friendly rating */}
                    <div className={`flex items-center gap-1 p-1 rounded ${isDark ? 'bg-indigo-900/30 border-indigo-800/50' : 'bg-indigo-100/70 border-indigo-200/50'} border transition-colors duration-300 group-hover:scale-110 transition-transform ease-in-out self-start sm:self-auto`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={12} className={`sm:w-3.5 sm:h-3.5 text-amber-${isDark ? '400' : '500'} transition-colors duration-300`} fill={isDark ? "#fbbf24" : "#f59e0b"} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-indigo-600/5 to-blue-600/5' : 'from-indigo-500/5 to-blue-500/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile-First Gaming-themed CTA Section */}
        <section className={`py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden ${isDark ? '' : 'bg-gradient-to-b from-muted/30 to-muted/50'} ${themeConfig.mainBg}`}>
          {/* Animated background */}
          <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-blue-900/10 to-purple-900/20' : 'from-blue-400/5 to-purple-400/10'} z-0 transition-colors duration-300`}></div>
          
          {/* Mobile-optimized cyberpunk grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235b95ff' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          {/* Reduced interactive energy particles for mobile */}
          {Array.from({length: 8}).map((_, i) => {
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            return (
              <div 
                key={i} 
                className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} opacity-70 animate-pulse cursor-pointer transition-transform duration-300 hover:scale-[3] hover:opacity-100 hidden sm:block`}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  animationDelay: `${i * 0.5}s`,
                  filter: 'blur(1px)',
                  zIndex: 1
                }}
                onClick={(e) => {
                  e.currentTarget.style.transform = 'scale(5)';
                  setTimeout(() => {
                    e.currentTarget.style.transform = '';
                  }, 500);
                }}
              ></div>
            );
          })}

          <div className="max-w-4xl mx-auto relative z-10">
            <div className={`${isDark ? 'bg-gray-900/80' : 'bg-white/90'} backdrop-blur-md rounded-xl border ${isDark ? 'border-blue-500/20' : 'border-blue-400/30'} p-6 sm:p-8 md:p-10 shadow-[0_0_100px_rgba(59,130,246,0.3)] transition-colors duration-300 transform hover:scale-[1.01] transition-transform duration-700`}>
              {/* Mobile-scaled techno corners */}
              <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 group-hover:w-16 sm:group-hover:w-20 md:group-hover:w-24 group-hover:h-16 sm:group-hover:h-20 md:group-hover:h-24 transition-all duration-300">
                <div className={`absolute top-0 left-0 w-full h-0.5 sm:h-1 ${isDark ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
                <div className={`absolute top-0 left-0 w-0.5 sm:w-1 h-full ${isDark ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 group-hover:w-16 sm:group-hover:w-20 md:group-hover:w-24 group-hover:h-16 sm:group-hover:h-20 md:group-hover:h-24 transition-all duration-300">
                <div className={`absolute bottom-0 right-0 w-full h-0.5 sm:h-1 ${isDark ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
                <div className={`absolute bottom-0 right-0 w-0.5 sm:w-1 h-full ${isDark ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
              </div>
              
              {/* Mobile-friendly gaming achievement badge */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div 
                  className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 ${isDark ? 'bg-blue-600/20 border-blue-500/50' : 'bg-blue-500/10 border-blue-400/50'} border rounded-lg flex items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer`}
                  onClick={() => alert('Achievement unlocked: Ready to build your game!')}
                >
                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} animate-pulse transition-colors duration-300`}></div>
                  <span className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-blue-600'} uppercase tracking-wider transition-colors duration-300`}>Ready Player One</span>
                </div>
              </div>
              
              {/* Mobile-responsive main heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center tracking-tight">
                <span className="relative inline-block">
                  <span className={`${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>START YOUR</span> 
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></span>
                </span>
                <span className="block mt-2 sm:mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300">GAME DEVELOPMENT QUEST</span>
              </h2>
              
              {/* Mobile-friendly description */}
              <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 text-center max-w-3xl mx-auto ${isDark ? 'text-blue-100/90' : 'text-gray-700'} transition-colors duration-300 px-2`}>
                Join forces with our elite game development team to transform your vision into an epic gaming experience that players will never forget
              </p>
              
              {/* Mobile-first responsive button layout */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center">
                <button 
                  className={`group relative px-6 sm:px-8 py-3 sm:py-4 md:py-5 bg-gradient-to-r ${isDark ? 'from-blue-600 to-indigo-600' : 'from-blue-500 to-indigo-500'} rounded-md font-bold text-base sm:text-lg text-white flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all transform hover:scale-105 active:scale-95 min-h-[48px] touch-manipulation`}
                  onClick={() => alert('Starting your game development journey!')}
                >
                  <Gamepad className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:animate-bounce" />
                  <span className="relative z-10">START YOUR JOURNEY</span>
                  
                  {/* Tech button effects */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 via-transparent to-indigo-600 opacity-0 group-hover:opacity-100 blur-md transition-all group-hover:animate-pulse"></span>
                </button>
                
                <button 
                  className={`group relative px-6 sm:px-8 py-3 sm:py-4 md:py-5 backdrop-blur-sm bg-transparent border-2 ${isDark ? 'border-blue-500/30 hover:border-blue-400' : 'border-blue-400/40 hover:border-blue-500'} rounded-md font-bold text-base sm:text-lg flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transform hover:-translate-y-1 active:translate-y-0 min-h-[48px] touch-manipulation`}
                  onClick={() => window.open('https://example.com/gameplay-demo', '_blank')}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">VIEW GAMEPLAY</span>
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/5 group-hover:to-purple-600/10 blur-md transition-all opacity-0 group-hover:opacity-100"></span>
                </button>
              </div>
              
              {/* Mobile-optimized interactive progress bar */}
              <div className="mt-8 sm:mt-10 md:mt-12 max-w-xs sm:max-w-md mx-auto">
                <div className="flex justify-between text-xs mb-2">
                  <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>PROJECT PROGRESS</span>
                  <span className={`${isDark ? 'text-blue-300' : 'text-blue-500'} transition-colors duration-300`}>READY TO LAUNCH</span>
                </div>
                <div 
                  className={`relative h-1.5 w-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden transition-colors duration-300 cursor-pointer`}
                  id="progressBar"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percentage = (x / rect.width) * 100;
                    document.getElementById('progressFill').style.width = `${percentage}%`;
                    document.getElementById('progressValue').textContent = `${Math.round(percentage)}%`;
                  }}
                >
                  <div 
                    id="progressFill"
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 w-full rounded-full animate-pulse"
                  ></div>
                  <span 
                    id="progressValue" 
                    className={`absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}
                  >
                    100%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default GamingDevServices;
