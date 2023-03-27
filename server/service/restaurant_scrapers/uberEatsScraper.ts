import RestaurantScraper from './restaurantScraper';
import { RequestQueue } from 'apify';
import { CheerioCrawler, log, LogLevel } from 'crawlee';
import { MongoClient } from 'mongodb';
import MenuItem from '../../../types/interfaces/MenuItem';
import Restaurant from '../../../types/interfaces/Restaurant';
import ScrapedData from '../../../types/interfaces/ScrapedData';
import Price from '../../../types/classes/Price';
import { NaPhoneNumber } from '../../../types/classes/PhoneNumber';
import RestaurantData from '../restaurantData';
import MenuItemData from '../menuItemData';

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

  constructor(client: MongoClient) {
    const source = 'UberEats';
    super(client, source);
    this.source = source;
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
          const script = $('script[type="application/ld+json"]').eq(1).html();
          const data = JSON.parse(script);

          for (const element of data.itemListElement) {
            if (scraped.has(element.item.url)) continue;
            else scraped.add(element.item.url);

            setTimeout(() => {
              console.log(`Waiting for ${element.item.url}...`);
            }, 100);

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

          setTimeout(() => {
            console.log(`Waiting for ${restaurantData.name}'s data to populate...`);
          }, 100);

          // Fix to make Mongo storage work
          if (!menuData?.geo.latitude || !menuData?.geo.longitude) {
            menuData.geo.latitude = 0;
            menuData.geo.longitude = 0;
          }

          const restaurant: Restaurant = new RestaurantData({
            source: this.source,
            date: new Date(),
            name: restaurantData.name,
            hours: menuData?.openingHoursSpecification,
            averageRating: menuData?.aggregateRating.ratingValue,
            numberOfRatings: menuData?.aggregateRating.reviewCount,
            foodCategories: restaurantData.servesCuisine,
            address: restaurantData.address,
            geolocation: {
              latitude: menuData?.geo.latitude,
              longitude: menuData?.geo.longitude
            },
            url: restaurantData.url,
            imageUrl: restaurantData.image,
            phoneNumber: new NaPhoneNumber(restaurantData.telephone)
          });

          restaurants.push(restaurant);

          menuData?.hasMenu?.hasMenuSection.forEach((section: any) => {
            const category: UberDeal | string = section.name;

            section.hasMenuItem.forEach((item: any) => {
              const menuItem: MenuItem = new MenuItemData({
                source: this.source,
                date: new Date(),
                fromRestaurant: restaurantData.url,
                name: item.name,
                description: item.description,
                price: new Price(item.offers.price),
                category: category,
                geolocation: {
                  latitude: menuData?.geo.latitude,
                  longitude: menuData?.geo.longitude
                },
                url: request.url
              });

              menuItems.push(menuItem);
            });
          });
        }
      }
    });

    const startUrls: Array<string> = await this.getStartUrls();
    await crawler.run(startUrls);

    if (restaurants.length > 0) await this.postRestaurants(restaurants);
    if (menuItems.length > 0) await this.postMenuItems(menuItems);

    return { restaurants, menuItems };
  }

  /**
   * @function getStartUrls gets the start URLs for Uber from the json file
   * @returns {Array<string>}
   */
  override async getStartUrls(): Promise<Array<string>> {
    const urls: any = [];

    const module = await import('../../../public/json/waterlooUberStartUrls.json');
    module.default.html.body.div.a.forEach(tag => {
      urls.push(`https://www.ubereats.com${tag['@href']}`);
    });

    return urls;
  }
}
