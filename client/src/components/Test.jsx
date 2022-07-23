import { useState, useEffect } from 'react';
import { getDomain } from '../utils/setup.js';
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
    const response = await fetch(`${getDomain()}/test`);
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
