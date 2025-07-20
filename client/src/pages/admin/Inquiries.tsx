import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

const Inquiries = () => {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: inquiries = [] } = useQuery({
    queryKey: ['/api/contact'],
  });

  const updateInquiryMutation = useMutation({
    mutationFn: ({ id, status }: any) => 
      fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      toast({
        title: "Success",
        description: "Inquiry status updated successfully!"
      });
    }
  });

  const sendResponseMutation = useMutation({
    mutationFn: ({ inquiryId, message }: any) =>
      fetch(`/api/contact/${inquiryId}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      setIsResponseDialogOpen(false);
      setResponseMessage("");
      setSelectedInquiry(null);
      toast({
        title: "Success",
        description: "Response sent successfully!"
      });
    }
  });

  const handleStatusChange = (inquiry: any, newStatus: string) => {
    updateInquiryMutation.mutate({ id: inquiry.id, status: newStatus });
  };

  const handleSendResponse = () => {
    if (selectedInquiry && responseMessage.trim()) {
      sendResponseMutation.mutate({
        inquiryId: (selectedInquiry as any).id,
        message: responseMessage
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (subject: string) => {
    if (subject.toLowerCase().includes('urgent') || subject.toLowerCase().includes('asap')) {
      return 'bg-red-100 text-red-800';
    }
    if (subject.toLowerCase().includes('quote') || subject.toLowerCase().includes('pricing')) {
      return 'bg-orange-100 text-orange-800';
    }
    return 'bg-blue-100 text-blue-800';
  };

  // Sample data for demonstration
  const sampleInquiries = [
    {
      id: 1,
      name: "Rahul Verma",
      email: "rahul@techcorp.com",
      phone: "+91 98765 43210",
      subject: "Corporate Event Planning - Q4 2024",
      message: "We are looking to organize our annual corporate retreat for 200+ employees. The event should include team building activities, professional networking sessions, and entertainment. Budget range: ₹15-20 lakhs.",
      status: "pending",
      createdAt: new Date().toISOString(),
      priority: "high"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      phone: "+91 87654 32109",
      subject: "Wedding Planning Services",
      message: "Looking for complete wedding planning services for December 2024. Guest count: 500. Venue: Udaipur. Please share your packages and availability.",
      status: "in-progress",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      priority: "medium"
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@startup.co",
      phone: "+91 76543 21098",
      subject: "Product Launch Event - Urgent",
      message: "Need help organizing a product launch event next month. Expecting 150 guests, media presence required. Looking for a modern venue in Mumbai.",
      status: "completed",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      priority: "high"
    }
  ];

  const displayInquiries = (inquiries as any[]).length > 0 ? inquiries : sampleInquiries;

  const pendingCount = displayInquiries.filter((inq: any) => inq.status === 'pending').length;
  const inProgressCount = displayInquiries.filter((inq: any) => inq.status === 'in-progress').length;
  const completedCount = displayInquiries.filter((inq: any) => inq.status === 'completed').length;

  return (
    <AdminLayout title="Customer Inquiries">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Customer Inquiries</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayInquiries.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">{pendingCount}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">{inProgressCount}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Badge variant="outline" className="bg-green-100 text-green-800">{completedCount}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Inquiries List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Inquiries</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {displayInquiries.map((inquiry: any) => (
              <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                      <CardDescription>
                        {inquiry.email} • {inquiry.phone}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getUrgencyColor(inquiry.subject)}>
                        {inquiry.priority || 'Normal'}
                      </Badge>
                      <Badge className={getStatusColor(inquiry.status)}>
                        {inquiry.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Subject:</h4>
                      <p className="text-sm font-medium">{inquiry.subject}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Message:</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">{inquiry.message}</p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-xs text-gray-500">
                        Received: {formatDate(inquiry.createdAt)}
                      </span>
                      
                      <div className="flex space-x-2">
                        {inquiry.status === 'pending' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(inquiry, 'in-progress')}
                          >
                            Start Processing
                          </Button>
                        )}
                        
                        {inquiry.status === 'in-progress' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(inquiry, 'completed')}
                          >
                            Mark Complete
                          </Button>
                        )}
                        
                        <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm"
                              onClick={() => setSelectedInquiry(inquiry)}
                            >
                              Respond
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Send Response</DialogTitle>
                              <DialogDescription>
                                Responding to {inquiry.name} about "{inquiry.subject}"
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Type your response here..."
                                value={responseMessage}
                                onChange={(e) => setResponseMessage(e.target.value)}
                                className="min-h-[120px]"
                              />
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  onClick={() => setIsResponseDialogOpen(false)}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  onClick={handleSendResponse}
                                  disabled={!responseMessage.trim() || sendResponseMutation.isPending}
                                >
                                  Send Response
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending">
            {displayInquiries.filter((inq: any) => inq.status === 'pending').map((inquiry: any) => (
              <Card key={inquiry.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{inquiry.name}</h3>
                      <p className="text-sm text-gray-600">{inquiry.subject}</p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleStatusChange(inquiry, 'in-progress')}
                    >
                      Start Processing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="in-progress">
            {displayInquiries.filter((inq: any) => inq.status === 'in-progress').map((inquiry: any) => (
              <Card key={inquiry.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{inquiry.name}</h3>
                      <p className="text-sm text-gray-600">{inquiry.subject}</p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleStatusChange(inquiry, 'completed')}
                    >
                      Mark Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed">
            {displayInquiries.filter((inq: any) => inq.status === 'completed').map((inquiry: any) => (
              <Card key={inquiry.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{inquiry.name}</h3>
                      <p className="text-sm text-gray-600">{inquiry.subject}</p>
                      <Badge className="bg-green-100 text-green-800 mt-1">Completed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {displayInquiries.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries yet</h3>
              <p className="text-gray-500 text-center">
                Customer inquiries will appear here when they contact you through the website.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default Inquiries;