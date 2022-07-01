const bcrypt = require('bcryptjs');
const saltRounds = 10;
import mongoDB from '../../helpers/MongoDB';
export default async function handler(req, res) {
  const db = await mongoDB.getDB(mongoDB.dbNames.SECRETSFORALL);
  const collection = db.collection(mongoDB.collections.USERS);
  if (req.method === 'POST') {
    const body = req.body;
    const { username, password, profilePic } = body;
    if (!username || !password || !profilePic) {
      throw new Error('Missing username, password or profilePic');
    }
    const user = { username, password, profilePic, tags: [] };
    const isUserFound = await collection.findOne({ username });
    if (isUserFound) return res.status(400).json({ Message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    try {
      const result = await collection.insertOne(user);
      return res.status(200).json({ Message: 'User created successfully', result });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
}
