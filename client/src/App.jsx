import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './config/supabase'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Challenges from './pages/Challenges'
import GraphChallenge from './pages/challenges/GraphChallenge'
import TrigonometryChallenge from './pages/challenges/TrigonometryChallenge'
import IntegrationChallenge from './pages/challenges/IntegrationChallenge'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading MathArena...</p>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        {user && <Navbar user={user} />}
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/challenges"
            element={user ? <Challenges /> : <Navigate to="/login" />}
          />
          <Route
            path="/challenge/graph-theory"
            element={user ? <GraphChallenge user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/challenge/trigonometry"
            element={user ? <TrigonometryChallenge user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/challenge/integration"
            element={user ? <IntegrationChallenge user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/leaderboard"
            element={user ? <Leaderboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

