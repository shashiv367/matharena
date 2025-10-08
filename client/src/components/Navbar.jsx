import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../config/supabase'
import { Trophy, LogOut, User, Home, Target } from 'lucide-react'
import Logo from './Logo'
import './Navbar.css'

function Navbar({ user }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Logo size="medium" />

        <div className="navbar-menu">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/challenges" className={`nav-link ${isActive('/challenges') || isActive('/challenge') ? 'active' : ''}`}>
            <Target size={20} />
            <span>Challenges</span>
          </Link>
          <Link to="/leaderboard" className={`nav-link ${isActive('/leaderboard') ? 'active' : ''}`}>
            <Trophy size={20} />
            <span>Leaderboard</span>
          </Link>
          <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
            <User size={20} />
            <span>Profile</span>
          </Link>
          <div className="nav-divider"></div>
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

