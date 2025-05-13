import { motion } from "framer-motion";
import { useState } from "react";
import PageTransition from '../components/PageTransition';
import { 
  Code, Smartphone, Zap, Shield, 
  ArrowRight, Star, Check,
  Globe, BarChart, Users, 
  CheckCircle, ArrowUpRight,
  Mail, Phone, User
} from "lucide-react";

function AppDevelopment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    projectType: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log(formData);
    alert("Thank you for your submission! We'll get back to you soon.");
    // Reset form
    setFormData({
      name: "",
      email: "",
      budget: "",
      projectType: "",
      message: ""
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
        
        {/* Hero Section */}
        <section className="py-28 md:py-36 px-4 relative overflow-hidden">
          <div className="absolute top-40 right-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
              >
                <Smartphone className="w-4 h-4 mr-2" /> Mobile App Development
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary bg-size-200 animate-gradient"
              >
                Transform Your Ideas Into <br className="hidden md:block" />
                Powerful Mobile Apps
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-10"
              >
                We craft high-performing, beautiful mobile applications that engage users 
                and drive business growth. From concept to launch, we deliver excellence.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#portfolio" 
                  className="px-8 py-4 border border-primary/30 text-primary rounded-xl font-medium hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>See Our Work</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </motion.div>
            </motion.div>

            {/* Mobile App Preview */}
            <div className="relative mt-20 max-w-4xl mx-auto">
              <div className="relative mx-auto w-[280px] md:w-[320px]">
                <div className="rounded-[32px] overflow-hidden border-[8px] border-gray-900 dark:border-gray-800 bg-gray-900 shadow-xl shadow-primary/20">
                  <img 
                    src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Mobile App Interface"
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                  <div className="h-1 w-1/3 bg-gray-600 rounded-full mx-auto my-3"></div>
                </div>
              </div>
              
              {/* Secondary devices */}
              <div className="absolute top-1/4 -left-20 w-[180px] hidden md:block" style={{ transform: 'rotate(-15deg)' }}>
                <div className="rounded-[24px] overflow-hidden border-[6px] border-gray-900 dark:border-gray-800 bg-gray-900 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&h=900&fit=crop"
                    alt="Mobile App Interface"
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div className="absolute top-1/4 -right-20 w-[180px] hidden md:block" style={{ transform: 'rotate(15deg)' }}>
                <div className="rounded-[24px] overflow-hidden border-[6px] border-gray-900 dark:border-gray-800 bg-gray-900 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1596239190253-6322cd0ab014?w=500&h=900&fit=crop"
                    alt="Mobile App Interface"
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 px-4 bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "250+", label: "Apps Delivered" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "8+", label: "Years Experience" },
                { value: "All", label: "Major Platforms" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-background border border-secondary/10"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-foreground/70">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
              >
                <Code className="w-4 h-4 mr-2" /> Our Services
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              >
                Comprehensive App Development Solutions
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-foreground/70 max-w-3xl mx-auto"
              >
                We offer end-to-end mobile app development services tailored to your business needs
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: <Smartphone className="w-6 h-6" />,
                  title: "Native App Development",
                  description: "High-performance native apps for iOS and Android platforms with platform-specific features and optimizations.",
                  features: ["iOS Development", "Android Development", "Platform-Specific UI/UX", "App Store Optimization"]
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Cross-Platform Development",
                  description: "Cost-effective solutions that work seamlessly across multiple platforms from a single codebase.",
                  features: ["React Native", "Flutter", "Shared Codebase", "Consistent Experience"]
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "UI/UX Design",
                  description: "User-centric design that creates intuitive, engaging, and accessible mobile experiences.",
                  features: ["User Research", "Wireframing", "Prototyping", "Visual Design"]
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "QA & Testing",
                  description: "Comprehensive testing to ensure your app is bug-free, secure, and performs flawlessly.",
                  features: ["Functional Testing", "Performance Testing", "Security Testing", "Usability Testing"]
                },
                {
                  icon: <ArrowUpRight className="w-6 h-6" />,
                  title: "Deployment & Launch",
                  description: "Smooth app submission and publishing process for both App Store and Google Play.",
                  features: ["App Store Submission", "Play Store Submission", "Guidelines Compliance", "Metadata Optimization"]
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Maintenance & Support",
                  description: "Ongoing technical support and regular updates to keep your app running smoothly.",
                  features: ["Bug Fixes", "Performance Optimization", "OS Updates", "Feature Enhancements"]
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl bg-secondary/5 border border-secondary/10 hover:border-primary/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-foreground/70 mb-4">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground/70">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Technologies Section */}
        <section className="py-24 px-4 bg-secondary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.08),transparent_40%)] -z-10"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
              >
                <Code className="w-4 h-4 mr-2" /> Tech Stack
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              >
                Built With Cutting-Edge Technologies
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-foreground/70 max-w-3xl mx-auto"
              >
                We leverage the most advanced and reliable technologies to ensure your application 
                performs exceptionally well across all platforms
              </motion.p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-12">
              {[
                { name: "React Native", description: "Cross-platform mobile apps" },
                { name: "Flutter", description: "Native UI experiences" },
                { name: "Swift", description: "iOS development" },
                { name: "Kotlin", description: "Android development" },
                { name: "Firebase", description: "Backend & analytics" },
                { name: "Supabase", description: "Database & authentication" },
                { name: "REST APIs", description: "Data integration" },
                { name: "GraphQL", description: "Efficient queries" }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-background transition-all border border-transparent hover:border-secondary/20"
                >
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{tech.name}</h3>
                  <p className="text-sm text-foreground/60">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Development Process Section */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
              >
                <Zap className="w-4 h-4 mr-2" /> Our Process
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              >
                Our Development Process
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-foreground/70 max-w-3xl mx-auto"
              >
                Our streamlined approach ensures your app is delivered on time, within budget, and exceeds expectations
              </motion.p>
            </div>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/30 md:transform md:-translate-x-1/2"></div>
              
              {[
                {
                  step: 1,
                  title: "Discovery",
                  description: "We analyze your business requirements, target audience, and app goals to create a detailed roadmap."
                },
                {
                  step: 2,
                  title: "Design",
                  description: "Our designers create intuitive, user-friendly interfaces that engage users and reflect your brand identity."
                },
                {
                  step: 3,
                  title: "Development",
                  description: "Our expert developers build your application using the latest technologies and best coding practices."
                },
                {
                  step: 4,
                  title: "Testing",
                  description: "Rigorous testing across multiple devices and platforms ensures your app is bug-free and performs flawlessly."
                },
                {
                  step: 5,
                  title: "Launch",
                  description: "We handle the app submission process and help you with a successful market launch strategy."
                }
              ].map((process, index) => (
                <div key={index} className="relative flex items-start mb-12 md:mb-24">
                  {/* Process number */}
                  <div className="absolute left-0 md:left-1/2 top-0 z-10 w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg transform md:-translate-x-1/2 shadow-lg shadow-primary/20">
                    {process.step}
                  </div>
                  
                  {/* Content */}
                  <div className={`pl-20 md:pl-0 w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-secondary/5 backdrop-blur-sm rounded-xl p-6 border border-secondary/10 hover:border-primary/20 transition-all"
                    >
                      <h3 className="text-xl font-semibold mb-3 text-primary">{process.title}</h3>
                      <p className="text-foreground/70">{process.description}</p>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 px-4 bg-secondary/5 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
              >
                <CheckCircle className="w-4 h-4 mr-2" /> Our Work
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              >
                Featured Projects
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-foreground/70 max-w-3xl mx-auto"
              >
                Check out some of our successful mobile applications
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "FitTrack",
                  category: "Health & Fitness",
                  image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80",
                  description: "A comprehensive fitness tracking app with personalized workout plans and nutrition guidance."
                },
                {
                  title: "QuickPay",
                  category: "Finance",
                  image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
                  description: "Secure mobile payment solution with advanced fraud detection and instant transfers."
                },
                {
                  title: "DeliverEase",
                  category: "Food Delivery",
                  image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
                  description: "Streamlined food ordering platform with real-time delivery tracking and payment processing."
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl overflow-hidden bg-background border border-secondary/10 hover:border-primary/20 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{project.category}</span>
                    <h3 className="text-xl font-bold mt-3 mb-2">{project.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4">{project.description}</p>
                    <a href="#" className="inline-flex items-center text-sm text-primary font-medium">
                      View Project <ArrowRight className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-24 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
              >
                <Star className="w-4 h-4 mr-2" /> Testimonials
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              >
                What Our Clients Say
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-foreground/70 max-w-3xl mx-auto"
              >
                Real feedback from businesses we've helped achieve their app development goals
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  quote: "The team delivered a stunning app that exceeded our expectations. Our user engagement has increased by 200% since launch.",
                  author: "Sarah Johnson",
                  position: "CEO, FitTrack",
                  image: "https://i.pravatar.cc/100?img=5"
                },
                {
                  quote: "From concept to deployment, the development process was smooth and transparent. The attention to detail and user experience design is unmatched.",
                  author: "Michael Chen",
                  position: "Founder, QuickPay",
                  image: "https://i.pravatar.cc/100?img=6"
                },
                {
                  quote: "Implementing complex features seemed daunting, but their team made it feel effortless. Our app now processes thousands of orders daily.",
                  author: "Lisa Rodriguez",
                  position: "CTO, DeliverEase",
                  image: "https://i.pravatar.cc/100?img=7"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-secondary/5 border border-secondary/10 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-foreground/80 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full"
                      loading="lazy"
                    />
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
        
        {/* FAQ Section */}
        <section className="py-24 px-4 bg-secondary/5 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
              >
                <Users className="w-4 h-4 mr-2" /> FAQ
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              >
                Frequently Asked Questions
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-foreground/70 max-w-3xl mx-auto"
              >
                Answers to common questions about our app development services
              </motion.p>
            </div>
            
            <div className="space-y-4 mt-12">
              {[
                {
                  question: "How long does it take to develop a mobile app?",
                  answer: "The development timeline depends on the complexity of your app. Simple apps may take 2-3 months, while complex applications can take 4-6 months or more. We provide detailed timelines during our initial consultation."
                },
                {
                  question: "What platforms do you develop for?",
                  answer: "We develop native applications for iOS and Android, as well as cross-platform solutions using React Native and Flutter. Our team will recommend the best approach based on your specific requirements."
                },
                {
                  question: "How much does app development cost?",
                  answer: "App development costs vary based on complexity, features, and platforms. Our pricing starts at $15,000 for basic applications. We provide detailed quotes after understanding your project requirements."
                },
                {
                  question: "Do you offer maintenance after launch?",
                  answer: "Yes, we offer ongoing maintenance and support services to ensure your app remains up-to-date and functions smoothly. We have various support packages available to suit different needs."
                },
                {
                  question: "Can you help with app store submission?",
                  answer: "Absolutely! We handle the entire app submission process for both the Apple App Store and Google Play Store, ensuring your app meets all requirements and guidelines for approval."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-secondary/10 rounded-xl overflow-hidden hover:border-primary/20 transition-all"
                >
                  <details className="group">
                    <summary className="flex justify-between items-center p-5 font-medium cursor-pointer">
                      <span>{faq.question}</span>
                      <span className="transition group-open:rotate-180">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </span>
                    </summary>
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-foreground/70">{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        

      </div>
    </PageTransition>
  );
}

export default AppDevelopment;