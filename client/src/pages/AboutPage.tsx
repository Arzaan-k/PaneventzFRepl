import { useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Statistics from "@/components/home/Statistics";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}

interface AboutContent {
  mission: string;
  vision: string;
  history: string;
  values: { id: number; title: string; description: string }[];
  team: TeamMember[];
}

const AboutPage = () => {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['/api/about'],
    queryFn: () => fetch('/api/about/full').then(res => res.json()),
  });

  // Fallback about content
  const fallbackAbout: AboutContent = {
    mission: "To create memorable events that exceed client expectations through innovation, creativity, and flawless execution.",
    vision: "To be recognized as the most trusted event management partner nationally, known for delivering exceptional experiences that create lasting impressions.",
    history: "Founded in 2013, Pan Eventz began as a small team passionate about creating exceptional events. Over the years, we've grown into a full-service event management company with a reputation for excellence. Our journey has been defined by a commitment to innovation, quality, and client satisfaction. From humble beginnings coordinating local corporate meetings to now managing large-scale national events, weddings, and cultural festivals, we've maintained our core values while expanding our capabilities and reach. Today, Pan Eventz stands as a leader in the industry, with a team of experienced professionals dedicated to bringing creative visions to life through meticulous planning and flawless execution.",
    values: [
      {
        id: 1,
        title: "Excellence",
        description: "We strive for excellence in every aspect of our work, consistently delivering high-quality services that exceed expectations."
      },
      {
        id: 2,
        title: "Creativity",
        description: "We bring fresh, innovative ideas to every project, creating unique and memorable experiences for our clients."
      },
      {
        id: 3,
        title: "Integrity",
        description: "We operate with honesty, transparency, and ethical conduct in all our business dealings."
      },
      {
        id: 4,
        title: "Collaboration",
        description: "We believe in the power of teamwork, both within our organization and in our partnerships with clients."
      }
    ],
    team: [
      {
        id: 1,
        name: "Imran Mirza",
        position: "Founder & CEO",
        bio: "With over 15 years of experience in event management, Imran leads the company with vision and strategic direction. His passion for creating exceptional experiences drives the company's commitment to excellence.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
      },
      {
        id: 2,
        name: "Priya Sharma",
        position: "Creative Director",
        bio: "Priya brings artistic vision and creative expertise to every event. Her background in design and production enables her to transform concepts into immersive, memorable experiences.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
      },
      {
        id: 3,
        name: "Rajiv Mehta",
        position: "Technical Director",
        bio: "Rajiv oversees all technical aspects of events, from sound and lighting to stage design and special effects. His technical knowledge ensures flawless event execution.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
      },
      {
        id: 4,
        name: "Ananya Patel",
        position: "Client Relations Manager",
        bio: "Ananya excels at understanding client needs and ensuring their vision is realized. Her attention to detail and communication skills make her an invaluable liaison between clients and the production team.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
      }
    ]
  };

  // Use actual about content or fallback
  const content = aboutContent || fallbackAbout;

  // Set page title
  useEffect(() => {
    document.title = "About Us - Pan Eventz";
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* About Banner */}
        <section 
          className="relative py-32 bg-center bg-cover"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80')"
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
              About Pan Eventz
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              We are a premier event management company dedicated to creating extraordinary experiences through innovation, creativity, and flawless execution.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {isLoading ? (
                <>
                  <div className="animate-pulse">
                    <div className="h-8 bg-neutral-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-8 bg-neutral-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-neutral-50 p-8 rounded-lg shadow-sm">
                    <div className="text-primary text-4xl mb-4">
                      <i className="fas fa-bullseye"></i>
                    </div>
                    <h2 className="text-2xl font-bold font-montserrat mb-4">Our Mission</h2>
                    <p className="text-neutral-700 text-lg">{content.mission}</p>
                  </div>
                  
                  <div className="bg-neutral-50 p-8 rounded-lg shadow-sm">
                    <div className="text-primary text-4xl mb-4">
                      <i className="fas fa-eye"></i>
                    </div>
                    <h2 className="text-2xl font-bold font-montserrat mb-4">Our Vision</h2>
                    <p className="text-neutral-700 text-lg">{content.vision}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Our History */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold font-montserrat mb-6 text-center">
                Our <span className="text-primary">Journey</span>
              </h2>
              
              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                  <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                  <div className="h-4 bg-neutral-200 rounded w-4/5"></div>
                </div>
              ) : (
                <div className="text-lg text-neutral-700 leading-relaxed">
                  {content.history.split('. ').map((sentence, index) => (
                    <p key={index} className="mb-4">{sentence}.</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-montserrat mb-12 text-center">
              Our Core <span className="text-primary">Values</span>
            </h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-8 bg-neutral-200 rounded w-1/2 mx-auto mb-4"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-5/6 mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.values.map((value) => (
                  <div key={value.id} className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl mx-auto mb-4">
                      {value.id === 1 && <i className="fas fa-award"></i>}
                      {value.id === 2 && <i className="fas fa-lightbulb"></i>}
                      {value.id === 3 && <i className="fas fa-handshake"></i>}
                      {value.id === 4 && <i className="fas fa-users"></i>}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-neutral-600">{value.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Statistics Section */}
        <Statistics />

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-montserrat mb-12 text-center">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-64 bg-neutral-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-neutral-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-1"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-1"></div>
                    <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.team.map((member) => (
                  <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-4">{member.position}</p>
                      <p className="text-neutral-600 text-sm">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
              Ready to Work with Our Team?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact us today to discuss how we can help make your next event exceptional.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-neutral-100 font-medium px-8 py-3 rounded-full transition-colors">
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
