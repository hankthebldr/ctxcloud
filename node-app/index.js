require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
// e.g., const { check, validationResult } = require('express-validator');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());

// Example route: /login
app.post('/login', (req, res) => {
  // Input validation can be done here
  // No console logs of credentials
  const { username, password } = req.body;
  
  if (
    username === process.env.DEMO_USER && 
    password === process.env.DEMO_PASS
  ) {
    return res.send('Login successful!');
  } else {
    return res.status(401).send('Unauthorized');
  }
});

// Example route: debug-info (only for local dev)
if (process.env.NODE_ENV === 'development') {
  app.get('/debug-info', (req, res) => {
    // Do not expose environment or secrets in a real environment
    const debugData = {
      nodeVersion: process.version,
      environment: process.env.NODE_ENV,
    };
    return res.json(debugData);
  });
}

app.listen(3000, () => {
  console.log('Secure-ish Node app listening on port 3000');
});