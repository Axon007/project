import { memo, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Palette, Users, Rocket, Smartphone, ArrowUpRight, CheckCircle, Shield, Database, LayoutGrid, Gauge } from "lucide-react";
import { Link } from "react-router-dom";

// Memoized project data to prevent unnecessary re-renders
const FEATURED_PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
    image: "/projects/ecommerce.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project"
  },
  {
    title: "AI Content Platform",
    description: "Content management system powered by AI for automated content generation and optimization.",
    image: "/projects/ai-platform.jpg",
    technologies: ["Next.js", "OpenAI", "PostgreSQL", "AWS"],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project"
  },
  {
    title: "Real Estate Dashboard",
    description: "Interactive dashboard for real estate analytics with advanced filtering and 3D property tours.",
    image: "/projects/real-estate.jpg",
    technologies: ["React", "Three.js", "Express", "Redis"],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project"
  }
];

// Memoized services data
const SERVICES = [
  {
    title: "Custom Website Development",
    description: "Bespoke websites tailored to your specific needs and brand identity",
    icon: <Code className="w-8 h-8 text-primary" />
  },
  {
    title: "E-Commerce Development",
    description: "Online stores with secure payment processing and inventory management",
    icon: <Users className="w-8 h-8 text-primary" />
  },
  {
    title: "Website Maintenance",
    description: "Regular updates, security patches, and performance optimization",
    icon: <Users className="w-8 h-8 text-primary" />
  },
  {
    title: "Performance Optimization",
    description: "Speed up your website for better user experience and SEO rankings",
    icon: <Rocket className="w-8 h-8 text-primary" />
  }
];

// Memoized ProjectCard component to prevent unnecessary re-renders
const ProjectCard = memo(({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl aspect-video bg-background/80"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-6 w-full">
          <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-white/80 text-sm">{project.description}</p>
        </div>
      </div>
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover" 
        loading="lazy" // Lazy load images for better performance
        decoding="async" // Allows browser to decode the image asynchronously
      />
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

function WebDevelopmentServices() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Memoized tech stack data
  const techStack = useMemo(() => [
    { 
      name: "React", 
      level: "95%", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61DAFB"
    },
    { 
      name: "Node.js", 
      level: "90%", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "#339933"
    },
    { 
      name: "JavaScript", 
      level: "98%", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "#F7DF1E"
    },
    { 
      name: "TypeScript", 
      level: "88%", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "#3178C6"
    },
    { 
      name: "HTML/CSS", 
      level: "95%", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "#E34F26"
    },
    { 
      name: "Next.js", 
      level: "85%", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "#000000"
    },
    { 
      name: "Angular", 
      level: "80%", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
      color: "#DD0031"
    },
    { 
      name: "Vue.js", 
      level: "85%", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      color: "#4FC08D"
    },
  ], []);
  
  // Optimize canvas animation with useCallback
  const initCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true }); // Alpha optimization
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = (window.innerHeight * 0.7) * dpr; // 70vh
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = (window.innerHeight * 0.7) + 'px';
      ctx.scale(dpr, dpr); // Scale for high DPI screens
    };
    
    setCanvasDimensions();
    const resizeHandler = () => {
      // Use requestAnimationFrame to throttle resize events
      requestAnimationFrame(setCanvasDimensions);
    };
    
    window.addEventListener('resize', resizeHandler);
    
    // Create particles - Reduced count for better performance
    const particlesArray = [];
    const numberOfParticles = Math.min(60, Math.floor(window.innerWidth / 20)); // Scale with viewport
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width / window.devicePixelRatio;
        this.y = Math.random() * canvas.height / window.devicePixelRatio;
        this.size = Math.random() * 2 + 1; // Smaller particles
        this.speedX = Math.random() * 0.8 - 0.4; // Reduced speed
        this.speedY = Math.random() * 0.8 - 0.4; // Reduced speed
        this.color = `rgba(123, 97, 255, ${Math.random() * 0.4})`; // Primary color with varying opacity
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width / window.devicePixelRatio || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height / window.devicePixelRatio || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    const connectParticles = () => {
      const maxDistance = 80; // Shorter connection distance
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(123, 97, 255, ${0.05 - (distance/maxDistance) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    let animationFrameId;
    let lastTime = 0;
    const fps = 30; // Cap at 30 FPS for performance
    const fpsInterval = 1000 / fps;
    
    const animate = (timestamp) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Throttle frame rate
      const elapsed = timestamp - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = timestamp - (elapsed % fpsInterval);
      
      ctx.clearRect(0, 0, canvas.width/window.devicePixelRatio, canvas.height/window.devicePixelRatio);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connectParticles();
    };
    
    init();
    animate(0);
    
    return () => {
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  // Memoize the process steps
  const processSteps = useMemo(() => [
    {
      step: "1",
      title: "Discovery & Planning",
      description: "We start by understanding your business, goals, target audience, and project requirements through consultations and research.",
      icon: <Users className="w-6 h-6 text-white" />,
      details: [
        "Business objectives analysis",
        "Target audience research",
        "Competitive landscape review",
        "Project scope definition"
      ]
    },
    {
      step: "2",
      title: "Design & Prototyping",
      description: "Our designers create wireframes, mockups and interactive prototypes that align with your brand and optimize for user experience.",
      icon: <Palette className="w-6 h-6 text-white" />,
      details: [
        "Wireframing & UI mockups",
        "User experience design",
        "Responsive layout planning",
        "Interactive prototypes"
      ]
    },
    {
      step: "3",
      title: "Development",
      description: "Our expert developers build your website or application using clean, efficient code and modern technologies for optimal performance.",
      icon: <Code className="w-6 h-6 text-white" />,
      details: [
        "Frontend development",
        "Backend implementation",
        "Database integration",
        "API development"
      ]
    },
    {
      step: "4",
      title: "Testing & QA",
      description: "Rigorous testing ensures your website works flawlessly across all devices, browsers, and user scenarios.",
      icon: <Shield className="w-6 h-6 text-white" />,
      details: [
        "Functionality testing",
        "Cross-browser compatibility",
        "Mobile responsiveness",
        "Performance optimization"
      ]
    },
    {
      step: "5",
      title: "Launch & Support",
      description: "We deploy your site and provide continuous support and maintenance to keep everything running smoothly after launch.",
      icon: <Rocket className="w-6 h-6 text-white" />,
      details: [
        "Deployment preparation",
        "Server configuration",
        "Analytics setup",
        "Post-launch monitoring"
      ]
    }
  ], []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Canvas Background */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Canvas background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-[70vh] -z-0"
          aria-hidden="true"
        />
        
        <motion.div 
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Expert Web Solutions
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500 leading-tight"
          >
            Web Development <br className="hidden md:block" /> 
            <span className="text-foreground">That Drives Results</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8"
          >
            We create custom, high-performance websites and web applications 
            that help businesses transform their digital presence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a 
              href="#contact" 
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 hover:translate-y-[-2px]"
            >
              Start Your Project
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <a 
              href="#services" 
              className="bg-background border border-primary/30 text-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/5 transition-colors hover:translate-y-[-2px]"
            >
              Explore Services
            </a>
          </motion.div>
        </motion.div>
        
        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-10 left-0 right-0 z-10"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {[
              { value: "150+", label: "Projects Completed" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "5+", label: "Years Experience" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="bg-background/40 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Code architecture section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Clean Code Architecture
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">We Write Code That Scales</h2>
              <p className="text-foreground/70 text-lg">
                Our development approach prioritizes maintainability, scalability, and performance. 
                We follow industry best practices and modern coding standards to ensure your web 
                application can grow with your business.
              </p>
              <ul className="space-y-4">
                {[
                  "Component-based architecture",
                  "Optimized for performance",
                  "Secure coding practices",
                  "Fully documented codebase"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <a 
                  href="#process" 
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Learn more about our development process
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
            
            {/* Code editor illustration - rendered only when in viewport */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative">
                {/* Simplified background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet-500/20 blur-3xl opacity-30 rounded-full"></div>
                
                {/* Code editor window */}
                <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl">
                  {/* Editor toolbar */}
                  <div className="bg-background/90 backdrop-blur-sm p-2 border-b border-border/50 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-foreground/60 px-2 py-1 bg-background/50 rounded flex-1 text-center flex items-center justify-center">
                      app/components/HeroSection.jsx
                    </div>
                  </div>
                  
                  {/* Simplified code content - fewer elements for better performance */}
                  <div className="relative p-6 bg-background/95 backdrop-blur-sm font-mono text-sm max-h-[400px] overflow-y-auto">
                    <pre className="text-[13px] leading-relaxed pl-10">
                      <code className="language-jsx">
                        <span className="text-blue-400">import</span> <span className="text-foreground">{'{'}</span> <span className="text-yellow-300">motion</span> <span className="text-foreground">{'}'}</span> <span className="text-blue-400">from</span> <span className="text-green-300">'framer-motion'</span><span className="text-foreground">;</span>{'\n\n'}
                        <span className="text-blue-400">const</span> <span className="text-yellow-300">HeroSection</span> <span className="text-foreground">= () => {'{'}</span>{'\n'}
                        {'  '}<span className="text-blue-400">return</span> <span className="text-foreground">(</span>{'\n'}
                        {'    '}<span className="text-purple-400">{'<div'}</span> <span className="text-blue-300">className</span><span className="text-foreground">=</span><span className="text-green-300">"relative h-screen flex items-center"</span><span className="text-purple-400">{'>'}</span>{'\n'}
                        {'      '}<span className="text-purple-400">{'<motion.h1'}</span>{'\n'}
                        {'        '}<span className="text-blue-300">initial</span><span className="text-foreground">=</span><span className="text-foreground">{'{{opacity: 0, y: 20}}'}</span>{'\n'}
                        {'        '}<span className="text-blue-300">animate</span><span className="text-foreground">=</span><span className="text-foreground">{'{{opacity: 1, y: 0}}'}</span>{'\n'}
                        {'      '}<span className="text-purple-400">{'>'}</span>{'\n'}
                        {'        '}Building exceptional web experiences{'\n'}
                        {'      '}<span className="text-purple-400">{'</motion.h1>'}</span>{'\n'}
                        {'    '}<span className="text-purple-400">{'</div>'}</span>{'\n'}
                        {'  '}<span className="text-foreground">);</span>{'\n'}
                        <span className="text-foreground">{'}'};</span>{'\n\n'}
                        <span className="text-blue-400">export</span> <span className="text-blue-400">default</span> <span className="text-yellow-300">HeroSection</span><span className="text-foreground">;</span>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Optimized with fewer animations */}
      <section className="py-24 px-4" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
              Comprehensive Web Development Services
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              From concept to deployment, we offer end-to-end web solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Website Development",
                description: "Bespoke websites tailored to your specific needs, brand identity, and target audience for maximum impact.",
                icon: <Code className="w-8 h-8 text-primary" />,
                features: ["Responsive design", "SEO optimization", "Custom functionalities"],
                gradient: "from-primary/20 to-violet-500/20"
              },
              {
                title: "E-Commerce Development",
                description: "Powerful online stores with secure payment processing, inventory management, and seamless user experience.",
                icon: <Users className="w-8 h-8 text-primary" />,
                features: ["Product management", "Secure payments", "Order tracking"],
                gradient: "from-purple-500/20 to-blue-500/20"
              },
              {
                title: "Progressive Web Apps",
                description: "Fast, engaging mobile-first applications that provide a native app-like experience without requiring installation.",
                icon: <Smartphone className="w-8 h-8 text-primary" />,
                features: ["Offline functionality", "Fast loading", "Home screen installation"],
                gradient: "from-indigo-500/20 to-cyan-500/20"
              },
              {
                title: "API Development & Integration",
                description: "Custom API development and seamless integration with third-party services to extend your website's functionality.",
                icon: <Database className="w-8 h-8 text-primary" />,
                features: ["RESTful APIs", "Third-party integrations", "Authentication"],
                gradient: "from-blue-500/20 to-teal-500/20"
              },
              {
                title: "Website Maintenance & Support",
                description: "Regular updates, security patches, performance optimization, and ongoing support to keep your site running smoothly.",
                icon: <Shield className="w-8 h-8 text-primary" />,
                features: ["Security updates", "Performance monitoring", "Content updates"],
                gradient: "from-green-500/20 to-emerald-500/20"
              },
              {
                title: "Performance Optimization",
                description: "Speed optimization, caching strategies, and code refactoring to ensure your website loads quickly and performs efficiently.",
                icon: <Gauge className="w-8 h-8 text-primary" />,
                features: ["Speed testing", "Core Web Vitals", "Caching solutions"],
                gradient: "from-orange-500/20 to-pink-500/20"
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: Math.min(0.3, index * 0.1), // Cap max delay for better perceived performance
                }}
                className={`relative overflow-hidden rounded-3xl p-8 border border-border bg-gradient-to-br ${service.gradient} h-full`}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-secondary opacity-90"></div>
                <div className="relative z-10">
                  <div className="mb-6 p-3 rounded-xl bg-primary/10 w-fit backdrop-blur-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground/60">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technology section with simplified animations */}
      <section className="py-20 px-4 bg-secondary/30" id="technologies">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Technologies We Master</h2>
            <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
              We use cutting-edge technologies to build modern, scalable, and high-performance web applications
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-background border backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-8 h-8" 
                      loading="lazy"
                      width="32"
                      height="32"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{tech.name}</h3>
                </div>
                
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: tech.level,
                      background: `linear-gradient(90deg, ${tech.color}, rgba(123, 97, 255, 0.5))` 
                    }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-primary font-medium">{tech.level}</span>
                  <span className="text-xs text-foreground/60">
                    {index % 2 === 0 ? "Expert" : "Advanced"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development process with simplified timeline */}
      <section className="py-20 px-4" id="process">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Development Process
          </h2>
          
          <div className="relative">
            {/* Static timeline instead of animated line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/5 via-primary to-primary/5 -translate-x-1/2 hidden md:block" />
            
            {processSteps.map((phase, index) => (
              <div
                key={index}
                className={`relative mb-20 md:mb-32 ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} md:w-5/12`}
              >
                <div 
                  className={`absolute top-0 ${index % 2 === 0 ? 'left-0 md:right-0 md:left-auto' : 'left-0'} w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold z-10 shadow-lg shadow-primary/30`}
                >
                  {phase.icon}
                </div>
                
                <div className="pl-20 md:pl-0 md:pr-0">
                  <div className="p-6 rounded-2xl bg-secondary/80 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all shadow-lg hover:shadow-xl hover:shadow-primary/5">
                    <div className="mb-1 text-sm text-primary/80 font-semibold">Step {phase.step}</div>
                    <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                    <p className="text-foreground/70 mb-4">{phase.description}</p>
                    
                    <div className="overflow-hidden">
                      <ul className="space-y-2 mb-2">
                        {phase.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Timeline dot for desktop - static */}
                <div 
                  className="absolute top-7 left-7 md:left-auto md:right-0 w-4 h-4 rounded-full bg-primary z-20 hidden md:block"
                  style={{ [index % 2 === 0 ? 'right' : 'left']: '-8px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio section */}
      <section className="py-20 px-4" id="portfolio">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mt-6">
              Featured Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROJECTS.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-8 py-4 rounded-full text-lg font-medium transition-colors group border border-primary/20"
            >
              View All Projects
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - simplified animations */}
      <section className="py-20 px-4" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                company: "Fashion Retailer",
                quote: "The team delivered a stunning e-commerce website that exceeded our expectations. Sales have increased by 40% since launch!"
              },
              {
                name: "David Chen",
                company: "FinTech Startup",
                quote: "Their development team built our web application from concept to launch in record time. The code quality is exceptional."
              },
              {
                name: "Emily Rodriguez",
                company: "Marketing Agency",
                quote: "We've partnered with them for all our client websites. Their attention to detail and responsive designs are unmatched."
              },
              {
                name: "Michael Taylor",
                company: "SaaS Company",
                quote: "The custom CMS they built has transformed how we manage content. Our team loves how intuitive and powerful it is."
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl bg-secondary p-8 border border-primary/10"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                  </div>
                  <p className="text-foreground/80 mb-6 flex-grow">{testimonial.quote}</p>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-foreground/60">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - simplified with minimal animations */}
      <section className="py-24 px-4 bg-secondary/30" id="faq">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Everything you need to know about our web development services
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does it take to build a website?",
                answer: "The timeline for website development varies depending on complexity. A basic website typically takes 3-4 weeks, while more complex projects with custom functionality may take 2-3 months. During our initial consultation, we'll provide a more specific timeline based on your requirements."
              },
              {
                question: "Do you provide website maintenance after launch?",
                answer: "Yes, we offer ongoing maintenance and support packages to ensure your website remains secure, up-to-date, and performing optimally. Our maintenance services include regular updates, security patches, performance monitoring, and content updates."
              },
              {
                question: "Will my website be mobile-friendly?",
                answer: "Absolutely! All our websites are built with a mobile-first approach, ensuring they look and function perfectly across all devices, from smartphones and tablets to desktop computers. Responsive design is a standard feature in all our web development packages."
              },
              {
                question: "Can you redesign my existing website?",
                answer: "Yes, we specialize in website redesigns. We'll evaluate your current site, identify areas for improvement, and develop a strategy to enhance both its design and functionality while preserving your brand identity and SEO value."
              },
              {
                question: "Do you offer e-commerce functionality?",
                answer: "Yes, we build custom e-commerce solutions using platforms like Shopify, WooCommerce, or custom solutions depending on your specific needs. Our e-commerce websites include secure payment processing, inventory management, and a user-friendly shopping experience."
              },
              {
                question: "What is your payment structure?",
                answer: "We typically work with a 50% upfront deposit to begin the project, with the remaining balance due upon completion. For larger projects, we may establish a milestone-based payment schedule that aligns with project phases."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg">
                    {faq.question}
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-foreground/70">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(WebDevelopmentServices);