/**
 * @interface Coupon
 */
export default interface Coupon {
  readonly source: string;
  readonly date: Date;
  readonly title: string;
  readonly description: string;
  readonly url: string;
}
