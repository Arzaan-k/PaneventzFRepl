import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const PremiumServices = () => {
  // Hardcoded premium services
  const services: Service[] = [
    {
      id: 1,
      title: "Corporate Events",
      description: "Professional corporate event management from conferences to product launches.",
      icon: "fa-building",
      link: "/services/corporate"
    },
    {
      id: 2,
      title: "Wedding Planning",
      description: "Complete wedding planning services for your perfect day.",
      icon: "fa-heart",
      link: "/services/wedding"
    },
    {
      id: 3,
      title: "Cultural Events",
      description: "Authentic cultural celebrations and traditional ceremonies.",
      icon: "fa-theater-masks",
      link: "/services/cultural"
    },
    {
      id: 4,
      title: "Social Gatherings",
      description: "Memorable social events and private celebrations.",
      icon: "fa-users",
      link: "/services/social"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Premium <span className="text-primary">Event Services</span>
          </h2>
          <p className="text-lg text-neutral-600">
            From intimate gatherings to grand celebrations, we deliver exceptional experiences tailored to your vision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden"
            >
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                
                <h3 className="text-xl font-bold font-montserrat mb-3 text-neutral-800">
                  {service.title}
                </h3>
                
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <Link href={service.link}>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Learn More
                    <i className="fas fa-arrow-right ml-2 text-sm"></i>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link href="/services">
            <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              View All Services
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;