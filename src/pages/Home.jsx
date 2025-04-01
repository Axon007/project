import { motion } from "framer-motion";
import { Meteors } from "../components/ui/meteor-effect";
import PageTransition from '../components/PageTransition';
import { 
  ArrowRight, Cloud, Shield, Brain, Code, 
  Users, Award, Globe, BarChart, Building2, 
  BadgeCheck, Lock, Server, Network, Sparkles, 
  Zap, CheckCircle2, LineChart
} from "lucide-react";

// Add trusted company logos
const COMPANY_LOGOS = [
  '/logos/microsoft.svg',
  '/logos/amazon.svg',
  '/logos/google.svg',
  '/logos/ibm.svg',
  '/logos/oracle.svg',
  '/logos/salesforce.svg'
];

// Add certifications and awards
const CERTIFICATIONS = [
  { name: 'ISO 27001', icon: <Shield className="w-6 h-6" /> },
  { name: 'SOC 2 Type II', icon: <Lock className="w-6 h-6" /> },
  { name: 'AWS Partner', icon: <Cloud className="w-6 h-6" /> },
  { name: 'Microsoft Gold', icon: <BadgeCheck className="w-6 h-6" /> }
];

// Add features data
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

// Update the Newsletter section with enhanced design
const NewsletterSection = () => (
  <section className="py-20 px-4 bg-gradient-to-b from-secondary/5 to-background relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
    
    <div className="max-w-4xl mx-auto relative">
      <div className="flex flex-col md:flex-row items-center gap-12 backdrop-blur-sm bg-background/30 rounded-2xl p-8 border border-primary/10">
        <div className="flex-1 space-y-4">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            Enterprise Newsletter
          </span>
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Stay Ahead of Innovation
          </h3>
          <p className="text-foreground/70 text-lg">
            Get exclusive insights on enterprise technology trends and digital transformation
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            {ENTERPRISE_FEATURES.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-foreground/60">
                <div className="text-primary">{feature.icon}</div>
                <span>{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your business email"
              className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group">
              Subscribe to Updates
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="flex items-center justify-between text-xs text-foreground/50">
            <span>Enterprise solutions</span>
            <span>•</span>
            <span>Weekly insights</span>
            <span>•</span>
            <span>No spam policy</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        {/* Hero Section - Enhanced with gradient overlay and 3D effect */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-background">
            <Meteors number={30} />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6 font-bold flex items-center justify-center space-x-2"
            >
              <span className="bg-primary/20 text-primary px-4 py-1 rounded-full text-sm">Innovative Solutions</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
            >
              Jason Tech Solutions
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-8"
            >
              Empowering enterprises with cutting-edge technology solutions for the digital era
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2 w-full sm:w-auto">
                Get Started
                <ArrowRight size={18} />
              </button>
              <button className="border border-primary/30 text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/10 transition-all w-full sm:w-auto">
                Book a Demo
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="mt-12 flex justify-center gap-6 flex-wrap"
            >
              <img src="/api/placeholder/120/40" alt="Tech Partner 1" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
              <img src="/api/placeholder/120/40" alt="Tech Partner 2" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
              <img src="/api/placeholder/120/40" alt="Tech Partner 3" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
              <img src="/api/placeholder/120/40" alt="Tech Partner 4" className="h-8 opacity-50 hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
        </div>

        {/* Services Section - Enhanced with icons and better spacing */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-primary text-sm font-medium uppercase tracking-wider"
              >
                What We Do
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl font-bold mt-2 mb-4"
              >
                Our Services
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-20 bg-primary mx-auto rounded-full"
              ></motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Cloud Solutions",
                  description: "Scalable and secure cloud infrastructure designed to optimize performance and reduce operational costs",
                  icon: <Cloud className="w-10 h-10 text-primary" />,
                  delay: 0
                },
                {
                  title: "AI & Machine Learning",
                  description: "Custom AI solutions that automate processes, analyze data, and provide actionable business insights",
                  icon: <Brain className="w-10 h-10 text-primary" />,
                  delay: 0.2
                },
                {
                  title: "Cyber Security",
                  description: "Comprehensive security frameworks that protect your digital assets from evolving cyber threats",
                  icon: <Shield className="w-10 h-10 text-primary" />,
                  delay: 0.4
                },
                {
                  title: "Custom Software",
                  description: "Tailored software solutions built to address your specific business challenges and goals",
                  icon: <Code className="w-10 h-10 text-primary" />,
                  delay: 0.6
                },
                {
                  title: "Digital Transformation",
                  description: "Strategic roadmaps to guide your organization's technological evolution and innovation",
                  icon: <Globe className="w-10 h-10 text-primary" />,
                  delay: 0.8
                },
                {
                  title: "IT Consulting",
                  description: "Expert guidance to align technology investments with your business objectives and industry trends",
                  icon: <Users className="w-10 h-10 text-primary" />,
                  delay: 1.0
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: service.delay }}
                  className="p-8 rounded-2xl bg-secondary/50 backdrop-blur border border-secondary hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 group"
                >
                  <div className="mb-6 p-4 bg-primary/10 inline-block rounded-xl group-hover:bg-primary/20 transition-all">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                  <div className="mt-6 flex items-center text-primary font-medium">
                    <span>Learn more</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - New section */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary text-sm font-medium uppercase tracking-wider">Why Choose Us</span>
                <h2 className="text-4xl font-bold mt-2 mb-6">Technology expertise that drives business growth</h2>
                <p className="text-foreground/70 mb-8">
                  At Jason Tech Solutions, we combine technical excellence with strategic thinking to deliver solutions 
                  that not only solve today's challenges but position your business for future success.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Expert Team",
                      description: "Senior engineers and consultants with 10+ years of industry experience"
                    },
                    {
                      title: "Proven Results",
                      description: "Track record of delivering projects on time and exceeding expectations"
                    },
                    {
                      title: "Future-Proof Solutions",
                      description: "Technology that scales with your business and adapts to changing needs"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="mt-1 bg-primary/20 h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                        <div className="h-3 w-3 bg-primary rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-foreground/70 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/api/placeholder/600/400" alt="Technology Illustration" className="rounded-xl" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-primary p-4 rounded-2xl shadow-lg">
                    <div className="text-4xl font-bold text-white">15+</div>
                    <div className="text-white/90 text-sm">Years Experience</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section - Enhanced with better styling */}
        <section className="py-24 bg-gradient-to-r from-primary/5 to-blue-500/5 border-y border-primary/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold"
              >
                Our Impact in Numbers
              </motion.h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Clients Worldwide", icon: <Users className="w-6 h-6" /> },
                { number: "1000+", label: "Projects Delivered", icon: <Code className="w-6 h-6" /> },
                { number: "50+", label: "Countries Served", icon: <Globe className="w-6 h-6" /> },
                { number: "99%", label: "Client Satisfaction", icon: <Award className="w-6 h-6" /> }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-background/50 backdrop-blur border border-primary/10"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                    {stat.number}
                  </div>
                  <div className="text-foreground/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - New section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-primary text-sm font-medium uppercase tracking-wider"
              >
                Testimonials
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl font-bold mt-2 mb-4"
              >
                What Our Clients Say
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-20 bg-primary mx-auto rounded-full"
              ></motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Jason Tech Solutions transformed our operations with their cloud migration strategy. Our infrastructure costs decreased by 40% while performance improved significantly.",
                  author: "Sarah Johnson",
                  position: "CTO, Global Retail Inc.",
                  delay: 0
                },
                {
                  quote: "The AI solution implemented by the team has revolutionized how we analyze customer data. We're now able to predict trends and make proactive decisions.",
                  author: "Michael Chen",
                  position: "Data Director, FinTech Solutions",
                  delay: 0.2
                },
                {
                  quote: "After experiencing a security breach, we hired Jason Tech to overhaul our cybersecurity. Their comprehensive approach has given us peace of mind and protected our reputation.",
                  author: "Emma Rodriguez",
                  position: "CISO, Healthcare Systems",
                  delay: 0.4
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: testimonial.delay }}
                  className="p-8 rounded-2xl bg-secondary/30 backdrop-blur border border-secondary relative"
                >
                  <div className="absolute -top-5 left-8 text-5xl text-primary/20">"</div>
                  <p className="text-foreground/80 mb-6 relative z-10">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 mr-4"></div>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-foreground/60">{testimonial.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced with better visuals */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10"></div>
          <Meteors number={10} />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm mb-4"
            >
              Get Started Today
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Ready to Transform Your Business?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-foreground/70 mb-8"
            >
              Let's work together to build the future of your business with technology solutions that drive growth and innovation
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2 w-full sm:w-auto">
                Contact Us
                <ArrowRight size={18} />
              </button>
              <button className="border border-primary/30 text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/10 transition-all w-full sm:w-auto">
                Schedule a Call
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-foreground/50 text-sm"
            >
              No obligation consultation • Enterprise-grade solutions • Customized approach
            </motion.div>
          </div>
        </section>

        {/* Add Enterprise Partnerships Section */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mb-12"
            >
              <span className="text-primary/80 text-sm font-medium">TRUSTED BY INDUSTRY LEADERS</span>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
              {COMPANY_LOGOS.map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-center"
                >
                  <img src={logo} alt="Partner Logo" className="h-12 opacity-50 hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Add Enterprise Features Section */}
        <section className="py-24 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
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
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-secondary/20 border border-secondary hover:border-primary/30 transition-all group"
                >
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-foreground/70 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Add Certifications Section */}
        <section className="py-16 px-4 bg-secondary/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8">
              {CERTIFICATIONS.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-primary"
                >
                  {cert.icon}
                  <span className="font-medium">{cert.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Newsletter Section */}
        <NewsletterSection />
      </div>
    </PageTransition>
  );
}

export default Home;