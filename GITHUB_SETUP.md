# GitHub Setup and Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com and sign in to your account
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `pan-eventz`
   - **Description**: `Professional event management platform built with React and Node.js`
   - **Visibility**: Public (or Private if you prefer)
   - **Initialize**: Do NOT check "Add a README file" (we already have one)
5. Click "Create repository"

## Step 2: Push Code to GitHub

After creating the repository, run these commands in your local terminal:

```bash
# Initialize git (if not already done)
git init

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: Pan Eventz event management platform

Features:
- Modern React frontend with TypeScript
- Express.js backend with PostgreSQL
- Admin dashboard with full CMS
- Responsive design for all devices
- Cloudinary integration for media
- Contact form and inquiry management
- Blog system with categorized posts
- Statistics and testimonials display"

# Add your GitHub repository as origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pan-eventz.git

# Push to GitHub
git push -u origin main
```

If you encounter any issues with the main branch, try:
```bash
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Netlify

### Option A: Connect GitHub to Netlify (Recommended)

1. **Go to Netlify**: Visit https://netlify.com
2. **Sign in**: Use your GitHub account to sign in
3. **New Site**: Click "New site from Git"
4. **Choose GitHub**: Connect your GitHub account if not already connected
5. **Select Repository**: Choose your `pan-eventz` repository
6. **Build Settings**:
   - **Branch to deploy**: `main`
   - **Build command**: `vite build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

7. **Environment Variables**: Go to Site settings > Environment variables and add:
   ```
   NODE_ENV=production
   VITE_API_URL=/.netlify/functions
   ```

8. **Deploy**: Click "Deploy site"

### Option B: Manual Deploy

If you prefer manual deployment:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
vite build

# Deploy
netlify deploy --prod --dir=dist
```

## Step 4: Database Setup

For production, you'll need a cloud database:

### Option A: Neon (PostgreSQL - Recommended)
1. Go to https://neon.tech
2. Sign up for a free account
3. Create a new database project
4. Copy the connection string
5. Add to Netlify environment variables as `DATABASE_URL`

### Option B: Supabase (PostgreSQL)
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Add to Netlify environment variables as `DATABASE_URL`

## Step 5: Post-Deployment

After successful deployment:

1. **Your live site**: `https://YOUR_SITE_NAME.netlify.app`
2. **Test admin access**: Visit `/admin` with credentials:
   - Username: `eventninja12@`
   - Password: `9323641780`
3. **Update content**: Use admin panel to customize all content

## Troubleshooting

### Build Fails
- Check Netlify build logs
- Verify all dependencies are in package.json
- Ensure Node.js version is 18+

### Functions Not Working
- Check that `netlify/functions/` directory exists
- Verify serverless-http is installed
- Check function logs in Netlify dashboard

### Database Connection Issues
- Verify DATABASE_URL environment variable
- Test database connection from external tool
- Check database firewall settings

## Files Created for Deployment

The following files have been created/updated for deployment:

- ✅ `netlify.toml` - Netlify configuration
- ✅ `netlify/functions/index.js` - Serverless API functions
- ✅ `.gitignore` - Git ignore rules
- ✅ `README.md` - Project documentation
- ✅ `DEPLOYMENT.md` - Detailed deployment guide
- ✅ `GITHUB_SETUP.md` - This file

## Environment Variables Needed

Set these in Netlify:
- `NODE_ENV=production`
- `DATABASE_URL=your_database_connection_string`
- `VITE_API_URL=/.netlify/functions`

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch will trigger automatic deployment
- Pull requests can be configured for preview deployments
- Build status will be shown in your GitHub repository

Your Pan Eventz website will be live and accessible worldwide! 🚀