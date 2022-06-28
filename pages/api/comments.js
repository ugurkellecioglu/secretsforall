import { ObjectId as objectId } from 'mongodb';
import mongoDB from '../../helpers/MongoDB';
export default async function handler(req, res) {
  const collection = await mongoDB.getCollection('USERS');
  if (req.method === 'POST') {
    const body = req.body;
    const {
      // eslint-disable-next-line no-unused-vars
      user: { cover, info, tags, id, iat, exp, ...user },
      text,
      postId
    } = body;
    if (!user || !text || !postId) {
      return res.status(400).json({ Message: 'Use id, comment text, postId is required.' });
    }
    try {
      const data = {
        id: objectId(),
        user,
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
      return res.status(200).json({ Message: 'Comment added.', ...data });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
}
