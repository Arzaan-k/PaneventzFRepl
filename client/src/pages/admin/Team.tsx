import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const Team = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: teamMembers = [] } = useQuery({
    queryKey: ['/api/team'],
  });

  const form = useForm({
    defaultValues: {
      name: "",
      position: "",
      bio: "",
      image: "",
      email: "",
      phone: "",
      linkedin: "",
      department: ""
    }
  });

  const createMemberMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/team', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/team'] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Team member added successfully!"
      });
    }
  });

  const updateMemberMutation = useMutation({
    mutationFn: ({ id, data }: any) => apiRequest(`/api/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/team'] });
      setIsDialogOpen(false);
      setEditingMember(null);
      form.reset();
      toast({
        title: "Success",
        description: "Team member updated successfully!"
      });
    }
  });

  const deleteMemberMutation = useMutation({
    mutationFn: (id: any) => apiRequest(`/api/team/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/team'] });
      toast({
        title: "Success",
        description: "Team member removed successfully!"
      });
    }
  });

  const onSubmit = (data: any) => {
    if (editingMember) {
      updateMemberMutation.mutate({ id: (editingMember as any).id, data });
    } else {
      createMemberMutation.mutate(data);
    }
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    form.reset({
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image,
      email: member.email || "",
      phone: member.phone || "",
      linkedin: member.linkedin || "",
      department: member.department || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: any) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      deleteMemberMutation.mutate(id);
    }
  };

  // Fallback team data for demonstration
  const fallbackTeam = [
    {
      id: 1,
      name: "Imran Mirza",
      position: "Founder & CEO",
      bio: "Passionate event planner with 10+ years of experience creating memorable experiences.",
      image: "https://i.pravatar.cc/300?img=1",
      email: "imran@paneventz.com",
      department: "Leadership"
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Creative Director",
      bio: "Expert in event design and creative conceptualization with a keen eye for detail.",
      image: "https://i.pravatar.cc/300?img=2",
      email: "priya@paneventz.com",
      department: "Creative"
    }
  ];

  const displayTeamMembers = (teamMembers as any[]).length > 0 ? teamMembers : fallbackTeam;

  return (
    <AdminLayout title="Team Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Team Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingMember(null); form.reset(); }}>
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
                <DialogDescription>
                  {editingMember ? 'Update team member information' : 'Add a new member to your team'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
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
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Event Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description about the team member..." 
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
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/profile.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="john@paneventz.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input placeholder="Operations" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button 
                      type="submit" 
                      disabled={createMemberMutation.isPending || updateMemberMutation.isPending}
                    >
                      {editingMember ? 'Update Member' : 'Add Member'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTeamMembers.map((member: any) => (
            <Card key={member.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={member.image || "https://i.pravatar.cc/300?img=1"} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  {member.position}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {member.bio}
                </p>
                
                {member.department && (
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {member.department}
                    </span>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(member)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(member.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayTeamMembers.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members yet</h3>
              <p className="text-gray-500 text-center mb-4">
                Start building your team by adding your first member.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Add Your First Team Member
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default Team;