# Railway Deployment Guide

Railway is better for full-stack Node.js apps. Here's how to deploy:

## 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

## 2. Login to Railway
```bash
railway login
```

## 3. Initialize Railway project
```bash
railway init
```

## 4. Deploy
```bash
railway up
```

## 5. Set environment variables
```bash
railway variables set NODE_ENV=production
railway variables set DATABASE_URL=file:./preet_english.db
```

Railway will automatically:
- Detect Node.js app
- Run npm install
- Run npm run build
- Start the server with npm start

The app will be available at: https://your-app-name.railway.app