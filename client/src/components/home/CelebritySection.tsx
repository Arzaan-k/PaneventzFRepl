import { useState } from "react";
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Eye, 
  X,
  Star,
  CheckCircle2
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CelebrityImage {
  id: string;
  public_id: string;
  secure_url: string;
  title: string;
  subtitle: string;
  tag: string;
}

const CelebritySection = () => {
  const [selectedImage, setSelectedImage] = useState<CelebrityImage | null>(null);

  const celebrityImages: CelebrityImage[] = [
    {
      id: "1",
      public_id: "11_imp_cover_page_umrvw4",
      secure_url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972657/11_imp_cover_page_umrvw4.jpg",
      title: "Celebrity Gala & Red Carpet",
      subtitle: "CEO Imran Mirza with Bollywood & Industry Dignitaries",
      tag: "Red Carpet Gala"
    },
    {
      id: "2", 
      public_id: "DSC_0634_l5nc6v",
      secure_url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972673/DSC_0634_l5nc6v.jpg",
      title: "Star-Studded Award Night",
      subtitle: "National Entertainment & Media Excellence",
      tag: "Award Ceremony"
    },
    {
      id: "3",
      public_id: "16_pi03mq", 
      secure_url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972656/16_pi03mq.jpg",
      title: "High-Profile Event Management",
      subtitle: "VVIP Dignitaries & Celebrity Hospitality",
      tag: "VVIP Hospitality"
    },
    {
      id: "4",
      public_id: "DSC_0632_lvbvde",
      secure_url: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749972672/DSC_0632_lvbvde.jpg",
      title: "Celebrity Stage Production",
      subtitle: "Live Concert & Artist Coordination",
      tag: "Live Production"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#07090E] relative overflow-hidden border-t border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E8B923]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 text-[#E8B923] border border-[#E8B923]/30 mb-4 shadow-sm">
            <Award className="w-4 h-4 text-[#E8B923]" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Industry Trust & Credibility
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat text-white tracking-tight mb-4">
            Recognised by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7A9] via-[#E8B923] to-[#C5981B]">Celebrities</span> & Icons
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-light">
            From India's top business leaders to beloved cinema and sports celebrities, Pan Eventz has orchestrated landmark moments with flawless VVIP management and turnkey execution.
          </p>
        </div>

        {/* Celebrity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {celebrityImages.map((image) => (
            <div 
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative bg-[#0B0F19] rounded-3xl overflow-hidden shadow-2xl hover:shadow-[#E8B923]/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/10 hover:border-[#E8B923]/50"
            >
              {/* Image with Aspect Ratio */}
              <div className="aspect-[4/5] relative overflow-hidden bg-neutral-950">
                <img
                  src={image.secure_url}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />
                
                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05070B]/80 backdrop-blur-md text-[#E8B923] text-xs font-bold border border-[#E8B923]/30 shadow-md">
                    <Star className="w-3 h-3 fill-[#E8B923] text-[#E8B923]" />
                    <span>{image.tag}</span>
                  </span>
                </div>

                {/* View Lightbox Indicator */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-md border border-white/20">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Content Info */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10 transform transition-transform duration-300">
                  <h3 className="text-lg font-bold font-montserrat tracking-tight mb-1 text-white group-hover:text-[#E8B923] transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light">
                    {image.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-400 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#E8B923] shrink-0" />
            <span>500+ High-Profile Celebrations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#E8B923] shrink-0" />
            <span>Strict VVIP Privacy & Security Protocols</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#E8B923] shrink-0" />
            <span>Turnkey AV & Sound Staging</span>
          </div>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#07090E] border-white/15 text-white shadow-2xl">
          {selectedImage && (
            <div className="relative">
              <div className="max-h-[80vh] flex items-center justify-center bg-black">
                <img 
                  src={selectedImage.secure_url} 
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>
              <div className="p-6 bg-[#0B0F19] border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#E8B923] mb-1">
                    {selectedImage.tag}
                  </div>
                  <h3 className="text-xl font-bold font-montserrat text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-0.5 font-light">
                    {selectedImage.subtitle}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CelebritySection;