const express = require('express');
require('dotenv').config();
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db'); // Import DB connection function

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');

// Root route
app.get('/api', (req, res) => {
  res.json({ message: 'Bus Booking API is live' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Start server after DB connection
const PORT = process.env.PORT || 3000;

console.log("Attempting MongoDB connection...");

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to start server due to DB error:", err.message);
});
