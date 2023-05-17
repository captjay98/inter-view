import express from "express";
import {
  getSkills, getSkill,
  getIndustries, getIndustry,
  getFaqs, getFaq,
  getArticles, getArticle,
  getInterviewHelps, getInterviewHelp
} from "../controllers/coreController.js"
const cRouter = express.Router()


cRouter.get("/skills", getSkills)
cRouter.get("/skills/:id", getSkill)

cRouter.get("/industries", getIndustries)
cRouter.get("/industries/:id", getIndustry)

cRouter.get("/faq", getFaqs)
cRouter.get("/faq/:id", getFaq)

cRouter.get("/articles", getArticles)
cRouter.get("/articles/:id", getArticle)

cRouter.get("/interviewhelp", getInterviewHelps)
cRouter.get("/interviewhelp/:id", getInterviewHelp)


export default cRouter;

