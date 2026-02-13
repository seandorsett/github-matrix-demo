const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Get environment information
const environmentInfo = {
  nodeVersion: process.version,
  platform: process.platform,
  arch: process.arch,
  hostname: require('os').hostname(),
  cpus: require('os').cpus().length,
  totalMemory: (require('os').totalmem() / (1024 ** 3)).toFixed(2) + ' GB'
};

// Serve static files
app.use(express.static('public'));

// API endpoint for environment info
app.get('/api/info', (req, res) => {
  res.json(environmentInfo);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Matrix Demo App running on port ${port}`);
  console.log(`Node.js version: ${environmentInfo.nodeVersion}`);
  console.log(`Platform: ${environmentInfo.platform}`);
});

module.exports = { app, server };
