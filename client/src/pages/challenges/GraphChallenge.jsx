import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Play, RotateCcw, Lightbulb, Trophy, ArrowLeft } from 'lucide-react'
import './Challenge.css'

function GraphChallenge({ user }) {
  const canvasRef = useRef(null)
  const navigate = useNavigate()
  const [gameState, setGameState] = useState('playing') // playing, completed
  const [selectedPath, setSelectedPath] = useState([])
  const [optimalPath, setOptimalPath] = useState(null)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState(null)

  // City map graph structure
  const [graph] = useState({
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
    drawGraph()
  }, [selectedPath, optimalPath, gameState])

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
      
      ctx.beginPath()
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI)
      
      if (node.type === 'start') {
        ctx.fillStyle = '#10b981'
      } else if (node.type === 'end') {
        ctx.fillStyle = '#ef4444'
      } else if (isSelected) {
        ctx.fillStyle = '#3b82f6'
      } else {
        ctx.fillStyle = '#334155'
      }
      
      ctx.fill()
      ctx.strokeStyle = '#f8fafc'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw label
      ctx.fillStyle = '#f8fafc'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(node.id.toString(), node.x, node.y + 5)
    })
  }

  const handleNodeClick = (e) => {
    if (gameState !== 'playing') return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

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
      const response = await axios.post('/api/challenges/graph-theory/solve', {
        userId: user.id,
        path: path
      })

      setOptimalPath(response.data.optimalPath)
      setScore(response.data.score)
      setFeedback(response.data.feedback)
      setGameState('completed')
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

  return (
    <div className="challenge-page">
      <div className="container">
        <button onClick={() => navigate('/challenges')} className="back-button">
          <ArrowLeft size={20} />
          Back to Challenges
        </button>

        <div className="challenge-header fade-in">
          <div className="challenge-title">
            <h1>🚑 Graph Theory: Ambulance Routing</h1>
            <p>Find the shortest path from Hospital to Accident Site using Graph Theory</p>
          </div>
          <div className="challenge-badges">
            <span className="badge badge-warning">Medium</span>
            <span className="badge badge-primary">100 Points</span>
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
            <div className="results-panel card fade-in">
              <div className="results-header">
                <Trophy size={32} color="#f59e0b" />
                <h2>Challenge Complete!</h2>
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

export default GraphChallenge

