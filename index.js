const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🚀 Welcome to MayorPasca\'s Node.js CI/CD Pipeline App!',
    status: 'success',
    timestamp: new Date(),
  });
});

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: '🔍 Route not found',
    status: 'error',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
