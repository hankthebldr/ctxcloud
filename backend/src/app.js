// backend/src/app.js
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', chatRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));