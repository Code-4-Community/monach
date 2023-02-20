/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import getAllPractitioners from './workflows/getAllPractitioners';
// Import effectful dependencies (database connections, email clients, etc.)
import { scanAllPractitioners } from './dynamodb';
import { zodiosApp } from '@zodios/express';
import { userApi } from '@monarch/common';

const app = zodiosApp(userApi);

//TODO: Use for local testing https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html
const db = [];

// Composition Root
const getAllPractitionersHandler = async () =>
  getAllPractitioners(scanAllPractitioners);

app.use(cors());

app.get('/', (_req, res) => {
  res.status(200).json({ ok: Date.now() });
});

app.get('/practitioners', async (_req, res) => {
  const practitioners = await getAllPractitionersHandler();
  res.status(200).json(practitioners).end();
});

//app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to backend!' });
// });

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
