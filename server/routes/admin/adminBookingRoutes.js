import express from 'express';
import { protect, authorize } from '../../middleware/authMiddleware.js';
import { getTodaysBookings, getBookingHistory  } from '../../controllers/admin/adminBookingController.js';

const router = express.Router();
router.use(protect, authorize('admin', 'superadmin')); // Protect all routes in this file

router.get('/history', getBookingHistory);
router.get('/today', getTodaysBookings);

export default router;