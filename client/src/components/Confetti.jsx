import { useEffect, useState } from 'react'
import '../styles/gamification.css'

function Confetti({ active = false, onComplete }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (active) {
      const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      }))
      setPieces(newPieces)

      const timer = setTimeout(() => {
        setPieces([])
        onComplete && onComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [active, onComplete])

  return (
    <>
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`
          }}
        />
      ))}
    </>
  )
}

export default Confetti

