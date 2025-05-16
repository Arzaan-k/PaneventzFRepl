import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch dashboard data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/admin/dashboard'],
    queryFn: async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      return response.json();
    },
  });
  
  // Fallback data
  const fallbackData = {
    stats: {
      eventsCompleted: 500,
      satisfiedClients: 300,
      inquiriesThisMonth: 42,
      revenueGrowth: 25
    },
    recentEvents: [
      { id: 1, title: "Corporate Leadership Summit", date: "2025-05-01", status: "completed" },
      { id: 2, title: "Annual Tech Conference", date: "2025-04-15", status: "completed" },
      { id: 3, title: "Sharma-Kapoor Wedding", date: "2025-06-10", status: "upcoming" }
    ],
    recentInquiries: [
      { id: 1, name: "Arjun Patel", email: "arjun@example.com", subject: "Corporate Event Inquiry", date: "2025-05-14", status: "new" },
      { id: 2, name: "Priya Shah", email: "priya@example.com", subject: "Wedding Planning", date: "2025-05-12", status: "contacted" }
    ],
    contentStats: {
      services: 5,
      galleryItems: 48,
      testimonials: 18,
      blogPosts: 12
    }
  };
  
  // Use actual data or fallback
  const displayData = dashboardData || fallbackData;

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 md:gap-8 mb-8">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Events Completed</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayData.stats.eventsCompleted}</div>
              <p className="text-xs text-neutral-500">+12% from last year</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Satisfied Clients</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayData.stats.satisfiedClients}</div>
              <p className="text-xs text-neutral-500">99% satisfaction rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">This Month's Inquiries</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayData.stats.inquiriesThisMonth}</div>
              <p className="text-xs text-neutral-500">+8% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayData.stats.revenueGrowth}%</div>
              <p className="text-xs text-neutral-500">Year over year</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">Recent Events</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{displayData.contentStats.services}</div>
                    <Link href="/admin/services" className="text-xs text-primary hover:underline">
                      Manage Services
                    </Link>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Gallery Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{displayData.contentStats.galleryItems}</div>
                    <Link href="/admin/gallery" className="text-xs text-primary hover:underline">
                      Manage Gallery
                    </Link>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{displayData.contentStats.testimonials}</div>
                    <Link href="/admin/testimonials" className="text-xs text-primary hover:underline">
                      Manage Testimonials
                    </Link>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{displayData.contentStats.blogPosts}</div>
                    <Link href="/admin/blog" className="text-xs text-primary hover:underline">
                      Manage Blog
                    </Link>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Fast access to common tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/admin/content">
                        <div className="p-4 border rounded-lg hover:bg-neutral-50 transition-colors text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-neutral-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span className="text-sm font-medium">Edit Content</span>
                        </div>
                      </Link>
                      
                      <Link href="/admin/gallery">
                        <div className="p-4 border rounded-lg hover:bg-neutral-50 transition-colors text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-neutral-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium">Add Media</span>
                        </div>
                      </Link>
                      
                      <Link href="/admin/events">
                        <div className="p-4 border rounded-lg hover:bg-neutral-50 transition-colors text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-neutral-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium">Add Event</span>
                        </div>
                      </Link>
                      
                      <Link href="/admin/inquiries">
                        <div className="p-4 border rounded-lg hover:bg-neutral-50 transition-colors text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-neutral-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium">Inbox</span>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>CMS Tips</CardTitle>
                    <CardDescription>Get the most out of your admin panel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Upload optimized images (under 2MB) for better performance</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Update your content regularly for better SEO</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Respond to inquiries within 24 hours for best results</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">Use high-quality images for gallery and testimonials</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                  <CardDescription>Your latest event management activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-neutral-50 p-4 text-sm font-medium text-neutral-500">
                      <div className="col-span-5">Event</div>
                      <div className="col-span-3">Date</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    <div className="divide-y">
                      {isLoading ? (
                        Array(3).fill(0).map((_, i) => (
                          <div key={i} className="grid grid-cols-12 items-center p-4 text-sm">
                            <div className="col-span-5 h-4 animate-pulse rounded bg-neutral-200"></div>
                            <div className="col-span-3 h-4 animate-pulse rounded bg-neutral-200"></div>
                            <div className="col-span-2 h-4 animate-pulse rounded bg-neutral-200"></div>
                            <div className="col-span-2 h-4 animate-pulse rounded bg-neutral-200"></div>
                          </div>
                        ))
                      ) : (
                        displayData.recentEvents.map((event) => (
                          <div key={event.id} className="grid grid-cols-12 items-center p-4 text-sm">
                            <div className="col-span-5 font-medium">{event.title}</div>
                            <div className="col-span-3 text-neutral-500">{new Date(event.date).toLocaleDateString()}</div>
                            <div className="col-span-2">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                event.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : event.status === 'upcoming' 
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {event.status}
                              </span>
                            </div>
                            <div className="col-span-2 flex space-x-2">
                              <button className="text-neutral-500 hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button className="text-neutral-500 hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Link href="/admin/events">
                      <button className="text-sm font-medium text-primary hover:underline">
                        View All Events
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inquiries" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                  <CardDescription>Recent customer inquiries needing attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-neutral-50 p-4 text-sm font-medium text-neutral-500">
                      <div className="col-span-3">Name</div>
                      <div className="col-span-3">Email</div>
                      <div className="col-span-4">Subject</div>
                      <div className="col-span-2">Status</div>
                    </div>
                    <div className="divide-y">
                      {isLoading ? (
                        Array(3).fill(0).map((_, i) => (
                          <div key={i} className="grid grid-cols-12 items-center p-4 text-sm">
                            <div className="col-span-3 h-4 animate-pulse rounded bg-neutral-200"></div>
                            <div className="col-span-3 h-4 animate-pulse rounded bg-neutral-200"></div>
                            <div className="col-span-4 h-4 animate-pulse rounded bg-neutral-200"></div>
                            <div className="col-span-2 h-4 animate-pulse rounded bg-neutral-200"></div>
                          </div>
                        ))
                      ) : (
                        displayData.recentInquiries.map((inquiry) => (
                          <div key={inquiry.id} className="grid grid-cols-12 items-center p-4 text-sm">
                            <div className="col-span-3 font-medium">{inquiry.name}</div>
                            <div className="col-span-3 text-neutral-500">{inquiry.email}</div>
                            <div className="col-span-4">{inquiry.subject}</div>
                            <div className="col-span-2">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                inquiry.status === 'new' 
                                  ? 'bg-red-100 text-red-800' 
                                  : inquiry.status === 'contacted' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {inquiry.status}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Link href="/admin/inquiries">
                      <button className="text-sm font-medium text-primary hover:underline">
                        View All Inquiries
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;