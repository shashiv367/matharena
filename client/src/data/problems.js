// All 150 problems - now in frontend!

export const graphTheoryProblems = [
  // Easy Problems (1-5)
  {
    id: 1,
    difficulty: 'easy',
    title: 'Emergency Ambulance Route',
    description: 'Find the fastest route from Hospital to Accident Site',
    graph: {
      nodes: [
        { id: 0, label: 'Hospital', x: 100, y: 300, type: 'start' },
        { id: 1, label: 'Junction A', x: 250, y: 200 },
        { id: 2, label: 'Junction B', x: 250, y: 400 },
        { id: 3, label: 'Accident Site', x: 400, y: 300, type: 'end' }
      ],
      edges: [
        { from: 0, to: 1, weight: 5 },
        { from: 0, to: 2, weight: 7 },
        { from: 1, to: 3, weight: 4 },
        { from: 2, to: 3, weight: 3 }
      ]
    },
    points: 50
  },
  {
    id: 2,
    difficulty: 'easy',
    title: 'Fire Truck Dispatch',
    description: 'Route fire truck from Station to Fire Location',
    graph: {
      nodes: [
        { id: 0, label: 'Fire Station', x: 100, y: 250, type: 'start' },
        { id: 1, label: 'Main St', x: 250, y: 150 },
        { id: 2, label: 'Oak Ave', x: 250, y: 350 },
        { id: 3, label: 'Fire Site', x: 400, y: 250, type: 'end' }
      ],
      edges: [
        { from: 0, to: 1, weight: 3 },
        { from: 0, to: 2, weight: 5 },
        { from: 1, to: 3, weight: 6 },
        { from: 2, to: 3, weight: 4 }
      ]
    },
    points: 50
  },
  // Problem 3-6: More easy problems
  ...Array.from({ length: 18 }, (_, i) => ({
    id: i + 3,
    difficulty: 'easy',
    title: `Quick Route ${i + 3}`,
    description: `Find the shortest path for scenario ${i + 3}`,
    graph: generateSimpleGraph(),
    points: 50
  })),
  // Medium Problem (Default for now)
  {
    id: 7,
    difficulty: 'medium',
    title: 'Hospital Network',
    description: 'Route ambulance through hospital network',
    graph: {
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
    },
    points: 100
  },
  // Generate remaining problems
  ...Array.from({ length: 43 }, (_, i) => ({
    id: i + 8,
    difficulty: i < 13 ? 'easy' : i < 33 ? 'medium' : 'hard',
    title: `Network Challenge ${i + 8}`,
    description: `Optimize route through network ${i + 8}`,
    graph: i < 13 ? generateSimpleGraph() : i < 33 ? generateMediumGraph() : generateComplexGraph(),
    points: i < 13 ? 50 : i < 33 ? 75 : 100
  }))
]

export const trigonometryProblems = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  difficulty: i < 20 ? 'easy' : i < 40 ? 'medium' : 'hard',
  title: `Angle Calculation ${i + 1}`,
  description: `Calculate the optimal angle for scenario ${i + 1}`,
  scenario: {
    startHeight: 50 + i * 5,
    endHeight: 100 + i * 3,
    horizontalDistance: 150 + i * 10,
    obstacleHeight: 60 + i * 2
  },
  points: i < 20 ? 50 : i < 40 ? 75 : 100
}))

export const integrationProblems = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  difficulty: i < 20 ? 'easy' : i < 40 ? 'medium' : 'hard',
  title: `Integration Problem ${i + 1}`,
  description: `Calculate the definite integral for problem ${i + 1}`,
  function: i === 0 ? 'P(t) = 100 + 50sin(t)' : `Function ${i + 1}`,
  interval: [0, i < 20 ? 5 : i < 40 ? 10 : 2 * Math.PI],
  points: i < 20 ? 50 : i < 40 ? 75 : 100
}))

// Helper functions
function generateSimpleGraph() {
  return {
    nodes: [
      { id: 0, label: 'Start', x: 100, y: 250, type: 'start' },
      { id: 1, label: 'A', x: 250, y: 150 },
      { id: 2, label: 'B', x: 250, y: 350 },
      { id: 3, label: 'End', x: 400, y: 250, type: 'end' }
    ],
    edges: [
      { from: 0, to: 1, weight: Math.floor(Math.random() * 5) + 3 },
      { from: 0, to: 2, weight: Math.floor(Math.random() * 5) + 3 },
      { from: 1, to: 3, weight: Math.floor(Math.random() * 5) + 3 },
      { from: 2, to: 3, weight: Math.floor(Math.random() * 5) + 3 }
    ]
  }
}

function generateMediumGraph() {
  return {
    nodes: [
      { id: 0, label: 'Start', x: 100, y: 300, type: 'start' },
      { id: 1, label: 'A', x: 250, y: 150 },
      { id: 2, label: 'B', x: 250, y: 450 },
      { id: 3, label: 'C', x: 400, y: 300 },
      { id: 4, label: 'D', x: 550, y: 200 },
      { id: 5, label: 'End', x: 700, y: 300, type: 'end' }
    ],
    edges: [
      { from: 0, to: 1, weight: Math.floor(Math.random() * 5) + 3 },
      { from: 0, to: 2, weight: Math.floor(Math.random() * 5) + 3 },
      { from: 1, to: 3, weight: Math.floor(Math.random() * 5) + 3 },
      { from: 2, to: 3, weight: Math.floor(Math.random() * 5) + 3 },
      { from: 3, to: 4, weight: Math.floor(Math.random() * 5) + 3 },
      { from: 3, to: 5, weight: Math.floor(Math.random() * 5) + 3 },
      { from: 4, to: 5, weight: Math.floor(Math.random() * 5) + 3 }
    ]
  }
}

function generateComplexGraph() {
  return {
    nodes: [
      { id: 0, label: 'Start', x: 100, y: 300, type: 'start' },
      { id: 1, label: 'A', x: 200, y: 150 },
      { id: 2, label: 'B', x: 200, y: 450 },
      { id: 3, label: 'C', x: 350, y: 200 },
      { id: 4, label: 'D', x: 350, y: 400 },
      { id: 5, label: 'E', x: 500, y: 150 },
      { id: 6, label: 'F', x: 500, y: 450 },
      { id: 7, label: 'End', x: 650, y: 300, type: 'end' }
    ],
    edges: [
      { from: 0, to: 1, weight: Math.floor(Math.random() * 5) + 2 },
      { from: 0, to: 2, weight: Math.floor(Math.random() * 5) + 2 },
      { from: 1, to: 3, weight: Math.floor(Math.random() * 5) + 2 },
      { from: 2, to: 4, weight: Math.floor(Math.random() * 5) + 2 },
      { from: 3, to: 5, weight: Math.floor(Math.random() * 5) + 2 },
      { from: 4, to: 6, weight: Math.floor(Math.random() * 5) + 2 },
      { from: 5, to: 7, weight: Math.floor(Math.random() * 5) + 2 },
      { from: 6, to: 7, weight: Math.floor(Math.random() * 5) + 2 },
      { from: 3, to: 4, weight: Math.floor(Math.random() * 3) + 1 },
      { from: 5, to: 6, weight: Math.floor(Math.random() * 3) + 1 }
    ]
  }
}

export function getProblemById(category, problemId) {
  const problems = {
    'graph-theory': graphTheoryProblems,
    'trigonometry': trigonometryProblems,
    'integration': integrationProblems
  }
  
  return problems[category]?.find(p => p.id === problemId)
}

export function getRandomProblem(category, difficulty = null) {
  const problems = {
    'graph-theory': graphTheoryProblems,
    'trigonometry': trigonometryProblems,
    'integration': integrationProblems
  }
  
  let pool = problems[category]
  if (difficulty) {
    pool = pool.filter(p => p.difficulty === difficulty)
  }
  
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getAllProblems(category) {
  const problems = {
    'graph-theory': graphTheoryProblems,
    'trigonometry': trigonometryProblems,
    'integration': integrationProblems
  }
  
  return problems[category] || []
}

