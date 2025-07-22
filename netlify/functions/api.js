const express = require('express');
const serverless = require('serverless-http');

// Import your existing server setup
const app = express();

// Add CORS
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

// Import your routes
// Note: You'll need to adapt your existing routes to work with serverless
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working on Netlify!' });
});

// Cloudinary proxy endpoint to avoid CORS issues
app.get('/api/cloudinary/:folder', async (req, res) => {
  try {
    const folderName = req.params.folder;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(500).json({ message: 'Cloudinary credentials are not set in environment variables.' });
    }

    // Create Basic Auth header
    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder?asset_folder=${encodeURIComponent(folderName)}&max_results=500`,
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch images from ${folderName}`);
    }

    const data = await response.json();
    res.json(data.resources || []);
  } catch (error) {
    console.error(`Error fetching Cloudinary images for folder ${req.params.folder}:`, error);
    res.status(500).json({ message: 'Failed to fetch images from Cloudinary', error: error.message });
  }
});

// Export the serverless function
module.exports.handler = serverless(app);