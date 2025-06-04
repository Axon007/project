import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { 
  Camera, 
  Eye, 
  Brain, 
  Bot, 
  CloudCog, 
  LineChart, 
  Shield, 
  ChevronRight, 
  CheckCircle, 
  Zap,
  Cpu,
  Database,
  GanttChart,
  Globe,
  Sparkles
} from 'lucide-react';

function ComputerVision() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with 3D model */}
      <section className="relative overflow-hidden pt-24 pb-32">
        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-emerald-500/30 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side: Text content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500">
                  Intelligent Vision Systems
                </span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500"
              >
                Advanced Computer Vision Solutions
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-foreground/70 mb-8"
              >
                Transforming visual data into intelligent insights through AI-powered computer 
                vision technology for businesses across industries.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="px-8 py-4 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-500/90 transition-colors shadow-lg shadow-blue-500/20">
                  Request Consultation
                </button>
                <button className="px-8 py-4 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 group">
                  Explore Solutions
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
            
            {/* Right side: Spline 3D Model */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex-1 h-[500px] w-full rounded-2xl overflow-hidden shadow-xl"
            >
              <Spline scene="https://prod.spline.design/yXbDMCRxTkeTqAjT/scene.splinecode" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500 mb-6">
              Key Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
              Empower Your Business with Intelligent Vision
            </h2>
            <p className="text-lg text-foreground/70">
              Our computer vision solutions transform how businesses interact with visual data, enabling automation, insights, and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Eye className="w-6 h-6" />,
                title: "Object Recognition",
                description: "Identify and classify objects in images and video with remarkable accuracy and speed.",
                features: ["Product identification", "Defect detection", "Inventory management", "Visual search"],
                color: "from-blue-500 to-cyan-400"
              },
              {
                icon: <Camera className="w-6 h-6" />,
                title: "Image Analysis",
                description: "Extract valuable insights from images with advanced AI-powered analytics.",
                features: ["Scene understanding", "Content moderation", "Visual pattern detection", "Image classification"],
                color: "from-cyan-400 to-teal-500"
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: "Machine Learning",
                description: "Custom vision models that continuously improve through machine learning.",
                features: ["Transfer learning", "Custom model training", "Neural networks", "Model optimization"],
                color: "from-teal-500 to-emerald-500"
              },
              {
                icon: <Bot className="w-6 h-6" />,
                title: "Automation",
                description: "Streamline processes and reduce manual effort with vision-based automation.",
                features: ["Process automation", "Quality control", "Robotic vision", "Workflow optimization"],
                color: "from-emerald-500 to-green-500"
              },
              {
                icon: <CloudCog className="w-6 h-6" />,
                title: "Cloud Processing",
                description: "Scalable cloud-based vision services that grow with your business needs.",
                features: ["Edge computing", "Real-time processing", "Distributed systems", "Flexible deployment"],
                color: "from-green-500 to-blue-500"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Security & Surveillance",
                description: "Enhance security with intelligent video analysis and monitoring systems.",
                features: ["Anomaly detection", "Facial recognition", "Activity monitoring", "Real-time alerts"],
                color: "from-blue-500 to-indigo-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-foreground/70 mb-6">{feature.description}</p>
                  <div className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`h-1 w-full bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technology Stack */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500 mb-6">
                Technology Stack
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
                Cutting-Edge Vision Technologies
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Our solutions are built on advanced frameworks and platforms, delivering exceptional performance, accuracy, and scalability.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "AI Frameworks",
                    items: ["TensorFlow", "PyTorch", "OpenCV", "YOLO", "Keras"]
                  },
                  {
                    title: "Cloud Infrastructure",
                    items: ["AWS Rekognition", "Google Vision AI", "Azure Computer Vision", "Edge Computing"]
                  },
                  {
                    title: "Hardware Integration",
                    items: ["Camera Systems", "IoT Devices", "Edge Processors", "NVIDIA GPUs"]
                  },
                  {
                    title: "Data Processing",
                    items: ["Real-time Analytics", "Big Data Pipeline", "Stream Processing", "Custom Algorithms"]
                  }
                ].map((category, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-foreground/70">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <button className="px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-500/90 transition-colors flex items-center gap-2">
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
                          className={`absolute w-60 h-60 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center transform ${
                            index === 0 ? 'rotateY(0deg) translateZ(120px)' :
                            index === 1 ? 'rotateY(180deg) translateZ(120px)' :
                            index === 2 ? 'rotateY(90deg) translateZ(120px)' :
                            index === 3 ? 'rotateY(-90deg) translateZ(120px)' :
                            index === 4 ? 'rotateX(90deg) translateZ(120px)' :
                            'rotateX(-90deg) translateZ(120px)'
                          }`}
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white">
                            {index === 0 && <Camera className="w-8 h-8" />}
                            {index === 1 && <Eye className="w-8 h-8" />}
                            {index === 2 && <Brain className="w-8 h-8" />} 
                            {index === 3 && <Bot className="w-8 h-8" />}
                            {index === 4 && <CloudCog className="w-8 h-8" />}
                            {index === 5 && <Shield className="w-8 h-8" />}
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
                          className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/80 to-emerald-500/80 shadow-lg flex items-center justify-center text-white text-xs"
                          style={{
                            transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px)`,
                          }}
                        >
                          {["AI", "ML", "CV", "CNN", "IoT", "GPU", "API", "3D"][index]}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500 mb-6">
              Industry Solutions
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
              Computer Vision Applications
            </h2>
            <p className="text-lg text-foreground/70">
              Discover how our computer vision solutions solve complex challenges across diverse industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Manufacturing Quality Control",
                industry: "Manufacturing",
                image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Automate defect detection and quality assurance with real-time vision analysis systems."
              },
              {
                title: "Retail Analytics",
                industry: "Retail",
                image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Optimize store layouts and understand customer behavior with advanced visual analytics."
              },
              {
                title: "Medical Imaging",
                industry: "Healthcare",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Enhance diagnostic accuracy with AI-powered medical image analysis and detection."
              },
              {
                title: "Smart Agriculture",
                industry: "Agriculture",
                image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Monitor crop health and optimize farming with drone-based vision systems."
              },
              {
                title: "Autonomous Systems",
                industry: "Transportation",
                image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Power self-driving vehicles and robotics with real-time object detection and mapping."
              },
              {
                title: "Security Systems",
                industry: "Security",
                image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Enhance surveillance with facial recognition and intelligent threat detection systems."
              },
            ].map((useCase, index) => (
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
                    src={useCase.image} 
                    alt={useCase.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <span className="p-4 text-sm font-medium text-white">{useCase.industry}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">{useCase.title}</h3>
                  <p className="text-foreground/70 mb-4">{useCase.description}</p>
                  <button className="flex items-center gap-2 text-blue-500 font-medium group-hover:gap-3 transition-all">
                    Learn More 
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How We Work */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500 mb-6">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
              Delivering Vision Intelligence
            </h2>
            <p className="text-lg text-foreground/70">
              Our comprehensive process ensures we deliver tailored, effective computer vision solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Cpu className="w-6 h-6" />,
                title: "Needs Analysis",
                description: "We begin by understanding your specific challenges and defining clear objectives for your vision system."
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: "Solution Design",
                description: "Our experts design a custom vision solution architecture tailored to your unique requirements."
              },
              {
                icon: <Database className="w-6 h-6" />,
                title: "Development & Training",
                description: "We develop and train models with your data, ensuring high accuracy and performance."
              },
              {
                icon: <GanttChart className="w-6 h-6" />,
                title: "Deployment & Support",
                description: "We implement your solution and provide ongoing optimization and technical support."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow relative"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Statistics */}
      <section className="py-16 bg-blue-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                value: "99.8%",
                label: "Recognition Accuracy",
                icon: <Eye className="w-6 h-6" />
              },
              {
                value: "200+",
                label: "Successful Deployments",
                icon: <Zap className="w-6 h-6" />
              },
              {
                value: "60%",
                label: "Cost Reduction",
                icon: <LineChart className="w-6 h-6" />
              },
              {
                value: "24/7",
                label: "Real-time Processing",
                icon: <Globe className="w-6 h-6" />
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-10 shadow-xl border border-border relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full filter blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
                  Ready to Transform Your Business with Computer Vision?
                </h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                  Contact us today to discuss how our AI-powered vision solutions can help your organization innovate and grow.
                </p>
              </div>
              
              <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-center">
                <button className="px-8 py-4 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-500/90 transition-colors shadow-lg shadow-blue-500/20 w-full md:w-auto">
                  Schedule a Demo
                </button>
                <button className="px-8 py-4 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-secondary/30 transition-colors flex items-center justify-center gap-2 w-full md:w-auto">
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ComputerVision; 