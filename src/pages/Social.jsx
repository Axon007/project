import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Instagram, Facebook, Twitter, Linkedin, TrendingUp, Target, Users, PieChart, BarChart2, Award, Star, MessageCircle, ThumbsUp, Sparkles, Zap, Hash, Music, Film, Globe, TrendingDown, Flame, ShoppingBag, Headphones, BarChart4, Diamond, Rocket, Heart, Play, ChevronRight, Book, Bookmark, Share2, ArrowUpRight, Calendar, Clock, ThumbsDown, Send, Download, Gift, Shield } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useThemeContext } from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';

// Enhanced theme accent colors with better contrast
const THEME_ACCENT = {
  primary: "#8B5CF6", // Vibrant violet
  secondary: "#EC4899", // Hot pink
  tertiary: "#3B82F6", // Electric blue
  accent: "#10B981", // Neon green
  gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)",
  light: {
    primary: "#7C3AED",
    secondary: "#DB2777", 
    tertiary: "#2563EB",
    accent: "#059669"
  },
  dark: {
    primary: "#A78BFA",
    secondary: "#F472B6",
    tertiary: "#60A5FA", 
    accent: "#34D399"
  }
};

const SocialHeroSection = () => {
  const { theme, isDark } = useThemeContext();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate position as percentage
      const x = clientX / innerWidth;
      const y = clientY / innerHeight;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateTransform = (baseValue) => {
    const moveX = (mousePosition.x - 0.5) * baseValue;
    const moveY = (mousePosition.y - 0.5) * baseValue;
    return `translate(${moveX}px, ${moveY}px)`;
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-violet-950 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient blob - enhanced for better theme switching */}
        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-r from-violet-200/30 via-pink-200/30 to-blue-200/30 dark:from-violet-600/30 dark:via-pink-500/30 dark:to-blue-500/30 blur-3xl animate-blob hidden sm:block transition-colors duration-700"></div>
        <div className="absolute top-60 -left-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-r from-blue-200/30 via-emerald-200/30 to-violet-200/30 dark:from-blue-600/30 dark:via-emerald-500/30 dark:to-violet-500/30 blur-3xl animate-blob animation-delay-2000 hidden sm:block transition-colors duration-700"></div>
        <div className="absolute bottom-20 right-60 w-[35rem] h-[35rem] rounded-full bg-gradient-to-r from-pink-200/30 via-violet-200/30 to-blue-200/30 dark:from-pink-600/30 dark:via-violet-500/30 dark:to-blue-500/30 blur-3xl animate-blob animation-delay-4000 hidden sm:block transition-colors duration-700"></div>
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] transition-opacity duration-300"></div>

      {/* Interactive floating elements - hide on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <motion.div 
          className="absolute left-[35%] top-[20%]"
          style={{ transform: calculateTransform(-20) }}
        >
          <div className="relative w-16 h-16 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center rotate-12 transition-colors duration-300">
            <Instagram className="w-6 h-6 text-pink-500 dark:text-pink-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 dark:bg-pink-400 border-2 border-white dark:border-gray-800 transition-colors duration-300"></div>
          </div>
        </motion.div>
        <motion.div 
          className="absolute right-[25%] top-[30%]"
          style={{ transform: calculateTransform(-15) }}
        >
          <div className="relative w-14 h-14 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center -rotate-6 transition-colors duration-300">
            <Music className="w-5 h-5 text-violet-500 dark:text-violet-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-500 dark:bg-violet-400 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[8px] text-white font-bold transition-colors duration-300">3</div>
          </div>
        </motion.div>
        <motion.div 
          className="absolute left-[5%] bottom-[30%]"
          style={{ transform: calculateTransform(-25) }}
        >
          <div className="relative w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 p-3 transition-colors duration-300">
            <div className="w-full h-2 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full mb-3"></div>
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center transition-colors duration-300">
                <Heart className="w-4 h-4 text-violet-500 dark:text-violet-400" />
              </div>
              <div className="space-y-1">
                <div className="w-6 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full transition-colors duration-300"></div>
                <div className="w-4 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="absolute right-[20%] bottom-[20%]"
          style={{ transform: calculateTransform(-10) }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 shadow-xl flex items-center justify-center">
            <BarChart4 className="w-5 h-5 text-white" />
          </div>
        </motion.div>
        <motion.div 
          className="absolute right-[33%] top-[15%]"
          style={{ transform: calculateTransform(-30) }}
        >
          <div className="px-3 py-1.5 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-lg backdrop-blur-sm border border-violet-200 dark:border-violet-700/50 transition-colors duration-300">
            <span className="text-xs font-medium bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">+42.8% Growth</span>
          </div>
        </motion.div>
      </div>

      {/* Theme Toggle - positioned absolutely */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-xl" />
      </div>

      <div className="relative max-w-7xl mx-auto pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-medium border border-violet-200 dark:border-violet-500/30 transition-colors duration-300">
                #SocialMediaReimagined
              </div>
              <div className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 text-xs font-medium border border-pink-200 dark:border-pink-500/30 transition-colors duration-300">
                Gen Z Approved
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6 sm:mb-8">
              Transform Your <br />
              <div className="mt-2 relative inline-flex flex-col">
                <div className="flex items-center">
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>
                    Social Game
                  </span>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="ml-2 sm:ml-4 text-yellow-400 transform rotate-12"
                  >
                    <Sparkles size={28} className="fill-yellow-400 stroke-yellow-500 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="h-2 sm:h-3 bg-gradient-to-r from-violet-500 via-pink-500 to-blue-500 rounded-full mt-1 opacity-70"
                />
              </div>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-lg leading-relaxed transition-colors duration-300">
              We create scroll-stopping content and data-driven strategies that resonate with today's audience. No cap.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10">
              <button className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:from-violet-700 focus:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-violet-300/30 dark:shadow-violet-500/20 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                Start Your Journey
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium border border-violet-300 dark:border-violet-600 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 focus:bg-violet-50 dark:focus:bg-violet-900/20 transition-all duration-300 backdrop-blur-sm text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                View Our Work
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3 sm:-space-x-4">
                {[1, 2, 3, 4].map((num) => (
                  <div 
                    key={num}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden shadow-md transition-colors duration-300"
                  >
                    <img 
                      src={`https://randomuser.me/api/portraits/women/${num + 10}.jpg`}
                      alt={`Client ${num}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-violet-100 dark:bg-violet-800 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-violet-700 dark:text-violet-300 transition-colors duration-300">
                  +5K
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={12} className="text-yellow-400 fill-yellow-400 sm:w-3.5 sm:h-3.5" />
                  ))}
                  <span className="ml-1 text-xs sm:ml-1.5 sm:text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">4.9/5</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  From <span className="font-medium">200+</span> satisfied brands
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Phone display with mockup */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-500 to-pink-500 rounded-3xl blur-lg opacity-60 dark:opacity-80 animate-enhanced-pulse"></div>
              
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden transition-colors duration-300">
                {/* Phone mockup header */}
                <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="h-1.5 w-1/4 rounded-full bg-gray-200 dark:bg-gray-600 transition-colors duration-300"></div>
                  <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-600 transition-colors duration-300"></div>
                </div>
                
                {/* App mockup content */}
                <div className="p-4">
                  {/* Social feed mockup */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden transition-colors duration-300">
                    {/* App header */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center transition-colors duration-300">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                          <span className="text-sm text-white font-medium">V</span>
                        </div>
                                                  <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300">ViralConnect</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">@viralconnect</div>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-xs px-2 py-1 rounded-md bg-gradient-to-r from-violet-500 to-pink-500 text-white flex items-center gap-1">
                          <Flame size={10} className="fill-yellow-400 stroke-none" />
                          <span>Trending</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Post content */}
                    <div className="p-3">
                      <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-violet-500 to-pink-500 mb-3 relative">
                        <img 
                          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                          alt="Social media content" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <div className="text-sm font-medium mb-1">How We Boosted Engagement by 320%</div>
                          <div className="flex items-center text-xs">
                            <span>2.4M views</span>
                            <span className="mx-2">•</span>
                            <span>3 days ago</span>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs flex items-center gap-1">
                          <Zap size={10} className="text-yellow-400" />
                          <span>LIVE</span>
                        </div>
                      </div>
                      
                      {/* Post caption */}
                      <div className="mb-3 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        Our latest case study reveals the exact strategies we used for explosive growth across all platforms. #SocialStrategy #GrowthHacking 🚀
                      </div>
                      
                      {/* Hash tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {["ContentStrategy", "GenZ", "TikTokGrowth"].map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-violet-600 dark:text-violet-300 transition-colors duration-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Engagement stats */}
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
                        <div className="flex gap-5">
                          <div className="flex items-center gap-1">
                            <ThumbsUp size={16} className="text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                            <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">138K</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={16} className="text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                            <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">4.2K</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                          <TrendingUp size={12} className="mr-1" />
                          +328% Increase
                        </div>
                      </div>
                    </div>
                    
                    {/* App analytics section */}
                                  <div className="p-3 mx-3 mb-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-300">Campaign Performance</div>
                      
                      <div className="h-16 mb-3">
                        <div className="w-full h-full flex items-end gap-0.5">
                          {[30, 45, 25, 55, 70, 65, 85, 60, 75, 40, 45, 90].map((height, i) => (
                            <div 
                              key={i}
                              className="flex-1 bg-gradient-to-t from-violet-500 to-pink-500 rounded-t"
                              style={{ height: `${height}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        {[
                          { label: "Engagement", value: "18.7%", trend: "+42%" },
                          { label: "Followers", value: "85.3K", trend: "+12K" },
                          { label: "Conversion", value: "4.9%", trend: "+1.8%" }
                        ].map((stat, i) => (
                          <div key={i}>
                            <div className="font-semibold text-gray-900 dark:text-white">{stat.value}</div>
                            <div className="text-gray-500 dark:text-zinc-500 mb-0.5">{stat.label}</div>
                            <div className="text-emerald-600 dark:text-emerald-400">{stat.trend}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-lg rotate-6 transform hover:rotate-0 transition-transform duration-300 border border-gray-100 dark:border-zinc-700">
              <Instagram size={24} className="text-pink-500" />
            </div>
            <div className="absolute bottom-10 -left-8 p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-lg -rotate-6 transform hover:rotate-0 transition-transform duration-300 border border-gray-100 dark:border-zinc-700">
              <Music size={24} className="text-violet-500" />
            </div>
            <div className="absolute top-1/2 -right-6 p-3 bg-white dark:bg-zinc-800 rounded-lg shadow-lg rotate-12 transform hover:rotate-0 transition-transform duration-300 border border-gray-100 dark:border-zinc-700">
              <Hash size={20} className="text-blue-500" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-white dark:from-black to-transparent"></div>
    </div>
  );
};

const ServicesSection = () => {
  const { theme, isDark } = useThemeContext();
  const services = [
    {
      title: "Content That Slaps",
      description: "Eye-catching, authentic content that resonates with Gen Z and makes your audience hit that share button.",
      icon: <Flame className="w-7 h-7" />,
      color: "from-pink-600 to-rose-400",
      darkColor: "from-pink-500/80 to-rose-400/80",
      lightBg: "bg-pink-50",
      darkBg: "bg-pink-950/30",
      lightBorder: "border-pink-100",
      darkBorder: "border-pink-900/50",
      lightIcon: "text-pink-600",
      darkIcon: "text-pink-400"
    },
    {
      title: "Algorithm Hacking",
      description: "Master each platform's algorithm with our data-driven approach that maximizes reach and engagement.",
      icon: <Zap className="w-7 h-7" />,
      color: "from-amber-500 to-yellow-400",
      darkColor: "from-amber-500/80 to-yellow-400/80",
      lightBg: "bg-amber-50",
      darkBg: "bg-amber-950/30",
      lightBorder: "border-amber-100",
      darkBorder: "border-amber-900/50",
      lightIcon: "text-amber-600",
      darkIcon: "text-amber-400"
    },
    {
      title: "Viral Trend Forecasting",
      description: "Stay ahead of the curve with our real-time trend monitoring and quick response strategies.",
      icon: <TrendingUp className="w-7 h-7" />,
      color: "from-green-500 to-emerald-400",
      darkColor: "from-green-500/80 to-emerald-400/80",
      lightBg: "bg-green-50",
      darkBg: "bg-green-950/30",
      lightBorder: "border-green-100",
      darkBorder: "border-green-900/50",
      lightIcon: "text-emerald-600",
      darkIcon: "text-emerald-400"
    },
    {
      title: "Authentic Community",
      description: "Build a loyal brand community that Gen Z genuinely connects with through meaningful engagement.",
      icon: <Users className="w-7 h-7" />,
      color: "from-blue-600 to-sky-400",
      darkColor: "from-blue-600/80 to-sky-400/80",
      lightBg: "bg-blue-50",
      darkBg: "bg-blue-950/30",
      lightBorder: "border-blue-100",
      darkBorder: "border-blue-900/50",
      lightIcon: "text-blue-600",
      darkIcon: "text-blue-400"
    },
    {
      title: "Data-Driven Strategy",
      description: "Analytics that actually matter, focusing on engagement metrics that drive real business results.",
      icon: <BarChart4 className="w-7 h-7" />,
      color: "from-violet-600 to-indigo-400",
      darkColor: "from-violet-600/80 to-indigo-400/80",
      lightBg: "bg-violet-50",
      darkBg: "bg-violet-950/30",
      lightBorder: "border-violet-100",
      darkBorder: "border-violet-900/50",
      lightIcon: "text-violet-600",
      darkIcon: "text-violet-400"
    },
    {
      title: "Creator Collaborations",
      description: "Partner with authentic creators who align with your brand values and resonate with your target audience.",
      icon: <Diamond className="w-7 h-7" />,
      color: "from-purple-600 to-fuchsia-400",
      darkColor: "from-purple-600/80 to-fuchsia-400/80",
      lightBg: "bg-purple-50",
      darkBg: "bg-purple-950/30",
      lightBorder: "border-purple-100",
      darkBorder: "border-purple-900/50",
      lightIcon: "text-purple-600",
      darkIcon: "text-purple-400"
    },
  ];

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-40 w-96 h-96 rounded-full bg-violet-100 dark:bg-violet-900/15 blur-3xl transition-colors duration-700"></div>
        <div className="absolute right-20 bottom-20 w-80 h-80 rounded-full bg-pink-100 dark:bg-pink-900/15 blur-3xl transition-colors duration-700"></div>
      </div>
      
      {/* Section heading */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/30 rounded-full border border-violet-200 dark:border-violet-700/50"
        >
          Our Services
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          Social Services That <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>Hit Different</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-zinc-300"
        >
          Fresh strategies for a generation that craves authenticity and innovation
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:h-[2px]"></div>
              
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 group-hover:shadow-xl">
                {/* Service icon */}
                <div className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center ${service.lightBg} dark:${service.darkBg} ${service.lightBorder} dark:${service.darkBorder} border-2`}>
                  <div className={`${service.lightIcon} dark:${service.darkIcon}`}>
                    {service.icon}
                  </div>
                </div>
                
                {/* Service gradient line */}
                <div className="w-12 h-1.5 rounded-full mb-4 bg-gradient-to-r opacity-80" style={{ backgroundImage: `linear-gradient(to right, ${service.color.replace('from-', '').replace('to-', '')})` }}></div>
                
                {/* Service title */}
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-transparent bg-clip-text transition-all duration-300"
                  style={{ backgroundImage: `linear-gradient(to right, ${service.color.replace('from-', '').replace('to-', '')})` }}>
                  {service.title}
                </h3>
                
                {/* Service description */}
                <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">
                  {service.description}
                </p>
                
                {/* Learn more link */}
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <a href="#" 
                    className={`inline-flex items-center text-sm font-medium ${service.lightIcon} dark:${service.darkIcon} hover:underline transition-colors duration-300`}
                  >
                    See how we do it
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Featured service callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 rounded-3xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-pink-600/20 dark:from-violet-600/8 dark:to-pink-600/8 transition-colors duration-300"></div>
          <div className="absolute inset-0 backdrop-blur-3xl"></div>
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 transition-colors duration-300"></div>
          
          <div className="relative flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="rounded-2xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-xl transition-colors duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  alt="Social strategy" 
                  className="w-full h-auto aspect-[4/3] object-cover" 
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800/30">
                Featured Service
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Our <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>Cross-Platform Growth</span> Strategy
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                We combine platform-specific optimization with cohesive brand storytelling to create a powerful social presence that resonates across all channels.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {["TikTok", "Instagram", "YouTube", "Twitter", "LinkedIn"].map((platform, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg text-sm bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    {platform}
                  </span>
                ))}
              </div>
              
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 text-white font-medium hover:from-violet-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2">
                Learn about our approach
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// REDESIGNED PLATFORM MASTERY SECTION
const PlatformsSection = () => {
  const { theme, isDark } = useThemeContext();
  const [activePlatform, setActivePlatform] = useState('TikTok');
  
  const platforms = {
    TikTok: {
      name: "TikTok",
      icon: <Music className="w-7 h-7" />,
      color: "#25F4EE",
      secondaryColor: "#FE2C55",
      features: [
        "Short-form video content strategy",
        "Trending audio and hashtag research",
        "Creator collaborations",
        "Viral challenge creation",
        "Community engagement tactics"
      ],
      stats: {
        users: "1B+",
        engagement: "High",
        demographics: "Gen Z & Millennials",
        growth: "+45%"
      },
      image: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800"
    },
    Instagram: {
      name: "Instagram",
      icon: <Instagram className="w-7 h-7" />,
      color: "#C13584",
      secondaryColor: "#FCAF45",
      features: [
        "Content for Feed, Stories, Reels & IGTV",
        "Visual identity development",
        "Influencer marketing campaigns",
        "Shopping integration",
        "Community growth strategies"
      ],
      stats: {
        users: "2B+",
        engagement: "Medium-High",
        demographics: "18-34 year olds",
        growth: "+20%"
      },
      image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800"
    },
    YouTube: {
      name: "YouTube",
      icon: <Film className="w-7 h-7" />,
      color: "#FF0000",
      secondaryColor: "#282828",
      features: [
        "Long-form video content planning",
        "Channel optimization",
        "SEO and keyword strategy",
        "Video production & editing",
        "Community tab engagement"
      ],
      stats: {
        users: "2.5B+",
        engagement: "Medium",
        demographics: "All ages",
        growth: "+15%"
      },
      image: "https://images.unsplash.com/photo-1610295388717-4c5abf34ccf1?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800"
    },
    Twitter: {
      name: "Twitter",
      icon: <Twitter className="w-7 h-7" />,
      color: "#1DA1F2",
      secondaryColor: "#14171A",
      features: [
        "Trend monitoring & newsjacking",
        "Thread creation strategy",
        "Community building",
        "Brand voice development",
        "Real-time customer engagement"
      ],
      stats: {
        users: "450M+",
        engagement: "Fast-paced",
        demographics: "25-49 year olds",
        growth: "+16%"
      },
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800"
    }
  };

  const currentPlatform = platforms[activePlatform];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 relative overflow-hidden transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-40 w-[30rem] h-[30rem] rounded-full bg-gray-200/50 dark:bg-gray-800/15 blur-3xl transition-colors duration-700"></div>
        <div className="absolute bottom-20 -left-40 w-[30rem] h-[30rem] rounded-full bg-gray-200/50 dark:bg-gray-800/15 blur-3xl transition-colors duration-700"></div>
      </div>
      
      {/* Section heading */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-900/30 rounded-full border border-pink-200 dark:border-pink-700/50 transition-colors duration-300"
        >
          Platform Mastery
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          Dominate <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>Every Platform</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-zinc-300"
        >
          Custom strategies tailored to each platform's unique algorithm and audience behavior
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Platform selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {Object.keys(platforms).map((platform) => (
            <button
              key={platform}
              onClick={() => setActivePlatform(platform)}
              className={`relative px-5 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                activePlatform === platform 
                  ? 'bg-white dark:bg-zinc-800 shadow-lg border-2 border-transparent' 
                  : 'bg-gray-100 dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 opacity-70 hover:opacity-100'
              }`}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: `${activePlatform === platform ? platforms[platform].color : '#d1d5db'}30` }}
              >
                <div className="text-gray-700 dark:text-gray-300" style={{
                  color: activePlatform === platform ? platforms[platform].color : undefined
                }}>
                  {platforms[platform].icon}
                </div>
              </div>
              <span className={`font-medium ${
                activePlatform === platform 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {platforms[platform].name}
              </span>
              {activePlatform === platform && (
                <motion.div 
                  layoutId="platformIndicator"
                  className="absolute -bottom-1 left-3 right-3 h-0.5" 
                  style={{ background: `linear-gradient(to right, ${currentPlatform.color}, ${currentPlatform.secondaryColor})` }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Platform details */}
        <motion.div
          key={activePlatform}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Platform image - 2 columns */}
          <div className="lg:col-span-2 overflow-hidden rounded-2xl">
            <div className="relative h-full min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br" style={{
                background: `linear-gradient(to bottom right, ${currentPlatform.color}80, ${currentPlatform.secondaryColor}80)`
              }}></div>
              <img 
                src={currentPlatform.image}
                alt={`${currentPlatform.name} marketing`}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    {currentPlatform.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{currentPlatform.name} Strategy</h3>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-white text-gray-900 font-medium flex items-center gap-1.5">
                    <Play size={16} /> Watch Demo
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-white/20 text-white flex items-center gap-1.5 backdrop-blur-sm">
                    Learn More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Platform features and stats - 3 columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strategy features - 2 columns */}
            <div className="md:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-lg">
              <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 mb-6">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">Strategic Approach</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">How we help you succeed on {currentPlatform.name}</p>
              </div>
              
              <ul className="space-y-4">
                {currentPlatform.features.map((feature, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ 
                      background: `linear-gradient(to bottom right, ${currentPlatform.color}, ${currentPlatform.secondaryColor})`
                    }}>
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <button className="w-full py-2.5 rounded-xl font-medium text-white flex items-center justify-center gap-1.5" style={{ 
                  background: `linear-gradient(to right, ${currentPlatform.color}, ${currentPlatform.secondaryColor})`
                }}>
                  See our {currentPlatform.name} case studies <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Platform stats - 1 column */}
            <div className="flex flex-col gap-6">
              {/* Platform stats */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-lg">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Platform Stats</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-zinc-500 mb-1">Monthly Active Users</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{currentPlatform.stats.users}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 dark:text-zinc-500 mb-1">Engagement Rate</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{currentPlatform.stats.engagement}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 dark:text-zinc-500 mb-1">Core Demographics</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{currentPlatform.stats.demographics}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 dark:text-zinc-500 mb-1">YOY Growth</div>
                    <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                      <TrendingUp size={18} className="mr-1" /> {currentPlatform.stats.growth}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Platform resources */}
              <div className="bg-gradient-to-br rounded-2xl p-1" style={{
                background: `linear-gradient(to bottom right, ${currentPlatform.color}50, ${currentPlatform.secondaryColor}50)`
              }}>
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-5">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">Free Resources</h3>
                  
                  <div className="space-y-3 text-sm">
                    <a href="#" className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 group transition-colors">
                      <div className="flex items-center gap-2">
                        <Book size={16} className="text-gray-500 dark:text-zinc-400" />
                        <span className="text-gray-900 dark:text-white">Ultimate {currentPlatform.name} Guide</span>
                      </div>
                      <Download size={14} className="text-gray-400 dark:text-zinc-500 group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors" />
                    </a>
                    
                    <a href="#" className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 group transition-colors">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500 dark:text-zinc-400" />
                        <span className="text-gray-900 dark:text-white">{currentPlatform.name} Content Calendar</span>
                      </div>
                      <Download size={14} className="text-gray-400 dark:text-zinc-500 group-hover:text-gray-700 dark:group-hover:text-zinc-300 transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// NEW SECTION: CASE STUDIES SHOWCASE
const CaseStudiesSection = () => {
  const { theme, isDark } = useThemeContext();
  const caseStudies = [
    {
      title: "320% Follower Growth for Fashion Brand",
      category: "Fashion & Lifestyle",
      description: "How we helped a DTC fashion brand go viral on TikTok and Instagram with authentic content.",
      metrics: [
        { label: "Follower Growth", value: "+320%", icon: <Users size={16} /> },
        { label: "Engagement Rate", value: "8.7%", icon: <ThumbsUp size={16} /> },
        { label: "Sales Increase", value: "+43%", icon: <ShoppingBag size={16} /> }
      ],
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      title: "5M+ Views for Music Launch Campaign",
      category: "Entertainment",
      description: "Strategic content placement and influencer partnerships for a record-breaking music release.",
      metrics: [
        { label: "Total Views", value: "5.2M", icon: <Play size={16} /> },
        { label: "Stream Increase", value: "+210%", icon: <Music size={16} /> },
        { label: "Social Mentions", value: "21.5K", icon: <MessageCircle size={16} /> }
      ],
      image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "52% Conversion Boost for SaaS Platform",
      category: "Technology",
      description: "Educational content strategy that positioned our client as the thought leader in their industry.",
      metrics: [
        { label: "Conversion Rate", value: "+52%", icon: <TrendingUp size={16} /> },
        { label: "Audience Growth", value: "+78K", icon: <Users size={16} /> },
        { label: "Engagement", value: "4.3%", icon: <ThumbsUp size={16} /> }
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-72 h-72 bg-gradient-to-br from-violet-100 to-transparent dark:from-violet-900/20 dark:to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-0 w-72 h-72 bg-gradient-to-br from-pink-100 to-transparent dark:from-pink-900/20 dark:to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700/50"
          >
            Success Stories
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Brands That Went <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>Viral</span> With Us
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-zinc-300"
          >
            Real results for real brands across various industries
          </motion.p>
        </div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-800 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                {/* Case study image */}
                <div className="relative h-56">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-80" style={{ 
                    background: `linear-gradient(to bottom right, ${study.gradient.replace('from-', '').replace('to-', '')})` 
                  }}></div>
                  <img 
                    src={study.image}
                    alt={study.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Category tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                    {study.category}
                  </div>
                  
                  {/* Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                  </div>
                </div>
                
                {/* Case study content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-zinc-400 mb-6">
                    {study.description}
                  </p>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {study.metrics.map((metric, i) => (
                      <div key={i} className="flex flex-col items-center bg-gray-50 dark:bg-zinc-800 rounded-lg p-3">
                        <div className="mb-1 text-gray-500 dark:text-zinc-500">
                          {metric.icon}
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white">{metric.value}</div>
                        <div className="text-xs text-gray-500 dark:text-zinc-500 text-center">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action button */}
                  <a href="#" className="flex items-center justify-between w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                    <span>Read Case Study</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WorkflowSection = () => {
  const { theme, isDark } = useThemeContext();
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    {
      number: 1,
      title: "Vibe Check & Strategy",
      description: "We analyze your brand, audience, and competitors to develop a tailored social strategy that resonates.",
      details: [
        "Brand identity mapping",
        "Audience deep dive",
        "Competitive analysis",
        "Platform selection",
        "Content pillars creation"
      ],
      icon: <Target />
    },
    {
      number: 2,
      title: "Content Creation",
      description: "Our creative team crafts scroll-stopping content that speaks Gen Z's language and drives engagement.",
      details: [
        "Trend-based content",
        "Native platform formats",
        "Authentic storytelling",
        "UGC-style production",
        "Real-time reactive content"
      ],
      icon: <Sparkles />
    },
    {
      number: 3,
      title: "Community Building",
      description: "We engage with your audience to build a loyal community that advocates for your brand.",
      details: [
        "Conversation management",
        "Direct messaging strategy",
        "Comment engagement",
        "User content resharing",
        "Community challenges"
      ],
      icon: <Users />
    },
    {
      number: 4,
      title: "Optimize & Scale",
      description: "We analyze performance data to continuously refine strategies and scale your social presence.",
      details: [
        "Engagement analysis",
        "Content performance testing",
        "Trend opportunity identification",
        "Growth pattern recognition",
        "ROI measurement"
      ],
      icon: <TrendingUp />
    }
  ];

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-violet-100 dark:bg-violet-900/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50"></div>
      </div>
      
      {/* Section heading */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800/30">
          Our Process
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          How We Make You <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>Main Character Energy</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-zinc-300">
          Our four-step approach to making your brand the moment
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Step selector */}
          <div className="order-2 lg:order-1">
            <div className="space-y-4">
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: step.number * 0.1 }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeStep === step.number
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white dark:from-violet-500 dark:to-blue-500"
                      : "bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800"
                  }`}
                  onClick={() => setActiveStep(step.number)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                      activeStep === step.number
                        ? "bg-white text-violet-600"
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white"
                    }`}>
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">
                        {step.title}
                      </h3>
                      <p className={`text-sm ${activeStep !== step.number ? "text-gray-600 dark:text-zinc-400" : ""}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Step details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <div className="relative h-full">
              <div className="relative bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200 dark:border-zinc-800 h-full shadow-lg">
                <div className="absolute top-0 right-0 opacity-10">
                  {steps[activeStep-1].icon && (
                    <div className="text-[200px] text-gray-900/10 dark:text-white/10">
                      {steps[activeStep-1].icon}
                    </div>
                  )}
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center mb-6 px-3 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700/50">
                    Phase {steps[activeStep-1].number}
                  </div>

                  <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                    {steps[activeStep-1].title}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">What We Do</h3>
                      <ul className="space-y-4">
                        {steps[activeStep-1].details.map((detail, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                              <Check size={16} className="text-violet-600 dark:text-violet-400" />
                            </div>
                            <span className="text-gray-700 dark:text-zinc-300">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-gray-200 dark:border-zinc-700/50">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-medium text-gray-900 dark:text-white">What You Get</h4>
                        <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                          Deliverables
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {(() => {
                          // Different outcomes based on active step
                          switch(activeStep) {
                            case 1:
                              return [
                                "Social content strategy doc",
                                "Platform-specific roadmap",
                                "Competitor analysis report",
                                "Content calendar framework"
                              ];
                            case 2:
                              return [
                                "Platform-optimized content",
                                "Consistent posting schedule",
                                "On-brand visual identity",
                                "Engagement-driven formats"
                              ];
                            case 3:
                              return [
                                "Engaged follower base",
                                "Community management playbook",
                                "UGC & resharing strategy",
                                "Follower growth acceleration"
                              ];
                            case 4:
                              return [
                                "Weekly analytics dashboard",
                                "Performance insights report",
                                "Trend opportunity alerts",
                                "ROI & conversion tracking"
                              ];
                            default:
                              return [];
                          }
                        })().map((outcome, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-violet-500 to-blue-500"></div>
                            <span className="text-gray-700 dark:text-zinc-300 text-sm">{outcome}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-zinc-700">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-zinc-500">Timeline</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-700">
                            {activeStep === 1 ? "1 week" : 
                             activeStep === 2 ? "Ongoing" : 
                             activeStep === 3 ? "Continuous" : "Monthly cycles"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const PlansSection = () => {
  const { theme, isDark } = useThemeContext();
  const plans = [
    {
      name: "Starter",
      price: "1,299",
      description: "Perfect for emerging brands ready to level up their social presence",
      features: [
        "2 social platforms",
        "12 posts per month",
        "Basic content creation",
        "Monthly reporting",
        "Community management (10 hrs/week)",
        "Trend alerts"
      ],
      highlighted: false,
      color: "from-blue-600 to-violet-600"
    },
    {
      name: "Growth",
      price: "2,499",
      description: "For brands ready to build a loyal following and drive serious engagement",
      features: [
        "3 social platforms",
        "20 posts per month",
        "Advanced content creation",
        "Weekly strategy calls",
        "Community management (20 hrs/week)",
        "Hashtag strategy",
        "Influencer connections",
        "Content calendar"
      ],
      highlighted: true,
      color: "from-violet-600 to-pink-600"
    },
    {
      name: "Viral",
      price: "4,999",
      description: "All-in solution for brands that want to dominate their social presence",
      features: [
        "All social platforms",
        "30+ posts per month",
        "Premium content creation",
        "24/7 community management",
        "Advanced analytics & insights",
        "Dedicated social team",
        "Influencer campaign management",
        "Viral content strategy",
        "Emergency response system"
      ],
      highlighted: false,
      color: "from-pink-600 to-orange-600"
    }
  ];

  return (
    <div className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-40 w-96 h-96 rounded-full bg-violet-100 dark:bg-violet-900/10 blur-3xl"></div>
        <div className="absolute -right-20 bottom-40 w-96 h-96 rounded-full bg-pink-100 dark:bg-pink-900/10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/30 rounded-full border border-violet-200 dark:border-violet-700/50"
          >
            Pricing Plans
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white"
          >
            Choose Your <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>Growth Plan</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-zinc-300"
          >
            Flexible pricing that scales with your social media goals
          </motion.p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group ${plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              )}
              
              <div className={`relative h-full rounded-2xl p-6 sm:p-8 ${
                plan.highlighted 
                  ? 'bg-white dark:bg-zinc-900 border-2 border-transparent' 
                  : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800'
              } transition-all duration-300 group-hover:shadow-xl`}>
                
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-lg text-gray-500 dark:text-zinc-400 ml-1">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        plan.highlighted 
                          ? 'bg-gradient-to-r from-violet-600 to-pink-600' 
                          : 'bg-gray-100 dark:bg-zinc-800'
                      }`}>
                        <Check size={12} className={plan.highlighted ? 'text-white' : 'text-gray-600 dark:text-zinc-400'} />
                      </div>
                      <span className="text-sm sm:text-base text-gray-700 dark:text-zinc-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white shadow-lg shadow-violet-900/25'
                    : 'border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800'
                }`}>
                  Get Started
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 mb-4">
            All plans include a 14-day free trial • No setup fees • Cancel anytime
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500 dark:text-zinc-500">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-500" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-blue-500" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones size={16} className="text-violet-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CTASection = () => {
  const { theme, isDark } = useThemeContext();
  return (
    <div className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-black text-white' : 'bg-gray-900 text-white'} relative overflow-hidden transition-colors duration-300`}>
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <div className="absolute top-0 w-full h-full">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-24 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex gap-3 mx-auto">
            <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
              Ready to level up?
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-none">
            Let's Make Your Brand
            <div className="relative inline-block mt-2">
              <span className="text-transparent bg-clip-text ml-4" style={{ backgroundImage: THEME_ACCENT.gradient }}>
                Legendary
              </span>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute -right-12 -top-3 text-yellow-400 transform rotate-12"
              >
                <Sparkles size={40} className="fill-yellow-400" />
              </motion.div>
            </div>
          </h2>
          
          <p className="text-xl text-zinc-400 mb-12 max-w-3xl mx-auto">
            Get started today and see how we can transform your social media presence into a powerful growth engine for your brand.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
            <button className="group px-8 py-4 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-violet-900/20">
              Schedule Free Strategy Call
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 rounded-xl font-medium text-white bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 border border-white/10">
              View Our Case Studies
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { label: "Brands Launched", value: "200+" },
              { label: "Content Created", value: "15K+" },
              { label: "Avg. Engagement", value: "28.4%" },
              { label: "Client Retention", value: "94%" }
            ].map((stat, i) => (
              <div key={i} className="">
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-zinc-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const AnalyticsDashboardSection = () => {
  const { theme, isDark } = useThemeContext();
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-green-100 dark:bg-green-900/10 blur-3xl opacity-40 transition-colors duration-700"></div>
        <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-blue-100 dark:bg-blue-900/10 blur-3xl opacity-40 transition-colors duration-700"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 rounded-full border border-teal-200 dark:border-teal-800/30">
            <div className="mr-2">
              <BarChart2 size={18} />
            </div>
            Engagement Analytics
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Real-time <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>insights</span> for data-driven decisions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-zinc-300"
          >
            Comprehensive analytics that translate social metrics into business impact
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-16 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800"
        >
          <div className="bg-gray-800 dark:bg-gray-900 px-4 py-2 flex items-center gap-2 transition-colors duration-300">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-xs font-medium">Engagement Analytics Dashboard</div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Reach", value: "1.4M", change: "+24%", icon: <Users size={20} />, color: THEME_ACCENT.primary },
                { label: "Engagement Rate", value: "5.8%", change: "+1.2%", icon: <ThumbsUp size={20} />, color: THEME_ACCENT.secondary },
                { label: "Conversions", value: "8.2K", change: "+19%", icon: <ShoppingBag size={20} />, color: THEME_ACCENT.tertiary },
                { label: "Content ROI", value: "428%", change: "+52%", icon: <TrendingUp size={20} />, color: THEME_ACCENT.accent }
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                  <div className="h-1.5" style={{ backgroundColor: stat.color }}></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-500 dark:text-zinc-400">{stat.label}</div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                           style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                      <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
                        <TrendingUp size={14} className="mr-0.5" />
                        {stat.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white">Platform Performance</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEME_ACCENT.primary }}></div>
                      <span className="text-xs text-gray-500 dark:text-zinc-400">Engagement</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEME_ACCENT.secondary }}></div>
                      <span className="text-xs text-gray-500 dark:text-zinc-400">Reach</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEME_ACCENT.tertiary }}></div>
                      <span className="text-xs text-gray-500 dark:text-zinc-400">Conversions</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-64">
                  <div className="w-full h-full flex items-end">
                    {['Instagram', 'TikTok', 'YouTube', 'Twitter', 'Facebook'].map((platform, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="w-full px-1 flex items-end space-x-1 h-[85%]">
                          <div className="flex-1 rounded-t h-[65%]" style={{ backgroundColor: THEME_ACCENT.primary }}></div>
                          <div className="flex-1 rounded-t h-[80%]" style={{ backgroundColor: THEME_ACCENT.secondary }}></div>
                          <div className="flex-1 rounded-t h-[45%]" style={{ backgroundColor: THEME_ACCENT.tertiary }}></div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 dark:text-zinc-500 truncate max-w-full">
                          {platform}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md transition-colors duration-300">
                <h3 className="font-medium text-gray-900 dark:text-white mb-6">Audience Insights</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-zinc-400 mb-1">
                      <span>Age Distribution</span>
                      <span>Percentage</span>
                    </div>
                    
                    {[
                      { age: "18-24", percentage: 42 },
                      { age: "25-34", percentage: 28 },
                      { age: "35-44", percentage: 15 },
                      { age: "45-54", percentage: 10 },
                      { age: "55+", percentage: 5 }
                    ].map((group, i) => (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700 dark:text-zinc-300">{group.age}</span>
                          <span className="text-gray-700 dark:text-zinc-300">{group.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                          <div className="h-2 rounded-full" 
                               style={{ width: `${group.percentage}%`, backgroundImage: THEME_ACCENT.gradient }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 dark:text-zinc-400 mb-2">Gender</div>
                    <div className="flex gap-4">
                      <div className="flex-1 bg-gray-100 dark:bg-gray-700/50 rounded-xl p-3 text-center transition-colors duration-300">
                        <div className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">58%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Female</div>
                      </div>
                      <div className="flex-1 bg-gray-100 dark:bg-gray-700/50 rounded-xl p-3 text-center transition-colors duration-300">
                        <div className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">42%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Male</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h3 className="font-medium text-gray-900 dark:text-white mb-6">Top Performing Content</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                      <th className="pb-2 text-left font-medium">Content</th>
                      <th className="pb-2 text-center font-medium">Platform</th>
                      <th className="pb-2 text-center font-medium">Engagement</th>
                      <th className="pb-2 text-center font-medium">Reach</th>
                      <th className="pb-2 text-center font-medium">Conversions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        title: "Summer Collection Reveal",
                        platform: "Instagram",
                        platformColor: "#C13584",
                        engagement: "28.4K",
                        reach: "142K",
                        conversions: "1.2K"
                      },
                      {
                        title: "Product Unboxing Series",
                        platform: "TikTok",
                        platformColor: "#25F4EE",
                        engagement: "42.7K",
                        reach: "380K",
                        conversions: "2.8K"
                      },
                      {
                        title: "Brand Story Video",
                        platform: "YouTube",
                        platformColor: "#FF0000",
                        engagement: "15.3K",
                        reach: "95K",
                        conversions: "950"
                      },
                      {
                        title: "Customer Testimonials",
                        platform: "Twitter",
                        platformColor: "#1DA1F2",
                        engagement: "8.6K",
                        reach: "65K",
                        conversions: "420"
                      }
                    ].map((content, i) => (
                      <tr key={i} className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 flex items-center justify-center text-xs font-bold transition-colors duration-300">
                              {i+1}
                            </div>
                            <div className="text-gray-900 dark:text-white font-medium">{content.title}</div>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style={{
                            backgroundColor: `${content.platformColor}20`,
                            color: content.platformColor
                          }}>
                            {content.platform}
                          </div>
                        </td>
                        <td className="py-4 text-center text-gray-700 dark:text-gray-300 transition-colors duration-300">{content.engagement}</td>
                        <td className="py-4 text-center text-gray-700 dark:text-gray-300 transition-colors duration-300">{content.reach}</td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <TrendingUp size={14} />
                            <span>{content.conversions}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Social ROI Tracking",
              description: "Measure exactly how social media efforts convert to sales and business results",
              icon: <Target size={24} />,
              color: THEME_ACCENT.primary
            },
            {
              title: "Competitor Benchmarking",
              description: "See how your performance compares to competitors across all key metrics",
              icon: <BarChart4 size={24} />,
              color: THEME_ACCENT.secondary
            },
            {
              title: "Predictive Insights",
              description: "AI-powered recommendations to optimize your content strategy in real-time",
              icon: <Sparkles size={24} />,
              color: THEME_ACCENT.tertiary
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-6 h-full transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${feature.color}20` }}>
                    <div style={{ color: feature.color }}>{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                </div>
                                  <p className="text-gray-600 dark:text-gray-400 ml-[60px] transition-colors duration-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="p-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full inline-block">
            <button className="px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium rounded-full flex items-center gap-2 transition-colors duration-300">
              Request Custom Analytics Demo
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400 transition-colors duration-300">
            Get detailed insights tailored to your specific business goals
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const IntegrationsSection = () => {
  const { theme, isDark } = useThemeContext();
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

const SocialPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden">
        <SocialHeroSection />
        <ServicesSection />
        <PlatformsSection />
        <IntegrationsSection />
        <AnalyticsDashboardSection />
        <WorkflowSection />
        <CaseStudiesSection />
        <PlansSection />
        <CTASection />
      </div>
    </PageTransition>
  );
};

export default SocialPage;