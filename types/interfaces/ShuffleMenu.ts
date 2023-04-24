import { Dispatch } from 'react';
import MenuItem from './MenuItem';

/**
 * @interface ShuffleMenuProps
 */
export default interface ShuffleMenuProps {
  disabled: boolean;
  setResults: Dispatch<Array<MenuItem>>;
  menuItems: Array<MenuItem>;
  setPageNumber: Dispatch<number>;
}
