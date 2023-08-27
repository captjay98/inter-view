import { geocodeLocation } from "../middleware/geocoder.js";
import { userSeekerSchema, filterFields } from "../middleware/validators.js";
import User from "../models/users.js";
import Seeker from "../models/seekers.js";
import { Job, JobApplication } from "../models/employers.js";

const getUserAndSeeker = async (req) => {
  const user = req.user;
  if (!user) {
    throw new Error("User not found");
  }
  const seeker = await Seeker.findOne({ user: user }).populate(
    "user",
    "firstname lastname username email account_type isActive",
  );
  if (!seeker) {
    return res.status(404).json({ message: "Seeker not found" });
  }
  return { user, seeker };
};

export const getDashboard = async (req, res) => {
  try {
    const { seeker } = await getUserAndSeeker(req);
    // const user = await User.findById(seeker.user).select("-password ");
    return res.status(200).json({ seeker });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDashboard = async (req, res) => {
  try {
    const { error, value } = userSeekerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    console.log(value);
    console.log(req.body);

    let { user, seeker } = {};
    try {
      ({ user, seeker } = await getUserAndSeeker(req));
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }

    const email = value.email;
    const username = value.username;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: user },
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
      phone: value.phone,
      state: value.state,
      country: value.country,
      dateofBirth: value.dateOfBirth,
      ethnicity: value.ethnicity,
      skills: value.skills,
      qualifications: value.qualifications,
      experience: value.experience,
    });
    console.log(req.files);

    if (req.files) {
      if (req.files.cv) {
        seekerUpdateFields.cv = req.files.cv[0].path;
      }
      if (req.files.passport) {
        seekerUpdateFields.passport = req.files.passport[0].path;
      }
      if (req.files.visas) {
        seekerUpdateFields.visas = req.files.visas.map((file) => file.path);
      }
    }

    if (value.city) {
      const locationCoordinates = await geocodeLocation(value.city);

      const location = {
        type: "Point",
        coordinates: locationCoordinates,
      };

      seekerUpdateFields.city = value.city;
      seekerUpdateFields.location = location;
    }

    const userUpdateFields = filterFields({
      firstname: value.firstname,
      lastname: value.lastname,
      username: value.username,
      email: value.email,
    });

    const updatedUser = await User.findByIdAndUpdate(seeker.user, userUpdateFields, { new: true });
    const updatedSeeker = await Seeker.findOneAndUpdate({ user: user }, seekerUpdateFields, {
      new: true,
    });

    return res.status(200).json({ user: updatedUser, seeker: updatedSeeker });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("employer");
    return res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("employer", "company_name");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const filterJobs = async (req, res) => {
  try {
    const { industry, location } = req.query;
    const filters = {};

    if (industry) {
      filters.industry = industry;
    }

    if (location) {
      filters.location = location;
    }

    const jobs = await Job.find(filters);

    return res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const filterJobsNearby = async (req, res) => {
  try {
    const { latitude, longitude, distance } = req.query;

    const coordinates = [parseFloat(longitude), parseFloat(latitude)];

    const maxDistance = distance ? parseFloat(distance) * 1000 : undefined;

    const jobs = await Job.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates,
          },
          $maxDistance: maxDistance,
        },
      },
    }).populate({
      path: "employer",
      populate: {
        path: "user",
        select: "firstname lastname email",
      },
    });

    return res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getApplications = async (req, res) => {
  try {
    const user = getUserAndSeeker(req);
    const applications = await JobApplication.find({ seeker: user }).populate(
      "job",
      "title employer location description salary required_skills city",
    );
    return res.status(200).json({ applications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const jobApplication = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const application = new JobApplication({
      job: job._id,
      seeker: req.user,
    });
    await application.save();
    return res
      .status(201)
      .json({ appliction: application, message: "Application submitted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
