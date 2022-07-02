/**
 * Determines the domain of the current environment.
 * @function getDomain
 * @returns {string} The domain of the current environment.
 */
export const getDomain = () => {
  if (process.env.NODE_ENV === "production") return "https://foodmaps.com";
  return `http://localhost:2820`;
};
