import { useEffect, useState } from 'react'
import '../styles/gamification.css'

function FloatingParticles({ count = 20 }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    try {
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 10 + Math.random() * 10
      }))
      setParticles(newParticles)
    } catch (error) {
      console.error('Error creating particles:', error)
    }
  }, [count])

  return (
    <div className="particles">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  )
}

export default FloatingParticles

