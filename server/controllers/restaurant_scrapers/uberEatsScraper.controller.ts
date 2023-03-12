import RestaurantScraper from './restaurantScraper.controller';
import { RequestQueue } from 'apify';
import { CheerioCrawler, log, LogLevel } from 'crawlee';
import { MongoClient } from 'mongodb';
import { Restaurant, MenuItem, ScrapedData } from '../../../types/RestaurantData';
import Price from '../../../helpers/classes/Price';
import { NaPhoneNumber } from '../../../helpers/classes/PhoneNumber';
import RestaurantData from '../restaurantData.controller';
import MenuItemData from '../menuItemData.controller';

/**
 * @type UberDeal
 */
type UberDeal =
  | 'Buy 1 get 1 free'
  | `Free item (spend $${number | string})`
  | `$0 Delivery Fee (spend $${number | string})`
  | `Spend $${number | string}, save $${number | string}`
  | 'Save on selected items';

/**
 * @class UberScraper
 */
export default class UberEatsScraper extends RestaurantScraper {
  readonly source: string;
  readonly startUrls: Array<string>;

  constructor(client: MongoClient, startUrls: Array<string>) {
    const source = 'UberEats';
    super(client, source);
    this.source = source;
    this.startUrls = startUrls;
  }

  /**
   * @function scrape scrapes UberEats and stores the data in a database
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
      minConcurrency: 10,
      maxConcurrency: 50,
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
          const script = $('script[type="application/ld+json"]').eq(1).html();
          const data = JSON.parse(script);

          for (const element of data.itemListElement) {
            if (scraped.has(element.item.url)) continue;
            else scraped.add(element.item.url);

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

          const restaurant: Restaurant = new RestaurantData({
            source: this.source,
            name: restaurantData.name,
            hours: menuData?.openingHoursSpecification,
            averageRating: menuData?.aggregateRating.ratingValue,
            numberOfRatings: menuData?.aggregateRating.reviewCount,
            foodCategories: restaurantData.servesCuisine,
            address: restaurantData.address,
            geolocation: menuData?.geo,
            url: new URL(restaurantData.url),
            imageUrl: new URL(restaurantData.image),
            phoneNumber: new NaPhoneNumber(restaurantData.telephone)
          });

          restaurants.push(restaurant);

          menuData?.hasMenu?.hasMenuSection.forEach((section: any) => {
            const deal: UberDeal | string = section.name;

            section.hasMenuItem.forEach((item: any) => {
              const menuItem: MenuItem = new MenuItemData({
                source: this.source,
                date: new Date(),
                fromRestaurant: new URL(restaurantData.url),
                name: item.name,
                description: item.description,
                price: new Price(item.offers.price),
                deal: deal,
                url: new URL(request.url)
              });

              menuItems.push(menuItem);
            });
          });
        }
      }
    });

    await crawler.run(this.startUrls);

    await this.postRestaurants(restaurants);
    await this.postMenuItems(menuItems);

    return { restaurants, menuItems };
  }
}
