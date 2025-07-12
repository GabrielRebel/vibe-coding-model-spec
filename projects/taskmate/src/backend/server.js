const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import route modules (atomic components)
const chatRoutes = require('./routes/chat');
const taskRoutes = require('./routes/tasks');
const notificationRoutes = require('./routes/notifications');
const missionRoutes = require('./routes/missions');

// Routes (atomic separation per spec)
app.use('/api/chat', chatRoutes);           // CHAT-01
app.use('/api/tasks', taskRoutes);          // TASK-02
app.use('/api/notifications', notificationRoutes); // NOTIFY-03
app.use('/api/missions', missionRoutes);    // MISSION-04

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`TaskMate server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log('Atomic components loaded:');
  console.log('  - CHAT-01: Chat Interface');
  console.log('  - TASK-02: Task Extraction');
  console.log('  - NOTIFY-03: Notification Engine');
  console.log('  - MISSION-04: Mission System');
}); 