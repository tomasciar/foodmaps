import express from 'express';
import cors from 'cors';
import env from 'dotenv';

// Import routes
import test from './routes/test.route.js';

const app = express();

env.config();
const port = process.env.PORT || 5000;

// Bypass CORS policy
app.use(cors({ origin: '*' }));

// Use routes
app.use('/test', test);

app.listen(port, () => console.log(`Listening on port ${port}`));
