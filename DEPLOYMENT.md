# 🚀 Deployment Guide

This guide covers deploying MathArena to production using modern cloud platforms.

## Deployment Stack

- **Frontend**: Vercel (recommended) or Netlify
- **Backend**: Render (recommended) or Railway
- **Database**: Supabase (already cloud-hosted)

---

## 📦 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Environment variables documented
- [ ] Database schema applied to production Supabase
- [ ] Code committed to Git repository
- [ ] Dependencies up to date
- [ ] Build process working locally

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Repository

```bash
# Ensure code is committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Environment Variables

Add these in Vercel dashboard:

```
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Get your production URL (e.g., `matharena.vercel.app`)

### Step 5: Update API Proxy (if needed)

Update `client/vite.config.js` to point to production backend:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://your-backend-url.onrender.com',
        changeOrigin: true
      }
    }
  }
})
```

---

## ⚙️ Backend Deployment (Render)

### Step 1: Prepare for Deployment

Create a start script in `server/package.json` if not exists:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: matharena-api
   - **Environment**: Node
   - **Region**: Choose closest to users
   - **Branch**: main
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

### Step 3: Environment Variables

Add in Render dashboard:

```
PORT=5000
SUPABASE_URL=your_production_supabase_url
SUPABASE_SERVICE_KEY=your_service_role_key
NODE_ENV=production
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Get your backend URL (e.g., `https://matharena-api.onrender.com`)

### Step 5: Update CORS

Update `server/index.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: ['https://matharena.vercel.app', 'http://localhost:3000'],
  credentials: true
}))
```

Redeploy after making this change.

---

## 🗄️ Database (Supabase)

### Production Database Setup

1. Your Supabase project is already production-ready
2. For production, consider:
   - Upgrading to Pro plan for better performance
   - Setting up database backups
   - Enabling point-in-time recovery
   - Adding database replicas for read scaling

### Database Security

1. **Row Level Security**: Already enabled via schema
2. **API Keys**: Use separate keys for production
3. **Connection Pooling**: Enabled by default
4. **SSL**: Enforced by Supabase

### Monitoring

1. Go to Supabase dashboard
2. Check Database → Logs for errors
3. Monitor API usage
4. Set up alerts for high usage

---

## 🔧 Configuration Updates

### Update Frontend to Use Production Backend

In your frontend code, update API calls to use production URL:

**Option 1**: Use environment variable

```javascript
// client/src/config/api.js
const API_URL = import.meta.env.VITE_API_URL || '/api'
export default API_URL
```

Add to Vercel environment variables:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

**Option 2**: Update axios baseURL

```javascript
// client/src/config/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
})

export default instance
```

---

## 🧪 Testing Production

### Frontend Tests

1. Open your Vercel URL
2. Test signup/login
3. Test all three challenges
4. Check leaderboard
5. Verify profile page
6. Test on mobile device

### Backend Tests

Test API endpoints:

```bash
# Health check
curl https://your-backend-url.onrender.com/api/health

# Should return: {"status":"OK","message":"MathArena API is running"}
```

### Database Tests

1. Create a test account in production
2. Complete a challenge
3. Check Supabase dashboard → Table Editor
4. Verify data appears in `users` and `challenge_submissions`

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Enable in Vercel dashboard
2. Monitor:
   - Page views
   - Load times
   - Core Web Vitals

### Render Monitoring

1. Check Render dashboard
2. Monitor:
   - CPU usage
   - Memory usage
   - Response times
   - Error rates

### Supabase Monitoring

1. Database health
2. API usage
3. Active connections
4. Storage usage

---

## 🔐 Security Best Practices

### Environment Variables

- ✅ Never commit `.env` files
- ✅ Use different keys for dev/prod
- ✅ Rotate keys regularly
- ✅ Keep service keys secret

### API Security

- ✅ Enable CORS only for your domain
- ✅ Rate limiting (add middleware)
- ✅ Input validation
- ✅ SQL injection prevention (Supabase handles this)

### Frontend Security

- ✅ Use HTTPS (automatic on Vercel)
- ✅ Secure cookies
- ✅ XSS prevention
- ✅ Content Security Policy

---

## 🚨 Troubleshooting Deployment

### Frontend Build Fails

**Error**: "Module not found"
```bash
# Solution: Clear build cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error**: "Environment variable not found"
```
# Solution: Check all VITE_ prefixed vars are set in Vercel
```

### Backend Deployment Fails

**Error**: "Cannot find module"
```bash
# Solution: Ensure all dependencies are in package.json, not devDependencies
```

**Error**: "Port already in use"
```javascript
// Solution: Use PORT from environment
const PORT = process.env.PORT || 5000
```

### Database Connection Fails

**Error**: "Authentication failed"
```
# Solution: Verify Supabase URL and service key are correct
# Ensure service key (not anon key) is used in backend
```

### CORS Errors

**Error**: "CORS policy blocked"
```javascript
// Solution: Update CORS configuration in server
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true
}))
```

---

## 📈 Performance Optimization

### Frontend

1. **Code Splitting**: Use React.lazy()
2. **Image Optimization**: Compress images
3. **Caching**: Set appropriate cache headers
4. **CDN**: Vercel provides this automatically

### Backend

1. **Response Caching**: Cache frequent queries
2. **Database Indexing**: Already set up in schema
3. **Connection Pooling**: Use Supabase pooler
4. **Compression**: Enable gzip

```javascript
import compression from 'compression'
app.use(compression())
```

---

## 🔄 Continuous Deployment

### Automatic Deployments

**Vercel**: 
- Automatically deploys on push to main branch
- Preview deployments for pull requests

**Render**:
- Auto-deploy on push to main
- Can set up staging environments

### Deployment Workflow

1. Develop locally
2. Commit to feature branch
3. Create pull request
4. Review preview deployment
5. Merge to main
6. Auto-deploy to production

---

## 💰 Costs

### Free Tier Limits

**Vercel**:
- 100GB bandwidth/month
- Unlimited deployments
- HTTPS included

**Render**:
- 750 hours/month (one always-on service)
- 100GB bandwidth
- Auto-sleep after inactivity

**Supabase**:
- 500MB database
- 1GB file storage
- 2GB bandwidth
- 50,000 monthly active users

### When to Upgrade

- High traffic (>100k visits/month)
- Need faster response times
- Require more database storage
- Want custom domains
- Need team features

---

## 📱 Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `matharena.com`)
3. Update DNS records as instructed
4. Vercel auto-provisions SSL

### Add Custom Domain to Render

1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records
4. SSL auto-provisioned

---

## ✅ Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Authentication works
- [ ] Challenges are functional
- [ ] Leaderboard updates
- [ ] Database writes succeed
- [ ] Error tracking set up
- [ ] Analytics enabled
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] SEO meta tags added

---

## 🆘 Support

If you encounter issues:

1. Check deployment logs in platform dashboard
2. Verify environment variables
3. Test API endpoints manually
4. Check Supabase logs
5. Review browser console for errors

---

## 🎉 You're Live!

Congratulations! Your MathArena platform is now live and accessible to users worldwide.

**Next Steps**:
- Share with students and teachers
- Gather feedback
- Monitor usage and performance
- Plan feature enhancements
- Build community

---

**Happy Deploying! 🚀**

