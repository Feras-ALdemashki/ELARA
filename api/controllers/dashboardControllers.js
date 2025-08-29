import Income from "../models/income.js";
import Expense from "../models/expenses.js";

export const dashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // --- Income ---
    const last60Income = await Income.find({ user: userId })
      .sort({ date: -1 })
      .limit(60);
    const last30Income = await Income.find({ user: userId })
      .sort({ date: -1 })
      .limit(30);
    const last5Income = await Income.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);
    const totalIncomeAgg = await Income.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const allIncome = await Income.find({ user: userId });
    const incomesByCategory = await Income.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$source", total: { $sum: "$amount" } } },
      { $project: { _id: 0, category: "$_id", total: 1 } },
    ]);

    // --- Expenses ---
    const last60Expenses = await Expense.find({ user: userId })
      .sort({ date: -1 })
      .limit(60);
    const last30Expenses = await Expense.find({ user: userId })
      .sort({ date: -1 })
      .limit(30);
    const last5Expenses = await Expense.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);
    const totalExpensesAgg = await Expense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenses = totalExpensesAgg[0]?.total || 0;
    const allExpenses = await Expense.find({ user: userId });
    const expensesByCategory = await Expense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $project: { _id: 0, category: "$_id", total: 1 } },
    ]);

    // Send dashboard data
    res.status(200).json({
      income: {
        last60: last60Income,
        last30: last30Income,
        last5: last5Income,
        total: totalIncome,
        allIncome: allIncome,
        byCategory: incomesByCategory,
      },
      expenses: {
        last60: last60Expenses,
        last30: last30Expenses,
        last5: last5Expenses,
        total: totalExpenses,
        allExpenses: allExpenses,
        byCategory: expensesByCategory,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
