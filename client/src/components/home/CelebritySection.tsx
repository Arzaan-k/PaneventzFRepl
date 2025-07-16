import { useState, useEffect } from "react";

interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  folder?: string;
}

const CelebritySection = () => {
  const [celebrityImages, setCelebrityImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch images from "Imran (CEO) with Celebs" folder
  useEffect(() => {
    const fetchCelebrityImages = async () => {
      try {
        const response = await fetch(`/api/cloudinary/${encodeURIComponent("Imran (CEO) with Celebs")}`);
        if (response.ok) {
          const images = await response.json();
          setCelebrityImages(images.slice(0, 4)); // Show first 4 images
        }
      } catch (error) {
        console.error('Error fetching celebrity images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCelebrityImages();
  }, []);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="h-[2px] w-8 bg-primary"></span>
            <span className="mx-3 text-primary text-sm font-semibold uppercase tracking-wider">Celebrity Recognition</span>
            <span className="h-[2px] w-8 bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-4">
            Recognised by <span className="text-primary">Celebrities</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Our exceptional event management services have been trusted by renowned personalities and celebrities across various industries.
          </p>
        </div>

        {/* Celebrity Images Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {celebrityImages.length > 0 ? (
              celebrityImages.map((image, index) => (
                <div 
                  key={image.asset_id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Image container with aspect ratio */}
                  <div className="aspect-square relative">
                    <img
                      src={image.secure_url}
                      alt={`Celebrity event ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-sm md:text-base mb-1">Celebrity Event {index + 1}</h3>
                      <p className="text-xs md:text-sm text-white/90">Imran with Celebrities</p>
                    </div>

                    {/* Decorative border */}
                    <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-colors duration-300"></div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ⭐ Featured
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-neutral-500">No celebrity images available at the moment.</p>
              </div>
            )}
          </div>
        )}

        {/* Bottom text */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex items-center justify-center bg-white px-8 py-4 rounded-full shadow-lg">
            <div className="flex items-center space-x-2 text-neutral-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">Trusted by industry leaders and celebrities nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebritySection;