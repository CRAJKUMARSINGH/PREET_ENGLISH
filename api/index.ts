import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { registerRoutes } from '../server/routes';
import { serveStatic } from '../server/static';

// Create a simplified Express app for Vercel
const app = express();

// CORS configuration for Vercel deployment
app.use(cors({
  origin: [
    'https://preetenglish.netlify.app',
    'https://preet-english.vercel.app',
    'http://localhost:5000',
    'http://localhost:5173', // Vite dev server
    /\.vercel\.app$/, // Allow all Vercel preview deploys
    /\.netlify\.app$/ // Allow all Netlify preview deploys
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Enable pre-flight for all routes
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register all routes
(async () => {
  try {
    const httpServer = createServer(app);
    await registerRoutes(httpServer, app);
    
    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
      serveStatic(app);
    }
  } catch (error) {
    console.error('Error registering routes:', error);
  }
})();

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Convert Vercel request/response to Express
  await new Promise((resolve, reject) => {
    const server = app;
    server(req, res, (err: any) => {
      if (err) {
        console.error('Express error:', err);
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
}