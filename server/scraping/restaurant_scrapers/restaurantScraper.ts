import { FindCursor, MongoClient, Sort, WithId } from 'mongodb';
import { MenuItem, Restaurant, ScrapedData } from '../../../types/RestaurantData';
import MenuItemData from '../menuItemData';
import RestaurantData from '../restaurantData';
import { Request, Response } from 'express';

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
}
