import jwt from 'jsonwebtoken';
import { ObjectId as objectId } from 'mongodb';
import mongoDB from '../../../helpers/MongoDB';
export default async function handler(req, res) {
  const collection = await mongoDB.getCollection('USERS');
  if (req.method === 'GET') {
    const token = req.cookies.jwtToken;
    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    try {
      const result = await collection.findOne({ _id: objectId(decoded.id) });
      // eslint-disable-next-line no-unused-vars
      const { password, ...rest } = result;
      if (result.username !== decoded.username) return res.status(400).send(err);
      return res.status(200).send({ ...rest, ...decoded });
    } catch (error) {
      return res.status(400).send({ error: error.toString() });
    }
  }
}
