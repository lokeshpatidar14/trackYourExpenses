import React from "react";
import AddExpenses from "./AddExpenses";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";

const Expenses = () => {
  return (
    <div className="expenses-container">
      <AddExpenses />
      <ExpensesList />
    </div>
  );
};

export default Expenses;
