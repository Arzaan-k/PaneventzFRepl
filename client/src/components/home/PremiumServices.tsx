import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Heart, 
  Trophy, 
  GraduationCap, 
  Music, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Layers,
  Radio
} from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  icon: any;
  features: string[];
  capacity: string;
}

const PremiumServices = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const services: ServiceItem[] = [
    {
      id: "corporate",
      slug: "corporate",
      category: "Corporate",
      title: "Fortune 500 Summits & Keynotes",
      tagline: "High-Impact Enterprise Productions",
      description: "End-to-end turnkey event management for annual conventions, keynote conferences, global brand launches, and executive summits with broadcast-grade audio-visuals.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Briefcase,
      features: [
        "Keynote Stage & 4K HDR LED Matrix",
        "Line-Array Audio & 4K Multi-Cam Broadcast",
        "VIP Protocol & High-Security Hospitality",
        "Interactive Digital Registration & Badging"
      ],
      capacity: "500 - 15,000 Delegates"
    },
    {
      id: "wedding",
      slug: "wedding",
      category: "Wedding",
      title: "Royal Palatial Destination Weddings",
      tagline: "Bespoke Fairytale Celebrations",
      description: "Opulent multi-day celebrations across Udaipur, Jaipur, Jodhpur, and Goa with custom architectural mandaps, concert Sangeet stages, and world-class artist coordination.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Heart,
      features: [
        "Architectural Scenography & Floral Artistry",
        "A-List Celebrity & Live Artist Curation",
        "Palace Venue Logistics & White-Glove Hospitality",
        "Cinematic Drone Aerial Film Production"
      ],
      capacity: "200 - 3,000 Guests"
    },
    {
      id: "concert",
      slug: "cultural",
      category: "Concerts",
      title: "Live Stadium Concerts & Festivals",
      tagline: "Arena-Scale Entertainment",
      description: "Spectacular stadium and arena concert productions with d&b audiotechnik acoustics, computerized Claypaky laser arrays, and heavy-duty TÜV-certified staging.",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Music,
      features: [
        "German d&b audiotechnik J-Series Acoustics",
        "DMX Timecode Synchronized Laser Shows",
        "Backstage VVIP Hospitality & Security Logistics",
        "Full Government & Fire Safety Compliance"
      ],
      capacity: "5,000 - 60,000+ Fans"
    },
    {
      id: "sports",
      slug: "sports",
      category: "Sports",
      title: "Championship Leagues & Marathons",
      tagline: "High-Energy Athletic Spectacles",
      description: "Dynamic sporting event organization including national marathons, cricket league opening ceremonies, stadium pyro shows, and live TV broadcasting.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Trophy,
      features: [
        "Live High-Definition TV & OTT Broadcast",
        "Stadium Audio Systems & Scoreboards",
        "Opening Ceremony Fire & Pyro Choreography",
        "Athlete Coordination & Crowd Security Logistics"
      ],
      capacity: "1,000 - 45,000 Athletes & Fans"
    },
    {
      id: "education",
      slug: "education",
      category: "College",
      title: "Youth Festivals & Campus Pro-Nights",
      tagline: "High-Octane Campus Galas",
      description: "Monumental annual day celebrations, convocation ceremonies, inter-collegiate youth festivals, and celebrity pro-nights engineered for massive university crowds.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: GraduationCap,
      features: [
        "Concert-Grade Stage & Heavy Aluminum Truss",
        "Headline Bollywood Artist & DJ Management",
        "Tier-1 Barricading & Crowd Movement Control",
        "Full On-Site Technical Support Team"
      ],
      capacity: "2,000 - 25,000 Students"
    }
  ];

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  const categories = [
    { id: "all", label: "All Disciplines" },
    { id: "corporate", label: "Corporate Summits" },
    { id: "wedding", label: "Royal Weddings" },
    { id: "concerts", label: "Stadium Concerts" },
    { id: "sports", label: "Sports Leagues" },
    { id: "college", label: "Campus Galas" },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#05070B] text-white relative overflow-hidden border-t border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#E8B923]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#E6193C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 text-[#E8B923] border border-[#E8B923]/30 mb-4 shadow-sm">
            <Layers className="w-4 h-4 text-[#E8B923]" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Turnkey Production Capabilities
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat text-white tracking-tight mb-4">
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7A9] via-[#E8B923] to-[#C5981B]">Production Disciplines</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-light">
            From architectural spatial design and concert acoustics to white-glove VVIP hospitality, we engineer unforgettable live experiences.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#E8B923] text-black shadow-lg shadow-[#E8B923]/25 scale-105"
                  : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="group bg-[#0B0F19]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-[#E8B923]/40 hover:shadow-2xl hover:shadow-[#E8B923]/5 transition-all duration-500 flex flex-col hover:-translate-y-2"
              >
                {/* Card Image */}
                <div className="relative h-60 overflow-hidden bg-neutral-950">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05070B]/80 backdrop-blur-md text-white text-xs font-semibold border border-white/15">
                      <Icon className="w-3.5 h-3.5 text-[#E8B923]" />
                      <span>{service.category}</span>
                    </span>
                  </div>

                  {/* Scale Badge */}
                  <div className="absolute bottom-3 right-4 z-10 text-[11px] font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400/20">
                    {service.capacity}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-montserrat text-white group-hover:text-[#E8B923] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="pt-3 space-y-2.5">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                          <CheckCircle2 className="w-4 h-4 text-[#E8B923] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                    <Link 
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-[#E8B923] transition-colors cursor-pointer"
                    >
                      <span>Explore Specs</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>

                    <Link href={`/contact?service=${service.slug}`}>
                      <Button 
                        size="sm"
                        className="bg-[#E8B923]/10 hover:bg-[#E8B923] text-[#E8B923] hover:text-black border border-[#E8B923]/30 rounded-xl px-4 text-xs font-bold transition-all cursor-pointer"
                      >
                        Book Production
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link href="/services">
            <Button 
              size="lg"
              className="bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/20 font-bold rounded-2xl px-8 py-6 text-base shadow-xl gap-2 hover:scale-105 transition-all cursor-pointer"
            >
              <span>View Full Services Catalog</span>
              <ArrowRight className="w-5 h-5 text-[#E8B923]" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;
