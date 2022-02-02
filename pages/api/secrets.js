import mongo from './client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user, title, text } = req.body;
    if (!user || !title || !text) {
      res.status(400).json({ error: 'Missing user, title, text or img' });
      return;
    }
    mongo('secretsforall', 'secrets', async (collection) => {
      collection.insertOne({ user, title, text }, (err, result) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(result);
      });
    });
  } else if (req.method === 'GET') {
    mongo('secretsforall', 'secrets', async (collection) => {
      collection.find().toArray((err, result) => {
        if (err) return res.status(400).send(err);
        if (result.length === 0) res.status(200).send({});
        return res.status(200).send(result);
      });
    });
  } else {
    return res.status(400).json({ error: 'Invalid method' });
  }
}
