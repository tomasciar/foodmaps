import React from 'react';
import { Button } from 'antd';
import ShuffleMenu from '../../../types/interfaces/ShuffleMenu';
import { shuffle } from '../utils/helpers';

/**
 * @component ShuffleMenu
 */
const ShuffleMenu: React.FC<ShuffleMenu> = (props: ShuffleMenu) => {
  /**
   * @function onClick
   * @returns {void}
   */
  const onClick = (): void => {
    props.setResults(shuffle(props.menuItems));
    props.setPageNumber(0);
  };

  return (
    <Button disabled={props.disabled} onClick={onClick} type='primary'>
      Shuffle Items
    </Button>
  );
};

export default ShuffleMenu;
