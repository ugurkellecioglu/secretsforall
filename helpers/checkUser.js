import jwt from 'jsonwebtoken';
const checkUser = async (authorization) => {
  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  } catch (error) {
    throw new Error(error);
  }
};

export default checkUser;
