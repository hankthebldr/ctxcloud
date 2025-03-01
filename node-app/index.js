const express = require('express');
const secrets = require('./secrets');

const app = express();
app.use(express.json());

// Insecure: No helmet, no input validation, no CSRF protections
app.post('/login', (req, res) => {
  // Insecure: Logging sensitive info
  console.log("User credentials received:", req.body);

  // Insecure: Hardcoded credential check
  if (
    req.body.username === secrets.DEMO_USER && 
    req.body.password === secrets.DEMO_PASS
  ) {
    return res.send('Login successful!');
  } else {
    return res.status(401).send('Unauthorized');
  }
});

app.get('/debug-info', (req, res) => {
  // Insecure: Exposing stack info and environment variables
  const debugData = {
    nodeVersion: process.version,
    environment: process.env,
    secrets: secrets
  };
  return res.json(debugData);
});

app.listen(3000, () => {
  console.log('Vulnerable Node app listening on port 3000');
});