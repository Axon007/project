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
  Mail
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DevicePlatformShowcase = ({ theme, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState("iphone");
  const [activePlatformFeature, setActivePlatformFeature] = useState("overview");

  // Platform data structure
  const platforms = {
    iphone: {
      name: "iOS", color: "#007AFF", secondaryColor: "#34AADC", icon: <Phone className="w-5 h-5" />, borderRadius: "rounded-[70px]",
      features: [
        { id: "overview", name: "Overview", content: "Deliver exceptional iOS experiences with Swift and SwiftUI. Our iOS development leverages Apple's Human Interface Guidelines to create beautiful, intuitive applications that feel right at home on iPhone.", icon: <Layers className="w-5 h-5" /> },
        { id: "design", name: "Beautiful UI", content: "Create stunning interfaces with Apple's design system. Modern controls, fluid animations, and rich haptics provide a truly native experience that users expect from premium iOS apps.", icon: <Star className="w-5 h-5" /> },
        { id: "ecosystem", name: "Apple Ecosystem", content: "Leverage the comprehensive Apple ecosystem with integrations for iCloud, Apple Pay, HealthKit, ARKit, and more. Deliver seamless experiences across iPhone, iPad, Apple Watch, and Mac.", icon: <Users className="w-5 h-5" /> },
        { id: "security", name: "Privacy & Security", content: "Build with Apple's industry-leading security and privacy features. Integrate Face ID, Touch ID, App Tracking Transparency, and secure enclaves to protect user data and build trust.", icon: <Shield className="w-5 h-5" /> }
      ],
      images: {
        overview: "https://images.unsplash.com/photo-1621946911155-919eecd0f8d5?q=80&w=1536&auto=format&fit=crop",
        design: "https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=1540&auto=format&fit=crop",
        ecosystem: "https://images.unsplash.com/photo-1619508698656-156c1d7e66df?q=80&w=1471&auto=format&fit=crop",
        security: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1587&auto=format&fit=crop"
      }
    },
    android: {
      name: "Android", color: "#3DDC84", secondaryColor: "#32DE84", icon: <Smartphone className="w-5 h-5" />, borderRadius: "rounded-[40px]",
      features: [
        { id: "overview", name: "Overview", content: "Build powerful Android applications with Kotlin and Jetpack Compose. Our Android development focuses on material design, performance optimization, and support for the diverse Android device ecosystem.", icon: <Layers className="w-5 h-5" /> },
        { id: "material", name: "Material Design", content: "Create beautiful interfaces with Google's Material Design system. Consistent UI patterns, responsive layouts, and adaptive components ensure your app looks great on any Android device.", icon: <Star className="w-5 h-5" /> },
        { id: "ecosystem", name: "Google Services", content: "Integrate seamlessly with Google's extensive ecosystem including Firebase, Maps, ML Kit, and Play Services. Leverage Google's cloud infrastructure for powerful backend services and analytics.", icon: <Users className="w-5 h-5" /> },
        { id: "fragmentation", name: "Device Support", content: "Navigate Android's device diversity with confidence. Our development practices ensure your app works flawlessly across different screen sizes, resolutions, hardware specifications, and Android versions.", icon: <Shield className="w-5 h-5" /> }
      ],
      images: {
        overview: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1470&auto=format&fit=crop",
        material: "https://images.unsplash.com/photo-1635236066451-a17f04caa37c?q=80&w=1469&auto=format&fit=crop",
        ecosystem: "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?q=80&w=1470&auto=format&fit=crop",
        fragmentation: "https://images.unsplash.com/photo-1573739022854-abceaeb585dc?q=80&w=1470&auto=format&fit=crop"
      }
    }
  };

  const currentPlatform = platforms[activeTab];

  // Consolidated style classes using CSS variables for proper theme switching
  const glassStyle = "backdrop-blur-xl border shadow-lg bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 shadow-black/5 dark:shadow-black/20";
  const textStyle = "text-slate-800 dark:text-white";
  const mutedTextStyle = "text-slate-600/80 dark:text-white/70";

  // Animated components
  const FloatingOrb = () => (
    <motion.div 
      key={`orb-${activeTab}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 80, damping: 25, duration: 0.6 }}
      className="absolute top-1/4 -right-16 w-32 h-32 rounded-full blur-2xl hidden lg:block"
      style={{ background: `radial-gradient(circle at center, ${currentPlatform.color}30, ${currentPlatform.secondaryColor}20, transparent 70%)` }}
    >
      <motion.div
        animate={{ y: [0, -8, 0], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full rounded-full"
        style={{ background: `linear-gradient(45deg, ${currentPlatform.color}20, ${currentPlatform.secondaryColor}15)` }}
      />
    </motion.div>
  );

  const DeviceFrame = ({ children, isIphone }) => (
    <div 
      className={`relative overflow-hidden transition-all duration-500 group border-slate-200/70 dark:border-zinc-800/20 border-[3px] border-black/80 ${currentPlatform.borderRadius}`}
      style={{ 
        boxShadow: `0 25px 60px -12px ${currentPlatform.color}40`
      }}
    >
      {/* Background effects */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 rounded-full blur-2xl opacity-70 animate-pulse" />
      <div className={`absolute inset-0 bg-gradient-to-tr from-[${currentPlatform.color}20] to-transparent z-10 backdrop-blur-sm`} style={{ borderRadius: currentPlatform.borderRadius }} />
      
      {/* Holographic effect */}
      <motion.div
        animate={{ opacity: [0, 0.07, 0], x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 1 }}
        className={`absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 ${currentPlatform.borderRadius}`}
      />
      
      {children}
      
      {/* iPhone Notch */}
      {isIphone && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[26%] h-7 bg-black/90 rounded-full z-30 flex items-center justify-center overflow-hidden backdrop-blur border-b border-white/10">
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{ background: `linear-gradient(90deg, transparent, ${currentPlatform.color}40, transparent)` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="flex items-center space-x-2">
            {[0.2, 0, 0.5].map((delay, i) => (
              <motion.div 
                key={i}
                className={`w-${i === 1 ? '2' : '1.5'} h-${i === 1 ? '2' : '1.5'} rounded-full`}
                style={{ backgroundColor: `${i === 1 ? currentPlatform.secondaryColor : currentPlatform.color}80` }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative w-full py-16 px-4 transition-colors duration-300 overflow-hidden bg-gradient-to-b from-background to-background/95 text-foreground">
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />
      {[{ size: 45, pos: 'top-0 right-0', delay: 0 }, { size: 30, pos: 'bottom-10 left-10', delay: 0.2 }].map((bg, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === 0 ? 0.7 : 0.6 }}
          transition={{ duration: 1 + i * 0.2, delay: bg.delay }}
          className={`absolute ${bg.pos} w-[${bg.size}vw] h-[${bg.size}vw] max-w-[${bg.size === 45 ? '800' : '600'}px] max-h-[${bg.size === 45 ? '800' : '600'}px] rounded-full filter blur-[${bg.size === 45 ? '120' : '100'}px] -z-10`}
          style={{ background: `radial-gradient(circle at center, ${i === 0 ? currentPlatform.color : currentPlatform.secondaryColor}20, transparent 70%)` }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          <FloatingOrb />
          
          {/* Device Display Column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative"
              >
                {/* Enhanced glow effects */}
                <div className="absolute -inset-8 rounded-full blur-3xl" style={{ background: `radial-gradient(circle at center, ${currentPlatform.color}60, ${currentPlatform.secondaryColor}30, transparent 70%)`, animation: "pulse 6s infinite alternate", opacity: 0.6 }} />
                
                {[{ inset: 10, delay: 0 }, { inset: 16, delay: 1 }].map((ring, i) => (
                  <motion.div 
                    key={i}
                    className={`absolute -inset-${ring.inset} rounded-full border-[1px] opacity-${i === 0 ? '20' : '10'}`}
                    style={{ borderColor: i === 0 ? currentPlatform.color : currentPlatform.secondaryColor }}
                    animate={{ scale: [i === 0 ? 0.8 : 1, i === 0 ? 1 : 1.2], opacity: [i === 0 ? 0.1 : 0.05, i === 0 ? 0.3 : 0.2, i === 0 ? 0.1 : 0.05] }}
                    transition={{ duration: i === 0 ? 8 : 10, repeat: Infinity, ease: "easeInOut", delay: ring.delay }}
                  />
                ))}

                <DeviceFrame isIphone={activeTab === "iphone"}>
                  <div className="w-[280px] h-[560px] overflow-hidden relative">
                    {/* <img 
                      src={currentPlatform.images[activePlatformFeature]}
                      alt={`${currentPlatform.name} ${activePlatformFeature}`}
                      className="w-full h-full object-cover"
                    /> */}
                      {/* Interactive App Content */}
                    {activeTab === "iphone" && activePlatformFeature === "overview" && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full bg-black"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* iOS Home Screen */}
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
                          {/* Status Bar */}
                          <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
                            <div className="flex items-center gap-1">
                              <div className="flex gap-1">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                              </div>
                              <span className="ml-2 text-xs">Verizon</span>
                            </div>
                            <div className="font-medium">9:41</div>
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-3 border border-white rounded-sm">
                                <div className="w-4 h-1.5 bg-green-400 rounded-sm m-0.5"></div>
                              </div>
                              <span className="text-xs">100%</span>
                            </div>
                          </div>

                          {/* Dynamic background */}
                          <div className="absolute inset-0 opacity-30">
                            <motion.div
                              className="absolute w-40 h-40 rounded-full bg-blue-400 blur-3xl"
                              animate={{ 
                                x: [50, 200, 50], 
                                y: [100, 300, 100],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                              className="absolute w-32 h-32 rounded-full bg-purple-400 blur-2xl"
                              animate={{ 
                                x: [200, 80, 200], 
                                y: [200, 400, 200],
                                scale: [1.2, 1, 1.2]
                              }}
                              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            />
                          </div>

                          {/* App Grid */}
                          <div className="px-8 py-6 relative z-10">
                            <div className="grid grid-cols-4 gap-6">
                              {[
                                { name: "Camera", icon: <Camera className="w-6 h-6" />, color: "bg-gray-600" },
                                { name: "Photos", icon: <Eye className="w-6 h-6" />, color: "bg-yellow-500" },
                                { name: "Messages", icon: <MessageCircle className="w-6 h-6" />, color: "bg-green-500" },
                                { name: "Settings", icon: <Settings className="w-6 h-6" />, color: "bg-gray-700" },
                                { name: "Safari", icon: <Search className="w-6 h-6" />, color: "bg-blue-500" },
                                { name: "Music", icon: <Play className="w-6 h-6" />, color: "bg-red-500" },
                                { name: "Mail", icon: <Mail className="w-6 h-6" />, color: "bg-blue-600" },
                                { name: "Phone", icon: <Phone className="w-6 h-6" />, color: "bg-green-600" }
                              ].map((app, i) => (
                                <motion.div
                                  key={app.name}
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                                  className={`${app.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg cursor-pointer`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {app.icon}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Dock */}
                          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                            <motion.div 
                              className="flex gap-4 bg-white/10 backdrop-blur-xl p-3 rounded-3xl border border-white/20"
                              initial={{ y: 100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                            >
                              {[
                                { icon: <Phone className="w-6 h-6" />, color: "bg-green-500" },
                                { icon: <MessageCircle className="w-6 h-6" />, color: "bg-blue-500" },
                                { icon: <Camera className="w-6 h-6" />, color: "bg-gray-600" },
                                { icon: <Search className="w-6 h-6" />, color: "bg-purple-500" }
                              ].map((app, i) => (
                                <motion.div
                                  key={i}
                                  className={`${app.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg cursor-pointer`}
                                  whileHover={{ scale: 1.1, y: -5 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {app.icon}
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}                    {activeTab === "iphone" && activePlatformFeature === "design" && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* iOS App Design Screen */}
                        <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 relative">
                          {/* Header */}
                          <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4">
                            <div className="flex items-center justify-between">
                              <ChevronLeft className="w-6 h-6 text-gray-600" />
                              <h1 className="font-semibold text-gray-900">Design Studio</h1>
                              <Share className="w-6 h-6 text-gray-600" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 space-y-6">
                            {/* Featured Card */}
                            <motion.div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                              <div className="relative z-10">
                                <h2 className="text-xl font-bold mb-2">Create Amazing UI</h2>
                                <p className="text-white/80 text-sm mb-4">Design beautiful interfaces with our tools</p>
                                <motion.button
                                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
                                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Get Started
                                </motion.button>
                              </div>
                            </motion.div>

                            {/* Tool Grid */}
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                { name: "Colors", icon: "🎨", desc: "Palette manager" },
                                { name: "Typography", icon: "✏️", desc: "Font tools" },
                                { name: "Components", icon: "🧩", desc: "UI elements" },
                                { name: "Export", icon: "📤", desc: "Share designs" }
                              ].map((tool, i) => (
                                <motion.div
                                  key={tool.name}
                                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                  whileHover={{ scale: 1.02, y: -2 }}
                                >
                                  <div className="text-2xl mb-2">{tool.icon}</div>
                                  <h3 className="font-semibold text-gray-900 text-sm">{tool.name}</h3>
                                  <p className="text-gray-500 text-xs">{tool.desc}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}                    {activeTab === "iphone" && activePlatformFeature === "ecosystem" && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* iOS Social App Screen */}
                        <div className="w-full h-full bg-black text-white relative">
                          {/* Header */}
                          <div className="flex items-center justify-between p-4 border-b border-gray-800">
                            <h1 className="text-lg font-bold">Social Feed</h1>
                            <div className="flex gap-4">
                              <Heart className="w-6 h-6" />
                              <MessageCircle className="w-6 h-6" />
                            </div>
                          </div>

                          {/* Post */}
                          <div className="p-4">
                            <motion.div 
                              className="space-y-4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {/* User info */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">apple_ecosystem</h3>
                                    <p className="text-gray-400 text-sm">2 hours ago</p>
                                  </div>
                                </div>
                                <div className="text-2xl">⋯</div>
                              </div>

                              {/* Image placeholder */}
                              <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl h-48 flex items-center justify-center relative overflow-hidden">
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                  animate={{ x: ['-100%', '100%'] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <div className="text-center z-10">
                                  <Users className="w-12 h-12 mb-2 mx-auto text-white/60" />
                                  <p className="text-white/60 text-sm">Ecosystem Integration</p>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center justify-between">
                                <div className="flex gap-4">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Heart className="w-6 h-6" />
                                  </motion.button>
                                  <MessageCircle className="w-6 h-6" />
                                  <Share className="w-6 h-6" />
                                </div>
                                <Download className="w-6 h-6" />
                              </div>

                              {/* Likes */}
                              <div className="space-y-1">
                                <p className="font-semibold">1,247 likes</p>
                                <p className="text-sm">
                                  <span className="font-semibold">apple_ecosystem</span> Seamlessly connecting all your Apple devices ✨
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}                    {activeTab === "iphone" && activePlatformFeature === "security" && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* iOS Settings Screen */}
                        <div className="w-full h-full bg-gray-100 relative">
                          {/* Header */}
                          <div className="bg-white border-b border-gray-200 px-6 py-4">
                            <div className="flex items-center gap-4">
                              <ChevronLeft className="w-6 h-6 text-gray-600" />
                              <h1 className="text-lg font-semibold text-gray-900">Privacy & Security</h1>
                            </div>
                          </div>

                          {/* Settings List */}
                          <div className="p-4 space-y-1">
                            {[
                              { icon: <User className="w-5 h-5" />, label: "Face ID & Passcode", hasArrow: true },
                              { icon: <Shield className="w-5 h-5" />, label: "App Privacy Report", hasArrow: true, badge: "New" },
                              { icon: <Bell className="w-5 h-5" />, label: "Location Services", hasArrow: true },
                              { icon: <Eye className="w-5 h-5" />, label: "App Tracking", hasArrow: true },
                              { icon: <Code className="w-5 h-5" />, label: "Security Recommendations", hasArrow: true }
                            ].map((item, i) => (
                              <motion.div
                                key={item.label}
                                className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.01 }}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                                    {item.icon}
                                  </div>
                                  <span className="font-medium text-gray-900">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {item.badge && (
                                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                      {item.badge}
                                    </div>
                                  )}
                                  {item.hasArrow && (
                                    <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                                  )}
                                </div>
                              </motion.div>
                            ))}

                            {/* Security Status */}
                            <motion.div
                              className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-green-900">Security Status: Excellent</h3>
                                  <p className="text-sm text-green-700">All security features are enabled</p>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {activeTab === "android" && activePlatformFeature === "overview" && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Example Android App Screen */}
                        <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="relative w-full h-1/2 bg-gradient-to-b from-green-500 to-green-300">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <h2 className="text-white text-2xl font-bold">Android App Overview</h2>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold">Welcome to the Android App</h3>
                            <p className="text-sm text-gray-700 mt-1">
                              This is a preview of the Android app running on a smartphone. Experience the flexibility and customization of Android.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {activeTab === "android" && activePlatformFeature === "material" && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Example Android App Material Design Screen */}
                        <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="relative w-full h-1/2 bg-gradient-to-b from-blue-500 to-blue-300">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <h2 className="text-white text-2xl font-bold">Android App Material Design</h2>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold">Material You - Dynamic Color</h3>
                            <p className="text-sm text-gray-700 mt-1">
                              Explore the adaptive and responsive UI components that make Android apps unique. Material You brings personalization to the forefront.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {activeTab === "android" && activePlatformFeature === "ecosystem" && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Example Android App Ecosystem Screen */}
                        <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="relative w-full h-1/2 bg-gradient-to-b from-yellow-500 to-yellow-300">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <h2 className="text-white text-2xl font-bold">Android App Ecosystem</h2>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold">Google Services Integration</h3>
                            <p className="text-sm text-gray-700 mt-1">
                              Discover the power of Google services integrated into the app. From Maps to Firebase, enhance your app's functionality effortlessly.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {activeTab === "android" && activePlatformFeature === "fragmentation" && (
                      <motion.div 
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Example Android App Fragmentation Screen */}
                        <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="relative w-full h-1/2 bg-gradient-to-b from-red-500 to-red-300">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <h2 className="text-white text-2xl font-bold">Android App Fragmentation</h2>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold">Optimized for All Devices</h3>
                            <p className="text-sm text-gray-700 mt-1">
                              See how the app maintains performance and usability across a wide range of Android devices with different screen sizes and specs.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </DeviceFrame>

                {/* Interactive side elements */}
                {[{ side: 'left', top: '1/4', items: [12, 24, 12] }, { side: 'right', bottom: '1/4', items: [12, 24, 12] }].map((side, sideIdx) => (
                  <div key={sideIdx} className={`absolute -${side.side}-6 ${side.top || side.bottom} flex flex-col gap-3 items-center`}>
                    <motion.div 
                      className="w-1 h-16 rounded-full"
                      style={{ background: `linear-gradient(to ${sideIdx === 0 ? 'bottom' : 'top'}, ${sideIdx === 0 ? currentPlatform.color : currentPlatform.secondaryColor}, transparent)` }}
                      animate={{ height: side.items }}
                      transition={{ duration: 3 + sideIdx * 0.5, repeat: Infinity, delay: sideIdx * 0.7 }}
                    />
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-transparent backdrop-blur-lg border-[1px] flex items-center justify-center"
                      style={{ borderColor: sideIdx === 0 ? currentPlatform.color : currentPlatform.secondaryColor }}
                      animate={{ boxShadow: [`0 0 0px ${sideIdx === 0 ? currentPlatform.color : currentPlatform.secondaryColor}50`, `0 0 15px ${sideIdx === 0 ? currentPlatform.color : currentPlatform.secondaryColor}60`, `0 0 0px ${sideIdx === 0 ? currentPlatform.color : currentPlatform.secondaryColor}50`] }}
                      transition={{ duration: 2 + sideIdx * 0.5, repeat: Infinity, delay: sideIdx * 0.5 }}
                    >
                      <motion.div 
                        className="w-2 h-2"
                        style={{ backgroundColor: sideIdx === 0 ? currentPlatform.color : currentPlatform.secondaryColor }}
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2 + sideIdx * 0.5, repeat: Infinity, delay: sideIdx * 0.5 }}
                      />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              {/* Platform Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`relative p-6 rounded-2xl overflow-hidden ${glassStyle}`}
              >
                <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(135deg, ${currentPlatform.color}15, transparent 50%, ${currentPlatform.secondaryColor}10)` }} />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
                        {currentPlatform.name}
                      </h1>
                      <p className={`text-lg ${mutedTextStyle}`}>Development Platform</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tab Navigation */}
              <div className={`relative rounded-2xl overflow-hidden ${glassStyle}`}>
                <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="relative flex">
                  <motion.div
                    className="absolute bottom-0 h-[2px] z-10 bg-gradient-to-r from-primary via-blue-500 to-purple-500"
                    style={{ left: activeTab === "iphone" ? "0%" : "50%", width: "50%" }}
                    transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                    layoutId="activeTabIndicator"
                  />
                  
                  {Object.entries(platforms).map(([id, platform]) => (
                    <button
                      key={id}
                      onClick={() => { setActiveTab(id); setActivePlatformFeature("overview"); }}
                      className={`relative z-10 px-6 py-3 text-sm font-medium transition-all duration-300 flex items-center gap-2 justify-center flex-1 group hover:bg-white/10 dark:hover:bg-white/5 ${
                        activeTab === id 
                          ? 'text-foreground bg-white/10 dark:bg-white/10 backdrop-blur-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <motion.span 
                        className="transition-all duration-300"
                        animate={{ scale: activeTab === id ? 1.05 : 1 }}
                        style={{ color: activeTab === id ? currentPlatform.color : 'inherit' }}
                      >
                        {platform.icon}
                      </motion.span>
                      <span className="tracking-tight">
                        {platform.name}
                      </span>
                      {activeTab === id && (
                        <motion.div
                          className="absolute inset-0 -z-10 opacity-10 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              <div className={`flex justify-between items-center mb-6 p-4 rounded-xl ${glassStyle}`}>
                <h3 className={`text-lg font-semibold ${textStyle}`}>Features & Capabilities</h3>
              </div>
              
              <Tabs defaultValue={currentPlatform.features[0].id} onValueChange={setActivePlatformFeature} value={activePlatformFeature}>
                <TabsList className={`w-full justify-start mb-2 ${glassStyle} bg-secondary/5 dark:bg-secondary/5`}>
                  {currentPlatform.features.map((feature) => (                      
                    <TabsTrigger 
                      key={feature.id} 
                      value={feature.id}
                      className="backdrop-blur-sm data-[state=active]:bg-white/10 dark:data-[state=active]:bg-white/10 data-[state=active]:text-foreground hover:bg-white/5 dark:hover:bg-white/5"
                    >
                      <div className="flex items-center gap-2">
                        {feature.icon}
                        <span>{feature.name}</span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {currentPlatform.features.map((feature) => (                        
                  <TabsContent key={feature.id} value={feature.id}>                      
                    <Card className={`overflow-hidden h-[280px] flex flex-col ${glassStyle}`}>
                      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `linear-gradient(135deg, ${currentPlatform.color}10, transparent 50%, ${currentPlatform.secondaryColor}05)` }} />
                      
                      <CardHeader className="relative z-10 pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <motion.div 
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-md"
                            style={{ background: `linear-gradient(135deg, ${currentPlatform.color}90, #3B82F6, ${currentPlatform.secondaryColor}90)`, border: '1px solid', borderColor: `${currentPlatform.color}40` }}
                          >
                            {feature.icon}
                          </motion.div>
                          {feature.name}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="relative z-10 flex-1 flex flex-col pt-0">
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm leading-relaxed flex-1 text-slate-700/90 dark:text-white/80"
                        >
                          {feature.content}
                        </motion.p>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4 min-h-[60px]">
                          {(feature.id === 'ecosystem' || feature.id === 'security') && (
                            <>
                                                          <div className="p-2 rounded-lg backdrop-blur-sm bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20">
                              <div className="flex items-center gap-1">
                                {feature.id === 'ecosystem' ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Shield className="w-3 h-3 text-blue-500" />}
                                <span className="text-xs font-medium">{feature.id === 'ecosystem' ? 'Seamless Integration' : 'Advanced Encryption'}</span>
                              </div>
                            </div>
                            <div className="p-2 rounded-lg backdrop-blur-sm bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20">
                              <div className="flex items-center gap-1">
                                {feature.id === 'ecosystem' ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Shield className="w-3 h-3 text-blue-500" />}
                                <span className="text-xs font-medium">{feature.id === 'ecosystem' ? 'Cross-device Sync' : 'Secure Authentication'}</span>
                              </div>
                            </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between relative z-10 pt-2">
                        <button className="px-3 py-1 text-xs rounded-full transition-all duration-300 flex items-center gap-1 backdrop-blur-sm border bg-white/10 dark:bg-white/10 text-slate-700 dark:text-white border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/20">
                          <Code className="w-3 h-3" /> Documentation
                        </button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
        
                  <div className="mt-12">
              <div className="relative flex flex-col md:flex-row items-center justify-between p-8 backdrop-blur-xl rounded-2xl border shadow-lg overflow-hidden bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 shadow-black/5 dark:shadow-black/20">
                {/* Animated gradient background */}
                <div 
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${currentPlatform.color}20, transparent 40%, ${currentPlatform.secondaryColor}15, transparent 80%)`
                  }}
                />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute w-2 h-2 rounded-full opacity-40"
                    style={{ backgroundColor: currentPlatform.color }}
                    animate={{
                      x: [20, 300, 20],
                      y: [30, 80, 30],
                      opacity: [0.2, 0.6, 0.2]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute w-1.5 h-1.5 rounded-full opacity-30"
                    style={{ backgroundColor: currentPlatform.secondaryColor }}
                    animate={{
                      x: [250, 50, 250],
                      y: [20, 90, 20],
                      opacity: [0.1, 0.5, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  />
                </div>
                
                <div className="mb-6 md:mb-0 md:mr-10 relative z-10">
                  <h3 className={`text-2xl font-bold mb-3 ${textStyle}`}>See It In Action</h3>
                  <p className={`max-w-md ${mutedTextStyle}`}>
                    Experience the power of our interactive features with a live demonstration of our latest projects.
                  </p>
                </div>
                <a 
                  href="#demo" 
                  className="relative z-10 px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-sm border bg-white/10 dark:bg-white/10 text-slate-800 dark:text-white border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/20 hover:shadow-lg"
                >
                  Watch Demo
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </a>
              </div>
            </div>
      </div>
    </div>
  );
};

export default DevicePlatformShowcase;