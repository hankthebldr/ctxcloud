/******************************************************
 * Load Environment Variables
 ******************************************************/
require('dotenv').config(); // Ensure you have a .env file if using environment variables

/******************************************************
 * Module Imports
 ******************************************************/
const express = require('express');
const helmet = require('./node_modules/helmet/index.d.cts');

/******************************************************
 * Initialize App
 ******************************************************/
const app = express();
const PORT = process.env.PORT || 3000;

/******************************************************
 * Security and Middleware
 ******************************************************/
app.use(helmet());            // Helps secure Express apps by setting various HTTP headers
app.use(express.json());      // Parses incoming JSON requests into req.body

/******************************************************
 * Simple Root Route
 ******************************************************/
app.get('/', (req, res) => {
  res.json({ message: 'Hello from ctxcloud!' });
});

/******************************************************
 * Start Server
 ******************************************************/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Import built-in and third-party modules
const path = require('path');
const express = require('express');
const serveIndex = require('serve-index');
const fs = require('fs');

// Create Express app and configure port
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Optional: directory listing on /public
app.use('/public', serveIndex(
  path.join(__dirname, '../frontend/public'),
  { icons: true }
));

// Reviews API: list filenames in reviews directory
app.get('/api/reviews', (req, res) => {
  const reviewsDir = path.join(__dirname, '../frontend/public/reviews');
  fs.readdir(reviewsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ reviews: files });
  });
});

// Catch-all route for Single Page Application support
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});