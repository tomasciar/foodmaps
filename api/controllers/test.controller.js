/**
 * @class Test
 */
export default class Test {
  /**
   * @function testFunction
   * @async
   * @returns {object}
   */
  static async testFunction(req, res) {
    try {
      res.send({ message: 'Hello, World!' });
    } catch (error) {
      if (process.env.NODE_ENV === 'production') return;
      console.log(error);
    }
  }
}
