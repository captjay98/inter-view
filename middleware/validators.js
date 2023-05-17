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
  phone: Joi.object(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  dateOfBirth: Joi.date(),
  ethnicity: Joi.string(),
  skills: Joi.array().items(Joi.string()),
  qualifications: Joi.array().items(Joi.object()),
  experience: Joi.array(),
  cv: Joi.string(),
  passport: Joi.string(),
  visas: Joi.array().items(Joi.string()),
});



export const createJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  industry: Joi.string().required(),
  salary: Joi.number().required(),
  required_skills: Joi.array().items(Joi.string()).required(),
  city: Joi.string().required(),
});


export const updateJobSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  salary: Joi.number().positive().required(),
  required_skills: Joi.array().items(Joi.string().trim()).required(),
  city: Joi.string().trim().required(),
});


export const filterFields = (fields) => {
  return Object.fromEntries(
    Object.entries(fields).filter(([key, value]) => value !== undefined)
  );
};


