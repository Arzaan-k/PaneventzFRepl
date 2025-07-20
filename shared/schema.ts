import { pgTable, text, serial, integer, boolean, timestamp, json, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table.
// This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table for admin authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  role: text("role").default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  role: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  banner: text("banner"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const serviceFeatures = pgTable("service_features", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => services.id, { onDelete: "cascade" }).notNull(),
  text: text("text").notNull()
});

export const serviceFeaturesRelations = relations(serviceFeatures, ({ one }) => ({
  service: one(services, {
    fields: [serviceFeatures.serviceId],
    references: [services.id]
  })
}));

export const serviceProcessSteps = pgTable("service_process_steps", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => services.id, { onDelete: "cascade" }).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull()
});

export const serviceProcessStepsRelations = relations(serviceProcessSteps, ({ one }) => ({
  service: one(services, {
    fields: [serviceProcessSteps.serviceId],
    references: [services.id]
  })
}));

export const serviceRelations = relations(services, ({ many }) => ({
  features: many(serviceFeatures),
  processSteps: many(serviceProcessSteps),
  gallery: many(galleryItems)
}));

export const insertServiceSchema = createInsertSchema(services);
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Gallery items table
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  event: text("event"),
  date: text("date"),
  imageUrl: text("image_url").notNull(),
  serviceId: integer("service_id").references(() => services.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const galleryItemsRelations = relations(galleryItems, ({ one }) => ({
  service: one(services, {
    fields: [galleryItems.serviceId],
    references: [services.id]
  })
}));

export const insertGalleryItemSchema = createInsertSchema(galleryItems);
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;

// Slider content for homepage
export const slides = pgTable("slides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleHighlight: text("title_highlight"),
  description: text("description").notNull(),
  backgroundImage: text("background_image").notNull(),
  primaryCtaText: text("primary_cta_text").notNull(),
  primaryCtaLink: text("primary_cta_link").notNull(),
  secondaryCtaText: text("secondary_cta_text").notNull(),
  secondaryCtaLink: text("secondary_cta_link").notNull(),
  order: integer("order").notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertSlideSchema = createInsertSchema(slides);
export type InsertSlide = z.infer<typeof insertSlideSchema>;
export type Slide = typeof slides.$inferSelect;

// Technologies showcased
export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull(),
  active: boolean("active").default(true)
});

export const insertTechnologySchema = createInsertSchema(technologies);
export type InsertTechnology = z.infer<typeof insertTechnologySchema>;
export type Technology = typeof technologies.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  authorName: text("author_name").notNull(),
  authorTitle: text("author_title").notNull(),
  authorAvatar: text("author_avatar").notNull(),
  rating: integer("rating").notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertTestimonialSchema = createInsertSchema(testimonials);
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// About section content
export const about = pgTable("about", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  mission: text("mission").notNull(),
  vision: text("vision").notNull(),
  history: text("history"),
  team: text("team").notNull(),
  quality: text("quality").notNull(),
  images: json("images").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const aboutTeam = pgTable("about_team", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio").notNull(),
  image: text("image").notNull(),
  order: integer("order").notNull()
});

export const aboutValues = pgTable("about_values", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull()
});

export const insertAboutSchema = createInsertSchema(about);
export type InsertAbout = z.infer<typeof insertAboutSchema>;
export type About = typeof about.$inferSelect;

// Stats for homepage
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  value: integer("value").notNull(),
  suffix: text("suffix").default("+"),
  order: integer("order").notNull()
});

export const insertStatSchema = createInsertSchema(stats);
export type InsertStat = z.infer<typeof insertStatSchema>;
export type Stat = typeof stats.$inferSelect;

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  authorTitle: text("author_title").notNull(),
  authorImage: text("author_image").notNull(),
  publishDate: timestamp("publish_date").defaultNow().notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  tags: json("tags").$type<string[]>().notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertBlogPostSchema = createInsertSchema(blogPosts);
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventType: text("event_type").notNull(),
  message: text("message").notNull(),
  status: text("status").default("New").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions);
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Event management for admin
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: timestamp("event_date").notNull(),
  location: text("location").notNull(),
  status: text("status").default("Upcoming").notNull(),
  client: text("client"),
  budget: text("budget"),
  coverImage: text("cover_image"),
  images: json("images").$type<string[]>(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertEventSchema = createInsertSchema(events);
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
