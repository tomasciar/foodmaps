import AddressInput from '../../src/components/AddressInput';
import { useEffect, useState } from 'react';
import Restaurant from '../../../types/interfaces/Restaurant';
import MenuItem from '../../../types/interfaces/MenuItem';
import MenuItemCard from '../../src/components/MenuItemCard';
import FoodSearchBar from '../../src/components/FoodSearchBar';
import { Pagination } from 'antd';
import Head from 'next/head';
import React from 'react';

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
          numberOfRestaurants={1}
          setMenuItems={setMenuItems}
          numberOfMenuItems={1000}
        />
        <FoodSearchBar
          results={filteredMenuItems}
          setResults={setFilteredMenuItems}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          setPageNumber={setPageNumber}
        />
        <div style={{ padding: '2rem 4rem' }}>
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
                  <div key={index}>
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
      </main>
    </>
  );
}
