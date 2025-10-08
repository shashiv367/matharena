// Calculate definite integral: ∫₀^(2π) (100 + 50sin(t)) dt
export function calculateIntegration() {
  // ∫(100 + 50sin(t))dt = 100t - 50cos(t) + C
  // Evaluate from 0 to 2π
  
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

// Numerical integration using Simpson's rule (for verification)
export function numericalIntegration(func, a, b, n = 1000) {
  const h = (b - a) / n
  let sum = func(a) + func(b)
  
  for (let i = 1; i < n; i++) {
    const x = a + i * h
    sum += i % 2 === 0 ? 2 * func(x) : 4 * func(x)
  }
  
  return (h / 3) * sum
}

// Power function: P(t) = 100 + 50sin(t)
export function powerFunction(t) {
  return 100 + 50 * Math.sin(t)
}

// Calculate area under curve for visualization
export function calculateAreaPoints(func, start, end, steps = 100) {
  const points = []
  const step = (end - start) / steps
  
  for (let i = 0; i <= steps; i++) {
    const t = start + i * step
    points.push({
      x: t,
      y: func(t)
    })
  }
  
  return points
}

