# 🔐 Environment Variables for Pan Eventz

## For Netlify Deployment

Add these environment variables in your Netlify dashboard:

### Required Variables:
```
NODE_ENV=production
VITE_API_URL=/.netlify/functions
```

## For Database Integration (Optional but Recommended)

If you want to use a real database instead of mock data:

### Neon Database (Recommended):
1. Go to https://neon.tech
2. Create a free account
3. Create a new database
4. Copy the connection string and add:

```
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/database_name?sslmode=require
```

### Alternative Database Variables:
```
PGHOST=your_postgres_host
PGPORT=5432
PGDATABASE=your_database_name
PGUSER=your_username
PGPASSWORD=your_password
```

### Security Variables (for advanced features):
```
SESSION_SECRET=your_random_session_secret_minimum_32_characters
JWT_SECRET=your_random_jwt_secret_minimum_32_characters
```

## Environment Variables Summary

### Minimum Required for Basic Deployment:
```
NODE_ENV=production
VITE_API_URL=/.netlify/functions
```

### Full Production Setup with Database:
```
NODE_ENV=production
VITE_API_URL=/.netlify/functions
DATABASE_URL=your_neon_database_connection_string
SESSION_SECRET=your_random_32_character_string
JWT_SECRET=your_random_32_character_string
```

## How to Add in Netlify:

1. Go to your Netlify site dashboard
2. Click "Site settings"
3. Click "Environment variables"
4. Click "Add a variable"
5. Add each variable name and value
6. Click "Save"
7. Redeploy your site

## Important Notes:

- ✅ The website will work with just the minimum variables using mock data
- ✅ Adding DATABASE_URL enables full database functionality
- ✅ SESSION_SECRET and JWT_SECRET are needed for admin authentication
- ⚠️ Never commit actual environment values to GitHub
- ⚠️ Use strong, random strings for security variables

Your Pan Eventz website will be fully functional with just the minimum variables!