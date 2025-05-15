import { useState } from "react";
import { ArrowRight, Play, Star, Users, Lightbulb, MessageCircle, Bookmark, ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function PodcastHomepage() {
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState(0);
  
  const episodes = [
    {
      id: 1,
      title: "Productive: Becoming Endlessly Productive",
      category: "Productivity",
      image: "/api/placeholder/300/300",
      date: "May 12",
      duration: "45 min",
      likes: 342
    },
    {
      id: 2,
      title: "Tesla Autopilot Controversy",
      category: "Technology",
      image: "/api/placeholder/300/300",
      date: "May 10",
      duration: "38 min",
      likes: 287
    },
    {
      id: 3,
      title: "Women's Rights: Is it alright?",
      category: "Society",
      image: "/api/placeholder/300/300",
      date: "May 8",
      duration: "52 min",
      likes: 412
    },
    {
      id: 4,
      title: "What to Deal with Self-Confidence",
      category: "Personal Growth",
      image: "/api/placeholder/300/300",
      date: "May 5",
      duration: "41 min",
      likes: 329
    },
    {
      id: 5,
      title: "Types of Toxic Classes of People",
      category: "Psychology",
      image: "/api/placeholder/300/300",
      date: "May 3",
      duration: "47 min",
      likes: 356
    },
    {
      id: 6,
      title: "We give a Peripheral (Mind Power)",
      category: "Mindfulness",
      image: "/api/placeholder/300/300",
      date: "May 1",
      duration: "39 min",
      likes: 298
    }
  ];

  // Navigation for featured episodes
  const moveCarousel = (direction) => {
    if (direction === "next") {
      setActiveEpisodeIndex((prev) => (prev < episodes.length - 1 ? prev + 1 : 0));
    } else {
      setActiveEpisodeIndex((prev) => (prev > 0 ? prev - 1 : episodes.length - 1));
    }
  };

  const featuredEpisodes = episodes.slice(0, 5);

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans">
      {/* Navigation */}
      <header className="py-6 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white font-bold">P</div>
          <span className="font-semibold">Podcast</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-sm font-medium">Episodes</a>
          <a href="#" className="text-sm font-medium">About</a>
          <a href="#" className="text-sm font-medium">Shows</a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex bg-white rounded-full px-4 py-2 items-center shadow-sm">
            <input type="text" placeholder="Search episodes" className="text-sm bg-transparent border-none outline-none" />
          </div>
          <button className="bg-black text-white rounded-full px-4 py-2 text-sm font-medium">Subscribe</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-12 pb-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          Your Daily <span className="text-red-500">Podcast</span>
        </h1>
        <p className="text-neutral-600 max-w-lg mx-auto mb-8">
          Talk, Listen, Get inspired by every minute of it.
        </p>
        <button className="bg-black text-white rounded-full px-6 py-3 font-medium">
          Subscribe Now
        </button>

        {/* Featured Episodes */}
        <div className="w-full mt-16 overflow-hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
            {featuredEpisodes.map((episode, index) => (
              <div key={episode.id} className="relative flex-shrink-0 w-48 md:w-64">
                <img 
                  src={episode.image} 
                  alt={episode.title}
                  className="w-full aspect-square object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex flex-col justify-end p-3">
                  <h3 className="text-white text-sm font-medium truncate">
                    {index === 0 ? "Experience" : 
                     index === 1 ? "Perspective" : 
                     index === 2 ? "Visually" : 
                     index === 3 ? "Society" : "Look"}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="px-6 md:px-12 py-10 border-t border-neutral-200">
        <p className="text-neutral-500 text-sm mb-6">Supported by:</p>
        <div className="flex flex-wrap items-center justify-start gap-8 md:gap-16">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-500 rounded-full mr-2"></div>
            <span className="font-medium">Spotify</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-400 rounded-full mr-2"></div>
            <span className="font-medium">Google Podcast</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-red-500 rounded-full mr-2"></div>
            <span className="font-medium">YouTube</span>
          </div>
        </div>
      </section>

      {/* Main tagline with squiggly line */}
      <section className="px-6 md:px-12 py-16 relative">
        <div className="absolute right-0 -top-16 text-red-400 opacity-50 text-8xl font-serif rotate-12">
          p
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mb-12">
          Talk. Listen. Get inspired by every minute of it.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <div className="bg-neutral-200 p-2 rounded-full">
              <div className="w-8 h-8 flex items-center justify-center">
                🤔
              </div>
            </div>
            <div>
              <p className="text-neutral-600 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
              <p className="text-neutral-400 text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-neutral-200 p-2 rounded-full">
              <div className="w-8 h-8 flex items-center justify-center">
                💡
              </div>
            </div>
            <div>
              <p className="text-neutral-600 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
              <p className="text-neutral-400 text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="px-6 md:px-12 py-12 bg-neutral-200/50">
        <div className="max-w-4xl mx-auto bg-neutral-100 rounded-lg p-8 relative">
          <div className="absolute -top-6 -left-6 text-red-500 text-6xl">"</div>
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6">
            One of the best daily podcasts that covers every topic on Spotify.
          </h3>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-neutral-300 rounded-full"></div>
            <div>
              <p className="font-medium">John Anderson</p>
              <p className="text-sm text-neutral-500">Social Community Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 py-16 bg-neutral-100 relative">
        <div className="absolute right-0 bottom-0 text-red-400 opacity-50 text-8xl font-serif rotate-12">
          p
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-center">What our listeners say</h2>
        <p className="text-neutral-600 text-center mb-12">Their experience throughout every platform</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-red-500 text-3xl mb-3">"</div>
              <p className="text-neutral-700 mb-6">
                Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquis.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-neutral-300 rounded-full"></div>
                <p className="text-sm font-medium">Listener #{item}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="px-6 md:px-12 py-16 bg-neutral-100 relative">
        <div className="absolute left-12 -top-6 text-red-400 opacity-50 text-8xl font-serif rotate-12">
          p
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-center">Membership benefits</h2>
        <p className="text-neutral-600 text-center mb-12">Become our sponsor and get all benefits</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              🎧
            </div>
            <h3 className="font-bold mb-2">Tools by Request</h3>
            <p className="text-neutral-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              📝
            </div>
            <h3 className="font-bold mb-2">Exclusive Content</h3>
            <p className="text-neutral-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              👥
            </div>
            <h3 className="font-bold mb-2">Join the Community</h3>
            <p className="text-neutral-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-black text-white px-5 py-2 rounded-md">
            See Pricing
          </button>
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="px-6 md:px-12 py-16 bg-neutral-100">
        <h2 className="text-3xl font-bold mb-2 text-center">Recent Episodes</h2>
        <p className="text-neutral-600 text-center mb-12">Available on your favorite platforms</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {episodes.map((episode) => (
            <div key={episode.id} className="bg-white rounded-lg overflow-hidden border border-neutral-200 flex">
              <div className="w-1/3">
                <img 
                  src={episode.image} 
                  alt={episode.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-4">
                <div className="flex items-center text-xs text-red-500 mb-1">
                  <span className="font-medium">{episode.category}</span>
                  <span className="mx-2">•</span>
                  <span>{episode.date}</span>
                </div>
                <h3 className="font-bold mb-2">{episode.title}</h3>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-xs text-neutral-500">
                    <span>{episode.duration}</span>
                    <span className="mx-2">|</span>
                    <div className="flex items-center">
                      <Heart size={12} className="mr-1" />
                      <span>{episode.likes}</span>
                    </div>
                  </div>
                  <button className="bg-neutral-100 hover:bg-neutral-200 text-xs px-3 py-1 rounded-md">
                    Listen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-black text-white px-5 py-2 rounded-md">
            Explore All Episodes
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white px-6 md:px-12 py-8 border-t border-neutral-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white font-bold">P</div>
            <span className="font-semibold">Your Daily Podcast</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-600 hover:text-neutral-900">Episodes</a>
            <a href="#" className="text-neutral-600 hover:text-neutral-900">About</a>
            <a href="#" className="text-neutral-600 hover:text-neutral-900">Contact</a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-neutral-500 text-sm">
          © 2025 Your Daily Podcast. All rights reserved.
        </div>
      </footer>
    </div>
  );
}