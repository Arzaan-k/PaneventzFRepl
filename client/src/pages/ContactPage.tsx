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
        {/* Contact Banner */}
        <section 
          className="relative py-32 bg-center bg-cover"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80')"
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Ready to plan your next event? Contact our team for a consultation and let us bring your vision to life.
            </p>
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
