require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Middleware
app.use(cors());
app.use(cors({
    origin: ['http://localhost:3000','http://10.0.0.196:3000','*'],
    credentials: true
  }));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Apple TV Backend is Running!'));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serve static files from these directories
app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add near other route imports
const contentRoutes = require('./routes/content');

// Add after auth routes
app.use('/api/content', contentRoutes);
const streamRoutes = require('./routes/stream');
app.use('/api/stream', streamRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});