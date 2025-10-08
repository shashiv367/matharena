# ⚡ Quick Start Guide

Get MathArena running in 5 minutes!

## 1️⃣ Install Dependencies

```bash
npm run install:all
```

## 2️⃣ Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run `supabase-schema.sql` in SQL Editor
4. Copy your credentials from Settings → API

## 3️⃣ Configure Environment

### Client (.env in client folder)
```env
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Server (.env in server folder)
```env
PORT=5000
SUPABASE_URL=your_url_here
SUPABASE_SERVICE_KEY=your_service_key_here
```

## 4️⃣ Run the App

```bash
npm run dev
```

## 5️⃣ Open Browser

Go to `http://localhost:3000` and create your first account!

---

**Need detailed instructions?** See [SETUP_GUIDE.md](SETUP_GUIDE.md)

**Having issues?** Check the troubleshooting section in SETUP_GUIDE.md
