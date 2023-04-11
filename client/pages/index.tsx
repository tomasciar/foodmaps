import React from 'react';
import Head from 'next/head';
import bottomBorder from '../public/images/bottom_border.png';
import Image from 'next/image';
import EstimatedSavings from '../src/components/EstimatedSavings';

/**
 * @component Home
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
  const Video = (props: any) => {
    return (
      <video style={styles.video} muted autoPlay loop>
        <source src={props.src} />
      </video>
    );
  };

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
        <div style={styles.title}>Using this website helps people like you save on food!</div>
        <div style={styles.subtitle}>Total estimated savings:</div>
        <EstimatedSavings />
        <div style={styles.videoContainer}>
          <Video src='/videos/cutting_radish.mp4'></Video>
          <Video src='/videos/egg_cooking.mp4'></Video>
          <Video src='/videos/family_eating_together.mp4'></Video>
          <Video src='/videos/family_eating.mp4'></Video>
          <Video src='/videos/grilling_variety.mp4'></Video>
          <Video src='/videos/making_pizza.mp4'></Video>
          <Video src='/videos/meat_cooking.mp4'></Video>
          <Video src='/videos/salad_rotating.mp4'></Video>
          <Video src='/videos/scooping_ice_cream.mp4'></Video>
          <Video src='/videos/sushi_display.mp4'></Video>
          <Video src='/videos/vegetables.mp4'></Video>
          <Video src='/videos/meat_in_container.mp4'></Video>
          <Video src='/videos/eating_sandwich.mp4'></Video>
          <Video src='/videos/washing_knife.mp4'></Video>
          <Video src='/videos/blueberries.mp4'></Video>
        </div>
        <Image style={styles.border} src={bottomBorder.src} alt='bottom border' width='1000' height='200' />
      </main>
    </>
  );
}

const styles = {
  title: {
    fontSize: '2.75rem',
    width: '40vw',
    margin: '4rem',
    fontWeight: 300
  },

  subtitle: {
    fontSize: '2.5rem',
    color: '#d94640',
    width: '40vw',
    margin: '4rem',
    fontWeight: 500
  },

  border: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    width: '110vw',
    height: 200
  },

  videoContainer: {
    position: 'absolute' as const,
    width: '60vw',
    height: '105vh',
    right: -200,
    top: -60,
    overflow: 'hidden'
  },

  video: {
    borderRadius: 20,
    width: 335,
    padding: 10
  }
};
