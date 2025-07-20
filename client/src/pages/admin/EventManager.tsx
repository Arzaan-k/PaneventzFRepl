import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/pages/admin/components/DatePicker";
import { apiRequest } from "@/lib/queryClient";

// Icons
import {
  Calendar as CalendarIcon,
  Clock,
  Edit,
  FileText,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

// Event form schema
const eventFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.date({
    required_error: "Event date is required",
  }),
  time: z.string().min(1, "Event time is required"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  capacity: z.coerce.number().positive("Capacity must be a positive number"),
  imageUrl: z.string().min(1, "Image URL is required"),
  status: z.enum(["upcoming", "past", "canceled"]),
  clientName: z.string().optional(),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional(),
  notes: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

// Event inquiry form schema
const inquiryResponseSchema = z.object({
  status: z.enum(["new", "in_progress", "responded", "booked", "closed"]),
  notes: z.string().optional(),
});

type InquiryResponseValues = z.infer<typeof inquiryResponseSchema>;

const EventManager = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [inquiryDetailOpen, setInquiryDetailOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Determine the current view (events or inquiries)
  const [currentView, setCurrentView] = useState<"events" | "inquiries">("events");

  // Check if user is authenticated
  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  // Parse URL parameters
  useEffect(() => {
    const url = window.location.href;
    const params = new URLSearchParams(url.split("?")[1]);
    if (params.get("view") === "inquiries") {
      setCurrentView("inquiries");
    } else {
      setCurrentView("events");
    }
  }, []);

  // Set page title
  useEffect(() => {
    document.title = "Event Manager - Pan Eventz Admin";
  }, []);

  // Fetch events
  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['/api/events', activeTab],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/events?status=${activeTab}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    },
    enabled: isClient && currentView === "events"
  });

  // Fetch inquiries
  const { data: inquiries, isLoading: isLoadingInquiries } = useQuery({
    queryKey: ['/api/contact-submissions'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/contact-submissions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        return [];
      }
    },
    enabled: isClient && currentView === "inquiries"
  });

  // Initialize event form
  const eventForm = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      date: new Date(),
      time: "18:00",
      location: "",
      capacity: 100,
      imageUrl: "",
      status: "upcoming",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      notes: "",
    },
  });

  // Initialize inquiry response form
  const inquiryForm = useForm<InquiryResponseValues>({
    resolver: zodResolver(inquiryResponseSchema),
    defaultValues: {
      status: "new",
      notes: "",
    },
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (data: EventFormValues) => {
      return apiRequest("POST", "/api/events", data);
    },
    onSuccess: () => {
      toast({
        title: "Event created",
        description: "The event has been created successfully",
      });
      setIsCreateModalOpen(false);
      eventForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error creating event",
        description: error.message || "Failed to create event",
        variant: "destructive",
      });
    },
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async (data: EventFormValues) => {
      if (!currentEvent) return;
      return apiRequest("PUT", `/api/events/${currentEvent.id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Event updated",
        description: "The event has been updated successfully",
      });
      setIsEditModalOpen(false);
      setCurrentEvent(null);
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating event",
        description: error.message || "Failed to update event",
        variant: "destructive",
      });
    },
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async () => {
      if (!currentEvent) return;
      return apiRequest("DELETE", `/api/events/${currentEvent.id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Event deleted",
        description: "The event has been deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setCurrentEvent(null);
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting event",
        description: error.message || "Failed to delete event",
        variant: "destructive",
      });
    },
  });

  // Update inquiry mutation
  const updateInquiryMutation = useMutation({
    mutationFn: async (data: InquiryResponseValues) => {
      if (!selectedInquiry) return;
      return apiRequest("PUT", `/api/contact-submissions/${selectedInquiry.id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Inquiry updated",
        description: "The inquiry has been updated successfully",
      });
      setInquiryDetailOpen(false);
      setSelectedInquiry(null);
      queryClient.invalidateQueries({ queryKey: ['/api/contact-submissions'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating inquiry",
        description: error.message || "Failed to update inquiry",
        variant: "destructive",
      });
    },
  });

  // Handle edit event
  const handleEditEvent = (event: any) => {
    setCurrentEvent(event);
    eventForm.reset({
      title: event.title,
      slug: event.slug,
      description: event.description,
      date: new Date(event.date),
      time: event.time,
      location: event.location,
      capacity: event.capacity,
      imageUrl: event.imageUrl,
      status: event.status,
      clientName: event.clientName || "",
      clientEmail: event.clientEmail || "",
      clientPhone: event.clientPhone || "",
      notes: event.notes || "",
    });
    setIsEditModalOpen(true);
  };

  // Handle delete event
  const handleDeleteEvent = (event: any) => {
    setCurrentEvent(event);
    setIsDeleteDialogOpen(true);
  };

  // Handle view inquiry
  const handleViewInquiry = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    inquiryForm.reset({
      status: inquiry.status,
      notes: inquiry.notes || "",
    });
    setInquiryDetailOpen(true);
  };

  // Filter events based on search query
  const filteredEvents = events?.filter((event: any) => {
    return (
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.clientName && event.clientName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Filter inquiries based on search query
  const filteredInquiries = inquiries?.filter((inquiry: any) => {
    return (
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Generate status badge for events
  const getEventStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>;
      case "past":
        return <Badge variant="outline" className="bg-neutral-50 text-neutral-700 border-neutral-200">Past</Badge>;
      case "canceled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Generate status badge for inquiries
  const getInquiryStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">New</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>;
      case "responded":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Responded</Badge>;
      case "booked":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Booked</Badge>;
      case "closed":
        return <Badge variant="outline" className="bg-neutral-50 text-neutral-700 border-neutral-200">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Create event form submission handler
  const onCreateEventSubmit = (data: EventFormValues) => {
    createEventMutation.mutate(data);
  };

  // Update event form submission handler
  const onUpdateEventSubmit = (data: EventFormValues) => {
    updateEventMutation.mutate(data);
  };

  // Update inquiry form submission handler
  const onUpdateInquirySubmit = (data: InquiryResponseValues) => {
    updateInquiryMutation.mutate(data);
  };

  return (
    <AdminLayout currentPage="events">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Event Manager</h1>
            <p className="text-muted-foreground">
              {currentView === "events" 
                ? "Create and manage your events" 
                : "View and respond to customer inquiries"}
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link href="/admin/events" className="w-full sm:w-auto">
              <Button 
                variant={currentView === "events" ? "default" : "outline"}
                className="w-full"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Events
              </Button>
            </Link>
            <Link href="/admin/events?view=inquiries" className="w-full sm:w-auto">
              <Button 
                variant={currentView === "inquiries" ? "default" : "outline"}
                className="w-full"
              >
                <Users className="h-4 w-4 mr-2" />
                Inquiries
              </Button>
            </Link>
            {currentView === "events" && (
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    New Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new event
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...eventForm}>
                    <form onSubmit={eventForm.handleSubmit(onCreateEventSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={eventForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Title</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter event title" 
                                  {...field} 
                                  onChange={(e) => {
                                    field.onChange(e);
                                    const slugValue = generateSlug(e.target.value);
                                    eventForm.setValue("slug", slugValue);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={eventForm.control}
                          name="slug"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Slug</FormLabel>
                              <FormControl>
                                <Input placeholder="event-slug" {...field} />
                              </FormControl>
                              <FormDescription>
                                Used for the event URL
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={eventForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter event description" 
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
                          control={eventForm.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date</FormLabel>
                              <DatePicker
                                date={field.value}
                                setDate={field.onChange}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={eventForm.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time</FormLabel>
                              <FormControl>
                                <Input 
                                  type="time"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={eventForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Event location" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={eventForm.control}
                          name="capacity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Capacity</FormLabel>
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
                      </div>
                      <FormField
                        control={eventForm.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Image URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/image.jpg" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={eventForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="past">Past</SelectItem>
                                <SelectItem value="canceled">Canceled</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Separator />
                      <h3 className="text-md font-semibold">Client Information (Optional)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={eventForm.control}
                          name="clientName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Client name" 
                                  {...field} 
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={eventForm.control}
                          name="clientEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="client@example.com" 
                                  {...field} 
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={eventForm.control}
                          name="clientPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client Phone</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="+1 (123) 456-7890" 
                                  {...field} 
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={eventForm.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notes</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Additional notes" 
                                  {...field} 
                                  value={field.value || ""}
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
                          onClick={() => setIsCreateModalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={createEventMutation.isPending}
                        >
                          {createEventMutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Create Event
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={
                currentView === "events"
                  ? "Search events by title, location, or client..."
                  : "Search inquiries by name, email, or message..."
              }
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Events View */}
        {currentView === "events" && (
          <Card>
            <CardHeader className="p-4">
              <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="canceled">Canceled</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              {isLoadingEvents ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents?.length > 0 ? (
                      filteredEvents.map((event: any) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-xs">
                                {event.description.substring(0, 50)}...
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                              <Clock className="h-4 w-4 ml-2 mr-1 text-muted-foreground" />
                              <span>{event.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.capacity}</TableCell>
                          <TableCell>{getEventStatusBadge(event.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditEvent(event)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteEvent(event)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          No events found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}

        {/* Inquiries View */}
        {currentView === "inquiries" && (
          <Card>
            <CardContent className="p-0">
              {isLoadingInquiries ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInquiries?.length > 0 ? (
                      filteredInquiries.map((inquiry: any) => (
                        <TableRow key={inquiry.id}>
                          <TableCell>
                            <div className="font-medium">{inquiry.name}</div>
                          </TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell>
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {inquiry.type || "General"}
                            </Badge>
                          </TableCell>
                          <TableCell>{getInquiryStatusBadge(inquiry.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewInquiry(inquiry)}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          No inquiries found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update the event details
            </DialogDescription>
          </DialogHeader>
          <Form {...eventForm}>
            <form onSubmit={eventForm.handleSubmit(onUpdateEventSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={eventForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter event title" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={eventForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="event-slug" {...field} />
                      </FormControl>
                      <FormDescription>
                        Used for the event URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={eventForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter event description" 
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
                  control={eventForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={eventForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input 
                          type="time"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={eventForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Event location" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={eventForm.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
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
              </div>
              <FormField
                control={eventForm.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Image URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={eventForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="past">Past</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <h3 className="text-md font-semibold">Client Information (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={eventForm.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Client name" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={eventForm.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="client@example.com" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={eventForm.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Phone</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+1 (123) 456-7890" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={eventForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Additional notes" 
                          {...field} 
                          value={field.value || ""}
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
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={updateEventMutation.isPending}
                >
                  {updateEventMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Event
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the event "{currentEvent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              variant="destructive"
              onClick={() => deleteEventMutation.mutate()}
              disabled={deleteEventMutation.isPending}
            >
              {deleteEventMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Inquiry Detail Dialog */}
      <Dialog open={inquiryDetailOpen} onOpenChange={setInquiryDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              View and manage customer inquiry
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                  <p className="text-lg">{selectedInquiry.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="text-lg break-all">{selectedInquiry.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                  <p className="text-lg">{selectedInquiry.phone || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date Submitted</h3>
                  <p className="text-lg">
                    {new Date(selectedInquiry.createdAt).toLocaleDateString()} 
                    {" "}
                    {new Date(selectedInquiry.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Message</h3>
                <Card className="mt-1">
                  <CardContent className="p-4">
                    <p className="whitespace-pre-line">{selectedInquiry.message}</p>
                  </CardContent>
                </Card>
              </div>
              <Separator />
              <Form {...inquiryForm}>
                <form onSubmit={inquiryForm.handleSubmit(onUpdateInquirySubmit)} className="space-y-4">
                  <FormField
                    control={inquiryForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="responded">Responded</SelectItem>
                            <SelectItem value="booked">Booked</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={inquiryForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internal Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add internal notes about this inquiry" 
                            className="min-h-32"
                            {...field} 
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setInquiryDetailOpen(false)}
                    >
                      Close
                    </Button>
                    <Button 
                      type="submit"
                      disabled={updateInquiryMutation.isPending}
                    >
                      {updateInquiryMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Update Status
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default EventManager;