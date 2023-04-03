import { Dispatch } from 'react';
import MenuItem from './MenuItem';

/**
 * @interface FoodSearchBarProps
 */
export default interface FoodSearchBarProps {
  results: Array<MenuItem>;
  setResults: Dispatch<Array<MenuItem>>;
  menuItems: Array<MenuItem>;
  setMenuItems: Dispatch<Array<MenuItem>>;
  setPageNumber: Dispatch<number>;
}
