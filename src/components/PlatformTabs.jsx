import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Check, ArrowRight } from "lucide-react";

const PlatformTabs = ({ 
  platforms = [
    {
      id: "android",
      name: "Android",
      color: "#3DDC84", // Android green
      icon: <Smartphone className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=500&h=900&fit=crop&q=80",
      features: [
        "Material Design components",
        "Native performance",
        "Google Play Store integration",
        "Rich ecosystem integration",
        "Robust notification system"
      ]
    },
    {
      id: "ios",
      name: "iOS",
      color: "#007AFF", // iOS blue
      icon: <Smartphone className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=900&fit=crop&q=80",
      features: [
        "Human Interface design principles",
        "Seamless Apple ecosystem",
        "App Store distribution",
        "Enhanced privacy features", 
        "High performance graphics"
      ]
    }
  ]
}) => {
  const [activePlatform, setActivePlatform] = useState(platforms[0].id);
  const currentPlatform = platforms.find(platform => platform.id === activePlatform);

  return (
    <div className="w-full max-w-7xl mx-auto py-12">
      {/* Platform selector tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-secondary/10 p-1 rounded-xl">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              className={`relative px-5 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ${
                activePlatform === platform.id
                  ? "bg-white dark:bg-zinc-800 shadow-lg border-transparent"
                  : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`View ${platform.name} platform details`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${
                    activePlatform === platform.id
                      ? platform.color
                      : "#d1d5db"
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
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                {platform.name}
              </span>
              {activePlatform === platform.id && (
                <motion.div
                  layoutId="platformIndicator"
                  className="absolute -bottom-1 left-3 right-3 h-0.5"
                  style={{ backgroundColor: platform.color }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Platform content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePlatform}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left side: Features & Description */}
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4">{currentPlatform.name} Development</h3>
            <p className="text-foreground/70 mb-6">
              We craft exceptional {currentPlatform.name} applications that leverage platform-specific 
              design principles and technical capabilities for the best possible user experience.
            </p>
            
            <h4 className="font-semibold mb-3 text-lg">Key Features:</h4>
            <ul className="space-y-3 mb-8">
              {currentPlatform.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" 
                    style={{ backgroundColor: currentPlatform.color }}>
                    <Check size={12} className="text-white" />
                  </div>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="mt-6">
              <button 
                className="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium gap-2 transition-all hover:opacity-90"
                style={{ backgroundColor: currentPlatform.color }}
              >
                Explore {currentPlatform.name} Solutions
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Right side: Device mockup */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-[280px] h-[560px]">
              {/* Phone frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-xl overflow-hidden border-8 border-gray-800">
                {/* Screen content */}
                <img 
                  src={currentPlatform.image} 
                  alt={`${currentPlatform.name} app example`}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Notch (for iOS) */}
                {currentPlatform.id === "ios" && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-black rounded-b-xl"></div>
                )}
                
                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/80 rounded-full"></div>
              </div>
              
              {/* Decorative elements */}
              <div 
                className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: currentPlatform.color }}
              ></div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PlatformTabs;
