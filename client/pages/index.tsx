import React from 'react';
import Head from 'next/head';

/**
 * @component Landing page
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
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Inter:i,b,bi,100,200,300,400,500,600,700,800,900'></link>
      </Head>
      <main>
        <h1>Using this website helps students like you save on food! Total estimated savings:</h1>
      </main>
    </>
  );
}
