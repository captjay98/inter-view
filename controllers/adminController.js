import Admin from "../models/admin.js"
import User from "../models/users.js"


const adminDashboard = (req, rest) => {

}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
  res.status(201).json(users)
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
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



const getEmployers = async (req, res) => {
  const employers = await User.find()
  res.status(201).json(employers)
}

const getApplications = (req, res) => {
  res.status(201).json()
}

const getJobs = (req, res) => {
  res.status(201).json()
}

