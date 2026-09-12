import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import PremiumServices from "@/components/home/PremiumServices";
import FeaturedTechnologies from "@/components/home/FeaturedTechnologies";
import InteractiveStageEstimator from "@/components/home/InteractiveStageEstimator";
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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E5C378] selection:text-black font-sans">
      <Header />
      
      <main>
        <HeroSlider />

        {/* Ultra-Luxury Prestige Enterprise Trust Bar */}
        <section className="py-7 bg-[#08080A] border-y border-white/[0.08] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#E5C378] animate-ping" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">
                Trusted Sovereign & Enterprise Partners
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 sm:gap-4">
              {partners.slice(0, 5).map((partner, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.08] text-zinc-300 font-cinzel font-medium text-[11px] sm:text-xs tracking-wider hover:border-[#E5C378]/50 hover:text-[#E5C378] transition-all duration-300 shadow-sm"
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
        <InteractiveStageEstimator />
        <AboutSection />
        <Testimonials />
        <Statistics />
        <ContactSection />
        <CallToAction />
      </main>
      
      <Footer />
      
      {/* Back to Top Floating Button (Offset above WhatsApp widget) */}
      <button 
        id="back-to-top" 
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 bg-[#0D0D0E]/95 backdrop-blur-md border border-[#E5C378]/40 text-[#E5C378] hover:bg-[#E5C378] hover:text-black w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-40 cursor-pointer ${
          showBackToTop ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};

export default HomePage;
