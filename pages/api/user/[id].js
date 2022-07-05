import checkUser from '../../../helpers/checkUser';
import mongoDB from '../../../helpers/MongoDB';
export default async function handler(req, res) {
  const usersCollection = await mongoDB.getCollection('USERS');
  if (req.method === 'GET') {
    try {
      // eslint-disable-next-line no-var
      var decoded = await checkUser(req.headers.authorization);
    } catch (error) {
      return res.status(401).json({
        error: error.message
      });
    }
    if (req.query.id) {
      try {
        const result = await usersCollection.findOne({ username: req.query.id });
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
      const result = await usersCollection.updateOne({ username: id }, { $set: req.body });
      if (result.modifiedCount === 0) return res.status(400).send({ error: 'No user found' });
      return res.status(200).send({ success: 'User updated', result });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
  return res.status(500).json({ error: 'Invalid method' });
}
