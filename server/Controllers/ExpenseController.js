const Expense = require("../Models/ExpenseModel");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { title, amount, date } = req.body;
    const newExpense = new Expense({ title, amount, date });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "Error creating expense" });
  }
};
