import { Skill, Industry, Faq, Article, InterviewHelp } from "../models/core.js";
import { Job } from "../models/employers.js"



export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getSkill = async (req, res) => {
  try {
    const id = req.params.id;
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};





export const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find();
    return res.status(200).json(industries);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getIndustry = async (req, res) => {
  try {
    const { id } = req.params;
    const industry = await Industry.findById(id);
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }
    return res.status(200).json(industry);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};






export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate({
      path: 'employer',
      populate: {
        path: 'user',
        select: 'firstname lastname username email',
      },
    });

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: 'employer',
      populate: {
        path: 'user',
        select: 'firstname lastname username email ',
      },
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(200).json({ job });
  } catch (error) {
    console.error('Error retrieving job:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getFaq = async (req, res) => {
  try {
    const id = req.params.id;
    const faq = await Faq.findById(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};





export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getInterviewHelps = async (req, res) => {
  try {
    const interviewHelps = await InterviewHelp.find();
    res.status(200).json(interviewHelps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getInterviewHelp = async (req, res) => {
  try {
    const id = req.params.id;
    const interviewHelp = await InterviewHelp.findById(id);
    if (!interviewHelp) {
      return res.status(404).json({ message: "Interview help not found" });
    }
    res.status(200).json(interviewHelp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

