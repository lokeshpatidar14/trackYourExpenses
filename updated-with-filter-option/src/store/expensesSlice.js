import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  expenses: [],
  filteredExpenses: [],
  totalAmount: 0,
  premiumActivated: false,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
      state.filteredExpenses = action.payload;
      state.totalAmount = action.payload.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      state.premiumActivated = state.totalAmount > 10000;
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.filteredExpenses.push(action.payload);
      state.totalAmount += action.payload.amount;
      state.premiumActivated = state.totalAmount > 10000;
    },
    removeExpense(state, action) {
      const id = action.payload;
      const expense = state.expenses.find((exp) => exp.id === id);
      state.expenses = state.expenses.filter((exp) => exp.id !== id);
      state.filteredExpenses = state.filteredExpenses.filter(
        (exp) => exp.id !== id
      );
      state.totalAmount -= expense.amount;
      state.premiumActivated = state.totalAmount > 10000;
    },
    filterExpensesByCategory(state, action) {
      const category = action.payload;
      if (category) {
        state.filteredExpenses = state.expenses.filter(
          (expense) => expense.category === category
        );
      } else {
        state.filteredExpenses = state.expenses;
      }
    },
  },
});

export const {
  setExpenses,
  addExpense,
  removeExpense,
  filterExpensesByCategory,
} = expensesSlice.actions;
export default expensesSlice.reducer;
