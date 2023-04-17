import { Request, Response } from 'express';
import Interactions from '../../types/interfaces/Interactions';
import Client from '../mongo/Client';

/**
 * @controller InteractionsController
 */
export default class InteractionsController {
  /**
   * @function clickItem updates appropriate values when a menu item is clicked
   * @returns {Promise<Interactions>}
   */
  static async clickItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const value = +(req.query.value as string);

    const rawItem: any = await connection
      .db('scrape')
      .collection('interactions')
      .findOneAndUpdate(
        { _id: { $exists: true } },
        { $inc: { numberOfItemsClicked: 1, valueOfItemsClicked: value } },
        { returnDocument: 'after' }
      );

    const interactions: Interactions = {
      numberOfItemsClicked: rawItem.numberOfItemsClicked,
      valueOfItemsClicked: rawItem.valueOfItemsClicked,
      numberOfCouponsClicked: rawItem.numberOfCouponsClicked,
      valueOfCouponsClicked: rawItem.valueOfCouponsClicked
    };

    return res.send(interactions);
  }

  /**
   * @function clickCoupon updates appropriate values when a coupon is clicked
   * @returns {Promise<Interactions>}
   */
  static async clickCoupon(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const rawItem: any = await connection
      .db('scrape')
      .collection('interactions')
      .findOneAndUpdate(
        { _id: { $exists: true } },
        { $inc: { numberOfCouponsClicked: 1 } },
        { returnDocument: 'after' }
      );

    const interactions: Interactions = {
      numberOfItemsClicked: rawItem.numberOfItemsClicked,
      valueOfItemsClicked: rawItem.valueOfItemsClicked,
      numberOfCouponsClicked: rawItem.numberOfCouponsClicked,
      valueOfCouponsClicked: rawItem.valueOfCouponsClicked
    };

    return res.send(interactions);
  }

  /**
   * @function getInteractions fetches interactions object from the database
   * @returns {Promise<Interactions>}
   */
  static async getInteractions(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const rawItem: any = await connection.db('scrape').collection('interactions').findOne();

    const interactions: Interactions = {
      numberOfItemsClicked: rawItem.numberOfItemsClicked,
      valueOfItemsClicked: rawItem.valueOfItemsClicked,
      numberOfCouponsClicked: rawItem.numberOfCouponsClicked,
      valueOfCouponsClicked: rawItem.valueOfCouponsClicked
    };

    return res.send(interactions);
  }
}
