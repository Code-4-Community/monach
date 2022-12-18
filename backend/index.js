// Load Environment Variables from .env
import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"
// Import Workflows
import getAllPractitioners from "./workflows/getAllPractitioners.js"
// Import effectful dependencies (database connections, email clients, etc.)
import {scanAllPractitioners} from "./dynamodb.js"


const app = express()
const port = 3000

//TODO: Use for local testing https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
const db = []
// Composition Root
const getAllPractitionersHandler = async () => getAllPractitioners(scanAllPractitioners)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/practitioners', async (req, res) => {
  const practitioners = await getAllPractitionersHandler()
  res.json(practitioners)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
