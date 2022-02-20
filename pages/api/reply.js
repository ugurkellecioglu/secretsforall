import { ObjectId as objectId } from 'mongodb';
import mongo from './client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { commentId, userId, text, postId } = req.body;
    if (!commentId || !userId || !text || !postId) {
      return res.status(400).json({ Message: 'Use id, comment text, postId is required.' });
    }
    console.log('commentId', commentId);
    mongo('secretsforall', 'secrets', async (collection) => {
      // find the post comments that has the commentId
      const comment = await collection.find({
        _id: objectId(postId),
        'comments.id': objectId(commentId)
      });

      console.log(comment);

      return res.status(200).json({ Message: 'Comment added.' });
    });
  }
}
