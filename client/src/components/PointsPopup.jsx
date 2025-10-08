import { useEffect, useState } from 'react'
import '../styles/gamification.css'

function PointsPopup({ points, x, y, onComplete }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      onComplete && onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!show) return null

  return (
    <div className="points-popup" style={{ left: x, top: y }}>
      +{points} XP
    </div>
  )
}

export default PointsPopup

