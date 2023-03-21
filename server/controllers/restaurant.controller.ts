import { Request, Response } from 'express';
import { MongoClient, Sort } from 'mongodb';
import { Restaurant } from '../../types/RestaurantData';
import RestaurantData from '../scraping/restaurantData';

const uri: string = process.env.MONGO_URI;

/**
 * @controller RestaurantController
 */
export default class RestaurantController {
  static client: MongoClient = new MongoClient(uri);

  /**
   * @function getRestaurants gets Restaurants from DB
   * @returns {Promise<Response<any, Record<string, any>>>}
   */
  static async getRestaurants(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    await this.client.connect();

    const items: any = this.client
      .db('scrape')
      .collection('restaurants')
      .find()
      .sort(req.params.sortBy)
      .skip(parseInt(req.params.startingAtIndex))
      .limit(parseInt(req.params.numberOfRestaurants));

    const restaurants: Response<any, Record<string, any>> = items.map((item: any) => {
      const restaurant: Restaurant = new RestaurantData(item);
      return restaurant;
    });

    await this.client.close();
    return res.send(restaurants);
  }
}
