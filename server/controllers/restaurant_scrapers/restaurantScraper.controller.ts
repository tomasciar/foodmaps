import { MongoClient } from 'mongodb';
import { MenuItem, Restaurant } from '../../../types/RestaurantData';

/**
 * @class RestaurantScraper
 * @description abstract class for the scrapers that will scrape each restaurant
 */
export default abstract class RestaurantScraper {
  client: MongoClient;
  scrapingSource: string;

  constructor(client: MongoClient, scrapingSource: string) {
    this.client = client;
    this.scrapingSource = scrapingSource;
  }

  /**
   * @function scrape scrapes the specified service and stores the data in a database
   * @abstract
   * @returns {Promise<Array<object>>}
   */
  abstract scrape(): Promise<Object>;

  /**
   * @function getStartUrls gets the start URLs from the json file
   * @abstract
   * @returns {Promise<Array<string>>}
   */
  abstract getStartUrls(): Promise<Array<string>>;

  /**
   * @function postRestaurants posts the scraped Restaurants to the database
   * @returns {0 | 1} 1 if error, 0 otherwise
   */
  async postRestaurants(items: Array<Restaurant>): Promise<0 | 1> {
    if (process.env.POST_TO_DB === 'FALSE') return 1;
    await this.client.db('scrape').collection('restaurants').insertMany(items);
    return 0;
  }

  /**
   * @function postMenuItems posts the scraped MenuItems to the database
   * @returns {0 | 1} 1 if error, 0 otherwise
   */
  async postMenuItems(items: Array<MenuItem>): Promise<0 | 1> {
    if (process.env.POST_TO_DB === 'FALSE') return 1;
    await this.client.db('scrape').collection('menu_items').insertMany(items);
    return 0;
  }
}
