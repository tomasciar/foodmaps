import { Request, Response } from 'express';

/**
 * @class Test
 */
export default class Test {
  /**
   * @function testFunction
   * @async
   * @returns Promise<object>
   */
  static async testFunction(req: Request, res: Response): Promise<object> {
    try {
      return res.send({ message: 'Hello, World!' });
    } catch (error) {
      console.log(error);
      return res.send({ message: 'Foodmaps' });
    }
  }
}
