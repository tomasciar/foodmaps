import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import { MongoClient } from 'mongodb';

// Import routes

const app = express();

env.config();
const port = process.env.PORT || 2820;

// Bypass CORS policy
app.use(cors({ origin: '*' }));

// Use routes

const uri: string = process.env.MONGO_URI;
const client: MongoClient = new MongoClient(uri);

app.listen(port, () => console.log(`Listening on port ${port}`));
