import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  Share2, 
  Bookmark, 
  Check, 
  Sparkles,
  Building2,
  CheckCircle2
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
}

const BlogDetailPage = () => {
  const [match, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Top 10 Ultra-Luxury Wedding Trends Dominating 2024 & Beyond",
      slug: "top-10-wedding-trends-2024",
      excerpt: "From multi-tiered kinetic floral canopies to German acoustic mapping, explore the high-end wedding innovations shaping the international luxury scene.",
      content: `Drawing from Imran Mirza's 30+ years of experience orchestrating bespoke royal weddings, here are the landmark architectural and acoustic trends dominating 2024 and beyond.

**1. Kinetic Floral Sculptures & Dynamic Ceiling Architecture**
Modern luxury couples are moving beyond static floral arrangements. The new benchmark integrates motorized ceiling trusses that lower and raise thousands of suspended blooms in choreographed synchronization with ambient orchestral music, creating an immersive living canopy.

**2. Acoustic Zone Precision with German Line-Arrays**
A recurring challenge in high-society weddings is balancing vibrant dance floor energy with crystal-clear conversation in VIP dining suites. Pan Eventz utilizes computerized d&b audiotechnik line-arrays, acoustically shaping soundwaves so that the dance floor experiences thunderous concert-grade fidelity while surrounding dining lounges remain intimately conversational.

**3. Architectural 3D Video Mapping on Custom Facades**
Traditional backdrops are giving way to bespoke 3D projection-mapped architectural facades. Historic fortresses, palace courtyards, and grand ballrooms are transformed into dynamic visual tapestries showcasing the couple's personal journey in cinema-grade 4K resolution.

**4. Midnight Speakeasy & Bespoke Mixology Enclosures**
After the main reception, guests are ushered through concealed corridors into secret, ultra-exclusive afterparty lounges featuring custom velvet banquettes, curated molecular cocktail bars, and international guest DJs.

**5. Seamless Drone Choreography & Zero-Latency Livestreaming**
For high-profile destination weddings with global dignitaries unable to travel, synchronized outdoor drone light formations create bespoke celestial signatures, while multi-camera 4K broadcast arrays beam ultra-private streams to private residences worldwide.`,
      author: "Imran Mirza",
      authorTitle: "Founder & Master Orchestrator",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      publishDate: "2024-01-15",
      readTime: "6 min read",
      category: "Weddings",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Royal Weddings", "Luxury Decor", "Floral Architecture", "Celebrations"]
    },
    {
      id: 2,
      title: "Executing High-Stakes Corporate Summits for Fortune 500 Leaders",
      slug: "successful-corporate-conference-planning",
      excerpt: "Strategic blueprints for multi-city business conventions, VIP dignitary protocols, and zero-latency audiovisual broadcasting.",
      content: `High-stakes corporate summits require flawless precision. When global CEOs, government ministers, and investors convene, technical failure is not an option.

**1. Presidential-Grade Protocol & Redundant Security**
From biometrically monitored green rooms to armored convoy logistical coordination, the VIP experience begins miles before the venue threshold.

**2. Zero-Latency Multi-Hub Broadcasting**
Linking international executive hubs across London, Dubai, and Mumbai requires dedicated enterprise fiber conduits and backup satellite uplinks with sub-millisecond audio synchronization.

**3. Interactive Data Visualization on 200-Foot LED Curved Matrices**
Keynotes no longer rely on standard slides. Our engineers develop real-time 3D telemetry displays mapped seamlessly onto curved P2.6 ultra-HD LED video walls.

**4. Ergonomic VIP Breakout Lounges**
Sustaining cognitive engagement across multi-day summits demands curated acoustic isolation, circadian rhythm lighting, and artisanal catering.`,
      author: "Imran Mirza",
      authorTitle: "Founder & Master Orchestrator",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      publishDate: "2024-01-08",
      readTime: "8 min read",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Conferences", "AV Production", "Protocol", "Enterprise"]
    },
    {
      id: 3,
      title: "The Power of Live Experiential Events in Brand Positioning",
      slug: "live-events-digital-marketing",
      excerpt: "Why face-to-face grand architectural brand activations create 10x more lasting engagement than purely digital campaigns.",
      content: `In an era of hyper-saturated digital screens, physical grandeur creates irreversible psychological impact.

**1. Tactile Brand Immersion**
A physical environment engages all five senses simultaneously—olfactory bespoke scents, tactile architectural textures, and directional soundscapes.

**2. Amplification through High-Production Content Capture**
Live events serve as the premier content studio. Our cinematic production teams capture 4K broadcast footage, aerial drone cinematography, and immediate social dispatches that generate millions of organic impressions.`,
      author: "Imran Mirza",
      authorTitle: "Founder & Master Orchestrator",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      publishDate: "2023-12-22",
      readTime: "5 min read",
      category: "Brand Activations",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
      tags: ["Experiential", "Brand Gala", "PR Events", "Innovation"]
    }
  ];

  useEffect(() => {
    if (params?.slug) {
      const foundPost = blogPosts.find(p => p.slug === params.slug) || blogPosts[0];
      setPost(foundPost);
      document.title = `${foundPost.title} | Pan Eventz Editorial`;
      window.scrollTo(0, 0);
    }
  }, [params?.slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!match || !post) {
    return (
      <div className="bg-[#090D16] text-[#F9FAFB] min-h-screen">
        <Header />
        <main className="py-32 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Editorial Post Not Found</h1>
          <Link href="/blog">
            <Button className="bg-[#E8B923] text-black font-semibold">Back to Journal</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('**') && paragraph.includes('**\n')) {
          const parts = paragraph.split('**\n');
          const heading = parts[0].replace(/\*\*/g, '');
          const body = parts[1];
          return (
            <div key={index} className="mb-8">
              <h3 className="text-xl sm:text-2xl font-playfair font-bold text-[#E8B923] mb-3">
                {heading}
              </h3>
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
                {body}
              </p>
            </div>
          );
        } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          const text = paragraph.replace(/\*\*/g, '');
          return (
            <h3 key={index} className="text-xl sm:text-2xl font-playfair font-bold text-[#E8B923] mb-3 mt-8">
              {text}
            </h3>
          );
        } else {
          return (
            <p key={index} className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light mb-6">
              {paragraph}
            </p>
          );
        }
      });
  };

  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-[#090D16] text-[#F9FAFB] min-h-screen selection:bg-[#E8B923]/30 selection:text-[#E8B923]">
      <Header />

      <main className="pt-24 md:pt-32 pb-24">
        {/* Article Breadcrumb & Back */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-[#E8B923] transition-colors py-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Executive Journal
            </button>
          </Link>
        </div>

        {/* Article Hero */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs text-neutral-500 font-mono">•</span>
              <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E8B923]" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white tracking-tight leading-tight mb-8">
              {post.title}
            </h1>

            {/* Author bar & share actions */}
            <div className="p-5 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#E8B923]"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{post.author}</h4>
                  <p className="text-xs text-neutral-400">{post.authorTitle} • Published {formatDate(new Date(post.publishDate))}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleShare}
                  variant="outline" 
                  className="border-white/10 hover:border-[#E8B923]/50 text-neutral-300 hover:text-white bg-white/[0.02] text-xs px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-[#E8B923]" />}
                  {copied ? "Link Copied!" : "Share Article"}
                </Button>
              </div>
            </div>
          </header>

          {/* Lead Image */}
          <div className="relative rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-[400px] sm:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/60 via-transparent to-transparent"></div>
          </div>

          {/* Executive Summary Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121826] to-[#0A0E17] border border-[#E8B923]/30 mb-12 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#E8B923]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E8B923]">Executive Takeaway</h4>
            </div>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light italic">
              "{post.excerpt}"
            </p>
          </div>

          {/* Rich Content */}
          <div className="prose prose-invert max-w-none mb-14">
            {formatContent(post.content)}
          </div>

          {/* Tag Badges */}
          <div className="pt-8 pb-10 border-t border-b border-white/10 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-[#E8B923]" />
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Indexed Themes</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Biography Box */}
          <div className="p-8 rounded-3xl glass-card border border-[#E8B923]/20 mb-16 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img 
                src={post.authorImage} 
                alt={post.author} 
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#E8B923] shadow-lg shadow-[#E8B923]/20"
              />
              <div>
                <h4 className="text-lg font-playfair font-bold text-white mb-1">{post.author}</h4>
                <p className="text-xs text-[#E8B923] font-semibold mb-3">{post.authorTitle}</p>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  With over 30 years of elite industry stewardship, Imran Mirza has directed landmark corporate summits, presidential state galas, and ultra-luxury weddings across India and the Middle East.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          <div>
            <h3 className="text-2xl font-playfair font-bold text-white mb-8 flex items-center justify-between">
              <span>Related Editorial Dispatches</span>
              <Link href="/blog">
                <span className="text-xs text-[#E8B923] font-sans font-semibold flex items-center gap-1 hover:underline">
                  All Articles <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link key={rel.id} href={`/blog/${rel.slug}`}>
                  <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-[#E8B923]/40 transition-all p-5 flex flex-col justify-between group cursor-pointer h-full">
                    <div>
                      <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                        <img 
                          src={rel.image} 
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#E8B923] text-[10px] font-bold uppercase">
                          {rel.category}
                        </span>
                      </div>
                      <h4 className="text-base font-playfair font-bold text-white mb-2 line-clamp-2 group-hover:text-[#E8B923] transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 font-light mb-4">
                        {rel.excerpt}
                      </p>
                    </div>

                    <span className="text-xs text-[#E8B923] font-semibold flex items-center gap-1 pt-2 border-t border-white/5">
                      Read Dispatch <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;