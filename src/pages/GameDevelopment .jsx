import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { 
  Gamepad, Code, Layers, Cpu, Trophy, CheckCircle, Star, LucideGithub,
  Globe, Briefcase, ArrowRight, Download, Users, Clock, Server, Sparkles,
  Monitor, Cloud, Zap, Sun, Moon, Shield, Award, HardDrive
} from 'lucide-react';

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
    bgImage: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?auto=format&fit=crop&w=400",
    color: "blue"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Game Design",
    description: "Engaging gameplay mechanics, level design, and systems that keep players coming back",
    features: ["Level architecture", "Balancing systems", "Player progression", "Economy design"],
    bgImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400",
    color: "purple"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Unity/Unreal Development",
    description: "Expert development in industry-standard game engines for all platforms",
    features: ["Cross-platform builds", "Custom shaders", "VFX systems", "Performance profiling"],
    bgImage: "https://images.unsplash.com/photo-1616499370260-485b3e5ed3dd?auto=format&fit=crop&w=400",
    color: "green"
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Game Backend Systems",
    description: "Robust server architecture and databases to support your multiplayer game experience",
    features: ["Scalable infrastructure", "Player accounts", "Leaderboards", "Analytics dashboards"],
    bgImage: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=400",
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

// Gaming studio partners
const PARTNERS = [
  {
    name: "Unity Technologies",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Unity_Technologies_logo.svg/1280px-Unity_Technologies_logo.svg.png"
  },
  {
    name: "Epic Games",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/1280px-Epic_Games_logo.svg.png"
  },
  {
    name: "Electronic Arts",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Electronic-Arts-Logo.svg/1280px-Electronic-Arts-Logo.svg.png"
  },
  {
    name: "Ubisoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ubisoft_logo.svg/1280px-Ubisoft_logo.svg.png"
  },
  {
    name: "Activision Blizzard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Activision_Blizzard.svg/1280px-Activision_Blizzard.svg.png"
  }
];

// Testimonials data with company logos
const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    company: "Indie Games Studio",
    logo: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=100&h=100&q=80",
    text: "Working with this developer transformed our game idea into reality. The technical expertise and creative input took our project to another level.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120"
  },
  {
    name: "Michael Rodriguez",
    company: "GameCraft Interactive",
    logo: "https://images.unsplash.com/photo-1560415755-bd80d06eda60?auto=format&fit=crop&w=100&h=100&q=80",
    text: "Exceptional coding skills and game design knowledge. Delivered ahead of schedule and exceeded our performance requirements.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120"
  },
  {
    name: "Emily Chang",
    company: "Pixel Dreams",
    logo: "https://images.unsplash.com/photo-1560415755-bd80d06eda60?auto=format&fit=crop&w=100&h=100&q=80",
    text: "The attention to detail and passion for gaming made all the difference. Our mobile game exceeded download targets by 45%.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120"
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
  const [splineLoaded, setSplineLoaded] = useState(false);
  
  // For parallax effects
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // References for scroll animations
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
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

  // Handle Spline load event
  const handleSplineLoad = () => {
    setSplineLoaded(true);
  };

  // Scroll to section function
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
  };

  return (
    <div className={`${colorMode.bg} ${colorMode.text} min-h-screen overflow-hidden relative transition-colors duration-500`}>
      {/* Dynamic animated background */}
      <div className={`fixed inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-950 via-blue-950/20 to-indigo-950/20' : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20'} opacity-80 transition-colors duration-500`} />
      
      {/* Grid pattern */}
      <div className={`fixed inset-0 ${darkMode ? 'opacity-20' : 'opacity-10'} transition-opacity duration-500`} style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 0 L100 0 L100 100' fill='none' stroke='%23${darkMode ? 'ffffff' : '000000'}' stroke-opacity='0.1' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }} />

      {/* Content Container */}
      <div className="relative z-10">
        {/* New Hero Section with 3D Car Model */}
        <section className="min-h-screen relative overflow-hidden">
          {/* 3D Car Model with Spline - IMPORTANT: Place this first to ensure it's at the bottom of the stacking context */}
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
                  <div className={`w-12 h-12 rounded-full border-4 border-t-transparent border-b-transparent ${darkMode ? 'border-blue-400' : 'border-blue-600'} animate-spin`}></div>
                  <p className={`mt-4 ${colorMode.text}`}>Loading 3D Experience...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Semi-transparent overlay to ensure text readability - REMOVED z-10 to prevent blocking interactions */}
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-950/30' : 'bg-gray-50/20'} pointer-events-none`}></div>

          {/* Hero content - CRITICAL: Add pointer-events-none to allow clicks to pass through to the 3D model */}
          <div className="relative z-20 flex flex-col justify-center items-start h-screen px-6 md:px-16 lg:px-24 pointer-events-none">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`inline-block mb-6 px-4 py-1.5 rounded-full border backdrop-blur-md
                  ${darkMode 
                    ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border-blue-500/20" 
                    : "bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200"}`
                }
              >
                <p className="text-sm font-medium flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
                  Interactive Game Development
                </p>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                <span className={`block bg-clip-text text-transparent bg-gradient-to-r 
                  ${darkMode 
                    ? "from-blue-300 via-indigo-400 to-purple-500" 
                    : "from-blue-600 via-indigo-600 to-purple-700"}`
                }>
                  Racing Into The
                </span>
                <span className="block mt-2 relative">
                  Gaming Future
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`mb-10 text-xl leading-relaxed max-w-lg backdrop-blur-sm py-2 ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} rounded-lg px-4`}
              >
                Interact with our 3D model and experience the next level of gaming development. We create immersive experiences that push boundaries.
              </motion.p>
              
              {/* Buttons - IMPORTANT: Add pointer-events-auto to make just the buttons clickable */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4 pointer-events-auto"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative px-8 py-4 bg-gradient-to-r ${colorMode.primary} rounded-full font-medium text-lg shadow-lg shadow-blue-900/30 text-white flex items-center gap-3`}
                >
                  Start Your Game Project
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(servicesRef)}
                  className={`flex items-center gap-3 px-6 py-4 border rounded-full font-medium transition-colors
                    ${darkMode 
                      ? "border-blue-500/30 hover:bg-blue-500/10 backdrop-blur-md" 
                      : "border-blue-300 hover:bg-blue-50 backdrop-blur-md"}`
                  }
                >
                  <Gamepad className="w-5 h-5" />
                  Explore Our Services
                </motion.button>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className={`mt-8 text-sm ${colorMode.textMuted} backdrop-blur-sm py-2 ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} rounded-lg px-4 inline-block`}
              >
                <span className="font-semibold">Tip:</span> Click and drag to interact with the 3D car model
              </motion.p>
            </div>
          </div>

          {/* Enhanced scroll indicator - Make sure this is also pointer-events-none */}
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
          >
            <motion.div 
              className={`w-6 h-10 border-2 rounded-full flex justify-center p-1 backdrop-blur-md ${darkMode ? 'border-gray-300' : 'border-gray-600'}`}
            >
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
                className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-white' : 'bg-gray-800'}`}
              />
            </motion.div>
            <p className={`text-xs mt-2 text-center ${colorMode.textMuted}`}>Scroll to explore</p>
          </motion.div>
        </section>

        {/* Key Features Section */}
        <section className="py-24 px-4 md:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {KEY_FEATURES.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative overflow-hidden rounded-2xl ${colorMode.cardBg} backdrop-blur-sm border ${colorMode.border} p-8`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full 
                    ${darkMode 
                      ? `bg-${feature.color}-600/10 blur-3xl`
                      : `bg-${feature.color}-200 blur-3xl`} -z-10`} 
                  />
                  
                  <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center shadow-lg
                    ${darkMode
                      ? `bg-gradient-to-br from-${feature.color}-500/30 to-${feature.color}-700/30 shadow-${feature.color}-900/10`
                      : `bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-300 shadow-${feature.color}-200/30`}`
                  }>
                    <div className={darkMode ? `text-${feature.color}-400` : `text-${feature.color}-700`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className={`${colorMode.textMuted}`}>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats with animated counters */}
        <section className="py-16 px-4 md:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`${colorMode.cardBg} rounded-2xl p-6 border ${colorMode.border} backdrop-blur-sm
                    ${darkMode ? 'hover:border-blue-800/50' : 'hover:border-blue-300'} transition-colors`
                  }
                >
                  <div className={`mb-4 w-12 h-12 rounded-full flex items-center justify-center
                    ${darkMode 
                      ? 'bg-gradient-to-br from-blue-600/30 to-indigo-600/30'
                      : 'bg-gradient-to-br from-blue-100 to-indigo-200'}`
                  }>
                    <div className={darkMode ? 'text-blue-400' : 'text-blue-700'}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r mb-2
                    ${darkMode 
                      ? 'from-blue-400 to-indigo-400'
                      : 'from-blue-600 to-indigo-600'}`
                  }>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${colorMode.textMuted}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Game Studio Partnerships */}
        <section className="py-24 px-4 md:px-8 relative">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted By <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Industry Leaders</span>
              </h2>
              <p className={`max-w-3xl mx-auto ${colorMode.textMuted}`}>
                Partnering with top gaming companies to deliver exceptional experiences
              </p>
            </motion.div>
            
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
              {PARTNERS.map((partner, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className={`h-10 md:h-12 transition-opacity
                      ${darkMode 
                        ? 'opacity-60 hover:opacity-100 filter invert' 
                        : 'opacity-70 hover:opacity-100'}`
                    }
                    style={{
                      filter: darkMode ? "invert(1)" : "none"
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section with interactive cards */}
        <section ref={servicesRef} className="py-24 px-4 md:px-8 relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-transparent z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border
                  ${darkMode ? 'border-blue-800/50' : 'border-blue-200'}">
                <Gamepad size={14} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                <span className="text-sm font-medium">Our Services</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Game Development<br />
                <span className="relative inline-block">
                  <span className={`bg-clip-text text-transparent bg-gradient-to-r ${colorMode.primary}`}>Services</span>
                  <span className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r ${colorMode.primary} rounded-full`}></span>
                </span>
              </h2>
              <p className={`max-w-3xl mx-auto text-lg leading-relaxed ${colorMode.textMuted}`}>
                Comprehensive game development services to bring your vision to life across all platforms
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[...SERVICES, ...ADDITIONAL_SERVICES].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className={`group relative ${colorMode.cardBg} backdrop-blur-sm rounded-2xl overflow-hidden border ${colorMode.border} shadow-lg h-full
                    ${darkMode 
                      ? `shadow-${service.color}-900/5 hover:border-${service.color}-700/30`
                      : `shadow-${service.color}-200/20 hover:border-${service.color}-300/80`}`
                  }
                >
                  {/* Background image with overlay - only for services with images */}
                  {service.bgImage && (
                    <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
                      <img 
                        src={service.bgImage} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Colored gradient overlay */}
                  <div className={`absolute inset-0 ${darkMode 
                    ? `bg-gradient-to-b from-${service.color}-900/40 to-gray-900/80`
                    : `bg-gradient-to-b from-${service.color}-50/40 to-white/80`
                  } z-0`}></div>
                  
                  <div className="relative z-10 p-8">
                    <div className={`mb-6 w-14 h-14 shadow-lg group-hover:scale-110 transition-transform
                      ${darkMode
                        ? `bg-gradient-to-br from-${service.color}-500/40 to-${service.color}-700/40 shadow-${service.color}-900/20 rounded-2xl flex items-center justify-center text-${service.color}-400`
                        : `bg-gradient-to-br from-${service.color}-100 to-${service.color}-300 shadow-${service.color}-200/40 rounded-2xl flex items-center justify-center text-${service.color}-700`
                      }`
                    }>
                      {service.icon}
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-4 transition-colors
                      ${darkMode
                        ? `group-hover:text-${service.color}-400`
                        : `group-hover:text-${service.color}-700`}`
                    }>
                      {service.title}
                    </h3>
                    <p className={`mb-6 ${colorMode.textMuted}`}>{service.description}</p>
                    
                    <div className="space-y-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle size={16} className={darkMode 
                            ? `text-${service.color}-400 mt-0.5 flex-shrink-0`
                            : `text-${service.color}-600 mt-0.5 flex-shrink-0`
                          } />
                          <span className={`text-sm ${colorMode.textMuted}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Learn more button */}
                    <div className={`mt-8 pt-4 border-t
                      ${darkMode ? 'border-gray-700/50' : 'border-gray-200'}`
                    }>
                      <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button className={`flex items-center justify-center w-full py-3 px-4 rounded-lg font-medium transition-colors
                          ${darkMode
                            ? `bg-${service.color}-600/20 text-${service.color}-400 hover:bg-${service.color}-600/30`
                            : `bg-${service.color}-100 text-${service.color}-700 hover:bg-${service.color}-200`
                          }`
                        }>
                          <span>Explore {service.title}</span>
                          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Motion border effect */}
                    <div className={`absolute -z-10 -inset-0.5 rounded-lg bg-gradient-to-r 
                      ${darkMode
                        ? `from-${service.color}-500/0 via-${service.color}-500/0 to-${service.color}-500/0`
                        : `from-${service.color}-300/0 via-${service.color}-300/0 to-${service.color}-300/0`
                      }
                      group-hover:${darkMode
                        ? `from-${service.color}-500/20 via-${service.color}-600/20 to-${service.color}-700/20`
                        : `from-${service.color}-300/50 via-${service.color}-400/50 to-${service.color}-500/50`
                      }
                      opacity-0 group-hover:opacity-100 blur-xl transition duration-500 group-hover:duration-200`}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-3 transition-shadow
                  ${darkMode
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30'
                  }`
                }
              >
                View All Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-24 px-4 md:px-8 relative">
          <div className={`max-w-6xl mx-auto ${colorMode.cardBg} backdrop-blur-md rounded-3xl p-10 lg:p-16 border ${colorMode.border}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Clients</span> Say
              </h2>
              <p className={`max-w-3xl mx-auto ${colorMode.textMuted}`}>
                Hear directly from the studios and developers who've partnered with us
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`relative p-6 rounded-xl border ${colorMode.border}
                    ${darkMode 
                      ? 'bg-gray-900/70 hover:border-blue-800/50'
                      : 'bg-white hover:border-blue-300/80'
                    } transition-colors`
                  }
                >
                  {/* Quote icon */}
                  <div className={`absolute -top-4 -left-2 text-4xl
                    ${darkMode ? 'text-blue-500/30' : 'text-blue-300'}`
                  }>
                    "
                  </div>
                  
                  <p className={`mb-6 relative z-10 ${colorMode.textMuted}`}>
                    {testimonial.text}
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-500/50">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className={`text-sm ${colorMode.textMuted}`}>{testimonial.company}</p>
                    </div>
                    
                    <div className="ml-auto flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section with 3D card effects */}
        <section ref={projectsRef} className="py-24 px-4 md:px-8 relative">
          <div className={`absolute inset-0 z-0 
            ${darkMode 
              ? 'bg-gradient-to-b from-blue-900/20 via-black/70 to-black/40'
              : 'bg-gradient-to-b from-blue-50 via-white/80 to-white/60'
            }`
          }></div>
          
          <div 
            className="absolute inset-0 opacity-20 z-0"
            style={{
              backgroundSize: '200px 200px',
              backgroundImage: `radial-gradient(circle, ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.1)'} 1px, transparent 1px)`,
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className={`mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border
                ${darkMode ? 'border-blue-800/50' : 'border-blue-200'}`
              }>
                <Trophy size={14} className={darkMode ? 'text-amber-400' : 'text-amber-600'} />
                <span className="text-sm font-medium">Selected Work</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Featured <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Projects</span>
              </h2>
              <p className={`max-w-3xl mx-auto text-lg leading-relaxed ${colorMode.textMuted}`}>
                Award-winning games and interactive experiences across multiple platforms
              </p>
            </motion.div>
            
            {/* 3D card gallery with improved effects */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-16">
              {PROJECTS.map((project, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  whileHover={{
                    y: -20,
                    rotateY: 5,
                    rotateX: -5,
                    transition: { duration: 0.3 }
                  }}
                  className={`group relative ${colorMode.cardBg} backdrop-blur-sm rounded-2xl border shadow-xl overflow-hidden perspective
                    ${darkMode 
                      ? `border-gray-800/80 shadow-${project.color}-900/10`  
                      : `border-gray-200 shadow-${project.color}-100/40`
                    }`
                  }
                  onMouseEnter={() => setActiveProject(idx)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  {/* Main image with parallax effect */}
                  <div className="h-56 overflow-hidden relative">
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      animate={{
                        scale: activeProject === idx ? 1.1 : 1
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${darkMode 
                      ? `from-gray-900 to-transparent` 
                      : `from-white to-transparent`
                    } opacity-60`}></div>
                    
                    {/* Gaming platform badges */}
                    <div className="absolute top-3 right-3 flex gap-1">
                      {project.platforms.map((platform, i) => (
                        <span key={i} className={`px-2 py-1 text-xs rounded border backdrop-blur-sm
                          ${darkMode 
                            ? `bg-${project.color}-900/60 text-${project.color}-200 border-${project.color}-700/30`
                            : `bg-${project.color}-100 text-${project.color}-800 border-${project.color}-300/30`
                          }`
                        }>
                          {platform}
                        </span>
                      ))}
                    </div>
                    
                    {/* Achievement badge */}
                    {project.achievements[0] && (
                      <div className="absolute top-3 left-3">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded border backdrop-blur-sm
                          ${darkMode
                            ? 'bg-amber-900/60 text-amber-200 border-amber-700/30'
                            : 'bg-amber-100 text-amber-800 border-amber-300/30'
                          }`
                        }>
                          <Trophy size={12} className={darkMode ? 'text-amber-300' : 'text-amber-600'} />
                          <span className="text-xs font-medium">{project.achievements[0]}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`text-2xl font-bold mb-1 transition-colors
                      ${darkMode
                        ? `group-hover:text-${project.color}-400`
                        : `group-hover:text-${project.color}-700`
                      }`
                    }>
                      {project.title}
                    </h3>
                    <p className={`text-sm mb-3
                      ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`
                    }>
                      {project.category}
                    </p>
                    <p className={`text-sm mb-4 ${colorMode.textMuted}`}>{project.description}</p>
                    
                    {/* Technologies used */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span key={i} className={`text-xs px-3 py-1 rounded-full
                          ${darkMode
                            ? 'bg-gray-800/80 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                          }`
                        }>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Download className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={colorMode.textMuted}>{project.downloads}</span>
                      </div>
                      
                      <button className={`flex items-center gap-1 text-sm font-medium transition-colors
                        ${darkMode
                          ? `text-${project.color}-400 hover:text-${project.color}-300`
                          : `text-${project.color}-600 hover:text-${project.color}-700`
                        }`
                      }>
                        View project
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* New: Hover reveal details button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 via-black/40 to-transparent">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-full font-medium backdrop-blur-sm border-2 transition-colors
                          ${darkMode
                            ? `border-${project.color}-500/50 text-white shadow-lg shadow-${project.color}-900/20`
                            : `border-${project.color}-400 text-white shadow-lg shadow-${project.color}-300/30`
                          }`
                        }
                      >
                        Explore Game
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Glowing border effect */}
                  <div className={`absolute inset-0 rounded-2xl border-2 transition-colors
                    ${darkMode
                      ? `border-${project.color}-500/0 group-hover:border-${project.color}-500/30`
                      : `border-${project.color}-300/0 group-hover:border-${project.color}-300/80`
                    }`
                  }></div>
                </motion.div>
              ))}
            </div>
            
            {/* Browse all projects button with enhanced effects */}
            <div className="text-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 98 }}
                className={`group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium rounded-lg shadow-lg
                  ${darkMode
                    ? 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 shadow-blue-900/20 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/20 text-white'
                  }`
                }
              >
                <span className="relative flex items-center gap-2 z-10">
                  Browse All Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className={`absolute inset-0 w-full h-full transition-all duration-300 opacity-0 group-hover:opacity-100
                  ${darkMode
                    ? 'bg-gradient-to-r from-indigo-600/80 to-blue-600/80'
                    : 'bg-gradient-to-r from-indigo-700 to-blue-700'
                  }`
                }></span>
              </motion.button>
            </div>
          </div>
        </section>

        {/* Development Process with timeline */}
        <section className="py-24 px-4 md:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className={`mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border
                ${darkMode ? 'border-blue-800/50' : 'border-blue-200'}`
              }>
                <Code size={14} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                <span className="text-sm font-medium">Our Process</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Development <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Process</span>
              </h2>
              <p className={`max-w-3xl mx-auto text-lg leading-relaxed ${colorMode.textMuted}`}>
                A proven methodology for game development success
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-24 left-1/2 w-0.5 h-[calc(100%-7rem)] bg-blue-900/50 transform -translate-x-1/2 hidden lg:block"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
                {PROCESS_STEPS.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.6 }}
                    className={`relative ${colorMode.cardBg} backdrop-blur-sm rounded-2xl p-8 border ${colorMode.border} shadow-lg group hover:border-blue-600/30 transition-colors`}
                  >
                    {/* Timeline circle */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-900 border-4 border-gray-900 z-20 hidden lg:block"></div>
                    
                    <div className={`w-16 h-16 mb-6 mx-auto rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg
                      ${darkMode
                        ? `bg-gradient-to-br from-${step.color}-600 to-${step.color}-700 shadow-${step.color}-900/20 text-${step.color}-400`
                        : `bg-gradient-to-br from-${step.color}-100 to-${step.color}-300 shadow-${step.color}-200/40 text-${step.color}-700`
                      }`
                    }>
                      {step.icon}
                    </div>
                    
                    <div className={`text-xl font-bold mb-1 text-center
                      ${darkMode ? `text-${step.color}-400` : `text-${step.color}-700`}`
                    }>
                      {step.number}
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 text-center transition-colors
                      ${darkMode
                        ? `group-hover:text-${step.color}-400`
                        : `group-hover:text-${step.color}-700`}`
                    }>
                      {step.title}
                    </h3>
                    <p className={`text-center ${colorMode.textMuted}`}>{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 md:px-8 relative">
          <div className={`absolute inset-0 z-0 
            ${darkMode 
              ? 'bg-gradient-to-b from-black/10 to-blue-900/20'
              : 'bg-gradient-to-b from-white/10 to-blue-100/20'
            }`
          }></div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`max-w-4xl mx-auto ${colorMode.cardBg} backdrop-blur-xl rounded-3xl p-10 border ${colorMode.border} shadow-2xl relative z-10 overflow-hidden`}
          >
            {/* Animated glow effect */}
            <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full filter blur-[100px] opacity-20
              ${darkMode ? 'bg-blue-600' : 'bg-blue-300'}`
            }></div>
            <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full filter blur-[100px] opacity-20
              ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`
            }></div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Ready to Bring Your <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Game Idea</span> to Life?
            </h2>
            <p className={`text-xl mb-10 text-center max-w-3xl mx-auto ${colorMode.textMuted}`}>
              Let's collaborate to create an exceptional gaming experience that players will love
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-8 py-4 bg-gradient-to-r ${colorMode.primary} rounded-full font-medium text-lg shadow-lg shadow-blue-900/30 text-white flex items-center gap-3 w-full sm:w-auto justify-center`}
              >
                <Gamepad className="w-5 h-5" />
                Schedule a Discovery Call
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-6 py-4 border rounded-full font-medium transition-colors w-full sm:w-auto justify-center
                  ${darkMode 
                    ? "border-blue-500/30 hover:bg-blue-500/10" 
                    : "border-blue-300 hover:bg-blue-50"}`
                }
              >
                <Sparkles className="w-5 h-5" />
                Explore Our Process
              </motion.button>
            </div>
          </motion.div>
        </section>


      </div>
    </div>
  );
}

export default GamingDevServices;
