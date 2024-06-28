
import express from 'express';
import { addFaculty,addStudent,deleteUserByEmail} from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/addStudent', addStudent);
router.post('/addFaculty', addFaculty);
router.delete('/delete-user', deleteUserByEmail);



export default router;