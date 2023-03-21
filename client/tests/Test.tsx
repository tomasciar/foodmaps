import React from 'react';
import { useState } from 'react';
import { getDomain } from '../utils/helpers';
import { Button } from 'reactstrap';

/**
 * Test component.
 * @function Test
 * @async
 * @returns {JSX.Element}
 */
export default function Test(): JSX.Element {
  const [message, setMessage] = useState('');

  const displayMessage = async () => {
    const response = await fetch(`${getDomain()}/test/testFunction`);
    // const response = await fetch(`${getDomain()}/menu/getMenuItems?startingAtIndex=50&numberOfItems=100`);
    // const response = await fetch(`${getDomain()}/restaurant/getRestaurants?startingAtIndex=50&numberOfItems=100`);
    const data = await response.json();
  };

  return (
    <div>
      <Button onClick={displayMessage}>Test</Button>
      {message && <div>{message}</div>}
    </div>
  );
}
