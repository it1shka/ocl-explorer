import 'dotenv/config'
import express from 'express'
import type { ErrorRequestHandler } from 'express'
import cors from 'cors'
import verifyHandler from './verify'
import {
  randomExampleHandler,
  exampleListHandler,
  particularExampleHandler,
} from './example'

const app = express()
app.use(cors({
  methods: ['GET', 'POST'],
  origin: (origin, callback) => {
    const allowed = process.env.CORS_ORIGIN ?? 'http://localhost'
    if (origin?.startsWith(allowed)) {
      callback(null, origin)
      return
    }
    callback(new Error('Blocked by CORS'))
  }
}))
app.use(express.json())

app.get('/', (_, res) => { res.send('OCL Explorer API v1.0') })
app.post('/verify', verifyHandler)
const example = express.Router()
example.get('/random', randomExampleHandler)
example.get('/list', exampleListHandler)
example.get('/get', particularExampleHandler)
app.use('/example', example)

app.use((req, res, next) => { res.status(404).send('Service not found') })
app.use(((err, req, res, next) => {
  res.status(500).send('Internal server error')
}) satisfies ErrorRequestHandler)

const port = process.env.PORT ?? 3074
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
