/**
 * Determines the domain of the current environment.
 * @function getDomain
 * @returns {string} The domain of the current environment
 */
export const getDomain = () => {
  if (process.env.NODE_ENV === 'production') return 'https://foodmaps.com';
  return `http://localhost:2820`;
};

/**
 * Logs the specified text with extra information.
 * @function log
 * @param  {...any} args
 * @returns {string} The information that will be outputted
 */
export const log = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Log');
    for (const arg of args) {
      console.log(arg, typeof arg);
    }
  }
};
