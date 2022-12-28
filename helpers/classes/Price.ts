/**
 * @class Price
 * @property rawValue: string | number
 * @property dollarValue: number
 * @property formattedValue: string
 */
export default class Price {
  rawValue: string | number;
  dollarValue: number;
  formattedValue: string;

  constructor(value: string | number) {
    this.rawValue = value;
    this.dollarValue = parseFloat(`${value}`.replace(/[^\d.]/g, ''));
    this.formattedValue = '$' + parseFloat(`${value}`.replace(/[^\d.]/g, '')).toFixed(2);
  }
}
