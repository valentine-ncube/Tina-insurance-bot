import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import tinaRoutes from './routes/tinaRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use('/api', tinaRoutes)

app.get('/', (req, res) => {
  res.send('Tina the Insurance Assistant is ready to help!')
})

app.use((req, res) => {
  res.status(404).send('Endpoint not found')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
