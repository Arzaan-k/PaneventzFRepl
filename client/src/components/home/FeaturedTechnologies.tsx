import { useQuery } from "@tanstack/react-query";

interface Technology {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const FeaturedTechnologies = () => {
  // Hardcoded technologies - no API needed
  const technologies: Technology[] = [
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

  // Use hardcoded technologies
  const displayTechnologies = technologies;

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
          {false ? (
            // Loading skeleton
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col items-center animate-pulse">
                <div className="w-16 h-16 mb-4 rounded-full bg-neutral-800"></div>
                <div className="h-5 bg-neutral-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-800 rounded w-full"></div>
              </div>
            ))
          ) : (
            displayTechnologies.map((tech: Technology) => (
              <div key={tech.id} className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-neutral-800 flex items-center justify-center text-primary text-2xl">
                  {tech.id === 1 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                  )}
                  {tech.id === 2 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  )}
                  {tech.id === 3 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  )}
                  {tech.id === 4 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                  )}
                  {tech.id === 5 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                  )}
                  {tech.id === 6 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-1 0a7 7 0 10-14 0 7 7 0 0014 0zm-5.649-2.064a1 1 0 11-1.414 1.414h-2.234l-1.248 1.671-.217.033a1 1 0 01-.103.039L4.618 11H3a1 1 0 110-2h1.382l1.938-.184.066-.009a1 1 0 01.221-.065l1.91-.566a1 1 0 01.935.245l1.899 1.515zm-1.951 2.761a1 1 0 10-1.8.6l1.374 4.122a1 1 0 101.8-.6l-1.374-4.122z" clipRule="evenodd" />
                    </svg>
                  )}
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
