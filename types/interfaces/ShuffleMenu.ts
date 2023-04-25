import MenuItem from './MenuItem';

/**
 * @interface ShuffleMenuProps
 */
export default interface ShuffleMenuProps {
  disabled: boolean;
  setResults: (value: Array<MenuItem>) => void;
  menuItems: Array<MenuItem>;
  setPageNumber: (value: number) => void;
}
