import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterExpensesByCategory } from "../../store/expensesSlice";
import "./CategoryFilter.css";

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    dispatch(filterExpensesByCategory(category));
  };

  return (
    <div className="category-filter">
      <label htmlFor="category-filter">Filter by Category:</label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={handleFilterChange}>
        <option value="">All</option>
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
  );
};

export default CategoryFilter;
