import { Request, Response } from 'express';
import Coupon from '../../types/interfaces/Coupon';
import CouponData from '../service/couponData';
import Client from '../mongo/Client';

/**
 * @controller CouponController
 */
export default class CouponController {
  /**
   * @function getCoupons gets Coupons from DB
   * @returns {Promise<Array<Coupon>>}
   */
  static async getCoupons(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const items: any = await connection
      .db('scrape')
      .collection('coupons')
      .find({ _id: { $exists: true } })
      .toArray();

    const coupons: Response<any, Record<string, any>> = items.map((item: any) => {
      const coupon: Coupon = new CouponData(item);
      return coupon;
    });

    return res.send(coupons);
  }

  /**
   * @function getCouponsBySource gets Coupons from DB based on source
   * @returns {Promise<Array<Coupon>>}
   */
  static async getCouponsBySource(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const source = req.query.source as string;

    const items: any = await connection.db('scrape').collection('coupons').find({ source: source }).toArray();

    const coupons: Response<any, Record<string, any>> = items.map((item: any) => {
      const coupon: Coupon = new CouponData(item);
      return coupon;
    });

    return res.send(coupons);
  }
}
