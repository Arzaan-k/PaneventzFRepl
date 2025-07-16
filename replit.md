# Pan Eventz - Event Management Platform

## Overview

Pan Eventz is a full-stack event management platform built with modern web technologies. It features a React frontend with a Node.js/Express backend, PostgreSQL database through Drizzle ORM, and comprehensive admin management capabilities. The platform serves as both a client-facing website and a content management system for event organizers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **File Uploads**: Multer for handling media uploads
- **Session Management**: Express sessions with PostgreSQL store

## Key Components

### Public-Facing Website
- **Homepage**: Hero slider, services overview, testimonials, statistics
- **Services Pages**: Detailed service descriptions with dynamic content
- **Media Gallery**: Cloudinary-integrated image galleries organized by event folders
- **About Page**: Company information, team members, mission/vision
- **Contact Page**: Contact form with inquiry management
- **Blog**: Content marketing with categorized posts

### Admin Dashboard
- **Content Management**: Edit homepage content, services, about sections
- **Event Management**: Create and manage event portfolios
- **Gallery Management**: Upload and organize media assets
- **Team Management**: Manage team member profiles
- **Inquiries**: Handle contact form submissions
- **Blog Management**: Create and publish blog posts
- **Statistics Dashboard**: Track website metrics and performance

### Authentication System
- **Admin Login**: JWT-based authentication for admin users
- **Replit Auth Integration**: OAuth integration for development environment
- **Role-based Access**: Admin and user role differentiation

## Data Flow

### Content Management Flow
1. Admin authenticates via JWT token
2. Admin accesses dashboard through protected routes
3. Content changes are sent via REST API to backend
4. Backend validates and stores data in PostgreSQL
5. Frontend queries updated data via TanStack Query
6. Changes reflect immediately on public website

### File Upload Flow
1. Admin uploads media through file uploader component
2. Multer middleware processes files on backend
3. Files are stored in local uploads directory
4. File paths are stored in database for reference
5. Images are served via Express static middleware

### Cloudinary Integration
- **Media Page**: Fetches images from actual Cloudinary folders using correct API endpoints
- **Event Galleries**: Displays organized event photography from 16 different event folders
- **API Integration**: Uses Cloudinary Admin API with by_asset_folder endpoint for folder management
- **Celebrity Section**: Dynamic loading of images from "Imran (CEO) with Celebs" folder on homepage

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for Neon database
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Accessible UI component primitives
- **drizzle-orm**: Type-safe database ORM
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **multer**: File upload handling

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production
- **drizzle-kit**: Database migration tool
- **@replit/vite-plugin-***: Replit-specific development tools

### External Services
- **Cloudinary**: Image hosting and management
- **Neon Database**: PostgreSQL hosting
- **FontAwesome**: Icon library
- **Google Fonts**: Typography (Montserrat, Open Sans, Playfair Display)

## Deployment Strategy

### Development Environment
- **Dev Server**: `tsx server/index.ts` for hot reloading
- **Frontend**: Vite dev server with HMR
- **Database**: Drizzle migrations via `db:push` command
- **Seeding**: Default admin users and content via `db:seed`

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server to `dist/index.js`
- **Static Files**: Express serves built frontend and uploaded media
- **Database**: Drizzle migrations run on deployment

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **JWT_SECRET**: Token signing secret
- **NODE_ENV**: Environment detection
- **REPLIT_***: Development environment variables

### File Structure
```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared schemas and types
├── db/              # Database configuration and migrations
├── data/            # JSON data files for fallback content
├── uploads/         # Local file storage
└── dist/            # Production build output
```

The architecture prioritizes developer experience with hot reloading, type safety, and modern tooling while maintaining production readiness with optimized builds and reliable data persistence.

## Recent Changes (July 16, 2025)

### Contact Information Update
- Updated all contact information throughout the website:
  - Email: pan.eventz7@gmail.com (replaced all previous email addresses)
  - Phone: +91 98213 37523 (replaced all previous phone numbers)
  - Address: Mumbai, Maharashtra, India (simplified from previous detailed addresses)
- Contact information updated in:
  - Contact Page banner section
  - Contact Section component
  - Footer component
  - Admin Settings default values
  - Team member data for Imran Mirza
- All components now consistently display the new contact details

### Homepage Restructure and Content Hardcoding
- Hardcoded blog content with 6 comprehensive articles covering wedding trends, corporate conferences, digital marketing, cultural events, technology trends, and budget planning
- Removed API dependencies for blogs and technologies to improve reliability
- Created new PremiumServices component with modern card design and hover effects
- Updated homepage layout to match paneventz.com structure: Hero > Premium Services > Technology > Celebrity > About > Testimonials > Statistics > Contact > CTA
- Enhanced AboutSection with improved text display and better content structure
- Fixed Statistics component to handle different field mappings correctly
- Removed "Budget Friendly" option from Services page Why Choose Us section

### About Page and Content Standardization
- Fixed AboutPage error by removing team mapping issue and Array.isArray validation
- Updated entire website to feature only Imran Mirza throughout all content
- Changed team section from "Meet Our Team" to "Meet Our Founder" 
- Updated all content to reflect Imran Mirza's 30+ years of experience
- Corrected company founding year to 2017 with expanded company history
- Standardized all blog posts to show Imran Mirza as the sole author
- Enhanced About page banner text to include experience details
- Added comprehensive biography for Imran Mirza with career journey details
- Fixed "Our Journey" section to show "Since 2017" instead of "Since 2013"
- Ensured "Meet Our Founder" section displays properly with fallback data

### Homepage Structure Updates
- Moved CelebritySection above PremiumServices section as requested
- Enhanced HeroSlider with proper background images and minimum height settings
- Improved slider background image display with bg-no-repeat for better visual quality
- Set appropriate minimum heights (70vh on mobile, 80vh on desktop) for optimal background image visibility

### Technical Improvements
- Fixed BlogPage isLoading undefined error by hardcoding content
- Enhanced FeaturedTechnologies component with hardcoded reliable data
- Improved error handling across all homepage components
- Better responsive design for premium services cards with smooth animations
- Added blog detail page routing (/blog/:slug) for functional "Read More" links

### UI/UX Enhancements
- Added modern gradient backgrounds and hover effects to service cards
- Improved AboutSection content display with single comprehensive paragraph
- Enhanced quality commitment text fallback handling
- Better mobile responsiveness across all new components
- Professional card designs with subtle animations and visual feedback
- Centered team display layout for single founder profile

### Services Page Critical Fix (July 16, 2025)
- Fixed Key Features data structure mismatch between API response and component expectations
- API returns features with "text" property but components expected "title" and "description"
- Implemented proper data transformation mapping API's "text" field to component structure
- Enhanced fallback data handling for reliable content display when API is unavailable
- Fixed process steps mapping from "processSteps" to proper format with titles and descriptions
- All service tabs now display proper feature content instead of blank placeholder cards

### Netlify Deployment Configuration (July 16, 2025)
- Created netlify.toml with proper build configuration (vite build, dist directory)
- Implemented netlify/functions/index.js with serverless API endpoints and mock data
- Added comprehensive .gitignore file for proper version control
- Created detailed README.md with full project documentation and setup instructions
- Added DEPLOYMENT.md with step-by-step deployment guide
- Created GITHUB_SETUP.md with GitHub repository setup instructions
- Added FINAL_DEPLOYMENT_STEPS.md with complete deployment checklist
- Installed serverless-http dependency for Netlify Functions compatibility
- Configured CORS handling for cross-origin requests in serverless functions
- Set up mock data for services, testimonials, statistics, and about information
- Project is now production-ready for Netlify deployment with GitHub integration