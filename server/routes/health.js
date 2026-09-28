import { Router } from 'express'
import { env } from '../config/env.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    service: 'memsphere-api',
    status: 'ok',
    env: env.nodeEnv,
    time: new Date().toISOString(),
  })
})

export default router
