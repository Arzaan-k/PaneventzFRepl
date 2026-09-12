import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/home/ContactSection";
import { MapPin, Phone, Mail, Sparkles } from "lucide-react";

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact Headquarters & Plan an Event | Pan Eventz";
  }, []);

  return (
    <div className="min-h-screen bg-[#090D16] text-white selection:bg-[#E8B923] selection:text-black">
      <Header />

      <main className="pt-20">
        {/* Contact Banner */}
        <section 
          className="relative min-h-[50vh] flex items-center justify-center bg-center bg-cover overflow-hidden border-b border-white/10"
          style={{ 
            backgroundImage: "linear-gradient(to bottom, rgba(9, 13, 22, 0.85), rgba(9, 13, 22, 0.95)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80')"
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 text-center relative z-10 py-16 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Concierge Desk</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 font-montserrat">
              Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B923] via-amber-200 to-[#E8B923]">Pan Eventz</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Speak directly with our senior event architects and production supervisors to transform your vision into an unforgettable experience.
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto text-left">
              <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#E8B923]/40 transition-all flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/20 flex items-center justify-center text-[#E8B923] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Operations Hub</h3>
                  <p className="text-xs text-slate-400 font-light">Mumbai & Delhi NCR, India</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-primary/40 transition-all flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Direct Line</h3>
                  <a href="tel:+919821337523" className="text-xs text-slate-400 font-light hover:text-[#E8B923] transition-colors">+91 98213 37523</a>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Email Desk</h3>
                  <a href="mailto:info@paneventz.com" className="text-xs text-slate-400 font-light hover:text-[#E8B923] transition-colors">info@paneventz.com</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
