import React, { useEffect, useState, useCallback } from 'react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { 
  Play, 
  Globe, 
  Users, 
  ChartBar, 
  Target,
  CheckCircle 
} from 'lucide-react';

// Stats data
const STATS = [
  { value: '500+', label: 'Clients Worldwide' },
  { value: '95%', label: 'Client Retention' },
  { value: '$2.5M', label: 'Revenue Generated' },
  { value: '10+', label: 'Years Experience' }
];

// Services data
const SERVICES = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Strategy Consulting",
    description: "Develop winning business strategies through data-driven insights and market analysis"
  },
  // Other services would be added here
];

// Feature benefits data
const BENEFITS = [
  { title: "AI Script", checked: true },
  { title: "AI Background", checked: true },
  { title: "AI Voice Generator", checked: true }
];

// Export platforms data
const EXPORT_PLATFORMS = [
  { name: "Instagram" },
  { name: "TikTok" },
  { name: "YouTube" },
  { name: "Custom" }
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ConsultingHero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-violet-950" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
      
      {/* 3D Elements */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-violet-200 to-purple-200">
              Strategic Consulting<br />
              for Digital Growth
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transform your business with data-driven insights and expert guidance. 
              We help companies achieve sustainable growth in the digital age.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full font-medium text-lg transition-all hover:scale-105">
                Schedule Consultation
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button className="flex items-center gap-2 px-6 py-4 border border-violet-500/30 rounded-full font-medium hover:bg-violet-500/10 transition-colors">
                <Play className="w-5 h-5" />
                Watch Case Study
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {STATS.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Reusable components
const GradientButton = ({ children, className = "", primary = true }) => {
  return (
    <button 
      className={`group relative ${primary ? 
        "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 shadow-lg shadow-purple-700/30 hover:shadow-purple-700/50" : 
        "border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/10 backdrop-blur-sm"} 
        rounded-full transition-all duration-300 ${className}`}
    >
      {children}
      {primary && (
        <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
};

const FeatureCard = ({ number, title, children, className = "" }) => {
  return (
    <div className={`bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-800/80 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-800/20 ${className}`}>
      <div className="mb-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-fuchsia-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">{number}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};

const VideoGeneration = () => {
  const [scrollY, setScrollY] = useState(0);
  
  // Memoized scroll handler for better performance
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <PageTransition>
      <div className="bg-black text-white min-h-screen overflow-hidden relative">
        {/* Animated background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900 opacity-80" />
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYxMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        
        {/* Content Container */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="pt-20 pb-16 text-center px-4 md:px-8 bg-gradient-to-b from-transparent to-black/50 backdrop-blur-sm">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="animate-fade-in"
            >
              <div className="inline-block mb-4 px-3 py-1 bg-purple-500/20 backdrop-blur-md rounded-full">
                <p className="text-sm font-medium text-purple-200">Unlock Your Creative Potential</p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-500 to-fuchsia-500">
                Fastest & Easiest Way to<br />
                Generate Short <span className="relative">
                  Videos
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-full"></span>
                </span>
              </h1>
              <p className="mb-8 text-gray-300 max-w-xl mx-auto text-lg leading-relaxed">
                Generate unlimited short videos at once with automatic captions, effects, backgrounds, and music.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                <GradientButton className="px-8 py-4 font-medium text-lg">
                  Start Free Trial
                </GradientButton>
                <GradientButton className="flex items-center gap-2 px-6 py-3" primary={false}>
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Watch Demo
                </GradientButton>
              </div>
            </motion.div>

            {/* Video Demo Box */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 mt-12 border border-gray-800/80 shadow-xl shadow-purple-900/20"
            >
              <div className="text-left mb-4">
                <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-400">Turn your Text into Video:</h3>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <input 
                    type="text" 
                    className="w-full bg-gray-800/80 border border-gray-700/80 rounded-lg p-4 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" 
                    placeholder="Enter video text"
                  />
                  <div className="bg-gray-800/80 border border-gray-700/80 rounded-lg p-4 h-32 text-base text-gray-400 transition-all focus-within:ring-2 focus-within:ring-purple-500/50">
                    <p>Write your AI prompt for your narrative</p>
                  </div>
                  <GradientButton className="w-full rounded-lg py-3 mt-4 text-base font-medium">
                    Generate
                  </GradientButton>
                </div>
                <div className="flex-1">
                  <div className="flex space-x-3 mb-4">
                    {[1, 2].map((item) => (
                      <div key={item} className="bg-indigo-900/40 rounded-lg h-24 w-1/2 relative overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer">
                        <img src="/api/placeholder/150/100" alt="Sample video thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 bg-purple-600/80 h-6 w-6 rounded-full flex items-center justify-center">
                          <Play className="h-3 w-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-800/80 border border-gray-700/80 rounded-lg p-4 h-32 flex items-center justify-center">
                    <div className="w-full h-10 bg-gray-700/80 rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center px-2">
                        <div className="relative w-full h-1.5">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"></div>
                          <div className="absolute h-4 w-4 rounded-full bg-white shadow-lg -mt-1 transform translate-x-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <GradientButton className="w-full rounded-lg py-3 text-base font-medium mt-4">
                    Generate Audio Track
                  </GradientButton>
                </div>
              </div>
              <div className="flex justify-around text-sm text-gray-400 mt-4">
                {BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-5 h-5 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full mr-2 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3" />
                    </span>
                    <span>{benefit.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Features Section 1 */}
          <section className="py-24 text-center px-4 md:px-8 relative">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/50 to-transparent z-0"></div>
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Turn ideas into<br />
                  short videos in <span className="relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-500">seconds</span>
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-full"></span>
                  </span>
                </h2>
                <p className="mb-16 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                  Produce videos in no time thanks to automatic generation 
                  of scripts, effects, backgrounds, and music.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <FeatureCard number="1" title="Select Story Type">
                    <div className="flex space-x-2 mb-4 justify-center">
                      <button className="bg-gray-800/80 hover:bg-gray-700/80 rounded-full px-4 py-2 text-sm transition-all">Story</button>
                      <button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full px-4 py-2 text-sm shadow-lg shadow-purple-800/20">News</button>
                      <button className="bg-gray-800/80 hover:bg-gray-700/80 rounded-full px-4 py-2 text-sm transition-all">Sales</button>
                    </div>
                    <div className="mb-4">
                      <input 
                        type="text" 
                        className="w-full bg-gray-800/80 border border-gray-700/80 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" 
                        placeholder="Video Topic"
                      />
                    </div>
                    <div className="text-center text-sm text-gray-300 font-medium">
                      <p className="mb-2">Write & Guide</p>
                      <p className="text-gray-400">Simply prompt your desired narrative and watch as our AI generates compelling content.</p>
                    </div>
                  </FeatureCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <FeatureCard number="2" title="Select Background">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-indigo-900/40 rounded-lg h-16 overflow-hidden group cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all">
                          <img src="/api/placeholder/100/80" alt="Background thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-sm text-gray-300 font-medium">
                      <p className="mb-2">Customize & Style</p>
                      <p className="text-gray-400">Choose from numerous pre-set visuals or have the AI suggest the best options for your narrative.</p>
                    </div>
                  </FeatureCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <FeatureCard number="3" title="Export">
                    <div className="flex justify-center items-center h-24 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center group cursor-pointer hover:scale-110 transition-all">
                        <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center group-hover:scale-90 transition-transform">
                          <Play className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-gray-300 font-medium">
                      <p className="mb-2">Finish & Export</p>
                      <p className="text-gray-400">Preview your video, make any final adjustments, then export in seconds.</p>
                    </div>
                  </FeatureCard>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <button className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-lg">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full group-hover:w-full group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-r from-purple-400 to-fuchsia-400"></span>
                  <span className="relative text-white group-hover:text-white transition-colors">Sign up free</span>
                </button>
              </motion.div>
            </div>
          </section>

          {/* Features Section 2 - Parallax Effect */}
          <section className="py-32 text-center px-4 md:px-8 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black/70 to-black/40 z-0"></div>
            <div 
              className="absolute inset-0 opacity-20 z-0"
              style={{
                backgroundSize: '200px 200px',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            ></div>
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Your go-to tool for crafting<br />
                  viral Shorts <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-500">using AI</span>
                </h2>
                <p className="mb-12 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                  Produce an endless range of short videos automatically. Automatically generate captions, effects, backgrounds, and music for you.
                </p>
                
                <GradientButton className="px-8 py-4 font-medium text-lg mb-16">
                  Learn more
                </GradientButton>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Feature Cards */}
                {[
                  {
                    id: 1,
                    title: "Create stunning visuals",
                    type: "visual",
                    delay: 0.1
                  },
                  {
                    id: 2,
                    title: "Your AI-powered video creator",
                    type: "center",
                    delay: 0.2
                  },
                  {
                    id: 3,
                    title: "Visual Inspiration",
                    type: "grid",
                    delay: 0.3
                  },
                  {
                    id: 4,
                    title: "AI Video Processing",
                    type: "list",
                    delay: 0.4
                  },
                  {
                    id: 5,
                    title: "Export Options",
                    type: "export",
                    delay: 0.5
                  }
                ].map((feature) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: feature.delay }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/80 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-800/20"
                  >
                    {feature.type === "visual" && (
                      <>
                        <div className="mb-4 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-400">{feature.title}</div>
                        <div className="h-40 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl mb-4 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
                          <div className="absolute bottom-3 left-3 w-8 h-8 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="h-4 w-4" />
                          </div>
                        </div>
                      </>
                    )}

                    {feature.type === "center" && (
                      <div className="text-center h-full flex items-center justify-center">
                        <div>
                          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center mx-auto mb-6 group cursor-pointer hover:scale-110 transition-transform">
                            <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center group-hover:scale-90 transition-transform">
                              <Play className="h-5 w-5" />
                            </div>
                          </div>
                          <p className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-400">{feature.title}</p>
                        </div>
                      </div>
                    )}

                    {feature.type === "grid" && (
                      <>
                        <div className="mb-4 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-400">{feature.title}</div>
                        <div className="grid grid-cols-2 gap-3">
                          {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-indigo-900/40 rounded-lg aspect-square overflow-hidden group cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all">
                              <img 
                                src={`/api/placeholder/${item}`} 
                                alt="Inspiration thumbnail" 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {feature.type === "list" && (
                      <>
                        <div className="mb-4 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-400">
                          {feature.title}
                        </div>
                        <div className="space-y-4">
                          {["Auto Captions", "Smart Effects", "Voice Over", "Music"].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4" />
                              </span>
                              <span className="text-gray-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {feature.type === "export" && (
                      <>
                        <div className="mb-4 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-400">
                          {feature.title}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {EXPORT_PLATFORMS.map((platform, index) => (
                            <button
                              key={index}
                              className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all"
                            >
                              <span className="text-sm font-medium">{platform.name}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Add CTA Section */}
          <section className="py-24 text-center px-4 md:px-8 relative">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-fuchsia-200">
                  Start Creating Today
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of content creators who are already using our AI-powered video generation platform.
                </p>
                <GradientButton className="px-8 py-4 text-lg font-medium">
                  Get Started Free
                </GradientButton>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default VideoGeneration;