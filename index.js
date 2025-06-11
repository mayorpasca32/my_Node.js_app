// index.js
const express = require('express');
const morgan = require('morgan'); // HTTP request logger
const helmet = require('helmet'); // security headers
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the enhanced Node.js CI/CD Pipeline App!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

app.post('/echo', (req, res) => {
  res.json({ you_sent: req.body });
});

// Graceful shutdown
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

function shutdown() {
  console.log('Shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
