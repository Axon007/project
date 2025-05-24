import React, { useEffect, useRef, useState } from "react";
import { 
  motion, useScroll, useTransform, useMotionValueEvent,
  useSpring, useAnimation, useInView 
} from "framer-motion";
import { AuroraText } from "../components/magicui/aurora-text";
import PageTransition from '../components/PageTransition';
import { 
  Film, Shield, Play, Code, 
  Users, Award, Globe, BarChart, Building2, 
  BadgeCheck, Lock, Tv, Sparkles, 
  Zap, CheckCircle2, Video, ChevronRight, 
  Camera, Headphones, MonitorPlay, Folders
} from "lucide-react";

// Constants reorganized for better structure
const COMPANY_LOGOS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png', // Instagram
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png', // Amazon
  'https://www.hbo.com/favicon.ico', // HBO
  'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg', // YouTube
  'https://i.vimeocdn.com/favicon/vimeo.ico', // Vimeo
];

const CERTIFICATIONS = [
  { name: 'Adobe Premier Pro', icon: <Play className="w-6 h-6" /> },
  { name: 'Final Cut Pro', icon: <Film className="w-6 h-6" /> },
  { name: 'DaVinci Resolve', icon: <Video className="w-6 h-6" /> },
  { name: 'Avid Media Composer', icon: <BadgeCheck className="w-6 h-6" /> }
];

// Core services restructured with more consistent descriptions and better icons
const SERVICES = [
  {
    title: "Commercial Editing",
    description: "High-impact promotional videos that capture audience attention and drive conversion rates",
    icon: <MonitorPlay className="w-10 h-10 text-primary" />,
    delay: 0
  },
  {
    title: "Film Post-Production",
    description: "Professional color grading and seamless editing that brings your cinematic vision to life",
    icon: <Film className="w-10 h-10 text-primary" />,
    delay: 0.1
  },
  {
    title: "Motion Graphics",
    description: "Eye-catching animation and dynamic visual effects that elevate your brand storytelling",
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    delay: 0.2
  },
  {
    title: "Content Optimization",
    description: "Strategic editing that maximizes engagement across multiple platform specifications",
    icon: <BarChart className="w-10 h-10 text-primary" />,
    delay: 0.3
  }
];

// Testimonials updated with more specific business results
const TESTIMONIALS = [
  {
    quote: "ProEdit Studio transformed our raw footage into a compelling brand story that increased our conversion rates by 45%. Their editing style perfectly captured our vision and resonated with our audience.",
    author: "Sarah Johnson",
    position: "Marketing Director, Global Brands Inc.",
    image: "https://randomuser.me/api/portraits/women/44.jpg", // Example image link
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo-placeholder.svg/512px-Logo-placeholder.svg.png", // Example logo link
    delay: 0
  },
  {
    quote: "The post-production team at ProEdit delivered outstanding quality for our documentary series. Their color grading and sound design elevated our storytelling and helped us secure distribution with a major streaming platform.",
    author: "Michael Chen",
    position: "Executive Producer, Horizon Films",
    image: "https://randomuser.me/api/portraits/men/32.jpg", // Example image link
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo-placeholder.svg/512px-Logo-placeholder.svg.png", // Example logo link
    delay: 0.1
  },
  {
    quote: "ProEdit's motion graphics team created stunning visual sequences that made our product launch video stand out. Their work directly contributed to a 78% increase in viewer engagement compared to our previous campaigns.",
    author: "Emma Rodriguez",
    position: "Creative Director, TechVision Media",
    image: "https://randomuser.me/api/portraits/women/68.jpg", // Example image link
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo-placeholder.svg/512px-Logo-placeholder.svg.png", // Example logo link
    delay: 0.2
  }
];


// First, update the WHY_CHOOSE_US_CONTENT array with mobile responsive considerations
const WHY_CHOOSE_US_CONTENT = [
  {
    title: "Professional Video Editing",
    description: "Our expert editors craft compelling stories with seamless transitions, perfect pacing, and stunning visual effects that keep viewers engaged.",
    content: (
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <Film className="w-8 h-8 text-primary" />
          </div>
        </div>
        <p className="text-sm text-primary/80">Loading project assets...</p>
      </div>
    )
  },
  {
    title: "Color Grading & Correction",
    description: "Transform your footage with cinematic color grading that sets the mood and ensures consistency across your entire project.",
    content: (
      <div className="grid grid-cols-2 gap-2 p-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="aspect-video bg-primary/10 rounded-md" />
        ))}
      </div>
    )
  },
  {
    title: "Motion Graphics & VFX",
    description: "Enhance your videos with custom motion graphics, dynamic titles, and special effects that bring your ideas to life.",
    content: (
      <img 
        src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop"
        alt="Motion graphics work"
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Sound Design & Mixing",
    description: "Perfect your audio with professional sound mixing, music selection, and sound effects that elevate the viewing experience.",
    content: (
      <img 
        src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop"
        alt="Audio mixing station"
        className="h-full w-full object-cover"
      />
    ),
  }
];

// Add this animation config at the top of the file
const ANIMATION_CONFIG = {
  springSmooth: {
    type: "spring",
    stiffness: 70,
    damping: 20,
    mass: 0.5
  },
  springBouncy: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 0.8
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 }
  },
  slideUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  smooth: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.1 } }
  }
};

// Reusable components for better organization
const SectionHeading = ({ eyebrow, title, subtitle = "", center = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''} px-4`}>
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.3 }}
      className="text-primary text-sm font-medium uppercase tracking-wider"
    >
      {eyebrow}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={ANIMATION_CONFIG.springSmooth}
      className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ ...ANIMATION_CONFIG.springSmooth, delay: 0.1 }}
        className="text-base md:text-lg text-foreground/70 max-w-3xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);


// Add this component for video fade effect
const FadeVideo = () => {
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [1, 0]),
    ANIMATION_CONFIG.springSmooth
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/big-eyed-fluff-ball.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
    </motion.div>
  );
}

// Update the VideoEditorPreview component
function VideoEditorPreview({ isActive, content, activeStep }) {
  const videoRef = useRef(null);
  const progress = useSpring(activeStep * 25, ANIMATION_CONFIG.springSmooth);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  
  // Enhanced video controls with volume and playback speed
  const controls = useAnimation();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      if (isPlaying) {
        videoRef.current.play();
        controls.start({ opacity: 1, scale: 1 });
      } else {
        videoRef.current.pause();
        controls.start({ opacity: 0.8, scale: 0.98 });
      }
    }
  }, [isPlaying, volume, controls]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={ANIMATION_CONFIG.springSmooth}
      className="bg-background/80 backdrop-blur-md rounded-2xl border border-primary/20 p-4 h-full shadow-lg hover:shadow-primary/10 transition-all"
    >
      <div className="flex flex-col h-full">
        {/* Enhanced Editor Header */}
        <div className="flex items-center justify-between mb-4 bg-secondary/20 p-2 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" 
              />
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" 
              />
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" 
              />
            </div>
            <div className="text-sm text-foreground/60 font-mono">video_preview.mp4</div>
          </div>
          
          {/* New Tools Section */}
          <div className="flex items-center gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Headphones className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Enhanced Video Preview */}
        <motion.div 
          animate={controls}
          className="relative aspect-video bg-secondary rounded-lg mb-4 overflow-hidden group ring-1 ring-primary/10"
        >
          <video
            ref={videoRef}
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/big-eyed-fluff-ball.mp4" type="video/mp4" />
          </video>

          {/* Enhanced Video Controls Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-transparent to-transparent">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  {isPlaying ? (
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-1 h-4 bg-current rounded-sm" />
                      <div className="w-1 h-4 bg-current rounded-sm ml-1" />
                    </div>
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </motion.button>

                {/* Enhanced Progress Bar */}
                <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden group">
                  <motion.div 
                    className="h-full bg-primary group-hover:bg-primary/80 transition-colors"
                    style={{ width: progress }}
                  />
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 accent-primary"
                  />
                  <span className="text-xs text-white font-mono">
                    Step {activeStep + 1}/4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Timeline Tracks */}
        <div className="space-y-4">
          {['Video', 'Audio', 'Effects'].map((track, index) => (
            <div key={track} className="flex items-center gap-2">
              <div className="w-20 flex-shrink-0">
                <motion.div 
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  className="text-xs text-foreground/60 font-mono"
                >
                  {track}
                </motion.div>
              </div>
              <div className="flex-1 h-10 bg-primary/5 rounded-md relative overflow-hidden group">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-primary/20"
                  style={{ 
                    width: track === 'Video' 
                      ? `${(activeStep + 1) * 25}%`
                      : track === 'Audio'
                      ? '100%'
                      : '0%'
                  }}
                  animate={{
                    width: track === 'Audio' ? ['0%', '100%'] : undefined
                  }}
                  transition={track === 'Audio' ? { 
                    duration: 3, 
                    repeat: Infinity,
                    ease: 'linear'
                  } : undefined}
                />
                
                {/* Track markers */}
                <div className="absolute inset-0 flex">
                  {[0, 1, 2, 3].map((marker) => (
                    <div 
                      key={marker}
                      className="flex-1 border-l border-primary/10 first:border-l-0"
                    />
                  ))}
                </div>

                {/* Active marker */}
                {track === 'Video' && (
                  <motion.div
                    className="absolute top-0 bottom-0 w-0.5 bg-primary"
                    style={{ left: `${activeStep * 25}%` }}
                    layoutId={`marker-${track}`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Controls Section */}
        <div className="flex items-center justify-between mt-4 bg-secondary/10 p-3 rounded-lg">
          <div className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <Play className="w-4 h-4" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-1 h-4 bg-current rounded-sm" />
                <div className="w-1 h-4 bg-current rounded-sm ml-1" />
              </div>
            </motion.button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {[
                { icon: <Sparkles className="w-4 h-4" />, label: "Effects" },
                { icon: <Folders className="w-4 h-4" />, label: "Assets" }
              ].map((tool, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors group relative"
                >
                  {tool.icon}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {tool.label}
                  </span>
                </motion.button>
              ))}
            </div>
            <span className="text-sm text-foreground/60 font-mono">
              Step {activeStep + 1}/4
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const IntegrationsSection = () => {
  const integrations = [
    {
      name: "Microsoft Outlook",
      description: "Email & schedule management",
      logo: "/images/outlook-logo.png",
      color: THEME_ACCENT.tertiary
    },
    {
      name: "Microsoft Teams",
      description: "Team collaboration & planning",
      logo: "/images/teams-logo.png",
      color: THEME_ACCENT.primary
    },
    {
      name: "Google Workspace",
      description: "Document creation & sharing",
      logo: "/images/google-workspace-logo.png",
      color: THEME_ACCENT.secondary
    },
    {
      name: "Slack",
      description: "Team communication hub",
      logo: "/images/slack-logo.png",
      color: THEME_ACCENT.accent
    },
    {
      name: "Asana",
      description: "Project & task management",
      logo: "/images/asana-logo.png",
      color: THEME_ACCENT.primary
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-900 to-black relative overflow-hidden">
      {/* Y2K-inspired diagonal patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-30 mix-blend-overlay pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[120%] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_45%)]"></div>
        <div className="absolute top-[10%] left-[30%] w-[70%] h-[60%] rotate-[-35deg] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(236,72,153,0.1)_10px,rgba(236,72,153,0.1)_20px)]"></div>
        <div className="absolute bottom-0 right-0 w-[80%] h-[70%] rotate-12 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(59,130,246,0.1)_10px,rgba(59,130,246,0.1)_20px)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Asymmetrical header with retro elements */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 relative">
          <div className="md:w-2/3">
            {/* Glitchy, pixelated tag */}
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 bg-orange-500 text-white font-mono text-sm uppercase tracking-wider border-2 border-dashed border-orange-300 rotate-2 shadow-[5px_5px_0px_#000] dark:shadow-[5px_5px_0px_#222]">
              <div className="flex gap-1 mr-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                ))}
              </div>
              Social_Ecosystem.exe
            </div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black mb-6 text-white"
            >
              Unify your <br/>
              <div className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 italic">
                  s o c i a l &nbsp; e m p i r e
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-pink-500/30 via-violet-500/30 to-cyan-500/30 -rotate-1"></div>
              </div>
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:w-1/3 text-base md:text-lg text-zinc-400 md:text-right mt-4 md:mt-0 border-l-4 border-pink-500 pl-4 md:mb-2"
          >
            Cross-platform magic that slays.<br/>
            Sync all your content across the platforms where your audience actually hangs.
          </motion.p>

          {/* Decorative elements */}
          <div className="absolute right-0 top-0 -mt-10 hidden md:block">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
              <circle cx="60" cy="60" r="55" stroke="url(#circleGradient)" strokeWidth="2" strokeDasharray="4 4"/>
              <defs>
                <linearGradient id="circleGradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EC4899"/>
                  <stop offset="1" stopColor="#3B82F6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Y2K inspired integration showcase */}
        <div className="relative mb-20">
          <div className="flex flex-col items-center">
            {/* Main integration with embedded chatbox */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-2xl mb-16"
            >
              <div className="relative bg-gradient-to-r from-violet-600/20 to-pink-600/20 p-1 rounded-lg">
                <div className="bg-zinc-800 rounded-md p-6">
                  {/* Mock OS-style window */}
                  <div className="flex justify-between items-center border-b border-zinc-700 pb-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <span className="text-sm text-zinc-400 font-mono">integration_assistant.jsx</span>
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">running...</div>
                  </div>
                  
                  {/* Chat-like integration interface */}
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-zinc-700 text-white text-sm rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%]">
                        <div className="font-medium mb-1">Integration Assistant</div>
                        Which team collaboration tool do you want to connect?
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-violet-600 text-white text-sm rounded-2xl rounded-br-none px-4 py-2 max-w-[80%]">
                        Slack
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-zinc-700 text-white text-sm rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%]">
                        <div className="mb-2">Connecting to Slack...</div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-[#4A154B] rounded-md flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.08 5.83C2.08 6.42 1.58 6.92 0.99 6.92C0.4 6.92 0 6.42 0 5.83C0 5.24 0.5 4.74 1.09 4.74H2.08V5.83Z" fill="white"/>
                              <path d="M2.58 5.83C2.58 5.24 3.08 4.74 3.67 4.74C4.26 4.74 4.76 5.24 4.76 5.83V8.51C4.76 9.1 4.26 9.6 3.67 9.6C3.08 9.6 2.58 9.1 2.58 8.51V5.83Z" fill="white"/>
                              <path d="M3.67 2C3.08 2 2.58 1.5 2.58 0.91C2.58 0.32 3.08 0 3.67 0C4.26 0 4.76 0.5 4.76 1.09V2H3.67Z" fill="white"/>
                              <path d="M3.67 2.48C4.26 2.48 4.76 2.98 4.76 3.57C4.76 4.16 4.26 4.66 3.67 4.66H0.991C0.401 4.66 0 4.16 0 3.57C0 2.98 0.5 2.48 1.09 2.48H3.67Z" fill="white"/>
                              <path d="M7.43 3.57C7.43 2.98 7.93 2.48 8.52 2.48C9.11 2.48 9.61 2.98 9.61 3.57C9.61 4.16 9.11 4.66 8.52 4.66H7.43V3.57Z" fill="white"/>
                              <path d="M6.93 3.57C6.93 4.16 6.43 4.66 5.84 4.66C5.25 4.66 4.75 4.16 4.75 3.57V0.91C4.75 0.32 5.25 0 5.84 0C6.43 0 6.93 0.5 6.93 1.09V3.57Z" fill="white"/>
                              <path d="M5.84 7.32C6.43 7.32 6.93 7.82 6.93 8.41C6.93 9 6.43 9.5 5.84 9.5C5.25 9.5 4.75 9 4.75 8.41V7.32H5.84Z" fill="white"/>
                              <path d="M5.84 6.92C5.25 6.92 4.75 6.42 4.75 5.83C4.75 5.24 5.25 4.74 5.84 4.74H8.42C9.01 4.74 9.51 5.24 9.51 5.83C9.51 6.42 9.01 6.92 8.42 6.92H5.84Z" fill="white"/>
                            </svg>
                          </div>
                          <div className="h-1.5 w-40 bg-zinc-700 overflow-hidden rounded-full">
                            <motion.div 
                              className="h-full bg-green-400"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 1.5 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-zinc-700 text-white text-sm rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%]">
                        <div className="font-medium text-green-400 flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Connected Successfully
                        </div>
                        <div className="mt-2">
                          <div className="text-xs text-zinc-400 mb-1">What would you like to enable?</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-zinc-900/50 border border-zinc-700 rounded px-2 py-1 text-xs flex items-center gap-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 7H7V9H9V7Z" fill="currentColor"/>
                                <path d="M9 11H7V13H9V11Z" fill="currentColor"/>
                                <path d="M9 15H7V17H9V15Z" fill="currentColor"/>
                                <path d="M13 7H11V9H13V7Z" fill="currentColor"/>
                                <path d="M13 11H11V13H13V11Z" fill="currentColor"/>
                                <path d="M13 15H11V17H13V15Z" fill="currentColor"/>
                                <path d="M17 7H15V9H17V7Z" fill="currentColor"/>
                                <path d="M17 11H15V13H17V11Z" fill="currentColor"/>
                                <path d="M17 15H15V17H17V15Z" fill="currentColor"/>
                              </svg>
                              Content Calendar
                            </div>
                            <div className="bg-violet-600/30 border border-violet-500/50 rounded px-2 py-1 text-xs flex items-center gap-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Auto Scheduling
                            </div>
                            <div className="bg-zinc-900/50 border border-zinc-700 rounded px-2 py-1 text-xs flex items-center gap-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Channel Alerts
                            </div>
                            <div className="bg-zinc-900/50 border border-zinc-700 rounded px-2 py-1 text-xs flex items-center gap-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Task Sync
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Terminal-inspired prompt */}
                  <div className="mt-6 bg-zinc-900 p-2 rounded flex items-center font-mono text-sm">
                    <span className="text-green-400 mr-2">❯</span>
                    <div className="text-white flex-1">enable --integration slack --features auto-scheduling</div>
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="h-4 w-2 bg-white"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Floating integration bubbles in chaotic orbital pattern */}
            <div className="relative w-full max-w-4xl aspect-[16/9]">
              {/* Central hub */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="bg-gradient-to-br from-violet-600 to-pink-600 p-[2px] rounded-full">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-black flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="font-bold text-lg md:text-xl">Your</div>
                      <div className="text-xs md:text-sm text-violet-300">Content</div>
                      <div className="text-xs md:text-sm text-pink-300">Ecosystem</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating integration bubbles */}
              {integrations.map((integration, i) => {
                // Create randomized orbital positions
                const angle = ((i * (360 / integrations.length)) + Math.random() * 20) % 360;
                const radius = 35 + (i % 2) * 15; // Alternating orbital distance
                const delay = 0.2 + (i * 0.1);
                const xPos = Math.cos((angle * Math.PI) / 180) * radius;
                const yPos = Math.sin((angle * Math.PI) / 180) * radius;
                
                return (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${xPos}%)`,
                      top: `calc(50% + ${yPos}%)`,
                    }}
                  >
                    <div 
                      className="relative group"
                      style={{ zIndex: integrations.length - i }}
                    >
                      {/* Tool bubble */}
                      <div className="bg-gradient-to-br p-[1.5px] rounded-lg rotate-3 group-hover:rotate-0 transition-transform duration-300"
                           style={{ backgroundImage: `linear-gradient(to bottom right, ${integration.color}, ${THEME_ACCENT.accent})` }}>
                        <div className="bg-zinc-900 rounded-lg p-3 backdrop-blur-sm">
                          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-lg flex items-center justify-center mb-2"
                               style={{ backgroundColor: `${integration.color}20` }}>
                            {/* Placeholder logo from first letter if image fails */}
                            <div className="text-xl md:text-2xl font-bold" style={{ color: integration.color }}>
                              {integration.name.charAt(0)}
                            </div>
                          </div>
                          <div className="text-white text-xs md:text-sm text-center font-medium">
                            {integration.name.split(" ")[0]}
                          </div>
                        </div>
                      </div>
                      
                      {/* Connection line */}
                      <svg 
                        className="absolute top-1/2 left-1/2 -z-10 group-hover:opacity-100 opacity-50 transition-opacity" 
                        width="100" 
                        height="100" 
                        viewBox="0 0 100 100"
                        style={{
                          position: 'absolute',
                          width: '100px',
                          height: '100px',
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${angle+180}deg)`,
                          transformOrigin: '0 0',
                        }}
                      >
                        <line 
                          x1="0" 
                          y1="0" 
                          x2={Math.sqrt(Math.pow(xPos, 2) + Math.pow(yPos, 2)) * 3} 
                          y2="0" 
                          stroke={`url(#gradient-${i})`} 
                          strokeWidth="1.5" 
                          strokeDasharray="2 2"
                        />
                        <defs>
                          <linearGradient id={`gradient-${i}`} gradientTransform="rotate(0)">
                            <stop offset="0%" stopColor={integration.color} stopOpacity="0.8" />
                            <stop offset="100%" stopColor={THEME_ACCENT.accent} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Split asymmetrical cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 -mt-8">
          {[
            {
              title: "One-Click Sync",
              description: "Connect your workflow tools in seconds with zero coding or technical setup",
              icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 4L12 13.5L9 10.5L2 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 10V4H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 21C9.20914 21 11 19.2091 11 17C11 14.7909 9.20914 13 7 13C4.79086 13 3 14.7909 3 17C3 19.2091 4.79086 21 7 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>),
              style: "md:col-span-1 rotate-1",
              color: THEME_ACCENT.primary,
              boxStyle: "border-2 border-violet-500 bg-violet-500/10",
              buttonStyle: "border-violet-500 text-violet-400 hover:bg-violet-500/20"
            },
            {
              title: "Customizable Automations",
              description: "Create your own workflows with triggers and actions between platforms",
              icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.3101 8L19.0001 17L5.00012 17L9.69012 8L14.3101 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>),
              style: "md:col-span-2 -rotate-1",
              color: THEME_ACCENT.secondary,
              boxStyle: "border-2 border-pink-500 bg-pink-500/10",
              buttonStyle: "border-pink-500 text-pink-400 hover:bg-pink-500/20"
            },
            {
              title: "Multi-Platform Publishing",
              description: "Create content once and publish everywhere with smart adaptation for each platform",
              icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>),
              style: "md:col-span-2 rotate-1",
              color: THEME_ACCENT.tertiary,
              boxStyle: "border-2 border-blue-500 bg-blue-500/10",
              buttonStyle: "border-blue-500 text-blue-400 hover:bg-blue-500/20"
            },
            {
              title: "Real-Time Notifications",
              description: "Get instant alerts and updates across all your connected platforms",
              icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>),
              style: "md:col-span-1 -rotate-1",
              color: THEME_ACCENT.accent,
              boxStyle: "border-2 border-emerald-500 bg-emerald-500/10",
              buttonStyle: "border-emerald-500 text-emerald-400 hover:bg-emerald-500/20"
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className={`group relative ${feature.style}`}
            >
              <div className={`rounded-xl p-5 ${feature.boxStyle}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-black/40" style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                </div>
                
                <p className="text-zinc-300 mb-4 ml-14">{feature.description}</p>
                
                <div className="mt-4 ml-14">
                  <button className={`px-4 py-1 rounded-full text-sm font-medium border ${feature.buttonStyle} transition-colors flex items-center gap-1.5 group-hover:gap-2`}>
                    Learn More 
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* API Section - Code block with Y2K aesthetic */}
        <div className="mt-16">
          <div className="relative mx-auto max-w-4xl p-1 rounded-lg bg-gradient-to-r from-violet-500 via-pink-500 to-blue-500">
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden">
              {/* Left panel */}
              <div className="bg-black p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-800 font-mono text-xs text-zinc-400 mb-3">
                      <span className="flex w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                      API access
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Developer API</h3>
                    <p className="text-zinc-400">
                      Build your own custom integrations with our <span className="text-violet-400">RESTful API</span> and webhooks.
                    </p>
                  </div>
                  
                  <div className="space-y-2.5 mb-6">
                    {[
                      "OAuth 2.0 authentication",
                      "Webhooks for real-time updates", 
                      "Comprehensive documentation",
                      "Rate limit: 10,000 req/day"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 4L12 14.01L9 11.01" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm text-zinc-300">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="inline-block relative">
                    <button className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 transition-colors text-white rounded-md px-4 py-2 font-medium text-sm flex items-center gap-2">
                      View API Documentation
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {/* Y2K web design element */}
                    <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-pink-300 rounded-md -z-10"></div>
                  </div>
                </div>
                
                {/* Retro design elements */}
                <div className="absolute bottom-3 left-3">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                    <circle cx="30" cy="30" r="20" stroke="#EC4899" strokeWidth="1"/>
                    <circle cx="30" cy="30" r="15" stroke="#EC4899" strokeWidth="0.5"/>
                    <circle cx="30" cy="30" r="25" stroke="#EC4899" strokeWidth="0.5"/>
                  </svg>
                </div>
              </div>
              
              {/* Right panel - Code example */}
              <div className="bg-zinc-900 p-6 font-mono text-sm">
                <div className="flex items-center justify-between mb-3 text-xs text-zinc-500">
                  <div>api_example.js</div>
                  <div className="flex items-center">
                    <span className="px-1.5 py-0.5 bg-zinc-800 rounded mr-2">JavaScript</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16H6C5.46957 16 4.96086 15.7893 4.58579 15.4142C4.21071 15.0391 4 14.5304 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V8" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14H18C19.1046 14 20 14.8954 20 16V18C20 19.1046 19.1046 20 18 20H10C8.89543 20 8 19.1046 8 18V16C8 14.8954 8.89543 14 10 14Z" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <div className="bg-zinc-950 rounded p-4 text-green-400 overflow-x-auto">
                  <div className="text-zinc-500">// Authentication</div>
                  <div className="mt-2">const API_KEY = <span className="text-yellow-300">"YOUR_API_KEY"</span>;</div>
                  <br/>
                  <div className="text-zinc-500">// Post to multiple platforms</div>
                  <div>async <span className="text-pink-400">function</span> <span className="text-blue-400">postToAllPlatforms</span>() {'{'}</div>
                  <div className="ml-4">const response = await fetch(<span className="text-yellow-300">'https://api.example.com/v1/publish'</span>, {'{'}</div>
                  <div className="ml-8">method: <span className="text-yellow-300">'POST'</span>,</div>
                  <div className="ml-8">headers: {'{'}</div>
                  <div className="ml-12"><span className="text-cyan-300">'Authorization'</span>: <span className="text-yellow-300">`Bearer ${'{'}API_KEY{'}'}`</span>,</div>
                  <div className="ml-12"><span className="text-cyan-300">'Content-Type'</span>: <span className="text-yellow-300">'application/json'</span></div>
                  <div className="ml-8">{'}'},</div>
                  <div className="ml-8">body: <span className="text-blue-400">JSON.stringify</span>({'{'}</div>
                  <div className="ml-12">content: <span className="text-yellow-300">"Check out our new product!"</span>,</div>
                  <div className="ml-12">media: [<span className="text-yellow-300">"https://example.com/image.jpg"</span>],</div>
                  <div className="ml-12">platforms: [<span className="text-yellow-300">"instagram"</span>, <span className="text-yellow-300">"twitter"</span>, <span className="text-yellow-300">"tiktok"</span>],</div>
                  <div className="ml-12">scheduledFor: <span className="text-yellow-300">"2023-10-15T10:00:00Z"</span></div>
                  <div className="ml-8">{'}'})</div>
                  <div className="ml-4">{'}'})</div>
                  <br/>
                  <div className="ml-4">return response.<span className="text-blue-400">json</span>();</div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staggered CTA */}
        <div className="mt-20 max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-pink-600/20 rounded-xl blur-xl transform rotate-3"></div>
          
          <div className="relative bg-black border border-zinc-800 rounded-xl p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-600/10 to-pink-600/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 text-sm mb-4">
                  <svg className="w-3.5 h-3.5 mr-1.5 text-pink-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 12L10 8V16L16 12Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Let's Get Connected
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Start integrating<br/>your tools today
                </h3>
                
                <p className="text-zinc-400 mb-6">
                  Connect all your favorite tools and create a seamless workflow in minutes. No coding required.
                </p>
                
                <button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-pink-900/20 transition-all duration-300">
                  Start Free Integration
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="relative">
                {/* Integration stats with Y2K-inspired design */}
                <div className="transform -rotate-2">
                  <div className="bg-zinc-800/80 border-2 border-zinc-700 backdrop-blur-sm rounded-lg p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-zinc-300 font-medium">Integration Stats</div>
                      <div className="text-xs text-zinc-500 font-mono">ACTIVE</div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { label: "Connected Apps", value: "12", icon: "📱" },
                        { label: "Automations", value: "24", icon: "⚡" },
                        { label: "Weekly Posts", value: "38", icon: "📊" }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md flex items-center justify-center bg-black">{stat.icon}</div>
                            <span className="text-zinc-400">{stat.label}</span>
                          </div>
                          <div className="text-xl font-bold text-white">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-zinc-700/50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span className="text-xs text-green-400">All systems operational</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative stickers */}
                <div className="absolute -top-4 -right-4 transform rotate-12 z-10">
                  <div className="bg-pink-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider shadow-lg">New!</div>
                </div>
                
                <div className="absolute -bottom-2 -left-2 transform -rotate-6 z-10">
                  <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded shadow-lg">
                    100% No-code
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update the StickyScroll component
const StickyScroll = ({ content }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Enhanced intersection observer with better center detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const viewHeight = window.innerHeight;
            const centerPoint = viewHeight / 2;
            
            // Check if element is in center of viewport
            if (rect.top <= centerPoint && rect.bottom >= centerPoint) {
              setActiveIndex(parseInt(entry.target.dataset.index));
            }
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-45% 0px -45% 0px" // Narrows the detection area to center
      }
    );

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <VideoEditorPreview 
              isActive={true}
              content={content[activeIndex]?.content}
              activeStep={activeIndex}
            />
          </motion.div>

          <div className="space-y-32"> {/* Increased spacing for better scroll detection */}
            {content.map((item, index) => (
              <div
                key={index}
                data-index={index}
                className={`scroll-section transition-all duration-500`}
              >
                <motion.div
                  initial={{ opacity: 0.3, y: 20 }}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0.3,
                    y: activeIndex === index ? 0 : 20
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-8 h-8 rounded-full transition-colors duration-500 ${
                        activeIndex === index ? 'bg-primary/20' : 'bg-primary/5'
                      } flex items-center justify-center`}>
                        <span className={`text-lg font-bold transition-colors duration-500 ${
                          activeIndex === index ? 'text-primary' : 'text-primary/40'
                        }`}>{index + 1}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-foreground/70 mb-4">{item.description}</p>
                      
                      {/* Points appear when section is active */}
                      <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: activeIndex === index ? 1 : 0,
                          y: activeIndex === index ? 0 : 10
                        }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {[
                          "Professional-grade editing tools",
                          "Advanced color correction",
                          "Custom motion graphics",
                          "High-quality audio mixing"
                        ].map((point, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-2"
                          >
                            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            </div>
                            <span className="text-sm text-foreground/70">{point}</span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Enhanced with modern UI */}
        <div className="hidden md:flex gap-16 max-w-8xl mx-auto">
          <div className="w-1/2 py-16">
            <div className="space-y-32">
              {content.map((item, index) => (
                <motion.div
                  key={index}
                  data-index={index}
                  initial={{ opacity: 0.7, x: -20 }}
                  whileInView={{ 
                    opacity: activeIndex === index ? 1 : 0.5,
                    x: 0 
                  }}
                  transition={{ duration: 0.5 }}
                  className={`scroll-section group cursor-pointer`}
                >
                  <div className="flex gap-8">
                    {/* Enhanced number indicator */}
                    <div className="flex-shrink-0 relative">
                      <motion.div 
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br transition-all duration-500 ${
                          activeIndex === index 
                            ? 'from-primary/30 to-primary/10 shadow-lg shadow-primary/20' 
                            : 'from-primary/10 to-transparent'
                        } flex items-center justify-center`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className={`text-2xl font-bold transition-colors duration-500 ${
                          activeIndex === index ? 'text-primary' : 'text-primary/40'
                        }`}>{index + 1}</span>
                      </motion.div>
                      
                      {/* Connecting line */}
                      {index !== content.length - 1 && (
                        <div className={`absolute top-14 left-1/2 w-0.5 h-28 transition-colors duration-500 ${
                          activeIndex === index ? 'bg-primary/30' : 'bg-primary/10'
                        }`} />
                      )}
                    </div>

                    {/* Content section with enhanced styling */}
                    <div className="flex-1">
                      <motion.h3 
                        className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                          activeIndex === index ? 'text-foreground' : 'text-foreground/50'
                        }`}
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {item.title}
                      </motion.h3>

                      <motion.p 
                        className={`text-lg mb-6 transition-colors duration-300 ${
                          activeIndex === index ? 'text-foreground/70' : 'text-foreground/40'
                        }`}
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {item.description}
                      </motion.p>
                      
                      {/* Enhanced feature points */}
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {[
                          "Professional-grade editing tools",
                          "Advanced color correction",
                          "Custom motion graphics",
                          "High-quality audio mixing"
                        ].map((point, i) => (
                          <motion.div 
                            key={i}
                            className="flex items-center gap-4"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ 
                              x: activeIndex === index ? 0 : -10,
                              opacity: activeIndex === index ? 1 : 0.5
                            }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className={`flex items-center justify-center w-6 h-6 rounded-lg transition-colors duration-300 ${
                              activeIndex === index ? 'bg-primary/20' : 'bg-primary/10'
                            }`}>
                              <div className={`w-2.5 h-2.5 rounded-sm transition-colors duration-300 ${
                                activeIndex === index ? 'bg-primary rotate-45' : 'bg-primary/40'
                              }`} />
                            </div>
                            <span className={`text-base transition-colors duration-300 ${
                              activeIndex === index ? 'text-foreground/90' : 'text-foreground/50'
                            }`}>
                              {point}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Hover effect indicator */}
                      <motion.div
                        className={`mt-8 h-0.5 bg-gradient-to-r from-primary/30 to-transparent transition-opacity duration-300 ${
                          activeIndex === index ? 'opacity-100' : 'opacity-0'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ 
                          scaleX: activeIndex === index ? 1 : 0 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Preview section */}
          <div className="w-1/2 sticky top-24 h-[80vh]">
            <VideoEditorPreview 
              isActive={true}
              content={content[activeIndex]?.content}
              activeStep={activeIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Project Briefing",
    description: "We discuss your vision, goals, timeline and specific requirements for the project.",
    icon: <Users className="w-6 h-6" />
  },
  {
    number: "02",
    title: "Content Review",
    description: "Our editors review your footage to determine the best approach for your project.",
    icon: <Folders className="w-6 h-6" />
  },
  {
    number: "03",
    title: "Initial Draft",
    description: "We create a first cut with basic editing, timing, and sequencing for your review.",
    icon: <Film className="w-6 h-6" />
  },
  {
    number: "04",
    title: "Refinement",
    description: "Based on your feedback, we refine the edit with color grading and effects.",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    number: "05",
    title: "Final Delivery",
    description: "After final approval, we deliver your video in any format you require.",
    icon: <CheckCircle2 className="w-6 h-6" />
  }
];

function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        {/* Hero Section - Enhanced with video background and mobile responsiveness */}
        <section className="relative min-h-[80vh] md:h-screen flex items-center justify-center overflow-hidden bg-black text-white" aria-labelledby="hero-heading">
          {/* Video Background */}
          <FadeVideo />

          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/10 to-blue-500/10" />
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-16 md:py-0">
            {/* Eyebrow Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 md:mb-8"
            >
              <div className="bg-primary/20 text-white px-4 md:px-6 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-primary/20">
                Professional Video Editing Studio
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight"
            >
              Transform Your <AuroraText>Vision</AuroraText>
                  <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
    
    </h1>
{" "}
              <span className="block mt-1 md:mt-2">Into <AuroraText>Reality</AuroraText></span>
            </motion.h1>
            
 <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto mb-10 md:mb-16 font-light"
            >
              Transforming raw footage into compelling visual stories that 
              <span className="font-medium text-white"> captivate audiences</span> and 
              <span className="font-medium text-white"> deliver results</span>
            </motion.p>
            
            {/* Enhanced CTA buttons with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10 md:mb-16"
            >
              {/* Primary CTA with animated play icon */}
              <button className="group relative overflow-hidden rounded-full bg-primary text-white px-8 md:px-10 py-3.5 md:py-4.5 w-full sm:w-auto flex items-center justify-center gap-3 font-medium transition-all border border-primary/50 hover:bg-primary/90 hover:scale-[0.98]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary ml-0.5" />
                </div>
                <span className="text-base md:text-lg">Watch Showreel</span>
              </button>
              
              {/* Secondary CTA with hover effect */}
              <button className="group relative overflow-hidden rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-8 md:px-10 py-3.5 md:py-4.5 w-full sm:w-auto text-white font-medium transition-all hover:bg-white/10 hover:scale-[0.98]">
                <span className="text-base md:text-lg">Start Project</span>
                <ChevronRight className="w-5 h-5 opacity-70 ml-2 inline-block" />
              </button>
            </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12"
                  >
                    {CERTIFICATIONS.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-white bg-black/30 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/10 hover:border-primary/20 transition-colors"
                    >
                      <div className="text-white">{
                      React.cloneElement(cert.icon, { 
                        className: 'w-4 h-4 md:w-6 md:h-6 text-white' 
                      })
                      }</div>
                      <span>{cert.name}</span>
                    </motion.div>
                    ))}
                  </motion.div>


                      <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-white"
                      >
                      {[
                      { icon: <CheckCircle2 className="text-white" />, text: "24/7 Support" },
                      { icon: <Shield className="text-white" />, text: "Secure Platform" },
                      { icon: <Zap className="text-white" />, text: "Fast Delivery" }
                      ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-1 md:gap-2">
                        <div className="w-4 h-4 md:w-5 md:h-5 text-white">{feature.icon}</div>
                        <span>{feature.text}</span>
                      </div>
                      ))}
                      </motion.div>
                      </div>
                    </section>


                    {/* Client Logos Section - Improved with better mobile responsiveness */}
        <section className="py-5 md:py-8 px-4 bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10 border-y border-secondary/20" aria-labelledby="partnerships-heading">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-6 md:mb-10"
            >
              <h2 id="partnerships-heading" className="text-primary/80 text-xs md:text-sm font-medium uppercase tracking-wider">Trusted By Leading Content Creators</h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10 items-center">
              {COMPANY_LOGOS.map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <img src={logo} alt={`Content client ${index + 1}`} className="h-8 md:h-12 opacity-60 hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Services Section - Updated for mobile */}
        <section className="relative py-8 md:py-12 px-4 overflow-hidden" aria-labelledby="services-heading">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
            
            {/* Pattern Background - Matching Trusted By section style */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10" />
            
            {/* Border Elements */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
          </div>

          {/* Original Content */}
          <div className="relative max-w-7xl mx-auto">
            <SectionHeading 
              eyebrow="What We Do" 
              title="Video Editing Services" 
              subtitle="Professional editing solutions that transform raw footage into compelling visual stories across all media platforms"
              center={true} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {SERVICES.map((service, index) => (
                <div
                  key={index}
                  className="p-6 md:p-8 rounded-2xl bg-secondary/30 backdrop-blur border border-secondary hover:border-primary/30 transition-colors group"
                >
                  <div className="mb-4 md:mb-6 p-3 md:p-4 bg-primary/10 inline-block rounded-xl group-hover:bg-primary/20 transition-colors">
                    {React.cloneElement(service.icon, { 
                      className: 'w-8 h-8 md:w-10 md:h-10 text-primary' 
                    })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">{service.title}</h3>
                  <p className="text-sm md:text-base text-foreground/70">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Enhanced with better structure and mobile responsiveness */}
        <section className="py-8 md:py-12" aria-labelledby="why-choose-us">
          <SectionHeading 
            eyebrow="Our Advantage" 
            title="Why Choose Our Editing Services" 
            subtitle="Experience the difference of professional video editing backed by expertise and cutting-edge technology"
            center={true} 
          />
          <StickyScroll content={WHY_CHOOSE_US_CONTENT} />
        </section>

        <section className="py-8 md:py-12 relative overflow-hidden" aria-labelledby="workflow-heading">
  {/* Improved film background texture */}
  <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
  
  {/* Film reel decorative elements with better visual style */}
  <div className="absolute inset-0 pointer-events-none">
    {/* Film sprocket holes on sides - enhanced for desktop */}
    <div className="hidden md:block">
      <div className="absolute left-6 top-32 bottom-32 w-6">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={`left-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02, duration: 0.3, type: "spring" }}
            className="w-6 h-6 rounded-full border-2 border-primary/40 my-8 bg-background/80 shadow-inner"
          />
        ))}
      </div>
      <div className="absolute right-6 top-32 bottom-32 w-6">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={`right-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02, duration: 0.3, type: "spring" }}
            className="w-6 h-6 rounded-full border-2 border-primary/40 my-8 bg-background/80 shadow-inner"
          />
        ))}
      </div>
    </div>
    
    {/* Film strip edges */}
    <div className="absolute left-20 top-0 bottom-0 w-1 bg-gradient-to-r from-primary/20 to-transparent hidden md:block"></div>
    <div className="absolute right-20 top-0 bottom-0 w-1 bg-gradient-to-l from-primary/20 to-transparent hidden md:block"></div>
  </div>
  
  <div className="relative max-w-7xl mx-auto px-4">
    <SectionHeading
      eyebrow="How We Work"
      title="Our Video Editing Process"
      subtitle="A streamlined workflow designed to transform your raw footage into perfectly edited content"
      center={true}
    />
    
    {/* Enhanced Film Strip - Desktop */}
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="hidden md:block mt-16 relative"
    >
      {/* Improved film strip background with gradient and grain texture */}
      <div className="absolute left-0 right-0 h-64 bg-gradient-to-r from-primary/5 via-secondary/20 to-primary/5 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.05]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.05),transparent_70%)]"></div>
      </div>
      
      {/* Enhanced top film sprocket holes with staggered animation */}
      <div className="absolute top-0 left-0 right-0 h-8 flex justify-between px-8">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`top-${i}`}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
            className="w-6 h-6 rounded-full bg-background border-2 border-primary/40 -mt-3 shadow-inner"
          />
        ))}
      </div>
      
      {/* Enhanced bottom film sprocket holes with staggered animation */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-between px-8">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
            className="w-6 h-6 rounded-full bg-background border-2 border-primary/40 -mb-3 shadow-inner"
          />
        ))}
      </div>
      
      {/* Enhanced film frames with sequential reveal */}
      <div className="flex justify-between py-8 px-10 gap-4">
        {WORKFLOW_STEPS.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="relative flex-1 bg-secondary/10 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden group"
          >
            {/* Film grain overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"></div>
            
            {/* Frame exposure light effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Enhanced frame number label */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-background px-3 py-1 rounded-full border border-primary/30 shadow-md">
              <span className="text-primary text-xs font-mono font-bold tracking-wider">{step.number}</span>
            </div>
            
            {/* Frame content with padding adjustment for better spacing */}
            <div className="p-6 pt-7 flex flex-col items-center h-full justify-between">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors">{step.description}</p>
              </div>
            </div>
            
            {/* Enhanced frame corner marks with better styling */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/40 group-hover:border-primary/60 transition-colors" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/40 group-hover:border-primary/60 transition-colors" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/40 group-hover:border-primary/60 transition-colors" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/40 group-hover:border-primary/60 transition-colors" />
            
            {/* Better framing connection with animated arrow */}
            {index < WORKFLOW_STEPS.length - 1 && (
              <motion.div 
                className="absolute top-1/2 -right-6 -translate-y-1/2"
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </motion.div>
            )}
            
            {/* Frame number on film strip */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary/60 bg-background px-1 rounded">
              FRAME {step.number}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    
    {/* Enhanced Vertical Film Strip - Mobile */}
    <div className="md:hidden mt-12">
      <div className="relative mx-auto w-full max-w-sm">
        {/* Enhanced left film sprocket holes */}
        <div className="absolute left-0 top-0 bottom-0 w-5 flex flex-col items-center">
          {WORKFLOW_STEPS.map((_, i) => (
            <React.Fragment key={`mobile-left-${i}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="w-4 h-4 rounded-full bg-background border border-primary/40 shadow-inner my-4" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.05, duration: 0.3 }}
                className="w-4 h-4 rounded-full bg-background border border-primary/40 shadow-inner my-4" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.3 }}
                className="w-4 h-4 rounded-full bg-background border border-primary/40 shadow-inner my-4" 
              />
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="h-20" />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Enhanced right film sprocket holes */}
        <div className="absolute right-0 top-0 bottom-0 w-5 flex flex-col items-center">
          {WORKFLOW_STEPS.map((_, i) => (
            <React.Fragment key={`mobile-right-${i}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="w-4 h-4 rounded-full bg-background border border-primary/40 shadow-inner my-4" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.05, duration: 0.3 }}
                className="w-4 h-4 rounded-full bg-background border border-primary/40 shadow-inner my-4" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.3 }}
                className="w-4 h-4 rounded-full bg-background border border-primary/40 shadow-inner my-4" 
              />
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="h-20" />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Enhanced vertical film strip with better film texture */}
        <div className="mx-8 bg-secondary/5 relative">
          <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
          
          {WORKFLOW_STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative mb-8 last:mb-0"
            >
              {/* Enhanced film frame with better styling */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-secondary/10 backdrop-blur-sm border border-primary/20 rounded-lg p-5 relative shadow-sm"
              >
                {/* Frame grain overlay */}
                <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
                
                {/* Enhanced frame number */}
                <div className="absolute -top-3 left-4 bg-background px-2 py-0.5 rounded-full border border-primary/30 shadow-sm">
                  <span className="text-primary text-xs font-mono font-bold tracking-wider">{step.number}</span>
                </div>
                
                {/* Enhanced content layout */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <div className="text-primary">{
                      React.cloneElement(step.icon, { className: 'w-6 h-6' })
                    }</div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-bold mb-2">{step.title}</h3>
                    <p className="text-xs text-foreground/70">{step.description}</p>
                  </div>
                </div>
                
                {/* Enhanced frame corner marks */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40" />
              </motion.div>
              
              {/* Enhanced film strip connection */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-primary/30 to-primary/10 mt-2"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Testimonials Section - Mobile responsive */}
        <section className="py-8 md:py-12 px-4 bg-gradient-to-b from-background to-secondary/5">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="Client Feedback"
              title="What Our Clients Say"
              subtitle="Real feedback from content creators and brands who trust us with their video editing needs"
              center={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-16">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 md:p-8 rounded-2xl bg-secondary/20 border border-secondary hover:border-primary/20 transition-colors group"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">{testimonial.author}</h3>
                      <p className="text-xs md:text-sm text-foreground/60">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-foreground/80 mb-4 md:mb-6">"{testimonial.quote}"</p>
                  <img 
                    src={testimonial.logo} 
                    alt={`${testimonial.author}'s company logo`}
                    className="h-8 opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default Home;