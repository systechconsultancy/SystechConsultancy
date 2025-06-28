import express from "express";
import { getQrByAmount } from "../controllers/paymentQrController.js";

const router = express.Router();
router.get("/:amount", getQrByAmount);
export default router;