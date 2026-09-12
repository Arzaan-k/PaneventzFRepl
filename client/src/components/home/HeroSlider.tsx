import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Crown,
  Building2,
  Music
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
      tagline: "India's Premier Event & Live Production Atelier",
      preTitle: "Architecting Grandeur",
      title: "Stadium Scale",
      titleHighlight: "Mastery",
      subtitle: "30+ Years of Acoustic, Spatial & Visual Precision",
      description: "From explosive stadium concert tours and Bollywood celebrity galas to Fortune 500 summits, Pan Eventz commands raw live energy with German d&b audiotechnik line-arrays, 4K curved LED matrices, and zero-fail execution.",
      backgroundImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
      badge: "Stadium Concerts & Mega Galas",
      primaryCta: {
        text: "Commission Production",
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
      preTitle: "Couture Celebrations",
      title: "Royal Palatial",
      titleHighlight: "Weddings",
      subtitle: "Udaipur • Jaipur • Jodhpur • Goa • International",
      description: "We orchestrate multi-day royal palatial destination weddings with white-glove VVIP hospitality, aristocratic scenography, celebrity artist curation, and breathtaking timecode fireworks.",
      backgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
      badge: "Palatial Destination Weddings",
      primaryCta: {
        text: "Plan Royal Wedding",
        link: "/contact?service=wedding"
      },
      secondaryCta: {
        text: "View Gallery",
        link: "/media"
      }
    },
    {
      id: 3,
      tagline: "Turnkey Staging & Global Brand Reveals",
      preTitle: "Fortune 500 Conclaves",
      title: "Enterprise",
      titleHighlight: "Summits",
      subtitle: "Reliance • Tata Motors • Aditya Birla • HDFC",
      description: "Delivering international-grade keynote staging, ultra-low-latency 4K multi-camera broadcast feeds, and immersive interactive brand experience zones for the world's most influential corporations.",
      backgroundImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85",
      badge: "Corporate Leadership Summits",
      primaryCta: {
        text: "Corporate RFP Desk",
        link: "/contact?service=corporate"
      },
      secondaryCta: {
        text: "Tech Vault",
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
    }, 7500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section 
      className="relative min-h-[92vh] lg:min-h-screen flex items-center bg-[#050505] overflow-hidden pt-20"
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
          {/* Background image with cinematic contrast */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[12000ms] ease-out scale-105"
            style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
          />
          
          {/* Pure Royal Onyx Multi-Layer Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-[#050505]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
          
          {/* Subtle Warm Champagne Luminescence */}
          <div className="absolute top-1/4 left-10 w-[600px] h-[600px] rounded-full bg-[#E5C378]/5 blur-[160px] pointer-events-none" />
        </div>
      ))}

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-20 py-16 lg:py-24">
        <div className="max-w-4xl">
          {slides.map((slide, index) => {
            if (index !== currentSlide) return null;
            return (
              <div 
                key={slide.id}
                className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6"
              >
                {/* Prestige Category Pill */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-2xl border border-[#E5C378]/40 shadow-2xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E5C378] animate-ping" />
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#F4E8C1] font-mono">
                    {slide.tagline}
                  </span>
                </div>

                {/* Main Luxury Headline */}
                <div className="space-y-1">
                  <div className="text-lg sm:text-2xl font-light text-slate-300 tracking-[0.15em] uppercase font-cinzel">
                    {slide.preTitle}
                  </div>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[1.05] font-cinzel">
                    {slide.title}{" "}
                    <span className="gold-foil-text font-cinzel-dec">
                      {slide.titleHighlight}
                    </span>
                  </h1>
                </div>

                {/* Subtitle / Description */}
                <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl font-sans">
                  {slide.description}
                </p>

                {/* CTAs & Direct Contact */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link href={slide.primaryCta.link}>
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-[#E5C378] via-[#F4E8C1] to-[#D4AF37] hover:brightness-110 text-black font-extrabold rounded-2xl px-8 py-6 text-sm uppercase tracking-wider shadow-2xl shadow-[#E5C378]/25 hover:scale-105 transition-all duration-300 gap-2.5 cursor-pointer"
                    >
                      <span>{slide.primaryCta.text}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link href={slide.secondaryCta.link}>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="bg-white/[0.02] hover:bg-[#E5C378]/10 text-white hover:text-[#E5C378] border border-white/20 hover:border-[#E5C378]/50 backdrop-blur-xl font-medium rounded-2xl px-7 py-6 text-sm uppercase tracking-wider hover:scale-105 transition-all duration-300 gap-2 cursor-pointer"
                    >
                      <span>{slide.secondaryCta.text}</span>
                    </Button>
                  </Link>
                </div>

                {/* Prestige Metrics Ticker Strip */}
                <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl">
                  <div className="p-4 rounded-2xl bg-[#0D0D0E]/80 border border-white/[0.08] backdrop-blur-md hover:border-[#E5C378]/40 transition-colors">
                    <div className="text-2xl sm:text-3xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9E6] to-[#E5C378]">
                      30+
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5 font-mono">
                      Years Heritage
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0D0D0E]/80 border border-white/[0.08] backdrop-blur-md hover:border-[#E5C378]/40 transition-colors">
                    <div className="text-2xl sm:text-3xl font-black font-cinzel text-white">
                      2,500+
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5 font-mono">
                      Mega Productions
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0D0D0E]/80 border border-white/[0.08] backdrop-blur-md hover:border-[#E5C378]/40 transition-colors">
                    <div className="text-2xl sm:text-3xl font-black font-cinzel text-[#E5C378]">
                      100+
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5 font-mono">
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
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3 bg-[#0A0A0C]/90 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/10 shadow-2xl">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="p-2 text-white/80 hover:text-[#E5C378] rounded-full hover:bg-white/10 transition-colors cursor-pointer"
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
                i === currentSlide ? "w-8 bg-[#E5C378] shadow-[0_0_12px_rgba(229,195,120,0.8)]" : "w-2.5 bg-white/25 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="p-2 text-white/80 hover:text-[#E5C378] rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
