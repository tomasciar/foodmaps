import CouponScraper from './couponScraper';
import { MongoClient } from 'mongodb';
import Coupon from '../../../types/interfaces/Coupon';
import axios from 'axios';
import CouponData from '../couponData';

export default class DominosScraper extends CouponScraper {
  readonly source: string;

  constructor(client: MongoClient) {
    const source = "Domino's";
    super(client, source);
    this.source = source;
  }

  /**
   * @function scrape scrapes Domino's and stores the data in a database
   * @returns {Promise<Array<Coupon>>}
   * @docs https://sdk.apify.com/docs/examples/cheerio-crawler
   */
  override async scrape(): Promise<Array<Coupon>> {
    const coupons: Array<Coupon> = [];

    const urls: Array<string> = await this.getStartUrls();
    const url: string = urls[0];

    const response = await axios.get('https://order.dominos.ca/power/store/10881/menu?lang=en&structured=true');
    const { data } = response;

    for (const index in data.Coupons) {
      const coupon: Coupon = new CouponData({
        source: this.source,
        date: new Date(),
        title: data.Coupons[index].Code,
        description: data.Coupons[index].Name + ' - $' + data.Coupons[index].Price,
        url: url
      });

      coupons.push(coupon);
    }

    if (coupons.length > 0) {
      await this.deleteCoupons(this.source);
      await this.postCoupons(coupons);
    }

    return coupons;
  }

  /**
   * @function getStartUrls gets the start URLs for Domino's
   * @returns {Array<string>}
   */
  override async getStartUrls(): Promise<Array<string>> {
    return ['https://www.dominos.ca/en/pages/order/coupon'];
  }
}
