import { motion } from "framer-motion";
import { Meteors } from "../components/ui/meteor-effect";
import { Code, Palette, Globe, Users, Rocket, Smartphone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURED_PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
    image: "/projects/ecommerce.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project"
  },
  {
    title: "AI Content Platform",
    description: "Content management system powered by AI for automated content generation and optimization.",
    image: "/projects/ai-platform.jpg",
    technologies: ["Next.js", "OpenAI", "PostgreSQL", "AWS"],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project"
  },
  {
    title: "Real Estate Dashboard",
    description: "Interactive dashboard for real estate analytics with advanced filtering and 3D property tours.",
    image: "/projects/real-estate.jpg",
    technologies: ["React", "Three.js", "Express", "Redis"],
    demo: "https://demo.example.com",
    github: "https://github.com/example/project"
  }
];

const SERVICES = [
  {
    title: "Custom Website Development",
    description: "Bespoke websites tailored to your specific needs and brand identity",
    icon: <Code className="w-8 h-8 text-primary" />
  },
  {
    title: "E-Commerce Development",
    description: "Online stores with secure payment processing and inventory management",
    icon: <Globe className="w-8 h-8 text-primary" />
  },
  {
    title: "Website Maintenance",
    description: "Regular updates, security patches, and performance optimization",
    icon: <Users className="w-8 h-8 text-primary" />
  },
  {
    title: "Performance Optimization",
    description: "Speed up your website for better user experience and SEO rankings",
    icon: <Rocket className="w-8 h-8 text-primary" />
  }
];

function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl aspect-video bg-background/80"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-6 w-full">
          <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-white/80 text-sm">{project.description}</p>
        </div>
      </div>
      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
    </motion.div>
  );
}

function WebDevelopmentServices() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-background">
          <Meteors number={15} />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-primary font-medium mb-4 block"
          >
            Freelance Web Developer
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500"
          >
            Turning Ideas Into <br /> Modern Web Experiences
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-foreground/80 max-w-2xl mx-auto"
          >
            I'm John Doe, a full-stack developer specializing in crafting custom websites 
            and web applications that help businesses grow online
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <a 
              href="#contact" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Let's Work Together
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <a 
              href="#portfolio" 
              className="border border-primary text-primary px-6 py-3 rounded-full text-lg font-medium hover:bg-primary/10 transition-colors"
            >
              View My Work
            </a>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 px-4" id="about">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                With over 5 years of experience in web development, I help businesses and individuals 
                establish their online presence through modern, performant, and user-friendly websites.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Clean Code</h3>
                    <p className="text-sm text-foreground/60">Writing maintainable, scalable solutions</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Fast Delivery</h3>
                    <p className="text-sm text-foreground/60">Quick turnaround without compromising quality</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="/profile-image.jpg" 
                  alt="John Doe" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4" id="services">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Our Web Development Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-secondary p-8 hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/50 to-transparent group-hover:via-primary/5 transition-opacity" />
                <div className="relative z-10">
                  <div className="mb-4 block">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 bg-secondary/50" id="technologies">
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
              { name: "React", level: "95%" },
              { name: "Node.js", level: "90%" },
              { name: "JavaScript", level: "98%" },
              { name: "TypeScript", level: "88%" },
              { name: "HTML/CSS", level: "95%" },
              { name: "Next.js", level: "85%" },
              { name: "Angular", level: "80%" },
              { name: "Vue.js", level: "85%" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative p-6 rounded-2xl bg-background border"
              >
                <h3 className="text-lg font-semibold mb-3">{tech.name}</h3>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: tech.level }}
                  />
                </div>
                <span className="text-sm text-primary font-medium mt-2 block">{tech.level}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 w-px h-full bg-primary/30 -translate-x-1/2 hidden md:block"></div>
            
            {[
              {
                step: "1",
                title: "Discovery",
                description: "We start by understanding your business, goals, and target audience to create a strategic development plan."
              },
              {
                step: "2",
                title: "Design & Planning",
                description: "Our designers create wireframes and prototypes that align with your brand and optimize for user experience."
              },
              {
                step: "3",
                title: "Development",
                description: "Our expert developers build your website or application using clean, efficient code and modern technologies."
              },
              {
                step: "4",
                title: "Testing & QA",
                description: "Rigorous testing ensures your website works flawlessly across all devices and browsers."
              },
              {
                step: "5",
                title: "Launch & Support",
                description: "We deploy your site and provide continuous support and maintenance to keep everything running smoothly."
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-16 md:mb-24 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
              >
                <div className="absolute top-0 left-0 md:left-auto md:right-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold z-10">
                  {phase.step}
                </div>
                <div className="pl-16 md:pl-0 md:pr-0">
                  <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                  <p className="text-foreground/70">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-4" id="portfolio">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block"
            >
              <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-violet-500 opacity-75 blur" />
              <span className="relative text-primary font-medium px-4 py-2 rounded-lg bg-background">
                Our Latest Work
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mt-6"
            >
              Featured Projects
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16"
          >
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-8 py-4 rounded-full text-lg font-medium transition-colors group border border-primary/20"
            >
              View All Projects
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            What Our Clients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                company: "Fashion Retailer",
                quote: "The team delivered a stunning e-commerce website that exceeded our expectations. Sales have increased by 40% since launch!"
              },
              {
                name: "David Chen",
                company: "FinTech Startup",
                quote: "Their development team built our web application from concept to launch in record time. The code quality is exceptional."
              },
              {
                name: "Emily Rodriguez",
                company: "Marketing Agency",
                quote: "We've partnered with them for all our client websites. Their attention to detail and responsive designs are unmatched."
              },
              {
                name: "Michael Taylor",
                company: "SaaS Company",
                quote: "The custom CMS they built has transformed how we manage content. Our team loves how intuitive and powerful it is."
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-secondary p-8 border border-primary/10"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                  </div>
                  <p className="text-foreground/80 mb-6 flex-grow">{testimonial.quote}</p>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-foreground/60">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative p-10 rounded-3xl bg-secondary overflow-hidden"
          >
            <Meteors number={8} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Have a Project in Mind?</h2>
              <p className="text-xl text-foreground/70 mb-8">
                Let's discuss how I can help bring your vision to life
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="mailto:your@email.com" 
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Get in Touch
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <a 
                  href="tel:+1234567890" 
                  className="bg-background text-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-background/80 transition-opacity flex items-center gap-2"
                >
                  Schedule a Call
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default WebDevelopmentServices;