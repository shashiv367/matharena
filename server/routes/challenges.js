import express from 'express'
import { supabase } from '../index.js'
import { dijkstra, calculatePathDistance } from '../algorithms/graph.js'
import { calculateAngle, evaluateAngle } from '../algorithms/trigonometry.js'
import { calculateIntegration } from '../algorithms/integration.js'

const router = express.Router()

// Graph Theory Challenge
router.post('/graph-theory/solve', async (req, res) => {
  try {
    const { userId, path } = req.body

    // Define the graph
    const graph = {
      nodes: [0, 1, 2, 3, 4, 5, 6],
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
    }

    // Calculate optimal path using Dijkstra
    const optimalPath = dijkstra(graph, 0, 6)
    const optimalDistance = calculatePathDistance(graph.edges, optimalPath)
    const userDistance = calculatePathDistance(graph.edges, path)

    // Calculate efficiency
    const efficiency = Math.round((optimalDistance / userDistance) * 100)
    
    // Calculate score
    let score = 0
    let message = ''

    if (userDistance === optimalDistance) {
      score = 100
      message = '🎉 Perfect! You found the optimal path!'
    } else if (efficiency >= 90) {
      score = 85
      message = '👍 Great job! Your path is very efficient.'
    } else if (efficiency >= 80) {
      score = 70
      message = '👌 Good work! You can optimize further.'
    } else {
      score = 50
      message = '💪 Keep practicing! Try to find a shorter route.'
    }

    // Update user stats
    await supabase
      .from('challenge_submissions')
      .insert([
        {
          user_id: userId,
          challenge_type: 'graph_theory',
          score,
          completed_at: new Date().toISOString()
        }
      ])

    // Update user points
    await fetch(`http://localhost:5000/api/users/update-stats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        points: score,
        challengeCompleted: true,
        badge: score === 100 ? 'graph_master' : null
      })
    })

    res.json({
      score,
      optimalPath,
      feedback: {
        userDistance,
        optimalDistance,
        efficiency,
        message
      }
    })
  } catch (error) {
    console.error('Error solving graph challenge:', error)
    res.status(500).json({ error: error.message })
  }
})

// Trigonometry Challenge
router.post('/trigonometry/solve', async (req, res) => {
  try {
    const { userId, angle, scenario } = req.body

    const optimalAngle = calculateAngle(
      scenario.startHeight,
      scenario.endHeight,
      scenario.horizontalDistance
    )

    const evaluation = evaluateAngle(angle, optimalAngle)
    
    let score = 0
    let message = ''

    if (evaluation.accuracy >= 98) {
      score = 75
      message = '🎯 Excellent! Your angle is spot on!'
    } else if (evaluation.accuracy >= 90) {
      score = 65
      message = '👍 Great work! Very close to the optimal angle.'
    } else if (evaluation.accuracy >= 80) {
      score = 50
      message = '👌 Good attempt! Try to be more precise.'
    } else {
      score = 30
      message = '💪 Keep practicing! Review the trigonometric formulas.'
    }

    // Update user stats
    await supabase
      .from('challenge_submissions')
      .insert([
        {
          user_id: userId,
          challenge_type: 'trigonometry',
          score,
          completed_at: new Date().toISOString()
        }
      ])

    await fetch(`http://localhost:5000/api/users/update-stats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        points: score,
        challengeCompleted: true,
        badge: score >= 75 ? 'trig_expert' : null
      })
    })

    res.json({
      score,
      feedback: {
        optimalAngle,
        accuracy: evaluation.accuracy,
        message
      }
    })
  } catch (error) {
    console.error('Error solving trigonometry challenge:', error)
    res.status(500).json({ error: error.message })
  }
})

// Integration Challenge
router.post('/integration/solve', async (req, res) => {
  try {
    const { userId, answer } = req.body

    // Calculate correct answer: ∫₀^(2π) (100 + 50sin(t)) dt
    const correctAnswer = calculateIntegration()
    const userAnswer = parseFloat(answer)

    // Calculate accuracy
    const error = Math.abs(correctAnswer - userAnswer)
    const accuracy = Math.max(0, 100 - (error / correctAnswer) * 100)

    let score = 0
    let message = ''

    if (accuracy >= 99) {
      score = 150
      message = '🌟 Perfect! You mastered integration!'
    } else if (accuracy >= 95) {
      score = 130
      message = '🎉 Excellent work! Very accurate calculation.'
    } else if (accuracy >= 85) {
      score = 100
      message = '👍 Good job! Minor calculation error.'
    } else if (accuracy >= 70) {
      score = 75
      message = '👌 Decent attempt! Review your integration steps.'
    } else {
      score = 50
      message = '💪 Keep practicing! Check the integration formula.'
    }

    const solution = `
Step 1: Split the integral
E = ∫₀^(2π) (100 + 50sin(t)) dt
E = ∫₀^(2π) 100 dt + ∫₀^(2π) 50sin(t) dt

Step 2: Integrate each term
∫ 100 dt = 100t
∫ 50sin(t) dt = -50cos(t)

Step 3: Evaluate from 0 to 2π
E = [100t - 50cos(t)]₀^(2π)
E = [100(2π) - 50cos(2π)] - [100(0) - 50cos(0)]
E = [200π - 50(1)] - [0 - 50(1)]
E = 200π - 50 + 50
E = 200π ≈ ${correctAnswer.toFixed(2)} Joules
    `

    // Update user stats
    await supabase
      .from('challenge_submissions')
      .insert([
        {
          user_id: userId,
          challenge_type: 'integration',
          score,
          completed_at: new Date().toISOString()
        }
      ])

    await fetch(`http://localhost:5000/api/users/update-stats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        points: score,
        challengeCompleted: true,
        badge: score >= 150 ? 'calc_genius' : null
      })
    })

    res.json({
      score,
      feedback: {
        correctAnswer: correctAnswer.toFixed(2),
        accuracy: accuracy.toFixed(1),
        message,
        solution
      }
    })
  } catch (error) {
    console.error('Error solving integration challenge:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router

