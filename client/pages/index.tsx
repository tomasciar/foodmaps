import React from 'react';
import Head from 'next/head';
import bottomBorder from '../public/images/homepage/bottom_border.png';
import Image from 'next/image';
import EstimatedSavings from '../src/components/EstimatedSavings';
import pancakes from '../public/images/homepage/pancakes.jpg';
import fruitBowl from '../public/images/homepage/fruit_bowl.jpg';
import burgerAndFries from '../public/images/homepage/burger_and_fries.jpg';
import citrus from '../public/images/homepage/citrus.jpg';
import dogOnBread from '../public/images/homepage/dog_on_bread.jpg';
import mixedBowl from '../public/images/homepage/mixed_bowl.jpg';
import salad from '../public/images/homepage/salad.jpg';
import soup from '../public/images/homepage/soup.jpg';
import veggies from '../public/images/homepage/veggies.jpg';
import bananas from '../public/images/homepage/bananas.jpg';
import cheese from '../public/images/homepage/cheese.jpg';
import dessert from '../public/images/homepage/dessert.jpg';
import grapes from '../public/images/homepage/grapes.jpg';
import chocolate from '../public/images/homepage/chocolate.jpg';
import smileToast from '../public/images/homepage/smile_toast.jpg';
import onions from '../public/images/homepage/onions.jpg';

/**
 * @component Home
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
        <div style={styles.title}>Using this helps people like you save on food!</div>
        <div style={styles.subtitle}>Total estimated savings:</div>
        <EstimatedSavings />
        <div
          style={{
            position: 'absolute' as const,
            width: '60vw',
            height: '105vh',
            right: -200,
            top: -60,
            overflow: 'hidden',
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: 15,
            columnGap: 15
          }}>
          <Image style={styles.image} src={pancakes} alt='pancakes' height={225} />
          <Image style={styles.image} src={burgerAndFries} alt='burger and fries' height={225} />
          <Image style={styles.image} src={fruitBowl} alt='fruit bowl' height={225} />
          <Image style={styles.image} src={mixedBowl} alt='mixed bowl' height={225} />
          <Image style={styles.image} src={dogOnBread} alt='dog on bread' height={225} />
          <Image style={styles.image} src={soup} alt='soup' height={225} />
          <Image style={styles.image} src={citrus} alt='citrus' height={225} />
          <Image style={styles.image} src={veggies} alt='veggies' height={225} />
          <Image style={styles.image} src={salad} alt='salad' height={225} />
          <Image style={styles.image} src={cheese} alt='cheese' height={225} />
          <Image style={styles.image} src={grapes} alt='grapes' height={225} />
          <Image style={styles.image} src={dessert} alt='dessert' height={225} />
          <Image style={styles.image} src={bananas} alt='bananas' height={225} />
          <Image style={styles.image} src={onions} alt='onions' height={225} />
          <Image style={styles.image} src={chocolate} alt='chocolate' height={225} />
          <Image style={styles.image} src={smileToast} alt='smile toast' height={225} />
        </div>
        <Image style={styles.border} src={bottomBorder.src} alt='bottom border' width='1000' height='200' />
      </main>
    </>
  );
}

const styles = {
  title: {
    fontSize: '2.75rem',
    maxWidth: '36vw',
    margin: '2rem 4rem',
    fontWeight: 300
  },

  subtitle: {
    fontSize: '2.5rem',
    color: '#d94640',
    width: '40vw',
    margin: '3rem 4rem',
    fontWeight: 500
  },

  border: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    width: '110vw',
    height: 200
  },

  image: {
    borderRadius: 20
  }
};
