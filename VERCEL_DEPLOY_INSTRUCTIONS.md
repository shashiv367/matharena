# ⚡ Vercel Deployment - Step by Step

## 🎯 **Exact Settings for Vercel**

### **In Vercel Dashboard:**

1. **Framework Preset:** Vite

2. **Root Directory:** `client` ← **CLICK "EDIT" AND SET THIS!**

3. **Build Command:** `npm run build` (auto-detected)

4. **Output Directory:** `dist` (auto-detected)

5. **Install Command:** `npm install` (auto-detected)

---

## 🔑 **Environment Variables:**

Add these in **Settings → Environment Variables**:

```
VITE_SUPABASE_URL
https://ovnyorlsxouotryiouik.supabase.co

VITE_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92bnlvcmxzeG91b3RyeWlvdWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MzQxMTksImV4cCI6MjA3NTUxMDExOX0.4FBKC0yyKC65KXN-AszPuh4JYUZOK0frJTy4WruODhQ
```

**Apply to:** Production, Preview, Development (all three!)

---

## 🚀 **Deploy:**

Click **"Deploy"** and wait 2-3 minutes!

---

## ✅ **That's It!**

The key is setting **Root Directory = client**

