
import express from 'express';
import { addFaculty,addStudent,deleteFacultyByEmail,deleteStudentByEmail } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/addstudent', addStudent);
router.post('/addfaculty', addFaculty);


export default router;