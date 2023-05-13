/**
 * Determines the domain of the current environment.
 * @function getDomain
 * @returns {string} the domain of the current environment
 */
export const getDomain = (): string => {
  if (process.env.NODE_ENV !== 'production') return '134.122.44.237:5050';
  return `http://localhost:${process.env.NEXT_PUBLIC_PORT}`;
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

/**
 * @function shuffle shuffles the content of an array
 * @param {Array<any>}
 * @returns {Array<any>}
 */
export function shuffle(array: Array<any>): Array<any> {
  let currentIndex: number = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
