import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [, setLocation] = useLocation();
  
  // Close menu when location changes
  useEffect(() => {
    if (isOpen) onClose();
  }, [setLocation]);

  // Prevent body scroll when menu is open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-5 flex justify-between items-center border-b border-white/10">
            <Link href="/" className="text-white text-2xl font-bold">
              Pan<span className="text-primary">Eventz</span>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          
          <nav className="flex-1 flex flex-col justify-center px-5">
            <ul className="space-y-4 text-center">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "Gallery", path: "/gallery" },
                { label: "About", path: "/about" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" }
              ].map((item) => (
                <motion.li 
                  key={item.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * ([
                    { label: "Home", path: "/" },
                    { label: "Services", path: "/services" },
                    { label: "Gallery", path: "/gallery" },
                    { label: "About", path: "/about" },
                    { label: "Blog", path: "/blog" },
                    { label: "Contact", path: "/contact" }
                  ].indexOf(item)) }}
                >
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="text-white text-2xl font-medium hover:text-primary transition-colors w-full py-2"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          <div className="border-t border-white/10 p-5">
            <Button 
              onClick={() => handleNavigation("/contact")}
              className="w-full py-6 text-lg"
            >
              Get In Touch
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;