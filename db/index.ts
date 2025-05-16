import * as schema from "@shared/schema";

// Instead of relying on a real database connection for now, let's create in-memory storage
// This is a temporary solution until we resolve the database connection issues

// Mock database with in-memory storage for development
class MockDB {
  private data: Record<string, any[]> = {};

  constructor() {
    // Initialize with seed data for development
    this.data.users = [
      {
        id: 1,
        username: 'admin',
        password: '$2b$10$zH5LICajrnX9g0soLc7DUuWJ9k0KiB7WCUqQW9KuQl2SRzRBHm8zC', // "password123"
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date()
      }
    ];
    
    this.data.services = [
      {
        id: 1,
        slug: 'corporate-events',
        title: 'Corporate Events',
        description: 'Professional and polished corporate events that align with your brand and business objectives.',
        imageUrl: '/uploads/service-corporate.jpg',
        banner: '/uploads/corporate-banner.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        slug: 'wedding-planning',
        title: 'Wedding Planning',
        description: 'Comprehensive wedding planning services to make your special day perfect and memorable.',
        imageUrl: '/uploads/service-wedding.jpg',
        banner: '/uploads/wedding-banner.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        slug: 'social-gatherings',
        title: 'Social Gatherings',
        description: 'Expertly planned social events that create meaningful connections and lasting memories.',
        imageUrl: '/uploads/service-social.jpg',
        banner: '/uploads/social-banner.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    this.data.serviceFeatures = [
      {
        id: 1,
        serviceId: 1,
        text: 'Full venue selection and management'
      },
      {
        id: 2,
        serviceId: 1,
        text: 'Corporate branding integration'
      },
      {
        id: 3,
        serviceId: 1,
        text: 'Professional AV and technology setup'
      },
      {
        id: 4,
        serviceId: 1,
        text: 'Speaker and VIP coordination'
      },
      {
        id: 5,
        serviceId: 2,
        text: 'Venue selection and coordination'
      },
      {
        id: 6,
        serviceId: 2,
        text: 'Vendor management and negotiation'
      },
      {
        id: 7,
        serviceId: 2,
        text: 'Custom wedding design and styling'
      },
      {
        id: 8,
        serviceId: 2,
        text: 'Day-of coordination and management'
      },
      {
        id: 9,
        serviceId: 3,
        text: 'Theme development and design'
      },
      {
        id: 10,
        serviceId: 3,
        text: 'Entertainment booking and coordination'
      },
      {
        id: 11,
        serviceId: 3,
        text: 'Catering and beverage management'
      },
      {
        id: 12,
        serviceId: 3,
        text: 'Full event setup and teardown'
      }
    ];
    
    this.data.serviceProcessSteps = [
      {
        id: 1,
        serviceId: 1,
        title: 'Consultation',
        description: 'In-depth discovery of your corporate needs and objectives',
        order: 1
      },
      {
        id: 2,
        serviceId: 1,
        title: 'Planning',
        description: 'Comprehensive event strategy and logistics planning',
        order: 2
      },
      {
        id: 3,
        serviceId: 1,
        title: 'Execution',
        description: 'Flawless implementation of all event elements',
        order: 3
      },
      {
        id: 4,
        serviceId: 2,
        title: 'Initial Consultation',
        description: 'Understanding your vision and wedding dreams',
        order: 1
      },
      {
        id: 5,
        serviceId: 2,
        title: 'Vendor Selection',
        description: 'Curating the perfect team for your special day',
        order: 2
      },
      {
        id: 6,
        serviceId: 2,
        title: 'Design & Planning',
        description: 'Creating a cohesive wedding aesthetic and detailed timeline',
        order: 3
      },
      {
        id: 7,
        serviceId: 2,
        title: 'Wedding Day Management',
        description: 'Ensuring everything runs perfectly while you enjoy your day',
        order: 4
      }
    ];
    
    this.data.galleryItems = [
      {
        id: 1,
        title: 'Annual Corporate Summit',
        category: 'Corporate',
        description: 'Tech industry leadership conference with 500+ attendees',
        event: 'TechCorp Annual Summit',
        date: '2024-03-15',
        imageUrl: '/uploads/gallery-corporate-1.jpg',
        serviceId: 1,
        createdAt: new Date()
      },
      {
        id: 2,
        title: 'Elegant Garden Wedding',
        category: 'Wedding',
        description: 'Romantic garden wedding with custom floral installations',
        event: 'Johnson-Smith Wedding',
        date: '2024-06-22',
        imageUrl: '/uploads/gallery-wedding-1.jpg',
        serviceId: 2,
        createdAt: new Date()
      },
      {
        id: 3,
        title: 'Charity Gala Dinner',
        category: 'Social',
        description: 'Black-tie fundraising event raising over $200,000 for charity',
        event: 'Children\'s Foundation Gala',
        date: '2024-05-10',
        imageUrl: '/uploads/gallery-social-1.jpg',
        serviceId: 3,
        createdAt: new Date()
      }
    ];
    
    this.data.slides = [
      {
        id: 1,
        title: 'Creating Unforgettable',
        titleHighlight: 'Event Experiences',
        description: 'Professional event planning services tailored to your vision and needs.',
        backgroundImage: '/uploads/hero-slide-1.jpg',
        primaryCtaText: 'Our Services',
        primaryCtaLink: '/services',
        secondaryCtaText: 'Contact Us',
        secondaryCtaLink: '/contact',
        order: 1,
        active: true,
        createdAt: new Date()
      },
      {
        id: 2,
        title: 'Corporate Events with',
        titleHighlight: 'Strategic Impact',
        description: 'Elevate your brand with professional corporate event management.',
        backgroundImage: '/uploads/hero-slide-2.jpg',
        primaryCtaText: 'Learn More',
        primaryCtaLink: '/services/corporate-events',
        secondaryCtaText: 'View Gallery',
        secondaryCtaLink: '/gallery',
        order: 2,
        active: true,
        createdAt: new Date()
      }
    ];
    
    this.data.technologies = [
      {
        id: 1,
        title: 'Advanced Event Software',
        description: 'State-of-the-art event management software for seamless planning and execution.',
        icon: 'computer',
        order: 1,
        active: true
      },
      {
        id: 2,
        title: 'Virtual Reality Planning',
        description: 'Immersive VR technology to visualize your event space before the big day.',
        icon: 'view-in-ar',
        order: 2,
        active: true
      },
      {
        id: 3,
        title: 'Smart RSVP System',
        description: 'Efficient guest management with real-time updates and communications.',
        icon: 'mail',
        order: 3,
        active: true
      }
    ];
    
    this.data.testimonials = [
      {
        id: 1,
        content: 'Pan Eventz transformed our corporate retreat into an unforgettable experience. Their attention to detail and professionalism were outstanding.',
        authorName: 'Sarah Johnson',
        authorTitle: 'CEO, TechInnovate',
        authorAvatar: '/uploads/testimonial-1.jpg',
        rating: 5,
        active: true,
        createdAt: new Date()
      },
      {
        id: 2,
        content: 'Working with Pan Eventz for our wedding was the best decision we made. They took care of everything, allowing us to truly enjoy our special day.',
        authorName: 'Michael & Lisa Thompson',
        authorTitle: 'Happy Couple',
        authorAvatar: '/uploads/testimonial-2.jpg',
        rating: 5,
        active: true,
        createdAt: new Date()
      }
    ];
    
    this.data.about = [
      {
        id: 1,
        description: 'Pan Eventz is a premier event management company dedicated to creating exceptional experiences for our clients. With a passion for perfection and an eye for detail, we transform ordinary occasions into extraordinary memories.',
        mission: 'To deliver world-class event experiences that exceed client expectations through creativity, precision, and personalized service.',
        vision: 'To be the most trusted and innovative event management company, known for transforming visions into unforgettable experiences.',
        history: 'Founded in 2010 by Imran Mirza, Pan Eventz has grown from a small local event planning service to a comprehensive event management company serving clients across industries.',
        team: 'Our team consists of passionate event professionals with diverse backgrounds and specialized expertise, united by a common goal of excellence.',
        quality: 'We maintain the highest standards of quality through rigorous planning, vendor vetting, and continuous improvement processes.',
        images: ['/uploads/about-1.jpg', '/uploads/about-2.jpg', '/uploads/about-3.jpg'],
        updatedAt: new Date()
      }
    ];
    
    this.data.aboutTeam = [
      {
        id: 1,
        name: 'Imran Mirza',
        position: 'Founder & CEO',
        bio: 'With over 15 years of experience in event management, Imran leads Pan Eventz with vision and passion. His innovative approach has established the company as an industry leader.',
        image: '/uploads/team-imran.jpg',
        order: 1
      },
      {
        id: 2,
        name: 'Sophia Chen',
        position: 'Creative Director',
        bio: 'Sophia brings artistic vision and design expertise to every event. Her background in fine arts and interior design helps create stunning, immersive event environments.',
        image: '/uploads/team-sophia.jpg',
        order: 2
      }
    ];
    
    this.data.aboutValues = [
      {
        id: 1,
        title: 'Excellence',
        description: 'We strive for excellence in every aspect of our service, from the first consultation to the final execution.',
        order: 1
      },
      {
        id: 2,
        title: 'Integrity',
        description: 'We operate with honesty and transparency, building trust with our clients through every interaction.',
        order: 2
      },
      {
        id: 3,
        title: 'Innovation',
        description: 'We constantly explore new ideas and technologies to create fresh, unique event experiences.',
        order: 3
      }
    ];
    
    this.data.stats = [
      {
        id: 1,
        label: 'Events Completed',
        value: 500,
        suffix: '+',
        order: 1
      },
      {
        id: 2,
        label: 'Happy Clients',
        value: 350,
        suffix: '+',
        order: 2
      },
      {
        id: 3,
        label: 'Team Members',
        value: 25,
        suffix: '+',
        order: 3
      },
      {
        id: 4,
        label: 'Years Experience',
        value: 14,
        suffix: '+',
        order: 4
      }
    ];
    
    this.data.blogPosts = [];
    this.data.contactSubmissions = [];
    this.data.events = [];
    this.data.sessions = [];
  }

  // Generic query builder to simulate Drizzle's interface
  query = {
    users: {
      findFirst: async ({ where }: any) => {
        return this.data.users.find(item => this.matchCondition(item, where));
      },
      findMany: async ({ where, limit, offset }: any = {}) => {
        let result = where ? this.data.users.filter(item => this.matchCondition(item, where)) : [...this.data.users];
        if (offset) result = result.slice(offset);
        if (limit) result = result.slice(0, limit);
        return result;
      }
    },
    services: {
      findFirst: async ({ where }: any) => {
        return this.data.services.find(item => this.matchCondition(item, where));
      },
      findMany: async ({ where, limit, offset }: any = {}) => {
        let result = where ? this.data.services.filter(item => this.matchCondition(item, where)) : [...this.data.services];
        if (offset) result = result.slice(offset);
        if (limit) result = result.slice(0, limit);
        return result;
      }
    },
    // Add similar query methods for other tables as needed
  };

  // Simulates SQL equality condition matching
  private matchCondition(item: any, where: any): boolean {
    if (!where) return true;
    
    for (const key in where) {
      const condition = where[key];
      // For simple equality conditions like eq(users.id, 1)
      if (condition.value !== undefined) {
        if (item[condition.field.name] !== condition.value) {
          return false;
        }
      } else if (typeof condition === 'object') {
        // For complex conditions
        if (!this.matchCondition(item, condition)) {
          return false;
        }
      } else {
        // Direct value comparison
        if (item[key] !== condition) {
          return false;
        }
      }
    }
    return true;
  }

  // Simulate insert
  async insert(table: any) {
    const tableName = table.name;
    
    return {
      values: (data: any) => {
        if (Array.isArray(data)) {
          const newItems = data.map((item, index) => ({
            id: this.data[tableName].length + index + 1,
            ...item,
            createdAt: new Date()
          }));
          this.data[tableName].push(...newItems);
          return { returning: () => Promise.resolve(newItems) };
        } else {
          const newItem = {
            id: this.data[tableName].length + 1,
            ...data,
            createdAt: new Date()
          };
          this.data[tableName].push(newItem);
          return { returning: () => Promise.resolve([newItem]) };
        }
      }
    };
  }

  // Simulate update
  async update(table: any) {
    const tableName = table.name;
    
    return {
      set: (data: any) => ({
        where: (condition: any) => {
          const index = this.data[tableName].findIndex(item => this.matchCondition(item, condition));
          if (index !== -1) {
            const updatedItem = {
              ...this.data[tableName][index],
              ...data,
              updatedAt: new Date()
            };
            this.data[tableName][index] = updatedItem;
            return { returning: () => Promise.resolve([updatedItem]) };
          }
          return { returning: () => Promise.resolve([]) };
        }
      })
    };
  }

  // Simulate delete
  async delete(table: any) {
    const tableName = table.name;
    
    return {
      where: (condition: any) => {
        const index = this.data[tableName].findIndex(item => this.matchCondition(item, condition));
        if (index !== -1) {
          const deletedItem = this.data[tableName][index];
          this.data[tableName].splice(index, 1);
          return { returning: () => Promise.resolve([deletedItem]) };
        }
        return { returning: () => Promise.resolve([]) };
      }
    };
  }

  // Simulate select
  async select(...fields: any[]) {
    return {
      from: (table: any) => {
        const tableName = table.name;
        return {
          where: (condition: any) => {
            const results = this.data[tableName].filter(item => this.matchCondition(item, condition));
            if (fields.length && fields[0] !== '*') {
              return Promise.resolve(results.map(item => {
                const result: Record<string, any> = {};
                fields.forEach(field => {
                  if (typeof field === 'string') {
                    result[field] = item[field];
                  } else if (field.name) {
                    result[field.name] = item[field.name];
                  }
                });
                return result;
              }));
            }
            return Promise.resolve(results);
          },
          limit: (limit: number) => {
            return Promise.resolve(this.data[tableName].slice(0, limit));
          }
        };
      }
    };
  }
}

export const db = new MockDB();