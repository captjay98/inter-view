import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { registerSchema, loginSchema } from "../middleware/validators.js"
import User from '../models/users.js';
import Admin from '../models/admin.js';
import Seeker from '../models/seekers.js';
import models from "../models/employers.js";
const { Employer } = models;


const secret = "HelloWorld55";


export const userRegister = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(422).json({ errors: error.details });
    }

    const { firstname, lastname, email, username, password, account_type } = req.body;

    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ firstname, lastname, email, username, password: hashedPassword, account_type });

    if (user.account_type === 'seeker') {
      await Seeker.create({
        user: user._id,
        phone: { countryCode: '', number: '' },
        city: '',
        state: '',
        country: '',
        dateOfBirth: null,
        ethnicity: '',
        skills: [],
        qualifications: [],
        experience: [],
        cv: '',
        passport: '',
        visas: [],
        location: {
          type: 'Point',
          coordinates: [0, 0],
        },
      });
    } else if (user.account_type === 'employer') {
      await Employer.create({ user: user._id });
    } else if (user.account_type === 'admin') {
      await Admin.create({ user: user._id });
    }

    const token = jwt.sign({ userId: user._id }, secret);
    return res.status(201).json({ user, token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const userLogin = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(422).json({ errors: error.details });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign({ userId: user._id }, secret);
    return res.status(200).json({ user, token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

