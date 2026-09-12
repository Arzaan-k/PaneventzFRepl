import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { scrollToSection } from "@/lib/utils";
import { Sparkles, Calendar, PhoneCall, ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-r from-[#0d1220] via-[#1a0c12] to-[#0d1220] border-t border-white/5 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Turn Vision Into Reality</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 font-montserrat">
          Ready to Host an <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B923] via-amber-200 to-[#E8B923]">Iconic Production?</span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          From multi-city corporate summits to unforgettable royal weddings and arena concerts, partner with Pan Eventz for flawless execution.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-[#E6193C] to-[#b8132e] hover:from-[#f02246] hover:to-[#c71734] text-white font-bold px-7 py-6 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center gap-2.5 text-sm sm:text-base cursor-pointer">
              <Calendar className="w-5 h-5" />
              <span>Book A Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <a 
            href="https://wa.me/918082024787?text=Hi%20Pan%20Eventz,%20I%20would%20like%20to%20inquire%20about%20event%20production%20services."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold px-7 py-6 rounded-xl shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-all flex items-center gap-2.5 text-sm sm:text-base cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp Us</span>
            </Button>
          </a>
          
          <a href="tel:+919821337523">
            <Button
              variant="outline"
              className="border-white/20 hover:border-[#E8B923] text-white hover:text-[#E8B923] bg-white/[0.04] hover:bg-[#E8B923]/10 font-medium px-6 py-6 rounded-xl transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#E8B923]" />
              <span>+91 98213 37523</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
