import AddressInput from '../../src/components/AddressInput';
import { useEffect, useState } from 'react';
import Restaurant from '../../../types/interfaces/Restaurant';
import MenuItem from '../../../types/interfaces/MenuItem';
import MenuItemCard from '../../src/components/MenuItemCard';
import FoodSearchBar from '../../src/components/FoodSearchBar';
import { Pagination } from 'antd';
import Head from 'next/head';
import React from 'react';
import FilterDropdown from '../../src/components/FilterDropdown';

/**
 * @route Menu
 * @returns {JSX.Element}
 */
export default function Menu(): JSX.Element {
  const NUMBER_OF_ITEMS_PER_PAGE = 50;

  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState<Array<MenuItem>>(menuItems);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => setFilteredMenuItems(menuItems), [menuItems]);

  return (
    <>
      <Head>
        <title>Foodmaps | Search</title>
        <meta
          name='description'
          content='Food deal aggregation website that finds all of the major food deals in a searched area'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <AddressInput
          setRestaurants={setRestaurants}
          numberOfRestaurants={500}
          setMenuItems={setMenuItems}
          numberOfMenuItems={2000}
        />
        <FoodSearchBar
          results={filteredMenuItems}
          setResults={setFilteredMenuItems}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          setPageNumber={setPageNumber}
        />
        <div style={{ padding: '1.5rem 4rem', display: 'flex', flexDirection: 'row' }}>
          <Pagination
            style={{ marginRight: '1rem' }}
            defaultCurrent={1}
            onChange={value => setPageNumber(value - 1)}
            pageSize={50}
            total={filteredMenuItems.length}
            hideOnSinglePage={true}
            showSizeChanger={false}
          />
          <FilterDropdown
            disabled={menuItems.length === 0}
            restaurants={restaurants}
            results={filteredMenuItems}
            setResults={setFilteredMenuItems}
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            setPageNumber={setPageNumber}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'start',
            margin: '0 6rem 1rem 6rem'
          }}>
          {filteredMenuItems
            .map((item: MenuItem, index: number) => {
              return (
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
              );
            })
            .slice(pageNumber * NUMBER_OF_ITEMS_PER_PAGE, (pageNumber + 1) * NUMBER_OF_ITEMS_PER_PAGE)}
        </div>
      </main>
    </>
  );
}
