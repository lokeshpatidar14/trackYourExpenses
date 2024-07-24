import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import SignUpPage from "./components/SignUpPage";
import UserProfile from "./pages/UserProfile";
import HomePage from "./pages/Home";
import MainNavigation from "./components/MainNavigation";
import Contact from "./pages/Contact";
import AddExpenses from "./components/Expenses/AddExpenses";
import Expenses from "./components/Expenses/Expenses";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <MainNavigation />
      <Container className="mt-3">
        <Row>
          <Col>
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
                element={isLoggedIn ? <Expenses /> : <Navigate to="/auth" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
