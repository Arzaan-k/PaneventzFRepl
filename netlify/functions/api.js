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

// Export the serverless function
module.exports.handler = serverless(app);