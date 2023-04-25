import React from 'react';
import { useState, useEffect } from 'react';
import { getDomain } from '../../src/utils/helpers';
import Interactions from '../../../types/interfaces/Interactions';

/**
 * @component Landing page
 * @returns {JSX.Element}
 */
const EstimatedSavings: React.FC = () => {
  const CLICKS_BEFORE_PURCHASE = 13.7;

  const [time, setTime] = useState<number>(Date.now());
  const [amountSaved, setAmountSaved] = useState<string>('Calculating...');

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);

    (async () => {
      const response = await fetch(`${getDomain()}/interactions/getInteractions`);
      const interactions: Interactions = await response.json();

      const price: string =
        '$' +
        (interactions.valueOfItemsClicked / CLICKS_BEFORE_PURCHASE + interactions.numberOfCouponsClicked).toFixed(2);
      setAmountSaved(price);
    })();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#d94640',
        width: 325,
        color: 'white',
        margin: '4rem',
        padding: '0.5rem',
        fontSize: '3rem'
      }}>
      <div>{amountSaved}</div>
    </div>
  );
};

export default EstimatedSavings;
