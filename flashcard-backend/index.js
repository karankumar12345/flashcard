const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const flashcardRoutes = require('../flashcard-backend/routes/flashcard');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();
app.use(cors()); // Enable CORS for all origins
// Middleware
app.use(express.json());


// Routes
app.use('/api', flashcardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
