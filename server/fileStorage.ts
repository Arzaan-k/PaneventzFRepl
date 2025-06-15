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
    return this.readCollection('blogPosts');
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
    return this.readCollection('galleryItems');
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
    return this.readCollection('teamMembers');
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
    return this.readCollection('testimonials');
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
    return this.readCollection('events');
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