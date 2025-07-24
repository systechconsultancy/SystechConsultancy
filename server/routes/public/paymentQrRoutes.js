import express from "express";
import { getQrByAmount } from "../../controllers/public/paymentQrController.js";

const router = express.Router();
router.get("/:amount", getQrByAmount);
export default router;