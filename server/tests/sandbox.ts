import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import { MongoClient } from 'mongodb';

import UberEatsScraper from '../service/restaurant_scrapers/uberEatsScraper';
import SkipTheDishesScraper from '../service/restaurant_scrapers/skipTheDishesScraper';
import DoorDashScraper from '../service/restaurant_scrapers/doorDashScraper';
import WendysScraper from '../service/coupon_scrapers/wendysScraper';
import McDonaldsScraper from '../service/coupon_scrapers/mcdonaldsScraper';
import KfcScraper from '../service/coupon_scrapers/kfcScraper';
import PopeyesScraper from '../service/coupon_scrapers/popeyesScraper';
import DominosScraper from '../service/coupon_scrapers/dominosScraper';
import PizzaHutScraper from '../service/coupon_scrapers/pizzaHut.scraper';
import TacoBellScraper from '../service/coupon_scrapers/tacoBellScraper';
import BuffaloWildWingsScraper from '../service/coupon_scrapers/buffaloWildWingsScraper';

// Import routes
import test from './test.route';

const app = express();

const path = require('path');
env.config({ path: path.join(__dirname, '.env') });

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

    const ues = new UberEatsScraper(client);
    const skip = new SkipTheDishesScraper(client);
    const dd = new DoorDashScraper(client);

    await ues.scrape();
    await skip.scrape();
    await dd.scrape();

    const wendys = new WendysScraper(client);
    const mcdonalds = new McDonaldsScraper(client);
    const kfc = new KfcScraper(client);
    const popeyes = new PopeyesScraper(client);
    const dominos = new DominosScraper(client);
    const pizzahut = new PizzaHutScraper(client);
    const tb = new TacoBellScraper(client);
    const bww = new BuffaloWildWingsScraper(client);

    await Promise.all([
      wendys.scrape(),
      mcdonalds.scrape(),
      kfc.scrape(),
      popeyes.scrape(),
      dominos.scrape(),
      pizzahut.scrape(),
      tb.scrape(),
      bww.scrape()
    ]);

    console.log('Coupons scraped');
  } catch (e: unknown) {
    console.error(e);
  } finally {
    client.close();
  }
};

const schedule = require('node-schedule');

testMain();

schedule.scheduleJob('* 0 * * *', async function () {
  await testMain();
});

schedule.scheduleJob('* 6 * * *', async function () {
  await testMain();
});

schedule.scheduleJob('* 12 * * *', async function () {
  await testMain();
});

schedule.scheduleJob('* 18 * * *', async function () {
  await testMain();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
