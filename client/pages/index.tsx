import React from 'react';
import Head from 'next/head';
import Test from '../tests/Test';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

/**
 * Landing page
 * @notes https://tintef.github.io/react-google-places-autocomplete/docs/v2-to-v3/
 * @returns {JSX.Element}
 */
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
        <GooglePlacesAutocomplete
          selectProps={{
            placeholder: 'Placeholder',
            onChange: (address: string) => {
              // we want to send this address to the backend and turn it into a geolocation,
              // then we want to find all the addresses that are in the geolocation area
              // order geolocation areas by closest and then paginate through that list
            }
          }}
          apiKey='AIzaSyBu_Gfu-PgU-rRJ7hYP2-0K9Vb3qxqGt0s'
        />
      </main>
    </>
  );
}
