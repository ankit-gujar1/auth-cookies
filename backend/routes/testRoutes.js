import express from "express";
import { getAllForAdmin, getAllForUser, post } from "../controllers/testController.js";
import { protectUserRoutes } from "../middlewares/protectUserRoutes.js";
import { protectAdminRoutes } from "../middlewares/protectAdminRoutes.js";

const router = express.Router();

router.get('/', protectUserRoutes, getAllForUser);
router.post('/post', protectUserRoutes, post);
router.get('/get', protectAdminRoutes, getAllForAdmin);

export default router;
