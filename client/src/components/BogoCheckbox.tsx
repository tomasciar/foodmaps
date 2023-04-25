import React, { useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import BogoCheckbox from '../../../types/interfaces/BogoCheckbox';
import MenuItem from '../../../types/interfaces/MenuItem';

/**
 * @component BogoCheckbox
 */
const BogoCheckbox: React.FC<BogoCheckbox> = (props: BogoCheckbox) => {
  const [checked, setChecked] = useState(false);

  /**
   * @function filterFoodItems filters menu items from a list of menu items
   * @returns {Array<MenuItem>}
   */
  const filterFoodItems = (checked: boolean, menuItems: Array<MenuItem>): Array<MenuItem> => {
    const items: Array<MenuItem> = menuItems.filter((item: MenuItem) => {
      if (!checked) return !checked;
      return item.category === 'Buy 1 get 1 free';
    });
    return items;
  };

  /**
   * @function onChange performs an action when the checkbox is toggled
   * @returns {void}
   */
  const onChange = (e: CheckboxChangeEvent): void => {
    setChecked(e.target.checked);
    props.setResults(filterFoodItems(e.target.checked, props.menuItems));
    props.setPageNumber(0);
  };

  return (
    <Checkbox disabled={props.disabled} onChange={onChange} checked={checked}>
      Buy 1 Get 1 Free
    </Checkbox>
  );
};

export default BogoCheckbox;
