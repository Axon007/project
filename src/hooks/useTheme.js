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
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return 'light';
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Fall back to system preference
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      console.warn('Could not detect system theme preference:', error);
      return 'light';
    }
  });

  // Apply theme class to document and store in localStorage
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Temporarily disable transitions to prevent flash
    root.classList.add('theme-transitioning');
    
    // Remove any existing theme classes
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Apply new theme
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.add('light');
      body.classList.add('light');
      root.setAttribute('data-theme', 'light');
    }
    
    // Store preference
    localStorage.setItem('theme', theme);
    
    // Re-enable transitions after a short delay
    const transitionTimeout = setTimeout(() => {
      root.classList.remove('theme-transitioning');
      root.classList.add('theme-transition');
      
      // Remove theme-transition class after transition completes
      setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 300);
    }, 10);
    
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