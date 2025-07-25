import express from "express";
import { uploadScreenshot, upload } from "../../controllers/public/uploadController.js";

const router = express.Router();

router.post("/upload-screenshot", upload.single("screenshot"), uploadScreenshot);

export default router;
