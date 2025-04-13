import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, ArrowRight } from 'lucide-react';

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
    <footer className={`${themeColors.bg} ${themeColors.text} py-[60px] px-4 sm:px-6 relative transition-colors duration-300`}>
      <div className="container mx-auto">
        {/* Main layout with custom positioning */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-4">
          {/* Quick Links Section */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 flex flex-col items-start">
            <h3 className="text-[16px] font-bold mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-[10px]">
              <li><a href="#" className={`text-[15px] leading-6 ${themeColors.iconHover} transition`}>Home</a></li>
              <li><a href="#" className={`text-[15px] leading-6 ${themeColors.iconHover} transition`}>About us</a></li>
              <li><a href="#" className={`text-[15px] leading-6 ${themeColors.iconHover} transition`}>Pricing</a></li>
            </ul>
          </div>

          {/* Our Services Section - directly adjacent to Quick Links */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 flex flex-col items-start">
            <h3 className="text-[16px] font-bold mb-6 uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-[10px]">
              <li><a href="#" className={`text-[15px] leading-6 ${themeColors.iconHover} transition`}>Website Development</a></li>
              <li><a href="#" className={`text-[15px] leading-6 ${themeColors.iconHover} transition`}>Mobile App Development</a></li>
              <li><a href="#" className={`text-[15px] leading-6 ${themeColors.iconHover} transition`}>AI/ML Solutions</a></li>
              <li><a href="#" className={`text-[15px] leading-6 ${themeColors.iconHover} transition`}>E-Commerce Solutions</a></li>
              <li><a href="#" className={`text-[15px] leading-6 ${themeColors.iconHover} transition`}>Creative Design</a></li>
              <li><a href="#" className={`text-[15px] leading-6 ${themeColors.iconHover} transition`}>Website Maintenance</a></li>
            </ul>
          </div>

          {/* Spacing column */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Center Section with Logo and Social Icons */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2 flex flex-col items-center justify-center mt-8 md:mt-0">
            <h2 className="text-[40px] md:text-[60px] font-bold tracking-[2px] mb-6">JASON</h2>
            
            {/* Social Media Icons */}
            <div className="flex space-x-[16px] mb-8">
              <a href="#" aria-label="Facebook" className={`${themeColors.iconHover} transition`}>
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Twitter" className={`${themeColors.iconHover} transition`}>
                <Twitter size={24} />
              </a>
              <a href="#" aria-label="Instagram" className={`${themeColors.iconHover} transition`}>
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className={`${themeColors.iconHover} transition`}>
                <Linkedin size={24} />
              </a>
              <a href="#" aria-label="YouTube" className={`${themeColors.iconHover} transition`}>
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Spacing column */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* CTA Section */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col items-center md:items-end justify-center mt-6 md:mt-0">
            <button 
              type="button" 
              className={`${themeColors.primary} ${themeColors.primaryHover} text-white font-medium h-[50px] px-[20px] rounded-[30px] transition flex items-center`}
            >
              Let's Discuss
              <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>

        {/* Newsletter Section (Full Width) */}
        <div className="mt-16 md:mt-24 flex flex-col items-center text-center">
          <h3 className={`text-[18px] font-medium mb-2 ${themeColors.textHeading}`}>Subscribe to our newsletter</h3>
          <p className={`text-[14px] ${themeColors.textMuted} leading-[22px] mb-6 max-w-lg`}>
            Join our newsletter and receive weekly updates and resources from the jason team.
          </p>
          
          {/* Email Form */}
          <form className="w-full max-w-[500px]">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  className={`${themeColors.inputBg} border ${themeColors.inputBorder} ${themeColors.text} w-full h-[50px] px-4 rounded-[25px] focus:outline-none focus:ring-2 ${themeColors.ring}`}
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <Mail size={20} className={themeColors.textMuted} />
                </div>
              </div>
              <button 
                type="submit" 
                className={`${themeColors.primary} ${themeColors.primaryHover} text-white font-medium h-[50px] px-[30px] rounded-[25px] transition`}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Large Watermark */}
        <div className="absolute left-0 -bottom-10 md:bottom-[-40px] opacity-50 -z-0 overflow-hidden">
          <h2 className={`${themeColors.watermark} text-[100px] md:text-[180px] font-extrabold leading-none`}>JASON</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;