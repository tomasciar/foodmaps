import { useState, useEffect } from 'react';
import { getDomain } from '../../src/utils/helpers';
import Interactions from '../../../types/interfaces/Interactions';
import Price from '../../../types/classes/Price';
import { NaPhoneNumber, PhoneNumber } from '../../../types/classes/PhoneNumber';

/**
 * @component Landing page
 * @returns {JSX.Element}
 */
const EstimatedSavings: React.FC = () => {
  const CLICKS_BEFORE_PURCHASE = 13.7;
  const pn: NaPhoneNumber = new NaPhoneNumber(911);

  const [time, setTime] = useState<number>(Date.now());
  const [amountSaved, setAmountSaved] = useState<Price>(new Price(0));

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);

    (async () => {
      const response = await fetch(`${getDomain()}/interactions/getInteractions`);
      const interactions: Interactions = await response.json();

      const price: Price = new Price(interactions.valueOfItemsClicked / CLICKS_BEFORE_PURCHASE);
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
      <div>
        {amountSaved.formattedValue}, {pn.formattedValue}
      </div>
    </div>
  );
};

export default EstimatedSavings;
