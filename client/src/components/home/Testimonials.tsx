import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";

interface Testimonial {
  id: number;
  content: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  rating: number;
}

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['/api/testimonials'],
    queryFn: () => fetch('/api/testimonials').then(res => res.json()),
  });

  // Fallback testimonials if API fails or is loading
  const fallbackTestimonials: Testimonial[] = [
    {
      id: 1,
      content: "Pan Eventz transformed our corporate annual meeting into a spectacular event. Their attention to detail, creative ideas, and flawless execution exceeded our expectations. Highly recommended!",
      author: {
        name: "Rajiv Sharma",
        title: "CEO, Techvantage Solutions",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
      },
      rating: 5
    },
    {
      id: 2,
      content: "Our wedding day was perfect thanks to Pan Eventz. They understood our vision and brought it to life with their creative touch. The decoration, lighting, and overall management were impeccable.",
      author: {
        name: "Priya & Arun Kapoor",
        title: "Wedding Clients",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
      },
      rating: 5
    },
    {
      id: 3,
      content: "The cultural festival we organized with Pan Eventz was a huge success. Their technical expertise with sound systems, lighting, and stage management was outstanding. They made our vision come to life!",
      author: {
        name: "Vikram Mehta",
        title: "Cultural Festival Organizer",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
      },
      rating: 4.5
    }
  ];

  // Use actual testimonials or fallback
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  // Update translation value when window is resized or slide is changed
  useEffect(() => {
    const updateTranslateValue = () => {
      if (containerRef.current) {
        const slideValue = isMobile ? -100 * currentSlide : -33.333 * currentSlide;
        setTranslateValue(slideValue);
      }
    };

    updateTranslateValue();
    window.addEventListener('resize', updateTranslateValue);
    
    return () => window.removeEventListener('resize', updateTranslateValue);
  }, [currentSlide, isMobile]);

  const nextSlide = () => {
    const maxIndex = isMobile 
      ? displayTestimonials.length - 1 
      : displayTestimonials.length - 3;
    
    if (currentSlide < maxIndex) {
      setCurrentSlide(prevSlide => prevSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prevSlide => prevSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    return stars;
  };

  return (
    <section className="py-20 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Don't just take our word for it. Here's what our clients have to say about their experience with Pan Eventz.
          </p>
        </div>
        
        <div className="relative testimonial-slider overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-xl text-center">
                Loading testimonials...
              </div>
            </div>
          ) : (
            <>
              <div 
                ref={containerRef}
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(${translateValue}%)` }}
              >
                {displayTestimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="testimonial-slide min-w-full md:min-w-[33.333%] px-4"
                  >
                    <div className="bg-white p-8 rounded-lg shadow-lg h-full">
                      <div className="flex items-center mb-4">
                        <div className="text-primary">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                      <p className="italic text-neutral-600 mb-6">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src={testimonial.author.avatar} 
                            alt={testimonial.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-800">
                            {testimonial.author.name}
                          </h4>
                          <p className="text-sm text-neutral-500">
                            {testimonial.author.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Testimonial Controls (Desktop) */}
              {!isMobile && (
                <>
                  <button 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-md focus:outline-none"
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                  >
                    <i className={`fas fa-chevron-left ${currentSlide === 0 ? 'opacity-50' : ''}`}></i>
                  </button>
                  <button 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-md focus:outline-none"
                    onClick={nextSlide}
                    disabled={currentSlide >= displayTestimonials.length - 3}
                  >
                    <i className={`fas fa-chevron-right ${currentSlide >= displayTestimonials.length - 3 ? 'opacity-50' : ''}`}></i>
                  </button>
                </>
              )}
            </>
          )}
        </div>
        
        {/* Testimonial Dots (Mobile) */}
        {isMobile && !isLoading && (
          <div className="flex justify-center space-x-2 mt-6">
            {displayTestimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-primary' : 'bg-neutral-300'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
