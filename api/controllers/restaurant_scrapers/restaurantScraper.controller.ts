import { MongoClient } from 'mongodb';
import { Restaurant } from '../../../types/RestaurantData';

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
   * @returns Promise<Array<object>>
   */
  abstract scrape(): Promise<Array<Restaurant>>;
}

/**
 * @function getSpecifiers gets the scraping specifiers from the database (client)
 * @param client
 * @param scrapingSource
 * @returns Promise<Object>
 */
const getSpecifiers = async (client: MongoClient, scrapingSource: string): Promise<object> => {
  return await client.db('scrape').collection('specifiers').findOne({ source: scrapingSource });
};
