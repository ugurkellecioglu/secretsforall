import mongo from "./client"

export default async function handler(req, res) {
  const { userId, title, text, img } = req.body
  if (!userId || !title || !text) {
    res.status(400).json({ error: "Missing userId, title, text or img" })
    return
  }
  mongo("secretsforall", "secrets", async (collection) => {
    collection.insertOne({ userId, title, text, img }, (err, result) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send("Secret created")
    })
  })
}
