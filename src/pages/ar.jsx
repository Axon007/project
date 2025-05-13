import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Headset, 
  Glasses, 
  Building2, // Changed from Buildings2 to Building2
  GraduationCap, 
  PieChart, 
  Gamepad2, 
  Heart, 
  ChevronRight, 
  CheckCircle, 
  Award,
  Users,
  Code,
  Activity
  
} from 'lucide-react';

function ARVRServices() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with 3D effect */}
      <section className="relative overflow-hidden pt-24 pb-32">
        {/* 3D Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10"></div>
        
        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                Immersive Technologies
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
            >
              Transform Reality with AR & VR Solutions
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-foreground/70 mb-12 max-w-3xl mx-auto"
            >
              We create immersive experiences that blend digital and physical worlds, 
              empowering businesses to innovate and engage like never before.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Schedule a Demo
              </button>
              <button className="px-8 py-4 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 group">
                View Our Work
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
          
          {/* 3D Device Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative max-w-5xl mx-auto perspective-1000"
          >
            <div className="relative">
              {/* VR Headset Main Visual */}
              <div className="bg-gradient-to-br from-background via-background to-background/50 p-4 rounded-2xl border border-white/10 shadow-xl transform rotate-x-12 transition-transform mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="VR Experience" 
                  className="w-full h-auto object-cover rounded-xl shadow-lg"
                />
                
                {/* Floating AR elements */}
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-lg transform -rotate-6">
                  <img 
                    src="https://images.unsplash.com/photo-1626379953822-baec19ab0b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
                    alt="AR Experience" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="absolute -bottom-10 -left-10 w-48 h-36 bg-gradient-to-br from-primary/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-lg transform rotate-3">
                  <img 
                    src="https://images.unsplash.com/photo-1635365349638-c79a0569c814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
                    alt="AR Overlay" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Client Logos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-foreground/60 font-medium">Trusted by innovation leaders</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-32 bg-foreground/10 rounded-lg filter grayscale hover:grayscale-0 transition-all"></div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-24" id="services">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Comprehensive AR/VR Solutions
            </h2>
            <p className="text-lg text-foreground/70">
              We offer end-to-end immersive technology services, from concept to deployment, to help you harness the full potential of augmented and virtual reality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Headset className="w-6 h-6" />,
                title: "VR Development",
                description: "Create fully immersive virtual environments for training, entertainment, and visualization.",
                features: [
                  "Interactive VR Applications",
                  "360° Video Experiences",
                  "Spatial Audio Design",
                  "Cross-Platform Development"
                ],
                color: "from-blue-500 to-primary"
              },
              {
                icon: <Glasses className="w-6 h-6" />,
                title: "AR Solutions",
                description: "Overlay digital content onto the real world with intuitive augmented reality applications.",
                features: [
                  "Mobile AR Apps",
                  "WebAR Implementation",
                  "AR Product Visualization",
                  "Location-Based AR"
                ],
                color: "from-primary to-purple-500"
              },
              {
                icon: <Building2 className="w-6 h-6" />,
                title: "Enterprise Solutions",
                description: "Transform business processes with custom AR/VR solutions that solve real-world challenges.",
                features: [
                  "Remote Assistance",
                  "Virtual Collaboration",
                  "Digital Twins",
                  "Data Visualization"
                ],
                color: "from-purple-500 to-blue-500"
              },
              {
                icon: <GraduationCap className="w-6 h-6" />,
                title: "Training & Simulation",
                description: "Develop immersive training environments that enhance learning and retention.",
                features: [
                  "Safety Training",
                  "Medical Simulation",
                  "Skills Assessment",
                  "Procedural Training"
                ],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Gamepad2 className="w-6 h-6" />,
                title: "Interactive Experiences",
                description: "Design engaging games and interactive experiences for entertainment and marketing.",
                features: [
                  "VR/AR Games",
                  "Interactive Storytelling",
                  "Brand Experiences",
                  "Gamified Learning"
                ],
                color: "from-violet-500 to-fuchsia-500"
              },
              {
                icon: <PieChart className="w-6 h-6" />,
                title: "Consulting & Strategy",
                description: "Expert guidance on implementing AR/VR technologies to achieve your business goals.",
                features: [
                  "Technology Assessment",
                  "ROI Analysis",
                  "Implementation Planning",
                  "Competitive Analysis"
                ],
                color: "from-emerald-500 to-blue-500"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`h-1 w-full bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How We Work Section */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              Our Process
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              How We Bring Your Vision to Life
            </h2>
            <p className="text-lg text-foreground/70">
              Our proven development methodology ensures high-quality AR/VR solutions that achieve your business objectives.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-purple-500 to-blue-500 rounded-full"></div>
            
            {[
              {
                title: "Discovery & Strategy",
                description: "We analyze your needs, define objectives, and create a strategic roadmap for your AR/VR project.",
                icon: <Code className="w-6 h-6" />
              },
              {
                title: "Design & Prototyping",
                description: "Our designers create the user experience and visual elements, then develop interactive prototypes.",
                icon: <Activity className="w-6 h-6" />
              },
              {
                title: "Development & Testing",
                description: "Our development team builds your solution using the latest AR/VR technologies and conducts rigorous testing.",
                icon: <Users className="w-6 h-6" />
              },
              {
                title: "Deployment & Support",
                description: "We ensure smooth deployment and provide ongoing support and updates for your AR/VR solution.",
                icon: <Award className="w-6 h-6" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex mb-12 relative ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white shadow-lg z-10">
                  {step.icon}
                </div>
                <div className="w-1/2 bg-card rounded-xl p-6 shadow-md border border-border">
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technology Capabilities Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                Technology Stack
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Cutting-Edge AR/VR Technologies
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                We leverage the latest immersive technologies and platforms to deliver exceptional AR/VR experiences for any device or platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "Development Frameworks",
                    items: ["Unity 3D", "Unreal Engine", "ARKit", "ARCore", "WebXR"]
                  },
                  {
                    title: "Hardware Support",
                    items: ["Meta Quest", "HTC Vive", "Microsoft HoloLens", "Magic Leap", "Mobile AR"]
                  },
                  {
                    title: "3D Technologies",
                    items: ["Photogrammetry", "3D Modeling", "Motion Capture", "Spatial Mapping"]
                  },
                  {
                    title: "Integration Capabilities",
                    items: ["IoT Connectivity", "AI Integration", "Cloud Services", "Analytics Tools"]
                  }
                ].map((category, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-foreground/70">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <button className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                Explore Our Technical Capabilities
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Visual Tech Stack */}
            <div className="relative">
              <div className="relative h-[500px] perspective-1000">
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    {/* Main cube */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 transform-style-3d">
                      {/* Cube faces */}
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div 
                          key={index} 
                          className={`absolute w-60 h-60 bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center transform ${
                            index === 0 ? 'rotateY(0deg) translateZ(120px)' :
                            index === 1 ? 'rotateY(180deg) translateZ(120px)' :
                            index === 2 ? 'rotateY(90deg) translateZ(120px)' :
                            index === 3 ? 'rotateY(-90deg) translateZ(120px)' :
                            index === 4 ? 'rotateX(90deg) translateZ(120px)' :
                            'rotateX(-90deg) translateZ(120px)'
                          }`}
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white">
                            {index === 0 && <Headset className="w-8 h-8" />}
                            {index === 1 && <Glasses className="w-8 h-8" />}
                            {index === 2 && <Building2 className="w-8 h-8" />} {/* Changed from Buildings2 */}
                            {index === 3 && <GraduationCap className="w-8 h-8" />}
                            {index === 4 && <PieChart className="w-8 h-8" />}
                            {index === 5 && <Gamepad2 className="w-8 h-8" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Orbiting spheres */}
                    {Array.from({ length: 8 }).map((_, index) => {
                      const angle = (index / 8) * Math.PI * 2;
                      const radius = 240;
                      const x = Math.cos(angle) * radius;
                      const z = Math.sin(angle) * radius;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: index * 0.2 }}
                          className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-purple-500/80 shadow-lg flex items-center justify-center text-white text-xs"
                          style={{
                            transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px)`,
                          }}
                        >
                          {["AR", "VR", "3D", "AI", "XR", "MR", "IoT", "ML"][index]}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
                
                {/* Static overlays and floating elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1478399305562-fbc9c0adb0e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                    alt="VR Technology" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-primary/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                    alt="AR Technology" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              Case Studies
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Transforming Industries with AR & VR
            </h2>
            <p className="text-lg text-foreground/70">
              Explore how our clients are using immersive technologies to solve complex problems and create new opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Industrial Training Simulation",
                category: "Manufacturing",
                image: "https://images.unsplash.com/photo-1620634415912-42df9406dc47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Reduced training time by 65% and improved safety with immersive VR training for factory workers."
              },
              {
                title: "Retail AR Shopping Experience",
                category: "E-commerce",
                image: "https://images.unsplash.com/photo-1633543585375-b83979f7e861?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Increased conversions by 32% with an AR app that lets customers visualize products in their home."
              },
              {
                title: "Medical Training Platform",
                category: "Healthcare",
                image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Revolutionized medical education with VR simulations that improve procedural skills and confidence."
              },
            ].map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-2xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <span className="p-4 text-sm font-medium text-white">{study.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{study.title}</h3>
                  <p className="text-foreground/70 mb-4">{study.description}</p>
                  <button className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    Read Case Study 
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="px-6 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors">
              View All Case Studies
            </button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              Client Success
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              What Our Clients Say
            </h2>
            <p className="text-lg text-foreground/70">
              Hear from organizations that have transformed their business with our AR/VR solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The VR training application has completely transformed how we onboard new employees. Training time cut by half with better results.",
                author: "Sarah Johnson",
                position: "HR Director, Manufacturing Inc.",
                rating: 5
              },
              {
                quote: "The AR product visualization tool has revolutionized our customer experience. Our customers can now see exactly how our products fit in their space.",
                author: "Michael Chen",
                position: "CMO, Furniture Designs",
                rating: 5
              },
              {
                quote: "Working with this team was seamless. They understood our complex requirements and delivered a VR solution that exceeded our expectations.",
                author: "Dr. Emily Rodriguez",
                position: "Medical Director, Healthcare Systems",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 border border-border shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-6 flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Heart key={i} className="w-5 h-5 text-red-500 fill-red-500" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-6 text-lg italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-foreground/60">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-10 shadow-xl border border-border relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full filter blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Ready to Transform Your Business with AR & VR?
                </h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                  Let's discuss how our immersive technology solutions can help you innovate, engage, and grow.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl bg-secondary/30 p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                  </div>
                  <h3 className="font-semibold mb-2">Request a Demo</h3>
                  <p className="text-sm text-foreground/70 mb-4">See our AR/VR solutions in action with a personalized demo.</p>
                  <button className="text-blue-500 text-sm font-medium flex items-center gap-2 mx-auto">
                    Book a Demo
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="rounded-xl bg-primary/10 p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.96.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h3.8a2 2 0 0 0 1.4-.6L12 4.6a2 2 0 0 1 1.4-.6h3.8a2 2 0 0 1 2 2v2.4Z"></path><polyline points="12 10 12 16"></polyline><line x1="9" y1="13" x2="15" y2="13"></line></svg>
                  </div>
                  <h3 className="font-semibold mb-2">Consultation</h3>
                  <p className="text-sm text-foreground/70 mb-4">Schedule a free consultation with our AR/VR experts.</p>
                  <button className="text-primary text-sm font-medium flex items-center gap-2 mx-auto">
                    Get Started
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="rounded-xl bg-secondary/30 p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
                  </div>
                  <h3 className="font-semibold mb-2">Case Studies</h3>
                  <p className="text-sm text-foreground/70 mb-4">Download our detailed case studies and industry reports.</p>
                  <button className="text-purple-500 text-sm font-medium flex items-center gap-2 mx-auto">
                    Download Now
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-center">
                <button className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 w-full md:w-auto">
                  Contact Us Today
                </button>
                <button className="px-8 py-4 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-secondary/30 transition-colors flex items-center justify-center gap-2 w-full md:w-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              FAQs
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Common Questions
            </h2>
            <p className="text-lg text-foreground/70">
              Everything you need to know about our AR/VR services and solutions.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-border">
            {[
              {
                question: "What hardware is required for AR/VR experiences?",
                answer: "For VR, we support various headsets like Meta Quest, HTC Vive, and Valve Index. For AR, most modern smartphones and tablets are compatible, as well as specialized hardware like HoloLens or Magic Leap. We'll help you determine the best hardware for your specific needs and budget."
              },
              {
                question: "How long does it take to develop an AR/VR application?",
                answer: "Development timeframes vary depending on complexity, from 4-8 weeks for a simple AR app to 3-6 months for comprehensive VR experiences. During consultation, we'll provide a detailed timeline based on your specific requirements and goals."
              },
              {
                question: "What industries benefit most from AR/VR technologies?",
                answer: "AR/VR technologies are transforming numerous industries including healthcare, manufacturing, education, retail, real estate, entertainment, and automotive. Any sector that benefits from visualization, training, or enhanced customer experiences can leverage immersive technologies."
              },
              {
                question: "How do you measure the success of an AR/VR project?",
                answer: "We establish clear KPIs at the beginning of each project, which may include user engagement metrics, training effectiveness, conversion rates, or other business-specific outcomes. We provide detailed analytics and reporting to track these metrics throughout the project lifecycle."
              },
              {
                question: "Do you offer ongoing support and maintenance?",
                answer: "Yes, we provide comprehensive post-launch support options including technical maintenance, content updates, performance optimization, and user analytics. We offer flexible support packages tailored to your specific needs."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="py-6"
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-semibold cursor-pointer list-none">
                    <span className="text-lg">{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </summary>
                  <p className="text-foreground/70 mt-4 group-open:animate-fadeIn">
                    {faq.answer}
                  </p>
                </details>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-foreground/70 mb-4">Have more questions?</p>
            <button className="px-6 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
              Contact Our Support Team
            </button>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Stay Updated on AR/VR Innovations</h2>
            <p className="text-foreground/70 mb-8">Subscribe to our newsletter for the latest industry trends, technology updates, and exclusive insights.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-6 py-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
            <p className="text-sm text-foreground/60 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ARVRServices;