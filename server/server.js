import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { env, missingEnv } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

import healthRouter from './routes/health.js'
import meRouter from './routes/me.js'

const app = express()

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  }),
)
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
if (env.nodeEnv !== 'test') app.use(morgan('dev'))

// Routes
app.use('/api/health', healthRouter)
app.use('/api/me', meRouter)

// 404 + error handling (must be last)
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(env.port, () => {
  const missing = missingEnv()
  // eslint-disable-next-line no-console
  console.log(`\n  MemSphere API ready → http://localhost:${env.port}`)
  // eslint-disable-next-line no-console
  console.log(`  Health check         → http://localhost:${env.port}/api/health`)
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.log(
      `\n  ⚠  Missing env vars: ${missing.join(', ')}\n` +
        `     Copy server/.env.example to server/.env and fill them in.\n` +
        `     The server will still run, but Supabase/AI features will return 503.\n`,
    )
  } else {
    // eslint-disable-next-line no-console
    console.log('')
  }
})
