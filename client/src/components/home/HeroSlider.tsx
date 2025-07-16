import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { scrollToSection } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface CTA {
  text: string;
  link: string;
}

interface Slide {
  id: number;
  title: string;
  titleHighlight: string;
  description: string;
  backgroundImage: string;
  primaryCta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch slider data
  const { data: slides = [], isLoading } = useQuery({
    queryKey: ['/api/slides'],
    queryFn: () => fetch('/api/slides').then(res => res.json()),
  });

  // Fallback slides if API fails or is loading
  const fallbackSlides: Slide[] = [
    {
      id: 1,
      title: "Creating",
      titleHighlight: "Memorable",
      description: "Pan Eventz - Your trusted partner for extraordinary corporate events, weddings, and celebrations.",
      backgroundImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=800&q=80",
      primaryCta: {
        text: "Our Services",
        link: "services"
      },
      secondaryCta: {
        text: "Contact Us",
        link: "contact"
      }
    },
    {
      id: 2,
      title: "Stunning",
      titleHighlight: "Wedding",
      description: "We bring your dream wedding to life with impeccable planning and magical execution.",
      backgroundImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=800&q=80",
      primaryCta: {
        text: "Wedding Services",
        link: "services/wedding"
      },
      secondaryCta: {
        text: "View Gallery",
        link: "gallery"
      }
    },
    {
      id: 3,
      title: "Spectacular",
      titleHighlight: "Cultural",
      description: "From TED Talks to music festivals, we create immersive cultural experiences that inspire.",
      backgroundImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=800&q=80",
      primaryCta: {
        text: "Cultural Events",
        link: "services/cultural"
      },
      secondaryCta: {
        text: "Get a Quote",
        link: "contact"
      }
    }
  ];

  // Use actual slides or fallback
  const displaySlides = slides.length > 0 ? slides : fallbackSlides;

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [displaySlides.length, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [displaySlides.length, isAnimating]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [currentSlide, isAnimating]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (isLoading) {
    return (
      <section className="hero-slider pt-20 md:pt-16 relative overflow-hidden flex items-center justify-center">
        <div className="animate-pulse text-xl text-center">
          Loading dynamic content...
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="hero-slider pt-20 md:pt-16 relative overflow-hidden">
      <div className="relative h-full">
        {displaySlides.map((slide: Slide, index: number) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-center bg-cover transition-all duration-1000 ${
              index === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-110"
            }`}
            style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
          >
            {/* Gradient overlay with accent color */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
              <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
              <div className="absolute bottom-20 right-30 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-3xl z-10 relative">
                {/* Animated slide content */}
                <div className={`transform transition-all duration-1000 delay-300 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}>
                  {/* Tag line */}
                  <div className="inline-block bg-primary/90 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
                    Premium Event Services
                  </div>
                  
                  {/* Main heading with gradient text - responsive */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-montserrat leading-tight mb-4 md:mb-6">
                    {slide.title}{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {slide.titleHighlight}
                    </span>{" "}
                    <span className="relative">
                      Experiences
                      <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-0.5 md:h-1 bg-primary rounded-full"></span>
                    </span>
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 font-sans text-white/90 max-w-2xl leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6">
                    {slide.primaryCta && slide.primaryCta.link ? (
                      slide.primaryCta.link.startsWith("http") ? (
                        <a 
                          href={slide.primaryCta.link}
                          className="group bg-primary hover:bg-primary/90 text-white font-medium px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full transition-all shadow-lg hover:shadow-primary/50 hover:shadow-xl text-sm md:text-base"
                        >
                          {slide.primaryCta.text || "Learn More"}
                          <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </a>
                      ) : (
                        <Button
                          onClick={() => scrollToSection(slide.primaryCta?.link || 'services')}
                          className="group bg-primary hover:bg-primary/90 text-white font-medium px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full transition-all shadow-lg hover:shadow-primary/50 hover:shadow-xl text-sm md:text-base"
                        >
                          {slide.primaryCta?.text || "Learn More"}
                          <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </Button>
                      )
                    ) : (
                      <Button
                        onClick={() => scrollToSection('services')}
                        className="group bg-primary hover:bg-primary/90 text-white font-medium px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full transition-all shadow-lg hover:shadow-primary/50 hover:shadow-xl text-sm md:text-base"
                      >
                        Our Services
                        <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </Button>
                    )}
                    
                    {slide.secondaryCta && slide.secondaryCta.link ? (
                      slide.secondaryCta.link.startsWith("http") ? (
                        <a 
                          href={slide.secondaryCta.link}
                          className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-medium px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full transition-all flex items-center text-sm md:text-base"
                        >
                          {slide.secondaryCta.text || "Contact Us"}
                          <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </a>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => scrollToSection(slide.secondaryCta?.link || 'contact')}
                          className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-medium px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full transition-all flex items-center text-sm md:text-base"
                        >
                          {slide.secondaryCta?.text || "Contact Us"}
                          <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => scrollToSection('contact')}
                        className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-medium px-8 py-4 rounded-full transition-all flex items-center"
                      >
                        Contact Us
                        <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Modern Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-20 backdrop-blur-md bg-black/20 px-4 py-2 rounded-full">
          {displaySlides.map((_: Slide, index: number) => (
            <button
              key={index}
              className={`relative w-10 h-2 rounded-full transition-all duration-300 overflow-hidden ${
                index === currentSlide ? "w-16 bg-primary" : "bg-white/30 hover:bg-white/50"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentSlide && (
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
        
        {/* Modern Slider Arrows */}
        <button
          className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white w-14 h-14 rounded-full flex items-center justify-center z-20 backdrop-blur-md transition-all hover:scale-110 border border-white/10"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <button
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white w-14 h-14 rounded-full flex items-center justify-center z-20 backdrop-blur-md transition-all hover:scale-110 border border-white/10"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
