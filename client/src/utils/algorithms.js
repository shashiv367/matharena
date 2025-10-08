// All mathematical algorithms moved to frontend

// ============================================
// GRAPH THEORY - DIJKSTRA'S ALGORITHM
// ============================================

export function dijkstra(graph, start, end) {
  const distances = {}
  const previous = {}
  const unvisited = new Set()

  // Initialize distances
  const nodes = graph.nodes.map(n => n.id || n)
  nodes.forEach(node => {
    distances[node] = Infinity
    previous[node] = null
    unvisited.add(node)
  })
  distances[start] = 0

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let current = null
    let minDistance = Infinity
    unvisited.forEach(node => {
      if (distances[node] < minDistance) {
        minDistance = distances[node]
        current = node
      }
    })

    if (current === null || current === end) break

    unvisited.delete(current)

    // Update distances to neighbors
    const neighbors = getNeighbors(graph.edges, current)
    neighbors.forEach(({ node, weight }) => {
      if (unvisited.has(node)) {
        const newDistance = distances[current] + weight
        if (newDistance < distances[node]) {
          distances[node] = newDistance
          previous[node] = current
        }
      }
    })
  }

  // Reconstruct path
  const path = []
  let current = end
  while (current !== null) {
    path.unshift(current)
    current = previous[current]
  }

  return path
}

function getNeighbors(edges, node) {
  const neighbors = []
  edges.forEach(edge => {
    if (edge.from === node) {
      neighbors.push({ node: edge.to, weight: edge.weight })
    } else if (edge.to === node) {
      neighbors.push({ node: edge.from, weight: edge.weight })
    }
  })
  return neighbors
}

export function calculatePathDistance(edges, path) {
  let distance = 0
  for (let i = 0; i < path.length - 1; i++) {
    const edge = edges.find(
      e => (e.from === path[i] && e.to === path[i + 1]) ||
           (e.to === path[i] && e.from === path[i + 1])
    )
    if (edge) {
      distance += edge.weight
    }
  }
  return distance
}

export function scoreGraphSolution(userPath, optimalPath, userDistance, optimalDistance) {
  const efficiency = Math.round((optimalDistance / userDistance) * 100)
  
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

  return {
    score,
    optimalPath,
    feedback: {
      userDistance,
      optimalDistance,
      efficiency,
      message
    }
  }
}

// ============================================
// TRIGONOMETRY
// ============================================

export function calculateAngle(startHeight, endHeight, horizontalDistance) {
  const heightDiff = endHeight - startHeight
  const angleRad = Math.atan(heightDiff / horizontalDistance)
  const angleDeg = angleRad * (180 / Math.PI)
  return parseFloat(angleDeg.toFixed(2))
}

export function evaluateAngle(userAngle, optimalAngle) {
  const error = Math.abs(userAngle - optimalAngle)
  const accuracy = Math.max(0, 100 - (error / optimalAngle) * 100)
  
  return {
    accuracy: parseFloat(accuracy.toFixed(2)),
    error: parseFloat(error.toFixed(2))
  }
}

export function scoreTrigonometrySolution(userAngle, scenario) {
  const optimalAngle = calculateAngle(
    scenario.startHeight,
    scenario.endHeight,
    scenario.horizontalDistance
  )

  const evaluation = evaluateAngle(userAngle, optimalAngle)
  
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

  return {
    score,
    feedback: {
      optimalAngle,
      accuracy: evaluation.accuracy,
      message
    }
  }
}

// ============================================
// INTEGRATION
// ============================================

export function calculateIntegration() {
  // ∫₀^(2π) (100 + 50sin(t)) dt
  const upperBound = 2 * Math.PI
  const lowerBound = 0
  
  // F(2π) = 100(2π) - 50cos(2π)
  const upper = 100 * upperBound - 50 * Math.cos(upperBound)
  
  // F(0) = 100(0) - 50cos(0)
  const lower = 100 * lowerBound - 50 * Math.cos(lowerBound)
  
  // Result = F(2π) - F(0)
  const result = upper - lower
  
  return result
}

export function scoreIntegrationSolution(userAnswer) {
  const correctAnswer = calculateIntegration()
  const userAnswerNum = parseFloat(userAnswer)

  // Calculate accuracy
  const error = Math.abs(correctAnswer - userAnswerNum)
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

  return {
    score,
    feedback: {
      correctAnswer: correctAnswer.toFixed(2),
      accuracy: accuracy.toFixed(1),
      message,
      solution
    }
  }
}

