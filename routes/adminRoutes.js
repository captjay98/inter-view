import express from "express";
import {
  getAllUsers, getUser, activateDeactivateUser,
  getEmployers, getEmployer, getSeekers, getSeeker,
  getJobs, getJob, getApplications, getApplication,
  createSkill, getSkills, deleteSkill,
  createFaq, getFaqs, getFaq, updateFaq, deleteFaq,
  createArticle, getArticles, getArticle, updateArticle,
  deleteArticle, createInterviewHelp, getInterviewHelps,
  getInterviewHelp, updateInterviewHelp, deleteInterviewHelp,

} from "../controllers/adminController.js"
const aRouter = express.Router();


aRouter.get("/dashboard")
aRouter.get("/users", getAllUsers)
aRouter.get("/users/:id", getUser)
aRouter.patch("/users/:id", activateDeactivateUser)

aRouter.get("/employers", getEmployers)
aRouter.get("/employers/:id", getEmployer)

aRouter.get("/seekers", getSeekers)
aRouter.get("/seekers/:id", getSeeker)

aRouter.get("/jobs", getJobs)
aRouter.get("/jobs/:id", getJob)

aRouter.get("/applications", getApplications)
aRouter.get("/applications/:id", getApplication)

aRouter.post("/skills", createSkill)
aRouter.get("/skills", getSkills)
aRouter.delete("/skills/:id", deleteSkill)

aRouter.post("/faq", createFaq);
aRouter.get("/faq", getFaqs);
aRouter.get("/faq/:id", getFaq);
aRouter.put("/faq/:id", updateFaq);
aRouter.delete("/faq/:id", deleteFaq);

aRouter.post("/interview-help", createInterviewHelp);
aRouter.get("/interview-help", getInterviewHelps);
aRouter.get("/interview-help/:id", getInterviewHelp);
aRouter.put("/interview-help/:id", updateInterviewHelp);
aRouter.delete("/interview-help/:id", deleteInterviewHelp);

aRouter.post("/article", createArticle);
aRouter.get("/article", getArticles);
aRouter.get("/article/:id", getArticle);
aRouter.put("/article/:id", updateArticle);
aRouter.delete("/article/:id", deleteArticle);

export default aRouter
