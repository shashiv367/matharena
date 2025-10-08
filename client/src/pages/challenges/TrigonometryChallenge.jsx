import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calculator, RotateCcw, Trophy, ArrowLeft, Lightbulb } from 'lucide-react'
import { scoreTrigonometrySolution } from '../../utils/algorithms'
import { saveChallengeSubmission, updateUserStats } from '../../services/supabaseService'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import './Challenge.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function TrigonometryChallenge({ user }) {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState('playing')
  const [userAngle, setUserAngle] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [showHint, setShowHint] = useState(false)

  // Drone scenario data
  const scenario = {
    startHeight: 50, // meters
    endHeight: 100,  // meters
    horizontalDistance: 150, // meters
    obstacleHeight: 70
  }

  const calculateOptimalAngle = () => {
    const heightDiff = scenario.endHeight - scenario.startHeight
    const angleRad = Math.atan(heightDiff / scenario.horizontalDistance)
    const angleDeg = angleRad * (180 / Math.PI)
    return angleDeg.toFixed(2)
  }

  const chartData = {
    labels: Array.from({ length: 16 }, (_, i) => i * 10),
    datasets: [
      {
        label: 'Drone Path',
        data: Array.from({ length: 16 }, (_, i) => {
          const x = i * 10
          const angle = parseFloat(userAngle) || 0
          return scenario.startHeight + x * Math.tan(angle * Math.PI / 180)
        }),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1
      },
      {
        label: 'Obstacle',
        data: Array.from({ length: 16 }, () => scenario.obstacleHeight),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderDash: [5, 5]
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#f8fafc' }
      },
      title: {
        display: true,
        text: 'Drone Flight Path Visualization',
        color: '#f8fafc',
        font: { size: 16 }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Horizontal Distance (m)',
          color: '#cbd5e1'
        },
        ticks: { color: '#cbd5e1' },
        grid: { color: '#334155' }
      },
      y: {
        title: {
          display: true,
          text: 'Height (m)',
          color: '#cbd5e1'
        },
        ticks: { color: '#cbd5e1' },
        grid: { color: '#334155' },
        min: 0,
        max: 120
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = scoreTrigonometrySolution(parseFloat(userAngle), scenario)

      setScore(result.score)
      setFeedback(result.feedback)
      setGameState('completed')

      // Save to Supabase
      await saveChallengeSubmission(user.id, 'trigonometry', result.score, {
        angle: parseFloat(userAngle),
        scenario
      })

      await updateUserStats(user.id, result.score, true)
    } catch (error) {
      console.error('Error submitting solution:', error)
    }
  }

  const reset = () => {
    setUserAngle('')
    setScore(0)
    setFeedback(null)
    setGameState('playing')
    setShowHint(false)
  }

  return (
    <div className="challenge-page">
      <div className="container">
        <button onClick={() => navigate('/challenges')} className="back-button">
          <ArrowLeft size={20} />
          Back to Challenges
        </button>

        <div className="challenge-header fade-in">
          <div className="challenge-title">
            <h1>🛸 Trigonometry: Drone Path Angle</h1>
            <p>Calculate the optimal flight angle for drone navigation</p>
          </div>
          <div className="challenge-badges">
            <span className="badge badge-success">Easy</span>
            <span className="badge badge-primary">75 Points</span>
          </div>
        </div>

        <div className="challenge-content">
          <div className="challenge-grid">
            <div className="challenge-instructions card">
              <h3>📋 Scenario</h3>
              <p>A delivery drone needs to fly from point A to point B:</p>
              <ul>
                <li><strong>Starting Height:</strong> {scenario.startHeight}m</li>
                <li><strong>Ending Height:</strong> {scenario.endHeight}m</li>
                <li><strong>Horizontal Distance:</strong> {scenario.horizontalDistance}m</li>
                <li><strong>Obstacle Height:</strong> {scenario.obstacleHeight}m</li>
              </ul>

              <div className="math-formula">
                <h4>Trigonometric Formula:</h4>
                <code>tan(θ) = opposite / adjacent</code>
                <code>θ = arctan(Δh / d)</code>
                <p>Where Δh = height difference, d = horizontal distance</p>
              </div>

              {showHint && (
                <div className="hint-box">
                  <strong>💡 Hint:</strong> Use arctan to find the angle. The height difference is {scenario.endHeight - scenario.startHeight}m over {scenario.horizontalDistance}m horizontal distance.
                </div>
              )}

              <button 
                onClick={() => setShowHint(!showHint)} 
                className="btn btn-outline"
                style={{ marginTop: '16px' }}
              >
                <Lightbulb size={18} />
                {showHint ? 'Hide' : 'Show'} Hint
              </button>

              <form onSubmit={handleSubmit} className="solution-form">
                <div className="form-group">
                  <label htmlFor="angle">Enter Flight Angle (degrees):</label>
                  <input
                    id="angle"
                    type="number"
                    step="0.01"
                    className="input"
                    placeholder="e.g., 18.43"
                    value={userAngle}
                    onChange={(e) => setUserAngle(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={gameState === 'completed'}>
                  <Calculator size={18} />
                  Submit Answer
                </button>
              </form>
            </div>

            <div className="visualization-panel card">
              <div style={{ height: '400px' }}>
                <Line data={chartData} options={chartOptions} />
              </div>
              
              <div className="info-box">
                <h4>Current Configuration:</h4>
                <p>Angle: {userAngle || 0}°</p>
                <p>Path clears obstacle: {
                  (parseFloat(userAngle) || 0) > 0 && 
                  scenario.startHeight + (scenario.horizontalDistance / 2) * Math.tan((parseFloat(userAngle) || 0) * Math.PI / 180) > scenario.obstacleHeight
                    ? '✅ Yes' : '❌ No'
                }</p>
              </div>
            </div>
          </div>

          {gameState === 'completed' && feedback && (
            <div className="results-panel card fade-in">
              <div className="results-header">
                <Trophy size={32} color="#f59e0b" />
                <h2>Challenge Complete!</h2>
              </div>

              <div className="results-grid">
                <div className="result-item">
                  <span className="result-label">Your Angle:</span>
                  <span className="result-value">{userAngle}°</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Optimal Angle:</span>
                  <span className="result-value">{feedback.optimalAngle}°</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Accuracy:</span>
                  <span className="result-value">{feedback.accuracy}%</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Points Earned:</span>
                  <span className="result-value highlight">{score} pts</span>
                </div>
              </div>

              <div className="results-feedback">
                <p>{feedback.message}</p>
              </div>

              <button onClick={reset} className="btn btn-primary">
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrigonometryChallenge

