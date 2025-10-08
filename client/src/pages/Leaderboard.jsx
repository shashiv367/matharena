import { useState, useEffect } from 'react'
import { Trophy, Medal, Award } from 'lucide-react'
import { getLeaderboard } from '../services/supabaseService'
import './Leaderboard.css'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, school, college

  useEffect(() => {
    fetchLeaderboard()
  }, [filter])

  const fetchLeaderboard = async () => {
    try {
      const { data } = await getLeaderboard(filter)
      setLeaderboard(data || [])
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy size={24} color="#f59e0b" />
    if (rank === 2) return <Medal size={24} color="#94a3b8" />
    if (rank === 3) return <Medal size={24} color="#cd7f32" />
    return <span className="rank-number">#{rank}</span>
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="leaderboard-page">
      <div className="container">
        <div className="page-header fade-in">
          <div>
            <h1>
              <Trophy size={40} />
              Leaderboard
            </h1>
            <p>Top performers in mathematical problem-solving</p>
          </div>
        </div>

        <div className="filter-tabs fade-in">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Users
          </button>
          <button
            className={`filter-tab ${filter === 'school' ? 'active' : ''}`}
            onClick={() => setFilter('school')}
          >
            School Level
          </button>
          <button
            className={`filter-tab ${filter === 'college' ? 'active' : ''}`}
            onClick={() => setFilter('college')}
          >
            College Level
          </button>
        </div>

        <div className="leaderboard-container">
          {leaderboard.length === 0 ? (
            <div className="empty-state card">
              <p>No rankings available yet. Be the first to complete challenges!</p>
            </div>
          ) : (
            <div className="leaderboard-list">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`leaderboard-item fade-in ${index < 3 ? 'top-rank' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="rank-badge">
                    {getRankIcon(index + 1)}
                  </div>

                  <div className="user-info">
                    <div className="user-avatar">
                      {entry.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="user-details">
                      <h3>{entry.name || 'Anonymous'}</h3>
                      <span className="user-level">
                        <Award size={14} />
                        {entry.skill_level}
                      </span>
                    </div>
                  </div>

                  <div className="user-stats">
                    <div className="stat">
                      <span className="stat-value">{entry.total_points || 0}</span>
                      <span className="stat-label">Points</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{entry.challenges_completed || 0}</span>
                      <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{entry.badges?.length || 0}</span>
                      <span className="stat-label">Badges</span>
                    </div>
                  </div>

                  {index < 3 && <div className="top-badge">{['🥇', '🥈', '🥉'][index]}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard

