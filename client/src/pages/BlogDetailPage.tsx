import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle: string;
  authorImage: string;
  publishDate: string;
  category: string;
  image: string;
  tags: string[];
}

const BlogDetailPage = () => {
  const [match, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<BlogPost | null>(null);

  // Hardcoded blog posts - same as BlogPage
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Top 10 Wedding Trends for 2024",
      slug: "top-10-wedding-trends-2024",
      excerpt: "Discover the newest wedding trends that are expected to dominate the event industry in 2024.",
      content: "The wedding industry continues to evolve, bringing fresh ideas and innovative approaches to celebrate love. As we step into 2024, couples are seeking more personalized, sustainable, and technologically integrated experiences for their special day.\n\n**1. Sustainable Celebrations**\nEco-conscious couples are choosing sustainable options for their weddings. From locally sourced flowers to biodegradable confetti, environmental responsibility is becoming a top priority. Venues that offer solar power, waste reduction programs, and locally sourced catering are increasingly popular.\n\n**2. Intimate Micro Weddings**\nThe trend toward smaller, more intimate gatherings continues to grow. Couples are choosing quality over quantity, focusing on meaningful connections with their closest family and friends. These smaller celebrations allow for more personalized attention to detail and often result in more memorable experiences.\n\n**3. Technology Integration**\nVirtual reality experiences, drone photography, and livestreaming capabilities are becoming standard offerings. Couples want to share their special moments with loved ones who cannot attend in person, making technology an essential component of modern weddings.\n\n**4. Bold Color Palettes**\nGone are the days of muted pastels. 2024 weddings are embracing vibrant, bold color combinations that reflect the couple's personality. Think deep emeralds paired with gold, or rich burgundy combined with copper accents.\n\n**5. Interactive Food Experiences**\nStatic buffets are being replaced with interactive culinary experiences. Live cooking stations, customizable food bars, and chef demonstrations are creating engaging dining experiences that serve as entertainment as well as nourishment.",
      author: "Imran Mirza",
      authorTitle: "Founder & CEO",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2024-01-15",
      category: "Wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["wedding", "trends", "events", "planning"]
    },
    {
      id: 2,
      title: "How to Plan a Successful Corporate Conference",
      slug: "successful-corporate-conference-planning",
      excerpt: "Learn the key strategies for organizing a memorable and productive corporate conference that achieves your business objectives.",
      content: "Corporate conferences are powerful tools for building relationships, sharing knowledge, and driving business growth. However, organizing a successful conference requires careful planning, attention to detail, and strategic thinking.\n\n**Setting Clear Objectives**\nBefore diving into logistics, establish clear goals for your conference. Are you launching a new product, building team morale, or facilitating knowledge sharing? Your objectives will guide every decision from venue selection to speaker lineup.\n\n**Choosing the Right Venue**\nYour venue sets the tone for the entire event. Consider factors like accessibility, technical capabilities, catering options, and ambiance. The space should align with your company culture and conference objectives.\n\n**Creating Engaging Content**\nYour content strategy is crucial for maintaining attendee engagement. Mix keynote presentations with interactive workshops, panel discussions, and networking sessions. Ensure your content addresses real challenges and provides actionable insights.\n\n**Technology and AV Setup**\nInvest in professional audio-visual equipment and technical support. Nothing derails a conference faster than technical difficulties. Have backup plans for internet connectivity, microphones, and presentation systems.\n\n**Measuring Success**\nDefine key performance indicators (KPIs) before the event. Post-conference surveys, engagement metrics, and follow-up actions will help you measure success and improve future events.",
      author: "Imran Mirza",
      authorTitle: "Founder & CEO",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2024-01-08",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["corporate", "conference", "planning", "business"]
    },
    {
      id: 3,
      title: "The Power of Live Events in Digital Marketing",
      slug: "live-events-digital-marketing",
      excerpt: "Explore how live events can enhance your digital marketing strategy and create authentic connections with your audience.",
      content: "In an increasingly digital world, live events offer something that virtual experiences often can't match: authentic human connection. Smart marketers are leveraging live events as powerful tools in their digital marketing arsenal.\n\n**Building Authentic Relationships**\nLive events provide opportunities for face-to-face interactions that build trust and rapport in ways that digital communications cannot. These genuine connections often translate into stronger business relationships and customer loyalty.\n\n**Content Creation Opportunities**\nEvents generate a wealth of content for digital channels. From behind-the-scenes footage to keynote highlights, live events provide months of social media content, blog posts, and marketing materials.\n\n**Data Collection and Insights**\nEvents offer unique opportunities to gather customer data and insights through surveys, interactions, and behavioral observations. This information can inform future marketing strategies and product development.\n\n**Brand Experience and Positioning**\nLive events allow you to control every aspect of the brand experience, from ambiance to messaging. This level of control helps reinforce brand positioning and values in a memorable way.\n\n**Amplification Through Social Media**\nEncourage attendees to share their experiences on social media with branded hashtags and photo opportunities. This user-generated content extends your event's reach far beyond the physical attendees.",
      author: "Imran Mirza",
      authorTitle: "Founder & CEO",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2023-12-22",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["marketing", "digital", "events", "strategy"]
    },
    {
      id: 4,
      title: "Creating Memorable Cultural Events",
      slug: "creating-memorable-cultural-events",
      excerpt: "Learn the art of organizing cultural events that celebrate diversity and create lasting memories for communities.",
      content: "Cultural events serve as bridges between communities, celebrating diversity while bringing people together through shared experiences. Creating memorable cultural events requires sensitivity, creativity, and deep understanding of the communities being served.\n\n**Understanding Cultural Context**\nSuccessful cultural events begin with thorough research and understanding of the cultural traditions, values, and sensitivities involved. Engage with community leaders and cultural experts to ensure authenticity and respect.\n\n**Inclusive Programming**\nDesign your event program to be inclusive and accessible to diverse audiences. Consider language barriers, dietary restrictions, accessibility needs, and cultural customs when planning activities and logistics.\n\n**Authentic Representation**\nEnsure that cultural elements are represented authentically rather than as stereotypes or oversimplifications. Work with cultural consultants and community members to maintain integrity and respect.\n\n**Community Engagement**\nInvolve the community in the planning process. Their input and participation not only ensures authenticity but also builds investment in the event's success.\n\n**Educational Components**\nIncorporate educational elements that help attendees learn about and appreciate different cultures. This might include workshops, demonstrations, storytelling sessions, or interactive exhibits.",
      author: "Imran Mirza",
      authorTitle: "Founder & CEO",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2023-12-10",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["cultural", "community", "diversity", "events"]
    },
    {
      id: 5,
      title: "Event Technology Trends Shaping 2024",
      slug: "event-technology-trends-2024",
      excerpt: "Discover the latest technology trends that are transforming the event industry and enhancing attendee experiences.",
      content: "Technology continues to revolutionize the event industry, offering new ways to engage audiences, streamline operations, and create immersive experiences. Here are the key technology trends shaping events in 2024.\n\n**Artificial Intelligence and Automation**\nAI is streamlining event planning through automated scheduling, personalized recommendations, and intelligent chatbots for attendee support. Machine learning algorithms help optimize everything from seating arrangements to catering quantities.\n\n**Hybrid Event Platforms**\nSeamless integration between in-person and virtual experiences is becoming standard. Advanced platforms now offer synchronized activities, shared networking opportunities, and unified engagement metrics.\n\n**Immersive Technologies**\nVirtual and augmented reality are creating new possibilities for product demonstrations, virtual venue tours, and interactive presentations. These technologies make events more engaging and memorable.\n\n**Advanced Analytics**\nReal-time data collection and analysis provide immediate insights into attendee behavior, engagement levels, and event performance. This data drives real-time adjustments and improves future events.\n\n**Sustainable Tech Solutions**\nDigital-first approaches reduce paper waste, while energy-efficient technologies minimize environmental impact. Smart lighting and climate control systems optimize energy usage based on occupancy.",
      author: "Imran Mirza",
      authorTitle: "Founder & CEO",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2023-11-28",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["technology", "innovation", "events", "trends"]
    },
    {
      id: 6,
      title: "Budget-Friendly Event Planning Tips",
      slug: "budget-friendly-event-planning-tips",
      excerpt: "Maximize your event's impact while minimizing costs with these proven budget-friendly planning strategies.",
      content: "Creating memorable events doesn't require unlimited budgets. With strategic planning and creative thinking, you can deliver exceptional experiences while staying within financial constraints.\n\n**Strategic Venue Selection**\nChoose venues during off-peak times for significant savings. Consider unconventional spaces like community centers, parks, or even corporate offices that can be transformed with creative decoration.\n\n**Smart Catering Choices**\nOpt for buffet-style serving over plated meals, choose seasonal ingredients, and consider daytime events which typically have lower catering costs. Food trucks and local caterers often provide excellent value.\n\n**DIY Decoration Elements**\nCreate impactful decorations using affordable materials. Lighting can dramatically transform a space at relatively low cost. Consider renting or borrowing items instead of purchasing.\n\n**Technology Leveraging**\nUse free or low-cost digital tools for registration, communication, and event management. Social media marketing is cost-effective for promotion and engagement.\n\n**Volunteer and Partner Support**\nEngage volunteers for non-critical tasks and seek partnerships with local businesses for sponsorship opportunities. These relationships can provide both cost savings and added value.",
      author: "Imran Mirza",
      authorTitle: "Founder & CEO",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2023-11-15",
      category: "Planning",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["budget", "planning", "tips", "cost-effective"]
    }
  ];

  useEffect(() => {
    if (params?.slug) {
      const foundPost = blogPosts.find(p => p.slug === params.slug);
      setPost(foundPost || null);
      
      if (foundPost) {
        document.title = `${foundPost.title} - Pan Eventz Blog`;
      } else {
        document.title = "Post Not Found - Pan Eventz Blog";
      }
    }
  }, [params?.slug]);

  if (!match) {
    return null;
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">Post Not Found</h1>
            <p className="text-lg text-neutral-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Format content with basic markdown-style formatting
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          // Handle bold headings
          const text = paragraph.replace(/\*\*/g, '');
          return (
            <h3 key={index} className="text-xl font-bold text-neutral-800 mb-3 mt-6">
              {text}
            </h3>
          );
        } else {
          // Regular paragraphs
          return (
            <p key={index} className="text-neutral-700 mb-4 leading-relaxed">
              {paragraph}
            </p>
          );
        }
      });
  };

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-32 bg-center bg-cover"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${post.image}')`
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="mb-4">
                <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-montserrat mb-6">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <img 
                    src={post.authorImage} 
                    alt={post.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{post.author}</span>
                </div>
                <span>•</span>
                <span>{formatDate(new Date(post.publishDate))}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-8 p-6 bg-neutral-50 rounded-xl">
                <img 
                  src={post.authorImage} 
                  alt={post.author}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-neutral-800">{post.author}</h3>
                  <p className="text-neutral-600">{post.authorTitle}</p>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {formatContent(post.content)}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <h4 className="font-bold text-neutral-800 mb-4">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Back to Blog */}
              <div className="mt-12 text-center">
                <Link href="/blog">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Blog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogDetailPage;