import { useState, useEffect, useRef } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";

interface TestimonialItem {
  id: number;
  content: string;
  author?: {
    name: string;
    title: string;
    avatar?: string;
  };
  name?: string;
  position?: string;
  image?: string;
  rating?: number;
}

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useMobile();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['/api/testimonials'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/testimonials');
        if (!res.ok) return [];
        return await res.json();
      } catch {
        return [];
      }
    },
  });

  const fallbackTestimonials: TestimonialItem[] = [
    {
      id: 1,
      content: "Pan Eventz delivered an unmatched level of sophistication for our corporate summit. The line array acoustics, stage illumination, and seamless VIP artist escort were executed to international standards. Truly elite management.",
      name: "Rajiv Sharma",
      position: "Managing Director, Apex Technologies",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 2,
      content: "From our royal Sangeet night to the grand reception with 2,500 guests, Imran Mirza and his team handled every single element flawlessly. Our families felt like royalty throughout the entire celebration.",
      name: "Priya & Arun Kapoor",
      position: "Destination Wedding Hosts (Jaipur)",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 3,
      content: "Orchestrating a 15,000-seat stadium concert requires flawless technical precision. Pan Eventz's LED wall matrices and crowd control logistics were textbook perfection. Unquestionably the best in the business.",
      name: "Vikram Mehta",
      position: "National Cultural Festival Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 4,
      content: "The level of attention to detail for our sports league opening ceremony was breathtaking. Fire choreography, laser shows, and live broadcast coordination without a single hitch!",
      name: "Ananya Deshmukh",
      position: "VP Marketing, Premier Sports League",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      rating: 5
    }
  ];

  const displayList: TestimonialItem[] = Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const totalSlides = displayList.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/[0.06]">
      {/* Ambient champagne gold glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E5C378]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight leading-[1.15] mb-5">
            Praised By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">Industry Leaders</span> & Couples
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            Real experiences from Fortune 500 corporations, luxury wedding couples, and premier festival producers.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {isLoading ? (
            <div className="p-10 rounded-2xl bg-[#0D0D0E] border border-white/[0.08] animate-pulse text-center">
              <div className="h-6 bg-white/10 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayList.slice(currentSlide, currentSlide + (isMobile ? 1 : 3)).concat(
                !isMobile && currentSlide + 3 > displayList.length 
                  ? displayList.slice(0, (currentSlide + 3) % displayList.length)
                  : []
              ).map((item, idx) => {
                const authorName = item.name || item.author?.name || "Distinguished Client";
                const authorTitle = item.position || item.author?.title || "Verified Partner";
                const authorImage = item.image || item.author?.avatar;
                const starCount = Math.min(5, Math.max(1, Math.round(item.rating || 5)));

                return (
                  <div
                    key={item.id || idx}
                    className="p-7 rounded-2xl bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-300 flex flex-col justify-between group relative shadow-xl"
                  >
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-white/[0.04] group-hover:text-[#E5C378]/20 transition-colors pointer-events-none" />

                    <div>
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 text-[#E5C378] mb-4">
                        {Array.from({ length: starCount }).map((_, sIdx) => (
                          <Star key={sIdx} className="w-4 h-4 fill-[#E5C378] text-[#E5C378]" />
                        ))}
                      </div>

                      {/* Content */}
                      <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light italic">
                        "{item.content}"
                      </p>
                    </div>

                    {/* Author Footnote */}
                    <div className="flex items-center gap-3.5 pt-4 border-t border-white/[0.08]">
                      {authorImage ? (
                        <img
                          src={authorImage}
                          alt={authorName}
                          className="w-11 h-11 rounded-full object-cover border border-[#E5C378]/40 shrink-0"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/40 flex items-center justify-center text-[#E5C378] font-cinzel font-bold text-sm shrink-0">
                          {authorName.charAt(0)}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <div className="text-sm font-cinzel font-semibold text-white group-hover:text-[#E5C378] transition-colors truncate">
                          {authorName}
                        </div>
                        <div className="text-xs text-zinc-400 font-light truncate">
                          {authorTitle}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonials"
              className="w-11 h-11 rounded-full bg-white/[0.03] hover:bg-[#E5C378] text-white hover:text-black border border-white/[0.1] hover:border-[#E5C378] transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {displayList.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentSlide(dotIdx)}
                  aria-label={`Slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === dotIdx ? "w-8 bg-[#E5C378]" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              aria-label="Next testimonials"
              className="w-11 h-11 rounded-full bg-white/[0.03] hover:bg-[#E5C378] text-white hover:text-black border border-white/[0.1] hover:border-[#E5C378] transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
