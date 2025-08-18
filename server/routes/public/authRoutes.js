import express from 'express';
import { registerUser, loginUser, logoutUser, refreshToken, forgotPassword, resetPassword } from '../../controllers/public/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;