import Expense from "../models/expenses.js";
import xlsx from "xlsx";

// Add expense
export const addExpense = async (req, res) => {
  try {
    const { category, amount, date, emoji, description } = req.body;

    if (!category || !amount || !date || !description) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const expense = new Expense({
      user: req.user._id, // from middleware protected
      category,
      amount,
      date,
      emoji,
      description,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all expenses
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete expense by ID
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted", expense });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Download Excel file of expenses
export const getExcelFileExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });

    const data = expenses.map((e) => ({
      Category: e.category,
      Amount: e.amount,
      Date: e.date.toISOString().split("T")[0],
      Note: e.note || "",
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");

    // Create buffer instead of writing file to disk
    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

    // Send as download
    res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
