# Vercel Authentication Issue - Complete Fix Guide

## Problem
Your `/auth` page shows "Authentication Required" gate on Vercel deployment, causing `FUNCTION_INVOCATION_FAILED` errors.

**Root Cause:** Vercel Deployment Protection is blocking all requests before they reach your app.

---

## Solution 1: Disable Deployment Protection (Recommended for MVP/Testing)

### Step 1: Access Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **preetenglish**
3. Click on **Settings** tab

### Step 2: Disable Protection
1. In Settings, navigate to: **Deployment Protection**
2. You'll see one of these options:
   - **Password Protection** - Turn OFF
   - **Vercel Authentication** - Turn OFF
   - **Team SSO** - Exclude your deployment URL
3. Click **Save**

### Step 3: Redeploy
```bash
git commit --allow-empty -m "Trigger Vercel redeploy after protection removal"
git push origin main
```

### Step 4: Test
Visit: `https://preetenglish-msxj54wli-rajkumar-singh-chauhans-projects.vercel.app/auth`

Should now show your actual login/signup form instead of Vercel's gate.

---

## Solution 2: Environment Variables Check

Even with protection disabled, ensure these are set in Vercel:

### Navigate to: Settings → Environment Variables

#### Required Variables
```env
DATABASE_URL=postgresql://your-neon-or-supabase-url
SESSION_SECRET=your-random-32-char-secret
NODE_ENV=production
```

#### Optional (but highly recommended)
```env
OPENAI_API_KEY=sk-your-key-here
```

### How to Add:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Click "Add New"
3. Enter Key/Value
4. Select environment: **Production** (and Preview if needed)
5. Click Save
6. **Important:** Redeploy after adding env vars

```bash
# Trigger redeploy
git commit --allow-empty -m "Redeploy with env vars"
git push origin main
```

---

## Solution 3: Fix vercel.json API Routing (Already correct in your case)

Your current `vercel.json` is properly configured:

```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.ts"  // ✅ Correct serverless function
    },
    {
      "src": "/auth",
      "dest": "/index.html"     // ✅ Correct SPA routing
    }
  ]
}
```

**No changes needed here.**

---

## Solution 4: Session Configuration for Production

Your `server/auth.ts` is already production-ready:

```typescript
// ✅ Already configured correctly
if (app.get("env") === "production") {
    app.set("trust proxy", 1);  // Trust Vercel proxy
}

cookie: {
    secure: app.get("env") === "production",  // HTTPS only in prod
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
}
```

**No changes needed.**

---

## Verification Steps

### 1. Check API Health
```bash
curl https://preetenglish-msxj54wli-rajkumar-singh-chauhans-projects.vercel.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-31T...",
  "database": "configured",
  "openai": "configured"
}
```

### 2. Test Registration
```bash
curl -X POST https://your-app.vercel.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test1234"}'
```

Expected: `201 Created` with user object

### 3. Test Login
```bash
curl -X POST https://your-app.vercel.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test1234"}'
```

Expected: `200 OK` with user object

---

## Common Issues After Deployment Protection Removal

### Issue 1: "SESSION_SECRET must be set in production"
**Cause:** Missing `SESSION_SECRET` environment variable

**Fix:**
1. Vercel Dashboard → Settings → Environment Variables
2. Add: `SESSION_SECRET` = `any-random-32-character-string`
3. Redeploy

### Issue 2: Database connection errors
**Cause:** Missing or incorrect `DATABASE_URL`

**Fix:**
1. Create PostgreSQL database (Neon/Supabase/Vercel Postgres)
2. Copy connection string
3. Add to Vercel env vars: `DATABASE_URL`
4. Run schema migration:
   ```bash
   # Locally with production DATABASE_URL
   DATABASE_URL="your-prod-url" npm run db:push
   ```

### Issue 3: CORS errors on API calls
**Cause:** Cookie not being sent cross-origin

**Fix:** Already handled in your code via:
```typescript
app.set("trust proxy", 1);  // Vercel proxy support
```

### Issue 4: OpenAI features not working
**Cause:** Missing `OPENAI_API_KEY`

**Fix:** Your app has graceful fallback - it will work without OpenAI but AI features will use mock responses.

To enable AI:
1. Get API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Add to Vercel env vars: `OPENAI_API_KEY` = `sk-...`
3. Redeploy

---

## Quick Diagnostic Commands

### Check Deployment Status
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Check deployment logs
vercel logs preetenglish --follow
```

### Check Environment Variables
```bash
vercel env ls
```

### Test Local Production Build
```bash
# Build and test locally before deploying
npm run build
npm run start

# Visit: http://localhost:5000/auth
```

---

## Expected Behavior After Fix

### 1. `/auth` Page
- Should show your beautiful AuthPage component with:
  - Login/Signup tabs
  - Saraswati mascot on left panel
  - Feature showcase (1625+ lessons, AI tutor, etc.)
  
### 2. API Endpoints
- `/api/health` → 200 OK
- `/api/register` → Creates user, returns 201
- `/api/login` → Authenticates, returns user object
- `/api/lessons` → Returns lessons array

### 3. After Login
- Redirect to `/dashboard`
- User session persisted via PostgreSQL session store
- All protected routes accessible

---

## If Issue Persists

### 1. Check Vercel Function Logs
Vercel Dashboard → Your Project → Deployments → Click latest → View Function Logs

Look for:
- `SESSION_SECRET must be set in production` → Add env var
- Database connection errors → Fix DATABASE_URL
- Module not found errors → Rebuild

### 2. Check Build Logs
Look for:
- TypeScript errors → Run `npm run check:full` locally
- Missing dependencies → Run `npm install`
- Build failures → Check `vite.config.ts`

### 3. Force Fresh Deploy
```bash
# Clear Vercel build cache
vercel --force

# Or via git
git commit --allow-empty -m "Force rebuild"
git push origin main
```

---

## Contact Support

If none of these work:

1. **Vercel Support:** https://vercel.com/support
   - Mention: "Deployment Protection blocking application routes"
   
2. **Check this repo:** https://github.com/your-username/preet-english/issues
   - Open new issue with:
     - Vercel deployment URL
     - Screenshot of error
     - Build logs

---

## Success Checklist

- [ ] Deployment Protection disabled in Vercel Dashboard
- [ ] `SESSION_SECRET` added to Vercel env vars
- [ ] `DATABASE_URL` added to Vercel env vars (PostgreSQL)
- [ ] App redeployed after env var changes
- [ ] `/api/health` returns 200 OK
- [ ] `/auth` shows login form (not Vercel gate)
- [ ] Can create account via `/api/register`
- [ ] Can login via `/api/login`
- [ ] After login, redirects to `/dashboard`

---

## Next Steps After Fix

1. **Run Database Migration**
   ```bash
   # Point to production DB
   DATABASE_URL="your-vercel-postgres-url" npm run db:push
   ```

2. **Seed Test Data** (Optional)
   ```bash
   npm run migrate  # Adds lesson content
   ```

3. **Test Key Flows**
   - User registration → Dashboard
   - Lesson viewing
   - Progress tracking
   - AI chat (if OpenAI key configured)

4. **Monitor**
   - Check Vercel Analytics
   - Monitor Function execution time (should be < 10s)
   - Check error rates

---

## Production Hardening (After MVP works)

For production launch:

1. **Enable Vercel Protection** (after app works)
   - Use password protection for staging
   - Use Vercel Authentication for team access
   - Keep production public

2. **Add Monitoring**
   ```bash
   # Already configured in code
   # Just add env vars:
   SENTRY_DSN=your-sentry-dsn
   POSTHOG_KEY=your-posthog-key
   ```

3. **Set Up Custom Domain**
   - Vercel Dashboard → Domains
   - Add: `preetenglish.com`
   - Update OAuth callbacks if using external auth

4. **Configure Rate Limiting**
   ```env
   RATE_LIMIT_WINDOW=15
   RATE_LIMIT_MAX=100
   ```

---

**Last Updated:** 2026-01-31  
**Tested On:** Vercel Hobby/Pro Plans  
**App Version:** 2.1.0
