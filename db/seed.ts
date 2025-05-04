import { db } from "./index";
import * as schema from "@shared/schema";
import bcrypt from "bcrypt";

async function seed() {
  try {
    console.log("🌱 Starting database seeding...");

    // Create admin user
    const existingAdmin = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, "admin")
    });

    if (!existingAdmin) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("admin123", saltRounds);
      
      await db.insert(schema.users).values({
        username: "admin",
        password: hashedPassword,
        name: "Admin User",
        role: "admin"
      });
      
      console.log("✅ Admin user created");
    } else {
      console.log("⏩ Admin user already exists, skipping");
    }

    // Seed services
    const existingServices = await db.query.services.findMany();
    
    if (existingServices.length === 0) {
      const services = [
        {
          slug: "corporate",
          title: "Corporate Events",
          description: "Professional conferences, product launches, team-building events, and corporate galas designed to elevate your brand.",
          imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
          banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&h=500&q=80"
        },
        {
          slug: "wedding",
          title: "Wedding Events",
          description: "Magical wedding experiences, from intimate ceremonies to grand celebrations, with meticulous attention to detail.",
          imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
          banner: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&h=500&q=80"
        },
        {
          slug: "sports",
          title: "Sports Events",
          description: "Dynamic sports event management with professional sound systems, lighting, and live streaming services.",
          imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
          banner: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&h=500&q=80"
        },
        {
          slug: "education",
          title: "School & College Events",
          description: "Vibrant educational events including annual functions, cultural fests, and inter-school competitions.",
          imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
          banner: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&h=500&q=80"
        },
        {
          slug: "cultural",
          title: "Cultural Events",
          description: "Showcase cultural performances, TED Talks, art exhibitions, and community gatherings with professional execution.",
          imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
          banner: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&h=500&q=80"
        },
        {
          slug: "logistics",
          title: "Logistics & Production",
          description: "Comprehensive event logistics including transportation, resource management, and on-ground coordination.",
          imageUrl: "https://images.unsplash.com/photo-1492683513054-55277abccd99?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
          banner: "https://images.unsplash.com/photo-1492683513054-55277abccd99?ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&h=500&q=80"
        }
      ];
      
      for (const service of services) {
        const [newService] = await db.insert(schema.services).values(service).returning();
        
        // Add features for each service
        let features = [];
        if (service.slug === "corporate") {
          features = [
            { serviceId: newService.id, text: "Conferences & Seminars" },
            { serviceId: newService.id, text: "Award Ceremonies" },
            { serviceId: newService.id, text: "Team Building Events" }
          ];
        } else if (service.slug === "wedding") {
          features = [
            { serviceId: newService.id, text: "Wedding Planning & Coordination" },
            { serviceId: newService.id, text: "Elegant Decor & Staging" },
            { serviceId: newService.id, text: "Cultural Wedding Ceremonies" }
          ];
        } else if (service.slug === "sports") {
          features = [
            { serviceId: newService.id, text: "Tournament Organization" },
            { serviceId: newService.id, text: "Live Streaming & Broadcasting" },
            { serviceId: newService.id, text: "Audio-Visual Production" }
          ];
        } else if (service.slug === "education") {
          features = [
            { serviceId: newService.id, text: "Annual Day Functions" },
            { serviceId: newService.id, text: "College Festivals" },
            { serviceId: newService.id, text: "Graduation Ceremonies" }
          ];
        } else if (service.slug === "cultural") {
          features = [
            { serviceId: newService.id, text: "TED Talks & Conferences" },
            { serviceId: newService.id, text: "Music & Dance Performances" },
            { serviceId: newService.id, text: "Art & Cultural Exhibitions" }
          ];
        } else if (service.slug === "logistics") {
          features = [
            { serviceId: newService.id, text: "Equipment & Resource Management" },
            { serviceId: newService.id, text: "Transportation & Accommodation" },
            { serviceId: newService.id, text: "On-site Event Coordination" }
          ];
        }
        
        await db.insert(schema.serviceFeatures).values(features);
        
        // Add process steps for each service
        const processSteps = [
          { 
            serviceId: newService.id, 
            title: "Consultation", 
            description: "We begin with an in-depth consultation to understand your goals, preferences, and requirements.",
            order: 1
          },
          { 
            serviceId: newService.id, 
            title: "Proposal & Planning", 
            description: "Based on your input, we create a comprehensive event proposal with detailed planning and timelines.",
            order: 2
          },
          { 
            serviceId: newService.id, 
            title: "Execution", 
            description: "Our team handles all aspects of setup, management, and coordination on the event day.",
            order: 3
          },
          { 
            serviceId: newService.id, 
            title: "Post-Event Analysis", 
            description: "We provide a detailed report and analysis to measure the success of your event.",
            order: 4
          }
        ];
        
        await db.insert(schema.serviceProcessSteps).values(processSteps);
      }
      
      console.log("✅ Services created");
    } else {
      console.log("⏩ Services already exist, skipping");
    }

    // Seed slider content
    const existingSlides = await db.query.slides.findMany();
    
    if (existingSlides.length === 0) {
      const slides = [
        {
          title: "Creating",
          titleHighlight: "Memorable",
          description: "Pan Eventz - Your trusted partner for extraordinary corporate events, weddings, and celebrations.",
          backgroundImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=800&q=80",
          primaryCtaText: "Our Services",
          primaryCtaLink: "services",
          secondaryCtaText: "Contact Us",
          secondaryCtaLink: "contact",
          order: 1,
          active: true
        },
        {
          title: "Stunning",
          titleHighlight: "Wedding",
          description: "We bring your dream wedding to life with impeccable planning and magical execution.",
          backgroundImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=800&q=80",
          primaryCtaText: "Wedding Services",
          primaryCtaLink: "services/wedding",
          secondaryCtaText: "View Gallery",
          secondaryCtaLink: "gallery",
          order: 2,
          active: true
        },
        {
          title: "Spectacular",
          titleHighlight: "Cultural",
          description: "From TED Talks to music festivals, we create immersive cultural experiences that inspire.",
          backgroundImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=800&q=80",
          primaryCtaText: "Cultural Events",
          primaryCtaLink: "services/cultural",
          secondaryCtaText: "Get a Quote",
          secondaryCtaLink: "contact",
          order: 3,
          active: true
        }
      ];
      
      await db.insert(schema.slides).values(slides);
      console.log("✅ Slides created");
    } else {
      console.log("⏩ Slides already exist, skipping");
    }

    // Seed technologies
    const existingTechnologies = await db.query.technologies.findMany();
    
    if (existingTechnologies.length === 0) {
      const technologies = [
        {
          title: "Pro Audio",
          description: "High-end sound systems for crystal clear audio.",
          icon: "fa-volume-up",
          order: 1,
          active: true
        },
        {
          title: "Video Shooting",
          description: "Professional video capture and production services.",
          icon: "fa-video",
          order: 2,
          active: true
        },
        {
          title: "Lighting Systems",
          description: "Advanced lighting solutions for perfect ambiance.",
          icon: "fa-lightbulb",
          order: 3,
          active: true
        },
        {
          title: "LED Walls",
          description: "High-resolution LED displays for dynamic visuals.",
          icon: "fa-tv",
          order: 4,
          active: true
        },
        {
          title: "Laser Shows",
          description: "Spectacular laser displays for stunning effects.",
          icon: "fa-bahai",
          order: 5,
          active: true
        },
        {
          title: "Stage Design",
          description: "Custom stage setups to match your event theme.",
          icon: "fa-drafting-compass",
          order: 6,
          active: true
        }
      ];
      
      await db.insert(schema.technologies).values(technologies);
      console.log("✅ Technologies created");
    } else {
      console.log("⏩ Technologies already exist, skipping");
    }

    // Seed gallery items
    const existingGallery = await db.query.galleryItems.findMany();
    
    if (existingGallery.length === 0) {
      const galleryItems = [
        {
          title: "Annual Corporate Summit",
          category: "corporate",
          description: "Annual leadership summit for a multinational corporation featuring keynote speakers and interactive workshops.",
          event: "Leadership Summit 2023",
          date: "March 15, 2023",
          imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
        },
        {
          title: "Destination Wedding",
          category: "wedding",
          description: "Luxurious destination wedding with personalized decor and spectacular lighting arrangements.",
          event: "Sharma-Kapoor Wedding",
          date: "November 5, 2023",
          imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
        },
        {
          title: "TED Talk Conference",
          category: "cultural",
          description: "TED Talk event featuring renowned speakers from various industries sharing innovative ideas.",
          event: "TEDx Delhi 2023",
          date: "June 24, 2023",
          imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
        },
        {
          title: "City Marathon",
          category: "sports",
          description: "Annual city marathon with over 5,000 participants, featuring live event coverage and customized stage setups.",
          event: "Delhi Marathon 2023",
          date: "January 29, 2023",
          imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
        },
        {
          title: "Product Launch",
          category: "corporate",
          description: "High-profile product launch event with interactive displays and immersive brand experience.",
          event: "NextGen Tech Launch",
          date: "August 12, 2023",
          imageUrl: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
        },
        {
          title: "Reception Celebration",
          category: "wedding",
          description: "Elegant wedding reception with custom lighting, sound systems, and decorative elements.",
          event: "Gupta-Patel Reception",
          date: "December 18, 2023",
          imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
        },
        {
          title: "Music Festival",
          category: "cultural",
          description: "Three-day music festival featuring multiple stages, artist management, and comprehensive sound system setup.",
          event: "Harmony Fest 2023",
          date: "October 7-9, 2023",
          imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
        },
        {
          title: "College Sports Tournament",
          category: "sports",
          description: "Inter-college sports tournament with multiple events, live streaming, and professional event management.",
          event: "Collegiate Champions League",
          date: "February 15-20, 2023",
          imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
        }
      ];
      
      await db.insert(schema.galleryItems).values(galleryItems);
      console.log("✅ Gallery items created");
    } else {
      console.log("⏩ Gallery items already exist, skipping");
    }

    // Seed testimonials
    const existingTestimonials = await db.query.testimonials.findMany();
    
    if (existingTestimonials.length === 0) {
      const testimonials = [
        {
          content: "Pan Eventz transformed our corporate annual meeting into a spectacular event. Their attention to detail, creative ideas, and flawless execution exceeded our expectations. Highly recommended!",
          authorName: "Rajiv Sharma",
          authorTitle: "CEO, Techvantage Solutions",
          authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          rating: 5,
          active: true
        },
        {
          content: "Our wedding day was perfect thanks to Pan Eventz. They understood our vision and brought it to life with their creative touch. The decoration, lighting, and overall management were impeccable.",
          authorName: "Priya & Arun Kapoor",
          authorTitle: "Wedding Clients",
          authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          rating: 5,
          active: true
        },
        {
          content: "The cultural festival we organized with Pan Eventz was a huge success. Their technical expertise with sound systems, lighting, and stage management was outstanding. They made our vision come to life!",
          authorName: "Vikram Mehta",
          authorTitle: "Cultural Festival Organizer",
          authorAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          rating: 5,
          active: true
        }
      ];
      
      await db.insert(schema.testimonials).values(testimonials);
      console.log("✅ Testimonials created");
    } else {
      console.log("⏩ Testimonials already exist, skipping");
    }

    // Seed about content
    const existingAbout = await db.query.about.findFirst();
    
    if (!existingAbout) {
      const aboutContent = {
        description: "Pan Eventz is a premier event management company dedicated to creating extraordinary experiences through innovation, creativity, and flawless execution. With over a decade of industry experience, we specialize in conceptualizing, planning, and executing events of all scales - from intimate gatherings to grand celebrations. Our expert team handles everything from initial concept development to final execution, ensuring every detail is perfect.",
        mission: "To create memorable events that exceed client expectations.",
        vision: "To be the most trusted event management partner nationally.",
        history: "Founded in 2013, Pan Eventz began as a small team passionate about creating exceptional events. Over the years, we've grown into a full-service event management company with a reputation for excellence. Our journey has been defined by a commitment to innovation, quality, and client satisfaction. From humble beginnings coordinating local corporate meetings to now managing large-scale national events, weddings, and cultural festivals, we've maintained our core values while expanding our capabilities and reach. Today, Pan Eventz stands as a leader in the industry, with a team of experienced professionals dedicated to bringing creative visions to life through meticulous planning and flawless execution.",
        team: "Skilled professionals with diverse expertise.",
        quality: "We never compromise on quality and service.",
        images: [
          "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
          "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
        ]
      };
      
      await db.insert(schema.about).values(aboutContent);
      console.log("✅ About content created");
      
      // Add team members
      const teamMembers = [
        {
          name: "Imran Mirza",
          position: "Founder & CEO",
          bio: "With over 15 years of experience in event management, Imran leads the company with vision and strategic direction. His passion for creating exceptional experiences drives the company's commitment to excellence.",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
          order: 1
        },
        {
          name: "Priya Sharma",
          position: "Creative Director",
          bio: "Priya brings artistic vision and creative expertise to every event. Her background in design and production enables her to transform concepts into immersive, memorable experiences.",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
          order: 2
        },
        {
          name: "Rajiv Mehta",
          position: "Technical Director",
          bio: "Rajiv oversees all technical aspects of events, from sound and lighting to stage design and special effects. His technical knowledge ensures flawless event execution.",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
          order: 3
        },
        {
          name: "Ananya Patel",
          position: "Client Relations Manager",
          bio: "Ananya excels at understanding client needs and ensuring their vision is realized. Her attention to detail and communication skills make her an invaluable liaison between clients and the production team.",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
          order: 4
        }
      ];
      
      await db.insert(schema.aboutTeam).values(teamMembers);
      console.log("✅ Team members created");
      
      // Add values
      const values = [
        {
          title: "Excellence",
          description: "We strive for excellence in every aspect of our work, consistently delivering high-quality services that exceed expectations.",
          order: 1
        },
        {
          title: "Creativity",
          description: "We bring fresh, innovative ideas to every project, creating unique and memorable experiences for our clients.",
          order: 2
        },
        {
          title: "Integrity",
          description: "We operate with honesty, transparency, and ethical conduct in all our business dealings.",
          order: 3
        },
        {
          title: "Collaboration",
          description: "We believe in the power of teamwork, both within our organization and in our partnerships with clients.",
          order: 4
        }
      ];
      
      await db.insert(schema.aboutValues).values(values);
      console.log("✅ Values created");
    } else {
      console.log("⏩ About content already exists, skipping");
    }

    // Seed stats
    const existingStats = await db.query.stats.findMany();
    
    if (existingStats.length === 0) {
      const stats = [
        { label: "Events Completed", value: 500, suffix: "+", order: 1 },
        { label: "Happy Clients", value: 350, suffix: "+", order: 2 },
        { label: "Years Experience", value: 10, suffix: "+", order: 3 },
        { label: "Team Members", value: 50, suffix: "+", order: 4 }
      ];
      
      await db.insert(schema.stats).values(stats);
      console.log("✅ Stats created");
    } else {
      console.log("⏩ Stats already exist, skipping");
    }

    // Seed blog posts
    const existingPosts = await db.query.blogPosts.findMany();
    
    if (existingPosts.length === 0) {
      const blogPosts = [
        {
          title: "Top 10 Wedding Trends for 2024",
          slug: "top-10-wedding-trends-2024",
          excerpt: "Discover the newest wedding trends that are expected to dominate the event industry in 2024.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
          author: "Priya Sharma",
          authorTitle: "Wedding Events Specialist",
          authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          publishDate: new Date("2023-12-15"),
          category: "Wedding",
          image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          tags: ["wedding", "trends", "events", "planning"],
          active: true
        },
        {
          title: "How to Plan a Successful Corporate Conference",
          slug: "successful-corporate-conference-planning",
          excerpt: "Learn the key strategies for organizing a memorable and productive corporate conference that achieves your business objectives.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
          author: "Rajiv Mehta",
          authorTitle: "Corporate Events Director",
          authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          publishDate: new Date("2023-11-28"),
          category: "Corporate",
          image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          tags: ["corporate", "conference", "planning", "business"],
          active: true
        },
        {
          title: "The Evolution of Event Technology",
          slug: "event-technology-evolution",
          excerpt: "An in-depth look at how technology has transformed the event industry and what innovations to expect in the coming years.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
          author: "Imran Mirza",
          authorTitle: "Founder & CEO",
          authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          publishDate: new Date("2023-10-10"),
          category: "Technology",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          tags: ["technology", "innovation", "events", "digital"],
          active: true
        },
        {
          title: "Creating Inclusive Cultural Events",
          slug: "inclusive-cultural-events",
          excerpt: "How to design cultural events that celebrate diversity and ensure accessibility for all participants.",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
          author: "Ananya Patel",
          authorTitle: "Cultural Events Specialist",
          authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
          publishDate: new Date("2023-09-22"),
          category: "Cultural",
          image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          tags: ["cultural", "diversity", "inclusion", "events"],
          active: true
        }
      ];
      
      await db.insert(schema.blogPosts).values(blogPosts);
      console.log("✅ Blog posts created");
    } else {
      console.log("⏩ Blog posts already exist, skipping");
    }

    // Seed sample events
    const existingEvents = await db.query.events.findMany();
    
    if (existingEvents.length === 0) {
      const events = [
        {
          title: "Sharma-Kapoor Wedding",
          slug: "sharma-kapoor-wedding",
          description: "Luxurious destination wedding with personalized decor and spectacular lighting arrangements.",
          eventType: "Wedding",
          eventDate: new Date("2023-12-20"),
          location: "Udaipur Palace Hotel, Rajasthan",
          status: "Upcoming",
          client: "Sharma Family",
          coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          images: [
            "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
          ],
          notes: "Three-day wedding celebration with sangeet, mehendi, and reception."
        },
        {
          title: "TechCorp Annual Conference",
          slug: "techcorp-annual-conference",
          description: "Annual leadership summit featuring keynote speakers and interactive workshops for company executives.",
          eventType: "Corporate",
          eventDate: new Date("2023-12-15"),
          location: "Hyatt Regency, Delhi",
          status: "Upcoming",
          client: "TechCorp India Ltd.",
          coverImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          images: [
            "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
          ],
          notes: "Full AV setup with live streaming for remote participants."
        },
        {
          title: "City Marathon 2023",
          slug: "city-marathon-2023",
          description: "Annual city marathon with over 5,000 participants, featuring live event coverage and customized stage setups.",
          eventType: "Sports",
          eventDate: new Date("2023-12-10"),
          location: "Central Park, Delhi",
          status: "Upcoming",
          client: "Delhi Sports Commission",
          coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          images: [
            "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
          ],
          notes: "Live broadcast on regional sports channels."
        },
        {
          title: "Cultural Festival - Delhi",
          slug: "cultural-festival-delhi",
          description: "Three-day cultural festival featuring music, dance, and art exhibitions from across India.",
          eventType: "Cultural",
          eventDate: new Date("2023-12-05"),
          location: "Purana Qila, Delhi",
          status: "Completed",
          client: "Ministry of Culture",
          coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          images: [
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
          ],
          notes: "Multiple stages with different cultural performances running simultaneously."
        },
        {
          title: "Delhi Public School Annual Day",
          slug: "dps-annual-day",
          description: "School annual day featuring student performances, awards ceremony, and custom stage design.",
          eventType: "Education",
          eventDate: new Date("2023-11-28"),
          location: "Delhi Public School, Noida",
          status: "Completed",
          client: "Delhi Public School",
          coverImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
          images: [
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
          ],
          notes: "Event coordination for 300+ student performers."
        }
      ];
      
      await db.insert(schema.events).values(events);
      console.log("✅ Events created");
    } else {
      console.log("⏩ Events already exist, skipping");
    }

    console.log("🎉 Seeding complete!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

seed();
