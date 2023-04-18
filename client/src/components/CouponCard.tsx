import Coupon from '../../../types/interfaces/Coupon';
import { Card } from 'antd';
import wendysLogo from '../../public/images/wendys_logo.png';
import { getDomain } from '../utils/helpers';
import Image from 'next/image';
import React from 'react';

/**
 * @component CouponCard
 * @returns {React.FC<Coupon>}
 */
const CouponCard: React.FC<Coupon> = (props: Coupon) => {
  /**
   * @function clickItem updates the database when a coupon is clicked
   */
  async function clickCoupon(): Promise<void> {
    await fetch(`${getDomain()}/interactions/clickCoupon`);
  }

  return (
    <a href={props.url} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
      <Card style={{ width: 433, height: 150, margin: '1rem' }} onClick={async () => await clickCoupon()}>
        <p>{props.description.length > 120 ? `${props.description.slice(0, 120)}...` : props.description}</p>
      </Card>
    </a>
  );
};

export default CouponCard;