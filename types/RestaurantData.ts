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
  readonly name: string;
  readonly deliveryFee: Price;
  readonly deliveryTime: string;
  readonly hours: Array<Date>;
  readonly averageRating: number;
  readonly numberOfRatings: number;
  readonly foodCategories: Array<string>;
  readonly menuItems: Array<MenuItem>;
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
  readonly name: string;
  readonly price: Price;
  readonly deal: string;
  readonly savings: Price;
  readonly url: URL;
  readonly imageUrl: URL;
}
