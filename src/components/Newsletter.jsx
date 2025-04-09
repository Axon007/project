import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const Newsletter = ({ 
  title = "Stay Ahead of Innovation",
  subtitle = "Get exclusive insights on enterprise technology trends and digital transformation",
  badge = "Enterprise Newsletter",
  features = [],
  className = ""
}) => {
  return (
    <section className={`py-16 md:py-24 px-4 bg-background border-t border-b border-secondary/10 relative ${className}`}>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-4 md:space-y-6">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {badge}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              {title}
            </h3>
            <p className="text-foreground/70 text-base md:text-lg max-w-md">
              {subtitle}
            </p>
            
            {features.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4 md:mt-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-foreground/60">
                    <div className="text-primary">{feature.icon}</div>
                    <span>{feature.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full space-y-6">
            <motion.div 
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="Your business email"
                  aria-label="Email address for newsletter"
                  className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <button 
                aria-label="Subscribe to updates"
                className="w-full bg-primary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                Subscribe to Updates
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
            

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;