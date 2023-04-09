import RestaurantScraper from './restaurantScraper';
import { RequestQueue } from 'apify';
import { CheerioCrawler, log, LogLevel } from 'crawlee';
import { MongoClient } from 'mongodb';
import MenuItem from '../../../types/interfaces/MenuItem';
import Restaurant from '../../../types/interfaces/Restaurant';
import ScrapedData from '../../../types/interfaces/ScrapedData';
import Price from '../../../types/classes/Price';
import { NaPhoneNumber } from '../../../types/classes/PhoneNumber';
import RestaurantData from '../restaurantData';
import MenuItemData from '../menuItemData';

/**
 * @class UberScraper
 */
export default class SkipTheDishesScraper extends RestaurantScraper {
  readonly source: string;

  constructor(client: MongoClient) {
    const source = 'SkipTheDishes';
    super(client, source);
    this.source = source;
  }

  /**
   * @function scrape scrapes SkipTheDishes and stores the data in a database
   * @returns {Promise<ScrapedData>}
   * @docs https://sdk.apify.com/docs/examples/cheerio-crawler
   */
  override async scrape(): Promise<ScrapedData> {
    const restaurants: Array<Restaurant> = [];
    const menuItems: Array<MenuItem> = [];
    const scraped = new Set();

    log.setLevel(LogLevel.DEBUG);
    const requestQueue = await RequestQueue.open();

    // this is not working, need to find a workaround later
    const response = await fetch('https://api.skipthedishes.com/customer/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    });
    const data = await response.json();
    console.log(data);

    const crawler = new CheerioCrawler({
      minConcurrency: 1,
      maxConcurrency: 1,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: 30,
      requestQueue,

      /**
       * @function requestHandler called for each URL to crawl
       * @param Object that has the following properties:
       * - request: an instance of the Request class
       * - $: the cheerio object containing parsed HTML
       */
      requestHandler: async ({ request, $ }) => {
        log.debug(`Processing ${request.url}...`);

        await this.delay(1000);

        const listItems = $('#rootsomething').html();
        console.log('Log:');
      }
    });

    const startUrls: Array<string> = await this.getStartUrls();
    await crawler.run(startUrls);

    if (restaurants.length > 0) await this.postRestaurants(restaurants);
    if (menuItems.length > 0) await this.postMenuItems(menuItems);

    return { restaurants, menuItems };
  }

  /**
   * @function getStartUrls gets the start URLs for Skip
   * @returns {Array<string>}
   */
  override async getStartUrls(): Promise<Array<string>> {
    return ['https://www.skipthedishes.com/waterloo/restaurants'];
  }
}
