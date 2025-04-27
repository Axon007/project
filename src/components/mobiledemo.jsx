import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Zap, Shield, Cpu, ArrowUpRight } from 'lucide-react';

const features = [
  {
    title: "Lightning Fast Performance",
    description: "Built with performance in mind for smooth user experiences across all devices.",
    icon: <Zap className="w-6 h-6 text-primary" />,
    delay: 0.1
  },
  {
    title: "Secure By Design",
    description: "Enterprise-level security integrated at every level of the development process.",
    icon: <Shield className="w-6 h-6 text-primary" />,
    delay: 0.2
  },
  {
    title: "Smart AI Integration",
    description: "Leverage the power of artificial intelligence to enhance app functionality.",
    icon: <Cpu className="w-6 h-6 text-primary" />,
    delay: 0.3
  }
];

const FeatureCard = ({ feature }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: feature.delay }}
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
  >
    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
      {feature.icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
    <a href="#" className="flex items-center text-primary font-medium group">
      Learn more 
      <ArrowUpRight size={16} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </a>
  </motion.div>
);

const FeaturesSectionDemo = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full inline-block">
            Core Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            Designed for Modern App Development
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Our platform includes everything you need to build, deploy, and scale your mobile applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
          >
            View All Features
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSectionDemo;