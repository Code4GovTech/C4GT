import express from 'express';
import { getUser, loginUser, logoutUser, registerUser } from '../controllers/auth.controllers.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// verify jwt middleware
router.route('/logout').post(verifyJwt, logoutUser);
router.route('/get-user').get(verifyJwt, getUser);

export default router;