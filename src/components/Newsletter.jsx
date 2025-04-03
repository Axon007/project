import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Newsletter = ({ 
  title = "Stay Ahead of Innovation",
  subtitle = "Get exclusive insights on enterprise technology trends and digital transformation",
  badge = "Enterprise Newsletter",
  features = [],
  className = ""
}) => {
  return (
    <section className={`py-20 px-4 bg-gradient-to-b from-secondary/5 to-background relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center gap-12 backdrop-blur-sm bg-background/30 rounded-2xl p-8 border border-primary/10">
          <div className="flex-1 space-y-4">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {badge}
            </span>
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              {title}
            </h3>
            <p className="text-foreground/70 text-lg">
              {subtitle}
            </p>
            
            {features.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-foreground/60">
                    <div className="text-primary">{feature.icon}</div>
                    <span>{feature.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your business email"
                aria-label="Email address for newsletter"
                className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button 
                aria-label="Subscribe to updates"
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                Subscribe to Updates
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex items-center justify-between text-xs text-foreground/50">
              <span>Enterprise solutions</span>
              <span aria-hidden="true">•</span>
              <span>Weekly insights</span>
              <span aria-hidden="true">•</span>
              <span>No spam policy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;