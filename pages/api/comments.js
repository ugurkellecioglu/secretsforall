import { ObjectId as objectId } from 'mongodb';
import mongoDB from '../../helpers/MongoDB';
export default async function handler(req, res) {
  const collection = await mongoDB.getCollection('SECRETS');
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
        likesCount: 0,
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
  } else if (req.method === 'PUT') {
    // like
    const { type } = req.query;
    if (type === 'like') {
      const { postId, commentId, user } = req.body;
      if (!postId || !commentId || !user) {
        return res.status(400).json({ Message: 'PostId, CommentId and User is required.' });
      }
      try {
        await collection.updateOne(
          { _id: objectId(postId), 'comments.id': objectId(commentId) },
          { $push: { 'comments.$.likes': user } },
          { $inc: { 'comments.$.likeCount': 1 } }
        );
        return res.status(200).json({ Message: 'Comment liked.' });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    }
  }
}
