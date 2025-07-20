# Pan Eventz - Event Management Platform

A comprehensive event management platform built with modern web technologies, featuring a React frontend with a Node.js/Express backend, PostgreSQL database through Drizzle ORM, and comprehensive admin management capabilities.

## Features

- **Modern Event Management**: Complete solution for corporate events, weddings, sports events, and more
- **Admin Dashboard**: Full content management system for easy updates
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Gallery Management**: Cloudinary integration for media management
- **Contact Management**: Handle inquiries and client communications
- **Blog System**: Content marketing with categorized posts
- **Statistics Dashboard**: Track website metrics and performance

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for development and production builds
- Tailwind CSS with shadcn/ui components
- TanStack Query for server state management
- Wouter for client-side routing
- React Hook Form with Zod validation

### Backend
- Node.js with Express.js framework
- TypeScript with ES modules
- PostgreSQL with Drizzle ORM
- JWT authentication with bcrypt
- Multer for file uploads
- Express sessions with PostgreSQL store

## Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pan-eventz
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example file and fill in your values
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT token signing
- `SESSION_SECRET`: Secret for session management

4. Set up the database:
```bash
npm run db:push
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Deployment

### Netlify Deployment

This project is configured for Netlify deployment with serverless functions.

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify (manual or via Git integration)

The `netlify.toml` file contains the necessary build configuration.

### Environment Setup

For production deployment, ensure these environment variables are set:
- `DATABASE_URL`
- `JWT_SECRET`
- `SESSION_SECRET`
- `NODE_ENV=production`

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared schemas and types
├── db/              # Database configuration and migrations
├── netlify/         # Netlify functions
├── uploads/         # Local file storage
└── dist/            # Production build output
```

## Admin Access

Default admin credentials:
- Username: eventninja12@
- Password: 9323641780

**Important**: Change these credentials after first login in production.

## License

MIT License - see LICENSE file for details.

## Contact

For support or inquiries:
- Email: info@paneventz.com
- Phone: +91 98213 37523
- Address: Mumbai, Maharashtra, India