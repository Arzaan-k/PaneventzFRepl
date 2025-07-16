import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CloudinaryImage {
  public_id: string;
  url: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  folder?: string;
}

interface MediaFolder {
  name: string;
  displayName: string;
  images: CloudinaryImage[];
  isLoading: boolean;
}

const MediaPage = () => {
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [mediaFolders, setMediaFolders] = useState<MediaFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cloudinary folder names as provided
  const folderNames = [
    "events",
    "images with celeb",
    "slide banner"
  ];

  // Fetch images from Cloudinary folder via server proxy
  const fetchCloudinaryImages = async (folderName: string): Promise<CloudinaryImage[]> => {
    try {
      const response = await fetch(`/api/cloudinary/${encodeURIComponent(folderName)}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch images from ${folderName}`);
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error(`Error fetching images from ${folderName}:`, error);
      return [];
    }
  };

  // Load all folders and their images
  useEffect(() => {
    const loadAllFolders = async () => {
      setIsLoading(true);
      
      const folders: MediaFolder[] = await Promise.all(
        folderNames.map(async (folderName) => ({
          name: folderName,
          displayName: folderName,
          images: [],
          isLoading: true
        }))
      );

      setMediaFolders(folders);
      
      // Load images for each folder
      for (let i = 0; i < folderNames.length; i++) {
        const folderName = folderNames[i];
        const images = await fetchCloudinaryImages(folderName);
        
        setMediaFolders(prev => prev.map(folder => 
          folder.name === folderName 
            ? { ...folder, images, isLoading: false }
            : folder
        ));
      }
      
      setIsLoading(false);
    };

    loadAllFolders();
  }, []);

  // Get all images for display
  const getAllImages = () => {
    return mediaFolders.flatMap(folder => 
      folder.images.map(img => ({ ...img, folder: folder.displayName }))
    );
  };

  // Filter images based on selected folder
  const getFilteredImages = () => {
    if (selectedFolder === "all") {
      return getAllImages();
    }
    const folder = mediaFolders.find(f => f.name === selectedFolder);
    return folder?.images.map(img => ({ ...img, folder: folder.displayName })) || [];
  };

  const openImageModal = (image: CloudinaryImage & { folder?: string }) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  // Set page title
  useEffect(() => {
    document.title = "Media Gallery - Pan Eventz";
  }, []);

  const filteredImages = getFilteredImages();
  const totalImages = getAllImages().length;

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-6">
              Event <span className="text-primary">Media Gallery</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of event photography from our portfolio of successful events. 
              Each folder showcases the unique moments and professional execution that defines Pan Eventz.
            </p>
            <div className="mt-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                {totalImages} Total Images • {mediaFolders.length} Event Collections
              </Badge>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant={selectedFolder === "all" ? "default" : "secondary"}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedFolder === "all" 
                    ? "bg-primary text-white shadow-lg" 
                    : "bg-neutral-100 text-neutral-700 hover:bg-primary hover:text-white"
                )}
                onClick={() => setSelectedFolder("all")}
              >
                All Events ({totalImages})
              </Button>
              
              {mediaFolders.map((folder) => (
                <Button
                  key={folder.name}
                  variant={selectedFolder === folder.name ? "default" : "secondary"}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedFolder === folder.name 
                      ? "bg-primary text-white shadow-lg" 
                      : "bg-neutral-100 text-neutral-700 hover:bg-primary hover:text-white"
                  )}
                  onClick={() => setSelectedFolder(folder.name)}
                  disabled={folder.isLoading}
                >
                  {folder.displayName} ({folder.images.length})
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Media Gallery */}
        <section className="py-12 md:py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
                <p className="text-lg text-neutral-600">Loading media from Cloudinary...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xl text-neutral-500 font-medium">No images found</p>
                <p className="text-neutral-400 mt-2">
                  {selectedFolder === "all" 
                    ? "No images available in any folder." 
                    : `No images found in the "${selectedFolder}" folder.`}
                </p>
              </div>
            ) : (
              <>
                {/* Selected folder display */}
                {selectedFolder !== "all" && (
                  <div className="mb-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-2">
                      {selectedFolder}
                    </h2>
                    <p className="text-neutral-600">
                      {filteredImages.length} images in this collection
                    </p>
                  </div>
                )}

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {filteredImages.map((image, index) => (
                    <Card 
                      key={`${image.public_id}-${index}`}
                      className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      onClick={() => openImageModal(image)}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={image.secure_url}
                          alt={`Event image from ${image.folder || 'gallery'}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                        {image.folder && (
                          <div className="absolute bottom-2 left-2 right-2">
                            <Badge variant="secondary" className="text-xs truncate bg-white/90 text-neutral-800">
                              {image.folder}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            Image from {selectedImage?.folder || 'Event Gallery'}
          </DialogTitle>
          {selectedImage && (
            <div className="relative">
              <img 
                src={selectedImage.secure_url}
                alt={`Event image from ${selectedImage.folder || 'gallery'}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute top-4 right-4">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/90 hover:bg-white"
                  onClick={closeImageModal}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              {selectedImage.folder && (
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-neutral-800">
                    {selectedImage.folder}
                  </Badge>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default MediaPage;