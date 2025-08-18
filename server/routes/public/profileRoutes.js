import express from 'express';
import { protectUser } from '../../middleware/userAuthMiddleware.js';
import { getUserProfile, updateUserProfile } from '../../controllers/public/userProfileController.js';

const router = express.Router();

// Protect both routes in this file
router.use(protectUser);

router.route('/')
  .get(getUserProfile)
  .put(updateUserProfile);

export default router;