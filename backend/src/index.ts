import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import jobRoutes from './routes/job.js'
import { errorHandler } from './middleware/error.js'

const app = express()
const PORT = process.env['PORT'] ?? 3001

app.use(cors())
app.use(express.json())

app.use('/api/jobs', jobRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
