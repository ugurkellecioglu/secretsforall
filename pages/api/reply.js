import { ObjectId as objectId } from 'mongodb';
import mongoDB from '../../helpers/MongoDB';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      commentId,
      // eslint-disable-next-line no-unused-vars
      user: { cover, info, tags, id, iat, exp, ...user },
      text,
      postId
    } = req.body;

    if (!commentId || !user || !text || !postId) {
      return res.status(400).json({ Message: 'user, comment text, postId is required.' });
    }

    try {
      const collection = await mongoDB.getCollection('SECRETS');
      await collection.updateOne(
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
              user
            }
          }
        },
        { upsert: true }
      );
      return res.status(200).json({
        user,
        commentId,
        text,
        postId
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
}
