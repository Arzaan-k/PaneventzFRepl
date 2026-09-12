import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Heart, 
  Trophy, 
  GraduationCap, 
  Theater, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  Calendar,
  Layers,
  Flame
} from "lucide-react";

interface ServiceDetail {
  id: number;
  slug: string;
  title: string;
  banner: string;
  description: string;
  features: { id: number; title: string; description: string }[];
  process: { id: number; title: string; description: string }[];
  gallery: { id: number; imageUrl: string; alt: string }[];
}

const serviceMeta: Record<string, { icon: any; title: string; tag: string; banner: string; price: string }> = {
  corporate: {
    icon: Building2,
    title: "Corporate Conclaves & Annual Summits",
    tag: "Fortune 500 Grade",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80",
    price: "Custom Packages Available"
  },
  wedding: {
    icon: Heart,
    title: "Royal Destination Weddings",
    tag: "Ultra-Luxury Curation",
    banner: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
    price: "Bespoke Royal Production"
  },
  sports: {
    icon: Trophy,
    title: "Stadium Sports Leagues & Marathons",
    tag: "Mass-Audience AV",
    banner: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1920&q=80",
    price: "Arena & Stadium Scaled"
  },
  education: {
    icon: GraduationCap,
    title: "School & University Mega Festivals",
    tag: "High Energy Concerts",
    banner: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920&q=80",
    price: "Campus Fest Packages"
  },
  cultural: {
    icon: Theater,
    title: "Live Concerts & Celebrity Management",
    tag: "A-List Artists",
    banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80",
    price: "Artist & Rider Management"
  },
  logistics: {
    icon: Radio,
    title: "Live AV Infrastructure & Equipment Rental",
    tag: "German Line Array & 4K LED",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80",
    price: "Technical Inventory Rental"
  }
};

const ServicePage = () => {
  const [, params] = useRoute("/services/:serviceType?");
  const serviceType = params?.serviceType || "all";
  const [activeTab, setActiveTab] = useState(
    serviceType !== "all" && serviceMeta[serviceType] ? serviceType : "corporate"
  );

  // Fetch service details
  const { data: services = [] } = useQuery({
    queryKey: ['/api/services'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) return [];
        return await res.json();
      } catch {
        return [];
      }
    },
  });

  const { data: serviceDetail, isLoading: loadingDetail } = useQuery({
    queryKey: ['/api/services', activeTab],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/services/${activeTab}`);
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    },
    enabled: !!activeTab && activeTab !== "all"
  });

  const currentMeta = serviceMeta[activeTab] || serviceMeta.corporate;

  const fallbackServiceDetail: ServiceDetail = {
    id: 1,
    slug: activeTab,
    title: currentMeta.title,
    banner: currentMeta.banner,
    description: "Pan Eventz engineers end-to-end event infrastructure, combining architectural spatial layouts, high-fidelity concert acoustics, laser visual choreography, and white-glove hospitality to make your event a triumph.",
    features: [
      {
        id: 1,
        title: "Architectural Spatial Design",
        description: "Custom 3D stage schematics, attendee flow engineering, and immersive ambient decor."
      },
      {
        id: 2,
        title: "Concert Acoustic & 4K LED Walls",
        description: "German line array sound reinforcement with ultra-high-definition LED matrices."
      },
      {
        id: 3,
        title: "A-List Celebrity & Artist Management",
        description: "Direct talent procurement, rider fulfillment, security escorts, and rehearsal supervision."
      },
      {
        id: 4,
        title: "Military-Grade Contingency Management",
        description: "Redundant power generators, backup audio channels, and comprehensive crowd control."
      }
    ],
    process: [
      {
        id: 1,
        title: "Vision & Creative Scoping",
        description: "In-depth briefing with our senior directors to map attendee profile, brand essence, and key milestones."
      },
      {
        id: 2,
        title: "Technical Blueprint & 3D Renderings",
        description: "Complete stage CAD models, sound coverage heatmaps, lighting cues, and vendor timelines."
      },
      {
        id: 3,
        title: "Live Production Execution",
        description: "On-site master control desk commanding audio, lighting, video, artist entries, and hospitality."
      },
      {
        id: 4,
        title: "Post-Production Archive",
        description: "Complete 4K aftermovies, executive telemetry reports, and financial reconciliation."
      }
    ],
    gallery: [
      {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=80",
        alt: "Main Stage Production"
      },
      {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
        alt: "Grand Lighting Setup"
      },
      {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80",
        alt: "VIP Audience Experience"
      }
    ]
  };

  const displayServiceDetail = serviceDetail ? {
    ...serviceDetail,
    title: serviceDetail.title || currentMeta.title,
    banner: serviceDetail.banner || currentMeta.banner,
    features: (serviceDetail.features && serviceDetail.features.length > 0)
      ? serviceDetail.features.map((f: any, idx: number) => ({
          id: idx + 1,
          title: f.title || f.text || `Service Advantage ${idx + 1}`,
          description: f.description || "Delivered to international concert and corporate specifications."
        }))
      : fallbackServiceDetail.features,
    process: (serviceDetail.processSteps && serviceDetail.processSteps.length > 0)
      ? serviceDetail.processSteps.map((s: any, idx: number) => ({
          id: s.order || idx + 1,
          title: s.title,
          description: s.description
        }))
      : fallbackServiceDetail.process,
    gallery: serviceDetail.gallery && serviceDetail.gallery.length > 0 ? serviceDetail.gallery : fallbackServiceDetail.gallery
  } : fallbackServiceDetail;

  useEffect(() => {
    if (serviceType !== "all" && serviceMeta[serviceType]) {
      setActiveTab(serviceType);
    }
  }, [serviceType]);

  useEffect(() => {
    document.title = `${displayServiceDetail.title} | Pan Eventz Services`;
  }, [displayServiceDetail.title]);

  const categories = Object.keys(serviceMeta);

  return (
    <div className="min-h-screen bg-[#090D16] text-white selection:bg-[#E8B923] selection:text-black">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section 
          className="relative min-h-[55vh] flex items-center justify-center bg-center bg-cover overflow-hidden border-b border-white/10"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(9, 13, 22, 0.85), rgba(9, 13, 22, 0.95)), url('${displayServiceDetail.banner}')`
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 text-center relative z-10 py-16 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentMeta.tag}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6 font-montserrat">
              {displayServiceDetail.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              {displayServiceDetail.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-[#E6193C] to-[#b8132e] hover:from-[#f02246] hover:to-[#c71734] text-white font-bold px-7 py-5 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Request Proposal</span>
                </Button>
              </Link>
              <a href="tel:+919821337523">
                <Button variant="outline" className="border-white/20 hover:border-[#E8B923] text-white hover:text-[#E8B923] bg-white/[0.04] font-medium px-6 py-5 rounded-xl transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer">
                  <PhoneCall className="w-4 h-4 text-[#E8B923]" />
                  <span>Direct Inquiry</span>
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Category Navigation Tabs */}
        <section className="py-8 bg-[#060910] border-b border-white/5 sticky top-20 z-30 backdrop-blur-md bg-opacity-95">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar justify-start md:justify-center">
              {categories.map((catKey) => {
                const meta = serviceMeta[catKey];
                const Icon = meta.icon;
                const isActive = activeTab === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => setActiveTab(catKey)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer border flex items-center gap-2 ${
                      isActive
                        ? "bg-[#E8B923] text-black border-[#E8B923] shadow-lg shadow-[#E8B923]/20"
                        : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-[#E8B923]/40 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{meta.title.split('&')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Core Details */}
        <section className="py-16 md:py-24 bg-[#090D16]">
          <div className="container mx-auto px-4 max-w-6xl">
            
            {/* Features Grid */}
            <div className="mb-20">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B923]/10 text-[#E8B923] text-xs font-semibold uppercase tracking-wider mb-3">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Key Technical Capabilities</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Why Industry Leaders Choose Pan Eventz
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayServiceDetail.features.map((feature: any) => (
                  <div
                    key={feature.id}
                    className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#E8B923]/40 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/20 flex items-center justify-center text-[#E8B923] shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#E8B923] transition-colors mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Execution Process */}
            <div className="mb-20">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Standardized Production Pipeline</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Flawless Execution from Concept to Reality
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayServiceDetail.process.map((step: any, idx: number) => (
                  <div
                    key={step.id || idx}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden"
                  >
                    <div className="text-4xl font-black text-white/10 mb-4">
                      0{idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Previews */}
            {displayServiceDetail.gallery && displayServiceDetail.gallery.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-montserrat">
                      Recent Production Captures
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-light">
                      Live photographs from our executed events.
                    </p>
                  </div>
                  <Link href="/media">
                    <Button variant="outline" className="border-white/20 text-white hover:border-[#E8B923] hover:text-[#E8B923] bg-white/[0.02] text-xs sm:text-sm rounded-xl cursor-pointer">
                      <span>View Full Media Archive</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {displayServiceDetail.gallery.map((img: any, gIdx: number) => (
                    <div
                      key={img.id || gIdx}
                      className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-black/40 group relative"
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.alt || "Pan Eventz Production"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-xs font-semibold text-white">
                          {img.alt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;