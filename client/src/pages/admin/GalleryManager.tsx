import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components
import AdminLayout from "./components/AdminLayout";
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
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";

// Icons
import {
  Loader2,
  Plus,
  Search,
  Image,
  Calendar,
  Tag,
  Edit,
  Trash2,
  ArrowUpDown,
  Eye,
  X,
} from "lucide-react";

// Gallery item form schema
const galleryItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  event: z.string().optional(),
  date: z.string().optional(),
  imageUrl: z.string().min(1, "Image URL is required"),
});

type GalleryItemFormValues = z.infer<typeof galleryItemSchema>;

const GalleryManager = () => {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentGalleryItem, setCurrentGalleryItem] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewItem, setViewItem] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Categories list
  const categories = [
    "Wedding",
    "Corporate",
    "Birthday",
    "Anniversary",
    "Festival",
    "Concert",
    "Conference",
    "Other"
  ];

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
    document.title = "Gallery Manager - Pan Eventz Admin";
  }, []);

  // Initialize gallery item form
  const galleryItemForm = useForm<GalleryItemFormValues>({
    resolver: zodResolver(galleryItemSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      event: "",
      date: "",
      imageUrl: "",
    },
  });

  // Fetch gallery items
  const { data: galleryItems, isLoading: isLoadingGalleryItems } = useQuery({
    queryKey: ['/api/gallery-items', activeCategory],
    queryFn: async () => {
      try {
        const url = activeCategory === "all" 
          ? '/api/gallery-items' 
          : `/api/gallery-items?category=${activeCategory}`;
        
        const res = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        return [];
      }
    },
    enabled: isClient
  });

  // Create gallery item mutation
  const createGalleryItemMutation = useMutation({
    mutationFn: async (data: GalleryItemFormValues) => {
      return apiRequest("POST", "/api/gallery-items", data);
    },
    onSuccess: () => {
      toast({
        title: "Gallery item created",
        description: "The gallery item has been created successfully",
      });
      setIsCreateModalOpen(false);
      galleryItemForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/gallery-items'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error creating gallery item",
        description: error.message || "Failed to create gallery item",
        variant: "destructive",
      });
    },
  });

  // Update gallery item mutation
  const updateGalleryItemMutation = useMutation({
    mutationFn: async (data: GalleryItemFormValues) => {
      if (!currentGalleryItem) return;
      return apiRequest("PUT", `/api/gallery-items/${currentGalleryItem.id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Gallery item updated",
        description: "The gallery item has been updated successfully",
      });
      setIsEditModalOpen(false);
      setCurrentGalleryItem(null);
      queryClient.invalidateQueries({ queryKey: ['/api/gallery-items'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating gallery item",
        description: error.message || "Failed to update gallery item",
        variant: "destructive",
      });
    },
  });

  // Delete gallery item mutation
  const deleteGalleryItemMutation = useMutation({
    mutationFn: async () => {
      if (!currentGalleryItem) return;
      return apiRequest("DELETE", `/api/gallery-items/${currentGalleryItem.id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Gallery item deleted",
        description: "The gallery item has been deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setCurrentGalleryItem(null);
      queryClient.invalidateQueries({ queryKey: ['/api/gallery-items'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting gallery item",
        description: error.message || "Failed to delete gallery item",
        variant: "destructive",
      });
    },
  });

  // Handle edit gallery item
  const handleEditGalleryItem = (item: any) => {
    setCurrentGalleryItem(item);
    galleryItemForm.reset({
      title: item.title,
      category: item.category,
      description: item.description || "",
      event: item.event || "",
      date: item.date || "",
      imageUrl: item.imageUrl,
    });
    setIsEditModalOpen(true);
  };

  // Handle delete gallery item
  const handleDeleteGalleryItem = (item: any) => {
    setCurrentGalleryItem(item);
    setIsDeleteDialogOpen(true);
  };

  // Handle view gallery item
  const handleViewGalleryItem = (item: any) => {
    setViewItem(item);
    setIsViewDialogOpen(true);
  };

  // Filter gallery items based on search query
  const filteredGalleryItems = galleryItems?.filter((item: any) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.event && item.event.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Create gallery item form submission handler
  const onCreateGalleryItemSubmit = (data: GalleryItemFormValues) => {
    createGalleryItemMutation.mutate(data);
  };

  // Update gallery item form submission handler
  const onUpdateGalleryItemSubmit = (data: GalleryItemFormValues) => {
    updateGalleryItemMutation.mutate(data);
  };

  return (
    <AdminLayout currentPage="gallery">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gallery Manager</h1>
            <p className="text-muted-foreground">
              Manage your gallery items
            </p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Gallery Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Gallery Item</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new gallery item
                </DialogDescription>
              </DialogHeader>
              <Form {...galleryItemForm}>
                <form onSubmit={galleryItemForm.handleSubmit(onCreateGalleryItemSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={galleryItemForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Image title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={galleryItemForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={galleryItemForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Image description" 
                            {...field} 
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={galleryItemForm.control}
                      name="event"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Related event" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={galleryItemForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="date"
                              {...field} 
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={galleryItemForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
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
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={createGalleryItemMutation.isPending}
                    >
                      {createGalleryItemMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Add Gallery Item
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search gallery items..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex overflow-x-auto pb-2">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="h-9 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className={`rounded-md px-3 py-1 font-medium ${
                    activeCategory === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  All
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category.toLowerCase()}
                    className={`rounded-md px-3 py-1 font-medium ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted"
                    }`}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoadingGalleryItems ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="hidden md:table-cell">Event</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGalleryItems?.length > 0 ? (
                      filteredGalleryItems.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div 
                              className="w-16 h-16 rounded-md bg-neutral-100 overflow-hidden cursor-pointer"
                              onClick={() => handleViewGalleryItem(item)}
                            >
                              <img 
                                src={item.imageUrl} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium max-w-xs truncate">{item.title}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                              {item.description ? item.description.substring(0, 50) + "..." : ""}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-primary/10">
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {item.event || "-"}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleViewGalleryItem(item)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditGalleryItem(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteGalleryItem(item)}
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
                          No gallery items found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Gallery Item Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Gallery Item</DialogTitle>
            <DialogDescription>
              Update the gallery item details
            </DialogDescription>
          </DialogHeader>
          <Form {...galleryItemForm}>
            <form onSubmit={galleryItemForm.handleSubmit(onUpdateGalleryItemSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={galleryItemForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Image title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={galleryItemForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={galleryItemForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Image description" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={galleryItemForm.control}
                  name="event"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Related event" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={galleryItemForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={galleryItemForm.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
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
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={updateGalleryItemMutation.isPending}
                >
                  {updateGalleryItemMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Gallery Item
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
              Are you sure you want to delete the gallery item "{currentGalleryItem?.title}"? This action cannot be undone.
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
              onClick={() => deleteGalleryItemMutation.mutate()}
              disabled={deleteGalleryItemMutation.isPending}
            >
              {deleteGalleryItemMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Gallery Item Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer">
            <X className="h-4 w-4" onClick={() => setIsViewDialogOpen(false)} />
          </div>
          {viewItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square bg-neutral-100 rounded-md overflow-hidden">
                <img 
                  src={viewItem.imageUrl} 
                  alt={viewItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{viewItem.title}</h2>
                  <Badge variant="outline" className="mt-2 bg-primary/10">
                    {viewItem.category}
                  </Badge>
                </div>
                
                {viewItem.description && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                    <p className="mt-1">{viewItem.description}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  {viewItem.event && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Event</h3>
                      <p className="mt-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {viewItem.event}
                      </p>
                    </div>
                  )}
                  
                  {viewItem.date && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                      <p className="mt-1">
                        {new Date(viewItem.date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleEditGalleryItem(viewItem);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleDeleteGalleryItem(viewItem);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default GalleryManager;