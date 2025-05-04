import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
            className="text-neutral-800 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <i className="fas fa-times text-2xl"></i>
            ) : (
              <i className="fas fa-bars text-2xl"></i>
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
      
      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div className={cn(
          "bg-white shadow-lg absolute w-full left-0 top-full mt-0.5 transition-all duration-300",
          !mobileMenuOpen && "hidden"
        )}>
          <div className="container mx-auto px-4 py-3">
            <Link href="/" className="block py-2 px-4 text-neutral-800 hover:bg-neutral-100">
              Home
            </Link>
            
            <div className="relative">
              <div 
                className="flex justify-between items-center py-2 px-4 text-neutral-800 hover:bg-neutral-100 cursor-pointer"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              >
                Services 
                <i className={`fas fa-chevron-down ml-1 text-xs transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`}></i>
              </div>
              
              <div className={cn("bg-neutral-50 px-4", !servicesDropdownOpen && "hidden")}>
                <Link href="/services/corporate" className="block py-2 text-neutral-700 hover:text-primary border-b border-neutral-200">
                  Corporate Events
                </Link>
                <Link href="/services/wedding" className="block py-2 text-neutral-700 hover:text-primary border-b border-neutral-200">
                  Weddings
                </Link>
                <Link href="/services/sports" className="block py-2 text-neutral-700 hover:text-primary border-b border-neutral-200">
                  Sports Events
                </Link>
                <Link href="/services/education" className="block py-2 text-neutral-700 hover:text-primary border-b border-neutral-200">
                  School/College Events
                </Link>
                <Link href="/services/cultural" className="block py-2 text-neutral-700 hover:text-primary">
                  Cultural Events
                </Link>
              </div>
            </div>
            
            <Link href="/gallery" className="block py-2 px-4 text-neutral-800 hover:bg-neutral-100">
              Gallery
            </Link>
            
            <Link href="/about" className="block py-2 px-4 text-neutral-800 hover:bg-neutral-100">
              About Us
            </Link>
            
            <Link href="/blog" className="block py-2 px-4 text-neutral-800 hover:bg-neutral-100">
              Blog
            </Link>
            
            <Link href="/contact" className="block py-2 px-4 text-neutral-800 hover:bg-neutral-100">
              Contact
            </Link>
            
            <div className="mt-2 mb-2">
              <Link href="/contact">
                <Button className="w-full bg-primary text-white font-medium rounded-full">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
