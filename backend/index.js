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

// Base route
app.get('/', (req, res) => {
  res.send("API Working")
})

// Start Server
app.listen(port, () => console.log('Server started on PORT : ' + port))