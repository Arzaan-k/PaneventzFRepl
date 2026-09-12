import { useState, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  User,
  Tag,
  CheckCircle2,
  Mail,
  Flame
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Top 10 Ultra-Luxury Wedding Trends Dominating 2024 & Beyond",
      slug: "top-10-wedding-trends-2024",
      excerpt: "From multi-tiered kinetic floral canopies to German acoustic mapping, explore the high-end wedding innovations shaping the international luxury scene.",
      content: "Drawing from Imran Mirza's 30+ years of pioneering event management...",
      author: "Imran Mirza",
      authorTitle: "Founder & Master Orchestrator",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      publishDate: "2024-01-15",
      readTime: "6 min read",
      category: "Weddings",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Royal Weddings", "Luxury Decor", "Floral Architecture", "Celebrations"],
      featured: true
    },
    {
      id: 2,
      title: "Executing High-Stakes Corporate Summits for Fortune 500 Leaders",
      slug: "successful-corporate-conference-planning",
      excerpt: "Strategic blueprints for multi-city business conventions, VIP dignitary protocols, and zero-latency audiovisual broadcasting.",
      content: "Corporate conferences are powerful tools for building enterprise stature...",
      author: "Imran Mirza",
      authorTitle: "Founder & Master Orchestrator",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      publishDate: "2024-01-08",
      readTime: "8 min read",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Conferences", "AV Production", "Protocol", "Enterprise"],
      featured: false
    },
    {
      id: 3,
      title: "The Power of Live Experiential Events in Brand Positioning",
      slug: "live-events-digital-marketing",
      excerpt: "Why face-to-face grand architectural brand activations create 10x more lasting engagement than purely digital campaigns.",
      content: "In an increasingly algorithmic world, physical sensory experiences create authentic emotional resonance...",
      author: "Imran Mirza",
      authorTitle: "Founder & Master Orchestrator",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      publishDate: "2023-12-22",
      readTime: "5 min read",
      category: "Brand Activations",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Experiential", "Brand Gala", "PR Events", "Innovation"],
      featured: false
    },
    {
      id: 4,
      title: "Pioneering Live Concert Engineering: Acoustic Line-Arrays & Laser Mapping",
      slug: "event-technology-trends-2024",
      excerpt: "Inside Pan Eventz's technical vault: How d&b audiotechnik systems and P2.6 curved LED matrices transform arena stadium concerts.",
      content: "Sound precision and synchronized kinetic illumination separate ordinary shows from legendary musical nights...",
      author: "Imran Mirza",
      authorTitle: "Founder & Master Orchestrator",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      publishDate: "2023-11-28",
      readTime: "7 min read",
      category: "AV Technology",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Acoustics", "Stage Design", "Laser Show", "Celebrity Concerts"],
      featured: false
    },
    {
      id: 5,
      title: "Curating Dignified Cultural Galas & National Heritage Festivals",
      slug: "inclusive-cultural-events",
      excerpt: "Honoring traditional aesthetics while executing modern crowd safety protocols, presidential security details, and VIP lounge hospitality.",
      content: "Cultural events serve as living bridges of heritage and unity...",
      author: "Imran Mirza",
      authorTitle: "Founder & Master Orchestrator",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      publishDate: "2023-10-14",
      readTime: "6 min read",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Heritage", "Galas", "VIP Hospitality", "State Events"],
      featured: false
    },
    {
      id: 6,
      title: "Stadium Sports & Tournament Logistics: 50,000+ Attendee Orchestration",
      slug: "sports-event-management-guide",
      excerpt: "The master operational framework for multi-gate ticketing, broadcast rigs, VIP player enclosures, and pyrotechnic opening ceremonies.",
      content: "Sports event management demands precision timing under the eyes of international cameras...",
      author: "Imran Mirza",
      authorTitle: "Founder & Master Orchestrator",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      publishDate: "2023-09-02",
      readTime: "9 min read",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Stadium", "Tournaments", "Crowd Logistics", "Broadcast"],
      featured: false
    }
  ];

  const categories = ["all", "Weddings", "Corporate", "Brand Activations", "AV Technology", "Cultural", "Sports"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = filterCategory === "all" || post.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];

  useEffect(() => {
    document.title = "Journal & Insights | Pan Eventz Executive Editorial";
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  return (
    <div className="bg-[#090D16] text-[#F9FAFB] min-h-screen selection:bg-[#E8B923]/30 selection:text-[#E8B923]">
      <Header />

      <main className="pt-24 md:pt-32 pb-24">
        {/* Editorial Hero Header */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#E8B923]/15 via-[#E6193C]/10 to-transparent blur-[120px] rounded-full"></div>
            <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#E8B923]/5 blur-[100px] rounded-full"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#E8B923]/30 backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-[#E8B923]" />
              <span className="text-xs uppercase tracking-widest text-[#E8B923] font-semibold">The Executive Event Journal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white tracking-tight mb-6">
              Insights into Grand <span className="text-gradient-gold">Spectacle & Mastery</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed mb-10">
              Discover industry intelligence, acoustic engineering deep dives, and behind-the-scenes masterclasses from three decades of luxury event leadership.
            </p>

            {/* Search and Category Filter Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="relative mb-6">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input
                  type="text"
                  placeholder="Search articles by title, acoustic technology, wedding trends, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-6 bg-white/[0.04] border-white/10 rounded-2xl text-white placeholder:text-neutral-500 text-base focus:border-[#E8B923] focus:ring-2 focus:ring-[#E8B923]/20 backdrop-blur-md transition-all shadow-2xl"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded bg-white/10"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {categories.map((cat) => {
                  const isActive = filterCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-[#E8B923] to-[#D4A017] text-black shadow-lg shadow-[#E8B923]/20 font-bold scale-105"
                          : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                    >
                      {cat === "all" ? "All Dispatches" : cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* Featured Post Spotlight (shown when no search filter is active) */}
          {!searchTerm && filterCategory === "all" && featuredPost && (
            <div className="mb-20">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="w-5 h-5 text-[#E6193C]" />
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Featured Cover Story</span>
              </div>

              <div className="relative rounded-3xl overflow-hidden glass-card border border-[#E8B923]/20 hover:border-[#E8B923]/50 transition-all duration-500 group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[480px] overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#090D16]"></div>
                    <div className="absolute top-6 left-6">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#E6193C] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                        Cover Feature
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-b from-[#090D16]/90 to-[#0F1420]/95 backdrop-blur-xl">
                    <div>
                      <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4 font-mono">
                        <span className="text-[#E8B923] font-semibold uppercase">{featuredPost.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(new Date(featuredPost.publishDate))}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredPost.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-white mb-4 leading-snug group-hover:text-[#E8B923] transition-colors">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {featuredPost.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-neutral-300 text-xs flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3 text-[#E8B923]" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={featuredPost.authorImage} 
                          alt={featuredPost.author} 
                          className="w-10 h-10 rounded-full border border-[#E8B923]/40 object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-white">{featuredPost.author}</p>
                          <p className="text-xs text-neutral-400">{featuredPost.authorTitle}</p>
                        </div>
                      </div>

                      <Link href={`/blog/${featuredPost.slug}`}>
                        <Button className="bg-gradient-to-r from-[#E8B923] to-[#D4A017] hover:brightness-110 text-black font-semibold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-[#E8B923]/20 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                          Read Story
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Blog Posts & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Articles Column */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <h3 className="text-xl font-playfair font-bold text-white flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-[#E8B923]" />
                  {filterCategory === "all" ? "Latest Published Editorials" : `${filterCategory} Articles`}
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  Showing {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
                </span>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 glass-card rounded-3xl border border-white/10 p-12">
                  <BookOpen className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">No Matching Articles Found</h4>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
                    We couldn't find any articles matching your search query. Try broadening your keywords or clearing the category filters.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setFilterCategory("all");
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 rounded-xl"
                  >
                    Reset Search Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
                    <article 
                      key={post.id} 
                      className="glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-[#E8B923]/40 transition-all duration-500 flex flex-col group hover:-translate-y-1.5 shadow-xl"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#E8B923] text-xs font-semibold uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3 font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#E8B923]" />
                              {formatDate(new Date(post.publishDate))}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>

                          <h3 className="text-lg font-playfair font-bold text-white mb-3 line-clamp-2 group-hover:text-[#E8B923] transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>

                          <p className="text-neutral-400 text-xs sm:text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {post.tags.slice(0, 3).map((tag, idx) => (
                              <span 
                                key={idx} 
                                className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-neutral-400 text-[10px]"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img 
                                src={post.authorImage} 
                                alt={post.author} 
                                className="w-7 h-7 rounded-full object-cover border border-[#E8B923]/30"
                              />
                              <span className="text-xs text-neutral-300 font-medium">{post.author}</span>
                            </div>

                            <Link href={`/blog/${post.slug}`}>
                              <span className="text-xs text-[#E8B923] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Read Article <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Founder Editorial Card */}
              <div className="glass-card rounded-3xl p-6 md:p-8 border border-[#E8B923]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8B923]/10 blur-[50px] rounded-full pointer-events-none"></div>

                <div className="flex items-center gap-4 mb-5">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Imran Mirza" 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E8B923] shadow-lg shadow-[#E8B923]/20"
                  />
                  <div>
                    <h4 className="text-base font-playfair font-bold text-white">Imran Mirza</h4>
                    <p className="text-xs text-[#E8B923] font-semibold">Founder & Master Producer</p>
                    <p className="text-[11px] text-neutral-400">30+ Years Industry Authority</p>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6 border-l-2 border-[#E8B923] pl-3 italic">
                  "Every grand event is a symphony of architecture, acoustics, and emotion. Our journal shares the exact production paradigms we employ for royalty and Fortune 500 summits."
                </p>

                <Link href="/about">
                  <Button variant="outline" className="w-full border-white/10 hover:border-[#E8B923]/50 text-neutral-300 hover:text-white bg-white/[0.02] text-xs py-2 rounded-xl">
                    View Founder Story
                  </Button>
                </Link>
              </div>

              {/* Trending Topics Pill Box */}
              <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5">
                <h4 className="text-base font-playfair font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#E8B923]" />
                  Curated Topic Focus
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Royal Weddings", "d&b Audio", "LED Stage Mapping", "Celebrity Logistics", "Corporate Summits", "Presidential Protocol", "Sports Arenas", "Drone Choreography"].map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchTerm(tag)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-[#E8B923]/15 border border-white/10 hover:border-[#E8B923]/40 text-neutral-300 hover:text-[#E8B923] text-xs transition-all duration-300"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Executive Newsletter Signup */}
              <div className="relative rounded-3xl p-6 md:p-8 overflow-hidden bg-gradient-to-br from-[#121826] via-[#0D121D] to-[#090D16] border border-[#E8B923]/30 shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#E8B923]/10 blur-[60px] rounded-full pointer-events-none"></div>

                <div className="w-10 h-10 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/30 flex items-center justify-center text-[#E8B923] mb-4">
                  <Mail className="w-5 h-5" />
                </div>

                <h4 className="text-xl font-playfair font-bold text-white mb-2">
                  The Pan Eventz Briefing
                </h4>

                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6">
                  Join 4,500+ event professionals, directors, and private clients receiving our monthly event tech digests and luxury trend analyses.
                </p>

                {subscribed ? (
                  <div className="bg-[#E8B923]/10 border border-[#E8B923]/30 rounded-2xl p-4 text-center">
                    <CheckCircle2 className="w-6 h-6 text-[#E8B923] mx-auto mb-2" />
                    <p className="text-xs font-semibold text-white">VIP Subscription Confirmed</p>
                    <p className="text-[11px] text-neutral-400 mt-1">Thank you for joining our executive circle.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <Input
                      type="email"
                      required
                      placeholder="Enter executive email address..."
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="bg-black/40 border-white/15 text-white placeholder:text-neutral-500 text-xs rounded-xl focus:border-[#E8B923]"
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-[#E8B923] to-[#D4A017] hover:brightness-110 text-black font-bold text-xs py-2.5 rounded-xl shadow-lg shadow-[#E8B923]/20"
                    >
                      Subscribe to Editorial
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
