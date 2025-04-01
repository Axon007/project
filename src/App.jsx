import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CloudServices from './pages/CloudServices';
import Consulting from './pages/Consulting';
import CyberSecurity from './pages/CyberSecurity';
import AIServices from './pages/AIServices';
import DataAnalytics from './pages/DataAnalytics';

function AppContent() {
  const location = useLocation();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/cloud-services" element={<CloudServices />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/cyber-security" element={<CyberSecurity />} />
          <Route path="/ai-services" element={<AIServices />} />
          <Route path="/data-analytics" element={<DataAnalytics />} />
        </Routes>
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