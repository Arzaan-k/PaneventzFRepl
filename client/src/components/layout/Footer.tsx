import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-white font-bold text-3xl font-montserrat">
                Pan<span className="text-primary">Eventz</span>
              </span>
            </Link>
            <p className="text-neutral-400 mb-6">
              Creating extraordinary event experiences through innovation, creativity, and flawless execution.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-400 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-neutral-400 hover:text-primary transition-colors">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/corporate" className="text-neutral-400 hover:text-primary transition-colors">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link href="/services/wedding" className="text-neutral-400 hover:text-primary transition-colors">
                  Wedding Events
                </Link>
              </li>
              <li>
                <Link href="/services/sports" className="text-neutral-400 hover:text-primary transition-colors">
                  Sports Events
                </Link>
              </li>
              <li>
                <Link href="/services/education" className="text-neutral-400 hover:text-primary transition-colors">
                  School/College Events
                </Link>
              </li>
              <li>
                <Link href="/services/cultural" className="text-neutral-400 hover:text-primary transition-colors">
                  Cultural Events
                </Link>
              </li>
              <li>
                <Link href="/services/logistics" className="text-neutral-400 hover:text-primary transition-colors">
                  Logistics & Production
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary mt-1.5 mr-3"></i>
                <span className="text-neutral-400">
                  123 Event Plaza, Sector 63, Noida, Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-primary mt-1.5 mr-3"></i>
                <span className="text-neutral-400">+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope text-primary mt-1.5 mr-3"></i>
                <span className="text-neutral-400">info@paneventz.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock text-primary mt-1.5 mr-3"></i>
                <span className="text-neutral-400">Mon-Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Pan Eventz. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-neutral-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-neutral-400 hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
