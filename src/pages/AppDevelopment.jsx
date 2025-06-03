import { motion } from "framer-motion";
import PageTransition from '../components/PageTransition';
import { ContainerScroll } from "../components/ui/container-scroll-animation"; 
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { 
  Code, Smartphone, Zap, Shield, 
  ArrowRight, Star, Settings,
  Layers, BarChart, Users, 
  CheckCircle, ArrowUpRight,
  Layout
} from "lucide-react";

const CosmicSphere = () => {
  return (
    <div className="absolute right-24 top-40 h-80 w-80 lg:w-96 lg:h-96 blur-3xl rounded-full bg-gradient-to-br from-primary/30 via-purple-600/20 to-blue-600/30 animate-slow-spin hidden lg:block" />
  );
};

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
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
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </motion.div>
  );
};

// Service card component
const ServiceCard = ({ icon, title, description, features }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-secondary/5 backdrop-blur-sm border border-secondary/20 hover:border-primary/20 transition-all group"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-foreground/70">{description}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-foreground/70">
            <CheckCircle className="w-4 h-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// Price card component
const PriceCard = ({ title, price, description, features, popular }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-8 rounded-2xl ${popular ? 'bg-primary text-white' : 'bg-secondary/5'} backdrop-blur-sm border ${popular ? 'border-primary' : 'border-secondary/20'} transition-all relative`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className={`${popular ? 'text-white/70' : 'text-foreground/70'}`}>/month</span>
      </div>
      <p className={`mb-6 ${popular ? 'text-white/70' : 'text-foreground/70'}`}>{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Star className="w-4 h-4 flex-shrink-0" />
            <span className={popular ? 'text-white/90' : 'text-foreground/90'}>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
        popular 
          ? 'bg-white text-primary hover:bg-white/90' 
          : 'bg-primary text-white hover:bg-primary/90'
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
  ];

  const services = [
    {
      icon: <Layers />,
      title: "Native App Development",
      description: "Build powerful native applications",
      features: [
        "iOS and Android Development",
        "Native Performance",
        "Platform-Specific Features",
        "App Store Optimization"
      ]
    },
    {
      icon: <Settings />,
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
      icon: <BarChart />,
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
      icon: <Users />,
      title: "UI/UX Design",
      description: "Creating engaging experiences",
      features: [
        "User Research",
        "Wireframing & Prototyping",
        "Visual Design",
        "Usability Testing"
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
        "24/7 priority support"
      ],
      popular: false
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
        <CosmicSphere />
          {/* Hero Section - Stunning App Designs */}        <section className="relative min-h-screen flex flex-col overflow-hidden">
  {/* Background elements */}
  <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10"></div>
  <div className="absolute top-0 right-0 w-[45vw] h-[45vw] max-w-[800px] max-h-[800px] bg-primary/20 rounded-full filter blur-[120px] opacity-70 -z-10"></div>
  <div className="absolute bottom-10 left-10 w-[30vw] h-[30vw] max-w-[600px] max-h-[600px] bg-blue-500/20 rounded-full filter blur-[100px] opacity-60 -z-10"></div>
  

  {/* Top Half - Header Content */}
  <div className="container mx-auto px-4 md:px-6 z-10 pt-20 flex-1 flex items-center justify-center">
    <div className="text-center max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >        <motion.div 
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
        >
          <h1 className="text-5xl font-bold tracking-tight text-balance text-light-800 dark:text-white sm:text-7xl mb-8 relative leading-tight">
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
            <span className="inline-block mt-2 sm:mt-0">Mobile <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-primary">Experiences</span></span>
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
  className="flex flex-wrap gap-4 justify-center"
>
<a 
  href="#contact" 
  className="px-8 py-4 bg-white text-black dark:text-black rounded-xl font-medium hover:bg-gray-100 transition-all hover:shadow-lg hover:shadow-black/10 flex items-center justify-center gap-2 group"
>
  Start Your Project
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</a>

  
  <a 
    href="#portfolio" 
    className="px-8 py-4 bg-secondary/10 backdrop-blur-sm border border-secondary/20 text-foreground rounded-xl font-medium hover:bg-secondary/20 transition-all flex items-center justify-center gap-2 group"
  >
    View Our Work
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  </a>
</motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex justify-center gap-8 mt-12"
        >
          {[
            { name: "Trusted by 500+", value: "Companies" },
            { name: "4.9 / 5.0", value: "Customer Rating" },
            { name: "25M+", value: "App Downloads" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
            </div>
          ))}
        </motion.div>
        

      </motion.div>
    </div>
  </div>  {/* Bottom Half - iPhone Component with Background Image */}
  <div className="flex-1 flex items-center justify-center pb-20 relative">
    {/* Enhanced background with multiple layers */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
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
          className="absolute -left-20 top-1/4 w-60 bg-secondary/10 backdrop-blur-lg border border-white/10 p-4 rounded-lg shadow-xl rotate-[-6deg]"
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
          className="absolute -right-16 bottom-1/4 w-56 bg-secondary/10 backdrop-blur-lg border border-white/10 p-4 rounded-lg shadow-xl rotate-[8deg]"
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
        <div className="absolute -right-12 top-1/4 z-10 flex flex-col gap-6">
          <motion.div 
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--primary), 0.3)' }} 
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer border border-white/20 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.3)' }} 
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-blue-500/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer border border-white/20 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"></circle><path d="m16 12-4-4v8z"></path></svg>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 92, 246, 0.3)' }} 
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-violet-500/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer border border-white/20 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect width="7" height="5" x="7" y="7" rx="1"></rect><rect width="7" height="5" x="10" y="12" rx="1"></rect></svg>
          </motion.div>
        </div>

        <div className="relative border-[3px] border-black rounded-[70px] overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.25),inset_0_0_10px_rgba(0,0,0,0.1)] group hover:shadow-[0_0_50px_rgba(99,102,241,0.3),inset_0_0_15px_rgba(0,0,0,0.2)] transition-all duration-500">
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
        className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-tr from-blue-500/30 to-violet-500/30 rounded-full cursor-pointer"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
          boxShadow: ["0 0 0px rgba(59,130,246,0.2)", "0 0 25px rgba(59,130,246,0.4)", "0 0 0px rgba(59,130,246,0.2)"]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1
        }}
        whileHover={{ 
          scale: 1.4, 
          opacity: 0.9,
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(139,92,246,0.3) 100%)"
        }}
      />
      
      <motion.div 
        className="absolute top-1/3 -left-10 w-8 h-8 bg-gradient-to-bl from-purple-500/30 to-pink-500/30 rounded-full cursor-pointer"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.6, 0.9, 0.6],
          boxShadow: ["0 0 0px rgba(139,92,246,0.2)", "0 0 15px rgba(139,92,246,0.4)", "0 0 0px rgba(139,92,246,0.2)"]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.5
        }}
        whileHover={{ 
          scale: 1.6, 
          opacity: 0.9,
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(244,114,182,0.3) 100%)"
        }}
      />
      
      <motion.div 
        className="absolute top-2/3 -right-12 w-10 h-10 bg-gradient-to-tl from-green-500/30 to-emerald-500/30 rounded-full cursor-pointer"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7],
          boxShadow: ["0 0 0px rgba(34,197,94,0.2)", "0 0 20px rgba(34,197,94,0.4)", "0 0 0px rgba(34,197,94,0.2)"]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1.5
        }}
        whileHover={{ 
          scale: 1.5, 
          opacity: 0.9,
          background: "radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(16,185,129,0.3) 100%)"
        }}
      />
      

<motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute -right-32 bottom-[-120px] hidden md:block w-[30rem] z-10" // Reduced width from 70rem to 30rem and positioned lower
      >

{/* Content container */}
  <div className="p-6 md:p-8 rounded-2xl bg-secondary/5 border border-gray-300 backdrop-blur-sm shadow-xl"> {/* Reduced padding */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-6"> {/* Reduced gap */}
      <div className="max-w-xs"> {/* Reduced text container width */}
        <h3 className="text-xl font-bold mb-2">Transform Your App Experience</h3> {/* Reduced heading size */}
        <p className="text-foreground/70 mb-4 text-sm"> {/* Smaller text and margin */}
          Our micro-interaction design system adds polish to your application, creating memorable experiences users love.
        </p>
        <div className="flex flex-wrap gap-2"> {/* Reduced gap between tags */}
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Improved Engagement
          </div>
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Higher Retention
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300 w-36"> {/* Reduced video container size */}
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
  





</section>



        
      
        <section className="relative py-28 md:py-36 px-4 overflow-hidden">
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >


            </motion.div>




{/* Neuomorphic Interface Elements */}
<section className="py-28 px-4 relative overflow-hidden bg-secondary/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"></circle><path d="m16.24 7.76-8.48 8.48"></path><path d="m7.76 7.76 8.48 8.48"></path></svg>
        Modern Interface Design
      </span>      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
        Neuomorphic Design Language
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        Soft, tactile interfaces that blur the line between digital and physical with subtle shadows and highlights.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
      <div className="col-span-1">
        <div className="space-y-8">
          {[
            {
              title: "Subtle Depth",
              description: "Elements appear to raise from or sink into the background, creating a tactile sensation."
            },
            {
              title: "Mindful Contrast",
              description: "Careful balance of light and shadow to maintain accessibility while adding dimension."
            },
            {
              title: "Reactive Surfaces",
              description: "Interface elements that respond to touch with realistic physical feedback."
            }
          ].map((item, index) => (
            <div key={index} className="group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                {item.title}
              </h3>
              <p className="text-foreground/70 ml-5">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Center showcase */}
      <div className="col-span-1 md:col-span-1 p-10">
        <div className="relative w-full aspect-square bg-secondary/5 rounded-3xl shadow-[10px_10px_30px_rgba(0,0,0,0.1),-10px_-10px_30px_rgba(255,255,255,0.05)] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-secondary/5 shadow-[5px_5px_15px_rgba(0,0,0,0.1),-5px_-5px_15px_rgba(255,255,255,0.05)] flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            </div>
          </div>
          
          {/* Neuomorphic controls */}
          <div className="absolute bottom-6 left-6 right-6 h-10 rounded-full bg-secondary/5 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] flex items-center px-3">
            <div className="w-5 h-5 rounded-full bg-secondary/5 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.05)] mr-auto"></div>
            <div className="w-16 h-4 rounded-full bg-secondary/5 shadow-[inset_2px_2px_3px_rgba(0,0,0,0.1),inset_-2px_-2px_3px_rgba(255,255,255,0.05)]">
              <div className="w-5 h-4 rounded-full bg-secondary/5 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.05)] ml-1"></div>
            </div>
            <div className="w-5 h-5 rounded-full bg-secondary/5 shadow-[2px_2px_5px_rgba(0,0,0,0.1),-2px_-2px_5px_rgba(255,255,255,0.05)] ml-auto"></div>
          </div>
        </div>
      </div>
      
      <div className="col-span-1">
        <div className="grid grid-cols-2 gap-5">
          {[
            "Light Surfaces", "Soft Shadows", "Rounded Corners", 
            "Minimal Borders", "Tactile Feedback", "Muted Colors"
          ].map((tag, index) => (
            <div key={index} className="flex items-center justify-center h-16 rounded-2xl bg-secondary/5 shadow-[5px_5px_15px_rgba(0,0,0,0.1),-5px_-5px_15px_rgba(255,255,255,0.05)] text-sm font-medium hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1),inset_-5px_-5px_10px_rgba(255,255,255,0.05)] hover:text-primary transition-all cursor-pointer">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

{/* Glassmorphism UI Components */}
<section className="py-28 px-4 relative overflow-hidden">
  {/* Background blur elements */}
  <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-blue-500/30 mix-blend-multiply filter blur-[80px] animate-blob"></div>
  <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-primary/30 mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500/30 mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>
  
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16 relative z-10">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4"></path><path d="M16 16h6"></path><path d="M19 13v6"></path></svg>
        Next-Gen UI
      </span>      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-violet-500">
        Glassmorphic UI Components
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        Transparent, blurred interfaces that create a sense of depth while maintaining focus on content.
      </p>
    </div>
    
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Showcase of glass UI components */}
      <div className="relative h-[600px] order-2 lg:order-1">
        {/* Main glass card */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[450px] bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl z-20 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Glass Dashboard</h3>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>
            
            <div className="space-y-4 mt-6">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Activity</span>
                  <span className="text-xs text-primary">+12%</span>
                </div>
                <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-blue-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Engagement</span>
                  <span className="text-xs text-green-500">+24%</span>
                </div>
                <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-5/6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Revenue</span>
                  <span className="text-xs text-violet-500">+18%</span>
                </div>
                <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold">{index + 1}k</div>
                  <div className="text-xs opacity-70">Users</div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/10 backdrop-blur-md border-t border-white/10 flex items-center justify-around px-6">
              {['home', 'search', 'bell', 'user'].map((icon, index) => (
                <div key={index} className={`w-8 h-8 rounded-full ${index === 0 ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/70'} flex items-center justify-center`}>
                  {icon === 'home' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>}
                  {icon === 'search' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>}
                  {icon === 'bell' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>}
                  {icon === 'user' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 1 0-16 0"></path></svg>}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Secondary glass components */}
        <div className="absolute top-20 right-10 w-64 h-40 bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl -rotate-6 z-10 overflow-hidden">
          <div className="h-1/2 bg-gradient-to-r from-primary/20 to-blue-500/20"></div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Subscribers</span>
              <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">+5%</span>
            </div>
            <div className="mt-2 text-2xl font-bold">142.5K</div>
          </div>
        </div>
        
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl rotate-12 z-10 overflow-hidden">
          <div className="p-4 h-full flex flex-col">
            <div className="text-sm font-medium mb-4">Quick Access</div>
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                </div>
                <div>
                  <div className="text-xs font-medium">Document {index + 1}</div>
                  <div className="text-xs opacity-50">PDF • 2.4MB</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="order-1 lg:order-2">
        <div className="space-y-10">
          {[
            {
              title: "Light Diffusion",
              description: "Mimics the physical properties of frosted glass, creating elegant, airy interfaces."
            },
            {
              title: "Contextual Awareness",
              description: "Background colors show through UI elements, adapting to underlying content."
            },
            {
              title: "Layered Transparency",
              description: "Multiple transparent layers create natural depth hierarchy without overwhelming users."
            },
            {
              title: "Material Distinction",
              description: "Clear boundaries between interactive elements while maintaining visual harmony."
            }
          ].map((feature, index) => (
            <div key={index} className="relative pl-10 border-l-2 border-primary/30 py-2 hover:border-primary transition-colors group">
              <div className="absolute -left-[9px] top-3 w-4 h-4 rounded-full bg-background border-2 border-primary/50 group-hover:border-primary transition-colors"></div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <a href="#" className="inline-flex items-center px-6 py-3 bg-white/10 dark:bg-gray-900/20 backdrop-blur-md text-primary border border-white/20 rounded-xl hover:bg-white/20 dark:hover:bg-gray-900/30 transition-all gap-2 group shadow-lg">
            Explore Glass UI Kit
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

{/* App Feature Grid with Micro-interactions */}
<section className="py-28 px-4 relative bg-secondary/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="18" height="18" x="3" y="3" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
        Engaging Features
      </span>      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
        Micro-interactions That Delight
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        Small, thoughtful animations that provide feedback and guide users through your application.
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: "Loading States",
          description: "Engaging animations that make wait times feel shorter",
          color: "from-primary to-blue-500",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        },
        {
          title: "Animated Buttons",
          description: "Buttons that respond to user interaction with subtle motion",
          color: "from-blue-500 to-violet-500",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        },
        {
          title: "Form Feedback",
          description: "Visual cues that confirm user input and validate data",
          color: "from-violet-500 to-fuchsia-500",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 0 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
        },
        {
          title: "Scroll Effects",
          description: "Elements that transform or reveal as users scroll through content",
          color: "from-fuchsia-500 to-pink-500",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        }
      ].map((feature, index) => (
        <div key={index} className="group relative h-[280px] rounded-2xl bg-secondary/5 backdrop-blur-sm border border-secondary/10 p-6 overflow-hidden hover:shadow-lg transition-shadow">
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
          
          {/* Feature content */}
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <div className="text-primary group-hover:text-blue-500 transition-colors">
                {feature.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
            <p className="text-foreground/70 mb-6">{feature.description}</p>
            
            <div className="mt-auto">
              <a href="#" className="inline-flex items-center text-sm text-primary font-medium group-hover:underline">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:ml-2 transition-all"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
            
            {/* Animated corners */}
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      ))}
    </div>
    

  </div>
</section>

{/* Technology Stack Section */}
<section className="py-20 px-4 relative">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <Code className="w-4 h-4 mr-2" /> Technology Stack
      </span>      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
        Built With Cutting-Edge Technologies
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        We leverage the most advanced and reliable technologies to ensure your application 
        performs exceptionally well across all platforms.
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-12">
      {[
        { name: "React Native", logo: "react.svg", description: "Cross-platform mobile apps" },
        { name: "Flutter", logo: "flutter.svg", description: "Native UI experiences" },
        { name: "Swift", logo: "swift.svg", description: "iOS development" },
        { name: "Kotlin", logo: "kotlin.svg", description: "Android development" },
        { name: "Firebase", logo: "firebase.svg", description: "Backend & analytics" },
        { name: "AWS", logo: "aws.svg", description: "Cloud infrastructure" }
      ].map((tech, index) => (
        <div key={index} className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-secondary/5 transition-all">
          <div className="w-16 h-16 mb-4 flex items-center justify-center">
            {/* Replace with actual tech logos */}
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Code className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h3 className="font-medium mb-1">{tech.name}</h3>
          <p className="text-sm text-foreground/60">{tech.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* App Design Showcase Section */}
<section className="py-24 px-4 relative overflow-hidden">
  {/* Subtle background pattern */}
  <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
  
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <Layout className="w-4 h-4 mr-2" /> Design Excellence
      </span>      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
        App Design That Captivates Users
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        Our design philosophy combines aesthetics with functionality to create interfaces that users love.
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1">
        <div className="space-y-8">
          {/* Design pillars with visual indicators */}
          {[
            {
              title: "User-Centered Design",
              description: "We build every interface with real users in mind, focusing on intuitive navigation and clear visual hierarchy.",
              color: "bg-gradient-to-r from-primary to-blue-400"
            },
            {
              title: "Consistent Experience",
              description: "Our design system ensures a cohesive look and feel across all screens and interactions within your application.",
              color: "bg-gradient-to-r from-blue-500 to-purple-500"
            },
            {
              title: "Accessibility First",
              description: "We design for everyone, ensuring your app is usable by people of all abilities and meets WCAG standards.",
              color: "bg-gradient-to-r from-purple-500 to-pink-500"
            }
          ].map((pillar, index) => (
            <div key={index} className="flex gap-5">
              <div className={`h-full w-1 ${pillar.color} rounded-full self-stretch`}></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{pillar.title}</h3>
                <p className="text-foreground/70">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 grid grid-cols-3 gap-4">
          {["Wireframing", "Prototyping", "UI/UX", "Visual Design", "Motion Design", "Design Systems"].map((tag, index) => (
            <div key={index} className="bg-secondary/10 rounded-lg py-2 px-4 text-sm text-center font-medium text-foreground/80">
              {tag}
            </div>
          ))}
        </div>
      </div>
      
      <div className="order-1 lg:order-2 relative">
        {/* Design showcase with layered screens */}
        <div className="relative h-[500px]">
          <div className="absolute top-0 right-0 w-72 h-auto transform rotate-6 shadow-xl rounded-2xl border-8 border-gray-900 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?w=500&h=1000&fit=crop" 
              alt="App Design Example" 
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <div className="absolute top-20 left-4 w-64 h-auto transform -rotate-3 shadow-xl rounded-2xl border-8 border-gray-900 overflow-hidden z-10">
            <img 
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=1000&fit=crop" 
              alt="App Design Example" 
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-0 right-20 w-56 h-auto transform rotate-[-10deg] shadow-xl rounded-2xl border-8 border-gray-900 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&h=1000&fit=crop" 
              alt="App Design Example" 
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-primary/20 rounded-full filter blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-blue-500/20 rounded-full filter blur-xl"></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Interactive Feature Showcase */}
<section className="py-28 px-4 relative bg-gradient-to-b from-secondary/5 to-background">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <Zap className="w-4 h-4 mr-2" /> Interactive Features
      </span>      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
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
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              {feature.icon}
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
              +
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
          <p className="text-foreground/70">{feature.description}</p>
        </div>
      ))}
    </div>
    
    <div className="mt-24 relative">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full my-12"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-secondary/5 backdrop-blur-sm rounded-2xl border border-secondary/10">
        <div className="mb-6 md:mb-0 md:mr-10">
          <h3 className="text-2xl font-bold mb-2">See It In Action</h3>
          <p className="text-foreground/70 max-w-md">
            Experience the power of our interactive features with a live demonstration of our latest projects.
          </p>
        </div>
        <a 
          href="#demo" 
          className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group"
        >
          Watch Demo
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </a>
      </div>
    </div>
  </div>
</section>



{/* App Store Optimization Section */}
<section className="py-24 px-4 relative bg-secondary/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <ArrowUpRight className="w-4 h-4 mr-2" /> Launch Strategy
      </span>      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
        App Store Optimization
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
        Your app deserves visibility. We optimize every aspect of your app store presence to maximize downloads.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="relative bg-background rounded-3xl overflow-hidden border border-secondary/10 shadow-md h-[400px] group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-purple-600/70 opacity-90"></div>
        <div className="relative h-full p-8 flex flex-col justify-between text-white">
          <div>
            <div className="p-3 bg-white/20 rounded-xl inline-flex mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><path d="m16 10-4 4-2-2"></path></svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">App Store Listing</h3>
            <p className="text-white/80">Keyword-optimized titles, descriptions, and metadata that improve search rankings.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <ul className="space-y-2">
              {["Competitor Analysis", "A/B Testing", "Keyword Optimization"].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-white" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="relative bg-background rounded-3xl overflow-hidden border border-secondary/10 shadow-md h-[400px] group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-blue-600/70 opacity-90"></div>
        <div className="relative h-full p-8 flex flex-col justify-between text-white">
          <div>
            <div className="p-3 bg-white/20 rounded-xl inline-flex mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Visual Assets</h3>
            <p className="text-white/80">Eye-catching screenshots, preview videos, and app icons that drive conversions.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <ul className="space-y-2">
              {["Screenshot Design", "Preview Videos", "Icon Optimization"].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-white" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="relative bg-background rounded-3xl overflow-hidden border border-secondary/10 shadow-md h-[400px] group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-primary/70 opacity-90"></div>
        <div className="relative h-full p-8 flex flex-col justify-between text-white">
          <div>
            <div className="p-3 bg-white/20 rounded-xl inline-flex mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">User Reviews</h3>
            <p className="text-white/80">Strategies to encourage positive ratings and thoughtful response management.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <ul className="space-y-2">
              {["Review Prompts", "Feedback Collection", "Rating Management"].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-white" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-16 flex justify-center">
      <div className="flex items-center gap-3 p-4 bg-background/50 backdrop-blur-sm rounded-full shadow-sm border border-secondary/10">
        <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
          <ArrowUpRight className="w-5 h-5" />
        </div>
        <div className="text-center">
          <span className="block text-lg font-semibold">Average Download Increase</span>
          <span className="block text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">127%</span>
        </div>
        <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  </div>
</section>

{/* Case Studies Section */}
<section className="py-24 px-4 relative bg-secondary/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <CheckCircle className="w-4 h-4 mr-2" /> Success Stories
      </span>      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
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
              <span className="text-sm font-medium text-green-500">{project.results}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
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
      </span>      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
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
          <div className="flex items-center gap-1 mb-4 text-amber-500">
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

{/* FAQ Section */}
<section className="py-20 px-4 relative bg-secondary/5">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
        <Layout className="w-4 h-4 mr-2" /> FAQ
      </span>      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
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
        <div key={index} className="border border-secondary/10 rounded-xl overflow-hidden hover:border-primary/20 transition-all">
          <details className="group">
            <summary className="flex justify-between items-center p-5 font-medium cursor-pointer">
              <span>{faq.question}</span>
              <span className="transition group-open:rotate-180">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </span>
            </summary>
            <div className="px-5 pb-5 pt-0">
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
        

        



        {/* App Design Features Section */}
        <section className="py-24 overflow-hidden relative">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background -z-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(var(--primary),0.08),transparent_40%)] -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              {/* Section badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                <Layout className="w-4 h-4 mr-2" /> Design Features
              </span>
                <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Powerful Design Tools
              </h2>
              
              <p className="text-lg text-foreground/70">
                Our comprehensive suite of design tools makes app creation simple and efficient, 
                delivering beautiful results without complex coding.
              </p>
            </motion.div>

            {/* App Features Section */}
            <div className="mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Layout className="w-6 h-6" />,
                    title: "Intuitive Design System",
                    description: "Drag-and-drop interface elements with pixel-perfect alignment and responsive layouts for all device sizes.",
                    color: "primary"
                  },
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "Performance Optimized",
                    description: "Lightweight, fast-loading apps with optimized code and assets for smooth experiences on any device.",
                    color: "primary"
                  },
                  {
                    icon: <Code className="w-6 h-6" />,
                    title: "No Coding Required",
                    description: "Create complex functionality using our visual logic builder without writing a single line of code.",
                    color: "primary"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-secondary/5 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-secondary/10 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-foreground/70">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            

          </div>
        </section>

        {/* Features Grid - Why Choose Us */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Why Choose Us
              </h2>
              <p className="text-lg text-foreground/70">
                We deliver cutting-edge mobile solutions with a focus on quality and innovation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 relative bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Our Services
              </h2>
              <p className="text-lg text-foreground/70">
                Comprehensive mobile app development solutions for your business needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/5 via-blue-500/5 to-primary/5 border border-primary/10 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Your App?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Let's turn your vision into a successful mobile application.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all gap-2 group"
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

