import { Dispatch } from 'react';
import MenuItem from './MenuItem';

/**
 * @interface BogoCheckboxProps
 */
export default interface BogoCheckboxProps {
  disabled: boolean;
  setResults: Dispatch<Array<MenuItem>>;
  menuItems: Array<MenuItem>;
  setPageNumber: Dispatch<number>;
}
