import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses, removeExpense } from "../../store/expensesSlice";
import "./ExpensesList.css";

const ExpensesList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const premiumActivated = useSelector((state) => state.expenses.premiumActivated);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://expensetracker-ad68f-default-rtdb.firebaseio.com/expenses.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }

        const data = await response.json();
        const loadedExpenses = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        dispatch(setExpenses(loadedExpenses));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchExpenses();
  }, [dispatch]);

  useEffect(() => {
    if (premiumActivated) {
      document.body.classList.add("premium-theme");
    } else {
      document.body.classList.remove("premium-theme");
    }
  }, [premiumActivated]);

  const handleRemove = async (id) => {
    try {
      await fetch(
        `https://expensetracker-ad68f-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );

      dispatch(removeExpense(id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const downloadCSV = () => {
    const csvContent = [
      ["Amount", "Description", "Category"],
      ...expenses.map(expense => [expense.amount, expense.description, expense.category])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="expenses-list-container">
      <h2>Expenses:</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.amount} - {expense.description} ({expense.category})
            <button onClick={() => handleRemove(expense.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total Amount: {totalAmount}</h3>
      <button onClick={downloadCSV} className="btn-btn">
        Download CSV
      </button>
    </div>
  );
};

export default ExpensesList;
