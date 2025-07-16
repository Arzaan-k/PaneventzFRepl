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
    history: "Founded in 2013 by Imran Mirza, Pan Eventz began with a vision to create exceptional events that leave lasting impressions. Under Imran's leadership, the company has grown from coordinating local corporate meetings to managing large-scale national events, weddings, and cultural festivals. Imran's commitment to innovation, quality, and client satisfaction has established Pan Eventz as a leader in the industry, maintaining core values while expanding capabilities and reach across India.",
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
        bio: "With over 15 years of experience in event management, Imran Mirza leads Pan Eventz with passion, expertise, and an unwavering commitment to creating extraordinary experiences. His vision and leadership have established Pan Eventz as a premier event management company, trusted by clients across India for delivering exceptional events that exceed expectations.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80"
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
        {/* Modern About Banner with decorative elements */}
        <section 
          className="relative min-h-[60vh] flex items-center bg-center bg-cover overflow-hidden"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80')"
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-full">
              <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px]"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full filter blur-[120px]"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 text-center text-white relative z-10 py-20">
            {/* Decorative line */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
              <div className="w-3 h-3 bg-primary rounded-full mx-3"></div>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6 tracking-tight">
              About <span className="relative inline-block">
                <span className="relative z-10">Pan Eventz</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/40 -z-10 rounded-lg"></span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10 text-white/90">
              We are a premier event management company dedicated to creating extraordinary experiences through innovation, creativity, and flawless execution.
            </p>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Mission & Vision with modern design */}
        <section className="py-24 bg-gradient-to-b from-white to-neutral-50/50 relative">
          {/* Decorative bg patterns */}
          <div className="absolute right-0 top-20 w-80 h-80 bg-neutral-100 rounded-full opacity-70 -z-10"></div>
          <div className="absolute left-0 bottom-20 w-64 h-64 bg-neutral-100 rounded-full opacity-70 -z-10"></div>
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-3">
                <div className="h-[2px] w-10 bg-primary"></div>
                <div className="px-3 text-primary font-medium text-sm uppercase tracking-wider">Our Purpose</div>
                <div className="h-[2px] w-10 bg-primary"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-2">Why We Do What We Do</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">Our foundation is built on clear purpose and direction</p>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
              {isLoading ? (
                <>
                  <div className="animate-pulse">
                    <div className="h-10 bg-neutral-200 rounded-full w-1/3 mb-4"></div>
                    <div className="h-5 bg-neutral-200 rounded w-full mb-3"></div>
                    <div className="h-5 bg-neutral-200 rounded w-full mb-3"></div>
                    <div className="h-5 bg-neutral-200 rounded w-3/4 mb-4"></div>
                    <div className="h-12 bg-neutral-200 rounded-full w-1/3"></div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-10 bg-neutral-200 rounded-full w-1/3 mb-4"></div>
                    <div className="h-5 bg-neutral-200 rounded w-full mb-3"></div>
                    <div className="h-5 bg-neutral-200 rounded w-full mb-3"></div>
                    <div className="h-5 bg-neutral-200 rounded w-3/4 mb-4"></div>
                    <div className="h-12 bg-neutral-200 rounded-full w-1/3"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white p-10 rounded-2xl shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mt-10 -mr-10 transition-transform duration-500 group-hover:scale-125"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -mb-10 -ml-10 transition-transform duration-500 group-hover:scale-125"></div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold font-montserrat mb-4 text-neutral-800">Our <span className="text-primary">Mission</span></h2>
                      <p className="text-neutral-700 text-lg leading-relaxed mb-6">{content.mission}</p>
                      <div className="w-10 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-10 rounded-2xl shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mt-10 -mr-10 transition-transform duration-500 group-hover:scale-125"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -mb-10 -ml-10 transition-transform duration-500 group-hover:scale-125"></div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold font-montserrat mb-4 text-neutral-800">Our <span className="text-primary">Vision</span></h2>
                      <p className="text-neutral-700 text-lg leading-relaxed mb-6">{content.vision}</p>
                      <div className="w-10 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Our History with modern timeline design */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-neutral-50 to-white"></div>
          <div className="absolute -left-20 top-1/2 w-80 h-80 bg-primary/5 rounded-full transform -translate-y-1/2"></div>
          <div className="absolute -right-20 bottom-20 w-96 h-96 bg-accent/5 rounded-full"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <div className="inline-flex items-center mb-3">
                <span className="h-[2px] w-5 bg-primary"></span>
                <span className="mx-2 text-primary text-sm font-semibold uppercase tracking-wider">Since 2013</span>
                <span className="h-[2px] w-5 bg-primary"></span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
                Our <span className="text-primary">Journey</span>
              </h2>
              
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                A decade of creating exceptional events, building relationships, and exceeding expectations
              </p>
            </div>
            
            {isLoading ? (
              <div className="animate-pulse space-y-5 max-w-3xl mx-auto">
                <div className="h-5 bg-neutral-200 rounded w-full"></div>
                <div className="h-5 bg-neutral-200 rounded w-full"></div>
                <div className="h-5 bg-neutral-200 rounded w-full"></div>
                <div className="h-5 bg-neutral-200 rounded w-5/6"></div>
                <div className="h-5 bg-neutral-200 rounded w-full"></div>
                <div className="h-5 bg-neutral-200 rounded w-full"></div>
                <div className="h-5 bg-neutral-200 rounded w-4/5"></div>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline center line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-neutral-200 transform -translate-x-1/2 hidden md:block"></div>
                
                {/* Timeline content */}
                <div className="space-y-12 relative">
                  {content.history?.split('. ').map((sentence: string, index: number) => (
                    <div key={index} className={`relative md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 top-0 w-5 h-5 bg-primary rounded-full transform -translate-x-1/2 hidden md:block"></div>
                      
                      {/* Content */}
                      <div className={`md:w-1/2 bg-white p-8 rounded-xl shadow-lg ${
                        index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'
                      }`}>
                        <p className="text-lg text-neutral-700 leading-relaxed">
                          {sentence}.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Core Values with modern hexagon layout */}
        <section className="py-24 bg-gradient-to-b from-white to-neutral-50 relative">
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-neutral-50 -z-10"></div>
          <div className="absolute -right-40 bottom-40 w-80 h-80 rounded-full bg-primary/5 -z-10"></div>
          <div className="absolute -left-20 top-40 w-60 h-60 rounded-full bg-accent/5 -z-10"></div>
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center mb-3">
                <span className="h-[2px] w-8 bg-primary"></span>
                <span className="mx-3 text-primary text-sm font-semibold uppercase tracking-wider">What Guides Us</span>
                <span className="h-[2px] w-8 bg-primary"></span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
                Our Core <span className="text-primary">Values</span>
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                The principles that drive everything we do and define who we are
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i: number) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 w-20 mx-auto bg-neutral-200 rounded-full mb-4"></div>
                    <div className="h-8 bg-neutral-200 rounded w-1/2 mx-auto mb-4"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-5/6 mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {content && content.values && content.values.map((value: { id: number; title: string; description: string }) => (
                  <div key={value.id} 
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 text-center relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 bg-primary/5 w-32 h-32 rounded-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-125"></div>
                    
                    <div className="relative z-10">
                      {/* Icon for each value with fancy styling */}
                      <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-3">
                        {/* Different icon for each value */}
                        {value.id === 1 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {value.id === 2 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                          </svg>
                        )}
                        {value.id === 3 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                          </svg>
                        )}
                        {value.id === 4 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Value name */}
                      <h3 className="text-xl font-bold mb-3 text-neutral-800">{value.title}</h3>
                      
                      {/* Decorative line */}
                      <div className="h-1 w-10 bg-primary/50 rounded-full mx-auto mb-4"></div>
                      
                      {/* Value description */}
                      <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Statistics Section with background divider */}
        <div className="bg-neutral-50 py-8">
          <Statistics />
        </div>

        {/* Team Section with modern card design */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -left-40 top-0 w-96 h-96 rounded-full bg-neutral-50 -z-10"></div>
          <div className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-neutral-50 -z-10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center mb-3">
                <span className="h-[2px] w-8 bg-primary"></span>
                <span className="mx-3 text-primary text-sm font-semibold uppercase tracking-wider">The Experts</span>
                <span className="h-[2px] w-8 bg-primary"></span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
                Meet Our <span className="text-primary">Founder</span>
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                The visionary leader behind Pan Eventz's success
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i: number) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-80 bg-neutral-200 rounded-2xl mb-4"></div>
                    <div className="h-6 bg-neutral-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-1"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-1"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-x-8 gap-y-12 max-w-md mx-auto">
                {content && content.team && Array.isArray(content.team) && content.team.map((member: TeamMember) => (
                  <div key={member.id} className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                    {/* Image container with overlay effect */}
                    <div className="relative overflow-hidden h-80">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70"></div>
                      
                      {/* Info overlay that slides up on hover */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl text-white font-bold">{member.name}</h3>
                        <p className="text-primary/90 font-medium text-sm mb-3">{member.position}</p>
                        
                        {/* Bio with scroll for longer texts */}
                        <div className="h-0 opacity-0 group-hover:h-24 group-hover:opacity-100 transition-all duration-500 overflow-y-auto pr-2 custom-scrollbar">
                          <p className="text-white/80 text-sm leading-relaxed">{member.bio}</p>
                        </div>
                        
                        {/* Social media icons placeholder (can be updated to real links) */}
                        <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-primary/70 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-primary/70 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-primary/70 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section with modern design */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-10 right-10 w-80 h-80 bg-white/10 rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/20 rounded-full filter blur-[100px]"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center text-white relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-montserrat mb-8 leading-tight">
                Ready to Create Exceptional Events?
              </h2>
              
              <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed">
                Contact us today to discuss how we can help make your next event truly memorable.
              </p>
              
              <Link href="/contact">
                <Button className="bg-white text-primary hover:bg-white/90 font-medium px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all text-lg">
                  Get in Touch
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
