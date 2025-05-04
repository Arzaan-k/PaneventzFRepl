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
    <section id="services" className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        {/* Modern section header with accent line */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block mb-3">
            <span className="inline-block h-1 w-10 bg-primary rounded-full mr-2"></span>
            <span className="inline-block h-1 w-20 bg-primary rounded-full"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
            Our Premium <span className="relative">
              <span className="relative z-10">Services</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 rounded-lg"></span>
            </span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            From conceptualization to execution, we offer end-to-end event management solutions 
            tailored to transform your vision into unforgettable experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading ? (
            // Enhanced loading skeleton
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="h-[480px] bg-white rounded-xl shadow-lg overflow-hidden animate-pulse relative group">
                <div className="h-64 bg-neutral-200"></div>
                <div className="absolute top-4 left-4 w-12 h-12 rounded-lg bg-neutral-100"></div>
                <div className="p-6">
                  <div className="h-7 bg-neutral-200 rounded-full w-3/4 mb-4"></div>
                  <div className="h-4 bg-neutral-100 rounded-full w-full mb-2"></div>
                  <div className="h-4 bg-neutral-100 rounded-full w-full mb-2"></div>
                  <div className="h-4 bg-neutral-100 rounded-full w-4/5 mb-6"></div>
                  <div className="space-y-3 mb-6">
                    <div className="h-4 bg-neutral-100 rounded-full w-full flex">
                      <div className="w-4 h-4 rounded-full bg-primary/20 mr-2"></div>
                    </div>
                    <div className="h-4 bg-neutral-100 rounded-full w-full flex">
                      <div className="w-4 h-4 rounded-full bg-primary/20 mr-2"></div>
                    </div>
                    <div className="h-4 bg-neutral-100 rounded-full w-full flex">
                      <div className="w-4 h-4 rounded-full bg-primary/20 mr-2"></div>
                    </div>
                  </div>
                  <div className="h-10 bg-neutral-100 rounded-full w-1/3"></div>
                </div>
              </div>
            ))
          ) : (
            displayServices.map((service, index) => (
              <div 
                key={service.id}
                id={service.slug}
                className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl relative service-card"
                style={{ 
                  transform: `translateY(${index % 3 * 20}px)`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Service image with overlay */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary px-4 py-1 rounded-full text-sm font-medium shadow-lg z-10">
                    {service.slug.charAt(0).toUpperCase() + service.slug.slice(1)}
                  </div>
                </div>
                
                <div className="p-8 relative">
                  {/* Decorative accent line */}
                  <div className="absolute -top-5 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                  
                  {/* Service title */}
                  <h3 className="text-2xl font-bold text-neutral-800 mb-4 font-montserrat group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Service description */}
                  <p className="text-neutral-600 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {service.description}
                  </p>
                  
                  {/* Service features with modern checkmarks */}
                  <ul className="mb-8 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature.id} className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-neutral-700">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Modern learn more button */}
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-center text-white bg-primary hover:bg-primary/90 px-6 py-3 rounded-full font-medium text-sm transition-all group-hover:shadow-lg hover:translate-y-[-2px]"
                  >
                    Explore Service
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* View all services button */}
        <div className="text-center mt-16">
          <Link 
            href="/services"
            className="inline-flex items-center justify-center bg-white border border-neutral-200 hover:border-primary/30 text-primary hover:text-primary/90 px-8 py-4 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/5"
          >
            View All Services
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
