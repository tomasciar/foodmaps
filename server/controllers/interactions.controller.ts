import { Request, Response } from 'express';
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

    const item: any = await connection
      .db('scrape')
      .collection('interactions')
      .findOneAndUpdate({ _id: { $exists: true } }, { $inc: { numberOfItemsClicked: 1, valueOfItemsClicked: value } });

    return res.send(item);
  }
}
