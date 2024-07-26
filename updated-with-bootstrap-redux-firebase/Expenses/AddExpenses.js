import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../../store/expensesSlice";
import "./AddExpenses.css";

const AddExpenses = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = {
      id: Math.random().toString(),
      amount: parseFloat(amount),
      description,
      category,
    };

    try {
      const response = await fetch(
        "https://expensetracker-ad68f-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExpense),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save expense");
      }

      dispatch(addExpense(newExpense));
      setAmount("");
      setDescription("");
      setCategory("Food");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isLoggedIn) {
    return <p>Please log in to add expenses.</p>;
  }

  return (
    <div className="add-expenses">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required>
            <option value="Clothing">Clothing</option>
            <option value="Education">Education</option>
            <option value="Food">Food</option>
            <option value="Groceries">Groceries</option>
            <option value="Recharge">Recharge</option>
            <option value="Medicine">Medicine</option>
            <option value="Petrol">Petrol</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpenses;
