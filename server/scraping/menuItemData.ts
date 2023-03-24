import Price from '../../helpers/classes/Price';
import { MenuItem } from '../../types/RestaurantData';
import { MongoClient } from 'mongodb';
import { Geolocation } from '../../types/RestaurantData';

/**
 * @class MenuItemData
 */
export default class MenuItemData implements Required<MenuItem> {
  source: string;
  date: Date;
  fromRestaurant: URL;
  name: string;
  description: string;
  price: Price;
  category: string;
  geolocation: Geolocation;
  url: string;

  constructor(props: MenuItem) {
    Object.assign(this, props);
  }

  /**
   * @function getMenuItemData fetches the field data from the database
   * @returns {Promise<void>}
   */
  async getMenuItemData(client: MongoClient): Promise<void> {
    const data = await client.db('scrape').collection('menu_items').findOne({ url: this.url });
    Object.assign(this, data);
  }
}
