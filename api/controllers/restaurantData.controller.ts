import Price from '../../helpers/classes/Price';
import { Restaurant, MenuItem } from '../../types/RestaurantData';
import { MongoClient } from 'mongodb';

/**
 * @class RestaurantData
 */
export default class RestaurantData implements Required<Restaurant> {
  name: string;
  deliveryFee: Price;
  hours: string;
  rating: number;
  foodCategories: Array<string>;
  menuItems: Array<MenuItem>;
  location: string;
  url: URL;
  imagePath: string;

  constructor() {
    // query database for these values {
    this.name = '';
    this.deliveryFee = new Price(0);
    this.hours = '';
    this.rating = 0;
    this.foodCategories = [];
    this.menuItems = [];
    this.location = '';
    this.url = new URL('https://google.com');
    this.imagePath = '';
    // }
  }

  /**
   * @function fetchData fetches the field data from the database
   * @abstract
   * @returns void
   */
  async getData(client: MongoClient): Promise<any /* change this later */> {
    try {
      await client.connect();
    } catch (e: unknown) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
}
