import mongo from './client';
const bcrypt = require('bcryptjs');
const saltRounds = 10;

export default async function handler(req, res) {
  mongo('secretsforall', 'users', async (collection) => {
    if (req.method !== 'POST') return;
    const body = req.body;
    const { username, password, profilePic } = body;
    if (!username || !password || !profilePic) {
      throw new Error('Missing username, password or profilePic');
    }
    const user = { username, password, profilePic };
    const isUserFound = await collection.findOne({ username });
    if (isUserFound) return res.status(400).json({ Message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    return collection.insertOne(user, (err, result) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(result);
    });
  });
}
