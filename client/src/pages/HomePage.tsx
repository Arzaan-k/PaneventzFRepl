import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import PremiumServices from "@/components/home/PremiumServices";
import FeaturedTechnologies from "@/components/home/FeaturedTechnologies";
import Testimonials from "@/components/home/Testimonials";
import AboutSection from "@/components/home/AboutSection";
import Statistics from "@/components/home/Statistics";
import ContactSection from "@/components/home/ContactSection";
import CallToAction from "@/components/home/CallToAction";
import CelebritySection from "@/components/home/CelebritySection";
import { ArrowUp } from "lucide-react";

const HomePage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll event for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Set page title
  useEffect(() => {
    document.title = "Pan Eventz | Premier Event Management & Production in India";
  }, []);

  const partners = [
    "RELIANCE INDUSTRIES",
    "TATA MOTORS",
    "ADITYA BIRLA GROUP",
    "HDFC BANK",
    "DLF LUXURY",
    "SUNBURN FESTIVAL",
    "TAJ HOTELS & RESORTS",
    "MAHINDRA ENTERPRISES"
  ];

  return (
    <div className="min-h-screen bg-[#030508] text-white selection:bg-[#D4AF37] selection:text-black">
      <Header />
      
      <main>
        <HeroSlider />

        {/* Ultra-Luxury Prestige Enterprise Trust Bar */}
        <section className="py-6 bg-[#06080F] border-y border-white/[0.08] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6D6] via-[#D4AF37] to-[#AA820A]">
                Trusted Sovereign & Enterprise Partners
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 sm:gap-4">
              {partners.slice(0, 5).map((partner, idx) => (
                <div 
                  key={idx}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.08] text-slate-300 font-semibold text-[11px] sm:text-xs tracking-wider hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 shadow-sm"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        <CelebritySection />
        <PremiumServices />
        <FeaturedTechnologies />
        <AboutSection />
        <Testimonials />
        <Statistics />
        <ContactSection />
        <CallToAction />
      </main>
      
      <Footer />
      
      {/* Back to Top Floating Button */}
      <button 
        id="back-to-top" 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-[#E8B923] hover:bg-amber-300 text-black w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 cursor-pointer ${
          showBackToTop ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  );
};

export default HomePage;
