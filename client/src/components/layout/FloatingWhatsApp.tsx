import { useState } from "react";
import { MessageCircle, X, Sparkles, Send, Calendar, Music, Building2, Crown } from "lucide-react";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

const quickInquiries = [
  { label: "Corporate Gala & Summit", icon: Building2, text: "Hi Pan Eventz, I would like to inquire about hosting a Corporate Summit / Conclave." },
  { label: "Royal Destination Wedding", icon: Crown, text: "Hi Pan Eventz, I'm planning a Luxury Destination Wedding and would like a proposal." },
  { label: "Live Concert & Staging", icon: Music, text: "Hi Pan Eventz, I need sound, lights, LED walls & stage rigging for an upcoming concert." },
  { label: "Celebrity & Artist Booking", icon: Sparkles, text: "Hi Pan Eventz, I would like to discuss artist booking and celebrity management." },
];

const FloatingWhatsApp = ({ 
  phoneNumber = "+918082024787",
  defaultMessage = "Hi Pan Eventz, I would like to inquire about event production and management services."
}: FloatingWhatsAppProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");

  const handleSend = (text: string) => {
    const finalMsg = text || defaultMessage;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Expanded Interactive Concierge Card */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[380px] rounded-3xl bg-[#090D16]/98 backdrop-blur-2xl border border-[#25D366]/40 shadow-2xl p-5 text-white animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-3.5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center text-[#25D366] shadow-lg shadow-[#25D366]/20">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#090D16] animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-montserrat">
                  <span>Pan Eventz Concierge</span>
                </h4>
                <p className="text-[10px] text-emerald-400 font-mono tracking-wide">
                  Online • Typically replies in 5 mins
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp chat popover"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Intro greeting */}
          <div className="bg-white/[0.04] rounded-2xl p-3.5 border border-white/5 mb-3.5 text-xs text-slate-300 leading-relaxed font-light">
            <div className="flex items-center gap-1.5 text-[#E8B923] text-[11px] font-bold uppercase tracking-wider mb-1 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant VIP Assistance</span>
            </div>
            Welcome to Pan Eventz. Select a category below or message our senior event production directors directly.
          </div>

          {/* Interactive Quick Choice Chips */}
          <div className="space-y-1.5 mb-3.5">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">
              Quick Inquiry Topics:
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {quickInquiries.map((inq, idx) => {
                const Icon = inq.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(inq.text)}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-[#25D366]/15 border border-white/5 hover:border-[#25D366]/40 text-xs text-slate-200 hover:text-white transition-all group cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition-transform" />
                    <span className="flex-1 font-medium">{inq.label}</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-[#25D366] font-mono">Ask →</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Line Numbers */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 mb-3.5 text-[11px] font-mono space-y-1">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">WhatsApp Desk:</span>
              <a href={`https://wa.me/${cleanPhone}`} target="_blank" rel="noreferrer" className="text-[#25D366] font-bold hover:underline">
                +91 80820 24787
              </a>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span className="text-slate-500">Direct Line:</span>
              <a href="tel:+919821337523" className="hover:text-white transition-colors">+91 98213 37523</a>
            </div>
          </div>

          {/* Interactive Custom Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend(customMsg);
              }}
              placeholder="Type custom inquiry..."
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#25D366]"
            />
            <button 
              onClick={() => handleSend(customMsg)}
              className="px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs flex items-center justify-center shadow-lg shadow-[#25D366]/25 transition-all hover:scale-105 cursor-pointer shrink-0"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <div className="relative group">
        {/* Pulsing luxury aura */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-[#25D366] via-[#E8B923] to-[#25D366] rounded-full blur-sm opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Chat on WhatsApp (+91 80820 24787)"
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#090D16] border-2 border-[#25D366] text-[#25D366] hover:text-white hover:bg-[#25D366] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <svg 
              className="w-7 h-7 sm:w-8 sm:h-8 fill-current" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          )}
        </button>

        {/* Hover Label for Desktop */}
        <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#090D16]/95 border border-[#25D366]/30 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
          Chat on WhatsApp <span className="text-[#25D366] font-mono">(+91 80820 24787)</span>
        </div>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
