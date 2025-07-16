import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
  image: string;
}

const PremiumServices = () => {
  // Hardcoded premium services
  const services: Service[] = [
    {
      id: 1,
      title: "Corporate Events",
      description: "Professional corporate event management from conferences to product launches.",
      icon: "fa-building",
      link: "/services/corporate",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 2,
      title: "Wedding Planning",
      description: "Complete wedding planning services for your perfect day.",
      icon: "fa-heart",
      link: "/services/wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 3,
      title: "Cultural Events",
      description: "Authentic cultural celebrations and traditional ceremonies.",
      icon: "fa-theater-masks",
      link: "/services/cultural",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 4,
      title: "Social Gatherings",
      description: "Memorable social events and private celebrations.",
      icon: "fa-users",
      link: "/services/social",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
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
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center text-xl">
                    <i className={`fas ${service.icon}`}></i>
                  </div>
                </div>
              </div>
              
              <div className="p-6 text-center">
                
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