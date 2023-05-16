import { upload } from "../middleware/multer.js";
import express from "express";
import {
  getDashboard, updateDashboard, getJobs, getJob,
  getApplications, jobApplication
} from "../controllers/seekerController.js"
const sRouter = express.Router();

sRouter.get("/dashboard", getDashboard)
sRouter.patch("/dashboard", upload, updateDashboard)
sRouter.get("/jobs", getJobs)
sRouter.get("/jobs/:id", getJob)
sRouter.get("/applications", getApplications)
sRouter.post("/jobs/:id/apply", jobApplication)

export default sRouter;
