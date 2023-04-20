import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Coupon from '../../../types/interfaces/Coupon';
import CouponCard from './CouponCard';
import CouponModalProps from '../../../types/interfaces/CouponModal';
import { getDomain } from '../utils/helpers';
import Image from 'next/image';

/**
 * @component CouponModal
 */
const CouponModal: React.FC<CouponModalProps> = (props: CouponModalProps) => {
  const [coupons, setCoupons] = useState<Array<Coupon>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedCoupons: Array<Coupon> = await getCouponsBySource();
      setCoupons(fetchedCoupons);
    })();
  }, []);

  /**
   * @function getCouponsBySource gets all the coupons matching the source from the DB
   * @returns {Promise<Array<Coupon>>}
   */
  async function getCouponsBySource(): Promise<Array<Coupon>> {
    const rawCoupons = await fetch(`${getDomain()}/coupon/getCouponsBySource?source=${props.source}`);
    const coupons: Array<Coupon> = await rawCoupons.json();
    return coupons;
  }

  return (
    <>
      <button
        style={{
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: 'none',
          margin: '1rem'
        }}
        onClick={() => setIsModalOpen(true)}>
        <Image height={props.imageHeight} width={props.imageWidth} src={props.image} alt={`${props.source} logo`} />
      </button>
      <Modal title={props.source} open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        {coupons.map((coupon, index) => {
          return (
            <CouponCard
              key={index}
              source={coupon.source}
              date={coupon.date}
              title={coupon.title}
              description={coupon.description}
              url={coupon.url}
            />
          );
        })}
      </Modal>
    </>
  );
};

export default CouponModal;
