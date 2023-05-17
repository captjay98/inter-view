import { Skill, Faq, Article, InterviewHelp } from "../models/core.js"
import Admin from "../models/admin.js"
import User from "../models/users.js"
import Seeker from "../models/seekers.js"
import { Employer, Job, JobApplication } from "../models/employers.js";





const adminDashboard = (req, res) => {

}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}


export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};






export const activateDeactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(id, { isActive });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};






export const getEmployers = async (req, res) => {
  try {
    const employers = await Employer.find().populate('user', '-password');
    return res.status(200).json(employers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getEmployer = async (req, res) => {
  try {
    const id = req.params.id;
    const employer = await Employer.findById(id).populate('user', '-password');
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    return res.status(200).json(employer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





export const getSeekers = async (req, res) => {
  try {
    const seekers = await Seeker.find().populate('user', '-password');
    return res.status(200).json(seekers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getSeeker = async (req, res) => {
  try {
    const id = req.params.id;
    const seeker = await Seeker.findById(id).populate('user', '-password');
    if (!seeker) {
      return res.status(404).json({ message: 'Seeker not found' });
    }
    return res.status(200).json(seeker);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate({
      path: 'employer',
      populate: {
        path: 'user',
        model: 'User',
        select: '-password'
      }
    });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getJob = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id).populate({
      path: 'employer',
      populate: {
        path: 'user',
        model: 'User',
        select: '-password'
      }
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.status(200).json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





export const getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().populate({
      path: 'job',
      populate: {
        path: 'employer',
        populate: {
          path: 'user',
          model: 'User'
        }
      }
    }).populate({
      path: 'seeker',
      populate: {
        path: 'user',
        model: 'User'
      }
    });

    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getApplication = async (req, res) => {
  try {
    const id = req.params.id;
    const application = await JobApplication.findById(id).populate({
      path: 'job',
      populate: {
        path: 'employer',
        populate: {
          path: 'user',
          model: 'User'
        }
      }
    }).populate({
      path: 'seeker',
      populate: {
        path: 'user',
        model: 'User'
      }
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.status(200).json(application);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





export const createSkill = async (req, res) => {
  try {
    const { name } = req.body;
    const skill = await Skill.create({ name });
    return res.status(201).json(skill);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    return res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getSkill = async (req, res) => {
  try {
    const id = req.params.id;
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    return res.status(200).json(skill);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteSkill = async (req, res) => {
  try {
    const id = req.params.id;
    await Skill.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





export const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = await Faq.create({ question, answer });
    return res.status(201).json(faq);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faa.find();
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


export const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const faq = await Faq.findByIdAndUpdate(id, { question, answer }, { new: true });
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    return res.status(200).json(faq);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findByIdAndDelete(id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    return res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





export const createArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const article = await Article.create({ title, content, author });
    return res.status(201).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
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
  const id = req.params.id;

  try {
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


export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const article = await Article.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    return res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    return res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





export const createInterviewHelp = async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const interviewTip = await InterviewHelp.create({ title, description, author });
    return res.status(201).json(interviewTip);
  } catch (error) {
    console.error(error);


    return res.status(500).json({ message: 'Internal server error' });
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
    const interviewHelp = await InterviewHelp.findById(id).populate("author", "-password");

    if (!interviewHelp) {
      return res.status(404).json({ message: "Interview Help not found" });
    }

    res.status(200).json(interviewHelp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateInterviewHelp = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const interviewTip = await InterviewHelp.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!interviewTip) {
      return res.status(404).json({ message: 'Interview Tip not found' });
    }
    return res.status(200).json(interviewTip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteInterviewHelp = async (req, res) => {
  try {
    const { id } = req.params;
    const interviewTip = await InterviewHelp.findByIdAndDelete(id);
    if (!interviewTip) {
      return res.status(404).json({ message: 'Interview Tip not found' });
    }
    return res.status(200).json({ message: 'Interview Tip deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
