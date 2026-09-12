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
            <Button className="bg-gradient-to-r from-[#E6193C] to-[#b8132e] hover:from-[#f02246] hover:to-[#c71734] text-white font-bold px-8 py-6 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center gap-2.5 text-base cursor-pointer">
              <Calendar className="w-5 h-5" />
              <span>Book A Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          
          <a href="tel:+919821337523">
            <Button
              variant="outline"
              className="border-white/20 hover:border-[#E8B923] text-white hover:text-[#E8B923] bg-white/[0.04] hover:bg-[#E8B923]/10 font-medium px-8 py-6 rounded-xl transition-all flex items-center gap-2 text-base cursor-pointer"
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
