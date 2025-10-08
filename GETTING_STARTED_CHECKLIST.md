# ✅ Getting Started Checklist

Use this checklist to ensure you have everything set up correctly!

## Prerequisites
- [ ] Node.js installed (v16 or higher) - Run `node --version` to check
- [ ] npm installed - Run `npm --version` to check
- [ ] Git installed (optional) - Run `git --version` to check
- [ ] Code editor installed (VS Code recommended)
- [ ] Created Supabase account at [supabase.com](https://supabase.com)

## Supabase Setup
- [ ] Created new Supabase project
- [ ] Named project (e.g., "matharena")
- [ ] Selected region closest to you
- [ ] Waited for project initialization (2-3 minutes)
- [ ] Opened SQL Editor in Supabase dashboard
- [ ] Copied contents of `supabase-schema.sql`
- [ ] Pasted and ran in SQL Editor
- [ ] Verified tables created (users, challenge_submissions)
- [ ] Went to Settings → API
- [ ] Copied Project URL
- [ ] Copied anon/public key
- [ ] Copied service_role key (keep secret!)

## Project Setup
- [ ] Navigated to project folder in terminal
- [ ] Ran `npm run install:all`
- [ ] Waited for all dependencies to install
- [ ] Verified no errors in installation

## Environment Configuration

### Client Environment
- [ ] Navigated to `client/` folder
- [ ] Created `.env` file
- [ ] Added `VITE_SUPABASE_URL=your_url`
- [ ] Added `VITE_SUPABASE_ANON_KEY=your_anon_key`
- [ ] Saved file

### Server Environment
- [ ] Navigated to `server/` folder
- [ ] Created `.env` file
- [ ] Added `PORT=5000`
- [ ] Added `SUPABASE_URL=your_url`
- [ ] Added `SUPABASE_SERVICE_KEY=your_service_key`
- [ ] Saved file

## Running the Application
- [ ] Opened terminal in project root
- [ ] Ran `npm run dev`
- [ ] Saw "Server running on port 5000" message
- [ ] Saw "Local: http://localhost:3000" message
- [ ] Both frontend and backend started successfully

## First Time Access
- [ ] Opened browser
- [ ] Navigated to `http://localhost:3000`
- [ ] Saw MathArena login page
- [ ] Clicked "Sign up here"
- [ ] Filled in signup form:
  - [ ] Entered name
  - [ ] Entered email
  - [ ] Created password (min 6 characters)
  - [ ] Selected skill level
- [ ] Clicked "Create Account"
- [ ] Successfully redirected to dashboard
- [ ] Saw welcome message with your name

## Testing Features

### Dashboard
- [ ] Stats cards display (Total Points, Challenges, Badges, Rank)
- [ ] Challenge cards visible
- [ ] Can click on challenge cards
- [ ] Navigation bar appears

### Graph Theory Challenge
- [ ] Navigated to Graph Theory challenge
- [ ] Saw graph visualization
- [ ] Could click on nodes
- [ ] Path built successfully
- [ ] Reached destination node
- [ ] Got score and feedback
- [ ] Saw optimal path comparison

### Trigonometry Challenge
- [ ] Navigated to Trigonometry challenge
- [ ] Saw flight path chart
- [ ] Entered angle value
- [ ] Submitted answer
- [ ] Got score and feedback
- [ ] Chart updated with input

### Integration Challenge
- [ ] Navigated to Integration challenge
- [ ] Saw energy curve chart
- [ ] Entered answer
- [ ] Submitted solution
- [ ] Got score and detailed feedback
- [ ] Saw solution steps

### Leaderboard
- [ ] Navigated to Leaderboard
- [ ] Saw rankings (may be empty initially)
- [ ] Filter tabs work (All, School, College)

### Profile
- [ ] Navigated to Profile
- [ ] Saw user avatar with initial
- [ ] Stats displayed correctly
- [ ] Badge collection visible
- [ ] Locked/unlocked badges differentiated

## Database Verification
- [ ] Opened Supabase dashboard
- [ ] Went to Table Editor
- [ ] Clicked on `users` table
- [ ] Saw your user record
- [ ] Clicked on `challenge_submissions` table
- [ ] Saw submissions after completing challenges

## Troubleshooting (If Needed)

### If frontend won't start:
- [ ] Check if port 3000 is available
- [ ] Verify `client/.env` has correct values
- [ ] Try `cd client && npm run dev` directly

### If backend won't start:
- [ ] Check if port 5000 is available
- [ ] Verify `server/.env` has correct values
- [ ] Check Supabase credentials are valid
- [ ] Try `cd server && npm run dev` directly

### If can't create account:
- [ ] Check browser console for errors
- [ ] Verify Supabase URL and keys
- [ ] Check database schema was created
- [ ] Ensure email format is valid

### If challenges don't work:
- [ ] Check backend is running (port 5000)
- [ ] Look at browser console for errors
- [ ] Verify API endpoints in terminal
- [ ] Check Supabase service key (not anon key) is in server/.env

## Common Commands Reference
```bash
# Install everything
npm run install:all

# Run both frontend and backend
npm run dev

# Run only frontend
npm run dev:client

# Run only backend
npm run dev:server

# Build for production
npm run build

# Clear cache and reinstall
rm -rf node_modules
rm -rf client/node_modules
rm -rf server/node_modules
npm run install:all
```

## Health Checks

### Frontend Health
- [ ] Visit `http://localhost:3000`
- [ ] Should see login page
- [ ] No console errors

### Backend Health
- [ ] Visit `http://localhost:5000/api/health`
- [ ] Should see: `{"status":"OK","message":"MathArena API is running"}`

### Database Health
- [ ] Can create account successfully
- [ ] Data appears in Supabase dashboard
- [ ] Leaderboard loads without errors

## Optional Enhancements
- [ ] Changed colors in `client/src/index.css`
- [ ] Added custom logo/favicon
- [ ] Modified challenge parameters
- [ ] Added more badge types
- [ ] Customized point values

## Deployment Ready?
- [ ] All features tested locally
- [ ] No console errors
- [ ] Database schema applied
- [ ] Environment variables documented
- [ ] Code committed to Git
- [ ] Ready to follow DEPLOYMENT.md

## Help & Resources
- [ ] Read README.md for overview
- [ ] Check SETUP_GUIDE.md for details
- [ ] Review FEATURES.md for capabilities
- [ ] Reference PROJECT_STRUCTURE.md for file organization
- [ ] Follow DEPLOYMENT.md when ready to deploy

---

## ✅ Completion Status

Once all items are checked:
- **Congratulations! 🎉** 
- Your MathArena platform is fully set up and working!
- Start exploring the challenges and earning points!
- Ready to deploy? Follow DEPLOYMENT.md

## Need Help?

If you're stuck on any step:
1. Check the troubleshooting section above
2. Review error messages in terminal/console
3. Verify environment variables are correct
4. Ensure Supabase is properly configured
5. Check that all dependencies installed successfully

**Happy Learning! 📐🎓⚡**

