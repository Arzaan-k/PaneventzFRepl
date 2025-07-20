const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock data for Netlify deployment (since we can't access the full database)
const mockServices = [
  {
    id: 1,
    title: "Corporate Event Management",
    slug: "corporate",
    description: "Professional corporate event planning and execution services for conferences, product launches, and business celebrations.",
    features: [
      { text: "Conference and seminar planning" },
      { text: "Product launch events" },
      { text: "Corporate celebrations and awards" },
      { text: "Team building activities" }
    ],
    processSteps: [
      { title: "Consultation", description: "Understanding your business objectives and event requirements", order: 1 },
      { title: "Strategic Planning", description: "Developing a comprehensive event strategy and timeline", order: 2 },
      { title: "Execution", description: "Flawless implementation with real-time management", order: 3 },
      { title: "Follow-up", description: "Post-event analysis and feedback collection", order: 4 }
    ]
  },
  {
    id: 2,
    title: "Wedding Planning",
    slug: "wedding",
    description: "Complete wedding planning services to make your special day perfect and memorable.",
    features: [
      { text: "Venue selection and decoration" },
      { text: "Catering and menu planning" },
      { text: "Photography and videography" },
      { text: "Entertainment coordination" }
    ],
    processSteps: [
      { title: "Initial Consultation", description: "Discussing your vision and requirements", order: 1 },
      { title: "Planning & Design", description: "Creating detailed plans and design concepts", order: 2 },
      { title: "Vendor Coordination", description: "Managing all vendors and suppliers", order: 3 },
      { title: "Event Execution", description: "Ensuring flawless execution on your special day", order: 4 }
    ]
  }
];

const mockStats = [
  { id: 1, title: "Events Completed", value: "500", icon: "calendar" },
  { id: 2, title: "Happy Clients", value: "300", icon: "users" },
  { id: 3, title: "Years Experience", value: "30", icon: "award" },
  { id: 4, title: "Team Members", value: "15", icon: "team" }
];

const mockTestimonials = [
  {
    id: 1,
    name: "Vikram Malhotra",
    position: "CEO, TechCorp",
    company: "TechCorp",
    content: "Pan Eventz delivered an exceptional corporate event. Their attention to detail and professionalism made our product launch a huge success.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Marketing Director",
    company: "Creative Solutions",
    content: "Outstanding service! The team managed our annual conference flawlessly. Every detail was perfectly executed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1f8?w=150&h=150&fit=crop&crop=face"
  }
];

// API Routes
app.get('/api/services', (req, res) => {
  res.json(mockServices);
});

app.get('/api/services/:slug', (req, res) => {
  const service = mockServices.find(s => s.slug === req.params.slug);
  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

app.get('/api/stats', (req, res) => {
  res.json(mockStats);
});

app.get('/api/testimonials', (req, res) => {
  res.json(mockTestimonials);
});

app.get('/api/about', (req, res) => {
  res.json({
    mission: "To create unforgettable events that exceed expectations and create lasting memories.",
    vision: "To be the leading event management company in India, known for innovation and excellence.",
    qualityCommitment: "We are committed to delivering exceptional quality in every aspect of our service."
  });
});

// Contact form submission
app.post('/api/contact', (req, res) => {
  // In a real deployment, you'd save this to a database or send an email
  console.log('Contact form submission:', req.body);
  res.json({ message: 'Thank you for your message. We will get back to you soon!' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Pan Eventz API is running on Netlify!' });
});

// Export the serverless function
module.exports.handler = serverless(app);