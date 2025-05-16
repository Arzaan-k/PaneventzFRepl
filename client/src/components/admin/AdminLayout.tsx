import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import AdminSidebar from "./AdminSidebar";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

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
  const { user, isLoading, isAuthenticated } = useAuth();
  
  // Check for authentication
  useEffect(() => {
    if (requireAuth && !isLoading) {
      const token = localStorage.getItem('adminToken');
      if (!token && !isAuthenticated) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the admin panel",
          variant: "destructive",
        });
        navigate('/admin/login');
      }
    }
  }, [requireAuth, navigate, toast, isLoading, isAuthenticated]);

  // Set document title
  useEffect(() => {
    document.title = `${title} - Pan Eventz Admin`;
  }, [title]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col sm:flex-row">
      {/* Admin Sidebar - fixed position on mobile when open */}
      <div className={`${isMobile ? 'fixed inset-0 z-50 bg-black/50' : ''} ${isMobile && !sidebarOpen ? 'hidden' : ''}`}
           onClick={isMobile ? () => setSidebarOpen(false) : undefined}>
        <div onClick={e => e.stopPropagation()}>
          <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isMobile && sidebarOpen ? 'opacity-25' : 'opacity-100'}`}>
        {/* Top Bar */}
        <div className="bg-white h-16 flex items-center justify-between px-4 border-b sticky top-0 z-10 shadow-sm">
          <div className="flex items-center">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            )}
            
            <h1 className="text-xl font-bold truncate max-w-[200px] sm:max-w-none">{title}</h1>
          </div>
          
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
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={handleLogout}
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {user && user.username ? user.username.charAt(0).toUpperCase() : 'A'}
                </div>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-3 sm:p-6 overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;