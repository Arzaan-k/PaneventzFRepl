import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components
import AdminLayout from "./components/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";

// Icons
import {
  Loader2,
  Home,
  Users,
  FileText,
  Info,
  Award,
  PieChart,
  Edit,
  Plus,
  Trash2,
  CheckCircle2,
  X,
} from "lucide-react";

// Home content form schema
const homeContentSchema = z.object({
  heroTitle: z.string().min(2, "Title must be at least 2 characters"),
  heroTitleHighlight: z.string().optional(),
  heroDescription: z.string().min(10, "Description must be at least 10 characters"),
  heroImage: z.string().min(1, "Hero image URL is required"),
  heroPrimaryCtaText: z.string().min(1, "Primary CTA text is required"),
  heroPrimaryCtaLink: z.string().min(1, "Primary CTA link is required"),
  heroSecondaryCtaText: z.string().min(1, "Secondary CTA text is required"),
  heroSecondaryCtaLink: z.string().min(1, "Secondary CTA link is required"),
});

type HomeContentFormValues = z.infer<typeof homeContentSchema>;

// About content form schema
const aboutContentSchema = z.object({
  mission: z.string().min(10, "Mission must be at least 10 characters"),
  vision: z.string().min(10, "Vision must be at least 10 characters"),
  history: z.string().min(10, "History must be at least 10 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  quality: z.string().min(10, "Quality statement must be at least 10 characters"),
  imageUrl: z.string().min(1, "Image URL is required"),
});

type AboutContentFormValues = z.infer<typeof aboutContentSchema>;

// Team member form schema
const teamMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  image: z.string().min(1, "Image URL is required"),
});

type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

// Statistic form schema
const statisticSchema = z.object({
  label: z.string().min(2, "Label must be at least 2 characters"),
  value: z.coerce.number().positive("Value must be a positive number"),
  suffix: z.string().optional(),
});

type StatisticFormValues = z.infer<typeof statisticSchema>;

// Testimonial form schema
const testimonialSchema = z.object({
  content: z.string().min(10, "Content must be at least 10 characters"),
  authorName: z.string().min(2, "Author name must be at least 2 characters"),
  authorTitle: z.string().min(2, "Author title must be at least 2 characters"),
  authorAvatar: z.string().min(1, "Author avatar URL is required"),
  rating: z.coerce.number().min(1).max(5, "Rating must be between 1 and 5"),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

const ContentManager = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("home");
  const [isClient, setIsClient] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<any>(null);
  const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] = useState(false);
  const [isTeamMemberDeleteDialogOpen, setIsTeamMemberDeleteDialogOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState<any>(null);
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [isStatDeleteDialogOpen, setIsStatDeleteDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<any>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isTestimonialDeleteDialogOpen, setIsTestimonialDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if user is authenticated
  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  // Set page title
  useEffect(() => {
    document.title = "Content Manager - Pan Eventz Admin";
  }, []);

  // Initialize Home Content form
  const homeContentForm = useForm<HomeContentFormValues>({
    resolver: zodResolver(homeContentSchema),
    defaultValues: {
      heroTitle: "",
      heroTitleHighlight: "",
      heroDescription: "",
      heroImage: "",
      heroPrimaryCtaText: "",
      heroPrimaryCtaLink: "",
      heroSecondaryCtaText: "",
      heroSecondaryCtaLink: "",
    },
  });

  // Initialize About Content form
  const aboutContentForm = useForm<AboutContentFormValues>({
    resolver: zodResolver(aboutContentSchema),
    defaultValues: {
      mission: "",
      vision: "",
      history: "",
      description: "",
      quality: "",
      imageUrl: "",
    },
  });

  // Initialize Team Member form
  const teamMemberForm = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      position: "",
      bio: "",
      image: "",
    },
  });

  // Initialize Statistic form
  const statisticForm = useForm<StatisticFormValues>({
    resolver: zodResolver(statisticSchema),
    defaultValues: {
      label: "",
      value: 0,
      suffix: "",
    },
  });

  // Initialize Testimonial form
  const testimonialForm = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      content: "",
      authorName: "",
      authorTitle: "",
      authorAvatar: "",
      rating: 5,
    },
  });

  // Fetch home content
  const { data: homeContent, isLoading: isLoadingHomeContent } = useQuery({
    queryKey: ['/api/slides'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/slides', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching home content:', error);
        return null;
      }
    },
    enabled: isClient && activeTab === "home"
  });

  // Fetch about content
  const { data: aboutContent, isLoading: isLoadingAboutContent } = useQuery({
    queryKey: ['/api/about'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/about', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching about content:', error);
        return null;
      }
    },
    enabled: isClient && activeTab === "about"
  });

  // Fetch team members
  const { data: teamMembers, isLoading: isLoadingTeamMembers } = useQuery({
    queryKey: ['/api/about/team'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/about/team', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching team members:', error);
        return [];
      }
    },
    enabled: isClient && activeTab === "team"
  });

  // Fetch statistics
  const { data: statistics, isLoading: isLoadingStatistics } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching statistics:', error);
        return [];
      }
    },
    enabled: isClient && activeTab === "stats"
  });

  // Fetch testimonials
  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery({
    queryKey: ['/api/testimonials'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/testimonials', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        return [];
      }
    },
    enabled: isClient && activeTab === "testimonials"
  });

  // Set form values when data is loaded
  useEffect(() => {
    if (homeContent && homeContent.length > 0) {
      const mainSlide = homeContent[0];
      homeContentForm.reset({
        heroTitle: mainSlide.title || "",
        heroTitleHighlight: mainSlide.titleHighlight || "",
        heroDescription: mainSlide.description || "",
        heroImage: mainSlide.backgroundImage || "",
        heroPrimaryCtaText: mainSlide.primaryCta?.text || "",
        heroPrimaryCtaLink: mainSlide.primaryCta?.link || "",
        heroSecondaryCtaText: mainSlide.secondaryCta?.text || "",
        heroSecondaryCtaLink: mainSlide.secondaryCta?.link || "",
      });
    }
  }, [homeContent, homeContentForm]);

  // Set about form values when data is loaded
  useEffect(() => {
    if (aboutContent) {
      aboutContentForm.reset({
        mission: aboutContent.mission || "",
        vision: aboutContent.vision || "",
        history: aboutContent.history || "",
        description: aboutContent.description || "",
        quality: aboutContent.quality || "",
        imageUrl: aboutContent.imageUrl || "",
      });
    }
  }, [aboutContent, aboutContentForm]);

  // Update home content mutation
  const updateHomeContentMutation = useMutation({
    mutationFn: async (data: HomeContentFormValues) => {
      if (!homeContent || homeContent.length === 0) return;
      
      const mainSlide = homeContent[0];
      const updatedSlide = {
        title: data.heroTitle,
        titleHighlight: data.heroTitleHighlight,
        description: data.heroDescription,
        backgroundImage: data.heroImage,
        primaryCta: {
          text: data.heroPrimaryCtaText,
          link: data.heroPrimaryCtaLink,
        },
        secondaryCta: {
          text: data.heroSecondaryCtaText,
          link: data.heroSecondaryCtaLink,
        },
      };
      
      return apiRequest("PUT", `/api/slides/${mainSlide.id}`, updatedSlide);
    },
    onSuccess: () => {
      toast({
        title: "Home content updated",
        description: "The home page content has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/slides'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating home content",
        description: error.message || "Failed to update home content",
        variant: "destructive",
      });
    },
  });

  // Update about content mutation
  const updateAboutContentMutation = useMutation({
    mutationFn: async (data: AboutContentFormValues) => {
      return apiRequest("PUT", "/api/about", data);
    },
    onSuccess: () => {
      toast({
        title: "About content updated",
        description: "The about page content has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/about'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating about content",
        description: error.message || "Failed to update about content",
        variant: "destructive",
      });
    },
  });

  // Create team member mutation
  const createTeamMemberMutation = useMutation({
    mutationFn: async (data: TeamMemberFormValues) => {
      return apiRequest("POST", "/api/about/team", data);
    },
    onSuccess: () => {
      toast({
        title: "Team member added",
        description: "The team member has been added successfully",
      });
      setIsTeamMemberModalOpen(false);
      teamMemberForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/about/team'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error adding team member",
        description: error.message || "Failed to add team member",
        variant: "destructive",
      });
    },
  });

  // Update team member mutation
  const updateTeamMemberMutation = useMutation({
    mutationFn: async (data: TeamMemberFormValues) => {
      if (!currentTeamMember) return;
      return apiRequest("PUT", `/api/about/team/${currentTeamMember.id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Team member updated",
        description: "The team member has been updated successfully",
      });
      setIsTeamMemberModalOpen(false);
      setCurrentTeamMember(null);
      queryClient.invalidateQueries({ queryKey: ['/api/about/team'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating team member",
        description: error.message || "Failed to update team member",
        variant: "destructive",
      });
    },
  });

  // Delete team member mutation
  const deleteTeamMemberMutation = useMutation({
    mutationFn: async () => {
      if (!currentTeamMember) return;
      return apiRequest("DELETE", `/api/about/team/${currentTeamMember.id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Team member deleted",
        description: "The team member has been deleted successfully",
      });
      setIsTeamMemberDeleteDialogOpen(false);
      setCurrentTeamMember(null);
      queryClient.invalidateQueries({ queryKey: ['/api/about/team'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting team member",
        description: error.message || "Failed to delete team member",
        variant: "destructive",
      });
    },
  });

  // Create statistic mutation
  const createStatisticMutation = useMutation({
    mutationFn: async (data: StatisticFormValues) => {
      return apiRequest("POST", "/api/stats", data);
    },
    onSuccess: () => {
      toast({
        title: "Statistic added",
        description: "The statistic has been added successfully",
      });
      setIsStatModalOpen(false);
      statisticForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error adding statistic",
        description: error.message || "Failed to add statistic",
        variant: "destructive",
      });
    },
  });

  // Update statistic mutation
  const updateStatisticMutation = useMutation({
    mutationFn: async (data: StatisticFormValues) => {
      if (!currentStat) return;
      return apiRequest("PUT", `/api/stats/${currentStat.id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Statistic updated",
        description: "The statistic has been updated successfully",
      });
      setIsStatModalOpen(false);
      setCurrentStat(null);
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating statistic",
        description: error.message || "Failed to update statistic",
        variant: "destructive",
      });
    },
  });

  // Delete statistic mutation
  const deleteStatisticMutation = useMutation({
    mutationFn: async () => {
      if (!currentStat) return;
      return apiRequest("DELETE", `/api/stats/${currentStat.id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Statistic deleted",
        description: "The statistic has been deleted successfully",
      });
      setIsStatDeleteDialogOpen(false);
      setCurrentStat(null);
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting statistic",
        description: error.message || "Failed to delete statistic",
        variant: "destructive",
      });
    },
  });

  // Create testimonial mutation
  const createTestimonialMutation = useMutation({
    mutationFn: async (data: TestimonialFormValues) => {
      const testimonialData = {
        content: data.content,
        author: {
          name: data.authorName,
          title: data.authorTitle,
          avatar: data.authorAvatar,
        },
        rating: data.rating,
      };
      return apiRequest("POST", "/api/testimonials", testimonialData);
    },
    onSuccess: () => {
      toast({
        title: "Testimonial added",
        description: "The testimonial has been added successfully",
      });
      setIsTestimonialModalOpen(false);
      testimonialForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error adding testimonial",
        description: error.message || "Failed to add testimonial",
        variant: "destructive",
      });
    },
  });

  // Update testimonial mutation
  const updateTestimonialMutation = useMutation({
    mutationFn: async (data: TestimonialFormValues) => {
      if (!currentTestimonial) return;
      const testimonialData = {
        content: data.content,
        author: {
          name: data.authorName,
          title: data.authorTitle,
          avatar: data.authorAvatar,
        },
        rating: data.rating,
      };
      return apiRequest("PUT", `/api/testimonials/${currentTestimonial.id}`, testimonialData);
    },
    onSuccess: () => {
      toast({
        title: "Testimonial updated",
        description: "The testimonial has been updated successfully",
      });
      setIsTestimonialModalOpen(false);
      setCurrentTestimonial(null);
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating testimonial",
        description: error.message || "Failed to update testimonial",
        variant: "destructive",
      });
    },
  });

  // Delete testimonial mutation
  const deleteTestimonialMutation = useMutation({
    mutationFn: async () => {
      if (!currentTestimonial) return;
      return apiRequest("DELETE", `/api/testimonials/${currentTestimonial.id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Testimonial deleted",
        description: "The testimonial has been deleted successfully",
      });
      setIsTestimonialDeleteDialogOpen(false);
      setCurrentTestimonial(null);
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting testimonial",
        description: error.message || "Failed to delete testimonial",
        variant: "destructive",
      });
    },
  });

  // Handle add/edit team member
  const handleTeamMemberAction = (member?: any) => {
    if (member) {
      setCurrentTeamMember(member);
      teamMemberForm.reset({
        name: member.name,
        position: member.position,
        bio: member.bio,
        image: member.image,
      });
    } else {
      setCurrentTeamMember(null);
      teamMemberForm.reset({
        name: "",
        position: "",
        bio: "",
        image: "",
      });
    }
    setIsTeamMemberModalOpen(true);
  };

  // Handle delete team member
  const handleDeleteTeamMember = (member: any) => {
    setCurrentTeamMember(member);
    setIsTeamMemberDeleteDialogOpen(true);
  };

  // Handle add/edit statistic
  const handleStatAction = (stat?: any) => {
    if (stat) {
      setCurrentStat(stat);
      statisticForm.reset({
        label: stat.label,
        value: stat.value,
        suffix: stat.suffix || "",
      });
    } else {
      setCurrentStat(null);
      statisticForm.reset({
        label: "",
        value: 0,
        suffix: "",
      });
    }
    setIsStatModalOpen(true);
  };

  // Handle delete statistic
  const handleDeleteStat = (stat: any) => {
    setCurrentStat(stat);
    setIsStatDeleteDialogOpen(true);
  };

  // Handle add/edit testimonial
  const handleTestimonialAction = (testimonial?: any) => {
    if (testimonial) {
      setCurrentTestimonial(testimonial);
      testimonialForm.reset({
        content: testimonial.content,
        authorName: testimonial.author.name,
        authorTitle: testimonial.author.title,
        authorAvatar: testimonial.author.avatar,
        rating: testimonial.rating,
      });
    } else {
      setCurrentTestimonial(null);
      testimonialForm.reset({
        content: "",
        authorName: "",
        authorTitle: "",
        authorAvatar: "",
        rating: 5,
      });
    }
    setIsTestimonialModalOpen(true);
  };

  // Handle delete testimonial
  const handleDeleteTestimonial = (testimonial: any) => {
    setCurrentTestimonial(testimonial);
    setIsTestimonialDeleteDialogOpen(true);
  };

  // Home content form submission handler
  const onHomeContentSubmit = (data: HomeContentFormValues) => {
    updateHomeContentMutation.mutate(data);
  };

  // About content form submission handler
  const onAboutContentSubmit = (data: AboutContentFormValues) => {
    updateAboutContentMutation.mutate(data);
  };

  // Team member form submission handler
  const onTeamMemberSubmit = (data: TeamMemberFormValues) => {
    if (currentTeamMember) {
      updateTeamMemberMutation.mutate(data);
    } else {
      createTeamMemberMutation.mutate(data);
    }
  };

  // Statistic form submission handler
  const onStatisticSubmit = (data: StatisticFormValues) => {
    if (currentStat) {
      updateStatisticMutation.mutate(data);
    } else {
      createStatisticMutation.mutate(data);
    }
  };

  // Testimonial form submission handler
  const onTestimonialSubmit = (data: TestimonialFormValues) => {
    if (currentTestimonial) {
      updateTestimonialMutation.mutate(data);
    } else {
      createTestimonialMutation.mutate(data);
    }
  };

  // Render star ratings for testimonials
  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-primary" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <AdminLayout currentPage="content">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Content Manager</h1>
            <p className="text-muted-foreground">
              Manage your website content
            </p>
          </div>
        </div>

        <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="home">
              <Home className="h-4 w-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="about">
              <Info className="h-4 w-4 mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="stats">
              <PieChart className="h-4 w-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="testimonials">
              <Award className="h-4 w-4 mr-2" />
              Testimonials
            </TabsTrigger>
          </TabsList>

          {/* Home Content Tab */}
          <TabsContent value="home">
            <Card>
              <CardHeader>
                <CardTitle>Home Page Content</CardTitle>
                <CardDescription>
                  Manage your homepage hero section content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingHomeContent ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <Form {...homeContentForm}>
                    <form onSubmit={homeContentForm.handleSubmit(onHomeContentSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={homeContentForm.control}
                          name="heroTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hero Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Main title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={homeContentForm.control}
                          name="heroTitleHighlight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title Highlight (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Highlighted part of title" {...field} value={field.value || ""} />
                              </FormControl>
                              <FormDescription>
                                This part of the title will be highlighted with a different color
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={homeContentForm.control}
                        name="heroDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hero Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter hero description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={homeContentForm.control}
                        name="heroImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hero Background Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={homeContentForm.control}
                          name="heroPrimaryCtaText"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Button Text</FormLabel>
                              <FormControl>
                                <Input placeholder="Get Started" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={homeContentForm.control}
                          name="heroPrimaryCtaLink"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Button Link</FormLabel>
                              <FormControl>
                                <Input placeholder="/services" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={homeContentForm.control}
                          name="heroSecondaryCtaText"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Secondary Button Text</FormLabel>
                              <FormControl>
                                <Input placeholder="Learn More" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={homeContentForm.control}
                          name="heroSecondaryCtaLink"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Secondary Button Link</FormLabel>
                              <FormControl>
                                <Input placeholder="/about" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="mt-4"
                        disabled={updateHomeContentMutation.isPending}
                      >
                        {updateHomeContentMutation.isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Content Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Page Content</CardTitle>
                <CardDescription>
                  Manage your about page content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingAboutContent ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <Form {...aboutContentForm}>
                    <form onSubmit={aboutContentForm.handleSubmit(onAboutContentSubmit)} className="space-y-4">
                      <FormField
                        control={aboutContentForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="About us main description" 
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={aboutContentForm.control}
                          name="mission"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mission Statement</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Our mission is..." 
                                  className="min-h-32"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={aboutContentForm.control}
                          name="vision"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Vision Statement</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Our vision is..." 
                                  className="min-h-32"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={aboutContentForm.control}
                        name="history"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company History</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Our company history..." 
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={aboutContentForm.control}
                        name="quality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quality Statement</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Our commitment to quality..." 
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={aboutContentForm.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>About Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="mt-4"
                        disabled={updateAboutContentMutation.isPending}
                      >
                        {updateAboutContentMutation.isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Members Tab */}
          <TabsContent value="team">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage your team members information
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => handleTeamMemberAction()}
                  className="mt-4 sm:mt-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingTeamMembers ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : teamMembers && teamMembers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamMembers.map((member: any) => (
                      <Card key={member.id} className="overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Button
                              variant="secondary"
                              size="icon"
                              className="h-8 w-8 bg-white/90 hover:bg-white"
                              onClick={() => handleTeamMemberAction(member)}
                            >
                              <Edit className="h-4 w-4 text-neutral-700" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="h-8 w-8 bg-white/90 hover:bg-white"
                              onClick={() => handleDeleteTeamMember(member)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg">{member.name}</h3>
                          <p className="text-primary font-semibold">{member.position}</p>
                          <p className="text-muted-foreground mt-2 text-sm line-clamp-3">
                            {member.bio}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No team members found. Add your first team member.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <CardTitle>Statistics</CardTitle>
                  <CardDescription>
                    Manage your achievement statistics
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => handleStatAction()}
                  className="mt-4 sm:mt-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Statistic
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingStatistics ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : statistics && statistics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statistics.map((stat: any) => (
                      <Card key={stat.id} className="overflow-hidden">
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl font-bold text-primary">
                            {stat.value}{stat.suffix}
                          </div>
                          <div className="text-lg mt-2">{stat.label}</div>
                          <div className="flex justify-center mt-4 space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatAction(stat)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                              onClick={() => handleDeleteStat(stat)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No statistics found. Add your first statistic.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <CardTitle>Testimonials</CardTitle>
                  <CardDescription>
                    Manage client testimonials
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => handleTestimonialAction()}
                  className="mt-4 sm:mt-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Testimonial
                </Button>
              </CardHeader>
              <CardContent>
                {isLoadingTestimonials ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : testimonials && testimonials.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((testimonial: any) => (
                      <Card key={testimonial.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          {renderStarRating(testimonial.rating)}
                          <p className="mt-4 italic">"{testimonial.content}"</p>
                          <div className="mt-4 flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img 
                                src={testimonial.author.avatar} 
                                alt={testimonial.author.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-semibold">{testimonial.author.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.author.title}</p>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4 space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTestimonialAction(testimonial)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                              onClick={() => handleDeleteTestimonial(testimonial)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No testimonials found. Add your first testimonial.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Team Member Modal */}
      <Dialog open={isTeamMemberModalOpen} onOpenChange={setIsTeamMemberModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentTeamMember ? "Edit Team Member" : "Add New Team Member"}
            </DialogTitle>
            <DialogDescription>
              {currentTeamMember 
                ? "Update the team member information" 
                : "Fill in the details to add a new team member"}
            </DialogDescription>
          </DialogHeader>
          <Form {...teamMemberForm}>
            <form onSubmit={teamMemberForm.handleSubmit(onTeamMemberSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={teamMemberForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Member name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={teamMemberForm.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={teamMemberForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Member biography" 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={teamMemberForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsTeamMemberModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createTeamMemberMutation.isPending || updateTeamMemberMutation.isPending}
                >
                  {(createTeamMemberMutation.isPending || updateTeamMemberMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {currentTeamMember ? "Update" : "Add"} Team Member
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Team Member Confirmation Dialog */}
      <Dialog open={isTeamMemberDeleteDialogOpen} onOpenChange={setIsTeamMemberDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentTeamMember?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsTeamMemberDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              variant="destructive"
              onClick={() => deleteTeamMemberMutation.mutate()}
              disabled={deleteTeamMemberMutation.isPending}
            >
              {deleteTeamMemberMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Statistic Modal */}
      <Dialog open={isStatModalOpen} onOpenChange={setIsStatModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {currentStat ? "Edit Statistic" : "Add New Statistic"}
            </DialogTitle>
            <DialogDescription>
              {currentStat 
                ? "Update the statistic information" 
                : "Fill in the details to add a new statistic"}
            </DialogDescription>
          </DialogHeader>
          <Form {...statisticForm}>
            <form onSubmit={statisticForm.handleSubmit(onStatisticSubmit)} className="space-y-4">
              <FormField
                control={statisticForm.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Statistic label" {...field} />
                    </FormControl>
                    <FormDescription>
                      E.g., "Events Completed", "Happy Clients", etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={statisticForm.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="100" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={statisticForm.control}
                  name="suffix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suffix (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>
                        E.g., "+", "%", "k", etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsStatModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createStatisticMutation.isPending || updateStatisticMutation.isPending}
                >
                  {(createStatisticMutation.isPending || updateStatisticMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {currentStat ? "Update" : "Add"} Statistic
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Statistic Confirmation Dialog */}
      <Dialog open={isStatDeleteDialogOpen} onOpenChange={setIsStatDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the "{currentStat?.label}" statistic? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsStatDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              variant="destructive"
              onClick={() => deleteStatisticMutation.mutate()}
              disabled={deleteStatisticMutation.isPending}
            >
              {deleteStatisticMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Testimonial Modal */}
      <Dialog open={isTestimonialModalOpen} onOpenChange={setIsTestimonialModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {currentTestimonial 
                ? "Update the testimonial information" 
                : "Fill in the details to add a new testimonial"}
            </DialogDescription>
          </DialogHeader>
          <Form {...testimonialForm}>
            <form onSubmit={testimonialForm.handleSubmit(onTestimonialSubmit)} className="space-y-4">
              <FormField
                control={testimonialForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonial Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Customer testimonial..." 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={testimonialForm.control}
                  name="authorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={testimonialForm.control}
                  name="authorTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Title</FormLabel>
                      <FormControl>
                        <Input placeholder="CEO, Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={testimonialForm.control}
                  name="authorAvatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Avatar URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/avatar.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={testimonialForm.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (1-5)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="1"
                          max="5"
                          placeholder="5" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsTestimonialModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createTestimonialMutation.isPending || updateTestimonialMutation.isPending}
                >
                  {(createTestimonialMutation.isPending || updateTestimonialMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {currentTestimonial ? "Update" : "Add"} Testimonial
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Testimonial Confirmation Dialog */}
      <Dialog open={isTestimonialDeleteDialogOpen} onOpenChange={setIsTestimonialDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsTestimonialDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              variant="destructive"
              onClick={() => deleteTestimonialMutation.mutate()}
              disabled={deleteTestimonialMutation.isPending}
            >
              {deleteTestimonialMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ContentManager;