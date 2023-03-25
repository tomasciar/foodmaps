import Restaurant from './Restaurant';
import MenuItem from './MenuItem';

/**
 * @interface ScrapedData
 */
export default interface ScrapedData {
  readonly restaurants: Array<Restaurant>;
  readonly menuItems: Array<MenuItem>;
}
