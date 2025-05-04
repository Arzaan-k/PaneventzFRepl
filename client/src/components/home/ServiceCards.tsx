import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface ServiceFeature {
  id: number;
  text: string;
}

interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  features: ServiceFeature[];
}

const ServiceCards = () => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['/api/services'],
    queryFn: () => fetch('/api/services').then(res => res.json()),
  });

  // Fallback services if API fails or is loading
  const fallbackServices: Service[] = [
    {
      id: 1,
      slug: "corporate",
      title: "Corporate Events",
      description: "Professional conferences, product launches, team-building events, and corporate galas designed to elevate your brand.",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      features: [
        { id: 1, text: "Conferences & Seminars" },
        { id: 2, text: "Award Ceremonies" },
        { id: 3, text: "Team Building Events" }
      ]
    },
    {
      id: 2,
      slug: "wedding",
      title: "Wedding Events",
      description: "Magical wedding experiences, from intimate ceremonies to grand celebrations, with meticulous attention to detail.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      features: [
        { id: 1, text: "Wedding Planning & Coordination" },
        { id: 2, text: "Elegant Decor & Staging" },
        { id: 3, text: "Cultural Wedding Ceremonies" }
      ]
    },
    {
      id: 3,
      slug: "sports",
      title: "Sports Events",
      description: "Dynamic sports event management with professional sound systems, lighting, and live streaming services.",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      features: [
        { id: 1, text: "Tournament Organization" },
        { id: 2, text: "Live Streaming & Broadcasting" },
        { id: 3, text: "Audio-Visual Production" }
      ]
    },
    {
      id: 4,
      slug: "education",
      title: "School & College Events",
      description: "Vibrant educational events including annual functions, cultural fests, and inter-school competitions.",
      imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      features: [
        { id: 1, text: "Annual Day Functions" },
        { id: 2, text: "College Festivals" },
        { id: 3, text: "Graduation Ceremonies" }
      ]
    },
    {
      id: 5,
      slug: "cultural",
      title: "Cultural Events",
      description: "Showcase cultural performances, TED Talks, art exhibitions, and community gatherings with professional execution.",
      imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      features: [
        { id: 1, text: "TED Talks & Conferences" },
        { id: 2, text: "Music & Dance Performances" },
        { id: 3, text: "Art & Cultural Exhibitions" }
      ]
    },
    {
      id: 6,
      slug: "logistics",
      title: "Logistics & Production",
      description: "Comprehensive event logistics including transportation, resource management, and on-ground coordination.",
      imageUrl: "https://images.unsplash.com/photo-1492683513054-55277abccd99?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      features: [
        { id: 1, text: "Equipment & Resource Management" },
        { id: 2, text: "Transportation & Accommodation" },
        { id: 3, text: "On-site Event Coordination" }
      ]
    }
  ];

  // Use actual services or fallback
  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Our Comprehensive <span className="text-primary">Event Services</span>
          </h2>
          <p className="text-lg text-neutral-600">
            From conceptualization to execution, we offer end-to-end event management solutions tailored to your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array(6).fill(0).map((_, index) => (
              <Card key={index} className="h-[450px] bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
                <div className="h-60 bg-neutral-200"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-neutral-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-neutral-100 rounded w-full mb-2"></div>
                  <div className="h-4 bg-neutral-100 rounded w-full mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-neutral-100 rounded w-full"></div>
                    <div className="h-4 bg-neutral-100 rounded w-full"></div>
                    <div className="h-4 bg-neutral-100 rounded w-full"></div>
                  </div>
                  <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))
          ) : (
            displayServices.map((service) => (
              <div 
                key={service.id}
                id={service.slug}
                className="service-card bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              >
                <div className="h-60 overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-800 mb-3 font-montserrat">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature.id} className="flex items-start">
                        <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                        <span className="text-neutral-700">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-block text-primary font-medium hover:text-primary/80 transition-colors"
                  >
                    Learn More <i className="fas fa-arrow-right ml-1"></i>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
