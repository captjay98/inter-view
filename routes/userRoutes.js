import express from "express";

import {  userRegister, userLogin  } from "../controllers/userController.js"
const uRouter = express.Router();

uRouter.post("/register",userRegister);
uRouter.post("/login", userLogin);

export default uRouter;

