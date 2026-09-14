import { 
  Sparkles, 
  Crown, 
  Building2, 
  Music, 
  Trophy, 
  ShieldCheck, 
  ArrowRight,
  MessageCircle,
  CalendarCheck,
  CheckCircle2,
  Users
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface EventDiscipline {
  id: number;
  icon: any;
  title: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  scaleMetric: string;
  image: string;
}

const FeaturedTechnologies = () => {
  const disciplines: EventDiscipline[] = [
    {
      id: 1,
      icon: Music,
      category: "Live Entertainment & Concerts",
      title: "Stadium Arenas & Celebrity Galas",
      tagline: "Unrivaled Star Power & Mass Crowd Choreography",
      description: "From electrifying stadium concerts with iconic vocalists like Sonu Nigam and Mika Singh to private black-tie galas, we deliver zero-error artist management, hospitality riders, and majestic stagecraft.",
      highlights: [
        "A-List Headline Artist Booking & VIP Escort",
        "Stadium Crowd Dynamics & Safe Security Protocols",
        "Acoustic Mastery & Synchronized Visual Shows"
      ],
      scaleMetric: "Up to 50,000+ Attendees",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      icon: Crown,
      category: "Luxury Destination Weddings",
      title: "Royal Palaces & Bespoke Celebrations",
      tagline: "Regal Heritage & White-Glove Hospitality",
      description: "Crafting once-in-a-lifetime fairy-tale weddings across Rajasthan's historic palaces and Goa's luxury coastal resorts. Complete curation from grand Sangeet nights to traditional ceremonies.",
      highlights: [
        "Heritage Palace Scouting & Exclusive Venue Curation",
        "Thematic Floral & Architectural Spatial Design",
        "End-to-End VIP Guest Concierge & Hospitality"
      ],
      scaleMetric: "Intimate to 3,000+ Guests",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      icon: Building2,
      category: "Corporate & Sovereign Summits",
      title: "Conclaves, Brand Launches & Summits",
      tagline: "Flawless Execution for Fortune 500 Brands",
      description: "Trusted by industry titans like Reliance, Tata, and HDFC for high-impact annual conclaves, monumental product launches, and dealer conferences with turnkey precision.",
      highlights: [
        "Executive Leadership & Keynote Experience",
        "High-Impact Brand Reveal & Spatial Scenography",
        "Hybrid Webcast & Global Live Telecast Feeds"
      ],
      scaleMetric: "500 to 10,000+ Delegates",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      icon: Trophy,
      category: "Sports & Grand Ceremonies",
      title: "National Sports Leagues & Festivals",
      tagline: "High-Energy Ceremonies & Fan Immersions",
      description: "Producing stadium opening and closing ceremonies, dynamic athlete reveal stages, laser mapping, and high-energy festival grounds with military-grade logistics.",
      highlights: [
        "Spectacular Opening & Closing Ceremonies",
        "Synchronized Pyrotechnics & Laser Displays",
        "Complete Fan-Zone & VIP Hospitality Lounges"
      ],
      scaleMetric: "Arena & Stadium Scale",
      image: "https://images.unsplash.com/photo-1508997449629-303059a039c0?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#050505] text-white relative overflow-hidden border-t border-white/[0.06]">
      {/* Ambient luxury champagne glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#E5C378]/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 text-[#E5C378] border border-[#E5C378]/30 mb-5 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em]">
              30+ Years of Master Event Curation
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight mb-5">
            Signature <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">Event Productions</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
            Founded by Imran Mirza, Pan Eventz conceptualizes, architects, and executes iconic live experiences across India and the UAE with zero-compromise grandeur.
          </p>
        </div>

        {/* 4 Core Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {disciplines.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="group bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] hover:border-[#E5C378]/40 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Banner with Gradient Overlay */}
                <div className="relative h-60 sm:h-72 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E] via-[#0D0D0E]/40 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono tracking-wider">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.category}</span>
                  </div>

                  {/* Scale Metric Pill */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#E5C378]/15 backdrop-blur-md border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono">
                    {item.scaleMetric}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white group-hover:text-[#E5C378] transition-colors mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs font-mono uppercase tracking-wider text-[#E5C378]/80 mb-4">
                      {item.tagline}
                    </p>

                    <p className="text-sm text-zinc-400 leading-relaxed font-light mb-6">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2.5 pt-4 border-t border-white/[0.08] mb-6">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-[#E5C378] shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/918082024787?text=Hi%20Pan%20Eventz,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(item.title)}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-cinzel font-semibold text-[#E5C378] hover:text-white transition-colors group-hover:translate-x-1 duration-300"
                    >
                      <span>Inquire For This Discipline</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Pan Eventz Turnkey Promise Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0D0D0E] via-[#121215] to-[#0D0D0E] border border-[#E5C378]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#E5C378] text-xs font-mono uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>The Pan Eventz Turnkey Guarantee</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-cinzel font-bold text-white">
              Bespoke Vision. Flawless Precision. Unforgettable Impact.
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              We manage every nuance from initial artistic concept and celebrity booking to on-ground production and guest hospitality with white-glove mastery.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <a
              href="https://wa.me/918082024787?text=Hi%20Pan%20Eventz,%20I%20would%20like%20to%20discuss%20planning%20an%20event."
              target="_blank"
              rel="noreferrer"
            >
              <Button className="bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] hover:brightness-110 text-black font-cinzel font-bold px-7 py-6 rounded-2xl shadow-lg shadow-[#E5C378]/20 flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </Button>
            </a>

            <Link href="/contact">
              <Button variant="outline" className="border-white/20 hover:border-[#E5C378] text-white hover:text-[#E5C378] bg-white/[0.03] font-cinzel font-medium px-6 py-6 rounded-2xl transition-all text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedTechnologies;
