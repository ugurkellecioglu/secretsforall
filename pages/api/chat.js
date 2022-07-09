import mongoDB from '../../helpers/MongoDB';
import checkUser from '../../helpers/checkUser';
export default async (req, res) => {
  const collection = await mongoDB.getCollection('CHAT');
  if (req.method === 'POST') {
    // get message
    const message = req.body;

    try {
      await checkUser(req.headers.authorization);
    } catch (error) {
      return res.status(401).json({
        error: error.message
      });
    }
    try {
      await collection.insertOne(message);
      await res?.socket?.server?.io?.emit('message', message);
      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
  if (req.method === 'GET') {
    // get all messages
    try {
      await checkUser(req.headers.authorization);
    } catch (error) {
      return res.status(401).json({
        error: error.message
      });
    }
    try {
      const messages = await collection.find({}).toArray();
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
};
