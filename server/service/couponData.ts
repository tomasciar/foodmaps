import { MongoClient } from 'mongodb';
import Coupon from '../../types/interfaces/Coupon';

/**
 * @class CouponData
 */
export default class CouponData implements Required<Coupon> {
  source: string;
  date: Date;
  title: string;
  description: string;
  url: string;

  constructor(props: Coupon) {
    Object.assign(this, props);
  }

  /**
   * @function getCouponData fetches the field data from the database
   * @returns {Promise<void>}
   */
  async getCouponData(client: MongoClient): Promise<void> {
    const data = await client.db('scrape').collection('coupons').findOne({ url: this.url });
    Object.assign(this, data);
  }
}
