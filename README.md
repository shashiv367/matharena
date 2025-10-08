# 🎓 MathArena - Mathematics in Motion

A gamified, interactive learning platform that transforms abstract mathematical concepts into engaging real-world challenges. Students can collaborate, visualize outcomes, and earn rewards while developing critical thinking and problem-solving skills.

![MathArena](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

### Core Functionality
- **🔐 Authentication System**: Secure login/signup with skill level selection (School/College)
- **📊 Interactive Dashboard**: Track progress, view stats, and access challenges
- **🎯 Real-World Challenges**: 
  - Graph Theory (Dijkstra's Algorithm for ambulance routing)
  - Trigonometry (Drone path angle calculation)
  - Integration (Energy consumption analysis)
- **🏆 Gamification**: Points, badges, leaderboards, and rankings
- **📈 Visualizations**: Interactive charts and graphs using Chart.js
- **👥 User Profiles**: Personalized stats and achievement tracking

### Mathematical Concepts

#### 1. Graph Theory Challenge
- **Algorithm**: Dijkstra's shortest path
- **Formula**: `d[v] = min(d[v], d[u] + w(u,v))`
- **Real-World Application**: Emergency vehicle routing
- **Difficulty**: Medium | **Points**: 100

#### 2. Trigonometry Challenge
- **Formula**: `θ = arctan(Δh / d)`
- **Real-World Application**: Drone navigation
- **Difficulty**: Easy | **Points**: 75

#### 3. Integration Challenge
- **Formula**: `E = ∫₀^(2π) (100 + 50sin(t)) dt`
- **Real-World Application**: Energy consumption calculation
- **Difficulty**: Hard | **Points**: 150

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Chart.js** - Data visualization
- **Axios** - API requests
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Supabase** - Database & Authentication
- **Custom Algorithms** - Mathematical computations

### Database
- **PostgreSQL** (via Supabase)
- **Row Level Security** enabled
- **Real-time capabilities**

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/matharena.git
cd matharena
```

### Step 2: Install Dependencies
```bash
npm run install:all
```

This will install dependencies for both frontend and backend.

### Step 3: Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase-schema.sql`
3. Get your project credentials:
   - Project URL
   - Anon/Public Key
   - Service Role Key (keep this secret!)

### Step 4: Environment Configuration

#### Client Environment (.env in client folder)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Server Environment (.env in server folder)
```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

### Step 5: Run the Application

#### Development Mode (runs both frontend and backend)
```bash
npm run dev
```

#### Or run separately:

**Frontend only:**
```bash
npm run dev:client
# Runs on http://localhost:3000
```

**Backend only:**
```bash
npm run dev:server
# Runs on http://localhost:5000
```

### Step 6: Build for Production
```bash
npm run build
```

## 🎮 How to Use

### 1. Sign Up
- Create an account with your email
- Select your skill level (School or College)
- Get matched with appropriate challenges

### 2. Explore Dashboard
- View your total points and rankings
- See completed challenges and earned badges
- Track your progress over time

### 3. Start Challenges
- Choose from available mathematical challenges
- Read the problem statement and instructions
- Use interactive tools to solve problems

### 4. Earn Rewards
- Complete challenges to earn points
- Unlock badges for achievements
- Climb the leaderboard rankings

## 🏗️ Project Structure

```
matharena/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   ├── challenges/  # Challenge pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ...
│   │   ├── config/        # Configuration files
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   │   ├── users.js
│   │   ├── challenges.js
│   │   └── leaderboard.js
│   ├── algorithms/       # Mathematical algorithms
│   │   ├── graph.js      # Dijkstra's algorithm
│   │   ├── trigonometry.js
│   │   └── integration.js
│   ├── index.js          # Server entry point
│   └── package.json
├── supabase-schema.sql   # Database schema
├── package.json          # Root package file
└── README.md
```

## 📊 Database Schema

### Users Table
- `id` - UUID (Primary Key)
- `name` - User's full name
- `email` - Unique email address
- `skill_level` - 'school' or 'college'
- `total_points` - Accumulated points
- `challenges_completed` - Number of completed challenges
- `badges` - Array of earned badge IDs
- `created_at` - Timestamp

### Challenge Submissions Table
- `id` - UUID (Primary Key)
- `user_id` - Foreign key to users
- `challenge_type` - Type of challenge
- `score` - Points earned
- `completed_at` - Submission timestamp

## 🎨 Features in Detail

### Graph Theory Challenge
- Interactive graph visualization on HTML Canvas
- Click nodes to build your path
- Real-time path distance calculation
- Compares your solution with Dijkstra's optimal path
- Visual feedback on efficiency

### Trigonometry Challenge
- Dynamic chart showing drone flight path
- Real-time angle visualization
- Obstacle detection and clearance check
- Formula hints and explanations

### Integration Challenge
- Beautiful curve visualization
- Shaded area under the curve
- Step-by-step solution explanation
- Real-world energy consumption context

### Gamification System
- **Badges**:
  - First Steps - Complete your first challenge
  - Graph Master - Master Graph Theory
  - Trig Expert - Excel in Trigonometry
  - Calculus Genius - Conquer Integration
  - Speed Demon - Complete in under 5 minutes
  - Perfectionist - Get 100% accuracy

- **Leaderboard**: 
  - Global rankings
  - Skill level filtered rankings
  - Top 3 special highlighting

## 🔧 API Endpoints

### Users
- `POST /api/users/create` - Create new user profile
- `GET /api/users/:userId` - Get user profile
- `POST /api/users/update-stats` - Update user statistics

### Challenges
- `POST /api/challenges/graph-theory/solve` - Submit graph theory solution
- `POST /api/challenges/trigonometry/solve` - Submit trigonometry solution
- `POST /api/challenges/integration/solve` - Submit integration solution

### Leaderboard
- `GET /api/leaderboard?filter=all|school|college` - Get rankings

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Backend (Render)
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `cd server && npm install`
4. Set start command: `node server/index.js`
5. Add environment variables
6. Deploy

### Database (Supabase)
- Already hosted on Supabase cloud
- Auto-scaling and backups included

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Team collaboration features
- [ ] More challenge categories (Statistics, Linear Algebra, etc.)
- [ ] AI-powered hints using OpenAI API
- [ ] Mobile app (React Native)
- [ ] Real-time multiplayer competitions
- [ ] Teacher dashboard for classroom management
- [ ] Achievement animations
- [ ] Social sharing features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Inspired by the need to make mathematics more engaging
- Built with modern web technologies
- Community feedback and contributions

## 📞 Support

For support, email support@matharena.com or join our Slack channel.

---

**Made with ❤️ for students who want to see mathematics in action!**

