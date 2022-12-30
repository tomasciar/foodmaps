import RestaurantScraper from './restaurantScraper.controller';
import { Actor } from 'apify';
import { CheerioCrawler, log, LogLevel } from 'crawlee';

/**
 * @class UberScraper
 */
export default class UberEatsScraper extends RestaurantScraper {
  source: string = 'UberEats';
  startUrl: URL;

  constructor(startUrl: URL) {
    super('UberEats');
    this.startUrl = startUrl;
  }

  /**
   * @function scrape scrapes UberEats and stores the data in a database
   * @returns Promise<Array<object>>
   * @docs https://sdk.apify.com/docs/examples/cheerio-crawler
   */
  override async scrape(): Promise<Array<object>> {
    log.setLevel(LogLevel.DEBUG);

    await Actor.init();

    const crawler = new CheerioCrawler({
      minConcurrency: 10,
      maxConcurrency: 50,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: 30,

      /**
       * @function requestHandler called for each URL to crawl
       * @param Object that has the following properties:
       * - request: an instance of the Request class
       * - $: the cheerio object containing parsed HTML
       */
      async requestHandler({ request, $ }) {
        log.debug(`Processing ${request.url}...`);

        if (request.userData.label === 'START') {
          const containers = $('.h7.h8.h9').toArray();

          const urls = containers
            .filter(container => {
              return $(container).find('div.bx').length;
            })
            .map(container => {
              return $(container).find('a').attr('href').toString();
            });

          for (const item of urls) {
            const updatedURL = `https://ubereats.com${item}`;
            await enqueueRequest({
              url: updatedURL,
              userData: {
                label: 'DETAIL'
              }
            });
          }
        }

        if (request.userData.label === 'DETAIL') {
          const { url } = request;
          log.info(`Scraping ${url}`);
          await skipLinks();

          return { url, restaurantName: $('h1.co').text() };
        }
      }
    });

    return [];
  }
}
