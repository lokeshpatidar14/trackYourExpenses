import React, { useContext, useState } from "react";
import "./SignUpPage.css";
import AuthContext from "../store/auth-context";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const authCtx = useContext(AuthContext);

  const handleLogin = (e) => {
    setIsSignup((e) => !e);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }
    let url;

    if (isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJltE0LyY8tOFsnQofB1b6HhUXKa8G5Qw";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        console.log("hi");
        alert("login success");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="signup-container">
      {isSignup ? <h2>Login</h2> : <h2>SignUp</h2>}
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
          {isSignup ? "Login" : "Signup"}
        </button>
      </form>
      <button onClick={handleLogin} className="btn-login">
        {!isSignup
          ? "Already Have An Account ! Login "
          : "Dont Have An Account ! Signup"}{" "}
      </button>
    </div>
  );
};

export default SignUpPage;
