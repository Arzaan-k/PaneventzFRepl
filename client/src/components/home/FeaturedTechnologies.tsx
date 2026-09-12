import { 
  Volume2, 
  Video, 
  Lightbulb, 
  Tv, 
  Sparkles, 
  Layers, 
  Radio, 
  SlidersHorizontal,
  ShieldCheck,
  CheckCircle2,
  Cpu
} from "lucide-react";

interface TechCapability {
  id: number;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  specs: string;
  metric: string;
}

const FeaturedTechnologies = () => {
  const technologies: TechCapability[] = [
    {
      id: 1,
      icon: Volume2,
      title: "Concert Line-Array Acoustics",
      subtitle: "German d&b audiotechnik & L-Acoustics",
      description: "Computer-modeled line-array sound dispersion delivering zero-distortion vocal clarity and balanced acoustic sound pressure across 60,000+ seat stadiums.",
      specs: "Ultra-low THD, 360° phase alignment",
      metric: "142 dB SPL Output"
    },
    {
      id: 2,
      icon: Tv,
      title: "4K HDR P2.6 / P3.9 LED Matrices",
      subtitle: "Cinematic High-Refresh Visuals",
      description: "Seamless curved and flat high-refresh-rate indoor/outdoor LED walls with Novastar 4K processing, real-time color grading, and broadcast IMAG feeds.",
      specs: "HDR10+, 3840Hz refresh rate",
      metric: "10,000+ sq ft Fleet"
    },
    {
      id: 3,
      icon: Lightbulb,
      title: "Robotic Lighting & Timecode Lasers",
      subtitle: "Claypaky & Robe Moving Fixtures",
      description: "GrandMA3 DMX-controlled automated beam fixtures, warm profile theatrical spots, high-output atmospheric hazers, and synchronized multi-watt RGB lasers.",
      specs: "Full DMX-512 & GrandMA3 timecode",
      metric: "500+ Intelligent Fixtures"
    },
    {
      id: 4,
      icon: Video,
      title: "Multi-Camera 4K Broadcast & Drones",
      subtitle: "Live Telecast & Archival Cine-Feeds",
      description: "Cinema-grade Sony FX & Blackmagic broadcast chains with wireless crane jibs, 4K HDR drone coverage, and zero-latency studio switcher routing.",
      specs: "12G-SDI 4K 60fps telecast",
      metric: "Zero Latency Feeds"
    },
    {
      id: 5,
      icon: Layers,
      title: "3D Staging & TÜV Box Truss Rigging",
      subtitle: "Engineered Architectural Scenography",
      description: "Heavy-duty load-tested German aluminum box trussing, rotating stage platforms, hydraulic artist reveals, and weather-proof outdoor canopy structures.",
      specs: "TÜV certified structural safety",
      metric: "50+ Ton Load Capacity"
    },
    {
      id: 6,
      icon: Radio,
      title: "Hybrid Webcast & Global Satellite Link",
      subtitle: "Enterprise Low-Latency Streaming",
      description: "Dedicated bonded redundant gigabit uplinks, customized enterprise broadcast microsites, multi-lingual interpretation channels, and real-time polling.",
      specs: "Dual-redundant bonded gigabit",
      metric: "99.99% Live Uptime"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#050505] text-white relative overflow-hidden border-t border-white/[0.06]">
      {/* Ambient luxury champagne glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#E5C378]/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 text-[#E5C378] border border-[#E5C378]/30 mb-5 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-[#E5C378]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em]">
              Directly Owned Production Inventory
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight mb-5">
            State-of-the-Art <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">AV & Engineering Vault</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
            We directly own and operate premier German sound, lighting, and heavy-duty stage inventory, guaranteeing flawless execution with zero third-party dependency.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div 
                key={tech.id}
                className="group bg-[#0D0D0E]/90 border border-white/[0.08] hover:border-[#E5C378]/40 rounded-2xl p-7 hover:shadow-2xl hover:shadow-[#E5C378]/5 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 relative"
              >
                <div>
                  {/* Top Bar: Icon + Metric Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#E5C378] group-hover:scale-110 group-hover:bg-[#E5C378]/10 group-hover:border-[#E5C378]/30 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#E5C378]/10 text-[#E5C378] text-[11px] font-mono tracking-wider border border-[#E5C378]/25">
                      {tech.metric}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#E5C378]/80 mb-2">
                    {tech.subtitle}
                  </div>

                  <h3 className="text-lg font-cinzel font-semibold text-white group-hover:text-[#E5C378] transition-colors mb-3">
                    {tech.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light mb-6">
                    {tech.description}
                  </p>
                </div>

                {/* Specs Pill */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs text-zinc-300 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C378] shrink-0" />
                  <span className="truncate">{tech.specs}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0D0D0E]/90 border border-[#E5C378]/25 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-cinzel font-bold text-white tracking-wide">100% Dual-Redundant Power & Backups</h4>
              <p className="text-xs text-zinc-400 font-light">Twin synchronized silent diesel generators and dual-link signal paths for zero downtime.</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold text-[#E5C378] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/20">
            Broadcast Standard Compliance
          </span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTechnologies;
