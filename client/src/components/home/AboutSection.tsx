import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Award, Sparkles, Users, ShieldCheck, ArrowRight, Trophy } from "lucide-react";

interface AboutContent {
  description: string;
  mission: string;
  vision: string;
  team: string;
  quality: string;
  images: string[];
}

const AboutSection = () => {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['/api/about'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/about');
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    },
  });

  const fallbackAbout: AboutContent = {
    description: "Founded in 2017 by Imran Mirza with over 30 years of premier entertainment and event industry experience, Pan Eventz has orchestrated some of the nation's most iconic corporate galas, celebrity concerts, royal weddings, and large-scale sports leagues. Our multidisciplinary team combines architectural spatial design, state-of-the-art concert acoustics, and meticulous logistics to deliver truly bespoke, unforgettable experiences.",
    mission: "To craft transcendent live experiences that captivate audiences, elevate brands, and create everlasting memories.",
    vision: "To set the pinnacle benchmark for innovative event production and live entertainment across India and globally.",
    team: "A handpicked elite ensemble of creative directors, audio-visual engineers, and logistics virtuosos.",
    quality: "Zero-compromise engineering, military-grade contingency planning, and white-glove hospitality.",
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=80"
    ]
  };

  const content = aboutContent || fallbackAbout;

  const pillars = [
    {
      icon: Award,
      title: "Our Mission",
      desc: content.mission || fallbackAbout.mission,
      color: "text-[#E5C378]",
      bg: "bg-[#E5C378]/10 border-[#E5C378]/30"
    },
    {
      icon: Sparkles,
      title: "Our Vision",
      desc: content.vision || fallbackAbout.vision,
      color: "text-[#F4E8C1]",
      bg: "bg-[#F4E8C1]/10 border-[#F4E8C1]/30"
    },
    {
      icon: Users,
      title: "Expert Team",
      desc: content.team || fallbackAbout.team,
      color: "text-[#D4AF37]",
      bg: "bg-[#D4AF37]/10 border-[#D4AF37]/30"
    },
    {
      icon: ShieldCheck,
      title: "Quality Commitment",
      desc: content.quality || fallbackAbout.quality,
      color: "text-[#E5C378]",
      bg: "bg-[#E5C378]/10 border-[#E5C378]/30"
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/[0.06]">
      {/* Ambient champagne gold glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#E5C378]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#E5C378]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story & Pillars */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-5 shadow-sm">
              <Trophy className="w-3.5 h-3.5" />
              <span>30+ Years of Industry Leadership</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight leading-[1.15] mb-6">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">Spectacular Moments</span> With Flawless Execution
            </h2>

            {isLoading ? (
              <div className="space-y-4 animate-pulse mb-8">
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
                <div className="h-4 bg-white/10 rounded w-4/6"></div>
              </div>
            ) : (
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light mb-8">
                {content.description}
              </p>
            )}

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${pillar.bg}`}>
                        <Icon className={`w-5 h-5 ${pillar.color}`} />
                      </div>
                      <div>
                        <h4 className="font-cinzel font-semibold text-white text-base group-hover:text-[#E5C378] transition-colors mb-1">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 font-light">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/about">
                <Button className="bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] hover:brightness-110 text-black font-cinzel font-bold px-7 py-5 rounded-xl shadow-lg shadow-[#E5C378]/15 transition-all flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                  <span>Explore Our Legacy</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white/20 hover:border-[#E5C378] text-zinc-200 hover:text-[#E5C378] bg-white/[0.02] hover:bg-[#E5C378]/10 font-cinzel font-medium px-6 py-5 rounded-xl transition-all text-xs sm:text-sm uppercase tracking-widest cursor-pointer">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Luxury Image Grid & Badges */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4 relative">
              
              {/* Image 1 */}
              <div className="space-y-4">
                <div className="relative group overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl h-56 sm:h-64">
                  <img
                    src={content?.images?.[0] || fallbackAbout.images[0]}
                    alt="Pan Eventz Production"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-cinzel font-medium text-white/90">
                    Grand Stage Production
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl h-44 sm:h-52">
                  <img
                    src={content?.images?.[1] || fallbackAbout.images[1]}
                    alt="Corporate Gala"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-cinzel font-medium text-white/90">
                    Corporate Conclaves
                  </div>
                </div>
              </div>

              {/* Image 2 */}
              <div className="space-y-4 pt-6">
                <div className="relative group overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl h-44 sm:h-52">
                  <img
                    src={content?.images?.[2] || fallbackAbout.images[2]}
                    alt="Luxury Wedding"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-cinzel font-medium text-white/90">
                    Destination Weddings
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl h-56 sm:h-64">
                  <img
                    src={content?.images?.[3] || fallbackAbout.images[3]}
                    alt="Live Concert"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-cinzel font-medium text-white/90">
                    Stadium Concerts
                  </div>
                </div>
              </div>

              {/* Floating Center Experience Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl bg-[#0D0D0E]/95 backdrop-blur-xl border border-[#E5C378]/40 shadow-2xl text-center z-20 min-w-[160px]">
                <div className="text-2xl sm:text-3xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">
                  30+ Years
                </div>
                <div className="text-[10px] font-mono font-medium text-zinc-300 uppercase tracking-[0.2em] mt-0.5">
                  Mastery & Trust
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
