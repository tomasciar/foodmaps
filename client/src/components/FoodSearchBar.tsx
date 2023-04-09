import FoodSearchBarProps from '../../../types/interfaces/FoodSearchBar';
import { Input } from 'antd';
import MenuItem from '../../../types/interfaces/MenuItem';

/**
 * @component FoodSearchBar
 * @returns {React.FC<FoodSearchBarProps>}
 */
const FoodSearchBar: React.FC<FoodSearchBarProps> = (props: FoodSearchBarProps) => {
  const { Search } = Input;

  /**
   * @function filterFoodItems filters menu items from a list of menu items
   * @returns {Array<MenuItem>}
   */
  const filterFoodItems = (text: string, menuItems: Array<MenuItem>): Array<MenuItem> => {
    const inputTextLower: string = text.toLowerCase();
    const items: Array<MenuItem> = menuItems.filter((item: MenuItem) => {
      return item.name.toLowerCase().includes(inputTextLower);
    });
    return items;
  };

  /**
   * @function onSearch performs an action when the search button is pressed
   * @returns {string}
   */
  const onSearch = (value: string) => {
    props.setResults(filterFoodItems(value, props.menuItems));
    props.setPageNumber(0);
  };

  return (
    <div style={{ padding: '0 4rem' }}>
      <Search
        placeholder='Filter food items...'
        onSearch={onSearch}
        size={'large'}
        disabled={props.menuItems.length === 0}
      />
    </div>
  );
};

export default FoodSearchBar;
