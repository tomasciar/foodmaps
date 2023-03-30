import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import { MongoClient } from 'mongodb';
import Restaurant from '../../types/interfaces/Restaurant';

// For testing {
import RestaurantData from '../service/restaurantData';
import UberEatsScraper from '../service/restaurant_scrapers/uberEatsScraper';
import SkipTheDishesScraper from '../service/restaurant_scrapers/skipTheDishesScraper';

// }

// Import routes
import test from './test.route';

const app = express();

env.config();
const port = process.env.TEST_PORT || 2820;

// Bypass CORS policy
app.use(cors({ origin: '*' }));

// Use routes
app.use('/test', test);

const uri: string = process.env.MONGO_URI;
const client: MongoClient = new MongoClient(uri);

const testMain = async () => {
  try {
    await client.connect();

    // Testing body

    // const ues = new UberEatsScraper(client);
    const skip = new SkipTheDishesScraper(client);
    skip.scrape();
  } catch (e: unknown) {
    console.error(e);
  } finally {
    client.close();
  }
};

testMain();
// }

app.listen(port, () => console.log(`Listening on port ${port}`));
