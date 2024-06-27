import FacultyModel from '../models/faculty.model.js';
import StudentModel from '../models/student.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Add Student
export const addStudent = async (req, res, next) => {
    const { studentFullName, studentRegisterNumber, studentPhoneNumber, studentEmail, studentDepartment, studentYear, studentSemester, password } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10); // Hash the provided password
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
      await newStudent.save();
      res.status(201).json({ message: 'Student added successfully' });
    } catch (error) {
      next(error);
    }
  };
  
  
  // Add Faculty
  export const addFaculty = async (req, res, next) => {
    const { facultyFullName, facultyid, facultyPhoneNumber, facultyEmail, facultyDepartment, password } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10); // Hash the provided password
      const newFaculty = new FacultyModel({
        username: facultyFullName,
        facultyid,
        phoneNumber: facultyPhoneNumber,
        email: facultyEmail,
        department: facultyDepartment,
        password: hashedPassword,
      });
      await newFaculty.save();
      res.status(201).json({ message: 'Faculty added successfully' });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteStudentByEmail = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      const deletedStudent = await StudentModel.findOneAndDelete({ email });
  
      if (!deletedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteFacultyByEmail = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      const deletedFaculty = await FacultyModel.findOneAndDelete({ email });
  
      if (!deletedFaculty) {
        return res.status(404).json({ message: 'Faculty not found' });
      }
  
      res.status(200).json({ message: 'Faculty deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
  