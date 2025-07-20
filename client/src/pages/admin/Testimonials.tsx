import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

const Testimonials = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials = [] } = useQuery({
    queryKey: ['/api/testimonials'],
  });

  const form = useForm({
    defaultValues: {
      content: "",
      author: "",
      position: "",
      company: "",
      rating: 5,
      event: "",
      avatar: "",
      featured: false
    }
  });

  const createTestimonialMutation = useMutation({
    mutationFn: (data: any) => 
      fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Testimonial added successfully!"
      });
    }
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: ({ id, data }: any) => 
      fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      setIsDialogOpen(false);
      setEditingTestimonial(null);
      form.reset();
      toast({
        title: "Success",
        description: "Testimonial updated successfully!"
      });
    }
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: (id: any) => 
      fetch(`/api/testimonials/${id}`, { method: 'DELETE' }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial deleted successfully!"
      });
    }
  });

  const onSubmit = (data: any) => {
    if (editingTestimonial) {
      updateTestimonialMutation.mutate({ id: (editingTestimonial as any).id, data });
    } else {
      createTestimonialMutation.mutate(data);
    }
  };

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    form.reset({
      content: testimonial.content,
      author: testimonial.author,
      position: testimonial.position,
      company: testimonial.company,
      rating: testimonial.rating,
      event: testimonial.event || "",
      avatar: testimonial.avatar || "",
      featured: testimonial.featured || false
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: any) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonialMutation.mutate(id);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`} 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Sample testimonials for demonstration
  const sampleTestimonials = [
    {
      id: 1,
      content: "Pan Eventz delivered an absolutely spectacular wedding for us! Every detail was perfectly managed, from the stunning decorations to the flawless coordination. Our guests are still talking about how amazing everything was.",
      author: "Priya & Rajesh Sharma",
      position: "Happy Couple",
      company: "Wedding Client",
      rating: 5,
      event: "Destination Wedding - Udaipur",
      avatar: "https://i.pravatar.cc/300?img=1",
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      content: "Our corporate annual event was a huge success thanks to Pan Eventz. Their professional approach and attention to detail made our product launch memorable for all 500+ attendees.",
      author: "Vikram Mehta",
      position: "CEO",
      company: "TechCorp Solutions",
      rating: 5,
      event: "Corporate Product Launch",
      avatar: "https://i.pravatar.cc/300?img=2",
      featured: true,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 3,
      content: "The cultural festival organized by Pan Eventz was beyond our expectations. They understood our vision perfectly and brought it to life with amazing creativity and professionalism.",
      author: "Dr. Meera Patel",
      position: "Cultural Director",
      company: "Heritage Foundation",
      rating: 5,
      event: "Annual Cultural Festival",
      avatar: "https://i.pravatar.cc/300?img=3",
      featured: false,
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  const displayTestimonials = (testimonials as any[]).length > 0 ? testimonials : sampleTestimonials;
  const featuredCount = displayTestimonials.filter((t: any) => t.featured).length;
  const averageRating = displayTestimonials.reduce((acc: number, t: any) => acc + t.rating, 0) / displayTestimonials.length;

  return (
    <AdminLayout title="Testimonials Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Customer Testimonials</h1>
            <p className="text-gray-600 mt-1">Manage customer reviews and testimonials</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingTestimonial(null); form.reset(); }}>
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
                <DialogDescription>
                  {editingTestimonial ? 'Update testimonial details' : 'Add a new customer testimonial'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Testimonial Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write the customer testimonial here..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="author"
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
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position/Title</FormLabel>
                          <FormControl>
                            <Input placeholder="CEO" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating</FormLabel>
                          <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select rating" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="5">5 Stars</SelectItem>
                              <SelectItem value="4">4 Stars</SelectItem>
                              <SelectItem value="3">3 Stars</SelectItem>
                              <SelectItem value="2">2 Stars</SelectItem>
                              <SelectItem value="1">1 Star</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="event"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Related Event (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Corporate Annual Conference" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/avatar.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button 
                      type="submit" 
                      disabled={createTestimonialMutation.isPending || updateTestimonialMutation.isPending}
                    >
                      {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayTestimonials.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">{featuredCount}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <div className="flex">
                {renderStars(Math.round(averageRating))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">5-Star Reviews</CardTitle>
              <span className="text-green-600 font-medium">
                {Math.round((displayTestimonials.filter((t: any) => t.rating === 5).length / displayTestimonials.length) * 100)}%
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayTestimonials.filter((t: any) => t.rating === 5).length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayTestimonials.map((testimonial: any) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.avatar || "https://i.pravatar.cc/300?img=1"} 
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.author}</CardTitle>
                      <CardDescription>
                        {testimonial.position} at {testimonial.company}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {testimonial.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                    )}
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  
                  {testimonial.event && (
                    <div className="text-sm text-gray-500">
                      <strong>Event:</strong> {testimonial.event}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      Added: {formatDate(testimonial.createdAt)}
                    </span>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(testimonial)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(testimonial.id)}
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

        {displayTestimonials.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
              <p className="text-gray-500 text-center mb-4">
                Start building social proof by adding your first customer testimonial.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Add Your First Testimonial
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default Testimonials;