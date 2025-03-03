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