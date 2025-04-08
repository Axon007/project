import { motion } from "framer-motion";
import PageTransition from '../components/PageTransition';
import Newsletter from '../components/Newsletter';
import Globe from '../components/Globe';
import { AuroraBackground } from '../components/AuroraBackground';
import { 
  ArrowRight, Code, Users, Award, BarChart, 
  BadgeCheck, LineChart, Gamepad2, Palette, 
  VideoIcon, Brush, Lightbulb
} from "lucide-react";
import { Smartphone } from "lucide-react";

// Core theme with only what's used
const THEME = {
  primary: {
    DEFAULT: "#0070F3",
    light: "#3291FF",
  },
  secondary: {
    DEFAULT: "#7928CA",
  },
  background: {
    DEFAULT: "#FCFCFC",
    muted: "#F5F5F5",
  },
  foreground: {
    DEFAULT: "#18181B",
  },
  accent: {
    blue: "#2563EB",
    cyan: "#06B6D4",
    green: "#10B981", 
    yellow: "#FBBF24",
    orange: "#F97316",
  }
};

// Simplified UI object with only what's used
const UI = {
  card: {
    base: "rounded-2xl overflow-hidden border border-secondary/20 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 bg-background/50 backdrop-blur-sm",
    padding: "p-6",
    iconContainer: "mb-6 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center"
  },
  text: {
    heading: "font-bold text-foreground",
    body: "text-foreground/70",
    accent: "text-primary"
  },
  gradients: {
    primary: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
    hover: "bg-gradient-to-r from-primary/20 to-blue-500/20"
  },
  button: {
    base: "flex items-center gap-1 font-medium",
    pill: "rounded-full",
    primary: "bg-primary/10 hover:bg-primary/20 text-primary"
  }
};

// Simplified animations
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
};

// Animation helper
const createMotionProps = (type, delay = 0) => {
  const base = animations[type];
  return {
    ...base,
    viewport: { once: true },
    transition: { 
      ...base.transition, 
      delay: delay 
    }
  };
};

// Section component
const Section = ({ children, dark = false, pattern = false, className = "", id = null }) => (
  <section 
    id={id}
    className={`py-24 px-4 ${
      dark ? 'bg-secondary/20' : 
      pattern ? 'bg-gradient-to-b from-background/90 to-muted/20 relative' : 
      'bg-background'
    } ${className}`}
    aria-labelledby={id}
  >
    {pattern && (
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    )}
    <div className="max-w-7xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

// Service card component
const ServiceCard = ({ service, index }) => (
  <motion.div
    key={index}
    {...createMotionProps('fadeInUp', service.delay * 0.3)}
    className={`${UI.card.base} w-80 flex-shrink-0`}
  >
    <div className={UI.card.padding}>
      <div className={UI.card.iconContainer}>
        {service.icon}
      </div>
      <h3 className={`text-xl ${UI.text.heading} mb-3`}>{service.title}</h3>
      <p className={`${UI.text.body} mb-6 text-sm`}>{service.description}</p>
      <div className="space-y-3">
        {service.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2">
            <BadgeCheck size={16} className={UI.text.accent} />
            <span className="text-sm text-foreground/80">{feature}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-secondary/20 flex items-center text-primary font-medium">
        <span>Learn more</span>
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
);

// Project card component
const ProjectCard = ({ project, index }) => (
  <motion.div
    key={index}
    {...createMotionProps('fadeInUp', index * 0.1)}
    className={`group relative flex flex-col overflow-hidden ${UI.card.base}`}
  >
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      <img 
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4 z-20">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/30 text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>
      {project.featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/30 text-white backdrop-blur-sm">
            <BadgeCheck className="w-3 h-3 mr-1" />
            Featured
          </span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-white/80 text-sm line-clamp-1">
          {project.description}
        </p>
      </div>
    </div>
    <div className="flex flex-col p-5 flex-grow bg-secondary/20 backdrop-blur-sm">
      <div className="mb-auto">
        <p className={`${UI.text.body} text-sm mb-4 line-clamp-2`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="px-2 py-1 bg-primary/10 rounded-md text-xs text-primary/80">
              {['React', 'TypeScript', 'Node.js', 'Tailwind', 'Next.js'][Math.floor(Math.random() * 5)]}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 border-t border-secondary/30 pt-4">
        {project.stats && (
          <div className="flex items-center text-primary/80 text-xs">
            <LineChart className="w-3 h-3 mr-1" />
            {project.stats}
          </div>
        )}
        <button className={`ml-auto ${UI.button.base} ${UI.button.pill} ${UI.button.primary} px-4 py-1.5`}>
          View Project
          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
    <div className={`absolute -inset-px ${UI.gradients.hover} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
  </motion.div>
);

// Section heading component
const SectionHeading = ({ eyebrow, title, center = false, description = null }) => (
  <div className={`mb-16 ${center ? 'text-center' : ''}`}>
    <motion.span
      {...createMotionProps('fadeIn')}
      className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block"
    >
      {eyebrow}
    </motion.span>
    <motion.h2 
      {...createMotionProps('fadeInUp', 0.1)}
      className="text-4xl md:text-5xl font-bold mt-4 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        {...createMotionProps('fadeInUp', 0.2)}
        className={`text-lg text-foreground/70 max-w-2xl ${center ? 'mx-auto' : ''}`}
      >
        {description}
      </motion.p>
    )}
    {center && (
      <motion.div
        {...createMotionProps('fadeInUp', 0.2)}
        className="h-1 w-20 bg-primary mx-auto rounded-full mt-6"
      />
    )}
  </div>
);

// CTA button component
const CTAButton = ({ primary = true, children, className = "", small = false }) => (
  <button className={`group relative overflow-hidden rounded-full border-2 ${primary ? 'border-primary' : 'border-primary/70'} ${primary ? 'bg-primary' : 'bg-transparent'} 
    ${small ? 'px-4 py-2 text-sm' : 'px-8 py-4 text-lg'} font-semibold transition-all hover:scale-95 w-full sm:w-auto ${className}`}>
    <span className={`relative z-10 transition-colors ${primary ? 'text-background group-hover:text-primary' : 'text-primary group-hover:text-background'} flex items-center justify-center gap-2`}>
      {children}
    </span>
    <div className={`absolute inset-0 z-0 ${primary ? 'bg-background' : 'bg-primary'} translate-y-full transition-transform duration-300 group-hover:translate-y-0`} />
  </button>
);

// Constants
const COMPANY_LOGOS = [
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg'
];

const SERVICES = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies and best practices for optimal performance",
    icon: <Code className="w-10 h-10 text-primary" />,
    features: ["Responsive Design", "SEO Optimization", "Performance Tuning", "Custom Solutions"],
    delay: 0
  },
  {
    title: "Game Development",
    description: "Engaging and immersive gaming experiences across multiple platforms using cutting-edge game engines",
    icon: <Gamepad2 className="w-10 h-10 text-primary" />,
    features: ["Unity & Unreal Engine", "Mobile Games", "Cross-platform", "3D/2D Games"],
    delay: 0.2
  },
  {
    title: "Logo Design",
    description: "Professional branding solutions with unique and memorable logo designs that capture your brand essence",
    icon: <Palette className="w-10 h-10 text-primary" />,
    features: ["Brand Identity", "Vector Graphics", "Color Theory", "Scalable Designs"],
    delay: 0.4
  },
  {
    title: "Video Editing",
    description: "Professional video editing services that transform raw footage into compelling visual stories",
    icon: <VideoIcon className="w-10 h-10 text-primary" />,
    features: ["Color Grading", "Motion Graphics", "Audio Mixing", "Post-Production"],
    delay: 0.6
  },
  {
    title: "UI/UX Design",
    description: "User-centered design solutions that create intuitive, engaging, and effective digital experiences",
    icon: <Brush className="w-10 h-10 text-primary" />,
    features: ["User Research", "Wireframing", "Prototype Testing", "Interaction Design"],
    delay: 0.8
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that deliver seamless user experiences across devices",
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"],
    delay: 1.0
  }
];

const PROJECTS = [
  {
    title: "E-commerce Platform",
    description: "A full-featured online shopping platform with advanced product filtering and secure checkout",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    featured: true,
    color: THEME.accent.blue
  },
  {
    title: "Corporate Rebrand",
    description: "Complete visual identity overhaul for a Fortune 500 financial services company",
    category: "Logo Design",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    stats: "40% increase in brand recognition",
    color: THEME.accent.orange
  },
  {
    title: "Mobile RPG Game",
    description: "Fantasy role-playing game with immersive 3D environments and strategic combat",
    category: "Game Development",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    featured: true,
    color: THEME.accent.green
  },
  {
    title: "Promotional Video Series",
    description: "Award-winning product launch videos featuring cinematic visuals and compelling storytelling",
    category: "Video Editing",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    stats: "2M+ views",
    color: THEME.accent.cyan
  },
  {
    title: "Banking App Redesign",
    description: "User experience transformation resulting in 40% increase in mobile transactions",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80",
    stats: "85% user satisfaction",
    color: THEME.secondary.DEFAULT
  }
];

const TESTIMONIALS = [
  {
    quote: "Jason Tech Solutions transformed our operations with their cloud migration strategy. Our infrastructure costs decreased by 40% while performance improved significantly.",
    author: "Sarah Johnson",
    position: "CTO, Global Retail Inc.",
    image: "/api/placeholder/64/64",
    delay: 0
  },
  {
    quote: "The AI solution implemented by the team has revolutionized how we analyze customer data. We're now able to predict trends and make proactive decisions.",
    author: "Michael Chen",
    position: "Data Director, FinTech Solutions",
    image: "/api/placeholder/64/64",
    delay: 0.2
  },
  {
    quote: "After experiencing a security breach, we hired Jason Tech to overhaul our cybersecurity. Their comprehensive approach has given us peace of mind and protected our reputation.",
    author: "Emma Rodriguez",
    position: "CISO, Healthcare Systems",
    image: "/api/placeholder/64/64",
    delay: 0.4
  }
];

const WHY_CHOOSE_US = [
  {
    title: "Expert Team",
    description: "Senior engineers and consultants with 10+ years of industry experience",
    icon: <Users className="w-6 h-6 text-primary" />
  },
  {
    title: "Proven Results",
    description: "Track record of delivering projects on time and exceeding expectations",
    icon: <Award className="w-6 h-6 text-primary" />
  },
  {
    title: "Future-Proof Solutions",
    description: "Technology that scales with your business and adapts to changing needs",
    icon: <Lightbulb className="w-6 h-6 text-primary" />
  }
];

const HERO_SERVICES = [
  { title: "Web Development", icon: <Code className="w-4 h-4" /> },
  { title: "Game Development", icon: <Gamepad2 className="w-4 h-4" /> },
  { title: "Logo Design", icon: <Palette className="w-4 h-4" /> },
  { title: "Video Editing", icon: <VideoIcon className="w-4 h-4" /> },
  { title: "UI/UX Design", icon: <Brush className="w-4 h-4" /> },
  { title: "Mobile App Development", icon: <Smartphone className="w-4 h-4" /> },
];

function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Background container that extends to services */}
        <div className="relative bg-gradient-to-b from-background to-background/95">
          {/* Background Pattern */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
          
          {/* Aurora Background */}
          <AuroraBackground className="absolute inset-0" showRadialGradient={true} />

          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-heading">
            {/* Enhanced Hero Section with Aurora Background */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-6 font-bold flex items-center justify-center space-x-2"
              >
                <span className="bg-primary/20 text-primary px-6 py-2 rounded-full text-sm flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                  Global Technology Solutions
                </span>
              </motion.div>
              
              <motion.h1 
                id="hero-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-blue-500"
              >
                Jason Tech Solutions
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-8"
              >
                Empowering enterprises with cutting-edge technology solutions for the digital era
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <CTAButton primary={false}>
                  Get Started
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </CTAButton>
                
                <CTAButton primary>
                  Book a Demo
                </CTAButton>
              </motion.div>

              {/* Service chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
              >
                {HERO_SERVICES.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-background/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 flex items-center gap-2 text-sm hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <span className="text-primary">{service.icon}</span>
                    <span className="text-foreground/80">{service.title}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          </section>

          {/* Partnerships Section */}
          <section className="relative py-16 px-4">
            <div className="relative z-10 max-w-7xl mx-auto bg-secondary/20 rounded-2xl backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 id="partnerships-heading" className="text-primary/80 text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block">TRUSTED BY INDUSTRY LEADERS</h2>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                {COMPANY_LOGOS.map((logo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center justify-center"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <div className="p-4 bg-secondary/50 backdrop-blur rounded-xl hover:shadow-md transition-all duration-300 w-full flex justify-center">
                      <img src={logo} alt={`Partner company ${index + 1}`} className="h-12 opacity-50 hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Services Section */}
        <Section pattern>
          <SectionHeading 
            eyebrow="What We Do" 
            title="Our Services" 
            description="We deliver cutting-edge solutions tailored to your specific business needs, leveraging the latest technologies and industry best practices."
            center={true} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                {...createMotionProps('fadeInUp', index * 0.1)}
                className={`${UI.card.base}`}
              >
                <div className={UI.card.padding}>
                  <div className={UI.card.iconContainer}>
                    {service.icon}
                  </div>
                  <h3 className={`text-xl ${UI.text.heading} mb-3`}>{service.title}</h3>
                  <p className={`${UI.text.body} mb-6 text-sm`}>{service.description}</p>
                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <BadgeCheck size={16} className={UI.text.accent} />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-secondary/20 flex items-center text-primary font-medium">
                    <span>Learn more</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <CTAButton primary={false}>
              View All Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </CTAButton>
          </motion.div>
        </Section>

        {/* Projects Section */}
        <Section pattern>
          <SectionHeading 
            eyebrow="Our Portfolio" 
            title="Featured Projects" 
            description="Explore our award-winning work delivered for clients across industries"
            center={true} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <CTAButton>
              See All Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </CTAButton>
          </motion.div>
        </Section>

        {/* Why Choose Us Section */}
        <Section dark>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block">Why Choose Us</span>
              <h2 className="text-4xl font-bold mt-6 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Technology expertise that drives business growth</h2>
              <p className="text-foreground/70 mb-8">
                At Jason Tech Solutions, we combine technical excellence with strategic thinking to deliver solutions 
                that not only solve today's challenges but position your business for future success.
              </p>
              
              <div className="space-y-8">
                {WHY_CHOOSE_US.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="mt-1 bg-primary/20 h-12 w-12 rounded-xl flex items-center justify-center shrink-0" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-foreground/70">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-10"
              >
                <CTAButton primary>
                  Our Approach
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </CTAButton>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                <motion.div 
                  className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-blue-500/20 shadow-xl"
                >
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Technology visual representation" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Testimonials Section */}
        <Section>
          <SectionHeading 
            eyebrow="Testimonials" 
            title="What Our Clients Say" 
            description="Don't just take our word for it. Here's what our clients have to say about their experience working with us."
            center={true} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: testimonial.delay * 0.5 }}
                className="p-8 rounded-2xl bg-background/50 backdrop-blur border border-secondary/20 relative group hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="absolute -top-5 left-8 text-5xl text-primary/20" aria-hidden="true">"</div>
                <p className="text-foreground/80 mb-6 relative z-10">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-foreground/60">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a href="#" className="inline-flex items-center text-primary font-medium hover:underline">
              Read more testimonials
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </Section>

        {/* Contact CTA Section */}
        <Section dark>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Ready to transform your business?
              </h2>
              <p className="text-foreground/70 mb-8">
                Let's discuss how our technology solutions can help you achieve your business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton primary>
                  Schedule a Call
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </CTAButton>
                <CTAButton primary={false}>
                  View Services
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Newsletter Section */}
        <Newsletter />
      </div>
    </PageTransition>
  );
}

export default Home;