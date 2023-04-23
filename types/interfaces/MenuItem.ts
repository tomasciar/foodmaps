import Price from '../classes/Price';
import FromRestaurant from './FromRestaurant';
import Geolocation from './Geolocation';

/**
 * @interface MenuItem
 */
export default interface MenuItem {
  readonly source: string;
  readonly date: Date;
  readonly fromRestaurant: FromRestaurant;
  readonly name: string;
  readonly description: string;
  readonly price: Price;
  readonly category: string;
  readonly geolocation: Geolocation;
  readonly url: string;
}
