import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock data for serverless deployment
const mockLessons = [
  {
    id: 1,
    title: "Basic Greetings",
    slug: "basic-greetings",
    description: "Learn essential English greetings",
    content: "# Basic Greetings\n\nLearn how to greet people in English...",
    difficulty: "Beginner",
    order: 1
  },
  {
    id: 2,
    title: "Daily Conversations",
    slug: "daily-conversations", 
    description: "Common daily conversation phrases",
    content: "# Daily Conversations\n\nPractice everyday English conversations...",
    difficulty: "Beginner",
    order: 2
  }
];

const mockUsers = [
  {
    id: 1,
    username: "student",
    password: "password123",
    isAdmin: false
  },
  {
    id: 2,
    username: "admin",
    password: "admin123",
    isAdmin: true
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  
  try {
    // Route handling
    if (url === '/api/lessons' && method === 'GET') {
      return res.status(200).json(mockLessons);
    }
    
    if (url === '/api/login' && method === 'POST') {
      const { username, password } = req.body || {};
      
      const user = mockUsers.find(u => u.username === username && u.password === password);
      
      if (user) {
        return res.status(200).json({
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin
        });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }
    
    if (url === '/api/register' && method === 'POST') {
      const { username, password } = req.body || {};
      
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
      }
      
      // Check if user exists
      const existingUser = mockUsers.find(u => u.username === username);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      
      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        username,
        password,
        isAdmin: false
      };
      
      mockUsers.push(newUser);
      
      return res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        isAdmin: newUser.isAdmin
      });
    }
    
    if (url === '/api/user' && method === 'GET') {
      // Return demo user for now
      return res.status(200).json({
        id: 1,
        username: "demo",
        isAdmin: false
      });
    }
    
    if (url === '/api/test' && method === 'GET') {
      return res.status(200).json({ 
        message: 'API is working!', 
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
      });
    }
    
    // Default 404 for unmatched routes
    return res.status(404).json({ error: 'Not found' });
    
  } catch (error) {
    console.error('❌ API Error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}