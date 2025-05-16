import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import AdminSidebar from "./AdminSidebar";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  requireAuth?: boolean;
}

const AdminLayout = ({ children, title = "Dashboard", requireAuth = true }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, navigate] = useLocation();
  const isMobile = useMobile();
  const { toast } = useToast();
  
  // Check for authentication
  useEffect(() => {
    if (requireAuth) {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the admin panel",
          variant: "destructive",
        });
        navigate('/admin/login');
      }
    }
  }, [requireAuth, navigate, toast]);

  // Set document title
  useEffect(() => {
    document.title = `${title} - Pan Eventz Admin`;
  }, [title]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Admin Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content */}
      <div className={`admin-content transition-all duration-300 ${isMobile && sidebarOpen ? 'opacity-25' : 'opacity-100'}`}>
        {/* Top Bar */}
        <div className="bg-white h-16 flex items-center justify-between px-4 border-b">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          )}
          
          <h1 className={`text-xl font-bold ${isMobile ? 'ml-4' : ''}`}>{title}</h1>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => navigate('/')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              View Site
            </Button>
            
            <div className="relative flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;