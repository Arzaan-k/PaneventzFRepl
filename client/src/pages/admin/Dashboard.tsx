import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AdminLayout from "./components/AdminLayout";
import { BarChart, LineChart, Calendar, Users, Image, FileText, Box, MoreVertical } from "lucide-react";

interface DashboardData {
  stats: {
    totalEvents: number;
    upcomingEvents: number;
    totalInquiries: number;
    newInquiries: number;
  };
  recentEvents: {
    id: number;
    title: string;
    date: string;
    type: string;
    status: string;
  }[];
  recentInquiries: {
    id: number;
    name: string;
    email: string;
    eventType: string;
    date: string;
    status: string;
  }[];
}

const Dashboard = () => {
  const [, setLocation] = useLocation();
  const [isClient, setIsClient] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/admin/dashboard'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        if (!res.ok) {
          throw new Error('Authentication failed');
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLocation("/admin/login");
        return null;
      }
    },
    enabled: isClient
  });

  // Fallback dashboard data
  const fallbackData: DashboardData = {
    stats: {
      totalEvents: 125,
      upcomingEvents: 18,
      totalInquiries: 87,
      newInquiries: 12
    },
    recentEvents: [
      { id: 1, title: "Sharma-Kapoor Wedding", date: "2023-12-20", type: "Wedding", status: "Upcoming" },
      { id: 2, title: "TechCorp Annual Conference", date: "2023-12-15", type: "Corporate", status: "Upcoming" },
      { id: 3, title: "City Marathon 2023", date: "2023-12-10", type: "Sports", status: "Upcoming" },
      { id: 4, title: "Cultural Festival - Delhi", date: "2023-12-05", type: "Cultural", status: "Completed" },
      { id: 5, title: "Delhi Public School Annual Day", date: "2023-11-28", type: "Education", status: "Completed" }
    ],
    recentInquiries: [
      { id: 1, name: "Vikram Singh", email: "vikram@example.com", eventType: "Corporate", date: "2023-12-05", status: "New" },
      { id: 2, name: "Neha Gupta", email: "neha@example.com", eventType: "Wedding", date: "2023-12-04", status: "New" },
      { id: 3, name: "Rajesh Kumar", email: "rajesh@example.com", eventType: "Sports", date: "2023-12-02", status: "In Review" },
      { id: 4, name: "Priya Sharma", email: "priya@example.com", eventType: "Cultural", date: "2023-11-30", status: "Responded" },
      { id: 5, name: "Amit Patel", email: "amit@example.com", eventType: "Corporate", date: "2023-11-28", status: "Closed" }
    ]
  };

  // Use actual dashboard data or fallback
  const data = dashboardData || fallbackData;

  // Set page title
  useEffect(() => {
    document.title = "Admin Dashboard - Pan Eventz";
  }, []);

  return (
    <AdminLayout currentPage="dashboard">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Today: {new Date().toLocaleDateString()}
            </Button>
            <Link href="/admin/events">
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Manage Events
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{isLoading ? "..." : data.stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{isLoading ? "..." : data.stats.upcomingEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">Next 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{isLoading ? "..." : data.stats.totalInquiries}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{isLoading ? "..." : data.stats.newInquiries}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Events By Category</CardTitle>
              <CardDescription>Distribution of events across different categories</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Chart visualization would appear here in a fully connected environment
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Events</CardTitle>
              <CardDescription>Number of events over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Chart visualization would appear here in a fully connected environment
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Overview of the most recent events</CardDescription>
              </div>
              <Link href="/admin/events">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse flex items-center p-2">
                      <div className="h-12 w-12 bg-neutral-200 rounded-full"></div>
                      <div className="ml-4 space-y-2 flex-1">
                        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                        <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {data.recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          event.type === 'Wedding' ? 'bg-pink-100 text-pink-600' :
                          event.type === 'Corporate' ? 'bg-blue-100 text-blue-600' :
                          event.type === 'Sports' ? 'bg-green-100 text-green-600' :
                          event.type === 'Cultural' ? 'bg-purple-100 text-purple-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          <Box className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()} • {event.type}</p>
                        </div>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Inquiries */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Inquiries</CardTitle>
                <CardDescription>Latest contact form submissions</CardDescription>
              </div>
              <Link href="/admin/events">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse flex items-center p-2">
                      <div className="h-12 w-12 bg-neutral-200 rounded-full"></div>
                      <div className="ml-4 space-y-2 flex-1">
                        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                        <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {data.recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-neutral-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{inquiry.name}</p>
                          <p className="text-xs text-muted-foreground">{inquiry.email} • {inquiry.eventType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          inquiry.status === 'New' ? 'bg-red-100 text-red-800' : 
                          inquiry.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' : 
                          inquiry.status === 'Responded' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {inquiry.status}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Responded</DropdownMenuItem>
                            <DropdownMenuItem>Create Event</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link href="/admin/events" className="w-full">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Calendar className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-bold">Manage Events</h3>
                  <p className="text-sm text-muted-foreground mt-1">Create and edit events</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/admin/gallery" className="w-full">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Image className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-bold">Gallery Manager</h3>
                  <p className="text-sm text-muted-foreground mt-1">Update image gallery</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/admin/content" className="w-full">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <FileText className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-bold">Content Manager</h3>
                  <p className="text-sm text-muted-foreground mt-1">Update website content</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/admin/events?view=inquiries" className="w-full">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Users className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-bold">Inquiries</h3>
                  <p className="text-sm text-muted-foreground mt-1">Manage customer inquiries</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
