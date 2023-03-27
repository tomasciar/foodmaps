import { Dispatch } from 'react';
import Restaurant from './Restaurant';
import MenuItem from './MenuItem';

/**
 * @interface AddressInputProps
 */
export default interface AddressInputProps {
  numberOfRestaurants: number;
  setRestaurants: Dispatch<Array<Restaurant>>;
  numberOfMenuItems: number;
  setMenuItems: Dispatch<Array<MenuItem>>;
}
