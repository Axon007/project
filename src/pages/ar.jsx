// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Spline from '@splinetool/react-spline';
// import { PinContainer } from '../components/ui/3d-pin';
// import { 
//   Headset, 
//   Glasses, 
//   Building2, 
//   GraduationCap, 
//   PieChart, 
//   Gamepad2, 
//   Heart, 
//   ChevronRight, 
//   CheckCircle, 
//   Award,
//   Users,
//   Code,
//   Activity,
//   ArrowRight,
//   Globe,
//   Sparkles
// } from 'lucide-react';

// // Update the existing AnimatedPinDemo function to include more impressive demo pins
// export function AnimatedPinDemo() {
//   return (
//     <div className="pt-16 pb-24 relative overflow-hidden">
//       <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
//         Interactive AR/VR Experiences
//       </h2>
      
//       <div className="flex flex-wrap justify-center gap-16">
//         {/* AR Try-On Demo */}
//         <div className="relative">
//           <PinContainer
//             title="AR Try-On Experience"
//             href="#ar-demo"
//           >
//             <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
//               <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100">
//                 Virtual Try-On
//               </h3>
//               <div className="text-base !m-0 !p-0 font-normal mb-4">
//                 <span className="text-slate-400">
//                   See how products look in your space before buying
//                 </span>
//               </div>
//               <div className="flex flex-1 w-full rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 overflow-hidden">
//                 <img 
//                   src="https://images.unsplash.com/photo-1633544805151-2e8afbb596bc?q=80&w=1000" 
//                   alt="AR Demo" 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </PinContainer>
//         </div>
        
//         {/* VR Training Demo */}
//         <div className="relative">
//           <PinContainer
//             title="VR Training Simulator"
//             href="#vr-demo"
//           >
//             <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
//               <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100">
//                 Interactive Learning
//               </h3>
//               <div className="text-base !m-0 !p-0 font-normal mb-4">
//                 <span className="text-slate-400">
//                   Hands-on training in a safe virtual environment
//                 </span>
//               </div>
//               <div className="flex flex-1 w-full rounded-lg overflow-hidden">
//                 <video 
//                   className="w-full h-full object-cover"
//                   autoPlay 
//                   loop 
//                   muted 
//                   playsInline
//                 >
//                   <source src="https://assets.mixkit.co/videos/preview/mixkit-man-wearing-virtual-glasses-916-large.mp4" type="video/mp4" />
//                 </video>
//               </div>
//             </div>
//           </PinContainer>
//         </div>
        
//         {/* Data Visualization Demo */}
//         <div className="relative">
//           <PinContainer
//             title="3D Data Visualization"
//             href="#data-viz"
//           >
//             <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
//               <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100">
//                 Spatial Analytics
//               </h3>
//               <div className="text-base !m-0 !p-0 font-normal mb-4">
//                 <span className="text-slate-400">
//                   Visualize complex data in immersive 3D environments
//                 </span>
//               </div>
//               <div className="flex flex-1 w-full rounded-lg bg-[#0f172a] overflow-hidden p-4">
//                 <div className="w-full h-full flex items-center justify-center">
//                   <motion.div
//                     animate={{ 
//                       rotateY: 360,
//                       rotateX: [0, 45, 0, -45, 0],
//                     }}
//                     transition={{ 
//                       duration: 20, 
//                       repeat: Infinity, 
//                       ease: "linear",
//                       rotateX: {
//                         duration: 10,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                       }
//                     }}
//                     className="w-48 h-48 relative"
//                   >
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="w-full h-full border-4 border-blue-500/50 rounded-full"></div>
//                     </div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="w-3/4 h-3/4 border-4 border-purple-500/50 rounded-full"></div>
//                     </div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="w-1/2 h-1/2 border-4 border-emerald-500/50 rounded-full"></div>
//                     </div>
//                     {[...Array(8)].map((_, i) => {
//                       const angle = (i / 8) * Math.PI * 2;
//                       const x = Math.cos(angle) * 80;
//                       const y = Math.sin(angle) * 80;
                      
//                       return (
//                         <motion.div
//                           key={i}
//                           className="absolute w-4 h-4 rounded-full bg-primary"
//                           style={{
//                             left: `calc(50% + ${x}px - 8px)`,
//                             top: `calc(50% + ${y}px - 8px)`,
//                           }}
//                           animate={{
//                             scale: [1, 1.5, 1],
//                             opacity: [0.7, 1, 0.7]
//                           }}
//                           transition={{
//                             duration: 2,
//                             repeat: Infinity,
//                             delay: i * 0.3
//                           }}
//                         />
//                       );
//                     })}
//                   </motion.div>
//                 </div>
//               </div>
//             </div>
//           </PinContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ARVRServices() {
//   useEffect(() => {
//     // Scroll to top on page loadsasa
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="bg-background min-h-screen">
//       {/* Hero Section with 3D model */}
//       <section className="relative overflow-hidden pt-24 pb-32">
//         {/* 3D Grid background */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10"></div>
        
//         {/* Gradient orbs */}
//         <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//             {/* Left side: Text content */}
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="flex-1"
//             >
//               <div className="mb-6">
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
//                   Immersive Technologies
//                 </span>
//               </div>
              
//               <motion.h1 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500"
//               >
//                 Transform Reality with AR & VR Solutions
//               </motion.h1>
              
//               <motion.p 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//                 className="text-xl text-foreground/70 mb-8"
//               >
//                 We create immersive experiences that blend digital and physical worlds, 
//                 empowering businesses to innovate and engage like never before.
//               </motion.p>
              
//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4"
//               >
//                 <button className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
//                   Schedule a Demo
//                 </button>
//                 <button className="px-8 py-4 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 group">
//                   View Our Work
//                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </motion.div>
//             </motion.div>
            
//             {/* Right side: Spline 3D Model */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//               className="flex-1 h-[500px] w-full rounded-2xl overflow-hidden shadow-xl"
//             >
//            <Spline scene="https://prod.spline.design/kE8s6G8gbeLSAlRo/scene.splinecode" />
//             </motion.div>
//           </div>
//         </div>
//       </section>
      
//       {/* Client Logos */}
//       <section className="py-16 bg-secondary/5">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-10">
//             <span className="text-foreground/60 font-medium">Trusted by innovation leaders</span>
//           </div>
//           <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <div key={i} className="h-10 w-32 bg-foreground/10 rounded-lg filter grayscale hover:grayscale-0 transition-all"></div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* ADD THIS - 3D Pin Demo Section */}
//       <AnimatedPinDemo />
      
//       {/* Services Section */}
//       <section className="py-24" id="services">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto text-center mb-16">
//             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
//               Our Services
//             </span>
//             <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
//               Comprehensive AR/VR Solutions
//             </h2>
//             <p className="text-lg text-foreground/70">
//               We offer end-to-end immersive technology services, from concept to deployment, to help you harness the full potential of augmented and virtual reality.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Headset className="w-6 h-6" />,
//                 title: "VR Development",
//                 description: "Create fully immersive virtual environments for training, entertainment, and visualization.",
//                 features: [
//                   "Interactive VR Applications",
//                   "360° Video Experiences",
//                   "Spatial Audio Design",
//                   "Cross-Platform Development"
//                 ],
//                 color: "from-blue-500 to-primary"
//               },
//               {
//                 icon: <Glasses className="w-6 h-6" />,
//                 title: "AR Solutions",
//                 description: "Overlay digital content onto the real world with intuitive augmented reality applications.",
//                 features: [
//                   "Mobile AR Apps",
//                   "WebAR Implementation",
//                   "AR Product Visualization",
//                   "Location-Based AR"
//                 ],
//                 color: "from-primary to-purple-500"
//               },
//               {
//                 icon: <Building2 className="w-6 h-6" />,
//                 title: "Enterprise Solutions",
//                 description: "Transform business processes with custom AR/VR solutions that solve real-world challenges.",
//                 features: [
//                   "Remote Assistance",
//                   "Virtual Collaboration",
//                   "Digital Twins",
//                   "Data Visualization"
//                 ],
//                 color: "from-purple-500 to-blue-500"
//               },
//               {
//                 icon: <GraduationCap className="w-6 h-6" />,
//                 title: "Training & Simulation",
//                 description: "Develop immersive training environments that enhance learning and retention.",
//                 features: [
//                   "Safety Training",
//                   "Medical Simulation",
//                   "Skills Assessment",
//                   "Procedural Training"
//                 ],
//                 color: "from-blue-500 to-cyan-500"
//               },
//               {
//                 icon: <Gamepad2 className="w-6 h-6" />,
//                 title: "Interactive Experiences",
//                 description: "Design engaging games and interactive experiences for entertainment and marketing.",
//                 features: [
//                   "VR/AR Games",
//                   "Interactive Storytelling",
//                   "Brand Experiences",
//                   "Gamified Learning"
//                 ],
//                 color: "from-violet-500 to-fuchsia-500"
//               },
//               {
//                 icon: <PieChart className="w-6 h-6" />,
//                 title: "Consulting & Strategy",
//                 description: "Expert guidance on implementing AR/VR technologies to achieve your business goals.",
//                 features: [
//                   "Technology Assessment",
//                   "ROI Analysis",
//                   "Implementation Planning",
//                   "Competitive Analysis"
//                 ],
//                 color: "from-emerald-500 to-blue-500"
//               }
//             ].map((service, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-shadow"
//               >
//                 <div className="p-6">
//                   <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-6`}>
//                     {service.icon}
//                   </div>
//                   <h3 className="text-xl font-bold mb-3">{service.title}</h3>
//                   <p className="text-foreground/70 mb-6">{service.description}</p>
//                   <div className="space-y-3">
//                     {service.features.map((feature, idx) => (
//                       <div key={idx} className="flex items-center gap-2">
//                         <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
//                         <span className="text-sm">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className={`h-1 w-full bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}></div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
      

      
//       {/* Technology Capabilities Section */}
//       <section className="py-24">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             <div>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
//                 Technology Stack
//               </span>
//               <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
//                 Cutting-Edge AR/VR Technologies
//               </h2>
//               <p className="text-lg text-foreground/70 mb-8">
//                 We leverage the latest immersive technologies and platforms to deliver exceptional AR/VR experiences for any device or platform.
//               </p>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//                 {[
//                   {
//                     title: "Development Frameworks",
//                     items: ["Unity 3D", "Unreal Engine", "ARKit", "ARCore", "WebXR"]
//                   },
//                   {
//                     title: "Hardware Support",
//                     items: ["Meta Quest", "HTC Vive", "Microsoft HoloLens", "Magic Leap", "Mobile AR"]
//                   },
//                   {
//                     title: "3D Technologies",
//                     items: ["Photogrammetry", "3D Modeling", "Motion Capture", "Spatial Mapping"]
//                   },
//                   {
//                     title: "Integration Capabilities",
//                     items: ["IoT Connectivity", "AI Integration", "Cloud Services", "Analytics Tools"]
//                   }
//                 ].map((category, idx) => (
//                   <div key={idx} className="space-y-3">
//                     <h3 className="font-semibold text-lg">{category.title}</h3>
//                     <ul className="space-y-2">
//                       {category.items.map((item, i) => (
//                         <li key={i} className="flex items-center gap-2 text-foreground/70">
//                           <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
//                           <span>{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
              
//               <button className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
//                 Explore Our Technical Capabilities
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
            
//             {/* Visual Tech Stack */}
//             <div className="relative">
//               <div className="relative h-[500px] perspective-1000">
//                 <motion.div
//                   initial={{ rotateY: 0 }}
//                   animate={{ rotateY: 360 }}
//                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                   className="absolute inset-0"
//                 >
//                   <div className="relative w-full h-full">
//                     {/* Main cube */}
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 transform-style-3d">
//                       {/* Cube faces */}
//                       {Array.from({ length: 6 }).map((_, index) => (
//                         <div 
//                           key={index} 
//                           className={`absolute w-60 h-60 bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center transform ${
//                             index === 0 ? 'rotateY(0deg) translateZ(120px)' :
//                             index === 1 ? 'rotateY(180deg) translateZ(120px)' :
//                             index === 2 ? 'rotateY(90deg) translateZ(120px)' :
//                             index === 3 ? 'rotateY(-90deg) translateZ(120px)' :
//                             index === 4 ? 'rotateX(90deg) translateZ(120px)' :
//                             'rotateX(-90deg) translateZ(120px)'
//                           }`}
//                         >
//                           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white">
//                             {index === 0 && <Headset className="w-8 h-8" />}
//                             {index === 1 && <Glasses className="w-8 h-8" />}
//                             {index === 2 && <Building2 className="w-8 h-8" />}
//                             {index === 3 && <GraduationCap className="w-8 h-8" />}
//                             {index === 4 && <PieChart className="w-8 h-8" />}
//                             {index === 5 && <Gamepad2 className="w-8 h-8" />}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
                    
//                     {/* Orbiting spheres */}
//                     {Array.from({ length: 8 }).map((_, index) => {
//                       const angle = (index / 8) * Math.PI * 2;
//                       const radius = 240;
//                       const x = Math.cos(angle) * radius;
//                       const z = Math.sin(angle) * radius;
                      
//                       return (
//                         <motion.div
//                           key={index}
//                           initial={{ opacity: 0.3 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: index * 0.2 }}
//                           className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-purple-500/80 shadow-lg flex items-center justify-center text-white text-xs"
//                           style={{
//                             transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px)`,
//                           }}
//                         >
//                           {["AR", "VR", "3D", "AI", "XR", "MR", "IoT", "ML"][index]}
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 </motion.div>
                
//                 {/* Static overlays and floating elements */}
//                 <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg">
//                   <img 
//                     src="https://images.unsplash.com/photo-1478399305562-fbc9c0adb0e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
//                     alt="VR Technology" 
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//                 <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-primary/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg">
//                   <img 
//                     src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
//                     alt="AR Technology" 
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Immersive Experience Section */}
//       <section className="py-24 relative overflow-hidden">
//         {/* Background effects */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 2 }}
//           className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
//         ></motion.div>
        
//         {/* Fixed particles instead of dynamic ones */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0 }}
//               animate={{ 
//                 opacity: [0, 0.7, 0],
//                 y: [i % 2 === 0 ? -10 : 10, i % 2 === 0 ? 10 : -10]
//               }}
//               transition={{ 
//                 duration: 8 + (i % 5) * 2,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 ease: "linear",
//                 delay: i * 0.25
//               }}
//               className="absolute w-2 h-2 rounded-full bg-primary/40"
//               style={{
//                 left: `${10 + (i * 5) % 80}%`,
//                 top: `${15 + (i * 7) % 70}%`
//               }}
//             />
//           ))}
//         </div>
        
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto text-center mb-16"
//           >
//             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
//               <Sparkles className="w-4 h-4 mr-2" /> Immersive Experiences
//             </span>
//             <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
//               Step Into The Future
//             </h2>
//             <p className="text-lg text-foreground/70">
//               Experience how our AR/VR solutions blur the line between digital and physical worlds, creating truly immersive experiences.
//             </p>
//           </motion.div>
          
//           {/* Interactive Experience Showcase */}
//           <div className="relative my-20">
//             {/* 3D Environment Frame */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="relative rounded-2xl overflow-hidden border border-border shadow-lg h-[600px] bg-gradient-to-br from-background to-secondary/10"
//             >
//               {/* Virtual environment background */}
//               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626379953822-baec19dc2b66?q=80&w=2000')] bg-cover bg-center opacity-60"></div>
              
//               {/* Grid overlay */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.2 }}
//                 transition={{ duration: 2, delay: 1 }}
//                 className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]"
//               ></motion.div>
              
//               {/* Interactive hotspots */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 viewport={{ once: true }}
//                 className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 group"
//               >
//                 <div className="relative">
//                   <div className="animate-ping absolute h-8 w-8 rounded-full bg-primary/40"></div>
//                   <motion.div 
//                     whileHover={{ scale: 1.2 }}
//                     className="relative h-6 w-6 rounded-full bg-primary flex items-center justify-center cursor-pointer"
//                   >
//                     <span className="text-white font-bold">1</span>
//                   </motion.div>
//                 </div>
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border w-64 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <h4 className="font-bold text-sm">Interactive Training</h4>
//                   <p className="text-xs text-foreground/70">Users can interact with virtual objects for hands-on training</p>
//                 </div>
//               </motion.div>
              
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 viewport={{ once: true }}
//                 className="absolute top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 group"
//               >
//                 <div className="relative">
//                   <div className="animate-ping absolute h-8 w-8 rounded-full bg-purple-500/40 animation-delay-700"></div>
//                   <motion.div 
//                     whileHover={{ scale: 1.2 }}
//                     className="relative h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center cursor-pointer"
//                   >
//                     <span className="text-white font-bold">2</span>
//                   </motion.div>
//                 </div>
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border w-64 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <h4 className="font-bold text-sm">Object Manipulation</h4>
//                   <p className="text-xs text-foreground/70">Grab, rotate, and modify virtual objects with natural hand gestures</p>
//                 </div>
//               </motion.div>
              
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.6 }}
//                 viewport={{ once: true }}
//                 className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 group"
//               >
//                 <div className="relative">
//                   <div className="animate-ping absolute h-8 w-8 rounded-full bg-blue-500/40 animation-delay-1500"></div>
//                   <motion.div 
//                     whileHover={{ scale: 1.2 }}
//                     className="relative h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer"
//                   >
//                     <span className="text-white font-bold">3</span>
//                   </motion.div>
//                 </div>
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border w-64 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <h4 className="font-bold text-sm">Spatial Awareness</h4>
//                   <p className="text-xs text-foreground/70">Experience environments that adapt to your physical surroundings</p>
//                 </div>
//               </motion.div>
              
//               {/* Floating UI Elements */}
//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7 }}
//                 viewport={{ once: true }}
//                 className="absolute top-10 right-10 bg-card/80 backdrop-blur-md p-4 rounded-lg border border-border shadow-lg"
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                 </div>
//                 <div className="w-64 h-20 bg-foreground/10 rounded-md mb-2">
//                   <div className="h-full w-full p-2">
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-8 h-2 bg-primary/40 rounded-full"></div>
//                       <div className="w-16 h-2 bg-foreground/30 rounded-full"></div>
//                     </div>
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-12 h-2 bg-foreground/30 rounded-full"></div>
//                       <div className="w-8 h-2 bg-purple-500/40 rounded-full"></div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-10 h-2 bg-foreground/30 rounded-full"></div>
//                       <div className="w-14 h-2 bg-blue-500/40 rounded-full"></div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <div className="w-1/2 h-8 bg-primary/20 rounded-md hover:bg-primary/30 transition-colors"></div>
//                   <div className="w-1/2 h-8 bg-purple-500/20 rounded-md hover:bg-purple-500/30 transition-colors"></div>
//                 </div>
//               </motion.div>
              
//               {/* Data visualization chart */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.2 }}
//                 viewport={{ once: true }}
//                 className="absolute top-1/3 left-10 bg-card/80 backdrop-blur-md p-4 rounded-lg border border-border shadow-lg"
//               >
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
//                     <span className="text-white text-xs">i</span>
//                   </div>
//                   <span className="text-xs font-medium">Spatial Data</span>
//                 </div>
//                 <div className="flex items-end h-20 gap-1">
//                   {[40, 65, 30, 80, 55, 70, 45, 60].map((height, i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ height: 0 }}
//                       whileInView={{ height: `${height}%` }}
//                       transition={{ duration: 1, delay: 0.3 + (i * 0.1) }}
//                       viewport={{ once: true }}
//                       className="w-4 rounded-sm bg-gradient-to-t from-primary/30 to-purple-500/70"
//                     ></motion.div>
//                   ))}
//                 </div>
//               </motion.div>
              
//               {/* VR Headset Overlay */}
//               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_65%,rgba(0,0,0,0.7)_100%)]"></div>
              
//               {/* Scanning effect */}
//               <motion.div
//                 initial={{ left: '-100%' }}
//                 animate={{ left: '100%' }}
//                 transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
//                 className="absolute top-0 bottom-0 w-40 bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none"
//               ></motion.div>
              
//               {/* Center CTA */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//                 className="absolute left-1/2 bottom-10 transform -translate-x-1/2 text-center"
//               >
//                 <motion.button 
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 group"
//                 >
//                   Experience Demo
//                   <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
//                 </motion.button>
//               </motion.div>
//             </motion.div>
            
//             {/* Experience features */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
//               {[
//                 {
//                   icon: <Headset className="w-6 h-6" />,
//                   title: "Full Immersion",
//                   description: "Step completely into virtual worlds with our 360° environments and spatial audio."
//                 },
//                 {
//                   icon: <Glasses className="w-6 h-6" />,
//                   title: "Mixed Reality",
//                   description: "Blend digital content with the physical world through advanced AR overlays."
//                 },
//                 {
//                   icon: <Users className="w-6 h-6" />,
//                   title: "Multi-User Experience",
//                   description: "Collaborate with others in shared virtual spaces regardless of physical location."
//                 }
//               ].map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.2 }}
//                   viewport={{ once: true }}
//                   className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-all"
//                 >
//                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//                   <p className="text-foreground/70">{feature.description}</p>
                  
//                   <motion.div
//                     initial={{ width: 0 }}
//                     whileInView={{ width: "100%" }}
//                     transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
//                     viewport={{ once: true }}
//                     className="h-0.5 bg-gradient-to-r from-primary to-purple-500/50 mt-4"
//                   ></motion.div>
//                 </motion.div>
//               ))}
//             </div>
            
//             {/* Stats & Metrics */}
//             <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[
//                 { value: "98%", label: "User Engagement" },
//                 { value: "75%", label: "Knowledge Retention" },
//                 { value: "3.5x", label: "Training Efficiency" },
//                 { value: "64%", label: "Cost Reduction" }
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="bg-card border border-border rounded-xl p-6 text-center relative overflow-hidden group"
//                 >
//                   <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 mb-2">{stat.value}</h3>
//                   <p className="text-foreground/70 text-sm">{stat.label}</p>
                  
//                   {/* Hover effect */}
//                   <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 </motion.div>
//               ))}
//             </div>
            
//             {/* Call to action */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               viewport={{ once: true }}
//               className="mt-16 text-center"
//             >
//               <button className="px-8 py-4 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2 mx-auto group relative overflow-hidden">
//                 <Sparkles className="w-5 h-5" />
//                 <span>Schedule Your Immersive Demo</span>
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                
//                 <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/0 via-primary/10 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//               </button>
//             </motion.div>
//           </div>
//         </div>
//       </section>
      
//       {/* Case Studies */}
//       <section className="py-24 bg-secondary/5">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto text-center mb-16">
//             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
//               Case Studies
//             </span>
//             <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
//               Transforming Industries with AR & VR
//             </h2>
//             <p className="text-lg text-foreground/70">
//               Explore how our clients are using immersive technologies to solve complex problems and create new opportunities.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Industrial Training Simulation",
//                 category: "Manufacturing",
//                 image: "https://images.unsplash.com/photo-1620634415912-42df9406dc47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
//                 description: "Reduced training time by 65% and improved safety with immersive VR training for factory workers."
//               },
//               {
//                 title: "Retail AR Shopping Experience",
//                 category: "E-commerce",
//                 image: "https://images.unsplash.com/photo-1633543585375-b83979f7e861?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
//                 description: "Increased conversions by 32% with an AR app that lets customers visualize products in their home."
//               },
//               {
//                 title: "Medical Training Platform",
//                 category: "Healthcare",
//                 image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
//                 description: "Revolutionized medical education with VR simulations that improve procedural skills and confidence."
//               },
//             ].map((study, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="group overflow-hidden rounded-2xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow"
//               >
//                 <div className="relative h-60 overflow-hidden">
//                   <img 
//                     src={study.image} 
//                     alt={study.title} 
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
//                     <span className="p-4 text-sm font-medium text-white">{study.category}</span>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{study.title}</h3>
//                   <p className="text-foreground/70 mb-4">{study.description}</p>
//                   <button className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
//                     Read Case Study 
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
          
//           <div className="text-center mt-12">
//             <button className="px-6 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors">
//               View All Case Studies
//             </button>
//           </div>
//         </div>
//       </section>
      
//       {/* Testimonials */}
//       <section className="py-24">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto text-center mb-16">
//             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
//               Client Success
//             </span>
//             <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
//               What Our Clients Say
//             </h2>
//             <p className="text-lg text-foreground/70">
//               Hear from organizations that have transformed their business with our AR/VR solutions.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 quote: "The VR training application has completely transformed how we onboard new employees. Training time cut by half with better results.",
//                 author: "Sarah Johnson",
//                 position: "HR Director, Manufacturing Inc.",
//                 rating: 5
//               },
//               {
//                 quote: "The AR product visualization tool has revolutionized our customer experience. Our customers can now see exactly how our products fit in their space.",
//                 author: "Michael Chen",
//                 position: "CMO, Furniture Designs",
//                 rating: 5
//               },
//               {
//                 quote: "Working with this team was seamless. They understood our complex requirements and delivered a VR solution that exceeded our expectations.",
//                 author: "Dr. Emily Rodriguez",
//                 position: "Medical Director, Healthcare Systems",
//                 rating: 5
//               }
//             ].map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="bg-card rounded-2xl p-6 border border-border shadow-md hover:shadow-lg transition-shadow"
//               >
//                 <div className="mb-6 flex">
//                   {Array.from({ length: testimonial.rating }).map((_, i) => (
//                     <Heart key={i} className="w-5 h-5 text-red-500 fill-red-500" />
//                   ))}
//                 </div>
//                 <p className="text-foreground/90 mb-6 text-lg italic">"{testimonial.quote}"</p>
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
//                     <span className="text-lg font-semibold text-primary">{testimonial.author.charAt(0)}</span>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold">{testimonial.author}</h4>
//                     <p className="text-sm text-foreground/60">{testimonial.position}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto bg-card rounded-3xl p-10 shadow-xl border border-border relative overflow-hidden">
//             {/* Decorative elements */}
//             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50"></div>
//             <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full filter blur-2xl opacity-50"></div>
            
//             <div className="relative z-10">
//               <div className="text-center mb-10">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
//                   Ready to Transform Your Business with AR & VR?
//                 </h2>
//                 <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
//                   Let's discuss how our immersive technology solutions can help you innovate, engage, and grow.
//                 </p>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="rounded-xl bg-secondary/30 p-6 text-center">
//                   <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mx-auto mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
//                   </div>
//                   <h3 className="font-semibold mb-2">Request a Demo</h3>
//                   <p className="text-sm text-foreground/70 mb-4">See our AR/VR solutions in action with a personalized demo.</p>
//                   <button className="text-blue-500 text-sm font-medium flex items-center gap-2 mx-auto">
//                     Book a Demo
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
                
//                 <div className="rounded-xl bg-primary/10 p-6 text-center">
//                   <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.96.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h3.8a2 2 0 0 0 1.4-.6L12 4.6a2 2 0 0 1 1.4-.6h3.8a2 2 0 0 1 2 2v2.4Z"></path><polyline points="12 10 12 16"></polyline><line x1="9" y1="13" x2="15" y2="13"></line></svg>
//                   </div>
//                   <h3 className="font-semibold mb-2">Consultation</h3>
//                   <p className="text-sm text-foreground/70 mb-4">Schedule a free consultation with our AR/VR experts.</p>
//                   <button className="text-primary text-sm font-medium flex items-center gap-2 mx-auto">
//                     Get Started
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
                
//                 <div className="rounded-xl bg-secondary/30 p-6 text-center">
//                   <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 mx-auto mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
//                   </div>
//                   <h3 className="font-semibold mb-2">Case Studies</h3>
//                   <p className="text-sm text-foreground/70 mb-4">Download our detailed case studies and industry reports.</p>
//                   <button className="text-purple-500 text-sm font-medium flex items-center gap-2 mx-auto">
//                     Download Now
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-center">
//                 <button className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 w-full md:w-auto">
//                   Contact Us Today
//                 </button>
//                 <button className="px-8 py-4 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-secondary/30 transition-colors flex items-center justify-center gap-2 w-full md:w-auto">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
//                   Schedule a Call
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* FAQ Section */}
//       <section className="py-24">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto text-center mb-16">
//             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
//               FAQs
//             </span>
//             <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
//               Common Questions
//             </h2>
//             <p className="text-lg text-foreground/70">
//               Everything you need to know about our AR/VR services and solutions.
//             </p>
//           </div>
          
//           <div className="max-w-3xl mx-auto divide-y divide-border">
//             {[
//               {
//                 question: "What hardware is required for AR/VR experiences?",
//                 answer: "For VR, we support various headsets like Meta Quest, HTC Vive, and Valve Index. For AR, most modern smartphones and tablets are compatible, as well as specialized hardware like HoloLens or Magic Leap. We'll help you determine the best hardware for your specific needs and budget."
//               },
//               {
//                 question: "How long does it take to develop an AR/VR application?",
//                 answer: "Development timeframes vary depending on complexity, from 4-8 weeks for a simple AR app to 3-6 months for comprehensive VR experiences. During consultation, we'll provide a detailed timeline based on your specific requirements and goals."
//               },
//               {
//                 question: "What industries benefit most from AR/VR technologies?",
//                 answer: "AR/VR technologies are transforming numerous industries including healthcare, manufacturing, education, retail, real estate, entertainment, and automotive. Any sector that benefits from visualization, training, or enhanced customer experiences can leverage immersive technologies."
//               },
//               {
//                 question: "How do you measure the success of an AR/VR project?",
//                 answer: "We establish clear KPIs at the beginning of each project, which may include user engagement metrics, training effectiveness, conversion rates, or other business-specific outcomes. We provide detailed analytics and reporting to track these metrics throughout the project lifecycle."
//               },
//               {
//                 question: "Do you offer ongoing support and maintenance?",
//                 answer: "Yes, we provide comprehensive post-launch support options including technical maintenance, content updates, performance optimization, and user analytics. We offer flexible support packages tailored to your specific needs."
//               }
//             ].map((faq, index) => (
//               <motion.div 
//                 key={index}
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="py-6"
//               >
//                 <details className="group">
//                   <summary className="flex justify-between items-center font-semibold cursor-pointer list-none">
//                     <span className="text-lg">{faq.question}</span>
//                     <span className="transition group-open:rotate-180">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
//                     </span>
//                   </summary>
//                   <p className="text-foreground/70 mt-4 group-open:animate-fadeIn">
//                     {faq.answer}
//                   </p>
//                 </details>
//               </motion.div>
//             ))}
//           </div>
          
//           <div className="mt-12 text-center">
//             <p className="text-foreground/70 mb-4">Have more questions?</p>
//             <button className="px-6 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2 mx-auto">
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
//               Contact Our Support Team
//             </button>
//           </div>
//         </div>
//       </section>
      
//     </div>
//   );
// }

// export default ARVRServices;

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
  const nodes = [
    { id: 1, type: 'camera', position: { x: 30, y: 40 }, icon: <Camera size={20} /> },
    { id: 2, type: 'processor', position: { x: 70, y: 30 }, icon: <Cpu size={20} /> },
    { id: 3, type: 'recognition', position: { x: 80, y: 70 }, icon: <Eye size={20} /> },
    { id: 4, type: 'data', position: { x: 35, y: 75 }, icon: <Database size={20} /> },
    { id: 5, type: 'analysis', position: { x: 50, y: 50 }, icon: <BrainCircuit size={24} /> }
  ];
  
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
      className="w-full h-full bg-gradient-to-br from-background to-secondary/10 p-4 relative overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute left-1/4 top-1/3 w-40 h-40 bg-primary/20 rounded-full filter blur-2xl opacity-50"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div 
        className="absolute right-1/3 bottom-1/4 w-56 h-56 bg-purple-500/20 rounded-full filter blur-2xl opacity-40"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      
      {/* Main content */}
      <div className="relative z-10 h-full">
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute"
            style={{ 
              left: `${node.position.x}%`, 
              top: `${node.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: node.id * 0.2 }}
          >
            <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border border-white/10 ${
              node.id === 5 
                ? 'bg-gradient-to-br from-primary/90 to-purple-600/90' 
                : 'bg-card/80 backdrop-blur-sm'
            }`}>
              <div className={node.id === 5 ? 'text-white' : 'text-primary'}>
                {node.icon}
              </div>
              
              {/* Connection lines to central node */}
              {node.id !== 5 && (
                <svg 
                  className="absolute top-0 left-0 w-full h-full pointer-events-none" 
                  style={{ 
                    width: dimensions.width, 
                    height: dimensions.height,
                    top: -node.position.y + 50 + '%',
                    left: -node.position.x + 50 + '%',
                  }}
                >
                  <line 
                    x1={node.position.x + '%'} 
                    y1={node.position.y + '%'} 
                    x2="50%" 
                    y2="50%"
                    stroke="url(#line-gradient)" 
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <defs>
                    <linearGradient id="line-gradient" gradientTransform="rotate(90)">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              
              {/* Animated pulse */}
              <div className="absolute inset-0 -z-10">
                <motion.div
                  className="absolute inset-0 rounded-xl bg-primary/20"
                  animate={{ scale: [1, 1.15, 1], opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: node.id * 0.5 }}
                />
              </div>
            </div>
            
            {/* Label */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
              <span className="text-xs font-medium text-foreground/70 bg-card/70 px-2 py-1 rounded-md backdrop-blur-sm">
                {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
              </span>
            </div>
          </motion.div>
        ))}
        
        {/* Floating data points */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/60"
            style={{ 
              left: `${15 + Math.random() * 70}%`, 
              top: `${15 + Math.random() * 70}%` 
            }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, -20 - Math.random() * 40],
              x: [0, (Math.random() - 0.5) * 40]
            }}
            transition={{ 
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Data processing visualization */}
        <div className="absolute bottom-6 right-6 bg-card/50 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium">Processing Data</span>
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
        
        {/* Object detection boxes */}
        <div className="absolute top-[30%] left-[20%] w-16 h-16">
          <motion.div 
            className="w-full h-full border-2 border-dashed border-primary/70 rounded-md"
            animate={{ 
              scale: [1, 1.05, 1],
              borderColor: ['rgba(var(--primary), 0.7)', 'rgba(var(--primary), 0.9)', 'rgba(var(--primary), 0.7)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute -top-5 -left-1 bg-primary/90 text-white text-xs px-2 py-0.5 rounded-sm">
              Object
            </div>
          </motion.div>
        </div>
        
        <div className="absolute top-[65%] right-[25%] w-12 h-24">
          <motion.div 
            className="w-full h-full border-2 border-dashed border-purple-500/70 rounded-md"
            animate={{ 
              scale: [1, 1.05, 1],
              borderColor: ['rgba(168, 85, 247, 0.7)', 'rgba(168, 85, 247, 0.9)', 'rgba(168, 85, 247, 0.7)']
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <div className="absolute -top-5 -left-1 bg-purple-500/90 text-white text-xs px-2 py-0.5 rounded-sm">
              Person
            </div>
          </motion.div>
        </div>
      </div>
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