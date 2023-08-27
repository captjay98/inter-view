import { geocodeLocation } from "../middleware/geocoder.js";
import {
  userEmployerSchema,
  createJobSchema,
  updateJobSchema,
  filterFields,
} from "../middleware/validators.js";
import { Employer, Job, JobApplication } from "../models/employers.js";
import User from "../models/users.js";

const getUserAndEmployer = async (req) => {
  const user = req.user;
  if (!user) {
    throw new Error("User not found");
  }
  const employer = await Employer.findOne({ user: user }).populate(
    "user",
    "firstname lastname username email account_type isActive",
  );

  if (!employer) {
    throw new Error("Employer not found");
  }
  return { user, employer };
};

export const getDashboard = async (req, res) => {
  try {
    const { employer } = await getUserAndEmployer(req);
    // const user = await User.findById(employer.user);
    return res.status(200).json({ employer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDashboard = async (req, res) => {
  try {
    const { employer } = await getUserAndEmployer(req);

    const { error, value } = userEmployerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updateFields = filterFields(value);

    const updatedUser = await User.findByIdAndUpdate(employer.user, updateFields, { new: true });

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createJob = async (req, res) => {
  try {
    const { employer } = await getUserAndEmployer(req);
    const { error, value } = createJobSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const filteredFields = filterFields(value);

    const locationCoordinates = await geocodeLocation(city);

    const job = await Job.create({
      employer: employer._id,
      ...filteredFields,
      city: filteredFields.city,
      location: {
        type: "Point",
        coordinates: locationCoordinates,
      },
    });

    return res.status(200).json({ job });
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
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid employer ID" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("required_skills", "name");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { employer } = await getUserAndEmployer(req);

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employer.toString() !== employer._id.toString()) {
      return res.status(401).json({ message: "You are not authorized to update this job" });
    }

    const { error, value } = updateJobSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: validationError.details[0].message });
    }

    const filteredFields = filterFields(value);

    await Job.findByIdAndUpdate(req.params.id, filteredFields, { new: true });

    return res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applications = await JobApplication.find({ job: job._id }).populate(
      "seeker",
      "-password",
    );
    return res.status(200).json({ applications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id)
      .populate("job", "title")
      .populate("seeker", "-password");
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }
    return res.status(200).json({ jobApplication });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { status } = req.body;
    const jobApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }
    return res.status(200).json({ jobApplication });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
