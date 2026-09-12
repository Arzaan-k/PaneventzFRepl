import { Link } from "wouter";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Award
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#05070B] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8B923]/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E6193C]/5 rounded-full blur-[140px] pointer-events-none translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          
          {/* Brand & About (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E8B923] via-[#E6193C] to-[#E8B923] flex items-center justify-center text-black shadow-lg shadow-[#E8B923]/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-montserrat tracking-tight text-white leading-none">
                  Pan<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7A9] via-[#E8B923] to-[#C5981B]">Eventz</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-slate-400 font-mono mt-0.5">
                  Grandeur & AV Production
                </span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              India's premier turnkey event management and live production powerhouse. Spearheaded by Founder & MD Imran Mirza with 30+ years of proven mastery across stadium concerts, royal palatial weddings, and Fortune 500 summits.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E8B923] hover:text-black hover:border-[#E8B923] transition-all duration-300 shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E8B923] hover:text-black hover:border-[#E8B923] transition-all duration-300 shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E8B923] hover:text-black hover:border-[#E8B923] transition-all duration-300 shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E8B923] hover:text-black hover:border-[#E8B923] transition-all duration-300 shadow-sm"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-montserrat font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Services & Tech", href: "/services" },
                { label: "Media & Gallery", href: "/media" },
                { label: "About Our Story", href: "/about" },
                { label: "Blog Insights", href: "/blog" },
                { label: "VIP Concierge", href: "/contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-slate-400 hover:text-[#E8B923] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 text-xs sm:text-sm font-light"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#E8B923] opacity-60" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Service Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-montserrat font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
              Disciplines
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Fortune 500 Corporate Summits", href: "/services/corporate" },
                { label: "Royal Palatial Destination Weddings", href: "/services/wedding" },
                { label: "Stadium Live Concerts & Festivals", href: "/services/cultural" },
                { label: "AV & Line-Array Staging Rentals", href: "/services" },
                { label: "Sports League Ceremonies & TV Broadcast", href: "/services/sports" },
                { label: "Campus Youth Festivals & Pro-Nights", href: "/services/education" }
              ].map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href} 
                    className="text-slate-400 hover:text-[#E8B923] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 text-xs sm:text-sm font-light"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#E8B923] opacity-60" />
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-montserrat font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B923]"></span>
              Headquarters
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-300 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E8B923] shrink-0 mt-0.5" />
                <span>Mumbai Operations HQ & Delhi NCR Regional Office</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E8B923] shrink-0" />
                <a href="tel:+919821337523" className="hover:text-[#E8B923] transition-colors font-medium">
                  +91 98213 37523 / +91 99991 32800
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E8B923] shrink-0" />
                <a href="mailto:info@paneventz.com" className="hover:text-[#E8B923] transition-colors font-medium">
                  info@paneventz.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#E8B923] shrink-0 mt-0.5" />
                <span>Concierge Desk: 24/7 Priority Hotline</span>
              </li>
            </ul>
            
            <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#E8B923] shrink-0" />
              <div className="text-xs text-slate-400 font-light">
                <div className="font-semibold text-white">100% On-Time Execution Guarantee</div>
                <div>Turnkey event production with zero compromises.</div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-light">
          <div>
            &copy; {new Date().getFullYear()} Pan Eventz. All rights reserved. Directed by Imran Mirza.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Terms of Production
            </Link>
            <Link href="/admin/login" className="text-slate-500 hover:text-[#E8B923] transition-colors font-medium">
              Staff Concierge Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


