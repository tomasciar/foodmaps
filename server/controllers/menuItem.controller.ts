import { Request, Response } from 'express';
import { MongoClient, Sort } from 'mongodb';
import { MenuItem } from '../../types/RestaurantData';
import MenuItemData from '../scraping/menuItemData';
import env from 'dotenv';

env.config();
const uri: string = process.env.MONGO_URI;

/**
 * @class MenuItemController
 */
export default class MenuItemController {
  static client: MongoClient = new MongoClient(uri);

  /**
   * @function getMenuItems gets Menu Items from DB
   * @returns {Promise<Array<MenuItem>>}
   */
  static async getMenuItems(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      await this.client.connect();

      const items: any = this.client
        .db('scrape')
        .collection('menuItems')
        .find()
        .skip(parseInt(req.params.startingAtIndex))
        .limit(parseInt(req.params.numberOfItems));

      const menuItems: Response<any, Record<string, any>> = items.map((item: any) => {
        const menuItem: MenuItem = new MenuItemData(item);
        return menuItem;
      });

      await this.client.close();
      return res.send(menuItems);
    } catch (e: unknown) {
      console.log(e);
    } finally {
      await this.client.close();
    }
  }
}
