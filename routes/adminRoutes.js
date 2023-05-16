import express from "express";
import { getAllUsers, getUser, activateDeactivateUser } from "../controllers/adminController.js"
const aRouter = express.Router();


aRouter.get("/dashboard")
aRouter.get("/users", getAllUsers)
aRouter.get("/users/:id", getUser)
aRouter.patch("/users/:id", activateDeactivateUser)
aRouter.get("/seekers")
aRouter.get("/seeker/:id")
aRouter.get("/employers")
aRouter.get("/employers/:id")
aRouter.get("/jobs")
aRouter.get("/jobs/:id")
aRouter.get("/applications")
aRouter.get("/applications/:id")

export default aRouter
