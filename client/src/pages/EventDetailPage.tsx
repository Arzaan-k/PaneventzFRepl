import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";

// Interface for event details
interface EventDetail {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  clientName?: string;
  attendees?: number;
  status: string;
  bannerImage?: string;
  gallery?: { id: number; imageUrl: string; alt: string; type: string }[];
  keyHighlights?: string[];
  services?: string[];
  testimonial?: {
    content: string;
    author: {
      name: string;
      title: string;
      avatar?: string;
    };
    rating: number;
  };
}

// Interface for gallery items that are related to this event
interface GalleryItem {
  id: number;
  title: string;
  category: string;
  event?: string;
  date?: string;
  description?: string;
  imageUrl: string;
}

const EventDetailPage = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get the event slug from URL (assuming event/:slug in routing)
  const pathname = window.location.pathname;
  const slugMatch = pathname.match(/\/event\/(.+)/);
  const eventSlug = slugMatch ? slugMatch[1] : "";
  
  // Fetch event details
  const { data: event, isLoading: eventLoading } = useQuery({
    queryKey: [`/api/events/${eventSlug}`],
    queryFn: () => fetch(`/api/events/${eventSlug}`).then(res => res.json()),
    enabled: !!eventSlug,
  });
  
  // Fetch gallery items for this event
  const { data: galleryItems = [], isLoading: galleryLoading } = useQuery({
    queryKey: ['/api/gallery', event?.title],
    queryFn: () => fetch(`/api/gallery?event=${encodeURIComponent(event?.title || '')}`).then(res => res.json()),
    enabled: !!event?.title,
  });

  // Fallback event data if API fails
  const fallbackEvent: EventDetail = {
    id: 1,
    slug: "annual-corporate-summit-2023",
    title: "Annual Corporate Summit 2023",
    description: "A prestigious corporate leadership summit featuring keynote speakers, interactive workshops, and networking opportunities for business leaders. The event focused on innovation, digital transformation, and sustainable business practices.",
    date: "2023-03-15",
    location: "Grand Hyatt, New Delhi",
    category: "corporate",
    clientName: "Global Tech Solutions Ltd.",
    attendees: 350,
    status: "completed",
    bannerImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&h=800&q=80",
    gallery: [
      { id: 1, imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80", alt: "Conference hall setup", type: "image" },
      { id: 2, imageUrl: "https://images.unsplash.com/photo-1560523159-4a9692d222ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80", alt: "Keynote speech", type: "image" },
      { id: 3, imageUrl: "https://images.unsplash.com/photo-1560523159-0a96e4ea82b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80", alt: "Panel discussion", type: "image" },
      { id: 4, imageUrl: "https://images.unsplash.com/photo-1566998497206-6451db8021a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80", alt: "Networking session", type: "image" },
    ],
    keyHighlights: [
      "5 keynote speakers from Fortune 500 companies",
      "12 interactive workshop sessions",
      "Custom stage design with LED backdrop",
      "Professional sound and lighting setup",
      "Live streaming to global offices",
      "Event app for attendees with interactive features"
    ],
    services: [
      "Venue selection and management",
      "Stage and seating design",
      "Audio-visual equipment setup",
      "Lighting design and implementation",
      "Speaker coordination",
      "Event photography and videography",
      "Catering and refreshments",
      "Registration and attendee management"
    ],
    testimonial: {
      content: "Pan Eventz delivered an exceptional corporate summit that exceeded our expectations. Their meticulous planning and flawless execution created a memorable experience for our attendees.",
      author: {
        name: "Vikram Mehta",
        title: "Director of Communications, Global Tech Solutions",
        avatar: "https://i.pravatar.cc/300?img=12"
      },
      rating: 5
    }
  };

  // Use actual event or fallback
  const displayEvent = event || fallbackEvent;
  
  // Use actual gallery items or infer from event gallery
  const displayGalleryItems: GalleryItem[] = galleryItems.length > 0 
    ? galleryItems 
    : (displayEvent.gallery?.map(item => ({
        id: item.id,
        title: displayEvent.title,
        category: displayEvent.category,
        event: displayEvent.title,
        date: displayEvent.date,
        description: displayEvent.description,
        imageUrl: item.imageUrl
      })) || []);

  useEffect(() => {
    // Set page title
    document.title = `${displayEvent.title} - Pan Eventz Case Study`;
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [displayEvent]);

  return (
    <>
      <Header />
      
      <main className="bg-neutral-50/50 min-h-screen">
        {/* Hero Banner */}
        <section 
          className="relative h-[50vh] md:h-[60vh] bg-center bg-cover overflow-hidden"
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${displayEvent.bannerImage}')` }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-40 left-20 w-80 h-80 bg-primary/20 rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full filter blur-[120px]"></div>
          </div>
          
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
            <div className="max-w-4xl">
              <div className="flex items-center mb-4">
                <span className="text-white/80 text-sm uppercase tracking-wider font-medium mr-4">Case Study</span>
                <div className="h-px bg-white/30 flex-grow"></div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {displayEvent.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-sm font-medium">
                    {displayEvent.category.charAt(0).toUpperCase() + displayEvent.category.slice(1)}
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-sm font-medium">
                    {formatDate(displayEvent.date)}
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-sm font-medium">
                    {displayEvent.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
        
        {/* Event Details Section */}
        <section className="py-12 md:py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Event Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-neutral-500 text-sm">Client</p>
                      <p className="font-medium">{displayEvent.clientName || "Confidential"}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500 text-sm">Date</p>
                      <p className="font-medium">{formatDate(displayEvent.date)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500 text-sm">Location</p>
                      <p className="font-medium">{displayEvent.location}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500 text-sm">Attendees</p>
                      <p className="font-medium">{displayEvent.attendees || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500 text-sm">Category</p>
                      <p className="font-medium capitalize">{displayEvent.category}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Services Provided</h3>
                  <ul className="space-y-2">
                    {displayEvent.services?.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      onClick={() => setLocation("/contact?service=event&reference=" + encodeURIComponent(displayEvent.title))}
                    >
                      Request Similar Event
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="overview" className="text-sm md:text-base">Overview</TabsTrigger>
                    <TabsTrigger value="highlights" className="text-sm md:text-base">Highlights</TabsTrigger>
                    <TabsTrigger value="gallery" className="text-sm md:text-base">Gallery</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="border-none p-0">
                    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Event Overview</h2>
                      
                      <div className="prose prose-neutral max-w-none">
                        <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                          {displayEvent.description}
                        </p>
                      </div>
                      
                      {displayEvent.testimonial && (
                        <>
                          <Separator className="my-8" />
                          
                          <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                              {displayEvent.testimonial.author.avatar && (
                                <div className="flex-shrink-0">
                                  <img 
                                    src={displayEvent.testimonial.author.avatar} 
                                    alt={displayEvent.testimonial.author.name} 
                                    className="w-16 h-16 rounded-full object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <div className="flex mb-3">
                                  {[...Array(5)].map((_, i) => (
                                    <svg 
                                      key={i} 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      className={`h-5 w-5 ${i < displayEvent.testimonial!.rating ? 'text-yellow-400' : 'text-neutral-200'}`} 
                                      viewBox="0 0 20 20" 
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <blockquote className="text-neutral-700 italic mb-4">
                                  "{displayEvent.testimonial.content}"
                                </blockquote>
                                <cite className="not-italic">
                                  <p className="font-medium text-neutral-900">{displayEvent.testimonial.author.name}</p>
                                  <p className="text-neutral-500 text-sm">{displayEvent.testimonial.author.title}</p>
                                </cite>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="highlights" className="border-none p-0">
                    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Key Highlights</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {displayEvent.keyHighlights?.map((highlight, index) => (
                          <div key={index} className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
                            <div className="flex">
                              <div className="flex-shrink-0 mr-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <span className="text-primary font-bold">{index + 1}</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-neutral-700">{highlight}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gallery" className="border-none p-0">
                    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Event Gallery</h2>
                      
                      <Carousel className="w-full max-w-5xl mx-auto">
                        <CarouselContent>
                          {displayGalleryItems.map((item, index) => (
                            <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                              <div className="p-1">
                                <div className="overflow-hidden rounded-xl aspect-square">
                                  <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-all hover:scale-110 duration-300"
                                  />
                                </div>
                                <h3 className="mt-2 text-sm font-medium text-neutral-900 truncate">{item.title}</h3>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                      
                      {/* Gallery grid for mobile */}
                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayGalleryItems.slice(0, 6).map((item, index) => (
                          <div key={index} className="overflow-hidden rounded-xl">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-full aspect-square object-cover transition-all hover:scale-110 duration-300"
                            />
                          </div>
                        ))}
                      </div>
                      
                      {displayGalleryItems.length > 6 && (
                        <div className="mt-8 text-center">
                          <Button 
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-white"
                            onClick={() => setLocation(`/gallery?event=${encodeURIComponent(displayEvent.title)}`)}
                          >
                            View All Photos
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Events Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Similar Events</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Explore other {displayEvent.category} events we've managed
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayGalleryItems.slice(0, 3).map((item, index) => (
                <div key={index} className="bg-neutral-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-all hover:scale-110 duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-neutral-600 line-clamp-2 mb-4">{item.description}</p>
                    <Button 
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => {
                        // In a real app, this would navigate to the related event
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8"
                onClick={() => setLocation(`/gallery?filter=${displayEvent.category}`)}
              >
                Explore All {displayEvent.category.charAt(0).toUpperCase() + displayEvent.category.slice(1)} Events
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Next Event?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Let us help you create a memorable and impactful event experience. Contact our team today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => setLocation("/contact")}
              >
                Contact Us
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-neutral-900"
                onClick={() => setLocation("/services")}
              >
                Explore Services
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default EventDetailPage;