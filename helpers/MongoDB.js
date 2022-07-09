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
      USERS: 'users',
      CHAT: 'chat'
    };
    this.dbNames = {
      SECRETSFORALL: 'secretsforall'
    };
    this.collectionList = {
      SECRETS: null,
      USERS: null,
      CHAT: null
    };
    this.secretsCollection = this.usersCollection = async () => {
      const db = await mongoDB.getDB(mongoDB.dbNames.SECRETSFORALL);
      return db.collection(mongoDB.collections.USERS);
    };
  }
  async getCollection(collectionName) {
    if (this.collectionList[collectionName] === null) {
      await this.client.connect();
      const db = await mongoDB.getDB(mongoDB.dbNames.SECRETSFORALL);
      this.collectionList.SECRETS = await db.collection(mongoDB.collections.SECRETS);
      this.collectionList.USERS = await db.collection(mongoDB.collections.USERS);
      this.collectionList.CHAT = await db.collection(mongoDB.collections.CHAT);
      console.log('MongoDB collections is connected');
      return this.collectionList[collectionName];
    } else {
      console.log('MongoDB collection is already connected and given collection name is same');
      return this.collectionList[collectionName];
    }
  }
  async getDB(db) {
    if (this.db && this.db?.namespace === db) {
      console.log('MongoDB database is already connected and given db name is same');
      return this.db;
    }
    console.log('MongoDB database is not connected or given db name is different', db);
    await this.client.connect();
    console.log('MongoDB database is connected');
    this.db = this.client.db(db);
    return this.db;
  }
}

const mongoDB = new MongoDB();
export default mongoDB;
