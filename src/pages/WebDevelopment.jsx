import { motion, useScroll, useTransform } from "framer-motion";
import { Meteors } from "../components/ui/meteor-effect";
import { Code, Palette, Globe, Users, Rocket, Smartphone, ArrowUpRight, CheckCircle, Shield, Clock, BadgeCheck, Cpu, Database, LayoutGrid, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Terminal, TypingAnimation, AnimatedSpan } from "../components/magicui/terminal";
import { AnimatePresence } from "framer-motion";

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

const SERVICES = [
  {
    title: "Custom Website Development",
    description: "Bespoke websites tailored to your specific needs and brand identity",
    icon: <Code className="w-8 h-8 text-primary" />
  },
  {
    title: "E-Commerce Development",
    description: "Online stores with secure payment processing and inventory management",
    icon: <Globe className="w-8 h-8 text-primary" />
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

function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl aspect-video bg-background/80"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-6 w-full">
          <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-white/80 text-sm">{project.description}</p>
        </div>
      </div>
      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
    </motion.div>
  );
}

function WebDevelopmentServices() {
  const canvasRef = useRef(null);
  const techSphereRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  // Add interactive 3D technology sphere
  useEffect(() => {
    if (!techSphereRef.current) return;
    
    const container = techSphereRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 400;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Create sphere
    const geometry = new THREE.SphereGeometry(150, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x7b61ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Add technology icons around the sphere (simplified for this example)
    const iconCount = 20;
    const iconGeometry = new THREE.BoxGeometry(10, 10, 10);
    const iconMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const icons = [];
    for (let i = 0; i < iconCount; i++) {
      const icon = new THREE.Mesh(iconGeometry, iconMaterial);
      const phi = Math.acos(-1 + (2 * i) / iconCount);
      const theta = Math.sqrt(iconCount * Math.PI) * phi;
      
      icon.position.x = 180 * Math.sin(phi) * Math.cos(theta);
      icon.position.y = 180 * Math.sin(phi) * Math.sin(theta);
      icon.position.z = 180 * Math.cos(phi);
      
      icons.push(icon);
      scene.add(icon);
    }
    
    // Animate the sphere
    const animate = () => {
      requestAnimationFrame(animate);
      
      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.003;
      
      // Make icons stay in place relative to the camera
      icons.forEach(icon => {
        icon.lookAt(camera.position);
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7; // 70vh
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particlesArray = [];
    const numberOfParticles = 100;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(123, 97, 255, ${Math.random() * 0.5})`; // Primary color with varying opacity
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
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
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(123, 97, 255, ${0.1 - (distance/100) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Interactive Sphere and Canvas Background */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-background"></canvas>
        
        <motion.div 
          ref={techSphereRef}
          className="absolute top-0 right-0 w-full h-full pointer-events-none z-10"
          style={{ opacity: 0.7 }}
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

      
      {/* Code Showcase Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
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
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet-500/20 blur-3xl opacity-30 rounded-full"></div>
              <motion.div
                className="relative"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
              <Terminal className="shadow-2xl">
  <pre className="text-sm leading-relaxed whitespace-pre-wrap text-left">
    <TypingAnimation duration={50}>
      <AnimatedSpan className="text-blue-400" delay={200}>$ npm create next-app@latest my-project{"\n\n"}</AnimatedSpan>
      <AnimatedSpan>Creating a new Next.js app in ./my-project...{"\n\n"}</AnimatedSpan>
      <AnimatedSpan>✓ Would you like to use TypeScript? Yes{"\n"}</AnimatedSpan>
      <AnimatedSpan>✓ Would you like to use ESLint? Yes{"\n"}</AnimatedSpan>
      <AnimatedSpan>✓ Would you like to use Tailwind CSS? Yes{"\n"}</AnimatedSpan>
      <AnimatedSpan>✓ Would you like to use `src/` directory? Yes{"\n"}</AnimatedSpan>
      <AnimatedSpan>✓ Would you like to use App Router? Yes{"\n\n"}</AnimatedSpan>
      <AnimatedSpan>Installing dependencies:{"\n"}</AnimatedSpan>
      <AnimatedSpan>- react{"\n"}</AnimatedSpan>
      <AnimatedSpan>- react-dom{"\n"}</AnimatedSpan>
      <AnimatedSpan>- next{"\n"}</AnimatedSpan>
      <AnimatedSpan>- typescript{"\n"}</AnimatedSpan>
      <AnimatedSpan>- @types/react{"\n"}</AnimatedSpan>
      <AnimatedSpan>- tailwindcss{"\n\n"}</AnimatedSpan>
      <AnimatedSpan>Success! Created a new project at ./my-project{"\n\n"}</AnimatedSpan>
      <AnimatedSpan>$ cd my-project && npm run dev{"\n\n"}</AnimatedSpan>
      <AnimatedSpan>ready - started server on 0.0.0.0:3000, url: http://localhost:3000</AnimatedSpan>
    </TypingAnimation>
  </pre>
</Terminal>

              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Enhanced Services Section with Interactive Cards */}
      <section className="py-24 px-4" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              Our Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mt-4 mb-6"
            >
              Comprehensive Web Development Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-foreground/70 max-w-3xl mx-auto"
            >
              From concept to deployment, we offer end-to-end web solutions tailored to your business needs
            </motion.p>
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
                icon: <Globe className="w-8 h-8 text-primary" />,
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
                initial={false}
                animate={false}
                transition={false}
                className={`group relative overflow-hidden rounded-3xl p-8 hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/30 bg-gradient-to-br ${service.gradient}`}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-secondary opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-6 p-3 rounded-xl bg-primary/10 w-fit backdrop-blur-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground/60">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {/* Removed "Learn more about this service" and its animation */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Why Choose Our Web Development Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-foreground/70 max-w-3xl mx-auto"
            >
              We combine technical expertise with strategic thinking to deliver websites that drive results
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Results-Driven Approach",
                description: "We focus on creating websites that not only look great but also achieve your business objectives and deliver measurable results.",
                icon: <Rocket className="w-6 h-6 text-white" />
              },
              {
                title: "Technical Excellence",
                description: "Our development team stays at the forefront of web technologies to build fast, scalable, and secure digital solutions.",
                icon: <Cpu className="w-6 h-6 text-white" />
              },
              {
                title: "User-Centric Design",
                description: "We create intuitive interfaces and seamless user experiences that engage visitors and drive conversions.",
                icon: <Users className="w-6 h-6 text-white" />
              },
              {
                title: "Transparent Communication",
                description: "Throughout the project, we maintain clear and consistent communication, keeping you informed at every stage.",
                icon: <LayoutGrid className="w-6 h-6 text-white" />
              },
              {
                title: "Timely Delivery",
                description: "We respect deadlines and deliver projects on time without compromising on quality or attention to detail.",
                icon: <Clock className="w-6 h-6 text-white" />
              },
              {
                title: "Ongoing Support",
                description: "Our relationship doesn't end at launch. We provide continued support to ensure your website evolves with your business.",
                icon: <BadgeCheck className="w-6 h-6 text-white" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Technology Showcase Section */}
      <section className="py-20 px-4 bg-secondary/30" id="technologies">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium inline-block mb-4">
              Our Tech Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Technologies We Master</h2>
            <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
              We use cutting-edge technologies to build modern, scalable, and high-performance web applications
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
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
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="relative p-6 rounded-2xl bg-background border backdrop-blur-sm hover:border-primary/30 transition-all group overflow-hidden"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${tech.color}, transparent 70%)` }}
                ></div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{tech.name}</h3>
                </div>
                
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${tech.color}, rgba(123, 97, 255, 0.5))` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: tech.level }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-primary font-medium">{tech.level}</span>
                  <motion.span 
                    className="text-xs text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {index % 2 === 0 ? "Expert" : "Advanced"}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
        {/* <section className="py-20 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
            >
          <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium inline-block mb-4">
            Interactive Development
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Experience Our Coding Environment</h2>
          <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
            Watch how we transform ideas into functional code with modern development practices
          </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Modern Development Workflow</h3>
            <p className="text-foreground/70 text-lg">
              We embrace the latest technologies and development practices to ensure efficient, scalable, and maintainable code. Our workflow includes:
            </p>
            <ul className="space-y-4">
              {[
            "Component-based architecture for reusability",
            "Version control with collaborative workflows",
            "Automated testing and continuous integration",
            "Responsive design principles and accessibility"
              ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <span>{item}</span>
            </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet-500/20 blur-3xl opacity-30 rounded-full"></div>
            <Terminal className="shadow-2xl" title="Web Development Demo">
              <TypingAnimation duration={30}>
                <AnimatedSpan className="text-green-400" delay={100}>$ </AnimatedSpan>
                <AnimatedSpan delay={150}>npm create next-app@latest my-project</AnimatedSpan>
                <AnimatedSpan delay={250}>{"\n\n"}</AnimatedSpan>
                <AnimatedSpan className="text-yellow-300" delay={350}>Creating a new Next.js app in ./my-project...</AnimatedSpan>
                <AnimatedSpan delay={450}>{"\n\n"}</AnimatedSpan>
                <AnimatedSpan className="text-blue-400" delay={550}>✓ </AnimatedSpan>
                <AnimatedSpan delay={600}>Would you like to use TypeScript? </AnimatedSpan>
                <AnimatedSpan className="text-green-400" delay={650}>Yes</AnimatedSpan>
                <AnimatedSpan delay={700}>{"\n"}</AnimatedSpan>
                <AnimatedSpan className="text-blue-400" delay={750}>✓ </AnimatedSpan>
                <AnimatedSpan delay={800}>Would you like to use ESLint? </AnimatedSpan>
                <AnimatedSpan className="text-green-400" delay={850}>Yes</AnimatedSpan>
                <AnimatedSpan delay={900}>{"\n"}</AnimatedSpan>
                <AnimatedSpan className="text-blue-400" delay={950}>✓ </AnimatedSpan>
                <AnimatedSpan delay={1000}>Would you like to use Tailwind CSS? </AnimatedSpan>
                <AnimatedSpan className="text-green-400" delay={1050}>Yes</AnimatedSpan>
                <AnimatedSpan delay={1100}>{"\n"}</AnimatedSpan>
                <AnimatedSpan className="text-blue-400" delay={1150}>✓ </AnimatedSpan>
                <AnimatedSpan delay={1200}>Would you like to use `src/` directory? </AnimatedSpan>
                <AnimatedSpan className="text-green-400" delay={1250}>Yes</AnimatedSpan>
                <AnimatedSpan delay={1300}>{"\n"}</AnimatedSpan>
                <AnimatedSpan className="text-blue-400" delay={1350}>✓ </AnimatedSpan>
                <AnimatedSpan delay={1400}>Would you like to use App Router? </AnimatedSpan>
                <AnimatedSpan className="text-green-400" delay={1450}>Yes</AnimatedSpan>
                <AnimatedSpan delay={1500}>{"\n\n"}</AnimatedSpan>
                <AnimatedSpan className="text-yellow-300" delay={1550}>Installing dependencies:</AnimatedSpan>
                <AnimatedSpan delay={1600}>{"\n"}</AnimatedSpan>
                <AnimatedSpan delay={1650}>- react</AnimatedSpan>
                <AnimatedSpan delay={1700}>{"\n"}</AnimatedSpan>
                <AnimatedSpan delay={1750}>- react-dom</AnimatedSpan>
                <AnimatedSpan delay={1800}>{"\n"}</AnimatedSpan>
                <AnimatedSpan delay={1850}>- next</AnimatedSpan>
                <AnimatedSpan delay={1900}>{"\n"}</AnimatedSpan>
                <AnimatedSpan delay={1950}>- typescript</AnimatedSpan>
                <AnimatedSpan delay={2000}>{"\n"}</AnimatedSpan>
                <AnimatedSpan delay={2050}>- @types/react</AnimatedSpan>
                <AnimatedSpan delay={2100}>{"\n"}</AnimatedSpan>
                <AnimatedSpan delay={2150}>- tailwindcss</AnimatedSpan>
                <AnimatedSpan delay={2200}>{"\n\n"}</AnimatedSpan>
                <AnimatedSpan className="text-green-400" delay={2250}>Success! </AnimatedSpan>
                <AnimatedSpan delay={2300}>Created a new project at ./my-project</AnimatedSpan>
                <AnimatedSpan delay={2350}>{"\n\n"}</AnimatedSpan>
                <AnimatedSpan className="text-green-400" delay={2400}>$ </AnimatedSpan>
                <AnimatedSpan delay={2450}>cd my-project && npm run dev</AnimatedSpan>
                <AnimatedSpan delay={2550}>{"\n\n"}</AnimatedSpan>
                <AnimatedSpan className="text-yellow-300" delay={2650}>ready</AnimatedSpan>
                <AnimatedSpan delay={2700}> - started server on 0.0.0.0:3000, url: http://localhost:3000</AnimatedSpan>
              </TypingAnimation>
            </Terminal>
          </motion.div>
            </div>
          </div>
        </section> */}

        {/* Code Showcase Section */}
   

      {/* Interactive Development Process Timeline */}
      <section className="py-20 px-4" id="process">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Our Development Process
          </motion.h2>
          
          <InteractiveProcessTimeline />
        </div>
      </section>

      {/* Design Showcase Section - Replacing Portfolio Section */}
      <section className="py-20 px-4" id="portfolio">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block"
            >
              <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-violet-500 opacity-75 blur" />
              <span className="relative text-primary font-medium px-4 py-2 rounded-lg bg-background">
                Our Creative Work
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mt-6"
            >
              Design Showcase
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-foreground/70 max-w-2xl mx-auto mt-4"
            >
              Explore our design work across various mediums and industries
            </motion.p>
          </div>

          <DesignShowcase />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16"
          >
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-8 py-4 rounded-full text-lg font-medium transition-colors group border border-primary/20"
            >
              View All Projects
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Testimonial Carousel */}
      <section className="py-20 px-4" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            What Our Clients Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto"
          >
            Hear from our satisfied clients about their experience working with us
          </motion.p>
          
          <div className="testimonial-carousel relative">
            <div className="overflow-hidden">
              <motion.div 
                className="flex gap-6"
                animate={{ x: [0, -1920, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[
                  {
                    name: "Sarah Johnson",
                    company: "Fashion Retailer",
                    role: "Marketing Director",
                    image: "https://www.servcorp.co.uk/media/34561/e-commerce-img.jpeg?format=webp&quality=70&width=688",
                    quote: "The team delivered a stunning e-commerce website that exceeded our expectations. Sales have increased by 40% since launch!"
                  },
                  {
                    name: "David Chen",
                    company: "FinTech Startup",
                    role: "CTO",
                    image: "https://randomuser.me/api/portraits/men/42.jpg",
                    quote: "Their development team built our web application from concept to launch in record time. The code quality is exceptional."
                  },
                  {
                    name: "Emily Rodriguez",
                    company: "Marketing Agency",
                    role: "CEO",
                    image: "https://randomuser.me/api/portraits/women/56.jpg",
                    quote: "We've partnered with them for all our client websites. Their attention to detail and responsive designs are unmatched."
                  },
                  {
                    name: "Michael Taylor",
                    company: "SaaS Company",
                    role: "Product Manager",
                    image: "https://randomuser.me/api/portraits/men/65.jpg",
                    quote: "The custom CMS they built has transformed how we manage content. Our team loves how intuitive and powerful it is."
                  },
                  {
                    name: "Jennifer Williams",
                    company: "E-learning Platform",
                    role: "Operations Director",
                    image: "https://randomuser.me/api/portraits/women/68.jpg",
                    quote: "Working with this team was a breeze! They understood our unique needs and delivered a platform that our students love using."
                  },
                  {
                    name: "Robert Garcia",
                    company: "Healthcare Provider",
                    role: "IT Director",
                    image: "https://randomuser.me/api/portraits/men/72.jpg",
                    quote: "Security was our top concern, and they delivered a website that not only looks great but meets all of our compliance requirements."
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="min-w-[350px] md:min-w-[400px] rounded-2xl p-1 group"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="bg-secondary p-8 rounded-2xl border border-primary/10 h-full relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:bg-primary/10 transition-colors duration-500"></div>
                      
                      <div className="mb-6 relative">
                        <svg className="h-8 w-8 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                        </svg>
                      </div>
                      
                      <p className="text-foreground/80 mb-6 relative z-10 leading-relaxed">{testimonial.quote}</p>
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
                          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-foreground/60">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
          </div>
          
          <div className="text-center mt-10">
            <a href="#contact" className="text-primary hover:underline inline-flex items-center gap-1">
              <span>Read more client success stories</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-20 px-4" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            What Our Clients Say
          </motion.h2>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Pricing Section */}
      {/* <section className="py-24 px-4" id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              Pricing Options
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mt-4 mb-6"
            >
              Transparent & Flexible Pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-foreground/70 max-w-3xl mx-auto"
            >
              Choose the package that best fits your business needs and budget
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "$2,499",
                description: "Perfect for small businesses getting started online",
                features: [
                  "5-page responsive website",
                  "Basic SEO setup",
                  "Contact form integration",
                  "Mobile-friendly design",
                  "Social media integration",
                  "3 months of support"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$4,999",
                description: "Ideal for growing businesses with specific needs",
                features: [
                  "10-page responsive website",
                  "Advanced SEO optimization",
                  "Content management system",
                  "Blog setup and integration",
                  "Email marketing integration",
                  "Custom contact forms",
                  "Performance optimization",
                  "6 months of support"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$9,999+",
                description: "Comprehensive solution for established businesses",
                features: [
                  "Unlimited pages",
                  "Custom web application features",
                  "E-commerce functionality",
                  "Advanced security features",
                  "API integrations",
                  "Custom database design",
                  "Performance optimization",
                  "User authentication system",
                  "12 months of priority support"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-3xl overflow-hidden border ${
                  plan.popular 
                    ? 'border-primary bg-primary/5 relative shadow-xl shadow-primary/10' 
                    : 'border-border bg-secondary'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {!plan.price.includes('+') && <span className="text-foreground/60 mb-1">one-time</span>}
                  </div>
                  <p className="text-foreground/70 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="#contact" 
                    className={`block text-center py-3 px-6 rounded-full font-medium transition-colors ${
                      plan.popular 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-background border border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-foreground/60">
              Need a custom solution? <a href="#contact" className="text-primary font-medium">Contact us</a> for a personalized quote.
            </p>
          </motion.div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-secondary/30" id="faq">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-foreground/70 max-w-3xl mx-auto"
            >
              Everything you need to know about our web development services
            </motion.p>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      {/* <section className="py-24 px-4" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:pr-12"
            >
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Get in Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Ready to Transform Your Web Presence?
              </h2>
              <p className="text-foreground/70 mb-8">
                Let's discuss how our web development services can help your business grow. 
                Fill out the form, and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-foreground/70">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-foreground/70">info@yourwebsite.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-foreground/70">123 Web Dev Street, San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                {['twitter', 'linkedin', 'github', 'dribbble'].map((platform, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors"
                  >
                    <span className="sr-only">{platform}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l3-4H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-secondary rounded-3xl p-8 border border-border"
            >
              <h3 className="text-2xl font-bold mb-6">Tell us about your project</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Project subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                    <span className="text-sm text-foreground/70">
                      I agree to the <a href="#" className="text-primary hover:underline">privacy policy</a>
                    </span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section> */}


      {/* Interactive Final CTA Section with Particles */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative p-12 md:p-16 rounded-3xl overflow-hidden"
          >
            {/* Animated background with gradient and particles */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-violet-500/20 to-primary/10"></div>
            <Meteors number={15} />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M200,0 Q400,0 500,200 Q400,400 200,400 Q0,400 100,200 Q0,0 200,0 Z" fill="url(#grad1)" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7b61ff" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium mb-6">
                  Let's Build Something Amazing
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Ready to Start Your Web Project?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Let's collaborate to create a website that elevates your brand, engages your audience, and drives business growth.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.a 
                  href="#contact" 
                  className="relative bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center gap-2">
                    Start Your Project
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </motion.a>
                
                <motion.a 
                  href="tel:+1234567890" 
                  className="relative px-8 py-4 rounded-full text-lg font-semibold overflow-hidden group bg-background border border-primary/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center gap-2">
                    Schedule a Call
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

     
    </div>
  );
}

// Interactive Process Timeline Component
const InteractiveProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const timelineRef = useRef(null);
  
  const processSteps = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "We start by understanding your business, goals, target audience, and project requirements through consultations and research.",
      icon: <Users className="w-6 h-6" />,
      color: "#2563EB", // Blue
      benefits: [
        "Business objectives analysis",
        "Target audience research",
        "Competitive landscape review",
        "Project scope definition"
      ]
    },
    {
      step: 2,
      title: "Design & Prototyping",
      description: "Our designers create wireframes, mockups and interactive prototypes that align with your brand and optimize for user experience.",
      icon: <Palette className="w-6 h-6" />,
      color: "#10B981", // Green
      benefits: [
        "Wireframing & UI mockups",
        "User experience design",
        "Responsive layout planning",
        "Interactive prototypes"
      ]
    },
    {
      step: 3,
      title: "Development",
      description: "Our expert developers build your website or application using clean, efficient code and modern technologies for optimal performance.",
      icon: <Code className="w-6 h-6" />,
      color: "#06B6D4", // Cyan
      benefits: [
        "Frontend development",
        "Backend implementation",
        "Database integration",
        "API development"
      ]
    },
    {
      step: 4,
      title: "Testing & QA",
      description: "Rigorous testing ensures your website works flawlessly across all devices, browsers, and user scenarios.",
      icon: <Shield className="w-6 h-6" />,
      color: "#F97316", // Orange
      benefits: [
        "Functionality testing",
        "Cross-browser compatibility",
        "Mobile responsiveness",
        "Performance optimization"
      ]
    },
    {
      step: 5,
      title: "Launch & Support",
      description: "We deploy your site and provide continuous support and maintenance to keep everything running smoothly after launch.",
      icon: <Rocket className="w-6 h-6" />,
      color: "#FBBF24", // Yellow
      benefits: [
        "Deployment preparation",
        "Server configuration",
        "Analytics setup",
        "Post-launch monitoring"
      ]
    }
  ];
  
  // Handle scroll-based timeline navigation
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || isScrolling) return;
      
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const timelinePosition = timelineRect.top;
      const timelineHeight = timelineRect.height;
      
      // Only activate scroll detection when timeline is in view
      if (timelinePosition < viewportCenter && timelinePosition + timelineHeight > 0) {
        // Calculate which step should be active based on scroll position
        const scrollProgress = (viewportCenter - timelinePosition) / timelineHeight;
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        const stepIndex = Math.ceil(clampedProgress * processSteps.length);
        
        if (stepIndex !== activeStep && stepIndex >= 1 && stepIndex <= processSteps.length) {
          setActiveStep(stepIndex);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStep, isScrolling, processSteps.length]);
  
  const handleStepClick = (step) => {
    setIsScrolling(true);
    setActiveStep(step);
    
    // Reset isScrolling after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };
  
  return (
    <div className="relative max-w-6xl mx-auto" ref={timelineRef}>
      {/* Timeline line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-secondary/20 transform -translate-x-1/2"></div>
      
      {/* Progress line animating based on active step */}
      <div 
        className="absolute top-0 left-1/2 w-0.5 bg-primary transform -translate-x-1/2 transition-all duration-1000 ease-out"
        style={{ 
          height: `${(activeStep / processSteps.length) * 100}%`,
          maxHeight: '100%'
        }}
      ></div>
      
      {/* Timeline steps */}
      {processSteps.map((process, index) => {
        const isActive = activeStep >= process.step;
        const isPast = activeStep > process.step;
        const isExactlyActive = activeStep === process.step;
        
        return (
          <div key={index} className="relative mb-20 last:mb-0">
            {/* Timeline marker */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <div 
                className={`
                  h-14 w-14 rounded-full flex items-center justify-center z-10 
                  ${isActive 
                    ? 'bg-primary text-white border-4 border-white shadow-lg shadow-primary/30' 
                    : 'bg-white border-4 border-secondary/20 text-secondary/40'
                  }
                  transition-all duration-500
                `}
                style={{
                  transform: isExactlyActive ? 'scale(1.2)' : 'scale(1)'
                }}
              >
                <span className="text-lg font-bold">{process.step}</span>
              </div>
              
              {/* Pulsing effect for active step */}
              {isExactlyActive && (
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75"></div>
                  <div className="absolute inset-[-8px] rounded-full border-2 border-primary/30"></div>
                </div>
              )}
            </div>
            
            {/* Content card with alternating layout */}
            <div className={`relative max-w-lg mx-auto md:mx-0 ${
              index % 2 === 0 
                ? 'md:ml-auto md:mr-[calc(50%+2rem)]' 
                : 'md:mr-auto md:ml-[calc(50%+2rem)]'
            }`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`
                  rounded-xl p-6 border shadow-lg transform transition-all duration-500 cursor-pointer
                  ${isActive 
                    ? 'bg-background border-primary/20 shadow-primary/5' 
                    : 'bg-secondary/5 border-secondary/20'
                  }
                  hover:shadow-xl
                `}
                onClick={() => handleStepClick(process.step)}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className={`p-3 rounded-lg ${
                      isActive 
                        ? 'text-white' 
                        : 'text-secondary/60 bg-secondary/10'
                    } transition-colors duration-500`}
                    style={{ 
                      backgroundColor: isActive ? process.color : undefined 
                    }}
                  >
                    {process.icon}
                  </div>
                  
                  <div>
                    <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${
                      isActive ? 'text-foreground' : 'text-foreground/60'
                    }`}>
                      {process.title}
                    </h3>
                    <p className="text-foreground/70 mb-4">{process.description}</p>
                    
                    {/* Benefits list with reveal animation */}
                    <AnimatePresence>
                      {isExactlyActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-secondary/10"
                        >
                          <h4 className="font-medium mb-2 text-sm uppercase tracking-wider text-foreground/60">Key Benefits</h4>
                          <ul className="space-y-2">
                            {process.benefits.map((benefit, idx) => (
                              <motion.li 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                                <span>{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}
      
      {/* Navigation controls for mobile */}
      <div className="mt-12 flex justify-center gap-2 md:hidden">
        {processSteps.map((step, index) => (
          <button 
            key={index}
            onClick={() => handleStepClick(step.step)}
            className={`w-3 h-3 rounded-full transition-colors ${
              activeStep === step.step 
                ? 'bg-primary' 
                : 'bg-secondary/30'
            }`}
            aria-label={`Go to step ${step.step}: ${step.title}`}
          />
        ))}
      </div>
    </div>
  );
};

// Design Showcase Component
const DesignShowcase = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [selectedDesign, setSelectedDesign] = useState(null);

  // Design categories data
  const designCategories = {
    web: {
      title: "Web Design",
      description: "Responsive websites with intuitive user interfaces that engage visitors and drive conversions."
    },
    mobile: {
      title: "Mobile UI",
      description: "User-centered mobile app interfaces designed for seamless navigation and excellent user experience."
    },
    brand: {
      title: "Branding",
      description: "Strategic brand identities that communicate your values and connect with your target audience."
    }
  };

  // Sample design data
  const designs = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      image: "https://www.servcorp.co.uk/media/34561/e-commerce-img.jpeg?format=webp&quality=70&width=688",
      description: "A modern e-commerce platform designed for optimal user experience and high conversion rates.",
      client: "Fashion Retailer",
      technologies: ["Figma", "Adobe XD", "Webflow"],
      features: [
        "Intuitive product filtering",
        "Streamlined checkout process",
        "Responsive mobile design"
      ]
    },
    {
      id: 2,
      title: "Financial Dashboard",
      category: "web",
      image: "https://www.servcorp.co.uk/media/34561/e-commerce-img.jpeg?format=webp&quality=70&width=688", 
      description: "Comprehensive financial dashboard with interactive data visualization and reporting tools.",
      client: "FinTech Startup",
      technologies: ["Figma", "Adobe Illustrator", "React"],
      features: [
        "Real-time data visualization",
        "Customizable widgets",
        "Accessibility compliance"
      ]
    },
    {
      id: 3,
      title: "Healthcare Application",
      category: "web",
      image: "https://www.servcorp.co.uk/media/34561/e-commerce-img.jpeg?format=webp&quality=70&width=688",
      description: "Patient-centered healthcare app designed to improve communication between patients and providers.",
      client: "Healthcare Provider",
      technologies: ["Sketch", "Principle", "Swift UI"],
      features: [
        "Appointment scheduling",
        "Secure messaging",
        "Medication reminders"
      ]
    },
    {
      id: 4,
      title: "Fitness Tracking App",
      category: "mobile",
      image: "/projects/real-estate.jpg",
      description: "Intuitive fitness tracker that helps users monitor workouts and achieve their fitness goals.",
      client: "Wellness Company",
      technologies: ["Figma", "After Effects", "Kotlin"],
      features: [
        "Progress visualization",
        "Workout planning",
        "Social sharing"
      ]
    },
    {
      id: 5,
      title: "Creative Agency Rebrand",
      category: "brand",
      image: "/projects/ecommerce.jpg",
      description: "Complete brand refresh for a creative agency, including logo, color palette, and style guide.",
      client: "Design Studio",
      technologies: ["Illustrator", "Photoshop", "InDesign"],
      features: [
        "Logo design",
        "Brand guidelines",
        "Marketing materials"
      ]
    },
    {
      id: 6,
      title: "Sustainable Product Branding",
      category: "brand",
      image: "/projects/ai-platform.jpg",
      description: "Eco-friendly brand identity for a sustainable product line, emphasizing environmental responsibility.",
      client: "Consumer Goods Company",
      technologies: ["Illustrator", "Photoshop", "Procreate"],
      features: [
        "Sustainable packaging",
        "Eco-friendly messaging",
        "Visual identity system"
      ]
    }
  ];

  // Filter designs based on active tab
  const currentDesigns = designs.filter(design => design.category === activeTab);

  // Design card component
  const DesignCard = ({ design }) => {
    return (
      <motion.div
        layoutId={`card-container-${design.id}`}
        whileHover={{ y: -5 }}
        className="rounded-xl overflow-hidden border border-secondary/20 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
        onClick={() => setSelectedDesign(design)}
      >
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={design.image} 
            alt={design.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div>
              <h3 className="text-white text-xl font-bold">{design.title}</h3>
              <p className="text-white/80 mt-2">{design.client}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{design.title}</h3>
          <p className="text-foreground/70 text-sm line-clamp-2">{design.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {design.technologies.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="px-2 py-1 bg-secondary/20 rounded-md text-xs text-foreground/60">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Design detail modal component
  const DesignDetailModal = ({ design, onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          layoutId={`card-container-${design.id}`}
          className="bg-background rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative aspect-video">
            <img 
              src={design.image} 
              alt={design.title} 
              className="w-full h-full object-cover" 
            />
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <div className="p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2">{design.title}</h2>
            <p className="text-primary font-medium mb-6">{design.client}</p>
            
            <p className="text-foreground/70 mb-8">{design.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {design.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-secondary/20 rounded-lg text-sm text-foreground/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {design.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground/70">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div>
      {/* Category tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-secondary/10 p-1 rounded-xl">
          {Object.entries(designCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === key
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-foreground/70 hover:text-foreground hover:bg-secondary/5'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
      
      {/* Description of current category */}
      <div className="text-center mb-12">
        <p className="text-lg text-foreground/70 max-w-xl mx-auto">
          {designCategories[activeTab]?.description}
        </p>
      </div>
      
      {/* Design grid with exit animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Design detail modal */}
      <AnimatePresence>
        {selectedDesign && (
          <DesignDetailModal 
            design={selectedDesign} 
            onClose={() => setSelectedDesign(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebDevelopmentServices;