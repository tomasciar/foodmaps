import Price from '../../helpers/classes/Price';
import { Restaurant, MenuItem } from '../../types/RestaurantData';

/**
 * @class RestaurantData
 * @abstract
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
  getData(): void {
    return;
  }
}
