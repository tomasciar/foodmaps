import { Request, Response } from 'express';
import { MongoClient, Sort } from 'mongodb';
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
    return res.send({ messsage: 'Something' });

    // const mongoClient = new Client();
    // const items: any = Client.connect().db('scrape').collection('restaurants').find();
    // .skip(parseInt(req.params.startingAtIndex))
    // .limit(parseInt(req.params.numberOfRestaurants));

    // const restaurants: Response<any, Record<string, any>> = items.map((item: any) => {
    //   const restaurant: Restaurant = new RestaurantData(item);
    //   return restaurant;
    // });

    // return res.send(restaurants);
  }
}
