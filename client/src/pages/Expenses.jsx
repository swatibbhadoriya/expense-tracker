import React, { useState, useEffect } from "react";
import "../styles/index.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const initialFormState = {
  amount: "",
  description: "",
  category: "",
  date: "",
};

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch expenses on load
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/expenses");
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { amount, category, date } = formData;

    if (!amount || !category || !date) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/expenses/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/expenses", formData);
      }

      setFormData(initialFormState);
      setIsEditing(false);
      setEditId(null);
      fetchExpenses();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (expense) => {
    setFormData(expense);
    setIsEditing(true);
    setEditId(expense._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  return (
    <div className="expenses-container">
      <Sidebar />
      <div className="expenses-content">
        <h2>Manage Expenses</h2>

        <form onSubmit={handleSubmit} className="expense-form">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? "Update" : "Add"} Expense</button>
        </form>

        <div className="expenses-list">
          {expenses.length === 0 ? (
            <p>No expenses added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>₹{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>{expense.description}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleEdit(expense)}>Edit</button>
                      <button onClick={() => handleDelete(expense._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
