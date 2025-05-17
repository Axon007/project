import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { 
  Camera, 
  Code, 
  Scan,
  Eye, 
  FileCode, 
  Cpu, 
  BrainCircuit, 
  Database, 
  ChevronRight, 
  CheckCircle, 
  Activity,
  ArrowRight,
  Image,
  Video,
  ScanSearch,
  PieChart
} from 'lucide-react';

// AnimatedBeam component from Magic UI
export const AnimatedBeam = ({ 
  className, 
  containerRef, 
  fromRef, 
  toRef, 
  curvature = 0, 
  reverse = false,
  duration = Math.random() * 3 + 4, 
  delay = 0, 
  pathColor = "gray", 
  pathWidth = 2, 
  pathOpacity = 0.2, 
  gradientStartColor = "#ffaa40", 
  gradientStopColor = "#9c40ff", 
  startXOffset = 0, 
  startYOffset = 0, 
  endXOffset = 0, 
  endYOffset = 0,
}) => {
  const id = React.useId();
  const [pathD, setPathD] = React.useState("");
  const [svgDimensions, setSvgDimensions] = React.useState({ width: 0, height: 0 });

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse 
    ? { 
        x1: ["90%", "-10%"], 
        x2: ["100%", "0%"], 
        y1: ["0%", "0%"], 
        y2: ["0%", "0%"]
      }
    : { 
        x1: ["10%", "110%"], 
        x2: ["0%", "100%"], 
        y1: ["0%", "0%"], 
        y2: ["0%", "0%"]
      };

  React.useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      // For all entries, recalculate the path
      for (let entry of entries) {
        updatePath();
      }
    });

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Call the updatePath initially to set the initial path
    updatePath();

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute left-0 top-0 transform-gpu stroke-2"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

// BorderBeam component from Magic UI
export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  reverse = false,
  initialOffset = 0,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className="absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
        }}
      />
    </div>
  );
};

// AI Vision Network component with animated beams
function AIVisionNetwork() {
  const containerRef = useRef(null);
  const centerNodeRef = useRef(null);
  const node1Ref = useRef(null);
  const node2Ref = useRef(null);
  const node3Ref = useRef(null);
  const node4Ref = useRef(null);
  const node5Ref = useRef(null);
  const node6Ref = useRef(null);

  return (
    <div className="relative h-[550px] w-full overflow-hidden my-16" ref={containerRef}>
      {/* Center AI Node */}
      <div 
        ref={centerNodeRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="flex items-center justify-center w-28 h-28 bg-gradient-to-br from-primary/90 to-purple-600/90 rounded-full shadow-lg border border-white/10">
          <BrainCircuit className="w-14 h-14 text-white" />
        </div>
      </div>

      {/* Surrounding Nodes */}
      <div 
        ref={node1Ref}
        className="absolute left-1/4 top-1/4 z-10"
      >
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/90 to-cyan-400/90 rounded-full shadow-lg border border-white/10">
          <Camera className="w-8 h-8 text-white" />
        </div>
      </div>

      <div 
        ref={node2Ref}
        className="absolute right-1/4 top-1/4 z-10"
      >
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/90 to-pink-400/90 rounded-full shadow-lg border border-white/10">
          <Eye className="w-8 h-8 text-white" />
        </div>
      </div>

      <div 
        ref={node3Ref}
        className="absolute right-1/4 bottom-1/4 z-10"
      >
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500/90 to-orange-400/90 rounded-full shadow-lg border border-white/10">
          <Database className="w-8 h-8 text-white" />
        </div>
      </div>

      <div 
        ref={node4Ref}
        className="absolute left-1/4 bottom-1/4 z-10"
      >
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/90 to-green-400/90 rounded-full shadow-lg border border-white/10">
          <Cpu className="w-8 h-8 text-white" />
        </div>
      </div>

      <div 
        ref={node5Ref}
        className="absolute left-1/2 top-1/6 -translate-x-1/2 z-10"
      >
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500/90 to-pink-400/90 rounded-full shadow-lg border border-white/10">
          <FileCode className="w-8 h-8 text-white" />
        </div>
      </div>

      <div 
        ref={node6Ref}
        className="absolute left-1/2 bottom-1/6 -translate-x-1/2 z-10"
      >
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500/90 to-blue-400/90 rounded-full shadow-lg border border-white/10">
          <ScanSearch className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Animated beams connecting nodes */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node1Ref}
        toRef={centerNodeRef}
        curvature={-20}
        delay={0.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node2Ref}
        toRef={centerNodeRef}
        curvature={20}
        delay={1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node3Ref}
        toRef={centerNodeRef}
        curvature={-20}
        delay={1.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node4Ref}
        toRef={centerNodeRef}
        curvature={20}
        delay={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node5Ref}
        toRef={centerNodeRef}
        curvature={0}
        delay={2.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={node6Ref}
        toRef={centerNodeRef}
        curvature={0}
        delay={3}
      />

      {/* Bi-directional beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerNodeRef}
        toRef={node1Ref}
        curvature={-20}
        delay={1}
        reverse={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerNodeRef}
        toRef={node2Ref}
        curvature={20}
        delay={1.5}
        reverse={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerNodeRef}
        toRef={node3Ref}
        curvature={-20}
        delay={2}
        reverse={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerNodeRef}
        toRef={node4Ref}
        curvature={20}
        delay={2.5}
        reverse={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerNodeRef}
        toRef={node5Ref}
        curvature={0}
        delay={3}
        reverse={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerNodeRef}
        toRef={node6Ref}
        curvature={0}
        delay={3.5}
        reverse={true}
      />

      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10"></div>
    </div>
  );
}

function ComputerVisionPage() {
  const [splineError, setSplineError] = useState(false);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Handler for Spline errors
  const handleSplineError = () => {
    setSplineError(true);
    console.log("Spline model failed to load. Using fallback display.");
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with 3D model */}
      <section className="relative overflow-hidden pt-24 pb-32">
        {/* 3D Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10"></div>
        
        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  Computer Vision Technology
                </span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
              >
                Advanced Vision Intelligence Solutions
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-foreground/70 mb-8"
              >
                We develop cutting-edge computer vision systems that enable machines 
                to accurately perceive, analyze, and understand visual data from the real world.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 relative overflow-hidden">
                  Schedule a Demo
                  <BorderBeam size={100} duration={4} />
                </button>
                <button className="px-8 py-4 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 group">
                  View Our Solutions
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
            
            {/* Right side: Spline 3D Model or Fallback */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex-1 h-[500px] w-full rounded-2xl overflow-hidden shadow-xl relative"
            >
              <ComputerVisionVisualization />
            </motion.div>
          </div>
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
      
      {/* Animated AI Network Visualization */}
      <AIVisionNetwork />
      
      {/* Services Section */}
      <section className="py-24" id="services">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Computer Vision Solutions
            </h2>
            <p className="text-lg text-foreground/70">
              From object detection to facial recognition, our advanced computer vision solutions help businesses automate processes, enhance security, and gain valuable insights from visual data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Image className="w-6 h-6" />,
                title: "Image Recognition",
                description: "Identify objects, people, text, and actions in images with high precision.",
                features: [
                  "Object Classification",
                  "Facial Recognition",
                  "Scene Understanding",
                  "Text Extraction (OCR)"
                ],
                color: "from-blue-500 to-primary"
              },
              {
                icon: <Video className="w-6 h-6" />,
                title: "Video Analytics",
                description: "Real-time analysis and monitoring of video streams for actionable insights.",
                features: [
                  "Motion Detection",
                  "Behavior Analysis",
                  "Activity Recognition",
                  "Event Triggers"
                ],
                color: "from-primary to-purple-500"
              },
              {
                icon: <ScanSearch className="w-6 h-6" />,
                title: "Object Detection",
                description: "Precisely locate and identify multiple objects within images or video frames.",
                features: [
                  "Real-time Object Tracking",
                  "Multiple Object Detection",
                  "Boundary Detection",
                  "Location Mapping"
                ],
                color: "from-purple-500 to-blue-500"
              },
              {
                icon: <BrainCircuit className="w-6 h-6" />,
                title: "Machine Learning Integration",
                description: "Custom AI models trained on your specific visual data requirements.",
                features: [
                  "Custom Model Training",
                  "Transfer Learning",
                  "Model Optimization",
                  "Continuous Learning"
                ],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Scan className="w-6 h-6" />,
                title: "Anomaly Detection",
                description: "Identify unusual patterns or objects that deviate from expected norms.",
                features: [
                  "Quality Control",
                  "Defect Detection",
                  "Security Monitoring",
                  "Safety Compliance"
                ],
                color: "from-violet-500 to-fuchsia-500"
              },
              {
                icon: <PieChart className="w-6 h-6" />,
                title: "Analytics & Insights",
                description: "Transform visual data into actionable business intelligence and insights.",
                features: [
                  "Custom Dashboards",
                  "Trend Analysis",
                  "Performance Metrics",
                  "Visualization Tools"
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
                className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-shadow relative"
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
                <BorderBeam size={80} duration={8} delay={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Computer Vision Pipeline
            </h2>
            <p className="text-lg text-foreground/70">
              Our end-to-end computer vision pipeline delivers accurate, scalable solutions from data collection to ongoing optimization.
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-purple-500 to-blue-500 rounded-full"></div>
            
            {/* Steps */}
            {[
              {
                title: "Data Collection & Preparation",
                description: "We collect and prepare high-quality visual data specific to your use case, ensuring proper representation and diversity.",
                icon: <Camera className="w-8 h-8" />
              },
              {
                title: "Model Selection & Training",
                description: "Our experts select and customize computer vision algorithms tailored to your specific requirements.",
                icon: <Code className="w-8 h-8" />
              },
              {
                title: "Feature Extraction & Analysis",
                description: "Advanced techniques are used to extract meaningful features from visual data for accurate processing.",
                icon: <Eye className="w-8 h-8" />
              },
              {
                title: "System Integration",
                description: "We seamlessly integrate computer vision capabilities into your existing infrastructure and workflows.",
                icon: <Cpu className="w-8 h-8" />
              },
              {
                title: "Testing & Optimization",
                description: "Rigorous testing ensures reliability, with continuous optimization for improved performance over time.",
                icon: <Activity className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center gap-8 mb-16 ${index % 2 === 0 ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
              >
                <div className="flex-1">
                  <div className={`bg-card rounded-xl p-6 border border-border shadow-md ${index % 2 === 0 ? 'ml-auto mr-0' : 'ml-0 mr-auto'} max-w-lg relative overflow-hidden`}>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-foreground/70">{step.description}</p>
                    <BorderBeam size={60} duration={5} delay={index} />
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center text-white border-4 border-background">
                  {step.icon}
                </div>
                
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              Case Studies
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Vision Intelligence in Action
            </h2>
            <p className="text-lg text-foreground/70">
              Explore how our computer vision solutions are solving complex challenges and creating new opportunities across industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Manufacturing Quality Control",
                category: "Manufacturing",
                image: "https://images.unsplash.com/photo-1621634288783-b9c1176655cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Reduced defects by 87% with real-time vision inspection systems that identify product anomalies instantly."
              },
              {
                title: "Smart Retail Analytics",
                category: "Retail",
                image: "https://images.unsplash.com/photo-1615900537427-4cf290f8608e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Increased sales by 32% with customer behavior analysis and inventory optimization through vision intelligence."
              },
              {
                title: "Medical Imaging Analysis",
                category: "Healthcare",
                image: "https://images.unsplash.com/photo-1576671414121-aa0c83dd95ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                description: "Revolutionized diagnostics with AI-powered vision systems that detect patterns and anomalies in medical images."
              },
            ].map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-2xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow relative"
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
                <BorderBeam size={100} duration={6} delay={index} />
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
                  Ready to Transform Your Visual Data?
                </h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                  Let's discuss how our computer vision solutions can help you automate processes, enhance security, and gain valuable insights.
                </p>
              </div>
              
              <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-center">
                <button className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 w-full md:w-auto relative overflow-hidden">
                  Contact Us Today
                  <BorderBeam size={60} />
                </button>
                <button className="px-8 py-4 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-secondary/30 transition-colors flex items-center justify-center gap-2 w-full md:w-auto group">
                  Schedule a Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

// Static visualization component to replace Spline
function ComputerVisionVisualization() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden rounded-xl"
    >
      {/* Background image */}
      <img 
        src="https://img.recraft.ai/SKznhPwTLev5w3maxlI5MuSWYEB65SwcFkt6maCHIHY/rs:fit:1024:1024:0/q:95/g:no/plain/abs://prod/images/d6a240d9-5508-410b-b4b9-0fb36893b188@jpg" 
        alt="Street scene with person" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Camera interface elements */}
      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/20 flex items-center gap-2">
        <Camera size={16} className="text-white" />
        <span className="text-white text-xs font-medium">Live Feed</span>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/20">
        <div className="text-white text-xs font-medium">Processing...</div>
      </div>
      
      {/* Main person detection */}
      <motion.div 
        className="absolute right-[35%] top-1/2 -translate-y-1/2 w-[180px] h-[360px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div 
          className="w-full h-full border-2 border-purple-500 rounded-md"
          animate={{ 
            boxShadow: ['0 0 0 rgba(168, 85, 247, 0)', '0 0 8px rgba(168, 85, 247, 0.6)', '0 0 0 rgba(168, 85, 247, 0)'],
            borderColor: ['rgba(168, 85, 247, 0.7)', 'rgba(168, 85, 247, 1)', 'rgba(168, 85, 247, 0.7)']
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="absolute -top-8 left-0 bg-purple-500 text-white text-xs px-3 py-1 rounded-md flex items-center gap-2">
            <Eye size={12} />
            Person
            <span className="bg-white/20 px-1 rounded">98%</span>
          </div>
          
          {/* Scanning effect */}
          <motion.div 
            className="absolute inset-0 border-t-2 border-purple-500"
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          ></motion.div>
          
          {/* Body points connections */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Head */}
            <circle cx="50%" cy="15%" r="5" fill="rgba(168, 85, 247, 0.8)" />
            {/* Shoulders */}
            <circle cx="35%" cy="25%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="65%" cy="25%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            {/* Body center */}
            <circle cx="50%" cy="45%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            {/* Hips */}
            <circle cx="40%" cy="60%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="60%" cy="60%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            {/* Knees */}
            <circle cx="35%" cy="75%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="65%" cy="75%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            {/* Feet */}
            <circle cx="35%" cy="95%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            <circle cx="65%" cy="95%" r="4" fill="rgba(168, 85, 247, 0.8)" />
            
            {/* Connection lines */}
            <line x1="50%" y1="15%" x2="35%" y2="25%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="50%" y1="15%" x2="65%" y2="25%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="35%" y1="25%" x2="65%" y2="25%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="35%" y1="25%" x2="50%" y2="45%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="65%" y1="25%" x2="50%" y2="45%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="50%" y1="45%" x2="40%" y2="60%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="50%" y1="45%" x2="60%" y2="60%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="40%" y1="60%" x2="35%" y2="75%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="60%" y1="60%" x2="65%" y2="75%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="35%" y1="75%" x2="35%" y2="95%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
            <line x1="65%" y1="75%" x2="65%" y2="95%" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="2" />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Object detection */}
      <motion.div 
        className="absolute left-[78%] top-[60%] w-[100px] h-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div 
          className="w-full h-full border-2 border-primary rounded-md"
          animate={{ 
            boxShadow: ['0 0 0 rgba(var(--primary-rgb), 0)', '0 0 8px rgba(var(--primary-rgb), 0.6)', '0 0 0 rgba(var(--primary-rgb), 0)'],
            borderColor: ['rgba(var(--primary-rgb), 0.7)', 'rgba(var(--primary-rgb), 1)', 'rgba(var(--primary-rgb), 0.7)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute -top-8 left-0 bg-primary text-white text-xs px-3 py-1 rounded-md flex items-center gap-2">
            <Database size={12} />
            Object
            <span className="bg-white/20 px-1 rounded">87%</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Camera detection */}
      <motion.div 
        className="absolute left-[3%] bottom-[25%] w-[190px] h-[120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div 
          className="w-full h-full border-2 border-blue-400 rounded-md"
          animate={{ 
            boxShadow: ['0 0 0 rgba(96, 165, 250, 0)', '0 0 8px rgba(96, 165, 250, 0.6)', '0 0 0 rgba(96, 165, 250, 0)'],
            borderColor: ['rgba(96, 165, 250, 0.7)', 'rgba(96, 165, 250, 1)', 'rgba(96, 165, 250, 0.7)']
          }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <div className="absolute -top-8 left-0 bg-blue-400 text-white text-xs px-3 py-1 rounded-md flex items-center gap-2">
            <Camera size={12} />
            Truck or van
            <span className="bg-white/20 px-1 rounded">93%</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Data processing overlay */}
      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-white">Processing Data</span>
        </div>
        <div className="flex flex-col gap-1">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i}
              className="h-1 bg-gradient-to-r from-primary to-transparent"
              initial={{ width: '20%' }}
              animate={{ width: ['20%', '80%', '40%', '60%', '20%'] }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
      
      {/* AI insights */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm py-2 px-4 rounded-full border border-white/10 shadow-lg flex items-center gap-2">
        <BrainCircuit size={16} className="text-primary" />
        <span className="text-white text-xs">AI Vision Analysis Active</span>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Analysis metrics */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-white/80">Confidence:</span>
            <motion.div 
              className="h-1.5 w-16 bg-gray-700 rounded-full overflow-hidden"
              initial={{ width: '16rem' }}
            >
              <motion.div 
                className="h-full bg-primary" 
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            </motion.div>
            <span className="text-xs text-primary">85%</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-white/80">Tracking:</span>
            <motion.div 
              className="h-1.5 w-16 bg-gray-700 rounded-full overflow-hidden"
              initial={{ width: '16rem' }}
            >
              <motion.div 
                className="h-full bg-purple-500" 
                initial={{ width: "0%" }}
                animate={{ width: "92%" }}
                transition={{ duration: 1.4, delay: 0.4 }}
              />
            </motion.div>
            <span className="text-xs text-purple-500">92%</span>
          </div>
        </div>
      </div>
      
      {/* Floating scan points */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/80"
          style={{ 
            left: `${10 + Math.random() * 80}%`, 
            top: `${10 + Math.random() * 80}%` 
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Fallback component when Spline fails to load
function SplineFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/10 p-8">
      <div className="mb-8 relative">
        <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white">
          <Eye className="w-12 h-12" />
        </div>
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
      </div>
      <h3 className="text-2xl font-bold text-center mb-4">Computer Vision Intelligence</h3>
      <p className="text-center text-foreground/70 max-w-md mb-6">
        Our advanced AI algorithms process visual data to deliver real-time insights and automated recognition capabilities.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        {['Object Detection', 'Face Recognition', 'Scene Analysis', 'Motion Tracking'].map((item, i) => (
          <div 
            key={i} 
            className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium"
          >
            {item}
          </div>
        ))}
      </div>
      
      {/* Abstract visualization */}
      <div className="mt-8 relative w-full max-w-sm h-32">
        {[...Array(8)].map((_, i) => {
          const size = 20 + Math.random() * 30;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const delay = i * 0.5;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-primary/40 to-purple-500/40"
              style={{ width: size, height: size, top: `${top}%`, left: `${left}%` }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Custom ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Spline component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ComputerVisionPage;