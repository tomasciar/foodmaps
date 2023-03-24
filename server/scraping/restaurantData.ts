import Price from '../../helpers/classes/Price';
import { Restaurant, Geolocation } from '../../types/RestaurantData';
import { MongoClient, WithId } from 'mongodb';
import { PhoneNumber, NaPhoneNumber } from '../../helpers/classes/PhoneNumber';

/**
 * @class RestaurantData
 */
export default class RestaurantData implements Required<Restaurant> {
  source: string;
  date: Date;
  name: string;
  hours: Array<Date>;
  averageRating: number;
  numberOfRatings: number;
  foodCategories: Array<string>;
  address: object;
  geolocation: Geolocation;
  url: URL;
  imageUrl: URL;
  phoneNumber: PhoneNumber;

  constructor(props: Restaurant) {
    Object.assign(this, props);
  }

  /**
   * @function getRestaurantData fetches the field data from the database
   * @returns {Promise<void>}
   */
  async getRestaurantData(client: MongoClient): Promise<void> {
    const data = await client.db('scrape').collection('restaurants').findOne({ url: this.url });
    Object.assign(this, data);
  }
}
