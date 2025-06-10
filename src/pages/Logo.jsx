"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Quote,
  ChevronDown,
  Sparkles,
  Users,
  Target,
  Eye,
  Brush,
  Palette,
  Zap,
  Clock,
  Shield,
  Award,
  TrendingUp,
  Download,
  Play,
  Grid3X3,
  Layers,
  MousePointer,
  Heart
} from 'lucide-react';

// Simple text animation component
const TextAnimate = ({ text, className, animation = "slideUp", children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: animation === "slideUp" ? 50 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      {children || text}
    </motion.div>
  );
};

// Simple shimmer button component
const ShimmerButton = ({ children, className = "", ...props }) => {
  return (
    <motion.button
      className={`relative px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium overflow-hidden group ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      {children}
    </motion.button>
  );
};

// Simple dot pattern background
const DotPattern = ({ className }) => {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    />
  );
};

// Simple grid pattern background
const GridPattern = ({ className, width = 40, height = 40 }) => {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: `${width}px ${height}px`
      }}
    />
  );
};

// Simple animated gradient text
const AnimatedGradientText = ({ children, className }) => {
  return (
    <span className={`bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

// Simple number ticker
const NumberTicker = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{displayValue}</span>;
};

// Simple sparkles text
const SparklesText = ({ children, className }) => {
  return (
    <span className={`relative ${className}`}>
      {children}
      <Sparkles className="inline w-6 h-6 ml-2 text-yellow-400" />
    </span>
  );
};

// Simple box reveal animation
const BoxReveal = ({ children, boxColor = "#000000", duration = 0.5 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

// Simple hyper text component
const HyperText = ({ children }) => {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="cursor-default"
    >
      {children}
    </motion.span>
  );
};

// Simple flickering grid
const FlickeringGrid = ({ className, squareSize = 4, gridGap = 6, color = "#000000", maxOpacity = 0.1, flickerChance = 0.1 }) => {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${color}${Math.floor(maxOpacity * 255).toString(16)} 1px, transparent 1px),
          linear-gradient(to bottom, ${color}${Math.floor(maxOpacity * 255).toString(16)} 1px, transparent 1px)
        `,
        backgroundSize: `${squareSize + gridGap}px ${squareSize + gridGap}px`
      }}
    />
  );
};

// Simple ripple effect
const Ripple = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute w-96 h-96 rounded-full border border-gray-200/20 dark:border-gray-700/20 animate-ping" />
      <div className="absolute w-80 h-80 rounded-full border border-gray-200/30 dark:border-gray-700/30 animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute w-64 h-64 rounded-full border border-gray-200/40 dark:border-gray-700/40 animate-ping" style={{ animationDelay: '2s' }} />
    </div>
  );
};

const LogoDesign = () => {
  const [activeTab, setActiveTab] = useState('palette');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('light');
  
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  // Portfolio items with minimal design
  const portfolioItems = [
    { id: 1, title: "Zenith", category: "Technology", preview: "Z", gradient: "from-blue-500 to-purple-600" },
    { id: 2, title: "Pulse", category: "Healthcare", preview: "P", gradient: "from-green-500 to-teal-600" },
    { id: 3, title: "Forge", category: "Manufacturing", preview: "F", gradient: "from-orange-500 to-red-600" },
    { id: 4, title: "Nova", category: "Finance", preview: "N", gradient: "from-yellow-500 to-orange-600" },
    { id: 5, title: "Echo", category: "Media", preview: "E", gradient: "from-purple-500 to-pink-600" },
    { id: 6, title: "Flux", category: "Energy", preview: "F", gradient: "from-emerald-500 to-cyan-600" }
  ];

  // Simplified process steps
  const processSteps = [
    {
      number: "01",
      title: "Discover",
      description: "Understanding your brand essence and market position through strategic research and insights.",
      icon: <Target className="w-5 h-5" />
    },
    {
      number: "02", 
      title: "Conceptualize",
      description: "Transforming insights into creative concepts that capture your brand's unique identity.",
      icon: <Brush className="w-5 h-5" />
    },
    {
      number: "03",
      title: "Refine", 
      description: "Perfecting every detail to ensure your logo works across all touchpoints and scales.",
      icon: <Eye className="w-5 h-5" />
    },
    {
      number: "04",
      title: "Deliver",
      description: "Providing complete brand assets with comprehensive guidelines for consistent application.",
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "What's included in the logo design package?",
      answer: "Every package includes multiple logo concepts, unlimited revisions, final files in all formats (AI, EPS, PNG, SVG, PDF), brand guidelines, and ongoing support for 30 days."
    },
    {
      question: "How long does the design process take?",
      answer: "Our streamlined process typically takes 5-7 business days from briefing to final delivery, with regular check-ins and feedback sessions throughout."
    },
    {
      question: "Do you offer trademark research?",
      answer: "Yes, we include basic trademark screening as part of our process and can provide comprehensive trademark research services upon request."
    },
    {
      question: "What if I need changes after the project is complete?",
      answer: "We offer 30 days of complimentary minor revisions. For major changes or additional design work, we provide flexible revision packages at competitive rates."
    }
  ];

  // Color Palette Tool
  const ColorPaletteGenerator = () => {
    const [currentPalette, setCurrentPalette] = useState([
      '#2563eb', '#7c3aed', '#dc2626', '#ea580c', '#16a34a'
    ]);

    const generatePalette = () => {
      const baseHues = [220, 260, 350, 25, 142];
      const newPalette = baseHues.map(hue => 
        `hsl(${hue + Math.random() * 20 - 10}, ${65 + Math.random() * 20}%, ${45 + Math.random() * 15}%)`
      );
      setCurrentPalette(newPalette);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {currentPalette.map((color, index) => (
            <motion.div
              key={index}
              className="aspect-square rounded-xl cursor-pointer relative group overflow-hidden"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigator.clipboard.writeText(color)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Copy
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <button
          onClick={generatePalette}
          className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:scale-[1.02] transition-transform"
        >
          Generate New Palette
        </button>
      </div>
    );
  };

  // Brand Quiz
  const BrandQuiz = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);

    const questions = [
      {
        question: "What's your industry?",
        options: ["Technology", "Healthcare", "Finance", "Creative", "Retail", "Consulting"]
      },
      {
        question: "Brand personality?",
        options: ["Professional", "Innovative", "Trustworthy", "Bold", "Elegant", "Approachable"]
      },
      {
        question: "Visual preference?",
        options: ["Minimal", "Detailed", "Geometric", "Organic", "Typographic", "Symbolic"]
      }
    ];

    const handleAnswer = (answer) => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        // Show results
        setStep(questions.length);
      }
    };

    const resetQuiz = () => {
      setStep(0);
      setAnswers([]);
    };

    if (step === questions.length) {
      return (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold">Perfect Match Found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Based on your preferences, we recommend a {answers[2]?.toLowerCase()} approach with {answers[1]?.toLowerCase()} characteristics for the {answers[0]?.toLowerCase()} industry.
          </p>
          
          <button
            onClick={resetQuiz}
            className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Take Again
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div 
              className="bg-gray-900 dark:bg-white h-1 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-4">{questions[step].question}</h3>
        <div className="grid grid-cols-2 gap-3">
          {questions[step].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(option)}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-900 dark:hover:border-white transition-colors text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  // Logo Preview Tool
  const LogoPreview = () => {
    const [text, setText] = useState('Your Brand');
    const [font, setFont] = useState('Inter');
    const [color, setColor] = useState('#000000');

    const fonts = ['Inter', 'Playfair Display', 'Space Grotesk', 'Crimson Text'];
    const colors = ['#000000', '#2563eb', '#7c3aed', '#dc2626', '#ea580c', '#16a34a'];

    return (
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center min-h-[120px] flex items-center justify-center">
          <motion.h2 
            className="text-3xl font-bold transition-all duration-300"
            style={{ 
              fontFamily: font === 'Inter' ? 'Inter, sans-serif' : 
                         font === 'Playfair Display' ? 'Playfair Display, serif' :
                         font === 'Space Grotesk' ? 'Space Grotesk, sans-serif' :
                         'Crimson Text, serif',
              color: color 
            }}
          >
            {text}
          </motion.h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Brand Name</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent"
              placeholder="Enter brand name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Typeface</label>
            <div className="grid grid-cols-2 gap-2">
              {fonts.map((fontName) => (
                <button
                  key={fontName}
                  onClick={() => setFont(fontName)}
                  className={`p-2 rounded-lg border text-sm transition-all ${
                    font === fontName 
                      ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {fontName}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex gap-2">
              {colors.map((colorOption) => (
                <button
                  key={colorOption}
                  onClick={() => setColor(colorOption)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    color === colorOption ? 'border-gray-400 scale-110' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: colorOption }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        
      

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
          <FlickeringGrid
            className="absolute inset-0 opacity-20 dark:opacity-10"
            squareSize={4}
            gridGap={6}
            color={theme === 'dark' ? '#ffffff' : '#000000'}
            maxOpacity={0.1}
            flickerChance={0.1}
          />

          <motion.div 
            className="relative z-10 text-center max-w-5xl mx-auto px-6"
            style={{ y }}
          >
            <BoxReveal boxColor={theme === 'dark' ? '#ffffff' : '#000000'} duration={0.5}>
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm">
                  <Sparkles className="w-3 h-3 mr-2" />
                  Trusted by industry leaders
                </span>
              </div>
            </BoxReveal>

            <BoxReveal boxColor={theme === 'dark' ? '#ffffff' : '#000000'} duration={0.5}>
              <h1 className="text-5xl md:text-7xl font-light leading-[0.9] mb-8 tracking-tight">
                Logos that
                <br />
                <AnimatedGradientText className="font-normal">define brands</AnimatedGradientText>
              </h1>
            </BoxReveal>

            <BoxReveal boxColor={theme === 'dark' ? '#ffffff' : '#000000'} duration={0.5}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                We create timeless brand identities that resonate with your audience and stand the test of time through strategic design thinking.
              </p>
            </BoxReveal>

            <BoxReveal boxColor={theme === 'dark' ? '#ffffff' : '#000000'} duration={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <ShimmerButton className="px-8 py-3">
                  Start Your Project
                </ShimmerButton>
                
                <button className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Play className="w-4 h-4" />
                  Watch Our Process
                </button>
              </div>
            </BoxReveal>

            <BoxReveal boxColor={theme === 'dark' ? '#ffffff' : '#000000'} duration={0.5}>
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-light mb-1">
                    <NumberTicker value={500} />+
                  </div>
                  <div className="text-sm text-gray-500">Brands Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light mb-1">
                    <NumberTicker value={98} />%
                  </div>
                  <div className="text-sm text-gray-500">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light mb-1">
                    <NumberTicker value={5} />
                  </div>
                  <div className="text-sm text-gray-500">Day Delivery</div>
                </div>
              </div>
            </BoxReveal>
          </motion.div>
        </section>

        {/* Portfolio Section */}
        <section id="work" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <TextAnimate
                  text="Recent Work"
                  className="text-4xl md:text-5xl font-light mb-6"
                  animation="slideUp"
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  Each project tells a unique story. From startups to Fortune 500 companies, 
                  we craft identities that capture the essence of every brand.
                </p>
              </div>
              
              <div className="flex justify-end">
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  View All Projects
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800 aspect-[4/3] mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90`} />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-light text-white">
                        {item.preview}
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 font-light">{item.category}</div>
                    <h3 className="text-xl font-light group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-32 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <TextAnimate
                text="Our Process"
                className="text-4xl md:text-5xl font-light mb-6"
                animation="slideUp"
              />
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                A methodical approach to creating logos that work as hard as you do, 
                grounded in strategy and refined through collaboration.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <div className="text-gray-600 dark:text-gray-400">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-2 font-mono">{step.number}</div>
                  <h3 className="text-xl font-light mb-4">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <TextAnimate
                text="Try Our Tools"
                className="text-4xl md:text-5xl font-light mb-6"
                animation="slideUp"
              />
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                Explore colors, styles, and possibilities with our interactive design tools.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex justify-center mb-8">
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                  {[
                    { id: 'palette', label: 'Colors', icon: <Palette className="w-4 h-4" /> },
                    { id: 'quiz', label: 'Quiz', icon: <Zap className="w-4 h-4" /> },
                    { id: 'preview', label: 'Preview', icon: <Eye className="w-4 h-4" /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                        activeTab === tab.id
                          ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'palette' && <ColorPaletteGenerator />}
                  {activeTab === 'quiz' && <BrandQuiz />}
                  {activeTab === 'preview' && <LogoPreview />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <TextAnimate
                text="Client Stories"
                className="text-4xl md:text-5xl font-light mb-6"
                animation="slideUp"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "Founder, Zenith AI",
                  content: "The logo perfectly captures our mission. Clean, intelligent, and timeless.",
                  rating: 5
                },
                {
                  name: "Marcus Johnson", 
                  role: "CEO, Pulse Health",
                  content: "Exceptional work that elevated our entire brand presence in the market.",
                  rating: 5
                },
                {
                  name: "Elena Rodriguez",
                  role: "Director, Forge Industries",
                  content: "Professional, collaborative, and delivered exactly what we envisioned.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <TextAnimate
                text="Common Questions"
                className="text-4xl md:text-5xl font-light mb-6"
                animation="slideUp"
              />
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                >
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <GridPattern 
              className="opacity-[0.02] dark:opacity-[0.05]"
              width={40}
              height={40}
            />
          </div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-light mb-8 leading-tight">
                Ready to create your
                <br />
                <SparklesText className="text-4xl md:text-6xl font-light">
                  perfect logo?
                </SparklesText>
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Let's bring your brand vision to life with a logo that tells your story and connects with your audience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <ShimmerButton className="px-8 py-4">
                  Start Your Project
                </ShimmerButton>
                
                <div className="flex items-center gap-2 text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">100% Satisfaction Guaranteed</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
                <div>
                  <Clock className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm text-gray-500">Fast Delivery</div>
                </div>
                <div>
                  <Award className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm text-gray-500">Award Winning</div>
                </div>
                <div>
                  <Heart className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm text-gray-500">Made with Care</div>
                </div>
              </div>
            </motion.div>
          </div>

          <Ripple />
        </section>

  
      </div>
    </div>
  );
};

export default LogoDesign;