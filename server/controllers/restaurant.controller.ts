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

  /**
   * @function getRestaurantsByDistance gets Restaurants from DB
   * @returns {Promise<Array<Restaurant>>}
   */
  static async getRestaurantsByDistance(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const mongoClient = new Client();
    const connection = await mongoClient.connect();

    const numberOfItems = parseInt(req.query.numberOfItems as string);
    const latitude = +(req.query.latitude as string);
    const longitude = +(req.query.longitude as string);

    const items: any = await connection
      .db('scrape')
      .collection('restaurants')
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

    const restaurants: Response<any, Record<string, any>> = items.map((item: any) => {
      const restaurant: Restaurant = new RestaurantData(item);
      return restaurant;
    });

    return res.send(restaurants);
  }
}
