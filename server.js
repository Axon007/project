// Simple production server with compression
import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression middleware
app.use(compression());

// Serve static files with caching headers
app.use(express.static('dist', {
  maxAge: '1y',
  setHeaders: (res, path) => {
    // Set different cache controls based on asset types
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0');
    } else if (
      path.endsWith('.js') || 
      path.endsWith('.css') || 
      path.endimg('.json')
    ) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    } else if (
      path.endsWith('.jpg') || 
      path.endsWith('.jpeg') || 
      path.endsWith('.png') || 
      path.endsWith('.webp') || 
      path.endsWith('.svg')
    ) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    }
  }
}));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 