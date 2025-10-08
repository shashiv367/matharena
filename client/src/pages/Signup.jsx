import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'
import { createUserProfile } from '../services/supabaseService'
import { Mail, Lock, User, GraduationCap, UserPlus } from 'lucide-react'
import './Auth.css'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skillLevel: 'school'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            skill_level: formData.skillLevel
          }
        }
      })

      if (authError) throw authError

      // Create user profile in Supabase
      await createUserProfile(
        authData.user.id,
        formData.name,
        formData.email,
        formData.skillLevel
      )

      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to create account')
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="auth-logo">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="signupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <path d="M12 32 L24 16 L36 32 L24 48 Z" stroke="url(#signupGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="44" cy="24" r="10" stroke="url(#signupGradient)" strokeWidth="3" fill="none" />
              <path d="M40 40 Q44 44 52 40" stroke="url(#signupGradient)" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <h1>Begin Your Journey</h1>
          <p>Transform how you learn and apply mathematics</p>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">
              <User size={20} />
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="input"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={20} />
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={20} />
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="skillLevel">
              <GraduationCap size={20} />
              Skill Level
            </label>
            <select
              id="skillLevel"
              name="skillLevel"
              className="input"
              value={formData.skillLevel}
              onChange={handleChange}
              required
            >
              <option value="school">School</option>
              <option value="college">College</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? (
              <span className="spinner-small"></span>
            ) : (
              <>
                <UserPlus size={20} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup

