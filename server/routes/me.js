import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

/**
 * GET /api/me — sanity check that the auth pipeline works end-to-end.
 * Returns the authenticated user's basic info.
 */
router.get('/', requireAuth, (req, res) => {
  const { id, email, user_metadata } = req.user
  res.json({
    id,
    email,
    fullName: user_metadata?.full_name || null,
  })
})

export default router
