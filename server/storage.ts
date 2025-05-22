import { eq, desc, and, asc, or, like } from 'drizzle-orm';
import { db } from '@db';
import * as schema from '@shared/schema';
import bcrypt from 'bcrypt';

// User operations
export const storage = {
  // Replit Auth user operations
  async upsertUser(userData: { id: string; email?: string; firstName?: string; lastName?: string; profileImageUrl?: string }) {
    try {
      // Check if the user exists
      const existingUser = await db.query.users.findFirst({
        where: eq(schema.users.username, userData.id)
      });
      
      if (existingUser) {
        // Update the existing user
        const [updatedUser] = await db.update(schema.users)
          .set({
            name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
            // Keep other fields the same
          })
          .where(eq(schema.users.username, userData.id))
          .returning();
        return updatedUser;
      } else {
        // Create a new user
        const [newUser] = await db.insert(schema.users)
          .values({
            username: userData.id,
            password: await bcrypt.hash(Math.random().toString(36), 10), // Random password
            name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
            role: 'user'
          })
          .returning();
        return newUser;
      }
    } catch (error) {
      console.error('Error in upsertUser:', error);
      return null;
    }
  },
  
  async getUser(id: string) {
    try {
      return await db.query.users.findFirst({
        where: eq(schema.users.username, id)
      });
    } catch (error) {
      console.error('Error in getUser:', error);
      return undefined;
    }
  },
  
  // Legacy user operations
  async createUser(user: schema.InsertUser) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    
    const [newUser] = await db.insert(schema.users)
      .values({
        ...user,
        password: hashedPassword
      })
      .returning();
    
    return newUser;
  },

  async getUserByUsername(username: string) {
    return await db.query.users.findFirst({
      where: eq(schema.users.username, username)
    });
  },

  async validateUser(username: string, password: string) {
    const user = await this.getUserByUsername(username);
    if (!user) return null;
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;
    
    return user;
  },

  // Services operations
  async getServices() {
    return await db.query.services.findMany({
      with: {
        features: true
      },
      orderBy: [asc(schema.services.title)]
    });
  },

  async getServiceBySlug(slug: string) {
    return await db.query.services.findFirst({
      where: eq(schema.services.slug, slug),
      with: {
        features: true,
        processSteps: {
          orderBy: [asc(schema.serviceProcessSteps.order)]
        },
        gallery: {
          limit: 3
        }
      }
    });
  },
  
  async createService(service: schema.InsertService, features: { text: string }[], processSteps: { title: string, description: string, order: number }[]) {
    const [newService] = await db.insert(schema.services)
      .values(service)
      .returning();
    
    if (features.length > 0) {
      await db.insert(schema.serviceFeatures)
        .values(features.map(feature => ({
          serviceId: newService.id,
          text: feature.text
        })));
    }
    
    if (processSteps.length > 0) {
      await db.insert(schema.serviceProcessSteps)
        .values(processSteps.map(step => ({
          serviceId: newService.id,
          title: step.title,
          description: step.description,
          order: step.order
        })));
    }
    
    return await this.getServiceBySlug(newService.slug);
  },
  
  async updateService(id: number, service: Partial<schema.Service>) {
    const [updatedService] = await db.update(schema.services)
      .set({
        ...service,
        updatedAt: new Date()
      })
      .where(eq(schema.services.id, id))
      .returning();
    
    return updatedService;
  },
  
  async deleteService(id: number) {
    return await db.delete(schema.services)
      .where(eq(schema.services.id, id))
      .returning();
  },

  // Gallery operations
  async getGalleryItems(category?: string) {
    let query = db.query.galleryItems.findMany({
      orderBy: [desc(schema.galleryItems.createdAt)]
    });
    
    if (category && category !== 'all') {
      query = db.query.galleryItems.findMany({
        where: eq(schema.galleryItems.category, category),
        orderBy: [desc(schema.galleryItems.createdAt)]
      });
    }
    
    return await query;
  },
  
  async getGalleryItem(id: number) {
    return await db.query.galleryItems.findFirst({
      where: eq(schema.galleryItems.id, id)
    });
  },
  
  async createGalleryItem(item: schema.InsertGalleryItem) {
    const [newItem] = await db.insert(schema.galleryItems)
      .values(item)
      .returning();
    
    return newItem;
  },
  
  async updateGalleryItem(id: number, item: Partial<schema.GalleryItem>) {
    const [updatedItem] = await db.update(schema.galleryItems)
      .set(item)
      .where(eq(schema.galleryItems.id, id))
      .returning();
    
    return updatedItem;
  },
  
  async deleteGalleryItem(id: number) {
    return await db.delete(schema.galleryItems)
      .where(eq(schema.galleryItems.id, id))
      .returning();
  },

  // Slides operations
  async getSlides() {
    return await db.query.slides.findMany({
      where: eq(schema.slides.active, true),
      orderBy: [asc(schema.slides.order)]
    });
  },
  
  async getAllSlides() {
    return await db.query.slides.findMany({
      orderBy: [asc(schema.slides.order)]
    });
  },
  
  async createSlide(slide: schema.InsertSlide) {
    const [newSlide] = await db.insert(schema.slides)
      .values(slide)
      .returning();
    
    return newSlide;
  },
  
  async updateSlide(id: number, slide: Partial<schema.Slide>) {
    const [updatedSlide] = await db.update(schema.slides)
      .set(slide)
      .where(eq(schema.slides.id, id))
      .returning();
    
    return updatedSlide;
  },
  
  async deleteSlide(id: number) {
    return await db.delete(schema.slides)
      .where(eq(schema.slides.id, id))
      .returning();
  },

  // Technologies operations
  async getTechnologies() {
    return await db.query.technologies.findMany({
      where: eq(schema.technologies.active, true),
      orderBy: [asc(schema.technologies.order)]
    });
  },
  
  async getAllTechnologies() {
    return await db.query.technologies.findMany({
      orderBy: [asc(schema.technologies.order)]
    });
  },
  
  async createTechnology(technology: schema.InsertTechnology) {
    const [newTechnology] = await db.insert(schema.technologies)
      .values(technology)
      .returning();
    
    return newTechnology;
  },
  
  async updateTechnology(id: number, technology: Partial<schema.Technology>) {
    const [updatedTechnology] = await db.update(schema.technologies)
      .set(technology)
      .where(eq(schema.technologies.id, id))
      .returning();
    
    return updatedTechnology;
  },
  
  async deleteTechnology(id: number) {
    return await db.delete(schema.technologies)
      .where(eq(schema.technologies.id, id))
      .returning();
  },

  // Testimonials operations
  async getTestimonials() {
    return await db.query.testimonials.findMany({
      where: eq(schema.testimonials.active, true),
      orderBy: [desc(schema.testimonials.createdAt)]
    });
  },
  
  async getAllTestimonials() {
    return await db.query.testimonials.findMany({
      orderBy: [desc(schema.testimonials.createdAt)]
    });
  },
  
  async createTestimonial(testimonial: schema.InsertTestimonial) {
    const [newTestimonial] = await db.insert(schema.testimonials)
      .values(testimonial)
      .returning();
    
    return newTestimonial;
  },
  
  async updateTestimonial(id: number, testimonial: Partial<schema.Testimonial>) {
    const [updatedTestimonial] = await db.update(schema.testimonials)
      .set(testimonial)
      .where(eq(schema.testimonials.id, id))
      .returning();
    
    return updatedTestimonial;
  },
  
  async deleteTestimonial(id: number) {
    return await db.delete(schema.testimonials)
      .where(eq(schema.testimonials.id, id))
      .returning();
  },

  // About operations
  async getAbout() {
    const aboutData = await db.query.about.findFirst({
      orderBy: [desc(schema.about.updatedAt)]
    });
    
    return aboutData;
  },
  
  async getFullAbout() {
    const aboutData = await db.query.about.findFirst({
      orderBy: [desc(schema.about.updatedAt)]
    });
    
    const team = await db.query.aboutTeam.findMany({
      orderBy: [asc(schema.aboutTeam.order)]
    });
    
    const values = await db.query.aboutValues.findMany({
      orderBy: [asc(schema.aboutValues.order)]
    });
    
    return {
      ...aboutData,
      team,
      values
    };
  },
  
  async updateAbout(about: schema.InsertAbout) {
    // Check if about record exists
    const existing = await db.query.about.findFirst();
    
    if (existing) {
      const [updatedAbout] = await db.update(schema.about)
        .set({
          ...about,
          updatedAt: new Date()
        })
        .where(eq(schema.about.id, existing.id))
        .returning();
      
      return updatedAbout;
    } else {
      const [newAbout] = await db.insert(schema.about)
        .values(about)
        .returning();
      
      return newAbout;
    }
  },
  
  async updateTeamMember(id: number, member: Partial<typeof schema.aboutTeam.$inferSelect>) {
    const [updatedMember] = await db.update(schema.aboutTeam)
      .set(member)
      .where(eq(schema.aboutTeam.id, id))
      .returning();
    
    return updatedMember;
  },
  
  async createTeamMember(member: typeof schema.aboutTeam.$inferInsert) {
    const [newMember] = await db.insert(schema.aboutTeam)
      .values(member)
      .returning();
    
    return newMember;
  },
  
  async deleteTeamMember(id: number) {
    return await db.delete(schema.aboutTeam)
      .where(eq(schema.aboutTeam.id, id))
      .returning();
  },
  
  async updateValue(id: number, value: Partial<typeof schema.aboutValues.$inferSelect>) {
    const [updatedValue] = await db.update(schema.aboutValues)
      .set(value)
      .where(eq(schema.aboutValues.id, id))
      .returning();
    
    return updatedValue;
  },
  
  async createValue(value: typeof schema.aboutValues.$inferInsert) {
    const [newValue] = await db.insert(schema.aboutValues)
      .values(value)
      .returning();
    
    return newValue;
  },
  
  async deleteValue(id: number) {
    return await db.delete(schema.aboutValues)
      .where(eq(schema.aboutValues.id, id))
      .returning();
  },

  // Stats operations
  async getStats() {
    try {
      return await db.query.stats.findMany({
        orderBy: [asc(schema.stats.order)]
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Return default stats to ensure the UI doesn't break
      return [
        { id: 1, title: "Events Completed", value: "500", icon: "event", suffix: "+", prefix: "", order: 1 },
        { id: 2, title: "Happy Clients", value: "250", icon: "sentiment_satisfied", suffix: "+", prefix: "", order: 2 },
        { id: 3, title: "Team Members", value: "45", icon: "people", suffix: "+", prefix: "", order: 3 },
        { id: 4, title: "Success Rate", value: "99", icon: "thumb_up", suffix: "%", prefix: "", order: 4 }
      ];
    }
  },
  
  async updateStat(id: number, stat: Partial<schema.Stat>) {
    const [updatedStat] = await db.update(schema.stats)
      .set(stat)
      .where(eq(schema.stats.id, id))
      .returning();
    
    return updatedStat;
  },
  
  async createStat(stat: schema.InsertStat) {
    const [newStat] = await db.insert(schema.stats)
      .values(stat)
      .returning();
    
    return newStat;
  },
  
  async deleteStat(id: number) {
    return await db.delete(schema.stats)
      .where(eq(schema.stats.id, id))
      .returning();
  },

  // Blog operations
  async getBlogPosts(category?: string) {
    let query = db.query.blogPosts.findMany({
      where: eq(schema.blogPosts.active, true),
      orderBy: [desc(schema.blogPosts.publishDate)]
    });
    
    if (category && category !== 'all') {
      query = db.query.blogPosts.findMany({
        where: and(
          eq(schema.blogPosts.active, true),
          eq(schema.blogPosts.category, category)
        ),
        orderBy: [desc(schema.blogPosts.publishDate)]
      });
    }
    
    return await query;
  },
  
  async getBlogPostBySlug(slug: string) {
    return await db.query.blogPosts.findFirst({
      where: and(
        eq(schema.blogPosts.slug, slug),
        eq(schema.blogPosts.active, true)
      )
    });
  },
  
  async createBlogPost(post: schema.InsertBlogPost) {
    const [newPost] = await db.insert(schema.blogPosts)
      .values(post)
      .returning();
    
    return newPost;
  },
  
  async updateBlogPost(id: number, post: Partial<schema.BlogPost>) {
    const [updatedPost] = await db.update(schema.blogPosts)
      .set({
        ...post,
        updatedAt: new Date()
      })
      .where(eq(schema.blogPosts.id, id))
      .returning();
    
    return updatedPost;
  },
  
  async deleteBlogPost(id: number) {
    return await db.delete(schema.blogPosts)
      .where(eq(schema.blogPosts.id, id))
      .returning();
  },

  // Contact form submissions
  async submitContactForm(submission: schema.InsertContactSubmission) {
    const [newSubmission] = await db.insert(schema.contactSubmissions)
      .values(submission)
      .returning();
    
    return newSubmission;
  },
  
  async getContactSubmissions(status?: string) {
    let query = db.query.contactSubmissions.findMany({
      orderBy: [desc(schema.contactSubmissions.createdAt)]
    });
    
    if (status && status !== 'all') {
      query = db.query.contactSubmissions.findMany({
        where: eq(schema.contactSubmissions.status, status),
        orderBy: [desc(schema.contactSubmissions.createdAt)]
      });
    }
    
    return await query;
  },
  
  async getContactSubmission(id: number) {
    return await db.query.contactSubmissions.findFirst({
      where: eq(schema.contactSubmissions.id, id)
    });
  },
  
  async updateContactSubmission(id: number, submission: Partial<schema.ContactSubmission>) {
    const [updatedSubmission] = await db.update(schema.contactSubmissions)
      .set({
        ...submission,
        updatedAt: new Date()
      })
      .where(eq(schema.contactSubmissions.id, id))
      .returning();
    
    return updatedSubmission;
  },
  
  async deleteContactSubmission(id: number) {
    return await db.delete(schema.contactSubmissions)
      .where(eq(schema.contactSubmissions.id, id))
      .returning();
  },

  // Events management
  async getEvents(status?: string) {
    let query = db.query.events.findMany({
      orderBy: [desc(schema.events.eventDate)]
    });
    
    if (status && status !== 'all') {
      query = db.query.events.findMany({
        where: eq(schema.events.status, status),
        orderBy: [desc(schema.events.eventDate)]
      });
    }
    
    return await query;
  },
  
  async getEventBySlug(slug: string) {
    return await db.query.events.findFirst({
      where: eq(schema.events.slug, slug)
    });
  },
  
  async createEvent(event: schema.InsertEvent) {
    const [newEvent] = await db.insert(schema.events)
      .values(event)
      .returning();
    
    return newEvent;
  },
  
  async updateEvent(id: number, event: Partial<schema.Event>) {
    const [updatedEvent] = await db.update(schema.events)
      .set({
        ...event,
        updatedAt: new Date()
      })
      .where(eq(schema.events.id, id))
      .returning();
    
    return updatedEvent;
  },
  
  async deleteEvent(id: number) {
    return await db.delete(schema.events)
      .where(eq(schema.events.id, id))
      .returning();
  },

  // Blog Management Functions
  async getBlogPosts(category?: string) {
    try {
      let query = db.select().from(schema.blogPosts);
      if (category) {
        query = query.where(eq(schema.blogPosts.category, category));
      }
      const posts = await query.orderBy(desc(schema.blogPosts.createdAt));
      return posts;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  async getBlogPostBySlug(slug: string) {
    try {
      const [post] = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.slug, slug));
      return post;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  async createBlogPost(postData: any) {
    try {
      const [newPost] = await db.insert(schema.blogPosts).values({
        ...postData,
        publishDate: postData.status === 'published' ? new Date() : null,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      return newPost;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  },

  async updateBlogPost(id: number, postData: any) {
    try {
      const [updatedPost] = await db.update(schema.blogPosts)
        .set({
          ...postData,
          updatedAt: new Date()
        })
        .where(eq(schema.blogPosts.id, id))
        .returning();
      return updatedPost;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  },

  async deleteBlogPost(id: number) {
    try {
      await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  },

  // Team Management Functions
  async getTeamMembers() {
    try {
      const members = await db.select().from(schema.aboutTeam).orderBy(asc(schema.aboutTeam.order));
      return members;
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  },

  async createTeamMember(memberData: any) {
    try {
      const [newMember] = await db.insert(schema.aboutTeam).values({
        ...memberData,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      return newMember;
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  },

  async updateTeamMember(id: number, memberData: any) {
    try {
      const [updatedMember] = await db.update(schema.aboutTeam)
        .set({
          ...memberData,
          updatedAt: new Date()
        })
        .where(eq(schema.aboutTeam.id, id))
        .returning();
      return updatedMember;
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  },

  async deleteTeamMember(id: number) {
    try {
      await db.delete(schema.aboutTeam).where(eq(schema.aboutTeam.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
  },

  // Enhanced Gallery Functions with Event Support
  async createGalleryItem(itemData: any) {
    try {
      const [newItem] = await db.insert(schema.galleryItems).values({
        title: itemData.title,
        category: itemData.category,
        description: itemData.description || '',
        event: itemData.event || '',
        date: itemData.date || null,
        imageUrl: itemData.mediaUrl || itemData.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      return newItem;
    } catch (error) {
      console.error('Error creating gallery item:', error);
      throw error;
    }
  },

  async updateGalleryItem(id: number, itemData: any) {
    try {
      const [updatedItem] = await db.update(schema.galleryItems)
        .set({
          title: itemData.title,
          category: itemData.category,
          description: itemData.description,
          event: itemData.event,
          date: itemData.date,
          imageUrl: itemData.mediaUrl || itemData.imageUrl,
          updatedAt: new Date()
        })
        .where(eq(schema.galleryItems.id, id))
        .returning();
      return updatedItem;
    } catch (error) {
      console.error('Error updating gallery item:', error);
      throw error;
    }
  },

  async deleteGalleryItem(id: number) {
    try {
      await db.delete(schema.galleryItems).where(eq(schema.galleryItems.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      throw error;
    }
  },

  // Contact/Inquiries Management
  async getContactSubmissions(status?: string) {
    try {
      let query = db.select().from(schema.contactSubmissions);
      if (status && status !== 'all') {
        query = query.where(eq(schema.contactSubmissions.status, status));
      }
      const submissions = await query.orderBy(desc(schema.contactSubmissions.createdAt));
      return submissions;
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      return [];
    }
  },

  async getContactSubmission(id: number) {
    try {
      const [submission] = await db.select().from(schema.contactSubmissions).where(eq(schema.contactSubmissions.id, id));
      return submission;
    } catch (error) {
      console.error('Error fetching contact submission:', error);
      return null;
    }
  },

  async updateContactSubmission(id: number, submissionData: any) {
    try {
      const [updatedSubmission] = await db.update(schema.contactSubmissions)
        .set({
          ...submissionData,
          updatedAt: new Date()
        })
        .where(eq(schema.contactSubmissions.id, id))
        .returning();
      return updatedSubmission;
    } catch (error) {
      console.error('Error updating contact submission:', error);
      throw error;
    }
  },

  async deleteContactSubmission(id: number) {
    try {
      await db.delete(schema.contactSubmissions).where(eq(schema.contactSubmissions.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting contact submission:', error);
      throw error;
    }
  },

  // Enhanced Testimonials Management
  async createTestimonial(testimonialData: any) {
    try {
      const [newTestimonial] = await db.insert(schema.testimonials).values({
        content: testimonialData.content,
        author: testimonialData.author,
        position: testimonialData.position,
        company: testimonialData.company,
        rating: testimonialData.rating || 5,
        avatar: testimonialData.avatar || null,
        event: testimonialData.event || null,
        featured: testimonialData.featured || false,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      return newTestimonial;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  },

  async updateTestimonial(id: number, testimonialData: any) {
    try {
      const [updatedTestimonial] = await db.update(schema.testimonials)
        .set({
          ...testimonialData,
          updatedAt: new Date()
        })
        .where(eq(schema.testimonials.id, id))
        .returning();
      return updatedTestimonial;
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  },

  async deleteTestimonial(id: number) {
    try {
      await db.delete(schema.testimonials).where(eq(schema.testimonials.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  },

  // Enhanced Events Management
  async createEvent(eventData: any) {
    try {
      const [newEvent] = await db.insert(schema.events).values({
        title: eventData.title,
        slug: eventData.slug || eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: eventData.description || '',
        eventDate: new Date(eventData.date || eventData.eventDate),
        location: eventData.location || '',
        category: eventData.category || 'general',
        status: eventData.status || 'upcoming',
        bannerImage: eventData.bannerImage || '',
        clientName: eventData.clientName || '',
        attendees: eventData.attendees || 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async updateEvent(id: number, eventData: any) {
    try {
      const [updatedEvent] = await db.update(schema.events)
        .set({
          title: eventData.title,
          description: eventData.description,
          eventDate: eventData.eventDate ? new Date(eventData.eventDate) : undefined,
          location: eventData.location,
          category: eventData.category,
          status: eventData.status,
          bannerImage: eventData.bannerImage,
          clientName: eventData.clientName,
          attendees: eventData.attendees,
          updatedAt: new Date()
        })
        .where(eq(schema.events.id, id))
        .returning();
      return updatedEvent;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  async deleteEvent(id: number) {
    try {
      await db.delete(schema.events).where(eq(schema.events.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  // Admin dashboard data
  async getDashboardData() {
    try {
      const events = await db.select().from(schema.events);
      const upcomingEvents = events.filter(event => new Date(event.eventDate) > new Date());
      
      const submissions = await db.select().from(schema.contactSubmissions);
      const newSubmissions = submissions.filter(submission => 
        submission.createdAt && new Date(submission.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      );
      
      const recentEvents = await db.select().from(schema.events).orderBy(desc(schema.events.eventDate)).limit(5);
      const recentSubmissions = await db.select().from(schema.contactSubmissions).orderBy(desc(schema.contactSubmissions.createdAt)).limit(5);
      
      return {
        stats: {
          totalEvents: events.length,
          upcomingEvents: upcomingEvents.length,
          totalInquiries: submissions.length,
          newInquiries: newSubmissions.length
        },
        recentEvents,
        recentInquiries: recentSubmissions
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return {
        stats: {
          totalEvents: 0,
          upcomingEvents: 0,
          totalInquiries: 0,
          newInquiries: 0
        },
        recentEvents: [],
        recentInquiries: []
      };
    }
  }
};
