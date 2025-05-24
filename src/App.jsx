import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'));
const WebDevelopment = lazy(() => import('./pages/WebDevelopment'));
const GamingDevServices = lazy(() => import('./pages/GameDevelopment '));
const LogoDesign = lazy(() => import('./pages/LogoDesign'));
const VideoEditing = lazy(() => import('./pages/VideoEditing'));
const AppDevelopment = lazy(() => import('./pages/AppDevelopment'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const ARVRServices = lazy(() => import('./pages/ar'));
const Social = lazy(() => import('./pages/Social'));
const Demo = lazy(() => import('./pages/demo'));

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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/game-development" element={<GamingDevServices theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/logo-design" element={<LogoDesign />} />
            <Route path="/video-editing" element={<VideoEditing />} />
            <Route path="/app-development" element={<AppDevelopment />} />
            <Route path="/computer-vision" element={<ARVRServices />} />
            <Route path="/social" element={<Social />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/demo" element={<Demo />} />
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