import { serialize } from 'cookie';
import mongoDB from '../../helpers/MongoDB';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

export default async function handler(req, res) {
  // if method is not post
  if (req.method !== 'POST') return;
  // get the body
  const body = req.body;
  // get the username and password
  const { username, password } = body;
  // if username or password is not present
  if (!username || !password) {
    res.status(400).json({ error: 'username and password are required' });
    return;
  }
  const collection = await mongoDB.getCollection('USERS');
  // find the user
  try {
    const user = await collection.findOne({ username });
    // if user is not found
    if (!user) {
      res.status(400).json({ error: 'user not found' });
      return;
    }
    // if password is not correct
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(400).json({ error: 'password is not correct' });
      return;
    }
    // if everything is correct
    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: '1h'
    });
    res.setHeader('Set-Cookie', serialize('jwtToken', token, { httpOnly: true }));
    return res.status(200).json({ username: user.username, jwtToken: token, expires_in: 60 });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}
