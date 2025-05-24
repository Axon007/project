import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Film, VideoIcon, Sparkles, Users, BarChart4, BadgeCheck, MonitorPlay, Camera, Headphones, Folders, Check, ChevronRight, Star, MessageCircle, TrendingUp, ShoppingBag
} from "lucide-react";
import PageTransition from '../components/PageTransition';
import Navbar from '../components/Navbar';
import FooterWithNewsletter from '../components/Footer';
import { AuroraText } from "../components/magicui/aurora-text";

const THEME_ACCENT = {
  primary: "#8B5CF6",
  secondary: "#EC4899",
  tertiary: "#3B82F6",
  accent: "#10B981",
  gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)"
};

// --- HERO SECTION ---
const HeroSection = () => (
  <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white">
    {/* Video Background */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-70"
    >
      <source src="/videos/big-eyed-fluff-ball.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-secondary/20 to-blue-500/20" />
    <div className="absolute inset-0 bg-black/60" />
    <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="inline-block mb-6"
      >
        <div className="bg-primary/20 text-white px-6 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-primary/20">
          Professional Video Editing Studio
        </div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-white leading-tight"
      >
        Transform Your <AuroraText>Vision</AuroraText>
        <span className="block mt-1">Into Reality</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light"
      >
        Elevate your content with cinematic editing, color grading, and motion graphics that captivate and convert.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10"
      >
        <button className="group relative overflow-hidden rounded-full bg-primary text-white px-10 py-4 w-full sm:w-auto flex items-center justify-center gap-3 font-medium transition-all border border-primary/50 hover:bg-primary/90 hover:scale-[0.98]">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Play className="w-5 h-5 text-primary ml-0.5" />
          </div>
          <span className="text-lg">Watch Showreel</span>
        </button>
        <button className="group relative overflow-hidden rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-10 py-4 w-full sm:w-auto text-white font-medium transition-all hover:bg-white/10 hover:scale-[0.98]">
          <span className="text-lg">Start Project</span>
          <ChevronRight className="w-5 h-5 opacity-70 ml-2 inline-block" />
        </button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-white"
      >
        {[{ icon: <BadgeCheck className="text-white" />, text: "Certified Editors" }, { icon: <Sparkles className="text-white" />, text: "Hollywood-Grade Tools" }, { icon: <BarChart4 className="text-white" />, text: "Data-Driven Results" }].map((feature, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 text-white">{feature.icon}</div>
            <span>{feature.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

// --- SERVICES SECTION ---
const SERVICES = [
  {
    title: "Commercial Editing",
    description: "High-impact promotional videos that drive conversions.",
    icon: <MonitorPlay className="w-10 h-10 text-primary" />,
    color: "from-violet-600 to-indigo-400"
  },
  {
    title: "Film Post-Production",
    description: "Cinematic color grading and seamless storytelling.",
    icon: <Film className="w-10 h-10 text-primary" />,
    color: "from-pink-600 to-rose-400"
  },
  {
    title: "Motion Graphics",
    description: "Dynamic animation and VFX for standout content.",
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    color: "from-green-500 to-emerald-400"
  },
  {
    title: "Content Optimization",
    description: "Platform-specific edits for maximum engagement.",
    icon: <BarChart4 className="w-10 h-10 text-primary" />,
    color: "from-blue-600 to-sky-400"
  }
];

const ServicesSection = () => (
  <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/30 rounded-full border border-violet-200 dark:border-violet-700/50"
      >
        Our Services
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
      >
        Editing Services That <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>Shine</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-600 dark:text-zinc-300"
      >
        Professional solutions for every stage of your video journey
      </motion.p>
    </div>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative"
          >
            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-zinc-800 h-full transition-all duration-300 group-hover:shadow-xl">
              <div className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color} text-white text-2xl`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-transparent bg-clip-text transition-all duration-300" style={{ backgroundImage: `linear-gradient(to right, ${service.color.replace('from-', '').replace('to-', '')})` }}>{service.title}</h3>
              <p className="text-gray-600 dark:text-zinc-400 mb-8">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- PLATFORMS/EXPERTISE SECTION ---
const PLATFORMS = {
  Premiere: {
    name: "Premiere Pro",
    icon: <Play className="w-7 h-7" />,
    color: "#A259FF",
    secondaryColor: "#0056D2",
    features: [
      "Industry-standard editing",
      "Multi-cam & proxy workflows",
      "Advanced color grading",
      "Seamless Adobe integration"
    ],
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
  },
  FinalCut: {
    name: "Final Cut Pro",
    icon: <Film className="w-7 h-7" />,
    color: "#FF5C57",
    secondaryColor: "#FFD600",
    features: [
      "Magnetic timeline",
      "Real-time effects",
      "Optimized for Mac",
      "HDR & 360° video"
    ],
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
  },
  DaVinci: {
    name: "DaVinci Resolve",
    icon: <VideoIcon className="w-7 h-7" />,
    color: "#00B4D8",
    secondaryColor: "#FFD166",
    features: [
      "Hollywood-grade color",
      "Fusion VFX & Fairlight audio",
      "Collaborative workflow",
      "Free & Studio versions"
    ],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  }
};

const PlatformsSection = () => {
  const [active, setActive] = useState('Premiere');
  const current = PLATFORMS[active];
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-900/30 rounded-full border border-pink-200 dark:border-pink-800/30"
        >
          Platform Mastery
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          We Master <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>Every Tool</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-zinc-300"
        >
          Deep expertise in the world's leading editing platforms
        </motion.p>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {Object.keys(PLATFORMS).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`relative px-5 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                active === key
                  ? 'bg-white dark:bg-zinc-800 shadow-lg border-2 border-transparent'
                  : 'bg-gray-100 dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 opacity-70 hover:opacity-100'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${active === key ? current.color : '#d1d5db'}30` }}
              >
                <div className="text-gray-700 dark:text-gray-300" style={{ color: active === key ? current.color : undefined }}>
                  {PLATFORMS[key].icon}
                </div>
              </div>
              <span className={`font-medium ${active === key ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{PLATFORMS[key].name}</span>
              {active === key && (
                <motion.div
                  layoutId="platformIndicator"
                  className="absolute -bottom-1 left-3 right-3 h-0.5"
                  style={{ background: `linear-gradient(to right, ${current.color}, ${current.secondaryColor})` }}
                />
              )}
            </button>
          ))}
        </motion.div>
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Platform image */}
          <div className="overflow-hidden rounded-2xl">
            <div className="relative h-full min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br" style={{ background: `linear-gradient(to bottom right, ${current.color}80, ${current.secondaryColor}80)` }}></div>
              <img src={current.image} alt={current.name} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>{current.icon}</div>
                  <h3 className="text-2xl font-bold">{current.name} Mastery</h3>
                </div>
              </div>
            </div>
          </div>
          {/* Platform features */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-gray-200 dark:border-zinc-800 shadow-lg flex flex-col justify-center">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">What We Do Best</h3>
            <ul className="space-y-4 mb-8">
              {current.features.map((feature, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${current.color}, ${current.secondaryColor})` }}>
                    <Check size={12} className="text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-1.5" style={{ background: `linear-gradient(to right, ${current.color}, ${current.secondaryColor})` }}>
              See {current.name} Work <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- WORKFLOW SECTION ---
const WORKFLOW = [
  {
    number: 1,
    title: "Brief & Vision",
    description: "We discuss your goals, style, and project requirements.",
    icon: <Users />
  },
  {
    number: 2,
    title: "Content Review",
    description: "Our editors analyze your footage and assets.",
    icon: <Folders />
  },
  {
    number: 3,
    title: "First Cut",
    description: "We deliver an initial edit for your feedback.",
    icon: <Film />
  },
  {
    number: 4,
    title: "Refinement",
    description: "We polish, color grade, and add effects.",
    icon: <Sparkles />
  },
  {
    number: 5,
    title: "Final Delivery",
    description: "You receive your video in any format you need.",
    icon: <BadgeCheck />
  }
];

const WorkflowSection = () => {
  const [active, setActive] = useState(1);
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800/30">
          Our Process
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          How We Edit <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>Your Story</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-zinc-300">
          A proven workflow for stunning results
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {WORKFLOW.map((step) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: step.number * 0.1 }}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col items-center ${
                active === step.number
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white dark:from-violet-500 dark:to-blue-500"
                  : "bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800"
              }`}
              onClick={() => setActive(step.number)}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold mb-4 ${
                active === step.number
                  ? "bg-white text-violet-600"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white"
              }`}>
                {step.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-center">{step.title}</h3>
              <p className={`text-sm text-center ${active !== step.number ? "text-gray-600 dark:text-zinc-400" : ""}`}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- TESTIMONIALS/CASE STUDIES ---
const TESTIMONIALS = [
  {
    quote: "ProEdit Studio transformed our raw footage into a compelling brand story that increased our conversion rates by 45%. Their editing style perfectly captured our vision and resonated with our audience.",
    author: "Sarah Johnson",
    position: "Marketing Director, Global Brands Inc.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo-placeholder.svg/512px-Logo-placeholder.svg.png"
  },
  {
    quote: "The post-production team at ProEdit delivered outstanding quality for our documentary series. Their color grading and sound design elevated our storytelling and helped us secure distribution with a major streaming platform.",
    author: "Michael Chen",
    position: "Executive Producer, Horizon Films",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo-placeholder.svg/512px-Logo-placeholder.svg.png"
  },
  {
    quote: "ProEdit's motion graphics team created stunning visual sequences that made our product launch video stand out. Their work directly contributed to a 78% increase in viewer engagement compared to our previous campaigns.",
    author: "Emma Rodriguez",
    position: "Creative Director, TechVision Media",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo-placeholder.svg/512px-Logo-placeholder.svg.png"
  }
];

const TestimonialsSection = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/5">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700/50"
        >
          Client Feedback
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          What Our Clients <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>Say</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-zinc-300"
        >
          Real feedback from brands and creators who trust us
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-800 p-8 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-base">{t.author}</h3>
                <p className="text-xs text-foreground/60">{t.position}</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-zinc-400 mb-6 flex-1">"{t.quote}"</p>
            <img src={t.logo} alt="logo" className="h-8 opacity-60 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- CTA SECTION ---
const CTASection = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-24 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>
    </div>
    <div className="max-w-5xl mx-auto relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 inline-flex gap-3 mx-auto"
      >
        <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
          Ready to get started?
        </div>
      </motion.div>
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-none">
        Let's Make Your Video
        <span className="block mt-2 text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}>
          Unforgettable
        </span>
      </h2>
      <p className="text-xl text-zinc-400 mb-12 max-w-3xl mx-auto">
        Get in touch today and see how we can transform your footage into a visual masterpiece.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
        <button className="group px-8 py-4 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-violet-900/20">
          Schedule Free Consultation
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="px-8 py-4 rounded-xl font-medium text-white bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 border border-white/10">
          View Portfolio
        </button>
      </div>
    </div>
  </section>
);

// --- WHY CHOOSE US: MODERN FEATURE GRID ---
const WhyChooseUsSection = () => {
  const features = [
    {
      title: "Professional Video Editing",
      description: "Expert editors craft compelling stories with seamless transitions, perfect pacing, and stunning visual effects.",
      icon: <Film className="w-8 h-8" />,
      color: "from-violet-500 to-indigo-400",
      video: "/videos/editing-demo.mp4"
    },
    {
      title: "Cinematic Color Grading",
      description: "Transform your footage with cinematic color grading that sets the mood and ensures consistency.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-pink-500 to-rose-400",
      video: "/videos/color-grading-demo.mp4"
    },
    {
      title: "Motion Graphics & VFX",
      description: "Enhance your videos with custom motion graphics, dynamic titles, and special effects.",
      icon: <VideoIcon className="w-8 h-8" />,
      color: "from-green-500 to-emerald-400",
      video: "/videos/motion-graphics-demo.mp4"
    },
    {
      title: "Sound Design & Mixing",
      description: "Perfect your audio with professional sound mixing, music selection, and sound effects.",
      icon: <Headphones className="w-8 h-8" />,
      color: "from-blue-600 to-sky-400",
      video: "/videos/sound-design-demo.mp4"
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/10 to-primary/5 overflow-hidden" aria-labelledby="why-choose-us">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-32 top-24 w-96 h-96 rounded-full bg-violet-400/20 blur-3xl animate-pulse" />
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-pink-400/20 blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-[40rem] h-[40rem] bg-blue-400/10 rounded-full blur-3xl opacity-40 animate-blob" />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20"
          >
            Our Advantage
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Why Choose <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME_ACCENT.gradient }}><AuroraText>Our Studio</AuroraText></span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-zinc-300 max-w-2xl mx-auto"
          >
            Experience the difference of professional video editing backed by expertise, creativity, and cutting-edge technology.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(139,92,246,0.12)" }}
              className="group relative bg-white/90 dark:bg-zinc-900/90 rounded-3xl shadow-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-center gap-0 md:gap-8"
            >
              {/* Video player with gradient overlay */}
              <div className="relative w-full md:w-48 h-40 md:h-48 flex-shrink-0 overflow-hidden">
                <video 
                  src={feature.video}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-60`} />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              {/* Feature content */}
              <div className="flex-1 p-8 flex flex-col items-center md:items-start text-center md:text-left">
                <div className={`mb-4 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color} text-white text-2xl shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-transparent bg-clip-text transition-all duration-300" style={{ backgroundImage: `linear-gradient(to right, #8B5CF6, #EC4899, #3B82F6)` }}>{feature.title}</h3>
                <p className="text-gray-600 dark:text-zinc-400 mb-2 text-base md:text-lg">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- MAIN PAGE ---
const VideoEditingPage = () => (
  <PageTransition>
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <PlatformsSection />
    <WorkflowSection />
    <TestimonialsSection />
    <CTASection />
    {/* Why Choose Us Section - Modern Feature Grid */}
    <WhyChooseUsSection />
  </PageTransition>
);

export default VideoEditingPage;