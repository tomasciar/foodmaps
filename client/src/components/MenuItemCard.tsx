import MenuItem from '../../../types/interfaces/MenuItem';
import { Card } from 'antd';
import uberEatsLogo from '/images/uber_eats_logo.png';
import skipTheDishesLogo from '/images/skip_the_dishes_logo.png';
import doorDashLogo from '/images/doordash_logo.png';

/**
 * @component MenuItemCard
 * @returns {React.FC<MenuItem>}
 */
const MenuItemCard: React.FC<MenuItem> = (props: MenuItem) => {
  return (
    <a href={props.url} target='_blank' style={{ textDecoration: 'none' }}>
      <Card style={{ width: 300, height: 250, margin: '1rem' }}>
        <img
          src={
            props.source === 'UberEats'
              ? uberEatsLogo.src
              : props.source === 'DoorDash'
              ? doorDashLogo.src
              : skipTheDishesLogo.src
          }
          alt={`${props.source} logo`}
          style={{ height: 12 }}
        />
        <p>{props.name}</p>
        <p>{props.description.length > 120 ? `${props.description.slice(0, 120)}...` : props.description}</p>
        <p>{`${props.price.formattedValue}`}</p>
      </Card>
    </a>
  );
};

export default MenuItemCard;
