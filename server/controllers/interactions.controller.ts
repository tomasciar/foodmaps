import { Request, Response } from 'express';
import Interactions from '../../types/interfaces/Interactions';
import Client from '../mongo/Client';

/**
 * @controller InteractionsController
 */
export default class InteractionsController {
  /**
   * @function clickItem updates appropriate values when a menu item is clicked
   * @returns {Promise<any>}
   */
  static async clickItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const value = parseInt(req.query.value as string);

    const rawItem: any = await connection
      .db('scrape')
      .collection('interactions')
      .findOneAndUpdate(
        { _id: { $exists: true } },
        { $inc: { numberOfItemsClicked: 1, valueOfItemsClicked: value } },
        { returnDocument: 'after' }
      );

    const item: Interactions = {
      numberOfItemsClicked: rawItem.numberOfItemsClicked,
      valueOfItemsClicked: rawItem.valueOfItemsClicked,
      numberOfCouponsClicked: rawItem.numberOfCouponsClicked,
      valueOfCouponsClicked: rawItem.valueOfCouponsClicked
    };

    return res.send(item);
  }
}
