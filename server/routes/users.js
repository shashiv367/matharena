import express from 'express'
import { supabase } from '../index.js'

const router = express.Router()

// Create new user profile
router.post('/create', async (req, res) => {
  try {
    const { userId, name, email, skillLevel } = req.body

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          name,
          email,
          skill_level: skillLevel,
          total_points: 0,
          challenges_completed: 0,
          badges: [],
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) throw error

    res.json(data)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error

    // Calculate rank
    const { data: allUsers } = await supabase
      .from('users')
      .select('total_points')
      .order('total_points', { ascending: false })

    const rank = allUsers?.findIndex(u => u.total_points <= (data.total_points || 0)) + 1

    res.json({ ...data, rank })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: error.message })
  }
})

// Update user points and stats
router.post('/update-stats', async (req, res) => {
  try {
    const { userId, points, challengeCompleted, badge } = req.body

    // Get current user data
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    const updates = {
      total_points: (user.total_points || 0) + points,
      challenges_completed: challengeCompleted 
        ? (user.challenges_completed || 0) + 1 
        : user.challenges_completed
    }

    // Add badge if earned
    if (badge && !user.badges?.includes(badge)) {
      updates.badges = [...(user.badges || []), badge]
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error

    res.json(data)
  } catch (error) {
    console.error('Error updating user stats:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router

