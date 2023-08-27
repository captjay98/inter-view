import User from "../models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRET;

export const requireAccountType = (accountType) => {
  /* Checks if the User is allowed to access a route*/
  return async (req, res, next) => {
    const user = await User.findOne({ _id: req.user });
    console.log("Account Owner:-", user);

    if (user && user.account_type === accountType) {
      next();
    } else {
      res.status(403).json({ Forbidden: `Only ${accountType} can access this route` });
    }
  };
};

export const getCurrentUser = (req, res, next) => {
  /*Gets and Sets the currently Authenticated User*/
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, secret);
    console.log("DecodedToken:", decodedToken);
    req.user = decodedToken.userId;
    console.log("Req.user:", req.user);
    next();
  } catch (error) {
    console.log(error);

    return next();
  }
};
