import mongoose from "mongoose";
import User from "./users.js"

const { Schema } = mongoose

const EmployerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // company: {type: String, deafult: null}
});


const JobSchema = new Schema({
  employer: { type: Schema.Types.ObjectId, ref: "Employer", required: true },

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },

  required_skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],

  city: {
    type: String,
    required: true
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      default: null
    }
  },

  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: 'JobApplication'
    }
  ]
});


const JobApplicationSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  },
  seeker: {
    type: Schema.Types.ObjectId,
    ref: 'SeekerProfile'
  },
  status: {
    type: String,
    enum: ['applied', 'interviewed', 'rejected', 'hired'],
    default: 'applied'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  }
});

EmployerSchema.index({ location: '2dsphere' });
const Employer = mongoose.model("Employer", EmployerSchema);
const Job = mongoose.model("Job", JobSchema)
const JobApplication = mongoose.model("JobApplication", JobApplicationSchema)

export default {
  Employer,
  Job,
  JobApplication,
};

