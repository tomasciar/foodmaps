import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import FilterDropdown from '../../../types/interfaces/FilterDropdown';
import MenuItem from '../../../types/interfaces/MenuItem';
import Restaurant from '../../../types/interfaces/Restaurant';

/**
 * @component FilterDropdown
 */
const FilterDropdown: React.FC<FilterDropdown> = (props: FilterDropdown) => {
  /**
   * @function filterByRestaurantName
   * @returns {Array<MenuItem>}
   */
  const filterByRestaurantName = (value: string, menuItems: Array<MenuItem>): Array<MenuItem> => {
    const items: Array<MenuItem> = menuItems.filter((item: MenuItem) => {
      return value === item.fromRestaurant.name;
    });
    return items;
  };

  /**
   * @function reset resets the list of menu items to all the items
   */
  const reset = (): void => {
    props.setResults(props.menuItems);
    props.setPageNumber(0);
  };

  /**
   * @function onClick performs an action when the dropdown label is pressed
   * @returns {void}
   */
  const onClick = (restaurantName: string): void => {
    props.setResults(filterByRestaurantName(restaurantName, props.menuItems));
    props.setPageNumber(0);
  };

  const items: MenuProps['items'] = [
    { key: -1, label: <div onClick={reset}>All Restaurants</div> },
    ...props.restaurants
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .filter((item, position, array) => {
        return !position || item.name != array[position - 1].name;
      })
      .map((restaurant: Restaurant, index: number) => {
        return {
          key: index,
          label: <div onClick={() => onClick(restaurant.name)}>{restaurant.name}</div>
        };
      })
  ];

  return (
    <Dropdown disabled={props.disabled} menu={{ items }} placement='bottomLeft'>
      <Button>From Restaurant</Button>
    </Dropdown>
  );
};

export default FilterDropdown;
