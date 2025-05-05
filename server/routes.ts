import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as schema from "@shared/schema";
import jwt from "jsonwebtoken";
import upload from "./fileUpload";
import * as path from "path";
import * as fs from "fs";
import express from "express";

// JWT secret 
const JWT_SECRET = process.env.JWT_SECRET || "pan-eventz-secret-key";

// Authentication middleware
const authenticateToken = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // API prefix
  const apiPrefix = '/api';
  
  // Serve uploaded files
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));
  
  // Public routes
  // Slides
  app.get(`${apiPrefix}/slides`, async (req, res) => {
    try {
      const slides = await storage.getSlides();
      res.json(slides);
    } catch (error) {
      console.error('Error fetching slides:', error);
      res.status(500).json({ message: 'Failed to fetch slides' });
    }
  });
  
  // Services
  app.get(`${apiPrefix}/services`, async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ message: 'Failed to fetch services' });
    }
  });
  
  app.get(`${apiPrefix}/services/:slug`, async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      console.error('Error fetching service:', error);
      res.status(500).json({ message: 'Failed to fetch service' });
    }
  });
  
  // Gallery
  app.get(`${apiPrefix}/gallery`, async (req, res) => {
    try {
      const category = req.query.category as string;
      const gallery = await storage.getGalleryItems(category);
      res.json(gallery);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      res.status(500).json({ message: 'Failed to fetch gallery' });
    }
  });
  
  app.get(`${apiPrefix}/gallery/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid gallery item ID' });
      }
      
      const item = await storage.getGalleryItem(id);
      if (!item) {
        return res.status(404).json({ message: 'Gallery item not found' });
      }
      
      res.json(item);
    } catch (error) {
      console.error('Error fetching gallery item:', error);
      res.status(500).json({ message: 'Failed to fetch gallery item' });
    }
  });
  
  // Technologies
  app.get(`${apiPrefix}/technologies`, async (req, res) => {
    try {
      const technologies = await storage.getTechnologies();
      res.json(technologies);
    } catch (error) {
      console.error('Error fetching technologies:', error);
      res.status(500).json({ message: 'Failed to fetch technologies' });
    }
  });
  
  // Testimonials
  app.get(`${apiPrefix}/testimonials`, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      res.status(500).json({ message: 'Failed to fetch testimonials' });
    }
  });
  
  // About
  app.get(`${apiPrefix}/about`, async (req, res) => {
    try {
      const about = await storage.getAbout();
      res.json(about);
    } catch (error) {
      console.error('Error fetching about:', error);
      res.status(500).json({ message: 'Failed to fetch about' });
    }
  });
  
  app.get(`${apiPrefix}/about/full`, async (req, res) => {
    try {
      const about = await storage.getFullAbout();
      res.json(about);
    } catch (error) {
      console.error('Error fetching full about:', error);
      res.status(500).json({ message: 'Failed to fetch full about' });
    }
  });
  
  // Stats
  app.get(`${apiPrefix}/stats`, async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ message: 'Failed to fetch stats' });
    }
  });
  
  // Events
  app.get(`${apiPrefix}/events`, async (req, res) => {
    try {
      const status = req.query.status as string;
      const events = await storage.getEvents(status);
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Failed to fetch events' });
    }
  });
  
  app.get(`${apiPrefix}/events/:slug`, async (req, res) => {
    try {
      const event = await storage.getEventBySlug(req.params.slug);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Failed to fetch event' });
    }
  });

  // Blog
  app.get(`${apiPrefix}/blog`, async (req, res) => {
    try {
      const category = req.query.category as string;
      const posts = await storage.getBlogPosts(category);
      res.json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  });
  
  app.get(`${apiPrefix}/blog/:slug`, async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ message: 'Failed to fetch blog post' });
    }
  });
  
  // Contact form submission
  app.post(`${apiPrefix}/contact`, async (req, res) => {
    try {
      const submission = schema.insertContactSubmissionSchema.parse(req.body);
      const newSubmission = await storage.submitContactForm(submission);
      res.status(201).json(newSubmission);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(400).json({ message: 'Failed to submit contact form', error });
    }
  });
  
  // Authentication routes
  app.post(`${apiPrefix}/auth/login`, async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      const user = await storage.validateUser(username, password);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '8h' }
      );
      
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'An error occurred during login' });
    }
  });
  
  // Protected Admin Routes
  // Dashboard data
  app.get(`${apiPrefix}/admin/dashboard`, authenticateToken, async (req, res) => {
    try {
      const dashboardData = await storage.getDashboardData();
      res.json(dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ message: 'Failed to fetch dashboard data' });
    }
  });
  
  // Admin services management
  app.post(`${apiPrefix}/admin/services`, authenticateToken, async (req, res) => {
    try {
      const { service, features, processSteps } = req.body;
      const newService = await storage.createService(service, features, processSteps);
      res.status(201).json(newService);
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(400).json({ message: 'Failed to create service', error });
    }
  });
  
  app.put(`${apiPrefix}/admin/services/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid service ID' });
      }
      
      const service = req.body;
      const updatedService = await storage.updateService(id, service);
      res.json(updatedService);
    } catch (error) {
      console.error('Error updating service:', error);
      res.status(400).json({ message: 'Failed to update service', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/services/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid service ID' });
      }
      
      await storage.deleteService(id);
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ message: 'Failed to delete service' });
    }
  });
  
  // Admin gallery management
  app.post(`${apiPrefix}/admin/gallery`, authenticateToken, async (req, res) => {
    try {
      const item = schema.insertGalleryItemSchema.parse(req.body);
      const newItem = await storage.createGalleryItem(item);
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error creating gallery item:', error);
      res.status(400).json({ message: 'Failed to create gallery item', error });
    }
  });
  
  app.put(`${apiPrefix}/admin/gallery/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid gallery item ID' });
      }
      
      const item = req.body;
      const updatedItem = await storage.updateGalleryItem(id, item);
      res.json(updatedItem);
    } catch (error) {
      console.error('Error updating gallery item:', error);
      res.status(400).json({ message: 'Failed to update gallery item', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/gallery/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid gallery item ID' });
      }
      
      await storage.deleteGalleryItem(id);
      res.json({ message: 'Gallery item deleted successfully' });
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      res.status(500).json({ message: 'Failed to delete gallery item' });
    }
  });
  
  // File upload route
  app.post(`${apiPrefix}/upload`, authenticateToken, upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      // Return the file path that can be stored in the database
      const filePath = `/uploads/${req.file.filename}`;
      
      res.json({
        message: 'File uploaded successfully',
        filePath,
        originalName: req.file.originalname,
        size: req.file.size
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Failed to upload file' });
    }
  });
  
  // Admin slider management
  app.get(`${apiPrefix}/admin/slides`, authenticateToken, async (req, res) => {
    try {
      const slides = await storage.getAllSlides();
      res.json(slides);
    } catch (error) {
      console.error('Error fetching all slides:', error);
      res.status(500).json({ message: 'Failed to fetch all slides' });
    }
  });
  
  app.post(`${apiPrefix}/admin/slides`, authenticateToken, async (req, res) => {
    try {
      const slide = schema.insertSlideSchema.parse(req.body);
      const newSlide = await storage.createSlide(slide);
      res.status(201).json(newSlide);
    } catch (error) {
      console.error('Error creating slide:', error);
      res.status(400).json({ message: 'Failed to create slide', error });
    }
  });
  
  app.put(`${apiPrefix}/admin/slides/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid slide ID' });
      }
      
      const slide = req.body;
      const updatedSlide = await storage.updateSlide(id, slide);
      res.json(updatedSlide);
    } catch (error) {
      console.error('Error updating slide:', error);
      res.status(400).json({ message: 'Failed to update slide', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/slides/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid slide ID' });
      }
      
      await storage.deleteSlide(id);
      res.json({ message: 'Slide deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      res.status(500).json({ message: 'Failed to delete slide' });
    }
  });
  
  // Admin technologies management
  app.get(`${apiPrefix}/admin/technologies`, authenticateToken, async (req, res) => {
    try {
      const technologies = await storage.getAllTechnologies();
      res.json(technologies);
    } catch (error) {
      console.error('Error fetching all technologies:', error);
      res.status(500).json({ message: 'Failed to fetch all technologies' });
    }
  });
  
  app.post(`${apiPrefix}/admin/technologies`, authenticateToken, async (req, res) => {
    try {
      const technology = schema.insertTechnologySchema.parse(req.body);
      const newTechnology = await storage.createTechnology(technology);
      res.status(201).json(newTechnology);
    } catch (error) {
      console.error('Error creating technology:', error);
      res.status(400).json({ message: 'Failed to create technology', error });
    }
  });
  
  app.put(`${apiPrefix}/admin/technologies/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid technology ID' });
      }
      
      const technology = req.body;
      const updatedTechnology = await storage.updateTechnology(id, technology);
      res.json(updatedTechnology);
    } catch (error) {
      console.error('Error updating technology:', error);
      res.status(400).json({ message: 'Failed to update technology', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/technologies/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid technology ID' });
      }
      
      await storage.deleteTechnology(id);
      res.json({ message: 'Technology deleted successfully' });
    } catch (error) {
      console.error('Error deleting technology:', error);
      res.status(500).json({ message: 'Failed to delete technology' });
    }
  });
  
  // Admin testimonials management
  app.get(`${apiPrefix}/admin/testimonials`, authenticateToken, async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error('Error fetching all testimonials:', error);
      res.status(500).json({ message: 'Failed to fetch all testimonials' });
    }
  });
  
  app.post(`${apiPrefix}/admin/testimonials`, authenticateToken, async (req, res) => {
    try {
      const testimonial = schema.insertTestimonialSchema.parse(req.body);
      const newTestimonial = await storage.createTestimonial(testimonial);
      res.status(201).json(newTestimonial);
    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(400).json({ message: 'Failed to create testimonial', error });
    }
  });
  
  app.put(`${apiPrefix}/admin/testimonials/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid testimonial ID' });
      }
      
      const testimonial = req.body;
      const updatedTestimonial = await storage.updateTestimonial(id, testimonial);
      res.json(updatedTestimonial);
    } catch (error) {
      console.error('Error updating testimonial:', error);
      res.status(400).json({ message: 'Failed to update testimonial', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/testimonials/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid testimonial ID' });
      }
      
      await storage.deleteTestimonial(id);
      res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      res.status(500).json({ message: 'Failed to delete testimonial' });
    }
  });
  
  // Admin about management
  app.put(`${apiPrefix}/admin/about`, authenticateToken, async (req, res) => {
    try {
      const about = schema.insertAboutSchema.parse(req.body);
      const updatedAbout = await storage.updateAbout(about);
      res.json(updatedAbout);
    } catch (error) {
      console.error('Error updating about:', error);
      res.status(400).json({ message: 'Failed to update about', error });
    }
  });
  
  // Admin team management
  app.post(`${apiPrefix}/admin/team`, authenticateToken, async (req, res) => {
    try {
      const member = req.body;
      const newMember = await storage.createTeamMember(member);
      res.status(201).json(newMember);
    } catch (error) {
      console.error('Error creating team member:', error);
      res.status(400).json({ message: 'Failed to create team member', error });
    }
  });
  
  app.put(`${apiPrefix}/admin/team/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid team member ID' });
      }
      
      const member = req.body;
      const updatedMember = await storage.updateTeamMember(id, member);
      res.json(updatedMember);
    } catch (error) {
      console.error('Error updating team member:', error);
      res.status(400).json({ message: 'Failed to update team member', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/team/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid team member ID' });
      }
      
      await storage.deleteTeamMember(id);
      res.json({ message: 'Team member deleted successfully' });
    } catch (error) {
      console.error('Error deleting team member:', error);
      res.status(500).json({ message: 'Failed to delete team member' });
    }
  });
  
  // Admin values management
  app.post(`${apiPrefix}/admin/values`, authenticateToken, async (req, res) => {
    try {
      const value = req.body;
      const newValue = await storage.createValue(value);
      res.status(201).json(newValue);
    } catch (error) {
      console.error('Error creating value:', error);
      res.status(400).json({ message: 'Failed to create value', error });
    }
  });
  
  app.put(`${apiPrefix}/admin/values/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid value ID' });
      }
      
      const value = req.body;
      const updatedValue = await storage.updateValue(id, value);
      res.json(updatedValue);
    } catch (error) {
      console.error('Error updating value:', error);
      res.status(400).json({ message: 'Failed to update value', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/values/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid value ID' });
      }
      
      await storage.deleteValue(id);
      res.json({ message: 'Value deleted successfully' });
    } catch (error) {
      console.error('Error deleting value:', error);
      res.status(500).json({ message: 'Failed to delete value' });
    }
  });
  
  // Admin stats management
  app.post(`${apiPrefix}/admin/stats`, authenticateToken, async (req, res) => {
    try {
      const stat = schema.insertStatSchema.parse(req.body);
      const newStat = await storage.createStat(stat);
      res.status(201).json(newStat);
    } catch (error) {
      console.error('Error creating stat:', error);
      res.status(400).json({ message: 'Failed to create stat', error });
    }
  });
  
  app.put(`${apiPrefix}/admin/stats/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid stat ID' });
      }
      
      const stat = req.body;
      const updatedStat = await storage.updateStat(id, stat);
      res.json(updatedStat);
    } catch (error) {
      console.error('Error updating stat:', error);
      res.status(400).json({ message: 'Failed to update stat', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/stats/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid stat ID' });
      }
      
      await storage.deleteStat(id);
      res.json({ message: 'Stat deleted successfully' });
    } catch (error) {
      console.error('Error deleting stat:', error);
      res.status(500).json({ message: 'Failed to delete stat' });
    }
  });
  
  // Admin blog management
  app.post(`${apiPrefix}/admin/blog`, authenticateToken, async (req, res) => {
    try {
      const post = schema.insertBlogPostSchema.parse(req.body);
      const newPost = await storage.createBlogPost(post);
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(400).json({ message: 'Failed to create blog post', error });
    }
  });
  
  app.put(`${apiPrefix}/admin/blog/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid blog post ID' });
      }
      
      const post = req.body;
      const updatedPost = await storage.updateBlogPost(id, post);
      res.json(updatedPost);
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(400).json({ message: 'Failed to update blog post', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/blog/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid blog post ID' });
      }
      
      await storage.deleteBlogPost(id);
      res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  });
  
  // Admin contact submissions management
  app.get(`${apiPrefix}/admin/contact`, authenticateToken, async (req, res) => {
    try {
      const status = req.query.status as string;
      const submissions = await storage.getContactSubmissions(status);
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      res.status(500).json({ message: 'Failed to fetch contact submissions' });
    }
  });
  
  app.get(`${apiPrefix}/admin/contact/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid submission ID' });
      }
      
      const submission = await storage.getContactSubmission(id);
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      
      res.json(submission);
    } catch (error) {
      console.error('Error fetching contact submission:', error);
      res.status(500).json({ message: 'Failed to fetch contact submission' });
    }
  });
  
  app.put(`${apiPrefix}/admin/contact/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid submission ID' });
      }
      
      const submission = req.body;
      const updatedSubmission = await storage.updateContactSubmission(id, submission);
      res.json(updatedSubmission);
    } catch (error) {
      console.error('Error updating contact submission:', error);
      res.status(400).json({ message: 'Failed to update contact submission', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/contact/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid submission ID' });
      }
      
      await storage.deleteContactSubmission(id);
      res.json({ message: 'Contact submission deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact submission:', error);
      res.status(500).json({ message: 'Failed to delete contact submission' });
    }
  });
  
  // Admin events management
  app.get(`${apiPrefix}/admin/events`, authenticateToken, async (req, res) => {
    try {
      const status = req.query.status as string;
      const events = await storage.getEvents(status);
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Failed to fetch events' });
    }
  });
  
  app.get(`${apiPrefix}/admin/events/:slug`, authenticateToken, async (req, res) => {
    try {
      const event = await storage.getEventBySlug(req.params.slug);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Failed to fetch event' });
    }
  });
  
  app.post(`${apiPrefix}/admin/events`, authenticateToken, async (req, res) => {
    try {
      const event = schema.insertEventSchema.parse(req.body);
      const newEvent = await storage.createEvent(event);
      res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(400).json({ message: 'Failed to create event', error });
    }
  });
  
  app.put(`${apiPrefix}/admin/events/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
      
      const event = req.body;
      const updatedEvent = await storage.updateEvent(id, event);
      res.json(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(400).json({ message: 'Failed to update event', error });
    }
  });
  
  app.delete(`${apiPrefix}/admin/events/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
      
      await storage.deleteEvent(id);
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Failed to delete event' });
    }
  });

  return httpServer;
}
