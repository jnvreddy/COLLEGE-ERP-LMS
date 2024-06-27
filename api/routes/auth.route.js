<<<<<<< HEAD
import express from 'express';
import { login, signup, signout } from '../controllers/auth.controller.js';
=======
//api/routes/auth.route.js
import express from 'express';
import { login, signup, signout, } from '../controllers/auth.controller.js';
>>>>>>> b57ab5b (admin home page and funcunality to add users by admin in progress)

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/signout', signout);

export default router;
