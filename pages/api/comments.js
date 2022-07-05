import { ObjectId as objectId } from 'mongodb';
import checkUser from '../../helpers/checkUser';
import mongoDB from '../../helpers/MongoDB';
export default async function handler(req, res) {
  try {
    await checkUser(req.headers.authorization);
  } catch (error) {
    return res.status(401).json({
      error: error.message
    });
  }
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
    const _id = objectId();
    try {
      const data = {
        _id,
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
        {
          upsert: true
        }
      );
      return res
        .status(200)
        .json({ Message: 'Comment added.', ...data, result: { insertedId: _id } });
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
      const { _id, username, profilePic } = user;

      try {
        await collection.updateOne(
          { 'comments._id': objectId(commentId) },
          {
            $inc: { 'comments.$[outer].likesCount': 1 },
            $push: {
              'comments.$[outer].likes': {
                user: { _id: objectId(_id), username, profilePic }
              }
            }
          },
          {
            arrayFilters: [{ 'outer._id': objectId(commentId) }]
          }
        );
        return res.status(200).json({ Message: 'Comment liked.' });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    }
    if (type === 'unlike') {
      const { postId, commentId, user } = req.body;
      if (!postId || !commentId || !user) {
        return res.status(400).json({ Message: 'PostId, CommentId and User is required.' });
      }
      const { _id } = user;
      try {
        await collection.updateOne(
          { 'comments._id': objectId(commentId) },
          {
            $pull: {
              'comments.$.likes': { user: { _id: objectId(_id) } }
            },
            $inc: { 'comments.$.likesCount': -1 }
          }
        );
        return res.status(200).json({ Message: 'Comment unliked.' });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    }
  }
}
