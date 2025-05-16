import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/admin/FileUploader";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description?: string;
  event?: string;
  date?: string;
  imageUrl: string;
}

const GalleryManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State for gallery items
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  
  // New item form state
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title: "",
    category: "corporate",
    description: "",
    event: "",
    date: "",
    imageUrl: ""
  });
  
  // Loading and saving state
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch gallery items
  const { data: galleryData, isLoading, refetch } = useQuery({
    queryKey: ['/api/gallery'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('Authentication required');
        }
        
        const res = await fetch('/api/gallery', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch gallery data');
        }
        
        return res.json();
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        return [];
      }
    }
  });
  
  // Initialize gallery items
  useState(() => {
    if (galleryData) {
      setGalleryItems(galleryData);
    }
  });
  
  // Filter gallery items by category
  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);
  
  // Handle image upload for new item
  const handleImageUpload = (filePath: string) => {
    setNewItem({
      ...newItem,
      imageUrl: filePath
    });
  };
  
  // Handle image upload for edit item
  const handleEditImageUpload = (filePath: string) => {
    if (currentItem) {
      setCurrentItem({
        ...currentItem,
        imageUrl: filePath
      });
    }
  };
  
  // Create new gallery item
  const createGalleryItem = async () => {
    if (!newItem.title || !newItem.category || !newItem.imageUrl) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields: title, category, and image",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('/api/gallery/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newItem)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create gallery item');
      }
      
      toast({
        title: "Item Created",
        description: "Gallery item has been successfully created",
      });
      
      // Reset form
      setNewItem({
        title: "",
        category: "corporate",
        description: "",
        event: "",
        date: "",
        imageUrl: ""
      });
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      refetch();
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: error instanceof Error ? error.message : "Failed to create gallery item",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Update gallery item
  const updateGalleryItem = async () => {
    if (!currentItem || !currentItem.id) return;
    
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`/api/gallery/update/${currentItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentItem)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update gallery item');
      }
      
      toast({
        title: "Item Updated",
        description: "Gallery item has been successfully updated",
      });
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      refetch();
      
      // Close dialog
      setEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update gallery item",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Delete gallery item
  const deleteGalleryItem = async () => {
    if (!currentItem || !currentItem.id) return;
    
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`/api/gallery/delete/${currentItem.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete gallery item');
      }
      
      toast({
        title: "Item Deleted",
        description: "Gallery item has been successfully deleted",
      });
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
      refetch();
      
      // Close dialog
      setDeleteDialogOpen(false);
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: error instanceof Error ? error.message : "Failed to delete gallery item",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <AdminLayout title="Gallery Manager">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gallery Manager</h1>
        <p className="text-muted-foreground">Add, edit and manage gallery items</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Gallery Item Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Add New Item</CardTitle>
            <CardDescription>
              Create a new gallery item with details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input 
                id="title"
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                placeholder="e.g. Corporate Annual Dinner"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={newItem.category} 
                onValueChange={(value) => setNewItem({...newItem, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate">Corporate Events</SelectItem>
                  <SelectItem value="wedding">Weddings</SelectItem>
                  <SelectItem value="social">Social Events</SelectItem>
                  <SelectItem value="cultural">Cultural Events</SelectItem>
                  <SelectItem value="educational">Educational Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                value={newItem.description || ''}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                placeholder="Brief description of this gallery item"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="event">Associated Event</Label>
              <Input 
                id="event"
                value={newItem.event || ''}
                onChange={(e) => setNewItem({...newItem, event: e.target.value})}
                placeholder="e.g. TechCorp Annual Conference 2025"
              />
            </div>
            
            <div>
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date"
                type="date"
                value={newItem.date || ''}
                onChange={(e) => setNewItem({...newItem, date: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="image">Image Upload *</Label>
              <FileUploader 
                onFileUpload={handleImageUpload}
                accept="image/*"
                maxSize={2}
              />
              {newItem.imageUrl && (
                <div className="mt-4">
                  <img 
                    src={newItem.imageUrl} 
                    alt="Preview" 
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            
            <Button 
              className="w-full"
              onClick={createGalleryItem}
              disabled={isSaving || !newItem.title || !newItem.category || !newItem.imageUrl}
            >
              {isSaving ? 'Creating...' : 'Create Gallery Item'}
            </Button>
          </CardContent>
        </Card>
        
        {/* Gallery Items List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Gallery Items</CardTitle>
                <CardDescription>
                  Manage your existing gallery items
                </CardDescription>
              </div>
              
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="corporate">Corporate Events</SelectItem>
                  <SelectItem value="wedding">Weddings</SelectItem>
                  <SelectItem value="social">Social Events</SelectItem>
                  <SelectItem value="cultural">Cultural Events</SelectItem>
                  <SelectItem value="educational">Educational Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse rounded-lg overflow-hidden">
                    <div className="h-48 bg-neutral-200"></div>
                    <div className="p-3 space-y-2">
                      <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                      <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredItems.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No gallery items found in this category</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative h-48">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {item.category?.charAt(0).toUpperCase() + item.category?.slice(1)}
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold truncate">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {item.description || 'No description provided'}
                          </p>
                          
                          <div className="flex justify-between mt-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setCurrentItem(item);
                                setEditDialogOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => {
                                setCurrentItem(item);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Gallery Item</DialogTitle>
            <DialogDescription>
              Make changes to the gallery item details
            </DialogDescription>
          </DialogHeader>
          
          {currentItem && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title"
                  value={currentItem.title}
                  onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
                  placeholder="Gallery item title"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={currentItem.category} 
                  onValueChange={(value) => setCurrentItem({...currentItem, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate Events</SelectItem>
                    <SelectItem value="wedding">Weddings</SelectItem>
                    <SelectItem value="social">Social Events</SelectItem>
                    <SelectItem value="cultural">Cultural Events</SelectItem>
                    <SelectItem value="educational">Educational Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description"
                  value={currentItem.description || ''}
                  onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                  placeholder="Brief description"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-event">Associated Event</Label>
                <Input 
                  id="edit-event"
                  value={currentItem.event || ''}
                  onChange={(e) => setCurrentItem({...currentItem, event: e.target.value})}
                  placeholder="Associated event name"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-date">Date</Label>
                <Input 
                  id="edit-date"
                  type="date"
                  value={currentItem.date || ''}
                  onChange={(e) => setCurrentItem({...currentItem, date: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-image">Change Image</Label>
                <FileUploader 
                  onFileUpload={handleEditImageUpload}
                  accept="image/*"
                  maxSize={2}
                />
                {currentItem.imageUrl && (
                  <div className="mt-4">
                    <img 
                      src={currentItem.imageUrl} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={updateGalleryItem} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentItem?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteGalleryItem} disabled={isSaving}>
              {isSaving ? 'Deleting...' : 'Delete Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default GalleryManager;