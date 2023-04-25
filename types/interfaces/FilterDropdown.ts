import MenuItem from './MenuItem';
import Restaurant from './Restaurant';

/**
 * @interface FilterDropdownProps
 */
export default interface FilterDropdownProps {
  disabled: boolean;
  results: Array<MenuItem>;
  setResults: (value: Array<MenuItem>) => void;
  restaurants: Array<Restaurant>;
  menuItems: Array<MenuItem>;
  setMenuItems: (value: Array<MenuItem>) => void;
  setPageNumber: (value: number) => void;
}
