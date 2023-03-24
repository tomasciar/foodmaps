import React from 'react';
import Head from 'next/head';
import Test from '../tests/Test';
import AddressInput from '../components/AddressInput';

/**
 * @component Landing page
 * @notes https://tintef.github.io/react-google-places-autocomplete/docs/v2-to-v3/
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Foodmaps | Home</title>
        <meta
          name='description'
          content='Food deal aggregation website that finds all of the major food deals in a searched area'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>Enter an address</h1>
        <AddressInput />
      </main>
    </>
  );
}
