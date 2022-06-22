import mongo from '../client';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  console.log(req.method);
  if (req.method === 'GET') {
    console.log(req.cookies.jwtToken);
    const token = req.cookies.jwtToken;
    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.log(req.query);
    if (req.query.id) {
      return mongo('secretsforall', 'users', async (collection) => {
        return collection('users').findOne({ username: req.query.id }, (err, result) => {
          if (err && result.username !== decoded.username) return res.status(400).send(err);
          return res.status(200).send({ ...result, ...decoded });
        });
      });
    }
    return res.status(200).json({ error: 'merhaba' });
  }
  return res.status(200).send({ error: 'selma' });
}
