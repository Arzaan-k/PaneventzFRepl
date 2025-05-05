import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description?: string;
  event?: string;
  date?: string;
  imageUrl: string;
}

const GalleryPage = () => {
  const [filter, setFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: galleryItems = [], isLoading } = useQuery({
    queryKey: ['/api/gallery'],
    queryFn: () => fetch('/api/gallery').then(res => res.json()),
  });

  // Fallback gallery items if API fails or is loading
  const fallbackGalleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Annual Corporate Summit",
      category: "corporate",
      description: "Annual leadership summit for a multinational corporation featuring keynote speakers and interactive workshops.",
      event: "Leadership Summit 2023",
      date: "March 15, 2023",
      imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 2,
      title: "Destination Wedding",
      category: "wedding",
      description: "Luxurious destination wedding with personalized decor and spectacular lighting arrangements.",
      event: "Sharma-Kapoor Wedding",
      date: "November 5, 2023",
      imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 3,
      title: "TED Talk Conference",
      category: "cultural",
      description: "TED Talk event featuring renowned speakers from various industries sharing innovative ideas.",
      event: "TEDx Delhi 2023",
      date: "June 24, 2023",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 4,
      title: "City Marathon",
      category: "sports",
      description: "Annual city marathon with over 5,000 participants, featuring live event coverage and customized stage setups.",
      event: "Delhi Marathon 2023",
      date: "January 29, 2023",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 5,
      title: "Product Launch",
      category: "corporate",
      description: "High-profile product launch event with interactive displays and immersive brand experience.",
      event: "NextGen Tech Launch",
      date: "August 12, 2023",
      imageUrl: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 6,
      title: "Reception Celebration",
      category: "wedding",
      description: "Elegant wedding reception with custom lighting, sound systems, and decorative elements.",
      event: "Gupta-Patel Reception",
      date: "December 18, 2023",
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 7,
      title: "Music Festival",
      category: "cultural",
      description: "Three-day music festival featuring multiple stages, artist management, and comprehensive sound system setup.",
      event: "Harmony Fest 2023",
      date: "October 7-9, 2023",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 8,
      title: "College Sports Tournament",
      category: "sports",
      description: "Inter-college sports tournament with multiple events, live streaming, and professional event management.",
      event: "Collegiate Champions League",
      date: "February 15-20, 2023",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 9,
      title: "Annual Day Celebration",
      category: "education",
      description: "School annual day featuring student performances, awards ceremony, and custom stage design.",
      event: "Delhi Public School Annual Day",
      date: "April 5, 2023",
      imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 10,
      title: "College Festival",
      category: "education",
      description: "Three-day college cultural festival with multiple events, celebrity performances, and technical production.",
      event: "Symbiosis Fest 2023",
      date: "September 22-24, 2023",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 11,
      title: "Corporate Award Ceremony",
      category: "corporate",
      description: "Annual award ceremony recognizing employee achievements with professional event coordination.",
      event: "Excellence Awards 2023",
      date: "July 30, 2023",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 12,
      title: "Cultural Dance Performance",
      category: "cultural",
      description: "Traditional dance performance with custom lighting design and professional sound management.",
      event: "Classical Dance Festival",
      date: "May 14, 2023",
      imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
  ];

  // Use actual gallery items or fallback
  const displayGalleryItems = galleryItems.length > 0 ? galleryItems : fallbackGalleryItems;

  // Filter gallery items based on selected category and event
  const filteredItems = displayGalleryItems.filter((item: GalleryItem) => {
    // First check category filter
    const matchesCategory = filter === "all" || item.category === filter;
    
    // Then check event filter if it exists
    const matchesEvent = !eventFilter || (item.event && item.event.includes(eventFilter));
    
    return matchesCategory && matchesEvent;
  });

  // Open image modal
  const openImageModal = (item: GalleryItem) => {
    setSelectedImage(item);
    setIsOpen(true);
  };

  // Parse URL params for filters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    const eventParam = urlParams.get('event');
    
    if (filterParam) {
      setFilter(filterParam.toLowerCase());
    }
    
    if (eventParam) {
      setEventFilter(eventParam);
    }
    
    document.title = "Event Gallery - Pan Eventz";
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* Gallery Banner with modern design */}
        <section 
          className="relative py-40 bg-center bg-cover overflow-hidden"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80')"
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-40 left-20 w-80 h-80 bg-primary/20 rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full filter blur-[120px]"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center text-white relative z-10">
            {/* Creative title with design elements */}
            <div className="inline-block mb-6">
              <span className="inline-block h-1 w-10 bg-primary rounded-full mr-2"></span>
              <span className="inline-block h-1 w-20 bg-primary rounded-full"></span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6 tracking-tight">
              Our <span className="relative inline-block">
                <span className="relative z-10">Event Gallery</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/30 -z-10 rounded-lg"></span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-white/90 mb-8">
              Browse through our portfolio of successful events and get inspired for your next celebration.
            </p>
            
            {/* Animated scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Gallery Filters with modern design */}
        <section className="py-16 bg-neutral-50 relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-white to-transparent z-0"></div>
          <div className="absolute -top-28 right-20 w-64 h-64 bg-primary/5 rounded-full z-0"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-accent/5 rounded-full z-0"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-montserrat mb-4">Browse Our <span className="text-primary">Portfolio</span></h2>
              <p className="text-neutral-600 max-w-xl mx-auto">Filter through our extensive collection of events to find inspiration for your next celebration</p>
              
              {eventFilter && (
                <div className="mt-4 inline-flex items-center justify-center bg-primary/10 text-primary font-medium px-4 py-2 rounded-full">
                  <span className="mr-2">Showing photos from event:</span>
                  <span className="font-bold">{eventFilter}</span>
                  <button 
                    className="ml-3 p-1 rounded-full hover:bg-white/30 transition-colors duration-200"
                    onClick={() => {
                      setEventFilter("");
                      const url = new URL(window.location.href);
                      url.searchParams.delete('event');
                      window.history.pushState({}, '', url.toString());
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="mb-16 max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3 p-2 bg-white rounded-full shadow-lg">
                {/* Filter buttons with animated indicator */}
                <Button
                  variant="ghost"
                  className={`px-6 py-3 rounded-full transition-all duration-300 relative ${
                    filter === "all" 
                      ? "text-white font-medium shadow-md" 
                      : "text-neutral-600 hover:text-primary"
                  }`}
                  onClick={() => setFilter("all")}
                >
                  {filter === "all" && (
                    <span className="absolute inset-0 bg-primary rounded-full -z-10"></span>
                  )}
                  All Events
                </Button>
                <Button
                  variant="ghost"
                  className={`px-6 py-3 rounded-full transition-all duration-300 relative ${
                    filter === "corporate" 
                      ? "text-white font-medium shadow-md" 
                      : "text-neutral-600 hover:text-primary"
                  }`}
                  onClick={() => setFilter("corporate")}
                >
                  {filter === "corporate" && (
                    <span className="absolute inset-0 bg-primary rounded-full -z-10"></span>
                  )}
                  Corporate
                </Button>
                <Button
                  variant="ghost"
                  className={`px-6 py-3 rounded-full transition-all duration-300 relative ${
                    filter === "wedding" 
                      ? "text-white font-medium shadow-md" 
                      : "text-neutral-600 hover:text-primary"
                  }`}
                  onClick={() => setFilter("wedding")}
                >
                  {filter === "wedding" && (
                    <span className="absolute inset-0 bg-primary rounded-full -z-10"></span>
                  )}
                  Wedding
                </Button>
                <Button
                  variant="ghost"
                  className={`px-6 py-3 rounded-full transition-all duration-300 relative ${
                    filter === "cultural" 
                      ? "text-white font-medium shadow-md" 
                      : "text-neutral-600 hover:text-primary"
                  }`}
                  onClick={() => setFilter("cultural")}
                >
                  {filter === "cultural" && (
                    <span className="absolute inset-0 bg-primary rounded-full -z-10"></span>
                  )}
                  Cultural
                </Button>
                <Button
                  variant="ghost"
                  className={`px-6 py-3 rounded-full transition-all duration-300 relative ${
                    filter === "sports" 
                      ? "text-white font-medium shadow-md" 
                      : "text-neutral-600 hover:text-primary"
                  }`}
                  onClick={() => setFilter("sports")}
                >
                  {filter === "sports" && (
                    <span className="absolute inset-0 bg-primary rounded-full -z-10"></span>
                  )}
                  Sports
                </Button>
                <Button
                  variant="ghost"
                  className={`px-6 py-3 rounded-full transition-all duration-300 relative ${
                    filter === "education" 
                      ? "text-white font-medium shadow-md" 
                      : "text-neutral-600 hover:text-primary"
                  }`}
                  onClick={() => setFilter("education")}
                >
                  {filter === "education" && (
                    <span className="absolute inset-0 bg-primary rounded-full -z-10"></span>
                  )}
                  Education
                </Button>
              </div>
            </div>

            {/* Gallery Grid with modern masonry-like layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {isLoading ? (
                // Loading skeleton with improved animation
                Array(12).fill(0).map((_, index: number) => (
                  <div 
                    key={index} 
                    className={`overflow-hidden rounded-xl shadow-md animate-pulse ${
                      index % 3 === 0 ? 'sm:row-span-2' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-full h-64 bg-neutral-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-neutral-300 -translate-x-full animate-shimmer"></div>
                    </div>
                    <div className="p-5 bg-white">
                      <div className="h-5 bg-neutral-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="bg-neutral-50 p-10 rounded-xl inline-block shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xl text-neutral-500 font-medium">No gallery items found for this category.</p>
                    <p className="text-neutral-400 mt-2">Try selecting a different category from the filters above.</p>
                  </div>
                </div>
              ) : (
                filteredItems.map((item: GalleryItem, index: number) => (
                  <div 
                    key={item.id} 
                    className={`gallery-item overflow-hidden rounded-xl shadow-lg transition-all duration-500 
                      hover:shadow-2xl hover:-translate-y-1 ${index % 5 === 0 ? 'sm:col-span-2' : ''} 
                      ${index % 7 === 0 ? 'md:row-span-2' : ''}`}
                    onClick={() => openImageModal(item)}
                  >
                    <div className="block relative group cursor-pointer h-full">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90"></div>
                      
                      {/* Hover overlay with animation */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">
                        <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 px-6 text-center">
                          <span className="inline-flex items-center justify-center bg-white text-primary font-semibold px-6 py-3 rounded-full shadow-lg mb-4">
                            View Details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      
                      {/* Content overlay at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-bold text-xl mb-1 drop-shadow-md">{item.title}</h3>
                        <div className="flex items-center text-white/90">
                          <span className="text-xs px-3 py-1 bg-white/20 backdrop-blur-md rounded-full inline-block">
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </span>
                          {item.event && (
                            <span className="ml-2 text-sm truncate">{item.event}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Custom CSS for shimmer effect is defined in index.css */}
          </div>
        </section>

        {/* Enhanced Image Modal with modern design */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-5xl p-0 rounded-xl overflow-hidden bg-white shadow-2xl border-0">
            {selectedImage && (
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left side - Image with overlay */}
                <div className="relative h-[350px] md:h-full overflow-hidden bg-black group">
                  <img 
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.title}
                    className="w-full h-full object-cover opacity-95 transition-transform duration-10000 group-hover:scale-105"
                  />
                  
                  {/* Overlay with category label */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-primary/80 backdrop-blur-sm text-white text-xs uppercase tracking-wider py-2 px-4 rounded-full shadow-lg">
                      {selectedImage.category}
                    </span>
                  </div>
                  
                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                  
                  {/* Bottom metadata */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    {selectedImage.event && (
                      <h4 className="text-xl font-medium mb-1">{selectedImage.event}</h4>
                    )}
                    {selectedImage.date && (
                      <div className="flex items-center text-white/80 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {selectedImage.date}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right side - Content */}
                <div className="p-8 overflow-y-auto max-h-[600px]">
                  <DialogHeader className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="h-1 w-10 bg-primary rounded-full mr-3"></div>
                      <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                        Event Details
                      </span>
                    </div>
                    <DialogTitle className="text-3xl font-bold font-montserrat tracking-tight text-neutral-900">
                      {selectedImage.title}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="prose prose-lg max-w-none text-neutral-700">
                    <p className="leading-relaxed">
                      {selectedImage.description || "Event produced by Pan Eventz, showcasing our expertise in providing exceptional event management services tailored to our client's specific needs and vision."}
                    </p>
                  </div>
                  
                  {/* Features and specifications */}
                  <div className="mt-8 space-y-4">
                    <h4 className="text-lg font-semibold text-neutral-900">Event Specifications</h4>
                    
                    <div className="grid md:grid-cols-2 gap-5 mt-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium text-neutral-900">Category</h5>
                          <p className="text-neutral-600 capitalize">{selectedImage.category}</p>
                        </div>
                      </div>
                      
                      {selectedImage.event && (
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 9H10a1 1 0 110-2h3.586l-2.293-2.293A1 1 0 0112 2z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-neutral-900">Event Name</h5>
                            <p className="text-neutral-600">{selectedImage.event}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedImage.date && (
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-neutral-900">Date</h5>
                            <p className="text-neutral-600">{selectedImage.date}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium text-neutral-900">Production</h5>
                          <p className="text-neutral-600">Pan Eventz</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 flex justify-center md:justify-start space-x-4">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-5 rounded-full shadow-lg">
                      Request Similar Event
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-primary border-2 text-primary hover:bg-primary hover:text-white px-6 py-5 rounded-full shadow-md"
                      onClick={() => {
                        if (selectedImage && selectedImage.event) {
                          const eventPhotosUrl = `/gallery?filter=${selectedImage.category}&event=${encodeURIComponent(selectedImage.event)}`;
                          window.open(eventPhotosUrl, '_blank');
                        } else {
                          window.open(`/gallery?filter=${selectedImage.category}`, '_blank');
                        }
                      }}
                    >
                      View Photos/Videos
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </>
  );
};

export default GalleryPage;
