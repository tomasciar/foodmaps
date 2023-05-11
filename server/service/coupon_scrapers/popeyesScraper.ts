import CouponScraper from './couponScraper';
import { MongoClient } from 'mongodb';
import Coupon from '../../../types/interfaces/Coupon';
import CouponData from '../couponData';
const axiosInstance = require('../../config/axiosInstance');

export default class PopeyesScraper extends CouponScraper {
  readonly source: string;

  constructor(client: MongoClient) {
    const source = 'Popeyes';
    super(client, source);
    this.source = source;
  }

  /**
   * @function scrape scrapes Popeyes and stores the data in a database
   * @returns {Promise<Array<Coupon>>}
   * @docs https://sdk.apify.com/docs/examples/cheerio-crawler
   */
  override async scrape(): Promise<Array<Coupon>> {
    const coupons: Array<Coupon> = [];

    const data = JSON.stringify({
      query: `query evaluateAllUserOffers {
        evaluateAllUserOffers(locale: en, platform: web, redeemedOn: "2023-04-20T12:11:17.116-04:00", serviceMode: null, storeId: null) {
          offersFeedback {
            cartEntry {
              cartId: lineId    __typename
            }
            _id: couponId  tokenId  couponId  offerDetails  offerState  offerVariables {
              key    type    value    __typename
            }
            rank redemptionEligibility {
              isRedeemable isValid evaluationFeedback {
                code condition message redeemableForSeconds redeemableInSeconds ruleSetType sanityId __typename
              }
              validationErrors {
                code message ruleSetType __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }`,
      variables: {}
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://use1-prod-plk.rbictg.com/graphql',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axiosInstance.request(config);
    const responseData = await response.data;

    const urls: Array<string> = await this.getStartUrls();
    const url: string = urls[0];

    for (const entry of responseData.data.evaluateAllUserOffers.offersFeedback) {
      const offerDetails = await JSON.parse(entry.offerDetails);

      const coupon: Coupon = new CouponData({
        source: this.source,
        date: new Date(),
        title: offerDetails.name.en[0].children[0].text,
        description: offerDetails.description.en[0].children[0].text,
        url: url
      });

      coupons.push(coupon);
    }

    if (coupons.length > 0) {
      await this.deleteCoupons(this.source);
      await this.postCoupons(coupons);
    }

    return coupons;
  }

  /**
   * @function getStartUrls gets the start URLs for Popeyes
   * @returns {Array<string>}
   */
  override async getStartUrls(): Promise<Array<string>> {
    return ['https://www.popeyeschicken.ca/'];
  }
}
