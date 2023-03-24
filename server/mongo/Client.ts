import { MongoClient } from 'mongodb';
import env from 'dotenv';

export class Client {
  public client: MongoClient;

  constructor() {
    env.config();
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

export default Client;