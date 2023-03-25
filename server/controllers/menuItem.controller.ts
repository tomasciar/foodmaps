import { Request, Response } from 'express';
import MenuItem from '../../types/interfaces/MenuItem';
import MenuItemData from '../service/menuItemData';
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

  /**
   * @function getMenuItemsByDistance gets Menu Items from DB
   * @returns {Promise<Array<MenuItem>>}
   */
  static async getMenuItemsByDistance(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const numberOfItems = parseInt(req.query.numberOfItems as string);
    const latitude = +(req.query.latitude as string);
    const longitude = +(req.query.longitude as string);

    const items: any = await connection
      .db('scrape')
      .collection('menu_items')
      .aggregate([
        {
          $geoNear: {
            near: { type: 'Point', coordinates: [latitude, longitude] },
            maxDistance: 2400,
            distanceField: 'dist.calculated',
            includeLocs: 'dist.location',
            distanceMultiplier: 1 / 1000,
            spherical: true
          }
        },
        {
          $limit: numberOfItems
        }
      ])
      .toArray();

    const menuItems: Response<any, Record<string, any>> = items.map((item: any) => {
      const menuItem: MenuItem = new MenuItemData(item);
      return menuItem;
    });

    return res.send(menuItems);
  }
}
