import MenuItem from '../../types/interfaces/MenuItem';
import { Card } from 'antd';

/**
 * @component MenuItemCard
 * @returns {React.FC<MenuItem>}
 */
const MenuItemCard: React.FC<MenuItem> = (props: MenuItem) => {
  return (
    <Card style={{ width: 300, margin: '1em' }}>
      <p>{props.source}</p>
      <p>Category: {props.category}</p>
      <p>{props.name}</p>
      <p>{props.description}</p>
      <p>{`${props.price.formattedValue}`}</p>
      <p>{props.url}</p>
    </Card>
  );
};

export default MenuItemCard;
