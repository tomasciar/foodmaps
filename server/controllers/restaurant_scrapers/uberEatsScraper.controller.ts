import RestaurantScraper from './restaurantScraper.controller';
import { RequestQueue } from 'apify';
import { CheerioCrawler, log, LogLevel } from 'crawlee';
import { MongoClient } from 'mongodb';
import { Geolocation, Restaurant, MenuItem } from '../../../types/RestaurantData';

/**
 * @type UberDeal
 */
type UberDeal =
  | 'Buy 1 get 1 free'
  | `Free item (spend $${number | string})`
  | `$0 Delivery Fee (spend $${number | string})`
  | `Spend $${number | string}, save $${number | string}`
  | 'Save on selected items';

/**
 * @class UberScraper
 */
export default class UberEatsScraper extends RestaurantScraper {
  source = 'UberEats';
  startUrls: Array<string>;

  constructor(client: MongoClient, startUrls: Array<string>) {
    super(client, 'UberEats');
    this.startUrls = startUrls;
  }

  /**
   * @function scrape scrapes UberEats and stores the data in a database
   * @returns Promise<Array<object>>
   * @docs https://sdk.apify.com/docs/examples/cheerio-crawler
   */
  override async scrape(): Promise<Array<Restaurant>> {
    const output: Array<Restaurant> = [];
    const scraped = new Set();

    log.setLevel(LogLevel.DEBUG);
    const requestQueue = await RequestQueue.open();

    const crawler = new CheerioCrawler({
      minConcurrency: 10,
      maxConcurrency: 50,
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

        if (request.userData.label === undefined) {
          const script = $('script[type="application/ld+json"]').eq(1).html();
          const data = JSON.parse(script);
          console.log(data);

          for (const element of data.itemListElement) {
            if (scraped.has(element.item.url)) continue;
            else scraped.add(element.item.url);

            requestQueue.addRequest({
              url: element.item.url,
              userData: {
                label: 'RESTAURANT',
                restaurantData: element.item
              }
            });
          }
        }

        if (request.userData.label === 'RESTAURANT') {
          const script = $('script[type="application/ld+json"]').first().html();
          const data = JSON.parse(script);

          const menuItems: Array<MenuItem> = null;
        }
      }
    });

    await crawler.run(this.startUrls);
    return output;
  }
}
