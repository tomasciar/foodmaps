import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import { MongoClient } from 'mongodb';

// Import routes
import test from './tests/test.route';
import menu from './routes/menuItem.route';
import restaurant from './routes/restaurant.route';

const app = express();

env.config();
const port = process.env.PORT || 2820;

// Bypass CORS policy
app.use(cors({ origin: '*' }));

// Use routes
app.use('/test', test);
app.use('/menu', menu);
app.use('/restaurant', restaurant);

app.listen(port, () => console.log(`Listening on port ${port}`));
