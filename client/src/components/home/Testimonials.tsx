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
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
      
      {/* Large quotation mark */}
      <div className="absolute top-24 left-10 text-primary/10 text-[200px] font-serif leading-none z-0">
        "
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block mb-3">
            <span className="inline-block h-1 w-10 bg-primary rounded-full mr-2"></span>
            <span className="inline-block h-1 w-20 bg-primary rounded-full"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
            Client <span className="relative">
              <span className="relative z-10">Feedback</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 rounded-lg"></span>
            </span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover what our clients have to say about their transformative experiences with Pan Eventz.
          </p>
        </div>
        
        <div className="relative testimonial-slider overflow-hidden pb-16">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-20 h-2 bg-neutral-200 rounded-full mb-6"></div>
                <div className="w-64 h-6 bg-neutral-200 rounded-full mb-3"></div>
                <div className="w-80 h-4 bg-neutral-100 rounded-full mb-2"></div>
                <div className="w-72 h-4 bg-neutral-100 rounded-full mb-8"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-200 mr-4"></div>
                  <div>
                    <div className="w-32 h-4 bg-neutral-200 rounded-full mb-2"></div>
                    <div className="w-24 h-3 bg-neutral-100 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div 
                ref={containerRef}
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(${translateValue}%)` }}
              >
                {displayTestimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id} 
                    className="testimonial-slide min-w-full md:min-w-[33.333%] px-5"
                  >
                    <div 
                      className={`bg-white p-10 rounded-2xl shadow-xl h-full border border-neutral-100 hover:shadow-2xl hover:border-primary/10 transition-all duration-500 relative`}
                      style={{
                        transform: `scale(${currentSlide === index ? 1.02 : 1})`,
                        opacity: isMobile 
                          ? 1 
                          : (Math.abs(currentSlide - index) <= 1 ? 1 : 0.7)
                      }}
                    >
                      {/* Modern rating display */}
                      <div className="mb-6">
                        <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full">
                          <div className="text-primary flex mr-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i} 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < Math.floor(testimonial.rating) ? 'text-primary' : 'text-neutral-300'}`}
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm font-semibold">{testimonial.rating.toFixed(1)}/5.0</span>
                        </div>
                      </div>
                      
                      {/* Testimonial content with fancy quotes */}
                      <p className="text-lg text-neutral-600 mb-8 relative">
                        <span className="text-primary/30 text-6xl absolute -top-8 -left-3 font-serif">"</span>
                        {testimonial.content}
                        <span className="text-primary/30 text-6xl absolute -bottom-8 -right-3 font-serif">"</span>
                      </p>
                      
                      {/* Author info with gradient border */}
                      <div className="flex items-center pt-4 mt-auto border-t border-neutral-100">
                        {testimonial.author && testimonial.author.avatar ? (
                          <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-primary/20 p-[2px]">
                            <img 
                              src={testimonial.author.avatar} 
                              alt={testimonial.author.name || 'Client'}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary flex items-center justify-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-neutral-800">
                            {testimonial.author?.name || 'Happy Client'}
                          </h4>
                          <p className="text-sm text-primary/80 font-medium">
                            {testimonial.author?.title || 'Verified Customer'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Modern navigation controls */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-6 mt-10 z-10">
                <button 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentSlide === 0 
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' 
                      : 'bg-white text-primary shadow-lg hover:shadow-xl hover:bg-primary hover:text-white'
                  }`}
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  aria-label="Previous testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Testimonial indicators */}
                <div className="flex items-center gap-2">
                  {displayTestimonials.map((_, index) => {
                    const isActive = isMobile 
                      ? index === currentSlide 
                      : (index >= currentSlide && index < currentSlide + 3);
                    
                    return (
                      <button
                        key={index}
                        className={`transition-all duration-300 ${
                          isActive
                            ? 'w-10 h-3 bg-primary rounded-full'
                            : 'w-3 h-3 bg-neutral-300 hover:bg-neutral-400 rounded-full'
                        }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    );
                  })}
                </div>
                
                <button 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentSlide >= (isMobile ? displayTestimonials.length - 1 : displayTestimonials.length - 3) 
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' 
                      : 'bg-white text-primary shadow-lg hover:shadow-xl hover:bg-primary hover:text-white'
                  }`}
                  onClick={nextSlide}
                  disabled={currentSlide >= (isMobile ? displayTestimonials.length - 1 : displayTestimonials.length - 3)}
                  aria-label="Next testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
