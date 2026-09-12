import { useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Statistics from "@/components/home/Statistics";
import { 
  Trophy, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Compass, 
  Users, 
  ArrowRight,
  PhoneCall,
  Calendar
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface AboutContent {
  mission: string;
  vision: string;
  history: string;
  values: { id: number; title: string; description: string; icon: any }[];
  milestones: Milestone[];
  team: TeamMember[];
  clients: string[];
}

const AboutPage = () => {
  const content: AboutContent = {
    mission: "To engineer transcendent live experiences that captivate audiences, elevate brands, and create everlasting memories through architectural spatial design, concert acoustics, and zero-compromise execution.",
    vision: "To set the benchmark for luxury event production and stadium-scale live entertainment across India, the Middle East, and worldwide.",
    history: "Founded in 2017 by industry veteran Imran Mirza with over 30 years of premier entertainment and event industry experience, Pan Eventz has orchestrated over 2,500+ landmark corporate galas, celebrity concerts, royal destination weddings, and large-scale sports leagues across 100+ cities in India and abroad.",
    values: [
      {
        id: 1,
        title: "Flawless Execution",
        description: "Zero-tolerance for error, millisecond audio-visual synchronization, and white-glove hospitality.",
        icon: Award
      },
      {
        id: 2,
        title: "Creative Innovation",
        description: "Architectural stage structures, dynamic laser mapping, and bespoke sensory experiences.",
        icon: Sparkles
      },
      {
        id: 3,
        title: "Unwavering Integrity",
        description: "Transparent budgeting, verified technical riders, and absolute confidentiality for VIPs.",
        icon: ShieldCheck
      },
      {
        id: 4,
        title: "Executive Oversight",
        description: "Direct executive leadership oversight from concept development through final applause.",
        icon: Users
      }
    ],
    milestones: [
      {
        year: "1994",
        title: "The Genesis",
        description: "Imran Mirza starts orchestrating large-scale concert acoustics and touring artist hospitality across India."
      },
      {
        year: "2005",
        title: "Mega Stadium Productions",
        description: "Pioneered computerized line-array sound engineering and multi-tier stage rigging for national stadium shows."
      },
      {
        year: "2017",
        title: "Founding of Pan Eventz",
        description: "Formal establishment of Pan Eventz as a full-spectrum luxury event management and AV infrastructure powerhouse."
      },
      {
        year: "2020",
        title: "Hybrid & Virtual Innovation",
        description: "Engineered ultra-low-latency 4K live broadcast infrastructure for multinational corporate summits."
      },
      {
        year: "2024",
        title: "2,500+ Milestone Surpassed",
        description: "Celebrated 2,500+ flawless productions across 100+ cities with 98% recurring enterprise client loyalty."
      },
      {
        year: "2026",
        title: "Global Turnkey Expansion",
        description: "Expanding turnkey luxury destination weddings and international corporate pavilions across UAE and Europe."
      }
    ],
    team: [
      {
        id: 1,
        name: "Imran Mirza",
        position: "Founder & Managing Director",
        bio: "With over 30 years of landmark experience in event production, Imran Mirza has directed iconic events across India and the UAE. His mastery over concert acoustics, stadium logistics, VIP artist security, and royal destination weddings has positioned Pan Eventz as an industry vanguard trusted by Fortune 500 giants and celebrity icons.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=700&q=80"
      },
      {
        id: 2,
        name: "Rajesh Nair",
        position: "Chief Technical Officer & AV Director",
        bio: "Specializing in d&b audiotechnik acoustics, mega LED matrix mapping, and computerized truss rigging with 18+ years of stadium tour engineering experience.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=700&q=80"
      },
      {
        id: 3,
        name: "Alisha Varma",
        position: "Head of Creative Production & Scenography",
        bio: "Architectural scenographer and lighting designer crafting immersive environments for luxury weddings, fashion weeks, and brand reveals.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=700&q=80"
      },
      {
        id: 4,
        name: "Farhan Sheikh",
        position: "Director of VIP Artist & Guest Hospitality",
        bio: "Spearheading red-carpet protocol, artist rider fulfillment, luxury transportation, and white-glove security for dignitaries and celebrity performers.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=700&q=80"
      }
    ],
    clients: [
      "Tata Motors",
      "Reliance Industries",
      "Aditya Birla Group",
      "HDFC Bank",
      "ICICI Bank",
      "DLF Luxury",
      "Mahindra & Mahindra",
      "Sunburn Festival",
      "Bollywood Music Project",
      "Taj Hotels & Resorts"
    ]
  };

  useEffect(() => {
    document.title = "About Our Legacy & Leadership | Pan Eventz";
  }, []);

  return (
    <div className="min-h-screen bg-[#090D16] text-white selection:bg-[#E8B923] selection:text-black">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section 
          className="relative min-h-[60vh] flex items-center justify-center bg-center bg-cover overflow-hidden border-b border-white/10"
          style={{ 
            backgroundImage: "linear-gradient(to bottom, rgba(9, 13, 22, 0.85), rgba(9, 13, 22, 0.95)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80')"
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 text-center relative z-10 py-16 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest mb-6">
              <Trophy className="w-3.5 h-3.5" />
              <span>30+ Years Industry Heritage</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 font-montserrat">
              The Art & Engineering of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B923] via-amber-200 to-[#E8B923]">Iconic Events</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              Founded in 2017 by Imran Mirza, Pan Eventz brings three decades of live entertainment precision and bespoke luxury curation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-[#E6193C] to-[#b8132e] hover:from-[#f02246] hover:to-[#c71734] text-white font-bold px-7 py-5 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center gap-2 cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Plan With Our Team</span>
                </Button>
              </Link>
              <a href="tel:+919821337523">
                <Button variant="outline" className="border-white/20 hover:border-[#E8B923] text-white hover:text-[#E8B923] bg-white/[0.04] font-medium px-6 py-5 rounded-xl transition-all flex items-center gap-2 cursor-pointer">
                  <PhoneCall className="w-4 h-4 text-[#E8B923]" />
                  <span>Call Headquarters</span>
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Mission & Vision Strip */}
        <section className="py-16 md:py-24 bg-[#060910] border-b border-white/5">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#E8B923]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/20 flex items-center justify-center text-[#E8B923] mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-montserrat">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  {content.mission}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-primary/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-montserrat">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  {content.vision}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Spotlight */}
        <section className="py-20 md:py-28 bg-[#090D16] border-b border-white/5 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                  <img
                    src={content.team[0].image}
                    alt="Imran Mirza - Founder & CEO"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#E8B923] text-black font-bold text-xs uppercase tracking-wider mb-2">
                      Founder & Managing Director
                    </div>
                    <h3 className="text-2xl font-black text-white font-montserrat">
                      Imran Mirza
                    </h3>
                    <p className="text-xs text-slate-300">
                      30+ Years Event Industry Vanguard
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Leadership Profile</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-montserrat">
                  Mastery Forged Over <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B923] to-amber-200">Three Decades</span>
                </h2>

                <p className="text-base text-slate-300 leading-relaxed font-light">
                  {content.team[0].bio}
                </p>

                <p className="text-base text-slate-300 leading-relaxed font-light">
                  {content.history}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <Link href="/contact">
                    <Button className="bg-[#E8B923] hover:bg-amber-300 text-black font-bold px-7 py-5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer">
                      <span>Schedule Leadership Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Core Pillars / Values */}
        <section className="py-20 md:py-28 bg-[#060910]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B923]/10 text-[#E8B923] text-xs font-semibold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>Operating Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-montserrat">
                Our Non-Negotiable Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.values.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.id}
                    className="p-7 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#E8B923]/40 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/20 flex items-center justify-center text-[#E8B923] mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#E8B923] transition-colors mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 30-Year Milestones Timeline */}
        <section className="py-20 md:py-28 bg-[#090D16] border-t border-white/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>Three Decades of Innovation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-montserrat">
                Our Journey & Legacy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.milestones.map((milestone, idx) => (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#E8B923]/40 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="text-4xl font-black text-[#E8B923]/30 font-montserrat mb-3 group-hover:text-[#E8B923] transition-colors">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-montserrat">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership & Executive Production Team */}
        <section className="py-20 md:py-28 bg-[#060910] border-t border-white/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest mb-3">
                <Users className="w-3.5 h-3.5" />
                <span>Executive Command</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-montserrat">
                The Masterminds Behind The Magic
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.team.map((member) => (
                <div 
                  key={member.id}
                  className="rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-[#E8B923]/40 transition-all duration-500 group flex flex-col"
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-neutral-900">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-lg font-bold text-white font-montserrat">{member.name}</h4>
                      <p className="text-xs text-[#E8B923] font-medium">{member.position}</p>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee Enterprise Clients */}
        <section className="py-16 bg-[#090D16] border-t border-b border-white/5">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <p className="text-xs uppercase tracking-widest text-[#E8B923] font-bold mb-8">
              Trusted By India's Foremost Corporations, Festivals & Royal Families
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {content.clients.map((client, idx) => (
                <div 
                  key={idx}
                  className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 font-medium text-sm hover:border-[#E8B923]/40 hover:text-white transition-all shadow-sm"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics Strip */}
        <Statistics />
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
