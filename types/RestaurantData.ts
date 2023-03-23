import Price from '../helpers/classes/Price';
import { PhoneNumber } from '../helpers/classes/PhoneNumber';

/**
 * @interface Geolocation
 */
export interface Geolocation {
  readonly latitude: number;
  readonly longitude: number;
}

/**
 * @interface Restaurant
 */
export interface Restaurant {
  readonly source: string;
  readonly name: string;
  readonly hours: Array<Object>;
  readonly averageRating: number;
  readonly numberOfRatings: number;
  readonly foodCategories: Array<string>;
  readonly address: object;
  readonly geolocation: Geolocation;
  readonly url: URL;
  readonly imageUrl: URL;
  readonly phoneNumber: PhoneNumber;
}

/**
 * @interface MenuItem
 */
export interface MenuItem {
  readonly source: string;
  readonly date: Date;
  readonly fromRestaurant: URL;
  readonly name: string;
  readonly description: string;
  readonly price: Price;
  readonly category: string;
  readonly geolocation: Geolocation;
  readonly url: string;
}

/**
 * @interface ScrapedData
 */
export interface ScrapedData {
  readonly restaurants: Array<Restaurant>;
  readonly menuItems: Array<MenuItem>;
}
