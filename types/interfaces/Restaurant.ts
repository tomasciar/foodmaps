import Geolocation from './Geolocation';
import { PhoneNumber } from '../classes/PhoneNumber';

/**
 * @interface Restaurant
 */
export default interface Restaurant {
  readonly source: string;
  readonly date: Date;
  readonly name: string;
  readonly hours: Array<Object>;
  readonly averageRating: number;
  readonly numberOfRatings: number;
  readonly foodCategories: Array<string>;
  readonly address: object;
  readonly geolocation: Geolocation;
  readonly url: string;
  readonly imageUrl: string;
  readonly phoneNumber: PhoneNumber;
}
