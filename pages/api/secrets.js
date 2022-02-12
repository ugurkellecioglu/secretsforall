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
        { user, title, text, createdAt: new Date(), updatedAt: new Date() },
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
    } else {
      const db = await mongo('secretsforall');
      const secretsCollection = await db.collection('secrets');
      const commentsCollection = await db.collection('comments');
      const userCollection = await db.collection('users');

      const secrets = await secretsCollection.find({}).sort({ updatedAt: -1 }).toArray();
      const secretIds = secrets.map((secret) => secret._id.toString());

      const comments = await commentsCollection.find({ postId: { $in: secretIds } }).toArray();
      const result = secrets.map((secret) => {
        const commentsForSecret = comments.map((comment) => {
          if (comment.postId === secret._id.toString()) return comment.comments;
        });
        return { ...secret, comments: commentsForSecret[0] };
      });
      console.log('buraya geldi');
      const userIds = result
        .map((secret) => secret.comments)[0]
        .map((comment) => objectId(comment.userId));
      const userInfos = await userCollection.find({ _id: { $in: userIds } }).toArray();
      result.forEach((secret) => {
        secret.comments = secret.comments.map((comment) => {
          const userInfo = userInfos.find((user) => {
            return user._id.toString() === comment.userId;
          });
          const { username, profilePic } = userInfo;
          return { ...comment, username, profilePic };
        });
      });
      return res.status(200).send(result);
    }
  } else {
    return res.status(400).json({ error: 'Invalid method' });
  }
}
