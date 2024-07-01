import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  emailVerified: false,
  login: (token) => {},
  logout: () => {},
  updateProfile: (displayName, photoUrl) => {},
  sendEmailVerification: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const userIsLoggedIn = !!token;

  useEffect(() => {
    if (userIsLoggedIn) {
      const timer = setTimeout(() => {
        logoutHandler();
        alert("Session expired. Please login again.");
      }, 600000); // 10 minutes in milliseconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [userIsLoggedIn]);

  useEffect(() => {
    if (userIsLoggedIn) {
      checkEmailVerification();
    }
  }, [userIsLoggedIn]);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    checkEmailVerification();
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setEmailVerified(false);
  };

  const updateProfileHandler = (displayName, photoUrl) => {
    setDisplayName(displayName);
    setPhotoUrl(photoUrl);
  };

  const sendEmailVerification = async () => {
    const idToken = token; 
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
          }),
        }
      );

      if (response.ok) {
        alert("Verification email sent! Please check your inbox.");
      } else {
        throw new Error("Failed to send verification email.");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const checkEmailVerification = async () => {
    const idToken = token; // Assuming token is already set
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        const isEmailVerified = data.users[0]?.emailVerified;
        setEmailVerified(isEmailVerified);
      } else {
        throw new Error("Failed to fetch user data.");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    emailVerified: emailVerified,
    login: loginHandler,
    logout: logoutHandler,
    updateProfile: updateProfileHandler,
    sendEmailVerification: sendEmailVerification,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
