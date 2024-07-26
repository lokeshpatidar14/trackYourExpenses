import React from "react";
import AddExpenses from "./AddExpenses";
import ExpensesList from "./ExpensesList";
import CategoryFilter from "./CategoryFilter";
import "./Expenses.css";

const Expenses = () => {
  return (
    <div className="expenses-container">
      <AddExpenses />
      <CategoryFilter />
      <ExpensesList />
    </div>
  );
};

export default Expenses;
