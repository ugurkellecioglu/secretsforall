import { ObjectId as objectId } from 'mongodb';
import mongoDB from '../../helpers/MongoDB';
export default async function handler(req, res) {
  const db = await mongoDB.getDB('secretsforall');
  const collection = db.collection('secrets');
  if (req.method === 'POST') {
    const body = req.body;
    const { userId, text, postId } = body;
    if (!userId || !text || !postId) {
      return res.status(400).json({ Message: 'Use id, comment text, postId is required.' });
    }
    try {
      const result = await collection.findOne({ _id: objectId(postId) });
      if (!result) return res.status(400).json({ Message: 'Post not found.' });
      const data = {
        id: objectId(),
        userId,
        text,
        comments: [],
        likes: [],
        dislikes: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await collection.updateOne(
        { _id: objectId(postId) },
        {
          $push: {
            comments: data
          }
        },
        { upsert: true }
      );
      return res.status(200).json({ Message: 'Comment added.', ...data, ...result.user });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
}
