import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMobile } from "@/hooks/use-mobile";

interface ServiceDetail {
  id: number;
  slug: string;
  title: string;
  banner: string;
  description: string;
  features: { id: number; title: string; description: string }[];
  process: { id: number; title: string; description: string }[];
  gallery: { id: number; imageUrl: string; alt: string }[];
}

const ServicePage = () => {
  const [, params] = useRoute("/services/:serviceType?");
  const serviceType = params?.serviceType || "all";
  const [activeTab, setActiveTab] = useState(serviceType !== "all" ? serviceType : "corporate");

  // Fetch service details
  const { data: services = [], isLoading: loadingAll } = useQuery({
    queryKey: ['/api/services'],
    queryFn: () => fetch('/api/services').then(res => res.json()),
  });

  // Fetch specific service details
  const { data: serviceDetail, isLoading: loadingDetail } = useQuery({
    queryKey: ['/api/services', activeTab],
    queryFn: () => fetch(`/api/services/${activeTab}`).then(res => res.json()),
    enabled: !!activeTab && activeTab !== "all"
  });

  // Fallback service details
  const fallbackServiceDetail: ServiceDetail = {
    id: 1,
    slug: activeTab,
    title: activeTab === "corporate" ? "Corporate Events" : 
           activeTab === "wedding" ? "Wedding Events" : 
           activeTab === "sports" ? "Sports Events" :
           activeTab === "education" ? "School & College Events" :
           activeTab === "cultural" ? "Cultural Events" : "Logistics & Production",
    banner: `https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&h=500&q=80`,
    description: "We deliver exceptional event experiences that align with your goals and exceed expectations. Our team of experts handles everything from initial planning to flawless execution, ensuring your event creates a lasting impression.",
    features: [
      {
        id: 1,
        title: "Expert Planning",
        description: "Our experienced team works closely with you to understand your vision and create a tailored event plan."
      },
      {
        id: 2,
        title: "State-of-the-Art Equipment",
        description: "We utilize the latest audio, video, and lighting technology to create immersive event experiences."
      },
      {
        id: 3,
        title: "Seamless Execution",
        description: "Our on-site management team ensures every aspect of your event runs smoothly from start to finish."
      }
    ],
    process: [
      {
        id: 1,
        title: "Consultation",
        description: "We begin with an in-depth consultation to understand your goals, preferences, and requirements."
      },
      {
        id: 2,
        title: "Proposal & Planning",
        description: "Based on your input, we create a comprehensive event proposal with detailed planning and timelines."
      },
      {
        id: 3,
        title: "Execution",
        description: "Our team handles all aspects of setup, management, and coordination on the event day."
      },
      {
        id: 4,
        title: "Post-Event Analysis",
        description: "We provide a detailed report and analysis to measure the success of your event."
      }
    ],
    gallery: [
      {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        alt: "Corporate event setup"
      },
      {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        alt: "Product launch event"
      },
      {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        alt: "Corporate conference"
      }
    ]
  };

  // Use service detail or fallback
  const displayServiceDetail = serviceDetail || fallbackServiceDetail;

  // Update active tab when route param changes
  useEffect(() => {
    if (serviceType !== "all" && services.some((service: any) => service.slug === serviceType)) {
      setActiveTab(serviceType);
    }
  }, [serviceType, services]);

  // Set page title
  useEffect(() => {
    const pageTitle = serviceType === "all" 
      ? "Our Services - Pan Eventz" 
      : `${displayServiceDetail?.title || "Event Services"} - Pan Eventz`;
    document.title = pageTitle;
  }, [serviceType, displayServiceDetail]);

  const isLoading = loadingAll || loadingDetail;

  return (
    <>
      <Header />

      <main>
        {/* Modern Service Banner with 3D effect and decorative elements */}
        <section 
          className="relative min-h-[70vh] flex items-center bg-center bg-cover overflow-hidden"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${displayServiceDetail?.banner}')`
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full filter blur-[120px]"></div>
              <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full filter blur-[100px]"></div>
            </div>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute bottom-1/3 right-2/3 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 text-center text-white relative z-10 py-20">
            {/* Decorative accent line */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full mx-2"></div>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-montserrat mb-6 tracking-tighter">
              {serviceType === "all" ? (
                <>Our <span className="relative inline-block">
                  <span className="relative z-10">Services</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/30 -z-10 transform skew-x-3 rounded"></span>
                </span>
                </>
              ) : (
                <>
                  <span className="relative inline-block">
                    <span className="relative z-10">{displayServiceDetail?.title}</span>
                    <span className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/30 -z-10 transform skew-x-3 rounded"></span>
                  </span>
                </>
              )}
            </h1>
            
            {serviceType !== "all" && (
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 leading-relaxed">
                {displayServiceDetail?.description?.split('.')[0]}.
              </p>
            )}
            
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Service Tabs with modern design */}
        <section className="py-20 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -right-40 bottom-0 w-80 h-80 bg-primary/5 rounded-full"></div>
          <div className="absolute -left-40 top-0 w-96 h-96 bg-accent/5 rounded-full"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center mb-3">
                <span className="h-[2px] w-8 bg-primary"></span>
                <span className="mx-3 text-primary text-sm font-semibold uppercase tracking-wider">Explore Our Services</span>
                <span className="h-[2px] w-8 bg-primary"></span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
                Tailored Solutions for Every <span className="text-primary">Occasion</span>
              </h2>
            </div>
            
            <Tabs 
              defaultValue={activeTab} 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center mb-8 md:mb-12 overflow-x-auto scrollbar-hide pb-4">
                <TabsList className="bg-white p-1 md:p-2 rounded-full shadow-lg flex-nowrap whitespace-nowrap">
                  {["corporate", "wedding", "sports", "education", "cultural", "logistics"].map((type) => (
                    <TabsTrigger 
                      key={type}
                      value={type} 
                      className="px-3 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 capitalize font-medium"
                    >
                      {type}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center space-y-8">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-neutral-500">Loading service details...</p>
                  </div>
                </div>
              ) : (
                <>
                  {["corporate", "wedding", "sports", "education", "cultural", "logistics"].map((type) => (
                    <TabsContent key={type} value={type} className="animate-in fade-in-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 items-start">
                        <div className="lg:col-span-2">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-1 bg-primary rounded-full mr-3"></div>
                            <h2 className="text-3xl font-bold font-montserrat">
                              {displayServiceDetail?.title}
                            </h2>
                          </div>
                          <p className="text-lg text-neutral-700 leading-relaxed mb-10">
                            {displayServiceDetail?.description}
                          </p>
                          
                          {/* Features with modern cards */}
                          <div className="mb-14">
                            <div className="flex items-center mb-6">
                              <h3 className="text-2xl font-bold font-montserrat">
                                Key Features
                              </h3>
                              <div className="h-px bg-neutral-200 flex-grow ml-4"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {displayServiceDetail && displayServiceDetail.features && displayServiceDetail.features.length > 0 ? (
                                displayServiceDetail.features.map((feature: { id: number; title: string; description: string }) => (
                                  <div 
                                    key={feature.id} 
                                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                                  >
                                    {/* Decorative background */}
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 transition-transform duration-500 group-hover:scale-150"></div>
                                    
                                    <div className="relative z-10">
                                      <h4 className="text-xl font-bold mb-3 flex items-center">
                                        <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary mr-3 flex items-center justify-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </span>
                                        {feature.title}
                                      </h4>
                                      <p className="text-neutral-700 leading-relaxed">{feature.description}</p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                // Default features when none are available
                                [
                                  {
                                    id: 1,
                                    title: "Professional Event Planning",
                                    description: "Our experienced team provides comprehensive event planning, from concept development to flawless execution."
                                  },
                                  {
                                    id: 2,
                                    title: "Premium Production Equipment",
                                    description: "We use top-quality audio, visual, and lighting equipment to create immersive and memorable experiences."
                                  },
                                  {
                                    id: 3,
                                    title: "Creative Design Solutions",
                                    description: "Our designers craft unique event aesthetics that align with your brand and create stunning visual impact."
                                  },
                                  {
                                    id: 4,
                                    title: "On-site Management",
                                    description: "Our dedicated team handles all aspects of event coordination on the day, ensuring everything runs smoothly."
                                  }
                                ].map(feature => (
                                  <div 
                                    key={feature.id} 
                                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                                  >
                                    {/* Decorative background */}
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 transition-transform duration-500 group-hover:scale-150"></div>
                                    
                                    <div className="relative z-10">
                                      <h4 className="text-xl font-bold mb-3 flex items-center">
                                        <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary mr-3 flex items-center justify-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </span>
                                        {feature.title}
                                      </h4>
                                      <p className="text-neutral-700 leading-relaxed">{feature.description}</p>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                          
                          {/* Process with modern timeline */}
                          <div className="mb-14">
                            <div className="flex items-center mb-8">
                              <h3 className="text-2xl font-bold font-montserrat">
                                Our Process
                              </h3>
                              <div className="h-px bg-neutral-200 flex-grow ml-4"></div>
                            </div>
                            
                            <div className="relative">
                              {/* Timeline vertical line */}
                              <div className="absolute left-6 top-0 bottom-0 w-1 bg-neutral-200 hidden md:block"></div>
                              
                              <div className="space-y-10">
                                {displayServiceDetail && displayServiceDetail.process && displayServiceDetail.process.map((step: { id: number; title: string; description: string }, index: number) => (
                                  <div key={step.id} className="relative flex">
                                    {/* Timeline dot */}
                                    <div className="relative z-10 mr-6">
                                      <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg">
                                        {index + 1}
                                      </div>
                                    </div>
                                    
                                    <div className="flex-1 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                      <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                                      <p className="text-neutral-700 leading-relaxed">{step.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* CTA with modern gradient */}
                          <div className="bg-gradient-to-r from-primary/90 to-primary p-10 rounded-2xl shadow-xl text-white relative overflow-hidden mb-12">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"></div>
                            
                            <div className="relative z-10 text-center md:flex items-center justify-between md:text-left">
                              <div className="mb-6 md:mb-0 md:mr-8">
                                <h3 className="text-2xl md:text-3xl font-bold font-montserrat mb-3">
                                  Ready to Create Your Perfect Event?
                                </h3>
                                <p className="text-white/90 text-lg">
                                  Contact us today to discuss how we can bring your vision to life.
                                </p>
                              </div>
                              <Link href="/contact" className="inline-block shrink-0">
                                <Button className="bg-white text-primary hover:bg-white/90 font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all text-lg">
                                  Get a Quote
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        
                        {/* Sidebar Gallery with modern hover effects */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                          <h3 className="text-xl font-bold font-montserrat mb-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            Previous Events
                          </h3>
                          <div className="space-y-6">
                            {displayServiceDetail && displayServiceDetail.gallery && displayServiceDetail.gallery.map((item: { id: number; imageUrl: string; alt: string }) => (
                              <div key={item.id} className="overflow-hidden rounded-xl shadow-md group relative">
                                <img 
                                  src={item.imageUrl}
                                  alt={item.alt}
                                  className="w-full h-52 object-cover transform transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Image overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                  <div className="p-4 text-white">
                                    <p className="font-medium">{item.alt}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8 text-center">
                            <Link href="/gallery">
                              <Button variant="outline" className="border-primary border-2 text-primary hover:bg-primary hover:text-white font-medium transition-colors">
                                View Gallery
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </>
              )}
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServicePage;
