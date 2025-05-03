import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Sidebar from "../components/Sidebar";
import "../styles/index.css";

const COLORS = [
  '#4C91D1',  
  '#6FB9E5',  
  '#56B8C6',  
  '#00A8D4',  
  '#00B2E2',  
  '#00C4F0',  
];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filter, setFilter] = useState("monthly");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses", err);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const now = new Date();
    const result = expenses.filter((exp) => {
      const expDate = new Date(exp.date);
      if (filter === "daily") return expDate.toDateString() === now.toDateString();
      if (filter === "weekly") {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return expDate >= weekAgo;
      }
      if (filter === "monthly") {
        return (
          expDate.getMonth() === now.getMonth() &&
          expDate.getFullYear() === now.getFullYear()
        );
      }
      if (filter === "year") {
        return expDate.getFullYear() === now.getFullYear();
      }
      if (filter === "3months") {
        const threeMonthsAgo = new Date(now);
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        return expDate >= threeMonthsAgo;
      }
      if (filter === "6months") {
        const sixMonthsAgo = new Date(now);
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        return expDate >= sixMonthsAgo;
      }
      return true;
    });
    setFilteredExpenses(result);
  }, [filter, expenses]);

  const categoryData = Object.entries(
    filteredExpenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const monthData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString("default", { month: "short" });
    const total = expenses
      .filter((e) => new Date(e.date).getMonth() === i)
      .reduce((sum, e) => sum + e.amount, 0);
    return { month, total };
  });

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <Sidebar />
      <div
        className="dashboard-content"
        style={{ flexGrow: 1, padding: "20px" }}
      >
        <h2>Dashboard</h2>

        <div className="filters" style={{ marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
          <label style={{ color: "black", fontSize: "1rem" }}>Filter by time:</label>
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            style={{
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="year">This Year</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
          </select>
        </div>

        <div
          className="charts-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "20px",
          }}
        >
          <div className="chart-card">
            <h3>Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Monthly Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#56B8C6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Expense Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={filteredExpenses.map((e) => ({
                  date: new Date(e.date).toLocaleDateString(),
                  amount: e.amount,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#56B8C6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Spending Pattern</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={filteredExpenses.map((e) => ({
                  date: new Date(e.date).toLocaleDateString(),
                  amount: e.amount,
                }))}
              >
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#56B8C6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#56B8C6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#56B8C6"
                  fillOpacity={1}
                  fill="url(#colorAmt)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
