import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import UserProfile from "./pages/UserProfile";
import HomePage from "./pages/Home";
import { useSelector } from "react-redux";
import MainNavigation from "./components/MainNavigation";
import Contact from "./pages/Contact";
import AddExpenses from "./components/Expenses/AddExpenses";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!isLoggedIn && <Route path="/auth" element={<SignUpPage />} />}
        <Route
          path="/profile"
          element={isLoggedIn ? <UserProfile /> : <Navigate to="/auth" />}
        />
        <Route
          path="/contact"
          element={isLoggedIn ? <Contact /> : <Navigate to="/auth" />}
        />
        <Route
          path="/expenses"
          element={isLoggedIn ? <AddExpenses /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
