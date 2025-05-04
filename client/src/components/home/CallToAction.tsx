import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { scrollToSection } from "@/lib/utils";

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
          Ready to Create Your Next Memorable Event?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Let Pan Eventz help you bring your vision to life with our creative event solutions and flawless execution.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact">
            <Button className="bg-white text-primary hover:bg-neutral-100 font-medium px-8 py-3 rounded-full transition-colors">
              Contact Us Today
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => scrollToSection('services')}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white font-medium px-8 py-3 rounded-full transition-colors"
          >
            Explore Our Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
