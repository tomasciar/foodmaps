import { MongoClient } from 'mongodb';
import MenuItem from '../../../types/interfaces/MenuItem';
import Restaurant from '../../../types/interfaces/Restaurant';
import ScrapedData from '../../../types/interfaces/ScrapedData';

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
   * @returns {Promise<Array<ScrapedData>>}
   */
  abstract scrape(): Promise<ScrapedData>;

  /**
   * @function getStartUrls gets the start URLs from the json file
   * @abstract
   * @returns {Promise<Array<string>>}
   */
  abstract getStartUrls(): Promise<Array<string>>;

  /**
   * @function postRestaurants posts the scraped Restaurants to the database
   * @returns {void}
   */
  async postRestaurants(items: Array<Restaurant>): Promise<void> {
    await this.client.db('scrape').collection('restaurants').insertMany(items);
  }

  /**
   * @function postMenuItems posts the scraped MenuItems to the database
   * @returns {void}
   */
  async postMenuItems(items: Array<MenuItem>): Promise<void> {
    await this.client.db('scrape').collection('menu_items').insertMany(items);
  }

  /**
   * @function deleteRestaurants deletes the scraped restaurants from the database
   * @returns {void}
   */
  async deleteRestaurants(source: string): Promise<void> {
    await this.client.db('scrape').collection('restaurants').deleteMany({ source: source });
  }

  /**
   * @function deleteMenuItems deletes the scraped menu items from the database
   * @returns {void}
   */
  async deleteMenuItems(source: string): Promise<void> {
    await this.client.db('scrape').collection('menu_items').deleteMany({ source: source });
  }

  /**
   * @function delay
   * @param time (in milliseconds)
   */
  async delay(time: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
}
