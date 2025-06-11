import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import tinaRoutes from './routes/tinaRoutes.js'

dotenv.config()

//middleware
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use('/api', tinaRoutes)

// Root route
app.get('/', (req, res) => {
  res.send('Tina the Insurance Assistant is ready to help!')
})

//404 handler
app.use((req, res) => {
  res.status(404).send('Endpoint not found')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log('Loaded API Key:', process.env.API_KEY)
})
