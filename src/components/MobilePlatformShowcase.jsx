import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Check, ArrowRight, Download, Calendar, Shield, Zap, BarChart, MailCheck } from "lucide-react";

const MobilePlatformShowcase = ({
  title = "Cross-Platform Excellence",
  subtitle = "Build seamless experiences for both Android and iOS with our expert development team",
  platforms = [
    {
      id: "android",
      name: "Android",
      color: "#3DDC84", // Android green
      secondaryColor: "#075E54", // Darker green
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1 7 7 0 0 0-7-7h0a7 7 0 0 0-7 7Z"></path><path d="M5 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1 7 7 0 0 1-7 7h0a7 7 0 0 1-7-7Z"></path></svg>,
      image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=500&h=900&fit=crop&q=80",
      features: [
        "Material You design system",
        "Native hardware integration",
        "Google Play Store distribution",
        "Rich ecosystem integration",
        "Cross-device compatibility"
      ],
      technologies: [
        "Kotlin", "Jetpack Compose", "Room Database", "Retrofit", "Firebase"
      ],
      statistics: [
        { value: "2.5B+", label: "Active devices" },
        { value: "70%", label: "Global market share" },
        { value: "3,600+", label: "Device types" }
      ],
      advantages: [
        "Wider market reach",
        "Lower development costs",
        "Easier hardware integration",
        "Custom UI flexibility"
      ]
    },
    {
      id: "ios",
      name: "iOS",
      color: "#007AFF", // iOS blue
      secondaryColor: "#34AADC", // iOS light blue
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 5 7.5 1.088-.046 1.679-.5 3-.5 1.312 0 1.5.5 3 .5s4-3 4-5c-.028-.01-2.472-.403-2.5-3 0-2.5 2.5-3.5 2.5-3.5-.5-.411-2.345-2-4.5-2-1.699 0-3 .5-3.5.5-.563 0-1.5-.5-3-.5z"></path><path d="M9 7c-.5-2.5 1.5-4 3-4 1.5 0 3 1.5 3 3"></path></svg>,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=900&fit=crop&q=80",
      features: [
        "Human Interface Guidelines",
        "Seamless Apple ecosystem",
        "App Store distribution",
        "Enhanced privacy features", 
        "High-performance graphics"
      ],
      technologies: [
        "Swift", "SwiftUI", "Core Data", "Combine", "CloudKit"
      ],
      statistics: [
        { value: "1.2B+", label: "Active devices" },
        { value: "30%", label: "Global market share" },
        { value: "97%", label: "Latest OS adoption" }
      ],
      advantages: [
        "Higher user spending",
        "Advanced security features",
        "Consistent performance",
        "Simpler testing process"
      ]
    },
    {
      id: "hybrid",
      name: "Cross-Platform",
      color: "#61DAFB", // React blue
      secondaryColor: "#764ABC", // Flutter/purple
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m16.2 7.8-2 6.3-6.4 2.1 2-6.3z"></path></svg>,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=900&fit=crop&q=80",
      features: [
        "Single codebase for all platforms",
        "Faster development time",
        "Consistent user experience",
        "Easier maintenance",
        "Cost-effective solution"
      ],
      technologies: [
        "React Native", "Flutter", "Capacitor", "Expo", "NativeScript"
      ],
      statistics: [
        { value: "38%", label: "Development time savings" },
        { value: "33%", label: "Cost reduction" },
        { value: "99%", label: "Code reusability" }
      ],
      advantages: [
        "Reduced time-to-market",
        "Unified development team",
        "Lower maintenance overhead",
        "Consistent brand experience"
      ]
    }
  ]
}) => {
  const [activePlatform, setActivePlatform] = useState(platforms[0].id);
  const [activeTab, setActiveTab] = useState("features");
  const scrollRef = useRef(null);

  const currentPlatform = platforms.find(platform => platform.id === activePlatform);

  const handlePlatformChange = (platformId) => {
    setActivePlatform(platformId);
    setActiveTab("features"); // Reset to features tab when changing platform
    
    // Scroll to component if on mobile
    if (window.innerWidth < 768 && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-16 px-4" ref={scrollRef}>
      {/* Section header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
          <Smartphone className="w-4 h-4 mr-2" /> Mobile Development
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-foreground/70">{subtitle}</p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Platform selector tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {platforms.map((platform) => (
            <motion.button
              key={platform.id}
              onClick={() => handlePlatformChange(platform.id)}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              className={`relative px-5 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                activePlatform === platform.id
                  ? 'bg-white dark:bg-zinc-800 shadow-lg border-2 border-transparent'
                  : 'bg-secondary/5 dark:bg-zinc-900 border-2 border-secondary/20 dark:border-zinc-800 opacity-70 hover:opacity-100'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${
                    activePlatform === platform.id ? platform.color : '#d1d5db'
                  }30`
                }}
              >
                <div
                  style={{
                    color:
                      activePlatform === platform.id
                        ? platform.color
                        : undefined
                  }}
                >
                  {platform.icon}
                </div>
              </div>
              <span
                className={`font-medium ${
                  activePlatform === platform.id
                    ? 'text-foreground'
                    : 'text-foreground/60'
                }`}
              >
                {platform.name}
              </span>
              {activePlatform === platform.id && (
                <motion.div
                  layoutId="platformIndicator"
                  className="absolute -bottom-1 left-3 right-3 h-0.5"
                  style={{ background: `linear-gradient(to right, ${platform.color}, ${platform.secondaryColor})` }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Content tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-secondary/10 p-1 rounded-xl">
            {["features", "technology", "advantages"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary/5'
                }`}
              >
                {tab === "features" && "Features"}
                {tab === "technology" && "Technology Stack"}
                {tab === "advantages" && "Advantages"}
              </button>
            ))}
          </div>
        </div>

        {/* Platform content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePlatform}-${activeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            {/* Left side: Content based on active tab */}
            <div className="md:col-span-7 space-y-8 order-2 md:order-1">
              {/* Platform header */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: currentPlatform.color }}
                  >
                    <div className="text-white">
                      {currentPlatform.icon}
                    </div>
                  </div>
                  {currentPlatform.name} Development
                </h3>
                <div 
                  className="h-1 w-20 rounded-full"
                  style={{ background: `linear-gradient(to right, ${currentPlatform.color}, ${currentPlatform.secondaryColor})` }}
                ></div>
              </div>
              
              {/* Features Tab */}
              {activeTab === "features" && (
                <div>
                  <p className="text-foreground/70 mb-6 text-lg">
                    {currentPlatform.id === "android" && "We build powerful Android applications with material design principles and native performance optimizations."}
                    {currentPlatform.id === "ios" && "We create elegant iOS applications that follow Apple's design guidelines and leverage the full potential of the platform."}
                    {currentPlatform.id === "hybrid" && "We develop efficient cross-platform solutions that work seamlessly across iOS and Android from a single codebase."}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-4 text-lg">Key Platform Features:</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {currentPlatform.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 bg-secondary/5 p-4 rounded-lg hover:bg-secondary/10 transition-colors"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" 
                            style={{ backgroundColor: currentPlatform.color }}>
                            <Check size={14} className="text-white" />
                          </div>
                          <span className="font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {currentPlatform.statistics.map((stat, index) => (
                      <div key={index} className="text-center p-4 rounded-xl bg-secondary/5">
                        <div className="text-2xl font-bold" style={{ color: currentPlatform.color }}>{stat.value}</div>
                        <div className="text-sm text-foreground/60">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Technology Tab */}
              {activeTab === "technology" && (
                <div>
                  <p className="text-foreground/70 mb-6 text-lg">
                    {currentPlatform.id === "android" && "Our Android development leverages the latest technologies and best practices to deliver exceptional apps."}
                    {currentPlatform.id === "ios" && "We utilize cutting-edge iOS technologies to create powerful, efficient, and beautiful applications."}
                    {currentPlatform.id === "hybrid" && "Our cross-platform approach uses modern frameworks that provide near-native performance with the benefits of shared code."}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                        <Shield className="w-5 h-5" style={{ color: currentPlatform.color }} />
                        Core Technologies
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {currentPlatform.technologies.map((tech, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors"
                          >
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentPlatform.color }}></div>
                            <span>{tech}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                          <Zap className="w-5 h-5" style={{ color: currentPlatform.color }} />
                          Development Process
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Development Speed</span>
                            <div className="w-24 h-3 bg-secondary/20 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full"
                                style={{ 
                                  width: currentPlatform.id === "hybrid" ? "90%" : "70%",
                                  backgroundColor: currentPlatform.color
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Performance</span>
                            <div className="w-24 h-3 bg-secondary/20 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full"
                                style={{ 
                                  width: currentPlatform.id === "hybrid" ? "80%" : "95%",
                                  backgroundColor: currentPlatform.color
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Maintainability</span>
                            <div className="w-24 h-3 bg-secondary/20 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full"
                                style={{ 
                                  width: currentPlatform.id === "hybrid" ? "95%" : "80%",
                                  backgroundColor: currentPlatform.color
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                          <BarChart className="w-5 h-5" style={{ color: currentPlatform.color }} />
                          Integration Capabilities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full bg-secondary/10 text-sm">APIs</span>
                          <span className="px-3 py-1 rounded-full bg-secondary/10 text-sm">Cloud Services</span>
                          <span className="px-3 py-1 rounded-full bg-secondary/10 text-sm">Analytics</span>
                          <span className="px-3 py-1 rounded-full bg-secondary/10 text-sm">Payment Systems</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Advantages Tab */}
              {activeTab === "advantages" && (
                <div>
                  <p className="text-foreground/70 mb-6 text-lg">
                    {currentPlatform.id === "android" && "Android development offers unique benefits that can give your application a competitive edge in the market."}
                    {currentPlatform.id === "ios" && "iOS development provides distinct advantages that can enhance user experience and drive business success."}
                    {currentPlatform.id === "hybrid" && "Cross-platform development brings significant benefits to businesses looking to maximize their mobile presence efficiently."}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {currentPlatform.advantages.map((advantage, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-5 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-secondary/10 hover:border-primary/20 transition-all group"
                      >
                        <h4 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{advantage}</h4>
                        <div className="w-12 h-1 rounded-full mb-3" style={{ backgroundColor: currentPlatform.color }}></div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-6">
                      <MailCheck className="w-5 h-5" style={{ color: currentPlatform.color }} />
                      <h4 className="font-semibold text-lg">Ready to get started?</h4>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-transform hover:scale-105"
                        style={{ background: `linear-gradient(to right, ${currentPlatform.color}, ${currentPlatform.secondaryColor})` }}
                      >
                        Request Consultation
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-secondary/20 hover:border-primary/30 transition-all">
                        Download Brochure
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right side: Phone mockup */}
            <div className="md:col-span-5 flex justify-center order-1 md:order-2">
              <div className="relative">
                {/* Background decorative elements */}
                <div 
                  className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-20 -z-10"
                  style={{ backgroundColor: currentPlatform.color }}
                ></div>
                <div 
                  className="absolute -left-20 -top-20 w-48 h-48 rounded-full blur-3xl opacity-10 -z-10"
                  style={{ backgroundColor: currentPlatform.secondaryColor }}
                ></div>
                
                {/* Phone device */}
                <motion.div 
                  className="relative w-[280px] h-[560px] drop-shadow-2xl"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror", 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >
                  {/* Phone frame */}
                  <div className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-xl overflow-hidden border-8 border-gray-800">
                    {/* Screen content */}
                    <img 
                      src={currentPlatform.image} 
                      alt={`${currentPlatform.name} app example`}
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* UI overlay elements */}
                    {currentPlatform.id === "ios" && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-black rounded-b-xl"></div>
                    )}
                    
                    {/* Bottom navigation */}
                    <div className="absolute bottom-0 inset-x-0 h-14 bg-black/50 backdrop-blur-md flex items-center justify-around px-6">
                      {['home', 'search', 'notifications', 'profile'].map((icon, index) => (
                        <div 
                          key={index} 
                          className={`w-8 h-8 rounded-full ${index === 0 ? 'bg-white/30 text-white' : 'bg-white/5 text-white/70'} flex items-center justify-center`}
                        >
                          {/* Use simple shapes instead of icons */}
                          {icon === 'home' && <div className="w-3 h-3 bg-white rounded-sm"></div>}
                          {icon === 'search' && <div className="w-3 h-3 border-2 border-white/70 rounded-full"></div>}
                          {icon === 'notifications' && <div className="w-3 h-3 border-2 border-white/70 rounded-sm"></div>}
                          {icon === 'profile' && <div className="w-3 h-3 bg-white/70 rounded-full"></div>}
                        </div>
                      ))}
                    </div>
                    
                    {/* Platform branding */}
                    <div 
                      className="absolute top-10 left-10 px-3 py-1 rounded-full text-xs text-white"
                      style={{ backgroundColor: currentPlatform.color }}
                    >
                      {currentPlatform.name}
                    </div>
                  </div>
                </motion.div>
                
                {/* Feature indicators */}
                {activeTab === "features" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -right-4 top-40 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentPlatform.color }}></div>
                      <div className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-800 shadow-lg text-xs">
                        Responsive UI
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -left-4 top-1/4 flex items-center gap-2"
                    >
                      <div className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-800 shadow-lg text-xs">
                        Native Features
                      </div>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentPlatform.color }}></div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                      className="absolute -right-4 bottom-1/3 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentPlatform.color }}></div>
                      <div className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-800 shadow-lg text-xs">
                        Secure Data
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobilePlatformShowcase;
