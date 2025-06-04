import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import PageTransition from '../components/PageTransition';
import { Cover } from "../components/ui/cover";
import { 
  Palette, Figma, PenTool, LayoutGrid, 
  MessageCircle, Download, Award, CheckCircle2,
  ArrowRight, ImagePlus, FileType, Layers,
  ChevronRight, Shield, Zap
} from "lucide-react";

// Mobile-first responsive constants
const UI = {
  colors: {
    primary: "from-blue-600 to-indigo-600",
    secondary: "from-purple-600 to-pink-600",
    accent: "from-amber-500 to-orange-500"
  },
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-12 sm:py-16 md:py-20 lg:py-28",
  heading: {
    wrapper: "mb-8 sm:mb-10 md:mb-12 text-center",
    eyebrow: "inline-block text-xs sm:text-sm font-medium tracking-wider text-primary mb-2 sm:mb-3",
    title: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4",
    description: "max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 px-4"
  },
  card: "rounded-xl sm:rounded-2xl bg-white dark:bg-gray-800 shadow-lg sm:shadow-xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6",
  button: {
    primary: "inline-flex items-center justify-center px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 min-h-[44px]",
    secondary: "inline-flex items-center justify-center px-4 sm:px-6 py-3 rounded-full border-2 border-blue-600/20 text-blue-600 dark:text-blue-400 text-sm sm:text-base font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 min-h-[44px]"
  }
};

const LOGO_PORTFOLIO = [
  { 
    image: "/api/placeholder/400/320", 
    title: "Mountain Ventures",
    category: "Tech" 
  },
  { 
    image: "/api/placeholder/400/320", 
    title: "Leaf Organics",
    category: "Food & Beverage" 
  },
  { 
    image: "/api/placeholder/400/320", 
    title: "Wave Media",
    category: "Entertainment" 
  },
  { 
    image: "/api/placeholder/400/320", 
    title: "Circle Finance",
    category: "Finance" 
  },
  { 
    image: "/api/placeholder/400/320", 
    title: "Spark Fitness",
    category: "Health" 
  },
  { 
    image: "/api/placeholder/400/320", 
    title: "Cube Storage",
    category: "Real Estate" 
  }
];

// Mobile-optimized design process steps
const DESIGN_PROCESS = [
  {
    icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Discovery",
    description: "We discuss your brand vision, target audience, and design preferences"
  },
  {
    icon: <PenTool className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Concept Development",
    description: "I create multiple unique logo concepts based on your requirements"
  },
  {
    icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Refinement",
    description: "We review and refine your chosen concept until perfect"
  },
  {
    icon: <Download className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Delivery",
    description: "You receive all final files in multiple formats for print and digital use"
  }
];

// Mobile-responsive section heading component
const SectionHeading = ({ eyebrow, title, subtitle = "", center = false }) => (
  <div className={UI.heading.wrapper}>
    <span className={UI.heading.eyebrow}>{eyebrow}</span>
    <h2 className={UI.heading.title}>{title}</h2>
    {subtitle && <p className={UI.heading.description}>{subtitle}</p>}
  </div>
);

// Mobile-optimized CTA button
const CTAButton = ({ primary = true, children, className = "", icon = false, fullWidth = false }) => (
  <button 
    className={`group relative overflow-hidden rounded-full transition-all hover:shadow-lg active:scale-[0.98] touch-manipulation
    ${primary ? 'bg-primary text-white shadow-primary/20' : 'bg-transparent border-2 border-primary/30 text-primary hover:bg-primary/5'} 
    px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-medium 
    ${fullWidth ? 'w-full' : 'w-full sm:w-auto'} 
    min-h-[44px] sm:min-h-[48px] ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
      {icon && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
    </span>
  </button>
);

// Mobile-optimized floating elements
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Reduced number of elements for mobile performance */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-xl opacity-20 sm:opacity-30
          ${i % 4 === 0 ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/10' : 
            i % 4 === 1 ? 'bg-gradient-to-r from-blue-500/20 to-cyan-400/10' : 
            i % 4 === 2 ? 'bg-gradient-to-r from-green-500/20 to-blue-500/10' : 
            'bg-gradient-to-r from-yellow-500/20 to-orange-500/10'}`}
          style={{
            width: `${Math.floor(Math.random() * 150) + 50}px`,
            height: `${Math.floor(Math.random() * 150) + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Mobile-optimized background pattern
const EnhancedBackgroundPattern = ({ variant = "default" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-950 -z-10" />
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] -z-10" />
      <div className="absolute w-full h-full bg-[radial-gradient(35%_25%_at_50%_35%,rgba(56,189,248,0.08),transparent),radial-gradient(25%_15%_at_70%_65%,rgba(124,58,237,0.08),transparent)] sm:bg-[radial-gradient(45%_35%_at_50%_35%,rgba(56,189,248,0.12),transparent),radial-gradient(35%_25%_at_70%_65%,rgba(124,58,237,0.12),transparent)] -z-10" />
    </div>
  );
};

// Mobile-responsive color palette generator
const ColorPaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [palette, setPalette] = useState([]);
  
  useEffect(() => {
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const colors = [
      baseColor,
      `#${((r + 128) % 255).toString(16).padStart(2, '0')}${((g + 128) % 255).toString(16).padStart(2, '0')}${((b + 128) % 255).toString(16).padStart(2, '0')}`,
      `#${((r + 30) % 255).toString(16).padStart(2, '0')}${((g + 30) % 255).toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
      `#${((r - 30) % 255).toString(16).padStart(2, '0')}${((g - 30) % 255).toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
      `#${Math.floor(r * 0.7).toString(16).padStart(2, '0')}${Math.floor(g * 0.7).toString(16).padStart(2, '0')}${Math.floor(b * 0.7).toString(16).padStart(2, '0')}`,
    ];
    
    setPalette(colors);
  }, [baseColor]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-background/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-primary/20 shadow-xl"
    >
      <h3 className="text-lg sm:text-xl font-bold mb-4">Logo Color Palette</h3>
      <div className="mb-4">
        <label className="block text-sm text-foreground/70 mb-2">Choose base color:</label>
        <input 
          type="color" 
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className="w-full h-10 sm:h-12 rounded cursor-pointer"
        />
      </div>
      
      <div className="space-y-3">
        <div className="text-sm text-foreground/70 mb-1">Your palette:</div>
        <div className="grid grid-cols-5 gap-2 h-10 sm:h-12">
          {palette.map((color, i) => (
            <motion.div 
              key={i}
              className="rounded-md cursor-pointer relative group min-h-[40px] sm:min-h-[48px]"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigator.clipboard.writeText(color)}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/40 rounded-md transition-opacity">
                <span className="text-xs text-white px-1 text-center">{color}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-xs text-center text-foreground/60 mt-2">
          Tap any color to copy its hex code
        </div>
      </div>
      
      <div className="mt-6">
        <div className="text-sm font-medium mb-2">Preview with your colors:</div>
        <div className="bg-background/20 p-4 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg" style={{ backgroundColor: palette[0] }}>
            <div className="w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="70%" height="70%" style={{ fill: palette[1] }}>
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Mobile-responsive logo style quiz
const LogoStyleQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null);
  
  const questions = [
    {
      question: "What personality should your brand convey?",
      options: ["Professional & Trustworthy", "Creative & Playful", "Bold & Energetic", "Elegant & Sophisticated"]
    },
    {
      question: "Which industry best represents your business?",
      options: ["Technology & Digital", "Arts & Entertainment", "Health & Wellness", "Finance & Business"]
    },
    {
      question: "What's most important for your logo?",
      options: ["Simplicity & Recognition", "Uniqueness & Creativity", "Tradition & Heritage", "Trendiness & Innovation"]
    }
  ];
  
  const results = [
    { type: "Minimalist", description: "Clean, modern, and straightforward designs that focus on essential elements." },
    { type: "Illustrative", description: "Detailed, artistic designs that tell a story through imagery and symbolism." },
    { type: "Typography-Based", description: "Distinctive letterforms and wordmarks that create a unique brand identity." },
    { type: "Abstract", description: "Conceptual symbols that convey deeper meaning through geometric shapes and forms." }
  ];
  
  const handleSelectOption = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setResult(results[Math.floor(Math.random() * results.length)]);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setResult(null);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-background to-secondary/10 rounded-xl p-4 sm:p-6 border border-primary/20 shadow-lg"
    >
      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">Find Your Logo Style</h3>
      
      {result ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-4 inline-block bg-primary/20 p-3 rounded-full">
            <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h4 className="text-lg font-bold text-primary mb-2">Your Ideal Style: {result.type}</h4>
          <p className="text-foreground/70 mb-6 text-sm sm:text-base px-2">{result.description}</p>
          <button 
            onClick={resetQuiz}
            className="px-4 sm:px-5 py-2 sm:py-3 bg-primary text-white rounded-full text-sm font-medium min-h-[40px] w-full sm:w-auto"
          >
            Take Quiz Again
          </button>
        </motion.div>
      ) : (
        <>
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between text-xs sm:text-sm text-foreground/60 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-background/50 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          <h4 className="text-base sm:text-lg font-semibold mb-4 px-2">{questions[currentQuestion].question}</h4>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={handleSelectOption}
                className="w-full text-left p-3 sm:p-4 rounded-lg border border-foreground/20 hover:border-primary transition-colors flex items-center justify-between text-sm sm:text-base min-h-[48px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="pr-2">{option}</span>
                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

// Mobile-responsive logo playground
const LogoPlayground = () => {
  const [shape, setShape] = useState('circle');
  const [color, setColor] = useState('blue');
  const [symbol, setSymbol] = useState('star');
  
  const colors = {
    blue: 'from-blue-500 to-cyan-400',
    pink: 'from-pink-500 to-purple-400',
    green: 'from-green-500 to-emerald-400',
    amber: 'from-amber-500 to-yellow-400'
  };
  
  const symbolComponents = {
    star: <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill="white" />,
    bolt: <path d="M45,0 L20,50 L40,60 L25,100 L80,40 L50,35 L65,0 Z" fill="white" />,
    leaf: <path d="M50,0 C20,25 0,50 0,75 C0,100 25,100 50,75 C75,100 100,100 100,75 C100,50 80,25 50,0 Z" fill="white" />,
    drop: <path d="M50,0 C50,0 0,50 0,75 C0,100 25,100 50,100 C75,100 100,100 100,75 C100,50 50,0 50,0 Z" fill="white" />
  };
  
  return (
    <div className="bg-background/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-primary/20 shadow-xl">
      <h3 className="text-lg sm:text-xl font-bold mb-4">Logo Playground</h3>
      <div className="flex items-center justify-center mb-6">
        <motion.div 
          className={`w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center bg-gradient-to-br ${colors[color]} shadow-lg`}
          style={{
            borderRadius: shape === 'circle' ? '100%' : 
                          shape === 'square' ? '0' : 
                          shape === 'rounded' ? '20px' : '50% 20%'
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <svg viewBox="0 0 100 100" width="60%" height="60%">
            {symbolComponents[symbol]}
          </svg>
        </motion.div>
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        <div>
          <p className="text-sm text-foreground/70 mb-2">Shape</p>
          <div className="flex gap-2 flex-wrap">
            {['circle', 'square', 'rounded', 'custom'].map(s => (
              <button 
                key={s}
                onClick={() => setShape(s)}
                className={`w-8 h-8 sm:w-10 sm:h-10 border touch-manipulation ${shape === s ? 'border-primary ring-2 ring-primary/20' : 'border-foreground/20'} 
                  ${s === 'circle' ? 'rounded-full' : 
                    s === 'square' ? 'rounded-none' : 
                    s === 'rounded' ? 'rounded-lg' : 'rounded-tl-2xl rounded-br-2xl'}`}
              />
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-foreground/70 mb-2">Color</p>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(colors).map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${colors[c]} touch-manipulation ${color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}`}
              />
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-foreground/70 mb-2">Symbol</p>
          <div className="grid grid-cols-4 gap-2">
            {Object.keys(symbolComponents).map(s => (
              <button
                key={s}
                onClick={() => setSymbol(s)}
                className={`aspect-square bg-background/50 rounded-md flex items-center justify-center touch-manipulation ${symbol === s ? 'ring-2 ring-primary' : 'border border-foreground/20'}`}
              >
                <svg viewBox="0 0 100 100" width="70%" height="70%" className="text-primary">
                  {React.cloneElement(symbolComponents[s], { fill: 'currentColor' })}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-foreground/60 mb-3">Try our full logo builder in the app</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-full text-sm font-medium min-h-[44px]"
        >
          Save Your Design
        </motion.button>
      </div>
    </div>
  );
};

function LogoDesign() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Tech", "Food & Beverage", "Entertainment", "Finance", "Health", "Real Estate"];
  
  const filteredPortfolio = activeFilter === "All" 
    ? LOGO_PORTFOLIO 
    : LOGO_PORTFOLIO.filter(item => item.category === activeFilter);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
        <FloatingElements />
        
        {/* Mobile-optimized Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 sm:py-20" aria-labelledby="hero-heading">
          <EnhancedBackgroundPattern variant="default" withNoise={true} />
          
          {/* Simplified floating elements for mobile */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Reduced and optimized floating elements */}
            <motion.div
              className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-xl bg-gradient-to-r from-pink-500/40 to-purple-500/40 backdrop-blur-sm border border-white/20 shadow-xl"
              style={{ top: "15%", left: "8%" }}
              animate={{ 
                rotateX: [0, 15, -10, 0], 
                rotateY: [0, -15, 20, 0], 
                rotateZ: [0, 10, -5, 0] 
              }}
              transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="50%" height="50%" className="text-white/90">
                  <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,20A8,8 0 0,1 20,12A8,8 0 0,1 12,4Z" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-600/40 backdrop-blur-sm border border-white/20 shadow-xl"
              style={{ top: "18%", right: "12%" }}
              animate={{ 
                rotateX: [0, -20, 15, 0], 
                rotateY: [0, 25, -10, 0], 
                rotateZ: [0, -15, 5, 0] 
              }}
              transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <div className="h-1/2 w-1/2 rounded-full border-4 border-white/60"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Mobile-first content container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              
              {/* Mobile-optimized text content */}
              <div className="w-full lg:w-6/12 text-center lg:text-left space-y-4 sm:space-y-6">
                <motion.h1 
                  id="hero-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] relative"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-primary relative inline-block">
                    Your Vision,
                    <motion.span 
                      className="absolute -top-4 sm:-top-6 -right-2 sm:-right-4 text-lg sm:text-2xl text-yellow-400"
                      animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                    >
                      ✨
                    </motion.span>
                  </span>
                  <span className="block mt-1 sm:mt-2">Our Design <Cover className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-secondary to-orange-500">Magic</Cover></span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0 px-4 lg:px-0"
                >
                  Transforming concepts into <span className="italic text-purple-500">captivating</span> brand identities that <span className="font-bold text-cyan-500">stand out</span> and leave <span className="underline decoration-wavy decoration-yellow-500">lasting impressions</span>.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4 px-4 lg:px-0"
                >
                  <CTAButton primary fullWidth>
                    <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Explore Our Work</span>
                  </CTAButton>
                  
                  <CTAButton primary={false} fullWidth>
                    <span>Get a Free Quote</span>
                  </CTAButton>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-5 text-xs sm:text-sm text-foreground/60 pt-4 sm:pt-6 border-t border-foreground/10 mx-4 lg:mx-0"
                >
                  {[
                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "Unlimited Revisions" },
                    { icon: <Shield className="w-4 h-4" />, text: "100% Satisfaction" },
                    { icon: <Zap className="w-4 h-4" />, text: "Fast Turnaround" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="text-primary">{feature.icon}</div>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Mobile-optimized showcase */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full lg:w-6/12 relative mt-8 lg:mt-0"
              >
                <div className="relative aspect-square max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                  {/* Simplified floating logo showcase for mobile */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="relative w-[80%] h-[80%] rounded-full border border-primary/20 flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Reduced number of logos for mobile performance */}
                      {[0, 120, 240].map((degree, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{ 
                            transformOrigin: "center",
                            rotate: `${degree}deg`,
                            translateX: "80px"
                          }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ 
                            duration: 3, 
                            delay: i * 0.5, 
                            repeat: Infinity, 
                            repeatType: "reverse" 
                          }}
                        >
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg
                            ${i % 3 === 0 ? 'bg-pink-500/20 border border-pink-500/30' : 
                              i % 3 === 1 ? 'bg-blue-500/20 border border-blue-500/30' : 
                              'bg-yellow-500/20 border border-yellow-500/30'}`}
                          >
                            <div style={{ transform: `rotate(-${degree}deg)` }}>
                              <svg viewBox="0 0 24 24" width="20" height="20" className={`${i % 3 === 0 ? 'text-pink-500' : i % 3 === 1 ? 'text-blue-500' : 'text-yellow-500'}`}>
                                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,20A8,8 0 0,1 20,12A8,8 0 0,1 12,4Z" />
                              </svg>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Mobile-optimized center logo */}
                      <motion.div 
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-md border border-white/30 shadow-xl flex items-center justify-center"
                        animate={{ 
                          scale: [1, 1.05, 0.98, 1],
                          rotate: [0, 5, -3, 0]
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity,
                          repeatType: "mirror" 
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="50%" height="50%" className="text-white drop-shadow-lg">
                          <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,8L10,15.5L14.5,13L16,16L18,15L15.5,11.5L19,10L12,8Z" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mobile-optimized Design Process Section */}
        <section className={UI.section + " px-4 relative overflow-hidden"} aria-labelledby="process-heading">
          <EnhancedBackgroundPattern variant="blue" withMesh={true} />
          
          <div className={UI.container + " relative z-10"}>
            <SectionHeading 
              eyebrow="How It Works" 
              title="Logo Design Process" 
              subtitle="A simple, collaborative approach to create your perfect logo"
              center={true} 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
              {DESIGN_PROCESS.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 transition-all group relative overflow-hidden
                    ${index % 4 === 0 ? 'border-pink-400 bg-pink-50/10' : 
                      index % 4 === 1 ? 'border-cyan-400 bg-cyan-50/10' : 
                      index % 4 === 2 ? 'border-yellow-400 bg-yellow-50/10' : 
                      'border-purple-400 bg-purple-50/10'}`}
                >
                  <div className="absolute -right-8 sm:-right-12 -top-8 sm:-top-12 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className={`mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 inline-block rounded-lg sm:rounded-xl shadow-lg
                    ${index % 4 === 0 ? 'bg-pink-500/20 shadow-pink-500/20' : 
                      index % 4 === 1 ? 'bg-cyan-500/20 shadow-cyan-500/20' : 
                      index % 4 === 2 ? 'bg-yellow-500/20 shadow-yellow-500/20' : 
                      'bg-purple-500/20 shadow-purple-500/20'}`}
                  >
                    {React.cloneElement(step.icon, { 
                      className: `w-5 h-5 sm:w-6 sm:h-6 
                        ${index % 4 === 0 ? 'text-pink-500' : 
                          index % 4 === 1 ? 'text-cyan-500' : 
                          index % 4 === 2 ? 'text-yellow-500' : 
                          'text-purple-500'}`}
                    )}
                  </div>
                  
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3 flex items-center">
                    <span className={`text-xl sm:text-2xl mr-2 font-black
                      ${index % 4 === 0 ? 'text-pink-500' : 
                        index % 4 === 1 ? 'text-cyan-500' : 
                        index % 4 === 2 ? 'text-yellow-500' : 
                        'text-purple-500'}`}
                    >
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-foreground/70 relative z-10">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 sm:mt-16 max-w-md mx-auto">
              <LogoStyleQuiz />
            </div>
          </div>
        </section>

        {/* Mobile-optimized Portfolio Section */}
        <section className={UI.section + " px-4 relative overflow-hidden"} aria-labelledby="portfolio-heading">
          <EnhancedBackgroundPattern variant="warm" withNoise={true} />
          
          <div className={UI.container + " relative z-10"}>
            <SectionHeading 
              eyebrow="Our Work" 
              title="Logo Design Portfolio" 
              subtitle="Browse our collection of custom logo designs created for clients across various industries"
              center={true} 
            />
            
            {/* Mobile-optimized Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {LOGO_PORTFOLIO.map((item, index) => (
                <motion.a
                  key={index}
                  href={`https://example.com/portfolio/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-background to-secondary/5 border-2 border-secondary/30 hover:border-primary/50 transition-colors shadow-lg touch-manipulation"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="px-2 py-1 bg-primary/80 text-white text-xs rounded-md mb-2 inline-block">
                        {item.category}
                      </span>
                      <h3 className="text-white font-bold text-lg sm:text-xl drop-shadow-md">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-2 text-white/80">
                        <ArrowRight className="w-4 h-4" />
                        <span className="text-sm">View case study</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile-optimized Tools Section */}
        <section className={UI.section + " px-4 relative overflow-hidden"} aria-labelledby="tools-heading">
          <EnhancedBackgroundPattern variant="green" withMesh={true} />
          
          <div className={UI.container + " relative z-10"}>
            <SectionHeading 
              eyebrow="Our Creative Journey" 
              title="From Spark to Masterpiece" 
              subtitle="A collaborative adventure to transform your vision into an unforgettable brand identity"
              center={true} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <LogoPlayground />
              <ColorPaletteGenerator />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16">
              {[
                { icon: <Figma className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />, name: "Figma", color: "purple" },
                { icon: <PenTool className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />, name: "Adobe Illustrator", color: "orange" },
                { icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />, name: "Adobe Photoshop", color: "blue" },
                { icon: <LayoutGrid className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />, name: "Sketch", color: "yellow" },
                { icon: <FileType className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />, name: "Font Managers", color: "pink" },
                { icon: <ImagePlus className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />, name: "Asset Libraries", color: "cyan" }
              ].map((tool, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`mb-3 sm:mb-4 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg transition-all
                    ${tool.color === 'purple' ? 'bg-purple-500/20 shadow-purple-500/20 text-purple-600' : 
                      tool.color === 'orange' ? 'bg-orange-500/20 shadow-orange-500/20 text-orange-600' : 
                      tool.color === 'blue' ? 'bg-blue-500/20 shadow-blue-500/20 text-blue-600' : 
                      tool.color === 'yellow' ? 'bg-yellow-500/20 shadow-yellow-500/20 text-yellow-600' : 
                      tool.color === 'pink' ? 'bg-pink-500/20 shadow-pink-500/20 text-pink-600' : 
                      'bg-cyan-500/20 shadow-cyan-500/20 text-cyan-600'}`}
                  >
                    {tool.icon}
                  </div>
                  <span className="font-semibold text-xs sm:text-sm">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile-optimized CTA Section */}
        <section className={UI.section + " px-4 relative overflow-hidden"} aria-labelledby="cta-heading">
          <EnhancedBackgroundPattern variant="purple" withNoise={true} />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block mb-6 sm:mb-8">
              <div className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 backdrop-blur-md border-2 border-primary/30 shadow-lg shadow-primary/10 rounded-xl p-4 sm:p-6">
                <SectionHeading
                  eyebrow="Let's Create Together"
                  title={<>Ready for a <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Logo Revolution</span>?</>}
                  subtitle="Let's collaborate to design a logo that perfectly captures your brand's unique personality"
                  center={true}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all w-full sm:w-auto min-h-[48px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Logo Project
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <Cover className="dark:text-white text-black w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-primary text-white rounded-full text-sm sm:text-base font-medium w-full sm:w-auto min-h-[48px]"
                >
                  View Pricing
                </motion.button>
              </Cover>
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-4">
              {[
                { icon: <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Money-back guarantee", color: "green" },
                { icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />, text: "100% original designs", color: "blue" },
                { icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Professional quality", color: "pink" }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div className={`p-2 rounded-full
                    ${feature.color === 'green' ? 'bg-green-500/20 text-green-600' : 
                      feature.color === 'blue' ? 'bg-blue-500/20 text-blue-600' : 
                      'bg-pink-500/20 text-pink-600'}`}
                  >
                    {feature.icon}
                  </div>
                  <span className="font-medium text-sm sm:text-base">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile-optimized FAQ Section */}
        <section className={UI.section + " px-4 relative overflow-hidden"} aria-labelledby="faq-heading">
          <EnhancedBackgroundPattern variant="blue" withNoise={true} withMesh={true} />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <SectionHeading 
              eyebrow="Questions & Answers" 
              title="Logo Design Curiosities" 
              subtitle="Everything you've been wondering about our funky logo design process"
              center={true} 
            />
            
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {[
                {
                  question: "How long does the logo design process take?",
                  answer: "Our typical timeline is 1-2 weeks from start to finish, depending on the package you choose. The Basic package takes around 7 days, while our Premium package can be delivered in as little as 24 hours if you need it super fast!"
                },
                {
                  question: "How many concepts and revisions do I get?",
                  answer: "This depends on your chosen package. Our Basic package includes 2 unique concepts and 2 rounds of revisions, while our Professional and Premium packages include 5-10 concepts and unlimited revisions until you're 100% satisfied with the result."
                },
                {
                  question: "What file formats will I receive?",
                  answer: "All our packages include industry-standard file formats: vector files (AI, EPS, SVG), raster files (JPEG, PNG with transparent backgrounds), and PDF. These work for both print and digital applications, in color and monochrome versions."
                },
                {
                  question: "Do I own the copyright to my logo design?",
                  answer: "Absolutely! Once the project is complete and final payment is made, you receive full copyright ownership of your logo design. You're free to use it anywhere and everywhere without restrictions."
                },
                {
                  question: "What if I don't like any of the existing concepts?",
                  answer: "No worries! We'll go back to the drawing board and create new concepts based on your feedback. Our goal is your complete satisfaction, and we'll work with you until we nail the perfect design for your brand."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-lg sm:rounded-xl bg-secondary/5 border border-secondary/20 overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-4 sm:p-5 font-medium text-base sm:text-lg touch-manipulation">
                      <span className="pr-4">{faq.question}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 transition-transform group-open:rotate-180 flex-shrink-0" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-foreground/70 text-sm sm:text-base">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 sm:mt-12 text-center px-4">
              <p className="mb-4 sm:mb-6 text-foreground/70 text-sm sm:text-base">Still have questions? We're happy to help!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all relative overflow-hidden w-full sm:w-auto min-h-[48px]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us
                  <MessageCircle className="w-4 h-4" />
                </span>
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default LogoDesign;