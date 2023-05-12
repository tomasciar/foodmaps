import { MongoClient } from 'mongodb';
import env from 'dotenv';

export default class Client {
  public client: MongoClient;

  constructor() {
    const path = require('path');
    env.config({ path: path.join(__dirname, '.env') });
    const uri: string = process.env.MONGO_URI;
    this.client = new MongoClient(uri);
  }

  async connect(): Promise<MongoClient> {
    try {
      await this.client.connect();
    } catch (e) {
      console.error(e);
    }

    return this.client;
  }
}
