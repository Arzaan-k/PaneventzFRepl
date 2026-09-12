import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

// Public Pages (Lazy Loaded for optimal performance)
const HomePage = lazy(() => import("@/pages/HomePage"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const MediaPage = lazy(() => import("@/pages/MediaPage"));
const EventDetailPage = lazy(() => import("@/pages/EventDetailPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogDetailPage = lazy(() => import("@/pages/BlogDetailPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Admin Pages (Lazy Loaded)
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const EventManager = lazy(() => import("@/pages/admin/EventManager"));
const ContentManager = lazy(() => import("@/pages/admin/ContentManager"));
const Statistics = lazy(() => import("@/pages/admin/Statistics"));
const Services = lazy(() => import("@/pages/admin/Services"));
const Team = lazy(() => import("@/pages/admin/Team"));
const Inquiries = lazy(() => import("@/pages/admin/Inquiries"));
const Testimonials = lazy(() => import("@/pages/admin/Testimonials"));
const Settings = lazy(() => import("@/pages/admin/Settings"));
const Blog = lazy(() => import("@/pages/admin/Blog"));
const EnhancedGalleryManager = lazy(() => import("@/pages/admin/EnhancedGalleryManager"));

// Luxury Suspense Loading Fallback
function LuxuryPageLoader() {
  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E8B923]/10 blur-[120px] rounded-full"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-[#E8B923]/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-t-[#E8B923] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-3 rounded-full border-2 border-t-[#E6193C] border-r-transparent border-b-transparent border-l-transparent animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
        </div>
        
        <div className="font-playfair text-xl font-bold tracking-widest text-gradient-gold uppercase">
          Pan Eventz
        </div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mt-2">
          Orchestrating Grandeur...
        </p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LuxuryPageLoader />}>
      <Switch>
        {/* Public Routes */}
        <Route path="/" component={HomePage} />
        <Route path="/services/:serviceType?" component={ServicePage} />
        <Route path="/media" component={MediaPage} />
        <Route path="/event/:slug" component={EventDetailPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogDetailPage} />
        <Route path="/contact" component={ContactPage} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={EventManager} />
        <Route path="/admin/statistics" component={Statistics} />
        <Route path="/admin/content" component={ContentManager} />
        <Route path="/admin/services" component={Services} />
        <Route path="/admin/events" component={EventManager} />
        <Route path="/admin/gallery" component={EnhancedGalleryManager} />
        <Route path="/admin/blog" component={Blog} />
        <Route path="/admin/team" component={Team} />
        <Route path="/admin/inquiries" component={Inquiries} />
        <Route path="/admin/testimonials" component={Testimonials} />
        <Route path="/admin/settings" component={Settings} />
        
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <FloatingWhatsApp />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
