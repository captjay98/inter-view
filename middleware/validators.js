import Joi from "joi";


export const registerSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
  account_type: Joi.string().valid('seeker', 'employer', 'admin').required(),
});


export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


export const userEmployerSchema = Joi.object({
  firstname: Joi.string().trim(),
  lastname: Joi.string().trim(),
  email: Joi.string().trim().email(),
  username: Joi.string().trim()
});


export const userSeekerSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  username: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  dateOfBirth: Joi.date(),
  ethnicity: Joi.string(),
  skills: Joi.array().items(Joi.string()),
  qualifications: Joi.array().items(Joi.string()),
  experience: Joi.string(),
  cv: Joi.string(),
  passport: Joi.string(),
  visas: Joi.array().items(Joi.string()),
});


export const filterFields = (fields) => {
  return Object.fromEntries(
    Object.entries(fields).filter(([key, value]) => value !== undefined)
  );
};


