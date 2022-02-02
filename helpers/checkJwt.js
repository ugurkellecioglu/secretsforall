import jwt from 'jsonwebtoken';
const checkJwt = (token) => {
  return jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return err;
    } else {
      return decoded;
    }
  });
};

export default checkJwt;
