import { upload } from "../middleware/multer.js";
import express from "express";
import {
  getDashboard, updateDashboard, getJobs,
  getJob, filterJobs, filterJobsNearby,
  getApplications, jobApplication
} from "../controllers/seekerController.js"
const sRouter = express.Router();

sRouter.get("/dashboard", getDashboard)
sRouter.patch("/dashboard", upload, updateDashboard)

sRouter.get("/jobs", getJobs)
sRouter.get("/jobs/:id", getJob)
sRouter.post("/jobs/:id/apply", jobApplication)

sRouter.get("/jobs/search", filterJobs)
sRouter.get("/jobs/nearby", filterJobsNearby)

sRouter.get("/applications", getApplications)


export default sRouter;
