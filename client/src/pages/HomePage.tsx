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

  return (
    <div className="min-h-screen bg-[#090D16] text-white selection:bg-[#E8B923] selection:text-black">
      <Header />
      
      <main>
        <HeroSlider />
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
