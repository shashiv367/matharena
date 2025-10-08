// Calculate optimal angle using trigonometry
export function calculateAngle(startHeight, endHeight, horizontalDistance) {
  const heightDiff = endHeight - startHeight
  const angleRad = Math.atan(heightDiff / horizontalDistance)
  const angleDeg = angleRad * (180 / Math.PI)
  return parseFloat(angleDeg.toFixed(2))
}

// Evaluate user's angle against optimal
export function evaluateAngle(userAngle, optimalAngle) {
  const error = Math.abs(userAngle - optimalAngle)
  const accuracy = Math.max(0, 100 - (error / optimalAngle) * 100)
  
  return {
    accuracy: parseFloat(accuracy.toFixed(2)),
    error: parseFloat(error.toFixed(2))
  }
}

// Calculate trigonometric values
export function calculateTrigValues(angle) {
  const radians = angle * (Math.PI / 180)
  return {
    sin: Math.sin(radians),
    cos: Math.cos(radians),
    tan: Math.tan(radians)
  }
}

