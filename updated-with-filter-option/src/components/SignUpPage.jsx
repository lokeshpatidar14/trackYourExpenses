import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { Form, Button, Container, Alert, Modal } from "react-bootstrap";

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
        dispatch(
          authActions.login({ token: data.idToken, userId: data.localId })
        );
        alert("Login successful");
      } else {
        alert(`Error: ${data.error.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <div
        style={{
          background: "black",
          margin: "3rem auto",
          width: "300px",
          height: "400px",
          borderRadius: "6px",
          border: "none",
          textAlign: "center",
          color: "cyan",
          padding: "20px",
          boxShadow: "dark-red",
        }}>
        <h2>{isSignup ? "Login" : "Sign Up"}</h2>
        <br />
        <Form onSubmit={handleSubmit} className="">
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          {!isSignup && (
            <Form.Group controlId="confirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          )}
          <br />

          {error && <Alert variant="danger">{error}</Alert>}

          <Button variant="primary" type="submit" className="mt-3">
            {isSignup ? "Login" : "Sign Up"}
          </Button>
        </Form>
        <Button variant="link" onClick={handleLogin} className="mt-3">
          {!isSignup
            ? "Already Have An Account? Login"
            : "Don't Have An Account? Sign Up"}
        </Button>
        {isSignup && (
          <Button
            variant="link"
            onClick={() => setShowForgotPassword(true)}
            className="mt-3">
            Forgot Password?
          </Button>
        )}
        <Modal
          show={showForgotPassword}
          onHide={() => setShowForgotPassword(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleForgotPasswordSubmit}>
              <Form.Group controlId="forgotPasswordEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={isSending}
                className="mt-3">
                {isSending ? "Sending..." : "Send Reset Email"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowForgotPassword(false)}
                className="mt-3">
                Cancel
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

export default SignUpPage;
