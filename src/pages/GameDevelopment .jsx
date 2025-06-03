import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { 
  Gamepad, Code, Layers, Cpu, Trophy, CheckCircle, Star,
  Globe, Briefcase, ArrowRight, Download, Users, Clock, Server,
  Monitor, Cloud, Zap, Shield, Award, HardDrive, Play, Pause, Volume2, VolumeX
} from 'lucide-react';

// Add animation keyframes for interactive elements
const animationStyles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
  }
  
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }

  @keyframes typeWriter {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
  
  .cursor:after {
    content: '|';
    animation: blink 1s step-end infinite;
  }
`;

// Stats data
const STATS = [
  { value: '50+', label: 'Games Shipped', icon: <Gamepad className="w-5 h-5" /> },
  { value: '98%', label: 'Client Satisfaction', icon: <Star className="w-5 h-5" /> },
  { value: '12+', label: 'Years Experience', icon: <Clock className="w-5 h-5" /> },
  { value: '15M+', label: 'Players Reached', icon: <Users className="w-5 h-5" /> }
];

// Services data with improved descriptions
const SERVICES = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Game Programming",
    description: "Clean, optimized code for your game with a focus on performance and maintainability",
    features: ["Custom gameplay mechanics", "Performance optimization", "Multiplayer networking", "AI systems"],
    color: "blue"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Game Design",
    description: "Engaging gameplay mechanics, level design, and systems that keep players coming back",
    features: ["Level architecture", "Balancing systems", "Player progression", "Economy design"],
    color: "purple"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Unity/Unreal Development",
    description: "Expert development in industry-standard game engines for all platforms",
    features: ["Cross-platform builds", "Custom shaders", "VFX systems", "Performance profiling"],
    color: "green"
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Game Backend Systems",
    description: "Robust server architecture and databases to support your multiplayer game experience",
    features: ["Scalable infrastructure", "Player accounts", "Leaderboards", "Analytics dashboards"],
    color: "amber"
  }
];

// Additional services
const ADDITIONAL_SERVICES = [
  {
    icon: <Monitor className="w-6 h-6" />,
    title: "UI/UX for Games",
    description: "Intuitive and engaging user interfaces that enhance the overall gaming experience",
    features: ["Menu systems", "HUD design", "User testing", "Accessibility"],
    color: "cyan"
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud Gaming Solutions",
    description: "State-of-the-art cloud infrastructure for seamless game streaming and performance",
    features: ["Low latency streaming", "Cross-device sync", "Auto-scaling", "Global deployment"],
    color: "indigo"
  }
];

// Portfolio projects with enhanced metadata
const PROJECTS = [
  {
    title: "Fantasy RPG",
    category: "Mobile Game",
    description: "Open-world fantasy RPG with advanced character progression and dynamic world events",
    image: "https://images.unsplash.com/photo-1642068052494-8325822f6d92?auto=format&fit=crop&w=500&q=80",
    downloads: "2.5M+",
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
    platforms: ["PC", "Console", "Mobile"],
    tech: ["Unity", "C#", "PlayFab"],
    achievements: ["10/10 IGN Rating", "Game Awards Nominee"],
    color: "green"
  }
];

// Gaming studio partners - using lightweight SVG or text alternatives
const PARTNERS = [
  { name: "Unity Technologies" },
  { name: "Epic Games" },
  { name: "Electronic Arts" },
  { name: "Ubisoft" },
  { name: "Activision Blizzard" }
];

// Testimonials data with simplified structure
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
    icon: <Briefcase className="w-6 h-6" />,
    color: "blue"
  },
  {
    number: "02",
    title: "Development",
    description: "I build your game with clean code, optimized performance, and regular milestones to track progress.",
    icon: <Code className="w-6 h-6" />,
    color: "purple"
  },
  {
    number: "03",
    title: "Testing & QA",
    description: "Rigorous testing ensures your game is bug-free and balanced, with smooth performance across all platforms.",
    icon: <Shield className="w-6 h-6" />,
    color: "amber"
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "Full launch support and post-release updates to ensure your game thrives in the marketplace.",
    icon: <Globe className="w-6 h-6" />,
    color: "green"
  }
];

// Features section data
const KEY_FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance Optimized",
    description: "Games built for optimal performance across devices with efficient resource usage",
    color: "blue"
  },
  {
    icon: <HardDrive className="w-6 h-6" />,
    title: "Cross-Platform",
    description: "Deploy your games on multiple platforms from a single codebase",
    color: "purple"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Award-Winning",
    description: "Quality recognized with multiple industry awards and accolades",
    color: "amber"
  }
];

const GamingDevServices = ({ theme, toggleTheme }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);
  
  // For parallax effects
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // References for scroll animations and video
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const videoRef = useRef(null);
  const splineContainerRef = useRef(null);
  
  // Derive darkMode from theme prop
  const darkMode = theme === 'dark';

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
  // Dynamic classes based on color mode
  const colorMode = {
    bg: darkMode ? 'bg-gray-950' : 'bg-gray-50',
    text: darkMode ? 'text-white' : 'text-gray-900',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-600',
    primary: darkMode ? 'from-blue-500 to-indigo-600' : 'from-blue-600 to-indigo-700',
    cardBg: darkMode ? 'bg-gray-900/60' : 'bg-white/90',
    border: darkMode ? 'border-gray-800/80' : 'border-gray-200',
    hover: darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
    accent: darkMode ? 'text-blue-400' : 'text-blue-600',
    videoBg: darkMode ? 'opacity-70' : 'opacity-40',
    mainBg: darkMode ? 'from-gray-950 via-blue-950/10 to-purple-950/20' : 'from-gray-100 via-blue-100/40 to-purple-100/30',
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
    <div className={`min-h-screen ${colorMode.bg} ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300 relative overflow-hidden`}>

      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className={`fixed top-14 right-6 z-50 p-3 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-white text-blue-600'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 hover:scale-110 hover:rotate-12`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun">
            <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        )}
      </button>
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* New Hero Section with 3D Car Model */}
        <section className="min-h-screen relative overflow-hidden">
          {/* 3D Car Model with Spline - keeping as background */}
          <div 
            ref={splineContainerRef}
            className="absolute inset-0 z-0 w-full h-full"
          >
            <Spline 
              scene="https://prod.spline.design/voZUbzjk4ne1Svzq/scene.splinecode"
              onLoad={handleSplineLoad}
              className="w-full h-full"
            />
            
            {/* Loading indicator */}
            {!splineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-b-transparent border-blue-400 animate-spin"></div>
                  <p className="mt-4 text-white">Loading 3D Experience...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Hero content with improved design */}
          <div className="relative z-20 flex flex-col justify-center items-start h-screen px-6 md:px-16 lg:px-24 pointer-events-none">
            <div className="max-w-2xl">
              {/* Animated tag/badge */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center mb-8 px-4 py-1.5 rounded-full backdrop-blur-md bg-blue-600/20 border border-blue-500/30"
              >
                <span className="w-2 h-2 rounded-full animate-pulse bg-blue-400 mr-2"></span>
                <p className="text-sm font-medium text-white">Interactive Game Development</p>
              </motion.div>
              
              {/* Main headline with improved gradient */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]"
              >
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500">
                  Racing Into The
                </span>
                <span className="block mt-2 text-white">
                  Gaming Future
                </span>
              </motion.h1>
              
              {/* Description text with improved backdrop */}
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-10 text-xl leading-relaxed max-w-lg text-gray-100 backdrop-blur-sm bg-black/20 rounded-xl py-3 px-5"
              >
                Interact with our 3D model and experience the next level of gaming development. We create immersive experiences that push boundaries.
              </motion.p>
              
              {/* Action buttons with consistent styling */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-5 pointer-events-auto"
              >
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-medium text-lg shadow-xl shadow-blue-900/30 text-white flex items-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Start Your Game Project</span>
                  <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(servicesRef)}
                  className="flex items-center gap-3 px-7 py-4 border rounded-full font-medium transition-colors border-blue-500/30 hover:bg-blue-500/20 backdrop-blur-sm text-white"
                >
                  <Gamepad className="w-5 h-5" />
                  Explore Our Services
                </motion.button>
              </motion.div>
              
              {/* Interactive tip with improved backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-10 inline-flex items-center text-sm backdrop-blur-md bg-blue-900/20 rounded-full px-5 py-2 border border-blue-800/30"
              >
                <span className="text-blue-300 mr-2">💡</span>
                <span className="text-gray-200">Tip: Click and drag to interact with the 3D model</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gaming-themed Key Features Section */}
        <section className={`py-24 px-4 md:px-8 relative ${darkMode ? '' : 'bg-gray-100/70'} transition-colors duration-300`} ref={servicesRef}>
          {/* Interactive background elements */}
          {darkMode && (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({length: 5}).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-1 h-1 rounded-full bg-blue-400/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    boxShadow: '0 0 40px 20px rgba(59,130,246,0.1)',
                    animation: `pulse ${3 + Math.random() * 3}s infinite alternate`,
                  }}
                ></div>
              ))}
            </div>
          )}
          
          <div className="max-w-7xl mx-auto">
            {/* Gaming-style section header */}
            <div className="text-center mb-16">
              <div 
                className={`inline-flex items-center px-4 py-1 rounded-lg ${darkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-500/10 border-blue-500/20'} border mb-4 transition-colors duration-300 transform hover:scale-110 cursor-pointer`}
                onClick={() => window.open('https://example.com/core-features', '_blank')}
              >
                <Trophy className="w-4 h-4 mr-2 text-amber-400" />
                <p className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'} transition-colors duration-300`}>CORE FEATURES</p>
              </div>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                Game Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Powerups</span>
              </h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
              <p className={`max-w-2xl mx-auto ${darkMode ? 'text-blue-100/80' : 'text-gray-700'} transition-colors duration-300`}>
                Our specialized game development services bring your ideas to life with cutting-edge technology and industry expertise.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {KEY_FEATURES.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-lg ${darkMode ? 'bg-gray-900/80 border-blue-900/50' : 'bg-white/90 border-blue-200/70'} border p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-sm transform hover:-translate-y-2 cursor-pointer`}
                >
                  {/* Animated background glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r from-${feature.color}-500/0 to-${feature.color}-500/0 opacity-0 group-hover:opacity-${darkMode ? '30' : '15'} blur-xl group-hover:animate-pulse transition-all duration-700 -z-10`}></div>
                  
                  {/* Hexagon icon container with glow */}
                  <div className="relative mb-8">
                    <div className={`w-16 h-16 mb-2 flex items-center justify-center text-${feature.color}-${darkMode ? '400' : '500'} ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all group-hover:rotate-3`}>
                      {feature.icon}
                    </div>
                    <div className={`absolute -bottom-3 left-0 h-0.5 w-12 bg-gradient-to-r from-${feature.color}-500 to-transparent group-hover:w-24 transition-all duration-500`}></div>
                  </div>
                  
                  {/* Gaming-style title */}
                  <h3 className={`text-2xl font-bold mb-3 text-${feature.color}-${darkMode ? '400' : '600'} group-hover:text-${feature.color}-${darkMode ? '300' : '500'} transition-colors uppercase tracking-wide`}>
                    {feature.title}
                  </h3>
                  
                  {/* Description with tech styling */}
                  <p className={`${darkMode ? 'text-blue-100/70 group-hover:text-white/90' : 'text-gray-700 group-hover:text-gray-900'} transition-colors`}>
                    {feature.description}
                  </p>
                  
                  {/* Interactive "Learn more" revealed on hover */}
                  <div 
                    className={`mt-6 flex items-center gap-2 text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'} opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300`} 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://example.com/feature/${feature.title.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
                    }}
                  >
                    <span>LEARN MORE</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Game Studio Partnerships - Simplified */}
        <section className="py-16 px-4 md:px-8 relative">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted By <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Industry Leaders</span>
              </h2>
              <p className={`max-w-3xl mx-auto ${colorMode.textMuted}`}>
                Partnering with top gaming companies to deliver exceptional experiences
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8">
              {PARTNERS.map((partner, index) => (
                <div key={index} 
                  className={`px-5 py-2 ${colorMode.border} border rounded ${colorMode.cardBg}`}
                >
                  <span className="font-semibold">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>        {/* Gaming-themed Services Section */}
        <section className="py-24 px-4 md:px-8 relative">
          {/* Background element */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-blue-900/5 z-0"></div>
          
          {/* Gaming HUD-style grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 V15 H30 V0 H60 V15 H30 V30 H60 V45 H30 V60 H0 V45 H30 V30z' fill='%235b95ff' fill-opacity='0.2'/%3E%3C/svg%3E\")",
          }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Gaming-themed section header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-1 rounded-lg bg-purple-600/20 border border-purple-500/30 mb-4">
                <Gamepad className="w-4 h-4 mr-2 text-purple-400" />
                <p className="text-sm font-medium text-purple-300">GAME DEV ARSENAL</p>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                <span className="relative inline-block">
                  <span className="inline-block text-white">Game Development</span> 
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></span>
                </span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300">Services & Solutions</span>
              </h2>
                <p className={`max-w-3xl mx-auto text-lg ${darkMode ? 'text-blue-100/80' : 'text-gray-700'}`}>
                Level up your gaming project with our comprehensive suite of development services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">              {[...SERVICES, ...ADDITIONAL_SERVICES].map((service, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-lg ${darkMode ? `bg-gray-900/80 border-${service.color}-900/40` : `bg-white/90 border-${service.color}-200/40`} border p-8 hover:border-${service.color}-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-sm transform hover:-translate-y-1`}
                >
                  {/* Futuristic corner accents */}
                  <div className={`absolute top-0 left-0 w-10 h-1 bg-${service.color}-500`}></div>
                  <div className={`absolute top-0 left-0 w-1 h-10 bg-${service.color}-500`}></div>
                  <div className={`absolute bottom-0 right-0 w-10 h-1 bg-${service.color}-500/50`}></div>
                  <div className={`absolute bottom-0 right-0 w-1 h-10 bg-${service.color}-500/50`}></div>
                  
                  {/* Icon with cyber-style container */}
                  <div className={`relative w-16 h-16 mb-6 border border-${service.color}-500/50 flex items-center justify-center overflow-hidden`} style={{ clipPath: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)' }}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}-900/50 to-black group-hover:from-${service.color}-800/50 transition-colors duration-500`}></div>
                    <div className={`relative z-10 text-${service.color}-400 group-hover:text-${service.color}-300 transition-colors duration-300`}>
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Service title with tech styling */}
                  <div className="relative mb-2">
                    <h3 className={`text-2xl font-bold text-${service.color}-400 group-hover:text-${service.color}-300 transition-colors uppercase tracking-wider`}>
                      {service.title}
                    </h3>
                    <div className={`absolute -bottom-2 left-0 h-0.5 w-16 bg-gradient-to-r from-${service.color}-500 to-transparent group-hover:w-32 transition-all duration-500`}></div>
                  </div>
                    <p className={`mb-6 ${darkMode ? 'text-blue-100/70 group-hover:text-white/90' : 'text-gray-600 group-hover:text-gray-900'} transition-colors mt-4`}>
                    {service.description}
                  </p>
                    {/* Features with gaming-style checkmarks */}
                  <div className="space-y-3 mt-6 border-t border-gray-700/30 pt-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`p-1 rounded ${darkMode ? `bg-${service.color}-900/40` : `bg-${service.color}-100/40`} group-hover:bg-${service.color}-${darkMode ? '800' : '200'}/40 transition-colors mt-0.5 flex-shrink-0`}>
                          <CheckCircle size={12} className={`text-${service.color}-${darkMode ? '400' : '600'}`} />
                        </div>
                        <span className={`text-sm ${darkMode ? 'text-blue-100/70 group-hover:text-white/90' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                    {/* Call-to-action button that appears on hover */}
                  <div className="mt-8 pt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className={`w-full flex items-center justify-center gap-2 py-2 px-4 ${darkMode ? `bg-${service.color}-900/80 hover:bg-${service.color}-800/80` : `bg-${service.color}-600/80 hover:bg-${service.color}-700/80`} border border-${service.color}-500/40 rounded text-${service.color}-${darkMode ? '300' : '50'} text-sm font-medium transition-all`}>
                      <span>SELECT SERVICE</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>        {/* Portfolio Section - Gaming Showcase */}
        <section ref={projectsRef} className={`py-24 px-4 md:px-8 relative ${darkMode ? '' : 'bg-blue-50/50'} transition-colors duration-300`}>
          {/* Gaming background overlay */}
          <div className="absolute inset-0 opacity-10 z-0">
            {/* Hex grid pattern */}
            <div className="w-full h-full transition-opacity duration-300" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 V15 H30 V0 H60 V15 H30 V30 H60 V45 H30 V60 H0 V45 H30 V30z' fill='%235b95ff' fill-opacity='${darkMode ? '0.2' : '0.3'}'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          {/* Floating game controller icons */}
          {Array.from({length: 6}).map((_, i) => (
            <div 
              key={`controller-${i}`}
              className={`absolute opacity-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300 z-0`}
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
            <div className="text-center mb-16">
              {/* Gaming title badge */}
              <div className="inline-flex items-center px-4 py-1 rounded-lg bg-blue-600/20 border border-blue-500/30 mb-4">
                <Trophy className="w-4 h-4 mr-2 text-amber-400" />
                <p className="text-sm font-medium text-blue-300">GAME SHOWCASE</p>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Featured Projects
                </span>
              </h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
              <p className="max-w-3xl mx-auto text-lg text-blue-100/80">
                Award-winning games and interactive experiences across multiple platforms
              </p>
            </div>
            
            {/* Gaming-style project cards */}            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-16">
              {PROJECTS.map((project, idx) => (
                <div 
                  key={idx}
                  className={`group relative rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-900/80 border-blue-900/40' : 'bg-white/90 border-blue-200/40'} border hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]`}
                >
                  {/* Cyberpunk corner accents */}
                  <div className={`absolute top-0 left-0 w-10 h-1 bg-${project.color}-500 z-10`}></div>
                  <div className={`absolute top-0 left-0 w-1 h-10 bg-${project.color}-500 z-10`}></div>
                  <div className={`absolute bottom-0 right-0 w-10 h-1 bg-${project.color}-500/50 z-10`}></div>
                  <div className={`absolute bottom-0 right-0 w-1 h-10 bg-${project.color}-500/50 z-10`}></div>
                  
                  {/* Main image with overlay effect */}
                  <div className="h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gaming platform badges */}
                    <div className="absolute top-3 right-3 flex gap-1 z-20">
                      {project.platforms.map((platform, i) => (
                        <span key={i} className={`px-2 py-1 text-xs rounded border backdrop-blur-sm bg-${project.color}-900/60 text-white border-${project.color}-500/30`}>
                          {platform}
                        </span>
                      ))}
                    </div>
                    
                    {/* Downloads counter with gaming style */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 z-20 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-gray-700/50">
                      <Download className={`w-3 h-3 text-${project.color}-400`} />
                      <span className="text-xs font-medium text-white">{project.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Game title with tech underline */}
                    <div className="mb-2">                      <h3 className={`text-2xl font-bold text-${project.color}-400 group-hover:text-${project.color}-300 transition-colors`}>{project.title}</h3>
                      <div className={`h-0.5 w-16 bg-gradient-to-r from-${project.color}-500 to-transparent mt-2 group-hover:w-32 transition-all duration-500`}></div>
                    </div>
                    <p className={`text-sm mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>{project.category}</p>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-blue-100/70' : 'text-gray-600'}`}>{project.description}</p>
                    
                    {/* Tech badges with gaming style */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span key={i} className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} border border-${project.color}-${darkMode ? '900/40' : '200/40'} text-${project.color}-${darkMode ? '400' : '600'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Achievements tags */}
                    <div className="mb-5">
                      <div className={`text-xs uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Achievements</div>
                      <div className="flex flex-wrap gap-2">
                        {project.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <Star className={`w-3 h-3 text-${project.color}-${darkMode ? '400' : '500'}`} />
                            <span className={`text-xs ${darkMode ? 'text-blue-100/80' : 'text-gray-600'}`}>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Call-to-action button */}
                    <button className={`w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 bg-${project.color}-900/50 hover:bg-${project.color}-800/50 border border-${project.color}-500/30 rounded text-${project.color}-300 text-sm font-medium transition-all`}>
                      <span>VIEW PROJECT</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>        {/* Development Process - Gaming Quest Path */}
        <section className={`py-24 px-4 md:px-8 relative ${darkMode ? '' : 'bg-indigo-50/30'} transition-colors duration-300`}>
          {/* Tech background with lines */}
          <div className={`absolute inset-0 opacity-${darkMode ? '5' : '10'} z-0 transition-opacity duration-300`}>
            <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${darkMode ? 'blue-500' : 'blue-600'} to-transparent`}></div>
            <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${darkMode ? 'blue-500' : 'blue-600'} to-transparent`}></div>
            <div className={`absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-${darkMode ? 'blue-500' : 'blue-600'} to-transparent`}></div>
            <div className={`absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-${darkMode ? 'blue-500' : 'blue-600'} to-transparent`}></div>
          </div>
          
          {/* Interactive circuit-like pattern for light mode */}
          {!darkMode && (
            <div className="absolute inset-0 opacity-5 z-0 overflow-hidden">
              {Array.from({length: 8}).map((_, i) => (
                <div 
                  key={`line-${i}`}
                  className="absolute bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500"
                  style={{
                    height: '1px',
                    width: `${50 + Math.random() * 300}px`,
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
          
          <div className="max-w-7xl mx-auto relative z-10">            <div className="text-center mb-16">
              {/* Gaming badge */}
              <div 
                className={`inline-flex items-center px-4 py-1 rounded-lg ${darkMode ? 'bg-purple-600/20 border-purple-500/30' : 'bg-purple-500/10 border-purple-500/20'} border mb-4 hover:scale-105 transition-all duration-300 cursor-pointer`}
                onClick={() => alert("Game Development Journey - Learn more about our process")}
              >
                <Cpu className={`w-4 h-4 mr-2 ${darkMode ? 'text-purple-400' : 'text-purple-700'} transition-colors duration-300`} />
                <p className={`text-sm font-medium ${darkMode ? 'text-purple-300' : 'text-purple-700'} transition-colors duration-300`}>QUEST PATH</p>
              </div>
              
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                Game Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Journey</span>
              </h2>
              <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full mb-6"></div>
              <p className={`max-w-3xl mx-auto text-lg ${darkMode ? 'text-purple-100/80' : 'text-purple-900/80'} transition-colors duration-300`}>
                Our proven methodology for game development excellence, from concept to launch
              </p>
            </div>

            {/* Process steps with path connector */}
            <div className="relative">
              {/* Animated path connector */}
              <div className="hidden lg:block absolute top-32 left-1/2 w-[calc(100%-140px)] h-1 -translate-x-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 z-0 opacity-30"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROCESS_STEPS.map((step, idx) => (
                  <div 
                    key={idx}
                    className={`group relative rounded-xl ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/90 border-gray-200'} border hover:border-purple-500/40 p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-sm transform hover:-translate-y-1 cursor-pointer`}
                    onClick={() => alert(`Step ${step.number}: ${step.title} - Click to learn more`)}
                  >
                    {/* Animated step number */}
                    <div className={`absolute -top-5 left-5 w-10 h-10 rounded-full ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-4 group-hover:border-purple-500 flex items-center justify-center text-lg font-bold z-10 transition-colors`}>
                      <span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-blue-400">{step.number}</span>
                    </div>
                    
                    {/* Step icon with hover effect */}
                    <div className="mb-6 relative">
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${darkMode ? 'bg-purple-900/30 border-purple-800/30' : 'bg-purple-100/70 border-purple-200/50'} border group-hover:bg-purple-${darkMode ? '800/40' : '200/60'} group-hover:border-purple-500/40 transition-all`}>
                        <div className={`${darkMode ? 'text-purple-400 group-hover:text-purple-300' : 'text-purple-600 group-hover:text-purple-700'} transition-colors`}>
                          {step.icon}
                        </div>
                      </div>
                      <div className="absolute -bottom-2 left-0 h-0.5 w-10 bg-gradient-to-r from-purple-500 to-transparent group-hover:w-20 transition-all duration-500"></div>
                    </div>
                    
                    {/* Step content */}
                    <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-purple-300 group-hover:text-purple-200' : 'text-purple-700 group-hover:text-purple-800'} transition-colors`}>{step.title}</h3>
                    <p className={`${darkMode ? 'text-blue-100/70 group-hover:text-white/90' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>{step.description}</p>
                    
                    {/* Progress indicator */}
                    <div className={`w-full h-0.5 mt-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} overflow-hidden transition-colors duration-300`}>
                      <div className={`h-full bg-gradient-to-r from-purple-500 to-blue-500 w-0 group-hover:w-full transition-all duration-700`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>        {/* Testimonials section - Gaming Reviews */}
        <section className={`py-24 px-4 md:px-8 relative overflow-hidden ${darkMode ? '' : 'bg-indigo-50/50'} transition-colors duration-300`}>
          {/* Gaming-themed background pattern */}
          <div className="absolute inset-0 opacity-5 z-0">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%236366f1' stroke-width='1'%3E%3Cpath d='M40 0v80M0 40h80'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Glowing orbs */}
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-500/20'} rounded-full filter blur-[80px] animate-pulse transition-colors duration-300`}></div>
          <div className={`absolute bottom-1/3 right-1/4 w-64 h-64 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-500/20'} rounded-full filter blur-[80px] animate-pulse transition-colors duration-300`} style={{animationDelay: '1.5s'}}></div>
          
          {/* Interactive floating stars */}
          {Array.from({length: 10}).map((_, i) => (
            <div 
              key={`star-${i}`}
              className={`absolute ${darkMode ? 'text-amber-400/30' : 'text-amber-500/40'} transition-colors duration-300 z-0`}
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
                className={`inline-flex items-center px-4 py-1 rounded-lg ${darkMode ? 'bg-indigo-600/20 border-indigo-500/30' : 'bg-indigo-500/10 border-indigo-500/20'} border mb-4 cursor-pointer transform hover:scale-110 transition-all duration-300`}
                onClick={() => alert('View all client reviews')}
              >
                <Star className={`w-4 h-4 mr-2 text-amber-${darkMode ? '400' : '500'} transition-colors duration-300`} />
                <p className={`text-sm font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-700'} transition-colors duration-300`}>PLAYER REVIEWS</p>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="relative inline-block">
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Game Developer</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500"></span>
                </span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Reputation</span>
              </h2>
              
              <p className={`max-w-3xl mx-auto text-lg ${darkMode ? 'text-indigo-100/80' : 'text-indigo-900/80'} mt-4 transition-colors duration-300`}>
                What studios and developers say about our game development expertise
              </p>
            </div>
              {/* Gaming-styled testimonial grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-lg ${darkMode ? 'bg-gray-900/80 border-indigo-900/40' : 'bg-white/90 border-indigo-200/60'} border p-8 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] backdrop-blur-sm transform hover:-translate-y-1 cursor-pointer`}
                  onClick={() => alert(`${testimonial.name} from ${testimonial.company} - View full review`)}
                >
                  {/* Interactive ripple effect on click */}
                  <span className="absolute inset-0 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center">
                    <span className={`absolute inset-0 ${darkMode ? 'bg-indigo-600/5' : 'bg-indigo-500/5'} rounded-lg transition-colors duration-300`}></span>
                  </span>
                  
                  {/* Tech corners */}
                  <div className={`absolute top-0 left-0 w-8 h-1 bg-indigo-${darkMode ? '500' : '400'} transition-colors duration-300`}></div>
                  <div className={`absolute top-0 left-0 w-1 h-8 bg-indigo-${darkMode ? '500' : '400'} transition-colors duration-300`}></div>
                  <div className={`absolute bottom-0 right-0 w-8 h-1 bg-indigo-${darkMode ? '500/50' : '300'} transition-colors duration-300`}></div>
                  <div className={`absolute bottom-0 right-0 w-1 h-8 bg-indigo-${darkMode ? '500/50' : '300'} transition-colors duration-300`}></div>
                  
                  {/* Quote mark */}
                  <div className={`absolute top-6 right-6 ${darkMode ? 'text-indigo-800' : 'text-indigo-200'} opacity-30 font-serif text-6xl leading-none transition-colors duration-300`}>"</div>
                  
                  {/* Testimonial content with hover effect */}
                  <p className={`mb-6 relative ${darkMode ? 'text-blue-100/80' : 'text-gray-700'} group-hover:${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                    {testimonial.text}
                  </p>
                  
                  {/* Divider */}
                  <div className={`h-px w-full bg-gradient-to-r from-indigo-${darkMode ? '500/50' : '400/70'} via-transparent to-transparent mb-6 transition-colors duration-300 group-hover:w-[105%] transition-all duration-500`}></div>
                  
                  {/* Client info */}
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300 group-hover:text-indigo-${darkMode ? '300' : '700'}`}>
                        {testimonial.name}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} transition-colors duration-300`}>
                        {testimonial.company}
                      </p>
                    </div>
                    
                    {/* Rating with gaming style */}
                    <div className={`flex items-center gap-1 p-1 rounded ${darkMode ? 'bg-indigo-900/30 border-indigo-800/50' : 'bg-indigo-100/70 border-indigo-200/50'} border transition-colors duration-300 group-hover:scale-110 transition-transform ease-in-out`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className={`text-amber-${darkMode ? '400' : '500'} transition-colors duration-300`} fill={darkMode ? "#fbbf24" : "#f59e0b"} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${darkMode ? 'from-indigo-600/5 to-blue-600/5' : 'from-indigo-500/5 to-blue-500/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>        {/* Gaming-themed CTA Section */}
        <section className={`py-32 px-4 md:px-8 relative overflow-hidden ${darkMode ? '' : 'bg-gradient-to-b from-blue-50 to-indigo-100/70'} transition-all duration-500`}>
          {/* Animated background */}
          <div className={`absolute inset-0 bg-gradient-to-b ${darkMode ? 'from-blue-900/10 to-purple-900/20' : 'from-blue-400/5 to-purple-400/10'} z-0 transition-colors duration-300`}></div>
          
          {/* Cyberpunk grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235b95ff' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          {/* Interactive animated energy particles */}
          {Array.from({length: 12}).map((_, i) => {
            // Generate random coordinates
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            return (
              <div 
                key={i} 
                className={`absolute w-2 h-2 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'} opacity-70 animate-pulse cursor-pointer transition-transform duration-300 hover:scale-[3] hover:opacity-100`}
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
          
          {/* Motion-sensitive energy wave that follows cursor */}
          <div 
            className={`absolute w-32 h-32 rounded-full ${darkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'} transition-colors duration-300 pointer-events-none z-0`} 
            style={{
              filter: 'blur(40px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.7s ease-out'
            }}
            id="energyWave"
          ></div>
          
          {/* Add event listener to move the energy wave with mouse/touch movement */}
          <script dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const wave = document.getElementById('energyWave');
                document.addEventListener('mousemove', (e) => {
                  if (wave) {
                    wave.style.left = e.clientX + 'px';
                    wave.style.top = e.clientY + 'px';
                  }
                });
              });
            `
          }} />
            <div className="max-w-4xl mx-auto relative z-10">
            <div className={`${darkMode ? 'bg-gray-900/80' : 'bg-white/90'} backdrop-blur-md rounded-xl border ${darkMode ? 'border-blue-500/20' : 'border-blue-400/30'} p-10 shadow-[0_0_100px_rgba(59,130,246,0.3)] transition-colors duration-300 transform hover:scale-[1.01] transition-transform duration-700`}>
              {/* Techno corners with hover animations */}
              <div className="absolute top-0 left-0 w-16 h-16 group-hover:w-24 group-hover:h-24 transition-all duration-300">
                <div className={`absolute top-0 left-0 w-full h-1 ${darkMode ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
                <div className={`absolute top-0 left-0 w-1 h-full ${darkMode ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 group-hover:w-24 group-hover:h-24 transition-all duration-300">
                <div className={`absolute bottom-0 right-0 w-full h-1 ${darkMode ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
                <div className={`absolute bottom-0 right-0 w-1 h-full ${darkMode ? 'bg-blue-500' : 'bg-blue-400'} transition-colors duration-300`}></div>
              </div>
              
              {/* Interactive gaming achievement badge */}
              <div className="flex justify-center mb-6">
                <div 
                  className={`px-5 py-2 ${darkMode ? 'bg-blue-600/20 border-blue-500/50' : 'bg-blue-500/10 border-blue-400/50'} border rounded-lg flex items-center gap-2 hover:scale-110 transition-transform duration-300 cursor-pointer`}
                  onClick={() => alert('Achievement unlocked: Ready to build your game!')}
                >
                  <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'} animate-pulse transition-colors duration-300`}></div>
                  <span className={`text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'} uppercase tracking-wider transition-colors duration-300`}>Ready Player One</span>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center tracking-tight">
                <span className="relative inline-block">
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>START YOUR</span> 
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></span>
                </span>
                <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300">GAME DEVELOPMENT QUEST</span>
              </h2>
              
              <p className={`text-xl mb-10 text-center max-w-3xl mx-auto ${darkMode ? 'text-blue-100/90' : 'text-gray-700'} transition-colors duration-300`}>
                Join forces with our elite game development team to transform your vision into an epic gaming experience that players will never forget
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                <button 
                  className={`group relative px-8 py-5 bg-gradient-to-r ${darkMode ? 'from-blue-600 to-indigo-600' : 'from-blue-500 to-indigo-500'} rounded-md font-bold text-lg text-white flex items-center gap-3 w-full sm:w-auto justify-center overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all transform hover:scale-105 active:scale-95`}
                  onClick={() => alert('Starting your game development journey!')}
                >
                  <Gamepad className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
                  <span className="relative z-10">START YOUR JOURNEY</span>
                  
                  {/* Tech button effects */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 via-transparent to-indigo-600 opacity-0 group-hover:opacity-100 blur-md transition-all group-hover:animate-pulse"></span>
                </button>
                
                <button 
                  className={`group relative px-8 py-5 backdrop-blur-sm bg-transparent border-2 ${darkMode ? 'border-blue-500/30 hover:border-blue-400' : 'border-blue-400/40 hover:border-blue-500'} rounded-md font-bold text-lg flex items-center gap-3 w-full sm:w-auto justify-center transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transform hover:-translate-y-1 active:translate-y-0`}
                  onClick={() => window.open('https://example.com/gameplay-demo', '_blank')}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">VIEW GAMEPLAY</span>
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/5 group_hover:to-purple-600/10 blur-md transition-all opacity-0 group-hover:opacity-100"></span>
                </button>
              </div>
              
              {/* Interactive Gaming style progress bar */}
              <div className="mt-12 max-w-md mx-auto">
                <div className="flex justify-between text-xs mb-2">
                  <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>PROJECT PROGRESS</span>
                  <span className={`${darkMode ? 'text-blue-300' : 'text-blue-500'} transition-colors duration-300`}>READY TO LAUNCH</span>
                </div>
                <div 
                  className={`relative h-1.5 w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden transition-colors duration-300 cursor-pointer`}
                  id="progressBar"
                  onClick={(e) => {
                    // Calculate percentage based on click position
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
                    className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}
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
