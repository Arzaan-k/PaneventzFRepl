import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ServicePage from "@/pages/ServicePage";
import GalleryPage from "@/pages/GalleryPage";
import AboutPage from "@/pages/AboutPage";
import BlogPage from "@/pages/BlogPage";
import ContactPage from "@/pages/ContactPage";
import Dashboard from "@/pages/admin/Dashboard";
import EventManager from "@/pages/admin/EventManager";
import ContentManager from "@/pages/admin/ContentManager";
import GalleryManager from "@/pages/admin/GalleryManager";
import Login from "@/pages/admin/Login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/services/:serviceType?" component={ServicePage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/contact" component={ContactPage} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/login" component={Login} />
      <Route path="/admin/events" component={EventManager} />
      <Route path="/admin/content" component={ContentManager} />
      <Route path="/admin/gallery" component={GalleryManager} />
      
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
