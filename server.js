const express = require('express');
const path = require('path');

// Import backend API
const apiApp = require('./backend/app');

const app = express();
const port = process.env.PORT || 8080;

// API routes
app.use('/api', apiApp);

// Serve Angular frontend (dist path must include /browser)
app.use(express.static(path.join(__dirname, 'dist/angular-localstoarge-table/browser')));

// Angular routes fallback (except /api)
app.get(/^\/(?!api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-localstoarge-table/browser/index.html'));
});

// Health check for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server on Cloud Run
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
