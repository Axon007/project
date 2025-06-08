import { motion } from "framer-motion";
import { AuroraBackground } from '../components/AuroraBackground';
import PageTransition from '../components/PageTransition';
import { NumberTicker } from '../components/ui/number-ticker';
import { Globe } from '../components/magicui/globe';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { 
  ArrowRight, Code, Palette, Gamepad2, VideoIcon, 
  Smartphone, Monitor, Star, Users, Trophy, 
  CheckCircle, Brain, Globe as GlobeIcon, Sparkles,
  TrendingUp, Clock, Shield, Share2, BookOpen, Eye,
  ExternalLink, Github, X
} from "lucide-react";

// Hero services data
const HERO_SERVICES = [
  { title: "Web Development", icon: <Code className="w-4 h-4" /> },
  { title: "Game Development", icon: <Gamepad2 className="w-4 h-4" /> },
  { title: "Logo Design", icon: <Palette className="w-4 h-4" /> },
  { title: "Video Editing", icon: <VideoIcon className="w-4 h-4" /> },
  { title: "App Development", icon: <Smartphone className="w-4 h-4" /> },
  { title: "Computer Vision", icon: <Brain className="w-4 h-4" /> },
  { title: "Social Media", icon: <Share2 className="w-4 h-4" /> },
  { title: "AR Solutions", icon: <Eye className="w-4 h-4" /> },
];

// Main services data
const SERVICES = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
    icon: <Code className="w-8 h-8" />,
    href: "/web-development",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that deliver seamless experiences across iOS and Android devices.",
    icon: <Smartphone className="w-8 h-8" />,
    href: "/app-development",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Game Development",
    description: "Immersive gaming experiences with stunning graphics, engaging gameplay, and cross-platform compatibility.",
    icon: <Gamepad2 className="w-8 h-8" />,
    href: "/game-development",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Computer Vision",
    description: "Advanced AR/VR solutions and artificial intelligence applications that transform how users interact with technology.",
    icon: <Brain className="w-8 h-8" />,
    href: "/computer-vision",
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Logo Design",
    description: "Professional branding and visual identity design that captures your brand's essence and resonates with your audience.",
    icon: <Palette className="w-8 h-8" />,
    href: "/logo-design",
    gradient: "from-violet-500/20 to-purple-500/20"
  },
  {
    title: "Video Editing",
    description: "Professional video editing and post-production services for compelling visual storytelling and brand content.",
    icon: <VideoIcon className="w-8 h-8" />,
    href: "/video-editing",
    gradient: "from-rose-500/20 to-pink-500/20"
  },
  {
    title: "Social Media",
    description: "Strategic social media management and content creation to boost your online presence and engagement.",
    icon: <Share2 className="w-8 h-8" />,
    href: "/social",
    gradient: "from-indigo-500/20 to-blue-500/20"
  },
  {
    title: "AR Solutions",
    description: "Cutting-edge augmented reality applications that blend digital innovation with real-world experiences.",
    icon: <Eye className="w-8 h-8" />,
    href: "/ar",
    gradient: "from-teal-500/20 to-green-500/20"
  },
  {
    title: "About Us",
    description: "Learn more about our team, mission, and the passion that drives us to deliver exceptional digital solutions.",
    icon: <BookOpen className="w-8 h-8" />,
    href: "/about",
    gradient: "from-amber-500/20 to-orange-500/20"
  }
];

// Stats data
const STATS = [
  { number: 500, label: "Projects Completed", suffix: "+" },
  { number: 150, label: "Happy Clients", suffix: "+" },
  { number: 5, label: "Years Experience", suffix: "+" },
];

// Features data
const FEATURES = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Performance Focused",
    description: "Optimized solutions that deliver lightning-fast performance and exceptional user experiences."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "On-Time Delivery",
    description: "We respect deadlines and deliver quality projects within the agreed timeline, every time."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Reliable",
    description: "Built with security best practices and reliable infrastructure for peace of mind."
  },  {
    icon: <Users className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Round-the-clock technical support and maintenance to keep your projects running smoothly."
  },
];

// Projects data
const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    features: [
      "Real-time inventory management",
      "Secure payment processing",
      "Admin dashboard",
      "Order tracking system",
      "Mobile responsive design"
    ],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project",
    status: "Completed",
    client: "Tech Retail Co."
  },
  {
    id: 2,
    title: "Fantasy RPG Game",
    category: "Game Development",
    description: "Immersive fantasy RPG with stunning visuals, engaging storyline, and cross-platform multiplayer functionality.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    technologies: ["Unity", "C#", "Photon", "AWS"],
    features: [
      "Cross-platform multiplayer",
      "Real-time combat system",
      "Character progression",
      "Guild system",
      "In-game marketplace"
    ],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project",
    status: "In Development",
    client: "Indie Game Studio"
  },
  {
    id: 3,
    title: "AI Content Platform",
    category: "Web Development",
    description: "Content management system powered by AI for automated content generation and optimization.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    technologies: ["Next.js", "OpenAI", "PostgreSQL", "AWS"],
    features: [
      "AI-powered content generation",
      "Real-time collaboration",
      "SEO optimization",
      "Analytics dashboard",
      "Multi-language support"
    ],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project",
    status: "Completed",
    client: "Digital Marketing Agency"
  },
  {
    id: 4,
    title: "Fitness Mobile App",
    category: "Mobile Development",
    description: "Comprehensive fitness tracking app with personalized workout plans and nutrition guidance.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    technologies: ["React Native", "Firebase", "HealthKit", "Google Fit"],
    features: [
      "Personalized workout plans",
      "Nutrition tracking",
      "Progress analytics",
      "Social sharing",
      "Wearable device integration"
    ],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project",
    status: "Completed",
    client: "Wellness Startup"
  },
  {
    id: 5,
    title: "Corporate Brand Identity",
    category: "Logo Design",
    description: "Complete visual identity overhaul for a Fortune 500 financial services company.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    technologies: ["Adobe Illustrator", "Photoshop", "Figma", "InDesign"],
    features: [
      "Logo design and variants",
      "Brand guidelines",
      "Marketing materials",
      "Digital assets",
      "Brand implementation"
    ],
    demo: "https://demo.example.com",
    github: null,
    status: "Completed",
    client: "Financial Corp"
  },
  {
    id: 6,
    title: "AR Shopping Experience",
    category: "AR/VR Development",
    description: "Augmented reality shopping app that lets customers try products virtually before purchasing.",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    technologies: ["ARKit", "ARCore", "Unity", "React Native"],
    features: [
      "3D product visualization",
      "Virtual try-on",
      "Real-time rendering",
      "Social sharing",
      "Purchase integration"
    ],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project",
    status: "In Development",
    client: "Fashion Retailer"
  }
];

// Service Card Component
const ServiceCard = ({ service, index }) => {
  const handleClick = () => {
    window.location.href = service.href;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 h-full">
        {/* Background gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
            {service.icon}
          </div>
          
          <h3 className="text-xl font-semibold mb-4 group-hover:text-foreground transition-colors">
            {service.title}
          </h3>
          
          <p className="text-foreground/70 mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors">
            {service.description}
          </p>
          
          <motion.div
            className="inline-flex items-center text-primary font-medium group-hover:text-primary transition-colors"
            whileHover={{ x: 5 }}
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
        {feature.icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-foreground/70 text-sm">{feature.description}</p>
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ stat, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="relative p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 text-center h-full">
        {/* Subtle gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          {/* Number with enhanced styling */}
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              <NumberTicker value={stat.number} />
              {stat.suffix}
            </span>
          </div>
          
          {/* Label with subtle styling */}
          <p className="text-foreground/70 font-medium text-sm md:text-base group-hover:text-foreground/80 transition-colors">
            {stat.label}
          </p>
          
          {/* Minimal decorative element */}
          <div className="w-8 h-0.5 bg-gradient-to-r from-primary/30 to-transparent rounded-full mx-auto mt-3 group-hover:from-primary/50 transition-all duration-300" />
        </div>
      </div>
    </motion.div>  );
};

// Project Card Component for Drawer
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {project.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            project.status === 'Completed' 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}>
            {project.status}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-secondary/20 text-foreground/60 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 bg-secondary/20 text-foreground/60 rounded">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground/60">
            {project.client}
          </span>
            <Drawer>
            <DrawerTrigger asChild>
              <button className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                View Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="max-w-6xl mx-auto max-h-[90vh] overflow-y-auto">
              <DrawerHeader className="px-6 pt-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <DrawerTitle className="text-2xl md:text-3xl font-bold mb-2">{project.title}</DrawerTitle>
                    <DrawerDescription className="text-base md:text-lg text-foreground/70">
                      {project.description}
                    </DrawerDescription>
                  </div>
                  <DrawerClose asChild>
                    <button className="ml-4 p-2 hover:bg-secondary/20 rounded-lg transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </DrawerClose>
                </div>
              </DrawerHeader>
              
              <div className="px-6 pb-6 space-y-8">
                {/* Project Image */}
                <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Column - Project Details & Technologies */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Project Details */}
                    <div className="p-6 rounded-xl bg-secondary/20 border border-border">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-primary" />
                        Project Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-foreground/60 font-medium">Category:</span>
                          <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {project.category}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-foreground/60 font-medium">Status:</span>
                          <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                            project.status === 'Completed' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-foreground/60 font-medium">Client:</span>
                          <span className="font-medium">{project.client}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Technologies */}
                    <div className="p-6 rounded-xl bg-secondary/20 border border-border">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Code className="w-5 h-5 text-primary" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="text-sm px-3 py-2 bg-primary/10 text-primary rounded-lg font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Features & Actions */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Key Features */}
                    <div className="p-6 rounded-xl bg-secondary/20 border border-border">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary" />
                        Key Features
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {project.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
                        >
                          <ExternalLink className="w-5 h-5" />
                          View Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 border-2 border-border text-foreground rounded-xl hover:bg-secondary/30 hover:border-primary/50 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                          <Github className="w-5 h-5" />
                          View Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Additional Info Section */}
                <div className="pt-6 border-t border-border">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-sm text-foreground/60">
                      <p>Interested in a similar project? <a href="/contact" className="text-primary hover:text-primary/80 font-medium underline">Get in touch</a> to discuss your requirements.</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary/20 transition-colors">
                        Share Project
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </motion.div>
  );
};

function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen">        {/* Hero Section with Aurora Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <AuroraBackground 
            className="absolute inset-0 z-0" 
            showRadialGradient={true}
            intensity={0.9}
          />
          
          {/* Enhanced background elements */}
          <div className="absolute inset-0 z-5">
            {/* Floating orbs for additional visual interest */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-primary/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
            
            {/* Subtle grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
          
          {/* Globe behind the content */}
          <div className="absolute inset-0 flex items-center justify-center pt-20 opacity-20 dark:opacity-25 pointer-events-none z-10">
            <Globe 
              className="w-[700px] h-[700px] max-w-[85vw] max-h-[85vh]"
              config={{
                width: 900,
                height: 900,
                onRender: () => {},
                devicePixelRatio: 2,
                phi: 0,
                theta: 0.3,
                dark: 0.2,
                diffuse: 0.6,
                mapSamples: 24000,
                mapBrightness: 1.5,
                baseColor: [0.08, 0.15, 0.35], // Deep blue base color
                markerColor: [0.2, 0.6, 1.0], // Bright blue markers
                glowColor: [0.15, 0.4, 0.8], // Blue glow
                opacity: 0.8,
                markers: [
                  // Enhanced marker set with more detail
                  { location: [37.7749, -122.4194], size: 0.12 }, // San Francisco
                  { location: [40.7128, -74.006], size: 0.12 }, // New York
                  { location: [51.5074, -0.1278], size: 0.1 }, // London
                  { location: [35.6762, 139.6503], size: 0.1 }, // Tokyo
                  { location: [19.076, 72.8777], size: 0.1 }, // Mumbai
                  { location: [39.9042, 116.4074], size: 0.1 }, // Beijing
                  { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo
                  { location: [52.52, 13.405], size: 0.08 }, // Berlin
                  { location: [48.8566, 2.3522], size: 0.08 }, // Paris
                  { location: [55.7558, 37.6176], size: 0.08 }, // Moscow
                  { location: [1.3521, 103.8198], size: 0.08 }, // Singapore
                  { location: [25.2048, 55.2708], size: 0.07 }, // Dubai
                  { location: [43.6532, -79.3832], size: 0.07 }, // Toronto
                  { location: [37.5665, 126.978], size: 0.07 }, // Seoul
                  { location: [-33.8688, 151.2093], size: 0.07 }, // Sydney
                  { location: [59.3293, 18.0686], size: 0.06 }, // Stockholm
                  { location: [47.3769, 8.5417], size: 0.06 }, // Zurich
                  { location: [60.1699, 24.9384], size: 0.05 }, // Helsinki
                  { location: [14.5995, 120.9842], size: 0.05 }, // Manila
                  { location: [23.8103, 90.4125], size: 0.05 }, // Dhaka
                  { location: [30.0444, 31.2357], size: 0.05 }, // Cairo
                  { location: [19.4326, -99.1332], size: 0.05 }, // Mexico City
                  { location: [41.0082, 28.9784], size: 0.05 }, // Istanbul
                  { location: [-34.6037, -58.3816], size: 0.05 }, // Buenos Aires
                  { location: [12.9716, 77.5946], size: 0.05 }, // Bangalore
                ],
              }}
            />
          </div>          <div className="relative z-20 max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 relative z-10"
            >
              <span className="inline-flex items-center px-5 py-3 rounded-full bg-primary/15 dark:bg-primary/10 border border-primary/30 dark:border-primary/20 text-primary text-sm font-medium backdrop-blur-sm shadow-lg shadow-primary/10">
                <span className="relative flex h-2 w-2 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Now Available for New Projects
              </span>
            </motion.div>

            {/* Main Heading with enhanced effects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 relative z-10"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 relative">
                {/* Text shadow for better readability */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent blur-sm opacity-50"></span>
                <span className="relative bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
                  Jason Tech Solutions
                </span>
              </h1>
                <div className="relative">
                <p className="relative text-lg md:text-xl text-foreground/80 dark:text-foreground/70 max-w-3xl mx-auto leading-relaxed font-medium">
                  We craft exceptional digital experiences through innovative web development, 
                  mobile apps, games, and cutting-edge technology solutions that drive success.
                </p>
              </div>
            </motion.div>

            {/* Enhanced Service Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto relative z-10"
            >
              {HERO_SERVICES.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-3 rounded-full border border-primary/30 dark:border-primary/20 bg-primary/10 dark:bg-primary/5 backdrop-blur-sm flex items-center gap-2 text-sm font-medium hover:bg-primary/15 dark:hover:bg-primary/10 transition-all duration-300 cursor-default shadow-lg shadow-primary/5"
                >
                  <span className="text-primary">{service.icon}</span>
                  <span className="text-foreground/90 dark:text-foreground/80">{service.title}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/30 flex items-center gap-2 min-w-[200px] justify-center"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-secondary/30 dark:bg-secondary/20 backdrop-blur-sm border border-border hover:border-primary/30 text-foreground rounded-xl font-semibold hover:bg-secondary/40 dark:hover:bg-secondary/30 transition-all flex items-center gap-2 min-w-[200px] justify-center shadow-lg"
              >
                Learn More
                <GlobeIcon className="w-5 h-5" />
              </motion.a>
            </motion.div>            {/* Stats Section - moved inside hero for better integration */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 relative z-10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {STATS.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="text-center group cursor-default"
                  >
                    <div className="relative p-4 rounded-2xl bg-background/10 dark:bg-background/5 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <div className="text-2xl md:text-3xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                          <NumberTicker value={stat.number} />
                          {stat.suffix}
                        </span>
                      </div>
                      <p className="text-foreground/70 dark:text-foreground/60 font-medium text-sm group-hover:text-foreground/80 dark:group-hover:text-foreground/70 transition-colors">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                ))}              </div>
            </motion.div>

          </div>
          
        </section>



        {/* Services Section */}
        <section className="py-28 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Our Services
              </span>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Comprehensive Digital Solutions
              </h2>
              
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                From concept to deployment, we deliver end-to-end solutions that transform 
                your business and create meaningful connections with your audience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>        {/* Features Section */}
        <section className="py-28 px-4 bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Why Choose Us
              </span>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Built for Excellence
              </h2>
              
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                We combine technical expertise with creative vision to deliver solutions 
                that exceed expectations and drive measurable results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-28 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Our Portfolio
              </span>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Featured Projects
              </h2>
              
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                Explore our recent work and see how we've helped clients achieve their goals 
                through innovative design and cutting-edge technology solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10 border border-primary/20 backdrop-blur-sm overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-blue-500/10 rounded-full blur-xl" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Start Your Project?
                  </h2>
                  
                  <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                    Let's discuss your ideas and create something amazing together. 
                    Get in touch for a free consultation and project quote.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
                    >
                      Get Started Today
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <a
                      href="/about"
                      className="px-8 py-4 border border-border text-foreground rounded-xl font-semibold hover:bg-secondary/20 transition-all flex items-center justify-center gap-2"
                    >
                      View Our Work
                      <Trophy className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default Home;