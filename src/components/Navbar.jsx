import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSun, HiMoon } from 'react-icons/hi';
import { User } from 'lucide-react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

// Main navigation links with Services as dropdown
const NAVIGATION_LINKS = [
  { name: 'Services', path: '#', hasDropdown: true },
  { name: 'Consulting', path: '/consulting' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' }
];

// Services for dropdown
const SERVICES = [
  {
    title: "Cloud Services",
    href: "/cloud-services",
    description: "Secure and scalable cloud solutions for your business.",
    src: "/api/placeholder/100/100"
  },
  {
    title: "Cyber Security",
    href: "/cyber-security",
    description: "Protect your data with our advanced security services.",
    src: "/api/placeholder/100/100"
  },
  {
    title: "AI Services",
    href: "/ai-services",
    description: "Leverage AI technology to optimize your business processes.",
    src: "/api/placeholder/100/100"
  },
  {
    title: "Data Analytics",
    href: "/data-analytics",
    description: "Gain insights from your data with our analytics solutions.",
    src: "/api/placeholder/100/100"
  }
];

// Product Item component for services dropdown
const ProductItem = ({ title, href, src, description, toggleMenu, setShowServicesDropdown }) => {
  const handleClick = () => {
    // First close the dropdown with animation
    setShowServicesDropdown(false);
    // Then close mobile menu after animation completes
    setTimeout(() => {
      toggleMenu();
    }, 300); // Match this with your transition duration
  };

  return (
    <Link 
      to={href} 
      className="group flex flex-col space-y-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <img src={src} alt={title} className="w-12 h-12 rounded-lg object-cover" />
        <div>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-foreground/70">{description}</p>
        </div>
      </div>
    </Link>
  );
};

function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [servicesHoverTimer, setServicesHoverTimer] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress between 0 and 50px (for smooth transitions)
      const progress = Math.min(window.scrollY / 50, 1);
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen resizes to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Clear any timers on unmount
  useEffect(() => {
    return () => {
      if (servicesHoverTimer) clearTimeout(servicesHoverTimer);
    };
  }, [servicesHoverTimer]);

  const ThemeIcon = useMemo(() => {
    return theme === 'light' ? (
      <HiMoon className="w-5 h-5" />
    ) : (
      <HiSun className="w-5 h-5" />
    );
  }, [theme]);
  
  // Toggle menu function
  const toggleMenu = () => {
    if (window.innerWidth < 768) {
      setIsOpen(!isOpen);
    }
  };

  // Improved hover handling for services menu
  const handleServicesMouseEnter = () => {
    if (servicesHoverTimer) clearTimeout(servicesHoverTimer);
    setShowServicesDropdown(true);
  };

  const handleServicesMouseLeave = () => {
    // Use a delay to prevent the menu from closing immediately
    const timer = setTimeout(() => {
      setShowServicesDropdown(false);
    }, 200);
    setServicesHoverTimer(timer);
  };

  // Re-enter menu handling
  const handleServicesExpandedMouseEnter = () => {
    if (servicesHoverTimer) clearTimeout(servicesHoverTimer);
  };

  // Dynamic styles based on scroll progress for smooth transition
  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Container animation variants for link staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Item variants for staggered link animation
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Services section animation variants
  const servicesVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Updated style variables
  const bgOpacity = showServicesDropdown ? 1 : (0.95 + scrollProgress * 0.05);
  const borderOpacity = 0.1 + scrollProgress * 0.1;
  const borderRadius = isScrolled ? 16 : 0;
  const horizontalPadding = isScrolled ? '1.5rem' : '2rem';
  const containerMaxWidth = isScrolled ? 'max-w-6xl' : 'max-w-full';
  const containerMargin = isScrolled ? 'mx-4 sm:mx-8' : 'mx-0';

  const topPosition = 4 * scrollProgress; // 0 to 4px
  // Increased blur amount for better effect
  const blurAmount = showServicesDropdown ? 16 : 8; // More pronounced blur effect

  return (
    <>
      {/* Overlay with blur effect - Mobile only */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-md bg-black/90 transition-all duration-500 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <motion.nav
        initial="initial"
        animate="visible"
        variants={navbarVariants}
        className="fixed z-50 transition-all duration-500 ease-in-out transform-gpu w-full flex justify-center"
        style={{
          top: `${topPosition}px`,
        }}
      >
        <motion.div
          className={`flex flex-col w-full ${containerMaxWidth} ${containerMargin} overflow-hidden ${
            isOpen ? "h-screen md:h-auto" : "h-auto"
          }`}
          style={{
            backgroundColor: showServicesDropdown 
              ? theme === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
              : `rgba(var(--background-rgb), ${bgOpacity})`,
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`, // For Safari
            borderRadius: `${borderRadius}px`,
            padding: `${isScrolled ? '0.75rem' : '1.25rem'} ${horizontalPadding}`,
            border: isScrolled 
              ? `1px solid ${theme === 'light' 
                  ? `rgba(0, 0, 0, ${borderOpacity})` 
                  : `rgba(255, 255, 255, ${borderOpacity})`}`
              : 'none',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: showServicesDropdown ? (theme === 'light' ? '0 8px 30px rgba(0, 0, 0, 0.1)' : '0 8px 30px rgba(0, 0, 0, 0.3)') : 'none'
          }}
        >
          <motion.div 
            className="flex justify-between items-center w-full relative z-50"
            animate={{
              scale: 0.95 + (1 - scrollProgress) * 0.05,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            {/* Left Section with Logo & Burger */}
            <div className="flex items-center gap-4">
              <div
                onClick={toggleMenu}
                className="relative cursor-pointer group md:hidden"
              >
                <User 
                  className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 ${
                    isOpen 
                      ? "text-white" 
                      : theme === 'light'
                        ? "text-black/80 group-hover:text-black"
                        : "text-white/80 group-hover:text-white"
                  }`}
                />
                <div
                  className={`absolute -bottom-2 left-1/2 w-5 h-0.5 -translate-x-1/2 transition-all duration-300 ${
                    isOpen
                      ? "bg-white rotate-180 scale-x-150"
                      : theme === 'light'
                        ? "bg-black/80 group-hover:bg-black group-hover:scale-x-150"
                        : "bg-white/80 group-hover:bg-white group-hover:scale-x-150"
                  }`}
                />
              </div>
              
              <Link to="/" className="text-2xl font-bold py-2 flex-shrink-0">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
                  className={`bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 ${
                    isOpen
                      ? "text-white translate-x-2 md:text-primary"
                      : "text-primary hover:translate-x-2"
                  }`}
                >
                  TechSolutions
                </motion.span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex space-x-2 lg:space-x-6 flex-wrap justify-end"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {NAVIGATION_LINKS.map(({ name, path, hasDropdown }, index) => (
                <motion.div 
                  key={name} 
                  variants={itemVariants} 
                  custom={index} 
                  className="py-2 relative"
                  onMouseEnter={hasDropdown ? handleServicesMouseEnter : undefined}
                  onMouseLeave={hasDropdown ? handleServicesMouseLeave : undefined}
                >
                  <Link 
                    to={path} 
                    className={`relative ${showServicesDropdown && hasDropdown ? 'text-foreground' : 'text-foreground/80'} hover:text-foreground transition-colors py-1 px-2 whitespace-nowrap flex items-center gap-1`}
                  >
                    {name}
                    {hasDropdown && <ChevronDown size={16} className={`transition-transform duration-300 ${showServicesDropdown ? 'rotate-180' : ''}`} />}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <motion.button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="p-2 md:p-3 rounded-xl bg-secondary text-secondary-foreground hover:opacity-80 transition-opacity"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {ThemeIcon}
              </motion.button>
            </div>
          </motion.div>

          {/* Services Expanded Section - Desktop */}
          <AnimatePresence>
            {showServicesDropdown && (
              <motion.div
                variants={servicesVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="hidden md:block w-full border-t border-border mt-4 pt-4"
                onMouseEnter={handleServicesExpandedMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SERVICES.map((service) => (
                    <ProductItem 
                      key={service.title}
                      title={service.title}
                      href={service.href}
                      src={service.src}
                      description={service.description}
                      toggleMenu={toggleMenu}
                      setShowServicesDropdown={setShowServicesDropdown}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Navigation */}
          <div
            className={`transition-all duration-500 md:hidden ${
              isOpen
                ? "opacity-100 mt-20 h-[calc(100vh-8rem)]"
                : "opacity-0 mt-0 h-0 pointer-events-none"
            }`}
          >
            <div className="max-w-md">
              <nav className="flex flex-col space-y-8">
                {/* Mobile Services Header */}
                <div className="text-gray-400 text-3xl flex flex-col gap-2">
                  <div className="flex items-center gap-3 group">
                    <span className="relative overflow-hidden text-white">
                      Services
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white" />
                    </span>
                  </div>
                  
                  {/* Mobile Services Submenu */}
                  <div className="ml-4 mt-4 space-y-4">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.title}
                        to={service.href}
                        onClick={toggleMenu} // Close menu when clicking on service item
                        className="text-gray-400 hover:text-white text-xl flex items-center gap-3 group transition-all duration-300 transform hover:translate-x-3"
                      >
                        <span className="relative overflow-hidden">
                          {service.title}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Other mobile menu items */}
                {NAVIGATION_LINKS.filter(link => link.name !== 'Services').map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={toggleMenu}
                    className="text-gray-400 hover:text-white text-3xl flex items-center gap-3 group transition-all duration-300 transform hover:translate-x-3"
                  >
                    <span className="relative overflow-hidden">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}

export default Navbar;