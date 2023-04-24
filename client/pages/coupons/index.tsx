import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import wendysLogo from '../../public/images/wendys_logo.png';
import mcdonaldsLogo from '../../public/images/mcdonalds_logo.png';
import kfcLogo from '../../public/images/kfc_logo.png';
import popeyesLogo from '../../public/images/popeyes_logo.png';
import dominosLogo from '../../public/images/dominos_logo.png';
import pizzaHutLogo from '../../public/images/pizzahut_logo.png';
import tacoBellLogo from '../../public/images/taco_bell_logo.png';
import buffaloWildWingsLogo from '../../public/images/buffalo_wild_wings_logo.png';
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
        <div
          style={{
            padding: '2rem 4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <CouponModal source="Wendy's" image={wendysLogo} imageHeight={60} imageWidth={180} />
            <CouponModal source="McDonald's" image={mcdonaldsLogo} imageHeight={80} imageWidth={90} />
            <CouponModal source='KFC' image={kfcLogo} imageHeight={50} imageWidth={166} />
            <CouponModal source='Popeyes' image={popeyesLogo} imageHeight={100} imageWidth={91} />
            <CouponModal source="Domino's" image={dominosLogo} imageHeight={100} imageWidth={100} />
            <CouponModal source='Pizza Hut' image={pizzaHutLogo} imageHeight={82} imageWidth={100} />
            <CouponModal source='Taco Bell' image={tacoBellLogo} imageHeight={100} imageWidth={68} />
            <CouponModal source='Buffalo Wild Wings' image={buffaloWildWingsLogo} imageHeight={100} imageWidth={175} />
          </div>
        </div>
      </main>
    </>
  );
}
