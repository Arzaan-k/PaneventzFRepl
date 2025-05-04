import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

const Gallery = () => {
  const [filter, setFilter] = useState("all");

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
      imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 2,
      title: "Destination Wedding",
      category: "wedding",
      imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 3,
      title: "TED Talk Conference",
      category: "cultural",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 4,
      title: "City Marathon",
      category: "sports",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 5,
      title: "Product Launch",
      category: "corporate",
      imageUrl: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 6,
      title: "Reception Celebration",
      category: "wedding",
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 7,
      title: "Music Festival",
      category: "cultural",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 8,
      title: "College Sports Tournament",
      category: "sports",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  // Use actual gallery items or fallback
  const displayGalleryItems = galleryItems.length > 0 ? galleryItems : fallbackGalleryItems;

  // Filter gallery items based on selected category
  const filteredItems = filter === "all" 
    ? displayGalleryItems 
    : displayGalleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Our Event <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Browse through our portfolio of successful events that showcase our creativity and execution excellence.
          </p>
        </div>
        
        <div className="mb-8">
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
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            // Loading skeleton
            Array(8).fill(0).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md animate-pulse">
                <div className="w-full h-64 bg-neutral-200"></div>
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
                className={`gallery-item overflow-hidden rounded-lg shadow-md ${item.category}`}
                data-category={item.category}
              >
                <Link href={`/gallery/${item.id}`} className="gallery-link block relative group">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-medium bg-primary px-4 py-2 rounded-full">
                      {item.title}
                    </span>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/gallery">
            <Button className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full transition-colors">
              View Full Gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
