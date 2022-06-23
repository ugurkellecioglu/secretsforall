import { ObjectId as objectId } from 'mongodb';
import mongoDB from '../../helpers/MongoDB';
export default async function handler(req, res) {
  const db = await mongoDB.getDB('secretsforall');
  if (req.method === 'POST') {
    const { commentId, userId, text, postId } = req.body;

    if (!commentId || !userId || !text || !postId) {
      return res.status(400).json({ Message: 'Use id, comment text, postId is required.' });
    }

    // const secretsCollection = await db.collection('secrets');
    const usersCollection = await db.collection('users');

    const { username, profilePic } = await usersCollection.findOne({ _id: objectId(userId) });
    try {
      const collection = await db.collection('secrets');
      await collection.update(
        {
          _id: objectId(postId),
          'comments.id': objectId(commentId)
        },
        {
          $push: {
            'comments.$.comments': {
              id: objectId(commentId),
              text,
              createdAt: new Date(),
              updatedAt: new Date(),
              userId: objectId(userId),
              username,
              profilePic
            }
          }
        },
        { upsert: true }
      );
      return res.status(200).json({ Message: 'Comment added.' });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
}
