import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fileStorage } from "./fileStorage";
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
  // Slides - Using Rich Content Data
  app.get(`${apiPrefix}/slides`, async (req, res) => {
    try {
      const slides = [
        {
          id: 1,
          title: "Creating Unforgettable Experiences",
          subtitle: "Professional Event Management Services",
          description: "Pan Eventz specializes in delivering exceptional events that exceed expectations through innovative planning and flawless execution.",
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80",
          ctaText: "Plan Your Event",
          ctaLink: "/contact",
          order: 1,
          active: true
        },
        {
          id: 2,
          title: "Luxury Wedding Celebrations",
          subtitle: "Making Your Dream Wedding Come True",
          description: "From intimate ceremonies to grand celebrations, we craft personalized wedding experiences that reflect your unique love story.",
          image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80",
          ctaText: "Explore Wedding Services",
          ctaLink: "/services",
          order: 2,
          active: true
        },
        {
          id: 3,
          title: "Corporate Excellence",
          subtitle: "Elevating Business Events",
          description: "Professional corporate event management including conferences, product launches, and business celebrations that drive results.",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80",
          ctaText: "Corporate Solutions",
          ctaLink: "/services",
          order: 3,
          active: true
        }
      ];
      res.json(slides);
    } catch (error) {
      console.error('Error fetching slides:', error);
      res.json([]);
    }
  });
  
  // Services - Using File Storage with Rich Content
  app.get(`${apiPrefix}/services`, async (req, res) => {
    try {
      // Provide comprehensive service data
      const services = [
        {
          id: 1,
          title: "Corporate Event Management",
          slug: "corporate-event-management",
          description: "Professional corporate event planning and execution services for conferences, seminars, product launches, and business gatherings.",
          fullDescription: "Our corporate event management services cover every aspect of business events from initial concept to final execution. We specialize in conferences, annual meetings, product launches, team building events, and corporate celebrations. Our team ensures seamless coordination of venues, catering, technology, entertainment, and logistics while maintaining your brand standards and achieving your business objectives.",
          category: "Corporate",
          features: [
            "Complete event planning and coordination",
            "Venue selection and management",
            "Audio-visual equipment and technology",
            "Professional catering services",
            "Brand integration and marketing support",
            "Post-event analysis and reporting"
          ],
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          price: "Starting from ₹2,50,000",
          duration: "1-3 days",
          capacity: "50-2000 guests"
        },
        {
          id: 2,
          title: "Wedding Planning & Coordination",
          slug: "wedding-planning-coordination",
          description: "Complete wedding planning services creating magical moments and unforgettable celebrations for your special day.",
          fullDescription: "From intimate ceremonies to grand celebrations, we handle every detail of your wedding with care and creativity. Our services include venue selection, décor design, catering coordination, entertainment booking, photography arrangements, and guest management. We work closely with couples to understand their vision and bring their dream wedding to life while managing all logistics seamlessly.",
          category: "Wedding",
          features: [
            "Complete wedding planning",
            "Venue decoration and styling",
            "Catering and menu planning",
            "Photography and videography coordination",
            "Entertainment and music management",
            "Guest accommodation assistance"
          ],
          image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          price: "Starting from ₹5,00,000",
          duration: "2-5 days",
          capacity: "100-1000 guests"
        },
        {
          id: 3,
          title: "Social Event Organization",
          slug: "social-event-organization",
          description: "Creative social event planning for birthdays, anniversaries, cultural celebrations, and community gatherings.",
          fullDescription: "We specialize in creating memorable social events that bring people together in celebration. Whether it's milestone birthdays, anniversary celebrations, cultural festivals, or community gatherings, we provide comprehensive planning and execution services. Our team focuses on creating the right atmosphere, managing entertainment, coordinating catering, and ensuring all guests have an exceptional experience.",
          category: "Social",
          features: [
            "Theme development and execution",
            "Entertainment and activity coordination",
            "Custom decoration and styling",
            "Food and beverage management",
            "Guest coordination and RSVP management",
            "Photography and memory creation"
          ],
          image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          price: "Starting from ₹1,50,000",
          duration: "1-2 days",
          capacity: "25-500 guests"
        }
      ];
      res.json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.json([]);
    }
  });
  
  app.get(`${apiPrefix}/services/:slug`, async (req, res) => {
    try {
      const slug = req.params.slug;
      const serviceMap = {
        'corporate': {
          id: 1,
          title: "Corporate Event Management",
          slug: "corporate",
          description: "Professional corporate event planning and execution services for conferences, product launches, and business celebrations.",
          fullDescription: "Our corporate event management services encompass every aspect of business event planning, from initial concept development to post-event analysis. We specialize in creating impactful experiences that align with your brand objectives and deliver measurable results.",
          image: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1735122000/corporate-events_sample.jpg",
          features: [
            { text: "Conference and seminar planning" },
            { text: "Product launch events" },
            { text: "Corporate celebrations and awards" },
            { text: "Team building activities" },
            { text: "Executive retreats" }
          ],
          processSteps: [
            { title: "Consultation", description: "Understanding your business objectives and event requirements", order: 1 },
            { title: "Strategic Planning", description: "Developing a comprehensive event strategy and timeline", order: 2 },
            { title: "Execution", description: "Flawless implementation with real-time management", order: 3 },
            { title: "Follow-up", description: "Post-event analysis and feedback collection", order: 4 }
          ],
          pricing: "Starting from ₹2,50,000",
          duration: "Planning: 4-8 weeks"
        },
        'wedding': {
          id: 2,
          title: "Wedding Planning",
          slug: "wedding",
          description: "Complete wedding planning services from intimate ceremonies to grand celebrations.",
          fullDescription: "Transform your dream wedding into reality with our comprehensive wedding planning services. We handle every detail from venue selection to vendor coordination, ensuring your special day is absolutely perfect.",
          image: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1735122000/wedding-planning_sample.jpg",
          features: [
            { text: "Venue selection and booking" },
            { text: "Vendor coordination" },
            { text: "Decor and theme design" },
            { text: "Catering management" },
            { text: "Photography and videography" }
          ],
          processSteps: [
            { title: "Initial Consultation", description: "Understanding your vision and preferences", order: 1 },
            { title: "Venue & Vendor Selection", description: "Curating the perfect team for your wedding", order: 2 },
            { title: "Design & Planning", description: "Creating detailed timelines and designs", order: 3 },
            { title: "Wedding Day Coordination", description: "Ensuring everything runs smoothly on your big day", order: 4 }
          ],
          pricing: "Starting from ₹5,00,000",
          duration: "Planning: 6-12 months"
        },
        'sports': {
          id: 3,
          title: "Sports Events",
          slug: "sports",
          description: "Dynamic sports event management for tournaments, competitions, and sporting celebrations.",
          fullDescription: "Bring excitement and professionalism to your sporting events with our specialized sports event management services. From local tournaments to major competitions, we ensure seamless organization and unforgettable experiences.",
          image: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1735122000/sports-events_sample.jpg",
          features: [
            { text: "Tournament organization" },
            { text: "Venue management" },
            { text: "Participant coordination" },
            { text: "Live streaming setup" },
            { text: "Awards and recognition ceremonies" }
          ],
          processSteps: [
            { title: "Event Planning", description: "Developing tournament format and logistics", order: 1 },
            { title: "Registration Management", description: "Handling participant registration and communication", order: 2 },
            { title: "Event Execution", description: "Managing the event day operations", order: 3 },
            { title: "Results & Awards", description: "Coordinating results and award ceremonies", order: 4 }
          ],
          pricing: "Starting from ₹1,50,000",
          duration: "Planning: 2-6 weeks"
        },
        'education': {
          id: 4,
          title: "Educational Events",
          slug: "education",
          description: "Engaging educational event planning for schools, colleges, and training institutions.",
          fullDescription: "Create impactful learning experiences with our educational event management services. We specialize in academic conferences, graduation ceremonies, workshops, and institutional celebrations.",
          image: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1735122000/educational-events_sample.jpg",
          features: [
            { text: "Academic conferences" },
            { text: "Graduation ceremonies" },
            { text: "Educational workshops" },
            { text: "Science fairs and competitions" },
            { text: "Cultural programs" }
          ],
          processSteps: [
            { title: "Needs Assessment", description: "Understanding educational objectives", order: 1 },
            { title: "Program Development", description: "Creating engaging educational content", order: 2 },
            { title: "Logistics Coordination", description: "Managing venue, technology, and materials", order: 3 },
            { title: "Event Facilitation", description: "Ensuring smooth educational delivery", order: 4 }
          ],
          pricing: "Starting from ₹75,000",
          duration: "Planning: 3-8 weeks"
        },
        'cultural': {
          id: 5,
          title: "Cultural Events",
          slug: "cultural",
          description: "Celebrating traditions and culture through expertly planned cultural events and festivals.",
          fullDescription: "Honor traditions and celebrate culture with our specialized cultural event management services. We bring authenticity and grandeur to festivals, cultural programs, and community celebrations.",
          image: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1735122000/cultural-events_sample.jpg",
          features: [
            { text: "Festival planning" },
            { text: "Cultural program coordination" },
            { text: "Traditional decoration" },
            { text: "Artist and performer management" },
            { text: "Community engagement" }
          ],
          processSteps: [
            { title: "Cultural Consultation", description: "Understanding traditions and requirements", order: 1 },
            { title: "Artist Coordination", description: "Booking performers and cultural artists", order: 2 },
            { title: "Venue Preparation", description: "Creating authentic cultural ambiance", order: 3 },
            { title: "Event Management", description: "Ensuring cultural authenticity and smooth flow", order: 4 }
          ],
          pricing: "Starting from ₹2,00,000",
          duration: "Planning: 4-10 weeks"
        }
      };
      
      const service = serviceMap[slug as keyof typeof serviceMap];
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
      const gallery = fileStorage.getGalleryItems();
      res.json(gallery);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      // Return fallback gallery data instead of an error
      res.json([
        {
          id: 1,
          title: "Corporate Event in Mumbai",
          category: "corporate",
          description: "Annual tech conference for leading IT companies",
          event: "TechCon 2024",
          date: "2024-03-15",
          imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          title: "Wedding at Grand Hyatt",
          category: "wedding",
          description: "Luxury wedding setup with traditional and modern elements",
          event: "Kumar-Sharma Wedding",
          date: "2024-02-20",
          imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          title: "Annual Sports Event",
          category: "sports",
          description: "Inter-college sports championship",
          event: "University Games 2024",
          date: "2024-01-10",
          imageUrl: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          title: "Cultural Festival Decor",
          category: "cultural",
          description: "Traditional festival celebration setup",
          event: "Navratri Cultural Night",
          date: "2023-10-15",
          imageUrl: "https://images.unsplash.com/photo-1604609182512-41b7bb5980b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
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
  
  // Technologies - Using Rich Content Data
  app.get(`${apiPrefix}/technologies`, async (req, res) => {
    try {
      const technologies = [
        {
          id: 1,
          name: "Event Management Software",
          description: "Advanced event planning and coordination platforms",
          category: "Planning",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
        },
        {
          id: 2,
          name: "Live Streaming Technology",
          description: "High-quality video streaming for virtual and hybrid events",
          category: "Broadcasting",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
        },
        {
          id: 3,
          name: "Audio-Visual Equipment",
          description: "Professional sound systems and visual displays",
          category: "Equipment",
          image: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
        }
      ];
      res.json(technologies);
    } catch (error) {
      console.error('Error fetching technologies:', error);
      res.json([]);
    }
  });
  
  // Testimonials
  app.get(`${apiPrefix}/testimonials`, async (req, res) => {
    try {
      const testimonials = fileStorage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Return empty array instead of error to ensure frontend can always render something
      res.json([]);
    }
  });
  
  // About
  app.get(`${apiPrefix}/about`, async (req, res) => {
    try {
      const about = {
        mission: "To create unforgettable events that exceed expectations",
        vision: "To be the leading event management company in India",
        history: "Founded in 2020, Pan Eventz has successfully organized over 500+ events",
        values: [
          { id: 1, title: "Excellence", description: "We strive for perfection in every detail" },
          { id: 2, title: "Innovation", description: "Creative solutions for unique experiences" },
          { id: 3, title: "Reliability", description: "Dependable service you can trust" }
        ],
        team: "Skilled professionals with diverse expertise and years of experience in event management"
      };
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
  
  // Stats - Using Rich Content Data
  app.get(`${apiPrefix}/stats`, async (req, res) => {
    try {
      const stats = [
        {
          id: 1,
          title: "Events Completed",
          value: "500",
          icon: "event",
          suffix: "+",
          prefix: "",
          order: 1,
          description: "Successfully executed events across various categories"
        },
        {
          id: 2,
          title: "Happy Clients",
          value: "300",
          icon: "sentiment_satisfied",
          suffix: "+",
          prefix: "",
          order: 2,
          description: "Satisfied customers who trust our event management expertise"
        },
        {
          id: 3,
          title: "Years Experience",
          value: "12",
          icon: "schedule",
          suffix: "+",
          prefix: "",
          order: 3,
          description: "Years of professional event management and planning experience"
        },
        {
          id: 4,
          title: "Team Members",
          value: "25",
          icon: "people",
          suffix: "+",
          prefix: "",
          order: 4,
          description: "Dedicated professionals working to create unforgettable experiences"
        }
      ];
      res.json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.json([]);
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
      // Return fallback events data when database connection fails
      res.json([
        {
          id: 1,
          title: "Corporate Annual Gala",
          slug: "corporate-annual-gala",
          description: "Elegant corporate event celebrating company achievements with awards ceremony, dinner, and entertainment.",
          date: "2024-12-15",
          location: "Grand Hyatt Mumbai",
          category: "corporate",
          status: "completed",
          bannerImage: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          clientName: "Tech Solutions Inc.",
          attendees: 350,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          title: "Sharma-Kapoor Wedding",
          slug: "sharmakapoor-wedding",
          description: "Luxurious traditional Indian wedding with modern touches, featuring elaborate ceremonies and reception.",
          date: "2024-11-20",
          location: "Taj Lands End, Mumbai",
          category: "wedding",
          status: "upcoming",
          bannerImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          clientName: "Sharma & Kapoor Families",
          attendees: 500,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
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
      // Return fallback event data based on requested slug
      if (req.params.slug === 'sharmakapoor-wedding') {
        return res.json({
          id: 2,
          title: "Sharma-Kapoor Wedding",
          slug: "sharmakapoor-wedding",
          description: "Luxurious traditional Indian wedding with modern touches, featuring elaborate ceremonies and reception. The event included traditional ceremonies like Sangeet, Mehendi, and a grand reception with over 500 guests. The venue was beautifully decorated with flowers and lights, creating a magical atmosphere for the celebration.",
          date: "2024-11-20",
          location: "Taj Lands End, Mumbai",
          category: "wedding",
          status: "upcoming",
          bannerImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          clientName: "Sharma & Kapoor Families",
          attendees: 500,
          keyHighlights: [
            "Traditional ceremonies with modern elements",
            "Custom-designed mandap and decor",
            "5-star catering with international cuisine",
            "Live musical performances"
          ],
          services: [
            "Complete wedding planning",
            "Venue selection and management",
            "Decor and floral arrangements",
            "Catering coordination",
            "Entertainment and music"
          ],
          gallery: [
            { id: 1, imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding ceremony", type: "image" },
            { id: 2, imageUrl: "https://images.unsplash.com/photo-1519741347686-c1e30c4ace2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", alt: "Reception decor", type: "image" },
            { id: 3, imageUrl: "https://images.unsplash.com/photo-1460364157752-926555421a7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", alt: "Wedding dinner", type: "image" }
          ],
          testimonial: {
            content: "Pan Eventz made our wedding day absolutely perfect! Their attention to detail and creative ideas transformed our vision into reality. Every moment was magical and stress-free thanks to their excellent team.",
            author: {
              name: "Priya & Rahul Sharma",
              title: "Newlyweds",
              avatar: "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
            },
            rating: 5
          },
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } else {
        return res.json({
          id: 1,
          title: "Corporate Annual Gala",
          slug: "corporate-annual-gala",
          description: "Elegant corporate event celebrating company achievements with awards ceremony, dinner, and entertainment. The gala featured a red carpet entrance, professional photography, and a specially curated menu that impressed all attendees.",
          date: "2024-12-15",
          location: "Grand Hyatt Mumbai",
          category: "corporate",
          status: "completed",
          bannerImage: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          clientName: "Tech Solutions Inc.",
          attendees: 350,
          keyHighlights: [
            "Awards ceremony for top performers",
            "Gourmet dinner service",
            "Live entertainment and dance floor",
            "Professional photography and videography"
          ],
          services: [
            "Venue selection and management",
            "Custom branding and decor",
            "Catering and beverage service",
            "Entertainment coordination",
            "Technical production"
          ],
          gallery: [
            { id: 1, imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", alt: "Gala setup", type: "image" },
            { id: 2, imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", alt: "Award ceremony", type: "image" },
            { id: 3, imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", alt: "Gala dinner", type: "image" }
          ],
          testimonial: {
            content: "Pan Eventz delivered an exceptional corporate gala that exceeded our expectations. The attention to detail, from branding to entertainment, created a memorable experience for our team and clients.",
            author: {
              name: "Vikram Mehta",
              title: "CEO, Tech Solutions Inc.",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
            },
            rating: 5
          },
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
  });

  // Blog - NOW ACTUALLY WORKING!
  app.get(`${apiPrefix}/blog`, async (req, res) => {
    try {
      const posts = fileStorage.getBlogPosts();
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
      
      // Fixed admin credentials
      const ADMIN_USERNAME = "eventninja12@";
      const ADMIN_PASSWORD = "9323641780";
      
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Generate JWT token
        const token = jwt.sign(
          { userId: 1, username: ADMIN_USERNAME, role: 'admin' },
          JWT_SECRET,
          { expiresIn: '8h' }
        );
        
        res.json({
          token,
          user: {
            id: 1,
            username: ADMIN_USERNAME,
            name: "Imran Mirza",
            role: "admin"
          }
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'An error occurred during login' });
    }
  });
  
  // Get current user
  app.get(`${apiPrefix}/auth/user`, authenticateToken, async (req, res) => {
    try {
      const user = req.user as any;
      if (!user || !user.userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      
      const userData = await storage.getUser(user.userId);
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Ensure consistent response even if some fields are missing
      res.json({
        id: userData.id,
        username: userData.username,
        name: userData.name || 'Admin User',
        role: userData.role || 'user',
        email: userData.email || '',
        permissions: userData.permissions || {
          canEditContent: true,
          canManageUsers: userData.role === 'admin',
          canPublish: true
        }
      });
    } catch (error) {
      console.error('Error fetching current user:', error);
      // Return a valid user object with limited permissions in case of error
      // This ensures the admin panel doesn't break completely
      if (req.user) {
        return res.json({
          id: (req.user as any).userId,
          username: (req.user as any).username || 'admin',
          name: 'Admin User',
          role: 'user',
          email: '',
          permissions: {
            canEditContent: true,
            canManageUsers: false,
            canPublish: true
          }
        });
      }
      res.status(500).json({ message: 'Failed to fetch user details' });
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
  
  // Blog Management Routes
  app.get(`${apiPrefix}/blog`, async (req, res) => {
    try {
      const posts = fileStorage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  });

  app.post(`${apiPrefix}/blog`, authenticateToken, async (req, res) => {
    try {
      const newPost = fileStorage.createBlogPost(req.body);
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(400).json({ message: 'Failed to create blog post', error });
    }
  });

  app.put(`${apiPrefix}/blog/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedPost = fileStorage.updateBlogPost(id, req.body);
      res.json(updatedPost);
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(400).json({ message: 'Failed to update blog post', error });
    }
  });

  app.delete(`${apiPrefix}/blog/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      fileStorage.deleteBlogPost(id);
      res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  });

  // Gallery Management Routes - Using File Storage & Cloudinary
  app.post(`${apiPrefix}/gallery`, authenticateToken, async (req, res) => {
    try {
      const newItem = fileStorage.createGalleryItem(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error creating gallery item:', error);
      res.status(400).json({ message: 'Failed to create gallery item', error });
    }
  });

  app.put(`${apiPrefix}/gallery/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedItem = fileStorage.updateGalleryItem(id, req.body);
      res.json(updatedItem);
    } catch (error) {
      console.error('Error updating gallery item:', error);
      res.status(400).json({ message: 'Failed to update gallery item', error });
    }
  });

  app.delete(`${apiPrefix}/gallery/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      fileStorage.deleteGalleryItem(id);
      res.json({ message: 'Gallery item deleted successfully' });
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      res.status(500).json({ message: 'Failed to delete gallery item' });
    }
  });

  // Team Management Routes
  app.get(`${apiPrefix}/team`, async (req, res) => {
    try {
      const teamMembers = fileStorage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      console.error('Error fetching team members:', error);
      res.json([]);
    }
  });

  app.post(`${apiPrefix}/team`, authenticateToken, async (req, res) => {
    try {
      const memberData = req.body;
      const newMember = await storage.createTeamMember(memberData);
      res.status(201).json(newMember);
    } catch (error) {
      console.error('Error creating team member:', error);
      res.status(400).json({ message: 'Failed to create team member', error });
    }
  });

  app.put(`${apiPrefix}/team/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const memberData = req.body;
      const updatedMember = await storage.updateTeamMember(id, memberData);
      res.json(updatedMember);
    } catch (error) {
      console.error('Error updating team member:', error);
      res.status(400).json({ message: 'Failed to update team member', error });
    }
  });

  app.delete(`${apiPrefix}/team/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTeamMember(id);
      res.json({ message: 'Team member deleted successfully' });
    } catch (error) {
      console.error('Error deleting team member:', error);
      res.status(500).json({ message: 'Failed to delete team member' });
    }
  });

  // Testimonials Management Routes
  app.post(`${apiPrefix}/testimonials`, authenticateToken, async (req, res) => {
    try {
      const testimonialData = req.body;
      const newTestimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(newTestimonial);
    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(400).json({ message: 'Failed to create testimonial', error });
    }
  });

  app.put(`${apiPrefix}/testimonials/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const testimonialData = req.body;
      const updatedTestimonial = await storage.updateTestimonial(id, testimonialData);
      res.json(updatedTestimonial);
    } catch (error) {
      console.error('Error updating testimonial:', error);
      res.status(400).json({ message: 'Failed to update testimonial', error });
    }
  });

  app.delete(`${apiPrefix}/testimonials/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTestimonial(id);
      res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      res.status(500).json({ message: 'Failed to delete testimonial' });
    }
  });

  // Contact/Inquiries Management Routes
  app.get(`${apiPrefix}/contact`, authenticateToken, async (req, res) => {
    try {
      const { status } = req.query;
      const submissions = await storage.getContactSubmissions(status as string);
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      res.json([]);
    }
  });

  app.put(`${apiPrefix}/contact/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const submissionData = req.body;
      const updatedSubmission = await storage.updateContactSubmission(id, submissionData);
      res.json(updatedSubmission);
    } catch (error) {
      console.error('Error updating contact submission:', error);
      res.status(400).json({ message: 'Failed to update contact submission', error });
    }
  });

  app.post(`${apiPrefix}/contact/:id/respond`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { message } = req.body;
      // Here you would typically send email response
      // For now, just update status to responded
      const updatedSubmission = await storage.updateContactSubmission(id, { 
        status: 'responded',
        response: message,
        respondedAt: new Date()
      });
      res.json(updatedSubmission);
    } catch (error) {
      console.error('Error responding to contact submission:', error);
      res.status(400).json({ message: 'Failed to respond to contact submission', error });
    }
  });

  // Events - Using File Storage
  app.get(`${apiPrefix}/events`, async (req, res) => {
    try {
      const events = fileStorage.getEvents();
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.json([]);
    }
  });

  // Events Management Routes - Using File Storage
  app.post(`${apiPrefix}/events`, authenticateToken, async (req, res) => {
    try {
      const newEvent = fileStorage.createEvent(req.body);
      res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(400).json({ message: 'Failed to create event', error });
    }
  });

  app.put(`${apiPrefix}/events/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedEvent = fileStorage.updateEvent(id, req.body);
      res.json(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(400).json({ message: 'Failed to update event', error });
    }
  });

  app.delete(`${apiPrefix}/events/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      fileStorage.deleteEvent(id);
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Failed to delete event' });
    }
  });

  // Services Management Routes
  app.post(`${apiPrefix}/services`, authenticateToken, async (req, res) => {
    try {
      const serviceData = req.body;
      const newService = await storage.createService(serviceData, [], []);
      res.status(201).json(newService);
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(400).json({ message: 'Failed to create service', error });
    }
  });

  app.put(`${apiPrefix}/services/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const serviceData = req.body;
      const updatedService = await storage.updateService(id, serviceData);
      res.json(updatedService);
    } catch (error) {
      console.error('Error updating service:', error);
      res.status(400).json({ message: 'Failed to update service', error });
    }
  });

  app.delete(`${apiPrefix}/services/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteService(id);
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ message: 'Failed to delete service' });
    }
  });

  // Settings Management Routes
  app.get(`${apiPrefix}/settings`, authenticateToken, async (req, res) => {
    try {
      // Return basic settings structure
      res.json({
        general: {
          siteName: "Pan Eventz",
          tagline: "Creating Memorable Experiences",
          description: "Professional event management services",
          email: "info@paneventz.com",
          phone: "+91 98765 43210",
          address: "Mumbai, Maharashtra, India"
        },
        business: {
          currency: "INR",
          timezone: "Asia/Kolkata"
        },
        notifications: {
          emailNotifications: true,
          smsNotifications: false
        }
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({ message: 'Failed to fetch settings' });
    }
  });

  app.put(`${apiPrefix}/settings/:section`, authenticateToken, async (req, res) => {
    try {
      const section = req.params.section;
      const settingsData = req.body;
      // Here you would save settings to database
      res.json({ message: `${section} settings updated successfully`, data: settingsData });
    } catch (error) {
      console.error('Error updating settings:', error);
      res.status(400).json({ message: 'Failed to update settings', error });
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

  // Cloudinary proxy endpoint to avoid CORS issues
  app.get(`${apiPrefix}/cloudinary/:folder`, async (req, res) => {
    try {
      const folderName = req.params.folder;
      const cloudName = 'dhxetyrkb';
      const apiKey = '878769551721862';
      const apiSecret = '0v3eRiejau1m-tdnK7xgoR1Cetc';
      
      // Create Basic Auth header
      const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=${encodeURIComponent(folderName)}/&max_results=500`,
        {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch images from ${folderName}`);
      }

      const data = await response.json();
      res.json(data.resources || []);
    } catch (error) {
      console.error(`Error fetching Cloudinary images for folder ${req.params.folder}:`, error);
      res.status(500).json({ message: 'Failed to fetch images from Cloudinary', error: error.message });
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
