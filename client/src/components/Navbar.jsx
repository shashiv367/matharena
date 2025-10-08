import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'
import { Trophy, LogOut, User, Home, Target } from 'lucide-react'
import './Navbar.css'

function Navbar({ user }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/dashboard" className="navbar-brand">
          <div className="logo">
            <span className="logo-icon">📐</span>
            <span className="logo-text">MathArena</span>
          </div>
        </Link>

        <div className="navbar-menu">
          <Link to="/dashboard" className="nav-link">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/challenges" className="nav-link">
            <Target size={20} />
            <span>Challenges</span>
          </Link>
          <Link to="/leaderboard" className="nav-link">
            <Trophy size={20} />
            <span>Leaderboard</span>
          </Link>
          <Link to="/profile" className="nav-link">
            <User size={20} />
            <span>Profile</span>
          </Link>
          <button onClick={handleLogout} className="nav-link logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

