import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Calendar,
  Image,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const AdminLayout = ({ children, currentPage }: AdminLayoutProps) => {
  const [, setLocation] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setLocation("/admin/login");
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-30">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-2"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <Link href="/admin" className="flex items-center">
            <span className="text-primary font-bold text-xl font-montserrat">
              Pan<span className="text-secondary">Eventz</span>
            </span>
            <span className="ml-2 text-sm text-neutral-500">Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm">
              View Website
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLocation("/admin/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r w-64 flex-shrink-0 fixed md:relative h-[calc(100vh-4rem)] z-20 transition-all duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:w-20 md:translate-x-0"
          }`}
        >
          <ScrollArea className="h-full">
            <div className="p-4">
              <nav className="space-y-1">
                <Link href="/admin">
                  <Button
                    variant={currentPage === "dashboard" ? "default" : "ghost"}
                    className={`w-full justify-start ${!isSidebarOpen && "md:justify-center"}`}
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    {(isSidebarOpen || isMobile) && <span>Dashboard</span>}
                  </Button>
                </Link>
                <Link href="/admin/events">
                  <Button
                    variant={currentPage === "events" ? "default" : "ghost"}
                    className={`w-full justify-start ${!isSidebarOpen && "md:justify-center"}`}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    {(isSidebarOpen || isMobile) && <span>Events</span>}
                  </Button>
                </Link>
                <Link href="/admin/gallery">
                  <Button
                    variant={currentPage === "gallery" ? "default" : "ghost"}
                    className={`w-full justify-start ${!isSidebarOpen && "md:justify-center"}`}
                  >
                    <Image className="mr-2 h-5 w-5" />
                    {(isSidebarOpen || isMobile) && <span>Gallery</span>}
                  </Button>
                </Link>
                <Link href="/admin/content">
                  <Button
                    variant={currentPage === "content" ? "default" : "ghost"}
                    className={`w-full justify-start ${!isSidebarOpen && "md:justify-center"}`}
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    {(isSidebarOpen || isMobile) && <span>Content</span>}
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button
                    variant={currentPage === "settings" ? "default" : "ghost"}
                    className={`w-full justify-start ${!isSidebarOpen && "md:justify-center"}`}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    {(isSidebarOpen || isMobile) && <span>Settings</span>}
                  </Button>
                </Link>
              </nav>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {isClient && children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
