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
    this.dollarValue = removeNonDigits(value);
    this.formattedValue = formatPrice(value);
  }
}

/**
 * @function removeNonDigits removes all characters except for digits
 * @param value: string | number
 * @returns number
 */
function removeNonDigits(value: string | number): number {
  return parseFloat(`${value}`.replace(/[^\d.]/g, ''));
}

/**
 * @function removeNonDigits removes all characters except for digits
 * @param value: string | number
 * @returns number
 */
function formatPrice(value: string | number): string {
  return '$' + parseFloat(`${value}`.replace(/[^\d.]/g, '')).toFixed(2);
}
