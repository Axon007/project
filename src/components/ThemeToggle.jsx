import React from 'react';
import { motion } from 'framer-motion';
import { MoonStar, Sun } from 'lucide-react';
import { useThemeContext } from './ThemeProvider';

/**
 * ThemeToggle component
 * Button to toggle between light and dark themes
 */
const ThemeToggle = ({ className = '', size = 18 }) => {
  const { theme, toggleTheme } = useThemeContext();
  
  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={`p-2.5 rounded-full bg-secondary/50 hover:bg-secondary/80 backdrop-blur-sm text-foreground/80 hover:text-foreground transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {theme === 'light' ? <MoonStar size={size} /> : <Sun size={size} />}
    </motion.button>
  );
};

export default ThemeToggle; 