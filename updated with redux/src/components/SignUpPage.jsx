import React, { useContext, useState } from "react";
import "./SignUpPage.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = () => {
    setIsSignup((prevState) => !prevState);
    setError("");
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: forgotPasswordEmail,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Password reset email sent! Please check your inbox.");
        setShowForgotPassword(false);
      } else {
        alert(`Error: ${data.error.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    setIsSending(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignup && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    let url;

    if (isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw`;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(authActions.login({ token: data.idToken, userId: data.localId }));
        alert("Login successful");
      } else {
        alert(`Error: ${data.error.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="signup-container">
      {isSignup ? <h2>Login</h2> : <h2>Sign Up</h2>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isSignup && (
          <div className="input-group">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        {!isSignup && error && <p className="error">{error}</p>}
        <button className="btn-btn" type="submit">
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </form>
      <button onClick={handleLogin} className="btn-login">
        {!isSignup ? "Already Have An Account? Login" : "Don't Have An Account? Sign Up"}
      </button>
      {isSignup && (
        <button onClick={() => setShowForgotPassword(true)} className="btn-forgot-password">
          Forgot Password?
        </button>
      )}
      {showForgotPassword && (
        <div className="forgot-password-modal">
          <form onSubmit={handleForgotPasswordSubmit}>
            <h2>Reset Password</h2>
            <div className="input-group">
              <input
                type="email"
                id="forgotPasswordEmail"
                placeholder="Enter your email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
              />
            </div>
            <button className="btn-btn" type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Reset Email"}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setShowForgotPassword(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
