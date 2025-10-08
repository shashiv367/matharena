import express from 'express'
import { supabase } from '../index.js'

const router = express.Router()

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const { filter } = req.query

    let query = supabase
      .from('users')
      .select('*')
      .order('total_points', { ascending: false })
      .limit(100)

    // Apply skill level filter if specified
    if (filter && filter !== 'all') {
      query = query.eq('skill_level', filter)
    }

    const { data, error } = await query

    if (error) throw error

    res.json(data)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router

