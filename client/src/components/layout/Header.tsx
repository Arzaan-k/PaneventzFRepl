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
        
        {/* Right CTA / Phone & WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Direct Action */}
          <a 
            href="https://wa.me/918082024787?text=Hi%20Pan%20Eventz,%20I%20would%20like%20to%20inquire%20about%20event%20production%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs font-mono font-semibold text-[#25D366] hover:text-white hover:bg-[#25D366]/20 transition-all px-3 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 shadow-sm"
            title="Chat with Pan Eventz on WhatsApp (+91 80820 24787)"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span className="hidden xl:inline">+91 80820 24787</span>
            <span className="xl:hidden">WhatsApp</span>
          </a>

          {/* Direct Phone Call */}
          <a 
            href="tel:+919821337523" 
            className="hidden 2xl:flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-300 hover:text-[#E8B923] transition-colors px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#E8B923]" />
            <span>+91 98213 37523</span>
          </a>

          <Link href="/contact">
            <Button 
              className="hidden sm:inline-flex bg-gradient-to-r from-[#E8B923] to-[#D4A017] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider px-4 sm:px-5 py-2 rounded-xl shadow-lg shadow-[#E8B923]/20 transition-all hover:scale-105"
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
