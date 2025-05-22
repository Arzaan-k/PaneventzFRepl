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

const Blog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: blogPosts = [] } = useQuery({
    queryKey: ['/api/blog'],
  });

  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      author: "Imran Mirza",
      image: "",
      tags: "",
      status: "draft"
    }
  });

  const createPostMutation = useMutation({
    mutationFn: (data: any) => 
      fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
        })
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Blog post created successfully!"
      });
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: any) => 
      fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
        })
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setIsDialogOpen(false);
      setEditingPost(null);
      form.reset();
      toast({
        title: "Success",
        description: "Blog post updated successfully!"
      });
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: any) => 
      fetch(`/api/blog/${id}`, { method: 'DELETE' }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully!"
      });
    }
  });

  const onSubmit = (data: any) => {
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    if (editingPost) {
      updatePostMutation.mutate({ id: (editingPost as any).id, data });
    } else {
      createPostMutation.mutate(data);
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    form.reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      image: post.image,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || "",
      status: post.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: any) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deletePostMutation.mutate(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Use real blog posts from the database
  const displayPosts = blogPosts || [];
  const publishedCount = displayPosts.filter((post: any) => post.status === 'published').length;
  const draftCount = displayPosts.filter((post: any) => post.status === 'draft').length;

  return (
    <AdminLayout title="Blog Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-gray-600 mt-1">Create and manage your blog content</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingPost(null); form.reset(); }}>
                Create New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
                <DialogDescription>
                  {editingPost ? 'Update your blog post content' : 'Write a new blog post for your website'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Post Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter post title..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL Slug (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="auto-generated-from-title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of the blog post..." 
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your blog content here..." 
                            className="min-h-[200px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                              <SelectItem value="Corporate Events">Corporate Events</SelectItem>
                              <SelectItem value="Weddings">Weddings</SelectItem>
                              <SelectItem value="Cultural Events">Cultural Events</SelectItem>
                              <SelectItem value="Social Events">Social Events</SelectItem>
                              <SelectItem value="Tips & Guides">Tips & Guides</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author</FormLabel>
                          <FormControl>
                            <Input placeholder="Author name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
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
                          <Input placeholder="events, planning, corporate, wedding" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button 
                      type="submit" 
                      disabled={createPostMutation.isPending || updatePostMutation.isPending}
                    >
                      {editingPost ? 'Update Post' : 'Create Post'}
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
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayPosts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Badge variant="outline" className="bg-green-100 text-green-800">{publishedCount}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">{draftCount}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <span className="text-sm text-gray-500">
                {new Set(displayPosts.map((post: any) => post.category)).size}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(displayPosts.map((post: any) => post.category)).size}</div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-4">
          {displayPosts.map((post: any) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    <CardDescription className="mb-2">
                      {post.excerpt}
                    </CardDescription>
                    <div className="text-sm text-gray-500">
                      <span>By {post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.category}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                  {post.image && (
                    <div className="w-24 h-16 ml-4 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(post.tags) ? post.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    )) : null}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayPosts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-500 text-center mb-4">
                Start creating engaging content for your audience.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Create Your First Blog Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default Blog;