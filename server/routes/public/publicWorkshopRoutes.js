import express from "express";
import { getPublicWorkshops, getPublicWorkshopBySlug } from "../../controllers/public/publicWorkshopController.js";

const router = express.Router();

router.get("/", getPublicWorkshops);
router.get("/:slug", getPublicWorkshopBySlug);

export default router;