import { motion } from "framer-motion";
import { ArrowRight, Mail, Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react";

const FooterWithNewsletter = ({
  newsletterTitle = "Stay Ahead of Innovation",
  newsletterSubtitle = "Get exclusive insights on enterprise technology trends and digital transformation",
  newsletterBadge = "Enterprise Newsletter"
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-secondary/10">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto pt-16 md:pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-b border-secondary/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-4 md:space-y-6">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {newsletterBadge}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              {newsletterTitle}
            </h3>
            <p className="text-foreground/70 text-base md:text-lg max-w-md">
              {newsletterSubtitle}
            </p>
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
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
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
            
            <div className="flex flex-wrap justify-center lg:justify-between text-xs text-foreground/50 gap-2 md:gap-4">
              <span>Enterprise solutions</span>
              <span aria-hidden="true" className="hidden lg:inline">•</span>
              <span>Weekly insights</span>
              <span aria-hidden="true" className="hidden lg:inline">•</span>
              <span>No spam policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center mr-3">
                <span className="text-primary font-bold text-xl">J</span>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Jason Tech Solutions
              </span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed max-w-md">
              Empowering enterprises with cutting-edge technology solutions for the digital era. 
              We help businesses transform, innovate and succeed in a rapidly evolving marketplace.
            </p>
            
            {/* Social media links */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Github">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links columns */}
          <div>
            <h3 className="text-base font-bold mb-4 text-foreground/90">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-bold mb-4 text-foreground/90">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Cloud Solutions</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Consulting</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Development</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-bold mb-4 text-foreground/90">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Support</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with legal and copyright */}
        <div className="mt-12 pt-8 border-t border-secondary/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-foreground/60">
            © {currentYear} Jason Tech Solutions. All rights reserved.
          </p>
          
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="text-xs text-foreground/60 hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-xs text-foreground/60 hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-xs text-foreground/60 hover:text-primary transition-colors">Cookies</a>
            <a href="#" className="text-xs text-foreground/60 hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterWithNewsletter;