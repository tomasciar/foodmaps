import React from 'react';
import Head from 'next/head';
import Test from '../tests/Test';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function Home() {
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
        <h1 style={{ color: 'grey' }}>Enter an address:</h1>
        <div style={{ width: '500px' }}>
          <GooglePlacesAutocomplete apiKey='AIzaSyBu_Gfu-PgU-rRJ7hYP2-0K9Vb3qxqGt0s' />
        </div>
      </main>
    </>
  );
}
