import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  
  // For parallax effects
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // References for scroll animations
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  
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
      
      {/* Background image with parallax */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-5 transition-opacity duration-500"
        style={{ 
          backgroundImage: darkMode 
            ? "url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1920&q=80')" 
            : "url('https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1920&q=80')",
          transform: `translateY(${scrollY * 0.05}px)`
        }}
      />
      
      {/* Animated particles - different colors based on mode */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full ${darkMode ? 'bg-blue-500/30' : 'bg-blue-600/20'} blur-sm transition-colors duration-500`}
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>


      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section with improved animations */}
        <motion.section 
          style={{ y: heroY, opacity: heroOpacity }}
          className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 py-20 relative overflow-hidden"
        >
          {/* 3D Game controller animation - IMPROVED with floating particles */}
          <div className="absolute top-32 right-10 w-96 h-96 hidden lg:block">
            <motion.div
              initial={{ rotateY: -30, rotateZ: 5, scale: 1 }}
              animate={{ 
                rotateY: 30, 
                rotateZ: -5,
                scale: [1, 1.05, 1],
                filter: [
                  "drop-shadow(0 0 15px rgba(59,130,246,0.4))",
                  "drop-shadow(0 0 25px rgba(99,102,241,0.6))",
                  "drop-shadow(0 0 15px rgba(59,130,246,0.4))"
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 8,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
              className="relative"
            >
              {/* Enhanced glow effect */}
              <motion.div 
                className="absolute inset-0 blur-2xl opacity-30 rounded-full -z-10"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0) 70%)",
                    "radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0) 70%)",
                    "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0) 70%)"
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 12,
                  ease: "easeInOut"
                }}
              />
              
              {/* Floating particles around controller */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'} z-20`}
                  style={{
                    width: Math.random() * 6 + 3,
                    height: Math.random() * 6 + 3,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 30 - 15],
                    y: [0, Math.random() * 30 - 15],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: Math.random() * 3 + 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              <img 
                src={darkMode 
                  ? "https://cdn.pixabay.com/photo/2012/04/13/14/52/game-controller-32587_1280.png" 
                  : "https://cdn.pixabay.com/photo/2012/04/13/14/52/game-controller-32587_1280.png"
                }
                alt="Game controller" 
                className="w-full h-full object-contain drop-shadow-xl" 
                style={{
                  filter: darkMode 
                    ? "drop-shadow(0 0 25px rgba(59,130,246,0.5)) brightness(0.9)" 
                    : "drop-shadow(0 0 15px rgba(37,99,235,0.3))",
                }}
              />
            </motion.div>
          </div>

          {/* Abstract gaming graphic elements - IMPROVED with better animation */}
          <div className="absolute left-10 bottom-32 w-64 h-64 hidden lg:block pointer-events-none">
            <motion.div
              animate={{ 
                rotateZ: [0, 10, -10, 0], 
                y: [0, -10, 10, 0],
                filter: darkMode 
                  ? ["brightness(1)", "brightness(1.2)", "brightness(1)"] 
                  : ["brightness(1)", "brightness(1.1)", "brightness(1)"]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 12,
                ease: "easeInOut"
              }}
            >
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="blob-gradient" gradientTransform="rotate(90)">
                    <stop offset="0%" stopColor={darkMode ? "#3b82f6" : "#2563eb"} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={darkMode ? "#6366f1" : "#4f46e5"} stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <motion.path 
                  fill="url(#blob-gradient)"
                  animate={{
                    d: [
                      "M40.9,-68.5C52.9,-62.2,62.6,-51.1,69.7,-38.3C76.8,-25.5,81.3,-11,78.9,2.1C76.6,15.3,67.4,27.2,58.1,38.6C48.9,50,39.6,61,27.7,68.4C15.9,75.8,1.5,79.5,-13.6,78.6C-28.8,77.7,-44.5,72.2,-57.8,63.3C-71.1,54.4,-82,42.2,-87.5,27.9C-93,13.5,-93.1,-3,-88.4,-17.3C-83.7,-31.6,-74.1,-43.7,-62.2,-50.7C-50.3,-57.8,-36,-60,-24,-63.8C-12.1,-67.7,-2.1,-73.2,8.2,-77.4C18.6,-81.6,29.9,-74.7,40.9,-68.5Z",
                      "M46.7,-79.8C59.8,-72.1,69,-58.1,75.6,-43.7C82.2,-29.4,86.2,-14.7,85.6,-0.3C85.1,14,80,28.1,72.4,40.9C64.8,53.8,54.5,65.6,41.6,71.9C28.6,78.1,14.3,79,0.2,78.6C-13.9,78.3,-27.8,76.8,-40.3,70.5C-52.8,64.2,-63.9,53.2,-71.4,40.4C-79,27.5,-83,13.8,-83.9,-0.5C-84.7,-14.7,-82.5,-29.5,-75.3,-42C-68.1,-54.5,-56,-64.7,-42,-73.8C-29.2,-82.7,-14.6,-88.8,0.8,-90.1C16.1,-91.4,32.2,-87.8,46.7,-79.8Z"
                    ],
                    rotateZ: [0, 10, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 20,
                    ease: "easeInOut"
                  }}
                  transform="translate(100 100)" 
                />
              </svg>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            {/* Improved floating badge with animation */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`inline-block mb-6 px-4 py-1.5 rounded-full border backdrop-blur-md
                ${darkMode 
                  ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border-blue-500/20" 
                  : "bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200"}`
              }
            >
              <motion.p 
                animate={{ 
                  color: darkMode 
                    ? ['#93c5fd', '#818cf8', '#93c5fd'] 
                    : ['#1d4ed8', '#4f46e5', '#1d4ed8']
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-sm font-medium flex items-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
                Professional Game Development
              </motion.p>
            </motion.div>
            
            {/* Enhanced title with staggered animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
              >
                <motion.span 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className={`block bg-clip-text text-transparent bg-gradient-to-r 
                    ${darkMode 
                      ? "from-blue-300 via-indigo-400 to-purple-500" 
                      : "from-blue-600 via-indigo-600 to-purple-700"}`
                  }
                >
                  Crafting Immersive
                </motion.span>
                <motion.span 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="block mt-2 relative"
                >
                  Gaming Experiences
                  {/* Underline animation */}
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className={`absolute -bottom-2 left-0 h-1 rounded-full ${
                      darkMode ? "bg-blue-500/30" : "bg-blue-600/20"
                    }`}
                  />
                </motion.span>
              </motion.h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`mb-10 max-w-2xl mx-auto text-xl leading-relaxed ${colorMode.textMuted}`}
            >
              From concept to launch, bringing your gaming vision to life with cutting-edge technology and creative excellence.
            </motion.p>
            
            {/* Improved button animations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-6 items-center"
            >
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-8 py-4 bg-gradient-to-r ${colorMode.primary} rounded-full font-medium text-lg shadow-lg shadow-blue-900/30 text-white flex items-center gap-3 overflow-hidden`}
              >
                <motion.span 
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span className="relative z-10">Start Your Project</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-6 py-4 border rounded-full font-medium transition-colors
                  ${darkMode 
                    ? "border-blue-500/30 hover:bg-blue-500/10" 
                    : "border-blue-300 hover:bg-blue-50"}`
                }
              >
                <motion.div
                  animate={{ rotate: [0, 20, 0, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Gamepad className="w-5 h-5" />
                </motion.div>
                View Game Portfolio
              </motion.button>
            </motion.div>

            {/* Gaming platforms with stagger animation */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16"
            >
              <motion.p 
                className={`text-sm mb-4 ${colorMode.textMuted}`}
              >
                Available Across Popular Platforms
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center items-center gap-5"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {[
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1280px-Xbox_one_logo.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Nintendo_Switch_logo%2C_square.png/768px-Nintendo_Switch_logo%2C_square.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/505px-Apple_logo_white.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Android_logo_2019.png/800px-Android_logo_2019.png"
                ].map((logo, index) => (
                  <motion.img 
                    key={index} 
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      show: { y: 0, opacity: 1 }
                    }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    src={logo} 
                    alt={`Gaming platform ${index}`} 
                    className={`h-6 md:h-8 transition-all duration-300
                      ${darkMode ? "opacity-50 hover:opacity-100" : "opacity-40 hover:opacity-80"}`
                    }
                    style={{
                      filter: !darkMode && index !== 4 && index !== 5 ? "invert(0.7)" : "none"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced scroll indicator with pulse effect */}
            <motion.div 
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div 
                className={`w-6 h-10 border-2 rounded-full flex justify-center p-1 ${darkMode ? 'border-gray-400' : 'border-gray-600'}`}
                animate={{
                  boxShadow: darkMode
                    ? ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(255,255,255,0.3)', '0 0 0px rgba(255,255,255,0)']
                    : ['0 0 0px rgba(0,0,0,0)', '0 0 10px rgba(0,0,0,0.2)', '0 0 0px rgba(0,0,0,0)']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
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
          </motion.div>
        </motion.section>

        {/* Key Features Section - NEW */}
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

        {/* Testimonials section - enhanced */}
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
