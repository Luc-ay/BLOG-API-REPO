import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import register from './routes/auth.route.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/post.routes.js'

// Configurations
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// File Storage

// ROutes with files
app.use('/auth', register)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

const PORT = process.env.PORT || 6001

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
