import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import { MongoClient } from 'mongodb';

// Import routes
import test from './tests/test.route';

const app = express();

env.config();
const port = process.env.PORT || 2820;

// Bypass CORS policy
app.use(cors({ origin: '*' }));

// Use routes
app.use('/test', test);

const uri: string = process.env.MONGO_URI;
const client: MongoClient = new MongoClient(uri);

app.listen(port, () => console.log(`Listening on port ${port}`));
