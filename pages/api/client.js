const { MongoClient } = require("mongodb")
require("dotenv").config()

console.log(process.env.MONGODB_URI)
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const mongo = async function (db, collection, handler) {
  try {
    const cl = await client.connect()
    console.log("Connected to mongo")
    const d = cl.db(db)
    const c = d.collection(collection)
    console.log("Connected to collection")
    await handler(c)
  } catch (error) {
    console.log(error)
  }
}

export default mongo
