import Restaurant from './Restaurant';
import MenuItem from './MenuItem';

/**
 * @interface AddressInputProps
 */
export default interface AddressInputProps {
  numberOfRestaurants: number;
  setRestaurants: (value: Array<Restaurant>) => void;
  numberOfMenuItems: number;
  setMenuItems: (value: Array<MenuItem>) => void;
}
