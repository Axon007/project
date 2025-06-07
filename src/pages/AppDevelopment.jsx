import { motion } from "framer-motion";
import PageTransition from '../components/PageTransition';
import { ContainerScroll } from "../components/ui/container-scroll-animation"; 
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import Android from "@/components/magicui/android";
import { useState } from "react";
import DevicePlatformShowcase from "../components/DevicePlatformShowcase";


import { 
  Code, Smartphone, Zap, Shield, 
  ArrowRight, Star, Settings,
  Layers, BarChart, Users, 
  CheckCircle, ArrowUpRight,
  Layout, Phone, Tablet,
  TrendingUp, Search
} from "lucide-react";

const CosmicSphere = () => {
  return (
    <div className="absolute right-24 top-40 h-80 w-80 lg:w-96 lg:h-96 blur-3xl rounded-full bg-gradient-to-br from-primary/30 via-purple-600/20 to-blue-600/30 animate-slow-spin hidden lg:block" />
  );
};
// DeviceShowcase component with tabs for iPhone and Android devices
const DeviceShowcase = () => {
  const [activeTab, setActiveTab] = useState("iphone");
  
  return (
    <div className="w-full">
      {/* Tab Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-card/80 backdrop-blur-md border border-border p-1 rounded-xl flex items-center shadow-lg">
          <button 
            className={`px-5 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all duration-200 ${
              activeTab === "iphone" 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-foreground hover:bg-secondary/30"
            }`}
            onClick={() => setActiveTab("iphone")}
          >
            <Phone className="w-4 h-4" />
            iPhone
          </button>
          <button 
            className={`px-5 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all duration-200 ${
              activeTab === "android" 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-foreground hover:bg-secondary/30"
            }`}
            onClick={() => setActiveTab("android")}
          >
            <Smartphone className="w-4 h-4" />
            Android
          </button>
        </div>
      </div>
      
      {/* Device Display */}
      <motion.div 
        className="relative flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >        {/* iPhone Display */}
        {activeTab === "iphone" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Light effects behind iPhone */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 rounded-full blur-2xl opacity-70 animate-pulse"></div>
            
            <div className="relative border-[3px] border-foreground/20 rounded-[40px] overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.25),inset_0_0_10px_rgba(0,0,0,0.1)] group hover:shadow-[0_0_50px_rgba(99,102,241,0.3),inset_0_0_15px_rgba(0,0,0,0.2)] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-black/0 z-10 rounded-[40px]"></div>
              
              {/* Subtle reflection effect */}
              <motion.div
                animate={{ 
                  opacity: [0, 0.07, 0],
                  x: ["-100%", "100%"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 rounded-[40px]"
              />
              
              <Iphone15Pro
                scale={0.7}
                className="w-[280px] h-[560px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-[1.01] transition-transform duration-500"
                screenshotUrl="/vite.svg"
                alt="iPhone App Development Preview"
              />
            </div>
            
            {/* iPhone features */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:bg-primary/10 transition-colors"
              >
                <span className="text-xs font-medium text-foreground">Face ID</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:bg-primary/10 transition-colors"
              >
                <span className="text-xs font-medium text-foreground">App Clips</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:bg-primary/10 transition-colors"
              >
                <span className="text-xs font-medium text-foreground">ARKit</span>
              </motion.div>
            </div>
          </motion.div>
        )}
    
        {/* Android Display */}
        {activeTab === "android" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Light effects behind Android */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 rounded-full blur-2xl opacity-70 animate-pulse"></div>
            
            <div className="relative border-[3px] border-foreground/20 rounded-[40px] overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.25),inset_0_0_10px_rgba(0,0,0,0.1)] group hover:shadow-[0_0_50px_rgba(99,102,241,0.3),inset_0_0_15px_rgba(0,0,0,0.2)] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-black/0 z-10 rounded-[40px]"></div>
              
              {/* Subtle reflection effect */}
              <motion.div
                animate={{ 
                  opacity: [0, 0.07, 0],
                  x: ["-100%", "100%"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 rounded-[40px]"
              />
              
              <Android
                scale={0.7}
                className="w-[280px] h-[560px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-[1.01] transition-transform duration-500"
                screenshotUrl="/vite.svg"
                alt="Android App Development Preview"
              />
            </div>
            
            {/* Android features */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:bg-primary/10 transition-colors"
              >
                <span className="text-xs font-medium text-foreground">Material Design</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:bg-primary/10 transition-colors"
              >
                <span className="text-xs font-medium text-foreground">Widgets</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:bg-primary/10 transition-colors"
              >
                <span className="text-xs font-medium text-foreground">Jetpack</span>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* Platform stats */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-md border border-border rounded-xl p-4 flex items-center gap-8 shadow-lg">
          <div className="text-center">
            <p className="text-xs text-foreground/60">App Stores</p>
            <p className="font-semibold">2</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-foreground/60">Market Share</p>
            <p className="font-semibold">99.6%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-foreground/60">Global Users</p>
            <p className="font-semibold">6.92B</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-foreground">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

// Feature card component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-primary/20 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </motion.div>
  );
};

// Service card component
const ServiceCard = ({ icon, title, description, features, index }) => {
  // Aesthetic gradient styles that complement both light and dark themes
  const gradients = [
    "from-slate-600 via-slate-700 to-slate-800 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900",
    "from-blue-600 via-blue-700 to-blue-800 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900", 
    "from-purple-600 via-purple-700 to-purple-800 dark:from-purple-700 dark:via-purple-800 dark:to-purple-900",
    "from-indigo-600 via-indigo-700 to-indigo-800 dark:from-indigo-700 dark:via-indigo-800 dark:to-indigo-900",
    "from-gray-600 via-gray-700 to-gray-800 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900"
  ];
  const gradientClass = gradients[index % gradients.length];
  
    return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative rounded-3xl overflow-hidden border border-white/10 shadow-md h-[400px] group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}></div>
      <div className="relative h-full p-8 flex flex-col justify-between text-white">
        <div>
          <div className="p-3 bg-white/20 rounded-xl inline-flex mb-6">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-white/90">{description}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-white" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

// Price card component
const PriceCard = ({ title, price, description, features, popular }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-8 rounded-2xl ${popular ? 'bg-gradient-to-br from-primary via-blue-500 to-purple-500 text-primary-foreground' : 'bg-secondary/5'} backdrop-blur-sm border ${popular ? 'border-primary/50' : 'border-secondary/20'} transition-all relative`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className={`${popular ? 'text-primary-foreground/70' : 'text-foreground/70'}`}>/month</span>
      </div>
              <p className={`mb-6 ${popular ? 'text-primary-foreground/70' : 'text-foreground/70'}`}>{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Star className="w-4 h-4 flex-shrink-0" />
            <span className={popular ? 'text-primary-foreground/90' : 'text-foreground/90'}>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
        popular 
          ? 'bg-background text-primary hover:bg-background/90' 
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
      }`}>
        Get Started <ArrowUpRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

function AppDevelopment() {
  const features = [
    {
      icon: <Code />,
      title: "Custom Development",
      description: "Tailored solutions built from the ground up to meet your specific business needs"
    },
    {
      icon: <Smartphone />,
      title: "Cross-Platform",
      description: "Native apps for iOS and Android with shared codebase for efficient development"
    },
    {
      icon: <Zap />,
      title: "High Performance",
      description: "Optimized code and efficient architecture for lightning-fast performance"
    },
    {
      icon: <Shield />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with regular updates and maintenance"
    }
  ];  const services = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Native App Development",
      description: "Build powerful native applications",
      features: [
        "iOS and Android Development",
        "Native Performance",
        "Platform-Specific Features",
        "Custom API Integration"
      ]
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Cross-Platform Solutions",
      description: "One codebase, multiple platforms",
      features: [
        "React Native Development",
        "Flutter Development",
        "Code Reusability",
        "Faster Time-to-Market"
      ]
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Analytics & Testing",
      description: "Data-driven development approach",
      features: [
        "User Analytics Integration",
        "Performance Monitoring",
        "A/B Testing",
        "Crash Reporting"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "Creating engaging experiences",
      features: [
        "User Research",
        "Wireframing & Prototyping",
        "Visual Design",
        "Usability Testing"
      ]
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "App Store Optimization",
      description: "Maximize visibility and downloads",
      features: [
        "Keyword Research & Analysis",
        "Metadata Optimization",
        "Conversion Rate Optimization",
        "Competitive Analysis & Monitoring"
      ]
    }
  ];
  const pricing = [
    {
      title: "Starter",
      price: "999",
      description: "Perfect for small businesses and startups",
      features: [
        "Basic app development",
        "iOS or Android platform",
        "Standard UI components",
        "Basic analytics",
        "Basic ASO setup",
        "3 months support"
      ],
      popular: false
    },
    {
      title: "Professional",
      price: "2499",
      description: "Ideal for growing businesses",
      features: [
        "Advanced app development",
        "iOS and Android platforms",
        "Custom UI/UX design",
        "Advanced analytics",
        "Complete ASO strategy",
        "12 months support"
      ],
      popular: true
    },
    {
      title: "Enterprise",
      price: "4999",
      description: "For large-scale applications",
      features: [
        "Full-scale app development",
        "Multi-platform support",
        "Premium UI/UX design",
        "Complete analytics suite",
        "Premium ASO & marketing",
        "24/7 priority support"
      ],
      popular: false
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
        <CosmicSphere />
          {/* Hero Section - Stunning App Designs */}        
          <section className="relative min-h-screen flex flex-col overflow-hidden">
  {/* Background elements */}
  <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10"></div>
  <div className="absolute top-0 right-0 w-[45vw] h-[45vw] max-w-[800px] max-h-[800px] bg-primary/20 rounded-full filter blur-[120px] opacity-70 -z-10"></div>
  <div className="absolute bottom-10 left-10 w-[30vw] h-[30vw] max-w-[600px] max-h-[600px] bg-blue-500/20 rounded-full filter blur-[100px] opacity-60 -z-10"></div>
  
  {/* Glassmorphic accent elements */}
  <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full bg-primary/20 mix-blend-multiply filter blur-[80px] animate-blob"></div>
  <div className="absolute bottom-40 right-1/4 w-64 h-64 rounded-full bg-blue-500/20 mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>

  {/* Top Half - Header Content with Glassmorphism */}
  <div className="container mx-auto px-4 md:px-6 z-10 pt-20 flex-1 flex items-center justify-center">
    <div className="text-center max-w-4xl backdrop-blur-md bg-background/80 border border-border rounded-3xl p-8 shadow-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >          <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm shadow-sm"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="text-sm font-medium text-primary">Next-Generation App Development</span>
          <span className="px-2 py-0.5 bg-primary/20 text-xs font-semibold rounded-full text-primary ml-1">2025</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >          <h1 className="text-5xl font-bold tracking-tight text-balance text-foreground sm:text-7xl mb-8 relative leading-tight">
            <span className="inline-block">Transforming Ideas Into</span>{" "}
            <span className="inline-block relative">
              <span className="relative z-10 inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
                  Exceptional
                </span>
                <svg className="absolute -bottom-2 w-full" viewBox="0 0 418 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 11C139.333 -1.66666 275.333 -1.66667 416 11" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round">
                    <animate attributeName="stroke-dasharray" from="0,500" to="500,0" dur="2s" begin="0s" fill="freeze" />
                  </path>
                  <defs>
                    <linearGradient id="paint0_linear" x1="209" y1="11" x2="209" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6D28D9"/>
                      <stop offset="1" stopColor="#3B82F6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </span>{" "}
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          We design and build cutting-edge mobile applications that deliver <span className="text-primary font-medium">seamless user experiences</span> and drive measurable business growth.
        </motion.p>
        
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.7 }}
  className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center"
>
<a 
  href="#contact" 
  className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group border border-primary/20"
>
  Start Your Project
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</a>

  
  <a 
    href="#portfolio" 
    className="px-8 py-4 bg-secondary/20 backdrop-blur-md border border-border text-foreground rounded-xl font-medium hover:bg-secondary/30 transition-all flex items-center justify-center gap-2 group shadow-lg"
  >
    View Our Work
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  </a>
</motion.div>

        

      </motion.div>
    </div>  </div>  {/* Bottom Half - iPhone Component with Background Image */}
  <div className="flex-1 flex items-center justify-center pb-20 relative">
    {/* Enhanced background with multiple layers */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden backdrop-blur-sm bg-background/60 border-t border-border"
      style={{ zIndex: 1 }}
    >
      {/* Main dashboard background */}
      <div className="relative">
        <motion.img
          initial={{ y: 20, opacity: 0.4 }}
          animate={{ y: 0, opacity: 0.7 }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
          alt="Project Development Dashboard"
          className="w-[1080px] max-h-[720px] rounded-xl object-cover shadow-lg"
        />
        
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl backdrop-blur-[2px]"></div>
        
        {/* Code snippets floating around */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute -left-20 top-1/4 w-60 bg-card/80 backdrop-blur-lg border border-border p-4 rounded-lg shadow-xl rotate-[-6deg]"
        >
          <div className="h-3 w-3/4 bg-primary/30 rounded-full mb-2"></div>
          <div className="h-3 w-1/2 bg-primary/20 rounded-full mb-2"></div>
          <div className="h-3 w-5/6 bg-primary/30 rounded-full mb-2"></div>
          <div className="h-3 w-2/3 bg-primary/20 rounded-full"></div>
        </motion.div>
          
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute -right-16 bottom-1/4 w-56 bg-card/80 backdrop-blur-lg border border-border p-4 rounded-lg shadow-xl rotate-[8deg]"
        >
          <div className="h-3 w-1/2 bg-blue-500/30 rounded-full mb-2"></div>
          <div className="h-3 w-3/4 bg-blue-500/20 rounded-full mb-2"></div>
          <div className="h-3 w-3/5 bg-blue-500/30 rounded-full"></div>
        </motion.div>
      </div>
    </motion.div>

    {/* iPhone Component in front with enhanced animations */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative"
      style={{ zIndex: 2 }}
    >      {/* Enhanced light effect behind the phone */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-primary/30 via-blue-500/20 to-transparent filter blur-3xl rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-primary/20 to-transparent filter blur-3xl rounded-full"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
        
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotateZ: [0, 1, 0, -1, 0],
        }}
        transition={{ 
          y: {
            duration: 4, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "easeInOut"
          },
          rotateZ: {
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }
        }}
        className="drop-shadow-2xl filter relative"
      >
        {/* Interactive buttons overlay */}
        <div className="absolute -right-8 lg:-right-12 top-1/4 z-10 flex flex-col gap-4 lg:gap-6">
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer border border-border shadow-lg hover:bg-primary/30 transition-colors"
                      >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground lg:w-5 lg:h-5"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
            </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer border border-border shadow-lg hover:bg-blue-500/30 transition-colors"
                      >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground lg:w-5 lg:h-5"><circle cx="12" cy="12" r="10"></circle><path d="m16 12-4-4v8z"></path></svg>
            </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 lg:w-10 lg:h-10 bg-violet-500/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer border border-border shadow-lg hover:bg-violet-500/30 transition-colors"
                      >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground lg:w-5 lg:h-5"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect width="7" height="5" x="7" y="7" rx="1"></rect><rect width="7" height="5" x="10" y="12" rx="1"></rect></svg>
            </motion.div>
        </div>

        <div className="relative border-[3px] border-foreground/20 rounded-[70px] overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.25),inset_0_0_10px_rgba(0,0,0,0.1)] group hover:shadow-[0_0_50px_rgba(99,102,241,0.3),inset_0_0_15px_rgba(0,0,0,0.2)] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-black/0 z-10 rounded-[70px]"></div>
          
          {/* Subtle reflection effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.07, 0],
              x: ["-100%", "100%"]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 rounded-[70px]"
          />
          
          <Iphone15Pro
            className="w-[300px] h-[600px] md:w-[350px] md:h-[700px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-[1.01] transition-transform duration-500"
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=430&h=880&fit=crop&crop=center"
            alt="App Development Screen"
          />
        </div>
      </motion.div>
        {/* Enhanced interactive elements around iPhone */}

      <motion.div 
        className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-tr from-blue-500/30 to-violet-500/30 rounded-full cursor-pointer"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1
        }}
        whileHover={{ 
          scale: 1.4, 
          opacity: 0.9
        }}
      />
      
      <motion.div 
        className="absolute top-1/3 -left-6 lg:-left-10 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-bl from-purple-500/30 to-pink-500/30 rounded-full cursor-pointer"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.5
        }}
        whileHover={{ 
          scale: 1.6, 
          opacity: 0.9
        }}
      />
      
      <motion.div 
        className="absolute top-2/3 -right-8 lg:-right-12 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-tl from-green-500/30 to-emerald-500/30 rounded-full cursor-pointer"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1.5
        }}
        whileHover={{ 
          scale: 1.5, 
          opacity: 0.9
        }}
      />
      

<motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute -right-32 bottom-[-120px] hidden lg:block w-[28rem] xl:w-[30rem] z-10" // Better responsive sizing
      >

{/* Content container */}
  <div className="p-6 md:p-8 rounded-2xl bg-card/80 border border-border backdrop-blur-sm shadow-xl"> {/* Reduced padding */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6"> {/* Better responsive layout */}
          <div className="max-w-xs lg:max-w-sm"> {/* Better responsive text container */}
        <h3 className="text-xl font-bold mb-2">Transform Your App Experience</h3> {/* Reduced heading size */}
        <p className="text-foreground/70 mb-4 text-sm"> {/* Smaller text and margin */}
          Our micro-interaction design system adds polish to your application, creating memorable experiences users love.
        </p>
        <div className="flex flex-wrap gap-2"> {/* Reduced gap between tags */}
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs border border-border">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Improved Engagement
          </div>
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs border border-border">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Higher Retention
          </div>
        </div>
      </div>

              <div className="rounded-xl overflow-hidden shadow-lg border border-border w-32 lg:w-36"> {/* Better responsive video container */}
        <video 
          width="144" 
          height="108" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-auto"
          poster="https://placehold.co/144x108/2a2a3c/FFFFFF/png?text=Micro-Demo"
        >
          <source src="your-interaction-demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>

      </motion.div>
      
      <motion.div 
        className="absolute top-2/3 -right-12 w-10 h-10 bg-green-500/20 rounded-full"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1.5
        }}
      />
    </motion.div>
  </div>
  
  



      {/* Services Section */}
      <section id="services" className="py-24 px-4 relative bg-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(var(--primary),0.08),transparent_40%)] -z-10"></div>
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                      <Smartphone className="w-4 h-4 mr-2" /> App Development
                    </span>              <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
                      Our Services
                    </h2>
                    <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                      Comprehensive mobile app development solutions for your business needs
                    </p>
                  </div>              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {services.map((service, index) => (
                      <ServiceCard key={index} {...service} index={index} />
                    ))}
                  </div>
                  
                  {/* CTA inside the Services section */}
                  <div className="mt-16">
                    <div className="flex justify-center">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="flex items-center gap-3 p-6 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border group max-w-2xl hover:border-primary/30 transition-colors"
                      >
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Smartphone className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">Need a custom app development solution?</h3>
                          <p className="text-sm text-foreground/70">Contact our team for a personalized consultation</p>
                        </div>
                        <div>
                          <a 
                            href="#contact" 
                            className="px-5 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            Get in Touch
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>        
      </section>


</section>



        
      
        <section className="relative py-28 md:py-36 px-4 overflow-hidden">
          
          <div className="max-w-7xl mx-auto relative z-10">







{/* App Feature Grid with Micro-interactions */}
<section className="py-28 px-4 relative bg-secondary/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
        Technical Expertise
      </span>      
      <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
        Multi-Platform Development
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        Comprehensive expertise across native mobile platforms and modern web technologies.
      </p>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: "iOS Development",
          description: "Native iOS apps with Swift and Objective-C for optimal performance",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>,
          gradient: "from-blue-500/70 via-indigo-600/70 to-purple-600/70"
        },
        {
          title: "Android Native",
          description: "High-performance Android applications using Kotlin and Java",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>,
          gradient: "from-green-500/70 via-emerald-600/70 to-teal-600/70"
        },
        {
          title: "Android Studio",
          description: "Professional development environment with advanced debugging and testing",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 9h6v6H9z"></path><path d="M12 3v18"></path><path d="M3 12h18"></path></svg>,
          gradient: "from-orange-500/70 via-red-600/70 to-pink-600/70"
        },
        {
          title: "Web Applications",
          description: "Modern web apps with React, Next.js, and cutting-edge frameworks",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>,
          gradient: "from-purple-500/70 via-violet-600/70 to-indigo-600/70"
        }
      ].map((feature, index) => (
        <div key={index} className="group relative h-[280px] rounded-3xl bg-secondary/5 backdrop-blur-sm border border-secondary/10 p-6 overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
          {/* Background gradient - different for each card */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-500`}></div>
          
          {/* Feature content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-all duration-300">
                <div className="text-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-foreground transition-colors duration-300">{feature.title}</h3>
              <p className="text-foreground/70 group-hover:text-primary-foreground/80 transition-colors duration-300">{feature.description}</p>
            </div>
            

          </div>
        </div>
      ))}
    </div>

    
    

  </div>
</section>
        <DevicePlatformShowcase />





{/* Interactive Feature Showcase */}
<section className="py-28 px-4 relative bg-gradient-to-b from-secondary/5 to-background">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <Zap className="w-4 h-4 mr-2" /> Interactive Features
      </span>      <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
        Rich Interactive Experiences
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        Transform ordinary interfaces into extraordinary experiences with our interactive features.
      </p>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 mt-20">
      {[
        {
          title: "Gesture Controls",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12"></path><path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0V12"></path><path d="M14 10.5v-2a1.5 1.5 0 0 1 3 0V14"></path><path d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2 .208a6 6 0 0 1-5.012-2.7A69.74 69.74 0 0 1 7 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 0 1 .536-2.022 1.867 1.867 0 0 1 2.28.28L8 13"></path></svg>,
          description: "Intuitive swipe, pinch, and tap interactions that feel natural and responsive."
        },
        {
          title: "Micro-animations",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="m5 19 7-7 7 7"></path><path d="m5 13 7-7 7 7"></path></svg>,
          description: "Subtle animations that provide feedback and delight users during interactions."
        },
        {
          title: "Real-time Updates",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21h5v-5"></path></svg>,
          description: "Instant data synchronization and live updates without page refreshes."
        },
        {
          title: "Smart Forms",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2H6"></path><line x1="9" y1="9" x2="10" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>,
          description: "Intelligent forms with real-time validation and contextual input assistance."
        }
      ].map((feature, index) => (
        <div key={index} className="flex flex-col items-center text-center px-4">
          <div className="relative mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-primary">
              {feature.icon}
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
              +
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
          <p className="text-foreground/70">{feature.description}</p>
        </div>
      ))}
    </div>          <div className="mt-24 relative">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full my-12"></div>
      

    </div>
  </div>
</section>


{/* Case Studies Section */}
<section className="py-24 px-4 relative bg-secondary/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <CheckCircle className="w-4 h-4 mr-2" /> Success Stories
      </span>      <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
        Case Studies
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        Discover how we've helped businesses transform their ideas into successful mobile applications.
      </p>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {[
        {
          title: "FitTrack Pro",
          category: "Fitness",
          image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80",
          results: "300% user growth in 6 months",
          description: "A comprehensive fitness tracking app with personalized workout plans and nutrition guidance."
        },
        {
          title: "QuickOrder",
          category: "Food Delivery",
          image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
          results: "50K+ daily orders processed",
          description: "Streamlined food ordering platform with real-time delivery tracking and payment processing."
        },
        {
          title: "SecurePay",
          category: "Finance",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
          results: "$10M+ in transactions monthly",
          description: "Secure mobile payment solution with advanced fraud detection and instant transfers."
        }
      ].map((project, index) => (
        <div key={index} className="rounded-xl overflow-hidden bg-background border border-secondary/10 hover:border-primary/20 transition-all shadow-sm hover:shadow-md">
          <div className="h-48 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{project.category}</span>
              <span className="text-sm font-medium text-primary">{project.results}</span>
            </div>
            <h3 className="text-xl font-bold mb-3">{project.title}</h3>
            <p className="text-foreground/70 text-sm mb-4">{project.description}</p>
            <a href="#" className="inline-flex items-center text-sm text-primary font-medium">
              View Case Study <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      ))}
    </div>
    
    <div className="text-center mt-12">
      <a href="#" className="inline-flex items-center px-6 py-3 border border-primary/30 text-primary rounded-xl font-medium hover:bg-primary/5 transition-all gap-2">
        View All Case Studies
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </div>
</section>

{/* Testimonials Section */}
<section className="py-24 px-4 relative">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <Star className="w-4 h-4 mr-2" /> Testimonials
      </span>      <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
        What Our Clients Say
      </h2>
      <p className="text-lg text-foreground/70">
        Real feedback from businesses we've helped achieve their app development goals.
      </p>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {[
        {
          quote: "The team delivered a stunning app that exceeded our expectations. Our user engagement has increased by 200% since launch.",
          author: "Sarah Johnson",
          position: "CEO, FitTrack",
          image: "https://i.pravatar.cc/100?img=5"
        },
        {
          quote: "From concept to deployment, the development process was smooth and transparent. The attention to detail and user experience design is unmatched.",
          author: "Michael Chen",
          position: "Founder, QuickOrder",
          image: "https://i.pravatar.cc/100?img=6"
        },
        {
          quote: "Implementing complex financial features seemed daunting, but their team made it feel effortless. Our app now processes millions in transactions securely.",
          author: "Lisa Rodriguez",
          position: "CTO, SecurePay",
          image: "https://i.pravatar.cc/100?img=7"
        }
      ].map((testimonial, index) => (
        <div key={index} className="p-6 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-primary/20 transition-all">
          <div className="flex items-center gap-1 mb-4 text-primary">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4" fill="currentColor" />
            ))}
          </div>
          <p className="text-foreground/80 italic mb-6">"{testimonial.quote}"</p>
          <div className="flex items-center gap-3">
            <img 
              src={testimonial.image}
              alt={testimonial.author}
              className="w-12 h-12 rounded-full"
              loading="lazy"
            />
            <div>
              <h4 className="font-semibold">{testimonial.author}</h4>
              <p className="text-sm text-foreground/60">{testimonial.position}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


        {/* ASO Stats Section */}
        <section className="py-16 px-4 relative bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                <TrendingUp className="w-4 h-4 mr-2" /> Impact Metrics
              </span>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
                App Success by the Numbers
              </h2>
            </div>
              {/* ASO Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              {[
                { value: "65%", label: "of all app downloads come directly from app store searches" },
                { value: "70%", label: "increase in visibility with optimized keywords" },
                { value: "36%", label: "higher conversion rate with optimized listings" },
                { value: "50%", label: "more organic downloads with ASO strategy" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-secondary/5 backdrop-blur-sm rounded-2xl p-6 border border-secondary/10 text-center hover:border-primary/20 transition-all"
                >
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500 mb-2">{stat.value}</div>
                  <p className="text-foreground/70">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

{/* FAQ Section */}
<section className="py-20 px-4 relative bg-secondary/5">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <Layout className="w-4 h-4 mr-2" /> FAQ
      </span>      <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
        Frequently Asked Questions
      </h2>
      <p className="text-lg text-foreground/70">
        Answers to common questions about our app development services.
      </p>
    </div>
      <div className="space-y-4 mt-12">
      {[
        {
          question: "How long does it take to develop an app?",
          answer: "The development timeline depends on the complexity of your app. Simple apps may take 2-3 months, while complex applications can take 4-6 months or more. We provide detailed timelines during our initial consultation."
        },
        {
          question: "What platforms do you develop for?",
          answer: "We develop native applications for iOS and Android, as well as cross-platform solutions using React Native and Flutter. Our team will recommend the best approach based on your specific requirements."
        },
        {
          question: "How much does app development cost?",
          answer: "App development costs vary based on complexity, features, and platforms. Our pricing starts at $15,000 for basic applications. We provide detailed quotes after understanding your project requirements."
        },
        {
          question: "Do you offer maintenance after launch?",
          answer: "Yes, we offer ongoing maintenance and support services to ensure your app remains up-to-date and functions smoothly. We have various support packages available to suit different needs."
        },
        {
          question: "Can you help with app store submission?",
          answer: "Absolutely! We handle the entire app submission process for both the Apple App Store and Google Play Store, ensuring your app meets all requirements and guidelines for approval."
        }
      ].map((faq, index) => (
        <div key={index} className="border border-secondary/10 rounded-xl overflow-hidden hover:border-primary/20 transition-all bg-secondary/5">
          <details className="group">
            <summary className="flex justify-between items-center p-5 font-medium cursor-pointer">
              <span>{faq.question}</span>
              <span className="text-primary transition group-open:rotate-180">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </span>
            </summary>
            <div className="px-5 pb-5 pt-0 bg-secondary/5">
              <p className="text-foreground/70">{faq.answer}</p>
            </div>
          </details>
        </div>
      ))}
    </div>
  </div>
</section>


          </div>
        </section>
 


        {/* CTA Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/5 border border-border text-center"
            >
              <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
                Ready to Build Your App?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Let's turn your vision into a successful mobile application.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all gap-2 group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

        </section>
        
        
      </div>
    </PageTransition>
  );
}

export default AppDevelopment;

