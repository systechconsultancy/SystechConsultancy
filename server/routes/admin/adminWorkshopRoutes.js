import express from 'express';
import { protect, authorize } from '../../middleware/authMiddleware.js';
import { 
    getAllWorkshops, 
    createWorkshop, 
    getWorkshopById, 
    updateWorkshop, 
    deleteWorkshop 
} from '../../controllers/admin/adminWorkshopController.js';

const router = express.Router();

// Apply authentication middleware to all routes in this file
router.use(protect);

// Routes for the collection of workshops ( /api/admin/workshops )
router.route('/')
  .get(getAllWorkshops) // Anyone logged in can get all workshops
  .post(authorize('admin', 'superadmin'), createWorkshop); // Only admin or superadmin can create

// Routes for a single workshop ( /api/admin/workshops/:id )
router.route('/:id')
  .get(getWorkshopById) // Anyone logged in can get a single workshop
  .put(authorize('admin', 'superadmin'), updateWorkshop) // Only admin or superadmin can update
  .delete(authorize('superadmin'), deleteWorkshop); // Only superadmin can delete

export default router;