import AddressInput from '../../src/components/AddressInput';
import { useEffect, useState } from 'react';
import Restaurant from '../../../types/interfaces/Restaurant';
import MenuItem from '../../../types/interfaces/MenuItem';
import MenuItemCard from '../../src/components/MenuItemCard';
import FoodSearchBar from '../../src/components/FoodSearchBar';
import { Pagination } from 'antd';

/**
 * @route Menu
 * @returns {JSX.Element}
 */
export default function Menu(): JSX.Element {
  const NUMBER_OF_ITEMS_PER_PAGE: number = 50;

  const [restaurants, setRestaurants] = useState<Array<Restaurant>>(new Array());
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>(new Array());
  const [filteredMenuItems, setFilteredMenuItems] = useState<Array<MenuItem>>(menuItems);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => setFilteredMenuItems(menuItems), [menuItems]);

  return (
    <>
      <AddressInput
        setRestaurants={setRestaurants}
        numberOfRestaurants={1}
        setMenuItems={setMenuItems}
        numberOfMenuItems={250000}
      />
      <FoodSearchBar
        results={filteredMenuItems}
        setResults={setFilteredMenuItems}
        menuItems={menuItems}
        setMenuItems={setMenuItems}
        setPageNumber={setPageNumber}
      />
      <div style={{ padding: '1rem' }}>
        <Pagination
          defaultCurrent={1}
          onChange={value => setPageNumber(value - 1)}
          pageSize={50}
          total={filteredMenuItems.length}
          hideOnSinglePage={true}
          showSizeChanger={false}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'start'
          }}>
          {filteredMenuItems
            .map((item: MenuItem, index: number) => {
              return (
                <div onClick={() => console.log('temporary')}>
                  <MenuItemCard
                    key={index}
                    source={item.source}
                    date={item.date}
                    fromRestaurant={item.fromRestaurant}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    category={item.category}
                    geolocation={item.geolocation}
                    url={item.url}
                  />
                </div>
              );
            })
            .slice(pageNumber * NUMBER_OF_ITEMS_PER_PAGE, (pageNumber + 1) * NUMBER_OF_ITEMS_PER_PAGE)}
        </div>
      </div>
    </>
  );
}
