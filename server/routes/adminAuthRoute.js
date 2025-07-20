import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/adminAuthController.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.post("/logout", logoutAdmin);


export default router;