import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  Home, 
  Layers, 
  Image as ImageIcon, 
  Info, 
  BookOpen, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [location, setLocation] = useLocation();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    setLocation(path);
    onClose();
  };

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Services", path: "/services", icon: Layers },
    { label: "Media Showcase", path: "/media", icon: ImageIcon },
    { label: "About Heritage", path: "/about", icon: Info },
    { label: "Journal & Insights", path: "/blog", icon: BookOpen },
    { label: "Direct Contact", path: "/contact", icon: PhoneCall },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Drawer Panel */}
          <motion.div 
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#090D16] border-l border-white/10 shadow-2xl flex flex-col z-10 text-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-5 flex justify-between items-center border-b border-white/10 bg-[#0D121D]/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E8B923] via-[#E6193C] to-[#E8B923] text-black flex items-center justify-center shadow-lg shadow-[#E8B923]/20">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl font-bold font-playfair text-white">
                  Pan<span className="text-gradient-gold">Eventz</span>
                </span>
              </div>
              
              <button 
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium text-sm transition-all ${
                      isActive 
                        ? "bg-[#E8B923]/10 text-[#E8B923] border border-[#E8B923]/30 font-bold" 
                        : "text-neutral-300 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#E8B923]" : "text-neutral-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                  </button>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-white/10 space-y-2.5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#E8B923] px-2 font-mono">
                  Direct VIP Lines & WhatsApp
                </div>
                
                {/* WhatsApp Action */}
                <a 
                  href="https://wa.me/918082024787?text=Hi%20Pan%20Eventz,%20I%20would%20like%20to%20inquire%20about%20event%20production%20services." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl text-[#25D366] font-mono text-xs font-bold hover:bg-[#25D366]/20 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>+91 80820 24787</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-[#25D366]/20 px-2 py-0.5 rounded-md">WhatsApp</span>
                </a>

                {/* Direct Call Lines */}
                <a 
                  href="tel:+919821337523" 
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white font-mono text-xs font-semibold hover:border-[#E8B923]/40 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#E8B923] shrink-0" />
                  <span>Direct Line: +91 98213 37523</span>
                </a>
              </div>
            </nav>
            
            {/* Footer CTA */}
            <div className="p-4 border-t border-white/10 bg-[#0D121D]/80 space-y-3">
              <Button 
                onClick={() => handleNavigation("/contact")}
                className="w-full py-6 text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-[#E8B923] to-[#D4A017] hover:brightness-110 text-black rounded-2xl shadow-lg shadow-[#E8B923]/20 flex items-center justify-center gap-2"
              >
                <span>Commission Luxury Production</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E8B923]" />
                <span>30+ Years Heritage • 1000+ Completed Events</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;