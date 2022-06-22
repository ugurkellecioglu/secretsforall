import mongo from '../client';
import jwt from 'jsonwebtoken';
import { ObjectId as objectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    return mongo('secretsforall', 'users', async (collection) => {
      return collection.findOne({ _id: objectId(decoded.id) }, (err, result) => {
        // eslint-disable-next-line no-unused-vars
        const { password, ...rest } = result;
        if (err && result.username !== decoded.username) return res.status(400).send(err);
        console.log('a');
        return res.status(200).send({ ...rest, ...decoded });
      });
    });
  }
  if (req.method === 'POST') {
    return res.status(200).send({});
  }
}
