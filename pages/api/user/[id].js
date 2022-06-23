import jwt from 'jsonwebtoken';
import mongoDB from '../../../helpers/MongoDB';
export default async function handler(req, res) {
  const db = await mongoDB.getDB('users');
  const collection = db.collection('users');
  if (req.method === 'GET') {
    const token = req.cookies.jwtToken;
    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (req.query.id) {
      try {
        const result = await collection.findOne({ username: req.query.id });
        if (result.username !== decoded.username) return res.status(400).send(err);
        return res.status(200).send({ ...result, ...decoded });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    }
    return res.status(500).json({ error: 'Missing id' });
  }
  if (req.method === 'PUT') {
    const { id } = req.query;
    try {
      collection.updateOne({ username: id }, { $set: req.body }, (err, result) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
  return res.status(200).send({ error: 'selma' });
}
