import { useQuery } from "@tanstack/react-query";

interface Technology {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const FeaturedTechnologies = () => {
  const { data: technologies = [], isLoading } = useQuery({
    queryKey: ['/api/technologies'],
    queryFn: () => fetch('/api/technologies').then(res => res.json()),
  });

  // Fallback technologies if API fails or is loading
  const fallbackTechnologies: Technology[] = [
    {
      id: 1,
      icon: "fa-volume-up",
      title: "Pro Audio",
      description: "High-end sound systems for crystal clear audio."
    },
    {
      id: 2,
      icon: "fa-video",
      title: "Video Shooting",
      description: "Professional video capture and production services."
    },
    {
      id: 3,
      icon: "fa-lightbulb",
      title: "Lighting Systems",
      description: "Advanced lighting solutions for perfect ambiance."
    },
    {
      id: 4,
      icon: "fa-tv",
      title: "LED Walls",
      description: "High-resolution LED displays for dynamic visuals."
    },
    {
      id: 5,
      icon: "fa-bahai",
      title: "Laser Shows",
      description: "Spectacular laser displays for stunning effects."
    },
    {
      id: 6,
      icon: "fa-drafting-compass",
      title: "Stage Design",
      description: "Custom stage setups to match your event theme."
    }
  ];

  // Use actual technologies or fallback
  const displayTechnologies = technologies.length > 0 ? technologies : fallbackTechnologies;

  return (
    <section className="py-16 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Cutting-Edge <span className="text-primary">Event Technology</span>
          </h2>
          <p className="text-lg text-neutral-300">
            We utilize the latest audio-visual technology to create immersive and unforgettable event experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {isLoading ? (
            // Loading skeleton
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col items-center animate-pulse">
                <div className="w-16 h-16 mb-4 rounded-full bg-neutral-800"></div>
                <div className="h-5 bg-neutral-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-800 rounded w-full"></div>
              </div>
            ))
          ) : (
            displayTechnologies.map((tech) => (
              <div key={tech.id} className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-neutral-800 flex items-center justify-center text-primary text-2xl">
                  <i className={`fas ${tech.icon}`}></i>
                </div>
                <h3 className="text-lg font-medium mb-2">{tech.title}</h3>
                <p className="text-sm text-neutral-400">{tech.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTechnologies;
