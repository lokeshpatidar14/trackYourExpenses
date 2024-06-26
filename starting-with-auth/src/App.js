import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import UserProfile from "./pages/UserProfile";
import HomePage from "./pages/Home";
import AuthContext from "./store/auth-context";
import MainNavigation from "./components/MainNavigation";
import Contact from "./pages/Contact";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
    <MainNavigation/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!authCtx.isLoggedIn && (
          <Route path="/auth" element={<SignUpPage />} />
        )}
        <Route 
          path="/profile" 
          element={authCtx.isLoggedIn ? <UserProfile /> : <Navigate to="/auth" />} 
        />
        <Route path="/contact" element={authCtx.isLoggedIn ? <Contact/> : <Navigate to="/auth" />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
