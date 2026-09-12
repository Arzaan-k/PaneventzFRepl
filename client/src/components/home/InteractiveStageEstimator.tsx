import { useState } from "react";
import { 
  Sliders, 
  Sparkles, 
  Volume2, 
  Tv, 
  Zap, 
  ShieldCheck, 
  Radio, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Crown,
  Building2,
  Music,
  Trophy,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventTypeOption {
  id: string;
  name: string;
  icon: any;
  defaultGuests: number;
  stageMultiplier: number;
  soundDb: number;
  desc: string;
}

const eventTypes: EventTypeOption[] = [
  { id: "corporate", name: "Corporate Summit", icon: Building2, defaultGuests: 1500, stageMultiplier: 1.0, soundDb: 110, desc: "Fortune 500 Conclaves, Keynotes & Product Unveils" },
  { id: "wedding", name: "Royal Wedding", icon: Crown, defaultGuests: 800, stageMultiplier: 1.2, soundDb: 115, desc: "Palatial Celebrations, Sangeet & Reception Galas" },
  { id: "concert", name: "Stadium Concert", icon: Music, defaultGuests: 15000, stageMultiplier: 2.2, soundDb: 140, desc: "Mega Arena Festivals, Touring Artists & EDM Nights" },
  { id: "sports", name: "Sports League", icon: Trophy, defaultGuests: 10000, stageMultiplier: 1.8, soundDb: 130, desc: "Opening Ceremonies, Marathons & Arena Telecasts" },
  { id: "campus", name: "Campus Fest", icon: GraduationCap, defaultGuests: 5000, stageMultiplier: 1.4, soundDb: 125, desc: "University Pro-Nights, Star Nights & Cultural Days" },
];

const InteractiveStageEstimator = () => {
  const [selectedType, setSelectedType] = useState<string>("corporate");
  const [guestCount, setGuestCount] = useState<number>(1500);
  const [includeLedWalls, setIncludeLedWalls] = useState<boolean>(true);
  const [includeDbAudio, setIncludeDbAudio] = useState<boolean>(true);
  const [includeClaypakyLights, setIncludeClaypakyLights] = useState<boolean>(true);
  const [includeBroadcast4K, setIncludeBroadcast4K] = useState<boolean>(true);
  const [includeGenerators, setIncludeGenerators] = useState<boolean>(true);

  const activeEvent = eventTypes.find(e => e.id === selectedType) || eventTypes[0];

  // Dynamic engineering estimations
  const stageWidth = Math.min(160, Math.max(30, Math.round(30 + (guestCount / 250) * activeEvent.stageMultiplier)));
  const stageDepth = Math.round(stageWidth * 0.55);
  const stageHeight = guestCount > 5000 ? "6.0 ft" : guestCount > 1500 ? "4.5 ft" : "3.5 ft";
  
  const ledAreaSqFt = includeLedWalls 
    ? Math.min(6000, Math.max(300, Math.round(stageWidth * 12 + (guestCount > 3000 ? 800 : 0))))
    : 0;

  const audioLineArrayBoxes = includeDbAudio
    ? Math.min(64, Math.max(8, Math.round(8 + (guestCount / 800) * 2)))
    : 0;

  const lightingFixtures = includeClaypakyLights
    ? Math.min(350, Math.max(24, Math.round(24 + (guestCount / 300) * 3)))
    : 0;

  const powerKva = Math.round(125 + (guestCount / 100) * 4);

  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId);
    const item = eventTypes.find(e => e.id === typeId);
    if (item) setGuestCount(item.defaultGuests);
  };

  const handleWhatsAppShare = () => {
    const message = `*Pan Eventz — Production Spec Inquiry*
━━━━━━━━━━━━━━━━━━━━
🎯 *Discipline:* ${activeEvent.name}
👥 *Expected Attendance:* ${guestCount.toLocaleString()} Delegates/Guests
📐 *Recommended Staging:* ${stageWidth}ft x ${stageDepth}ft (Height: ${stageHeight})
🖥️ *4K LED Display Matrix:* ${includeLedWalls ? `${ledAreaSqFt.toLocaleString()} sq.ft (P2.6 Curved HDR)` : 'Not Required'}
🔊 *Sound Reinforcement:* ${includeDbAudio ? `d&b audiotechnik (${audioLineArrayBoxes} Line-Array Enclosures)` : 'Standard PA'}
💡 *Robotic Lighting:* ${includeClaypakyLights ? `${lightingFixtures}x Claypaky Sharpy & Beam Fixtures` : 'Standard Ambience'}
📡 *Live Broadcast 4K:* ${includeBroadcast4K ? '12G-SDI Multi-Cam Telecast Active' : 'Off'}
⚡ *Redundant Power:* ${includeGenerators ? `Synchronized ${powerKva} kVA Silent DG Cluster` : 'Venue Grid'}
━━━━━━━━━━━━━━━━━━━━
Please share the technical blueprint and formal RFP quote.`;

    const url = `https://wa.me/918082024787?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 md:py-28 bg-[#04060A] text-white relative overflow-hidden border-t border-b border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#E8B923]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#E6193C]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Production Configurator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4 font-montserrat">
            Simulate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7A9] via-[#E8B923] to-[#C5981B]">Stage & AV Architecture</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Interact with our live engineering calculator to simulate optimal stage dimensions, line-array acoustics, LED matrix coverage, and power redundancy for your expected audience scale.
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#090D16]/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            
            {/* Step 1: Event Type Selector */}
            <div>
              <label className="text-xs uppercase font-bold tracking-widest text-[#E8B923] font-mono mb-3 block">
                1. Select Event Discipline:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {eventTypes.map((type) => {
                  const Icon = type.icon;
                  const isActive = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleTypeChange(type.id)}
                      className={`p-3 sm:p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                        isActive 
                          ? "bg-[#E8B923]/15 border-[#E8B923] text-white shadow-lg shadow-[#E8B923]/10" 
                          : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-4 h-4 ${isActive ? "text-[#E8B923]" : "text-slate-500"}`} />
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#E8B923]" />}
                      </div>
                      <span className="text-xs font-bold leading-tight">{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Guest Scale Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase font-bold tracking-widest text-[#E8B923] font-mono">
                  2. Audience & Scale Scope:
                </label>
                <span className="text-lg sm:text-xl font-bold font-montserrat text-white bg-white/[0.06] px-3 py-1 rounded-xl border border-white/10">
                  {guestCount.toLocaleString()} <span className="text-xs text-[#E8B923] font-normal">Attendees</span>
                </span>
              </div>

              <input
                type="range"
                min="200"
                max="30000"
                step="100"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E8B923]"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1.5">
                <span>200 (Intimate VIP)</span>
                <span>5,000 (Convention)</span>
                <span>30,000+ (Stadium Arena)</span>
              </div>
            </div>

            {/* Step 3: AV Equipment Module Toggles */}
            <div>
              <label className="text-xs uppercase font-bold tracking-widest text-[#E8B923] font-mono mb-3 block">
                3. Technical Infrastructure Modules:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                <button
                  type="button"
                  onClick={() => setIncludeLedWalls(!includeLedWalls)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    includeLedWalls
                      ? "bg-white/[0.06] border-[#E8B923]/60 text-white"
                      : "bg-white/[0.02] border-white/5 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Tv className={`w-4 h-4 ${includeLedWalls ? "text-[#E8B923]" : "text-slate-600"}`} />
                    <span>4K P2.6 Curved LED Wall</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${includeLedWalls ? "bg-[#E8B923]/20 text-[#E8B923]" : "bg-white/5 text-slate-600"}`}>
                    {includeLedWalls ? "ACTIVE" : "OFF"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIncludeDbAudio(!includeDbAudio)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    includeDbAudio
                      ? "bg-white/[0.06] border-[#E8B923]/60 text-white"
                      : "bg-white/[0.02] border-white/5 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Volume2 className={`w-4 h-4 ${includeDbAudio ? "text-[#E8B923]" : "text-slate-600"}`} />
                    <span>d&b audiotechnik Acoustics</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${includeDbAudio ? "bg-[#E8B923]/20 text-[#E8B923]" : "bg-white/5 text-slate-600"}`}>
                    {includeDbAudio ? "ACTIVE" : "OFF"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIncludeClaypakyLights(!includeClaypakyLights)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    includeClaypakyLights
                      ? "bg-white/[0.06] border-[#E8B923]/60 text-white"
                      : "bg-white/[0.02] border-white/5 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className={`w-4 h-4 ${includeClaypakyLights ? "text-[#E8B923]" : "text-slate-600"}`} />
                    <span>Claypaky Robotic Lights</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${includeClaypakyLights ? "bg-[#E8B923]/20 text-[#E8B923]" : "bg-white/5 text-slate-600"}`}>
                    {includeClaypakyLights ? "ACTIVE" : "OFF"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIncludeBroadcast4K(!includeBroadcast4K)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    includeBroadcast4K
                      ? "bg-white/[0.06] border-[#E8B923]/60 text-white"
                      : "bg-white/[0.02] border-white/5 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Radio className={`w-4 h-4 ${includeBroadcast4K ? "text-[#E8B923]" : "text-slate-600"}`} />
                    <span>12G 4K Telecast Links</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${includeBroadcast4K ? "bg-[#E8B923]/20 text-[#E8B923]" : "bg-white/5 text-slate-600"}`}>
                    {includeBroadcast4K ? "ACTIVE" : "OFF"}
                  </span>
                </button>

              </div>
            </div>

          </div>

          {/* Real-time Technical Telemetry Output (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#111726] to-[#0A0E18] p-6 sm:p-8 rounded-3xl border border-[#E8B923]/30 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#E8B923]" />
                <h3 className="font-bold text-white text-base sm:text-lg font-montserrat">
                  Calculated Technical Spec
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase bg-[#25D366]/20 text-[#25D366] font-bold px-2 py-0.5 rounded-full">
                Live Dynamic Engine
              </span>
            </div>

            {/* Spec Matrix List */}
            <div className="space-y-3.5 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-slate-400">Stage Dimensions:</span>
                <span className="text-[#E8B923] font-bold">{stageWidth}ft (W) × {stageDepth}ft (D) × {stageHeight}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-slate-400">4K LED Wall Screen:</span>
                <span className="text-white font-bold">{includeLedWalls ? `${ledAreaSqFt.toLocaleString()} sq.ft (P2.6 HDR)` : "None"}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-slate-400">Sound Reinforcement:</span>
                <span className="text-emerald-400 font-bold">{includeDbAudio ? `${audioLineArrayBoxes}x d&b Array Boxes` : "Standard PA"}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-slate-400">Intelligent Lighting:</span>
                <span className="text-amber-300 font-bold">{includeClaypakyLights ? `${lightingFixtures}+ Robotic Fixtures` : "Standard Ambience"}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-slate-400">Power Redundancy:</span>
                <span className="text-cyan-400 font-bold">{powerKva} kVA Twin Silent DG</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-slate-400">Rigging & Safety:</span>
                <span className="text-white font-bold">TÜV Certified 50T Trussing</span>
              </div>
            </div>

            {/* Instant Action CTA Buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full py-4 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Send Spec To WhatsApp Desk</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
                <span>Direct Hotline:</span>
                <span className="text-[#E8B923]">+91 80820 24787 / +91 98213 37523</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractiveStageEstimator;
