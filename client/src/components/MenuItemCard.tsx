import MenuItem from '../../../types/interfaces/MenuItem';
import { Card } from 'antd';
import uel from '../../public/images/logos/uber_eats_logo.png';
import stdl from '../../public/images/logos/skip_the_dishes_logo.png';
import ddl from '../../public/images/logos/doordash_logo.png';
import { getDomain } from '../utils/helpers';
import Image from 'next/image';
import React from 'react';

/**
 * @component MenuItemCard
 * @returns {React.FC<MenuItem>}
 */
const MenuItemCard: React.FC<MenuItem> = (props: MenuItem) => {
  /**
   * @function clickItem updates the database when an item is clicked
   */
  async function clickItem(): Promise<void> {
    await fetch(`${getDomain()}/interactions/clickItem?value=${props.price.rawValue}`);
    return;
  }

  return (
    <a href={props.url} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
      <Card style={{ width: 300, height: 300, margin: '1rem' }} onClick={async () => await clickItem()}>
        <Image
          width={props.source === 'UberEats' ? 70 : props.source === 'DoorDash' ? 100 : 60}
          height={15}
          src={props.source === 'UberEats' ? uel.src : props.source === 'DoorDash' ? ddl.src : stdl.src}
          alt={`${props.source} logo`}
          style={{ height: 12 }}
        />
        <p>
          <b>{props.name}</b>
        </p>
        <a href={props.fromRestaurant.url}>
          <p>{props.fromRestaurant.name}</p>
        </a>
        <p>{props.description.length > 120 ? `${props.description.slice(0, 120)}...` : props.description}</p>
        <p>{`${props.price.formattedValue}`}</p>
      </Card>
    </a>
  );
};

export default MenuItemCard;
