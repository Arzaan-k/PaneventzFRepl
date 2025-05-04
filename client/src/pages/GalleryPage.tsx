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

  // Filter gallery items based on selected category
  const filteredItems = filter === "all" 
    ? displayGalleryItems 
    : displayGalleryItems.filter(item => item.category === filter);

  // Open image modal
  const openImageModal = (item: GalleryItem) => {
    setSelectedImage(item);
    setIsOpen(true);
  };

  // Set page title
  useEffect(() => {
    document.title = "Event Gallery - Pan Eventz";
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* Gallery Banner */}
        <section 
          className="relative py-32 bg-center bg-cover"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80')"
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
              Our Event Gallery
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Browse through our portfolio of successful events and get inspired for your next celebration.
            </p>
          </div>
        </section>

        {/* Gallery Filters */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant={filter === "all" ? "default" : "secondary"}
                  className={`px-6 py-2 rounded-full ${
                    filter === "all" 
                      ? "bg-primary text-white" 
                      : "bg-neutral-200 text-neutral-800 hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All Events
                </Button>
                <Button
                  variant={filter === "corporate" ? "default" : "secondary"}
                  className={`px-6 py-2 rounded-full ${
                    filter === "corporate" 
                      ? "bg-primary text-white" 
                      : "bg-neutral-200 text-neutral-800 hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setFilter("corporate")}
                >
                  Corporate
                </Button>
                <Button
                  variant={filter === "wedding" ? "default" : "secondary"}
                  className={`px-6 py-2 rounded-full ${
                    filter === "wedding" 
                      ? "bg-primary text-white" 
                      : "bg-neutral-200 text-neutral-800 hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setFilter("wedding")}
                >
                  Wedding
                </Button>
                <Button
                  variant={filter === "cultural" ? "default" : "secondary"}
                  className={`px-6 py-2 rounded-full ${
                    filter === "cultural" 
                      ? "bg-primary text-white" 
                      : "bg-neutral-200 text-neutral-800 hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setFilter("cultural")}
                >
                  Cultural
                </Button>
                <Button
                  variant={filter === "sports" ? "default" : "secondary"}
                  className={`px-6 py-2 rounded-full ${
                    filter === "sports" 
                      ? "bg-primary text-white" 
                      : "bg-neutral-200 text-neutral-800 hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setFilter("sports")}
                >
                  Sports
                </Button>
                <Button
                  variant={filter === "education" ? "default" : "secondary"}
                  className={`px-6 py-2 rounded-full ${
                    filter === "education" 
                      ? "bg-primary text-white" 
                      : "bg-neutral-200 text-neutral-800 hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setFilter("education")}
                >
                  Education
                </Button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading ? (
                // Loading skeleton
                Array(12).fill(0).map((_, index) => (
                  <div key={index} className="overflow-hidden rounded-lg shadow-md animate-pulse">
                    <div className="w-full h-64 bg-neutral-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-neutral-500">No gallery items found for this category.</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="gallery-item overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                    onClick={() => openImageModal(item)}
                  >
                    <div className="block relative group cursor-pointer">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="text-center px-4">
                          <span className="text-white font-medium bg-primary px-4 py-2 rounded-full inline-block mb-2">
                            {item.title}
                          </span>
                          <p className="text-white text-sm">Click to view details</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-neutral-800 truncate">{item.title}</h3>
                      <p className="text-sm text-neutral-600">{item.event || "Pan Eventz Production"}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Image Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl p-0 rounded-lg overflow-hidden">
            {selectedImage && (
              <>
                <div className="relative h-[400px]">
                  <img 
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold font-montserrat">
                      {selectedImage.title}
                    </DialogTitle>
                    <DialogDescription className="text-lg text-neutral-700 mt-2">
                      {selectedImage.description || "Event produced by Pan Eventz."}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    {selectedImage.event && (
                      <div>
                        <span className="font-bold text-neutral-800">Event:</span>
                        <span className="ml-2 text-neutral-600">{selectedImage.event}</span>
                      </div>
                    )}
                    {selectedImage.date && (
                      <div>
                        <span className="font-bold text-neutral-800">Date:</span>
                        <span className="ml-2 text-neutral-600">{selectedImage.date}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-neutral-800">Category:</span>
                      <span className="ml-2 text-neutral-600 capitalize">{selectedImage.category}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </>
  );
};

export default GalleryPage;
