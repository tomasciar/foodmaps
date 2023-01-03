import Price from '../../helpers/classes/Price';
import { Restaurant, MenuItem, Geolocation } from '../../types/RestaurantData';
import { MongoClient } from 'mongodb';
import { PhoneNumber, NaPhoneNumber } from '../../helpers/classes/PhoneNumber';

/**
 * @class RestaurantData
 */
export default class RestaurantData implements Required<Restaurant> {
  name: string;
  deliveryFee: Price;
  deliveryTime: string;
  hours: Array<Date>;
  averageRating: number;
  numberOfRatings: number;
  foodCategories: Array<string>;
  menuItems: Array<MenuItem>;
  address: object;
  geolocation: Geolocation;
  url: URL;
  imageUrl: URL;
  phoneNumber: PhoneNumber;

  constructor() {
    // use url as unique identifier so the constructor only has to consume a url
    // query database for these values {
    this.name = '';
    this.deliveryFee = new Price(0);
    this.deliveryTime = '';
    this.hours = [];
    this.averageRating = 0;
    this.numberOfRatings = 0;
    this.foodCategories = [];
    this.menuItems = [];
    this.address = {};
    this.geolocation = { latitude: 0, longitude: 0 };
    this.url = new URL('https://google.com');
    this.imageUrl = new URL('https://google.com');
    this.phoneNumber = new NaPhoneNumber('4395821111');
    // }
  }

  /**
   * @function getRestaurantData fetches the field data from the database
   * @abstract
   * @returns void
   */
  async getRestaurantData(client: MongoClient): Promise<RestaurantData> {
    // use the url of the class to query the database
    return;
  }
}
