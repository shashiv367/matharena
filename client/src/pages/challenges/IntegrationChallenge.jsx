import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calculator, RotateCcw, Trophy, ArrowLeft, Lightbulb } from 'lucide-react'
import { scoreIntegrationSolution } from '../../utils/algorithms'
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
  Legend,
  Filler
} from 'chart.js'
import './Challenge.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

function IntegrationChallenge({ user }) {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState('playing')
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [showHint, setShowHint] = useState(false)

  // Energy consumption curve: P(t) = 100 + 50*sin(t) for t in [0, 2π]
  const generateCurveData = () => {
    const points = []
    for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
      points.push({
        x: t,
        y: 100 + 50 * Math.sin(t)
      })
    }
    return points
  }

  const curveData = generateCurveData()

  const chartData = {
    labels: curveData.map(p => p.x.toFixed(2)),
    datasets: [
      {
        label: 'Power Consumption P(t) = 100 + 50sin(t)',
        data: curveData.map(p => p.y),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        fill: true,
        tension: 0.4
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
        text: 'Power Consumption Over Time',
        color: '#f8fafc',
        font: { size: 16 }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (radians)',
          color: '#cbd5e1'
        },
        ticks: { 
          color: '#cbd5e1',
          maxTicksLimit: 10
        },
        grid: { color: '#334155' }
      },
      y: {
        title: {
          display: true,
          text: 'Power (Watts)',
          color: '#cbd5e1'
        },
        ticks: { color: '#cbd5e1' },
        grid: { color: '#334155' },
        min: 0,
        max: 200
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = scoreIntegrationSolution(userAnswer)

      setScore(result.score)
      setFeedback(result.feedback)
      setGameState('completed')

      // Save to Supabase
      await saveChallengeSubmission(user.id, 'integration', result.score, {
        answer: parseFloat(userAnswer)
      })

      await updateUserStats(user.id, result.score, true)
    } catch (error) {
      console.error('Error submitting solution:', error)
    }
  }

  const reset = () => {
    setUserAnswer('')
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
            <h1>⚡ Integration: Energy Consumption</h1>
            <p>Calculate total energy consumption using integration</p>
          </div>
          <div className="challenge-badges">
            <span className="badge badge-warning">Hard</span>
            <span className="badge badge-primary">150 Points</span>
          </div>
        </div>

        <div className="challenge-content">
          <div className="challenge-grid">
            <div className="challenge-instructions card">
              <h3>📋 Problem Statement</h3>
              <p>A factory's power consumption follows the curve:</p>
              <div className="formula-highlight">
                <code>P(t) = 100 + 50sin(t)</code>
              </div>
              <p>where t is time in radians from 0 to 2π (one complete cycle).</p>
              <p><strong>Task:</strong> Calculate the total energy consumed over one complete cycle.</p>

              <div className="math-formula">
                <h4>Integration Formula:</h4>
                <code>E = ∫₀^(2π) P(t) dt</code>
                <code>E = ∫₀^(2π) (100 + 50sin(t)) dt</code>
                <br />
                <p style={{ marginTop: '12px' }}>Remember: ∫ sin(t) dt = -cos(t) + C</p>
              </div>

              {showHint && (
                <div className="hint-box">
                  <strong>💡 Hint:</strong>
                  <br />1. Split the integral: ∫(100 + 50sin(t))dt = ∫100 dt + ∫50sin(t) dt
                  <br />2. ∫100 dt = 100t
                  <br />3. ∫50sin(t) dt = -50cos(t)
                  <br />4. Evaluate from 0 to 2π
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
                  <label htmlFor="answer">Total Energy (Joules):</label>
                  <input
                    id="answer"
                    type="number"
                    step="0.01"
                    className="input"
                    placeholder="e.g., 628.32"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
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
                <h4>Problem Details:</h4>
                <ul>
                  <li>Function: P(t) = 100 + 50sin(t)</li>
                  <li>Interval: [0, 2π]</li>
                  <li>Task: Find ∫₀^(2π) P(t) dt</li>
                  <li>Unit: Joules (Watt × seconds)</li>
                </ul>
              </div>

              <div className="info-box" style={{ marginTop: '16px' }}>
                <h4>Real-World Context:</h4>
                <p>Integration helps us calculate total quantities from rate functions:</p>
                <ul>
                  <li>Energy from power curves</li>
                  <li>Distance from velocity</li>
                  <li>Population from growth rates</li>
                </ul>
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
                  <span className="result-label">Your Answer:</span>
                  <span className="result-value">{userAnswer} J</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Correct Answer:</span>
                  <span className="result-value">{feedback.correctAnswer} J</span>
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
                {feedback.solution && (
                  <div className="solution-explanation">
                    <h4>Solution Steps:</h4>
                    <pre>{feedback.solution}</pre>
                  </div>
                )}
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

export default IntegrationChallenge

