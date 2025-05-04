import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: () => fetch('/api/blog').then(res => res.json()),
  });

  // Fallback blog posts if API fails or is loading
  const fallbackBlogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Top 10 Wedding Trends for 2024",
      slug: "top-10-wedding-trends-2024",
      excerpt: "Discover the newest wedding trends that are expected to dominate the event industry in 2024.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
      author: "Priya Sharma",
      authorTitle: "Wedding Events Specialist",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2023-12-15",
      category: "Wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["wedding", "trends", "events", "planning"]
    },
    {
      id: 2,
      title: "How to Plan a Successful Corporate Conference",
      slug: "successful-corporate-conference-planning",
      excerpt: "Learn the key strategies for organizing a memorable and productive corporate conference that achieves your business objectives.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
      author: "Rajiv Mehta",
      authorTitle: "Corporate Events Director",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2023-11-28",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["corporate", "conference", "planning", "business"]
    },
    {
      id: 3,
      title: "The Evolution of Event Technology",
      slug: "event-technology-evolution",
      excerpt: "An in-depth look at how technology has transformed the event industry and what innovations to expect in the coming years.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
      author: "Imran Mirza",
      authorTitle: "Founder & CEO",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2023-10-10",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["technology", "innovation", "events", "digital"]
    },
    {
      id: 4,
      title: "Creating Inclusive Cultural Events",
      slug: "inclusive-cultural-events",
      excerpt: "How to design cultural events that celebrate diversity and ensure accessibility for all participants.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
      author: "Ananya Patel",
      authorTitle: "Cultural Events Specialist",
      authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2023-09-22",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["cultural", "diversity", "inclusion", "events"]
    },
    {
      id: 5,
      title: "Sustainable Event Management Practices",
      slug: "sustainable-event-management",
      excerpt: "Explore eco-friendly approaches to event planning that minimize environmental impact while maximizing guest experience.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
      author: "Imran Mirza",
      authorTitle: "Founder & CEO",
      authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2023-08-15",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["sustainability", "eco-friendly", "green-events", "environment"]
    },
    {
      id: 6,
      title: "Sports Event Management: From Planning to Execution",
      slug: "sports-event-management-guide",
      excerpt: "A comprehensive guide to organizing successful sports events, from local tournaments to professional competitions.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
      author: "Rajiv Mehta",
      authorTitle: "Sports Events Director",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      publishDate: "2023-07-30",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      tags: ["sports", "events", "management", "tournaments"]
    }
  ];

  // Use actual blog posts or fallback
  const displayBlogPosts = blogPosts.length > 0 ? blogPosts : fallbackBlogPosts;

  // Filter and search blog posts
  const filteredPosts = displayBlogPosts.filter((post) => {
    const matchesCategory = filterCategory === "all" || post.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Extract unique categories for filter
  const categories = ["all", ...new Set(displayBlogPosts.map(post => post.category.toLowerCase()))];

  // Set page title
  useEffect(() => {
    document.title = "Blog - Pan Eventz";
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* Blog Banner */}
        <section 
          className="relative py-32 bg-center bg-cover"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=600&q=80')"
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
              Event Planning Insights
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Explore our blog for industry trends, planning tips, and creative event ideas.
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main Content */}
              <div className="w-full md:w-2/3">
                {/* Search and Filter */}
                <div className="mb-10 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Search blog posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={filterCategory === category ? "default" : "outline"}
                        onClick={() => setFilterCategory(category)}
                        className={`capitalize ${filterCategory === category ? 'bg-primary text-white' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Blog Posts */}
                {isLoading ? (
                  // Loading skeleton
                  <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex flex-col sm:flex-row gap-6 animate-pulse">
                        <div className="w-full sm:w-1/3">
                          <div className="h-48 bg-neutral-200 rounded-lg"></div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="h-6 bg-neutral-200 rounded w-3/4"></div>
                          <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                          <div className="h-4 bg-neutral-200 rounded w-full"></div>
                          <div className="h-4 bg-neutral-200 rounded w-full"></div>
                          <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                          <div className="h-10 bg-neutral-200 rounded w-1/4 mt-4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-neutral-500">No blog posts found matching your criteria.</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSearchTerm("");
                        setFilterCategory("all");
                      }}
                      className="text-primary mt-2"
                    >
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {filteredPosts.map((post) => (
                      <div key={post.id} className="flex flex-col sm:flex-row gap-6 border-b border-neutral-200 pb-10">
                        <div className="w-full sm:w-1/3">
                          <Link href={`/blog/${post.slug}`}>
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </Link>
                        </div>
                        <div className="flex-1">
                          <Link href={`/blog/${post.slug}`}>
                            <h2 className="text-2xl font-bold font-montserrat mb-2 hover:text-primary transition-colors">
                              {post.title}
                            </h2>
                          </Link>
                          <div className="flex items-center text-sm text-neutral-500 mb-3">
                            <span>{formatDate(new Date(post.publishDate))}</span>
                            <span className="mx-2">|</span>
                            <span className="capitalize">{post.category}</span>
                          </div>
                          <p className="text-neutral-700 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                              Read More
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="w-full md:w-1/3 space-y-8">
                {/* About the Blog */}
                <div className="bg-neutral-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold font-montserrat mb-4">About Our Blog</h3>
                  <p className="text-neutral-700 mb-3">
                    Welcome to the Pan Eventz blog, where we share industry insights, planning tips, and creative ideas for exceptional events.
                  </p>
                  <p className="text-neutral-700">
                    Stay updated with the latest trends and expert advice from our experienced team.
                  </p>
                </div>

                {/* Recent Posts */}
                <div className="bg-neutral-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold font-montserrat mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {displayBlogPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex gap-3">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <Link href={`/blog/${post.slug}`}>
                            <h4 className="font-bold hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                          </Link>
                          <p className="text-sm text-neutral-500">
                            {formatDate(new Date(post.publishDate))}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-neutral-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold font-montserrat mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.filter(cat => cat !== "all").map((category) => (
                      <button
                        key={category}
                        onClick={() => setFilterCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded capitalize hover:bg-neutral-200 transition-colors ${
                          filterCategory === category ? 'font-bold text-primary' : 'text-neutral-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-primary text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold font-montserrat mb-4">Subscribe to Our Newsletter</h3>
                  <p className="mb-4">
                    Get the latest event planning tips and industry trends delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded-lg text-neutral-800 border-none"
                    />
                    <Button className="w-full bg-white text-primary hover:bg-neutral-100">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;
