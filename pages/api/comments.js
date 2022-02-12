import mongo from './client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;
    const { userId, text, postId } = body;
    if (!userId || !text || !postId) {
      return res.status(400).json({ Message: 'Use id, comment text, postId is required.' });
    }
    mongo('secretsforall', 'comments', async (collection) => {
      collection.findOne({ postId }, (err, result) => {
        if (err) {
          return res.status(500).json({ Message: 'Internal server error.' });
        }
        if (result) {
          try {
            collection.updateOne(
              { postId },
              {
                $push: {
                  comments: {
                    userId,
                    text,
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }
                }
              },
              { upsert: true }
            );
            return res.status(200).json({ Message: 'Comment added.', postId, userId, text });
          } catch (error) {
            return res.status(500).json({ Message: 'Internal server error.' });
          }
        }
        try {
          collection.insertOne(
            {
              postId,
              comments: [
                {
                  userId,
                  text,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
              ]
            },
            (err, result) => {
              if (err) {
                return res.status(500).json({ Message: 'Internal server error.' });
              }
              return res.status(200).json({ Message: 'Comment added.', postId, userId, text });
            }
          );
        } catch (error) {
          return res.status(500).json({ Message: 'Internal server error.' });
        }
      });
    });
  }
}
