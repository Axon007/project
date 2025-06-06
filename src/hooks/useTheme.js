import { useState, useEffect } from 'react';

/**
 * Custom hook for theme management
 * Handles theme switching and persists user preference
 * 
 * @returns {Object} Theme state and functions
 */
export const useTheme = () => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply theme class to document and store in localStorage
  useEffect(() => {
    const root = document.documentElement;
    
    // Add transition class for smooth theme changes
    root.classList.add('theme-transition');
    
    // Toggle dark class
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Store preference
    localStorage.setItem('theme', theme);
    
    // Remove transition class after transition completes to prevent transition on page load
    const transitionTimeout = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);
    
    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Set theme function (for explicitly setting theme)
  const setThemeExplicitly = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setTheme(newTheme);
    }
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme: setThemeExplicitly
  };
};

export default useTheme; 