import { Dispatch } from 'react';
import MenuItem from './MenuItem';
import Restaurant from './Restaurant';

/**
 * @interface FilterDropdownProps
 */
export default interface FilterDropdownProps {
  disabled: boolean;
  results: Array<MenuItem>;
  setResults: Dispatch<Array<MenuItem>>;
  restaurants: Array<Restaurant>;
  menuItems: Array<MenuItem>;
  setMenuItems: Dispatch<Array<MenuItem>>;
  setPageNumber: Dispatch<number>;
}
