import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

const Statistics = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: () => fetch('/api/stats').then(res => res.json()),
  });

  // Fallback statistics if API fails or is loading
  const fallbackStats: Stat[] = [
    { id: 1, label: "Events Completed", value: 500, suffix: "+" },
    { id: 2, label: "Happy Clients", value: 350, suffix: "+" },
    { id: 3, label: "Years Experience", value: 10, suffix: "+" },
    { id: 4, label: "Team Members", value: 50, suffix: "+" }
  ];

  // Use actual stats or fallback
  const displayStats = stats.length > 0 ? stats : fallbackStats;

  // Animate counter when section becomes visible
  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-16 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {isLoading ? (
            // Loading skeleton
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-12 bg-neutral-800 rounded-full w-20 mx-auto mb-3"></div>
                <div className="h-5 bg-neutral-800 rounded w-2/3 mx-auto"></div>
              </div>
            ))
          ) : (
            displayStats.map((stat) => (
              <div key={stat.id}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {hasAnimated ? (
                    <CountUp end={stat.value || parseInt(stat.title) || 0} suffix={stat.suffix || "+"} />
                  ) : (
                    <>0{stat.suffix || "+"}</>
                  )}
                </div>
                <p className="text-lg text-neutral-300">{stat.label || stat.title}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

// Simple counter animation component
const CountUp = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // 2 seconds for animation
  const framesPerSecond = 60;
  const totalFrames = Math.round(duration / 1000 * framesPerSecond);
  
  useEffect(() => {
    // Return if end value is 0 to avoid division by zero
    if (end === 0) {
      setCount(0);
      return;
    }
    
    let currentFrame = 0;
    
    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const currentCount = Math.round(end * progress);
      
      if (currentFrame === totalFrames) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(currentCount);
      }
    }, 1000 / framesPerSecond);
    
    return () => clearInterval(counter);
  }, [end, totalFrames]);
  
  return <>{count}{suffix}</>;
};

export default Statistics;
