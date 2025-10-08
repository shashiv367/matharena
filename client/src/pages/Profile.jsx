import { useState, useEffect } from 'react'
import axios from 'axios'
import { User, Award, Target, Zap, Trophy, Calendar } from 'lucide-react'
import './Profile.css'

function Profile({ user }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`/api/users/${user.id}`)
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const badges = [
    { id: 'first_challenge', name: 'First Steps', icon: '🎯', description: 'Complete your first challenge' },
    { id: 'graph_master', name: 'Graph Master', icon: '🗺️', description: 'Master Graph Theory challenges' },
    { id: 'trig_expert', name: 'Trig Expert', icon: '📐', description: 'Excel in Trigonometry' },
    { id: 'calc_genius', name: 'Calculus Genius', icon: '∫', description: 'Conquer Integration challenges' },
    { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', description: 'Complete a challenge in under 5 minutes' },
    { id: 'perfectionist', name: 'Perfectionist', icon: '💯', description: 'Get 100% accuracy on any challenge' },
  ]

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header fade-in">
          <div className="profile-avatar-large">
            {profile?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="profile-info">
            <h1>{profile?.name || user.email}</h1>
            <p className="profile-email">{user.email}</p>
            <div className="profile-badges-inline">
              <span className="badge badge-primary">
                <Award size={16} />
                {profile?.skill_level || 'School'} Level
              </span>
              <span className="badge badge-success">
                Rank #{profile?.rank || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-stats-grid">
          <div className="profile-stat-card fade-in">
            <div className="stat-icon-large" style={{ background: 'rgba(79, 70, 229, 0.2)' }}>
              <Zap size={32} color="#4f46e5" />
            </div>
            <div className="stat-content-large">
              <h2>{profile?.total_points || 0}</h2>
              <p>Total Points</p>
            </div>
          </div>

          <div className="profile-stat-card fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="stat-icon-large" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
              <Target size={32} color="#10b981" />
            </div>
            <div className="stat-content-large">
              <h2>{profile?.challenges_completed || 0}</h2>
              <p>Challenges Completed</p>
            </div>
          </div>

          <div className="profile-stat-card fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="stat-icon-large" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
              <Award size={32} color="#f59e0b" />
            </div>
            <div className="stat-content-large">
              <h2>{profile?.badges?.length || 0}</h2>
              <p>Badges Earned</p>
            </div>
          </div>

          <div className="profile-stat-card fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="stat-icon-large" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
              <Trophy size={32} color="#ef4444" />
            </div>
            <div className="stat-content-large">
              <h2>{profile?.avg_score || 0}%</h2>
              <p>Average Score</p>
            </div>
          </div>
        </div>

        <div className="profile-sections">
          <div className="profile-section card fade-in">
            <h2>
              <Award size={24} />
              Badges Collection
            </h2>
            <div className="badges-grid">
              {badges.map(badge => {
                const earned = profile?.badges?.includes(badge.id)
                return (
                  <div
                    key={badge.id}
                    className={`badge-card ${earned ? 'earned' : 'locked'}`}
                  >
                    <div className="badge-icon">{badge.icon}</div>
                    <h3>{badge.name}</h3>
                    <p>{badge.description}</p>
                    {!earned && <div className="badge-lock">🔒</div>}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="profile-section card fade-in" style={{ animationDelay: '0.1s' }}>
            <h2>
              <Calendar size={24} />
              Recent Activity
            </h2>
            <div className="activity-timeline">
              {profile?.challenges_completed === 0 ? (
                <div className="empty-activity">
                  <p>No activity yet. Start solving challenges to track your progress!</p>
                </div>
              ) : (
                <div className="empty-activity">
                  <p>Activity history will be displayed here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

