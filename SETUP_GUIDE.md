# 🚀 MathArena Setup Guide

This guide will walk you through setting up the MathArena project step-by-step.

## Prerequisites

Before you begin, make sure you have:
- ✅ Node.js (v16 or higher) installed
- ✅ npm or yarn package manager
- ✅ A Supabase account (free tier works fine)
- ✅ A code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Clone or Download the Project

```bash
# If using Git
git clone <your-repo-url>
cd matharena

# Or simply navigate to the extracted folder
cd matharena
```

### 2. Install All Dependencies

Run this command in the root directory:

```bash
npm run install:all
```

This single command will install dependencies for:
- Root project
- Client (React frontend)
- Server (Node.js backend)

### 3. Set Up Supabase

#### 3.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in project details:
   - Name: `matharena`
   - Database Password: (create a strong password)
   - Region: Choose closest to you
6. Click "Create new project" and wait 2-3 minutes

#### 3.2 Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from the project
4. Paste it into the SQL editor
5. Click "Run" to execute

This will create:
- `users` table
- `challenge_submissions` table
- Security policies
- Indexes for performance

#### 3.3 Get Your Supabase Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** tab
3. You'll need these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)
   - **service_role key** (⚠️ Keep this secret!)

### 4. Configure Environment Variables

#### 4.1 Client Environment

1. Navigate to the `client` folder
2. Create a file named `.env`
3. Add these lines (replace with your actual values):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

#### 4.2 Server Environment

1. Navigate to the `server` folder
2. Create a file named `.env`
3. Add these lines (replace with your actual values):

```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here
```

⚠️ **Important**: Never commit `.env` files to version control!

### 5. Run the Application

#### Option A: Run Everything at Once (Recommended)

From the root directory:

```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:5000`

#### Option B: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev:client
```

**Terminal 2 - Backend:**
```bash
npm run dev:server
```

### 6. Access the Application

1. Open your browser
2. Go to `http://localhost:3000`
3. You should see the MathArena login page! 🎉

## Testing the Application

### Create Your First Account

1. Click "Sign up here"
2. Fill in:
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123
   - Skill Level: School or College
3. Click "Create Account"

### Try a Challenge

1. You'll be redirected to the dashboard
2. Click on any challenge card
3. Follow the instructions
4. Submit your solution
5. View your score and feedback!

## Troubleshooting

### Problem: "Cannot connect to server"

**Solution:**
- Make sure backend is running on port 5000
- Check `server/.env` has correct Supabase credentials
- Look for errors in the server terminal

### Problem: "Authentication error"

**Solution:**
- Verify Supabase credentials in `client/.env`
- Check if Supabase project is active
- Ensure you copied the correct anon key (not service key) for client

### Problem: "Database error"

**Solution:**
- Make sure you ran the `supabase-schema.sql` in Supabase
- Check Row Level Security policies are enabled
- Verify database password is correct

### Problem: Dependencies installation failed

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json
rm -rf client/node_modules client/package-lock.json
rm -rf server/node_modules server/package-lock.json

# Reinstall
npm run install:all
```

### Problem: Port already in use

**Solution:**
- Change PORT in `server/.env` to something else (e.g., 5001)
- Update vite.config.js proxy target if needed
- Or kill the process using the port:

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

## Verifying Setup

### Check Frontend
- ✅ Login page loads
- ✅ Can create account
- ✅ Dashboard shows after login
- ✅ Can see challenge cards

### Check Backend
Visit `http://localhost:5000/api/health`

Should see:
```json
{
  "status": "OK",
  "message": "MathArena API is running"
}
```

### Check Database
1. Go to Supabase dashboard
2. Click "Table Editor"
3. You should see `users` and `challenge_submissions` tables
4. After creating an account, check if a row appears in `users` table

## Next Steps

Once everything is working:

1. **Explore all challenges** - Try Graph Theory, Trigonometry, and Integration
2. **Check the leaderboard** - See rankings and filters
3. **View your profile** - Track badges and stats
4. **Customize** - Modify colors, add features, make it your own!

## Production Deployment

When ready to deploy:

### Frontend (Vercel)
1. Push code to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Backend (Render)
1. Create Web Service
2. Connect repo
3. Set build/start commands
4. Add environment variables
5. Deploy

### Database
- Already on Supabase cloud
- No additional setup needed

## Need Help?

- 📖 Check the main README.md
- 🐛 Look at console errors in browser DevTools
- 💬 Review error messages in terminal
- 📧 Contact: support@matharena.com

## Quick Commands Reference

```bash
# Install all dependencies
npm run install:all

# Run development (both frontend + backend)
npm run dev

# Run only frontend
npm run dev:client

# Run only backend
npm run dev:server

# Build for production
npm run build

# Start production server
npm start
```

---

**Happy Coding! 🎓📐⚡**

If you run into any issues not covered here, please create an issue in the repository.

