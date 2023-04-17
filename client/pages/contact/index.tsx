import Head from 'next/head';
import React from 'react';

/**
 * @route Contact
 * @returns {JSX.Element}
 */
export default function Contact(): JSX.Element {
  return (
    <>
      <Head>
        <title>Foodmaps | Contact</title>
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
