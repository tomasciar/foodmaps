import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import wendysLogo from '../../public/images/wendys_logo.png';
import mcdonaldsLogo from '../../public/images/mcdonalds_logo.png';
import kfcLogo from '../../public/images/kfc_logo.png';
import popeyesLogo from '../../public/images/popeyes_logo.png';
import CouponModal from '../../src/components/CouponModal';

/**
 * @route Coupons
 * @returns {JSX.Element}
 */
export default function Coupons(): JSX.Element {
  return (
    <>
      <Head>
        <title>Foodmaps | Coupons</title>
        <meta
          name='description'
          content='Food deal aggregation website that finds all of the major food deals in a searched area'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div style={{ padding: '2rem 4rem', justifyContent: 'center', alignItems: 'center' }}>
          <CouponModal source="Wendy's" image={wendysLogo} imageHeight={40} imageWidth={120} />
          <CouponModal source="McDonald's" image={mcdonaldsLogo} imageHeight={60} imageWidth={68} />
          <CouponModal source='KFC' image={kfcLogo} imageHeight={31} imageWidth={100} />
          <CouponModal source='Popeyes' image={popeyesLogo} imageHeight={93} imageWidth={84} />
        </div>
      </main>
    </>
  );
}
