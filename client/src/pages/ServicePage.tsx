import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        {/* Service Banner */}
        <section 
          className="relative py-32 bg-center bg-cover"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${displayServiceDetail?.banner}')`
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
              {serviceType === "all" ? "Our Services" : displayServiceDetail?.title}
            </h1>
            {serviceType !== "all" && (
              <p className="text-lg md:text-xl max-w-3xl mx-auto">
                {displayServiceDetail?.description?.split('.')[0]}.
              </p>
            )}
          </div>
        </section>

        {/* Service Tabs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Tabs 
              defaultValue={activeTab} 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList className="bg-neutral-100 p-1 rounded-full">
                  <TabsTrigger 
                    value="corporate" 
                    className="px-6 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Corporate
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wedding" 
                    className="px-6 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Wedding
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sports" 
                    className="px-6 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Sports
                  </TabsTrigger>
                  <TabsTrigger 
                    value="education" 
                    className="px-6 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Education
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cultural" 
                    className="px-6 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Cultural
                  </TabsTrigger>
                  <TabsTrigger 
                    value="logistics" 
                    className="px-6 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Logistics
                  </TabsTrigger>
                </TabsList>
              </div>

              {isLoading ? (
                <div className="text-center py-12 animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded w-1/3 mx-auto mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3 mx-auto mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3 mx-auto"></div>
                </div>
              ) : (
                <>
                  {["corporate", "wedding", "sports", "education", "cultural", "logistics"].map((type) => (
                    <TabsContent key={type} value={type} className="animate-in fade-in-50">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2">
                          <h2 className="text-3xl font-bold font-montserrat mb-6">
                            {displayServiceDetail?.title}
                          </h2>
                          <p className="text-lg text-neutral-700 mb-8">
                            {displayServiceDetail?.description}
                          </p>
                          
                          {/* Features */}
                          <div className="mb-10">
                            <h3 className="text-xl font-bold font-montserrat mb-5">
                              Key Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {displayServiceDetail?.features.map((feature) => (
                                <div key={feature.id} className="bg-neutral-50 p-6 rounded-lg">
                                  <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                                  <p className="text-neutral-700">{feature.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Process */}
                          <div className="mb-10">
                            <h3 className="text-xl font-bold font-montserrat mb-5">
                              Our Process
                            </h3>
                            <div className="space-y-6">
                              {displayServiceDetail?.process.map((step, index) => (
                                <div key={step.id} className="flex">
                                  <div className="mr-6">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                                      {index + 1}
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                                    <p className="text-neutral-700">{step.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* CTA */}
                          <div className="bg-primary/10 p-8 rounded-lg text-center mb-8">
                            <h3 className="text-2xl font-bold font-montserrat mb-4">
                              Ready to plan your next event?
                            </h3>
                            <p className="text-lg mb-6">
                              Contact us today to discuss how we can bring your vision to life.
                            </p>
                            <Link href="/contact">
                              <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full">
                                Get a Quote
                              </Button>
                            </Link>
                          </div>
                        </div>
                        
                        {/* Sidebar Gallery */}
                        <div>
                          <h3 className="text-xl font-bold font-montserrat mb-5">
                            Previous Events
                          </h3>
                          <div className="space-y-4">
                            {displayServiceDetail?.gallery.map((item) => (
                              <div key={item.id} className="overflow-hidden rounded-lg shadow-md">
                                <img 
                                  src={item.imageUrl}
                                  alt={item.alt}
                                  className="w-full h-48 object-cover"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 text-center">
                            <Link href="/gallery">
                              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                                View More
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
