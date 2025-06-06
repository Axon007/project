import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeProvider from './components/ThemeProvider';

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

  // Get currentPage from pathname
  const getCurrentPage = () => {
    const path = location.pathname.substring(1); // Remove leading slash
    return path || 'home';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={getCurrentPage()} />
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/game-development" element={<GamingDevServices />} />
            <Route path="/logo-design" element={<LogoDesign />} />
            <Route path="/video-editing" element={<VideoEditing />} />
            <Route path="/app-development" element={<AppDevelopment />} />
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
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;