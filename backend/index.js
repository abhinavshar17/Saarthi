import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import contactRouter from './routes/contactRoute.js'
import fetch from "node-fetch"
import path from 'path'
import jwt from 'jsonwebtoken'

// In-memory SSE clients and notifications store
global.sseClients = new Set()
global.notifications = []

// helper to broadcast SSE and persist in-memory
global.sendSSE = (payload, filterFn) => {
  try {
    const data = JSON.stringify(payload)
    // persist (keep last 200)
    try {
      global.notifications.unshift({ id: payload.id || payload.orderId || Date.now(), message: payload.message || payload.msg || '', ...payload })
      if (global.notifications.length > 200) global.notifications.length = 200
    } catch (e) { console.log('persist notify error', e) }

    for (const client of global.sseClients) {
      try {
        if (typeof filterFn === 'function' && !filterFn(client)) continue
        client.res.write(`data: ${data}\n\n`)
      } catch (e) { /* ignore per-client errors */ }
    }
  } catch (e) { console.log('sendSSE error', e) }
}

// App Config
const app = express()
const port = process.env.PORT || 4000
const CLIENT_ORIGIN = process.env.CLIENT_URL || 'http://localhost:5173'
connectDB()
connectCloudinary()

// Middleware
app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ extended: true, limit: "20mb" }))
app.use(cookieParser())

// CORS configuration
app.use(cors({
  origin: [CLIENT_ORIGIN, 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true
}))

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/contact', contactRouter)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' })
})

// Notifications SSE stream
app.get('/api/notifications/stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })
  res.flushHeaders && res.flushHeaders()

  const token = req.query.token || null
  let userId = null
  if (token) {
    try { const decoded = jwt.verify(token, process.env.JWT_SECRET); userId = decoded.id } catch (e) { userId = null }
  }

  const client = { id: Date.now() + Math.random(), userId, res }
  global.sseClients.add(client)

  // send a welcome event
  res.write(`data: ${JSON.stringify({ message: 'connected', timestamp: Date.now() })}\n\n`)

  req.on('close', () => {
    try { global.sseClients.delete(client) } catch (e) {}
  })
})

// Notifications polling endpoint (returns recent notifications, filtered by token)
app.get('/api/notifications', (req, res) => {
  const auth = req.headers.authorization || ''
  let userId = null
  if (auth.startsWith('Bearer ')) {
    const token = auth.split(' ')[1]
    try { const decoded = jwt.verify(token, process.env.JWT_SECRET); userId = decoded.id } catch (e) { userId = null }
  }

  try {
    const list = global.notifications.slice(0, 100)
    if (userId) {
      const filtered = list.filter(n => !n.userId || String(n.userId) === String(userId))
      return res.json(filtered)
    }
    res.json(list)
  } catch (err) {
    res.status(500).json([])
  }
})

// Base route
app.get('/', (req, res) => {
  res.send("API Working")
})

// Start Server
app.listen(port, () => console.log('Server started on PORT : ' + port))