import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  updateProfile: (displayName, photoUrl) => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const userIsLoggedIn = !!token;

  useEffect(() => {
    if (userIsLoggedIn) {
      const timer = setTimeout(() => {
        logoutHandler();
        alert("Session expired. Please login again.");
      }, 600000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [userIsLoggedIn]);

  const loginHandler = (token) => {
    setToken(token);
    console.log(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const updateProfileHandler = (displayName, photoUrl) => {
    setDisplayName(displayName);
    setPhotoUrl(photoUrl);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    updateProfile: updateProfileHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
