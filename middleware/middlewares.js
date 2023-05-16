import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = "HelloWorld55";


const getCurrentUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // continue without setting req.user
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, secret);
    console.log('decodedToken:', decodedToken); // add logging statement
    req.user = decodedToken.userId;
    console.log('req.user:', req.user); // add logging statement
    next();
  } catch (error) {
    console.log(error)

    return next(); // continue without setting req.user
  }
};

export default getCurrentUser;


function requireRole(role) {
  return function(req, res, next) {
    if (req.user && req.user.account_type === role) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  }
}
