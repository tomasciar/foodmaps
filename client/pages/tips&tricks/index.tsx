import Head from 'next/head';
import React from 'react';

/**
 * @route Tips & Tricks
 * @returns {JSX.Element}
 */
export default function TipsAndTricks(): JSX.Element {
  return (
    <>
      <Head>
        <title>Foodmaps | Tips & Tricks</title>
        <meta
          name='description'
          content='Food deal aggregation website that finds all of the major food deals in a searched area'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main></main>
    </>
  );
}
