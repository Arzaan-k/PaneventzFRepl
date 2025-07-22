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

    // Log environment and request info for debugging (do not log secrets)
    console.log('Cloudinary Proxy Debug:', {
      folderName,
      cloudName,
      apiKeyPresent: !!apiKey,
      apiSecretPresent: !!apiSecret,
      env: process.env.NODE_ENV,
    });

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('Missing Cloudinary credentials:', { cloudName, apiKeyPresent: !!apiKey, apiSecretPresent: !!apiSecret });
      return res.status(500).json({ message: 'Cloudinary credentials are not set in environment variables.' });
    }

    // Create Basic Auth header
    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder?asset_folder=${encodeURIComponent(folderName)}&max_results=500`;
    console.log('Fetching from Cloudinary API:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary API error:', response.status, errorText);
      throw new Error(`Failed to fetch images from ${folderName}: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Cloudinary API response:', { count: data.resources?.length, keys: Object.keys(data) });
    res.json(data.resources || []);
  } catch (error) {
    console.error(`Error fetching Cloudinary images for folder ${req.params.folder}:`, error);
    res.status(500).json({ message: 'Failed to fetch images from Cloudinary', error: error.message });
  }
});

// Export the serverless function
module.exports.handler = serverless(app);