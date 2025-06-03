import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoonStar, Sun, Menu, X, ArrowUpRight, ChevronDown, Code, Cloud, Brain, Gamepad2, Palette, VideoIcon, Share2 } from 'lucide-react';

const NAVIGATION_LINKS = [
  { name: 'Services', path: '#', hasDropdown: true },
  { name: 'Consulting', path: '/consulting' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' }
];

const SERVICES = [
  {
    title: "Web Development",
    href: "/web-development",
    description: "Custom websites and progressive web apps built with modern technologies.",
    icon: <Code className="w-5 h-5 text-primary" />
  },
  {
    title: "App Development",
    href: "/app-development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    icon: <Cloud className="w-5 h-5 text-primary" />
  },
  {
    title: "Computer Vision",
    href: "/computer-vision",
    description: "AR/VR solutions and immersive experiences that transform reality.",
    icon: <Brain className="w-5 h-5 text-primary" />
  },
  {
    title: "Game Development",
    href: "/game-development",
    description: "Immersive gaming experiences across multiple platforms and engines.",
    icon: <Gamepad2 className="w-5 h-5 text-primary" />
  },
  {
    title: "Logo Design",
    href: "/logo-design",
    description: "Professional branding solutions that capture your brand's essence.",
    icon: <Palette className="w-5 h-5 text-primary" />
  },
  {
    title: "Video Editing",
    href: "/video-editing",
    description: "Professional video editing and post-production services.",
    icon: <VideoIcon className="w-5 h-5 text-primary" />
  },
  {
    title: "Social Media",
    href: "/social",
    description: "Strategic social media management to grow your brand's online presence.",
    icon: <Share2 className="w-5 h-5 text-primary" />
  }
];

// Animation variants
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 22,
      mass: 0.9
    }
  }
};

const dropdownVariants = {
  hidden: { 
    opacity: 0,
    y: -10,
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1]
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      mass: 0.8,
      staggerChildren: 0.07,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  }
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1],
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const mobileItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 }
};

// Memoized components
const ServiceItem = memo(({ service, handleItemClick }) => (
  <motion.div variants={itemVariants}>
    <Link 
      to={service.href} 
      className="group flex flex-col p-4 rounded-2xl hover:bg-secondary/20 transition-all duration-200 relative overflow-hidden"
      onClick={handleItemClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="mt-1 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
          {service.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
            {service.title}
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </h3>
          <p className="text-sm text-foreground/60 mt-1 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </Link>
  </motion.div>
));

const NavLink = memo(({ name, path, hasDropdown, handleMouseEnter, handleMouseLeave, isActive }) => (
  <motion.div 
    variants={itemVariants}
    className="relative group"
    onMouseEnter={hasDropdown ? handleMouseEnter : undefined}
    onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
  >
    <Link 
      to={path} 
      className={`relative text-base font-medium ${
        isActive ? 'text-primary' : 'text-foreground/80'
      } hover:text-primary transition-colors duration-300 py-2 px-3 flex items-center gap-1.5`}
    >
      {name}
      {hasDropdown && (
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${isActive ? 'rotate-180 text-primary' : ''}`} 
        />
      )}
    </Link>
    
    <motion.span
      className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-primary to-primary/50 rounded-full"
      initial={{ width: isActive ? "100%" : "0%" }}
      animate={{ width: isActive ? "100%" : "0%" }}
      whileHover={{ width: "100%" }}
      transition={{ duration: 0.2 }}
    />
  </motion.div>
));

function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleServicesMouseEnter = useCallback(() => {
    setShowServicesDropdown(true);
  }, []);

  const handleServicesMouseLeave = useCallback(() => {
    setShowServicesDropdown(false);
  }, []);

  const handleItemClick = useCallback(() => {
    setShowServicesDropdown(false);
    setIsOpen(false);
  }, []);

  // Handle scroll events with throttling for better performance
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      if (scrollTimeout) return;
      
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const scrollProgress = Math.min(scrollTop / 100, 1);
        
        setScrollDistance(scrollProgress);
        setIsScrolled(scrollTop > 20);
        scrollTimeout = null;
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Fixed: Better body scroll lock management
  useEffect(() => {
    if (isOpen) {
      // Store original body style
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Get scrollbar width to prevent layout shift when locking scroll
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Apply scroll lock with padding to prevent layout shift
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      return () => {
        // Restore original body style
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Dynamic navbar styles based on scroll position and theme
  const navbarBackgroundColor = showServicesDropdown 
    ? theme === 'dark' ? 'rgba(13, 13, 13, 0.98)' : 'rgba(255, 255, 255, 0.98)'
    : (isScrolled 
      ? (theme === 'dark' ? `rgba(13, 13, 13, ${0.6 + scrollDistance * 0.3})` : `rgba(255, 255, 255, ${0.6 + scrollDistance * 0.3})`)
      : 'transparent');

  const navbarBorderOpacity = isScrolled ? 0.08 + scrollDistance * 0.08 : 0;
  const navbarShadow = isScrolled 
    ? (theme === 'dark' 
      ? `0 4px 30px rgba(0, 0, 0, ${0.1 + scrollDistance * 0.2})` 
      : `0 4px 30px rgba(0, 0, 0, ${0.04 + scrollDistance * 0.05})`)
    : 'none';

  const navbarStyle = {
    backgroundColor: navbarBackgroundColor,
    backdropFilter: isScrolled ? `blur(${8 + scrollDistance * 8}px)` : 'none',
    WebkitBackdropFilter: isScrolled ? `blur(${8 + scrollDistance * 8}px)` : 'none',
    borderBottom: isScrolled ? `1px solid ${theme === 'dark' ? `rgba(255, 255, 255, ${navbarBorderOpacity})` : `rgba(0, 0, 0, ${navbarBorderOpacity})`}` : 'none',
    boxShadow: navbarShadow,
    height: isScrolled ? '70px' : '90px',
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg lg:hidden"
            onClick={() => setIsOpen(false)} // Close menu when clicking overlay
          />
        )}
      </AnimatePresence>

      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="fixed top-0 z-50 w-full transition-all duration-300 ease-in-out"
        style={navbarStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link to="/" className="relative z-50">
              <motion.div 
                className="text-2xl font-bold flex items-center"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  JASON
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {NAVIGATION_LINKS.map((link) => (
                <NavLink 
                  key={link.name}
                  name={link.name}
                  path={link.path}
                  hasDropdown={link.hasDropdown}
                  handleMouseEnter={link.hasDropdown ? handleServicesMouseEnter : undefined}
                  handleMouseLeave={link.hasDropdown ? handleServicesMouseLeave : undefined}
                  isActive={link.hasDropdown && showServicesDropdown}
                />
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className={`p-2.5 rounded-full ${
                  isScrolled 
                    ? 'bg-secondary/80 hover:bg-secondary' 
                    : 'bg-secondary/50 hover:bg-secondary/80'
                } backdrop-blur-sm text-foreground/80 hover:text-foreground transition-all duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {theme === 'light' ? <MoonStar size={18} /> : <Sun size={18} />}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="p-2.5 rounded-full bg-secondary/50 hover:bg-secondary/80 backdrop-blur-sm text-foreground/80 hover:text-foreground lg:hidden transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>

          {/* Services Dropdown - Desktop */}
          <AnimatePresence>
            {showServicesDropdown && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute left-0 right-0 hidden lg:block mt-2 pt-2 z-40"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <div className={`w-full overflow-hidden rounded-xl ${
                  theme === 'dark' ? 'bg-background/95' : 'bg-background/95'
                } backdrop-blur-xl shadow-2xl border border-border/40`}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-6 max-w-7xl mx-auto">
                    {SERVICES.map((service) => (
                      <ServiceItem 
                        key={service.title} 
                        service={service} 
                        handleItemClick={handleItemClick} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile Menu - Fixed: Removed height animation causing scroll issues */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed top-[70px] inset-x-0 z-40 lg:hidden"
            style={{ maxHeight: 'calc(100vh - 70px)', overflowY: 'auto' }}
          >
            <div className="bg-background/95 backdrop-blur-xl px-4 pb-8 pt-6">
              <div className="max-w-md mx-auto">
                {/* Mobile Services Section */}
                <motion.div variants={mobileItemVariants} className="mb-10">
                  <div className="text-lg font-medium text-primary mb-4 border-b border-border pb-2">
                    Services
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-2">
                    {SERVICES.map((service) => (
                      <motion.div
                        key={service.title}
                        variants={mobileItemVariants}
                        className="group"
                      >
                        <Link
                          to={service.href}
                          onClick={handleItemClick}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/20 transition-all duration-200"
                        >
                          <div className="mt-0.5 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                            {service.icon}
                          </div>
                          <div>
                            <div className="text-foreground font-medium group-hover:text-primary transition-colors duration-200 flex items-center gap-1">
                              {service.title}
                              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-200" />
                            </div>
                            <p className="text-xs text-foreground/60 mt-0.5 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Other Nav Links */}
                <motion.nav variants={mobileItemVariants} className="flex flex-col space-y-3">
                  {NAVIGATION_LINKS.filter(link => link.name !== 'Services').map((link) => (
                    <motion.div key={link.name} variants={mobileItemVariants}>
                      <Link
                        to={link.path}
                        onClick={handleItemClick}
                        className="block py-3 px-2 text-foreground hover:text-primary border-b border-border/50 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{link.name}</span>
                          <ArrowUpRight size={16} className="text-foreground/40 group-hover:text-primary" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;