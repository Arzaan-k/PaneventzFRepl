import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import { 
  ChevronDown, 
  Sparkles, 
  PhoneCall, 
  Menu, 
  X,
  Briefcase,
  Heart,
  Trophy,
  GraduationCap,
  Music,
  ArrowRight
} from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  const serviceCategories = [
    { title: "Corporate Events", href: "/services/corporate", icon: Briefcase, desc: "Conferences, Galas & Summits" },
    { title: "Luxury Weddings", href: "/services/wedding", icon: Heart, desc: "Bespoke Royal Celebrations" },
    { title: "Sports Events", href: "/services/sports", icon: Trophy, desc: "Tournaments & Live Stadium Broadcast" },
    { title: "School & College Fests", href: "/services/education", icon: GraduationCap, desc: "Annual Days & Youth Festivals" },
    { title: "Cultural & Musical Shows", href: "/services/cultural", icon: Music, desc: "Concerts, Festivals & TEDx" },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-[#090D16]/95 backdrop-blur-xl shadow-2xl py-3 border-b border-[#E8B923]/20" 
        : "bg-[#090D16]/80 backdrop-blur-md py-4 border-b border-white/5"
    )}>
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E8B923] via-[#E6193C] to-[#E8B923] flex items-center justify-center text-black shadow-lg shadow-[#E8B923]/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold font-montserrat tracking-tight text-white leading-none">
              Pan<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7A9] via-[#E8B923] to-[#C5981B]">Eventz</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-neutral-400 font-mono mt-0.5">
              Grandeur & AV Tech
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-1 lg:space-x-2">
            <Link 
              href="/" 
              className={cn(
                "px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-200",
                isActive("/") 
                  ? "text-[#E8B923] bg-[#E8B923]/10 border border-[#E8B923]/30" 
                  : "text-neutral-300 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link 
                href="/services" 
                className={cn(
                  "px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5",
                  isActive("/services") 
                    ? "text-[#E8B923] bg-[#E8B923]/10 border border-[#E8B923]/30" 
                    : "text-neutral-300 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                Services
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
              </Link>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="bg-[#0E1420]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 p-3 space-y-1 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                    {serviceCategories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link 
                          key={cat.href} 
                          href={cat.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#E8B923]/10 flex items-center justify-center text-[#E8B923] group-hover:scale-110 transition-transform mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-[#E8B923] transition-colors">
                              {cat.title}
                            </div>
                            <div className="text-[11px] text-neutral-400 font-light">
                              {cat.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="pt-2 mt-2 border-t border-white/10">
                      <Link 
                        href="/services" 
                        className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#E8B923] hover:text-[#E8B923]/80 rounded-lg transition-colors"
                      >
                        <span>View All Production Capabilities</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/media" 
              className={cn(
                "px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-200",
                isActive("/media") 
                  ? "text-[#E8B923] bg-[#E8B923]/10 border border-[#E8B923]/30" 
                  : "text-neutral-300 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              Media
            </Link>

            <Link 
              href="/about" 
              className={cn(
                "px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-200",
                isActive("/about") 
                  ? "text-[#E8B923] bg-[#E8B923]/10 border border-[#E8B923]/30" 
                  : "text-neutral-300 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              About
            </Link>

            <Link 
              href="/blog" 
              className={cn(
                "px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-200",
                isActive("/blog") 
                  ? "text-[#E8B923] bg-[#E8B923]/10 border border-[#E8B923]/30" 
                  : "text-neutral-300 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              Journal
            </Link>

            <Link 
              href="/contact" 
              className={cn(
                "px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-200",
                isActive("/contact") 
                  ? "text-[#E8B923] bg-[#E8B923]/10 border border-[#E8B923]/30" 
                  : "text-neutral-300 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              Contact
            </Link>
          </nav>
        )}
        
        {/* Right CTA / Phone */}
        <div className="flex items-center gap-3">
          <a 
            href="tel:+919999132800" 
            className="hidden xl:flex items-center gap-2 text-xs font-mono font-semibold text-neutral-300 hover:text-[#E8B923] transition-colors px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#E8B923]" />
            <span>+91 99991 32800</span>
          </a>

          <Link href="/contact">
            <Button 
              className="hidden sm:inline-flex bg-gradient-to-r from-[#E8B923] to-[#D4A017] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-xl shadow-lg shadow-[#E8B923]/20 transition-all hover:scale-105"
            >
              Commission Event
            </Button>
          </Link>
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white hover:bg-white/[0.08] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Drawer */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Header;
