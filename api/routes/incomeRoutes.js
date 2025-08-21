import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  addIncome,
  deleteIncome,
  getAllIncome,
  getExcelFile,
} from "../controllers/incomeControllers.js";

const router = express.Router();

router.post("/addIncome", protect, addIncome);
router.get("/getIncome", protect, getAllIncome);
router.get("/getExcelFile", protect, getExcelFile);
router.delete("/:id", protect, deleteIncome);
export default router;
