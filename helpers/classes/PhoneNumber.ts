/**
 * @class PhoneNumber
 * @abstract
 * @property rawValue: string | number
 * @property numberValue: number
 * @property formattedValue: string
 */
export abstract class PhoneNumber {
  rawValue: string | number;
  numberValue: number;
  formattedValue: string;

  constructor(value: string | number) {
    this.rawValue = value;
  }
}

/**
 * @function removeNonDigitsAndAddPrefix removes all characters except for digits
 * and adds a 1 at the start if there is only 10 digits in the value
 * @param value: string | number
 * @param prefix: string | number
 * @invariant only makes sense if the input is 10 or 11 digits long and the prefix is 1 digit long
 * @returns number
 */
const removeNonDigitsAndAddPrefix = (value: string | number, prefix: string | number): number => {
  let alt = `${value}`.replace(/\D/g, '');
  if (alt.length === 10) alt = prefix + alt;

  return parseFloat(alt);
};

const formatPhoneNumber = (value: string | number, prefix: string | number): string => {
  let alt = `${value}`.replace(/\D/g, '');
  if (alt.length === 10) alt = prefix + alt;

  return `+${alt[0]} (${alt.slice(1, 4)}) ${alt.slice(4, 7)}-${alt.slice(7, 11)}`;
};

/**
 * @class NaPhoneNumber
 * @description North American phone number
 */
export class NaPhoneNumber extends PhoneNumber {
  constructor(value: string | number) {
    super(value);
    this.numberValue = removeNonDigitsAndAddPrefix(value, 1);
    this.formattedValue = formatPhoneNumber(value, 1);
  }
}
