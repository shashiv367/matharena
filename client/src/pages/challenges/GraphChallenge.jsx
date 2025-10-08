import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Play, RotateCcw, Lightbulb, Trophy, ArrowLeft } from 'lucide-react'
import ProblemSelector from '../../components/ProblemSelector'
import Confetti from '../../components/Confetti'
import PointsPopup from '../../components/PointsPopup'
import AchievementToast from '../../components/AchievementToast'
import { dijkstra, calculatePathDistance, scoreGraphSolution } from '../../utils/algorithms'
import { saveChallengeSubmission, updateUserStats, checkAndAwardBadges } from '../../services/supabaseService'
import { graphTheoryProblems } from '../../data/problems'
import '../../styles/gamification.css'
import './Challenge.css'

function GraphChallenge({ user }) {
  const canvasRef = useRef(null)
  const navigate = useNavigate()
  const { problemId } = useParams()
  const [currentProblem, setCurrentProblem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [gameState, setGameState] = useState('playing') // playing, completed
  const [selectedPath, setSelectedPath] = useState([])
  const [optimalPath, setOptimalPath] = useState(null)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [pointsPopup, setPointsPopup] = useState(null)
  const [achievement, setAchievement] = useState(null)

  // City map graph structure - will be loaded from problem
  const [graph, setGraph] = useState({
    nodes: [
      { id: 0, label: 'Hospital', x: 100, y: 300, type: 'start' },
      { id: 1, label: 'Junction A', x: 250, y: 150 },
      { id: 2, label: 'Junction B', x: 250, y: 450 },
      { id: 3, label: 'Junction C', x: 400, y: 300 },
      { id: 4, label: 'Junction D', x: 550, y: 150 },
      { id: 5, label: 'Junction E', x: 550, y: 450 },
      { id: 6, label: 'Accident Site', x: 700, y: 300, type: 'end' }
    ],
    edges: [
      { from: 0, to: 1, weight: 5 },
      { from: 0, to: 2, weight: 7 },
      { from: 1, to: 3, weight: 4 },
      { from: 1, to: 4, weight: 6 },
      { from: 2, to: 3, weight: 3 },
      { from: 2, to: 5, weight: 8 },
      { from: 3, to: 4, weight: 2 },
      { from: 3, to: 5, weight: 4 },
      { from: 3, to: 6, weight: 7 },
      { from: 4, to: 6, weight: 5 },
      { from: 5, to: 6, weight: 6 }
    ]
  })

  useEffect(() => {
    if (problemId) {
      loadProblem(parseInt(problemId))
    }
  }, [problemId])

  useEffect(() => {
    if (graph && graph.nodes) {
      drawGraph()
    }
  }, [selectedPath, optimalPath, gameState, hoveredNode, graph])

  const loadProblem = async (id) => {
    try {
      setLoading(true)
      // Load from local data instead of API
      const problem = graphTheoryProblems.find(p => p.id === id)
      if (problem) {
        setCurrentProblem(problem)
        setGraph(problem.graph)
        // Reset state
        setSelectedPath([])
        setOptimalPath(null)
        setScore(0)
        setFeedback(null)
        setGameState('playing')
        setShowHint(false)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error loading problem:', error)
      setLoading(false)
    }
  }

  const handleProblemChange = (newProblem) => {
    navigate(`/challenge/graph-theory/${newProblem.id}`)
  }

  const drawGraph = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw edges
    graph.edges.forEach(edge => {
      const fromNode = graph.nodes[edge.from]
      const toNode = graph.nodes[edge.to]

      const isInPath = selectedPath.some((path, i) => 
        i < selectedPath.length - 1 && 
        ((path === edge.from && selectedPath[i + 1] === edge.to) ||
         (path === edge.to && selectedPath[i + 1] === edge.from))
      )

      const isOptimal = optimalPath && optimalPath.some((path, i) => 
        i < optimalPath.length - 1 && 
        ((path === edge.from && optimalPath[i + 1] === edge.to) ||
         (path === edge.to && optimalPath[i + 1] === edge.from))
      )

      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)
      
      if (isOptimal) {
        ctx.strokeStyle = '#22c55e'
        ctx.lineWidth = 4
      } else if (isInPath) {
        ctx.strokeStyle = '#3b82f6'
        ctx.lineWidth = 4
      } else {
        ctx.strokeStyle = '#475569'
        ctx.lineWidth = 2
      }
      
      ctx.stroke()

      // Draw weight
      const midX = (fromNode.x + toNode.x) / 2
      const midY = (fromNode.y + toNode.y) / 2
      ctx.fillStyle = '#f8fafc'
      ctx.font = 'bold 14px sans-serif'
      ctx.fillText(edge.weight, midX, midY - 5)
    })

    // Draw nodes
    graph.nodes.forEach(node => {
      const isSelected = selectedPath.includes(node.id)
      const isHovered = hoveredNode === node.id
      
      ctx.beginPath()
      ctx.arc(node.x, node.y, isHovered ? 28 : 25, 0, 2 * Math.PI)
      
      if (node.type === 'start') {
        ctx.fillStyle = isHovered ? '#14b8a6' : '#10b981'
      } else if (node.type === 'end') {
        ctx.fillStyle = isHovered ? '#f87171' : '#ef4444'
      } else if (isSelected) {
        ctx.fillStyle = isHovered ? '#60a5fa' : '#3b82f6'
      } else {
        ctx.fillStyle = isHovered ? '#475569' : '#334155'
      }
      
      ctx.fill()
      ctx.strokeStyle = isHovered ? '#fbbf24' : '#f8fafc'
      ctx.lineWidth = isHovered ? 3 : 2
      ctx.stroke()

      // Draw label
      ctx.fillStyle = '#f8fafc'
      ctx.font = isHovered ? 'bold 14px sans-serif' : 'bold 12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(node.id.toString(), node.x, node.y + 5)
      
      // Draw node label on hover
      if (isHovered) {
        ctx.font = '10px sans-serif'
        ctx.fillText(node.label, node.x, node.y + 45)
      }
    })
  }

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    // Account for canvas scaling
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    let foundNode = null
    graph.nodes.forEach(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
      if (distance <= 25) {
        foundNode = node.id
      }
    })
    
    setHoveredNode(foundNode)
  }

  const handleNodeClick = (e) => {
    if (gameState !== 'playing') return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    // Account for canvas scaling
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    graph.nodes.forEach(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
      if (distance <= 25) {
        handleNodeSelection(node.id)
      }
    })
  }

  const handleNodeSelection = (nodeId) => {
    if (selectedPath.length === 0 && nodeId !== 0) {
      return // Must start from hospital
    }

    if (selectedPath.includes(nodeId)) {
      return // Already in path
    }

    if (selectedPath.length > 0) {
      const lastNode = selectedPath[selectedPath.length - 1]
      const isConnected = graph.edges.some(
        edge => (edge.from === lastNode && edge.to === nodeId) ||
                (edge.to === lastNode && edge.from === nodeId)
      )
      if (!isConnected) {
        return // Not connected
      }
    }

    const newPath = [...selectedPath, nodeId]
    setSelectedPath(newPath)

    // Check if reached destination
    if (nodeId === 6) {
      checkSolution(newPath)
    }
  }

  const checkSolution = async (path) => {
    try {
      // Calculate solution using frontend algorithms
      const nodes = graph.nodes.map(n => n.id)
      const startNode = nodes[0]
      const endNode = nodes[nodes.length - 1]
      
      const optimalPath = dijkstra({ nodes, edges: graph.edges }, startNode, endNode)
      const optimalDistance = calculatePathDistance(graph.edges, optimalPath)
      const userDistance = calculatePathDistance(graph.edges, path)
      
      const result = scoreGraphSolution(path, optimalPath, userDistance, optimalDistance)

      setOptimalPath(result.optimalPath)
      setScore(result.score)
      setFeedback(result.feedback)
      setGameState('completed')

      // Save to Supabase
      await saveChallengeSubmission(user.id, 'graph_theory', result.score, {
        problemId: currentProblem?.id,
        path,
        userDistance,
        optimalDistance
      })

      // Update user stats
      const badges = checkAndAwardBadges(result.score, 'graph_theory', { challenges_completed: 0 })
      await updateUserStats(user.id, result.score, true, badges[0])

      // Celebrate!
      setShowConfetti(true)
      
      // Show points popup
      setPointsPopup({
        points: result.score,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      })

      // Show achievement if perfect score
      if (result.score === 100) {
        setTimeout(() => {
          setAchievement({
            icon: '🏆',
            title: 'Perfect Solution!',
            description: 'You found the optimal path!',
            points: result.score
          })
        }, 1000)
      }
    } catch (error) {
      console.error('Error checking solution:', error)
    }
  }

  const reset = () => {
    setSelectedPath([])
    setOptimalPath(null)
    setScore(0)
    setFeedback(null)
    setGameState('playing')
    setShowHint(false)
  }

  const calculatePathDistance = (path) => {
    let distance = 0
    for (let i = 0; i < path.length - 1; i++) {
      const edge = graph.edges.find(
        e => (e.from === path[i] && e.to === path[i + 1]) ||
             (e.to === path[i] && e.from === path[i + 1])
      )
      if (edge) distance += edge.weight
    }
    return distance
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading problem...</p>
      </div>
    )
  }

  if (!currentProblem) {
    return (
      <div className="loading-screen">
        <p>Problem not found</p>
        <button onClick={() => navigate('/challenges/graph-theory')} className="btn btn-primary">
          Back to Problems
        </button>
      </div>
    )
  }

  return (
    <div className="challenge-page">
      <div className="container">
        <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
        {pointsPopup && (
          <PointsPopup
            points={pointsPopup.points}
            x={pointsPopup.x}
            y={pointsPopup.y}
            onComplete={() => setPointsPopup(null)}
          />
        )}
        {achievement && (
          <AchievementToast
            achievement={achievement}
            onClose={() => setAchievement(null)}
          />
        )}
        
        <button onClick={() => navigate('/challenges/graph-theory')} className="back-button">
          <ArrowLeft size={20} />
          Back to Problem List
        </button>

        {currentProblem && (
          <ProblemSelector
            category="graph-theory"
            currentProblemId={currentProblem.id}
            onProblemChange={handleProblemChange}
          />
        )}

        <div className="challenge-header fade-in">
          <div className="challenge-title">
            <h1>🚑 {currentProblem?.title || 'Graph Theory Challenge'}</h1>
            <p>{currentProblem?.description || 'Find the shortest path using Graph Theory'}</p>
          </div>
          <div className="challenge-badges">
            <span className={`badge badge-${currentProblem?.difficulty === 'easy' ? 'success' : currentProblem?.difficulty === 'hard' ? 'warning' : 'warning'}`}>
              {currentProblem?.difficulty}
            </span>
            <span className="badge badge-primary">{currentProblem?.points} Points</span>
          </div>
        </div>

        <div className="challenge-content">
          <div className="challenge-main">
            <div className="challenge-instructions card">
              <h3>📋 Instructions</h3>
              <ol>
                <li>Click on nodes to build your path from the Hospital (node 0) to the Accident Site (node 6)</li>
                <li>Numbers on edges represent travel time in minutes</li>
                <li>Find the shortest possible route to minimize response time</li>
                <li>Only connected nodes can be selected</li>
              </ol>
              
              <div className="math-formula">
                <h4>Dijkstra's Algorithm:</h4>
                <code>d[v] = min(d[v], d[u] + w(u,v))</code>
                <p>Where d[v] = shortest distance to node v</p>
              </div>

              {showHint && (
                <div className="hint-box">
                  <strong>💡 Hint:</strong> Try going through Junction C (node 3) and Junction D (node 4) for an efficient route!
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
            </div>

            <div className="graph-canvas-container card">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onClick={handleNodeClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredNode(null)}
                className="graph-canvas"
              />
              
              <div className="canvas-controls">
                <div className="path-info">
                  {selectedPath.length > 0 && (
                    <>
                      <strong>Current Path:</strong> {selectedPath.join(' → ')}
                      <br />
                      <strong>Distance:</strong> {calculatePathDistance(selectedPath)} minutes
                    </>
                  )}
                </div>
                <button onClick={reset} className="btn btn-secondary">
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {gameState === 'completed' && feedback && (
            <div className="results-panel card glow-card fade-in powerup">
              <div className="results-header">
                <Trophy size={32} color="#f59e0b" />
                <h2>🎉 Challenge Complete!</h2>
              </div>

              <div className="results-grid">
                <div className="result-item">
                  <span className="result-label">Your Distance:</span>
                  <span className="result-value">{feedback.userDistance} min</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Optimal Distance:</span>
                  <span className="result-value">{feedback.optimalDistance} min</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Efficiency:</span>
                  <span className="result-value">{feedback.efficiency}%</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Points Earned:</span>
                  <span className="result-value highlight">{score} pts</span>
                </div>
              </div>

              <div className="results-feedback">
                <p>{feedback.message}</p>
                {optimalPath && (
                  <p><strong>Optimal Path:</strong> {optimalPath.join(' → ')}</p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={reset} className="btn-game">
                  🔄 Try Again
                </button>
                <button onClick={() => navigate('/challenges/graph-theory')} className="btn-game">
                  📋 More Problems
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GraphChallenge

