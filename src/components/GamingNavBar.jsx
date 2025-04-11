import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad, Menu, X, Sun, Moon, ChevronDown, 
  Code, Monitor, Globe, HeadsetIcon, Users, Zap, Rocket
} from 'lucide-react';

const GamingNavBar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const darkMode = theme === 'dark';
  
  // Handle scroll events for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Dynamic styling based on scroll position and theme
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md
    ${isScrolled 
      ? darkMode 
        ? 'bg-gray-900/90 shadow-lg shadow-blue-900/10'
        : 'bg-white/90 shadow-lg shadow-blue-200/30'
      : darkMode 
        ? 'bg-transparent' 
        : 'bg-transparent'}`;
  
  // Enhanced navigation items with gaming-themed sections
  const navItems = [
    { 
      name: 'Services',
      href: '#services',
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Game Programming', 
          description: 'Expert code optimization for seamless gameplay',
          href: '/services/game-programming',
          icon: <Code size={18} />
        },
        { 
          name: 'Game Design', 
          description: 'Engaging mechanics and captivating experiences',
          href: '/services/game-design',
          icon: <Monitor size={18} />
        },
        { 
          name: 'Cross-Platform', 
          description: 'Deploy across all major gaming platforms',
          href: '/services/cross-platform',
          icon: <Globe size={18} />
        },
        { 
          name: 'Audio Design', 
          description: 'Immersive soundscapes and SFX',
          href: '/services/audio-design',
          icon: <HeadsetIcon size={18} />
        }
      ]
    },
    { 
      name: 'Portfolio',
      href: '#portfolio',
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Mobile Games', 
          description: 'iOS and Android gaming experiences',
          href: '/portfolio/mobile',
          icon: <Zap size={18} />
        },
        { 
          name: 'PC & Console', 
          description: 'High-performance gaming for dedicated platforms',
          href: '/portfolio/pc-console',
          icon: <Gamepad size={18} />
        },
        { 
          name: 'VR & AR Games', 
          description: 'Immersive virtual reality experiences',
          href: '/portfolio/vr-ar',
          icon: <Rocket size={18} />
        }
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];
  
  // Handle dropdown functionality
  const handleDropdownToggle = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };
  
  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          {/* Logo area with gaming aesthetic */}
          <Link 
            to="/"
            className="flex items-center space-x-2 group"
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg
              ${darkMode
                ? 'bg-gradient-to-br from-blue-600/80 to-indigo-700/80'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600'
              } shadow-lg ${darkMode ? 'shadow-blue-700/20' : 'shadow-blue-500/30'}`
            }>
              <motion.div
                animate={{ 
                  rotate: [0, 15, 0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Gamepad size={24} className="text-white" />
              </motion.div>
            </div>
            <span className={`text-xl font-extrabold tracking-tight
              ${darkMode ? 'text-white' : 'text-gray-900'}`
            }>
              Game<span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Forge</span>
            </span>
            
            {/* Gaming pixel effect for logo on hover */}
            <div className="hidden sm:block">
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="relative"
              >
                <div className="absolute -right-6 -top-6">
                  <div className={`flex space-x-0.5 ${darkMode ? 'opacity-50' : 'opacity-30'}`}>
                    <div className={`w-1 h-1 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}></div>
                    <div className={`w-1 h-1 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'} rounded-full`}></div>
                    <div className={`w-1 h-1 ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'} rounded-full`}></div>
                  </div>
                  <div className={`flex space-x-0.5 mt-0.5 ${darkMode ? 'opacity-40' : 'opacity-20'}`}>
                    <div className={`w-1 h-1 ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'} rounded-full`}></div>
                    <div className={`w-1 h-1 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(index)}
                      className={`group inline-flex items-center text-base font-medium hover:text-blue-600 transition duration-150 ease-in-out
                        ${darkMode ? 'text-gray-200' : 'text-gray-700'}
                        ${activeDropdown === index ? (darkMode ? 'text-blue-400' : 'text-blue-700') : ''}`
                      }
                    >
                      {item.name}
                      <ChevronDown size={16} className={`ml-1 transform transition-transform
                        ${activeDropdown === index ? 'rotate-180' : 'rotate-0'}`
                      }/>
                    </button>
                    
                    {/* Gaming-styled dropdown menu */}
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute left-0 mt-4 w-80 rounded-xl overflow-hidden shadow-xl 
                            ${darkMode 
                              ? 'bg-gray-900 border border-gray-800 shadow-blue-900/20' 
                              : 'bg-white border border-gray-200 shadow-blue-200/30'} 
                            z-10`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br opacity-5
                            ${darkMode 
                              ? 'from-blue-900 via-indigo-900/50 to-transparent'
                              : 'from-blue-100 via-indigo-100/50 to-transparent'}`
                          }></div>
                                              
                          <div className="relative z-10">
                            <div className="py-3 px-2">
                              {item.dropdownItems.map((dropdownItem, i) => (
                                <motion.div
                                  key={i}
                                  whileHover={{ x: 4 }}
                                  className={`text-lg px-4 py-3 rounded-lg my-1 transition-colors
                                    ${darkMode 
                                      ? 'hover:bg-gray-800/60 hover:text-blue-400' 
                                      : 'hover:bg-blue-50/60 hover:text-blue-700'}`
                                  }
                                >
                                  <Link to={dropdownItem.href} className="flex items-start">
                                    <span className={`p-1.5 rounded mr-3 flex-shrink-0
                                      ${darkMode 
                                        ? 'bg-blue-900/40 text-blue-400' 
                                        : 'bg-blue-100 text-blue-700'}`
                                    }>
                                      {dropdownItem.icon}
                                    </span>
                                    <div>
                                      <div className="font-medium">{dropdownItem.name}</div>
                                      <p className={`text-sm mt-0.5 
                                        ${darkMode ? 'text-gray-400' : 'text-gray-500'}`
                                      }>
                                        {dropdownItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                                              
                            {/* Gaming-inspired pixelated border */}
                            <div className="px-6 py-2">
                              <div className={`h-0.5 w-full 
                                ${darkMode ? 'bg-gradient-to-r from-blue-800/60 to-indigo-800/60' : 'bg-gradient-to-r from-blue-100 to-indigo-100'}`}
                              ></div>
                              <div className="flex justify-between px-2">
                                {[...Array(8)].map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`w-1 h-1 ${
                                      darkMode 
                                        ? i % 2 ? 'bg-blue-700/60' : 'bg-indigo-700/60' 
                                        : i % 2 ? 'bg-blue-300/60' : 'bg-indigo-300/60'
                                    } rounded-full mt-1.5`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-base font-medium hover:text-blue-600 transition duration-150 ease-in-out
                      ${darkMode ? 'text-gray-200' : 'text-gray-700'}`
                    }
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          <div className="hidden md:flex items-center justify-end space-x-5">
            {/* Enhanced theme toggle with gaming effects */}
            <motion.button
              whileHover={{ rotate: [0, 15, 0, -15, 0], transition: { duration: 0.5 } }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`relative p-2 rounded-full transition-colors
                ${darkMode
                  ? 'bg-gray-800 hover:bg-gray-750 text-yellow-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`
              }
            >
              {darkMode ? (
                <>
                  <Sun size={20} />
                  <motion.div 
                    className="absolute inset-0 rounded-full opacity-20 z-0"
                    animate={{
                      boxShadow: [
                        '0 0 0 2px rgba(250, 204, 21, 0)',
                        '0 0 0 4px rgba(250, 204, 21, 0.2)',
                        '0 0 0 2px rgba(250, 204, 21, 0)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </>
              ) : (
                <>
                  <Moon size={20} />
                  <motion.div 
                    className="absolute inset-0 rounded-full opacity-20 z-0"
                    animate={{
                      boxShadow: [
                        '0 0 0 2px rgba(30, 64, 175, 0)',
                        '0 0 0 4px rgba(30, 64, 175, 0.2)',
                        '0 0 0 2px rgba(30, 64, 175, 0)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </>
              )}
            </motion.button>
            
            {/* Call-to-action button with gaming style */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm 
                ${darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-900/30'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/30'}`
              }
            >
              <Gamepad size={18} className="mr-2" />
              Start Project
            </motion.button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md
                ${darkMode
                  ? 'text-gray-200 hover:text-white hover:bg-gray-800'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`
              }
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden
              ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`
            }
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className={`w-full text-left px-3 py-3 rounded-md text-base font-medium flex justify-between items-center
                          ${darkMode 
                            ? activeDropdown === index ? 'bg-gray-800 text-blue-400' : 'text-gray-300 hover:bg-gray-800/60'
                            : activeDropdown === index ? 'bg-gray-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }
                      >
                        {item.name}
                        <ChevronDown size={16} className={`transform transition-transform
                          ${activeDropdown === index ? 'rotate-180' : 'rotate-0'}`
                        } />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1 pl-4"
                          >
                            {item.dropdownItems.map((dropdownItem, i) => (
                              <Link
                                key={i}
                                to={dropdownItem.href}
                                className={`flex items-center px-3 py-3 rounded-md text-sm
                                  ${darkMode 
                                    ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-400' 
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'}`
                                }
                              >
                                <span className={`p-1 rounded mr-2
                                  ${darkMode 
                                    ? 'bg-blue-900/40 text-blue-400' 
                                    : 'bg-blue-100 text-blue-700'}`
                                }>
                                  {dropdownItem.icon}
                                </span>
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-3 py-3 rounded-md text-base font-medium
                        ${darkMode 
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-400' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'}`
                      }
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className={`pt-2 mt-3 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center px-3 py-3">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    Theme
                  </span>
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full shadow-sm
                      ${darkMode
                        ? 'bg-gray-800 text-yellow-400'
                        : 'bg-gray-100 text-gray-700'}`
                    }
                  >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>
              </div>

              {/* CTA for mobile */}
              <div className="px-3 py-2">
                <button
                  className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-md
                    ${darkMode
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'}`
                  }
                >
                  <Gamepad size={18} className="mr-2" />
                  Start Your Gaming Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default GamingNavBar;