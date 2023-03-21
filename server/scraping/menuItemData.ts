import Price from '../../helpers/classes/Price';
import { MenuItem } from '../../types/RestaurantData';
import { MongoClient } from 'mongodb';

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
  url: URL;

  constructor(props: MenuItem) {
    Object.assign(this, props);
  }

  /**
   * @function getMenuItemData fetches the field data from the database
   * @returns {Promise<0 | 1>}
   */
  async getMenuItemData(client: MongoClient): Promise<0 | 1> {
    const data = await client.db('scrape').collection('menu_items').findOne({ url: this.url });
    if (!data) return 1;
    Object.assign(this, data);
    return 0;
  }
}
