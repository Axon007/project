import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoonStar, Sun, User, ArrowUpRight, ChevronDown, Cloud, Shield, Brain, BarChart, Code, Gamepad2, Palette, VideoIcon } from 'lucide-react';

// Constants moved outside component to prevent recreation on render
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
  }
];

// Animation variants moved outside to prevent recreation
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

// Memoized ProductItem component to prevent unnecessary re-renders
const ProductItem = memo(({ title, href, icon, description, handleItemClick }) => (
  <Link 
    to={href} 
    className="group flex flex-col space-y-2 p-4 rounded-xl hover:bg-secondary/50 transition-all duration-300"
    onClick={handleItemClick}
  >
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-foreground/60 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </Link>
));

// Memoized NavLink component for desktop navigation
const NavLink = memo(({ name, path, hasDropdown, handleMouseEnter, handleMouseLeave, showServicesDropdown }) => (
  <motion.div 
    variants={itemVariants}
    className="py-2 relative"
    onMouseEnter={hasDropdown ? handleMouseEnter : undefined}
    onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
  >
    <Link 
      to={path} 
      className={`relative text-base font-medium ${
        showServicesDropdown && hasDropdown 
          ? 'text-foreground' 
          : 'text-foreground/80'
      } hover:text-foreground transition-colors duration-300 py-1.5 px-3 whitespace-nowrap flex items-center gap-1.5`}
    >
      {name}
      {hasDropdown && (
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-300 ${
            showServicesDropdown ? 'rotate-180' : ''
          }`} 
        />
      )}
      <motion.span
        className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary"
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  </motion.div>
));

// Main Navbar component
function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  // Memoized handlers to prevent recreation on each render
  const toggleMenu = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsOpen(prev => !prev);
    }
  }, []);

  const handleServicesMouseEnter = useCallback(() => {
    setShowServicesDropdown(true);
  }, []);

  const handleServicesMouseLeave = useCallback(() => {
    setShowServicesDropdown(false);
  }, []);

  const handleProductItemClick = useCallback(() => {
    setShowServicesDropdown(false);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  // Scroll handler with cleanup
  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 50, 1);
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Resize handler with cleanup
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Control body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Theme icon - memoized using variable instead of useMemo
  const themeIcon = theme === 'light' ? (
    <MoonStar className="w-5 h-5" />
  ) : (
    <Sun className="w-5 h-5" />
  );
  
  // Computed values for styling
  const bgOpacity = showServicesDropdown ? 1 : (0.95 + scrollProgress * 0.05);
  const borderOpacity = 0.1 + scrollProgress * 0.1;
  const borderRadius = isScrolled ? 16 : 0;
  const horizontalPadding = isScrolled ? '1.5rem' : '2rem';
  const containerMaxWidth = isScrolled ? 'max-w-6xl' : 'max-w-full';
  const containerMargin = isScrolled ? 'mx-4 sm:mx-8' : 'mx-0';
  const topPosition = 4 * scrollProgress;
  const blurAmount = showServicesDropdown ? 16 : 8;

  // Computed background style
  const navbarStyle = {
    top: `${topPosition}px`,
  };

  const containerStyle = {
    backgroundColor: showServicesDropdown 
      ? theme === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
      : `rgba(var(--background-rgb), ${bgOpacity})`,
    backdropFilter: isScrolled ? `blur(${blurAmount}px)` : 'none',
    WebkitBackdropFilter: isScrolled ? `blur(${blurAmount}px)` : 'none',
    borderRadius: `${borderRadius}px`,
    padding: `${isScrolled ? '0.75rem' : '1.25rem'} ${horizontalPadding}`,
    border: isScrolled 
      ? `1px solid ${theme === 'light' 
          ? `rgba(0, 0, 0, ${borderOpacity})` 
          : `rgba(255, 255, 255, ${borderOpacity})`}`
      : 'none',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: showServicesDropdown 
      ? (theme === 'light' ? '0 8px 30px rgba(0, 0, 0, 0.1)' : '0 8px 30px rgba(0, 0, 0, 0.3)') 
      : 'none'
  };

  return (
    <>
      {/* Mobile overlay */}
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
        style={navbarStyle}
      >
        <motion.div
          className={`flex flex-col w-full ${containerMaxWidth} ${containerMargin} overflow-hidden ${
            isOpen ? "h-screen md:h-auto" : "h-auto"
          }`}
          style={containerStyle}
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
                  className={`relative px-4 py-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 
                    before:absolute before:inset-0 before:border-2 before:border-primary/50 before:rounded-lg
                    before:transform before:transition-transform before:duration-300 before:hover:scale-105
                    ${
                      isOpen
                        ? "text-white translate-x-2 md:text-primary before:border-white md:before:border-primary"
                        : "text-primary hover:translate-x-2"
                    }`}
                >
                  JASON
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
              {NAVIGATION_LINKS.map(({ name, path, hasDropdown }) => (
                <NavLink
                  key={name}
                  name={name}
                  path={path}
                  hasDropdown={hasDropdown}
                  handleMouseEnter={hasDropdown ? handleServicesMouseEnter : undefined}
                  handleMouseLeave={hasDropdown ? handleServicesMouseLeave : undefined}
                  showServicesDropdown={showServicesDropdown}
                />
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
                {themeIcon}
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
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SERVICES.map((service) => (
                    <ProductItem 
                      key={service.title}
                      title={service.title}
                      href={service.href}
                      icon={service.icon}
                      description={service.description}
                      handleItemClick={handleProductItemClick}
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
                <div className="text-2xl font-medium text-gray-400 flex flex-col gap-6">
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
                        onClick={toggleMenu}
                        className="text-gray-400 hover:text-white flex items-center gap-3 group transition-all duration-300 transform hover:translate-x-3"
                      >
                        <span className="relative overflow-hidden">
                          {service.title}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
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
                {NAVIGATION_LINKS.filter(link => link.name !== 'Services').map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={toggleMenu}
                    className="text-gray-400 hover:text-white flex items-center gap-3 group transition-all duration-300 transform hover:translate-x-3"
                  >
                    <span className="relative overflow-hidden">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight
                      size={16}
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