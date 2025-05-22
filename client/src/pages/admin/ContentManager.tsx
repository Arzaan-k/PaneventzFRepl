import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/admin/FileUploader";
import { useToast } from "@/hooks/use-toast";

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const { toast } = useToast();
  
  // State for hero section content
  const [heroContent, setHeroContent] = useState({
    slides: [
      { id: 1, title: "", titleHighlight: "", description: "", backgroundImage: "", primaryCta: { text: "", link: "" } }
    ]
  });
  
  // State for about section
  const [aboutContent, setAboutContent] = useState({
    description: "",
    mission: "",
    vision: "",
    team: "",
    quality: "",
    images: ["", "", "", ""]
  });
  
  // State for technology section
  const [technologies, setTechnologies] = useState([
    { id: 1, title: "", description: "", icon: "" }
  ]);
  
  // State for editing specific content
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch Hero Slides
  const { data: slidesData, isLoading: loadingSlides, refetch: refetchSlides } = useQuery({
    queryKey: ['/api/slides'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('Authentication required');
        }
        
        const res = await fetch('/api/slides', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch slides data');
        }
        
        return res.json();
      } catch (error) {
        console.error('Error fetching slides:', error);
        return [];
      }
    }
  });
  
  // Fetch About Content
  const { data: aboutData, isLoading: loadingAbout, refetch: refetchAbout } = useQuery({
    queryKey: ['/api/about'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('Authentication required');
        }
        
        const res = await fetch('/api/about', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch about data');
        }
        
        return res.json();
      } catch (error) {
        console.error('Error fetching about content:', error);
        return null;
      }
    }
  });
  
  // Fetch Technologies
  const { data: techData, isLoading: loadingTech, refetch: refetchTech } = useQuery({
    queryKey: ['/api/technologies'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('Authentication required');
        }
        
        const res = await fetch('/api/technologies', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch technologies data');
        }
        
        return res.json();
      } catch (error) {
        console.error('Error fetching technologies:', error);
        return [];
      }
    }
  });
  
  // Initialize content when data is loaded
  useState(() => {
    if (slidesData) {
      setHeroContent({ slides: slidesData });
    }
    
    if (aboutData) {
      setAboutContent(aboutData);
    }
    
    if (techData) {
      setTechnologies(techData);
    }
  });
  
  // Handler for slide image upload
  const handleSlideImageUpload = (slideIndex: number, filePath: string) => {
    const updatedSlides = [...heroContent.slides];
    updatedSlides[slideIndex] = {
      ...updatedSlides[slideIndex],
      backgroundImage: filePath
    };
    setHeroContent({ ...heroContent, slides: updatedSlides });
  };
  
  // Handler for about image upload
  const handleAboutImageUpload = (imageIndex: number, filePath: string) => {
    const updatedImages = [...aboutContent.images];
    updatedImages[imageIndex] = filePath;
    setAboutContent({ ...aboutContent, images: updatedImages });
  };
  
  // Handler for technology icon upload
  const handleTechIconUpload = (techIndex: number, filePath: string) => {
    const updatedTech = [...technologies];
    updatedTech[techIndex] = {
      ...updatedTech[techIndex],
      icon: filePath
    };
    setTechnologies(updatedTech);
  };
  
  // Save hero slides content
  const saveHeroContent = async () => {
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('/api/slides/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(heroContent.slides)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update hero content');
      }
      
      toast({
        title: "Content Updated",
        description: "Hero slides have been successfully updated",
      });
      
      refetchSlides();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update hero content",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Save about content
  const saveAboutContent = async () => {
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('/api/about/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(aboutContent)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update about content');
      }
      
      toast({
        title: "Content Updated",
        description: "About section has been successfully updated",
      });
      
      refetchAbout();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update about content",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Save technologies content
  const saveTechnologiesContent = async () => {
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('/api/technologies/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(technologies)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update technologies');
      }
      
      toast({
        title: "Content Updated",
        description: "Technologies section has been successfully updated",
      });
      
      refetchTech();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update technologies content",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Add new slide
  const addNewSlide = () => {
    const newSlide = {
      id: heroContent.slides.length + 1,
      title: "New Slide",
      titleHighlight: "",
      description: "Add a description here",
      backgroundImage: "",
      primaryCta: { text: "Learn More", link: "/services" }
    };
    
    setHeroContent({
      ...heroContent,
      slides: [...heroContent.slides, newSlide]
    });
  };
  
  // Add new technology
  const addNewTechnology = () => {
    const newTech = {
      id: technologies.length + 1,
      title: "New Technology",
      description: "Technology description",
      icon: ""
    };
    
    setTechnologies([...technologies, newTech]);
  };
  
  // Handle slide field change
  const handleSlideChange = (slideIndex: number, field: string, value: string) => {
    const updatedSlides = [...heroContent.slides];
    
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        [parentField]: {
          ...updatedSlides[slideIndex][parentField as keyof typeof updatedSlides[typeof slideIndex]],
          [childField]: value
        }
      };
    } else {
      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        [field]: value
      };
    }
    
    setHeroContent({ ...heroContent, slides: updatedSlides });
  };
  
  // Handle about field change
  const handleAboutChange = (field: string, value: string) => {
    setAboutContent({
      ...aboutContent,
      [field]: value
    });
  };
  
  // Handle technology field change
  const handleTechChange = (techIndex: number, field: string, value: string) => {
    const updatedTech = [...technologies];
    updatedTech[techIndex] = {
      ...updatedTech[techIndex],
      [field]: value
    };
    setTechnologies(updatedTech);
  };
  
  return (
    <AdminLayout title="Content Manager">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Website Content Manager</h1>
        <p className="text-muted-foreground">Edit and update the website content sections</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="hero" className="flex-1">Hero Slider</TabsTrigger>
          <TabsTrigger value="about" className="flex-1">About Section</TabsTrigger>
          <TabsTrigger value="technologies" className="flex-1">Technologies</TabsTrigger>
        </TabsList>
        
        {/* Hero Slider Tab */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Slides</CardTitle>
              <CardDescription>
                Edit your homepage hero slider content and images
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {loadingSlides ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                      <div className="h-8 bg-neutral-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {(heroContent.slides || []).map((slide, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">Slide {index + 1}</h3>
                        {(heroContent.slides || []).length > 1 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {
                              const updatedSlides = (heroContent.slides || []).filter((_, i) => i !== index);
                              setHeroContent({ ...heroContent, slides: updatedSlides });
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`slide-${index}-title`}>Title</Label>
                            <Input 
                              id={`slide-${index}-title`}
                              value={slide.title || ''}
                              onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                              placeholder="Slide title"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`slide-${index}-highlight`}>Title Highlight (optional)</Label>
                            <Input 
                              id={`slide-${index}-highlight`}
                              value={slide.titleHighlight || ''}
                              onChange={(e) => handleSlideChange(index, 'titleHighlight', e.target.value)}
                              placeholder="Highlighted text in title"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`slide-${index}-description`}>Description</Label>
                            <Textarea 
                              id={`slide-${index}-description`}
                              value={slide.description || ''}
                              onChange={(e) => handleSlideChange(index, 'description', e.target.value)}
                              placeholder="Slide description"
                              rows={3}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`slide-${index}-cta-text`}>Button Text</Label>
                              <Input 
                                id={`slide-${index}-cta-text`}
                                value={slide.primaryCta?.text || ''}
                                onChange={(e) => handleSlideChange(index, 'primaryCta.text', e.target.value)}
                                placeholder="Button text"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`slide-${index}-cta-link`}>Button Link</Label>
                              <Input 
                                id={`slide-${index}-cta-link`}
                                value={slide.primaryCta?.link || ''}
                                onChange={(e) => handleSlideChange(index, 'primaryCta.link', e.target.value)}
                                placeholder="/services"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="block mb-2">Background Image</Label>
                          <FileUploader 
                            onFileUpload={(filePath) => handleSlideImageUpload(index, filePath)}
                            accept="image/*"
                            maxSize={2}
                          />
                          {slide.backgroundImage && (
                            <div className="mt-4">
                              <p className="text-sm text-muted-foreground mb-2">Current image:</p>
                              <img 
                                src={slide.backgroundImage} 
                                alt={`Slide ${index + 1}`} 
                                className="w-full h-40 object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline"
                      onClick={addNewSlide}
                    >
                      Add New Slide
                    </Button>
                    
                    <Button 
                      onClick={saveHeroContent}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* About Section Tab */}
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About Pan Eventz</CardTitle>
              <CardDescription>
                Edit the about section content and images
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingAbout ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                      <div className="h-8 bg-neutral-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    <div>
                      <Label htmlFor="about-description">Company Description</Label>
                      <Textarea 
                        id="about-description"
                        value={aboutContent.description || ''}
                        onChange={(e) => handleAboutChange('description', e.target.value)}
                        placeholder="Company description"
                        rows={6}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="about-mission">Mission</Label>
                        <Input 
                          id="about-mission"
                          value={aboutContent.mission || ''}
                          onChange={(e) => handleAboutChange('mission', e.target.value)}
                          placeholder="Our mission statement"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="about-vision">Vision</Label>
                        <Input 
                          id="about-vision"
                          value={aboutContent.vision || ''}
                          onChange={(e) => handleAboutChange('vision', e.target.value)}
                          placeholder="Our vision statement"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="about-team">Team</Label>
                        <Input 
                          id="about-team"
                          value={aboutContent.team || ''}
                          onChange={(e) => handleAboutChange('team', e.target.value)}
                          placeholder="Team description"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="about-quality">Quality Commitment</Label>
                        <Input 
                          id="about-quality"
                          value={aboutContent.quality || ''}
                          onChange={(e) => handleAboutChange('quality', e.target.value)}
                          placeholder="Quality statement"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label className="block mb-4">About Section Images</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {aboutContent.images.map((image, index) => (
                        <div key={index} className="space-y-2">
                          <p className="text-sm font-medium">Image {index + 1}</p>
                          <FileUploader 
                            onFileUpload={(filePath) => handleAboutImageUpload(index, filePath)}
                            accept="image/*"
                            maxSize={2}
                          />
                          {image && (
                            <div className="mt-2">
                              <img 
                                src={image} 
                                alt={`About ${index + 1}`} 
                                className="w-full h-32 object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <Button 
                      onClick={saveAboutContent}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Technologies Tab */}
        <TabsContent value="technologies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Featured Technologies</CardTitle>
              <CardDescription>
                Edit technology features displayed on the homepage
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingTech ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                      <div className="h-8 bg-neutral-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {technologies.map((tech, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-4">
                      <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-semibold">Technology {index + 1}</h3>
                        {technologies.length > 1 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {
                              const updatedTech = technologies.filter((_, i) => i !== index);
                              setTechnologies(updatedTech);
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`tech-${index}-title`}>Title</Label>
                            <Input 
                              id={`tech-${index}-title`}
                              value={tech.title || ''}
                              onChange={(e) => handleTechChange(index, 'title', e.target.value)}
                              placeholder="Technology title"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`tech-${index}-description`}>Description</Label>
                            <Textarea 
                              id={`tech-${index}-description`}
                              value={tech.description || ''}
                              onChange={(e) => handleTechChange(index, 'description', e.target.value)}
                              placeholder="Technology description"
                              rows={3}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label className="block mb-2">Icon Image</Label>
                          <FileUploader 
                            onFileUpload={(filePath) => handleTechIconUpload(index, filePath)}
                            accept="image/*"
                            maxSize={1}
                          />
                          {tech.icon && (
                            <div className="mt-4">
                              <p className="text-sm text-muted-foreground mb-2">Current icon:</p>
                              <div className="bg-neutral-100 p-4 inline-block rounded-lg">
                                <img 
                                  src={tech.icon} 
                                  alt={tech.title} 
                                  className="w-24 h-24 object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline"
                      onClick={addNewTechnology}
                    >
                      Add New Technology
                    </Button>
                    
                    <Button 
                      onClick={saveTechnologiesContent}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default ContentManager;