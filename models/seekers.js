import mongoose from "mongoose";
import User from "./users.js";
import { Skill } from "./core.js"

const { Schema } = mongoose;

const SeekerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  phone: {
    countryCode: { type: String, default: null },
    number: { type: String, default: null }
  },
  city: { type: String, default: null },
  state: { type: String, default: null },
  country: { type: String, default: null },
  dateOfBirth: { type: Date, default: null },
  ethnicity: { type: String, default: null },
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill', default: null }],
  qualifications: [
    {
      title: { type: String, default: null },
      body: { type: String, default: null },
      start: { type: Date, default: null },
      finish: { type: Date, default: null },
    }
  ],
  experience: [
    {
      title: { type: String, default: null },
      body: { type: String, default: null },
      start: { type: Date, default: null },
      finish: { type: Date, default: null },
    }
  ],
  cv: { type: String, default: null },
  passport: { type: String, default: null },
  visas: [{ type: String, default: null }],
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
  }
});


SeekerSchema.index({ location: '2dsphere' });
export default mongoose.model('Seeker', SeekerSchema);

