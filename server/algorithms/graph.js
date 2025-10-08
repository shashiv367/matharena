// Dijkstra's Algorithm implementation
export function dijkstra(graph, start, end) {
  const distances = {}
  const previous = {}
  const unvisited = new Set()

  // Initialize distances
  graph.nodes.forEach(node => {
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

