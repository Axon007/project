import React, { useState, useRef, useEffect } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  // References for scroll animations and video
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const videoRef = useRef(null);
  
  // Derive darkMode from theme prop
  const darkMode = theme === 'dark';
  
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
    <div className={`${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen relative transition-colors duration-300`}>
      {/* Add animation styles */}
      <style>{animationStyles}</style>{/* Simple gradient background */}
      <div className={`fixed inset-0 bg-gradient-to-br ${colorMode.mainBg} transition-colors duration-300`} />
        {/* Interactive Welcome Banner */}
      <div className={`fixed top-0 left-0 right-0 z-40 py-2 px-4 md:px-8 text-center ${darkMode ? 'bg-blue-900/30 text-blue-100' : 'bg-blue-600/70 text-white'} backdrop-blur-sm transition-colors duration-300 shadow-md`}>
        <div className="flex items-center justify-center">
          <Gamepad className="mr-2 h-4 w-4" />
          <span className={`text-sm font-bold ${showCursor ? 'cursor' : ''}`}>
            {typewriterText}
          </span>
        </div>
      </div>

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
        {/* Hero Section with Gaming Video Background */}
        <section className="min-h-screen relative overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0 w-full h-full bg-black">
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline
              className={`w-full h-full object-cover ${colorMode.videoBg} transition-opacity duration-300`}
              poster="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-scrolling-through-a-cyberpunk-city-during-the-night-42654-large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Controls */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3 z-10">
              <button 
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
              >
                {isVideoPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button 
                onClick={toggleMute}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
            {/* Gaming-themed overlay with grid lines and neon effects */}
          <div className="absolute inset-0 z-0 opacity-30 transition-opacity duration-300">
            {/* Cyber grid pattern */}
            <div 
              className="w-full h-full transition-all duration-300" 
              style={{
                backgroundImage: `
                  linear-gradient(to right, ${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.15)'} 1px, transparent 1px),
                  linear-gradient(to bottom, ${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.15)'} 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Animated neon glow */}
            <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${darkMode ? 'bg-blue-500/20' : 'bg-blue-500/30'} rounded-full filter blur-[80px] animate-pulse transition-colors duration-300`}></div>
            <div className={`absolute bottom-1/3 right-1/4 w-64 h-64 ${darkMode ? 'bg-purple-500/20' : 'bg-purple-500/30'} rounded-full filter blur-[60px] animate-pulse transition-colors duration-300`} style={{animationDelay: '1s'}}></div>
          </div>
          
          {/* Gradient Overlay for better text visibility */}
          <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-gray-950/90 via-gray-950/50 to-transparent' : 'from-transparent via-transparent to-transparent'} z-0 transition-colors duration-300`}></div>
          
          {/* Interactive particles effect */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {Array.from({length: 12}).map((_, i) => (
              <div 
                key={i} 
                className={`absolute w-1 h-1 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-colors duration-300`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.6,
                  animation: `float ${3 + Math.random() * 4}s linear infinite, pulse ${2 + Math.random() * 2}s infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              ></div>
            ))}
          </div>
            {/* Hero content with gaming-themed styling */}
          <div className="relative z-20 flex flex-col justify-center items-start h-screen px-6 md:px-16 lg:px-24">
            <div className="max-w-3xl">
              {/* Gaming-themed interactive badge with glow effect */}
              <div 
                className={`inline-flex items-center mb-8 px-4 py-1.5 rounded-lg ${darkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-500/20 border-blue-600/40'} border shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse hover:scale-105 transition-all duration-300 cursor-pointer`}
                onClick={() => window.open('https://example.com/elite-game-development', '_blank')}
              >
                <Gamepad className={`w-4 h-4 mr-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'} transition-colors duration-300`} />
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>ELITE GAME DEVELOPMENT</p>
              </div>
              
              {/* Main headline with cyberpunk/gaming styling */}
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 pb-2 hover:scale-[1.02] transition-transform duration-300 origin-left cursor-default">
                  LEVEL UP
                </span>
                <span className={`block ${darkMode ? 'text-white' : 'text-gray-900'} relative transition-colors duration-300 hover:translate-x-1 transition-transform duration-300 cursor-default`}>
                  YOUR GAME DEV
                  <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-transparent"></span>
                </span>
              </h1>
              
              {/* Description text with futuristic styling */}
              <p className={`mb-10 text-xl leading-relaxed max-w-xl backdrop-blur-sm ${darkMode ? 'text-blue-100/90 bg-black/10 border-blue-500' : 'text-gray-800 bg-white/20 border-blue-600'} p-4 border-l-4 rounded-r-lg transition-colors duration-300 transform hover:translate-x-1 hover:shadow-lg transition-all duration-300`}>
                From concept to launch, we create next-gen gaming experiences 
                with cutting-edge technology and immersive gameplay that captivates players.
              </p>
                {/* Gaming-themed action buttons */}
              <div className="flex flex-wrap gap-5">
                <button 
                  className={`group relative px-8 py-4 ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'} rounded-md font-medium text-lg flex items-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] transform hover:scale-105 active:scale-95`}
                >
                  <span className="relative z-10">LAUNCH YOUR GAME</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  
                  {/* Animated button effect */}
                  <span className={`absolute inset-0 w-full h-full bg-gradient-to-r ${darkMode ? 'from-blue-600 to-indigo-600' : 'from-blue-500 to-indigo-500'} opacity-0 group-hover:opacity-100 transition-opacity`}></span>
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 via-transparent to-indigo-600 group-hover:opacity-100 blur-md transition-all opacity-0 group-hover:animate-pulse"></span>
                </button>
                
                <button 
                  onClick={() => scrollToSection(servicesRef)}
                  className={`flex items-center gap-3 px-7 py-4 backdrop-blur-sm ${darkMode ? 'bg-black/30 border-blue-500/50 hover:border-blue-400 text-white' : 'bg-white/30 border-blue-400/50 hover:border-blue-500 text-gray-800'} border-2 rounded-md font-medium group hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0`}
                >
                  <Gamepad className={`w-5 h-5 ${darkMode ? 'text-blue-300' : 'text-blue-600'} group-hover:animate-bounce transition-colors duration-300`} />
                  EXPLORE SERVICES
                </button>
              </div>
              
              {/* Stats bar - gaming achievement style with hover effects */}
              <div className="mt-12 flex flex-wrap gap-8">
                {STATS.map((stat, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 cursor-pointer group transform hover:scale-110 transition-all duration-300 p-2 rounded-lg ${darkMode ? 'hover:bg-blue-900/20' : 'hover:bg-blue-100/50'}`}
                  >
                    <div className={`w-2 h-10 ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : index === 2 ? 'bg-cyan-500' : 'bg-amber-500'} rounded-full shadow-[0_0_10px_rgba(59,130,246,0.7)] group-hover:h-12 transition-all duration-300`}></div>
                    <div>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300 group-hover:text-blue-600`}>{stat.value}</div>
                      <div className={`text-xs ${darkMode ? 'text-blue-200' : 'text-blue-700'} transition-colors duration-300`}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Portfolio Section - Gaming Showcase */}
        <section ref={projectsRef} className={`py-24 px-4 md:px-8 relative ${darkMode ? '' : 'bg-blue-50/50'} transition-colors duration-300`}>
          {/* Gaming background overlay */}
          <div className="absolute inset-0 opacity-10 z-0">
            {/* Hex grid pattern */}
            <div className="w-full h-full transition-opacity duration-300" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 V15 H30 V0 H60 V15 H30 V30 H60 V45 H30 V60 H0 V45 H30 V30z' fill='%235b95ff' fill-opacity='${darkMode ? '0.2' : '0.3'}'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {/* Gaming title badge */}
              <div className="inline-flex items-center px-4 py-1 rounded-lg bg-blue-600/20 border border-blue-500/30 mb-4">
                <Trophy className="w-4 h-4 mr-2 text-amber-400" />
                <p className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>GAME SHOWCASE</p>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Featured Projects
                </span>
              </h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
              <p className={`max-w-3xl mx-auto text-lg ${darkMode ? 'text-blue-100/80' : 'text-gray-700'}`}>
                Award-winning games and interactive experiences across multiple platforms
              </p>
            </div>
            
            {/* Gaming-style project cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-16">
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
                    <div className="mb-2">
                      <h3 className={`text-2xl font-bold text-${project.color}-400 group-hover:text-${project.color}-300 transition-colors`}>{project.title}</h3>
                      <div className={`h-0.5 w-16 bg-gradient-to-r from-${project.color}-500 to-transparent mt-2 group-hover:w-32 transition-all duration-500`}></div>
                    </div>
                    
                    <p className={`text-sm mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>{project.category}</p>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-blue-100/70' : 'text-gray-600'}`}>{project.description}</p>
                    
                    {/* Tech badges with gaming style */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span key={i} className={`text-xs px-3 py-1 rounded-full bg-gray-800 border border-${project.color}-900/40 text-${project.color}-400`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Achievements tags */}
                    <div className="mb-5">
                      <div className="text-xs uppercase text-gray-500 mb-1">Achievements</div>
                      <div className="flex flex-wrap gap-2">
                        {project.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <Star className={`w-3 h-3 text-${project.color}-400`} />
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
        </section>
        
        {/* Gaming-themed Services Section */}
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
              <div className={`inline-flex items-center px-4 py-1 rounded-lg ${darkMode ? 'bg-purple-600/20 border-purple-500/30' : 'bg-purple-500/10 border-purple-500/20'} border mb-4`}>
                <Gamepad className={`w-4 h-4 mr-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <p className={`text-sm font-medium ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>GAME DEV ARSENAL</p>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                <span className="relative inline-block">
                  <span className={`inline-block ${darkMode ? 'text-white' : 'text-gray-900'}`}>Game Development</span> 
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></span>
                </span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300">Services & Solutions</span>
              </h2>
              
              <p className={`max-w-3xl mx-auto text-lg ${darkMode ? 'text-blue-100/80' : 'text-gray-700'}`}>
                Level up your gaming project with our comprehensive suite of development services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[...SERVICES, ...ADDITIONAL_SERVICES].map((service, index) => (
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
                  
                  <p className={`mb-6 ${darkMode ? 'text-blue-100/70 group-hover:text-white/90' : 'text-gray-600 group-hover:text-gray-800'} transition-colors mt-4`}>
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
        </section>
      </div>
    </div>
  );
}

export default GamingDevServices;
