import { MongoClient } from 'mongodb';
import Coupon from '../../../types/interfaces/Coupon';

/**
 * @class CouponScraper
 * @description abstract class for the scrapers that will scrape each restaurant
 */
export default abstract class CouponScraper {
  client: MongoClient;
  scrapingSource: string;

  constructor(client: MongoClient, scrapingSource: string) {
    this.client = client;
    this.scrapingSource = scrapingSource;
  }

  /**
   * @function scrape scrapes the specified website and stores the data in a database
   * @abstract
   * @returns {Promise<Array<Coupon>>}
   */
  abstract scrape(): Promise<Array<Coupon>>;

  /**
   * @function getStartUrls gets the start URLs
   * @abstract
   * @returns {Promise<Array<string>>}
   */
  abstract getStartUrls(): Promise<Array<string>>;

  /**
   * @function postRestaurants posts the scraped Restaurants to the database
   * @returns {void}
   */
  async postCoupons(items: Array<Coupon>): Promise<void> {
    await this.client.db('scrape').collection('coupons').insertMany(items);
  }

  /**
   * @function deleteCoupons deletes the scraped coupons from the database
   * @returns {void}
   */
  async deleteCoupons(source: string): Promise<void> {
    await this.client.db('scrape').collection('coupons').deleteMany({ source: source });
  }

  /**
   * @function delay
   * @param time (in milliseconds)
   */
  async delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
}
