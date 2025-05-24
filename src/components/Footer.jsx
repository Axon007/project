import { motion } from "framer-motion";
import { ArrowRight, Mail, Facebook, Twitter, Linkedin, Instagram, Github, CheckCircle } from "lucide-react";
import { useState } from "react";
import { AnimatedSubscribeButton } from "./magicui/animated-subscribe-button";

const FooterWithNewsletter = ({
  newsletterTitle = "Stay Ahead of Innovation",
  newsletterSubtitle = "Get exclusive insights on enterprise technology trends and digital transformation",
  newsletterBadge = "Enterprise Newsletter"
}) => {
  const currentYear = new Date().getFullYear();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    // Here you would typically handle the actual subscription logic
    setIsSubscribed(true);
    // You could also add a timeout to reset the state after showing success
    // setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    
    <footer className="bg-background border-t border-secondary/10">
      
      {/* Newsletter Section - Mobile optimized */}
      


      {/* Footer Links Section - Mobile optimized */}
      <div className="max-w-7xl mx-auto py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Company info and links in mobile-friendly grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Company Info - full width on smallest screens */}
          <div className="col-span-2 md:col-span-2 space-y-5 md:space-y-6">
            <div>
              {/* Larger logo display without navigation */}
              <div className="inline-block">
                <span
                  className="relative px-4 py-2 font-bold text-xl md:text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 transition-all duration-300
                    before:absolute before:inset-0 before:border-2 before:border-primary/30 before:rounded-lg
                    before:transform before:transition-transform before:duration-300 hover:before:scale-105"
                >
                  JASON
                </span>
              </div>
            </div>
            <p className="text-foreground/70 text-xs md:text-sm leading-relaxed max-w-md">
              Empowering enterprises with cutting-edge technology solutions for the digital era. 
              We help businesses transform, innovate and succeed in a rapidly evolving marketplace.
            </p>
            
            {/* Social media links - responsive sizing */}
            <div className="flex flex-wrap gap-2 md:gap-4 pt-1">
              {[Facebook, Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-background flex items-center justify-center border border-secondary/20 text-foreground/60 hover:text-primary transition-all"
                  aria-label={`Social media link ${i+1}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links columns - stacked but still in columns on mobile */}
          <div className="col-span-1">
            <h3 className="text-sm md:text-base font-bold mb-3 md:mb-4 text-foreground/90">Company</h3>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Partners</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm md:text-base font-bold mb-3 md:mb-4 text-foreground/90">Services</h3>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Cloud Solutions</a></li>
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Consulting</a></li>
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Development</a></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm md:text-base font-bold mb-3 md:mb-4 text-foreground/90">Resources</h3>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Support</a></li>
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-xs md:text-sm text-foreground/70 hover:text-primary transition-colors">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with legal and copyright - better spacing on mobile */}
        <div className="mt-8 md:mt-12 pt-6 border-t border-secondary/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs md:text-sm text-foreground/60 text-center md:text-left">
            © {currentYear} Jason Tech Solutions. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4 md:mt-0">
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