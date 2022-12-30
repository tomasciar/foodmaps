import * as cheerio from 'cheerio';
import Price from '../../../helpers/classes/Price';

/**
 * @class RestaurantScraper
 * @description abstract class for the scrapers that will scrape each restaurant
 */
export default abstract class RestaurantScraper {
  nameSpecifier: string;
  deliveryFeeSpecifier: string;
  hoursSpecifier: string;
  ratingSpecifier: string;
  foodCategoriesSpecifier: string;
  menuItemsSpecifier: string;
  locationSpecifier: string;
  urlSpecifier: string;
  imagePathSpecifier: string;

  constructor(scrapingSource: string) {
    // fetch this data from a third party so that the entire applications does not
    // need to be recompiled if a company changes their specifier
    this.nameSpecifier = '';
    this.deliveryFeeSpecifier = '';
    this.hoursSpecifier = '';
    this.ratingSpecifier = '';
    this.foodCategoriesSpecifier = '';
    this.menuItemsSpecifier = '';
    this.locationSpecifier = '';
    this.urlSpecifier = '';
    this.imagePathSpecifier = '';
  }

  /**
   * @function scrape scrapes the specified service and stores the data in a database
   * @abstract
   * @returns Promise<Array<object>>
   */
  abstract scrape(): Promise<Array<object>>;
}
