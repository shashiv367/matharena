# 🔧 Vercel Deployment - Quick Fix

## ✅ Fixed Issues

I've added error handling and fixed potential deployment issues:
- ✅ Added ErrorBoundary component
- ✅ Fixed environment variable handling
- ✅ Added null checks in ProblemSelector
- ✅ Reduced particles for performance

---

## 🚀 Deploy to Vercel - Correct Settings

### **Step 1: Build Settings**

In Vercel dashboard, use these **exact settings**:

```
Framework Preset:     Vite
Root Directory:       client       ← CRITICAL!
Build Command:        npm run build
Output Directory:     dist
Install Command:      npm install
Node.js Version:      18.x
```

### **Step 2: Environment Variables**

Add these in Vercel → Settings → Environment Variables:

```
Name:  VITE_SUPABASE_URL
Value: https://ovnyorlsxouotryiouik.supabase.co

Name:  VITE_SUPABASE_ANON_KEY  
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92bnlvcmxzeG91b3RyeWlvdWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MzQxMTksImV4cCI6MjA3NTUxMDExOX0.4FBKC0yyKC65KXN-AszPuh4JYUZOK0frJTy4WruODhQ
```

**Important:** Apply to all environments (Production, Preview, Development)

---

## 🔍 If Still Getting Errors

### **Check Browser Console:**

1. Open deployed site
2. Press F12
3. Go to Console tab
4. Look for red error messages
5. Share the exact error

### **Common Vercel Errors:**

| Error | Fix |
|-------|-----|
| "VITE_SUPABASE_URL is not defined" | Add env vars in Vercel |
| "Failed to fetch" | Check Supabase URL is correct |
| "createClient is not a function" | Rebuild with correct env vars |
| "Cannot read properties of undefined" | Environment variables not loaded |

---

## ✅ **Checklist:**

- [ ] Root Directory = `client` 
- [ ] Environment variables added (both of them!)
- [ ] Variables applied to all environments
- [ ] Redeployed after adding env vars
- [ ] Supabase tables created
- [ ] Browser console checked for specific error

---

## 🎯 **Quick Test Before Deploy:**

Test build locally first:

```bash
cd client
npm run build
npm run preview
```

If this works locally, Vercel should work too!

---

## 📞 **Still Not Working?**

Share:
1. **Exact error from browser console** (F12)
2. **Vercel build logs** (from deployment page)
3. **Screenshot** of environment variables in Vercel

I'll fix it immediately!

