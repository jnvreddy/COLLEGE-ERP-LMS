import FacultyModel from '../models/faculty.model.js';
import StudentModel from '../models/student.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Add Student
export const addStudent = async (req, res, next) => {
    const { studentFullName, studentRegisterNumber, studentPhoneNumber, studentEmail, studentDepartment, studentYear, studentSemester, password } = req.body;
  
      const hashedPassword = bcryptjs.hashSync(password, 10); // Hash the provided password
      const newStudent = new StudentModel({
        username: studentFullName,
        registernumber: studentRegisterNumber,
        email: studentEmail,
        phoneNumber: studentPhoneNumber,
        department: studentDepartment,
        year: studentYear,
        semester: studentSemester,
        password: hashedPassword,
      });
      try {
      await newStudent.save();
      res.status(201).json({ message: 'Student added successfully' });
    } catch (error) {
      next(error);
    }
  };
  
  
  // Add Faculty
  export const addFaculty = async (req, res, next) => {
    const { facultyFullName, facultyid, facultyPhoneNumber, facultyEmail, facultyDepartment, password } = req.body;
   
      const hashedPassword = bcryptjs.hashSync(password, 10); // Hash the provided password
      const newFaculty = new FacultyModel({
        username: facultyFullName,
        facultyid,
        phoneNumber: facultyPhoneNumber,
        email: facultyEmail,
        department: facultyDepartment,
        password: hashedPassword,
      });
      try {
      await newFaculty.save();
      res.status(201).json({ message: 'Faculty added successfully' });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteUserByEmail = async (req, res, next) => {
    const { email, role } = req.body;
  
    try {
      let deletedUser;
      if (role === 'student') {
        deletedUser = await StudentModel.findOneAndDelete({ email });
      } else if (role === 'faculty') {
        deletedUser = await FacultyModel.findOneAndDelete({ email });
      } else {
        return res.status(400).json({ message: 'Invalid role specified' });
      }
  
      if (!deletedUser) {
        return res.status(404).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });
      }
  
      res.status(200).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} deleted successfully` });
    } catch (error) {
      next(error);
    }
  };
  