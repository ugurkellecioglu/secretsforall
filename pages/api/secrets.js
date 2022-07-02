import { ObjectId as objectId } from 'mongodb';
import mongoDB from '../../helpers/MongoDB';
export default async function handler(req, res) {
  const secretsCollection = await mongoDB.getCollection('SECRETS');
  if (req.method === 'POST') {
    const { user, title, text } = req.body;
    if (!user || !title || !text) {
      res.status(400).json({ error: 'Missing user, title, text or img' });
      return;
    }
    const { _id, username, profilePic } = user;
    try {
      const result = await secretsCollection.insertOne({
        user: {
          _id: objectId(_id),
          username,
          profilePic
        },
        title,
        text,
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
        likes: [],
        dislikes: []
      });
      res.status(200).json({ Message: 'Secret added.', result });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  } else if (req.method === 'GET') {
    if (req.query.id) {
      try {
        const result = await secretsCollection.findOne({ _id: objectId(req.query.id) });
        if (!result) return res.status(400).json({ Message: 'Secret not found.' });
        return res.status(200).json({ Message: 'Secret found.', result });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    } else if (req.query.username) {
      try {
        const result = await secretsCollection
          .find({ 'user.username': req.query.username })
          .toArray();
        if (!result) return res.status(400).json({ Message: 'Secret not found.' });
        return res.status(200).json({ Message: 'Secret found.', result });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    } else if (req.query.type === 'random') {
      try {
        const result = await secretsCollection.aggregate([{ $sample: { size: 1 } }]).toArray();
        if (!result) return res.status(400).json({ Message: 'Secret not found.' });
        return res.status(200).json({ Message: 'Secret found.', result });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    } else if (req.query.size && req.query.page) {
      try {
        const secrets = await secretsCollection
          .find()
          .sort({ createdAt: -1 })
          .skip(req.query.size * (req.query.page - 1))
          .limit(Number(req.query.size))
          .toArray();
        if (!secrets) return res.status(400).send([]);
        return res.status(200).send(secrets);
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    }
  } else {
    return res.status(400).json({ error: 'Invalid method' });
  }
}
