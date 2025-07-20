# Deployment Guide for Pan Eventz

## Step-by-Step Deployment Instructions

### 1. Prepare for GitHub

First, initialize git and push to GitHub:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Pan Eventz event management platform"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/pan-eventz.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Netlify

#### Option A: Direct Netlify Git Integration (Recommended)

1. **Login to Netlify**: Go to https://netlify.com and sign in with your GitHub account

2. **Create New Site**: Click "New site from Git"

3. **Connect Repository**: 
   - Choose GitHub
   - Select your `pan-eventz` repository
   - Authorize Netlify to access your repository

4. **Configure Build Settings**:
   - **Branch to deploy**: `main`
   - **Build command**: `vite build`
   - **Publish directory**: `dist`

5. **Environment Variables**: In Netlify dashboard, go to Site settings > Environment variables and add:
   ```
   NODE_ENV=production
   VITE_API_URL=/.netlify/functions
   ```

6. **Deploy**: Click "Deploy site"

#### Option B: Manual Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Build the project**:
   ```bash
   vite build
   ```

4. **Deploy**:
   ```bash
   # For first deployment
   netlify deploy --prod --dir=dist

   # For subsequent deployments
   netlify deploy --prod --dir=dist
   ```

### 3. Configure Database (Important!)

Since this project uses PostgreSQL, you'll need to set up a database for production:

#### Option A: Neon Database (Recommended)
1. Go to https://neon.tech
2. Create a free account
3. Create a new database
4. Copy the connection string
5. Add it to Netlify environment variables as `DATABASE_URL`

#### Option B: Supabase
1. Go to https://supabase.com
2. Create a new project
3. Get the database connection string
4. Add it to Netlify environment variables as `DATABASE_URL`

### 4. Post-Deployment Setup

After successful deployment:

1. **Access your site**: Your site will be available at `https://YOUR_SITE_NAME.netlify.app`

2. **Test the admin panel**: Go to `/admin` and login with:
   - Username: `eventninja12@`
   - Password: `9323641780`

3. **Update contact information**: Use the admin panel to update:
   - Email: info@paneventz.com
   - Phone: +91 98213 37523
   - Address: Mumbai, Maharashtra, India

### 5. Custom Domain (Optional)

To use a custom domain:

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Wait for SSL certificate to be issued (automatic)

### 6. Continuous Deployment

Once connected to GitHub, Netlify will automatically deploy when you:
- Push to the main branch
- Merge pull requests

### Troubleshooting

#### Build Errors
- Check the build logs in Netlify dashboard
- Ensure all environment variables are set
- Verify Node.js version (should be 18+)

#### Database Connection Issues
- Verify `DATABASE_URL` is correctly set
- Ensure database is accessible from external connections
- Check database credentials and permissions

#### API Not Working
- Check Netlify Functions logs
- Verify serverless functions are deployed correctly
- Test API endpoints individually

### Environment Variables Checklist

Make sure these are set in Netlify:
- ✅ `NODE_ENV=production`
- ✅ `DATABASE_URL=your_database_connection_string`
- ✅ `VITE_API_URL=/.netlify/functions`

### Support

If you encounter issues:
1. Check Netlify build logs
2. Review the browser console for errors
3. Test API endpoints directly
4. Verify environment variables are set correctly

Your Pan Eventz website should now be live and accessible to the world! 🎉