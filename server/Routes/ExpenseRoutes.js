const express = require("express");
const router = express.Router();
const Expense = require("../Models/ExpenseModel");

router.get("/", async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.json(expenses);
});

router.post("/", async (req, res) => {
  const { amount, category, description, date } = req.body;
  const newExpense = new Expense({ amount, category, description, date });
  await newExpense.save();
  res.status(201).json(newExpense);
});

router.put("/:id", async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
