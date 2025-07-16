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
    description: "Founded by Imran Mirza with 30+ years of experience, Pan Eventz has been a premier event management company for over 20 years, dedicated to creating extraordinary experiences through innovation, creativity, and flawless execution. We specialize in conceptualizing, planning, and executing events of all scales - from intimate gatherings to grand celebrations. Our expert team handles everything from initial concept development to final execution, ensuring every detail is perfect.",
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
    <section id="about" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="flex items-center mb-2 md:mb-6">
              <div className="w-10 h-1 bg-primary rounded-full mr-3"></div>
              <h2 className="text-2xl md:text-4xl font-bold font-montserrat">
                About <span className="text-primary">Pan Eventz</span>
              </h2>
            </div>
            
            {isLoading ? (
              <div className="space-y-4 md:space-y-6 animate-pulse">
                <div className="h-3 md:h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-3 md:h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-3 md:h-4 bg-neutral-200 rounded w-5/6"></div>
                <div className="h-3 md:h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-3 md:h-4 bg-neutral-200 rounded w-4/5"></div>
                <div className="flex flex-wrap mt-8">
                  <div className="w-1/2 pr-4 mb-4">
                    <div className="h-6 bg-neutral-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-neutral-200 rounded w-full"></div>
                  </div>
                  <div className="w-1/2 pr-4 mb-4">
                    <div className="h-6 bg-neutral-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-neutral-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="text-base md:text-lg text-neutral-600 mb-6 md:mb-8 leading-relaxed">
                  {content?.description || "Founded by Imran Mirza with 30+ years of experience, Pan Eventz has been a premier event management company for over 20 years, dedicated to creating extraordinary experiences through innovation, creativity, and flawless execution. We specialize in conceptualizing, planning, and executing events of all scales - from intimate gatherings to grand celebrations. Our expert team handles everything from initial concept development to final execution, ensuring every detail is perfect."}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-primary text-xl mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-1 text-base md:text-lg">Our Mission</h3>
                      <p className="text-neutral-600 text-sm md:text-base">{content.mission}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-primary text-xl mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-1 text-base md:text-lg">Our Vision</h3>
                      <p className="text-neutral-600 text-sm md:text-base">{content.vision}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-primary text-xl mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-1 text-base md:text-lg">Expert Team</h3>
                      <p className="text-neutral-600 text-sm md:text-base">{content.team}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-primary text-xl mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-1 text-base md:text-lg">Quality Commitment</h3>
                      <p className="text-neutral-600 text-sm md:text-base">{content?.quality || "We never compromise on quality and service excellence"}</p>
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
