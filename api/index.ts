import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';
import { createServer } from 'http';

const app = express();

// Initialize the app with routes
let initialized = false;

async function initializeApp() {
  if (!initialized) {
    try {
      const httpServer = createServer(app);
      await registerRoutes(httpServer, app);
      initialized = true;
      console.log('✅ Server routes initialized for Vercel');
    } catch (error) {
      console.error('❌ Failed to initialize server routes:', error);
      throw error;
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await initializeApp();
    
    // Set CORS headers for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    // Convert Vercel request to Express request format
    const expressReq = req as any;
    const expressRes = res as any;
    
    // Add Express-like properties
    expressReq.url = req.url;
    expressReq.method = req.method;
    expressReq.headers = req.headers;
    expressReq.body = req.body;
    
    // Handle the request with Express app
    app(expressReq, expressRes);
    
  } catch (error) {
    console.error('❌ Vercel handler error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}