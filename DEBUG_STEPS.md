# 🐛 Debugging 500 Error

## Where is the Error Happening?

1. **Open Browser DevTools** (Press F12)
2. Go to **Console** tab
3. Look for red error messages

## Common Scenarios:

### Scenario A: Error on Signup
**Error:** `POST http://localhost:3000/api/users/create failed with status code 500`

**Causes:**
- ❌ Database tables not created
- ❌ Wrong service_role key in server/.env
- ❌ Backend server not running

**Fix:**
1. Verify backend is running (should see "Server running on port 5000")
2. Check `server/.env` has correct service_role key
3. Verify database tables exist in Supabase

---

### Scenario B: Error on Dashboard
**Error:** `GET http://localhost:3000/api/users/[id] failed with status code 500`

**Causes:**
- ❌ User not created in database
- ❌ Database connection issue
- ❌ Service key invalid

**Fix:**
1. Check Supabase → Table Editor → users table
2. Verify your user exists
3. Check server terminal for error messages

---

### Scenario C: Backend Not Running
**Error:** `Network Error` or `ERR_CONNECTION_REFUSED`

**Fix:**
```bash
# Kill any existing processes
# Windows:
taskkill /F /IM node.exe

# Then restart:
cd d:\Shashi\matharena
npm run dev
```

---

## Quick Diagnostic Commands

### Test Backend Health
Open browser to: `http://localhost:5000/api/health`

**Expected:** `{"status":"OK","message":"MathArena API is running"}`

If this doesn't work, backend isn't running or .env is wrong.

### Check Server Logs
Look in your terminal running `npm run dev` for:

**Good logs:**
```
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
```

**Bad logs (errors):**
```
Error: Invalid Supabase credentials
Error: Cannot connect to database
Error: EADDRINUSE :::5000 (port already in use)
```

---

## Step-by-Step Fix

### 1. Verify server/.env
```env
PORT=5000
SUPABASE_URL=https://ovnyorlsxouotryiouik.supabase.co
SUPABASE_SERVICE_KEY=<your_actual_service_role_key>
```

**Get service_role key:**
- https://supabase.com/dashboard/project/ovnyorlsxouotryiouik/settings/api
- Copy the **service_role** key (NOT anon key)

### 2. Verify client/.env
```env
VITE_SUPABASE_URL=https://ovnyorlsxouotryiouik.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92bnlvcmxzeG91b3RyeWlvdWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MzQxMTksImV4cCI6MjA3NTUxMDExOX0.4FBKC0yyKC65KXN-AszPuh4JYUZOK0frJTy4WruODhQ
```

### 3. Create Database Tables
1. Go to Supabase Dashboard
2. SQL Editor → New Query
3. Copy/paste entire `supabase-schema.sql`
4. Click Run

### 4. Restart Everything
```bash
# Stop current process (Ctrl+C)
# Then:
cd d:\Shashi\matharena
npm run dev
```

### 5. Try Signup Again
1. Open http://localhost:3000
2. Click "Sign up here"
3. Enter details
4. Submit

---

## Still Getting Errors?

### Check Server Terminal
Look for specific error messages like:

**Error: "Invalid API key"**
→ Wrong service_role key in server/.env

**Error: "relation 'users' does not exist"**
→ Database tables not created

**Error: "ECONNREFUSED"**
→ Supabase URL wrong or internet issue

**Error: "Port 5000 already in use"**
→ Change PORT=5001 in server/.env

---

## Test Individual Components

### Test 1: Backend Only
```bash
cd server
npm run dev
```
Visit: http://localhost:5000/api/health

### Test 2: Frontend Only
```bash
cd client
npm run dev
```
Visit: http://localhost:3000

### Test 3: Database Connection
Check in Supabase dashboard:
- Settings → Database → Connection string
- Should be active and green

---

## Common Mistakes

1. ❌ Using **anon key** in server/.env (should be **service_role** key)
2. ❌ Not creating database tables (run supabase-schema.sql)
3. ❌ Running from wrong directory (should be project root)
4. ❌ .env files not created
5. ❌ Typos in Supabase URL

---

## Get Help

If still stuck, share:
1. Error message from browser console (F12)
2. Error message from server terminal
3. Screenshot of Supabase Table Editor
4. Contents of server/.env (hide the actual service_role key)

