// import { useState } from "react";
// import { ArrowRight, Play, Star, Users, Lightbulb, MessageCircle, Bookmark, ChevronLeft, ChevronRight, Heart } from "lucide-react";

// export default function PodcastHomepage() {
//   const [activeEpisodeIndex, setActiveEpisodeIndex] = useState(0);
  
//   const episodes = [
//     {
//       id: 1,
//       title: "Productive: Becoming Endlessly Productive",
//       category: "Productivity",
//       image: "/api/placeholder/300/300",
//       date: "May 12",
//       duration: "45 min",
//       likes: 342
//     },
//     {
//       id: 2,
//       title: "Tesla Autopilot Controversy",
//       category: "Technology",
//       image: "/api/placeholder/300/300",
//       date: "May 10",
//       duration: "38 min",
//       likes: 287
//     },
//     {
//       id: 3,
//       title: "Women's Rights: Is it alright?",
//       category: "Society",
//       image: "/api/placeholder/300/300",
//       date: "May 8",
//       duration: "52 min",
//       likes: 412
//     },
//     {
//       id: 4,
//       title: "What to Deal with Self-Confidence",
//       category: "Personal Growth",
//       image: "/api/placeholder/300/300",
//       date: "May 5",
//       duration: "41 min",
//       likes: 329
//     },
//     {
//       id: 5,
//       title: "Types of Toxic Classes of People",
//       category: "Psychology",
//       image: "/api/placeholder/300/300",
//       date: "May 3",
//       duration: "47 min",
//       likes: 356
//     },
//     {
//       id: 6,
//       title: "We give a Peripheral (Mind Power)",
//       category: "Mindfulness",
//       image: "/api/placeholder/300/300",
//       date: "May 1",
//       duration: "39 min",
//       likes: 298
//     }
//   ];

//   // Navigation for featured episodes
//   const moveCarousel = (direction) => {
//     if (direction === "next") {
//       setActiveEpisodeIndex((prev) => (prev < episodes.length - 1 ? prev + 1 : 0));
//     } else {
//       setActiveEpisodeIndex((prev) => (prev > 0 ? prev - 1 : episodes.length - 1));
//     }
//   };

//   const featuredEpisodes = episodes.slice(0, 5);

//   return (
//     <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans">
//       {/* Navigation */}
//       <header className="py-6 px-6 md:px-12 flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white font-bold">P</div>
//           <span className="font-semibold">Podcast</span>
//         </div>
        
//         <nav className="hidden md:flex space-x-8">
//           <a href="#" className="text-sm font-medium">Episodes</a>
//           <a href="#" className="text-sm font-medium">About</a>
//           <a href="#" className="text-sm font-medium">Shows</a>
//         </nav>
        
//         <div className="flex items-center space-x-3">
//           <div className="hidden md:flex bg-white rounded-full px-4 py-2 items-center shadow-sm">
//             <input type="text" placeholder="Search episodes" className="text-sm bg-transparent border-none outline-none" />
//           </div>
//           <button className="bg-black text-white rounded-full px-4 py-2 text-sm font-medium">Subscribe</button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="px-6 md:px-12 pt-12 pb-24 flex flex-col items-center text-center">
//         <h1 className="text-4xl md:text-6xl font-bold mb-3">
//           Your Daily <span className="text-red-500">Podcast</span>
//         </h1>
//         <p className="text-neutral-600 max-w-lg mx-auto mb-8">
//           Talk, Listen, Get inspired by every minute of it.
//         </p>
//         <button className="bg-black text-white rounded-full px-6 py-3 font-medium">
//           Subscribe Now
//         </button>

//         {/* Featured Episodes */}
//         <div className="w-full mt-16 overflow-hidden">
//           <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
//             {featuredEpisodes.map((episode, index) => (
//               <div key={episode.id} className="relative flex-shrink-0 w-48 md:w-64">
//                 <img 
//                   src={episode.image} 
//                   alt={episode.title}
//                   className="w-full aspect-square object-cover rounded-lg shadow-md"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex flex-col justify-end p-3">
//                   <h3 className="text-white text-sm font-medium truncate">
//                     {index === 0 ? "Experience" : 
//                      index === 1 ? "Perspective" : 
//                      index === 2 ? "Visually" : 
//                      index === 3 ? "Society" : "Look"}
//                   </h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Sponsors */}
//       <section className="px-6 md:px-12 py-10 border-t border-neutral-200">
//         <p className="text-neutral-500 text-sm mb-6">Supported by:</p>
//         <div className="flex flex-wrap items-center justify-start gap-8 md:gap-16">
//           <div className="flex items-center">
//             <div className="w-5 h-5 bg-green-500 rounded-full mr-2"></div>
//             <span className="font-medium">Spotify</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-5 h-5 bg-blue-400 rounded-full mr-2"></div>
//             <span className="font-medium">Google Podcast</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-5 h-5 bg-red-500 rounded-full mr-2"></div>
//             <span className="font-medium">YouTube</span>
//           </div>
//         </div>
//       </section>

//       {/* Main tagline with squiggly line */}
//       <section className="px-6 md:px-12 py-16 relative">
//         <div className="absolute right-0 -top-16 text-red-400 opacity-50 text-8xl font-serif rotate-12">
//           p
//         </div>
        
//         <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mb-12">
//           Talk. Listen. Get inspired by every minute of it.
//         </h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="flex items-start space-x-4">
//             <div className="bg-neutral-200 p-2 rounded-full">
//               <div className="w-8 h-8 flex items-center justify-center">
//                 🤔
//               </div>
//             </div>
//             <div>
//               <p className="text-neutral-600 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
//               <p className="text-neutral-400 text-sm">Lorem ipsum dolor sit amet.</p>
//             </div>
//           </div>
          
//           <div className="flex items-start space-x-4">
//             <div className="bg-neutral-200 p-2 rounded-full">
//               <div className="w-8 h-8 flex items-center justify-center">
//                 💡
//               </div>
//             </div>
//             <div>
//               <p className="text-neutral-600 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
//               <p className="text-neutral-400 text-sm">Lorem ipsum dolor sit amet.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Quote Section */}
//       <section className="px-6 md:px-12 py-12 bg-neutral-200/50">
//         <div className="max-w-4xl mx-auto bg-neutral-100 rounded-lg p-8 relative">
//           <div className="absolute -top-6 -left-6 text-red-500 text-6xl">"</div>
//           <h3 className="text-xl md:text-2xl font-bold text-center mb-6">
//             One of the best daily podcasts that covers every topic on Spotify.
//           </h3>
//           <div className="flex items-center justify-center space-x-3">
//             <div className="w-10 h-10 bg-neutral-300 rounded-full"></div>
//             <div>
//               <p className="font-medium">John Anderson</p>
//               <p className="text-sm text-neutral-500">Social Community Manager</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="px-6 md:px-12 py-16 bg-neutral-100 relative">
//         <div className="absolute right-0 bottom-0 text-red-400 opacity-50 text-8xl font-serif rotate-12">
//           p
//         </div>
        
//         <h2 className="text-3xl font-bold mb-2 text-center">What our listeners say</h2>
//         <p className="text-neutral-600 text-center mb-12">Their experience throughout every platform</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[1, 2, 3].map((item) => (
//             <div key={item} className="bg-white p-6 rounded-lg shadow-sm">
//               <div className="text-red-500 text-3xl mb-3">"</div>
//               <p className="text-neutral-700 mb-6">
//                 Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquis.
//               </p>
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-neutral-300 rounded-full"></div>
//                 <p className="text-sm font-medium">Listener #{item}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Membership Benefits */}
//       <section className="px-6 md:px-12 py-16 bg-neutral-100 relative">
//         <div className="absolute left-12 -top-6 text-red-400 opacity-50 text-8xl font-serif rotate-12">
//           p
//         </div>
        
//         <h2 className="text-3xl font-bold mb-2 text-center">Membership benefits</h2>
//         <p className="text-neutral-600 text-center mb-12">Become our sponsor and get all benefits</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="text-center">
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               🎧
//             </div>
//             <h3 className="font-bold mb-2">Tools by Request</h3>
//             <p className="text-neutral-600 text-sm">
//               Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.
//             </p>
//           </div>
          
//           <div className="text-center">
//             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               📝
//             </div>
//             <h3 className="font-bold mb-2">Exclusive Content</h3>
//             <p className="text-neutral-600 text-sm">
//               Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.
//             </p>
//           </div>
          
//           <div className="text-center">
//             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               👥
//             </div>
//             <h3 className="font-bold mb-2">Join the Community</h3>
//             <p className="text-neutral-600 text-sm">
//               Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.
//             </p>
//           </div>
//         </div>
        
//         <div className="text-center mt-10">
//           <button className="bg-black text-white px-5 py-2 rounded-md">
//             See Pricing
//           </button>
//         </div>
//       </section>

//       {/* Recent Episodes */}
//       <section className="px-6 md:px-12 py-16 bg-neutral-100">
//         <h2 className="text-3xl font-bold mb-2 text-center">Recent Episodes</h2>
//         <p className="text-neutral-600 text-center mb-12">Available on your favorite platforms</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {episodes.map((episode) => (
//             <div key={episode.id} className="bg-white rounded-lg overflow-hidden border border-neutral-200 flex">
//               <div className="w-1/3">
//                 <img 
//                   src={episode.image} 
//                   alt={episode.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-2/3 p-4">
//                 <div className="flex items-center text-xs text-red-500 mb-1">
//                   <span className="font-medium">{episode.category}</span>
//                   <span className="mx-2">•</span>
//                   <span>{episode.date}</span>
//                 </div>
//                 <h3 className="font-bold mb-2">{episode.title}</h3>
//                 <div className="flex justify-between items-center mt-4">
//                   <div className="flex items-center text-xs text-neutral-500">
//                     <span>{episode.duration}</span>
//                     <span className="mx-2">|</span>
//                     <div className="flex items-center">
//                       <Heart size={12} className="mr-1" />
//                       <span>{episode.likes}</span>
//                     </div>
//                   </div>
//                   <button className="bg-neutral-100 hover:bg-neutral-200 text-xs px-3 py-1 rounded-md">
//                     Listen
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="text-center mt-10">
//           <button className="bg-black text-white px-5 py-2 rounded-md">
//             Explore All Episodes
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-white px-6 md:px-12 py-8 border-t border-neutral-200">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="flex items-center space-x-2 mb-4 md:mb-0">
//             <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white font-bold">P</div>
//             <span className="font-semibold">Your Daily Podcast</span>
//           </div>
          
//           <div className="flex space-x-6">
//             <a href="#" className="text-neutral-600 hover:text-neutral-900">Episodes</a>
//             <a href="#" className="text-neutral-600 hover:text-neutral-900">About</a>
//             <a href="#" className="text-neutral-600 hover:text-neutral-900">Contact</a>
//           </div>
//         </div>
        
//         <div className="mt-6 text-center text-neutral-500 text-sm">
//           © 2025 Your Daily Podcast. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }




import { useState } from "react";
import { ArrowRight, Instagram, Facebook, Twitter, Linkedin, Youtube, TrendingUp, BarChart4, MessageCircle, Users, Heart, Share2 } from "lucide-react";
import PageTransition from '../components/PageTransition';
import { AuroraBackground } from '../components/AuroraBackground';

export default function Social() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  
  const socialServices = [
    {
      id: 1,
      title: "Content Strategy Development",
      category: "Strategy",
      image: "/api/placeholder/300/300",
      description: "Build a comprehensive social media strategy aligned with your business goals",
      features: ["Audience analysis", "Platform selection", "Content calendar", "KPI definition"]
    },
    {
      id: 2,
      title: "Content Creation & Publishing",
      category: "Content",
      image: "/api/placeholder/300/300",
      description: "Eye-catching, engaging content tailored to each platform's unique environment",
      features: ["Graphics design", "Copywriting", "Video production", "Scheduling"]
    },
    {
      id: 3,
      title: "Community Management",
      category: "Engagement",
      image: "/api/placeholder/300/300",
      description: "Proactive engagement with your audience to build genuine relationships",
      features: ["Comment monitoring", "Message responses", "Audience growth", "Crisis management"]
    },
    {
      id: 4,
      title: "Paid Social Advertising",
      category: "Advertising",
      image: "/api/placeholder/300/300",
      description: "Strategic ad campaigns that maximize visibility and conversions",
      features: ["Ad strategy", "Creative design", "Audience targeting", "Performance optimization"]
    },
    {
      id: 5,
      title: "Analytics & Reporting",
      category: "Analytics",
      image: "/api/placeholder/300/300",
      description: "Comprehensive analysis of performance with actionable insights",
      features: ["Custom dashboards", "ROI tracking", "Competitive analysis", "Strategic recommendations"]
    },
    {
      id: 6,
      title: "Influencer Marketing",
      category: "Influence",
      image: "/api/placeholder/300/300",
      description: "Strategic partnerships with relevant influencers to expand your reach",
      features: ["Influencer discovery", "Campaign management", "Performance tracking", "Relationship building"]
    }
  ];

  // Navigation for services carousel
  const moveCarousel = (direction) => {
    if (direction === "next") {
      setActiveServiceIndex((prev) => (prev < socialServices.length - 1 ? prev + 1 : 0));
    } else {
      setActiveServiceIndex((prev) => (prev > 0 ? prev - 1 : socialServices.length - 1));
    }
  };

  const platformFeatures = [
    {
      platform: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      features: [
        "Feed post strategy and creation",
        "Stories and Reels production",
        "Engagement campaigns",
        "Hashtag optimization"
      ]
    },
    {
      platform: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      features: [
        "Content calendar management",
        "Group and community building",
        "Paid advertising campaigns",
        "Performance analytics"
      ]
    },
    {
      platform: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      features: [
        "Trending topics monitoring",
        "Engagement and outreach",
        "Real-time conversation management",
        "Strategic hashtagging"
      ]
    },
    {
      platform: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      features: [
        "Professional content development",
        "Thought leadership positioning",
        "B2B lead generation",
        "Industry networking"
      ]
    },
    {
      platform: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      features: [
        "Channel strategy and optimization",
        "Video content planning",
        "Comment moderation",
        "Growth tactics"
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground font-sans">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 pb-16 md:pb-24">
          <AuroraBackground className="absolute inset-0" showRadialGradient={true} />
          
          <div className="relative z-20 container mx-auto px-4 md:px-6 py-8">
            <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm shadow-lg shadow-primary/5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-sm font-semibold text-primary">Social Media Management</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-violet-700">
                  Elevate Your Social Presence
                </span>
              </h1>
              
              <div className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
                <h2>Strategic management that drives engagement, growth, and conversions</h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center pt-4">
                <button className="px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center gap-2 group shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Our Services
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>
                
                <button className="px-8 py-4 rounded-full border-2 border-primary/70 bg-transparent hover:bg-primary/10 text-primary font-medium flex items-center justify-center gap-2 group transition-all">
                  Get a Quote
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>
              </div>
            </div>

            {/* Doodle 1 Placeholder */}
            <div className="absolute top-10 right-10 w-40 h-40 opacity-60">
              <div className="bg-primary/10 w-full h-full rounded-full flex items-center justify-center">
                <p className="text-primary/60 text-sm">Doodle 1</p>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms We Manage */}
        <section className="px-6 md:px-12 py-10 border-t border-secondary/10">
          <p className="text-foreground/60 text-sm mb-6">Platforms we manage:</p>
          <div className="flex flex-wrap items-center justify-start gap-8 md:gap-16">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                <Facebook className="w-5 h-5 text-blue-500" />
              </div>
              <span className="font-medium">Facebook</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                <Instagram className="w-5 h-5 text-pink-500" />
              </div>
              <span className="font-medium">Instagram</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center mr-3">
                <Twitter className="w-5 h-5 text-blue-400" />
              </div>
              <span className="font-medium">Twitter</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-700/20 flex items-center justify-center mr-3">
                <Linkedin className="w-5 h-5 text-blue-700" />
              </div>
              <span className="font-medium">LinkedIn</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                <Youtube className="w-5 h-5 text-red-500" />
              </div>
              <span className="font-medium">YouTube</span>
            </div>
          </div>
        </section>
        
        {/* Main Value Proposition */}
        <section className="px-6 md:px-12 py-16 relative">
          {/* Doodle 2 Placeholder */}
          <div className="absolute right-20 top-16 w-32 h-32 opacity-40">
            <div className="bg-primary/10 w-full h-full rounded-full flex items-center justify-center">
              <p className="text-primary/60 text-sm">Doodle 2</p>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mb-12">
            Transform your brand's social media presence with strategic expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/90 mb-2">Drive measurable growth with data-driven strategies that focus on meaningful metrics beyond just followers.</p>
                <p className="text-foreground/60 text-sm">Conversion-focused content and campaigns</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <BarChart4 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/90 mb-2">Unlock insights about your audience with comprehensive analytics and performance reporting.</p>
                <p className="text-foreground/60 text-sm">Actionable intelligence for optimization</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/90 mb-2">Build authentic connections with your audience through consistent engagement and community management.</p>
                <p className="text-foreground/60 text-sm">Relationship-focused interaction</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/90 mb-2">Leverage strategic influencer partnerships to expand your reach and enhance credibility.</p>
                <p className="text-foreground/60 text-sm">Authentic brand advocacy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="px-6 md:px-12 py-12 bg-secondary/5">
          <div className="max-w-4xl mx-auto bg-background/80 backdrop-blur-sm rounded-xl p-8 relative border border-secondary/10 shadow-sm">
            {/* Doodle 3 Placeholder */}
            <div className="absolute -top-10 -left-10 w-20 h-20 opacity-40">
              <div className="bg-primary/10 w-full h-full rounded-full flex items-center justify-center">
                <p className="text-primary/60 text-xs">Doodle 3</p>
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6">
              We've helped brands increase engagement by an average of 247% within 90 days
            </h3>
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-foreground/60">Clients</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">15M+</p>
                <p className="text-sm text-foreground/60">Followers Gained</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="text-sm text-foreground/60">Client Retention</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="px-6 md:px-12 py-16 bg-background relative">
          {/* Doodle 4 Placeholder */}
          <div className="absolute left-10 bottom-10 w-24 h-24 opacity-40">
            <div className="bg-primary/10 w-full h-full rounded-full flex items-center justify-center">
              <p className="text-primary/60 text-sm">Doodle 4</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-2 text-center">Our Services</h2>
          <p className="text-foreground/60 text-center mb-12">Comprehensive social media management solutions</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialServices.slice(0, 3).map((service) => (
              <div key={service.id} className="bg-background rounded-xl overflow-hidden border border-secondary/10 shadow-sm hover:shadow-md transition-shadow group">
                <div className="aspect-[4/3] bg-secondary/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-secondary/40">Service Image Placeholder</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-foreground/70 mb-4">
                    {service.description}
                  </p>
                  
                  <button className="text-primary font-medium flex items-center gap-2 group/btn">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-medium flex items-center gap-2 mx-auto group">
              View All Services
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </button>
          </div>
        </section>

        {/* Platform Expertise */}
        <section className="px-6 md:px-12 py-16 bg-secondary/5 relative">
          {/* Doodle 5 Placeholder */}
          <div className="absolute right-20 top-20 w-28 h-28 opacity-40">
            <div className="bg-primary/10 w-full h-full rounded-full flex items-center justify-center">
              <p className="text-primary/60 text-sm">Doodle 5</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-2 text-center">Platform Expertise</h2>
          <p className="text-foreground/60 text-center mb-12">Tailored strategies for each social platform</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((platform, index) => (
              <div key={index} className="bg-background p-6 rounded-xl shadow-sm border border-secondary/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-3">
                    {platform.icon}
                  </div>
                  <h3 className="text-xl font-bold">{platform.platform}</h3>
                </div>
                
                <ul className="space-y-2">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Heart className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-6 md:px-12 py-16 bg-background relative">
          <h2 className="text-3xl font-bold mb-2 text-center">Pricing Plans</h2>
          <p className="text-foreground/60 text-center mb-12">Flexible solutions for businesses of all sizes</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {["Starter", "Growth", "Enterprise"].map((tier, index) => (
              <div key={index} className="border border-secondary/10 hover:border-primary/30 rounded-xl overflow-hidden transition-all bg-background/80 backdrop-blur-sm shadow-sm hover:shadow-md">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{tier}</h3>
                  <p className="text-foreground/70 mb-4">
                    {index === 0 ? "For small businesses" : 
                     index === 1 ? "For growing brands" : 
                     "For established companies"}
                  </p>
                  
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-3xl font-bold">
                      ${index === 0 ? "499" : index === 1 ? "999" : "Custom"}
                    </span>
                    {index !== 2 && <span className="text-foreground/70">/month</span>}
                  </div>
                  
                  <button className="w-full py-3 rounded-full bg-primary text-white font-medium">
                    Get Started
                  </button>
                </div>
                
                <div className="border-t border-secondary/10 p-6">
                  <ul className="space-y-3">
                    {[
                      `${index === 0 ? "10" : index === 1 ? "20" : "Unlimited"} posts per month`,
                      `${index === 0 ? "2" : index === 1 ? "3" : "All"} platforms`,
                      `${index === 0 ? "Basic" : index === 1 ? "Advanced" : "Premium"} analytics`,
                      index > 0 ? "Dedicated account manager" : "Email support",
                      index === 2 ? "Strategy consultations" : null,
                      index === 2 ? "Custom content creation" : null
                    ].filter(Boolean).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Heart className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-12 py-16 bg-secondary/5 relative">
          {/* Doodle 6 Placeholder */}
          <div className="absolute left-1/4 bottom-1/4 w-36 h-36 opacity-40">
            <div className="bg-primary/10 w-full h-full rounded-full flex items-center justify-center">
              <p className="text-primary/60 text-sm">Doodle 6</p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-secondary/10 shadow-md">
            <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to transform your social media presence?</h3>
                <p className="text-foreground/70 mb-0">Get a customized strategy for your brand today.</p>
              </div>
              
              <button className="px-6 py-3 whitespace-nowrap rounded-full bg-primary hover:bg-primary/90 text-white font-medium flex items-center gap-2 group">
                Get a Free Consultation
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}