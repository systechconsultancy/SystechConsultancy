import express from "express";
import {
  initiateIndividualBooking,
  confirmIndividualBooking,
  initiateGroupBooking,
  confirmGroupBooking,
} from "../../controllers/public/bookingController.js";

const router = express.Router();

router.post("/individual/initiate", initiateIndividualBooking);
router.post("/individual/confirm", confirmIndividualBooking);

router.post("/group/initiate", initiateGroupBooking);
router.post("/group/confirm", confirmGroupBooking);

export default router;