import AddressInput from '../../components/AddressInput';
import { useState } from 'react';
import Restaurant from '../../../types/interfaces/Restaurant';
import MenuItem from '../../../types/interfaces/MenuItem';
import MenuItemCard from '../../components/MenuItemCard';

/**
 * @route Menu
 * @returns {JSX.Element}
 */
export default function Menu(): JSX.Element {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>(new Array());
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>(new Array());

  return (
    <>
      <AddressInput
        setRestaurants={setRestaurants}
        numberOfRestaurants={10}
        setMenuItems={setMenuItems}
        numberOfMenuItems={50}
      />
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {menuItems.map((item: MenuItem, index: number) => {
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
        })}
      </div>
    </>
  );
}
