import jwt from 'jsonwebtoken';
import mongoDB from '../../../helpers/MongoDB';
export default async function handler(req, res) {
  const db = await mongoDB.getDB(mongoDB.dbNames.SECRETSFORALL);
  const collection = db.collection(mongoDB.collections.USERS);
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
        if (result.username !== decoded.username)
          return res.status(400).send({ error: 'Invalid token' });
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
      const result = await collection.updateOne({ username: id }, { $set: req.body });
      if (result.modifiedCount === 0) return res.status(400).send({ error: 'No user found' });
      return res.status(200).send({ success: 'User updated', result });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
  return res.status(500).json({ error: 'Invalid method' });
}
