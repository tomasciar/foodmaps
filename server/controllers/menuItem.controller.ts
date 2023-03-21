import { Request, Response } from 'express';
import { MenuItem } from '../../types/RestaurantData';
import MenuItemData from '../scraping/menuItemData';
import Client from '../mongo/Client';

/**
 * @controller MenuItemController
 */
export default class MenuItemController {
  /**
   * @function getMenuItems gets Menu Items from DB
   * @returns {Promise<Array<MenuItem>>}
   */
  static async getMenuItems(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const startingAtIndex = parseInt(req.query.startingAtIndex as string);
    const numberOfItems = parseInt(req.query.numberOfItems as string);

    const items: any = await connection
      .db('scrape')
      .collection('menu_items')
      .find({ _id: { $exists: true } })
      .skip(startingAtIndex)
      .limit(numberOfItems)
      .toArray();

    const menuItems: Response<any, Record<string, any>> = items.map((item: any) => {
      const menuItem: MenuItem = new MenuItemData(item);
      return menuItem;
    });

    return res.send(menuItems);
  }
}
