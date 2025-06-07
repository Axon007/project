import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Smartphone, 
  Zap, 
  Star, 
  Users, 
  Shield, 
  Layers, 
  CheckCircle2,
  Code,
  Home,
  Search,
  Heart,
  MessageCircle,
  Camera,
  Settings,
  Bell,
  User,
  Play,
  Share,
  Download,
  ChevronLeft,
  Eye,
  ThumbsUp,
  Mail,
  Sun,
  Moon
} from "lucide-react";

const DevicePlatformShowcase = () => {
  const [activeTab, setActiveTab] = useState("iphone");
  const [activePlatformFeature, setActivePlatformFeature] = useState("overview");
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  // Platform data structure
  const platforms = {
    iphone: {
      name: "iOS", 
      color: "#007AFF", 
      secondaryColor: "#34AADC", 
      icon: <Phone className="w-5 h-5" />, 
      borderRadius: "70px",
      features: [
        { 
          id: "overview", 
          name: "Overview", 
          content: "Deliver exceptional iOS experiences with Swift and SwiftUI. Our iOS development leverages Apple's Human Interface Guidelines to create beautiful, intuitive applications that feel right at home on iPhone.", 
          icon: <Layers className="w-5 h-5" /> 
        },
        { 
          id: "design", 
          name: "Beautiful UI", 
          content: "Create stunning interfaces with Apple's design system. Modern controls, fluid animations, and rich haptics provide a truly native experience that users expect from premium iOS apps.", 
          icon: <Star className="w-5 h-5" /> 
        },
        { 
          id: "ecosystem", 
          name: "Apple Ecosystem", 
          content: "Leverage the comprehensive Apple ecosystem with integrations for iCloud, Apple Pay, HealthKit, ARKit, and more. Deliver seamless experiences across iPhone, iPad, Apple Watch, and Mac.", 
          icon: <Users className="w-5 h-5" /> 
        },
        { 
          id: "security", 
          name: "Privacy & Security", 
          content: "Build with Apple's industry-leading security and privacy features. Integrate Face ID, Touch ID, App Tracking Transparency, and secure enclaves to protect user data and build trust.", 
          icon: <Shield className="w-5 h-5" /> 
        }
      ]
    },
    android: {
      name: "Android", 
      color: "#3DDC84", 
      secondaryColor: "#32DE84", 
      icon: <Smartphone className="w-5 h-5" />, 
      borderRadius: "40px",
      features: [
        { 
          id: "overview", 
          name: "Overview", 
          content: "Build powerful Android applications with Kotlin and Jetpack Compose. Our Android development focuses on material design, performance optimization, and support for the diverse Android device ecosystem.", 
          icon: <Layers className="w-5 h-5" /> 
        },
        { 
          id: "material", 
          name: "Material Design", 
          content: "Create beautiful interfaces with Google's Material Design system. Consistent UI patterns, responsive layouts, and adaptive components ensure your app looks great on any Android device.", 
          icon: <Star className="w-5 h-5" /> 
        },
        { 
          id: "ecosystem", 
          name: "Google Services", 
          content: "Integrate seamlessly with Google's extensive ecosystem including Firebase, Maps, ML Kit, and Play Services. Leverage Google's cloud infrastructure for powerful backend services and analytics.", 
          icon: <Users className="w-5 h-5" /> 
        },
        { 
          id: "fragmentation", 
          name: "Device Support", 
          content: "Navigate Android's device diversity with confidence. Our development practices ensure your app works flawlessly across different screen sizes, resolutions, hardware specifications, and Android versions.", 
          icon: <Shield className="w-5 h-5" /> 
        }
      ]
    }
  };

  const currentPlatform = platforms[activeTab];
  const isDark = theme === 'dark';

  // Enhanced style classes with better theme support
  const glassStyle = `backdrop-blur-xl border shadow-2xl transition-all duration-300 ${
    isDark 
      ? 'bg-slate-900/40 border-slate-700/50 shadow-black/30' 
      : 'bg-white/60 border-white/40 shadow-black/10'
  }`;
  
  const textStyle = `transition-colors duration-300 ${
    isDark ? 'text-white' : 'text-slate-900'
  }`;
  
  const mutedTextStyle = `transition-colors duration-300 ${
    isDark ? 'text-slate-300' : 'text-slate-600'
  }`;

  // Enhanced floating orb with better positioning
  const FloatingOrb = () => (
    <motion.div 
      key={`orb-${activeTab}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 80, damping: 25, duration: 0.6 }}
      className="absolute top-1/4 -right-20 w-40 h-40 rounded-full blur-3xl hidden lg:block pointer-events-none"
      style={{ 
        background: `radial-gradient(circle at center, ${currentPlatform.color}40, ${currentPlatform.secondaryColor}30, transparent 70%)` 
      }}
    >
      <motion.div
        animate={{ 
          y: [0, -12, 0], 
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full rounded-full"
        style={{ 
          background: `linear-gradient(45deg, ${currentPlatform.color}30, ${currentPlatform.secondaryColor}20)` 
        }}
      />
    </motion.div>
  );

  // Enhanced device frame with better styling
  const DeviceFrame = ({ children, isIphone }) => (
    <div className="relative group">
      {/* Enhanced glow effects */}
      <div 
        className="absolute -inset-6 rounded-full blur-3xl opacity-60 animate-pulse transition-all duration-1000"
        style={{ 
          background: `radial-gradient(circle at center, ${currentPlatform.color}50, ${currentPlatform.secondaryColor}30, transparent 70%)` 
        }}
      />
      
      {/* Animated rings */}
      <motion.div 
        className="absolute -inset-8 rounded-full border opacity-20"
        style={{ borderColor: currentPlatform.color }}
        animate={{ 
          scale: [0.9, 1.1, 0.9], 
          opacity: [0.1, 0.3, 0.1] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute -inset-12 rounded-full border opacity-10"
        style={{ borderColor: currentPlatform.secondaryColor }}
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.05, 0.2, 0.05] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div 
        className={`relative overflow-hidden transition-all duration-500 ${
          isDark ? 'border-zinc-700/30' : 'border-slate-300/50'
        }`}
        style={{ 
          borderRadius: currentPlatform.borderRadius,
          boxShadow: `0 30px 80px -15px ${currentPlatform.color}60`,
          border: `3px solid ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.3)'}`
        }}
      >
        {/* Enhanced holographic effect */}
        <motion.div
          animate={{ 
            opacity: [0, 0.1, 0], 
            x: ["-100%", "100%"] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "easeInOut", 
            delay: 1 
          }}
          className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          style={{ borderRadius: currentPlatform.borderRadius }}
        />
        
        {children}
        
        {/* Enhanced iPhone Notch */}
        {isIphone && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[30%] h-8 bg-black/95 rounded-2xl z-30 flex items-center justify-center overflow-hidden border-b border-white/20">
            <motion.div 
              className="absolute inset-0 opacity-30"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${currentPlatform.color}50, transparent)` 
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="flex items-center space-x-2 relative z-10">
              {[0.2, 0, 0.5].map((delay, i) => (
                <motion.div 
                  key={i}
                  className={`w-${i === 1 ? '2' : '1.5'} h-${i === 1 ? '2' : '1.5'} rounded-full`}
                  style={{ 
                    backgroundColor: `${i === 1 ? currentPlatform.secondaryColor : currentPlatform.color}90` 
                  }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, delay }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`relative w-full min-h-screen py-20 px-4 transition-all duration-500 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'
    }`}>
      
      {/* Enhanced background elements */}
      <div className={`absolute inset-0 bg-grid-pattern opacity-10 -z-10 ${
        isDark ? 'bg-grid-slate-700' : 'bg-grid-slate-200'
      }`} />
      
      {/* Dynamic background orbs with better positioning */}
      {[
        { size: 50, pos: 'top-0 right-0', delay: 0, blur: 140 }, 
        { size: 35, pos: 'bottom-20 left-10', delay: 0.3, blur: 120 }
      ].map((bg, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 0.6 : 0.4 }}
          transition={{ duration: 1.5 + i * 0.3, delay: bg.delay }}
          className={`absolute ${bg.pos} w-[${bg.size}vw] h-[${bg.size}vw] max-w-[900px] max-h-[900px] rounded-full -z-10`}
          style={{ 
            background: `radial-gradient(circle at center, ${
              i === 0 ? currentPlatform.color : currentPlatform.secondaryColor
            }25, transparent 70%)`,
            filter: `blur(${bg.blur}px)`
          }}
        />
      ))}

      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border shadow-lg transition-all duration-300 ${
          isDark 
            ? 'bg-slate-800/80 border-slate-700/50 text-white hover:bg-slate-700/80' 
            : 'bg-white/80 border-white/40 text-slate-900 hover:bg-white/90'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          <FloatingOrb />
          
          {/* Device Display Column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="relative"
              >
                <DeviceFrame isIphone={activeTab === "iphone"}>
                  <div className="w-[300px] h-[600px] overflow-hidden relative">
                    {/* Interactive App Content */}
                    {activeTab === "iphone" && activePlatformFeature === "overview" && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full bg-black"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* iOS Home Screen */}
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
                          {/* Status Bar */}
                          <div className="flex justify-between items-center px-6 py-4 text-white text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                  <div key={i} className={`w-1 h-1 rounded-full ${i <= 2 ? 'bg-white' : 'bg-white/50'}`}></div>
                                ))}
                              </div>
                              <span className="ml-2 text-xs">Verizon</span>
                            </div>
                            <div className="font-semibold">9:41</div>
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-3 border border-white rounded-sm">
                                <div className="w-4 h-1.5 bg-green-400 rounded-sm m-0.5"></div>
                              </div>
                              <span className="text-xs">100%</span>
                            </div>
                          </div>

                          {/* Dynamic background */}
                          <div className="absolute inset-0 opacity-40">
                            <motion.div
                              className="absolute w-48 h-48 rounded-full bg-blue-400 blur-3xl"
                              animate={{ 
                                x: [60, 240, 60], 
                                y: [120, 350, 120],
                                scale: [1, 1.3, 1]
                              }}
                              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                              className="absolute w-36 h-36 rounded-full bg-purple-400 blur-2xl"
                              animate={{ 
                                x: [220, 90, 220], 
                                y: [250, 450, 250],
                                scale: [1.3, 1, 1.3]
                              }}
                              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            />
                          </div>

                          {/* App Grid */}
                          <div className="px-8 py-8 relative z-10">
                            <div className="grid grid-cols-4 gap-8">
                              {[
                                { name: "Camera", icon: <Camera className="w-7 h-7" />, color: "bg-gray-600" },
                                { name: "Photos", icon: <Eye className="w-7 h-7" />, color: "bg-yellow-500" },
                                { name: "Messages", icon: <MessageCircle className="w-7 h-7" />, color: "bg-green-500" },
                                { name: "Settings", icon: <Settings className="w-7 h-7" />, color: "bg-gray-700" },
                                { name: "Safari", icon: <Search className="w-7 h-7" />, color: "bg-blue-500" },
                                { name: "Music", icon: <Play className="w-7 h-7" />, color: "bg-red-500" },
                                { name: "Mail", icon: <Mail className="w-7 h-7" />, color: "bg-blue-600" },
                                { name: "Phone", icon: <Phone className="w-7 h-7" />, color: "bg-green-600" }
                              ].map((app, i) => (
                                <motion.div
                                  key={app.name}
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                                  className={`${app.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl cursor-pointer`}
                                  whileHover={{ scale: 1.1, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {app.icon}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Enhanced Dock */}
                          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                            <motion.div 
                              className="flex gap-5 bg-white/20 backdrop-blur-xl p-4 rounded-3xl border border-white/30 shadow-2xl"
                              initial={{ y: 100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.6, type: "spring" }}
                            >
                              {[
                                { icon: <Phone className="w-7 h-7" />, color: "bg-green-500" },
                                { icon: <MessageCircle className="w-7 h-7" />, color: "bg-blue-500" },
                                { icon: <Camera className="w-7 h-7" />, color: "bg-gray-600" },
                                { icon: <Search className="w-7 h-7" />, color: "bg-purple-500" }
                              ].map((app, i) => (
                                <motion.div
                                  key={i}
                                  className={`${app.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl cursor-pointer`}
                                  whileHover={{ scale: 1.15, y: -8 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {app.icon}
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Android Overview Screen */}
                    {activeTab === "android" && activePlatformFeature === "overview" && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 relative overflow-hidden">
                          {/* Android Status Bar */}
                          <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">Android</span>
                            </div>
                            <div className="font-medium">10:30</div>
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {[1, 2, 3, 4].map(i => (
                                  <div key={i} className={`w-1 h-3 rounded-full ${i <= 3 ? 'bg-white' : 'bg-white/30'}`}></div>
                                ))}
                              </div>
                              <div className="w-6 h-3 border border-white rounded-sm">
                                <div className="w-5 h-2 bg-green-400 rounded-sm m-0.5"></div>
                              </div>
                            </div>
                          </div>

                          {/* Material You Dynamic Background */}
                          <div className="absolute inset-0 opacity-30">
                            <motion.div
                              className="absolute w-52 h-52 rounded-full bg-green-400 blur-3xl"
                              animate={{ 
                                x: [50, 250, 50], 
                                y: [100, 400, 100],
                                scale: [1, 1.4, 1]
                              }}
                              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                            />
                          </div>

                          {/* App Drawer */}
                          <div className="px-6 py-12 relative z-10">
                            <div className="grid grid-cols-4 gap-6">
                              {[
                                { name: "Gmail", icon: <Mail className="w-7 h-7" />, color: "bg-red-500" },
                                { name: "Maps", icon: <Search className="w-7 h-7" />, color: "bg-green-600" },
                                { name: "Chrome", icon: <Eye className="w-7 h-7" />, color: "bg-blue-500" },
                                { name: "Drive", icon: <Settings className="w-7 h-7" />, color: "bg-yellow-500" },
                                { name: "Photos", icon: <Camera className="w-7 h-7" />, color: "bg-purple-500" },
                                { name: "Play", icon: <Play className="w-7 h-7" />, color: "bg-green-500" },
                                { name: "YouTube", icon: <Share className="w-7 h-7" />, color: "bg-red-600" },
                                { name: "Phone", icon: <Phone className="w-7 h-7" />, color: "bg-blue-600" }
                              ].map((app, i) => (
                                <motion.div
                                  key={app.name}
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.1, type: "spring", stiffness: 180 }}
                                  className={`${app.color} w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl cursor-pointer`}
                                  whileHover={{ scale: 1.1, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {app.icon}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Navigation Bar */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full px-8">
                            <motion.div 
                              className="flex justify-center items-center gap-12 bg-black/40 backdrop-blur-xl py-3 px-8 rounded-full border border-white/20"
                              initial={{ y: 100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.7, type: "spring" }}
                            >
                              <motion.div
                                className="w-12 h-1 bg-white rounded-full cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              />
                              <motion.div
                                className="w-12 h-12 bg-white/20 rounded-full cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              />
                              <motion.div
                                className="w-12 h-1 bg-white rounded-full cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </DeviceFrame>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Content Column */}
          <div className="lg:col-span-7 space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              {/* Platform Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`relative p-8 rounded-3xl overflow-hidden ${glassStyle}`}
              >
                <div 
                  className="absolute inset-0 opacity-20" 
                  style={{ 
                    background: `linear-gradient(135deg, ${currentPlatform.color}20, transparent 50%, ${currentPlatform.secondaryColor}15)` 
                  }} 
                />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-6">
                    <motion.div
                      className="p-4 rounded-2xl border"
                      style={{ 
                        background: `linear-gradient(135deg, ${currentPlatform.color}20, ${currentPlatform.secondaryColor}10)`,
                        borderColor: `${currentPlatform.color}40`
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div style={{ color: currentPlatform.color }}>
                        {currentPlatform.icon}
                      </div>
                    </motion.div>
                    <div>
                      <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        {currentPlatform.name}
                      </h1>
                      <p className={`text-xl ${mutedTextStyle}`}>Development Platform</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Tab Navigation */}
              <div className={`relative rounded-2xl overflow-hidden ${glassStyle} p-1`}>
                <div 
                  className="absolute inset-0 opacity-10" 
                  style={{ 
                    background: `linear-gradient(90deg, transparent, ${currentPlatform.color}30, transparent)` 
                  }} 
                />
                <div className="relative flex">
                  {/* Active tab indicator */}
                  <motion.div
                    className="absolute top-1 bottom-1 rounded-xl z-10"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentPlatform.color}30, ${currentPlatform.secondaryColor}20)`,
                      left: activeTab === "iphone" ? "4px" : "calc(50% + 2px)",
                      width: "calc(50% - 6px)",
                      border: `1px solid ${currentPlatform.color}40`
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    layoutId="activeTabIndicator"
                  />
                  
                  {Object.entries(platforms).map(([id, platform]) => (
                    <motion.button
                      key={id}
                      onClick={() => { 
                        setActiveTab(id); 
                        setActivePlatformFeature("overview"); 
                      }}
                      className={`relative z-20 px-6 py-4 text-sm transition-all duration-300
                        ${activeTab === id 
                          ? `${textStyle} font-semibold` 
                          : `${mutedTextStyle} hover:${textStyle}`
                        } rounded-xl flex items-center gap-3 min-w-[120px] justify-center`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span style={{ color: activeTab === id ? platform.color : 'inherit' }}>
                        {platform.icon}
                      </span>
                      <span>{platform.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${glassStyle} rounded-3xl p-8`}
            >
              <div 
                className="absolute inset-0 opacity-10 rounded-3xl" 
                style={{ 
                  background: `linear-gradient(135deg, ${currentPlatform.color}20, transparent 50%, ${currentPlatform.secondaryColor}15)` 
                }} 
              />
              <div className="relative z-10">
                <h2 className={`text-2xl font-bold mb-6 ${textStyle}`}>Platform Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentPlatform.features.map((feature) => (
                    <motion.button
                      key={feature.id}
                      onClick={() => setActivePlatformFeature(feature.id)}
                      className={`relative p-4 rounded-2xl text-left transition-all duration-300 group
                        ${activePlatformFeature === feature.id 
                          ? `border-2 ${glassStyle}` 
                          : `border border-transparent hover:border-white/20 ${
                              isDark ? 'hover:bg-slate-800/40' : 'hover:bg-white/40'
                            }`
                        }`}
                      style={{
                        borderColor: activePlatformFeature === feature.id ? `${currentPlatform.color}60` : 'transparent'
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activePlatformFeature === feature.id && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl opacity-20"
                          style={{ 
                            background: `linear-gradient(135deg, ${currentPlatform.color}30, ${currentPlatform.secondaryColor}20)` 
                          }}
                          layoutId="activeFeatureBg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <div className="relative z-10 space-y-3">
                        <div 
                          className="flex items-center gap-3"
                          style={{ color: activePlatformFeature === feature.id ? currentPlatform.color : 'inherit' }}
                        >
                          {feature.icon}
                          <span className={`font-semibold ${textStyle}`}>{feature.name}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Feature Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${activePlatformFeature}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`${glassStyle} rounded-3xl p-8`}
              >
                <div 
                  className="absolute inset-0 opacity-10 rounded-3xl" 
                  style={{ 
                    background: `linear-gradient(135deg, ${currentPlatform.color}15, transparent 60%, ${currentPlatform.secondaryColor}10)` 
                  }} 
                />
                <div className="relative z-10">
                  {(() => {
                    const activeFeature = currentPlatform.features.find(f => f.id === activePlatformFeature);
                    return (
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div 
                            className="p-3 rounded-xl"
                            style={{ 
                              background: `linear-gradient(135deg, ${currentPlatform.color}20, ${currentPlatform.secondaryColor}10)`,
                              color: currentPlatform.color 
                            }}
                          >
                            {activeFeature.icon}
                          </div>
                          <h3 className={`text-3xl font-bold ${textStyle}`}>{activeFeature.name}</h3>
                        </div>
                        <p className={`text-lg leading-relaxed ${mutedTextStyle}`}>
                          {activeFeature.content}
                        </p>
                        
                        {/* Feature specific content */}
                        {activePlatformFeature === "overview" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {[
                              { title: "Native Performance", desc: "Optimized for the platform", icon: <Zap className="w-5 h-5" /> },
                              { title: "Rich Animations", desc: "Smooth 60fps experiences", icon: <Star className="w-5 h-5" /> },
                              { title: "Platform APIs", desc: "Full access to device features", icon: <Code className="w-5 h-5" /> }
                            ].map((item, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-4 rounded-xl border transition-all duration-300 ${
                                  isDark ? 'border-slate-700/50 hover:border-slate-600/50' : 'border-slate-200/50 hover:border-slate-300/50'
                                }`}
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <div style={{ color: currentPlatform.color }}>
                                    {item.icon}
                                  </div>
                                  <h4 className={`font-semibold ${textStyle}`}>{item.title}</h4>
                                </div>
                                <p className={`text-sm ${mutedTextStyle}`}>{item.desc}</p>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center space-y-6"
            >
              <motion.button
                className={`px-8 py-4 rounded-2xl font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 ${glassStyle}`}
                style={{ 
                  background: `linear-gradient(135deg, ${currentPlatform.color}, ${currentPlatform.secondaryColor})`,
                  boxShadow: `0 20px 40px -10px ${currentPlatform.color}60`
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Building with {currentPlatform.name}
              </motion.button>
              <p className={`text-sm ${mutedTextStyle}`}>
                Ready to create amazing {currentPlatform.name.toLowerCase()} experiences? Let's get started.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePlatformShowcase;