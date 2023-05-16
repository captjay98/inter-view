import express from "express"
import {
  getDashboard, updateDashboard,
  getJobs, createJob, getJob,
  updateJob, getApplications,
  getApplication, updateApplication
} from "../controllers/employerController.js"
const eRouter = express.Router()

eRouter.get("/dashboard", getDashboard)
eRouter.patch("/dashboard", updateDashboard)
eRouter.get("/jobs", getJobs)
eRouter.post("/jobs", createJob)
eRouter.get("/jobs/:id", getJob)
eRouter.patch("/jobs/:id", updateJob)
eRouter.get("/jobs/:id/applications", getApplications)
eRouter.get("/jobs/:id/applications/:id", getApplication)
eRouter.patch("/jobs/:id/appliations/:id", updateApplication)


export default eRouter;
