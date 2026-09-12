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
              
              <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#E8B923] px-4 font-mono">
                  Direct Private Line
                </div>
                <a 
                  href="tel:+919999132800" 
                  className="flex items-center gap-3 px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-2xl text-white font-mono text-xs font-semibold hover:border-[#E8B923]/40 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#E8B923]" />
                  <span>+91 99991 32800</span>
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