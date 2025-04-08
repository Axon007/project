import React, { useState, useEffect, useCallback } from 'react';
import { 
  Gamepad, 
  Code, 
  Layers, 
  Cpu, 
  Trophy,
  CheckCircle,
  Star,
  LucideGithub,
  Globe,
  Briefcase
} from 'lucide-react';

// Stats data
const STATS = [
  { value: '50+', label: 'Games Shipped' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '12+', label: 'Years Experience' },
  { value: '15M+', label: 'Players Reached' }
];

// Services data
const SERVICES = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Game Programming",
    description: "Clean, optimized code for your game with a focus on performance and maintainability"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Game Design",
    description: "Engaging gameplay mechanics, level design, and systems that keep players coming back"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Unity/Unreal Development",
    description: "Expert development in industry-standard game engines for all platforms"
  }
];

// Portfolio projects
const PROJECTS = [
  {
    title: "Fantasy RPG",
    category: "Mobile Game",
    image: "/api/placeholder/400/225",
    downloads: "2.5M+"
  },
  {
    title: "Space Explorer",
    category: "PC Game",
    image: "/api/placeholder/400/226",
    downloads: "1.8M+"
  },
  {
    title: "Puzzle Adventure",
    category: "Multi-platform",
    image: "/api/placeholder/400/227",
    downloads: "3.2M+"
  }
];

// Testimonials data
const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    company: "Indie Games Studio",
    text: "Working with this developer transformed our game idea into reality. The technical expertise and creative input took our project to another level.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    company: "GameCraft Interactive",
    text: "Exceptional coding skills and game design knowledge. Delivered ahead of schedule and exceeded our performance requirements.",
    rating: 5
  }
];

const GamingDevFreelancer = () => {
  const [scrollY, setScrollY] = useState(0);
  
  // Memoized scroll handler for better performance
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-blue-950 to-indigo-950 opacity-80" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYxMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-center px-4 md:px-8 bg-gradient-to-b from-transparent to-black/50 backdrop-blur-sm">
          <div className="animate-fade-in">
            <div className="inline-block mb-4 px-3 py-1 bg-blue-500/20 backdrop-blur-md rounded-full">
              <p className="text-sm font-medium text-blue-200">Game Development Expert</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500">
              Bringing Your Game Vision<br />
              To <span className="relative">
                Life
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
              </span>
            </h1>
            <p className="mb-8 text-gray-300 max-w-xl mx-auto text-lg leading-relaxed">
              Freelance game developer with expertise in Unity, Unreal Engine, and custom game development. Creating immersive gaming experiences that players love.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-medium text-lg transition-all hover:scale-105">
                Hire Me
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="flex items-center gap-2 px-6 py-4 border border-blue-500/30 rounded-full font-medium hover:bg-blue-500/10 transition-colors">
                <Gamepad className="w-5 h-5" />
                View Portfolio
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {STATS.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 text-center px-4 md:px-8 relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Game Development<br />
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Services</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
              </span>
            </h2>
            <p className="mb-16 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              End-to-end game development services to bring your gaming vision to reality
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {SERVICES.map((service, index) => (
                <div key={index} className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-800/80 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-800/20">
                  <div className="mb-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-24 text-center px-4 md:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black/70 to-black/40 z-0"></div>
          <div 
            className="absolute inset-0 opacity-20 z-0"
            style={{
              backgroundSize: '200px 200px',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          ></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Featured<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Projects</span>
            </h2>
            <p className="mb-16 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Check out some of my recent successful game development projects
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {PROJECTS.map((project, idx) => (
                <div 
                  key={idx}
                  className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/80 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-800/20 group cursor-pointer"
                >
                  <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{project.category}</p>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-300">{project.downloads} Downloads</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-lg">
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full group-hover:w-full group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-r from-blue-400 to-indigo-400"></span>
              <span className="relative text-white group-hover:text-white transition-colors">View All Projects</span>
            </button>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 text-center px-4 md:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Client <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Testimonials</span>
            </h2>
            <p className="mb-16 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              What clients say about working with me
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/80 shadow-lg text-left"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} fill="#FCD34D" className="w-5 h-5 text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 text-center px-4 md:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black/70 to-black/40 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Skills</span>
            </h2>
            <p className="mb-16 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Expert-level development skills for game creation
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {[
                { name: "Unity", level: 95 },
                { name: "Unreal Engine", level: 90 },
                { name: "C#", level: 95 },
                { name: "C++", level: 85 },
                { name: "Game Design", level: 90 },
                { name: "3D Modeling", level: 80 },
                { name: "AR/VR", level: 85 },
                { name: "Networking", level: 80 }
              ].map((skill, idx) => (
                <div 
                  key={idx}
                  className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-5 border border-gray-800/80"
                >
                  <h3 className="text-lg font-medium mb-3">{skill.name}</h3>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm text-gray-400 mt-1">{skill.level}%</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="py-24 text-center px-4 md:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              My Development <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Process</span>
            </h2>
            <p className="mb-16 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              A transparent, efficient approach to game development
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  number: "01",
                  title: "Concept & Planning",
                  description: "We define your game concept, target audience, and core mechanics. I create a detailed development roadmap.",
                  icon: <Briefcase className="w-6 h-6" />
                },
                {
                  number: "02",
                  title: "Development",
                  description: "I build your game with clean code, optimized performance, and regular milestones to track progress.",
                  icon: <Code className="w-6 h-6" />
                },
                {
                  number: "03",
                  title: "Testing & Release",
                  description: "Rigorous testing ensures your game is bug-free and ready for an successful launch on your target platforms.",
                  icon: <Globe className="w-6 h-6" />
                }
              ].map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/80 shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="mb-2 text-sm font-medium text-gray-400">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 text-center px-4 md:px-8 relative">
          <div className="max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/80 shadow-xl shadow-blue-900/20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-indigo-200">
              Ready to Build Your Game?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your game project and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-medium text-lg transition-all hover:scale-105 w-full sm:w-auto">
                Contact Me Now
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-4 border border-blue-500/30 rounded-full font-medium hover:bg-blue-500/10 transition-colors w-full sm:w-auto">
                <LucideGithub className="w-5 h-5" />
                View GitHub
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 md:px-8 border-t border-gray-800/50">
          <div className="max-w-5xl mx-auto text-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-4">
              GameDev Freelancer
            </div>
            <p className="text-gray-400 mb-6">Creating immersive gaming experiences that players love</p>
            <div className="flex justify-center space-x-6 mb-8">
              {[
                <LucideGithub className="w-5 h-5" />,
                <Globe className="w-5 h-5" />,
                <Briefcase className="w-5 h-5" />
              ].map((icon, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="w-10 h-10 bg-gray-800/60 rounded-full flex items-center justify-center hover:bg-blue-900/40 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Game Developer Freelancer. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default GamingDevFreelancer;