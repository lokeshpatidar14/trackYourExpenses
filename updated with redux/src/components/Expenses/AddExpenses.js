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
  const expenses = useSelector((state) => state.expenses.expenses);
  const premiumActivated = useSelector(
    (state) => state.expenses.premiumActivated
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Math.random().toString(),
      amount: parseFloat(amount),
      description,
      category,
    };
    dispatch(addExpense(newExpense));
    setAmount("");
    setDescription("");
    setCategory("Food");
  };

  if (!isLoggedIn) {
    return <p>Please log in to add expenses.</p>;
  }

  return (
    <div className="add-expenses-container">
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
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <button className="btn-btn" type="submit">
          Add Expense
        </button>
      </form>
      <div className="expenses-list">
        <h2>Expenses:</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.amount} - {expense.description} ({expense.category})
            </li>
          ))}
        </ul>
      </div>
      {premiumActivated && (
        <button className="btn-btn">Activate Premium</button>
      )}
    </div>
  );
};

export default AddExpenses;
