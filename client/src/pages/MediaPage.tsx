import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, ZoomIn, X, Sparkles, Layers } from "lucide-react";

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
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [mediaFolders, setMediaFolders] = useState<MediaFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cloudinary folder names as provided
  const folderNames = [
    "Topspin Spinnathon",
    "College event",
    "Imran (CEO) with Celebs",
    "LEAP Event 1",
    "LEAP Event 2",
    "Mix",
    "Reliance 40 years anniversary",
    "Reliance Jio Launch",
    "Richa Housing event",
    "Rotary event",
    "Topspin event 1",
    "Topspin event 2",
    "Topspin event 3",
    "Topspin event 4",
    "Topspin event 5",
    "Topspin event 6"
  ];

  // Fetch images from Cloudinary folder via server proxy
  const fetchCloudinaryImages = async (folderName: string): Promise<CloudinaryImage[]> => {
    try {
      const response = await fetch(`/api/cloudinary/${encodeURIComponent(folderName)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch images from ${folderName}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Error fetching images from ${folderName}:`, error);
      return [];
    }
  };

  // Load all folders and their images
  useEffect(() => {
    let isMounted = true;
    const loadAllFolders = async () => {
      setIsLoading(true);
      
      const folders: MediaFolder[] = folderNames.map((folderName) => ({
        name: folderName,
        displayName: folderName,
        images: [],
        isLoading: true
      }));

      if (isMounted) setMediaFolders(folders);
      
      // Load images for each folder concurrently
      const folderPromises = folderNames.map(async (folderName) => {
        const images = await fetchCloudinaryImages(folderName);
        return { folderName, images };
      });

      const results = await Promise.all(folderPromises);
      
      if (isMounted) {
        setMediaFolders(
          folders.map((folder) => {
            const found = results.find((r) => r.folderName === folder.name);
            return {
              ...folder,
              images: found ? found.images : [],
              isLoading: false
            };
          })
        );
        setIsLoading(false);
      }
    };

    loadAllFolders();
    return () => { isMounted = false; };
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

  useEffect(() => {
    document.title = "Visual Archive & Event Gallery | Pan Eventz";
  }, []);

  const filteredImages = getFilteredImages();
  const totalImages = getAllImages().length;

  return (
    <div className="min-h-screen bg-[#090D16] text-white selection:bg-[#E8B923] selection:text-black">
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden border-b border-white/5">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Production Showcase</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 font-montserrat">
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B923] via-amber-200 to-[#E8B923]">Media Gallery</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-6">
              A visual chronicle of stadium concerts, high-profile corporate summits, celebrity engagements, and luxury destination weddings curated by Pan Eventz.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs sm:text-sm text-slate-300">
              <Layers className="w-4 h-4 text-[#E8B923]" />
              <span>{totalImages > 0 ? totalImages : "100+"} Production Captures • {mediaFolders.length} Curated Collections</span>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 bg-[#060910] border-b border-white/5 sticky top-20 z-30 backdrop-blur-md bg-opacity-95">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
              <button
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer border",
                  selectedFolder === "all" 
                    ? "bg-gradient-to-r from-[#E6193C] to-[#b8132e] text-white border-primary shadow-lg shadow-primary/20" 
                    : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-[#E8B923]/40 hover:text-white"
                )}
                onClick={() => setSelectedFolder("all")}
              >
                All Events ({totalImages})
              </button>
              
              {mediaFolders.map((folder) => (
                <button
                  key={folder.name}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer border",
                    selectedFolder === folder.name 
                      ? "bg-[#E8B923] text-black border-[#E8B923] font-bold shadow-lg shadow-[#E8B923]/20" 
                      : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-[#E8B923]/40 hover:text-white"
                  )}
                  onClick={() => setSelectedFolder(folder.name)}
                  disabled={folder.isLoading}
                >
                  {folder.displayName} {folder.images.length > 0 && `(${folder.images.length})`}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Media Gallery Grid */}
        <section className="py-12 md:py-20 bg-[#090D16]">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-20 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#E8B923] border-t-transparent mx-auto"></div>
                <p className="text-sm text-slate-400 font-light">Loading high-resolution media gallery...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5 max-w-lg mx-auto p-8">
                <ImageIcon className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-1">No Captures Found</h3>
                <p className="text-xs text-slate-400">
                  {selectedFolder === "all" 
                    ? "No images currently available in the archive." 
                    : `No images currently indexed under "${selectedFolder}".`}
                </p>
              </div>
            ) : (
              <>
                {/* Active Filter Header */}
                {selectedFolder !== "all" && (
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white font-montserrat">
                        {selectedFolder}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#E8B923] font-light mt-0.5">
                        {filteredImages.length} High-Resolution Photographs
                      </p>
                    </div>
                  </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredImages.map((image, index) => (
                    <div 
                      key={`${image.public_id}-${index}`}
                      className="group cursor-pointer rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#E8B923]/40 transition-all duration-500 relative"
                      onClick={() => openImageModal(image)}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden bg-black/40">
                        <img 
                          src={image.secure_url}
                          alt={`Pan Eventz ${image.folder || 'production'}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#E8B923] text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                            <ZoomIn className="w-5 h-5" />
                          </div>
                        </div>

                        {image.folder && (
                          <div className="absolute bottom-2.5 left-2.5 right-2.5">
                            <span className="inline-block text-[11px] font-semibold text-slate-200 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 truncate max-w-full">
                              {image.folder}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl bg-[#090D16] border border-white/10 p-2 overflow-hidden shadow-2xl rounded-2xl text-white">
          <DialogTitle className="sr-only">
            {selectedImage?.folder || 'Pan Eventz Media'}
          </DialogTitle>
          {selectedImage && (
            <div className="relative flex flex-col items-center">
              <div className="w-full flex items-center justify-between p-3 border-b border-white/10 mb-2">
                <span className="text-xs font-semibold text-[#E8B923] uppercase tracking-wider">
                  {selectedImage.folder || "Pan Eventz Gallery"}
                </span>
                <button
                  onClick={closeImageModal}
                  className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl bg-black">
                <img 
                  src={selectedImage.secure_url}
                  alt={`Pan Eventz ${selectedImage.folder || 'production'}`}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default MediaPage;