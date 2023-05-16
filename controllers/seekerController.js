import { geocoder } from "../middleware/geocoder.js";
import { upload } from "../middleware/multer.js";
import { userSeekerSchema, filterFields } from "../middleware/validators.js"
import User from "../models/users.js"
import Seeker from "../models/seekers.js";
import models from "../models/employers.js";
const { Job, JobApplication } = models;



const getUserAndSeeker = async (req) => {
  const user = req.user
  if (!user) {
    throw new Error("User not found")
  }
  const seeker = await Seeker.findOne({ user: user })
  if (!seeker) {
    return res.status(404).json({ message: 'Seeker not found' });
  }
  return { user, seeker }
}


export const getDashboard = async (req, res) => {
  try {
    const { seeker } = await getUserAndSeeker(req)
    const user = await User.findById(seeker.user).select("-password ");
    return res.status(200).json({ user, seeker });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const updateDashboard = async (req, res) => {
  try {
    const {
      firstname, lastname, username, email,
      phone, city, state, country, dateOfBirth, ethnicity,
      skills, qualifications, experience, cv, passport, visas
    } = req.body;

    const validation = userSeekerSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    let { user, seeker } = {};
    try {
      ({ user, seeker } = await getUserAndSeeker(req));
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: user }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email is already taken" });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    const seekerUpdateFields = filterFields({
      phone, state, country,
      dateOfBirth, ethnicity, skills,
      qualifications, experience
    });

    if (req.files) {
      if (req.files.cv) {
        seekerUpdateFields.cv = req.files.cv[0].path;
      }
      if (req.files.passport) {
        seekerUpdateFields.passport = req.files.passport[0].path;
      }
      if (req.files.visas) {
        seekerUpdateFields.visas = req.files.visas.map(file => file.path);
      }
    }

    if (city) {
      const result = await geocoder.geocode(city);

      if (!result || !result[0]) {
        return res.status(400).json({ message: "Invalid city" });
      }

      const location = {
        type: "Point",
        coordinates: [result[0].longitude, result[0].latitude]
      };

      seekerUpdateFields.city = city;
      seekerUpdateFields.location = location;
    }

    const userUpdateFields = filterFields({
      firstname, lastname, username, email
    });

    const updatedUser = await User.findByIdAndUpdate(seeker.user, userUpdateFields, { new: true });
    const updatedSeeker = await Seeker.findOneAndUpdate({ user: user }, seekerUpdateFields, { new: true })

    return res.status(200).json({ user: updatedUser, seeker: updatedSeeker });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer')
    return res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'company_name');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getApplications = async (req, res) => {
  try {
    const user = req.user; // get the current user
    const applications = await JobApplication.find({ seeker: user }).populate('job', 'title employer location description salary required_skills city')
    return res.status(200).json({ applications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const jobApplication = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    const application = new JobApplication({
      job: job._id,
      seeker: req.user,
    });
    await application.save();
    return res.status(201).json({ appliction: application, message: 'Application submitted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


