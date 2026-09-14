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
            
            {/* Social Links & WhatsApp */}
            <div className="flex items-center gap-2.5">
              <a 
                href="https://wa.me/918082024787?text=Hi%20Pan%20Eventz,%20I%20would%20like%20to%20inquire%20about%20event%20production%20services." 
                target="_blank" 
                rel="noreferrer"
                aria-label="WhatsApp"
                title="Chat on WhatsApp (+91 80820 24787)"
                className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-black hover:border-[#25D366] transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
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
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E8B923] shrink-0 mt-0.5" />
                <span>Mumbai Operations HQ & Delhi NCR Regional Office</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 text-[#25D366] shrink-0 flex items-center justify-center font-bold">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </span>
                <div>
                  <span className="text-slate-400 text-xs">WhatsApp Desk: </span>
                  <a href="https://wa.me/918082024787" target="_blank" rel="noreferrer" className="text-[#25D366] hover:underline font-semibold">
                    +91 80820 24787
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E8B923] shrink-0" />
                <div>
                  <span className="text-slate-400 text-xs">Direct: </span>
                  <a href="tel:+919821337523" className="hover:text-[#E8B923] transition-colors font-medium">
                    +91 98213 37523
                  </a>
                </div>
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


