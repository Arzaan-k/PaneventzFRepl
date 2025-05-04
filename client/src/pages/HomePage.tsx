import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import ServiceCards from "@/components/home/ServiceCards";
import FeaturedTechnologies from "@/components/home/FeaturedTechnologies";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import AboutSection from "@/components/home/AboutSection";
import Statistics from "@/components/home/Statistics";
import ContactSection from "@/components/home/ContactSection";
import CallToAction from "@/components/home/CallToAction";

const HomePage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll event for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
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
    document.title = "Pan Eventz - Event Management Services";
  }, []);

  return (
    <>
      <Header />
      
      <main>
        <HeroSlider />
        <ServiceCards />
        <FeaturedTechnologies />
        <Gallery />
        <Testimonials />
        <AboutSection />
        <Statistics />
        <ContactSection />
        <CallToAction />
      </main>
      
      <Footer />
      
      {/* Back to Top Button */}
      <button 
        id="back-to-top" 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-40 ${
          showBackToTop ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
};

export default HomePage;
