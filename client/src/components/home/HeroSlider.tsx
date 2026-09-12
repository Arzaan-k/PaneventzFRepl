import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Award, 
  Users, 
  ShieldCheck,
  Flame,
  Volume2
} from "lucide-react";

interface Slide {
  id: number;
  tagline: string;
  preTitle: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  badge: string;
  primaryCta: {
    text: string;
    link: string;
  };
  secondaryCta: {
    text: string;
    link: string;
  };
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      tagline: "India's Premier Event & Live Production House",
      preTitle: "Mega Live Arenas &",
      title: "Stadium Scale",
      titleHighlight: "Spectacles",
      subtitle: "30+ Years of Acoustic & Spatial Mastery",
      description: "From explosive stadium concert tours and Bollywood celebrity galas to Fortune 500 corporate summits, Pan Eventz engineers transcendent live moments with d&b audiotechnik acoustics and 4K LED spatial architecture.",
      backgroundImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
      badge: "Stadium Concerts & Mega Galas",
      primaryCta: {
        text: "Initiate VIP RFP",
        link: "/contact"
      },
      secondaryCta: {
        text: "Explore Disciplines",
        link: "/services"
      }
    },
    {
      id: 2,
      tagline: "Bespoke Royal Heritage & Palatial Celebrations",
      preTitle: "Curating Pure",
      title: "Royal Luxury",
      titleHighlight: "Weddings",
      subtitle: "Udaipur • Jaipur • Jodhpur • Goa • International",
      description: "We orchestrate multi-day palatial destination weddings with white-glove VVIP hospitality, royal architectural scenography, celebrity artist booking, and breathtaking timecode fireworks.",
      backgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
      badge: "Palatial Destination Weddings",
      primaryCta: {
        text: "Plan Royal Wedding",
        link: "/contact?service=wedding"
      },
      secondaryCta: {
        text: "Curated Portfolio",
        link: "/media"
      }
    },
    {
      id: 3,
      tagline: "Turnkey Staging & Global Brand Reveals",
      preTitle: "Fortune 500",
      title: "Enterprise",
      titleHighlight: "Conclaves",
      subtitle: "Reliance • Tata Motors • Aditya Birla • HDFC",
      description: "Delivering international-grade keynote staging, ultra-low-latency 4K multi-camera broadcast feeds, and immersive interactive brand experience zones for the world's most influential corporations.",
      backgroundImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
      badge: "Corporate Leadership Summits",
      primaryCta: {
        text: "Corporate Inquiries",
        link: "/contact?service=corporate"
      },
      secondaryCta: {
        text: "AV Tech Specifications",
        link: "/services"
      }
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section 
      className="relative min-h-[92vh] lg:min-h-screen flex items-center bg-[#05070B] overflow-hidden pt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
          }`}
        >
          {/* Background image with high contrast vignette */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[12000ms] ease-out scale-105"
            style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
          />
          
          {/* Cinematic Dark Obsidian Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070B] via-[#05070B]/85 to-[#05070B]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/70" />
          
          {/* Luxury Gold & Crimson Atmospheric Glows */}
          <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-[#E8B923]/10 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#E6193C]/10 blur-[140px] pointer-events-none" />
        </div>
      ))}

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-20 py-16 lg:py-24">
        <div className="max-w-4xl">
          {slides.map((slide, index) => {
            if (index !== currentSlide) return null;
            return (
              <div 
                key={slide.id}
                className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6"
              >
                {/* Prestige Category Pill */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-[#E8B923]/30 text-white shadow-2xl">
                  <div className="w-2 h-2 rounded-full bg-[#E8B923] animate-ping" />
                  <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0C2] via-[#E8B923] to-[#E5C07B]">
                    {slide.tagline}
                  </span>
                </div>

                {/* Main Luxury Headline */}
                <div className="space-y-1">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-300 tracking-wide font-montserrat">
                    {slide.preTitle}
                  </div>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[1.05] font-montserrat">
                    {slide.title}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7A9] via-[#E8B923] to-[#C5981B]">
                      {slide.titleHighlight}
                    </span>
                  </h1>
                </div>

                {/* Subtitle / Description */}
                <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                  {slide.description}
                </p>

                {/* CTAs & Direct Contact */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link href={slide.primaryCta.link}>
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-[#E6193C] to-[#b8132e] hover:from-[#f02246] hover:to-[#c71734] text-white font-bold rounded-2xl px-8 py-6 text-base shadow-2xl shadow-primary/30 hover:scale-105 transition-all duration-300 gap-2 cursor-pointer"
                    >
                      <span>{slide.primaryCta.text}</span>
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>

                  <Link href={slide.secondaryCta.link}>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="bg-white/[0.03] hover:bg-[#E8B923]/10 text-white hover:text-[#E8B923] border border-white/20 hover:border-[#E8B923]/50 backdrop-blur-xl font-medium rounded-2xl px-7 py-6 text-base hover:scale-105 transition-all duration-300 gap-2 cursor-pointer"
                    >
                      <span>{slide.secondaryCta.text}</span>
                    </Button>
                  </Link>
                </div>

                {/* Prestige Metrics Ticker Strip */}
                <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl">
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E8B923] to-amber-200">
                      30+
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                      Years Heritage
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      2,500+
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                      Mega Productions
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl font-black text-[#E8B923]">
                      100+
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                      Cities Worldwide
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3 bg-[#090D16]/80 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/10 shadow-2xl">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="p-2 text-white/80 hover:text-[#E8B923] rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Slide Indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === currentSlide ? "w-8 bg-[#E8B923] shadow-[0_0_10px_rgba(232,185,35,0.6)]" : "w-2.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="p-2 text-white/80 hover:text-[#E8B923] rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;


