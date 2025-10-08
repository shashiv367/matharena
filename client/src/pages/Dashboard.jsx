import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Target, Award, TrendingUp, Zap, Book, Flame } from 'lucide-react'
import AchievementToast from '../components/AchievementToast'
import { getUserProfile } from '../services/supabaseService'
import '../styles/gamification.css'
import './Dashboard.css'

function Dashboard({ user }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [achievement, setAchievement] = useState(null)
  const [stats, setStats] = useState({
    totalPoints: 0,
    challengesCompleted: 0,
    badges: [],
    rank: 0,
    level: 1,
    xp: 0,
    xpNeeded: 1000,
    streak: 0
  })

  useEffect(() => {
    fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data } = await getUserProfile(user.id)
      if (!data) return
      setProfile(data)
      const totalPoints = data.total_points || 0
      const level = Math.floor(totalPoints / 1000) + 1
      const xp = totalPoints % 1000
      const xpNeeded = 1000
      
      setStats({
        totalPoints,
        challengesCompleted: data.challenges_completed || 0,
        badges: data.badges || [],
        rank: data.rank || 0,
        level,
        xp,
        xpNeeded,
        streak: Math.floor(Math.random() * 7) // Mock streak - implement real tracking later
      })

      // Show welcome achievement on first visit
      if (data.challenges_completed === 0) {
        setAchievement({
          icon: '👋',
          title: 'Welcome to MathArena!',
          description: 'Start your mathematical journey',
          points: 0
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const challenges = [
    {
      id: 'graph-theory',
      title: 'Graph Theory: Ambulance Routing',
      description: 'Optimize emergency vehicle routes using Dijkstra\'s algorithm',
      difficulty: 'Medium',
      points: 100,
      icon: '🚑',
      category: 'Graph Theory',
      color: '#3b82f6'
    },
    {
      id: 'trigonometry',
      title: 'Trigonometry: Drone Path Angle',
      description: 'Calculate optimal flight angles for drone navigation',
      difficulty: 'Easy',
      points: 75,
      icon: '🛸',
      category: 'Trigonometry',
      color: '#10b981'
    },
    {
      id: 'integration',
      title: 'Integration: Energy Consumption',
      description: 'Compute total energy usage from power curves',
      difficulty: 'Hard',
      points: 150,
      icon: '⚡',
      category: 'Calculus',
      color: '#f59e0b'
    }
  ]

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="container">
        {achievement && (
          <AchievementToast
            achievement={achievement}
            onClose={() => setAchievement(null)}
          />
        )}

        <div className="dashboard-header fade-in">
          <div>
            <h1>Welcome back, {profile?.name || user.email}! 👋</h1>
            <p>Ready to solve some real-world math challenges?</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {stats.streak > 0 && (
              <div className="streak-counter">
                <span className="streak-flame">🔥</span>
                {stats.streak} Day Streak!
              </div>
            )}
            <div className="level-badge">
              {stats.level}
            </div>
            <div className="skill-badge">
              <Award size={20} />
              {profile?.skill_level || 'School'} Level
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="xp-section fade-in" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>
              Level {stats.level} → {stats.level + 1}
            </span>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {stats.xp} / {stats.xpNeeded} XP
            </span>
          </div>
          <div className="xp-bar-container">
            <div 
              className="xp-bar" 
              style={{ width: `${(stats.xp / stats.xpNeeded) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="stats-grid fade-in">
          <div className="stat-card glow-card">
            <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.2)' }}>
              <Zap size={28} color="#4f46e5" />
            </div>
            <div className="stat-content">
              <h3 className="pulse">{stats.totalPoints}</h3>
              <p>Total Points</p>
            </div>
          </div>

          <div className="stat-card glow-card">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
              <Target size={28} color="#10b981" />
            </div>
            <div className="stat-content">
              <h3>{stats.challengesCompleted}</h3>
              <p>Challenges Completed</p>
            </div>
          </div>

          <div className="stat-card glow-card">
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
              <Award size={28} color="#f59e0b" />
            </div>
            <div className="stat-content">
              <h3>{stats.badges.length}</h3>
              <p>Badges Earned</p>
            </div>
          </div>

          <div className="stat-card glow-card">
            <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
              <Trophy size={28} color="#ef4444" />
            </div>
            <div className="stat-content">
              <h3>#{stats.rank || 'N/A'}</h3>
              <p>Global Rank</p>
            </div>
          </div>
        </div>

        <div className="challenges-section">
          <div className="section-header">
            <h2>
              <Book size={24} />
              Available Challenges
            </h2>
            <Link to="/challenges" className="btn btn-outline">
              View All
            </Link>
          </div>

          <div className="challenges-grid">
            {challenges.map((challenge) => (
              <Link
                key={challenge.id}
                to={`/challenges/${challenge.id}`}
                className="challenge-card fade-in"
                style={{ '--accent-color': challenge.color }}
              >
                <div className="challenge-icon">{challenge.icon}</div>
                <div className="challenge-content">
                  <div className="challenge-header">
                    <span className="challenge-category">{challenge.category}</span>
                    <span className={`difficulty difficulty-${challenge.difficulty.toLowerCase()}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <h3>{challenge.title}</h3>
                  <p>{challenge.description}</p>
                  <div className="challenge-footer">
                    <div className="challenge-points">
                      <Zap size={16} />
                      {challenge.points} points
                    </div>
                    <div className="challenge-arrow">→</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="recent-activity">
          <h2>
            <TrendingUp size={24} />
            Recent Activity
          </h2>
          <div className="activity-list">
            {stats.challengesCompleted === 0 ? (
              <div className="empty-state">
                <p>No challenges completed yet. Start your first challenge above!</p>
              </div>
            ) : (
              <p>Activity log will appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

