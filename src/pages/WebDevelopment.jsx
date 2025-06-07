import { motion, useScroll, useTransform } from "framer-motion";
import { Meteors } from "../components/ui/meteor-effect";
import { Code, Palette, Globe, Users, Rocket, Smartphone, ArrowUpRight, CheckCircle, Shield, Clock, BadgeCheck, Cpu, Database, LayoutGrid, Gauge, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Terminal, TypingAnimation, AnimatedSpan } from "../components/magicui/terminal";
import { AnimatePresence } from "framer-motion";
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';
import { NumberTicker } from '../components/ui/number-ticker';

// Add the LineShadowText component
const LineShadowText = ({ children, shadowColor = "#8B5CF6", className = "", as = "span", ...props }) => {
  const Component = as;
  const content = typeof children === "string" ? children : null;

  if (!content) {
    throw new Error("LineShadowText only accepts string content");
  }

  return (
    <Component
      style={{ "--shadow-color": shadowColor }}
      className={`relative z-0 inline-flex
        after:absolute after:left-[0.04em] after:top-[0.04em] after:content-[attr(data-text)]
        after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]
        after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent
        after:animate-line-shadow ${className}`}
      data-text={content}
      {...props}
    >
      {content}
    </Component>
  );
};

// Add the AuroraText component
const AuroraText = ({ children, className = "", colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"], speed = 1 }) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: `${10 / speed}s`,
  };

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{children}</span>
      <span
        className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
        style={gradientStyle}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
};

// Add the keyframe for line-shadow animation to your CSS
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes line-shadow {
      0% {
        background-position: -100% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    .animate-line-shadow {
      animation: line-shadow 2s linear infinite;
    }
    @keyframes aurora {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    .animate-aurora {
      animation: aurora 10s linear infinite;
    }
    @keyframes float-blob {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      25% {
        transform: translate(5%, -2%) scale(1.03);
      }
      50% {
        transform: translate(0, 3%) scale(0.98);
      }
      75% {
        transform: translate(-5%, 1%) scale(1.01);
      }
    }
    .animate-float {
      animation: float-blob 15s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}

// Add AuroraBackground component
const AuroraBackground = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Main aurora blobs */}
      <div 
        className="absolute -top-1/4 -left-1/2 h-[50%] w-[100%] rounded-full bg-gradient-to-r from-violet-600/30 to-purple-600/30 blur-[64px] animate-float"
        style={{ animationDelay: "0s" }}
      />
      <div 
        className="absolute -right-1/4 -top-1/4 h-[50%] w-[60%] rounded-full bg-gradient-to-l from-indigo-600/20 via-blue-600/20 to-cyan-600/20 blur-[80px] animate-float"
        style={{ animationDelay: "-5s" }}
      />
      <div 
        className="absolute top-1/3 -right-1/4 h-[40%] w-[50%] rounded-full bg-gradient-to-tl from-pink-600/20 via-purple-600/20 to-indigo-600/20 blur-[64px] animate-float"
        style={{ animationDelay: "-2s" }}
      />
      <div 
        className="absolute bottom-0 left-1/4 h-[40%] w-[50%] rounded-full bg-gradient-to-tr from-blue-600/20 via-cyan-600/20 to-teal-600/20 blur-[96px] animate-float"
        style={{ animationDelay: "-8s" }}
      />
      
      {/* Overlay to control intensity */}
      <div className="absolute inset-0 bg-background/50"></div>
    </div>
  );
};

// Add InteractiveGridPattern component here
const InteractiveGridPattern = ({ width = 40, height = 40, squares = [24, 24], className, squaresClassName, ...props }) => {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={`absolute inset-0 h-full w-full border border-gray-400/30 ${className || ""}`}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={`stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000 ${
              hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent"
            } ${squaresClassName || ""}`}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
};

const features = [
  {
    name: 'Responsive Web Design',
    description:
      'All our websites are fully responsive, ensuring perfect display and functionality across all devices, from mobile phones to large desktop screens.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Advanced Security',
    description: 'We implement robust security measures including SSL certificates, regular updates, and secure authentication to protect your website and user data.',
    icon: LockClosedIcon,
  },
  {
    name: 'Performance Optimization',
    description: 'Our development process includes thorough optimization for speed and performance to ensure fast loading times and smooth user experience.',
    icon: ServerIcon,
  },
];



const IntegrationsSection = () => {
  const integrations = [
    {
      name: "GitHub",
      description: "Version control & collaboration",
      logo: "/images/github-logo.png",
      color: "rgb(139, 92, 246)" // Using CSS custom property
    },
    {
      name: "VS Code",
      description: "Integrated development environment",
      logo: "/images/vscode-logo.png",
      color: "rgb(139, 92, 246)"
    },
    {
      name: "Docker",
      description: "Containerization & deployment",
      logo: "/images/docker-logo.png",
      color: "rgb(236, 72, 153)"
    },
    {
      name: "AWS",
      description: "Cloud hosting & services",
      logo: "/images/aws-logo.png",
      color: "rgb(59, 130, 246)"
    },
    {
      name: "Netlify",
      description: "Continuous deployment platform",
      logo: "/images/netlify-logo.png",
      color: "rgb(139, 92, 246)"
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Y2K-inspired diagonal patterns - theme aware */}
      <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-30 mix-blend-overlay pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[120%] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_45%)]"></div>
        <div className="absolute top-[10%] left-[30%] w-[70%] h-[60%] rotate-[-35deg] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(236,72,153,0.1)_10px,rgba(236,72,153,0.1)_20px)]"></div>
        <div className="absolute bottom-0 right-0 w-[80%] h-[70%] rotate-12 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(59,130,246,0.1)_10px,rgba(59,130,246,0.1)_20px)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Asymmetrical header with retro elements */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 relative">
          <div className="md:w-2/3">
            {/* Glitchy, pixelated tag */}
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 bg-orange-500 text-white font-mono text-sm uppercase tracking-wider border-2 border-dashed border-orange-300 rotate-2 shadow-[5px_5px_0px_theme(colors.foreground)] dark:shadow-[5px_5px_0px_theme(colors.background)]">
              <div className="flex gap-1 mr-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                ))}
              </div>
              DevTools_Stack.exe
            </div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black mb-6 text-foreground"
            >
              Power your <br/>
              <div className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 italic">
                  d e v &nbsp; w o r k f l o w
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-pink-500/30 via-violet-500/30 to-cyan-500/30 -rotate-1"></div>
              </div>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:w-1/3 text-base md:text-lg text-muted-foreground md:text-right mt-4 md:mt-0 border-l-4 border-pink-500 pl-4 md:mb-2"
          >
            Seamless integration across your dev stack.<br/>
            Connect your favorite development tools for maximum productivity.
          </motion.p>

          {/* Decorative elements */}
          <div className="absolute right-0 top-0 -mt-10 hidden md:block">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
              <circle cx="60" cy="60" r="55" stroke="url(#circleGradient)" strokeWidth="2" strokeDasharray="4 4"/>
              <defs>
                <linearGradient id="circleGradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EC4899"/>
                  <stop offset="1" stopColor="#3B82F6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Y2K inspired integration showcase */}
        <div className="relative mb-20">
          <div className="flex flex-col items-center">
            {/* Main integration with embedded chatbox */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-2xl mb-16"
            >
              <div className="relative bg-gradient-to-r from-violet-600/20 to-pink-600/20 p-1 rounded-lg">
                <div className="bg-card rounded-md p-6 border border-border">
                  {/* Mock OS-style window */}
                  <div className="flex justify-between items-center border-b border-border pb-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono">integration_assistant.jsx</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">running...</div>
                  </div>
                  
                  {/* Chat-like integration interface */}
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-secondary text-foreground text-sm rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%] border border-border">
                        <div className="font-medium mb-1">DevOps Assistant</div>
                        Which development tool would you like to integrate?
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-violet-600 text-white text-sm rounded-2xl rounded-br-none px-4 py-2 max-w-[80%]">
                        GitHub & Docker
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-secondary text-foreground text-sm rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%] border border-border">
                        <div className="mb-2">Connecting to GitHub & Docker...</div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-[#181717] dark:bg-white rounded-md flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="currentColor" className="text-white dark:text-background"/>
                            </svg>
                          </div>
                          <div className="w-5 h-5 bg-[#2496ED] rounded-md flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M11.06 3.093l-.97.97a.186.186 0 00-.186.186v5.52a.186.186 0 00.186.186h1.888a.186.186 0 00.185-.186V4.249c0-.102-.083-.186-.185-.186h-.918z" fill="white"/>
                            </svg>
                          </div>
                          <div className="h-1.5 w-40 bg-secondary overflow-hidden rounded-full border border-border">
                            <motion.div 
                              className="h-full bg-green-400"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 1.5 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-secondary text-foreground text-sm rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%] border border-border">
                        <div className="font-medium text-green-400 flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Connected Successfully
                        </div>
                        <div className="mt-2">
                          <div className="text-xs text-muted-foreground mb-1">What would you like to enable?</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-background/50 border border-border rounded px-2 py-1 text-xs flex items-center gap-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 5.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 5.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.58v2.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 20.027c-3 .973-5.5 0-7-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Auto Deploy
                            </div>
                            <div className="bg-violet-600/30 border border-violet-500/50 rounded px-2 py-1 text-xs flex items-center gap-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              CI/CD Pipeline
                            </div>
                            <div className="bg-background/50 border border-border rounded px-2 py-1 text-xs flex items-center gap-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Build Notifications
                            </div>
                            <div className="bg-background/50 border border-border rounded px-2 py-1 text-xs flex items-center gap-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Issue Tracking
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Terminal-inspired prompt */}
                  <div className="mt-6 bg-background p-2 rounded flex items-center font-mono text-sm border border-border">
                    <span className="text-green-400 mr-2">❯</span>
                    <div className="text-foreground flex-1">enable --integration github --features auto-deploy ci-cd</div>
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="h-4 w-2 bg-foreground"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Split asymmetrical cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 -mt-8">
          {[
            {
              title: "Code Deployment",
              description: "Seamless deployment to production with zero-downtime updates and rollback capabilities",
              icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 5.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 5.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.58v2.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 20.027c-3 .973-5.5 0-7-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>),
              style: "md:col-span-1 rotate-1",
              color: "rgb(139, 92, 246)",
              boxStyle: "border-2 border-violet-500 bg-violet-500/10",
              buttonStyle: "border-violet-500 text-violet-400 hover:bg-violet-500/20"
            },
            {
              title: "Version Control",
              description: "Advanced Git workflows with branching strategies and collaborative development features",
              icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>),
              style: "md:col-span-2 -rotate-1",
              color: "rgb(236, 72, 153)",
              boxStyle: "border-2 border-pink-500 bg-pink-500/10",
              buttonStyle: "border-pink-500 text-pink-400 hover:bg-pink-500/20"
            },
            {
              title: "CI/CD Pipeline",
              description: "Automated testing, building, and deployment pipeline for consistent code quality",
              icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16V8A2 2 0 0019 6H5A2 2 0 003 8V16A2 2 0 005 18H19A2 2 0 0021 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>),
              style: "md:col-span-2 rotate-1",
              color: "rgb(59, 130, 246)",
              boxStyle: "border-2 border-blue-500 bg-blue-500/10",
              buttonStyle: "border-blue-500 text-blue-400 hover:bg-blue-500/20"
            },
            {
              title: "Performance Monitoring",
              description: "Real-time application monitoring with detailed performance metrics and alerts",
              icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13L9 7L13 11L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 21V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 21V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>),
              style: "md:col-span-1 -rotate-1",
              color: "rgb(16, 185, 129)",
              boxStyle: "border-2 border-emerald-500 bg-emerald-500/10",
              buttonStyle: "border-emerald-500 text-emerald-400 hover:bg-emerald-500/20"
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className={`group relative ${feature.style}`}
            >
              <div className={`rounded-xl p-5 ${feature.boxStyle}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-background/40 border border-border" style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-4 ml-14">{feature.description}</p>
                
                <div className="mt-4 ml-14">
                  <button className={`px-4 py-1 rounded-full text-sm font-medium border ${feature.buttonStyle} transition-colors flex items-center gap-1.5 group-hover:gap-2`}>
                    Learn More 
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* API Section - Code block with Y2K aesthetic */}
        <div className="mt-16">
          <div className="relative mx-auto max-w-4xl p-1 rounded-lg bg-gradient-to-r from-violet-500 via-pink-500 to-blue-500">
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden">
              {/* Left panel */}
              <div className="bg-background p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border border-border">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="inline-flex items-center px-2 py-1 rounded-md bg-secondary border border-border font-mono text-xs text-muted-foreground mb-3">
                      <span className="flex w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                      API access
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Deployment API</h3>
                    <p className="text-muted-foreground">
                      Automate your deployment pipeline with our <span className="text-violet-400">RESTful API</span> and GitHub webhooks.
                    </p>
                  </div>
                  
                  <div className="space-y-2.5 mb-6">
                    {[
                      "GitHub Actions integration",
                      "Docker container deployment", 
                      "Auto-scaling infrastructure",
                      "Rate limit: 5,000 builds/month"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 4L12 14.01L9 11.01" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="inline-block relative">
                    <button className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 transition-colors text-white rounded-md px-4 py-2 font-medium text-sm flex items-center gap-2">
                      View Deployment Guide
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {/* Y2K web design element */}
                    <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-pink-300 rounded-md -z-10"></div>
                  </div>
                </div>
                
                {/* Retro design elements */}
                <div className="absolute bottom-3 left-3">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                    <circle cx="30" cy="30" r="20" stroke="#EC4899" strokeWidth="1"/>
                    <circle cx="30" cy="30" r="15" stroke="#EC4899" strokeWidth="0.5"/>
                    <circle cx="30" cy="30" r="25" stroke="#EC4899" strokeWidth="0.5"/>
                  </svg>
                </div>
              </div>
              
              {/* Right panel - Code example */}
              <div className="bg-secondary p-6 font-mono text-sm border border-border">
                <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                  <div>deploy.yml</div>
                  <div className="flex items-center">
                    <span className="px-1.5 py-0.5 bg-background rounded mr-2 border border-border">YAML</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16H6C5.46957 16 4.96086 15.7893 4.58579 15.4142C4.21071 15.0391 4 14.5304 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V8" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14H18C19.1046 14 20 14.8954 20 16V18C20 19.1046 19.1046 20 18 20H10C8.89543 20 8 19.1046 8 18V16C8 14.8954 8.89543 14 10 14Z" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <div className="bg-background rounded p-4 text-green-400 overflow-x-auto border border-border">
                  <div className="text-muted-foreground"># GitHub Actions Deployment</div>
                  <div className="mt-2"><span className="text-pink-400">name:</span> <span className="text-yellow-300">Deploy to Production</span></div>
                  <br/>
                  <div><span className="text-pink-400">on:</span></div>
                  <div className="ml-2"><span className="text-pink-400">push:</span></div>
                  <div className="ml-4"><span className="text-pink-400">branches:</span> [<span className="text-yellow-300">main</span>]</div>
                  <br/>
                  <div><span className="text-pink-400">jobs:</span></div>
                  <div className="ml-2"><span className="text-pink-400">deploy:</span></div>
                  <div className="ml-4"><span className="text-pink-400">runs-on:</span> <span className="text-yellow-300">ubuntu-latest</span></div>
                  <div className="ml-4"><span className="text-pink-400">steps:</span></div>
                  <div className="ml-6">- <span className="text-pink-400">name:</span> <span className="text-yellow-300">Checkout code</span></div>
                  <div className="ml-8"><span className="text-pink-400">uses:</span> <span className="text-yellow-300">actions/checkout@v3</span></div>
                  <br/>
                  <div className="ml-6">- <span className="text-pink-400">name:</span> <span className="text-yellow-300">Build Docker image</span></div>
                  <div className="ml-8"><span className="text-pink-400">run:</span> <span className="text-yellow-300">docker build -t app .</span></div>
                  <br/>
                  <div className="ml-6">- <span className="text-pink-400">name:</span> <span className="text-yellow-300">Deploy to AWS</span></div>
                  <div className="ml-8"><span className="text-pink-400">run:</span> <span className="text-yellow-300">aws ecs update-service --cluster prod</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staggered CTA */}
        <div className="mt-20 max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-pink-600/20 rounded-xl blur-xl transform rotate-3"></div>
          
          <div className="relative bg-background border border-border rounded-xl p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-600/10 to-pink-600/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-secondary/50 text-muted-foreground text-sm mb-4">
                  <svg className="w-3.5 h-3.5 mr-1.5 text-pink-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 12L10 8V16L16 12Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Let's Build Together
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Start your dev<br/>project today
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  Connect your development workflow and ship faster with our integrated development platform.
                </p>
                
                <button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-pink-900/20 transition-all duration-300">
                  Start Development
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="relative">
                {/* Integration stats with Y2K-inspired design */}
                <div className="transform -rotate-2">
                  <div className="bg-card/80 border-2 border-border backdrop-blur-sm rounded-lg p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-foreground font-medium">Development Metrics</div>
                      <div className="text-xs text-muted-foreground font-mono">ACTIVE</div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: "Deployment Success", value: "99%", icon: "🚀" },
                        { label: "Build Minutes", value: "450", icon: "⚙️" },
                        { label: "Active Projects", value: "17", icon: "📂" }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md flex items-center justify-center bg-background border border-border">{stat.icon}</div>
                            <span className="text-muted-foreground">{stat.label}</span>
                          </div>
                          <div className="text-xl font-bold text-foreground">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span className="text-xs text-green-400">CI/CD pipeline operational</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative stickers */}
                <div className="absolute -top-4 -right-4 transform rotate-12 z-10">
                  <div className="bg-pink-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider shadow-lg">Pro</div>
                </div>
                
                <div className="absolute -bottom-2 -left-2 transform -rotate-6 z-10">
                  <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded shadow-lg">
                    CI/CD Ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

const THEME_ACCENT = {
  primary: "#8B5CF6", // Vibrant violet
  secondary: "#EC4899", // Hot pink
  tertiary: "#3B82F6", // Electric blue
  accent: "#10B981", // Neon green
  gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)"
};

function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl aspect-video bg-card border border-border"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-6 w-full">
          <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm">{project.description}</p>
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
      {/* Hero Section with Feature Overview */}
      <div className="overflow-hidden bg-background py-24 sm:py-32 relative">
        {/* Add AuroraBackground component */}
        <AuroraBackground className="z-0" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-10 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Left column with text content */}
            <div className="lg:pt-8 lg:pr-10 relative">
              {/* Remove Interactive Grid Pattern background */}
              <div className="hidden sm:mb-10 sm:flex sm:justify-start">
                <div className="relative rounded-full px-3 py-1 text-sm/6 text-muted-foreground ring-1 ring-border hover:ring-border/80 transition-colors">
                  Announcing our next round of funding.{' '}
                  <a href="#" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                    <span aria-hidden="true" className="absolute inset-0" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-left relative z-10">
                <h1 className="text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
                  <AuroraText 
                    colors={["#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD"]} 
                    speed={1.5}
                  >
                    Crafting
                  </AuroraText>{" "}
                  <br/>
                  <LineShadowText
                    shadowColor="#8B5CF6"
                    className="font-bold"
                  >
                    Digital Experiences
                  </LineShadowText>{" "}
                  <br/>
                  That Drive Results
                </h1>       
                <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
                  Custom web development solutions that transform your vision into powerful, scalable, and user-friendly websites designed to grow your business and engage your audience.
                </p>
                
                {/* Feature list with improved visuals */}
                <div className="mt-10 grid grid-cols-1 gap-y-8 text-sm">
                  {features.map((feature, index) => (
                    <div key={feature.name} className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <feature.icon className="size-4 text-primary" aria-hidden="true" />
                        <span className="font-semibold text-primary">{feature.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 flex items-center gap-x-6">
                  <a
                    href="#contact"
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors duration-200"
                  >
                    Schedule a consultation
                  </a>
                  <a href="#services" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all duration-200 hover:text-primary/80">
                    Explore services <span aria-hidden="true" className="transition-transform duration-200">→</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right column with image */}
            <div className="relative">
              {/* Remove Interactive Grid Pattern for the image side */}
              <img
                alt="Product screenshot"
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                width={1080}
                height={1442}
                className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-border sm:w-228 md:-ml-4 lg:-ml-0 relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
            {/* App Analytics Dashboard Showcase */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                <BarChart className="w-4 h-4 mr-2" /> Analytics & Insights
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Data-Driven App Development
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Our comprehensive analytics suite gives you actionable insights into user behavior and app performance.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "User Engagement Metrics",
                    description: "Track session duration, screen views, and interaction patterns to optimize the user journey."
                  },
                  {
                    title: "Performance Monitoring",
                    description: "Monitor app load times, API response rates, and crash reports for continuous improvement."
                  },
                  {
                    title: "Conversion Tracking",
                    description: "Measure and analyze key conversion events and sales funnels within your application."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-foreground/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">
              <NumberTicker value={98.7} decimalPlaces={1} />% Uptime
            </span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-1.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">
              <NumberTicker value={2.3} decimalPlaces={1} />s Average Load Time
            </span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-1.5">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">
              <NumberTicker value={42} />% Conversion Rate
            </span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Analytics dashboard mockup */}
              <div className="bg-secondary/5 backdrop-blur-sm rounded-xl border border-secondary/10 shadow-xl overflow-hidden">
                <div className="bg-background px-4 py-3 border-b border-secondary/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-foreground/60">App Analytics Dashboard</div>
                  <div className="w-5"></div>
                </div>
                <div className="p-6">
                  <img 
                    src="https://placehold.co/600x400/2a2a3c/FFFFFF/png?text=Analytics+Dashboard" 
                    alt="Analytics Dashboard" 
                    className="w-full h-auto rounded-lg shadow-sm"
                    loading="lazy"
                  />
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-xs text-foreground/60 mb-1">Active Users</div>
                      <div className="text-2xl font-bold">
              <NumberTicker value={24.8} decimalPlaces={1} />K
            </div>
                      <div className="text-xs text-green-500 mt-1">↑ 12% vs last week</div>
                    </div>
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-xs text-foreground/60 mb-1">Retention</div>
                      <div className="text-2xl font-bold">
              <NumberTicker value={76} />%
            </div>
                      <div className="text-xs text-green-500 mt-1">↑ 5% vs last week</div>
                    </div>
                    <div className="bg-background p-4 rounded-lg">
                      <div className="text-xs text-foreground/60 mb-1">Session Time</div>
                      <div className="text-2xl font-bold">
              <NumberTicker value={4} />:<NumberTicker value={32} />
            </div>
                      <div className="text-xs text-green-500 mt-1">↑ 18% vs last week</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full filter blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-500/10 rounded-full filter blur-xl"></div>
            </div>
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


      <IntegrationsSection/>


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
                className="relative p-6 rounded-2xl bg-background border border-border backdrop-blur-sm hover:border-primary/30 transition-all group overflow-hidden"
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
                  <h3 className="text-lg font-semibold text-foreground">{tech.name}</h3>
                </div>
                
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden border border-border">
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
                    className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
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
                className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Ready to Start Your Web Project?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
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