import { Request, Response } from 'express';
import { Restaurant } from '../../types/RestaurantData';
import RestaurantData from '../scraping/restaurantData';
import Client from '../mongo/Client';

/**
 * @controller RestaurantController
 */
export default class RestaurantController {
  /**
   * @function getRestaurants gets Restaurants from DB
   * @returns {Promise<Response<any, Record<string, any>>>}
   */
  static async getRestaurants(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const startingAtIndex = parseInt(req.query.startingAtIndex as string);
    const numberOfItems = parseInt(req.query.numberOfItems as string);

    const items: any = await connection
      .db('scrape')
      .collection('restaurants')
      .find({ _id: { $exists: true } })
      .skip(startingAtIndex)
      .limit(numberOfItems)
      .toArray();

    const restaurants: Response<any, Record<string, any>> = items.map((item: any) => {
      const restaurant: Restaurant = new RestaurantData(item);
      return restaurant;
    });

    return res.send(restaurants);
  }
}
