import { ObjectId as objectId } from 'mongodb';
import mongoDB from '../../helpers/MongoDB';
export default async function handler(req, res) {
  const collection = await mongoDB.getCollection('SECRETS');
  if (req.method === 'POST') {
    const {
      commentId,
      // eslint-disable-next-line no-unused-vars
      user: { cover, info, tags, id, iat, exp, ...user },
      text,
      postId
    } = req.body;

    if (!commentId || !user || !text || !postId) {
      return res.status(400).json({ Message: 'user, comment id, text, postId is required.' });
    }

    try {
      const result = await collection.updateOne(
        {
          _id: objectId(postId),
          'comments._id': objectId(commentId)
        },
        {
          $push: {
            'comments.$.comments': {
              _id: objectId(commentId),
              text,
              likes: [],
              likesCount: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
              user
            }
          }
        },
        {
          upsert: true
        }
      );
      return res.status(200).json({
        user,
        commentId,
        text,
        postId,
        result
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  } else if (req.method === 'PUT') {
    // like
    const { type } = req.query;
    if (type === 'like') {
      const { postId, commentId, user, replyId } = req.body;
      if (!postId || !commentId || !user) {
        return res.status(400).json({ Message: 'PostId, CommentId and User is required.' });
      }
      const { _id, username, profilePic } = user;
      try {
        await collection.updateOne(
          {
            _id: objectId(postId),
            'comments.comments.id': objectId(replyId)
          },
          {
            $inc: { 'comments.$.comments.0.likesCount': 1 },
            $push: {
              'comments.$.comments.0.likes': { user: { _id: objectId(_id), username, profilePic } }
            }
          }
        );
        return res.status(200).json({ Message: 'Reply liked.' });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    }
  }
}
