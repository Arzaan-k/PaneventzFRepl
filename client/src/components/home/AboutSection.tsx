import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface AboutContent {
  description: string;
  mission: string;
  vision: string;
  team: string;
  quality: string;
  images: string[];
}

const AboutSection = () => {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['/api/about'],
    queryFn: () => fetch('/api/about').then(res => res.json()),
  });

  // Fallback about content if API fails or is loading
  const fallbackAbout: AboutContent = {
    description: "Pan Eventz is a premier event management company dedicated to creating extraordinary experiences through innovation, creativity, and flawless execution. With over a decade of industry experience, we specialize in conceptualizing, planning, and executing events of all scales - from intimate gatherings to grand celebrations. Our expert team handles everything from initial concept development to final execution, ensuring every detail is perfect.",
    mission: "To create memorable events that exceed client expectations.",
    vision: "To be the most trusted event management partner nationally.",
    team: "Skilled professionals with diverse expertise.",
    quality: "We never compromise on quality and service.",
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    ]
  };

  // Use actual about content or fallback
  const content = aboutContent || fallbackAbout;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
              About <span className="text-primary">Pan Eventz</span>
            </h2>
            
            {isLoading ? (
              <div className="space-y-6 animate-pulse">
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-4/5"></div>
              </div>
            ) : (
              <>
                <p className="text-lg text-neutral-600 mb-6">
                  {content?.description || "Pan Eventz is a premier event management company dedicated to creating extraordinary experiences."}
                </p>
                <p className="text-lg text-neutral-600 mb-8">
                  {content?.description 
                    ? (content.description.includes('. ') 
                        ? content.description.split('. ').slice(1).join('. ') 
                        : '')
                    : "With over a decade of industry experience, we specialize in conceptualizing, planning, and executing events of all scales - from intimate gatherings to grand celebrations."}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start">
                    <div className="text-primary text-xl mr-3">
                      <i className="fas fa-medal"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-1">Our Mission</h3>
                      <p className="text-neutral-600">{content.mission}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary text-xl mr-3">
                      <i className="fas fa-eye"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-1">Our Vision</h3>
                      <p className="text-neutral-600">{content.vision}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary text-xl mr-3">
                      <i className="fas fa-users"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-1">Expert Team</h3>
                      <p className="text-neutral-600">{content.team}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary text-xl mr-3">
                      <i className="fas fa-clipboard-check"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-1">Quality Commitment</h3>
                      <p className="text-neutral-600">{content.quality}</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full transition-colors">
                    Get In Touch
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {isLoading ? (
              // Image loading placeholders
              <>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg h-64 bg-neutral-200 animate-pulse"></div>
                  <div className="rounded-lg overflow-hidden shadow-lg h-48 bg-neutral-200 animate-pulse"></div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="rounded-lg overflow-hidden shadow-lg h-48 bg-neutral-200 animate-pulse"></div>
                  <div className="rounded-lg overflow-hidden shadow-lg h-64 bg-neutral-200 animate-pulse"></div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg h-64">
                    <img 
                      src={content?.images && content.images.length > 0 ? content.images[0] : "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"} 
                      alt="Event Planning" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg h-48">
                    <img 
                      src={content?.images && content.images.length > 1 ? content.images[1] : "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"} 
                      alt="Corporate Event" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="rounded-lg overflow-hidden shadow-lg h-48">
                    <img 
                      src={content?.images && content.images.length > 2 ? content.images[2] : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"} 
                      alt="Wedding Event" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg h-64">
                    <img 
                      src={content?.images && content.images.length > 3 ? content.images[3] : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"} 
                      alt="Stage Setup" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
