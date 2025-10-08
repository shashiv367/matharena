import { Link } from 'react-router-dom'
import { Zap, Clock, Users } from 'lucide-react'
import './Challenges.css'

function Challenges() {
  const allChallenges = [
    {
      id: 'graph-theory',
      title: 'Graph Theory: Ambulance Routing',
      description: 'Optimize emergency vehicle routes using Dijkstra\'s algorithm to save lives',
      difficulty: 'Medium',
      points: 100,
      icon: '🚑',
      category: 'Graph Theory',
      color: '#3b82f6',
      estimatedTime: '15-20 min',
      completedBy: 1247
    },
    {
      id: 'trigonometry',
      title: 'Trigonometry: Drone Path Angle',
      description: 'Calculate optimal flight angles for drone navigation using trigonometric principles',
      difficulty: 'Easy',
      points: 75,
      icon: '🛸',
      category: 'Trigonometry',
      color: '#10b981',
      estimatedTime: '10-15 min',
      completedBy: 2891
    },
    {
      id: 'integration',
      title: 'Integration: Energy Consumption',
      description: 'Compute total energy usage from power curves using integration techniques',
      difficulty: 'Hard',
      points: 150,
      icon: '⚡',
      category: 'Calculus',
      color: '#f59e0b',
      estimatedTime: '20-30 min',
      completedBy: 743
    }
  ]

  return (
    <div className="challenges-page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Challenge Library</h1>
          <p>Solve real-world problems using mathematical concepts</p>
        </div>

        <div className="challenges-list">
          {allChallenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className="challenge-item fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                '--accent-color': challenge.color
              }}
            >
              <div className="challenge-main">
                <div className="challenge-icon-large">{challenge.icon}</div>
                <div className="challenge-details">
                  <div className="challenge-meta">
                    <span className="challenge-category">{challenge.category}</span>
                    <span className={`difficulty difficulty-${challenge.difficulty.toLowerCase()}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <h2>{challenge.title}</h2>
                  <p>{challenge.description}</p>
                  <div className="challenge-stats">
                    <div className="stat-item">
                      <Zap size={16} />
                      <span>{challenge.points} points</span>
                    </div>
                    <div className="stat-item">
                      <Clock size={16} />
                      <span>{challenge.estimatedTime}</span>
                    </div>
                    <div className="stat-item">
                      <Users size={16} />
                      <span>{challenge.completedBy.toLocaleString()} solved</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to={`/challenges/${challenge.id}`}
                className="btn btn-primary"
              >
                View Problems
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Challenges

