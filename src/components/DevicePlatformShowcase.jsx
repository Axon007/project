import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import Android from "@/components/magicui/android";
import { Phone, Smartphone, ArrowRight, Zap } from "lucide-react";

const DevicePlatformShowcase = () => {
  const [activeTab, setActiveTab] = useState("iphone");
  const [activePlatformFeature, setActivePlatformFeature] = useState("overview");
  
  // Define platform-specific content and styling
  const platforms = {
    iphone: {
      name: "iOS",
      color: "#007AFF",
      secondaryColor: "#34AADC",
      icon: <Phone className="w-5 h-5" />,
      borderRadius: "70px",
      features: [
        { id: "overview", name: "Overview", 
          content: "Deliver exceptional iOS experiences with Swift and SwiftUI. Our iOS development leverages Apple's Human Interface Guidelines to create beautiful, intuitive applications that feel right at home on iPhone." },
        { id: "design", name: "Beautiful UI", 
          content: "Create stunning interfaces with Apple's design system. Modern controls, fluid animations, and rich haptics provide a truly native experience that users expect from premium iOS apps." },
        { id: "ecosystem", name: "Apple Ecosystem", 
          content: "Leverage the comprehensive Apple ecosystem with integrations for iCloud, Apple Pay, HealthKit, ARKit, and more. Deliver seamless experiences across iPhone, iPad, Apple Watch, and Mac." },
        { id: "security", name: "Privacy & Security", 
          content: "Build with Apple's industry-leading security and privacy features. Integrate Face ID, Touch ID, App Tracking Transparency, and secure enclaves to protect user data and build trust." }
      ],


      services: [
        "Swift & SwiftUI Development",
        "Human Interface Guidelines",
        "App Store Submission",
        "TestFlight Beta Testing"
      ]
    },
    android: {
      name: "Android",
      color: "#3DDC84",
      secondaryColor: "#32DE84",
      icon: <Smartphone className="w-5 h-5" />,
      borderRadius: "40px",
      features: [
        { id: "overview", name: "Overview",
          content: "Build powerful Android applications with Kotlin and Jetpack Compose. Our Android development focuses on material design, performance optimization, and support for the diverse Android device ecosystem." },
        { id: "material", name: "Material Design",
          content: "Create beautiful interfaces with Google's Material Design system. Consistent UI patterns, responsive layouts, and adaptive components ensure your app looks great on any Android device." },
        { id: "ecosystem", name: "Google Services",
          content: "Integrate seamlessly with Google's extensive ecosystem including Firebase, Maps, ML Kit, and Play Services. Leverage Google's cloud infrastructure for powerful backend services and analytics." },
        { id: "fragmentation", name: "Device Support",
          content: "Navigate Android's device diversity with confidence. Our development practices ensure your app works flawlessly across different screen sizes, resolutions, hardware specifications, and Android versions." }
      ],

      services: [
        "Kotlin & Jetpack Compose",
        "Material Design Implementation",
        "Google Play Store Distribution",
        "Firebase Integration"
      ]
    }
  };

  const currentPlatform = platforms[activeTab];

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Simplified Platform Selection Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-black/30 backdrop-blur-xl py-1 px-1 rounded-2xl overflow-hidden shadow-lg border border-white/5">
            <div className="relative flex h-14 p-1 bg-black/20 rounded-xl overflow-hidden border border-white/5 z-10">
              <div className="absolute inset-y-0 z-0 transition-all duration-300 ease-out px-1 py-1" style={{ left: activeTab === "iphone" ? "0%" : "50%", width: "50%" }}>
                <motion.div
                  layoutId="tabBackground"
                  className="w-full h-full rounded-lg relative overflow-hidden"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentPlatform.color}, ${currentPlatform.secondaryColor})`,
                    }}
                  />
                </motion.div>
              </div>
              
              <div className="grid grid-cols-2 w-full relative z-10 pr-4">
                {Object.entries(platforms).map(([id, platform]) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id);
                      setActivePlatformFeature("overview");
                    }}
                    className={`relative py-3 flex justify-center items-center gap-2 ${
                      activeTab === id ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <span className={`w-5 h-5 ${activeTab === id ? "text-white" : "text-white/60"}`}>
                      {platform.icon}
                    </span>
                    <span className={`font-medium ${activeTab === id ? "font-semibold" : ""}`}>
                      {platform.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Device Display (5 cols) */}
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
                {/* Enhanced Futuristic Background Glow */}
                <div 
                  className="absolute -inset-8 rounded-full blur-3xl"
                  style={{ 
                    background: `radial-gradient(circle at center, ${currentPlatform.color}60, ${currentPlatform.secondaryColor}30, transparent 70%)`,
                    animation: "pulse 6s infinite alternate",
                    opacity: 0.6
                  }}
                ></div>
                
                {/* Futuristic particle effect rings */}
                <motion.div 
                  className="absolute -inset-10 rounded-full border-[1px] opacity-20"
                  style={{ borderColor: currentPlatform.color }}
                  animate={{ scale: [0.8, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                
                <motion.div 
                  className="absolute -inset-16 rounded-full border-[1px] opacity-10"
                  style={{ borderColor: currentPlatform.secondaryColor }}
                  animate={{ scale: [1, 1.2], opacity: [0.05, 0.2, 0.05] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                ></motion.div>
                
                {/* Device Container */}
                <div 
                  className={`relative overflow-hidden shadow-2xl transition-all duration-500`}
                  style={{ 
                    borderRadius: currentPlatform.borderRadius,
                    boxShadow: `0 25px 60px -12px ${currentPlatform.color}60`
                  }}
                >
                  {/* Futuristic device glow */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-tr from-[${currentPlatform.color}20] to-transparent z-10 backdrop-blur-sm`} 
                    style={{ borderRadius: currentPlatform.borderRadius }}
                  ></div>
                  
                  {/* Holographic effect */}
                  <motion.div
                    animate={{ 
                      opacity: [0, 0.2, 0],
                      x: ["-100%", "100%"]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    style={{ borderRadius: currentPlatform.borderRadius }}
                  />
                  
                  {/* Futuristic scanline effect */}
                  <motion.div
                    animate={{ 
                      y: ["-100%", "100%"]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear"
                    }}
                    className="absolute inset-x-0 h-[2px] z-20 bg-[#ffffff30]"
                  />

                  {/* Device Component with Online Platform-specific Screenshots */}
                  {activeTab === "iphone" ? (
                    <Iphone15Pro
                      scale={0.7}
                      className="w-[280px] h-[560px] drop-shadow-xl"
                      alt="iPhone App Development Preview"
                    >
                      <div className="w-full h-full overflow-hidden">
                        {activePlatformFeature === "overview" && (
                          <img 
                            src="https://images.unsplash.com/photo-1621946911155-919eecd0f8d5?q=80&w=1536&auto=format&fit=crop"
                            alt="iOS Interface" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {activePlatformFeature === "design" && (
                          <img 
                            src="https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=1540&auto=format&fit=crop"
                            alt="iOS Design" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {activePlatformFeature === "ecosystem" && (
                          <img 
                            src="https://images.unsplash.com/photo-1619508698656-156c1d7e66df?q=80&w=1471&auto=format&fit=crop"
                            alt="Apple Ecosystem" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {activePlatformFeature === "security" && (
                          <img 
                            src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1587&auto=format&fit=crop"
                            alt="iOS Security" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {/* Overlay with iOS brand styling */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-[#007AFF] rounded-xl flex items-center justify-center mr-2">
                              <svg width="16" height="20" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.4 25.5C31.4 19.2 36.6 16.5 36.8 16.4C34.2 12.5 30.2 12 29 11.9C25.6 11.5 22.3 14 20.7 14C19 14 16.5 11.9 13.6 12C9.9 12 6.5 14.1 4.7 17.4C1 24.1 3.8 34.1 7.4 39.4C9.2 42 11.3 44.9 14 44.8C16.5 44.7 17.5 43 20.6 43C23.6 43 24.6 44.8 27.2 44.7C29.9 44.6 31.7 42 33.5 39.4C35.6 36.3 36.5 33.2 36.5 33C36.4 33 31.4 31 31.4 25.5Z" fill="white"/>
                                <path d="M26.1 7.7C27.5 5.9 28.5 3.5 28.2 1C26.1 1.1 23.4 2.4 22 4.2C20.7 5.7 19.5 8.2 19.8 10.6C22.2 10.8 24.7 9.5 26.1 7.7Z" fill="white"/>
                              </svg>
                            </div>
                            <div className="text-white">
                              <p className="text-xs opacity-80">Apple Design System</p>
                              <p className="text-sm font-bold">iOS {activePlatformFeature.charAt(0).toUpperCase() + activePlatformFeature.slice(1)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Iphone15Pro>
                  ) : (
                    <Android
                      scale={0.7}
                      className="w-[280px] h-[560px] drop-shadow-xl"
                      alt="Android App Development Preview"
                    >
                      <div className="w-full h-full overflow-hidden">
                        {activePlatformFeature === "overview" && (
                          <img 
                            src="https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1470&auto=format&fit=crop"
                            alt="Android Interface" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {activePlatformFeature === "material" && (
                          <img 
                            src="https://images.unsplash.com/photo-1635236066451-a17f04caa37c?q=80&w=1469&auto=format&fit=crop"
                            alt="Material Design" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {activePlatformFeature === "ecosystem" && (
                          <img 
                            src="https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?q=80&w=1470&auto=format&fit=crop"
                            alt="Google Services" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {activePlatformFeature === "fragmentation" && (
                          <img 
                            src="https://images.unsplash.com/photo-1573739022854-abceaeb585dc?q=80&w=1470&auto=format&fit=crop"
                            alt="Device Support" 
                            className="w-full h-full object-cover"
                          />
                        )}
                        {/* Overlay with Android brand styling */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-[#3DDC84] rounded-xl flex items-center justify-center mr-2">
                              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 5V11C1.5 11.55 1.95 12 2.5 12H3V14.5C3 15.05 3.45 15.5 4 15.5C4.55 15.5 5 15.05 5 14.5V12H11V14.5C11 15.05 11.45 15.5 12 15.5C12.55 15.5 13 15.05 13 14.5V12H13.5C14.05 12 14.5 11.55 14.5 11V5H1.5ZM14.5 3H1.5C1.5 1.62 2.12 0.42 3.16 -0.17L2.14 -1.19C1.96 -1.37 1.96 -1.66 2.14 -1.84C2.32 -2.02 2.61 -2.02 2.79 -1.84L4.2 -0.43C4.85 -0.75 5.59 -0.94 6.37 -0.98C7.14 -1.02 7.9 -0.89 8.59 -0.61L10.05 -2.07C10.23 -2.25 10.52 -2.25 10.7 -2.07C10.88 -1.89 10.88 -1.6 10.7 -1.42L9.59 -0.31C10.79 0.27 11.63 1.58 11.63 3H14.5ZM4.75 2C4.34 2 4 1.66 4 1.25C4 0.84 4.34 0.5 4.75 0.5C5.16 0.5 5.5 0.84 5.5 1.25C5.5 1.66 5.16 2 4.75 2ZM11.25 2C10.84 2 10.5 1.66 10.5 1.25C10.5 0.84 10.84 0.5 11.25 0.5C11.66 0.5 12 0.84 12 1.25C12 1.66 11.66 2 11.25 2Z" fill="white"/>
                              </svg>
                            </div>
                            <div className="text-white">
                              <p className="text-xs opacity-80">Material Design</p>
                              <p className="text-sm font-bold">Android {activePlatformFeature.charAt(0).toUpperCase() + activePlatformFeature.slice(1)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Android>
                  )}

                  {/* Futuristic iPhone Notch */}
                  {activeTab === "iphone" && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[26%] h-7 bg-black/90 rounded-full z-30 flex items-center justify-center overflow-hidden backdrop-blur border-b border-white/10">
                      <motion.div 
                        className="absolute inset-0 opacity-20"
                        style={{ 
                          background: `linear-gradient(90deg, transparent, ${currentPlatform.color}40, transparent)` 
                        }}
                        animate={{ 
                          x: ["-100%", "100%"] 
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      />
                      
                      <div className="flex items-center space-x-2">
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: `${currentPlatform.color}80` }}
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: `${currentPlatform.secondaryColor}80` }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: `${currentPlatform.color}80` }}
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Futuristic Interactive Elements */}
                <div className="absolute -left-6 top-1/4 flex flex-col gap-3 items-center">
                  <motion.div 
                    className="w-1 h-16 rounded-full"
                    style={{ background: `linear-gradient(to bottom, ${currentPlatform.color}, transparent)` }}
                    animate={{ height: [12, 24, 12] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-transparent backdrop-blur-lg border-[1px] flex items-center justify-center"
                    style={{ borderColor: currentPlatform.color }}
                    animate={{ 
                      boxShadow: [`0 0 0px ${currentPlatform.color}50`, `0 0 15px ${currentPlatform.color}60`, `0 0 0px ${currentPlatform.color}50`] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div 
                      className="w-2 h-2"
                      style={{ backgroundColor: currentPlatform.color }}
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
                
                <div className="absolute -right-6 bottom-1/4 flex flex-col gap-3 items-center">
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-transparent backdrop-blur-lg border-[1px] flex items-center justify-center"
                    style={{ borderColor: currentPlatform.secondaryColor }}
                    animate={{ 
                      boxShadow: [`0 0 0px ${currentPlatform.secondaryColor}50`, `0 0 15px ${currentPlatform.secondaryColor}60`, `0 0 0px ${currentPlatform.secondaryColor}50`] 
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <motion.div 
                      className="w-2 h-2"
                      style={{ backgroundColor: currentPlatform.secondaryColor }}
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    />
                  </motion.div>
                  <motion.div 
                    className="w-1 h-16 rounded-full"
                    style={{ background: `linear-gradient(to top, ${currentPlatform.secondaryColor}, transparent)` }}
                    animate={{ height: [12, 24, 12] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.7 }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Minimal Modern Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Minimal Platform Header */}
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-5xl font-light tracking-tight"
                style={{ color: currentPlatform.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {currentPlatform.name}
              </motion.h1>
              <motion.div 
                className="w-12 h-px"
                style={{ backgroundColor: currentPlatform.color }}
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>

            {/* Minimal Feature Navigation */}
            <div className="space-y-6">
              {currentPlatform.features.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setActivePlatformFeature(feature.id)}
                  className={`w-full text-left group transition-all duration-300 ${
                    activePlatformFeature === feature.id ? '' : 'opacity-40 hover:opacity-70'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between py-4 border-b border-white/5">
                    <div className="space-y-2">
                      <h3 className={`text-xl font-light tracking-wide transition-colors ${
                        activePlatformFeature === feature.id 
                          ? 'text-white' 
                          : 'text-white/60 group-hover:text-white/80'
                      }`}>
                        {feature.name}
                      </h3>
                      
                      <AnimatePresence>
                        {activePlatformFeature === feature.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-white/70 text-sm leading-relaxed max-w-lg"
                          >
                            {feature.content}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <motion.div
                      animate={{ 
                        rotate: activePlatformFeature === feature.id ? 90 : 0,
                        scale: activePlatformFeature === feature.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <ArrowRight 
                        className="w-4 h-4 transition-colors" 
                        style={{ 
                          color: activePlatformFeature === feature.id 
                            ? currentPlatform.color 
                            : 'rgba(255,255,255,0.3)' 
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>




          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePlatformShowcase;