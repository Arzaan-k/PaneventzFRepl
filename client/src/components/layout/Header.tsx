import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing location
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className={cn(
      "fixed w-full bg-white shadow-md z-50 transition-all duration-300",
      scrolled ? "py-2" : "py-3"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-primary font-bold text-3xl font-montserrat">
            Pan<span className="text-secondary">Eventz</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex space-x-8">
            <Link href="/" className={cn(
              "text-neutral-800 hover:text-primary font-medium transition-colors",
              isActive("/") && "text-primary"
            )}>
              Home
            </Link>
            
            <div className="relative group">
              <Link href="/services" className={cn(
                "text-neutral-800 hover:text-primary font-medium transition-colors flex items-center",
                (isActive("/services") || location.startsWith('/services/')) && "text-primary"
              )}>
                Services <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link href="/services/corporate" className="block px-4 py-2 hover:bg-neutral-100 text-neutral-700">
                  Corporate Events
                </Link>
                <Link href="/services/wedding" className="block px-4 py-2 hover:bg-neutral-100 text-neutral-700">
                  Weddings
                </Link>
                <Link href="/services/sports" className="block px-4 py-2 hover:bg-neutral-100 text-neutral-700">
                  Sports Events
                </Link>
                <Link href="/services/education" className="block px-4 py-2 hover:bg-neutral-100 text-neutral-700">
                  School/College Events
                </Link>
                <Link href="/services/cultural" className="block px-4 py-2 hover:bg-neutral-100 text-neutral-700">
                  Cultural Events
                </Link>
              </div>
            </div>
            
            <Link href="/gallery" className={cn(
              "text-neutral-800 hover:text-primary font-medium transition-colors",
              isActive("/gallery") && "text-primary"
            )}>
              Gallery
            </Link>
            
            <Link href="/about" className={cn(
              "text-neutral-800 hover:text-primary font-medium transition-colors",
              isActive("/about") && "text-primary"
            )}>
              About Us
            </Link>
            
            <Link href="/blog" className={cn(
              "text-neutral-800 hover:text-primary font-medium transition-colors",
              isActive("/blog") && "text-primary"
            )}>
              Blog
            </Link>
            
            <Link href="/contact" className={cn(
              "text-neutral-800 hover:text-primary font-medium transition-colors",
              isActive("/contact") && "text-primary"
            )}>
              Contact
            </Link>
          </nav>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            className="text-neutral-800 focus:outline-none p-2 rounded-full hover:bg-neutral-100" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        )}
        
        {/* Contact Button (Desktop) */}
        {!isMobile && (
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full">
              Book Now
            </Button>
          </Link>
        )}
      </div>
      
      {/* Mobile Menu Component */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
