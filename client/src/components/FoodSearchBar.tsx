import { useState } from 'react';
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
    return menuItems.filter((item: MenuItem) => item.name.toLowerCase().includes(text.toLowerCase()));
  };

  /**
   * @function onSearch performs an action when the search button is pressed
   * @returns {string}
   */
  const onSearch = (value: string) => {
    props.setResults(filterFoodItems(value, props.menuItems));
    props.setPageNumber(1);
  };

  return (
    <div style={{ padding: '1rem', paddingTop: 0 }}>
      <Search
        placeholder='Filter food items...'
        onSearch={onSearch}
        enterButton
        size={'large'}
        disabled={props.menuItems.length === 0}
      />
    </div>
  );
};

export default FoodSearchBar;
