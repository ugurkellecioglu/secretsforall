import { ObjectId as objectId } from 'mongodb';
import checkUser from '../../../helpers/checkUser';
import mongoDB from '../../../helpers/MongoDB';
export default async function handler(req, res) {
  try {
    // eslint-disable-next-line no-var
    var decoded = await checkUser(req.headers.authorization);
  } catch (error) {
    return res.status(401).json({
      error: error.message
    });
  }

  const collection = await mongoDB.getCollection('USERS');
  if (req.method === 'GET') {
    if (req.query.id) {
      try {
        const result = await collection.findOne({ username: req.query.id });

        if (!result) return res.status(400).json({ Message: 'User not found.' });
        // eslint-disable-next-line no-unused-vars
        const { password, ...rest } = result;
        return res.status(200).json({ ...rest });
      } catch (error) {
        return res.status(500).json({ error: error.toString() });
      }
    } else {
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
}
