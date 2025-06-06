import React, { createContext, useContext } from 'react';
import useTheme from '../hooks/useTheme';

// Create theme context
export const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {}
});

// Custom hook to use theme context
export const useThemeContext = () => useContext(ThemeContext);

/**
 * ThemeProvider component
 * Provides theme context to the entire application
 */
export const ThemeProvider = ({ children }) => {
  const themeState = useTheme();
  
  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 