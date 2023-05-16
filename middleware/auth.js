import User from "../models/users.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = "HelloWorld55";


export const requireAccountType = (accountType) => {
  return async (req, res, next) => {

    const user = await User.findOne({ _id: req.user })
    console.log(user)

    if (user && user.account_type === accountType) {
      next();
    } else {
      res.status(403).json({ "Forbidden": `Only ${accountType} can access this route` });
    }
  };
}


export const getCurrentUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, secret);
    console.log('decodedToken:', decodedToken);
    req.user = decodedToken.userId;
    console.log('req.user:', req.user);
    next();
  } catch (error) {
    console.log(error)

    return next();
  }
};
