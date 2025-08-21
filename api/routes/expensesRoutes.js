import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  addExpense,
  deleteExpense,
  getAllExpenses,
  getExcelFileExpenses,
} from "../controllers/expensesController.js";

const router = express.Router();

router.post("/addExpenses", protect, addExpense);
router.get("/getExpenses", protect, getAllExpenses);
router.get("/getExcelFileExpenses", protect, getExcelFileExpenses);
router.delete("/:id", protect, deleteExpense);
export default router;
