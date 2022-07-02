import { serialize } from 'cookie';

export default async function handler(req, res) {
  try {
    res.setHeader('Set-Cookie', serialize('jwtToken', 'ghgfhgf', { maxAge: -1, path: '/' }));
    res.setHeader('Set-Cookie', serialize('expiresIn', 'hgfhfgh', { maxAge: -1, path: '/' }));
    return res.status(200).json({ message: 'logout success' });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}
