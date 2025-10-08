// Direct Supabase service for all database operations
import { supabase } from '../config/supabase'

// ============================================
// USER OPERATIONS
// ============================================

export async function createUserProfile(userId, name, email, skillLevel) {
  try {
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
    return { data, error: null }
  } catch (error) {
    console.error('Error creating user:', error)
    return { data: null, error }
  }
}

export async function getUserProfile(userId) {
  try {
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

    return { data: { ...data, rank }, error: null }
  } catch (error) {
    console.error('Error fetching user:', error)
    return { data: null, error }
  }
}

export async function updateUserStats(userId, points, challengeCompleted = false, badge = null) {
  try {
    // Get current user data
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (!user) throw new Error('User not found')

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
    return { data, error: null }
  } catch (error) {
    console.error('Error updating user stats:', error)
    return { data: null, error }
  }
}

// ============================================
// CHALLENGE OPERATIONS
// ============================================

export async function saveChallengeSubmission(userId, challengeType, score, submissionData = {}) {
  try {
    const { data, error } = await supabase
      .from('challenge_submissions')
      .insert([
        {
          user_id: userId,
          challenge_type: challengeType,
          score,
          completed_at: new Date().toISOString(),
          submission_data: submissionData
        }
      ])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error saving submission:', error)
    return { data: null, error }
  }
}

export async function getUserSubmissions(userId, challengeType = null) {
  try {
    let query = supabase
      .from('challenge_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })

    if (challengeType) {
      query = query.eq('challenge_type', challengeType)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return { data: null, error }
  }
}

// ============================================
// LEADERBOARD OPERATIONS
// ============================================

export async function getLeaderboard(filter = 'all') {
  try {
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
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return { data: null, error }
  }
}

// ============================================
// BADGE OPERATIONS
// ============================================

export function checkAndAwardBadges(score, challengeType, userStats) {
  const badges = []

  // First challenge badge
  if (userStats.challenges_completed === 0) {
    badges.push('first_challenge')
  }

  // Perfect score badges
  if (score === 100 || score === 75 || score === 150) {
    if (challengeType === 'graph_theory' && score === 100) {
      badges.push('graph_master')
    } else if (challengeType === 'trigonometry' && score === 75) {
      badges.push('trig_expert')
    } else if (challengeType === 'integration' && score === 150) {
      badges.push('calc_genius')
    }
  }

  return badges
}

