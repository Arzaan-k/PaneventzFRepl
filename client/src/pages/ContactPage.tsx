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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
              {/* WhatsApp Priority Desk */}
              <div className="p-5 rounded-2xl bg-[#25D366]/10 backdrop-blur-xl border border-[#25D366]/40 hover:border-[#25D366] transition-all flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">WhatsApp Desk</h3>
                  <a href="https://wa.me/918082024787" target="_blank" rel="noreferrer" className="text-xs font-mono text-[#25D366] hover:underline font-bold">+91 80820 24787</a>
                </div>
              </div>

              {/* Direct Phone Lines */}
              <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#E8B923]/40 transition-all flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">Direct Line</h3>
                  <a href="tel:+919821337523" className="text-xs font-mono text-slate-300 font-light hover:text-[#E8B923] transition-colors block">+91 98213 37523</a>
                </div>
              </div>

              {/* Email Desk */}
              <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">Email Desk</h3>
                  <a href="mailto:info@paneventz.com" className="text-xs text-slate-300 font-light hover:text-[#E8B923] transition-colors">info@paneventz.com</a>
                </div>
              </div>

              {/* Operations Hub */}
              <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#E8B923]/40 transition-all flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/20 flex items-center justify-center text-[#E8B923] shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">Operations Hub</h3>
                  <p className="text-xs text-slate-400 font-light">Mumbai HQ & Delhi NCR</p>
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
