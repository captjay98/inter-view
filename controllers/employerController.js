import { geocoder } from "../middleware/geocoder.js"
import { userEmployerSchema, filterFields } from "../middleware/validators.js"
import models from "../models/employers.js";
const { Employer, Job, JobApplication } = models;
import User from "../models/users.js"


const getUserAndEmployer = async (req) => {
  const user = req.user;
  if (!user) {
    throw new Error("User not found");
  }
  const employer = await Employer.findOne({ user: user });
  if (!employer) {
    throw new Error("Employer not found");
  }
  return { user, employer };
};


export const getDashboard = async (req, res) => {
  try {
    const { employer } = await getUserAndEmployer(req);
    const user = await User.findById(employer.user);
    return res.status(200).json({ employer, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const updateDashboard = async (req, res) => {
  try {
    const { employer } = await getUserAndEmployer(req);

    const validation = userEmployerSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const updateFields = filterFields(validation.value);

    const updatedUser = await User.findByIdAndUpdate(
      employer.user,
      updateFields,
      { new: true }
    );

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { employer } = await getUserAndEmployer(req);
    const jobs = await Job.find({ employer: employer._id });
    return res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid employer ID' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const createJob = async (req, res) => {
  try {
    const { employer } = await getUserAndEmployer(req);
    const { title, description, salary, required_skills, city } = req.body;

    // Geocode the city to get the latitude and longitude
    const result = await geocoder.geocode(city);

    if (!result || !result[0]) {
      return res.status(400).json({ message: "Invalid city" });
    }

    const latitude = result[0].latitude;
    const longitude = result[0].longitude;

    // Create the job
    const job = new Job({
      employer: employer._id,
      title,
      description,
      salary,
      required_skills,
      city,
      location: {
        type: "Point",
        coordinates: [longitude, latitude]
      }
    });

    await job.save();
    return res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('required_skills', 'name');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const updateJob = async (req, res) => {
  try {
    const { employer } = await getUserAndEmployer(req);
    const job = await Job.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      required_skills: req.body.required_skills,
      city: req.body.city,
      location: req.body.location,
    }, { new: true }).populate('required_skills', 'name');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.employer.toString() !== employer._id.toString()) {
      return res.status(401).json({ message: 'You are not authorized to update this job' });
    }

    return res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const getApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const applications = await JobApplication.find({ job: job._id }).populate('seeker', '-password');
    return res.status(200).json({ applications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id).populate('job', 'title').populate('seeker', '-password');
    if (!jobApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    return res.status(200).json({ jobApplication });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { status } = req.body;
    const jobApplication = await JobApplication.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!jobApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    return res.status(200).json({ jobApplication });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

