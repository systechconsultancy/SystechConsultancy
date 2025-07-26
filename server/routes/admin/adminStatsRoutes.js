import express from 'express';
import { protect, authorize } from '../../middleware/authMiddleware.js';
import { getMonthlyStats } from '../../controllers/admin/adminStatsController.js';

const router = express.Router();
router.use(protect, authorize('admin', 'superadmin'));

router.get('/monthly', getMonthlyStats);

export default router;