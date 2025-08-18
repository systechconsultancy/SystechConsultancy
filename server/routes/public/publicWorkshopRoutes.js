import express from "express";
import { getPublicWorkshops, getPublicWorkshopBySlug, initiateWorkshopRegistration, confirmWorkshopRegistration, getRegistrationStatus } from "../../controllers/public/publicWorkshopController.js";
import { protectUser } from "../../middleware/userAuthMiddleware.js";

const router = express.Router();

router.get("/", getPublicWorkshops);
router.get("/:slug", getPublicWorkshopBySlug);
router.post('/:id/initiate-registration', protectUser, initiateWorkshopRegistration);
router.post('/:id/confirm-registration', protectUser, confirmWorkshopRegistration);
router.get('/:id/registration-status', protectUser, getRegistrationStatus);

export default router;