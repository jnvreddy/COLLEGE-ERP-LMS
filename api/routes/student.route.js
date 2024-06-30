import express from 'express';
import { getStudentsByYear } from '../controllers/student.controller.js';

const router = express.Router();

router.get('/year/:year', getStudentsByYear);

export default router;
