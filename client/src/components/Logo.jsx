import { Link } from 'react-router-dom'
import './Logo.css'

function Logo({ variant = 'default', size = 'medium' }) {
  return (
    <Link to="/dashboard" className={`logo-container logo-${size}`}>
      <div className="logo-mark">
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="logo-svg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          
          {/* Mathematical symbols combined */}
          <path 
            d="M8 20 L15 10 L22 20 L15 30 Z" 
            stroke="url(#logoGradient)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="28" cy="15" r="6" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none" />
          <path 
            d="M25 25 Q28 28 32 25" 
            stroke="url(#logoGradient)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      <div className="logo-text">
        <span className="logo-brand">Math</span>
        <span className="logo-arena">Arena</span>
      </div>
    </Link>
  )
}

export default Logo

