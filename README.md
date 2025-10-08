<!-- AIGNITE Banner (centered) -->
<div align="center">
  <h1>AIGNITE 2K25</h1>
  <p><strong>Powered by MLSC</strong></p>
</div>

---

<p align="center">
  <strong>🚀 MathArena</strong><br/>
  <em>Mathematics is a powerful tool for solving real-world problems, yet many students struggle to see its relevance beyond textbooks. Topics like trigonometry, integration, and graph theory often feel abstract and disconnected from everyday applications, which reduces motivation and limits their ability to use math for problem-solving.</em>
</p>

---

## 📖 Project Description

**✨ Problem Statement:** What problem are you solving?  

How might we make learning mathematics more engaging and practical by connecting classroom concepts to real-world problems, so that students can collaborate, innovate, and apply math to solve real challenges?

**💡 Proposed Solution:** How does your project solve it?  

**The core idea of MathArena is to:**
- Make math fun and practical, not boring and abstract
- Use real-world challenges (like optimizing ambulance routes, drone navigation, energy consumption) instead of just textbook equations
- Apply game mechanics like points, badges, XP, levels, and leaderboards to motivate students
- Provide interactive visualizations to see mathematics in action
- Offer 150+ problems across three mathematical topics with progressive difficulty

**🎯 Target Users / Use Cases:** Who benefits from your solution?  

**Here are three main groups of users for MathArena:**
- **Students:** Middle and high schoolers (ages 11–18) who will solve challenges and learn through gamification
- **Teachers:** Educators who use the app to help teach and track the progress of their students
- **Schools:** Institutions that might adopt MathArena for their entire math program

---

## 🎮 Core Features

### **150+ Mathematical Challenges**

| Category | Problems | Difficulty Levels | Concepts |
|----------|----------|-------------------|----------|
| **Graph Theory** | 50 | Easy/Medium/Hard | Dijkstra's Algorithm, Shortest Path, Network Optimization |
| **Trigonometry** | 50 | Easy/Medium/Hard | Angle Calculation, Navigation, Real-world Applications |
| **Integration** | 50 | Easy/Medium/Hard | Definite Integrals, Area Under Curve, Energy Analysis |

### **Gamification System**
- 🎯 **Level System** - Earn levels as you gain XP (1 level per 1000 XP)
- ⚡ **XP Progress Bars** - Visual progress tracking with animated shimmer effects
- 🔥 **Daily Streaks** - Track consecutive days of learning
- 🏆 **Achievement Badges** - 6 different achievements to unlock
- 📊 **Leaderboards** - Global and skill-level filtered rankings
- ⭐ **Star Ratings** - Visual difficulty indicators
- 🎊 **Celebration Effects** - Confetti, popups, and notifications on completion

### **Interactive Learning**
- **Graph Theory Challenge:** Click nodes to build paths, see optimal routes calculated by Dijkstra's algorithm
- **Trigonometry Challenge:** Calculate angles with real-time flight path visualization
- **Integration Challenge:** Compute definite integrals with beautiful curve visualizations

---

## 🔬 Methodology

1. **Research & Ideation** – Analyzed student engagement problems in mathematics education, identified gamification as key motivator
2. **Design** – Created wireframes for interactive challenges, designed progression system and reward mechanics
3. **Develop** – Built serverless React application with Supabase backend, implemented mathematical algorithms
4. **Test** – Validated algorithm accuracy, tested user flows, verified gamification mechanics
5. **Deploy** – Deployed on Vercel with global CDN for worldwide accessibility
6. **Future Scope** – Planning team battles, custom challenge creation, AI-powered hints, mobile app

---

## 👥 Team Details

**Team Name:** LazyMinds

| Name | Role | Email |
|------|------|-------|
| Y Lakshmi Prasanna | Team Lead | ylakshmiprasanna18@gmail.com |
| Yadala Chiru | Developer | yadalachiru@gmail.com |
| Hanumavathi Pothuganti | Developer | hanumavathipothuganti06@gmail.com |
| Shashi Vardhan | Developer | vardhans367@gmail.com |

---

## 🛠 Technology Stack

**Languages:** JavaScript (ES6+), SQL  
**Frontend:** React 18, React Router, Chart.js, Vite  
**Backend:** Serverless (Supabase)  
**Database:** PostgreSQL (Supabase)  
**Authentication:** Supabase Auth  
**Deployment:** Vercel  
**Visualizations:** Chart.js, HTML Canvas  

**Mathematical Algorithms:**
- Dijkstra's Shortest Path Algorithm
- Trigonometric Calculations (arctan, sin, cos)
- Definite Integration Solver

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shashiv367/matharena.git
cd matharena
```

2. **Install dependencies**
```bash
cd client
npm install
```

3. **Set up Supabase**
- Create a new project at [supabase.com](https://supabase.com)
- Run the SQL schema from `supabase-schema.sql` in Supabase SQL Editor
- Get your Project URL and Anon Key from Settings → API

4. **Configure environment**

Create `client/.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Run the application**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📹 Demonstration Video

▶ [Watch Demo Video](#)

---

## 🌐 Deployment

🔗 **Live Demo:** [https://matharena.vercel.app/](https://matharena.vercel.app/)

**Deployed on:** Vercel (Global CDN)  
**Database:** Supabase (Cloud PostgreSQL)

---

## 📊 Key Achievements

- ✅ **150 unique mathematical problems** with real-world scenarios
- ✅ **Complete gamification system** with XP, levels, badges, and leaderboards
- ✅ **Serverless architecture** - No backend server required, runs entirely on Vercel + Supabase
- ✅ **Production-ready** - Fully deployed and accessible globally
- ✅ **Mobile responsive** - Works on all devices
- ✅ **Real-time feedback** - Instant scoring and visual celebrations

---

## 🎯 Mathematical Formulas Used

### Dijkstra's Algorithm (Graph Theory)
```
d[v] = min(d[v], d[u] + w(u,v))
```
Where d[v] = shortest distance to node v, w(u,v) = edge weight

### Trigonometry (Angle Calculation)
```
θ = arctan(Δh / d)
```
Where Δh = height difference, d = horizontal distance

### Integration (Energy Calculation)
```
E = ∫₀^(2π) (100 + 50sin(t)) dt
```
Calculates total energy from power consumption curve

---

## 🎨 Unique Features

1. **Confetti Celebrations** - Visual rewards on challenge completion
2. **Floating Particles** - Ambient animations for engagement
3. **Custom SVG Logo** - Unique mathematical branding
4. **Star Difficulty Ratings** - Visual complexity indicators
5. **Achievement Toasts** - Real-time notification system
6. **Problem Navigation** - Browse and filter 150+ problems
7. **Direct Supabase Integration** - No API layer, faster performance

---

## 📚 References

- [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) - Graph theory shortest path
- [Trigonometry Applications](https://www.mathsisfun.com/algebra/trigonometry.html) - Real-world uses
- [Definite Integrals](https://www.khanacademy.org/math/calculus-1/cs1-integration) - Calculus fundamentals
- [Gamification in Education](https://www.researchgate.net/publication/gamification-education) - Learning effectiveness studies

---

## 🔮 Future Enhancements

- [ ] Team collaboration features for group problem-solving
- [ ] AI-powered hints using machine learning
- [ ] Mobile application (React Native)
- [ ] Custom challenge creator for teachers
- [ ] Real-time multiplayer math competitions
- [ ] Video explanations for each problem
- [ ] Advanced analytics dashboard for teachers
- [ ] Social sharing and challenge invitations

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **MLSC** for organizing AIGNITE 2K25
- **Supabase** for providing database and authentication infrastructure
- **Vercel** for serverless deployment platform
- Educational community for inspiring this project

---

<p align="center">
  <b>Hackathon:</b> AIGNITE 2K25 | Organized by MLSC<br/>
  <b>Team:</b> LazyMinds<br/>
  <b>Project:</b> MathArena - Mathematics in Motion
</p>

<p align="center">
  Made with ❤️ for students who want to see mathematics in action!
</p>
