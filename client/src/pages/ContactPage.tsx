import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/home/ContactSection";

const ContactPage = () => {
  // Set page title
  useEffect(() => {
    document.title = "Contact Us - Pan Eventz";
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* Modern Contact Banner with geometric elements */}
        <section 
          className="relative min-h-[60vh] flex items-center justify-center bg-center bg-cover overflow-hidden"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80')"
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-[100px]"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full filter blur-[100px]"></div>
            </div>
            
            {/* Geometric shapes */}
            <div className="absolute inset-0">
              <div className="absolute top-[20%] left-[10%] w-10 h-10 border-2 border-white/20 rounded-lg transform rotate-45"></div>
              <div className="absolute bottom-[30%] left-[15%] w-20 h-1 bg-primary/30 rounded-full"></div>
              <div className="absolute top-[15%] right-[15%] w-16 h-16 border-2 border-white/20 rounded-full"></div>
              <div className="absolute bottom-[20%] right-[10%] w-24 h-1 bg-primary/30 rounded-full transform -rotate-45"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 text-center text-white relative z-10 py-20">
            {/* Decorative accent */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-10 h-1 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full mx-3"></div>
              <div className="w-10 h-1 bg-primary rounded-full"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6 tracking-tight">
              <span className="relative inline-block">
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/30 -z-10 rounded"></span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10 text-white/90">
              Ready to plan your next event? Contact our team for a consultation and let us bring your vision to life.
            </p>
            
            {/* Contact info highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 100 12A6 6 0 0010 4zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    <path d="M10 12a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-center text-white/80">Mumbai, Maharashtra, India</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-center text-white/80">+91 98213 37523</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 transform transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-center text-white/80">pan.eventz7@gmail.com</p>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
