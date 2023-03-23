import React from 'react';
import Head from 'next/head';
import Test from '../tests/Test';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { getDomain } from '../utils/helpers';

/**
 * Landing page
 * @notes https://tintef.github.io/react-google-places-autocomplete/docs/v2-to-v3/
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

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
      <Test />
      <main>
        <h1 style={{ color: 'grey' }}>Enter an address:</h1>
        <GooglePlacesAutocomplete
          selectProps={{
            placeholder: 'Enter an address...',
            onChange: async (address: any) => {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address.label}&key=${API_KEY}`
              );
              const data = await response.json();
              let geolocation: any = data.results[0].geometry.location;
              console.log(geolocation);

              // ! Fix this later, right now it is not working because of the sphere index on MongoDB
              // const response2 = await fetch(
              //   `${getDomain()}/menu/getMenuItemsByDistance?numberOfItems=50&latitude=${geolocation.lat}&longitude=${
              //     geolocation.lng
              //   }`
              // );
              // const data2 = await response.json();
              // console.log(data2);
            }
          }}
          apiKey={API_KEY}
        />
      </main>
    </>
  );
}
