# 🚀 Vercel Deployment Guide for PREET_ENGLISH

This guide provides step-by-step instructions for deploying PREET_ENGLISH to Vercel with full functionality.

## 📋 Prerequisites

- [Vercel Account](https://vercel.com) (free tier available)
- [GitHub Account](https://github.com) with repository access
- [PostgreSQL Database](#database-setup) (Supabase or Neon recommended)
- [OpenAI API Key](#openai-setup) (optional, for AI features)

## 🗄️ Database Setup

### Option A: Supabase (Recommended)

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and fill details:
     - **Name**: `preet-english`
     - **Database Password**: Generate strong password (save it!)
     - **Region**: Choose closest to your users

2. **Get Connection String**:
   - Go to **Settings** → **Database**
   - Copy the **Connection string** (URI format)
   - Replace `[YOUR-PASSWORD]` with your actual password
   - Example: `postgresql://postgres:your_password@db.abc123.supabase.co:5432/postgres`

3. **Configure Row Level Security** (Optional but recommended):
   ```sql
   -- Enable RLS on tables
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
   ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
   
   -- Add policies as needed
   CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
   ```

### Option B: Neon

1. **Create Neon Project**:
   - Go to [neon.tech](https://neon.tech)
   - Sign up and create new project
   - Choose region closest to your users

2. **Get Connection String**:
   - Copy the connection string from dashboard
   - Format: `postgresql://user:password@host.region.neon.tech:5432/database?sslmode=require`

## 🤖 OpenAI Setup (Optional)

1. **Get API Key**:
   - Go to [platform.openai.com](https://platform.openai.com)
   - Navigate to **API Keys**
   - Create new secret key
   - Copy and save securely (starts with `sk-`)

2. **Set Usage Limits** (Recommended):
   - Go to **Billing** → **Usage limits**
   - Set monthly limit (e.g., $50)
   - Enable email notifications

## 🚀 Vercel Deployment

### Step 1: Connect Repository

1. **Login to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**:
   - Click "New Project"
   - Import your PREET_ENGLISH repository
   - Choose the repository from GitHub

### Step 2: Configure Build Settings

Vercel should auto-detect the settings, but verify:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### Step 3: Environment Variables

In Vercel Dashboard → **Settings** → **Environment Variables**, add:

#### Required Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | Your PostgreSQL connection string | Production, Preview |
| `SESSION_SECRET` | Generate: `openssl rand -hex 32` | Production, Preview |
| `NODE_ENV` | `production` | Production |

#### Optional Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key | Production, Preview |
| `VITE_SUPABASE_URL` | Your Supabase URL | All |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | All |

#### Security Notes:
- Use different `SESSION_SECRET` for Production vs Preview
- Never use development values in production
- Consider using Vercel's secret management for sensitive values

### Step 4: Deploy

1. **Initial Deployment**:
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)

2. **Verify Deployment**:
   - Visit your deployment URL
   - Check that landing page loads
   - Test `/api/health` endpoint

## 🔧 Post-Deployment Setup

### Database Migration

After first deployment, initialize your database:

1. **Run Migrations** (if using custom migration scripts):
   ```bash
   # Connect to your database and run:
   npm run db:push
   npm run migrate:complete  # Seeds initial data
   ```

2. **Verify Database**:
   - Check that tables are created
   - Verify sample lessons exist
   - Test user registration

### Domain Configuration (Optional)

1. **Custom Domain**:
   - Go to Vercel Dashboard → **Settings** → **Domains**
   - Add your custom domain
   - Configure DNS records as instructed

2. **Update Environment Variables**:
   - Update `VITE_APP_URL` to your custom domain
   - Update CORS settings if needed

## 🧪 Testing Your Deployment

### Automated Tests

```bash
# Test API endpoints
curl https://your-app.vercel.app/api/health
curl https://your-app.vercel.app/api/lessons

# Test authentication
curl -X POST https://your-app.vercel.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Lessons page displays content
- [ ] Audio features work (if OpenAI configured)
- [ ] Progress tracking functions
- [ ] Mobile responsiveness

## 🔍 Troubleshooting

### Common Issues

#### 1. "Internal Server Error" (500)

**Symptoms**: API endpoints return 500 errors

**Solutions**:
- Check Vercel Function logs in Dashboard
- Verify `DATABASE_URL` is correctly set
- Ensure database is accessible from Vercel
- Check for missing environment variables

#### 2. "Database Connection Failed"

**Symptoms**: App loads but shows fallback content

**Solutions**:
- Verify PostgreSQL connection string format
- Check database server is running
- Ensure SSL mode is enabled (`?sslmode=require`)
- Test connection from external tool

#### 3. "OpenAI API Errors"

**Symptoms**: AI features don't work

**Solutions**:
- Verify `OPENAI_API_KEY` is set correctly
- Check API key has sufficient credits
- Verify API key permissions
- Check rate limits

#### 4. "Session/Auth Issues"

**Symptoms**: Users can't stay logged in

**Solutions**:
- Verify `SESSION_SECRET` is set and consistent
- Check cookie settings for HTTPS
- Ensure session store is properly configured

### Debug Mode

Enable debug logging by adding:
```
LOG_LEVEL=debug
ENABLE_REQUEST_LOGGING=true
```

## 📊 Monitoring & Maintenance

### Vercel Analytics

1. **Enable Analytics**:
   - Go to Vercel Dashboard → **Analytics**
   - Enable Web Analytics
   - Monitor page views, performance

2. **Function Logs**:
   - Monitor API function execution
   - Check for errors and performance issues

### Database Monitoring

1. **Supabase Dashboard**:
   - Monitor database performance
   - Check query performance
   - Review logs for errors

2. **Connection Limits**:
   - Monitor concurrent connections
   - Consider connection pooling for high traffic

### Cost Monitoring

1. **Vercel Usage**:
   - Monitor function execution time
   - Check bandwidth usage
   - Review build minutes

2. **Database Costs**:
   - Monitor database storage
   - Check query performance
   - Optimize expensive queries

3. **OpenAI Costs**:
   - Monitor API usage
   - Set up billing alerts
   - Implement usage quotas

## 🔄 Updates & Maintenance

### Deploying Updates

1. **Automatic Deployments**:
   - Push to main branch triggers deployment
   - Preview deployments for pull requests

2. **Manual Deployments**:
   - Use Vercel CLI: `vercel --prod`
   - Or trigger from Vercel Dashboard

### Database Updates

1. **Schema Changes**:
   ```bash
   # Update schema locally
   npm run db:push
   
   # Deploy application
   git push origin main
   ```

2. **Data Migrations**:
   - Test migrations on preview environment first
   - Run migrations during low-traffic periods
   - Always backup before major changes

## 🆘 Support

### Getting Help

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Project Issues**: [GitHub Issues](https://github.com/CRAJKUMARSINGH/PREET_ENGLISH/issues)

### Community

- **Discord**: [Join our community](#)
- **Email**: support@preetenglish.com

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Database created and configured
- [ ] Environment variables prepared
- [ ] OpenAI API key obtained (optional)
- [ ] Repository connected to Vercel

### Deployment
- [ ] Build settings configured
- [ ] Environment variables set in Vercel
- [ ] Initial deployment successful
- [ ] Custom domain configured (optional)

### Post-Deployment
- [ ] Database migrations run
- [ ] API endpoints tested
- [ ] User registration/login tested
- [ ] Core features verified
- [ ] Mobile responsiveness checked
- [ ] Performance monitoring enabled

### Production Ready
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] Error monitoring set up
- [ ] Backup strategy implemented
- [ ] Documentation updated

---

**🎉 Congratulations! Your PREET_ENGLISH app is now live on Vercel!**

Visit your deployment URL and start helping Hindi speakers learn English with confidence.