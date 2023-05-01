import RestaurantScraper from './restaurantScraper';
import { RequestQueue } from 'apify';
import { CheerioCrawler, log, LogLevel } from 'crawlee';
import { Element } from 'cheerio';
import { MongoClient } from 'mongodb';
import MenuItem from '../../../types/interfaces/MenuItem';
import Restaurant from '../../../types/interfaces/Restaurant';
import ScrapedData from '../../../types/interfaces/ScrapedData';
import Price from '../../../types/classes/Price';
import RestaurantData from '../restaurantData';
import MenuItemData from '../menuItemData';

/**
 * @class DoorDashScraper
 */
export default class DoorDashScraper extends RestaurantScraper {
  readonly source: string;

  constructor(client: MongoClient) {
    const source = 'DoorDash';
    super(client, source);
    this.source = source;
  }

  /**
   * @function scrape scrapes DoorDash and stores the data in a database
   * @returns {Promise<ScrapedData>}
   * @docs https://sdk.apify.com/docs/examples/cheerio-crawler
   */
  override async scrape(): Promise<ScrapedData> {
    const restaurants: Array<Restaurant> = [];
    const menuItems: Array<MenuItem> = [];
    const scraped = new Set();

    log.setLevel(LogLevel.DEBUG);
    const requestQueue = await RequestQueue.open();

    const crawler = new CheerioCrawler({
      minConcurrency: 1,
      maxConcurrency: 1,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: 30,
      requestQueue,

      /**
       * @function requestHandler called for each URL to crawl
       * @param Object that has the following properties:
       * - request: an instance of the Request class
       * - $: the cheerio object containing parsed HTML
       */
      requestHandler: async ({ request, $ }) => {
        log.debug(`Processing ${request.url}...`);

        if (request.userData.label === undefined) {
          const script = $('script[type="application/ld+json"]').first().html();
          const data = JSON.parse(script);

          for (const element of data.itemListElement) {
            if (scraped.has(element.item.url)) continue;
            else scraped.add(element.item.url);

            await this.delay(100);

            requestQueue.addRequest({
              url: element.item.url,
              userData: {
                label: 'RESTAURANT',
                restaurantData: element.item
              }
            });
          }
        }

        if (request.userData.label === 'RESTAURANT') {
          const script = $('script[type="application/ld+json"]').first().html();
          const menuData = await JSON.parse(script);
          const restaurantData = request.userData.restaurantData;

          await this.delay(100);

          if (!menuData?.geo.latitude || !menuData?.geo.longitude) {
            menuData.geo.latitude = 0;
            menuData.geo.longitude = 0;
          }

          const restaurant: Restaurant = new RestaurantData({
            source: this.source,
            date: new Date(),
            name: restaurantData.name,
            hours: ['No time data available'],
            averageRating: menuData?.aggregateRating?.ratingValue,
            numberOfRatings: menuData?.aggregateRating?.reviewCount,
            foodCategories: restaurantData.servesCuisine,
            address: restaurantData.address,
            geolocation: {
              latitude: +`${menuData?.geo.latitude}`,
              longitude: +`${menuData?.geo.longitude}`
            },
            url: restaurantData.url,
            imageUrl: restaurantData.image,
            phoneNumber: Object.create(null)
          });

          restaurants.push(restaurant);

          const menuItemData = $('div[data-anchor-id="MenuItem"]').toArray();

          menuItemData.forEach((item: Element) => {
            const menuItem: MenuItem = new MenuItemData({
              source: this.source,
              date: new Date(),
              fromRestaurant: {
                name: restaurant.name,
                url: restaurant.url
              },
              name: $(item).find('h3').text(),
              description: $(item).find('span[data-telemetry-id="storeMenuItem.subtitle"]').text(),
              price: new Price($(item).find('span[data-anchor-id="StoreMenuItemPrice"]').text()),
              category: restaurantData.servesCuisine.join(' '),
              geolocation: {
                latitude: +`${menuData?.geo.latitude}`,
                longitude: +`${menuData?.geo.longitude}`
              },
              url: request.url
            });

            menuItems.push(menuItem);
          });
        }
      }
    });

    const startUrls: Array<string> = await this.getStartUrls();
    await crawler.run(startUrls);

    if (restaurants.length > 0) {
      await this.postRestaurants(restaurants);
      await this.deleteRestaurants(this.source);
    }

    if (menuItems.length > 0) {
      await this.postMenuItems(menuItems);
      await this.deleteMenuItems(this.source);
    }

    return { restaurants, menuItems };
  }

  /**
   * @function getStartUrls gets the start URLs for DoorDash
   * @returns {Array<string>}
   */
  override async getStartUrls(): Promise<Array<string>> {
    const urls: Array<string> = [];

    for (let i: number = 1; i <= 15; i++) {
      urls.push(`https://www.doordash.com/en-CA/food-delivery/waterloo-on-restaurants/${i}`);
    }

    return urls;
  }
}
