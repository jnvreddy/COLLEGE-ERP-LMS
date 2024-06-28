

//api/controllers/auth.controller.js
import User from '../models/user.model.js';
import StudentModel from '../models/student.model.js';
import FacultyModel from '../models/faculty.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

/*export const signup = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, role });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};*/

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    let validUser = await User.findOne({ email });
    let role = 'admin'; // Default role
    
    if (!validUser) {
      validUser = await StudentModel.findOne({ email });
      role = 'student';
    }
    
    if (!validUser) {
      validUser = await FacultyModel.findOne({ email });
      role = 'faculty';
    }
    
    if (!validUser) return next(errorHandler(404, 'User not found'));
    
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));
    
    const token = jwt.sign({ id: validUser._id, role }, process.env.JWT_SECRET);
    
    const { password: hashedPassword, ...rest } = validUser._doc; // Exclude password
    
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate, sameSite: 'None', secure: true }) // Set SameSite and Secure attributes
      .status(200)
      .json({ ...rest, role }); // Include role in the response
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};
