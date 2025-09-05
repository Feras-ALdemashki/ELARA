import Income from "../models/income.js";
import xlsx from "xlsx";
// add income
export const addIncome = async (req, res) => {
  try {
    const { category, amount, date, emoji, description } = req.body;

    if (!category || !amount || !date || !description) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const income = new Income({
      // from middleware protected
      user: req.user._id,
      category,
      amount,
      date,
      emoji,
      description,
    });

    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//  Get all income
export const getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
//  Delete income by ID
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      //from middleware protected
      user: req.user._id,
    });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted", income });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getExcelFile = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({
      date: -1,
    });

    const data = incomes.map((i) => ({
      Source: i.source,
      Amount: i.amount,
      Date: i.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Create buffer instead of writing file to disk
    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

    // Send as download
    res.setHeader("Content-Disposition", "attachment; filename=income.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
