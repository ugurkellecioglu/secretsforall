import mongo from './client';
import jwt from 'jsonwebtoken';
import { ObjectId as objectId } from 'mongodb';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers['authorization'];
    if (!token) {
      res.status(401).json({ error: 'Missing token' });
      return;
    }
    const decoded = jwt.verify(token.split('Bearer ')[1], process.env.SECRET);
    if (!decoded) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    return mongo('secretsforall', 'users', async (collection) => {
      return collection.findOne({ _id: objectId(decoded.id) }, (err, result) => {
        // eslint-disable-next-line no-unused-vars
        const { password, ...rest } = result;
        if (err && result.username !== decoded.username) return res.status(400).send(err);
        return res.status(200).send({ ...rest, ...decoded });
      });
    });
  }
}
