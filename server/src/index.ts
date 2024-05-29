import 'dotenv/config'
import express from 'express'
import type { ErrorRequestHandler } from 'express'
import cors from 'cors'
import verifyHandler from './verify'
import exampleHandler from './example'

const app = express()
app.use(cors({ 
  origin: 'http://localhost',
  methods: ['GET', 'POST']
}))
app.use(express.json())

app.post('/verify', verifyHandler)
app.get('/example', exampleHandler)
app.use((req, res, next) => {
  res.status(404).send('Service not found')
})
app.use(((err, req, res, next) => {
  res.status(500).send('Internal server error')
}) satisfies ErrorRequestHandler)

const port = process.env.PORT ?? 3074
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
