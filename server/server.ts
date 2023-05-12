import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import { MongoClient } from 'mongodb';

// Import scrapers
import UberEatsScraper from './service/restaurant_scrapers/uberEatsScraper';
import SkipTheDishesScraper from './service/restaurant_scrapers/skipTheDishesScraper';
import DoorDashScraper from './service/restaurant_scrapers/doorDashScraper';
import WendysScraper from './service/coupon_scrapers/wendysScraper';
import McDonaldsScraper from './service/coupon_scrapers/mcdonaldsScraper';
import KfcScraper from './service/coupon_scrapers/kfcScraper';
import PopeyesScraper from './service/coupon_scrapers/popeyesScraper';
import DominosScraper from './service/coupon_scrapers/dominosScraper';
import PizzaHutScraper from './service/coupon_scrapers/pizzaHut.scraper';
import TacoBellScraper from './service/coupon_scrapers/tacoBellScraper';
import BuffaloWildWingsScraper from './service/coupon_scrapers/buffaloWildWingsScraper';

// Import routes
import test from './tests/test.route';
import menu from './routes/menuItem.route';
import restaurant from './routes/restaurant.route';
import interactions from './routes/interactions.route';
import coupon from './routes/coupon.route';

const app = express();

app.get('/', (_, res) => {
  res.send('Foodmaps API');
});

const path = require('path');
env.config({ path: path.join(__dirname, '.env') });

const port = process.env.PORT || 2820;

// Bypass CORS policy
app.use(cors({ origin: '*' }));

// Use routes
app.use('/test', test);
app.use('/menu', menu);
app.use('/restaurant', restaurant);
app.use('/interactions', interactions);
app.use('/coupon', coupon);

app.listen(port, () => console.log(`Listening on port ${port}`));

const uri: string = process.env.MONGO_URI;
const client: MongoClient = new MongoClient(uri);

const main = async () => {
  try {
    await client.connect();

    const wendys = new WendysScraper(client);
    const mcdonalds = new McDonaldsScraper(client);
    const kfc = new KfcScraper(client);
    const popeyes = new PopeyesScraper(client);
    const dominos = new DominosScraper(client);
    const pizzahut = new PizzaHutScraper(client);
    const tb = new TacoBellScraper(client);
    const bww = new BuffaloWildWingsScraper(client);

    await wendys.scrape();
    await mcdonalds.scrape();
    await kfc.scrape();
    await popeyes.scrape();
    await dominos.scrape();
    await pizzahut.scrape();
    await tb.scrape();
    await bww.scrape();

    const skip = new SkipTheDishesScraper(client);
    const dd = new DoorDashScraper(client);
    const ues = new UberEatsScraper(client);

    await skip.scrape();
    await dd.scrape();
    await ues.scrape();
  } catch (e: unknown) {
    console.error(e);
  } finally {
    client.close();
  }
};

const schedule = require('node-schedule');

(async () => {
  await main();
})();

schedule.scheduleJob('0 0 * * *', async () => await main());
schedule.scheduleJob('0 6 * * *', async () => await main());
schedule.scheduleJob('0 12 * * *', async () => await main());
schedule.scheduleJob('0 18 * * *', async () => await main());
