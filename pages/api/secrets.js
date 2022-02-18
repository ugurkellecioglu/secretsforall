import mongo from './client';
import { ObjectId as objectId } from 'mongodb';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user, title, text } = req.body;
    if (!user || !title || !text) {
      res.status(400).json({ error: 'Missing user, title, text or img' });
      return;
    }
    mongo('secretsforall', 'secrets', async (collection) => {
      collection.insertOne(
        {
          user,
          title,
          text,
          createdAt: new Date(),
          updatedAt: new Date(),
          comments: [],
          likes: [],
          dislikes: []
        },
        (err, result) => {
          if (err) return res.status(400).send(err);
          return res.status(200).send(result);
        }
      );
    });
  } else if (req.method === 'GET') {
    if (req.query.id) {
      mongo('secretsforall', 'secrets', async (collection) => {
        collection.findOne({ _id: objectId(req.query.id) }, (err, result) => {
          if (err) return res.status(400).send(err);
          return res.status(200).send(result);
        });
      });
    } else if (req.query.random) {
      mongo('secretsforall', 'secrets', async (collection) => {
        collection.aggregate([{ $sample: { size: 1 } }], (err, result) => {
          if (err) return res.status(400).send(err);
          return res.status(200).send(result);
        });
      });
    } else {
      const db = await mongo('secretsforall');
      const secretsCollection = await db.collection('secrets');
      const usersCollection = await db.collection('users');

      const secrets = await secretsCollection.find({}).sort({ updatedAt: -1 }).toArray();
      const users = await usersCollection.find({}).toArray();
      secrets.forEach((secret) => {
        const secretComments = secret.comments.map((comment) => {
          const { profilePic, username } = users.find(
            (user) => user._id.toString() === comment.userId.toString()
          );
          console.log(profilePic, username);
          return { ...comment, profilePic, username };
        });
        secret.comments = secretComments;
      });
      return res.status(200).send(secrets);
    }
  } else {
    return res.status(400).json({ error: 'Invalid method' });
  }
}
