import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraBackground } from "../components/AuroraBackground";
import { PinContainer } from "../components/ui/3d-pin";
import { CardContainer, CardItem } from "../components/ui/floating-card";
import FooterWithNewsletter from "../components/FooterWithNewsletter";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import FAQSection from "../components/contact/FAQSection";
import { ArrowUpRight, Globe, Code, Smartphone, Database, Gauge, Palette, Users, Rocket, Shield, MoonStar, Sun, Search, Languages, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Newsletter from "../components/Newsletter";
import { cn } from "../lib/utils";

// Color palette
const COLORS = {
  primary: "#7b61ff",
  secondary: "#1e293b",
  accent: "#fbbf24",
  gradient: "linear-gradient(90deg, #7b61ff 0%, #fbbf24 100%)",
  darkBg: "#18181b",
  lightBg: "#f8fafc"
};

// Modern font stack
const FONT_FAMILY = "'Sora', 'Inter', 'Urbanist', 'system-ui', sans-serif";

// Device mockup illustration (placeholder)
const DeviceMockup = () => (
  <div className="relative mx-auto w-64 h-40 md:w-96 md:h-56 flex items-center justify-center">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-violet-500 shadow-2xl border-4 border-white/20 dark:border-zinc-900/60"
    />
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-28 md:w-80 md:h-44 bg-background/80 rounded-2xl shadow-lg border border-primary/20 flex items-center justify-center"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      <Globe className="w-16 h-16 text-primary/70" />
    </motion.div>
  </div>
);

// Mouse-following blob
const MouseBlob = () => {
  const blobRef = useRef();
  useEffect(() => {
    const moveBlob = (e) => {
      if (blobRef.current) {
        blobRef.current.style.left = `${e.clientX - 60}px`;
        blobRef.current.style.top = `${e.clientY - 60}px`;
      }
    };
    window.addEventListener("mousemove", moveBlob);
    return () => window.removeEventListener("mousemove", moveBlob);
  }, []);
  return (
    <motion.div
      ref={blobRef}
      className="fixed z-40 pointer-events-none hidden md:block"
      style={{ left: 0, top: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.18 }}
      transition={{ duration: 1 }}
    >
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-violet-500 blur-2xl opacity-80 animate-pulse-slow" />
    </motion.div>
  );
};

// Language switcher
const LanguageSwitcher = ({ lang, setLang }) => (
  <div className="flex items-center gap-2">
    <Languages className="w-5 h-5 text-primary" />
    <select
      aria-label="Switch language"
      value={lang}
      onChange={e => setLang(e.target.value)}
      className="bg-background border border-primary/20 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary/30"
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
      <option value="fr">FR</option>
    </select>
  </div>
);

// Cookie consent banner
const CookieConsent = ({ show, onAccept }) => show ? (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-background/90 dark:bg-zinc-900/90 border border-primary/20 rounded-xl shadow-lg px-6 py-4 flex items-center gap-4 backdrop-blur-md"
    role="dialog"
    aria-live="polite"
  >
    <span className="text-sm text-foreground/80">We use cookies to improve your experience. By using our site, you agree to our <a href="#" className="text-primary underline">cookie policy</a>.</span>
    <button
      onClick={onAccept}
      className="ml-4 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus-ring"
    >Accept</button>
  </motion.div>
) : null;

// Live chat placeholder
const LiveChat = () => (
  <motion.div
    className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 }}
  >
    <button
      aria-label="Open live chat"
      className="bg-primary text-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform focus-ring"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
    <span className="text-xs bg-background/80 px-3 py-1 rounded shadow border border-primary/10 mt-1">Chat with us</span>
  </motion.div>
);

// Search bar
const SearchBar = ({ value, setValue }) => (
  <div className="relative w-full max-w-xs">
    <input
      type="search"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Search services..."
      aria-label="Search services"
      className="w-full px-4 py-2 rounded-xl border border-primary/20 bg-background focus:ring-2 focus:ring-primary/20 text-sm"
    />
    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/60 w-4 h-4" />
  </div>
);

// Animated statistics
const AnimatedStat = ({ value, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="flex flex-col items-center justify-center p-4 rounded-xl bg-background/60 dark:bg-zinc-900/60 shadow-lg border border-primary/10 min-w-[120px]"
  >
    <span className="text-3xl md:text-4xl font-bold text-gradient-primary" style={{ fontFamily: FONT_FAMILY }}>{value}</span>
    <span className="text-sm text-foreground/70 mt-1">{label}</span>
  </motion.div>
);

// Service cards
const SERVICES = [
  {
    title: "Custom Website Development",
    description: "Bespoke, high-performance websites tailored to your brand and goals.",
    icon: <Code className="w-8 h-8 text-primary" />, features: ["Responsive design", "SEO optimization", "Custom features"],
    gradient: "from-primary/20 to-violet-500/20"
  },
  {
    title: "E-Commerce Solutions",
    description: "Secure, scalable online stores with seamless user experience.",
    icon: <Globe className="w-8 h-8 text-primary" />, features: ["Product management", "Payments", "Order tracking"],
    gradient: "from-purple-500/20 to-blue-500/20"
  },
  {
    title: "Progressive Web Apps",
    description: "Mobile-first, app-like experiences for the modern web.",
    icon: <Smartphone className="w-8 h-8 text-primary" />, features: ["Offline support", "Fast loading", "Installable"],
    gradient: "from-indigo-500/20 to-cyan-500/20"
  },
  {
    title: "API & Backend Development",
    description: "Robust APIs and backend systems for any scale.",
    icon: <Database className="w-8 h-8 text-primary" />, features: ["REST/GraphQL", "Integrations", "Authentication"],
    gradient: "from-blue-500/20 to-teal-500/20"
  },
  {
    title: "Performance Optimization",
    description: "Lightning-fast sites with best-in-class Core Web Vitals.",
    icon: <Gauge className="w-8 h-8 text-primary" />, features: ["Speed testing", "Caching", "Code splitting"],
    gradient: "from-orange-500/20 to-pink-500/20"
  },
  {
    title: "Branding & UI Design",
    description: "Modern, memorable digital identities and interfaces.",
    icon: <Palette className="w-8 h-8 text-primary" />, features: ["Logo design", "Style guides", "UI kits"],
    gradient: "from-fuchsia-500/20 to-rose-500/20"
  }
];

// Testimonials data
const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    designation: "Marketing Director, Fashion Retailer",
    src: "https://randomuser.me/api/portraits/women/56.jpg",
    quote: "The team delivered a stunning e-commerce website that exceeded our expectations. Sales have increased by 40% since launch!"
  },
  {
    name: "David Chen",
    designation: "CTO, FinTech Startup",
    src: "https://randomuser.me/api/portraits/men/42.jpg",
    quote: "Their development team built our web application from concept to launch in record time. The code quality is exceptional."
  },
  {
    name: "Emily Rodriguez",
    designation: "CEO, Marketing Agency",
    src: "https://randomuser.me/api/portraits/women/56.jpg",
    quote: "We've partnered with them for all our client websites. Their attention to detail and responsive designs are unmatched."
  },
  {
    name: "Michael Taylor",
    designation: "Product Manager, SaaS Company",
    src: "https://randomuser.me/api/portraits/men/65.jpg",
    quote: "The custom CMS they built has transformed how we manage content. Our team loves how intuitive and powerful it is."
  }
];

// Main page component
const WebDevelopment = () => {
  // State
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');
  const [search, setSearch] = useState('');
  const [cookieConsent, setCookieConsent] = useState(false);

  // Filtered services for search
  const filteredServices = SERVICES.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Accessibility: focus ring
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cookie consent on mount
  useEffect(() => {
    if (localStorage.getItem('cookieConsent')) setCookieConsent(true);
  }, []);
  const acceptCookies = () => {
    setCookieConsent(true);
    localStorage.setItem('cookieConsent', 'true');
  };

  return (
    <div className={cn("min-h-screen bg-lightBg dark:bg-darkBg text-foreground transition-colors duration-500", theme === 'dark' && 'dark')}
      style={{ fontFamily: FONT_FAMILY }}>
      {/* Mouse-following blob */}
      <MouseBlob />
      {/* Aurora animated background */}
      <AuroraBackground className="fixed inset-0 -z-10" />
      {/* Navbar replacement: top bar with theme, lang, search */}
      <header className="w-full flex items-center justify-between px-4 md:px-12 py-4 bg-background/80 dark:bg-zinc-900/80 shadow-lg backdrop-blur-md sticky top-0 z-40 border-b border-primary/10">
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">JASON</Link>
        <div className="flex items-center gap-4">
          <SearchBar value={search} setValue={setSearch} />
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <button
            aria-label="Toggle dark mode"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-xl bg-secondary text-secondary-foreground hover:opacity-80 transition-opacity focus-ring"
          >
            {theme === 'light' ? <MoonStar className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] py-16 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <AuroraBackground />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500 leading-tight"
          style={{ fontFamily: FONT_FAMILY }}
        >
          Web Development <br />
          <span className="text-gradient-primary">That Drives Results</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-8"
        >
          We create custom, high-performance websites and web applications that help businesses transform their digital presence.
        </motion.p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <motion.a
            href="#contact"
            className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Project <ArrowUpRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="#services"
            className="bg-background border border-primary/30 text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/5 transition-colors hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Services
          </motion.a>
        </div>
        {/* Social proof */}
        <div className="flex flex-wrap gap-6 justify-center mb-8">
          <AnimatedStat value="150+" label="Projects Completed" />
          <AnimatedStat value="98%" label="Client Satisfaction" />
          <AnimatedStat value="5+" label="Years Experience" />
          <AnimatedStat value="24/7" label="Support" />
        </div>
        {/* Device mockup illustration */}
        <DeviceMockup />
      </section>

      {/* Services/Features Section */}
      <section id="services" className="py-24 px-4 bg-gradient-to-br from-background to-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-center mb-16"
          >
            Comprehensive Web Development Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
              <CardContainer key={service.title} className="hover-lift">
                <CardItem translateZ={20} className={cn("rounded-3xl p-8 bg-gradient-to-br", service.gradient, "shadow-xl border border-primary/10 glass")}> 
                  <div className="mb-6 p-3 rounded-xl bg-primary/10 w-fit backdrop-blur-sm">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gradient-primary">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/60">
                        <Shield className="w-4 h-4 text-primary" /> {feature}
                      </li>
                    ))}
                  </ul>
                </CardItem>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 px-4 bg-secondary/30" id="technologies">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Technologies We Master
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB", level: "95%" },
              { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933", level: "90%" },
              { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E", level: "98%" },
              { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6", level: "88%" },
              { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26", level: "95%" },
              { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#000000", level: "85%" },
              { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", color: "#DD0031", level: "80%" },
              { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", color: "#4FC08D", level: "85%" }
            ].map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="relative p-6 rounded-2xl bg-background border backdrop-blur-sm hover:border-primary/30 transition-all group overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${tech.color}, transparent 70%)` }}
                ></div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img src={tech.icon} alt={tech.name} className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold">{tech.name}</h3>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${tech.color}, rgba(123, 97, 255, 0.5))`, width: tech.level }}
                    initial={{ width: 0 }}
                    whileInView={{ width: tech.level }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-primary font-medium">{tech.level}</span>
                  <motion.span
                    className="text-xs text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {idx % 2 === 0 ? "Expert" : "Advanced"}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies/Testimonials Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/30" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            What Our Clients Say
          </motion.h2>
          <AnimatedTestimonials testimonials={TESTIMONIALS} autoplay />
        </div>
      </section>

      {/* Workflow/Process Section */}
      <section className="py-20 px-4" id="process">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Our Development Process
          </motion.h2>
          {/* Reuse InteractiveProcessTimeline or a simplified timeline here if needed */}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-background to-secondary/20" id="pricing">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-center mb-16"
          >
            Transparent & Flexible Pricing
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "$2,499",
                description: "Perfect for small businesses getting started online",
                features: ["5-page responsive website", "Basic SEO setup", "Contact form integration", "Mobile-friendly design", "Social media integration", "3 months of support"],
                popular: false
              },
              {
                name: "Professional",
                price: "$4,999",
                description: "Ideal for growing businesses with specific needs",
                features: ["10-page responsive website", "Advanced SEO optimization", "Content management system", "Blog setup and integration", "Email marketing integration", "Custom contact forms", "Performance optimization", "6 months of support"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$9,999+",
                description: "Comprehensive solution for established businesses",
                features: ["Unlimited pages", "Custom web application features", "E-commerce functionality", "Advanced security features", "API integrations", "Custom database design", "Performance optimization", "User authentication system", "12 months of priority support"],
                popular: false
              }
            ].map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={cn("rounded-3xl overflow-hidden border", plan.popular ? 'border-primary bg-primary/5 relative shadow-xl shadow-primary/10' : 'border-border bg-secondary')}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">Most Popular</div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {!plan.price.includes('+') && <span className="text-foreground/60 mb-1">one-time</span>}
                  </div>
                  <p className="text-foreground/70 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-primary mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={cn("block text-center py-3 px-6 rounded-full font-medium transition-colors", plan.popular ? 'bg-primary text-white hover:bg-primary/90' : 'bg-background border border-primary/30 hover:bg-primary/5')}>Get Started</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics/Performance Metrics Section */}
      <section className="py-20 px-4 bg-secondary/30" id="analytics">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Analytics & Performance Metrics
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedStat value="99.9%" label="Uptime" />
            <AnimatedStat value="<1s" label="Avg. Load Time" />
            <AnimatedStat value="100+ TB" label="Data Served" />
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-secondary/20" id="integrations">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Integrations & Capabilities
          </motion.h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {["Shopify", "Stripe", "AWS", "Vercel", "Zapier", "Google Analytics", "Mailchimp", "Slack"].map((integration, idx) => (
              <motion.div
                key={integration}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="px-6 py-3 rounded-xl bg-background/80 border border-primary/10 shadow hover:bg-primary/10 hover-lift text-sm font-medium text-primary/90"
              >
                {integration}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-secondary/30" id="faq">
        <FAQSection />
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 px-4 bg-gradient-to-br from-background to-secondary/20" id="newsletter">
        <Newsletter />
      </section>

      {/* Contact Section (with form, social, etc.) */}
      <section className="py-24 px-4" id="contact">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Ready to Start Your Project?
          </motion.h2>
          <form className="max-w-2xl mx-auto bg-background/80 dark:bg-zinc-900/80 rounded-2xl shadow-lg p-8 space-y-6 border border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input type="text" id="name" className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your name" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your email" required />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <input type="text" id="subject" className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Project subject" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea id="message" rows="5" className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Tell us about your project..." required></textarea>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-primary focus:ring-primary" required />
                <span className="text-sm text-foreground/70">I agree to the <a href="#" className="text-primary hover:underline">privacy policy</a></span>
              </label>
            </div>
            <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer with newsletter and social links */}
      <FooterWithNewsletter />
      {/* Cookie consent banner */}
      <AnimatePresence>{!cookieConsent && <CookieConsent show={!cookieConsent} onAccept={acceptCookies} />}</AnimatePresence>
      {/* Live chat widget placeholder */}
      <LiveChat />
    </div>
  );
};

export default WebDevelopment;