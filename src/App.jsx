import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const WebDevelopment = lazy(() => import('./pages/WebDevelopment'));
const GamingDevServices = lazy(() => import('./pages/GameDevelopment '));
const LogoDesign = lazy(() => import('./pages/LogoDesign'));
const VideoEditing = lazy(() => import('./pages/VideoEditing'));
const AppDevelopment = lazy(() => import('./pages/AppDevelopment'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const ARVRServices = lazy(() => import('./pages/ar'));
const Social = lazy(() => import('./pages/Social'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function AppContent() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Get currentPage from pathname
  const getCurrentPage = () => {
    const path = location.pathname.substring(1); // Remove leading slash
    return path || 'home';
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar theme={theme} toggleTheme={toggleTheme} currentPage={getCurrentPage()} />
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/about" element={<About />} />
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/game-development" element={<GamingDevServices theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/logo-design" element={<LogoDesign />} />
            <Route path="/video-editing" element={<VideoEditing />} />
            <Route path="/app-development" element={<AppDevelopment theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/computer-vision" element={<ARVRServices />} />
            <Route path="/social" element={<Social />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;