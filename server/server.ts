import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import { MongoClient } from 'mongodb';

// For testing {
import RestaurantData from './controllers/restaurantData.controller';
import UberEatsScraper from './controllers/restaurant_scrapers/uberEatsScraper.controller';

// }

// Import routes
import test from './routes/test.route';

const app = express();

env.config();
const port = process.env.PORT || 2820;

// Bypass CORS policy
app.use(cors({ origin: '*' }));

// Use routes
app.use('/test', test);

const uri: string = process.env.MONGO_URI;
const client: MongoClient = new MongoClient(uri);

// For testing {
const testMain = async () => {
  try {
    await client.connect();

    // Testing body
    const rd = new RestaurantData();
    await rd.getRestaurantData(client);

    const ues = new UberEatsScraper(client, ['https://www.ubereats.com/ca/category/waterloo-on/breakfast-and-brunch']);
    const result = await ues.scrape();
    console.log(result);
  } catch (e: unknown) {
    console.error(e);
  } finally {
    client.close();
  }
};

testMain();
// }

app.listen(port, () => console.log(`Listening on port ${port}`));
