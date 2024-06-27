
//api/routes/auth.route.js
import express from 'express';
import { login, signout, } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.get('/signout', signout);

export default router;
