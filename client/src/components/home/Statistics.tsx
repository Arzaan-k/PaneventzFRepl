import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarCheck, Users, Award, Building2 } from "lucide-react";

interface StatItem {
  id: number;
  label: string;
  value: number;
  suffix: string;
  subtext?: string;
  icon?: any;
}

const Statistics = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/stats');
        if (!res.ok) return [];
        return await res.json();
      } catch {
        return [];
      }
    },
  });

  const fallbackStats: StatItem[] = [
    { id: 1, label: "Landmark Productions", value: 2500, suffix: "+", subtext: "Across India & UAE", icon: CalendarCheck },
    { id: 2, label: "Cities Worldwide", value: 100, suffix: "+", subtext: "National & Global Hubs", icon: Building2 },
    { id: 3, label: "Years Production Mastery", value: 30, suffix: "+", subtext: "Industry Vanguard", icon: Award },
    { id: 4, label: "Enterprise Client Loyalty", value: 98, suffix: "%", subtext: "Fortune 500 & HNIs", icon: Users }
  ];

  const statIcons = [CalendarCheck, Users, Award, Building2];

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
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const displayStats = Array.isArray(stats) && stats.length > 0 ? stats : fallbackStats;

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-[#050505] border-y border-white/[0.06] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="p-6 rounded-2xl bg-[#0D0D0E] border border-white/[0.08] animate-pulse text-center">
                <div className="h-10 bg-white/10 rounded-full w-24 mx-auto mb-3"></div>
                <div className="h-4 bg-white/10 rounded w-2/3 mx-auto"></div>
              </div>
            ))
          ) : (
            displayStats.map((stat: any, idx: number) => {
              const IconComponent = statIcons[idx % statIcons.length];
              const rawVal = stat.value ?? parseInt(stat.title ?? "0", 10) ?? 0;
              const numericVal = isNaN(rawVal) ? 0 : rawVal;
              const label = stat.label || stat.title || "Events Managed";
              const suffix = stat.suffix || "+";
              const subtext = stat.subtext || fallbackStats[idx % fallbackStats.length]?.subtext;

              return (
                <div
                  key={stat.id || idx}
                  className="p-6 sm:p-8 rounded-2xl bg-[#0D0D0E]/90 hover:bg-[#121214] border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-300 text-center group relative overflow-hidden shadow-xl"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#E5C378]/10 border border-[#E5C378]/25 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5C378]" />
                  </div>

                  <div className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B] mb-2 tracking-tight">
                    {hasAnimated ? (
                      <CountUp end={numericVal} suffix={suffix} />
                    ) : (
                      <>0{suffix}</>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-cinzel font-semibold text-white mb-1">
                    {label}
                  </h3>

                  {subtext && (
                    <p className="text-[11px] sm:text-xs text-zinc-400 font-light">
                      {subtext}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

// Smooth counter animation component
const CountUp = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const duration = 1800;
  const framesPerSecond = 60;
  const totalFrames = Math.round((duration / 1000) * framesPerSecond);

  useEffect(() => {
    if (!end || isNaN(end) || end <= 0) {
      setCount(end || 0);
      return;
    }

    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.round(end * easeProgress);

      if (currentFrame >= totalFrames) {
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
