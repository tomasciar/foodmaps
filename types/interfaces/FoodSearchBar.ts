import MenuItem from './MenuItem';

/**
 * @interface FoodSearchBarProps
 */
export default interface FoodSearchBarProps {
  results: Array<MenuItem>;
  setResults: (value: Array<MenuItem>) => void;
  menuItems: Array<MenuItem>;
  setMenuItems: (value: Array<MenuItem>) => void;
  setPageNumber: (value: number) => void;
}
