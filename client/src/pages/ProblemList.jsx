import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Play, Zap, Trophy, Filter, Star } from 'lucide-react'
import { getAllProblems, getRandomProblem } from '../data/problems'
import '../styles/gamification.css'
import './ProblemList.css'

function ProblemList() {
  const { category } = useParams()
  const navigate = useNavigate()
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, easy, medium, hard
  const [completedProblems, setCompletedProblems] = useState(new Set())

  useEffect(() => {
    fetchProblems()
  }, [category])

  const fetchProblems = async () => {
    try {
      const data = getAllProblems(category)
      setProblems(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching problems:', error)
      setLoading(false)
    }
  }

  const getCategoryInfo = () => {
    const info = {
      'graph-theory': {
        title: 'Graph Theory',
        icon: '🚑',
        description: 'Master shortest path algorithms and network optimization',
        color: '#3b82f6'
      },
      'trigonometry': {
        title: 'Trigonometry',
        icon: '🛸',
        description: 'Calculate angles and solve real-world navigation problems',
        color: '#10b981'
      },
      'integration': {
        title: 'Integration',
        icon: '⚡',
        description: 'Compute areas and analyze power consumption curves',
        color: '#f59e0b'
      }
    }
    return info[category] || {}
  }

  const filteredProblems = filter === 'all' 
    ? problems 
    : problems.filter(p => p.difficulty === filter)

  const categoryInfo = getCategoryInfo()

  const stats = {
    total: problems.length,
    easy: problems.filter(p => p.difficulty === 'easy').length,
    medium: problems.filter(p => p.difficulty === 'medium').length,
    hard: problems.filter(p => p.difficulty === 'hard').length,
    totalPoints: problems.reduce((sum, p) => sum + p.points, 0)
  }

  const startProblem = (problemId) => {
    navigate(`/challenge/${category}/${problemId}`)
  }

  const startRandom = async () => {
    try {
      const problem = getRandomProblem(category, filter !== 'all' ? filter : null)
      if (problem) {
        navigate(`/challenge/${category}/${problem.id}`)
      }
    } catch (error) {
      console.error('Error getting random problem:', error)
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading problems...</p>
      </div>
    )
  }

  return (
    <div className="problem-list-page">
      <div className="container">
        <button onClick={() => navigate('/challenges')} className="back-button">
          <ArrowLeft size={20} />
          Back to Challenges
        </button>

        <div className="problem-list-header fade-in">
          <div className="header-content">
            <div className="category-icon" style={{ background: categoryInfo.color }}>
              {categoryInfo.icon}
            </div>
            <div className="header-text">
              <h1>{categoryInfo.title} Problems</h1>
              <p>{categoryInfo.description}</p>
            </div>
          </div>

          <div className="header-stats">
            <div className="stat-box">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Problems</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.totalPoints}</div>
              <div className="stat-label">Max Points</div>
            </div>
          </div>
        </div>

        <div className="filter-section fade-in">
          <div className="filter-tabs">
            <button
              onClick={() => setFilter('all')}
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            >
              <Filter size={16} />
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('easy')}
              className={`filter-tab ${filter === 'easy' ? 'active' : ''}`}
            >
              Easy ({stats.easy})
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`filter-tab ${filter === 'medium' ? 'active' : ''}`}
            >
              Medium ({stats.medium})
            </button>
            <button
              onClick={() => setFilter('hard')}
              className={`filter-tab ${filter === 'hard' ? 'active' : ''}`}
            >
              Hard ({stats.hard})
            </button>
          </div>

          <button onClick={startRandom} className="btn-game random-btn">
            <Trophy size={18} />
            🎲 Random {filter !== 'all' ? filter.charAt(0).toUpperCase() + filter.slice(1) : ''} Problem
          </button>
        </div>

        <div className="problems-grid">
          {filteredProblems.map((problem, index) => (
            <div
              key={problem.id}
              className={`problem-card glow-card fade-in ${completedProblems.has(problem.id) ? 'completed' : ''}`}
              style={{ 
                animationDelay: `${index * 0.05}s`,
                '--problem-color': categoryInfo.color
              }}
              onClick={() => startProblem(problem.id)}
            >
              <div className="problem-card-header">
                <div className="problem-number">#{problem.id}</div>
                <div className={`difficulty-badge difficulty-${problem.difficulty}`}>
                  {problem.difficulty}
                </div>
              </div>

              <div className="problem-card-body">
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
                
                {/* Star Rating */}
                <div className="star-rating" style={{ marginTop: '12px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star}
                      className={`star ${star <= (problem.difficulty === 'easy' ? 2 : problem.difficulty === 'medium' ? 3 : 5) ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="problem-card-footer">
                <div className="problem-points">
                  <Zap size={16} />
                  <span>{problem.points} XP</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    startProblem(problem.id)
                  }}
                  className="btn-game start-btn"
                >
                  <Play size={16} />
                  Start
                </button>
              </div>

              {completedProblems.has(problem.id) && (
                <div className="completed-badge">✓ Completed</div>
              )}
            </div>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="empty-state">
            <p>No {filter} problems found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProblemList

