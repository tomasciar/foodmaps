import MenuItem from './MenuItem';

/**
 * @interface BogoCheckboxProps
 */
export default interface BogoCheckboxProps {
  disabled: boolean;
  setResults: (value: Array<MenuItem>) => void;
  menuItems: Array<MenuItem>;
  setPageNumber: (value: number) => void;
}
