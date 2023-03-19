/**
 * Determines the domain of the current environment.
 * @function getDomain
 * @returns {string} the domain of the current environment
 */
export const getDomain = (): string => {
  if (process.env.NODE_ENV === 'production') return 'https://foodmaps.com';
  return `http://localhost:3836`;
};

/**
 * Logs the specified text with extra information.
 * @function log
 * @param  {...any} args
 * @returns {void} the information that will be outputted
 */
export const log = (...args: any[]): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Log');
    for (const arg of args) {
      console.log(arg, typeof arg);
    }
  }
};
