import { motion } from "framer-motion";
import { Meteors } from "../components/ui/meteor-effect";
import PageTransition from '../components/PageTransition';
import Newsletter from '../components/Newsletter';
import Globe from '../components/Globe';
import { ShootingStars } from '../components/ShootingStars';
import { AuroraBackground } from '../components/AuroraBackground';
import { 
  ArrowRight, Cloud, Shield, Brain, Code, 
  Users, Award, BarChart, Building2, 
  BadgeCheck, Lock, Server, Network, Sparkles, 
  Zap, CheckCircle2, LineChart, Gamepad2, Palette, 
  VideoIcon, Blocks, Laptop, MonitorPlay, Brush, 
  Pencil, Layout, Tv, Film, Book, Star, Lightbulb
} from "lucide-react";

// Enhanced constants with more visually rich content
const COMPANY_LOGOS = [
  '/logos/microsoft.svg',
  '/logos/amazon.svg',
  '/logos/google.svg',
  '/logos/ibm.svg',
  '/logos/oracle.svg',
  '/logos/salesforce.svg'
];

const CERTIFICATIONS = [
  { name: 'ISO 27001', icon: <Shield className="w-6 h-6" /> },
  { name: 'SOC 2 Type II', icon: <Lock className="w-6 h-6" /> },
  { name: 'AWS Partner', icon: <Cloud className="w-6 h-6" /> },
  { name: 'Microsoft Gold', icon: <BadgeCheck className="w-6 h-6" /> }
];

const ENTERPRISE_FEATURES = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Enterprise Analytics",
    description: "AI-powered insights for data-driven decisions"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "High Performance",
    description: "Optimized solutions for enterprise-scale operations"
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Compliance Ready",
    description: "Built-in compliance with global standards"
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Growth Focused",
    description: "Scalable architecture for sustainable growth"
  }
];

// Enhanced service cards with more visual elements and better organization
const SERVICES = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies and best practices for optimal performance",
    icon: <Code className="w-10 h-10 text-primary" />,
    image: "/images/web-dev.jpg",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Performance Tuning",
      "Custom Solutions"
    ],
    delay: 0
  },
  {
    title: "Game Development",
    description: "Engaging and immersive gaming experiences across multiple platforms using cutting-edge game engines",
    icon: <Gamepad2 className="w-10 h-10 text-primary" />,
    image: "/images/game-dev.jpg",
    features: [
      "Unity & Unreal Engine",
      "Mobile Games",
      "Cross-platform",
      "3D/2D Games"
    ],
    delay: 0.2
  },
  {
    title: "Logo Design",
    description: "Professional branding solutions with unique and memorable logo designs that capture your brand essence",
    icon: <Palette className="w-10 h-10 text-primary" />,
    image: "/images/logo-design.jpg",
    features: [
      "Brand Identity",
      "Vector Graphics",
      "Color Theory",
      "Scalable Designs"
    ],
    delay: 0.4
  },
  {
    title: "Video Editing",
    description: "Professional video editing services that transform raw footage into compelling visual stories",
    icon: <VideoIcon className="w-10 h-10 text-primary" />,
    image: "/images/video-editing.jpg",
    features: [
      "Color Grading",
      "Motion Graphics",
      "Audio Mixing",
      "Post-Production"
    ],
    delay: 0.6
  }
];

const STATS = [
  { number: "500+", label: "Clients Worldwide", icon: <Users className="w-6 h-6" /> },
  { number: "1000+", label: "Projects Delivered", icon: <Code className="w-6 h-6" /> },
  { number: "50+", label: "Countries Served", icon: <Globe className="w-6 h-6" /> },
  { number: "99%", label: "Client Satisfaction", icon: <Award className="w-6 h-6" /> }
];

// Enhanced testimonials with ratings and visual elements
const TESTIMONIALS = [
  {
    quote: "Jason Tech Solutions transformed our operations with their cloud migration strategy. Our infrastructure costs decreased by 40% while performance improved significantly.",
    author: "Sarah Johnson",
    position: "CTO, Global Retail Inc.",
    rating: 5,
    image: "/api/placeholder/64/64",
    delay: 0
  },
  {
    quote: "The AI solution implemented by the team has revolutionized how we analyze customer data. We're now able to predict trends and make proactive decisions.",
    author: "Michael Chen",
    position: "Data Director, FinTech Solutions",
    rating: 5,
    image: "/api/placeholder/64/64",
    delay: 0.2
  },
  {
    quote: "After experiencing a security breach, we hired Jason Tech to overhaul our cybersecurity. Their comprehensive approach has given us peace of mind and protected our reputation.",
    author: "Emma Rodriguez",
    position: "CISO, Healthcare Systems",
    rating: 5,
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

const INFRASTRUCTURE_FEATURES = [
  {
    icon: <Network className="w-8 h-8" />,
    title: "Global Infrastructure",
    description: "High-performance infrastructure across 6 continents"
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "99.999% Uptime",
    description: "Enterprise-grade reliability and redundancy"
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Enterprise Support",
    description: "24/7 dedicated technical support team"
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: "ROI Focused",
    description: "Proven track record of delivering business value"
  }
];

// Reusable components with enhanced visual elements
const SectionHeading = ({ eyebrow, title, center = false, description = null }) => (
  <div className={`mb-16 ${center ? 'text-center' : ''}`}>
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block"
    >
      {eyebrow}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-4xl md:text-5xl font-bold mt-4 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-lg text-foreground/70 max-w-2xl ${center ? 'mx-auto' : ''}`}
      >
        {description}
      </motion.p>
    )}
    {center && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-1 w-20 bg-primary mx-auto rounded-full mt-6"
      />
    )}
  </div>
);

const CTAButton = ({ primary = true, children, className = "" }) => (
  <button className={`group relative overflow-hidden rounded-full border-2 ${primary ? 'border-primary' : 'border-primary/30'} px-8 py-4 text-lg font-semibold transition-all hover:scale-95 w-full sm:w-auto ${className}`}>
    <span className="relative z-10 transition-colors text-primary group-hover:text-background flex items-center justify-center gap-2">
      {children}
    </span>
    <div className="absolute inset-0 z-0 translate-y-full bg-primary transition-transform duration-300 group-hover:translate-y-0" />
  </button>
);

// Rating stars component for testimonials
const RatingStars = ({ rating }) => {
  return (
    <div className="flex space-x-1 my-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        {/* Enhanced Hero Section with Aurora Background */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-heading">
          {/* Background Pattern */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
          
          {/* Aurora Background */}
          <AuroraBackground className="absolute inset-0" showRadialGradient={true} />
          
          {/* Content */}
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
              transition={{ duration: 0.6 }}
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
              <CTAButton primary>
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </CTAButton>
              
              <CTAButton primary={false}>
                Book a Demo
              </CTAButton>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </section>

        {/* Enhanced Partnerships Section with hover effects */}
        <section className="py-16 px-4 bg-secondary/20" aria-labelledby="partnerships-heading">
          <div className="max-w-7xl mx-auto">
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

        {/* Enhanced Services Section with visual cards */}
        <section className="py-24 px-4" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              eyebrow="What We Do" 
              title="Our Services" 
              description="We deliver cutting-edge solutions tailored to your specific business needs, leveraging the latest technologies and industry best practices."
              center={true} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: service.delay * 0.5 }}
                  className="rounded-2xl overflow-hidden group border border-secondary hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
                >
                  {/* Added image headers to service cards */}
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
                    <img 
                      src={service.image || "/api/placeholder/400/200"} 
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-4 z-20 bg-background/80 backdrop-blur-sm p-3 rounded-xl">
                      {service.icon}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-foreground/70 mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex items-center text-primary font-medium">
                      <span>Learn more</span>
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* Enhanced Why Choose Us Section with better visuals */}
        <section className="py-24 px-4 bg-muted/30" aria-labelledby="why-choose-us-heading">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary text-sm font-medium uppercase tracking-wider bg-primary/10 px-4 py-1 rounded-full inline-block">Why Choose Us</span>
                <h2 id="why-choose-us-heading" className="text-4xl font-bold mt-6 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Technology expertise that drives business growth</h2>
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
                
                {/* Added call-to-action */}
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
                {/* Enhanced visual display with floating elements */}
                <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1 perspective">
                  <motion.div 
                    initial={{ rotateY: 0 }}
                    whileHover={{ rotateY: 10 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-blue-500/20 shadow-xl"
                  >
                    <img src="/api/placeholder/600/400" alt="Technology visual representation" className="w-full h-full object-cover rounded-xl" />
                  </motion.div>
                  
                  {/* Floating certification badges */}
                  {CERTIFICATIONS.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                      className="absolute bg-background/90 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center gap-2 border border-secondary"
                      style={{
                        top: `${20 + i * 20}%`,
                        right: i % 2 === 0 ? '-10%' : 'auto',
                        left: i % 2 === 0 ? 'auto' : '-10%',
                      }}
                    >
                      <div className="text-primary">{cert.icon}</div>
                      <span className="font-medium text-sm">{cert.name}</span>
                    </motion.div>
                  ))}
                  
                  <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-2xl shadow-lg">
                    <div className="text-4xl font-bold text-white">15+</div>
                    <div className="text-white/90 text-sm">Years Experience</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section with better cards */}
        <section className="py-24 px-4" aria-labelledby="testimonials-heading">
          <div className="max-w-7xl mx-auto">
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
                  className="p-8 rounded-2xl bg-secondary/30 backdrop-blur border border-secondary relative group hover:border-primary/30 transition-all hover:shadow-lg"
                >
                  <div className="absolute -top-5 left-8 text-5xl text-primary/20" aria-hidden="true">"</div>
                  <RatingStars rating={testimonial.rating} />
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
            
            {/* Added visual call-to-action for more testimonials */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <a href="#" className="inline-flex items-center text-primary font-medium hover:underline">
                View all client success stories
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </section>



        {/* Newsletter Section */}
        <Newsletter />

        {/* Footer CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
            >
              Ready to Transform Your Business?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto"
            >
              Let's discuss how our solutions can help you achieve your business goals
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <CTAButton primary>
                Schedule Consultation
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </CTAButton>
              
              <CTAButton primary={false}>
                View Case Studies
              </CTAButton>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default Home;