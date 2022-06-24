import { ObjectId as objectId } from 'mongodb';
import mongoDB from '../../helpers/MongoDB';
export default async function handler(req, res) {
  const db = await mongoDB.getDB('secretsforall');

  if (req.method === 'POST') {
    const { user, title, text } = req.body;
    if (!user || !title || !text) {
      res.status(400).json({ error: 'Missing user, title, text or img' });
      return;
    }
    const collection = db.collection('secrets');
    try {
      const result = await collection.insertOne({
        user,
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
      const collection = db.collection('secrets');
      try {
        const result = await collection.findOne({ _id: objectId(req.query.id) });
        if (!result) return res.status(400).json({ Message: 'Secret not found.' });
        return res.status(200).json({ Message: 'Secret found.', result });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    } else if (req.query.username) {
      const collection = db.collection('secrets');
      try {
        const result = await collection.find({ 'user.username': req.query.username }).toArray();
        if (!result) return res.status(400).json({ Message: 'Secret not found.' });
        return res.status(200).json({ Message: 'Secret found.', result });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    } else if (req.query.type === 'random') {
      const collection = db.collection('secrets');
      try {
        const result = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
        if (!result) return res.status(400).json({ Message: 'Secret not found.' });
        return res.status(200).json({ Message: 'Secret found.', result });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    } else {
      const secretsCollection = await db.collection('secrets');
      const secrets = await secretsCollection.find({}).sort({ updatedAt: -1 }).toArray();

      const usersCollection = await db.collection('users');
      const users = await usersCollection.find({}).toArray();
      secrets.forEach((secret) => {
        const secretComments = secret.comments.map((comment) => {
          const commented = users.find((user) => user._id.toString() === comment.userId.toString());
          if (commented) {
            const { profilePic, username } = commented;
            return { ...comment, profilePic, username };
          }
        });
        secret.comments = secretComments;
      });
      return res.status(200).send(secrets);
    }
  } else {
    return res.status(400).json({ error: 'Invalid method' });
  }
}
