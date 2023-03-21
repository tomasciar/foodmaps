import { Request, Response } from 'express';
import { MongoClient, Sort } from 'mongodb';
import { MenuItem } from '../../types/RestaurantData';
import MenuItemData from '../scraping/menuItemData';
import env from 'dotenv';
import Client from '../mongo/Client';

/**
 * @class MenuItemController
 */
export default class MenuItemController {
  /**
   * @function getMenuItems gets Menu Items from DB
   * @returns {Promise<Array<MenuItem>>}
   */
  static async getMenuItems(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const items: any = await connection
      .db('scrape')
      .collection('menu_items')
      .find({ _id: { $exists: true } })
      .skip(parseInt(req.params.startingAtIndex))
      .limit(parseInt(req.params.numberOfItems))
      .toArray();

    const menuItems: Response<any, Record<string, any>> = items.map((item: any) => {
      const menuItem: MenuItem = new MenuItemData(item);
      return menuItem;
    });

    return res.send(menuItems);
  }
}
