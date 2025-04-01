import { motion } from "framer-motion";
import { Meteors } from "../components/ui/meteor-effect";
import PageTransition from '../components/PageTransition';
import { ArrowRight, Cloud, Shield, Brain, Code, Users, Award, Globe } from "lucide-react";

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

        {/* Newsletter Section - New section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-foreground/70">
                  Subscribe to our newsletter for the latest tech insights and company updates
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-secondary bg-background"
                  />
                  <button className="bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default Home;