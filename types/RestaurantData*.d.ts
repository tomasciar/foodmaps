import Price from '../utils/Formatting';

/**
 * @type Restaurant
 */
export interface Restaurant {
  name: string;
  deliveryFee?: Price;
  foodCategories: Array<string>;
  // Change location from string to Geolocation later
  location: string;
  url: URL;
  imagePath?: string;
}

/**
 * @type MenuItem
 */
export interface MenuItem {
  from: Restaurant;
  name: string;
  price: Price;
  savings: Price;
  url: URL;
  imagePath: string;
}
