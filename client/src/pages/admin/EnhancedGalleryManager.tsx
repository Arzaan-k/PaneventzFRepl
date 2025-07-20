import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CloudinaryUpload } from "@/components/ui/cloudinary-upload";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";

interface MediaItem {
  id: number;
  title: string;
  category: string;
  description?: string;
  event?: string;
  eventId?: number;
  date?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: 'image' | 'video';
  cdnUrls: string[];
  tags: string[];
  isEventSpecific: boolean;
  uploadMethod: 'file' | 'url' | 'cdn';
}

const EnhancedGalleryManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [selectedMediaType, setSelectedMediaType] = useState<string>("all");
  const [cdnUrls, setCdnUrls] = useState<string[]>(['']);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch gallery items and events
  const { data: galleryItems = [] } = useQuery({
    queryKey: ['/api/gallery'],
  });

  const { data: events = [] } = useQuery({
    queryKey: ['/api/events'],
  });

  const form = useForm({
    defaultValues: {
      title: "",
      category: "corporate",
      description: "",
      event: "",
      eventId: null,
      mediaUrl: "",
      thumbnailUrl: "",
      mediaType: "image" as 'image' | 'video',
      tags: "",
      isEventSpecific: false,
      uploadMethod: "url" as 'file' | 'url' | 'cdn'
    }
  });

  const createMediaMutation = useMutation({
    mutationFn: async (data: any) => {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          cdnUrls: cdnUrls.filter(url => url.trim() !== ''),
          tags: data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
        })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      setIsDialogOpen(false);
      setCdnUrls(['']);
      form.reset();
      toast({
        title: "Success!",
        description: "Media item added to gallery successfully!"
      });
    },
    onError: (error) => {
      console.error('Gallery creation error:', error);
      toast({
        title: "Upload Error",
        description: "Failed to add media item. Please check your authentication and try again.",
        variant: "destructive"
      });
    }
  });

  const updateMediaMutation = useMutation({
    mutationFn: async ({ id, data }: any) => {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          cdnUrls: cdnUrls.filter(url => url.trim() !== ''),
          tags: data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
        })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      setIsDialogOpen(false);
      setEditingItem(null);
      setCdnUrls(['']);
      form.reset();
      toast({
        title: "Success!",
        description: "Media item updated successfully!"
      });
    }
  });

  const deleteMediaMutation = useMutation({
    mutationFn: async (id: any) => {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      toast({
        title: "Success!",
        description: "Media item deleted successfully!"
      });
    }
  });

  const onSubmit = (data: any) => {
    if (editingItem) {
      updateMediaMutation.mutate({ id: editingItem.id, data });
    } else {
      createMediaMutation.mutate(data);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setCdnUrls(item.cdnUrls?.length > 0 ? item.cdnUrls : ['']);
    form.reset({
      title: item.title,
      category: item.category,
      description: item.description,
      event: item.event,
      eventId: item.eventId,
      mediaUrl: item.mediaUrl,
      thumbnailUrl: item.thumbnailUrl,
      mediaType: item.mediaType,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || "",
      isEventSpecific: item.isEventSpecific,
      uploadMethod: item.uploadMethod || "url"
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: any) => {
    if (confirm("Are you sure you want to delete this media item?")) {
      deleteMediaMutation.mutate(id);
    }
  };

  const addCdnUrl = () => {
    setCdnUrls([...cdnUrls, '']);
  };

  const removeCdnUrl = (index: number) => {
    setCdnUrls(cdnUrls.filter((_, i) => i !== index));
  };

  const updateCdnUrl = (index: number, value: string) => {
    const newUrls = [...cdnUrls];
    newUrls[index] = value;
    setCdnUrls(newUrls);
  };

  // Sample data for demonstration
  const sampleGalleryItems = [
    {
      id: 1,
      title: "Corporate Gala Entrance",
      category: "corporate",
      description: "Professional setup with branded backdrop",
      event: "TechCorp Annual Conference",
      eventId: 1,
      mediaUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      mediaType: "image",
      cdnUrls: ["https://cdn1.example.com/image1.jpg", "https://cdn2.example.com/image1.jpg"],
      tags: ["corporate", "entrance", "branding"],
      isEventSpecific: true,
      uploadMethod: "cdn",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Wedding Ceremony Highlights",
      category: "wedding",
      description: "Beautiful ceremony moments captured",
      event: "Priya & Raj Wedding",
      eventId: 2,
      mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      mediaType: "video",
      thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      cdnUrls: ["https://video-cdn.example.com/wedding1.mp4"],
      tags: ["wedding", "ceremony", "highlights"],
      isEventSpecific: true,
      uploadMethod: "url",
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  const sampleEvents = [
    { id: 1, title: "TechCorp Annual Conference", slug: "techcorp-conference-2024" },
    { id: 2, title: "Priya & Raj Wedding", slug: "priya-raj-wedding" },
    { id: 3, title: "Cultural Heritage Festival", slug: "cultural-festival-2024" }
  ];

  const displayItems = (galleryItems as any[]).length > 0 ? galleryItems : sampleGalleryItems;
  const displayEvents = (events as any[]).length > 0 ? events : sampleEvents;

  // Filter items
  const filteredItems = displayItems.filter((item: any) => {
    if (selectedEvent !== "all" && item.eventId?.toString() !== selectedEvent) return false;
    if (selectedMediaType !== "all" && item.mediaType !== selectedMediaType) return false;
    return true;
  });

  const getMediaTypeIcon = (type: string) => {
    if (type === 'video') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  };

  return (
    <AdminLayout title="Enhanced Gallery Manager">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Enhanced Gallery Manager</h1>
            <p className="text-gray-600 mt-1">Manage images and videos with multiple CDN support</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingItem(null); setCdnUrls(['']); form.reset(); }}>
                Add Media Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Media Item' : 'Add New Media Item'}</DialogTitle>
                <DialogDescription>
                  Add images or videos to your gallery with multiple CDN support
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="media">Media & CDN</TabsTrigger>
                      <TabsTrigger value="event">Event Association</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Media title..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="corporate">Corporate Events</SelectItem>
                                  <SelectItem value="wedding">Weddings</SelectItem>
                                  <SelectItem value="social">Social Events</SelectItem>
                                  <SelectItem value="cultural">Cultural Events</SelectItem>
                                  <SelectItem value="educational">Educational Events</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe this media item..." 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags (comma-separated)</FormLabel>
                            <FormControl>
                              <Input placeholder="corporate, professional, branding" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    <TabsContent value="media" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="mediaType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Media Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select media type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="image">Image</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="uploadMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload Method</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select upload method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="url">Direct URL</SelectItem>
                                <SelectItem value="cdn">CDN Links</SelectItem>
                                <SelectItem value="file">File Upload</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mediaUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Media Upload</FormLabel>
                            <FormControl>
                              <CloudinaryUpload
                                onUpload={field.onChange}
                                currentImage={field.value}
                                label="Upload Image/Video"
                                accept="image/*,video/*"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("mediaType") === "video" && (
                        <FormField
                          control={form.control}
                          name="thumbnailUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Video Thumbnail Upload</FormLabel>
                              <FormControl>
                                <CloudinaryUpload
                                  onUpload={field.onChange}
                                  currentImage={field.value}
                                  label="Upload Thumbnail"
                                  accept="image/*"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <FormLabel>CDN URLs (Multiple Sources)</FormLabel>
                          <Button type="button" variant="outline" size="sm" onClick={addCdnUrl}>
                            Add CDN URL
                          </Button>
                        </div>
                        {cdnUrls.map((url, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder={`CDN URL ${index + 1}`}
                              value={url}
                              onChange={(e) => updateCdnUrl(index, e.target.value)}
                            />
                            {cdnUrls.length > 1 && (
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => removeCdnUrl(index)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <p className="text-xs text-gray-500">
                          Add multiple CDN URLs for better performance and redundancy
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="event" className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name="isEventSpecific"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Event-Specific Media</FormLabel>
                                <div className="text-sm text-muted-foreground">
                                  Associate this media with a specific event
                                </div>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      {form.watch("isEventSpecific") && (
                        <>
                          <FormField
                            control={form.control}
                            name="eventId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select Event</FormLabel>
                                <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Choose an event" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {displayEvents.map((event: any) => (
                                      <SelectItem key={event.id} value={event.id.toString()}>
                                        {event.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="event"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Event Name (Custom)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Custom event name..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </TabsContent>
                  </Tabs>

                  <DialogFooter>
                    <Button 
                      type="submit" 
                      disabled={createMediaMutation.isPending || updateMediaMutation.isPending}
                    >
                      {editingItem ? 'Update Media' : 'Add Media'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Filter by Event</label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    {displayEvents.map((event: any) => (
                      <SelectItem key={event.id} value={event.id.toString()}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Filter by Media Type</label>
                <Select value={selectedMediaType} onValueChange={setSelectedMediaType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Media" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Media</SelectItem>
                    <SelectItem value="image">Images Only</SelectItem>
                    <SelectItem value="video">Videos Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedEvent("all");
                    setSelectedMediaType("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: any) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                {item.mediaType === 'video' ? (
                  <div className="relative">
                    <img 
                      src={item.thumbnailUrl || item.mediaUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="bg-white/90 rounded-full p-3">
                        {getMediaTypeIcon('video')}
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={item.mediaUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Badge className="bg-black/70 text-white">
                    {getMediaTypeIcon(item.mediaType)}
                    <span className="ml-1">{item.mediaType}</span>
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                  
                  {item.isEventSpecific && item.event && (
                    <Badge variant="outline" className="text-xs">
                      📅 {item.event}
                    </Badge>
                  )}
                  
                  {item.cdnUrls && item.cdnUrls.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Badge variant="outline" className="text-xs bg-blue-50">
                        🌐 {item.cdnUrls.length} CDN URLs
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-gray-500">
                      {formatDate(item.createdAt)}
                    </span>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
              <p className="text-gray-500 text-center mb-4">
                No media items match your current filters. Try adjusting the filters or add new media.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Add Your First Media Item
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default EnhancedGalleryManager;