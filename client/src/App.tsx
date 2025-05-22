import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ServicePage from "@/pages/ServicePage";
import GalleryPage from "@/pages/GalleryPage";
import EventDetailPage from "@/pages/EventDetailPage";
import AboutPage from "@/pages/AboutPage";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import EventManager from "@/pages/admin/EventManager";
import ContentManager from "@/pages/admin/ContentManager";
import GalleryManager from "@/pages/admin/GalleryManager";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={HomePage} />
      <Route path="/services/:serviceType?" component={ServicePage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/event/:slug" component={EventDetailPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/contact" component={ContactPage} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={EventManager} />
      <Route path="/admin/events" component={EventManager} />
      <Route path="/admin/content" component={ContentManager} />
      <Route path="/admin/gallery" component={GalleryManager} />
      <Route path="/admin/services" component={ContentManager} />
      <Route path="/admin/blog" component={ContentManager} />
      <Route path="/admin/settings" component={ContentManager} />
      <Route path="/admin/statistics" component={EventManager} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
