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
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <Button onClick={displayMessage}>Test</Button>
      {message && <div>{message}</div>}
    </div>
  );
}
