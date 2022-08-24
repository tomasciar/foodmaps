import { useState, useEffect } from 'react';
import { getDomain, log } from '../utils/helpers.js';
import { Button } from 'reactstrap';

/**
 * Test component.
 * @function Test
 * @async
 * @returns {JSX.Element}
 */
export default function Test() {
  const [message, setMessage] = useState('');

  const displayMessage = async () => {
    const response = await fetch(`${getDomain()}/test/testFunction`);
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <Button onClick={displayMessage}>Click Me!</Button>
      {message && <div>{message}</div>}
    </div>
  );
}
