import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import contactRouter from './routes/contactRoute.js'

const app = express()
const port = process.env.PORT || 4000

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB()
        connectCloudinary()
        
        app.use(express.json())
        app.use(cors())

        // ============= SSE SYSTEM =============
        let clients = []
        global.sendSSE = (data) => {
            clients.forEach(client => {
                if (String(client.userId) === String(data.userId)) {
                    client.res.write(`data: ${JSON.stringify(data)}\n\n`)
                }
            })
        }

        app.get('/sse', (req, res) => {
            const userId = req.query.userId
            res.setHeader("Content-Type", "text/event-stream")
            res.setHeader("Cache-Control", "no-cache")
            res.setHeader("Connection", "keep-alive")

            res.flushHeaders()

            const client = { userId, res }
            clients.push(client)

            req.on("close", () => {
                clients = clients.filter(c => c !== client)
            })
        })
        // ======================================

        app.use('/api/user',userRouter)
        app.use('/api/product',productRouter)
        app.use('/api/cart',cartRouter)
        app.use('/api/order',orderRouter)
        app.use('/api/contact',contactRouter)

        app.get('/',(req,res)=>{
            res.send("API Working")
        })

        app.listen(port, ()=> console.log('Server started on PORT : '+ port))
    } catch (error) {
        console.error('Failed to start server:', error.message)
        process.exit(1)
    }
}

startServer()
