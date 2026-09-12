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
    <section className="py-20 md:py-28 bg-[#090D16] relative overflow-hidden border-t border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E8B923]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Praised By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B923] via-amber-200 to-[#E8B923]">Industry Leaders</span> & Couples
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            Real experiences from Fortune 500 corporations, luxury wedding couples, and premier festival producers.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {isLoading ? (
            <div className="p-10 rounded-2xl bg-white/[0.02] border border-white/10 animate-pulse text-center">
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
                    className="p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#E8B923]/40 transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-[#E8B923]/20 transition-colors pointer-events-none" />

                    <div>
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 text-[#E8B923] mb-4">
                        {Array.from({ length: starCount }).map((_, sIdx) => (
                          <Star key={sIdx} className="w-4 h-4 fill-[#E8B923]" />
                        ))}
                      </div>

                      {/* Content */}
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                        "{item.content}"
                      </p>
                    </div>

                    {/* Author Footnote */}
                    <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                      {authorImage ? (
                        <img
                          src={authorImage}
                          alt={authorName}
                          className="w-11 h-11 rounded-full object-cover border border-[#E8B923]/30 shrink-0"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 flex items-center justify-center text-[#E8B923] font-bold text-sm shrink-0">
                          {authorName.charAt(0)}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <div className="text-sm font-bold text-white group-hover:text-[#E8B923] transition-colors truncate">
                          {authorName}
                        </div>
                        <div className="text-xs text-slate-400 font-light truncate">
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
              className="w-11 h-11 rounded-full bg-white/[0.05] hover:bg-[#E8B923] text-white hover:text-black border border-white/10 hover:border-[#E8B923] transition-all flex items-center justify-center cursor-pointer"
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
                    currentSlide === dotIdx ? "w-8 bg-[#E8B923]" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              aria-label="Next testimonials"
              className="w-11 h-11 rounded-full bg-white/[0.05] hover:bg-[#E8B923] text-white hover:text-black border border-white/10 hover:border-[#E8B923] transition-all flex items-center justify-center cursor-pointer"
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
