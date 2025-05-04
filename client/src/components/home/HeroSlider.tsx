import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { scrollToSection } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface Slide {
  id: number;
  title: string;
  titleHighlight: string;
  description: string;
  backgroundImage: string;
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
        {displaySlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-3xl slide-in">
                <h1 className="text-4xl md:text-6xl font-bold font-montserrat leading-tight mb-4">
                  {slide.title} <span className="text-primary">{slide.titleHighlight}</span> {slide.title.includes("Experiences") ? "" : "Experiences"}
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-opensans">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {slide.primaryCta.link.startsWith("http") ? (
                    <a 
                      href={slide.primaryCta.link}
                      className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full transition-colors"
                    >
                      {slide.primaryCta.text}
                    </a>
                  ) : (
                    <Button
                      onClick={() => scrollToSection(slide.primaryCta.link)}
                      className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full transition-colors"
                    >
                      {slide.primaryCta.text}
                    </Button>
                  )}
                  
                  {slide.secondaryCta.link.startsWith("http") ? (
                    <a 
                      href={slide.secondaryCta.link}
                      className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-medium px-8 py-3 rounded-full transition-colors"
                    >
                      {slide.secondaryCta.text}
                    </a>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => scrollToSection(slide.secondaryCta.link)}
                      className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-medium px-8 py-3 rounded-full transition-colors"
                    >
                      {slide.secondaryCta.text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {displaySlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Slider Arrows */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white w-12 h-12 rounded-full flex items-center justify-center z-20 focus:outline-none"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white w-12 h-12 rounded-full flex items-center justify-center z-20 focus:outline-none"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
