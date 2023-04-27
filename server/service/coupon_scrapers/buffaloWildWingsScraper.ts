import CouponScraper from './couponScraper';
import { MongoClient } from 'mongodb';
import Coupon from '../../../types/interfaces/Coupon';
import { CheerioCrawler, log, LogLevel } from 'crawlee';
import CouponData from '../couponData';

export default class BuffaloWildWingsScraper extends CouponScraper {
  readonly source: string;

  constructor(client: MongoClient) {
    const source = 'Buffalo Wild Wings';
    super(client, source);
    this.source = source;
  }

  /**
   * @function scrape scrapes Buffalo Wild Wings and stores the data in a database
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

        const titleList = $('h3.t-header-card-title').toArray();
        const descriptionList = $('p.t-paragraph').toArray();
        descriptionList.shift();

        for (const index in titleList) {
          const coupon: Coupon = new CouponData({
            source: this.source,
            date: new Date(),
            title: $(titleList[index]).text(),
            description: $(descriptionList[index]).text(),
            url: request.url
          });

          coupons.push(coupon);
        }
      }
    });

    const startUrls: Array<string> = await this.getStartUrls();
    await crawler.run(startUrls);

    if (coupons.length > 0) {
      await this.deleteCoupons(this.source);
      await this.postCoupons(coupons);
    }

    return coupons;
  }

  /**
   * @function getStartUrls gets the start URLs for Buffalo Wild Wings
   * @returns {Array<string>}
   */
  override async getStartUrls(): Promise<Array<string>> {
    return ['https://www.buffalowildwings.com/en-ca/promos/'];
  }
}
