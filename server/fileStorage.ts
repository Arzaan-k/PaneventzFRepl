import fs from 'fs';
import path from 'path';

// Simple file-based storage that actually works
const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

class FileStorage {
  private getFilePath(collection: string) {
    return path.join(dataDir, `${collection}.json`);
  }

  private readCollection(collection: string): any[] {
    try {
      const filePath = this.getFilePath(collection);
      if (!fs.existsSync(filePath)) {
        return [];
      }
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${collection}:`, error);
      return [];
    }
  }

  private writeCollection(collection: string, data: any[]): void {
    try {
      const filePath = this.getFilePath(collection);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${collection}:`, error);
    }
  }

  private getNextId(collection: string): number {
    const items = this.readCollection(collection);
    return items.length > 0 ? Math.max(...items.map(item => item.id || 0)) + 1 : 1;
  }

  // Blog Posts
  getBlogPosts() {
    const posts = this.readCollection('blogPosts');
    if (posts.length === 0) {
      // Initialize with substantial content from your project data
      const defaultPosts = [
        {
          id: 1,
          title: "Planning the Perfect Corporate Event",
          slug: "planning-perfect-corporate-event",
          excerpt: "Essential strategies for organizing successful corporate events that leave a lasting impression on attendees and drive business objectives.",
          content: "Corporate events are crucial for business growth and relationship building. From product launches to annual conferences, every detail matters. Our comprehensive approach ensures seamless execution from initial planning to post-event analysis. We focus on understanding your business objectives, target audience, and desired outcomes to create memorable experiences that align with your brand values and deliver measurable results.",
          author: "Imran Mirza",
          authorTitle: "Founder & CEO",
          authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          publishDate: "2023-11-28",
          category: "Corporate Events",
          image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          tags: ["corporate", "conference", "planning", "business"],
          status: "published"
        },
        {
          id: 2,
          title: "The Evolution of Event Technology",
          slug: "event-technology-evolution",
          excerpt: "An in-depth look at how technology has transformed the event industry and what innovations to expect in the coming years.",
          content: "Technology has revolutionized event management, from virtual reality experiences to AI-powered networking platforms. We leverage cutting-edge solutions including live streaming, interactive apps, digital registration systems, and real-time analytics to enhance attendee engagement and measure event success. Our tech-forward approach ensures your events stay ahead of industry trends while delivering exceptional user experiences.",
          author: "Imran Mirza",
          authorTitle: "Founder & CEO",
          authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          publishDate: "2023-10-10",
          category: "Technology",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          tags: ["technology", "innovation", "events", "digital"],
          status: "published"
        },
        {
          id: 3,
          title: "Creating Memorable Wedding Experiences",
          slug: "memorable-wedding-experiences",
          excerpt: "Transform your special day into an unforgettable celebration with our expert wedding planning services and attention to detail.",
          content: "Every wedding tells a unique love story, and we specialize in bringing those stories to life through personalized planning and flawless execution. From intimate ceremonies to grand celebrations, we handle every aspect including venue selection, catering coordination, décor design, entertainment management, and guest logistics. Our experienced team ensures your wedding day reflects your vision while creating lasting memories for you and your loved ones.",
          author: "Priya Sharma",
          authorTitle: "Wedding Specialist",
          authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          publishDate: "2023-09-22",
          category: "Weddings",
          image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          tags: ["wedding", "celebration", "planning", "romance"],
          status: "published"
        }
      ];
      this.writeCollection('blogPosts', defaultPosts);
      return defaultPosts;
    }
    return posts;
  }

  createBlogPost(data: any) {
    const posts = this.readCollection('blogPosts');
    const newPost = {
      id: this.getNextId('blogPosts'),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    posts.push(newPost);
    this.writeCollection('blogPosts', posts);
    return newPost;
  }

  updateBlogPost(id: number, data: any) {
    const posts = this.readCollection('blogPosts');
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...data, updatedAt: new Date().toISOString() };
      this.writeCollection('blogPosts', posts);
      return posts[index];
    }
    return null;
  }

  deleteBlogPost(id: number) {
    const posts = this.readCollection('blogPosts');
    const filtered = posts.filter(post => post.id !== id);
    this.writeCollection('blogPosts', filtered);
    return true;
  }

  // Gallery Items
  getGalleryItems() {
    const items = this.readCollection('galleryItems');
    if (items.length === 0) {
      // Initialize with substantial gallery content
      const defaultGallery = [
        {
          id: 1,
          title: "Corporate Annual Conference 2023",
          category: "corporate",
          description: "A prestigious annual conference for leading technology companies featuring keynote speakers, networking sessions, and product launches.",
          event: "TechCon Mumbai 2023",
          date: "2023-03-15",
          imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          mediaType: "image",
          tags: ["corporate", "conference", "technology", "networking"],
          isEventSpecific: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Luxury Wedding at Grand Hyatt",
          category: "wedding",
          description: "An elegant wedding celebration combining traditional and modern elements with breathtaking décor and world-class hospitality.",
          event: "Kumar-Sharma Wedding",
          date: "2023-02-20",
          imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          mediaType: "image",
          tags: ["wedding", "luxury", "traditional", "celebration"],
          isEventSpecific: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 3,
          title: "University Sports Championship",
          category: "sports",
          description: "Inter-college sports championship featuring multiple sporting events, athlete ceremonies, and award presentations.",
          event: "University Games 2023",
          date: "2023-01-10",
          imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          mediaType: "image",
          tags: ["sports", "championship", "university", "athletics"],
          isEventSpecific: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 4,
          title: "Cultural Festival Celebration",
          category: "cultural",
          description: "A vibrant cultural festival showcasing diverse traditions, performances, and culinary experiences from various communities.",
          event: "Heritage Cultural Festival",
          date: "2023-04-05",
          imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          mediaType: "image",
          tags: ["cultural", "festival", "tradition", "community"],
          isEventSpecific: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 5,
          title: "Product Launch Gala",
          category: "corporate",
          description: "An exclusive product launch event featuring live demonstrations, celebrity endorsements, and media presentations.",
          event: "Innovation Launch 2023",
          date: "2023-05-12",
          imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          mediaType: "image",
          tags: ["product", "launch", "corporate", "innovation"],
          isEventSpecific: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 6,
          title: "Charity Fundraising Dinner",
          category: "social",
          description: "An elegant charity dinner raising funds for education initiatives, featuring guest speakers and live entertainment.",
          event: "Education for All Charity Gala",
          date: "2023-06-18",
          imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          mediaType: "image",
          tags: ["charity", "fundraising", "social", "education"],
          isEventSpecific: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      this.writeCollection('galleryItems', defaultGallery);
      return defaultGallery;
    }
    return items;
  }

  createGalleryItem(data: any) {
    const items = this.readCollection('galleryItems');
    const newItem = {
      id: this.getNextId('galleryItems'),
      ...data,
      // If imageUrl is a Cloudinary URL, keep it as is, otherwise use placeholder
      imageUrl: data.imageUrl || `https://res.cloudinary.com/dhxetyrkb/image/upload/v1/placeholder_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    this.writeCollection('galleryItems', items);
    return newItem;
  }

  updateGalleryItem(id: number, data: any) {
    const items = this.readCollection('galleryItems');
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() };
      this.writeCollection('galleryItems', items);
      return items[index];
    }
    return null;
  }

  deleteGalleryItem(id: number) {
    const items = this.readCollection('galleryItems');
    const filtered = items.filter(item => item.id !== id);
    this.writeCollection('galleryItems', filtered);
    return true;
  }

  // Team Members
  getTeamMembers() {
    const members = this.readCollection('teamMembers');
    if (members.length === 0) {
      // Initialize with comprehensive team data
      const defaultTeam = [
        {
          id: 1,
          name: "Imran Mirza",
          position: "Founder & CEO",
          bio: "With over 15 years of experience in event management, Imran leads Pan Eventz with vision and strategic direction. His passion for creating exceptional experiences drives the company's commitment to excellence and innovation in the event industry.",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
          email: "imran@paneventz.com",
          phone: "+91 9323641780",
          specialties: ["Corporate Events", "Strategic Planning", "Client Relations"],
          experience: "15+ years",
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "Priya Sharma",
          position: "Creative Director",
          bio: "Priya brings artistic vision and creative excellence to every project. Her innovative design concepts and attention to detail ensure that each event is visually stunning and memorable for all attendees.",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
          email: "priya@paneventz.com",
          phone: "+91 9876543210",
          specialties: ["Event Design", "Décor Coordination", "Creative Conceptualization"],
          experience: "10+ years",
          order: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 3,
          name: "Rajesh Kumar",
          position: "Operations Manager",
          bio: "Rajesh ensures flawless execution of all events through meticulous planning and coordination. His expertise in logistics management and vendor relations guarantees smooth operations from start to finish.",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
          email: "rajesh@paneventz.com",
          phone: "+91 9988776655",
          specialties: ["Logistics Management", "Vendor Coordination", "Project Execution"],
          experience: "12+ years",
          order: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 4,
          name: "Ananya Patel",
          position: "Client Relations Manager",
          bio: "Ananya specializes in building strong client relationships and ensuring complete satisfaction throughout the event journey. Her dedication to customer service sets the standard for excellence in client communication.",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b27c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
          email: "ananya@paneventz.com",
          phone: "+91 9123456789",
          specialties: ["Client Communication", "Relationship Management", "Customer Service"],
          experience: "8+ years",
          order: 4,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      this.writeCollection('teamMembers', defaultTeam);
      return defaultTeam;
    }
    return members;
  }

  createTeamMember(data: any) {
    const members = this.readCollection('teamMembers');
    const newMember = {
      id: this.getNextId('teamMembers'),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    members.push(newMember);
    this.writeCollection('teamMembers', members);
    return newMember;
  }

  updateTeamMember(id: number, data: any) {
    const members = this.readCollection('teamMembers');
    const index = members.findIndex(member => member.id === id);
    if (index !== -1) {
      members[index] = { ...members[index], ...data, updatedAt: new Date().toISOString() };
      this.writeCollection('teamMembers', members);
      return members[index];
    }
    return null;
  }

  deleteTeamMember(id: number) {
    const members = this.readCollection('teamMembers');
    const filtered = members.filter(member => member.id !== id);
    this.writeCollection('teamMembers', filtered);
    return true;
  }

  // Testimonials
  getTestimonials() {
    const testimonials = this.readCollection('testimonials');
    if (testimonials.length === 0) {
      // Initialize with authentic client testimonials
      const defaultTestimonials = [
        {
          id: 1,
          name: "Vikram Malhotra",
          position: "CEO, TechnoCore Solutions",
          company: "TechnoCore Solutions",
          rating: 5,
          content: "Pan Eventz delivered an exceptional corporate conference that exceeded our expectations. Their attention to detail, professional coordination, and innovative approach made our annual event a tremendous success. The team's dedication and expertise are truly remarkable.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
          eventType: "Corporate Conference",
          eventDate: "2023-03-15",
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "Kavita & Arjun Sharma",
          position: "Wedding Couple",
          company: "Personal",
          rating: 5,
          content: "Our wedding was absolutely perfect thanks to Pan Eventz. From the initial planning to the final moments of our celebration, every detail was flawlessly executed. Imran and his team made our dream wedding a beautiful reality that we'll cherish forever.",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
          eventType: "Wedding",
          eventDate: "2023-02-20",
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 3,
          name: "Dr. Rajesh Gupta",
          position: "Principal, Mumbai University",
          company: "Mumbai University",
          rating: 5,
          content: "The university sports championship organized by Pan Eventz was outstanding. Their team managed complex logistics seamlessly and created an engaging atmosphere for all participants. The event was well-coordinated and professionally executed.",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
          eventType: "Sports Event",
          eventDate: "2023-01-10",
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 4,
          name: "Meera Patel",
          position: "Cultural Society President",
          company: "Heritage Cultural Society",
          rating: 5,
          content: "Pan Eventz brought our cultural festival vision to life with incredible creativity and respect for traditions. Their understanding of cultural nuances and ability to manage diverse performances made our festival truly memorable and meaningful.",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b27c?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
          eventType: "Cultural Festival",
          eventDate: "2023-04-05",
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 5,
          name: "Amit Khanna",
          position: "Marketing Director, InnovaTech",
          company: "InnovaTech Ltd",
          rating: 5,
          content: "The product launch event managed by Pan Eventz was a complete success. Their innovative presentation concepts, seamless coordination with media, and attention to brand consistency helped us achieve our marketing objectives perfectly.",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
          eventType: "Product Launch",
          eventDate: "2023-05-12",
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 6,
          name: "Sunita Agarwal",
          position: "Charity Foundation Director",
          company: "Education for All Foundation",
          rating: 5,
          content: "Our charity fundraising dinner was beautifully organized by Pan Eventz. They understood our mission and created an elegant event that not only raised significant funds but also touched the hearts of all attendees. Truly professional service.",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80",
          eventType: "Charity Event",
          eventDate: "2023-06-18",
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      this.writeCollection('testimonials', defaultTestimonials);
      return defaultTestimonials;
    }
    return testimonials;
  }

  createTestimonial(data: any) {
    const testimonials = this.readCollection('testimonials');
    const newTestimonial = {
      id: this.getNextId('testimonials'),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    testimonials.push(newTestimonial);
    this.writeCollection('testimonials', testimonials);
    return newTestimonial;
  }

  updateTestimonial(id: number, data: any) {
    const testimonials = this.readCollection('testimonials');
    const index = testimonials.findIndex(testimonial => testimonial.id === id);
    if (index !== -1) {
      testimonials[index] = { ...testimonials[index], ...data, updatedAt: new Date().toISOString() };
      this.writeCollection('testimonials', testimonials);
      return testimonials[index];
    }
    return null;
  }

  deleteTestimonial(id: number) {
    const testimonials = this.readCollection('testimonials');
    const filtered = testimonials.filter(testimonial => testimonial.id !== id);
    this.writeCollection('testimonials', filtered);
    return true;
  }

  // Events
  getEvents() {
    const events = this.readCollection('events');
    if (events.length === 0) {
      // Initialize with comprehensive event data
      const defaultEvents = [
        {
          id: 1,
          title: "Annual Tech Summit 2024",
          slug: "annual-tech-summit-2024",
          description: "Join industry leaders for the most anticipated technology conference of the year featuring cutting-edge innovations, networking opportunities, and expert insights into the future of tech.",
          fullDescription: "The Annual Tech Summit 2024 brings together visionaries, entrepreneurs, and technology experts from around the globe. This three-day event features keynote presentations from industry giants, hands-on workshops, product demonstrations, and extensive networking opportunities. Attendees will explore emerging technologies including AI, blockchain, IoT, and sustainable tech solutions. The summit includes startup pitch competitions, investor meetups, and career development sessions.",
          eventType: "Corporate",
          category: "Technology",
          date: "2024-07-15",
          endDate: "2024-07-17",
          time: "09:00",
          endTime: "18:00",
          venue: "Grand Convention Center, Mumbai",
          address: "Bandra Kurla Complex, Mumbai, Maharashtra 400051",
          capacity: 2000,
          registrations: 1500,
          price: 15000,
          currency: "INR",
          status: "upcoming",
          featured: true,
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          gallery: [
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
          ],
          speakers: ["Dr. Rajesh Kumar", "Priya Sharma", "Amit Gupta"],
          tags: ["technology", "innovation", "networking", "corporate"],
          organizer: "Pan Eventz",
          contactEmail: "events@paneventz.com",
          contactPhone: "+91 9323641780",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Luxury Wedding Celebration",
          slug: "luxury-wedding-celebration",
          description: "An exquisite wedding celebration combining traditional ceremonies with modern elegance, creating unforgettable memories for the couple and their families.",
          fullDescription: "This luxury wedding celebration spans three days of traditional ceremonies and modern festivities. Beginning with an intimate mehndi ceremony, followed by a grand sangam celebration, and culminating in a spectacular wedding reception. Each event is meticulously planned with custom décor, premium catering, live entertainment, and personalized touches that reflect the couple's unique love story.",
          eventType: "Wedding",
          category: "Personal",
          date: "2024-06-20",
          endDate: "2024-06-22",
          time: "16:00",
          endTime: "23:00",
          venue: "The Grand Palace Resort",
          address: "Lonavala, Maharashtra 410401",
          capacity: 500,
          registrations: 450,
          price: 0,
          currency: "INR",
          status: "upcoming",
          featured: true,
          image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          gallery: [
            "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
          ],
          speakers: [],
          tags: ["wedding", "luxury", "traditional", "celebration"],
          organizer: "Pan Eventz",
          contactEmail: "weddings@paneventz.com",
          contactPhone: "+91 9323641780",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 3,
          title: "Cultural Heritage Festival",
          slug: "cultural-heritage-festival",
          description: "A vibrant celebration of diverse cultural traditions featuring traditional performances, culinary experiences, and artistic exhibitions from various communities.",
          fullDescription: "The Cultural Heritage Festival is a three-day celebration showcasing the rich diversity of Indian culture. The festival features traditional dance performances, classical music concerts, folk art exhibitions, and authentic cuisine from different regions. Interactive workshops allow visitors to learn traditional crafts, cooking techniques, and art forms. The event promotes cultural understanding and preservation of heritage arts.",
          eventType: "Cultural",
          category: "Community",
          date: "2024-08-10",
          endDate: "2024-08-12",
          time: "10:00",
          endTime: "22:00",
          venue: "Cultural Center Mumbai",
          address: "Fort, Mumbai, Maharashtra 400001",
          capacity: 1000,
          registrations: 750,
          price: 500,
          currency: "INR",
          status: "upcoming",
          featured: false,
          image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          gallery: [
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
          ],
          speakers: ["Cultural Artists", "Heritage Experts"],
          tags: ["cultural", "heritage", "festival", "community"],
          organizer: "Pan Eventz",
          contactEmail: "cultural@paneventz.com",
          contactPhone: "+91 9323641780",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      this.writeCollection('events', defaultEvents);
      return defaultEvents;
    }
    return events;
  }

  createEvent(data: any) {
    const events = this.readCollection('events');
    const newEvent = {
      id: this.getNextId('events'),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    events.push(newEvent);
    this.writeCollection('events', events);
    return newEvent;
  }

  updateEvent(id: number, data: any) {
    const events = this.readCollection('events');
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...data, updatedAt: new Date().toISOString() };
      this.writeCollection('events', events);
      return events[index];
    }
    return null;
  }

  deleteEvent(id: number) {
    const events = this.readCollection('events');
    const filtered = events.filter(event => event.id !== id);
    this.writeCollection('events', filtered);
    return true;
  }

  // Contact Submissions
  getContactSubmissions() {
    return this.readCollection('contactSubmissions');
  }

  updateContactSubmission(id: number, data: any) {
    const submissions = this.readCollection('contactSubmissions');
    const index = submissions.findIndex(submission => submission.id === id);
    if (index !== -1) {
      submissions[index] = { ...submissions[index], ...data, updatedAt: new Date().toISOString() };
      this.writeCollection('contactSubmissions', submissions);
      return submissions[index];
    }
    return null;
  }
}

export const fileStorage = new FileStorage();