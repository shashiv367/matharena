import { useState, useEffect } from 'react'
import '../styles/gamification.css'

function AchievementToast({ achievement, onClose }) {
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true)
      setTimeout(onClose, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!achievement) return null

  return (
    <div className={`achievement-toast ${isLeaving ? 'leaving' : ''}`}>
      <div className="achievement-icon">{achievement.icon}</div>
      <div className="achievement-content">
        <div className="achievement-title" style={{ fontWeight: 700, marginBottom: '4px' }}>
          {achievement.title}
        </div>
        <div className="achievement-description" style={{ fontSize: '14px', opacity: 0.9 }}>
          {achievement.description}
        </div>
        {achievement.points && (
          <div style={{ marginTop: '8px', color: '#fbbf24', fontWeight: 700 }}>
            +{achievement.points} XP
          </div>
        )}
      </div>
    </div>
  )
}

export default AchievementToast

