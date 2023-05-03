import RestaurantScraper from './restaurantScraper';
import { MongoClient } from 'mongodb';
import MenuItem from '../../../types/interfaces/MenuItem';
import Restaurant from '../../../types/interfaces/Restaurant';
import ScrapedData from '../../../types/interfaces/ScrapedData';
import Price from '../../../types/classes/Price';
import { NaPhoneNumber } from '../../../types/classes/PhoneNumber';
import RestaurantData from '../restaurantData';
import MenuItemData from '../menuItemData';
import axios from 'axios';

/**
 * @class SkipTheDishesScraper
 */
export default class SkipTheDishesScraper extends RestaurantScraper {
  readonly source: string;

  constructor(client: MongoClient) {
    const source = 'SkipTheDishes';
    super(client, source);
    this.source = source;
  }

  /**
   * @function scrape scrapes SkipTheDishes and stores the data in a database
   * @returns {Promise<ScrapedData>}
   * @docs https://sdk.apify.com/docs/examples/cheerio-crawler
   */
  override async scrape(): Promise<ScrapedData> {
    const restaurants: Array<Restaurant> = [];
    const menuItems: Array<MenuItem> = [];

    const data = JSON.stringify({
      query: `query QueryRestaurantsCuisinesList {
          restaurantsList(restaurantsParams: {
              city: "waterloo",
              dateTime: 0,
              isDelivery: true,
              latitude: 43.4734487
              longitude: -80.5358191
              province: "ON",
              search: ""
          }) {
              closedRestaurants {
                  cleanUrl
                  id
                  cuisines
                  location {
                      name
                      position {
                          latitude
                          longitude
                      }
                  }
                  name
                  skipScore
                  imageUrls {
                    menuSmallUrl
                  }
              }
              openRestaurants {
                  cleanUrl
                  id
                  cuisines
                  location {
                      name
                      position {
                          latitude
                          longitude
                      }
                  }
                  name
                  skipScore
                  imageUrls {
                    menuSmallUrl
                  }
              }
          }
      }`,
      variables: {}
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.skipthedishes.com/customer/v1/graphql',
      headers: {
        'app-token': 'd7033722-4d2e-4263-9d67-d83854deb0fc',
        'Content-Type': 'application/json',
        Cookie:
          '__cf_bm=_3CttZUoAOdxUnYgMEMZKOsxza4cBoFjqUI7FMiUh1A-1682205181-0-AUssFa40t7Kppb5JXe8TJE3pCzhNuwpSSD8F2E+zO+2xZDwVYXp0v/YKv9SVpQbv/bdbpluzgEpIO4QhDM4QLqs='
      },
      data: data
    };

    const response = await axios.request(config);
    const responseData = await response.data;

    const pushRestaurantsAndMenuItems = async (list: Array<any>) => {
      for (const item of list) {
        const config2 = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://api-skipthedishes.skipthedishes.com/v1/restaurants/clean-url/${item.cleanUrl}`,
          headers: {
            'app-token': 'd7033722-4d2e-4263-9d67-d83854deb0fc',
            Cookie:
              '__cf_bm=2J22JiGkMMXhmVfyF4weKLkyU6P.WRrGfjA.8qFaXkQ-1682211465-0-Accu/2BoporOMgd/qk7tvmTNWrME9YKQFDXm5NyCDR/2nB9LukjV8RRJ//m9LARHjpSQ5S9eI0SrAz4a176ASvI='
          }
        };

        const response2 = await axios.request(config2);
        const responseData2 = await response2.data;

        const restaurant: Restaurant = new RestaurantData({
          source: this.source,
          date: new Date(),
          name: item.name,
          hours: responseData2.deliveryHours,
          averageRating: item.skipScore,
          numberOfRatings: 10,
          foodCategories: item.cuisines,
          address: responseData2.location,
          geolocation: {
            latitude: item.location.position.latitude,
            longitude: item.location.position.longitude
          },
          url: `https://www.skipthedishes.com/${item.cleanUrl}`,
          imageUrl: item.imageUrls.menuSmallUrl,
          phoneNumber: new NaPhoneNumber(responseData2.contactInfo.phoneNumber)
        });

        restaurants.push(restaurant);

        for (const group of responseData2.menu.menuGroups) {
          for (const subitem of group.menuItems) {
            const menuItem: MenuItem = new MenuItemData({
              source: this.source,
              date: new Date(),
              fromRestaurant: {
                name: restaurant.name,
                url: restaurant.url
              },
              name: subitem.name,
              description: subitem.description,
              price: new Price(subitem.centsPrice / 100),
              category: group.name,
              geolocation: {
                latitude: restaurant.geolocation.latitude,
                longitude: restaurant.geolocation.longitude
              },
              url: restaurant.url
            });

            menuItems.push(menuItem);
          }
        }
      }
    };

    await pushRestaurantsAndMenuItems(responseData.data.restaurantsList.closedRestaurants);
    await pushRestaurantsAndMenuItems(responseData.data.restaurantsList.openRestaurants);

    if (restaurants.length > 0) {
      await this.deleteRestaurants(this.source);
      await this.postRestaurants(restaurants);
    }

    if (menuItems.length > 0) {
      await this.deleteMenuItems(this.source);
      await this.postMenuItems(menuItems);
    }

    console.log('Data uploaded...');

    return { restaurants, menuItems };
  }

  /**
   * @function getStartUrls gets the start URLs for SkipTheDishes
   * @returns {Array<string>}
   */
  override async getStartUrls(): Promise<Array<string>> {
    return ['https://www.skipthedishes.com/waterloo/restaurants'];
  }
}
