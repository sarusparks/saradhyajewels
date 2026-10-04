import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'

const app = express()

// Security headers
app.use(helmet())

// CORS
const rawAllowed = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((u) => u.trim().replace(/\/+$/, ''))
  : []

const defaultOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000']
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...rawAllowed]))

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true)

      const normalizedOrigin = origin.replace(/\/+$/, '')
      const isAllowed =
        allowedOrigins.includes(normalizedOrigin) ||
        /\.vercel\.app$/.test(new URL(origin).hostname)

      if (isAllowed) {
        callback(null, true)
      } else {
        callback(new Error(`CORS not allowed for origin: ${origin}`))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
)

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', limiter)

// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    brand: 'Saradhya Jewels API',
    timestamp: new Date().toISOString(),
  })
})

// Mock live gold rates endpoint for Phase 1
app.get('/api/gold-rates/current', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      rates: {
        '24K': 7485,
        '22K': 6861,
        '18K': 5614,
        '14K': 4366,
      },
      silver: {
        '925': 92.5,
      },
      currency: 'INR',
      unit: 'gram',
      updatedAt: new Date().toISOString(),
    },
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Error]', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  })
})

export default app
