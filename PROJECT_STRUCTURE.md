# 📁 MathArena Project Structure

## Complete File Tree

```
matharena/
│
├── 📄 package.json                    # Root package file (scripts for dev/build)
├── 📄 .gitignore                      # Git ignore configuration
├── 📄 README.md                       # Main project documentation
├── 📄 QUICKSTART.md                   # 5-minute setup guide
├── 📄 SETUP_GUIDE.md                  # Detailed setup instructions
├── 📄 DEPLOYMENT.md                   # Production deployment guide
├── 📄 FEATURES.md                     # Complete feature documentation
├── 📄 PROJECT_SUMMARY.md              # Project overview and achievements
├── 📄 PROJECT_STRUCTURE.md            # This file
├── 📄 LICENSE                         # MIT License
├── 📄 supabase-schema.sql             # Database schema for Supabase
│
├── 📁 client/                         # React Frontend Application
│   ├── 📄 package.json                # Frontend dependencies
│   ├── 📄 vite.config.js              # Vite build configuration
│   ├── 📄 index.html                  # HTML entry point
│   ├── 📄 env.example.txt             # Environment variable template
│   │
│   ├── 📁 src/                        # Source code
│   │   ├── 📄 main.jsx                # React entry point
│   │   ├── 📄 App.jsx                 # Main app component with routing
│   │   ├── 📄 App.css                 # App-level styles
│   │   ├── 📄 index.css               # Global styles and design system
│   │   │
│   │   ├── 📁 config/                 # Configuration files
│   │   │   └── 📄 supabase.js         # Supabase client setup
│   │   │
│   │   ├── 📁 components/             # Reusable components
│   │   │   ├── 📄 Navbar.jsx          # Navigation bar component
│   │   │   └── 📄 Navbar.css          # Navbar styles
│   │   │
│   │   └── 📁 pages/                  # Page components
│   │       ├── 📄 Login.jsx           # Login page
│   │       ├── 📄 Signup.jsx          # Signup page
│   │       ├── 📄 Auth.css            # Auth pages styles
│   │       ├── 📄 Dashboard.jsx       # User dashboard
│   │       ├── 📄 Dashboard.css       # Dashboard styles
│   │       ├── 📄 Challenges.jsx      # Challenges list page
│   │       ├── 📄 Challenges.css      # Challenges list styles
│   │       ├── 📄 Leaderboard.jsx     # Leaderboard page
│   │       ├── 📄 Leaderboard.css     # Leaderboard styles
│   │       ├── 📄 Profile.jsx         # User profile page
│   │       ├── 📄 Profile.css         # Profile styles
│   │       │
│   │       └── 📁 challenges/         # Individual challenge pages
│   │           ├── 📄 GraphChallenge.jsx        # Graph Theory challenge
│   │           ├── 📄 TrigonometryChallenge.jsx # Trigonometry challenge
│   │           ├── 📄 IntegrationChallenge.jsx  # Integration challenge
│   │           └── 📄 Challenge.css             # Shared challenge styles
│   │
│   └── 📁 public/                     # Static assets (if needed)
│
├── 📁 server/                         # Node.js Backend Application
│   ├── 📄 package.json                # Backend dependencies
│   ├── 📄 index.js                    # Server entry point & Express setup
│   ├── 📄 env.example.txt             # Environment variable template
│   │
│   ├── 📁 routes/                     # API route handlers
│   │   ├── 📄 users.js                # User management routes
│   │   ├── 📄 challenges.js           # Challenge submission routes
│   │   └── 📄 leaderboard.js          # Leaderboard routes
│   │
│   └── 📁 algorithms/                 # Mathematical algorithms
│       ├── 📄 graph.js                # Dijkstra's algorithm
│       ├── 📄 trigonometry.js         # Trigonometric calculations
│       └── 📄 integration.js          # Integration computations
│
└── 📁 node_modules/                   # Dependencies (auto-generated)
```

## File Descriptions

### Root Level

| File | Purpose |
|------|---------|
| `package.json` | Root package file with scripts to run client & server together |
| `.gitignore` | Specifies files Git should ignore (node_modules, .env, etc.) |
| `README.md` | Main project documentation and overview |
| `QUICKSTART.md` | Fast 5-minute setup guide |
| `SETUP_GUIDE.md` | Comprehensive step-by-step setup instructions |
| `DEPLOYMENT.md` | Guide for deploying to production (Vercel, Render) |
| `FEATURES.md` | Detailed feature documentation |
| `PROJECT_SUMMARY.md` | Project achievements and technical overview |
| `LICENSE` | MIT License |
| `supabase-schema.sql` | Database schema to run in Supabase SQL Editor |

### Client (Frontend)

#### Configuration
| File | Purpose |
|------|---------|
| `client/package.json` | Frontend dependencies (React, Vite, Chart.js, etc.) |
| `client/vite.config.js` | Vite build tool configuration |
| `client/index.html` | Main HTML file (single-page app entry) |
| `client/env.example.txt` | Template for environment variables |

#### Source Code - Core
| File | Purpose |
|------|---------|
| `src/main.jsx` | React app initialization and rendering |
| `src/App.jsx` | Main component with React Router setup |
| `src/App.css` | App-level styling |
| `src/index.css` | Global CSS, design system, utilities |

#### Source Code - Config
| File | Purpose |
|------|---------|
| `src/config/supabase.js` | Supabase client configuration |

#### Source Code - Components
| File | Purpose |
|------|---------|
| `src/components/Navbar.jsx` | Navigation bar with routing links |
| `src/components/Navbar.css` | Navbar styling |

#### Source Code - Pages
| File | Purpose |
|------|---------|
| `src/pages/Login.jsx` | Login page with authentication |
| `src/pages/Signup.jsx` | Signup page with skill level selection |
| `src/pages/Auth.css` | Shared styles for login/signup |
| `src/pages/Dashboard.jsx` | User dashboard with stats and challenges |
| `src/pages/Dashboard.css` | Dashboard styling |
| `src/pages/Challenges.jsx` | List of all available challenges |
| `src/pages/Challenges.css` | Challenges list styling |
| `src/pages/Leaderboard.jsx` | Global and filtered leaderboards |
| `src/pages/Leaderboard.css` | Leaderboard styling |
| `src/pages/Profile.jsx` | User profile with badges and activity |
| `src/pages/Profile.css` | Profile page styling |

#### Source Code - Challenge Pages
| File | Purpose |
|------|---------|
| `src/pages/challenges/GraphChallenge.jsx` | Graph Theory interactive challenge |
| `src/pages/challenges/TrigonometryChallenge.jsx` | Trigonometry interactive challenge |
| `src/pages/challenges/IntegrationChallenge.jsx` | Integration interactive challenge |
| `src/pages/challenges/Challenge.css` | Shared styling for all challenges |

### Server (Backend)

#### Configuration
| File | Purpose |
|------|---------|
| `server/package.json` | Backend dependencies (Express, Supabase, etc.) |
| `server/index.js` | Express server setup, middleware, routes |
| `server/env.example.txt` | Template for environment variables |

#### Routes (API Endpoints)
| File | Purpose |
|------|---------|
| `server/routes/users.js` | User CRUD operations, stats updates |
| `server/routes/challenges.js` | Challenge submission and scoring |
| `server/routes/leaderboard.js` | Leaderboard data retrieval |

#### Algorithms
| File | Purpose |
|------|---------|
| `server/algorithms/graph.js` | Dijkstra's shortest path algorithm |
| `server/algorithms/trigonometry.js` | Angle calculations and evaluation |
| `server/algorithms/integration.js` | Definite integral calculations |

## Key Technologies by File

### Frontend Technologies
```
React Components      → .jsx files
Styling              → .css files
Build Tool           → vite.config.js
State Management     → React Hooks (in .jsx)
Routing              → React Router (in App.jsx)
Charts               → Chart.js (in challenge components)
API Calls            → Axios (in .jsx files)
Authentication       → Supabase (in config/supabase.js)
```

### Backend Technologies
```
Server Framework     → Express (in index.js)
Database             → Supabase PostgreSQL (in routes)
Authentication       → Supabase Auth (in routes)
Algorithms           → Custom JS (in algorithms/)
API Design           → RESTful (in routes/)
Environment Config   → dotenv (in index.js)
```

## Data Flow

```
User Action (Frontend)
       ↓
React Component Event Handler
       ↓
Axios API Call
       ↓
Express Route Handler (Backend)
       ↓
Algorithm Processing (if needed)
       ↓
Supabase Database Query
       ↓
Response back to Frontend
       ↓
State Update → UI Re-render
```

## Component Hierarchy

```
App.jsx (Router)
├── Login.jsx
├── Signup.jsx
└── Authenticated Routes
    ├── Navbar.jsx (always visible)
    ├── Dashboard.jsx
    │   └── Challenge Cards (links)
    ├── Challenges.jsx
    │   └── Challenge Items (links)
    ├── Challenge Pages
    │   ├── GraphChallenge.jsx
    │   │   ├── Canvas Visualization
    │   │   └── Results Panel
    │   ├── TrigonometryChallenge.jsx
    │   │   ├── Chart Component
    │   │   └── Results Panel
    │   └── IntegrationChallenge.jsx
    │       ├── Chart Component
    │       └── Results Panel
    ├── Leaderboard.jsx
    │   └── Leaderboard Items
    └── Profile.jsx
        ├── Stats Cards
        ├── Badge Grid
        └── Activity Timeline
```

## API Endpoints Structure

```
/api
├── /health                          # GET - Health check
├── /users
│   ├── /create                      # POST - Create user
│   ├── /:userId                     # GET - Get user profile
│   └── /update-stats                # POST - Update user stats
├── /challenges
│   ├── /graph-theory/solve          # POST - Submit graph solution
│   ├── /trigonometry/solve          # POST - Submit trig solution
│   └── /integration/solve           # POST - Submit integration solution
└── /leaderboard                     # GET - Get rankings (?filter=all|school|college)
```

## Database Schema

```
users
├── id (UUID, Primary Key)
├── name (Text)
├── email (Text, Unique)
├── skill_level (Text: 'school' | 'college')
├── total_points (Integer)
├── challenges_completed (Integer)
├── badges (Text Array)
├── avg_score (Decimal)
├── rank (Integer)
├── created_at (Timestamp)
└── updated_at (Timestamp)

challenge_submissions
├── id (UUID, Primary Key)
├── user_id (UUID, Foreign Key → users.id)
├── challenge_type (Text)
├── score (Integer)
├── completed_at (Timestamp)
└── submission_data (JSONB)
```

## Environment Variables

### Client (.env in client/)
```
VITE_SUPABASE_URL=<your_supabase_project_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

### Server (.env in server/)
```
PORT=5000
SUPABASE_URL=<your_supabase_project_url>
SUPABASE_SERVICE_KEY=<your_supabase_service_role_key>
```

## Build & Run Commands

### Development
```bash
npm run dev              # Run both client and server
npm run dev:client       # Run only frontend (port 3000)
npm run dev:server       # Run only backend (port 5000)
```

### Installation
```bash
npm run install:all      # Install all dependencies
```

### Production
```bash
npm run build            # Build frontend for production
npm start                # Start production server
```

## File Size Overview

- **Total Project**: ~15MB (with node_modules)
- **Source Code Only**: ~500KB
- **Documentation**: ~100KB
- **Frontend Bundle**: ~200KB (after build)
- **Backend Size**: ~50KB

## Lines of Code

- **Frontend**: ~2,500 lines
- **Backend**: ~800 lines
- **Styles**: ~1,500 lines
- **Documentation**: ~2,000 lines
- **Total**: ~6,800 lines

---

**This structure represents a complete, production-ready full-stack application!** 🚀

