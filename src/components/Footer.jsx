import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, ArrowRight, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ theme }) => {
  // Determine theme colors based on theme prop
  const isDark = theme === 'dark';
  
  const themeColors = {
    bg: isDark ? 'bg-[#09090B]' : 'bg-gray-50',
    text: isDark ? 'text-white' : 'text-foreground',
    textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
    textHeading: isDark ? 'text-gray-200' : 'text-gray-900',
    primary: isDark ? 'bg-[#1E56F0]' : 'bg-primary',
    primaryHover: isDark ? 'hover:bg-[#1a4ad8]' : 'hover:bg-primary/90',
    borderColor: isDark ? 'border-gray-800' : 'border-gray-200',
    inputBg: isDark ? 'bg-[#1A1D23]' : 'bg-white',
    inputBorder: isDark ? 'border-gray-700' : 'border-gray-300',
    watermark: isDark ? 'text-[#3B3D45]' : 'text-gray-200',
    iconHover: isDark ? 'hover:text-[#1E56F0]' : 'hover:text-primary',
    ring: isDark ? 'ring-[#1E56F0]' : 'ring-primary',
  };

  return (
    <footer className={`${themeColors.bg} ${themeColors.text} py-16 px-4 sm:px-6 relative transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Company and socials */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center mr-3">
                <span className="text-primary font-bold text-xl">J</span>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Jason Tech Solutions
              </span>
            </div>
            
            <p className={`${themeColors.textMuted} mb-6 max-w-md`}>
              Empowering enterprises with cutting-edge technology solutions for the digital era. 
              We help businesses transform, innovate and succeed in a rapidly evolving marketplace.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className={`${themeColors.textMuted} ${themeColors.iconHover} p-2 rounded-full hover:bg-gray-800/10 transition-all`}>
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className={`${themeColors.textMuted} ${themeColors.iconHover} p-2 rounded-full hover:bg-gray-800/10 transition-all`}>
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className={`${themeColors.textMuted} ${themeColors.iconHover} p-2 rounded-full hover:bg-gray-800/10 transition-all`}>
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className={`${themeColors.textMuted} ${themeColors.iconHover} p-2 rounded-full hover:bg-gray-800/10 transition-all`}>
                <Linkedin size={18} />
              </a>
              <a href="#" aria-label="GitHub" className={`${themeColors.textMuted} ${themeColors.iconHover} p-2 rounded-full hover:bg-gray-800/10 transition-all`}>
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>About</Link></li>
              <li><Link to="/" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>Careers</Link></li>
              <li><Link to="/" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>Blog</Link></li>
              <li><Link to="/" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/web-development" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>Web Development</Link></li>
              <li><Link to="/logo-design" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>Logo Design</Link></li>
              <li><Link to="/video-editing" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>Video Editing</Link></li>
              <li><Link to="/game-development" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>Game Development</Link></li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>Privacy Policy</Link></li>
              <li><Link to="/" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>Terms of Service</Link></li>
              <li><Link to="/" className={`text-sm ${themeColors.textMuted} ${themeColors.iconHover} transition-colors`}>Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className={`${themeColors.textMuted} mr-3 h-5 w-5 shrink-0 mt-0.5`} />
                <span className={`text-sm ${themeColors.textMuted}`}>123 Innovation Street,<br/>San Francisco, CA 94103</span>
              </div>
              <div className="flex items-center">
                <Phone className={`${themeColors.textMuted} mr-3 h-5 w-5 shrink-0`} />
                <span className={`text-sm ${themeColors.textMuted}`}>(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className={`${themeColors.textMuted} mr-3 h-5 w-5 shrink-0`} />
                <span className={`text-sm ${themeColors.textMuted}`}>info@jason-tech.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter and Copyright */}
        <div className={`mt-16 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            {/* Newsletter Form */}
            <div className="flex-1 max-w-lg">
              <h3 className={`font-medium mb-2 ${themeColors.textHeading}`}>Subscribe to our newsletter</h3>
              <p className={`text-sm ${themeColors.textMuted} mb-4`}>
                Stay up to date with the latest news, updates, and offerings from our team
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[240px]">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className={`${themeColors.inputBg} ${themeColors.text} w-full px-4 py-2.5 rounded-lg border ${themeColors.inputBorder} focus:outline-none focus:ring-1 ${themeColors.ring}`}
                  />
                </div>
                <button 
                  type="submit"
                  className={`${themeColors.primary} ${themeColors.primaryHover} text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all`}
                >
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="mt-8 md:mt-0">
              <p className={`text-sm ${themeColors.textMuted}`}>
                &copy; {new Date().getFullYear()} Jason Tech Solutions.<br className="md:hidden" /> All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
//f6965170140611d76ac5066ec916b753f3c4b611