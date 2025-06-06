import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, CheckCircle, TrendingUp, Clock, DollarSign, Users, Target, Eye, Shield } from 'lucide-react';
import Footer from '../components/Footer';
import { AuroraBackground } from '../components/AuroraBackground';
import { useThemeContext } from '../components/ThemeProvider';

const About = () => {
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';
  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar is now handled in App.jsx */}
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Aurora Background */}
        <AuroraBackground className={`absolute inset-0 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className={`absolute inset-0 ${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-sm`}></div>
        </AuroraBackground>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 z-10">
          {/* Header Badge */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={`inline-flex items-center px-4 py-2 rounded-full ${
              isDark ? 'bg-purple-900/50 text-purple-300 border-purple-700' : 'bg-purple-100 text-purple-700 border-purple-200'
            } text-sm font-medium backdrop-blur-sm border`}>
              AI Technology by SoftCode
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div 
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 leading-tight`}>
              Our Commitment to
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ethical Practices
              </span>
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
              Building trust with customers through ethical development practices, transparent communication, and robust security measures in every project we undertake.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl">
              Start Technology
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className={`px-8 py-4 ${
              isDark ? 'bg-gray-800/70 text-white border-gray-600' : 'bg-white/70 text-gray-900 border-gray-200'
            } rounded-full font-semibold border hover:${
              isDark ? 'bg-gray-800/90' : 'bg-white/90'
            } transition-colors backdrop-blur-sm`}>
              About Team
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className={`text-center p-6 rounded-2xl ${
              isDark ? 'bg-gray-800/70 text-white border-gray-700' : 'bg-white/70 text-gray-900 border-gray-200'
            } backdrop-blur-sm border`}>
              <div className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>160+</div>
              <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>Development approaches created</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>To facilitate better integration and improved user experience during development</div>
            </motion.div>
            <motion.div variants={fadeInUp} className={`text-center p-6 rounded-2xl ${
              isDark ? 'bg-gray-800/70 text-white border-gray-700' : 'bg-white/70 text-gray-900 border-gray-200'
            } backdrop-blur-sm border`}>
              <div className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>1.8M</div>
              <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>Lines of code written</div>
            </motion.div>
            <motion.div variants={fadeInUp} className={`text-center p-6 rounded-2xl ${
              isDark ? 'bg-gray-800/70 text-white border-gray-700' : 'bg-white/70 text-gray-900 border-gray-200'
            } backdrop-blur-sm border`}>
              <div className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>196+</div>
              <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>Projects completed</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Founding Story Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={isDark ? 'text-purple-400' : 'text-purple-600'}>Our Story</div>
              <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} leading-tight`}>
                Our Founding Story.
              </h2>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Founded by a team of passionate technologists, our company emerged from a simple yet powerful vision: to democratize technology and make it accessible to everyone. We believe that innovation should be inclusive, ethical, and transformative.
              </p>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                From humble beginnings in a small garage, we've grown into a trusted technology partner for businesses worldwide. Our journey has been marked by continuous learning, adaptation, and an unwavering commitment to our core values.
              </p>
              <button className={`inline-flex items-center px-6 py-3 ${
                isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-900 hover:bg-gray-800'
              } text-white rounded-full font-semibold transition-colors`}>
                Start Technology
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={`${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              } rounded-3xl shadow-2xl p-8 border`}>
                <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-6 mb-6`}>
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center" 
                    alt="Team collaboration" 
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>$18,124</span>
                    <span className={`px-3 py-1 ${
                      isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-600'
                    } rounded-full text-sm font-medium`}>Shop</span>
                  </div>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Total revenue generated for our clients in the last quarter through innovative solutions.</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User" className={`w-8 h-8 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'}`} />
                      <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" alt="User" className={`w-8 h-8 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'}`} />
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="User" className={`w-8 h-8 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'}`} />
                    </div>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+12 more</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={`${isDark ? 'text-purple-400' : 'text-purple-600'} font-semibold text-sm uppercase tracking-wider mb-4`}>Our Values</div>
            <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Core values of payix</h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              We build apps with strong values to achieve a business outcome that creates value for business stakeholders. Join our team to create impactful solutions.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className={`text-center p-8 ${
              isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
            } rounded-3xl shadow-lg border`}>
              <div className={`w-16 h-16 ${
                isDark ? 'bg-purple-900/50' : 'bg-purple-100'
              } rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <DollarSign className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Core values of payix</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                We believe in creating solutions that deliver real value to our clients and their customers. Every decision we make is guided by the potential for positive impact.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className={`text-center p-8 ${
              isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
            } rounded-3xl shadow-lg border`}>
              <div className={`w-16 h-16 ${
                isDark ? 'bg-purple-900/50' : 'bg-purple-100'
              } rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <Eye className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Transparency</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Open communication and honest practices form the foundation of our client relationships. We believe transparency builds trust and fosters collaboration.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className={`text-center p-8 ${
              isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
            } rounded-3xl shadow-lg border`}>
              <div className={`w-16 h-16 ${
                isDark ? 'bg-purple-900/50' : 'bg-purple-100'
              } rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <Shield className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Accountability</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                We take ownership of our work and its outcomes. Our commitment to accountability ensures that we deliver on our promises and learn from every experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* From Our Team Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={`${isDark ? 'text-purple-400' : 'text-purple-600'} font-semibold text-sm uppercase tracking-wider mb-4`}>Our Team</div>
            <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>From our team to yours</h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Our team of experts is committed to providing you the best technology solutions, backed by years of experience and a passion for innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={`${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
              } rounded-3xl p-8 border`}>
                <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>45 hours</div>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Average response time to client requests, ensuring that your projects never lose momentum and stay on track.
                </p>
              </div>

              <div className={`${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              } rounded-3xl p-8 shadow-lg border`}>
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=200&fit=crop&crop=center" 
                  alt="Team working" 
                  className="w-full h-40 object-cover rounded-2xl mb-4"
                />
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>75% Faster</div>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Development speed compared to industry average, thanks to our streamlined processes and experienced team.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={`${
                isDark ? 'bg-gradient-to-br from-purple-700 to-purple-900' : 'bg-gradient-to-br from-purple-600 to-purple-800'
              } rounded-3xl p-8 text-white`}>
                <div className="text-4xl font-bold mb-4">$500K+</div>
                <div className="text-xl font-semibold mb-2">Saved</div>
                <p className={isDark ? 'text-purple-200' : 'text-purple-100'}>
                  Total cost savings delivered to our clients through efficient development practices and innovative solutions that reduce operational overhead.
                </p>
              </div>

              <div className={`${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              } rounded-3xl p-8 shadow-lg border`}>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop&crop=face" 
                  alt="Team member" 
                  className="w-20 h-20 object-cover rounded-full mb-4"
                />
                <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  "Working with this team has been transformative for our business. Their expertise and dedication are unmatched."
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={`${isDark ? 'text-purple-400' : 'text-purple-600'} font-semibold text-sm uppercase tracking-wider mb-4`}>Our Team</div>
            <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Meet Our Team</h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Behind every successful project is a dedicated team of experts who bring passion, creativity, and technical excellence to everything they do.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { name: "Alex Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" },
              { name: "Sarah Chen", role: "Technical Director", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face" },
              { name: "Michael Rodriguez", role: "Lead Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
              { name: "Emily Thompson", role: "UX Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" }
            ].map((member, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className={`${
                  isDark ? 'bg-gray-900 border-gray-700 hover:shadow-xl' : 'bg-white border-gray-100 hover:shadow-xl'
                } rounded-3xl p-6 shadow-lg text-center transition-shadow border`}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>{member.name}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>{member.role}</p>
                <div className="flex justify-center space-x-3">
                  <div className={`w-8 h-8 ${
                    isDark ? 'bg-gray-700 text-gray-300 hover:bg-purple-900/50' : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                  } rounded-full flex items-center justify-center cursor-pointer transition-colors`}>
                    <span className="text-xs">in</span>
                  </div>
                  <div className={`w-8 h-8 ${
                    isDark ? 'bg-gray-700 text-gray-300 hover:bg-purple-900/50' : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                  } rounded-full flex items-center justify-center cursor-pointer transition-colors`}>
                    <span className="text-xs">tw</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={`${isDark ? 'text-purple-400' : 'text-purple-600'} font-semibold text-sm uppercase tracking-wider mb-4`}>Testimonials</div>
            <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
              Customer words about<br />their experiences
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We work to help you succeed.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "John Smith",
                role: "CEO, TechCorp",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=face",
                rating: 5,
                text: "Working with this team was the best decision we made for our digital transformation. Their expertise and commitment to quality exceeded our expectations."
              },
              {
                name: "Lisa Johnson",
                role: "Product Manager",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face",
                rating: 5,
                text: "The solution they delivered was not only technically excellent but also perfectly aligned with our business goals. Highly recommended!"
              },
              {
                name: "Mark Wilson",
                role: "Startup Founder",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
                rating: 5,
                text: "From concept to launch, they guided us through every step with professionalism and expertise. Our app is now thriving in the market."
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className={`${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                } rounded-3xl p-8 shadow-lg border`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 object-cover rounded-full mr-4"
                  />
                  <div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default About;
