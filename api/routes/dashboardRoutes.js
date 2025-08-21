import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { dashboardData } from "../controllers/dashboardControllers.js";

const router = express.Router();

router.get("/", protect, dashboardData);

export default router;
