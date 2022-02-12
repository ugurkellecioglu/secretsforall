const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mongo = async function (db, collection, handler) {
  try {
    const cl = await client.connect();
    const d = cl.db(db);
    if (!collection) return d;
    const c = d.collection(collection);
    await handler(c);
  } catch (error) {
    return error;
  }
};

export default mongo;
