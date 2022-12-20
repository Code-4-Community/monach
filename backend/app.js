// Load Environment Variables from .env
import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"
import cors from "cors"
// Import Workflows
import getAllPractitioners from "./workflows/getAllPractitioners.js"
// Import effectful dependencies (database connections, email clients, etc.)
import {scanAllPractitioners} from "./dynamodb.js"


const app = express()

const port = process.env.PORT || 3000

//TODO: Use for local testing https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
const db = []
// Composition Root
const getAllPractitionersHandler = async () => getAllPractitioners(scanAllPractitioners)

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ ok: Date.now().toString() })
})

app.get('/practitioners', async (req, res) => {
  const practitioners = await getAllPractitionersHandler()
  res.status(200).json(practitioners)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
