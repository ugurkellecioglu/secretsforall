import jwt from 'jsonwebtoken';
const checkJwt = (token) => {
  return jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

export default checkJwt;
