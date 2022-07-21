import { useState } from 'react';
import { getDomain } from '../utils/setup.js';

/**
 * Test component.
 * @function Test
 * @async
 * @returns {JSX.Element}
 */
const Test = () => {
  const [message, setMessage] = useState('');

  fetch(`${getDomain()}/test`)
    .then(response => response.json())
    .then(data => setMessage(data.message))
    .catch(error => console.log(error));

  return <span>{message}</span>;
};

export default Test;
