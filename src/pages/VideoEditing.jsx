"use client";
import React, { useEffect, useRef, useState } from "react";
import { 
  motion, useScroll, useTransform, useMotionValueEvent,
  useSpring, useAnimation, useInView 
} from "framer-motion";
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

function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        {/* Hero Section - Enhanced with video background and mobile responsiveness */}
        <section className="relative min-h-[80vh] md:h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-heading">
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
              <div className="bg-primary/20 text-primary px-4 md:px-6 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-primary/20">
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
              Transform Your <span className="text-primary">Vision</span>{" "}
              <span className="block mt-1 md:mt-2">Into Reality</span>
            </motion.h1>
            
            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto mb-8 md:mb-12"
            >
              Transforming raw footage into compelling visual stories that captivate audiences
            </motion.p>
            
            {/* Primary CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-12"
            >
              <button className="group relative overflow-hidden rounded-full bg-primary px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto flex items-center justify-center gap-2 text-white font-medium transition-all hover:bg-primary/90 hover:scale-95">
                <Play className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110" />
                <span>Watch Showreel</span>
              </button>
              
              <button className="group relative overflow-hidden rounded-full border-2 border-white/20 px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto text-white font-medium transition-all hover:bg-white/5 hover:scale-95">
                <span>Start Project</span>
              </button>
            </motion.div>

            {/* Certification Badges - Mobile Responsive */}
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
                  className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-white/80 bg-black/30 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/10 hover:border-primary/20 transition-colors"
                >
                  <div className="text-primary">{
                    React.cloneElement(cert.icon, { 
                      className: 'w-4 h-4 md:w-6 md:h-6' 
                    })
                  }</div>
                  <span>{cert.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Feature Highlights - Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-white/60"
            >
              {[
                { icon: <CheckCircle2 />, text: "24/7 Support" },
                { icon: <Shield />, text: "Secure Platform" },
                { icon: <Zap />, text: "Fast Delivery" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-1 md:gap-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 text-primary">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Client Logos Section - Improved with better mobile responsiveness */}
        <section className="py-10 md:py-16 px-4 bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10 border-y border-secondary/20" aria-labelledby="partnerships-heading">
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
        <section className="relative py-16 md:py-24 px-4 overflow-hidden" aria-labelledby="services-heading">
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
        <section className="py-16 md:py-24" aria-labelledby="why-choose-us">
          <SectionHeading 
            eyebrow="Our Advantage" 
            title="Why Choose Our Editing Services" 
            subtitle="Experience the difference of professional video editing backed by expertise and cutting-edge technology"
            center={true} 
          />
          <StickyScroll content={WHY_CHOOSE_US_CONTENT} />
        </section>

        {/* Testimonials Section - Mobile responsive */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-secondary/5">
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