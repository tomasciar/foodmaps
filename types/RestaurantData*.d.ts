import Price from '../helpers/classes/Price';

/**
 * @interface Restaurant
 */
export interface Restaurant {
  name: string;
  deliveryFee: Price;
  foodCategories: Array<string>;
  // Change location from string to Geolocation later
  location: string;
  url: URL;
  imagePath: string;
}

/**
 * @interface MenuItem
 */
export interface MenuItem {
  from: Restaurant;
  name: string;
  price: Price;
  savings: Price;
  url: URL;
  imagePath: string;
}
