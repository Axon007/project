import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/theme.css'

// Add script to prevent flash of unstyled content
const script = document.createElement('script');
script.innerHTML = `
  (function() {
    // Check for saved theme preference or use OS preference
    const theme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply theme class immediately to prevent flash
    document.documentElement.classList.add(theme === 'dark' ? 'dark' : 'light');
    
    // Add no-transitions class to prevent transitions on page load
    document.documentElement.classList.add('no-transitions');
    
    // Remove no-transitions class after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.documentElement.classList.remove('no-transitions');
      }, 100);
    });
  })();
`;
document.head.appendChild(script);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
