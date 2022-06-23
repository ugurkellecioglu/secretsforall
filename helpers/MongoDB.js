const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

class MongoDB {
  constructor() {
    this.client = client;
    this.db = null;
    this.collections = {
      SECRETS: 'secrets',
      USERS: 'users'
    };
    this.dbNames = {
      SECRETSFORALL: 'secretsforall'
    };
  }

  async getDB(db) {
    if (this.db && this.db?.namespace === db) {
      console.log('MongoDB database is already connected and given db name is same');
      return this.db;
    }
    console.log('MongoDB database is not connected or given db name is different');
    await this.client.connect();
    console.log('MongoDB database is connected');
    this.db = this.client.db(db);
    return this.db;
  }
}

const mongoDB = new MongoDB();

export default mongoDB;
