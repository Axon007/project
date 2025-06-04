import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const BentoServicesSection = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern frameworks and technologies.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      gradient: "from-blue-600/70 to-purple-600/70",
      features: ["Responsive Design", "Performance Optimization", "SEO-friendly"]
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android platforms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12" y2="18"></line>
        </svg>
      ),
      gradient: "from-primary/70 to-blue-600/70",
      features: ["iOS & Android", "Intuitive UI/UX", "Performance Optimized"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that create intuitive and engaging digital experiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      ),
      gradient: "from-blue-600/70 to-primary/70",
      features: ["User Research", "Wireframing", "Prototype Testing"]
    },
    {
      title: "Cloud Services",
      description: "Scalable cloud infrastructure and solutions that grow with your business needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M17 9a5 5 0 0 0-10 0"></path>
          <line x1="12" y1="4" x2="12" y2="9"></line>
          <line x1="8" y1="9" x2="16" y2="9"></line>
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
          <path d="M20.71 16.9a2 2 0 0 0-2.83 0L13 22"></path>
        </svg>
      ),
      gradient: "from-violet-600/70 to-indigo-600/70",
      features: ["Scalable Architecture", "24/7 Monitoring", "Data Security"]
    }
  ];
  return (    <section className="py-24 px-4 relative bg-secondary/5 overflow-hidden">
      {/* Abstract shapes for background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto relative z-10"><div className="text-center mb-16">
          <motion.span 
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="text-lg text-foreground/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Explore our range of innovative solutions designed to elevate your business
            to new heights with cutting-edge technology.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (            <motion.div 
              key={index} 
              className="relative bg-background rounded-3xl overflow-hidden border border-secondary/10 shadow-md h-[400px] group hover:shadow-xl hover:border-primary/20 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}></div>
              
              {/* Light effect animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                animate={{ 
                  x: ['-100%', '100%'],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  repeatDelay: 0.5
                }}
              />
              
              <div className="relative h-full p-8 flex flex-col justify-between text-white">
                <div>
                  <div className="p-3 bg-white/20 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/80">{service.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-white" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <a href="#" className="inline-flex items-center text-sm text-white font-medium">
                      Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoServicesSection;