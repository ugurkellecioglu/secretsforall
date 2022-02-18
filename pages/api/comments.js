import { ObjectId as objectId } from 'mongodb';
import mongo from './client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;
    const { userId, text, postId } = body;
    if (!userId || !text || !postId) {
      return res.status(400).json({ Message: 'Use id, comment text, postId is required.' });
    }
    mongo('secretsforall', 'secrets', async (collection) => {
      collection.findOne({ _id: objectId(postId) }, (err, result) => {
        console.log('Result is ', result);
        if (err) {
          return res.status(500).json({ Message: 'Internal server error.' });
        }
        if (result) {
          try {
            collection.updateOne(
              { _id: objectId(postId) },
              {
                $push: {
                  comments: {
                    id: objectId(),
                    userId,
                    text,
                    comments: [],
                    likes: [],
                    dislikes: [],
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }
                }
              },
              { upsert: true }
            );
            return res.status(200).json({ Message: 'Comment added.', postId, userId, text });
          } catch (error) {
            console.log(error);
            return res.status(500).json({ Message: 'Internal server error.' });
          }
        }
      });
    });
  }
}
