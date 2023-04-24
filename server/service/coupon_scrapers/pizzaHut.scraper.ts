import CouponScraper from './couponScraper';
import { MongoClient } from 'mongodb';
import Coupon from '../../../types/interfaces/Coupon';
import { CheerioCrawler, log, LogLevel } from 'crawlee';
import CouponData from '../couponData';

export default class PizzaHutScraper extends CouponScraper {
  readonly source: string;

  constructor(client: MongoClient) {
    const source = 'Pizza Hut';
    super(client, source);
    this.source = source;
  }

  /**
   * @function scrape scrapes Pizza Hut and stores the data in a database
   * @returns {Promise<Array<Coupon>>}
   * @docs https://sdk.apify.com/docs/examples/cheerio-crawler
   */
  override async scrape(): Promise<Array<Coupon>> {
    const coupons: Array<Coupon> = [];

    log.setLevel(LogLevel.DEBUG);

    const crawler = new CheerioCrawler({
      minConcurrency: 1,
      maxConcurrency: 1,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: 30,

      /**
       * @function requestHandler called for each URL to crawl
       * @param Object that has the following properties:
       * - request: an instance of the Request class
       * - $: the cheerio object containing parsed HTML
       */
      requestHandler: async ({ request, $ }) => {
        log.debug(`Processing ${request.url}...`);

        const list = $('ol[data="qa-menu-list"]').children().toArray();

        console.log(list);

        for (const item of list) {
          const coupon: Coupon = new CouponData({
            source: this.source,
            date: new Date(),
            title: $(item).find('a').children().eq(1).children().eq(0).text(),
            description: $(item).find('a').children().eq(1).children().eq(1).text(),
            url: $(item).find('a').prop('href')
          });

          if (coupon.title) coupons.push(coupon);
        }
      }
    });

    const startUrls: Array<string> = await this.getStartUrls();
    await crawler.run(startUrls);

    if (coupons.length > 0) await this.postCoupons(coupons);

    return coupons;
  }

  /**
   * @function getStartUrls gets the start URLs for Pizza Hut
   * @returns {Array<string>}
   */
  override async getStartUrls(): Promise<Array<string>> {
    return ['https://www.pizzahut.ca/menu/deals'];
  }
}
