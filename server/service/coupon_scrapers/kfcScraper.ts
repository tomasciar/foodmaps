import CouponScraper from './couponScraper';
import { MongoClient } from 'mongodb';
import Coupon from '../../../types/interfaces/Coupon';
import axios from 'axios';
import CouponData from '../couponData';

export default class KfcScraper extends CouponScraper {
  readonly source: string;

  constructor(client: MongoClient) {
    const source = 'KFC';
    super(client, source);
    this.source = source;
  }

  /**
   * @function scrape scrapes KFC and stores the data in a database
   * @returns {Promise<Array<Coupon>>}
   * @docs https://sdk.apify.com/docs/examples/cheerio-crawler
   */
  override async scrape(): Promise<Array<Coupon>> {
    const coupons: Array<Coupon> = [];

    const startUrls: Array<string> = await this.getStartUrls();

    const response = await axios.get('https://www.kfc.ca/menu/GetItems?categoryID=CAT1');
    const data = await response.data;

    for (const index in data.DataObject.MenuData.SelectedCategory.SubCategories) {
      for (const item of data.DataObject.MenuData.SelectedCategory.SubCategories[index].Items) {
        const coupon: Coupon = new CouponData({
          source: this.source,
          date: new Date(),
          title: item.ItemName,
          description: item.Description,
          url: startUrls[parseInt(index)]
        });

        coupons.push(coupon);
      }
    }

    if (coupons.length > 0) {
      await this.deleteCoupons(this.source);
      await this.postCoupons(coupons);
    }

    return coupons;
  }

  /**
   * @function getStartUrls gets the start URLs for KFC
   * @returns {Array<string>}
   */
  override async getStartUrls(): Promise<Array<string>> {
    return [
      'https://www.kfc.ca/menu/deals/tuesday-special',
      'https://www.kfc.ca/menu/deals/limited-time-offers',
      'https://www.kfc.ca/menu/deals/coupons'
    ];
  }
}
