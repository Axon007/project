"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import PageTransition from '../components/PageTransition';
import { Cover } from "../components/ui/cover";
import { SmoothCursor } from "../components/ui/smooth-cursor";
import { 
  Palette, Figma, PenTool, LayoutGrid, 
  MessageCircle, Download, Award, CheckCircle2,
  ArrowRight, ImagePlus, FileType, Layers,
  ChevronRight, Shield, Zap
} from "lucide-react";

// Custom cursor SVG for the LogoDesign page
const LogoDesignCursor = ({ color = "currentColor" }) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary drop-shadow-md"
    >
      <circle
        cx="18"
        cy="18"
        r="16"
        stroke="currentColor"
        strokeWidth="2"
        fill="rgba(255, 255, 255, 0.1)"
        className="animate-pulse"
      />
      <circle cx="18" cy="18" r="5" fill="currentColor" />
      <path 
        d="M18 2C9.16 2 2 9.16 2 18" 
        stroke="currentColor" 
        strokeWidth="3"
        strokeLinecap="round"
        className="origin-center animate-spin"
        style={{ animationDuration: '8s' }}
      />
    </svg>
  );
};

// Portfolio samples
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

// Design process steps
const DESIGN_PROCESS = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Discovery",
    description: "We discuss your brand vision, target audience, and design preferences"
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Concept Development",
    description: "I create multiple unique logo concepts based on your requirements"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Refinement",
    description: "We review and refine your chosen concept until perfect"
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Delivery",
    description: "You receive all final files in multiple formats for print and digital use"
  }
];

// Component for section headings
const SectionHeading = ({ eyebrow, title, subtitle = "", center = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''} px-4`}>
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-primary text-sm font-medium uppercase tracking-wider"
    >
      {eyebrow}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-4 relative"
    >
      {title}
      <div className="absolute -right-12 top-0 hidden md:block">
        <motion.div 
          className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-primary"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0] 
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base md:text-lg text-foreground/70 max-w-3xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// Button component
const CTAButton = ({ primary = true, children, className = "", icon = false }) => (
  <button 
    className={`group relative overflow-hidden rounded-full ${primary ? 'bg-primary text-white' : 'bg-transparent border-2 border-primary/30 text-primary'} 
    px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all hover:shadow-lg ${primary ? 'hover:shadow-primary/20' : 'hover:shadow-primary/10'} 
    hover:scale-95 w-full sm:w-auto ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
      {icon && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
    </span>
  </button>
);

// Floating decorative elements component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Abstract shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-r 
          ${i % 4 === 0 ? 'from-purple-500/20 to-pink-500/10' : 
            i % 4 === 1 ? 'from-secondary/20 to-yellow-400/10' : 
            i % 4 === 2 ? 'from-primary/20 to-cyan-400/10' : 
            'from-green-500/20 to-blue-500/10'} 
          blur-xl`}
          style={{
            width: `${Math.floor(Math.random() * 300) + 100}px`,
            height: `${Math.floor(Math.random() * 300) + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          initial={{
            x: `${Math.random() * 100 - 50}%`,
            y: `${Math.random() * 100 - 50}%`,
            rotate: Math.random() * 180,
          }}
          animate={{
            x: `${Math.random() * 100 - 50}%`,
            y: `${Math.random() * 100 - 50}%`,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 30 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Design elements: squiggly lines, dots, abstract shapes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            backgroundColor: i % 3 === 0 ? '#ff6b6b' : i % 3 === 1 ? '#48dbfb' : '#1dd1a1',
            borderRadius: i % 2 === 0 ? '50%' : '4px',
            opacity: 0.4,
          }}
          animate={{
            y: [0, 10, -10, 0],
            x: [0, -5, 5, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  );
};

// Static Background Component for reuse across sections
const EnhancedBackgroundPattern = ({ variant = "default", withNoise = true, withMesh = false }) => {
  // Different color variations for different sections
  const colorVariants = {
    default: {
      blob1: "from-pink-500/20 to-purple-600/20",
      blob2: "from-yellow-400/20 to-orange-500/20",
      blob3: "from-cyan-400/20 to-blue-500/20",
      accent: "bg-pink-500/5"
    },
    blue: {
      blob1: "from-blue-500/20 to-indigo-600/20",
      blob2: "from-cyan-400/20 to-blue-500/20",
      blob3: "from-indigo-400/20 to-purple-500/20",
      accent: "bg-blue-500/5"
    },
    warm: {
      blob1: "from-red-500/20 to-orange-600/20",
      blob2: "from-yellow-400/20 to-amber-500/20",
      blob3: "from-orange-400/20 to-red-500/20",
      accent: "bg-orange-500/5"
    },
    green: {
      blob1: "from-green-500/20 to-emerald-600/20",
      blob2: "from-lime-400/20 to-green-500/20",
      blob3: "from-teal-400/20 to-cyan-500/20",
      accent: "bg-green-500/5"
    },
    purple: {
      blob1: "from-purple-500/20 to-fuchsia-600/20",
      blob2: "from-indigo-400/20 to-purple-500/20",
      blob3: "from-pink-400/20 to-purple-500/20",
      accent: "bg-purple-500/5"
    }
  };
  
  const colors = colorVariants[variant] || colorVariants.default;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient overlay */}
      <div className={`absolute inset-0 ${colors.accent} opacity-50`} />
      
      {/* Animated blobs */}
      <motion.div 
        className={`absolute -top-48 -left-48 w-96 h-96 rounded-full bg-gradient-to-r ${colors.blob1} blur-3xl`}
        animate={{ 
          x: [0, 10, -5, 0],
          y: [0, -10, 5, 0],
          scale: [1, 1.05, 0.98, 1] 
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className={`absolute top-1/4 -right-48 w-80 h-80 rounded-full bg-gradient-to-r ${colors.blob2} blur-3xl`}
        animate={{ 
          x: [0, -15, 8, 0],
          y: [0, 10, -10, 0],
          scale: [1, 0.97, 1.03, 1] 
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className={`absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r ${colors.blob3} blur-3xl`}
        animate={{ 
          x: [0, 15, -10, 0],
          y: [0, -5, 12, 0],
          scale: [1, 1.02, 0.98, 1] 
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
      
      {/* Optional noise texture overlay */}
      {withNoise && (
        <div 
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />
      )}
      
      {/* Optional mesh grid pattern */}
      {withMesh && (
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" 
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), 
                               linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      )}
      
      {/* Final overlay to ensure content readability */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/70 to-background/90 backdrop-blur-[2px]" />
    </div>
  );
};

const ColorPaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState('#3b82f6'); // Start with blue
  const [palette, setPalette] = useState([]);
  
  useEffect(() => {
    // Generate a simple palette based on the base color
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Generate complementary, analogous, monochromatic colors
    // This is a simplified version - a real tool would use more sophisticated algorithms
    const colors = [
      baseColor,
      `#${((r + 128) % 255).toString(16).padStart(2, '0')}${((g + 128) % 255).toString(16).padStart(2, '0')}${((b + 128) % 255).toString(16).padStart(2, '0')}`, // complementary
      `#${((r + 30) % 255).toString(16).padStart(2, '0')}${((g + 30) % 255).toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`, // analogous 1
      `#${((r - 30) % 255).toString(16).padStart(2, '0')}${((g - 30) % 255).toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`, // analogous 2
      `#${Math.floor(r * 0.7).toString(16).padStart(2, '0')}${Math.floor(g * 0.7).toString(16).padStart(2, '0')}${Math.floor(b * 0.7).toString(16).padStart(2, '0')}`, // darker shade
    ];
    
    setPalette(colors);
  }, [baseColor]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-background/60 backdrop-blur-sm p-6 rounded-xl border border-primary/20 shadow-xl"
    >
      <h3 className="text-xl font-bold mb-4">Logo Color Palette</h3>
      <div className="mb-4">
        <label className="block text-sm text-foreground/70 mb-2">Choose base color:</label>
        <input 
          type="color" 
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>
      
      <div className="space-y-3">
        <div className="text-sm text-foreground/70 mb-1">Your palette:</div>
        <div className="grid grid-cols-5 gap-2 h-12">
          {palette.map((color, i) => (
            <motion.div 
              key={i}
              className="rounded-md cursor-pointer relative group"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigator.clipboard.writeText(color)}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/40 rounded-md transition-opacity">
                <span className="text-xs text-white">{color}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-xs text-center text-foreground/60 mt-2">
          Click any color to copy its hex code
        </div>
      </div>
      
      <div className="mt-6">
        <div className="text-sm font-medium mb-2">Preview with your colors:</div>
        <div className="bg-background/20 p-4 rounded-lg flex items-center justify-center">
          <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: palette[0] }}>
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
      // Simplified result determination - in real app would be based on answers
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
      className="bg-gradient-to-br from-background to-secondary/10 rounded-xl p-6 border border-primary/20 shadow-lg"
    >
      <h3 className="text-xl font-bold mb-6 text-center">Find Your Logo Style</h3>
      
      {result ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-4 inline-block bg-primary/20 p-3 rounded-full">
            <Palette className="w-8 h-8 text-primary" />
          </div>
          <h4 className="text-lg font-bold text-primary mb-2">Your Ideal Style: {result.type}</h4>
          <p className="text-foreground/70 mb-6">{result.description}</p>
          <button 
            onClick={resetQuiz}
            className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium"
          >
            Take Quiz Again
          </button>
        </motion.div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between text-xs text-foreground/60 mb-2">
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
          
          <h4 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h4>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={handleSelectOption}
                className="w-full text-left p-3 rounded-lg border border-foreground/20 hover:border-primary transition-colors flex items-center justify-between"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{option}</span>
                <ChevronRight className="w-4 h-4 text-primary" />
              </motion.button>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

// Add this component definition before the LogoDesign function

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
    <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-primary/20 shadow-xl">
      <h3 className="text-xl font-bold mb-4">Logo Playground</h3>
      <div className="flex items-center justify-center mb-6">
        <motion.div 
          className={`w-32 h-32 flex items-center justify-center bg-gradient-to-br ${colors[color]} shadow-lg`}
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
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-foreground/70 mb-2">Shape</p>
          <div className="flex gap-2">
            {['circle', 'square', 'rounded', 'custom'].map(s => (
              <button 
                key={s}
                onClick={() => setShape(s)}
                className={`w-8 h-8 border ${shape === s ? 'border-primary' : 'border-foreground/20'} 
                  ${s === 'circle' ? 'rounded-full' : 
                    s === 'square' ? '' : 
                    s === 'rounded' ? 'rounded-lg' : 'rounded-tl-2xl rounded-br-2xl'}`}
              />
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-foreground/70 mb-2">Color</p>
          <div className="flex gap-2">
            {Object.keys(colors).map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[c]} ${color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}`}
              />
            ))}
          </div>
        </div>
        
        <div className="col-span-2">
          <p className="text-sm text-foreground/70 mb-2">Symbol</p>
          <div className="flex gap-2">
            {Object.keys(symbolComponents).map(s => (
              <button
                key={s}
                onClick={() => setSymbol(s)}
                className={`w-10 h-10 bg-background/50 rounded-md flex items-center justify-center ${symbol === s ? 'ring-2 ring-primary' : 'border border-foreground/20'}`}
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
        <p className="text-sm text-foreground/60">Try our full logo builder in the app</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium"
        >
          Save Your Design
        </motion.button>
      </div>
    </div>
  );
};

const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const sliderRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      setPosition(x);
    }
  };
  
  const handleTouchMove = (e) => {
    if (sliderRef.current && e.touches[0]) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
      setPosition(x);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative h-[300px] md:h-[400px] overflow-hidden rounded-xl shadow-xl border-2 border-primary/20 my-12"
      ref={sliderRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div className="absolute inset-0 z-10">
        <img 
          src="/api/placeholder/800/400?text=After:Refined+Logo" 
          alt="After redesign" 
          className="w-full h-full object-cover"
        />
      </div>
      <div 
        className="absolute inset-0 z-20 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img 
          src="/api/placeholder/800/400?text=Before:Original+Concept" 
          alt="Before redesign" 
          className="w-[800px] h-full object-cover"
        />
      </div>
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white z-30 cursor-ew-resize"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
          <div className="text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 17l-5-5 5-5"/>
              <path d="M14 17l5-5-5-5"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 z-40 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
        Slide to compare
      </div>
    </motion.div>
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
      <SmoothCursor CustomCursor={LogoDesignCursor} />
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
        <FloatingElements />
        {/* Hero Section with enhanced background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-heading">
          {/* Enhanced background elements */}
          <EnhancedBackgroundPattern variant="default" withNoise={true} />
          
          {/* Animated logo elements distributed around content */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Brand mark - top left */}
            <motion.div
              className="absolute w-16 h-16 md:w-24 md:h-24 rounded-xl bg-gradient-to-r from-pink-500/40 to-purple-500/40 backdrop-blur-sm border border-white/20 shadow-xl"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "15%",
                left: "8%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 15, -10, 0], 
                rotateY: [0, -15, 20, 0], 
                rotateZ: [0, 10, -5, 0],
                z: [0, 20, -10, 0] 
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="50%" height="50%" className="text-white/90">
                  <path fill="currentColor" d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M10,16.5L16,12L10,7.5V16.5Z" />
                </svg>
              </div>
            </motion.div>
            
            {/* Circle element - top right */}
            <motion.div
              className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-600/40 backdrop-blur-sm border border-white/20 shadow-xl"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "18%",
                right: "12%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, -20, 15, 0], 
                rotateY: [0, 25, -10, 0], 
                rotateZ: [0, -15, 5, 0],
                z: [0, -30, 15, 0] 
              }}
              transition={{ 
                duration: 18,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <div className="h-1/2 w-1/2 rounded-full border-4 border-white/60"></div>
              </div>
            </motion.div>
            
            {/* Horizontal bar - bottom right */}
            <motion.div
              className="absolute w-32 h-12 md:w-40 md:h-14 rounded-md bg-gradient-to-r from-yellow-400/40 to-orange-500/40 backdrop-blur-sm border border-white/20 shadow-xl"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                bottom: "22%",
                right: "15%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 10, -5, 0], 
                rotateY: [0, -10, 15, 0], 
                rotateZ: [0, 5, -10, 0],
                z: [0, 25, -15, 0] 
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            />
            
            {/* Star shape - above text */}
            <motion.div 
              className="absolute hidden md:block"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "12%",
                left: "40%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 15, -5, 0], 
                rotateY: [0, -15, 10, 0], 
                rotateZ: [0, 10, -5, 0],
                z: [0, 30, -20, 0] 
              }}
              transition={{ 
                duration: 16,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-xl">
                <path 
                  d="M40 5L50 30L75 40L50 50L40 75L30 50L5 40L30 30L40 5Z" 
                  fill="url(#logoGradient)" 
                  className="filter drop-shadow-lg"
                />
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            
            {/* Circle logo element - bottom left */}
            <motion.div
              className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-secondary/40 backdrop-blur-sm shadow-xl"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                bottom: "18%",
                left: "12%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, -15, 10, 0], 
                rotateY: [0, 10, -20, 0], 
                rotateZ: [0, -5, 15, 0],
                z: [0, -20, 10, 0] 
              }}
              transition={{ 
                duration: 17,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            />
            
            {/* Triangle element - left center */}
            <motion.div 
              className="absolute hidden md:block"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "45%",
                left: "8%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 20, -10, 0], 
                rotateY: [0, -10, 15, 0], 
                rotateZ: [0, 5, -15, 0],
                z: [0, 15, -10, 0] 
              }}
              transition={{ 
                duration: 14,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            >
              <svg width="50" height="50" viewBox="0 0 50 50" className="drop-shadow-xl">
                <path 
                  d="M25 5L45 40H5L25 5Z" 
                  fill="url(#triangleGradient)" 
                  className="filter drop-shadow-lg"
                />
                <defs>
                  <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            
            {/* Small square - right side of text */}
            <motion.div
              className="absolute w-8 h-8 md:w-10 md:h-10 rounded-md bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-sm border border-white/20 shadow-md"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "38%",
                right: "25%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 25, -15, 0], 
                rotateY: [0, -10, 20, 0], 
                rotateZ: [0, 15, -10, 0],
                y: [0, -5, 5, 0],
                z: [0, 10, -5, 0] 
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            />
            
            {/* Diamond - right bottom */}
            <motion.div 
              className="absolute hidden md:block"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                bottom: "32%",
                right: "28%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 45 }}
              animate={{ 
                rotateX: [0, 10, -15, 0], 
                rotateY: [0, -20, 10, 0], 
                rotateZ: [45, 55, 35, 45],
                z: [0, 15, -10, 0] 
              }}
              transition={{ 
                duration: 13,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-secondary/40 to-orange-500/40 backdrop-blur-sm border border-white/20 shadow-xl"></div>
            </motion.div>
            
            {/* Vertical rule - right edge */}
            <motion.div
              className="absolute h-24 w-6 md:h-32 md:w-8 rounded-full bg-gradient-to-b from-green-500/30 to-cyan-500/30 backdrop-blur-sm border border-white/10 shadow-xl"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d",
                top: "40%",
                right: "5%",
              }}
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{ 
                rotateX: [0, 5, -2, 0], 
                rotateY: [0, -5, 3, 0], 
                rotateZ: [0, 3, -1, 0],
                z: [0, 10, -5, 0] 
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror", 
                ease: "easeInOut" 
              }}
            />
          </div>
          
          {/* Content container */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 max-w-7xl mx-auto w-full gap-8 lg:gap-12 py-16">
            {/* Left side text content */}
            <div className="w-full lg:w-6/12 text-left space-y-6 mb-12 lg:mb-0">

              <motion.h1 
                id="hero-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] relative"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-primary relative inline-block">
                  Your Vision,
                  <motion.span 
                    className="absolute -top-6 -right-4 text-2xl text-yellow-400"
                    animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                  >
                    ✨
                  </motion.span>
                </span>
                <span className="block mt-2">Our Design <Cover className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-secondary to-orange-500">Magic</Cover></span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-foreground/80 max-w-xl"
              >
                Transforming concepts into <span className="italic text-purple-500">captivating</span> brand identities that <span className="font-bold text-cyan-500">stand out</span> and leave <span className="underline decoration-wavy decoration-yellow-500">lasting impressions</span>.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4 pt-4"
              >
                <button className="group relative overflow-hidden rounded-full bg-primary px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto flex items-center justify-center gap-2 text-white font-medium transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-[0.98]">
                  <Palette className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  <span>Explore Our Work</span>
                </button>
                
                <button className="group relative overflow-hidden rounded-full border-2 border-primary/30 px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto text-primary font-medium transition-all hover:bg-primary/5 hover:scale-[0.98]">
                  <span>Get a Free Quote</span>
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-5 text-sm text-foreground/60 pt-6 border-t border-foreground/10"
              >
                {[
                  { icon: <CheckCircle2 />, text: "Unlimited Revisions" },
                  { icon: <Shield />, text: "100% Satisfaction" },
                  { icon: <Zap />, text: "Fast Turnaround" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 text-primary">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Right side showcase */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full lg:w-6/12 relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Floating logo showcase */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative w-[80%] h-[80%] rounded-full border border-primary/20 flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Logos positioned around orbit */}
                    {[0, 60, 120, 180, 240, 300].map((degree, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{ 
                          transformOrigin: "center",
                          rotate: `${degree}deg`,
                          translateX: "150px"
                        }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ 
                          duration: 3, 
                          delay: i * 0.5, 
                          repeat: Infinity, 
                          repeatType: "reverse" 
                        }}
                      >
                        <div className={`w-16 h-16 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg
                          ${i % 5 === 0 ? 'bg-pink-500/20 border border-pink-500/30' : 
                            i % 5 === 1 ? 'bg-blue-500/20 border border-blue-500/30' : 
                            i % 5 === 2 ? 'bg-yellow-500/20 border border-yellow-500/30' : 
                            i % 5 === 3 ? 'bg-green-500/20 border border-green-500/30' : 
                            'bg-purple-500/20 border border-purple-500/30'}`}
                        >
                          {/* Fix: Use a proper style transform instead of template string */}
                          <div style={{ transform: `rotate(-${degree}deg)` }}>
                            {i % 6 === 0 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-pink-500">
                                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,20A8,8 0 0,1 20,12A8,8 0 0,1 12,4Z" />
                              </svg>
                            )}
                            {i % 6 === 1 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-blue-500">
                                <path fill="currentColor" d="M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />
                              </svg>
                            )}
                            {i % 6 === 2 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-yellow-500">
                                <path fill="currentColor" d="M3.5,4.5L9,10L3.5,15.5L8.5,20.5L14,15L19.5,20.5L21,19L15.5,13.5L21,8L12,8Z" />
                              </svg>
                            )}
                            {i % 6 === 3 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-green-500">
                                <path fill="currentColor" d="M12,2L1,21H23L12,2M12,6L19.5,19H4.5L12,6Z" />
                              </svg>
                            )}
                            {i % 6 === 4 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-purple-500">
                                <path fill="currentColor" d="M12,5.32L18,8.69V15.31L12,18.68L6,15.31V8.69L12,5.32M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" />
                              </svg>
                            )}
                            {i % 6 === 5 && (
                              <svg viewBox="0 0 24 24" width="32" height="32" className="text-cyan-500">
                                <path fill="currentColor" d="M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M12,4A6,6 0 0,0 6,10C6,12.97 8.16,15.43 11,15.91V19H13V15.91C15.84,15.43 18,12.97 18,10A6,6 0 0,0 12,4M12,6A4,4 0 0,1 16,10A4,4 0 0,1 12,14A4,4 0 0,1 8,10A4,4 0 0,1 12,6Z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Center featured logo */}
                    <motion.div 
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-md border border-white/30 shadow-xl flex items-center justify-center"
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
                      <svg viewBox="0 0 24 24" width="75" height="75" className="text-white drop-shadow-lg">
                        <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,8L10,15.5L14.5,13L16,16L18,15L15.5,11.5L19,10L12,8Z" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Design Process Section with enhanced background */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden" aria-labelledby="process-heading">
          <EnhancedBackgroundPattern variant="blue" withMesh={true} />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading 
              eyebrow="How It Works" 
              title="Logo Design Process" 
              subtitle="A simple, collaborative approach to create your perfect logo"
              center={true} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
              {DESIGN_PROCESS.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5, 
                    rotate: [-1, 1, 0],
                    transition: { rotate: { duration: 0.3 } }
                  }}
                  className={`p-6 md:p-8 rounded-2xl border-2 transition-all group relative overflow-hidden
                    ${index % 4 === 0 ? 'border-pink-400 bg-pink-50/10' : 
                      index % 4 === 1 ? 'border-cyan-400 bg-cyan-50/10' : 
                      index % 4 === 2 ? 'border-yellow-400 bg-yellow-50/10' : 
                      'border-purple-400 bg-purple-50/10'}`}
                >
                  <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className={`mb-4 md:mb-6 p-3 md:p-4 inline-block rounded-xl shadow-lg transform rotate-${(index % 2) ? '2' : '-2'} group-hover:rotate-0 transition-all
                    ${index % 4 === 0 ? 'bg-pink-500/20 shadow-pink-500/20' : 
                      index % 4 === 1 ? 'bg-cyan-500/20 shadow-cyan-500/20' : 
                      index % 4 === 2 ? 'bg-yellow-500/20 shadow-yellow-500/20' : 
                      'bg-purple-500/20 shadow-purple-500/20'}`}
                  >
                    {React.cloneElement(step.icon, { 
                      className: `w-6 h-6 
                        ${index % 4 === 0 ? 'text-pink-500' : 
                          index % 4 === 1 ? 'text-cyan-500' : 
                          index % 4 === 2 ? 'text-yellow-500' : 
                          'text-purple-500'}`}
                    )}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 flex items-center">
                    <span className={`text-2xl mr-2 font-black
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
            
            <div className="mt-16 max-w-md mx-auto">
              <LogoStyleQuiz />
            </div>
          </div>
        </section>

        {/* Portfolio Section with enhanced background */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden" aria-labelledby="portfolio-heading">
          <EnhancedBackgroundPattern variant="warm" withNoise={true} />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading 
              eyebrow="Our Work" 
              title="Logo Design Portfolio" 
              subtitle="Browse our collection of custom logo designs created for clients across various industries"
              center={true} 
            />
            
            {/* Enhanced Portfolio Grid - Without filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-background to-secondary/5 border-2 border-secondary/30 hover:border-primary/50 transition-colors shadow-lg"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="px-2 py-1 bg-primary/80 text-white text-xs rounded-md mb-2 inline-block">
                        {item.category}
                      </span>
                      <h3 className="text-white font-bold text-xl drop-shadow-md">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-2 text-white/80">
                        <ArrowRight className="w-4 h-4" />
                        <span className="text-sm">View case study</span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Note: "View All" button is removed */}
            <BeforeAfterSlider />
          </div>
        </section>

        {/* Tools Section with enhanced background */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden" aria-labelledby="tools-heading">
          <EnhancedBackgroundPattern variant="green" withMesh={true} />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading 
              eyebrow="Our Creative Journey" 
              title="From Spark to Masterpiece" 
              subtitle="A collaborative adventure to transform your vision into an unforgettable brand identity"
              center={true} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <LogoPlayground />
              <ColorPaletteGenerator />
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-16">
              {[
                { icon: <Figma className="w-8 h-8 md:w-10 md:h-10" />, name: "Figma", color: "purple" },
                { icon: <PenTool className="w-8 h-8 md:w-10 md:h-10" />, name: "Adobe Illustrator", color: "orange" },
                { icon: <Palette className="w-8 h-8 md:w-10 md:h-10" />, name: "Adobe Photoshop", color: "blue" },
                { icon: <LayoutGrid className="w-8 h-8 md:w-10 md:h-10" />, name: "Sketch", color: "yellow" },
                { icon: <FileType className="w-8 h-8 md:w-10 md:h-10" />, name: "Font Managers", color: "pink" },
                { icon: <ImagePlus className="w-8 h-8 md:w-10 md:h-10" />, name: "Asset Libraries", color: "cyan" }
              ].map((tool, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    rotate: [-2, 2, 0], 
                    transition: { rotate: { duration: 0.3 } }
                  }}
                >
                  <div className={`mb-4 p-5 rounded-2xl shadow-lg transform rotate-${Math.floor(Math.random() * 5) - 2} hover:rotate-0 transition-all
                    ${tool.color === 'purple' ? 'bg-purple-500/20 shadow-purple-500/20 text-purple-600' : 
                      tool.color === 'orange' ? 'bg-orange-500/20 shadow-orange-500/20 text-orange-600' : 
                      tool.color === 'blue' ? 'bg-blue-500/20 shadow-blue-500/20 text-blue-600' : 
                      tool.color === 'yellow' ? 'bg-yellow-500/20 shadow-yellow-500/20 text-yellow-600' : 
                      tool.color === 'pink' ? 'bg-pink-500/20 shadow-pink-500/20 text-pink-600' : 
                      'bg-cyan-500/20 shadow-cyan-500/20 text-cyan-600'}`}
                  >
                    {tool.icon}
                  </div>
                  <span className="font-semibold">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with enhanced background */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden" aria-labelledby="cta-heading">
          <EnhancedBackgroundPattern variant="purple" withNoise={true} />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block mb-8 transform -rotate-2">
              <div className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 backdrop-blur-md border-2 border-primary/30 shadow-lg shadow-primary/10 rounded-xl px-6 py-4">
                <SectionHeading
                  eyebrow="Let's Create Together"
                  title={<>Ready for a <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Logo Revolution</span>?</>}
                  subtitle="Let's collaborate to design a logo that perfectly captures your brand's unique personality"
                  center={true}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Logo Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span 
                  className="absolute inset-0 bg-white opacity-20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              
              <Cover className="dark:text-white text-black">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-lg font-bold hover:text-white transition-colors"
                >
                  View Portfolio
                </motion.button>
              </Cover>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: <CheckCircle2 className="w-5 h-5" />, text: "Money-back guarantee", color: "green" },
                { icon: <Shield className="w-5 h-5" />, text: "100% original designs", color: "blue" },
                { icon: <Award className="w-5 h-5" />, text: "Professional quality", color: "pink" }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3, rotate: [-1, 1, 0] }}
                >
                  <div className={`p-2 rounded-full
                    ${feature.color === 'green' ? 'bg-green-500/20 text-green-600' : 
                      feature.color === 'blue' ? 'bg-blue-500/20 text-blue-600' : 
                      'bg-pink-500/20 text-pink-600'}`}
                  >
                    {feature.icon}
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section with enhanced background */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden" aria-labelledby="faq-heading">
          <EnhancedBackgroundPattern variant="blue" withNoise={true} withMesh={true} />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <SectionHeading 
              eyebrow="Questions & Answers" 
              title="Logo Design Curiosities" 
              subtitle="Everything you've been wondering about our funky logo design process"
              center={true} 
            />
            
            <div className="space-y-4 md:space-y-6">
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
                  question: "What if I don't like any of the initial concepts?",
                  answer: "No worries! We'll go back to the drawing board and create new concepts based on your feedback. Our goal is your complete satisfaction, and we'll work with you until we nail the perfect design for your brand."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-xl bg-secondary/5 border border-secondary/20 overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-5 font-medium text-lg">
                      <span>{faq.question}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 transition-transform group-open:rotate-180" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-foreground/70">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="mb-6 text-foreground/70">Still have questions? We're happy to help!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us
                  <MessageCircle className="w-4 h-4" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12"
                  initial={{ left: '-100%' }}
                  whileHover={{ left: '100%' }}
                  transition={{ duration: 0.8 }}
                />
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default LogoDesign;